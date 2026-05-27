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
    'confidential cloud',
    'confidential computing 2026',
    'secure data processing',
    'hardware security enclaves',
    'azure confidential computing',
    'google confidential computing',
    'intel sgx confidential computing',
    'amd sev',
    'confidential vm',
    'tee security',
    'what is confidential computing',
    'confidential computing use cases',
    'secure multi-party computation'
  ],
  openGraph: {
    title: 'Confidential Computing: Complete Guide',
    description: 'Confidential Computing: TEE, secure enclaves, data protection',
    type: 'article',
    url: 'https://unblockdevs.com/blog/confidential-computing-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Confidential%20Computing%3A%20Complete%20Guide&emoji=%F0%9F%93%96&desc=Confidential%20Computing%3A%20TEE%2C%20secure%20enclaves%2C%20data%20protection', width: 1200, height: 630, alt: 'Confidential Computing: Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confidential Computing: Complete Guide',
    description: 'Confidential Computing: TEE, secure enclaves, data protection',
    images: ['https://unblockdevs.com/api/og?title=Confidential%20Computing%3A%20Complete%20Guide&emoji=%F0%9F%93%96&desc=Confidential%20Computing%3A%20TEE%2C%20secure%20enclaves%2C%20data%20protection'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/confidential-computing-complete-guide' },

};

export default function ConfidentialComputingCompleteGuide() {
  return <ConfidentialComputingCompleteGuideClient />;
}

