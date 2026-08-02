import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Complexity Explained – Simple Examples | UnblockDevs',
  description: 'Understand Big O notation and time complexity with simple visual examples. Learn O(1), O(n), O(log n), and O(n²) explained clearly for beginners and coding interviews.',
  keywords: [
    'what is time complexity',
    'time complexity explained',
    'big o notation explained',
    'time complexity examples',
    'o(1) o(n) o(log n) time complexity',
    'time complexity tutorial',
    'algorithm time complexity',
    'big o notation examples',
    'time complexity beginner',
    'coding interview time complexity',
    'algorithm efficiency',
    'big o notation tutorial',
    'how to calculate time complexity'
  ],
  openGraph: {
    title: 'Time Complexity and Big O Notation Explained with Simple Examples',
    description: "Big O notation doesn't have to be intimidating. Learn time complexity step by step — from O(1) constant time to O(n²) quadratic — with visual graphs and real code examples.",
    type: 'article',
    publishedTime: '2026-02-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-time-complexity-explained-with-simple-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Time%20Complexity%20Explained%20%E2%80%93%20Simple%20Examples&emoji=%F0%9F%A4%96&desc=Time%20complexity%3A%20Big%20O%20with%20examples%20and%20graphs', width: 1200, height: 630, alt: 'Time Complexity Explained – Simple Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Complexity Explained – Simple Examples',
    description: 'Learn Big O notation and time complexity with visual examples. From O(1) to O(n²), understand algorithm efficiency for coding interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-time-complexity-explained-with-simple-examples',
  },
};

import WhatIsTimeComplexityExplainedWithSimpleExamplesClient from './client';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesPage() {
  return <WhatIsTimeComplexityExplainedWithSimpleExamplesClient />;
}
