/*
  Warnings:

  - Added the required column `updatedAt` to the `competence_profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "competence_profile_status" AS ENUM ('UNHANDLED', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "competence_profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "competence_profile_status" NOT NULL DEFAULT 'UNHANDLED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
