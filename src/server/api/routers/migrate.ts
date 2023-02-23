/**
 * @file - migrate.ts
 * @description - Contains all the api routes for the migrate account page
 * @author - Thor Nilsson
 * @exports migrationRouter - TRPC router
 */

import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { migrationValidationObject } from "../../../validation/validation";
import { HASH_ROUNDS } from "./auth";

export const migrationRouter = createTRPCRouter({
  /**
   * @param id - The id of the application to update the status of
   * @param status - The status to update the application to
   * @param updatedAt - The updatedAt value to check against to ensure that the application has not been updated since the last time it was fetched
   * @returns {Promise<Prisma.BatchPayload>} - The number of applications that were updated (should be 1)
   * @description - Updates the status of an application
   */
  createUserForOldApplication: publicProcedure.input(migrationValidationObject).mutation(async ({ ctx, input }) => {
    //Find application id by email address
    const application = await ctx.prisma.application.findUniqueOrThrow({
      where: {
        email: input.email,
      },
      select: {
        id: true,
      },
    });
    const hashedPassword = await bcrypt.hash(input.password, HASH_ROUNDS);
    //Update user with nothing if it exists, else create user and connect to application
    return ctx.prisma.user.upsert({
      where: {
        application_id: application.id,
      },
      update: {},
      create: {
        username: input.username,
        password: hashedPassword,
        role: {
          connect: { id: 2 }, // Applicants
        },
        application: {
          connect: { id: application.id },
        },
      },
    });
  }),
});
