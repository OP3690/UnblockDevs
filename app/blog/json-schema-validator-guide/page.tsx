import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Validation Guide — Draft 7, 2020-12, AJV & OpenAPI | UnblockDevs',
  description:
    'Complete JSON Schema guide: required fields, types, enum, format, pattern — all core keywords. Draft 7 vs 2020-12 differences. AJV setup in Node.js. Schema composition with allOf, anyOf, oneOf. Free online validator.',
  keywords: [
    'json schema validator',
    'json schema validation',
    'json schema draft 7',
    'json schema 2020-12',
    'ajv json schema validator',
    'json schema guide',
    'json schema required fields',
    'json schema type validation',
    'json schema allof anyof oneof',
    'json schema online validator',
    'openapi json schema',
    'validate json against schema online',
    'json schema ajv nodejs',
    'json schema format validation',
    'json schema additionalproperties',
  ],
  openGraph: {
    title: 'JSON Schema Validation Guide — Draft 7, 2020-12, AJV & OpenAPI | UnblockDevs',
    description: 'JSON Schema keywords, Draft 7 vs 2020-12, AJV in Node.js, allOf/anyOf/oneOf composition, additionalProperties vs unevaluatedProperties — complete guide with examples.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-schema-validator-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Validation Guide — Draft 7, 2020-12, AJV & OpenAPI',
    description: 'JSON Schema keywords, Draft 7 vs 2020-12, AJV setup, composition, and free online JSON Schema validator.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-validator-guide' },
};

export default function JsonSchemaValidatorGuidePage() {
  return <BlogPostClient />;
}
