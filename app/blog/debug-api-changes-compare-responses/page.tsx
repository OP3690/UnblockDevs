import type { Metadata } from 'next';
import DebugApiChangesClient from './client';

export const metadata: Metadata = {
  title: 'Debug API Changes: Compare Two API Responses | UnblockDevs',
  description: 'Compare two API responses visually to debug changes and detect breaking modifications. Free API comparator tool — paste two JSON payloads and diff them instantly.',
  keywords: [
    'compare two JSON API responses',
    'API payload diff tool',
    'debug API changes',
    'API response comparator',
    'API diff tool',
    'compare API responses',
    'API version comparison',
    'API debugging tool',
    'API response diff',
    'detect API changes',
    'API breaking changes',
    'API response analyzer'
  ],
  openGraph: {
    title: 'Debug API Changes Faster: Visually Compare Two API Responses Side-by-Side',
    description: 'Learn how to debug API changes by visually comparing two API responses. Spot breaking changes, payload drift, and unexpected modifications fast. Try our free API response comparator tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['API', 'Debugging', 'API Testing', 'Web Development'],
    url: 'https://unblockdevs.com/blog/debug-api-changes-compare-responses',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Debug%20API%20Changes%20Faster%3A%20How%20to%20Compare%20Two%20API%20Responses%20Visually&emoji=%F0%9F%94%A7&desc=Compare%20API%20responses%20visually', width: 1200, height: 630, alt: 'Debug API Changes Faster: How to Compare Two API Responses Visually — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug API Changes: Compare Two API Responses',
    description: 'Visually compare two API responses to catch breaking changes and payload drift. Free API diff tool — paste two JSON responses and see the diff instantly.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/debug-api-changes-compare-responses' },

};

export default function DebugApiChanges() {
  return <DebugApiChangesClient />;
}

