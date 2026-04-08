import type { Metadata } from 'next';
import AiNativePlatformsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI-Native Platforms: Complete Guide | UnblockDevs',
  description: 'AI-Native Platforms: architecture, implementation, use cases. Build AI-first apps. Practical examples.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai-native platforms',
    'ai native development',
    'ai-first applications',
    'ai platform architecture',
    'native ai platforms',
    'ai-native software',
    'ai platform development',
    'ai-native development platforms 2026',
    'ai native development platforms 2026',
    'ai-native development platforms',
    'ai native platforms 2026'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-native-platforms-complete-guide' },

};

export default function AiNativePlatformsCompleteGuide() {
  return <AiNativePlatformsCompleteGuideClient />;
}

