/*
  Warnings:

  - A unique constraint covering the columns `[paymentReference]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Applicant_paymentReference_key" ON "public"."Applicant"("paymentReference");
