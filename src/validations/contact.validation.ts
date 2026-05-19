import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z
    .string({
      error: "Nama wajib diisi",
    })
    .min(2, {
      message: "Nama minimal 2 karakter",
    }),

  email: z
    .string({
      error: "Email wajib diisi",
    })
    .email({
      message: "Format email tidak valid",
    }),

  subject: z
    .string({
      error: "Subject wajib diisi",
    })
    .optional(),

  message: z
    .string({
      error: "Pesan wajib diisi",
    })
    .min(10, {
      message: "Pesan minimal 10 karakter",
    }),

  category: z
    .enum([
      "GENERAL",
      "FREELANCE",
      "COLLABORATION",
      "CONSULTATION",
      "BUG",
    ], {
      error: "Kategori tidak valid",
    })
    .optional(),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED", "SPAM"]),
});

export const replyContactMessageSchema = z.object({
  replyMessage: z.string().min(5),
});