import type { Metadata } from 'next';
import JsonSchemaGenerationClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Generation - Free Online Schema Generator | UnblockDevs',
  description: 'Free online JSON Schema generator. Generate JSON Schema from sample JSON automatically. Supports Draft 7 and OpenAPI formats. Validate JSON against schemas. No signup required.',
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
};

export default function JsonSchemaGeneration() {
  return <JsonSchemaGenerationClient />;
}

