/*
  Warnings:

  - You are about to drop the column `dateJoined` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCodeId` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `uniquePIN` on the `Applicant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueCode]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[regID]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `regID` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Made the column `fullName` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolName` on table `Applicant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Applicant" DROP CONSTRAINT "Applicant_uniqueCodeId_fkey";

-- DropIndex
DROP INDEX "public"."Applicant_uniqueCodeId_key";

-- DropIndex
DROP INDEX "public"."Applicant_uniquePIN_key";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "dateJoined",
DROP COLUMN "uniqueCodeId",
DROP COLUMN "uniquePIN",
ADD COLUMN     "regID" TEXT NOT NULL,
ADD COLUMN     "uniqueCode" TEXT NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "schoolName" SET NOT NULL;

-- CreateTable
CREATE TABLE "RegistrationID" (
    "id" SERIAL NOT NULL,
    "regID" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationID_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationID_regID_key" ON "RegistrationID"("regID");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_uniqueCode_key" ON "Applicant"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_regID_key" ON "Applicant"("regID");
