import type { Metadata } from 'next';
import HowToValidateJsonSchemaJavaScriptClient from './client';

export const metadata: Metadata = {
  title: 'How to Validate JSON Schema in JavaScript | Complete Guide 2026',
  description: 'Validate JSON against JSON Schema in JavaScript: ajv, jsonschema, custom validation. Examples and best practices.',
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
    description: 'Validate JSON with JSON Schema in JavaScript. Examples and best practices.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-validate-json-schema-javascript',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Validate JSON Schema in JavaScript | Complete Guide 2026',
    description: 'Validate JSON with JSON Schema in JavaScript. Examples and best practices.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-validate-json-schema-javascript' },

};

export default function HowToValidateJsonSchemaJavaScriptPage() {
  return <HowToValidateJsonSchemaJavaScriptClient />;
}
