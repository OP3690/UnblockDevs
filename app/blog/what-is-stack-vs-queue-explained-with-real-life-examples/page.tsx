import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack vs Queue Explained | UnblockDevs',
  description: 'Stack vs queue: LIFO vs FIFO, real-life examples, diagrams, code. For coding interviews.',
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
    title: 'Stack vs Queue Explained | UnblockDevs',
    description: 'Stack vs queue: examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-stack-vs-queue-explained-with-real-life-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Stack%20vs%20Queue%20Explained&emoji=%F0%9F%A4%96&desc=Stack%20vs%20queue%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Stack vs Queue Explained — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack vs Queue Explained | UnblockDevs',
    description: 'Stack vs queue: examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-stack-vs-queue-explained-with-real-life-examples',
  },
};

import WhatIsStackVsQueueExplainedWithRealLifeExamplesClient from './client';

export default function WhatIsStackVsQueueExplainedWithRealLifeExamplesPage() {
  return <WhatIsStackVsQueueExplainedWithRealLifeExamplesClient />;
}
