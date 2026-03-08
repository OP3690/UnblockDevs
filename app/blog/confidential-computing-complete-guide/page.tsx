import type { Metadata } from 'next';
import ConfidentialComputingCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Confidential Computing: Complete Guide | UnblockDevs',
  description: 'Confidential Computing: TEE, secure enclaves, data protection. How it works and applications.',
  keywords: [
    'confidential computing',
    'trusted execution environment',
    'secure enclaves',
    'data encryption',
    'privacy computing',
    'tee technology',
    'confidential cloud'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/confidential-computing-complete-guide' },

};

export default function ConfidentialComputingCompleteGuide() {
  return <ConfidentialComputingCompleteGuideClient />;
}

