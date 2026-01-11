import type { Metadata } from 'next';
import HowToValidateJsonSchemaJavaScriptClient from './client';

export const metadata: Metadata = {
  title: 'How to Validate JSON Schema in JavaScript | Complete Guide 2026',
  description: 'Learn how to validate JSON data against JSON Schema in JavaScript using ajv, jsonschema, and custom validation. Includes examples, error handling, and best practices for JSON Schema validation.',
  keywords: [
    'validate JSON schema JavaScript',
    'JSON schema validation',
    'ajv JSON schema',
    'jsonschema library',
    'JSON schema validator',
    'validate JSON data',
    'JSON schema JavaScript',
    'schema validation JavaScript',
    'JSON validation library',
    'validate JSON format',
    'JSON schema check',
    'JavaScript JSON validator',
    'JSON schema example',
    'validate JSON structure',
    'JSON schema tutorial'
  ],
  openGraph: {
    title: 'How to Validate JSON Schema in JavaScript | Complete Guide 2026',
    description: 'Learn how to validate JSON data against JSON Schema in JavaScript with examples and best practices.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Validate JSON Schema in JavaScript | Complete Guide 2026',
    description: 'Learn how to validate JSON data against JSON Schema in JavaScript with examples and best practices.',
  },
};

export default function HowToValidateJsonSchemaJavaScriptPage() {
  return <HowToValidateJsonSchemaJavaScriptClient />;
}
