import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { adminRouter } from "./routers/admin";
import { migrationRouter } from "./routers/migrate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  admin: adminRouter,
  migration: migrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
