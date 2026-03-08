import type { Metadata } from 'next';
import JsonSchemaGenerationClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Schema Generator – Auto-Generate from JSON | UnblockDevs',
  description: 'Generate JSON Schema from sample JSON. Free schema generator for Draft 7 and OpenAPI. No signup, instant results in your browser.',
  keywords: [
    'json schema generation',
    'json schema generator',
    'generate json schema',
    'schema generator json',
    'creating a json schema',
    'json schema creation',
    'json schema from json',
    'auto generate json schema'
  ],
  openGraph: {
    title: 'Free JSON Schema Generator – Auto-Generate from JSON | UnblockDevs',
    description: 'Generate JSON Schema from sample JSON. Free schema generator for Draft 7 and OpenAPI. No signup, instant results in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-schema-generation',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-schema-generation',
  },
};

export default function JsonSchemaGeneration() {
  return <JsonSchemaGenerationClient />;
}

