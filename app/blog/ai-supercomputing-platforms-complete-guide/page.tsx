import type { Metadata } from 'next';
import AiSupercomputingPlatformsClient from './client';

export const metadata: Metadata = {
  title: 'AI Supercomputing Platforms: Complete Guide 2026 | UnblockDevs',
  description: 'Guide to AI supercomputing: GPU clusters, distributed training, high-performance AI. What they are, when to use, how they work.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai supercomputing platforms',
    'ai supercomputing platforms 2026',
    'ai supercomputers',
    'ai supercomputing',
    'gpu clusters ai',
    'distributed ai training',
    'high performance ai computing',
    'ai infrastructure',
    'ai computing platforms',
    'ai training infrastructure',
    'gpu computing platforms',
    'ai cluster computing',
    'ai supercomputer architecture',
    'ai training platforms',
    'ai inference platforms',
    'ai supercomputing guide',
    'ai computing infrastructure',
    'ai hardware platforms',
    'ai supercomputing solutions',
    'ai training clusters',
    'ai supercomputing best practices'
  ],
  openGraph: {
    title: 'AI Supercomputing Platforms: Complete Guide 2026',
    description: 'Guide to AI supercomputing: GPU clusters, distributed training, high-performance AI. What they are, when to use, how they work.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-supercomputing-platforms-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Supercomputing%20Platforms%3A%20Complete%20Guide%202026&emoji=%F0%9F%93%9D&desc=Guide%20to%20AI%20supercomputing%3A%20GPU%20clusters%2C%20distributed%20training%2C%20high-performance', width: 1200, height: 630, alt: 'AI Supercomputing Platforms: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Supercomputing Platforms: Complete Guide 2026',
    description: 'Guide to AI supercomputing: GPU clusters, distributed training, high-performance AI. What they are, when to use, how they work.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-supercomputing-platforms-complete-guide' },
};

export default function AiSupercomputingPlatforms() {
  return <AiSupercomputingPlatformsClient />;
}

