import type { Metadata } from 'next';
import MultiagentSystemsClient from './client';

export const metadata: Metadata = {
  title: 'Multiagent Systems: Complete Guide 2026 | UnblockDevs',
  description: 'Guide to multiagent systems: what they are, when to use them, how they work. Agent-based systems, multi-agent AI, coordination.',
  keywords: [
    'multiagent systems',
    'multi-agent systems',
    'agent-based systems',
    'multi-agent ai',
    'distributed ai',
    'autonomous agents',
    'agent coordination',
    'multiagent systems guide',
    'agent systems',
    'multi-agent architecture',
    'agent communication',
    'multiagent systems applications',
    'agent-based modeling',
    'multi-agent coordination',
    'swarm intelligence',
    'multiagent systems tutorial',
    'agent systems design',
    'multi-agent systems examples',
    'agent collaboration',
    'multiagent systems best practices'
  ],
  openGraph: {
    title: 'Multiagent Systems: Complete Guide 2026 | UnblockDevs',
    description: 'Guide to multiagent systems: what they are, when to use them, how they work. Agent-based systems, multi-agent AI, coordination.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/multiagent-systems-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Multiagent%20Systems%3A%20Complete%20Guide%202026&emoji=%F0%9F%93%96&desc=Guide%20to%20multiagent%20systems%3A%20what%20they%20are%2C%20when%20to%20use%20them%2C%20how%20they%20work', width: 1200, height: 630, alt: 'Multiagent Systems: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiagent Systems: Complete Guide 2026 | UnblockDevs',
    description: 'Guide to multiagent systems: what they are, when to use them, how they work. Agent-based systems, multi-agent AI, coordination.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/multiagent-systems-complete-guide' },
  robots: { index: false, follow: false },
};

export default function MultiagentSystems() {
  return <MultiagentSystemsClient />;
}

