import type { Metadata } from 'next';
import JsonValidatorClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Validator & Syntax Checker – Instant Results | UnblockDevs',
  description: 'Validate JSON syntax and check for errors instantly. Free online JSON validator with detailed error messages. No signup, no login, 100% private. Works entirely in your browser.',
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

