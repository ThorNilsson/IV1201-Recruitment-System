-- CreateTable
CREATE TABLE "migration" (
    "application_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "migration_pkey" PRIMARY KEY ("application_id")
);

-- AddForeignKey
ALTER TABLE "migration" ADD CONSTRAINT "migration_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
