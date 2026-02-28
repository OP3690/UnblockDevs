import type { Metadata } from 'next';
import MultiagentSystemsClient from './client';

export const metadata: Metadata = {
  title: 'Multiagent Systems: Complete Guide 2026 | UnblockDevs',
  description: 'Complete guide to multiagent systems: definition, what they are, when to use them, how they work, and why they matter. Learn about agent-based systems, multi-agent AI, distributed AI, agent coordination, and autonomous agents.',
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
  alternates: { canonical: 'https://unblockdevs.com/blog/multiagent-systems-complete-guide' },
};

export default function MultiagentSystems() {
  return <MultiagentSystemsClient />;
}

