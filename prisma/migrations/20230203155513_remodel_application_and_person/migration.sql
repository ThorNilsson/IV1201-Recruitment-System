/*
  Warnings:

  - You are about to drop the column `person_id` on the `availability` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `competence_profile` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `competence_profile` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `competence_profile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `competence_profile` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[application_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `application_id` to the `availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `application_id` to the `competence_profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "availability" DROP CONSTRAINT "availability_person_id_fkey";

-- DropForeignKey
ALTER TABLE "competence_profile" DROP CONSTRAINT "competence_profile_person_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_person_id_fkey";

-- DropIndex
DROP INDEX "user_person_id_key";

-- AlterTable
ALTER TABLE "availability" RENAME COLUMN "person_id" TO "application_id";

-- AlterTable
ALTER TABLE "competence_profile" RENAME COLUMN "person_id" TO "application_id";
ALTER TABLE "competence_profile" DROP COLUMN "createdAt",
DROP COLUMN "status",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "user" RENAME COLUMN "person_id" TO "application_id";

-- CreateTable
ALTER TABLE "person" RENAME TO "application";
ALTER TABLE "application"
ADD COLUMN "status" "competence_profile_status" NOT NULL DEFAULT 'UNHANDLED',
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "application" RENAME CONSTRAINT "person_pkey" TO "application_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "user_application_id_key" ON "user"("application_id");

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competence_profile" ADD CONSTRAINT "competence_profile_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
