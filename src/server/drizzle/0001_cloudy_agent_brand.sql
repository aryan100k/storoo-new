ALTER TABLE "storage_details" DROP CONSTRAINT "storage_details_capacity_id_capacity_id_fk";
--> statement-breakpoint
ALTER TABLE "capacity" ALTER COLUMN "small" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "capacity" ALTER COLUMN "regular" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "capacity" ALTER COLUMN "odd_size" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "capacity" ADD COLUMN "storage_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "capacity" ADD CONSTRAINT "capacity_storage_id_storage_details_id_fk" FOREIGN KEY ("storage_id") REFERENCES "public"."storage_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
