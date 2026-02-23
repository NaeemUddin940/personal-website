import { z } from "zod";

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required") // Khali rakha jabe na
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
