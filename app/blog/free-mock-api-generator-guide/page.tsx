import type { Metadata } from 'next';
import FreeMockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Free Mock API for Frontend (No Backend) | UnblockDevs',
  description: 'Generate free mock APIs for frontend dev. Delay, status codes, pagination. No backend. For students and indies.',
  keywords: [
    'free mock API generator',
    'mock REST API online',
    'fake API for frontend testing',
    'mock API generator',
    'free mock API',
    'mock endpoint generator',
    'fake REST API',
    'mock API for frontend',
    'test API generator',
    'mock API tool',
    'generate mock API',
    'mock API online free'
  ],
  openGraph: {
    title: 'Free Mock API in Seconds: Generate Fake Endpoints for Frontend Development',
    description: 'Free mock APIs for frontend. No backend. For students and indies.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['Mock API', 'Frontend Development', 'API Testing', 'Web Development'],
    url: 'https://unblockdevs.com/blog/free-mock-api-generator-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mock API in Seconds: Generate Fake Endpoints',
    description: 'Free mock APIs for frontend. No backend.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/free-mock-api-generator-guide' },

};

export default function FreeMockApiGenerator() {
  return <FreeMockApiGeneratorClient />;
}

