import { z } from "zod";

export const LIFESTYLE_OPTIONS = [
  { value: "sedentary", label: "Sedentary", description: "Office job, no exercise" },
  { value: "lightly_active", label: "Lightly Active", description: "1-3 workouts per week" },
  { value: "active", label: "Active", description: "4-5 workouts per week" },
  { value: "very_active", label: "Very Active", description: "Daily workouts" },
] as const;

export const LifestyleSchema = z.enum(["sedentary", "lightly_active", "active", "very_active"]);
export type LifestyleType = z.infer<typeof LifestyleSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  age?: number;
  weight?: number;
  lifestyle?: LifestyleType;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterStep1Payload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterStep2Payload {
  phone?: string;
  age?: number;
  weight?: number;
  lifestyle?: LifestyleType;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const LoginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterFormSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const OnboardingFormSchema = z.object({
  phone: z.string().trim().optional().or(z.literal("")),
  age: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? Number(v) : undefined))
    .refine((v) => v === undefined || (v >= 10 && v <= 100), "Age must be between 10 and 100"),
  weight: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? Number(v) : undefined))
    .refine(
      (v) => v === undefined || (v >= 10 && v <= 200),
      "Weight must be between 10 and 200 kg",
    ),
  lifestyle: LifestyleSchema.optional(),
});
