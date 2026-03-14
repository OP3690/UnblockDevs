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

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is JSON Schema?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON Schema is a vocabulary for annotating and validating JSON documents. It describes the structure, types, and constraints of your JSON so tools and APIs can validate data automatically. Draft 7 and OpenAPI-style schemas are widely supported.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I generate a JSON Schema from sample JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your sample JSON into the generator at unblockdevs.com/json-schema-generation. The tool infers types (string, number, boolean, array, object) and optional vs required fields, then outputs a Draft 7 or OpenAPI-compatible schema you can edit or use in validation.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is the generated schema free to use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The JSON Schema Generator is free with no signup. All processing runs in your browser—your data is never sent to any server. You can copy the schema and use it in your projects, APIs, or validation tools.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I use the schema with OpenAPI or API validation?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The generator can output schemas compatible with OpenAPI 3.0. Use the generated schema in your OpenAPI spec, or with validators like Ajv (JavaScript) or jsonschema (Python) to validate request/response bodies.',
      },
    },
  ],
};

export default function JsonSchemaGeneration() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonSchemaGenerationClient />
    </>
  );
}

