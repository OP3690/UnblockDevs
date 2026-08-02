import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Debug Code Step by Step: Beginner Guide | UnblockDevs',
  description: 'Learn how to debug code step by step as a beginner. Covers debugging techniques, tools, print statements, breakpoints, and strategies for finding and fixing bugs in Python and JavaScript.',
  keywords: [
    'how to debug code',
    'debug code step by step',
    'debugging guide for beginners',
    'debugging techniques',
    'how to find bugs in code',
    'code debugging strategies',
    'debug python code',
    'debug javascript code',
    'debugging tools for beginners',
    'how to use a debugger',
    'what is debugging in programming',
    'how do i debug my code step by step'
  ],
  openGraph: {
    title: 'How to Debug Code Step by Step: A Beginner-Friendly Complete Guide',
    description: 'New to debugging? This beginner-friendly guide walks through the debugging process step by step — using print statements, DevTools, breakpoints, and strategies for finding any bug.',
    type: 'article',
    publishedTime: '2026-02-01T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-debug-code-step-by-step-beginner-friendly-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Debug%20Code%20Step%20by%20Step%20%28Beginner%20Guide%29&emoji=%F0%9F%93%96&desc=Learn%20how%20to%20debug%20code%20step%20by%20step%20as%20a%20beginner', width: 1200, height: 630, alt: 'Debug Code Step by Step (Beginner Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Debug Code Step by Step: Beginner Guide',
    description: 'Learn to debug code step by step as a beginner. Covers print statements, breakpoints, DevTools, and systematic strategies for finding and fixing bugs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-debug-code-step-by-step-beginner-friendly-guide' },
};

import HowToDebugCodeStepByStepBeginnerFriendlyGuideClient from './client';

export default function HowToDebugCodeStepByStepBeginnerFriendlyGuidePage() {
  return <HowToDebugCodeStepByStepBeginnerFriendlyGuideClient />;
}
