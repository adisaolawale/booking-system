-- CreateTable
CREATE TABLE "pending_registrations" (
    "email" TEXT NOT NULL,
    "code_hash" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tab" TEXT NOT NULL,
    "business_name" TEXT,
    "business_description" TEXT,
    "category_id" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_registrations_pkey" PRIMARY KEY ("email")
);

CREATE UNIQUE INDEX "bookings_active_slot_key"
  ON "bookings" ("business_id", "date", "start_time")
  WHERE "status" <> 'CANCELLED';

CREATE INDEX "bookings_user_id_idx" ON "bookings" ("user_id");
CREATE INDEX "time_off_business_id_date_idx" ON "time_off" ("business_id", "date");

ALTER TABLE "services"
  ADD CONSTRAINT "services_positive_check" CHECK ("price" >= 0 AND "duration" > 0);
