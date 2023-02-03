import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  /* Queries */
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.email) return null;

    return ctx.prisma.user.findUnique({
      where: { id: parseInt(ctx.session.user.email) },
      select: {
        username: true,
        role_id: true,
        person_id: true,
        role: { select: { name: true } },
      },
    });
  }),
  /* Mutations */
  signup: publicProcedure
    .input(
      z.object({ username: z.string(), password: z.string(), email: z.string(), pnr: z.string(), surname: z.string() }),
    )
    .mutation(async ({ input, ctx }) => {
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(input.password, salt);

      return ctx.prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
          role: { connect: { id: 2 } },
          person: {
            create: {
              name: input.username,
              surname: input.surname,
              pnr: input.pnr,
              email: input.email,
            },
          },
        },
      });
    }),
});
