import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function CalculationExplanation() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>How Your Projection is Calculated</CardTitle>
        <CardDescription>Understanding the underlying logic</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        <p>
          Your financial independence timeline is calculated based on a simple accumulation model, assuming no investment growth or inflation for clarity.
        </p>
        <p>
          We first determine your <strong>Net Monthly Income</strong>, which is the amount you are consistently saving each month after all your expenses:
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-xs">
          Net Monthly Income = Monthly Savings - Monthly Expenses
        </p>
        <p>
          Then, we divide your <strong>Target Financial Goal</strong> by this Net Monthly Income to estimate the number of months it will take to reach your goal:
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-xs">
          Timeline (Months) = Target Financial Goal / Net Monthly Income
        </p>
        <p>
          This monthly timeline is then converted into years. If your Monthly Savings are less than or equal to your Monthly Expenses, it indicates that reaching the financial goal with current habits is not possible under this model.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          Please note: This calculation is a simplified model for educational purposes only. Real-world financial scenarios involve many more variables.
        </p>
      </CardContent>
    </Card>
  );
}
