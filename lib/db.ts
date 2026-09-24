import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

export type DbClient = NodePgDatabase<typeof schema>;

/**
 * Two logical connections:
 *   - primary : every write, plus read-your-own-writes queries
 *   - replica : read-only traffic, falling back to the primary if it fails
 *
 * On Neon, point DATABASE_URL at the pooled primary endpoint and
 * DATABASE_REPLICA_URL at the read replica's pooled endpoint. Locally (Docker)
 * both point at the same Postgres instance, so enabling a real replica is a
 * config change, not a code change.
 *
 * Connections are created lazily, on first query rather than at import time.
 * That matters because `next build` imports every route module — including in
 * the Docker builder, where `.env.local` is excluded from the image — so a
 * module-scope throw here would break the build rather than surface at runtime.
 *
 * The cache lives on globalThis so that hot reloads in `next dev` reuse the same
 * pools instead of leaking a new one per reload.
 */
type DbCache = { primary?: DbClient; replica?: DbClient };

const cache: DbCache = ((globalThis as unknown as { __osakadevDb?: DbCache })
  .__osakadevDb ??= {});

function primaryUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }

  return url;
}

function replicaUrl(): string {
  // With no replica configured, reads fall back to the primary.
  return process.env.DATABASE_REPLICA_URL ?? primaryUrl();
}

/** Write client — always the primary. */
export function getDb(): DbClient {
  cache.primary ??= drizzle(
    new Pool({ connectionString: primaryUrl(), max: 10 }),
    { schema },
  );

  return cache.primary;
}

/** Read client — the replica when configured, otherwise the primary. */
export function getDbRead(): DbClient {
  cache.replica ??= drizzle(
    new Pool({ connectionString: replicaUrl(), max: 10 }),
    { schema },
  );

  return cache.replica;
}

/**
 * Run a read against the replica, transparently falling back to the primary if
 * the replica is unreachable. This is what keeps read availability up when a
 * replica fails.
 *
 * Do NOT use this for read-your-own-writes: use `getDb()` (the primary) instead.
 */
export async function readQuery<T>(
  run: (client: DbClient) => Promise<T>,
): Promise<T> {
  try {
    return await run(getDbRead());
  } catch (error) {
    console.warn(
      "[db] replica read failed, falling back to primary:",
      error instanceof Error ? error.message : error,
    );
    return run(getDb());
  }
}
