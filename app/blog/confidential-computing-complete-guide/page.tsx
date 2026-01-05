import type { Metadata } from 'next';
import ConfidentialComputingCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Confidential Computing: Complete Guide to Secure Data Processing | UnblockDevs',
  description: 'Comprehensive guide to Confidential Computing: TEE, secure enclaves, data protection, privacy-preserving computation. Learn how confidential computing works and its applications.',
  keywords: [
    'confidential computing',
    'trusted execution environment',
    'secure enclaves',
    'data encryption',
    'privacy computing',
    'tee technology',
    'confidential cloud'
  ],
};

export default function ConfidentialComputingCompleteGuide() {
  return <ConfidentialComputingCompleteGuideClient />;
}

