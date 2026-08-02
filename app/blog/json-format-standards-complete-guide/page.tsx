import type { Metadata } from 'next';
import JsonFormatStandardsGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON Format Standards & RFC 8259 Complete Guide | UnblockDevs',
  description: 'JSON format standards and RFC 8259 explained: syntax rules, error classification, fixing strategies, and production-grade validation for API developers.',
  keywords: [
    'JSON format standards',
    'RFC 8259 JSON',
    'JSON syntax rules',
    'JSON format guide',
    'JSON specification',
    'JSON validation guide',
    'JSON error types',
    'JSON fixing strategies',
    'JSON production validation',
    'what is RFC 8259',
    'JSON format rules for developers',
    'JSON standard compliance',
  ],
  openGraph: {
    title: 'JSON Format Standards & RFC 8259: The Complete Developer Reference',
    description: 'RFC 8259 defines how JSON must be formatted. This guide covers syntax rules, common error types, auto-fix strategies, and production-grade validation techniques for developers and API designers.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'RFC 8259', 'JSON Format', 'JSON Standards', 'Web Development'],
    url: 'https://unblockdevs.com/blog/json-format-standards-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Format%20%26%20RFC%208259%20Guide&emoji=%7B%7D&desc=JSON%20format%20%26%20RFC%208259%3A%20syntax%20rules%2C%20fixing%20strategies%2C%20production-grade', width: 1200, height: 630, alt: 'JSON Format & RFC 8259 Guide — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Format Standards & RFC 8259 Complete Guide',
    description: 'RFC 8259 JSON format rules explained: syntax requirements, error types, fixing strategies, and production-grade validation for API developers.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-format-standards-complete-guide' },

};

export default function JsonFormatStandardsGuide() {
  return <JsonFormatStandardsGuideClient />;
}

