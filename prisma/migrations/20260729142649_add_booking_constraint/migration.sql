/*
  Warnings:

  - You are about to drop the column `time` on the `bookings` table. All the data in the column will be lost.
  - The `role` column on the `memberships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[business_id,day_of_week]` on the table `availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[business_id,date,start_time]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('OWNER', 'ADMIN', 'STAFF');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'OWNER';
ALTER TYPE "Role" ADD VALUE 'STAFF';

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "time",
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "memberships" DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE INDEX "availability_business_id_idx" ON "availability"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "availability_business_id_day_of_week_key" ON "availability"("business_id", "day_of_week");

-- CreateIndex
CREATE INDEX "bookings_business_id_date_idx" ON "bookings"("business_id", "date");

-- CreateIndex
CREATE INDEX "bookings_business_id_idx" ON "bookings"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_business_id_date_start_time_key" ON "bookings"("business_id", "date", "start_time");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_slug_key" ON "businesses"("slug");

-- CreateIndex
CREATE INDEX "services_business_id_idx" ON "services"("business_id");
