import { z } from "zod";

export const createSkillValidation = z.object({
  title: z.string().min(2),
});

export const updateSkillValidation = z.object({
  title: z.string().min(2).optional(),
});

export type CreateSkillInput = z.infer<typeof createSkillValidation>;
export type UpdateSkillInput = z.infer<typeof updateSkillValidation>;