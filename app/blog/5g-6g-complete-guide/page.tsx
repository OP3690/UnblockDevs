import type { Metadata } from 'next';
import FiveGSixGCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: '5G/6G Networks: Complete Guide to Next-Gen Connectivity | UnblockDevs',
  description: '5G and 6G: architecture, use cases, network slicing, edge computing, IoT. Guide to next-gen wireless.',
  keywords: [
    '5g networks',
    '6g technology',
    '5g vs 6g',
    'network slicing',
    'edge computing',
    'iot connectivity',
    'wireless networks'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/5g-6g-complete-guide' },

};

export default function FiveGSixGCompleteGuide() {
  return <FiveGSixGCompleteGuideClient />;
}

