import type { Metadata } from 'next';
import JsonComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Comparator Online - Compare Two JSON Objects | UnblockDevs',
  description: 'Compare two JSON objects side-by-side instantly. Free online JSON comparator tool to find differences, detect changes, and analyze JSON structures. No signup required.',
  keywords: [
    'json comparator',
    'compare json objects',
    'json diff tool',
    'compare two json',
    'json comparison',
    'json diff',
    'json difference finder',
    'compare json online'
  ],
  openGraph: {
    title: 'Free JSON Comparator Online - Compare Two JSON Objects',
    description: 'Compare two JSON objects side-by-side instantly. Free online JSON comparator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-comparator',
  },
};

export default function JsonComparatorPage() {
  return <JsonComparatorClient />;
}
