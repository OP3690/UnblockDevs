import type { Metadata } from 'next';
import PhysicalAiCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI: Complete Guide to AI in Physical World | UnblockDevs',
  description: 'Comprehensive guide to Physical AI: robotics, autonomous systems, IoT integration, and AI-powered physical devices. Learn how AI interacts with the physical world.',
  keywords: [
    'physical ai',
    'ai robotics',
    'autonomous systems',
    'ai in physical world',
    'robotic ai',
    'embodied ai',
    'ai hardware'
  ],
};

export default function PhysicalAiCompleteGuide() {
  return <PhysicalAiCompleteGuideClient />;
}

