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
 * Table
 *
 * Reads for this table are served by the replica by default (see lib/db.ts),
 * writes always go to the primary.
 */
export const table = pgTable(
  "table",
  {
    id: serial("id").primaryKey(),
    // colName: doublePrecision("colName").notNull(),
    // colName2: integer("colName2").notNull(),
    colName3: text("colName3").notNull(),
    // timestamp: timestamp("recorded_at", { withTimezone: true })
    //   .notNull()
    //   .defaultNow(),
  },
  (table) => [
    index("table").on(table.id),
    // index("table").on(table.id, table.colName3),
  ],
);

export type Table = typeof table.$inferSelect;
export type NewTable = typeof table.$inferInsert;
