import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Unit tests for lib/cache.ts (cachedRead / invalidateTags).
 *
 * Redis is faked in-memory and `after` captures tasks instead of scheduling
 * them, so these run in the vitest node project with no live services — per
 * the repo convention that unit tests keep external access lazy/stubbable.
 */

const state = vi.hoisted(() => ({
  /** Injected FakeRedis, or null to simulate "caching disabled". */
  redis: null as unknown,
  /** Background tasks handed to after(), kept for the test to await. */
  scheduled: [] as Array<() => Promise<void>>,
}));

vi.mock("next/server", () => ({
  after: (task: () => Promise<void>) => {
    state.scheduled.push(task);
  },
}));

vi.mock("./redis", () => ({
  getRedis: () => state.redis,
}));

import { cachedRead, invalidateTags } from "./cache";

/** Minimal in-memory stand-in for the Upstash client surface lib/cache uses. */
class FakeRedis {
  store = new Map<string, string>();
  failCommands = false;
  lastSetOptions: { ex?: number } | undefined;

  private assertUp() {
    if (this.failCommands) {
      throw new Error("redis down");
    }
  }

  async get(key: string): Promise<string | null> {
    this.assertUp();
    return this.store.get(key) ?? null;
  }

  async mget(...keys: string[]): Promise<(string | null)[]> {
    this.assertUp();
    return keys.map((key) => this.store.get(key) ?? null);
  }

  async set(key: string, value: string, options?: { ex?: number }) {
    this.assertUp();
    this.lastSetOptions = options;
    this.store.set(key, value);
    return "OK";
  }

  multi() {
    const ops: Array<() => Promise<unknown>> = [];
    const chain = {
      get: (key: string) => {
        ops.push(() => this.get(key));
        return chain;
      },
      mget: (...keys: string[]) => {
        ops.push(() => this.mget(...keys));
        return chain;
      },
      incr: (key: string) => {
        ops.push(async () => {
          this.assertUp();
          const next = Number(this.store.get(key) ?? "0") + 1;
          this.store.set(key, String(next));
          return next;
        });
        return chain;
      },
      exec: () => Promise.all(ops.map((op) => op())),
    };
    return chain;
  }
}

const ENTRY_KEY = "osaka:cache:reports:list:Tokyo:20";
const VERSION_KEY = "osaka:ver:reports";

const options = {
  key: "list:Tokyo:20",
  tags: ["reports"],
  ttlSeconds: 30,
  staleSeconds: 270,
};

function envelopeIn(fake: FakeRedis, key = ENTRY_KEY) {
  const raw = fake.store.get(key);
  if (raw === undefined) {
    throw new Error(`expected a cache entry at ${key}`);
  }
  return JSON.parse(raw) as { v: string; t: number; d: string };
}

function tick(times = 10): Promise<void> {
  let p = Promise.resolve();
  for (let i = 0; i < times; i++) {
    p = p.then(() => undefined);
  }
  return p;
}

let redis: FakeRedis;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-17T00:00:00Z"));
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  redis = new FakeRedis();
  state.redis = redis;
  state.scheduled = [];
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("cachedRead", () => {
  it("passes through to the fetcher when caching is disabled", async () => {
    state.redis = null;
    const fetcher = vi.fn().mockResolvedValue("rows");

    await expect(cachedRead(options, fetcher)).resolves.toBe("rows");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("throws when no tags are provided", async () => {
    await expect(
      cachedRead({ ...options, tags: [] }, async () => "rows"),
    ).rejects.toThrow(/tag/i);
  });

  it("fetches on a miss and stores the envelope with TTL of ttl + stale", async () => {
    const fetcher = vi.fn().mockResolvedValue("rows");

    await expect(cachedRead(options, fetcher)).resolves.toBe("rows");
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(redis.lastSetOptions).toEqual({ ex: 300 });
    expect(envelopeIn(redis)).toMatchObject({ v: "0", d: "rows" });
  });

  it("serves a fresh hit without calling the fetcher again", async () => {
    const fetcher = vi.fn().mockResolvedValue("rows");
    await cachedRead(options, fetcher);

    vi.setSystemTime(new Date(Date.now() + 10_000)); // within TTL
    await expect(cachedRead(options, fetcher)).resolves.toBe("rows");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("serves stale data and refreshes in the background within the stale window", async () => {
    const fetcher = vi.fn().mockResolvedValue("old");
    await cachedRead(options, fetcher);

    vi.setSystemTime(new Date(Date.now() + 31_000)); // past TTL, within stale
    fetcher.mockResolvedValue("new");

    await expect(cachedRead(options, fetcher)).resolves.toBe("old");
    expect(fetcher).toHaveBeenCalledTimes(1); // stale served; refresh pending
    expect(state.scheduled).toHaveLength(1);

    await Promise.all(state.scheduled.map((task) => task()));
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(envelopeIn(redis).d).toBe("new");

    await expect(cachedRead(options, fetcher)).resolves.toBe("new");
  });

  it("treats entries older than ttl + stale as a miss", async () => {
    const fetcher = vi.fn().mockResolvedValue("old");
    await cachedRead(options, fetcher);

    vi.setSystemTime(new Date(Date.now() + 301_000));
    fetcher.mockResolvedValue("fresh");

    await expect(cachedRead(options, fetcher)).resolves.toBe("fresh");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent misses into one fetch", async () => {
    let resolveFetch: (value: string) => void = () => undefined;
    const fetcher = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const first = cachedRead(options, fetcher);
    const second = cachedRead(options, fetcher);
    await tick(); // let both reach the miss path
    expect(fetcher).toHaveBeenCalledTimes(1);
    resolveFetch("rows");

    await expect(Promise.all([first, second])).resolves.toEqual([
      "rows",
      "rows",
    ]);
  });

  it("fails open to the fetcher when Redis errors", async () => {
    redis.failCommands = true;
    const fetcher = vi.fn().mockResolvedValue("rows");

    await expect(cachedRead(options, fetcher)).resolves.toBe("rows");
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalled();
  });
});

describe("invalidateTags", () => {
  it("bumps the tag version so the next read is a miss", async () => {
    const fetcher = vi.fn().mockResolvedValue("v1");
    await cachedRead(options, fetcher);
    expect(envelopeIn(redis).v).toBe("0");

    await invalidateTags(["reports"]);
    expect(redis.store.get(VERSION_KEY)).toBe("1");

    fetcher.mockResolvedValue("v2");
    await expect(cachedRead(options, fetcher)).resolves.toBe("v2");
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(envelopeIn(redis)).toMatchObject({ v: "1", d: "v2" });
  });

  it("fails open when Redis errors", async () => {
    redis.failCommands = true;
    await expect(invalidateTags(["reports"])).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });

  it("is a no-op without tags or without Redis", async () => {
    state.redis = null;
    await expect(invalidateTags([])).resolves.toBeUndefined();
    await expect(invalidateTags(["reports"])).resolves.toBeUndefined();
  });
});

