import { z } from "zod";

const stackSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value.split(",").map((item) => item.trim());
    }
  }

  return value;
}, z.array(z.string().min(1, "Stack tidak boleh kosong")).optional());

export const createProjectValidation = z.object({
  title: z.string().min(2, "Title minimal 2 karakter"),

  category: z.string().min(2, "Category minimal 2 karakter"),

  description: z.string().optional(),

  hoverDescription: z.string().optional(),

  period: z.string().optional(),

  gradient: z.string().optional(),

  url: z
    .string()
    .url("URL project tidak valid")
    .optional()
    .or(z.literal("")),

  codeDocumentation: z
    .string()
    .url("URL dokumentasi/code tidak valid")
    .optional()
    .or(z.literal("")),

  stacks: stackSchema,
});

export const updateProjectValidation = z.object({
  title: z
    .string()
    .min(2, "Title minimal 2 karakter")
    .optional(),

  category: z
    .string()
    .min(2, "Category minimal 2 karakter")
    .optional(),

  description: z.string().optional(),

  hoverDescription: z.string().optional(),

  period: z.string().optional(),

  gradient: z.string().optional(),

  url: z
    .string()
    .url("URL project tidak valid")
    .optional()
    .or(z.literal("")),

  codeDocumentation: z
    .string()
    .url("URL dokumentasi/code tidak valid")
    .optional()
    .or(z.literal("")),

  stacks: stackSchema.optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectValidation>;
export type UpdateProjectInput = z.infer<typeof updateProjectValidation>;