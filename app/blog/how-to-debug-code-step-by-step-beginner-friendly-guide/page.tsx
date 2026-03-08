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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

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
