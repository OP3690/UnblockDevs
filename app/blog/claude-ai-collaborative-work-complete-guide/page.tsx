import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude AI for Collaborative Work: Complete Guide 2026 | UnblockDevs',
  description: 'Use Claude AI for collaborative work and team productivity. Features, best practices, use cases. Team collaboration with AI.',
  keywords: [
    'claude ai collaborative work',
    'claude ai teamwork',
    'claude ai for teams',
    'claude ai collaboration',
    'claude ai cowork',
    'claude ai productivity',
    'claude ai team tools',
    'claude ai workspace',
    'claude ai business',
    'claude ai enterprise',
    'anthropic claude collaboration',
    'claude ai features',
    'claude ai use cases',
    'claude ai best practices',
    'claude ai workflow',
    'ai collaboration tools',
    'claude ai integration',
    'claude ai tips',
    'claude ai guide',
    'claude ai tutorial'
  ],
  openGraph: {
    title: 'Claude AI for Collaborative Work: Complete Guide 2026',
    description: 'Learn how to use Claude AI for collaborative work and team productivity. Complete guide with features, best practices, and use cases.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/claude-ai-collaborative-work-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude AI for Collaborative Work: Complete Guide 2026',
    description: 'Learn how to use Claude AI for collaborative work and team productivity. Complete guide with features, best practices, and use cases.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/claude-ai-collaborative-work-complete-guide',
  },
};

import ClaudeAiCollaborativeWorkCompleteGuideClient from './client';

export default function ClaudeAiCollaborativeWorkCompleteGuidePage() {
  return <ClaudeAiCollaborativeWorkCompleteGuideClient />;
}
