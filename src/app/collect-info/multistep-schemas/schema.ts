import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must be at most 15 characters"),

  dob: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone too long"),

  //   gender: z.enum(["Male", "Female", "Other"] as const, "Gender is required"),
});

export const medicalHistorySchema = z.object({
  bloodGroup: z.enum(
    ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const,
    "Blood group is required"
  ),

  // optional free text (allow empty string)
  activeHealthIssues: z.string().optional(),

  // yes/no as a literal union (also works with z.enum)
  feelingWellToday: z.enum(["Yes", "No"] as const, "Please select an option"),
});

export const donationPreferenceSchema = z.object({
  donationType: z.enum(
    ["Whole Blood", "Platelets", "Plasma"] as const,
    "Donation type is required"
  ),

  locationAvailable: z.string().min(2, "Location is required"),

  canWeContact: z.enum(["Yes", "No"] as const, "Please choose an option"),
});

export const fullMultiStepFormSchema = z.object({
  personal: personalInfoSchema,
  medical: medicalHistorySchema,
  donation: donationPreferenceSchema,
});

export type FullMultiStepForm = z.infer<typeof fullMultiStepFormSchema>;
