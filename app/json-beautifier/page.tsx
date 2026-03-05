import type { Metadata } from 'next';
import JsonBeautifierClient from './client';

export const metadata: Metadata = {
  title: 'JSON Beautifier Online - Developer JSON Workbench | Format, Validate, Fix | UnblockDevs',
  description: 'Developer JSON workbench: format json, fix invalid JSON, tree view with JSONPath, TypeScript & SQL generator, sensitive data detection. JSON beautifier, formatter, validator, parser online. Free, no signup.',
  keywords: [
    'json beautifier online',
    'format json',
    'json formatter tool',
    'json validator online',
    'json viewer',
    'json parser tool',
    'json beautifier',
    'json formatter',
    'prettify json',
    'developer json toolkit',
  ],
  openGraph: {
    title: 'JSON Beautifier Online - Developer JSON Workbench | UnblockDevs',
    description: 'Format, validate, fix JSON. Tree view, JSONPath, TypeScript & SQL generator. JSON beautifier and workbench for developers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-beautifier',
  },
};

export default function JsonBeautifierPage() {
  return <JsonBeautifierClient />;
}
