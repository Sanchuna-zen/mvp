import React from 'react';

export function EducationalDisclaimer() {
  return (
    <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md shadow-sm">
      <p className="font-bold">Disclaimer:</p>
      <p className="text-sm">
        This projection is for educational purposes only and is based on the inputs provided. It does not constitute financial advice, investment advice, or any form of recommendation. Investment in securities market is subject to market risks, read all the related documents carefully before investing. Consult a qualified financial advisor before making any financial decisions.
      </p>
      <p className="text-xs mt-2">
        [Placeholder for SEBI-specific compliance text, if any, will be added here upon provision.]
      </p>
    </div>
  );
}
