import type { Metadata } from 'next';
import WhatIsMythosAIClient from './client';

export const metadata: Metadata = {
  title: "What Is Mythos AI? Anthropic's Claude Mythos Model Explained (2026)",
  description:
    "Complete guide to Anthropic's Claude Mythos AI — what it is, how it scored 93.9% on SWE-bench, found 2,000+ zero-day vulnerabilities in 7 weeks, and why it is locked behind Project Glasswing.",
  keywords: [
    'what is mythos ai',
    'anthropic mythos ai',
    'claude mythos model',
    'mythos ai 2026',
    'project glasswing anthropic',
    'anthropic most powerful ai model',
    'claude mythos cybersecurity',
    'mythos ai zero day vulnerabilities',
    'anthropic ai cybersecurity model',
    'claude mythos preview',
    'mythos ai swe-bench',
    'anthropic mythos explained',
    'claude mythos vs opus',
    'anthropic glasswing initiative',
    'claude mythos google cloud vertex ai',
  ],
  openGraph: {
    title: "What Is Mythos AI? Anthropic's Claude Mythos Model Explained (2026)",
    description:
      "Complete guide to Claude Mythos — 93.9% SWE-bench, 2,000+ zero-days found, Project Glasswing partners, and why experts are both impressed and alarmed.",
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-mythos-ai-anthropic-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'What Is Mythos AI?' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Is Mythos AI? Anthropic's Claude Mythos Explained",
    description:
      'Claude Mythos: 93.9% SWE-bench, 97.6% USAMO, 2,000+ zero-days. The most capable AI model ever — and you cannot use it.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/what-is-mythos-ai-anthropic-complete-guide' },
};

export default function WhatIsMythosAIPage() {
  return <WhatIsMythosAIClient />;
}
