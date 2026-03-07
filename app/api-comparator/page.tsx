import type { Metadata } from 'next';
import ApiComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Clean API Response – Compare & Debug API Responses Instantly | UnblockDevs',
  description: 'Clean API response and compare two API responses side-by-side. Debug API changes, detect breaking changes, analyze differences. Paste → instant compare. No signup.',
  keywords: [
    'clean api response',
    'api comparator',
    'api response comparator',
    'compare api responses',
    'api diff tool',
    'compare two api responses',
    'api response comparison',
    'api testing tool',
    'debug api changes',
  ],
  openGraph: {
    title: 'Clean API Response – Compare API Responses Instantly | UnblockDevs',
    description: 'Clean API response and compare two API responses side-by-side. Debug API changes, detect breaking changes.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/api-comparator',
  },
};

export default function ApiComparatorPage() {
  return <ApiComparatorClient />;
}
