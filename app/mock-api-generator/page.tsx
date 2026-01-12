import type { Metadata } from 'next';
import MockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Free Mock API Generator Online - Generate Fake Endpoints Instantly | UnblockDevs',
  description: 'Generate mock API endpoints instantly. Free online mock API generator tool to create fake REST APIs with custom responses, delays, and status codes. No backend needed. No signup required.',
  keywords: [
    'mock api generator',
    'free mock api',
    'mock api online',
    'fake api generator',
    'mock rest api',
    'mock endpoint generator',
    'test api generator',
    'mock api tool'
  ],
  openGraph: {
    title: 'Free Mock API Generator Online - Generate Fake Endpoints Instantly',
    description: 'Generate mock API endpoints instantly. Free online mock API generator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/mock-api-generator',
  },
};

export default function MockApiGeneratorPage() {
  return <MockApiGeneratorClient />;
}
