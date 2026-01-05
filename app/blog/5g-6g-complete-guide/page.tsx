import type { Metadata } from 'next';
import FiveGSixGCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: '5G/6G Networks: Complete Guide to Next-Gen Connectivity | UnblockDevs',
  description: 'Comprehensive guide to 5G and 6G networks: architecture, technologies, use cases, and future of wireless connectivity. Learn about network slicing, edge computing, and IoT.',
  keywords: [
    '5g networks',
    '6g technology',
    '5g vs 6g',
    'network slicing',
    'edge computing',
    'iot connectivity',
    'wireless networks'
  ],
};

export default function FiveGSixGCompleteGuide() {
  return <FiveGSixGCompleteGuideClient />;
}

