import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
  category: z
    .enum(["GENERAL", "FREELANCE", "COLLABORATION", "CONSULTATION", "BUG"])
    .optional(),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED", "SPAM"]),
});

export const replyContactMessageSchema = z.object({
  replyMessage: z.string().min(5),
});