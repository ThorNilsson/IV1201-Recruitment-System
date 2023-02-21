import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const HASH_ROUNDS = 10;

export const signupValidationObject = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  email: z.string().min(4).email(),
  pnr: z.string().min(10).max(12),
  surname: z.string().min(1),
  name: z.string().min(1),
});

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
  signup: publicProcedure.input(signupValidationObject).mutation(async ({ input, ctx }) => {
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
