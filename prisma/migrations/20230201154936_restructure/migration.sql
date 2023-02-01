/*
  Warnings:

  - The primary key for the `availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `availability_id` on the `availability` table. All the data in the column will be lost.
  - The primary key for the `competence_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `competence_profile_id` on the `competence_profile` table. All the data in the column will be lost.
  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `person` table. All the data in the column will be lost.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `person` will be added. If there are existing duplicate values, this will fail.
  - Made the column `person_id` on table `availability` required. This step will fail if there are existing NULL values in that column.
  - Made the column `from_date` on table `availability` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to_date` on table `availability` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `competence` required. This step will fail if there are existing NULL values in that column.
  - Made the column `person_id` on table `competence_profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `competence_id` on table `competence_profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `years_of_experience` on table `competence_profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pnr` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `role` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "availability" DROP CONSTRAINT "availability_person_id_fkey";

-- DropForeignKey
ALTER TABLE "competence_profile" DROP CONSTRAINT "competence_profile_person_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_role_id_fkey";

-- AlterTable
ALTER TABLE "availability" RENAME COLUMN "availability_id" TO "id";
ALTER TABLE "availability" DROP CONSTRAINT "availability_pkey",
ALTER COLUMN "person_id" SET NOT NULL,
ALTER COLUMN "from_date" SET NOT NULL,
ALTER COLUMN "to_date" SET NOT NULL,
ADD CONSTRAINT "availability_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "competence" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "competence_profile" RENAME COLUMN "competence_profile_id" TO     "id";
ALTER TABLE "competence_profile" DROP CONSTRAINT "competence_profile_pkey",
ALTER COLUMN "person_id" SET NOT NULL,
ALTER COLUMN "competence_id" SET NOT NULL,
ALTER COLUMN "years_of_experience" SET NOT NULL,
ADD CONSTRAINT "competence_profile_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "user" (
    "id" integer NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "person_id" INTEGER,
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "user" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "user_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
-- CreateIndex
CREATE UNIQUE INDEX "user_person_id_key" ON "user"("person_id");

INSERT INTO "user"("username", "password", "role_id", "person_id")
SELECT "username", "password", "role_id", "person_id" FROM "person"
WHERE "username" IS NOT NULL
;
DELETE FROM "person"
WHERE "username" IS NOT NULL
;

-- AlterTable
ALTER TABLE "person" RENAME COLUMN "person_id" TO "id";
ALTER TABLE "person" DROP CONSTRAINT "person_pkey",
DROP COLUMN "password",
DROP COLUMN "role_id",
DROP COLUMN "username",
-- ALTER COLUMN "name" SET NOT NULL,
-- ALTER COLUMN "surname" SET NOT NULL,
-- ALTER COLUMN "pnr" SET NOT NULL,
-- ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "person_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "role" RENAME COLUMN "role_id" TO "id";
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");


-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competence_profile" ADD CONSTRAINT "competence_profile_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
