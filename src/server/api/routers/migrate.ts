import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { migrationValidationObject } from "../../../validation/validation";
import { HASH_ROUNDS } from "./auth";
import { TRPCError } from "@trpc/server";
import { logger } from "../../log";
import { z } from "zod";
import { randomUUID } from "crypto";

export const migrationRouter = createTRPCRouter({
  /**
   * Step 1 - Request a url for a old applicaion
   * @param email - The email of the old application
   * @returns {Url<string>} - URL
   * @description - Creates a url to the induvidual form to create a new user for the old application
   */
  migrationRequest: publicProcedure.input(z.object({ email: z.string() })).mutation(async ({ ctx, input }) => {
    const application = await ctx.prisma.application.findFirst({
      where: {
        email: input.email,
        user: {
          is: null,
        },
      },
      select: {
        id: true,
      },
    });

    if (application?.id === undefined) {
      logger.error(`${input.email} tried to create url to migrate old application but no application was found`);
      throw new TRPCError({ code: "NOT_FOUND", message: "Old Application not found" });
    }

    const migration = await ctx.prisma.migration.create({
      data: {
        url: randomUUID(),
        application: {
          connect: {
            id: application.id,
          },
        },
      },
    });

    logger.info(`A URL was created for  old application ${application.id}`);
    return migration.url;
  }),

  /**
   * Step 2 - Go to the url and fill the new password and username
   * @param URL - The url to the old application
   * @returns {Promise<Application>} - The application
   * @description - Gets the application by the url
   */
  getAplicationByURL: publicProcedure.input(z.object({ URL: z.string() })).query(async ({ ctx, input }) => {
    return ctx.prisma.application
      .findFirstOrThrow({
        where: {
          migration: {
            url: input.URL,
          },
        },
      })
      .catch((err) => {
        logger.error(`Someone tried to update old application but no migration was found with url ${input.URL}`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Migration not found" });
      });
  }),

  /**
   * Step 3 - Create a new user for the old application
   * @param id - The id of the application to update the status of
   * @param status - The status to update the application to
   * @param updatedAt - The updatedAt value to check against to ensure that the application has not been updated since the last time it was fetched
   * @returns {Promise<Prisma.BatchPayload>} - The number of applications that were updated (should be 1)
   * @description - Updates the status of an application
   */
  createUserForOldApplication: publicProcedure.input(migrationValidationObject).mutation(async ({ ctx, input }) => {
    const migration = await ctx.prisma.migration.findFirst({
      where: {
        url: input.URL,
      },
      select: {
        application_id: true,
      },
    });

    if (!migration) {
      logger.error(`Someone tried to update old application but no migration was found with url ${input.URL}`);
      throw new TRPCError({ code: "NOT_FOUND", message: "Migration not found" });
    }

    const hashedPassword = await bcrypt.hash(input.password, HASH_ROUNDS);

    const newUser = await ctx.prisma.user.upsert({
      where: {
        application_id: migration.application_id,
      },
      update: {}, // Update nothing
      create: {
        username: input.username,
        password: hashedPassword,
        role: {
          connect: { id: 2 }, // Applicants
        },
        application: {
          connect: { id: migration.application_id },
        },
      },
    });

    if (newUser === null) {
      logger.error(`Failed to create user for old application ${migration.application_id}`);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create user" });
    }

    logger.info(`New user was created for old application ${migration.application_id}`);

    return newUser;
  }),
});
