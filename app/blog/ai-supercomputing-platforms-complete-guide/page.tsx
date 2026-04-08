import type { Metadata } from 'next';
import AiSupercomputingPlatformsClient from './client';

export const metadata: Metadata = {
  title: 'AI Supercomputing Platforms: Complete Guide 2026 | UnblockDevs',
  description: 'Guide to AI supercomputing: GPU clusters, distributed training, high-performance AI. What they are, when to use, how they work.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai supercomputing platforms',
    'ai supercomputing platforms 2026',
    'ai supercomputers',
    'ai supercomputing',
    'gpu clusters ai',
    'distributed ai training',
    'high performance ai computing',
    'ai infrastructure',
    'ai computing platforms',
    'ai training infrastructure',
    'gpu computing platforms',
    'ai cluster computing',
    'ai supercomputer architecture',
    'ai training platforms',
    'ai inference platforms',
    'ai supercomputing guide',
    'ai computing infrastructure',
    'ai hardware platforms',
    'ai supercomputing solutions',
    'ai training clusters',
    'ai supercomputing best practices'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-supercomputing-platforms-complete-guide' },
};

export default function AiSupercomputingPlatforms() {
  return <AiSupercomputingPlatformsClient />;
}

