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
  openGraph: {
    title: 'AI-Native Platforms: Complete Guide',
    description: 'AI-Native Platforms: architecture, implementation, use cases. Build AI-first apps. Practical examples.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-native-platforms-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI-Native%20Platforms%3A%20Complete%20Guide&emoji=%F0%9F%93%9D&desc=AI-Native%20Platforms%3A%20architecture%2C%20implementation%2C%20use%20cases.%20Build%20AI-first%20app', width: 1200, height: 630, alt: 'AI-Native Platforms: Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Native Platforms: Complete Guide',
    description: 'AI-Native Platforms: architecture, implementation, use cases. Build AI-first apps. Practical examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-native-platforms-complete-guide' },

};

export default function AiNativePlatformsCompleteGuide() {
  return <AiNativePlatformsCompleteGuideClient />;
}

