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
    url: 'https://unblockdevs.com/blog/multiagent-systems-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/multiagent-systems-complete-guide' },
  robots: { index: false, follow: false },
};

export default function MultiagentSystems() {
  return <MultiagentSystemsClient />;
}

