import type { Metadata } from 'next';
import ApiComparatorClient from './client';

export const metadata: Metadata = {
  title: 'API Comparator – Compare & Debug Responses | UnblockDevs',
  description: 'Compare two API responses side-by-side. Debug API changes, detect breaking changes. Paste → instant compare. No signup.',
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
    title: 'API Comparator | UnblockDevs',
    description: 'Clean API response and compare two API responses side-by-side. Debug API changes, detect breaking changes.',
    type: 'website',
    url: 'https://unblockdevs.com/api-comparator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/api-comparator',
  },
};

export default function ApiComparatorPage() {
  return <ApiComparatorClient />;
}
