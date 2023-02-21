import { z } from "zod";

export const loginValidationObject = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const migrationValidationObject = loginValidationObject.extend({
  email: z.string().min(4).email(),
});

export const signupValidationObject = migrationValidationObject.extend({
  pnr: z.string().min(10).max(12),
  surname: z.string().min(1),
  name: z.string().min(1),
});
