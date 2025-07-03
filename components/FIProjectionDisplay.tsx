import React from 'react';
import { FIProjectionResult } from '@/lib/fi-projection-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface FIProjectionDisplayProps {
  projection: FIProjectionResult;
}

export function FIProjectionDisplay({ projection }: FIProjectionDisplayProps) {
  if (projection.error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 border-red-500">
        <CardHeader>
          <CardTitle className="text-red-600">Calculation Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{projection.error}</p>
          <p className="mt-4 text-sm text-gray-500">Please adjust your inputs and try again.</p>
        </CardContent>
      </Card>
    );
  }

  const { timelineMonths, timelineYears, assumptions } = projection;

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Your Financial Independence Projection</CardTitle>
        <CardDescription>Based on your current inputs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {
          timelineYears !== null && timelineMonths !== null && (
            <div>
              <h3 className="text-lg font-semibold">Projected Timeline:</h3>
              <p className="text-2xl font-bold text-green-600">
                {Math.ceil(timelineYears)} Years (approx. {Math.ceil(timelineMonths)} Months)
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mt-2">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{ width: `${Math.min(100, (timelineYears / 40) * 100)}%` }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Visualized based on a 40-year maximum for display.
              </p>
            </div>
          )
        }

        <div>
          <h3 className="text-lg font-semibold">Key Assumptions:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li><strong>Investment Return Rate:</strong> {assumptions.investmentReturnRate}</li>
            <li><strong>Inflation Rate:</strong> {assumptions.inflationRate}</li>
            <li><strong>Tax Rate:</strong> {assumptions.taxRate}</li>
            <li><strong>Calculation Method:</strong> {assumptions.calculationMethod}</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            These projections are for educational purposes only and do not constitute financial advice.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => alert("For detailed explanations, please refer to the 'How Your Projection is Calculated' section and the Educational Disclaimer. Remember, this tool provides educational content only and not financial advice. Always consult a qualified financial advisor for personalized advice.")}
            className="text-blue-600 hover:underline text-sm"
          >
            Need more details or advice?
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
