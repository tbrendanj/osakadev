import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { table } from "@/db/schema";
import { cachedRead, invalidateTags } from "@/lib/cache";
import { getDb, readQuery } from "@/lib/db";

// Served at request time (never prerendered). GET reads pass through the
// Redis cache layer (lib/cache.ts) before hitting the database; the route
// itself is not cached by Next's full-route cache.
export const dynamic = "force-dynamic";

const listQuery = z.object({
  colName3: z.string().trim().min(1).max(100).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

const createBody = z.object({
  colName3: z.string().trim().min(1).max(100),
  // colName: z.number().finite(),
  // colName2: z.number().int().min(0).max(100),
});

/**
 * GET /api/v1/reports?city=Tokyo&limit=20
 *
 * Read path — Redis cache (when configured) → replica → primary fallback.
 * Cache key derives from the normalized query params, so long-tail param
 * combinations get Redis hit rates the CDN can't give them.
 */
export async function GET(request: NextRequest) {
  const parsed = listQuery.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_query", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { colName3, limit } = parsed.data;

  try {
    // 30s fresh; then 270s of stale-while-revalidate. Writes bump the
    // "reports" version (see POST), so listings appear immediately after a
    // create regardless of TTL.
    const rows = await cachedRead(
      {
        key: `list:${colName3 ?? "all"}:${limit}`,
        tags: ["reports"],
        ttlSeconds: 30,
        staleSeconds: 270,
      },
      // No string interpolation: Drizzle parameterizes everything.
      () =>
        readQuery((client) =>
          client
            .select()
            .from(table)
            .where(colName3 ? eq(table.colName3, colName3) : undefined)
            .orderBy(desc(table.colName3))
            .limit(limit),
        ),
    );

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("[api/v1/reports] read failed:", error);
    return NextResponse.json({ error: "read_failed" }, { status: 503 });
  }
}

/**
 * POST /api/v1/reports
 *
 * Write path — always the primary.
 */
export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = createBody.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const [row] = await getDb().insert(table).values(parsed.data).returning();

    // Awaited (one fast round trip) so a create is never followed by a stale
    // read. Fails open inside invalidateTags — worst case is a stale list
    // until the TTL window lapses, never a failed write.
    await invalidateTags(["reports"]);

    return NextResponse.json({ data: row }, { status: 201 });
  } catch (error) {
    console.error("[api/v1/reports] write failed:", error);
    return NextResponse.json({ error: "write_failed" }, { status: 503 });
  }
}
