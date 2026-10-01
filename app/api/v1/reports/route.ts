import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { table } from "@/db/schema";
import { getDb, readQuery } from "@/lib/db";

// Always hit the database at request time — never prerender or cache this.
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
 * Read path — served by the replica, with automatic fallback to the primary.
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
    // No string interpolation: Drizzle parameterizes everything.
    const rows = await readQuery((client) =>
      client
        .select()
        .from(table)
        .where(colName3 ? eq(table.colName3, colName3) : undefined)
        .orderBy(desc(table.colName3))
        .limit(limit),
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

    return NextResponse.json({ data: row }, { status: 201 });
  } catch (error) {
    console.error("[api/v1/reports] write failed:", error);
    return NextResponse.json({ error: "write_failed" }, { status: 503 });
  }
}
