import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Validate JSON — Schema & Syntax Checking | UnblockDevs',
  description:
    'Validate JSON syntax and schema: check error positions, required fields, type checking, and enum constraints. AJV for JavaScript, jsonschema for Python. Free tool.',
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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Validate%20JSON%20%E2%80%94%20Syntax%20Checking%2C%20Schema%20Validation%20%26%20Error%20Fixes&emoji=%7B%7D&desc=JSON%20syntax%20and%20schema%20validation%3A%20exact%20error%20positions%2C%20required%20fields%2C%20type', width: 1200, height: 630, alt: 'How to Validate JSON — Syntax Checking, Schema Validation & Error Fixes — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Validate JSON — Syntax, Schema & Error Fixes',
    description: 'Validate JSON syntax and structure with exact error positions. Use AJV for JavaScript or jsonschema for Python. Free online JSON validator included.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-validate-json' },
};

export default function HowToValidateJsonPage() {
  return <BlogPostClient />;
}
