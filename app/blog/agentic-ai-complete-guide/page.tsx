import type { Metadata } from 'next';
import AgenticAiCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Agentic AI: Complete Guide to Autonomous AI Agents | UnblockDevs',
  description: 'Comprehensive guide to Agentic AI: autonomous agents, multi-agent systems, real-world applications, and future of AI agents. Learn how AI agents work and their impact.',
  keywords: [
    'agentic ai',
    'ai agents',
    'autonomous ai agents',
    'ai agent systems',
    'multi-agent ai',
    'intelligent agents',
    'ai agent architecture'
  ],
};

export default function AgenticAiCompleteGuide() {
  return <AgenticAiCompleteGuideClient />;
}

