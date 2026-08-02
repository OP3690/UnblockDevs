import type { Metadata } from 'next';
import LowCodeAiDevelopmentClient from './client';

export const metadata: Metadata = {
  title: 'Low-Code AI Development & Prompt Chunker Guide | UnblockDevs',
  description: 'Low-code AI development with tools like Prompt Chunker: what it is, when to use it, and how non-developers can build AI workflows without writing any code.',
  keywords: [
    'low-code AI development',
    'no-code AI tools',
    'prompt chunker guide',
    'AI tools for non-technical users',
    'AI development without coding',
    'prompt engineering tools',
    'citizen developer AI',
    'AI automation tools',
    'low-code AI platform',
    'prompt chunking explained',
    'how to build AI workflows without code',
    'low-code vs no-code AI',
  ],
  openGraph: {
    title: 'Low-Code AI Development & Prompt Chunker: What Non-Developers Need to Know',
    description: 'Low-code AI is changing who can build with artificial intelligence. Discover how tools like Prompt Chunker help non-developers create AI workflows without writing a single line of code.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/low-code-ai-development-prompt-chunker',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Low-Code%20AI%20%26%20Prompt%20Chunker%20Guide&emoji=%F0%9F%A4%96&desc=Low-code%20AI%3A%20Prompt%20Chunker%20and%20tools%20for%20non-devs', width: 1200, height: 630, alt: 'Low-Code AI & Prompt Chunker Guide — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Low-Code AI Development & Prompt Chunker Guide',
    description: 'How non-developers use low-code AI tools like Prompt Chunker to build AI-powered workflows — no coding required and no steep learning curve.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/low-code-ai-development-prompt-chunker' },

};

export default function LowCodeAiDevelopmentGuide() {
  return <LowCodeAiDevelopmentClient />;
}
