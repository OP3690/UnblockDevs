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
  openGraph: {
    title: 'Agentic AI: Complete Guide to Autonomous AI Agents',
    description: 'Agentic AI: autonomous agents, multi-agent systems, real-world apps. How AI agents work and their impact.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/agentic-ai-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Agentic%20AI%3A%20Complete%20Guide%20to%20Autonomous%20AI%20Agents&emoji=%F0%9F%93%9D&desc=Agentic%20AI%3A%20autonomous%20agents%2C%20multi-agent%20systems%2C%20real-world%20apps.%20How%20AI%20agen', width: 1200, height: 630, alt: 'Agentic AI: Complete Guide to Autonomous AI Agents — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic AI: Complete Guide to Autonomous AI Agents',
    description: 'Agentic AI: autonomous agents, multi-agent systems, real-world apps. How AI agents work and their impact.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/agentic-ai-complete-guide' },

};

export default function AgenticAiCompleteGuide() {
  return <AgenticAiCompleteGuideClient />;
}

