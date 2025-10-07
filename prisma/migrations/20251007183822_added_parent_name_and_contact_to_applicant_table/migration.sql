/*
  Warnings:

  - Added the required column `parentContact` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentName` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "parentContact" TEXT NOT NULL,
ADD COLUMN     "parentName" TEXT NOT NULL;
