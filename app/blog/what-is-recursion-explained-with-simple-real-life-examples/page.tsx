import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursion Explained with Real-Life Examples | UnblockDevs',
  description: 'Understand recursion with simple real-life examples and visual diagrams. Learn base cases, call stacks, and recursive thinking for coding interviews.',
  keywords: [
    'what is recursion',
    'recursion explained simply',
    'recursion real life examples',
    'recursion tutorial',
    'recursive function',
    'recursion in programming',
    'recursion base case',
    'recursion call stack',
    'recursion diagram',
    'recursion interview questions',
    'recursion python',
    'how does recursion work'
  ],
  openGraph: {
    title: 'Recursion Explained with Simple Real-Life Examples and Diagrams',
    description: "Recursion confuses most beginners — but it doesn't have to. Learn with real-life analogies, step-by-step diagrams, and code examples in Python and JavaScript. Master base cases and call stacks.",
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-recursion-explained-with-simple-real-life-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Recursion%20Explained%20%E2%80%93%20Real-Life%20Examples&emoji=%F0%9F%A4%96&desc=Recursion%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Recursion Explained – Real-Life Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursion Explained with Real-Life Examples',
    description: 'Recursion explained with real-life examples and diagrams. Learn base cases, call stacks, and recursive thinking for coding interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-recursion-explained-with-simple-real-life-examples',
  },
};

import WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient from './client';

export default function WhatIsRecursionExplainedWithSimpleRealLifeExamplesPage() {
  return <WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient />;
}
