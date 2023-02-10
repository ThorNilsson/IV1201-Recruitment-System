/**
 * @file - admin.ts
 * @description - Contains all the api routes for the admin page
 * @author - Thor Nilsson
 * @exports adminRouter - TRPC router
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { application_status } from "@prisma/client";

export const adminRouter = createTRPCRouter({
  /* Queries */
  /**
   * @param filter - Array of competences to filter by
   * @returns {Promise<number>} - Array of applications
   * @description - Get the number of unhandled applications filterd (used for pagination)
   */
  getFilterdApplicationPreviewCount: adminProcedure
    .input(z.object({ filter: z.string().array() }))
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
  getFilterdApplicationPrev: publicProcedure
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
   *  @returns {Promise<Competence[]>} - Array of competences
   *  @description - Get all competences with id and name
   */
  getCompetences: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.competence.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  /**
   * @param id - The id of the application to get
   * @returns {Promise<Application>} - The application with the given id
   * @description - Get an application with the given id, including competence profiles and availabilies
   */
  getApplication: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
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
  updateApplicationStatus: protectedProcedure
    .input(z.object({ id: z.number(), status: z.nativeEnum(application_status), updatedAt: z.date() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.application.updateMany({
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
    }),
});
