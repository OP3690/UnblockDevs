import type { Metadata } from 'next';
import AiProductivityToolsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Productivity Tools: Cursor, Claude & More | UnblockDevs',
  description: 'AI productivity tools compared: Cursor, Claude, Perplexity, and more. Best prompts, real-world use cases, and practical tips for getting more done with AI in 2026.',
  keywords: [
    'ai productivity tools',
    'cursor ai',
    'claude ai',
    'ai coding assistant',
    'ai tools comparison',
    'best ai tools 2026',
    'ai assistant tools',
    'perplexity ai',
    'ai tools for developers',
    'best ai productivity apps',
    'ai workflow tools',
    'ai prompts for productivity'
  ],
  openGraph: {
    title: 'AI Productivity Tools: Cursor, Claude, Perplexity & More — Full Comparison Guide',
    description: 'Explore the best AI productivity tools — Cursor, Claude, Perplexity, and more. Includes real-world use cases, best prompts, and practical tips for getting more done with AI in 2026.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-productivity-tools-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Productivity%20Tools%3A%20Cursor%2C%20Claude%20%26%20More&emoji=%F0%9F%93%9D&desc=AI%20productivity%20tools%3A%20Cursor%2C%20Claude%2C%20Perplexity.%20Best%20prompts%20and%20real-world%20u', width: 1200, height: 630, alt: 'AI Productivity Tools: Cursor, Claude & More — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Productivity Tools: Cursor, Claude & More',
    description: 'Cursor, Claude, Perplexity — top AI productivity tools ranked. Best prompts and real workflows included. Get more done with AI.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-productivity-tools-complete-guide' },

};

export default function AiProductivityToolsCompleteGuide() {
  return <AiProductivityToolsCompleteGuideClient />;
}

