import * as z from "zod";

export const formLoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).toLowerCase().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Registration schema - all fields required
export const formRegistrationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces" }),

    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .toLowerCase(),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password must be less than 100 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),

    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Profile update schema - password is optional
export const formProfileUpdateSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces" }),

    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .toLowerCase(),

    password: z
      .string()
      .optional()
      .refine(
        (val) => {
          // If password is provided, validate it
          if (!val || val === "") return true;
          return val.length >= 8;
        },
        { message: "Password must be at least 8 characters" }
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return val.length <= 100;
        },
        { message: "Password must be less than 100 characters" }
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[a-z]/.test(val);
        },
        { message: "Password must contain at least one lowercase letter" }
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[A-Z]/.test(val);
        },
        { message: "Password must contain at least one uppercase letter" }
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[0-9]/.test(val);
        },
        { message: "Password must contain at least one number" }
      ),

    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only validate password match if password is provided
      if (!data.password || data.password === "") return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type LoginFormValues = z.infer<typeof formLoginSchema>;
export type RegistrationFormValues = z.infer<typeof formRegistrationSchema>;
export type ProfileUpdateFormValues = z.infer<typeof formProfileUpdateSchema>;