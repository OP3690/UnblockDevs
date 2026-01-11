import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Stack vs Queue? Explained with Real-Life Examples | Complete Guide 2026',
  description: 'Learn the difference between stack and queue data structures with real-life examples. Complete guide with visual diagrams, LIFO vs FIFO, use cases, and code examples. Perfect for coding interviews.',
  keywords: [
    'stack vs queue',
    'what is stack',
    'what is queue',
    'stack and queue difference',
    'lifo vs fifo',
    'stack data structure',
    'queue data structure',
    'stack queue explained',
    'stack queue examples',
    'stack queue tutorial',
    'data structures stack queue',
    'stack queue visualization',
    'stack queue use cases',
    'stack queue interview',
    'stack queue beginner'
  ],
  openGraph: {
    title: 'What Is Stack vs Queue? Explained with Real-Life Examples | Complete Guide 2026',
    description: 'Learn the difference between stack and queue data structures with real-life examples. Complete guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Stack vs Queue? Explained with Real-Life Examples | Complete Guide 2026',
    description: 'Learn the difference between stack and queue data structures with real-life examples. Complete guide with visual diagrams and code examples.',
  },
};

import WhatIsStackVsQueueExplainedWithRealLifeExamplesClient from './client';

export default function WhatIsStackVsQueueExplainedWithRealLifeExamplesPage() {
  return <WhatIsStackVsQueueExplainedWithRealLifeExamplesClient />;
}
