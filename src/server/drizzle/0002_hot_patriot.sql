CREATE TABLE IF NOT EXISTS "storage_locations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text,
	"address" text,
	"lat" numeric,
	"lng" numeric,
	"price_per_day" numeric,
	"available_spaces" integer,
	"created_at" timestamp with time zone DEFAULT timezone('utc'::text, now())
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_capacity_id_capacity_id_fk" FOREIGN KEY ("capacity_id") REFERENCES "public"."capacity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_phone_unique" UNIQUE("phone");