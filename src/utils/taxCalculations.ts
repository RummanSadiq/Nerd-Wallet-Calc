import {
  TaxFormData,
  TaxCalculation,
  TaxYear,
  FilingStatus,
} from "../types/tax";
import { taxData } from "../data/taxData";

export function calculateTax(formData: TaxFormData): TaxCalculation {
  // 1. Adjusted income inputs
  const adjustedGrossIncome =
    formData.annualGrossIncome -
    formData.k401Contributions -
    formData.iraContributions -
    formData.otherDeductions;

  // 2. Calculate standard deduction (including age 65+ and blind add-ons)
  const standardDeduction = calculateStandardDeduction(
    formData.taxYear,
    formData.filingStatus,
    formData.age,
    formData.isBlind
  );

  // 3. Determine deduction taken
  const deductionTaken =
    formData.deductionType === "standard"
      ? standardDeduction
      : formData.itemizedDeductions;

  // 4. Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionTaken);

  // 5. Calculate regular tax using progressive brackets
  const regularTax = calculateRegularTax(
    formData.taxYear,
    formData.filingStatus,
    taxableIncome
  );

  // 6. Apply nonrefundable credits
  const taxAfterCredits = Math.max(0, regularTax - formData.taxCredits);

  // 7. Compare to payments withheld
  const net = formData.taxesWithheld - taxAfterCredits;

  // 8. Determine refund or amount owed
  const refundOrOwed =
    net >= 0 ? { refund: net } : { amountOwed: Math.abs(net) };

  // Calculate tax rates
  const effectiveTaxRate =
    formData.annualGrossIncome > 0
      ? (taxAfterCredits / formData.annualGrossIncome) * 100
      : 0;

  const marginalTaxRate = calculateMarginalTaxRate(
    formData.taxYear,
    formData.filingStatus,
    taxableIncome
  );

  return {
    adjustedGrossIncome,
    standardDeduction,
    deductionTaken,
    taxableIncome,
    regularTax,
    taxAfterCredits,
    net,
    refundOrOwed,
    effectiveTaxRate,
    marginalTaxRate,
    breakdown: {
      grossIncome: formData.annualGrossIncome,
      standardDeduction:
        formData.deductionType === "standard" ? deductionTaken : 0,
      retirementContributions:
        formData.k401Contributions + formData.iraContributions,
      otherDeductions: formData.otherDeductions,
      taxableIncome,
      taxesBeforeAdjustments: regularTax,
      federalTaxesWithheld: formData.taxesWithheld,
      taxCredits: formData.taxCredits,
      taxesOwed: taxAfterCredits,
    },
  };
}

export function calculateStandardDeduction(
  taxYear: TaxYear,
  filingStatus: FilingStatus,
  age: number,
  isBlind: boolean
): number {
  const yearData = taxData.standard_deduction[taxYear];
  let deduction = yearData.base[filingStatus];

  // Add additional standard deduction for age 65+ and blind
  let additionalAmount = 0;

  // Determine which additional amount to use based on filing status
  const isSingleOrHOH =
    filingStatus === "single" || filingStatus === "head_of_household";
  const additionalPerCondition = isSingleOrHOH
    ? yearData.additional.single_or_hoh_per_condition
    : yearData.additional.mfj_mfs_qss_per_person_per_condition;

  if (age >= 65) {
    additionalAmount += additionalPerCondition;
  }

  if (isBlind) {
    additionalAmount += additionalPerCondition;
  }

  return deduction + additionalAmount;
}

function calculateRegularTax(
  taxYear: TaxYear,
  filingStatus: FilingStatus,
  taxableIncome: number
): number {
  const brackets = taxData.brackets[taxYear][filingStatus];
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];

    if (remainingIncome <= 0) break;

    // Calculate the amount of income in this bracket
    const previousBracketMax = i === 0 ? 0 : brackets[i - 1].upTo!;
    const currentBracketMax = bracket.upTo || Infinity;

    const incomeInThisBracket = Math.min(
      remainingIncome,
      currentBracketMax - previousBracketMax
    );

    if (incomeInThisBracket > 0) {
      tax += incomeInThisBracket * bracket.rate;
      remainingIncome -= incomeInThisBracket;
    }
  }

  return tax;
}

function calculateMarginalTaxRate(
  taxYear: TaxYear,
  filingStatus: FilingStatus,
  taxableIncome: number
): number {
  const brackets = taxData.brackets[taxYear][filingStatus];

  for (const bracket of brackets) {
    if (bracket.upTo === null || taxableIncome <= bracket.upTo) {
      return bracket.rate * 100;
    }
  }

  return brackets[brackets.length - 1].rate * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(2)}%`;
}
