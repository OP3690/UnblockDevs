import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benford\'s Law Explained: Complete Guide with Examples 2026 | UnblockDevs',
  description: 'Learn what Benford\'s Law is, how it works, and why it matters. Complete guide to Benford\'s Law with real-world examples, applications in fraud detection, data analysis, and mathematical explanations. Perfect for data scientists and analysts.',
  keywords: [
    'benfords law',
    'benford law',
    'benfords law explained',
    'what is benfords law',
    'benfords law examples',
    'benfords law fraud detection',
    'first digit law',
    'benfords law statistics',
    'benfords law data analysis',
    'benfords law formula',
    'benfords law calculator',
    'benfords law applications',
    'benfords law accounting',
    'benfords law finance',
    'benfords law tutorial',
    'benfords law guide',
    'benfords law mathematical',
    'benfords law probability',
    'benfords law distribution',
    'benfords law real world'
  ],
  openGraph: {
    title: 'Benford\'s Law Explained: Complete Guide with Examples 2026',
    description: 'Learn what Benford\'s Law is, how it works, and why it matters. Complete guide with real-world examples and applications.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benford\'s Law Explained: Complete Guide with Examples 2026',
    description: 'Learn what Benford\'s Law is, how it works, and why it matters. Complete guide with real-world examples and applications.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/benfords-law-explained-complete-guide',
  },
};

import BenfordsLawExplainedCompleteGuideClient from './client';

export default function BenfordsLawExplainedCompleteGuidePage() {
  return <BenfordsLawExplainedCompleteGuideClient />;
}
