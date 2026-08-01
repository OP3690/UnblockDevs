import type { Metadata } from 'next';
import PhysicalAiSystemsClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI Systems: Complete Guide 2026 | UnblockDevs',
  description: 'Physical AI systems: robotics, autonomous vehicles, smart manufacturing, edge AI. What, when, how.',
  keywords: [
    'physical ai systems',
    'physical ai',
    'ai-powered physical systems',
    'embodied ai',
    'physical intelligence',
    'ai robotics',
    'autonomous systems',
    'smart manufacturing ai',
    'edge ai systems',
    'physical computing ai',
    'ai actuators',
    'ai sensors',
    'physical ai applications',
    'ai in robotics',
    'autonomous vehicles ai',
    'physical ai guide',
    'embodied intelligence',
    'ai control systems',
    'physical ai technology',
    'ai hardware systems'
  ],
  openGraph: {
    title: 'Physical AI Systems: Complete Guide 2026',
    description: 'Physical AI systems: robotics, autonomous vehicles, smart manufacturing, edge AI. What, when, how.',
    type: 'article',
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/physical-ai-systems-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Physical%20AI%20Systems%3A%20Complete%20Guide%202026&emoji=%F0%9F%93%9D&desc=Physical%20AI%20systems%3A%20robotics%2C%20autonomous%20vehicles%2C%20smart%20manufacturing%2C%20edge%20AI', width: 1200, height: 630, alt: 'Physical AI Systems: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical AI Systems: Complete Guide 2026',
    description: 'Physical AI systems: robotics, autonomous vehicles, smart manufacturing, edge AI. What, when, how.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-systems-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiSystems() {
  return <PhysicalAiSystemsClient />;
}

