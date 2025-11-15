// schemas.ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone looks too long"),
  gender: z.enum(["Male", "Female", "Other"] as const).optional(),
  dob: z
    .string()
    .optional()
    .refine((v) => !v || !isNaN(Date.parse(v)), "Invalid date"),
});

export const medicalHistorySchema = z.object({
  bloodGroup: z.enum([
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ] as const),
  activeHealthIssues: z.string().optional(),
  feelingWellToday: z.enum(["Yes", "No"] as const),
});

export const donationPreferenceSchema = z.object({
  donationType: z.enum(["Whole Blood", "Platelets", "Plasma"] as const),
  locationAvailable: z.string().min(2, "Location required"),
  canWeContact: z.enum(["Yes", "No"] as const),
});

export const fullMultiStepFormSchema = z.object({
  personal: personalInfoSchema,
  medical: medicalHistorySchema,
  donation: donationPreferenceSchema,
});

export type FullMultiStepForm = z.infer<typeof fullMultiStepFormSchema>;
