import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  /* Queries */
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.email) return null;

    return ctx.prisma.person.findUnique({
      where: { person_id: parseInt(ctx.session.user.email) },
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
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(input.password, salt);

      return ctx.prisma.person.create({
        data: {
          username: input.username,
          password: input.password,
          //salt: salt,
          role_id: 1,
        },
      });
    }),
});
