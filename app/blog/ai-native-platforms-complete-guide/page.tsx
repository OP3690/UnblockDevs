import type { Metadata } from 'next';
import AiNativePlatformsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI-Native Platforms: Complete Guide to Next-Gen Development | UnblockDevs',
  description: 'Comprehensive guide to AI-Native Platforms: architecture, implementation, real-world use cases, and future trends. Learn how to build AI-first applications with practical examples.',
  keywords: [
    'ai-native platforms',
    'ai native development',
    'ai-first applications',
    'ai platform architecture',
    'native ai platforms',
    'ai-native software',
    'ai platform development'
  ],
};

export default function AiNativePlatformsCompleteGuide() {
  return <AiNativePlatformsCompleteGuideClient />;
}

