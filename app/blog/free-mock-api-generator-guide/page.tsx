import type { Metadata } from 'next';
import FreeMockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Free Mock API in Seconds: Generate Fake Endpoints for Frontend Development (No Backend Needed) | UnblockDevs',
  description: 'Learn how to generate free mock APIs instantly for frontend development. Create realistic endpoints with delay, status codes, pagination, and more. No backend needed. Perfect for students and indie developers.',
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
    description: 'Generate free mock APIs instantly for frontend development. No backend needed. Perfect for students and indie developers.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['Mock API', 'Frontend Development', 'API Testing', 'Web Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mock API in Seconds: Generate Fake Endpoints',
    description: 'Generate free mock APIs instantly for frontend development. No backend needed.',
  },
};

export default function FreeMockApiGenerator() {
  return <FreeMockApiGeneratorClient />;
}

