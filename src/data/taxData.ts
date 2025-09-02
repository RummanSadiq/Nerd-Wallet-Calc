import { TaxData } from '../types/tax'

export const taxData: TaxData = {
  standard_deduction: {
    "2025": {
      base: {
        single: 15750,
        married_separate: 15750,
        married_joint: 31500,
        qualifying_surviving_spouse: 31500,
        head_of_household: 23625
      },
      additional: {
        single_or_hoh_per_condition: 2000,
        mfj_mfs_qss_per_person_per_condition: 1600
      }
    },
    "2024": {
      base: {
        single: 14600,
        married_separate: 14600,
        married_joint: 29200,
        qualifying_surviving_spouse: 29200,
        head_of_household: 21900
      },
      additional: {
        single_or_hoh_per_condition: 1950,
        mfj_mfs_qss_per_person_per_condition: 1550
      }
    }
  },
  brackets: {
    "2025": {
      single: [
        { rate: 0.10, upTo: 11925 },
        { rate: 0.12, upTo: 48475 },
        { rate: 0.22, upTo: 103350 },
        { rate: 0.24, upTo: 197300 },
        { rate: 0.32, upTo: 250525 },
        { rate: 0.35, upTo: 626350 },
        { rate: 0.37, upTo: null }
      ],
      married_joint: [
        { rate: 0.10, upTo: 23850 },
        { rate: 0.12, upTo: 96950 },
        { rate: 0.22, upTo: 206700 },
        { rate: 0.24, upTo: 394600 },
        { rate: 0.32, upTo: 501050 },
        { rate: 0.35, upTo: 751600 },
        { rate: 0.37, upTo: null }
      ],
      head_of_household: [
        { rate: 0.10, upTo: 17000 },
        { rate: 0.12, upTo: 64850 },
        { rate: 0.22, upTo: 103350 },
        { rate: 0.24, upTo: 197300 },
        { rate: 0.32, upTo: 250500 },
        { rate: 0.35, upTo: 626350 },
        { rate: 0.37, upTo: null }
      ],
      married_separate: [
        { rate: 0.10, upTo: 11925 },
        { rate: 0.12, upTo: 48475 },
        { rate: 0.22, upTo: 103350 },
        { rate: 0.24, upTo: 197300 },
        { rate: 0.32, upTo: 250525 },
        { rate: 0.35, upTo: 375800 },
        { rate: 0.37, upTo: null }
      ],
      qualifying_surviving_spouse: [
        { rate: 0.10, upTo: 23850 },
        { rate: 0.12, upTo: 96950 },
        { rate: 0.22, upTo: 206700 },
        { rate: 0.24, upTo: 394600 },
        { rate: 0.32, upTo: 501050 },
        { rate: 0.35, upTo: 751600 },
        { rate: 0.37, upTo: null }
      ]
    },
    "2024": {
      single: [
        { rate: 0.10, upTo: 11600 },
        { rate: 0.12, upTo: 47150 },
        { rate: 0.22, upTo: 100525 },
        { rate: 0.24, upTo: 191950 },
        { rate: 0.32, upTo: 243725 },
        { rate: 0.35, upTo: 609350 },
        { rate: 0.37, upTo: null }
      ],
      married_joint: [
        { rate: 0.10, upTo: 23200 },
        { rate: 0.12, upTo: 94300 },
        { rate: 0.22, upTo: 201050 },
        { rate: 0.24, upTo: 383900 },
        { rate: 0.32, upTo: 487450 },
        { rate: 0.35, upTo: 731200 },
        { rate: 0.37, upTo: null }
      ],
      head_of_household: [
        { rate: 0.10, upTo: 16550 },
        { rate: 0.12, upTo: 63100 },
        { rate: 0.22, upTo: 100500 },
        { rate: 0.24, upTo: 191950 },
        { rate: 0.32, upTo: 243700 },
        { rate: 0.35, upTo: 609350 },
        { rate: 0.37, upTo: null }
      ],
      married_separate: [
        { rate: 0.10, upTo: 11600 },
        { rate: 0.12, upTo: 47150 },
        { rate: 0.22, upTo: 100525 },
        { rate: 0.24, upTo: 191950 },
        { rate: 0.32, upTo: 243725 },
        { rate: 0.35, upTo: 365600 },
        { rate: 0.37, upTo: null }
      ],
      qualifying_surviving_spouse: [
        { rate: 0.10, upTo: 23200 },
        { rate: 0.12, upTo: 94300 },
        { rate: 0.22, upTo: 201050 },
        { rate: 0.24, upTo: 383900 },
        { rate: 0.32, upTo: 487450 },
        { rate: 0.35, upTo: 731200 },
        { rate: 0.37, upTo: null }
      ]
    }
  }
}
