-- DropIndex
DROP INDEX "bookings_business_id_date_start_time_key";

-- CreateIndex
CREATE INDEX "bookings_user_id_idx" ON "bookings"("user_id");

-- CreateIndex
CREATE INDEX "time_off_business_id_date_idx" ON "time_off"("business_id", "date");
