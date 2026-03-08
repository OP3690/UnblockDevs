import type { Metadata } from 'next';
import TestDataGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Test Data Generator – Fake Data | UnblockDevs',
  description: 'Generate test data instantly. Fake data for testing: JSON, CSV. Free, no signup.',
  keywords: [
    'test data generator',
    'fake data generator',
    'generate test data',
    'test data tool',
    'fake data online',
    'test data creator',
    'dummy data generator',
    'sample data generator'
  ],
  openGraph: {
    title: 'Test Data Generator | UnblockDevs',
    description: 'Generate test data instantly. Free online test data generator tool.',
    type: 'website',
    url: 'https://unblockdevs.com/test-data-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/test-data-generator',
  },
};

export default function TestDataGeneratorPage() {
  return <TestDataGeneratorClient />;
}
