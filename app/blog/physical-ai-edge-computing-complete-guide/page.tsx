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
    url: 'https://unblockdevs.com/blog/physical-ai-edge-computing-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-edge-computing-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiEdgeComputing() {
  return <PhysicalAiEdgeComputingClient />;
}

