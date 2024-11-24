CREATE TABLE IF NOT EXISTS "storage_capacity" (
	"id" serial PRIMARY KEY NOT NULL,
	"small" integer DEFAULT 0 NOT NULL,
	"regular" integer DEFAULT 0 NOT NULL,
	"odd_size" integer DEFAULT 0 NOT NULL
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
	"rent" integer NOT NULL,
	"security_features" text NOT NULL,
	"amenities" text,
	"terms_agreed" boolean NOT NULL,
	"additional_note" text,
	"referral_source" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"approvalStatus" text DEFAULT 'pending' NOT NULL,
	CONSTRAINT "storage_details_email_unique" UNIQUE("email"),
	CONSTRAINT "storage_details_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_capacity_id_storage_capacity_id_fk" FOREIGN KEY ("capacity_id") REFERENCES "public"."storage_capacity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
