import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    }),

  email: z
    .string({
      error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),

  subject: z
    .string({
      error: "Subject is required",
    })
    .optional(),

  message: z
    .string({
      error: "Message is required",
    })
    .min(10, {
      message: "Message must be at least 10 characters",
    }),

  category: z
    .enum(
      [
        "GENERAL",
        "FREELANCE",
        "COLLABORATION",
        "CONSULTATION",
        "BUG",
      ],
      {
        error: "Invalid category",
      }
    )
    .optional(),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(
    ["UNREAD", "READ", "REPLIED", "ARCHIVED", "SPAM"],
    {
      error: "Invalid status",
    }
  ),
});

export const replyContactMessageSchema = z.object({
  replyMessage: z
    .string({
      error: "Reply message is required",
    })
    .min(5, {
      message: "Reply message must be at least 5 characters",
    }),
});