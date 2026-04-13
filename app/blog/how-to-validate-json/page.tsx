import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Validate JSON — Syntax Checking, Schema Validation & Error Fixes | UnblockDevs',
  description:
    'Complete guide to JSON validation: syntax checking with exact error positions, JSON Schema validation with AJV, required fields, type checking, enum constraints — with code examples in JavaScript and Python.',
  keywords: [
    'how to validate json',
    'validate json online',
    'json validator online free',
    'json syntax checker',
    'json schema validator',
    'validate json syntax',
    'json validation tool',
    'json checker online',
    'validate json against schema',
    'json schema validation javascript',
    'ajv json validator',
    'json validation errors',
    'json schema required fields',
    'json type validation',
    'json validate online free',
  ],
  openGraph: {
    title: 'How to Validate JSON — Syntax Checking, Schema Validation & Error Fixes | UnblockDevs',
    description: 'JSON syntax and schema validation: exact error positions, required fields, type checking, AJV in Node.js, jsonschema in Python, free online validator.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-validate-json',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Validate JSON — Syntax, Schema & Error Fixes',
    description: 'Validate JSON syntax and structure. AJV, jsonschema, required fields, type checking — with a free online JSON validator.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-validate-json' },
};

export default function HowToValidateJsonPage() {
  return <BlogPostClient />;
}
