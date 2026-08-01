import type { Metadata } from 'next';
import AiToolsDevelopersGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Tools for Developers: Cursor, Copilot & More | UnblockDevs',
  description: 'AI tools for developers: Cursor, Copilot, ChatGPT. When to use each, best practices.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai tools for developers',
    'cursor ai',
    'github copilot',
    'ai coding tools',
    'developer ai tools',
    'ai code editor',
    'best ai tools developers'
  ],
  openGraph: {
    title: 'AI Tools for Developers: Cursor, Copilot & More',
    description: 'AI tools for developers: Cursor, Copilot, ChatGPT. When to use each, best practices.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-tools-developers-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Tools%20for%20Developers%3A%20Cursor%2C%20Copilot%20%26%20More&emoji=%F0%9F%93%9D&desc=AI%20tools%20for%20developers%3A%20Cursor%2C%20Copilot%2C%20ChatGPT.%20When%20to%20use%20each%2C%20best%20practi', width: 1200, height: 630, alt: 'AI Tools for Developers: Cursor, Copilot & More — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools for Developers: Cursor, Copilot & More',
    description: 'AI tools for developers: Cursor, Copilot, ChatGPT. When to use each, best practices.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-tools-developers-guide' },

};

export default function AiToolsDevelopersGuide() {
  return <AiToolsDevelopersGuideClient />;
}

