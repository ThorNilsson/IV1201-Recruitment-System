import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { signupValidationObject } from "../../../validation/validation";
import { logger } from "../../log";
import { TRPCError } from "@trpc/server";

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

    const existingUsername = await ctx.prisma.user.findFirst({
      where: { username: input.username },
    });

    const existingEmail = await ctx.prisma.application.findFirst({
      where: { email: input.email },
    });

    const existingPersonalNumber = await ctx.prisma.application.findFirst({
      where: { pnr: input.pnr },
    });

    if (existingUsername || existingEmail || existingPersonalNumber) {
      logger.info("User username email or pnr already exists");
      throw new TRPCError({ message: "User already exists", code: "PRECONDITION_FAILED" });
    }

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
