import { Redis } from "@upstash/redis";

/**
 * Optional read cache (Upstash Redis over HTTP).
 *
 * Mirrors lib/db.ts: lazy creation, cached on globalThis so hot reloads and
 * warm function instances reuse one client. Upstash's client speaks HTTP/REST,
 * so there is no connection pool to size or leak — it works safely alongside
 * Fluid Compute's concurrent invocations per instance.
 *
 * Unset credentials disables the cache entirely: getRedis() returns null and
 * lib/cache.ts falls through to the database. Local dev, Docker Compose, and
 * unit tests run without it by design — same philosophy as
 * DATABASE_REPLICA_URL falling back to the primary.
 *
 * On Vercel, create the Upstash database in the SAME region as the Vercel
 * functions and the Neon project (Tokyo) — a cross-region cache adds ~100ms
 * to every hit.
 */
type RedisCache = { client?: Redis };

const cache: RedisCache = ((globalThis as unknown as {
  __osakadevRedis?: RedisCache;
}).__osakadevRedis ??= {});

/** The Upstash client, or null when caching is not configured. */
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  // automaticDeserialization off: entries are opaque JSON strings written by
  // lib/cache.ts, and we want to control (and pay for) exactly one parse.
  cache.client ??= new Redis({
    url,
    token,
    automaticDeserialization: false,
  });

  return cache.client;
}
