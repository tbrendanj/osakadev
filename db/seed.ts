import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { weather } from "./schema";

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

  const rows: (typeof weather.$inferInsert)[] = [
    {
      city: "Tokyo",
      temperature: 27.4,
      humidity: 63,
      description: "scattered clouds",
    },
    {
      city: "Los Angeles",
      temperature: 22.1,
      humidity: 48,
      description: "clear sky",
    },
    {
      city: "Boston",
      temperature: 15.8,
      humidity: 71,
      description: "light rain",
    },
    {
      city: "New York",
      temperature: 18.3,
      humidity: 66,
      description: "overcast clouds",
    },
  ];

  const inserted = await db
    .insert(weather)
    .values(rows)
    .returning({ id: weather.id, city: weather.city });

  console.log(
    `Seeded ${inserted.length} rows: ${inserted.map((row) => row.city).join(", ")}`,
  );

  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
