import type { Metadata } from 'next';
import TestDataGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Free Test Data Generator Online - Generate Fake Data Instantly | UnblockDevs',
  description: 'Generate test data instantly. Free online test data generator tool to create fake data for testing, development, and demos. Generate JSON, CSV, and structured test data. No signup required.',
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
    title: 'Free Test Data Generator Online - Generate Fake Data Instantly',
    description: 'Generate test data instantly. Free online test data generator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/test-data-generator',
  },
};

export default function TestDataGeneratorPage() {
  return <TestDataGeneratorClient />;
}
