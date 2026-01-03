import type { Metadata } from 'next';
import DebugApiChangesClient from './client';

export const metadata: Metadata = {
  title: 'Debug API Changes Faster: How to Compare Two API Responses Visually | UnblockDevs',
  description: 'Learn how to compare two API responses visually to debug API changes, detect breaking changes, and identify response drift. Step-by-step guide with real-world examples using our free API Response Comparator tool.',
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
    description: 'Learn how to compare two API responses visually to debug API changes and detect breaking changes.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['API', 'Debugging', 'API Testing', 'Web Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug API Changes Faster: Compare Two API Responses',
    description: 'Compare two API responses visually to debug changes and detect breaking changes.',
  },
};

export default function DebugApiChanges() {
  return <DebugApiChangesClient />;
}

