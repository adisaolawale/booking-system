-- CreateTable
CREATE TABLE "time_off" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_off_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
