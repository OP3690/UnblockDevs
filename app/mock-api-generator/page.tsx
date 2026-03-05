import type { Metadata } from 'next';
import MockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Free Mock API Generator – Create Fake REST APIs Instantly | UnblockDevs',
  description: 'Create mock REST APIs with dynamic responses, auth simulation, latency, rate limiting, and error scenarios. Export to Postman, OpenAPI. Template placeholders: uuid, name, email. No signup.',
  keywords: [
    'mock api generator',
    'fake api',
    'mock rest api',
    'generate test api',
    'mock api online',
    'fake rest api',
    'postman mock',
    'openapi mock',
  ],
  openGraph: {
    title: 'Free Mock API Generator – Create Fake REST APIs Instantly',
    description: 'Dynamic mock APIs with auth, rate limit, latency. Export Postman & OpenAPI.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/mock-api-generator',
  },
};

export default function MockApiGeneratorPage() {
  return <MockApiGeneratorClient />;
}
