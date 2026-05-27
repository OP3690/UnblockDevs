import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debug Code Step by Step (Beginner Guide) | UnblockDevs',
  description: 'Debug code step by step. Techniques, tools, strategies. Beginner-friendly examples for finding and fixing bugs.',
  keywords: [
    'how to debug code',
    'debug code step by step',
    'debugging guide beginner',
    'how to debug programming',
    'code debugging tutorial',
    'beginner debugging guide',
    'debug code techniques',
    'how to find bugs in code',
    'debugging strategies',
    'code debugging methods',
    'debug code python',
    'debug code javascript',
    'debugging tools beginner',
    'fix bugs in code',
    'debugging process'
  ],
  openGraph: {
    title: 'Debug Code Step by Step (Beginner Guide) | UnblockDevs',
    description: 'Learn how to debug code step by step as a beginner. Complete guide to debugging techniques, tools, and strategies for finding and fixing bugs.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-debug-code-step-by-step-beginner-friendly-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Debug%20Code%20Step%20by%20Step%20%28Beginner%20Guide%29&emoji=%F0%9F%93%96&desc=Learn%20how%20to%20debug%20code%20step%20by%20step%20as%20a%20beginner', width: 1200, height: 630, alt: 'Debug Code Step by Step (Beginner Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug Code Step by Step (Beginner Guide) | UnblockDevs',
    description: 'Learn how to debug code step by step as a beginner. Complete guide to debugging techniques, tools, and strategies for finding and fixing bugs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-debug-code-step-by-step-beginner-friendly-guide' },
};

import HowToDebugCodeStepByStepBeginnerFriendlyGuideClient from './client';

export default function HowToDebugCodeStepByStepBeginnerFriendlyGuidePage() {
  return <HowToDebugCodeStepByStepBeginnerFriendlyGuideClient />;
}
