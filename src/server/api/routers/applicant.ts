import { z } from "zod";
import { createTRPCRouter, applicantProcedure, protectedProcedure } from "../trpc";
import { language } from "@prisma/client";

export const applicantRouter = createTRPCRouter({
  /* Queries */
  /**
   *  @returns {Promise<Competence[]>} - Array of competences
   *  @description - Get all competences with id and name
   */
  getCompetences: protectedProcedure.input(z.object({ lang: z.string() })).query(async ({ ctx, input }) => {
    return ctx.prisma.competence.findMany({
      select: {
        id: true,
        competence_name: {
          select: {
            lang: true,
            name: true,
          },
          where: {
            lang: input.lang as language,
          },
        }
      },
    });
  }),
  /**
   * @returns {Promise<Application>} - The application associated with the calling user
   * @description - Get an application associated with the calling user, including competence profiles and availabilies
   */
  getApplication: applicantProcedure.query(async ({ ctx }) => {
    const id = parseInt(ctx.session.user.email || "");
    if (Number.isNaN(id)) {
      return null;
    }
    return ctx.prisma.user
      .findUnique({
        where: {
          id,
        },
        select: {
          application: {
            include: {
              availability: true,
              competence_profile: {
                include: {
                  competence: {
                    include: {
                      competence_name: true,
                    }
                  },
                },
              },
            },
          },
        },
      })
      .then((user) => user?.application);
  }),

  /* Mutations */

  // /**
  //  * @param id - The id of the application to update the status of
  //  * @param status - The status to update the application to
  //  * @param updatedAt - The updatedAt value to check against to ensure that the application has not been updated since the last time it was fetched
  //  * @returns {Promise<Prisma.BatchPayload>} - The number of applications that were updated (should be 1)
  //  * @description - Updates the status of an application
  //  */
  // updateApplication: applicantProcedure
  //   .input(z.object({ id: z.number(), status: z.nativeEnum(application_status), updatedAt: z.date() }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.prisma.application.updateMany({
  //       where: {
  //         id: input.id,
  //         updatedAt: input.updatedAt,
  //         status: {
  //           not: input.status,
  //         },
  //       },
  //       data: {
  //         status: input.status,
  //       },
  //     });
  //   }),
});
