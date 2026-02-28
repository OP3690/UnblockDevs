import type { Metadata } from 'next';
import AiSecurityPlatformsClient from './client';

export const metadata: Metadata = {
  title: 'AI Security Platforms: Complete Guide 2026 | UnblockDevs',
  description: 'UnblockDevs AI Guide: Complete guide to AI security platforms: definition, what they are, when to use them, how they work, and why they matter. Learn about AI security, model protection, adversarial defense, data privacy, and AI threat detection platforms.',
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
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-security-platforms-complete-guide' },
};

export default function AiSecurityPlatforms() {
  return <AiSecurityPlatformsClient />;
}

