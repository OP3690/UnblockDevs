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
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Schema%20Generator%20Tutorial%3A%20Create%20Schemas%20from%20JSON&emoji=%7B%7D&desc=Generate%20and%20validate%20JSON%20Schema', width: 1200, height: 630, alt: 'JSON Schema Generator Tutorial: Create Schemas from JSON — UnblockDevs Blog' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-generator-tutorial' },

};

export default function JsonSchemaGeneratorTutorial() {
  return <JsonSchemaGeneratorTutorialClient />;
}

