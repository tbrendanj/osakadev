import { after } from "next/server";
import { getRedis } from "@/lib/redis";

/**
 * Cache-aside read cache in front of the database, backed by Upstash Redis.
 *
 * Cache hierarchy (cheapest per request first):
 *   1. Vercel CDN   — public pages / stable-URL GETs (ISR, Flat Rate CDN)
 *   2. THIS MODULE  — dynamic API reads with long-tail query params, shared
 *                     across Fluid Compute instances (Next's Data Cache is
 *                     per-instance; Redis is global)
 *   3. lib/db.ts    — read replica, then primary
 *
 * Design notes:
 * - Fail-open everywhere: a Redis outage degrades to database reads, never a
 *   500. Same for a failed cache write — the freshly fetched data still ships.
 * - Versioned invalidation: keys embed a composite version derived from
 *   per-tag counters (`invalidateTags` INCREMENTS them). Invalidation is one
 *   atomic INCR — no SCAN, no pattern deletes — and orphaned entries expire
 *   via TTL.
 * - Stale-while-revalidate: within `staleSeconds` past freshness, stale data
 *   is served immediately and a background refresh runs via `after()` (fires
 *   after the response is sent, so users never wait for it).
 * - Stampede protection: concurrent misses on the same key share one in-flight
 *   fetch instead of fanning out to the database.
 * - Disabled when Upstash env vars are unset: every call goes straight to the
 *   fetcher, so local dev and tests need no Redis.
 */

const KEY_PREFIX = "osaka:cache:";
const VERSION_PREFIX = "osaka:ver:";

type Envelope<T> = {
  /** Composite invalidation version at write time. */
  v: string;
  /** Epoch millis when the entry was written. */
  t: number;
  /** Payload. */
  d: T;
};

export type CachedReadOptions = {
  /**
   * Cache key fragment, unique per query shape — e.g. `list:Tokyo:20`.
   * Combined with the first tag's namespace: `{tag}:{key}`.
   */
  key: string;
  /**
   * Invalidation tags. The first tag namespaces the entry key; INCREMENTing
   * any tag's version (via `invalidateTags`) invalidates the entry.
   */
  tags: readonly string[];
  /** Freshness window: entries younger than this are served without the DB. */
  ttlSeconds: number;
  /**
   * Extra window after `ttlSeconds` where stale entries are served instantly
   * while a background refresh runs. 0 disables stale serving.
   */
  staleSeconds: number;
};

/** In-flight fetches, keyed by entry key, for stampede protection. */
const inflight = new Map<string, Promise<unknown>>();

function requireTags(
  tags: readonly string[],
): asserts tags is [string, ...string[]] {
  if (tags.length === 0) {
    throw new Error("cachedRead: at least one tag is required");
  }
}

function parseEnvelope<T>(raw: string): Envelope<T> | null {
  try {
    const parsed = JSON.parse(raw) as Partial<Envelope<T>>;
    if (typeof parsed.v !== "string" || typeof parsed.t !== "number") {
      return null;
    }
    return parsed as Envelope<T>;
  } catch {
    return null;
  }
}


/**
 * Cache-aside wrapper for a read. Returns cached data when available and
 * fresh (or stale-but-recent), otherwise calls `fetcher` (deduplicated
 * across concurrent callers) and stores the result.
 */
export async function cachedRead<T>(
  options: CachedReadOptions,
  fetcher: () => Promise<T>,
): Promise<T> {
  const { key, ttlSeconds, staleSeconds } = options;
  requireTags(options.tags);
  const tags = options.tags;

  const redis = getRedis();
  if (!redis) {
    return fetcher();
  }

  const entryKey = `${KEY_PREFIX}${tags[0]}:${key}`;
  const versionKeys = tags.map((tag) => `${VERSION_PREFIX}${tag}`);

  let raw: string | null = null;
  let versions: (string | null)[] = [];

  try {
    const results = await redis
      .multi()
      .get(entryKey)
      .mget(...versionKeys)
      .exec();
    raw = (results[0] as string | null) ?? null;
    versions = (results[1] as (string | null)[] | null) ?? [];
  } catch (error) {
    console.warn(
      "[cache] read failed, falling back to fetcher:",
      error instanceof Error ? error.message : error,
    );
    return fetcher();
  }

  // Missing version keys are "0" — matches the version stamped on first write.
  const currentVersion = versions.map((v) => v ?? "0").join("/");

  if (raw !== null) {
    const envelope = parseEnvelope<T>(raw);

    if (envelope && envelope.v === currentVersion) {
      const ageMs = Date.now() - envelope.t;

      if (ageMs <= ttlSeconds * 1000) {
        return envelope.d;
      }

      if (ageMs <= (ttlSeconds + staleSeconds) * 1000) {
        // Serve stale now; refresh after the response is sent.
        after(async () => {
          await refresh(redis, entryKey, currentVersion, options, fetcher);
        });
        return envelope.d;
      }
    }
  }

  // Miss (or expired past the stale window): deduplicated fetch + store.
  return refresh(redis, entryKey, currentVersion, options, fetcher);
}

/**
 * Fetch and store, deduplicated per entry key so N concurrent cold requests
 * produce one database query. A failed fetch propagates to all waiters (the
 * route handler already maps errors to 5xx); a failed cache write is logged
 * and swallowed — the data was fetched either way.
 */
function refresh<T>(
  redis: NonNullable<ReturnType<typeof getRedis>>,
  entryKey: string,
  currentVersion: string,
  options: CachedReadOptions,
  fetcher: () => Promise<T>,
): Promise<T> {
  const existing = inflight.get(entryKey);
  if (existing) {
    return existing as Promise<T>;
  }

  const promise = (async () => {
    const data = await fetcher();

    try {
      const envelope: Envelope<T> = {
        v: currentVersion,
        t: Date.now(),
        d: data,
      };
      await redis.set(entryKey, JSON.stringify(envelope), {
        ex: options.ttlSeconds + options.staleSeconds,
      });
    } catch (error) {
      console.warn(
        "[cache] write failed (serving uncached):",
        error instanceof Error ? error.message : error,
      );
    }

    return data;
  })().finally(() => {
    inflight.delete(entryKey);
  });

  inflight.set(entryKey, promise);
  return promise;
}

/**
 * Invalidate every entry tagged with any of `tags` by bumping their version
 * counters — one atomic INCR per tag, no key scans. Old entries become
 * unreachable immediately and expire via TTL.
 *
 * Fails open (logs and returns): a failed invalidation means stale reads
 * until the entry ages past `ttlSeconds + staleSeconds`, not an outage.
 */
export async function invalidateTags(tags: readonly string[]): Promise<void> {
  if (tags.length === 0) {
    return;
  }

  const redis = getRedis();
  if (!redis) {
    return;
  }

  try {
    const pipeline = redis.multi();
    for (const tag of tags) {
      pipeline.incr(`${VERSION_PREFIX}${tag}`);
    }
    await pipeline.exec();
  } catch (error) {
    console.warn(
      "[cache] invalidation failed (entries go stale until TTL):",
      error instanceof Error ? error.message : error,
    );
  }
}
