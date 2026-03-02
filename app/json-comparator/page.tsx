import type { Metadata } from 'next';
import JsonComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Smart JSON Data Diff - Semantic API Payload Comparison | UnblockDevs',
  description: 'Compare JSON by meaning, not text. Smart JSON Data Diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes appear. Client-side, private, no signup.',
  keywords: [
    'smart json diff',
    'json data diff',
    'semantic json comparison',
    'compare json api',
    'json diff tool',
    'compare json payloads',
    'json normalization',
    'api payload diff'
  ],
  openGraph: {
    title: 'Smart JSON Data Diff - Semantic API Payload Comparison',
    description: 'Compare JSON by meaning. Normalizes dynamic noise so only real logic changes appear. Client-side and private.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-comparator',
  },
};

export default function JsonComparatorPage() {
  return <JsonComparatorClient />;
}
