import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { table } from "./schema";

config({ path: ".env.local" });

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }

  // Seeding writes, so use the primary connection.
  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  const rows: (typeof table.$inferInsert)[] = [
    {
      colName3: "Tokyo",
    },
    {
      colName3: "Osaka",
    },
  ];

  const inserted = await db
    .insert(table)
    .values(rows)
    .returning({ id: table.id, colName3: table.colName3 });

  console.log(
    `Seeded ${inserted.length} rows: ${inserted.map((row) => row.colName3).join(", ")}`,
  );

  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
