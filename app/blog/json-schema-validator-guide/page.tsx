import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON Schema Validation Guide — AJV & OpenAPI | UnblockDevs',
  description:
    'Complete JSON Schema guide: required fields, types, enum, format, and pattern keywords. Draft 7 vs 2020-12 differences. AJV in Node.js. Free online validator.',
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
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Schema%20Validation%20Guide%20%E2%80%94%20Draft%207%2C%202020-12%2C%20AJV%20%26%20OpenAPI&emoji=%7B%7D&desc=JSON%20Schema%20keywords%2C%20Draft%207%20vs%202020-12%2C%20AJV%20in%20Node', width: 1200, height: 630, alt: 'JSON Schema Validation Guide — Draft 7, 2020-12, AJV & OpenAPI — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Validation Guide — Draft 7, 2020-12, AJV & OpenAPI',
    description: 'JSON Schema keywords, Draft 7 vs 2020-12, AJV setup in Node.js, allOf/anyOf/oneOf composition — with a free online JSON Schema validator.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-validator-guide' },
};

export default function JsonSchemaValidatorGuidePage() {
  return <BlogPostClient />;
}
