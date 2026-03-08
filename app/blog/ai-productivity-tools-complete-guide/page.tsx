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
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-productivity-tools-complete-guide' },

};

export default function AiProductivityToolsCompleteGuide() {
  return <AiProductivityToolsCompleteGuideClient />;
}

