import { z } from "zod";

// Register Roles
const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password is required")
      .min(6, "Password must be at least 6 characters long!"),
    role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"]).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

// Login Roles
const loginvalidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required!")
      .email("Invalid email address!"),
    password: z.string().min(1, "Password is required!"),
  }),
});

export const authValidation = {
  registerValidationSchema,
  loginvalidationSchema,
};
