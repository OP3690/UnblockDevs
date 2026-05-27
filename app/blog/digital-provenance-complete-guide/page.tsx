import type { Metadata } from 'next';
import DigitalProvenanceClient from './client';

export const metadata: Metadata = {
  title: 'Digital Provenance: Complete Guide 2026 | UnblockDevs',
  description: 'Digital provenance: definition, when to use, how it works. Data lineage, authenticity, blockchain, supply chain.',
  keywords: [
    'digital provenance',
    'data provenance',
    'digital authenticity',
    'data lineage',
    'provenance tracking',
    'digital traceability',
    'blockchain provenance',
    'content verification',
    'supply chain provenance',
    'digital asset provenance',
    'provenance systems',
    'data authenticity',
    'digital forensics',
    'provenance blockchain',
    'supply chain traceability',
    'digital provenance guide',
    'provenance technology',
    'data provenance tools',
    'digital provenance solutions',
    'provenance verification',
    'digital provenance validation standard 2026',
    'digital provenance standard',
    'content authenticity provenance 2026'
  ],
  openGraph: {
    title: 'Digital Provenance: Complete Guide 2026',
    description: 'Digital provenance: definition, when to use, how it works',
    type: 'article',
    url: 'https://unblockdevs.com/blog/digital-provenance-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Digital%20Provenance%3A%20Complete%20Guide%202026&emoji=%F0%9F%94%97&desc=Digital%20provenance%3A%20definition%2C%20when%20to%20use%2C%20how%20it%20works', width: 1200, height: 630, alt: 'Digital Provenance: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Provenance: Complete Guide 2026',
    description: 'Digital provenance: definition, when to use, how it works',
    images: ['https://unblockdevs.com/api/og?title=Digital%20Provenance%3A%20Complete%20Guide%202026&emoji=%F0%9F%94%97&desc=Digital%20provenance%3A%20definition%2C%20when%20to%20use%2C%20how%20it%20works'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/digital-provenance-complete-guide' },
};

export default function DigitalProvenance() {
  return <DigitalProvenanceClient />;
}

