import { z } from "zod";

export const taxFormSchema = z.object({
  taxYear: z.enum(["2024", "2025"]),
  filingStatus: z.enum([
    "single",
    "married_joint",
    "married_separate",
    "head_of_household",
    "qualifying_surviving_spouse",
  ]),
  annualGrossIncome: z
    .number()
    .min(0, "Annual gross income must be at least $0")
    .max(10000000, "Annual gross income cannot exceed $10,000,000"),
  age: z
    .number()
    .int("Age must be a whole number")
    .min(0, "Age must be at least 0")
    .max(120, "Age cannot exceed 120"),
  isBlind: z.boolean(),
  deductionType: z.enum(["standard", "itemized"]),
  itemizedDeductions: z
    .number()
    .min(0, "Itemized deductions must be at least $0")
    .max(1000000, "Itemized deductions cannot exceed $1,000,000"),
  taxesWithheld: z
    .number()
    .min(0, "Taxes withheld must be at least $0")
    .max(1000000, "Taxes withheld cannot exceed $1,000,000"),
  // Advanced fields
  k401Contributions: z
    .number()
    .min(0, "401(k) contributions must be at least $0")
    .max(1000000, "401(k) contributions cannot exceed $1,000,000"),
  iraContributions: z
    .number()
    .min(0, "IRA contributions must be at least $0")
    .max(1000000, "IRA contributions cannot exceed $1,000,000"),
  otherDeductions: z
    .number()
    .min(0, "Other deductions must be at least $0")
    .max(1000000, "Other deductions cannot exceed $1,000,000"),
  taxCredits: z
    .number()
    .min(0, "Tax credits must be at least $0")
    .max(1000000, "Tax credits cannot exceed $1,000,000"),
});

export type TaxFormSchema = z.infer<typeof taxFormSchema>;
