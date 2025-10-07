/*
  Warnings:

  - The primary key for the `UniqueCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UniqueCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UniqueCode" DROP CONSTRAINT "UniqueCode_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UniqueCode_pkey" PRIMARY KEY ("code");
