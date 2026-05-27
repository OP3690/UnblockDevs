import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apple Creator Studio: Complete Guide 2026 | UnblockDevs',
  description: 'Apple Creator Studio: features, how to use, benefits for creators. Guide to Apple\'s content platform for iOS, macOS.',
  keywords: [
    'apple creator studio',
    'apple creator studio guide',
    'apple creator studio tutorial',
    'apple content creation',
    'apple creator tools',
    'apple studio app',
    'apple creator platform',
    'apple content creator',
    'apple creator studio features',
    'apple creator studio how to',
    'apple creator studio benefits',
    'apple creator studio review',
    'apple creator studio 2026',
    'apple content creation tools',
    'apple creator studio ios',
    'apple creator studio macos',
    'apple creator studio setup',
    'apple creator studio tips',
    'apple creator studio best practices',
    'apple creator ecosystem'
  ],
  openGraph: {
    title: 'Apple Creator Studio: Complete Guide 2026',
    description: 'Learn everything about Apple Creator Studio - features, how to use it, benefits for content creators, and best practices.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/apple-creator-studio-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apple%20Creator%20Studio%3A%20Complete%20Guide%202026&emoji=%F0%9F%93%96&desc=Learn%20everything%20about%20Apple%20Creator%20Studio%20-%20features%2C%20how%20to%20use%20it%2C%20benefits', width: 1200, height: 630, alt: 'Apple Creator Studio: Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apple Creator Studio: Complete Guide 2026',
    description: 'Learn everything about Apple Creator Studio - features, how to use it, benefits for content creators, and best practices.',
  },
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/apple-creator-studio-complete-guide',
  },
};

import AppleCreatorStudioCompleteGuideClient from './client';

export default function AppleCreatorStudioCompleteGuidePage() {
  return <AppleCreatorStudioCompleteGuideClient />;
}
