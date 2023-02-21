import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const HASH_ROUNDS = 10;

export const authRouter = createTRPCRouter({
  /* Queries */
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.email) return null;

    return ctx.prisma.user.findUnique({
      where: { id: parseInt(ctx.session.user.email) },
      select: {
        username: true,
        //role_id: true,
        //person_id: true,
        role: { select: { name: true } },
      },
    });
  }),
  /* Mutations */
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
        pnr: z.string(),
        surname: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await bcrypt.hash(input.password, HASH_ROUNDS);

      return ctx.prisma.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
          role: { connect: { id: 2 } },
          application: {
            create: {
              email: input.email,
              pnr: input.pnr,
              surname: input.surname,
              name: input.name,
            },
          },
        },
      });
    }),
});
