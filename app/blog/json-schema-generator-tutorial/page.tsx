import type { Metadata } from 'next';
import JsonSchemaGeneratorTutorialClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Generator Tutorial: Create Schemas from JSON | UnblockDevs',
  description: 'Generate JSON Schema from sample JSON. Draft 7, OpenAPI. Validate JSON. Free tool, examples.',
  keywords: [
    'json schema generator tutorial',
    'how to create json schema',
    'generate json schema from json',
    'json schema tutorial',
    'json schema examples',
    'json schema validation',
    'create json schema online'
  ],
  openGraph: {
    title: 'JSON Schema Generator Tutorial: Create Schemas from JSON',
    description: 'Generate and validate JSON Schema. Step-by-step with examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/json-schema-generator-tutorial',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-generator-tutorial' },

};

export default function JsonSchemaGeneratorTutorial() {
  return <JsonSchemaGeneratorTutorialClient />;
}

