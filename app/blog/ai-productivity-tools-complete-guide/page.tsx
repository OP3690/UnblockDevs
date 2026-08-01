import type { Metadata } from 'next';
import AiProductivityToolsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Productivity Tools: Cursor, Claude & More | UnblockDevs',
  description: 'AI productivity tools: Cursor, Claude, Perplexity. Best prompts and real-world use. Get more done.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai productivity tools',
    'cursor ai',
    'claude ai',
    'ai coding assistant',
    'ai tools comparison',
    'best ai tools',
    'ai assistant tools'
  ],
  openGraph: {
    title: 'AI Productivity Tools: Cursor, Claude & More',
    description: 'AI productivity tools: Cursor, Claude, Perplexity. Best prompts and real-world use. Get more done.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-productivity-tools-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Productivity%20Tools%3A%20Cursor%2C%20Claude%20%26%20More&emoji=%F0%9F%93%9D&desc=AI%20productivity%20tools%3A%20Cursor%2C%20Claude%2C%20Perplexity.%20Best%20prompts%20and%20real-world%20u', width: 1200, height: 630, alt: 'AI Productivity Tools: Cursor, Claude & More — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Productivity Tools: Cursor, Claude & More',
    description: 'AI productivity tools: Cursor, Claude, Perplexity. Best prompts and real-world use. Get more done.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-productivity-tools-complete-guide' },

};

export default function AiProductivityToolsCompleteGuide() {
  return <AiProductivityToolsCompleteGuideClient />;
}

