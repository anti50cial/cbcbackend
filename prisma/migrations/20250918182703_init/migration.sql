-- CreateTable
CREATE TABLE "public"."Applicant" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "uniquePIN" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_id_key" ON "public"."Applicant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_uniquePIN_key" ON "public"."Applicant"("uniquePIN");
