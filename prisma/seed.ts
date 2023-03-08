import { PrismaClient, language } from "@prisma/client";
import bcrypt from "bcrypt";
import moment from "moment";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        // id: 1,
        name: "recruiter",
      },
      {
        // id: 2,
        name: "applicant",
      },
    ],
  });
  await prisma.competence.create({ data: {} });
  await prisma.competence.create({ data: {} });
  await prisma.competence.create({ data: {} });
  await prisma.competence_name.createMany({
    data: [
      {
        competence_id: 1,
        // lang: language.en_US,
        name: "ticket sales",
      },
      {
        competence_id: 2,
        // lang: language.en_US,
        name: "lotteries",
      },
      {
        competence_id: 3,
        // lang: language.en_US,
        name: "roller coaster operation",
      },
      {
        competence_id: 1,
        lang: language.sv_SE,
        name: "Biljettförsäljning",
      },
      {
        competence_id: 2,
        lang: language.sv_SE,
        name: "Lotteri",
      },
      {
        competence_id: 3,
        lang: language.sv_SE,
        name: "Berg- och dalbaneoperatör",
      },
    ],
  });
  // 10 admins
  await prisma.user.createMany({
    data: Array(10)
      .fill(0)
      .map((_, i) => ({
        username: `some_admin${i + 1}`,
        password: bcrypt.hashSync("oogabooga", 10),
        role_id: 1,
      })),
  });
  await prisma.user.createMany({
    data: [
      {
        username: "a",
        password: bcrypt.hashSync("a", 10),
        role_id: 1, // admin
      },
      {
        username: "alice",
        password: bcrypt.hashSync("alice", 10),
        role_id: 2, // applicant
      },
      {
        username: "bob",
        password: bcrypt.hashSync("bob", 10),
        role_id: 2,
      },
    ],
  });

  //Add applications with  user
  /*
  await prisma.application.createMany({
    data: Array(50)
      .fill(0)
      .map((_, i) => ({
        name: "Olle",
        surname: `Bolle-${i}`,
        pnr: `0113-80113${i}`,
        email: `olle${i}@bolle.ob`,
        status: "UNHANDLED",
      })),
  });
  await prisma.user.createMany({
    data: Array(50)
      .fill(0)
      .map((_, i) => ({
        username: `OlleBolle${i}`,
        password: bcrypt.hashSync(`OlleBolle${i}`, 10),
        role_id: 2,
        application_id: i + 1,
      })),
  });
  await prisma.competence_profile.createMany({
    data: Array(100)
      .fill(0)
      .map((_, i) => ({
        years_of_experience: Math.floor(Math.random() * 8),
        competence_id: Math.floor(Math.random() * 2 + 1),
        application_id: Math.floor(Math.random() * 49 + 1),
      })),
  });

  const getDates = () => {
    const from_date = moment().add(Math.floor(Math.random() * 90), "days");
    return {
      from_date: from_date.toDate(),
      to_date: moment(from_date)
        .add(Math.floor(Math.random() * 7), "days")
        .toDate(),
    };
  };

  await prisma.availability.createMany({
    data: Array(300)
      .fill(0)
      .map((_, i) => ({
        ...getDates(),
        application_id: Math.floor(Math.random() * 49 + 1),
      })),
  });*/

  await prisma.application.create({
    data: {
      name: "Thor",
      surname: "Odinson",
      pnr: "123456-7890",
      email: "thor.odinson@thunder.vh",
      competence_profile: {
        create: [
          {
            years_of_experience: 1,
            competence_id: 1,
          },
          {
            years_of_experience: 2,
            competence_id: 2,
          },
        ],
      },
      availability: {
        create: [
          {
            from_date: new Date("2023-06-01"),
            to_date: new Date("2023-08-01"),
          },
        ],
      },
      user: {
        create: {
          username: "thor",
          password: bcrypt.hashSync("thor", 10),
          role_id: 2, // applicant
        },
      },
    },
  });

  await prisma.application.create({
    data: {
      name: "Kalle",
      surname: "Anka",
      pnr: "123456-7890",
      email: "kalle.ank@burg.se",
      status: "UNHANDLED",
      competence_profile: {
        create: [
          {
            years_of_experience: 2,
            competence_id: 2,
          },
          {
            years_of_experience: 4,
            competence_id: 3,
          },
        ],
      },
      availability: {
        create: [
          {
            from_date: new Date("2023-06-01"),
            to_date: new Date("2023-08-01"),
          },
          {
            from_date: new Date("2023-05-02"),
            to_date: new Date("2023-05-07"),
          },
        ],
      },
      user: {
        create: {
          username: "Kalle",
          password: bcrypt.hashSync("kalle", 10),
          role_id: 2, // applicant
        },
      },
    },
  });

  // old applications with no user
  await prisma.application.createMany({
    data: Array(20)
      .fill(0)
      .map((_, i) => ({
        name: `Plink${i}`,
        surname: `Plonk${i}`,
        pnr: "123456-7890",
        email: `plinnk${i}.plonkee@thunder.vh`,
      })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
