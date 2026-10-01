CREATE TABLE "table" (
	"id" serial PRIMARY KEY NOT NULL,
	"colName3" text NOT NULL,
	-- "colName" double precision NOT NULL,
	-- "colName2" integer NOT NULL,
	-- "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "table" ON "table" USING btree ("id");
-- ("id","colName3")