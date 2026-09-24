CREATE TABLE "weather" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"temperature" double precision NOT NULL,
	"humidity" integer NOT NULL,
	"description" text NOT NULL,
	"recorded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "weather_city_recorded_at_idx" ON "weather" USING btree ("city","recorded_at");