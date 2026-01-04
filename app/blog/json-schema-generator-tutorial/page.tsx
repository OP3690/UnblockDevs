import type { Metadata } from 'next';
import JsonSchemaGeneratorTutorialClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Generator Tutorial: Create Schemas from JSON | UnblockDevs',
  description: 'Complete tutorial on generating JSON Schema from sample JSON. Learn how to create schemas, validate JSON, use Draft 7 and OpenAPI formats. Free generator tool with examples.',
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
    description: 'Step-by-step tutorial on generating and validating JSON Schema with real examples.',
    type: 'article',
  },
};

export default function JsonSchemaGeneratorTutorial() {
  return <JsonSchemaGeneratorTutorialClient />;
}

