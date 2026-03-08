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
  openGraph: {
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-formatter',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  },
  alternates: { canonical: 'https://unblockdevs.com/json-formatter' },
};

export default function JsonFormatter() {
  return <JsonFormatterClient />;
}

