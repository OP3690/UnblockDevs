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
    url: 'https://unblockdevs.com/blog/ai-security-platforms-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-security-platforms-complete-guide' },
  robots: { index: false, follow: false },
};

export default function AiSecurityPlatforms() {
  return <AiSecurityPlatformsClient />;
}

