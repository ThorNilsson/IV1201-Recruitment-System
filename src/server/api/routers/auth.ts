import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { signupValidationObject } from "../../../validation/validation";
import { logger } from "../../log";

export const HASH_ROUNDS = 10;

export const authRouter = createTRPCRouter({
  /* Queries */
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.email) return null;

    return ctx.prisma.user.findUnique({
      where: { id: parseInt(ctx.session.user.email) },
      select: {
        username: true,
        role: { select: { name: true } },
      },
    });
  }),

  /* Mutations */
  signup: publicProcedure.input(signupValidationObject).mutation(async ({ input, ctx }) => {
    const hashedPassword = await bcrypt.hash(input.password, HASH_ROUNDS);

    const user = await ctx.prisma.user.create({
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

    logger.info(`User ${user.id} was created`);

    return user;
  }),
});
