import type { Metadata } from 'next';
import DebugApiChangesClient from './client';

export const metadata: Metadata = {
  title: 'Compare Two API Responses Visually | UnblockDevs',
  description: 'Compare two API responses visually. Debug changes, detect breaking changes. Free comparator tool.',
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
    title: 'Debug API Changes Faster: How to Compare Two API Responses Visually',
    description: 'Compare API responses visually. Debug changes, detect breaking changes.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['API', 'Debugging', 'API Testing', 'Web Development'],
    url: 'https://unblockdevs.com/blog/debug-api-changes-compare-responses',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug API Changes Faster: Compare Two API Responses',
    description: 'Compare API responses. Debug and detect breaking changes.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/debug-api-changes-compare-responses' },

};

export default function DebugApiChanges() {
  return <DebugApiChangesClient />;
}

