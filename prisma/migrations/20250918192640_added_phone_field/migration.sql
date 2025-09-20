/*
  Warnings:

  - Added the required column `phoneNumber` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Applicant" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
