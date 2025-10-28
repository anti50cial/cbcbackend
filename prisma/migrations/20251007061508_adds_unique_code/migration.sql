/*
  Warnings:

  - You are about to drop the column `paymentReference` on the `Applicant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueCodeId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueCodeId` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Applicant_paymentReference_key";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "paymentReference",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uniqueCodeId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UniqueCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniqueCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniqueCode_code_key" ON "UniqueCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_uniqueCodeId_key" ON "Applicant"("uniqueCodeId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_uniqueCodeId_fkey" FOREIGN KEY ("uniqueCodeId") REFERENCES "UniqueCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
