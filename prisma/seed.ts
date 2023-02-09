import { application, PrismaClient } from "@prisma/client";

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
  await prisma.competence.createMany({
    data: [
      {
        // id: 1,
        name: "ticket sales",
      },
      {
        // id: 2,
        name: "lotteries",
      },
      {
        // id: 3,
        name: "roller coaster operation",
      },
    ],
  });
  // 10 admins
  await prisma.user.createMany({
    data: Array(10)
      .fill(0)
      .map((_, i) => ({
        username: `some_admin${i + 1}`,
        password: "oogabooga",
        role_id: 1,
      })),
  });
  await prisma.user.createMany({
    data: [
      {
        username: "a",
        password: "a",
        role_id: 1, // admin
      },
      {
        username: "alice",
        password: "alice",
        role_id: 2, // applicant
      },
      {
        username: "bob",
        password: "bob",
        role_id: 2,
      },
    ],
  });
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
          password: "thor",
          role_id: 2, // applicant
        },
      },
    },
  });
  // old applications with no user
  await prisma.application.createMany({
    data: Array(100)
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
