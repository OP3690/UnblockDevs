import type { Metadata } from 'next';
import ApiComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Free API Comparator Online - Compare API Responses Instantly | UnblockDevs',
  description: 'UnblockDevs API Comparator: Compare two API responses side-by-side instantly. Free online API comparator tool for debugging API changes, detecting breaking changes, and analyzing response differences. No signup required.',
  keywords: [
    'unblock devs api',
    'unblockdevs api',
    'api comparator',
    'api response comparator',
    'compare api responses',
    'api diff tool',
    'compare two api responses',
    'api response comparison',
    'api testing tool',
    'debug api changes'
  ],
  openGraph: {
    title: 'UnblockDevs API Comparator - Compare API Responses Instantly',
    description: 'UnblockDevs API Comparator: Compare two API responses side-by-side instantly. Free online API comparator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/api-comparator',
  },
};

export default function ApiComparatorPage() {
  return <ApiComparatorClient />;
}
