/*
  Warnings:

  - Added the required column `location` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "location" TEXT NOT NULL;
