import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator – No Login Required | UnblockDevs',
  description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  keywords: [
    'json formatter',
    'json formatter online',
    'json formatter free',
    'format json online',
    'beautify json',
    'prettify json',
    'json beautifier',
    'format json tool'
  ],
  alternates: { canonical: 'https://unblockdevs.com/json-formatter' },
};

export default function JsonFormatter() {
  return <JsonFormatterClient />;
}

