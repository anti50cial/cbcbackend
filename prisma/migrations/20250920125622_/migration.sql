/*
  Warnings:

  - You are about to drop the column `paid` on the `Applicant` table. All the data in the column will be lost.
  - Added the required column `paymentReference` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Applicant" DROP COLUMN "paid",
ADD COLUMN     "paymentReference" TEXT NOT NULL;
