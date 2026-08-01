import type { Metadata } from 'next';
import AiSecurityPlatformsClient from './client';

export const metadata: Metadata = {
  title: 'AI Security Platforms: Complete Guide 2026 | UnblockDevs',
  description: 'Complete guide to AI security platforms: what they are, when to use them, how they work. AI security, model protection, data privacy.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai security platforms',
    'ai security',
    'ai model security',
    'ai threat detection',
    'ai security solutions',
    'adversarial ai defense',
    'ai data privacy',
    'ai security tools',
    'ai model protection',
    'ai security framework',
    'ai security best practices',
    'ai vulnerability scanning',
    'ai security monitoring',
    'ai security platform comparison',
    'ai security guide',
    'ai security architecture',
    'ai security compliance',
    'ai security testing',
    'ai security governance',
    'ai security platform features'
  ],
  openGraph: {
    title: 'AI Security Platforms: Complete Guide 2026 | UnblockDevs',
    description: 'Complete guide to AI security platforms: what they are, when to use them, how they work. AI security, model protection, data privacy.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-security-platforms-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Security%20Platforms%3A%20Complete%20Guide%202026&emoji=%F0%9F%94%92&desc=Complete%20guide%20to%20AI%20security%20platforms%3A%20what%20they%20are%2C%20when%20to%20use%20them%2C%20how', width: 1200, height: 630, alt: 'AI Security Platforms: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Security Platforms: Complete Guide 2026 | UnblockDevs',
    description: 'Complete guide to AI security platforms: what they are, when to use them, how they work. AI security, model protection, data privacy.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-security-platforms-complete-guide' },
  robots: { index: false, follow: false },
};

export default function AiSecurityPlatforms() {
  return <AiSecurityPlatformsClient />;
}

