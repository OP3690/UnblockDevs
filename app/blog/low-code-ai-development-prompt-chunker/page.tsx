import type { Metadata } from 'next';
import LowCodeAiDevelopmentClient from './client';

export const metadata: Metadata = {
  title: 'Low-Code AI Development: Empowering Non-Technical Users with Tools Like Prompt Chunker | UnblockDevs',
  description: 'Complete guide to low-code AI development. Learn what it is, when to use it, how to get started, and why tools like Prompt Chunker empower non-technical users to build AI solutions without coding.',
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
    title: 'Low-Code AI Development: Empowering Non-Technical Users with Tools Like Prompt Chunker',
    description: 'Complete guide to low-code AI development. Learn how tools like Prompt Chunker empower non-technical users to build AI solutions without coding.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function LowCodeAiDevelopmentGuide() {
  return <LowCodeAiDevelopmentClient />;
}
