import type { Metadata } from 'next';
import JsonValidatorClient from './client';

export const metadata: Metadata = {
  title: 'JSON Validator - Free Online JSON Validation Tool | UnblockDevs',
  description: 'Free online JSON Validator. Validate JSON syntax, check for errors, verify JSON structure instantly. No signup required. 100% privacy-focused JSON validation tool.',
  keywords: [
    'json validator',
    'json validator online',
    'json validator free',
    'validate json online',
    'json syntax validator',
    'json checker',
    'json validation tool',
    'validate json syntax'
  ],
};

export default function JsonValidator() {
  return <JsonValidatorClient />;
}

