import { PrismaClient } from "@prisma/client";

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
