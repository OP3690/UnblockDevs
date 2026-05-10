import type { Metadata } from 'next';
import HiddenJsonErrorsClient from './client';

export const metadata: Metadata = {
  title: 'Hidden JSON Errors That Silently Break Your App — Duplicate Keys, BOM, Precision Loss | UnblockDevs',
  description: 'The sneaky JSON bugs that never throw exceptions but corrupt your data: duplicate keys, BOM characters, number precision loss, deep nesting, and control characters explained.',
  keywords: [
    'json duplicate keys bug',
    'json silent errors',
    'json bom character fix',
    'json number precision loss',
    'json data corruption bug',
    'hidden json errors',
    'json duplicate key behavior',
    'json float precision javascript',
    'json control characters',
    'json deep nesting limit',
    'json encoding bug',
    'json key order guarantee',
    'json parser duplicate key',
  ],
  openGraph: {
    title: 'Hidden JSON Errors That Silently Break Your App',
    description: 'The sneaky JSON bugs that never throw exceptions but corrupt your data: duplicate keys, BOM characters, number precision loss, and more.',
    type: 'article',
    publishedTime: '2026-05-10T10:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/hidden-json-errors-that-silently-break-apps',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — Hidden JSON Errors Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidden JSON Errors That Silently Break Your App',
    description: 'Duplicate keys, BOM, precision loss — the JSON bugs that corrupt data without throwing a single exception.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/hidden-json-errors-that-silently-break-apps' },
};

export default function HiddenJsonErrorsPage() {
  return <HiddenJsonErrorsClient />;
}
