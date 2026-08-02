import type { Metadata } from 'next';
import AgenticAiCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Agentic AI: Complete Guide to Autonomous AI Agents | UnblockDevs',
  description: 'Agentic AI explained: how autonomous AI agents work, multi-agent systems, and real-world applications. Learn what makes AI truly autonomous and agentic in 2026.',
  keywords: [
    'agentic ai',
    'ai agents',
    'autonomous ai agents',
    'ai agent systems',
    'multi-agent ai',
    'intelligent agents',
    'ai agent architecture',
    'ai planning agents',
    'what is agentic ai',
    'how do ai agents work',
    'agentic ai vs chatbots',
    'agentic ai examples',
    'agentic ai use cases'
  ],
  openGraph: {
    title: 'Agentic AI Complete Guide: Autonomous Agents, Multi-Agent Systems & Real-World Use Cases',
    description: 'Learn how agentic AI works — autonomous agents, multi-agent systems, planning, and memory. Discover real-world applications and understand what sets agentic AI apart from regular chatbots.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/agentic-ai-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Agentic%20AI%3A%20Complete%20Guide%20to%20Autonomous%20AI%20Agents&emoji=%F0%9F%93%9D&desc=Agentic%20AI%3A%20autonomous%20agents%2C%20multi-agent%20systems%2C%20real-world%20apps.%20How%20AI%20agen', width: 1200, height: 630, alt: 'Agentic AI: Complete Guide to Autonomous AI Agents — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic AI: Complete Guide to Autonomous AI Agents',
    description: 'Agentic AI explained: autonomous agents, multi-agent systems, and real-world use cases. Learn how AI agents work and what makes them autonomous.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/agentic-ai-complete-guide' },

};

export default function AgenticAiCompleteGuide() {
  return <AgenticAiCompleteGuideClient />;
}

