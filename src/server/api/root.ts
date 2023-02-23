import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { adminRouter } from "./routers/admin";
import { migrationRouter } from "./routers/migrate";
import { applicantRouter } from "./routers/applicant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  applicant: applicantRouter,
  auth: authRouter,
  migration: migrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
