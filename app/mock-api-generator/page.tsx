import type { Metadata } from 'next';
import MockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Mock API Generator – Fake REST APIs | UnblockDevs',
  description: 'Create mock REST APIs with dynamic responses, auth, latency, rate limits. Export Postman, OpenAPI. No signup.',
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
    title: 'Mock API Generator | UnblockDevs',
    description: 'Dynamic mock APIs with auth, rate limit, latency. Export Postman & OpenAPI.',
    type: 'website',
    url: 'https://unblockdevs.com/mock-api-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/mock-api-generator',
  },
};

export default function MockApiGeneratorPage() {
  return <MockApiGeneratorClient />;
}
