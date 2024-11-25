CREATE TABLE IF NOT EXISTS "storage_capacity" (
	"id" serial PRIMARY KEY NOT NULL,
	"small" integer DEFAULT 0 NOT NULL,
	"regular" integer DEFAULT 0 NOT NULL,
	"odd_size" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "storage_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer DEFAULT 0 NOT NULL,
	"business_name" text NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"locality" text NOT NULL,
	"postal_code" text NOT NULL,
	"place_id" text DEFAULT '' NOT NULL,
	"latitude" numeric DEFAULT '0' NOT NULL,
	"longitude" numeric DEFAULT '0' NOT NULL,
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
	"approvalStatus" text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"password" varchar(255),
	"enabled" boolean DEFAULT true NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"phoneVerified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"img_folder_id" text,
	"role" text DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storage_details" ADD CONSTRAINT "storage_details_capacity_id_storage_capacity_id_fk" FOREIGN KEY ("capacity_id") REFERENCES "public"."storage_capacity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
