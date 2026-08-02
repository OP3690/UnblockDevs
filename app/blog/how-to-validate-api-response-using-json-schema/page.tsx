import type { Metadata } from 'next';
import HowToValidateApiResponseUsingJsonSchemaClient from './client';

export const metadata: Metadata = {
  title: 'Validate API Response with JSON Schema | UnblockDevs',
  description: 'Validate API responses with JSON Schema. Learn key libraries, validation patterns, and error handling in JavaScript, Python, and Node.js with real examples.',
  keywords: [
    'validate api response json schema',
    'json schema validation',
    'api response validation',
    'json schema validator',
    'validate api response javascript',
    'json schema api testing',
    'api response schema validation',
    'json schema validation nodejs',
    'validate api response python',
    'api testing json schema',
    'how to validate api response with json schema',
    'json schema api validation best practices',
  ],
  openGraph: {
    title: 'How to Validate API Responses Using JSON Schema — Complete 2026 Guide',
    description: 'Stop trusting API responses blindly. Validate them with JSON Schema in JavaScript, Python, and Node.js — with library examples, error handling patterns, and production-ready validation tips.',
    type: 'article',
    publishedTime: '2026-01-29T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-validate-api-response-using-json-schema',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Validate%20API%20Response%20Using%20JSON%20Schema%20%7C%20Complete%20Guide%202026&emoji=%7B%7D&desc=Validate%20API%20responses%20with%20JSON%20Schema', width: 1200, height: 630, alt: 'How to Validate API Response Using JSON Schema | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validate API Response with JSON Schema',
    description: 'Validate API responses using JSON Schema in JavaScript, Python, and Node.js. Libraries, patterns, and error handling examples included.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-validate-api-response-using-json-schema' },

};

export default function HowToValidateApiResponseUsingJsonSchemaPage() {
  return <HowToValidateApiResponseUsingJsonSchemaClient />;
}
