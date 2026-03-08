import type { Metadata } from 'next';
import JsonFormatStandardsGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON Format & RFC 8259 Guide | UnblockDevs',
  description: 'JSON format & RFC 8259: syntax rules, fixing strategies, error classification, production-grade validation. For developers & API designers.',
  keywords: [
    'JSON format',
    'JSON standards',
    'RFC 8259',
    'JSON syntax rules',
    'JSON validation',
    'JSON fixing',
    'JSON parser',
    'JSON best practices',
    'JSON structure',
    'JSON syntax errors',
    'JSON format guide',
    'JSON specification',
    'JSON rules',
    'JSON compliance',
    'JSON validator',
    'JSON error detection',
    'JSON fixing algorithm',
    'JSON production guide'
  ],
  openGraph: {
    title: 'JSON Format & RFC 8259 Guide | UnblockDevs',
    description: 'JSON format & RFC 8259: syntax rules, fixing strategies, production-grade validation. For developers & API designers.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'RFC 8259', 'JSON Format', 'JSON Standards', 'Web Development'],
    url: 'https://unblockdevs.com/blog/json-format-standards-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Format & RFC 8259 Guide',
    description: 'JSON format & RFC 8259: syntax rules, fixing strategies, production-grade validation. For developers & API designers.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-format-standards-complete-guide' },

};

export default function JsonFormatStandardsGuide() {
  return <JsonFormatStandardsGuideClient />;
}

