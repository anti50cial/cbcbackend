-- AlterTable
ALTER TABLE "public"."Applicant" ADD CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Applicant_id_key";
