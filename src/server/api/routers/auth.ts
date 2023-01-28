import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
	/* Queries */
	getUser: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.session?.user.email) return null;

		return ctx.prisma.user.findUnique({
			where: { id: ctx.session.user.email },
			select: { username: true, userRole: true, id: true },
		});
	}),
	/* Mutations */
	signup: publicProcedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(input.password, salt);

			return ctx.prisma.user.create({
				data: {
					username: input.username,
					hashedPassword: hashedPassword,
					salt: salt,
					userRole: "USER",
				},
			});
		}),
});
