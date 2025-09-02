import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TaxFormSchema } from '../schemas/taxFormSchema'
import { calculateStandardDeduction } from '../utils/taxCalculations'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'
import './TaxForm.scss'

interface TaxFormProps {
  form: UseFormReturn<TaxFormSchema>
  onSubmit: (data: TaxFormSchema) => void
  showAdvanced: boolean
  setShowAdvanced: (show: boolean) => void
}

const TaxForm: React.FC<TaxFormProps> = ({ 
  form, 
  onSubmit, 
  showAdvanced, 
  setShowAdvanced 
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = form
  
  const watchedValues = watch()
  const standardDeduction = calculateStandardDeduction(
    watchedValues.taxYear,
    watchedValues.filingStatus,
    watchedValues.age,
    watchedValues.isBlind
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tax-form">
      <div className="form-group">
        <label htmlFor="taxYear">
          Tax year
          <Info size={16} className="info-icon" />
        </label>
        <select 
          id="taxYear" 
          {...register('taxYear')}
          className={errors.taxYear ? 'error' : ''}
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        {errors.taxYear && <span className="error-message">{errors.taxYear.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="filingStatus">
          Tax filing status
          <Info size={16} className="info-icon" />
        </label>
        <select 
          id="filingStatus" 
          {...register('filingStatus')}
          className={errors.filingStatus ? 'error' : ''}
        >
          <option value="single">Single</option>
          <option value="married_joint">Married, filing jointly</option>
          <option value="married_separate">Married, filing separately</option>
          <option value="head_of_household">Head of household</option>
          <option value="qualifying_surviving_spouse">Qualifying surviving spouse</option>
        </select>
        {errors.filingStatus && <span className="error-message">{errors.filingStatus.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="annualGrossIncome">
          Annual gross income
          <Info size={16} className="info-icon" />
        </label>
        <input
          type="number"
          id="annualGrossIncome"
          placeholder="0"
          {...register('annualGrossIncome', { valueAsNumber: true })}
          className={errors.annualGrossIncome ? 'error' : ''}
        />
        {errors.annualGrossIncome && <span className="error-message">{errors.annualGrossIncome.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="age">
          Age
          <Info size={16} className="info-icon" />
        </label>
        <input
          type="number"
          id="age"
          placeholder="0"
          {...register('age', { valueAsNumber: true })}
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-message">{errors.age.message}</span>}
      </div>

      <div className="form-group">
        <div className="deduction-helper">
          Your standard deduction: ${standardDeduction.toLocaleString()}
        </div>
        
        <div className="deduction-type-selector">
          <label className="radio-label">
            <input
              type="radio"
              value="standard"
              {...register('deductionType')}
            />
            <span className="radio-custom">Standard deduction</span>
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              value="itemized"
              {...register('deductionType')}
            />
            <span className="radio-custom">Itemized deductions</span>
          </label>
        </div>

        {watchedValues.deductionType === 'itemized' && (
          <div className="form-group">
            <label htmlFor="itemizedDeductions">Itemized deductions</label>
            <input
              type="number"
              id="itemizedDeductions"
              placeholder="0"
              {...register('itemizedDeductions', { valueAsNumber: true })}
              className={errors.itemizedDeductions ? 'error' : ''}
            />
            {errors.itemizedDeductions && <span className="error-message">{errors.itemizedDeductions.message}</span>}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="taxesWithheld">
          Taxes withheld
          <Info size={16} className="info-icon" />
        </label>
        <input
          type="number"
          id="taxesWithheld"
          placeholder="0"
          {...register('taxesWithheld', { valueAsNumber: true })}
          className={errors.taxesWithheld ? 'error' : ''}
        />
        {errors.taxesWithheld && <span className="error-message">{errors.taxesWithheld.message}</span>}
      </div>

      <div className="advanced-toggle">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="advanced-toggle-btn"
        >
          {showAdvanced ? 'HIDE ADVANCED' : 'SHOW ADVANCED'}
          {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {showAdvanced && (
        <div className="advanced-fields">
          <div className="form-group">
            <label htmlFor="k401Contributions">401(k) contributions</label>
            <input
              type="number"
              id="k401Contributions"
              placeholder="0"
              {...register('k401Contributions', { valueAsNumber: true })}
              className={errors.k401Contributions ? 'error' : ''}
            />
            {errors.k401Contributions && <span className="error-message">{errors.k401Contributions.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="iraContributions">IRA contributions</label>
            <input
              type="number"
              id="iraContributions"
              placeholder="0"
              {...register('iraContributions', { valueAsNumber: true })}
              className={errors.iraContributions ? 'error' : ''}
            />
            {errors.iraContributions && <span className="error-message">{errors.iraContributions.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="otherDeductions">
              Other deductions
              <Info size={16} className="info-icon" />
            </label>
            <input
              type="number"
              id="otherDeductions"
              placeholder="0"
              {...register('otherDeductions', { valueAsNumber: true })}
              className={errors.otherDeductions ? 'error' : ''}
            />
            <div className="help-text">
              Enter HSA, student loan interest, educator expenses, and for 2025 only, any eligible senior bonus deduction you plan to claim.
            </div>
            {errors.otherDeductions && <span className="error-message">{errors.otherDeductions.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="taxCredits">
              Tax credits
              <Info size={16} className="info-icon" />
            </label>
            <input
              type="number"
              id="taxCredits"
              placeholder="0"
              {...register('taxCredits', { valueAsNumber: true })}
              className={errors.taxCredits ? 'error' : ''}
            />
            <div className="help-text">
              Calculator assumes credits here are nonrefundable.
            </div>
            {errors.taxCredits && <span className="error-message">{errors.taxCredits.message}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('isBlind')}
              />
              <span className="checkbox-custom"></span>
              I am legally blind.
            </label>
          </div>
        </div>
      )}
    </form>
  )
}

export default TaxForm
