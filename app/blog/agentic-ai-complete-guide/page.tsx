import type { Metadata } from 'next';
import AgenticAiCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Agentic AI: Complete Guide to Autonomous AI Agents | UnblockDevs',
  description: 'Agentic AI: autonomous agents, multi-agent systems, real-world apps. How AI agents work and their impact.',
  keywords: [
    'agentic ai',
    'ai agents',
    'autonomous ai agents',
    'ai agent systems',
    'multi-agent ai',
    'intelligent agents',
    'ai agent architecture'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/agentic-ai-complete-guide' },

};

export default function AgenticAiCompleteGuide() {
  return <AgenticAiCompleteGuideClient />;
}

