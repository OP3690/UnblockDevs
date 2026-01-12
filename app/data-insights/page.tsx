import type { Metadata } from 'next';
import DataInsightsClient from './client';

export const metadata: Metadata = {
  title: 'Free Data Insights Tool Online - Analyze JSON Data Instantly | UnblockDevs',
  description: 'Get insights from JSON data instantly. Free online data insights tool to analyze data structures, statistics, patterns, and trends in JSON datasets. No signup required.',
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
    title: 'Free Data Insights Tool Online - Analyze JSON Data Instantly',
    description: 'Get insights from JSON data instantly. Free online data insights tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/data-insights',
  },
};

export default function DataInsightsPage() {
  return <DataInsightsClient />;
}
