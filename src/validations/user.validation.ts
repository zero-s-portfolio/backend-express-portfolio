import { z } from "zod";

export const createUserValidation = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserValidation = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type CreateUserInput = z.infer<typeof createUserValidation>;
export type UpdateUserInput = z.infer<typeof updateUserValidation>;