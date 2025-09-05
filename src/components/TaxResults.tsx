import React from "react";
import { TaxCalculation } from "../types/tax";
import { formatCurrency, formatPercentage } from "../utils/taxCalculations";
import "./TaxResults.scss";

interface TaxResultsProps {
  calculation: TaxCalculation;
  taxYear: string;
}

const TaxResults: React.FC<TaxResultsProps> = ({ calculation, taxYear }) => {
  const { refundOrOwed, breakdown, effectiveTaxRate, marginalTaxRate } =
    calculation;

  return (
    <div className="tax-results">
      <div className="result-headline">
        {refundOrOwed.refund ? (
          <>
            <h3>For the {taxYear} tax year, your estimated refund is</h3>
            <div className="amount refund">
              {formatCurrency(refundOrOwed.refund)}
            </div>
          </>
        ) : (
          <>
            <h3>For the {taxYear} tax year, your estimated taxes owed are</h3>
            <div className="amount owed">
              {formatCurrency(refundOrOwed.amountOwed!)}
            </div>
          </>
        )}
      </div>

      <div className="breakdown-section">
        <h4>Taxable income</h4>
        <div className="breakdown-item">
          <span>Gross income</span>
          <span>{formatCurrency(breakdown.grossIncome)}</span>
        </div>
        {breakdown.standardDeduction > 0 && (
          <div className="breakdown-item deduction">
            <span>Standard deduction</span>
            <span>-{formatCurrency(breakdown.standardDeduction)}</span>
          </div>
        )}
        <div className="breakdown-item deduction">
          <span>Retirement contributions</span>
          <span>-{formatCurrency(breakdown.retirementContributions)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>Other deductions</span>
          <span>-{formatCurrency(breakdown.otherDeductions)}</span>
        </div>
        <div className="breakdown-item total">
          <strong>Taxable income</strong>
          <strong>{formatCurrency(breakdown.taxableIncome)}</strong>
        </div>
      </div>

      <div className="breakdown-section">
        <h4>Estimated federal taxes</h4>
        <div className="breakdown-item">
          <span>Taxes before adjustments</span>
          <span>{formatCurrency(breakdown.taxesBeforeAdjustments)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>Federal taxes withheld</span>
          <span>-{formatCurrency(breakdown.federalTaxesWithheld)}</span>
        </div>
        <div className="breakdown-item deduction">
          <span>Tax credits</span>
          <span>-{formatCurrency(breakdown.taxCredits)}</span>
        </div>
        <div className="breakdown-item total">
          <strong>Taxes owed</strong>
          <strong>{formatCurrency(breakdown.taxesOwed)}</strong>
        </div>
      </div>

      <div className="breakdown-section">
        <h4>Tax rate</h4>
        <div className="breakdown-item">
          <span>Effective tax rate</span>
          <span>{formatPercentage(effectiveTaxRate)}</span>
        </div>
        <div className="breakdown-item">
          <span>Marginal tax rate</span>
          <span>{formatPercentage(marginalTaxRate)}</span>
        </div>
      </div>
    </div>
  );
};

export default TaxResults;
