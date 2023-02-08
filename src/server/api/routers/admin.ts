import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { application_status } from "@prisma/client";

export const adminRouter = createTRPCRouter({
  /* Queries */
  getFilterdApplicationPrev: publicProcedure
    .input(z.object({ filter: z.string().nullable() }))
    .query(async ({ ctx }) => {
      return ctx.prisma.application.findMany({
        skip: 0,
        take: 10,
        where: {
          status: application_status.UNHANDLED,
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
});
