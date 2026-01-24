import type { Metadata } from 'next';
import AiProductivityToolsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Productivity Tools: Complete Guide to Cursor, Claude, and More | UnblockDevs',
  description: 'UnblockDevs AI Tools Guide: Complete guide to AI productivity tools: Cursor AI, Claude, Perplexity, and other AI assistants. Learn how to use them effectively, best prompts, and real-world applications.',
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
};

export default function AiProductivityToolsCompleteGuide() {
  return <AiProductivityToolsCompleteGuideClient />;
}

