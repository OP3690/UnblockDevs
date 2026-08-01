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
  openGraph: {
    title: 'Physical AI: Complete Guide to AI in Physical World',
    description: 'Physical AI: robotics, autonomous systems, IoT. How AI interacts with the physical world.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/physical-ai-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Physical%20AI%3A%20Complete%20Guide%20to%20AI%20in%20Physical%20World&emoji=%F0%9F%93%9D&desc=Physical%20AI%3A%20robotics%2C%20autonomous%20systems%2C%20IoT.%20How%20AI%20interacts%20with%20the%20physic', width: 1200, height: 630, alt: 'Physical AI: Complete Guide to AI in Physical World — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical AI: Complete Guide to AI in Physical World',
    description: 'Physical AI: robotics, autonomous systems, IoT. How AI interacts with the physical world.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-complete-guide' },
  robots: { index: false, follow: false },
};

export default function PhysicalAiCompleteGuide() {
  return <PhysicalAiCompleteGuideClient />;
}

