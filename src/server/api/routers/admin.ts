import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../trpc";
import { application_status } from "@prisma/client";
import { logger } from "../../log";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  /* Queries */
  /**
   * @param filter - Array of competences to filter by
   * @returns {Promise<number>} - Array of applications
   * @description - Get the number of unhandled applications filterd (used for pagination)
   */
  getFilterdApplicationPreviewCount: adminProcedure
    .input(z.object({ filter: z.string().array() }))
    .output(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.application.count({
        where: {
          status: application_status.UNHANDLED,
          competence_profile:
            input.filter.length > 0
              ? {
                  some: {
                    competence: {
                      name: {
                        in: input.filter,
                      },
                    },
                  },
                }
              : {},
        },
      });
    }),
  /**
   * @param filter - Array of competences to filter by
   * @param skip - How many applications to skip
   * @param take - How many applications to take
   * @returns {Promise<Application[]>} - Array of applications
   * @description - Get all applications that are unhandled and filtered by competences, if no competences are provided all unhandled applications will return
   */
  getFilterdApplicationPrev: adminProcedure
    .input(z.object({ filter: z.string().array(), skip: z.number().nullable(), take: z.number().nullable() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.application.findMany({
        skip: input.skip || 0,
        take: input.take || 20,
        where: {
          status: application_status.UNHANDLED,
          competence_profile:
            input.filter.length > 0
              ? {
                  some: {
                    competence: {
                      name: {
                        in: input.filter,
                      },
                    },
                  },
                }
              : {},
        },
        select: {
          id: true,
          name: true,
          surname: true,
          status: true,
          createdAt: true,
        },
      });
    }),
  /**
   * @param id - The id of the application to get
   * @returns {Promise<Application>} - The application with the given id
   * @description - Get an application with the given id, including competence profiles and availabilies
   */
  getApplication: adminProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return ctx.prisma.application.findUnique({
      where: {
        id: input.id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        pnr: true,
        competence_profile: {
          include: {
            competence: true,
          },
        },
        availability: true,
      },
    });
  }),

  /* Mutations */

  /**
   * @param id - The id of the application to update the status of
   * @param status - The status to update the application to
   * @param updatedAt - The updatedAt value to check against to ensure that the application has not been updated since the last time it was fetched
   * @returns {Promise<Prisma.BatchPayload>} - The number of applications that were updated (should be 1)
   * @description - Updates the status of an application
   */
  updateApplicationStatus: adminProcedure
    .input(z.object({ id: z.number(), status: z.nativeEnum(application_status), updatedAt: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const numberOfUpdatedApplications = await ctx.prisma.application.updateMany({
        where: {
          id: input.id,
          updatedAt: input.updatedAt,
          status: {
            not: input.status,
          },
        },
        data: {
          status: input.status,
        },
      });

      if (numberOfUpdatedApplications.count !== 1) {
        logger.error(`Application ${input.id} was not updated by user ${ctx.session.user.email}`);
        throw new TRPCError({ code: "CONFLICT", message: "Application was not updated" });
      }

      logger.info(`Application ${input.id} had status changed to ${input.status} by user ${ctx.session.user.email}`);

      return true;
    }),
});
