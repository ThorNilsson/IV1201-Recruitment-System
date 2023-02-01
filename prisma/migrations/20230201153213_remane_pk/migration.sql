/*
  Warnings:

  - The primary key for the `competence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `competence_id` on the `competence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "competence_profile" DROP CONSTRAINT "competence_profile_competence_id_fkey";

-- AlterTable
ALTER TABLE "competence" RENAME COLUMN "competence_id" TO "id";
ALTER TABLE "competence" DROP CONSTRAINT "competence_pkey",
ADD CONSTRAINT "competence_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "competence_profile" ADD CONSTRAINT "competence_profile_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
