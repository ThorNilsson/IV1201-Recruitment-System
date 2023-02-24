# Lisseborg Recruitment App

IV1201 project

## Description

Lisseborg Recruitment App is schoolproject in the course "Arkitektur och design av globala applikationer" at KTH for group 5.
The system distinguishes between two types of users, applicants and recruiters. An applicant applies for a position within the company while a
recruiter manages applications. The system is divided into two parts: The
registration of job applications and the administration of applications.
It was not necessary to implement all the functionality but most of it was done anyway.

The project was done by using the T3 Stack which consisted the parts that can be read below.
The project was done for school but is open for future developers to keep on working with it.
## How to run
1. Simply clone the repo/project
2. Run "npm install" - this will install all the necessary dependencies and create/recreate the Prisma client which is the interface to the database.
4. Copy the .env.example and rename to .env and make sure to the envirement variables are up to date.
3. After that run "npm run dev" to get the application running.
4. Now the application should be up and running on your localhost (http://localhost:3000)

## Other functionalities
1. To view the database run "npx prsima studio"
2. To seed the test database run "npm run db:reset" and "npm run db:seed"
3. To add a new language copy the locale-se.ts file in the languages folder and rename to "locale-[insert two letter country code].ts" and do your translations. The translation files need to have the same fields as the default "locale-en.ts" file or else typescript will mark the errors.
4. To enable linting download the Rome pluggin in VS code.
5. To enable typescript download the JavaScript and TypeScript pluggin in VS code.
6. To run a test locally run "npm run test-e2e"
7. To run a build locally run "npm run build"

## Development

### Front-end to Back-end stack

This is a T3 Stack project bootstrapped with `create-t3-app`.
If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [T3 Documentation](https://create.t3.gg)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

### Data layer

Uses a Postgres database hosted on [Neon](https://neon.tech).
TODO: main branch = old DB, new branch = prod, dev branch = dev, CI generates branches

Here are the relevant resources for this project:

- [Use Prisma with Neon](https://neon.tech/docs/guides/prisma-guide)
- [Manage API keys](https://neon.tech/docs/manage/api-keys) - How to get an API key for use in CI
- [Manage branches](https://neon.tech/docs/manage/branches) - How to manage brances (used by CI)
