/*
  Warnings:

  - Added the required column `age` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolName` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "public"."Applicant" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD COLUMN     "schoolName" TEXT NOT NULL;
