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
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-systems-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiSystems() {
  return <PhysicalAiSystemsClient />;
}

