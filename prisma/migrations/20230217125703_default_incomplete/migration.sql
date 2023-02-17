-- AlterTable
ALTER TABLE "application" ALTER COLUMN "status" SET DEFAULT 'INCOMPLETE';

-- Set old applications to incomplete
UPDATE "application" SET "status" = 'INCOMPLETE';
