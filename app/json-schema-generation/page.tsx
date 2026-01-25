import type { Metadata } from 'next';
import JsonSchemaGenerationClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Schema Generator – Auto-Generate from JSON | UnblockDevs',
  description: 'Generate JSON Schema from sample JSON automatically. Free online schema generator supporting Draft 7 and OpenAPI. No signup, no login, instant results. Works entirely in your browser.',
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
  alternates: {
    canonical: 'https://unblockdevs.com/json-schema-generation',
  },
};

export default function JsonSchemaGeneration() {
  return <JsonSchemaGenerationClient />;
}

