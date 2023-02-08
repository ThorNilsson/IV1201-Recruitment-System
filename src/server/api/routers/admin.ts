import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { application_status } from "@prisma/client";

export const adminRouter = createTRPCRouter({
  /* Queries */
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
  getCompetences: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.competence.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
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
  updateApplicationStatus: protectedProcedure
    .input(z.object({ id: z.number(), status: z.enum(["ACCEPTED", "UNHANDLED", "REJECTED"]) }))
    //TODO: Ue enum from prisma client instead of strings Object.values(application_status)
    //TODO: Add date validation to not edit old applications (createdAt)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.application.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
