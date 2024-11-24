CREATE TABLE IF NOT EXISTS "capacity" (
	"id" serial PRIMARY KEY NOT NULL,
	"small" integer NOT NULL,
	"regular" integer NOT NULL,
	"odd_size" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "storage_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_name" text NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"locality" text NOT NULL,
	"postal_code" text NOT NULL,
	"space_type" text NOT NULL,
	"capacity_id" integer NOT NULL,
	"operating_hours" text NOT NULL,
	"rent" numeric NOT NULL,
	"security_features" text NOT NULL,
	"amenities" text NOT NULL,
	"terms_agreed" text NOT NULL,
	"additional_note" text NOT NULL,
	"referral_source" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "storage_details_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_capacity_id_capacity_id_fk" FOREIGN KEY ("capacity_id") REFERENCES "public"."capacity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
