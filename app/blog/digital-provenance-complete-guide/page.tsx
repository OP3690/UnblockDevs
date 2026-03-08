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
    'provenance verification'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/digital-provenance-complete-guide' },

};

export default function DigitalProvenance() {
  return <DigitalProvenanceClient />;
}

