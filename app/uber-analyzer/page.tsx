import type { Metadata } from 'next';
import UberAnalyzerClient from './client';

const BASE_URL = 'https://unblockdevs.com';
const PAGE_PATH = '/uber-analyzer';

export const metadata: Metadata = {
  title: 'Uber Data Analyzer — See Your Complete Ride History & Spending',
  description:
    "Upload your Uber data export to see exactly how much you've spent, how far you've traveled, and when you ride most. 100% private — processed entirely in your browser.",
  keywords: [
    'uber data analyzer',
    'uber spending tracker',
    'uber trip history',
    'uber data export',
    'how much did i spend on uber',
    'uber statistics',
    'uber data analysis',
    'uber ride history analyzer',
    'uber spending calculator',
    'private uber data tool',
    'uber data download',
    'uber lifetime trips',
    'uber total spend',
  ],
  alternates: { canonical: `${BASE_URL}${PAGE_PATH}` },
  openGraph: {
    title: 'Uber Data Analyzer — See Your Complete Ride History & Spending',
    description:
      "Upload your Uber data export to discover your total spend, kilometers traveled, and riding patterns. 100% private, browser-only.",
    url: `${BASE_URL}${PAGE_PATH}`,
    siteName: 'UnblockDevs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uber Data Analyzer — How Much Have You Really Spent?',
    description:
      'Find your exact Uber spending, km traveled, and ride patterns from your own data export. Private, instant.',
  },
};

export default function UberAnalyzerPage() {
  return <UberAnalyzerClient />;
}
