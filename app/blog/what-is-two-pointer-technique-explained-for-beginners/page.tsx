import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two Pointer Technique Explained for Beginners | UnblockDevs',
  description: 'Master the two pointer technique: sliding window, fast/slow pointers, and O(n) solutions. Simple examples with code for DSA interviews and LeetCode.',
  keywords: [
    'two pointer technique',
    'two pointers',
    'two pointer algorithm',
    'two pointer explained',
    'two pointer tutorial',
    'fast and slow pointers',
    'sliding window',
    'two pointer array',
    'two pointer string',
    'two pointer examples',
    'two pointer interview',
    'two pointer python',
    'two pointer javascript',
    'two pointer java',
    'two pointer leetcode'
  ],
  openGraph: {
    title: 'Two Pointer Technique Explained for Beginners | UnblockDevs',
    description: 'Master the two pointer technique with examples, diagrams, and code. Learn sliding window, fast/slow pointers, and O(n) approaches for DSA interviews.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-two-pointer-technique-explained-for-beginners',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Two%20Pointer%20Technique%20Explained&emoji=%F0%9F%A4%96&desc=Two%20pointer%20technique%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Two Pointer Technique Explained — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Pointer Technique Explained for Beginners | UnblockDevs',
    description: 'Master the two pointer technique with examples, diagrams, and code. Learn sliding window, fast/slow pointers, and O(n) approaches for DSA interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-two-pointer-technique-explained-for-beginners',
  },
};

import WhatIsTwoPointerTechniqueExplainedForBeginnersClient from './client';

export default function WhatIsTwoPointerTechniqueExplainedForBeginnersPage() {
  return <WhatIsTwoPointerTechniqueExplainedForBeginnersClient />;
}
