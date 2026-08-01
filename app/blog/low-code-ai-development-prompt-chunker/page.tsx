import type { Metadata } from 'next';
import LowCodeAiDevelopmentClient from './client';

export const metadata: Metadata = {
  title: 'Low-Code AI & Prompt Chunker Guide | UnblockDevs',
  description: 'Low-code AI development: what it is, when to use. Tools like Prompt Chunker for non-devs. No coding.',
  keywords: [
    'low-code AI development',
    'no-code AI',
    'prompt chunker',
    'AI tools for non-technical users',
    'low-code development',
    'AI prompt engineering',
    'non-technical AI development',
    'AI development tools',
    'prompt chunking',
    'AI workflow tools',
    'citizen developers AI',
    'AI automation tools',
    'prompt engineering tools',
    'AI development platform',
    'low-code platform'
  ],
  openGraph: {
    title: 'Low-Code AI & Prompt Chunker Guide',
    description: 'Low-code AI: Prompt Chunker and tools for non-devs. Build AI solutions without coding.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/low-code-ai-development-prompt-chunker',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Low-Code%20AI%20%26%20Prompt%20Chunker%20Guide&emoji=%F0%9F%A4%96&desc=Low-code%20AI%3A%20Prompt%20Chunker%20and%20tools%20for%20non-devs', width: 1200, height: 630, alt: 'Low-Code AI & Prompt Chunker Guide — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Low-Code AI & Prompt Chunker Guide',
    description: 'Low-code AI: Prompt Chunker and tools for non-devs. Build AI solutions without coding.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/low-code-ai-development-prompt-chunker' },

};

export default function LowCodeAiDevelopmentGuide() {
  return <LowCodeAiDevelopmentClient />;
}
