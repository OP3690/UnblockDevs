import type { Metadata } from 'next';
import MythosBenchmarksClient from './client';

export const metadata: Metadata = {
  title: 'Claude Mythos AI Benchmarks: 93.9% SWE-bench, 97.6% USAMO & Every Record Broken (2026)',
  description:
    'Deep-dive benchmark analysis of Claude Mythos Preview — SWE-bench 93.9%, USAMO 97.6%, SWE-bench Pro 77.8%, and multimodal coding 59.0%. Every score explained, compared to Opus 4.6 and GPT-5.4.',
  keywords: [
    'claude mythos benchmarks',
    'mythos ai swe-bench 93.9',
    'claude mythos usamo score',
    'anthropic mythos benchmark results',
    'claude mythos vs opus 4.6',
    'claude mythos vs gpt 5.4',
    'swe-bench pro claude mythos',
    'mythos ai performance analysis',
    'claude mythos coding benchmark',
    'anthropic ai benchmark 2026',
    'claude mythos math score',
    'frontier ai model comparison 2026',
    'claude mythos preview performance',
    'ai model benchmark breakdown',
    'claude mythos swe bench verified',
  ],
  openGraph: {
    title: 'Claude Mythos Benchmarks: Every Record Broken — Full Analysis (2026)',
    description:
      'SWE-bench 93.9%, USAMO 97.6%, multimodal coding 59.0%. Every Claude Mythos benchmark explained and compared to Opus 4.6 and GPT-5.4.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/claude-mythos-ai-benchmarks-complete-analysis-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Claude Mythos Benchmarks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Mythos Benchmarks: 93.9% SWE-bench, Every Record Broken (2026)',
    description:
      'Deep-dive: every Claude Mythos score explained, compared to Opus 4.6 and GPT-5.4. What the numbers actually mean for developers.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/claude-mythos-ai-benchmarks-complete-analysis-2026' },
};

export default function MythosBenchmarksPage() {
  return <MythosBenchmarksClient />;
}
