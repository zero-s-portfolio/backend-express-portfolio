import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  return error.issues.reduce((acc, issue) => {
    acc[issue.path.join(".")] = issue.message;
    return acc;
  }, {} as Record<string, string>);
};