export type TaxYear = '2024' | '2025'

export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse'

export interface TaxBracket {
  rate: number
  upTo: number | null
}

export interface StandardDeductionData {
  base: Record<FilingStatus, number>
  additional: {
    single_or_hoh_per_condition: number
    mfj_mfs_qss_per_person_per_condition: number
  }
}

export interface TaxData {
  standard_deduction: Record<TaxYear, StandardDeductionData>
  brackets: Record<TaxYear, Record<FilingStatus, TaxBracket[]>>
}

export interface TaxFormData {
  taxYear: TaxYear
  filingStatus: FilingStatus
  annualGrossIncome: number
  age: number
  isBlind: boolean
  deductionType: 'standard' | 'itemized'
  itemizedDeductions: number
  taxesWithheld: number
  // Advanced fields
  k401Contributions: number
  iraContributions: number
  otherDeductions: number
  taxCredits: number
}

export interface TaxCalculation {
  adjustedGrossIncome: number
  standardDeduction: number
  deductionTaken: number
  taxableIncome: number
  regularTax: number
  taxAfterCredits: number
  net: number
  refundOrOwed: {
    refund?: number
    amountOwed?: number
  }
  effectiveTaxRate: number
  marginalTaxRate: number
  breakdown: {
    grossIncome: number
    standardDeduction: number
    retirementContributions: number
    otherDeductions: number
    taxableIncome: number
    taxesBeforeAdjustments: number
    federalTaxesWithheld: number
    taxCredits: number
    taxesOwed: number
  }
}
