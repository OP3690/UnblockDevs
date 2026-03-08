import type { Metadata } from 'next';
import JsonBeautifierClient from './client';

export const metadata: Metadata = {
  title: 'JSON Beautifier Online – Format, Validate, Fix | UnblockDevs',
  description: 'Format, validate, fix JSON. Tree view, JSONPath, TypeScript & SQL generator. JSON beautifier and workbench for developers. Free, no signup.',
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
    title: 'JSON Beautifier Online | UnblockDevs',
    description: 'Format, validate, fix JSON. Tree view, JSONPath, TypeScript & SQL generator. JSON beautifier and workbench for developers.',
    type: 'website',
    url: 'https://unblockdevs.com/json-beautifier',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-beautifier',
  },
};

export default function JsonBeautifierPage() {
  return <JsonBeautifierClient />;
}
