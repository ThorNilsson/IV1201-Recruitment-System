import { z } from "zod";

export const migrationValidationObject = z.object({
  email: z.string().min(4).email(),
  username: z.string().min(4),
  password: z.string().min(6),
});

export const signupValidationObject = migrationValidationObject.extend({
  pnr: z.string().min(10).max(12),
  surname: z.string().min(1),
  name: z.string().min(1),
});
