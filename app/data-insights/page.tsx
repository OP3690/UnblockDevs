import type { Metadata } from 'next';
import DataInsightsClient from './client';

export const metadata: Metadata = {
  title: 'Data Insights – Analyze JSON | UnblockDevs',
  description: 'Get insights from JSON instantly. Analyze structure, statistics, patterns. Free, no signup.',
  keywords: [
    'data insights',
    'json data analysis',
    'data analyzer',
    'json statistics',
    'data insights tool',
    'analyze json data',
    'data visualization',
    'json analytics'
  ],
  openGraph: {
    title: 'Data Insights | UnblockDevs',
    description: 'Get insights from JSON data instantly. Free online data insights tool.',
    type: 'website',
    url: 'https://unblockdevs.com/data-insights',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/data-insights',
  },
};

export default function DataInsightsPage() {
  return <DataInsightsClient />;
}
