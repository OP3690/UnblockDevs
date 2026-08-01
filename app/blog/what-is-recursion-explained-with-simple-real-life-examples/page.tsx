import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursion Explained – Real-Life Examples | UnblockDevs',
  description: 'Recursion: simple real-life examples, diagrams, code. Beginner-friendly. For coding interviews.',
  keywords: [
    'what is recursion',
    'recursion explained',
    'recursion examples',
    'recursion tutorial',
    'recursion beginner',
    'recursive function',
    'recursion in programming',
    'recursion explained simply',
    'recursion real life examples',
    'recursion visualization',
    'recursion flow chart',
    'recursion diagram',
    'recursion interview',
    'recursion python',
    'recursion javascript'
  ],
  openGraph: {
    title: 'Recursion Explained – Real-Life Examples | UnblockDevs',
    description: 'Recursion: examples, diagrams, code. For interviews.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-recursion-explained-with-simple-real-life-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Recursion%20Explained%20%E2%80%93%20Real-Life%20Examples&emoji=%F0%9F%A4%96&desc=Recursion%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Recursion Explained – Real-Life Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursion Explained – Real-Life Examples | UnblockDevs',
    description: 'Recursion: examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-recursion-explained-with-simple-real-life-examples',
  },
};

import WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient from './client';

export default function WhatIsRecursionExplainedWithSimpleRealLifeExamplesPage() {
  return <WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient />;
}
