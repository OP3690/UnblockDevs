import type { Metadata } from 'next';
import JsonSchemaGeneratorTutorialClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Generator Tutorial: Auto-Create Schemas | UnblockDevs',
  description: 'Generate JSON Schema from sample JSON in minutes. Covers JSON Schema Draft 7, OpenAPI support, validation, and step-by-step examples using free tools.',
  keywords: [
    'json schema generator tutorial',
    'generate json schema from json',
    'how to create json schema',
    'json schema tutorial',
    'json schema examples',
    'json schema validation',
    'json schema draft 7',
    'json schema openapi',
    'create json schema online',
    'json schema generator free',
    'how to auto-generate json schema',
    'json schema from sample data',
  ],
  openGraph: {
    title: 'JSON Schema Generator Tutorial: Create and Validate Schemas from JSON',
    description: 'Learn how to generate JSON Schema automatically from sample JSON. This tutorial covers Draft 7, OpenAPI compatibility, free generator tools, validation, and step-by-step examples for any skill level.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-schema-generator-tutorial',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Schema%20Generator%20Tutorial%3A%20Create%20Schemas%20from%20JSON&emoji=%7B%7D&desc=Generate%20and%20validate%20JSON%20Schema', width: 1200, height: 630, alt: 'JSON Schema Generator Tutorial: Create Schemas from JSON — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Generator Tutorial: Auto-Create Schemas',
    description: 'Generate JSON Schema from any JSON sample instantly. Covers Draft 7, OpenAPI, free generator tools, and validation with step-by-step examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-generator-tutorial' },

};

export default function JsonSchemaGeneratorTutorial() {
  return <JsonSchemaGeneratorTutorialClient />;
}

