import type { Metadata } from 'next';
import PhysicalAiEdgeComputingClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI Edge Computing 2026 | UnblockDevs',
  description: 'Guide to Physical AI edge computing: what it is, when to use it, how it works. Edge AI, real-time processing, IoT AI.',
  keywords: [
    'physical ai edge computing',
    'edge ai',
    'edge computing ai',
    'edge ai systems',
    'real-time ai processing',
    'edge devices ai',
    'iot ai',
    'edge ai hardware',
    'distributed ai systems',
    'edge ai inference',
    'edge ai training',
    'edge ai applications',
    'edge ai platforms',
    'edge ai devices',
    'edge ai technology',
    'edge ai guide',
    'edge computing physical ai',
    'edge ai solutions',
    'edge ai infrastructure',
    'edge ai deployment'
  ],
  openGraph: {
    title: 'Physical AI Edge Computing: Complete Guide 2026 | Edge AI & Real-Time Processing',
    description: 'Guide to Physical AI edge computing: what it is, when to use it, how it works. Edge AI, real-time processing, IoT AI.',
    type: 'article',
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/physical-ai-edge-computing-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Physical%20AI%20Edge%20Computing%3A%20Complete%20Guide%202026%20%7C%20Edge%20AI%20%26%20Real-Time%20Processing&emoji=%F0%9F%A4%96&desc=Guide%20to%20Physical%20AI%20edge%20computing%3A%20what%20it%20is%2C%20when%20to%20use%20it%2C%20how%20it%20works', width: 1200, height: 630, alt: 'Physical AI Edge Computing: Complete Guide 2026 | Edge AI & Real-Time Processing — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical AI Edge Computing: Complete Guide 2026 | Edge AI & Real-Time Processing',
    description: 'Guide to Physical AI edge computing: what it is, when to use it, how it works. Edge AI, real-time processing, IoT AI.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-edge-computing-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiEdgeComputing() {
  return <PhysicalAiEdgeComputingClient />;
}

