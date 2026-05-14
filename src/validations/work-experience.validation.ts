import { z } from "zod";

export const createWorkExperienceValidation = z.object({
  company: z.string().min(2, "Company minimal 2 karakter"),
  role: z.string().min(2, "Role minimal 2 karakter"),
  period: z.string().min(2, "Period minimal 2 karakter"),
  description: z.string().optional(),
  skills: z.array(z.string().min(1, "Skill tidak boleh kosong")).optional(),
});

export const updateWorkExperienceValidation = z.object({
  company: z.string().min(2, "Company minimal 2 karakter").optional(),
  role: z.string().min(2, "Role minimal 2 karakter").optional(),
  period: z.string().min(2, "Period minimal 2 karakter").optional(),
  description: z.string().optional(),
  skills: z.array(z.string().min(1, "Skill tidak boleh kosong")).optional(),
});

export type CreateWorkExperienceInput = z.infer<
  typeof createWorkExperienceValidation
>;

export type UpdateWorkExperienceInput = z.infer<
  typeof updateWorkExperienceValidation
>;