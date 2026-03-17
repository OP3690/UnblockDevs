import type { Metadata } from 'next';
import PhysicalAiCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI: Complete Guide to AI in Physical World | UnblockDevs',
  description: 'Physical AI: robotics, autonomous systems, IoT. How AI interacts with the physical world.',
  keywords: [
    'physical ai',
    'ai robotics',
    'autonomous systems',
    'ai in physical world',
    'robotic ai',
    'embodied ai',
    'ai hardware'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiCompleteGuide() {
  return <PhysicalAiCompleteGuideClient />;
}

