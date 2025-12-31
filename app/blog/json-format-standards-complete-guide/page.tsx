import type { Metadata } from 'next';
import JsonFormatStandardsGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON Format & Standards: Complete Guide to RFC 8259, Syntax Rules & Best Practices | UnblockDevs',
  description: 'Master JSON format and standards with this comprehensive guide. Learn RFC 8259 rules, syntax violations, fixing strategies, error classification, and production-grade JSON validation. Perfect for developers, API designers, and data engineers.',
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
    title: 'JSON Format & Standards: Complete Guide to RFC 8259 | UnblockDevs',
    description: 'Master JSON format and standards with this comprehensive guide. Learn RFC 8259 rules, syntax violations, fixing strategies, and production-grade JSON validation.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'RFC 8259', 'JSON Format', 'JSON Standards', 'Web Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Format & Standards: Complete Guide to RFC 8259',
    description: 'Master JSON format and standards with this comprehensive guide. Learn RFC 8259 rules, syntax violations, fixing strategies, and production-grade JSON validation.',
  },
};

export default function JsonFormatStandardsGuide() {
  return <JsonFormatStandardsGuideClient />;
}

