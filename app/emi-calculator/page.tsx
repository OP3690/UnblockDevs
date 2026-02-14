import type { Metadata } from 'next';
import EmiCalculatorClient from './client';

export const metadata: Metadata = {
  title: 'Free EMI Calculator – Loan EMI, Interest & Repayment Schedule | UnblockDevs',
  description: 'UnblockDevs EMI Calculator: Calculate monthly EMI, total interest payable, and full repayment schedule for home loans, personal loans, and more. Free online EMI calculator with charts. No signup required.',
  keywords: [
    'unblock devs emi',
    'unblockdevs emi',
    'emi calculator',
    'loan emi calculator',
    'home loan emi',
    'personal loan emi',
    'emi calculator online',
    'loan repayment schedule',
    'interest calculator',
    'loan calculator',
    'emi calculator india'
  ],
  openGraph: {
    title: 'UnblockDevs EMI Calculator – Loan EMI & Repayment Schedule',
    description: 'Calculate monthly EMI, total interest, and repayment schedule for loans. Free online EMI calculator with yearly analysis and charts.',
    type: 'website',
    url: 'https://unblockdevs.com/emi-calculator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/emi-calculator',
  },
};

export default function EmiCalculatorPage() {
  return <EmiCalculatorClient />;
}
