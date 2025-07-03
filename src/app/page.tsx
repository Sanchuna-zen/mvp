"use client"

import { useState } from 'react';
import { FISimulationForm } from '../../components/FISimulationForm';
import { FIProjectionDisplay } from '../../components/FIProjectionDisplay';
import { CalculationExplanation } from '../../components/CalculationExplanation';
import { EducationalDisclaimer } from '../../components/EducationalDisclaimer';
import { calculateFIProjection, FIProjectionResult } from '../../lib/fi-projection-calculator';
import { z } from 'zod';

const formSchema = z.object({
  monthlySavings: z.number().min(0),
  monthlyExpenses: z.number().min(0),
  targetFinancialGoal: z.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [projectionResult, setProjectionResult] = useState<FIProjectionResult | null>(null);

  const handleFormSubmit = (data: FormData) => {
    const result = calculateFIProjection(data.monthlySavings, data.monthlyExpenses, data.targetFinancialGoal);
    if (result.error) {
      setProjectionResult({
        timelineMonths: 240, // Example: 20 years
        timelineYears: 20,
        assumptions: {
          investmentReturnRate: "0% (educational example)",
          inflationRate: "0% (educational example)",
          taxRate: "0% (educational example)",
          calculationMethod: "Simplified accumulation (educational example)",
        },
        error: "Based on your inputs, a specific projection could not be calculated. Here's a generic educational example.",
      });
    } else {
      setProjectionResult(result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Financial Independence Simulator</h1>
        
        <FISimulationForm onFormSubmit={handleFormSubmit} />

        {projectionResult && <FIProjectionDisplay projection={projectionResult} />}

        <CalculationExplanation />
        
        <EducationalDisclaimer />
      </main>
    </div>
  );
}
