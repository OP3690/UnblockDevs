import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude AI for Team Collaboration: Complete Guide | UnblockDevs',
  description: 'Claude AI for collaborative work: how to use it with teams, best practices, key use cases, and productivity tips. Your complete guide to team AI collaboration.',
  keywords: [
    'claude ai collaborative work',
    'claude ai for teams',
    'claude ai collaboration',
    'claude ai productivity',
    'claude ai team tools',
    'claude ai workspace',
    'claude ai business',
    'anthropic claude collaboration',
    'claude ai use cases',
    'claude ai best practices',
    'ai collaboration tools',
    'how to use claude ai for teamwork'
  ],
  openGraph: {
    title: 'Claude AI for Collaborative Work: Features, Use Cases & Team Best Practices',
    description: 'Learn how to use Claude AI for collaborative work — team brainstorming, document drafting, code reviews, and more. Covers best practices, use cases, and practical tips for teams in 2026.',
    type: 'article',
    publishedTime: '2026-02-09T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/claude-ai-collaborative-work-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Claude%20AI%20for%20Collaborative%20Work%3A%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Learn%20how%20to%20use%20Claude%20AI%20for%20collaborative%20work%20and%20team%20productivity', width: 1200, height: 630, alt: 'Claude AI for Collaborative Work: Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude AI for Team Collaboration: Complete Guide',
    description: 'Use Claude AI for team collaboration — brainstorming, writing, code reviews, and more. Best practices and real use cases for productive teams.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/claude-ai-collaborative-work-complete-guide',
  },
};

import ClaudeAiCollaborativeWorkCompleteGuideClient from './client';

export default function ClaudeAiCollaborativeWorkCompleteGuidePage() {
  return <ClaudeAiCollaborativeWorkCompleteGuideClient />;
}
