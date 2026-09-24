import {
  doublePrecision,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Weather observations — one row per city per fetch.
 *
 * Reads for this table are served by the replica by default (see lib/db.ts),
 * writes always go to the primary.
 */
export const weather = pgTable(
  "weather",
  {
    id: serial("id").primaryKey(),
    city: text("city").notNull(),
    temperature: doublePrecision("temperature").notNull(),
    humidity: integer("humidity").notNull(),
    description: text("description").notNull(),
    recordedAt: timestamp("recorded_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("weather_city_recorded_at_idx").on(table.city, table.recordedAt),
  ],
);

export type Weather = typeof weather.$inferSelect;
export type NewWeather = typeof weather.$inferInsert;
