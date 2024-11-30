CREATE TABLE IF NOT EXISTS "partnership_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_name" text NOT NULL,
	"contact_person" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"location" text NOT NULL,
	"business_type" text NOT NULL,
	"storage_space" integer NOT NULL,
	"current_monthly_visitors" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
