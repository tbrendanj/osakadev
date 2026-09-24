import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js keeps local secrets in .env.local — drizzle-kit needs them too.
// Existing process env (e.g. docker compose `environment:`) wins over the file.
config({ path: ".env.local" });

// Migrations must run against a DIRECT (unpooled) connection. Neon's pooler is
// PgBouncer in transaction mode, which can break migrations and prepared
// statements. Locally there is no pooler, so DATABASE_URL is fine.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "No database URL found. Set DATABASE_URL_UNPOOLED or DATABASE_URL.",
  );
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
