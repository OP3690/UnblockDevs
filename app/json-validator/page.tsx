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
  openGraph: {
    title: 'Free JSON Validator & Syntax Checker | UnblockDevs',
    description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-validator',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Free JSON Validator | UnblockDevs', description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.' },
  alternates: { canonical: 'https://unblockdevs.com/json-validator' },
};

export default function JsonValidator() {
  return <JsonValidatorClient />;
}

