import type { Metadata } from 'next';
import AiNativeDevelopmentPlatformsClient from './client';

export const metadata: Metadata = {
  title: 'AI-Native Development Platforms: Complete Guide 2026 | UnblockDevs',
  description: 'Complete guide to AI-native development platforms: what they are, when to use them, how they work. AI-first tools and best practices.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai-native development platforms',
    'ai-native development platforms 2026',
    'ai native development platforms 2026',
    'ai-native platforms',
    'ai development platforms',
    'ai-first development',
    'ai-powered development tools',
    'ai-native applications',
    'ai development framework',
    'ai-native software development',
    'ai platform development',
    'ai-native architecture',
    'ai development environment',
    'ai-native programming',
    'ai development tools',
    'ai-native platform comparison',
    'ai development best practices',
    'ai-native vs traditional development',
    'ai development platform features',
    'ai-native development guide',
    'ai platform architecture',
    'ai-native development workflow'
  ],
  openGraph: {
    title: 'AI-Native Development Platforms: Complete Guide 2026 | UnblockDevs',
    description: 'Complete guide to AI-native development platforms: what they are, when to use them, how they work. AI-first tools and best practices.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/ai-native-development-platforms-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-native-development-platforms-complete-guide' },
};

export default function AiNativeDevelopmentPlatforms() {
  return <AiNativeDevelopmentPlatformsClient />;
}

