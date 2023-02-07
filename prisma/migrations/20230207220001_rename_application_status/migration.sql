
ALTER TYPE "competence_profile_status" RENAME TO "application_status";

-- RenameIndex
ALTER INDEX "person_email_key" RENAME TO "application_email_key";
