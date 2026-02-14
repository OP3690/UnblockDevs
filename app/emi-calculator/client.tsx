'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import EmiCalculator from '@/components/tools/EmiCalculator';

export default function EmiCalculatorClient() {
  return (
    <div className="emi-calc-root min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-indigo-50/30">
      <header className="emi-calc-header bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="emi-calc-back-link inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calculator className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="emi-calc-title text-3xl font-bold text-gray-900">EMI Calculator</h1>
              <p className="emi-calc-subtitle text-sm text-gray-500 mt-1">Calculate monthly EMI, total interest, and repayment schedule for loans</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmiCalculator />
      </main>
    </div>
  );
}
