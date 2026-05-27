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
  openGraph: {
    title: '5G/6G Networks: Complete Guide to Next-Gen Connectivity',
    description: '5G and 6G: architecture, use cases, network slicing, edge computing, IoT',
    type: 'article',
    url: 'https://unblockdevs.com/blog/5g-6g-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=5G/6G%20Networks%3A%20Complete%20Guide%20to%20Next-Gen%20Connectivity&emoji=%F0%9F%9A%80&desc=5G%20and%206G%3A%20architecture%2C%20use%20cases%2C%20network%20slicing%2C%20edge%20computing%2C%20IoT', width: 1200, height: 630, alt: '5G/6G Networks: Complete Guide to Next-Gen Connectivity — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5G/6G Networks: Complete Guide to Next-Gen Connectivity',
    description: '5G and 6G: architecture, use cases, network slicing, edge computing, IoT',
    images: ['https://unblockdevs.com/api/og?title=5G/6G%20Networks%3A%20Complete%20Guide%20to%20Next-Gen%20Connectivity&emoji=%F0%9F%9A%80&desc=5G%20and%206G%3A%20architecture%2C%20use%20cases%2C%20network%20slicing%2C%20edge%20computing%2C%20IoT'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/5g-6g-complete-guide' },

};

export default function FiveGSixGCompleteGuide() {
  return <FiveGSixGCompleteGuideClient />;
}

