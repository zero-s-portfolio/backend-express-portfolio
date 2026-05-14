import { z } from "zod";

export const createSettingSectionValidation = z.object({
  key: z.string().min(2, "Key minimal 2 karakter"),
  value: z.string().min(1, "Value wajib diisi"),
  url: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export const updateSettingSectionValidation = z.object({
  key: z.string().min(2, "Key minimal 2 karakter").optional(),
  value: z.string().min(1, "Value wajib diisi").optional(),
  url: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export type CreateSettingSectionInput = z.infer<
  typeof createSettingSectionValidation
>;

export type UpdateSettingSectionInput = z.infer<
  typeof updateSettingSectionValidation
>;