/*
  Warnings:

  - The primary key for the `UniqueCode` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UniqueCode" DROP CONSTRAINT "UniqueCode_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UniqueCode_pkey" PRIMARY KEY ("id");
