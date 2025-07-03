export interface FIProjectionResult {
  timelineMonths: number | null;
  timelineYears: number | null;
  assumptions: {
    investmentReturnRate: string;
    inflationRate: string;
    taxRate: string;
    calculationMethod: string;
  };
  error?: string;
}

export function calculateFIProjection(
  monthlySavings: number,
  monthlyExpenses: number,
  targetFinancialGoal: number
): FIProjectionResult {
  const netMonthlyIncome = monthlySavings - monthlyExpenses;

  const assumptions = {
    investmentReturnRate: "0% (no investment growth assumed)",
    inflationRate: "0% (no inflation assumed)",
    taxRate: "0% (no taxes considered)",
    calculationMethod: "Simple accumulation (Target Goal / Net Monthly Income)",
  };

  if (netMonthlyIncome <= 0) {
    return {
      timelineMonths: null,
      timelineYears: null,
      assumptions,
      error: "Monthly savings must be greater than monthly expenses to reach your financial goal.",
    };
  }

  const timelineMonths = targetFinancialGoal / netMonthlyIncome;
  const timelineYears = timelineMonths / 12;

  return {
    timelineMonths,
    timelineYears,
    assumptions,
  };
}
