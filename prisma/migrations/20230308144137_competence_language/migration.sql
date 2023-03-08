
-- CreateEnum
CREATE TYPE "language" AS ENUM ('en_US', 'sv_SE');
-- CreateTable
CREATE TABLE "competence_name" (
    "competence_id" INTEGER NOT NULL,
    "lang" "language" NOT NULL DEFAULT 'en_US',
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "competence_name_pkey" PRIMARY KEY ("competence_id","lang")
);

-- AddForeignKey
ALTER TABLE "competence_name" ADD CONSTRAINT "competence_name_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Insert dropped data

INSERT INTO "competence_name"("competence_id", "name")
SELECT "id", "name" FROM "competence"
;

--------- DO THIS MANUALLY AFTER DEPLOY
-- INSERT INTO "competence_name"("competence_id", "lang", "name")
-- VALUES
-- (1, 'sv_SE', 'Biljettförsäljning'),
-- (2, 'sv_SE', 'Lotteri'),
-- (3, 'sv_SE', 'Berg- och dalbaneoperatör')
-- ;

-- AlterTable
ALTER TABLE "competence" DROP COLUMN "name";

