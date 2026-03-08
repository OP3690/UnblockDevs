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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/low-code-ai-development-prompt-chunker' },

};

export default function LowCodeAiDevelopmentGuide() {
  return <LowCodeAiDevelopmentClient />;
}
