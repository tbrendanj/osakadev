import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Always hit the database at request time — never prerender or cache this.
export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Liveness/readiness probe. Also useful as a container healthcheck and as a
 * post-deploy smoke test.
 */
export async function GET() {
  const startedAt = Date.now();

  try {
    await getDb().execute(sql`select 1`);

    return NextResponse.json({
      status: "ok",
      database: "up",
      latencyMs: Date.now() - startedAt,
    });
  } catch (error) {
    console.error("[api/health] database check failed:", error);

    return NextResponse.json(
      {
        status: "degraded",
        database: "down",
        latencyMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : "unknown error",
      },
      { status: 503 },
    );
  }
}
