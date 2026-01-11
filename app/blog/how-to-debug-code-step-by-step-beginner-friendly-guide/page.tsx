import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Debug Code Step by Step (Beginner-Friendly Guide) | Complete Guide 2026',
  description: 'Learn how to debug code step by step as a beginner. Complete guide to debugging techniques, tools, and strategies. Beginner-friendly explanations with examples for finding and fixing bugs in your code.',
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
    title: 'How to Debug Code Step by Step (Beginner-Friendly Guide) | Complete Guide 2026',
    description: 'Learn how to debug code step by step as a beginner. Complete guide to debugging techniques, tools, and strategies for finding and fixing bugs.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Debug Code Step by Step (Beginner-Friendly Guide) | Complete Guide 2026',
    description: 'Learn how to debug code step by step as a beginner. Complete guide to debugging techniques, tools, and strategies for finding and fixing bugs.',
  },
};

import HowToDebugCodeStepByStepBeginnerFriendlyGuideClient from './client';

export default function HowToDebugCodeStepByStepBeginnerFriendlyGuidePage() {
  return <HowToDebugCodeStepByStepBeginnerFriendlyGuideClient />;
}
