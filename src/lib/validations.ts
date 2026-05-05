import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const registerSchema = z
  .object({
    firstname: requiredString
      .min(2, "First name must be at least 2 characters")
      .regex(/^[a-z]+$/i, "Only letters are allowed")
      .max(35, "First name must be not more than 35 characters"),
    lastname: requiredString
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[a-z]+$/i, "Only letters are allowed")
      .max(35, "Last name must be not more than 35 characters"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: requiredString
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
        "Password must contain a lowercase letter, an uppercase letter, a number and a special character",
      )
      .max(32, "Password is too long"),
    confirmPassword: requiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const checkEmailSchema = z.object({
  type: z.enum(["account-creation", "forgot-password"]),
});

export type CheckEmailValues = z.infer<typeof checkEmailSchema>;
