import type { Metadata } from 'next';
import DigitalProvenanceClient from './client';

export const metadata: Metadata = {
  title: 'Digital Provenance: Complete Guide 2026 | UnblockDevs',
  description: 'Complete guide to digital provenance: definition, what it is, when to use it, how it works, and why it matters. Learn about data lineage, digital authenticity, blockchain provenance, supply chain traceability, and content verification.',
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
};

export default function DigitalProvenance() {
  return <DigitalProvenanceClient />;
}

