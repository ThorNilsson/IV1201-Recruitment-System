-- CreateTable
CREATE TABLE "availability" (
    "availability_id" SERIAL NOT NULL,
    "person_id" INTEGER,
    "from_date" DATE,
    "to_date" DATE,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("availability_id")
);

-- CreateTable
CREATE TABLE "competence" (
    "competence_id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "competence_pkey" PRIMARY KEY ("competence_id")
);

-- CreateTable
CREATE TABLE "competence_profile" (
    "competence_profile_id" SERIAL NOT NULL,
    "person_id" INTEGER,
    "competence_id" INTEGER,
    "years_of_experience" DECIMAL(4,2),

    CONSTRAINT "competence_profile_pkey" PRIMARY KEY ("competence_profile_id")
);

-- CreateTable
CREATE TABLE "person" (
    "person_id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "surname" VARCHAR(255),
    "pnr" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "role_id" INTEGER,
    "username" VARCHAR(255),

    CONSTRAINT "person_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competence_profile" ADD CONSTRAINT "competence_profile_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competence"("competence_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competence_profile" ADD CONSTRAINT "competence_profile_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
