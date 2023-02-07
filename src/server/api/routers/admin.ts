import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  /* Queries */
  getFilterdUserPrev: publicProcedure.input(z.object({ filter: z.string().nullable() })).query(async ({ ctx }) => {
    return ctx.prisma.person.findMany({
      skip: 0,
      take: 10,
      where: {
        competence_profile: {
          some: {
            status: "UNHANDLED",
          },
        },
      },
      select: {
        id: true,
        name: true,
        surname: true,
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
