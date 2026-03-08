import type { Metadata } from 'next';
import JsonValidatorClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Validator & Syntax Checker – Instant Results | UnblockDevs',
  description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.',
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
  alternates: { canonical: 'https://unblockdevs.com/json-validator' },
};

export default function JsonValidator() {
  return <JsonValidatorClient />;
}

