import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taxFormSchema, TaxFormSchema } from "../schemas/taxFormSchema";
import { TaxFormData, TaxCalculation } from "../types/tax";
import { calculateTax } from "../utils/taxCalculations";
import TaxForm from "./TaxForm";
import TaxResults from "./TaxResults";
import CTASection from "./CTASection";
import "./TaxCalculator.scss";

const TaxCalculator: React.FC = () => {
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<TaxFormSchema>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      taxYear: "2025",
      filingStatus: "single",
      annualGrossIncome: 100000,
      age: 35,
      isBlind: false,
      deductionType: "standard",
      itemizedDeductions: 0,
      taxesWithheld: 0,
      k401Contributions: 0,
      iraContributions: 0,
      otherDeductions: 0,
      taxCredits: 0,
    },
    mode: "onChange",
  });

  const onSubmit = (data: TaxFormSchema) => {
    const formData: TaxFormData = {
      ...data,
      annualGrossIncome: Number(data.annualGrossIncome),
      age: Number(data.age),
      itemizedDeductions: Number(data.itemizedDeductions),
      taxesWithheld: Number(data.taxesWithheld),
      k401Contributions: Number(data.k401Contributions),
      iraContributions: Number(data.iraContributions),
      otherDeductions: Number(data.otherDeductions),
      taxCredits: Number(data.taxCredits),
    };

    const result = calculateTax(formData);
    setCalculation(result);
  };

  const handleFormChange = () => {
    // Recalculate on any form change for real-time updates
    const values = form.getValues();
    if (values.annualGrossIncome > 0) {
      const formData: TaxFormData = {
        ...values,
        annualGrossIncome: Number(values.annualGrossIncome),
        age: Number(values.age),
        itemizedDeductions: Number(values.itemizedDeductions),
        taxesWithheld: Number(values.taxesWithheld),
        k401Contributions: Number(values.k401Contributions),
        iraContributions: Number(values.iraContributions),
        otherDeductions: Number(values.otherDeductions),
        taxCredits: Number(values.taxCredits),
      };
      const result = calculateTax(formData);
      setCalculation(result);
    }
  };

  // Watch form values for real-time updates
  useEffect(() => {
    const subscription = form.watch(handleFormChange);
    return () => subscription.unsubscribe();
  }, [form]);

  // Calculate initial result on component mount
  useEffect(() => {
    const defaultValues = form.getValues();
    if (defaultValues.annualGrossIncome > 0) {
      const formData: TaxFormData = {
        ...defaultValues,
        annualGrossIncome: Number(defaultValues.annualGrossIncome),
        age: Number(defaultValues.age),
        itemizedDeductions: Number(defaultValues.itemizedDeductions),
        taxesWithheld: Number(defaultValues.taxesWithheld),
        k401Contributions: Number(defaultValues.k401Contributions),
        iraContributions: Number(defaultValues.iraContributions),
        otherDeductions: Number(defaultValues.otherDeductions),
        taxCredits: Number(defaultValues.taxCredits),
      };
      const result = calculateTax(formData);
      setCalculation(result);
    }
  }, []);

  return (
    <div className="tax-calculator">
      <div className="calculator-grid">
        <div className="tax-details-section">
          <h2>Tax details</h2>
          <TaxForm
            form={form}
            onSubmit={onSubmit}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
          />
        </div>

        <div className="tax-results-section">
          <h2>Federal Income Tax Breakdown:</h2>
          {calculation ? (
            <TaxResults calculation={calculation} />
          ) : (
            <div className="no-results">
              <p>Enter your tax details to see your estimated tax breakdown.</p>
            </div>
          )}
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default TaxCalculator;
