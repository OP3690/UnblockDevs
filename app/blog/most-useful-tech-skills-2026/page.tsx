import type { Metadata } from 'next';
import MostUsefulTechSkills2026Client from './client';

export const metadata: Metadata = {
  title: 'Most Useful Tech Skills 2026 | UnblockDevs',
  description: 'Most useful tech skills 2026: AGI, GPU, semiconductors, AI/ML, cloud, security. Prioritize for growth.',
  keywords: [
    'tech skills 2026',
    'most useful tech skills',
    'artificial general intelligence',
    'gpu programming',
    'semiconductor skills',
    'ai skills 2026',
    'tech skills to learn',
    'programming skills 2026',
    'chip design',
    'gpu computing'
  ],
  openGraph: {
    title: 'Most Useful Tech Skills 2026',
    description: 'Most useful tech skills 2026: AGI, GPU, semiconductors, AI/ML, cloud, security. Prioritize for growth.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/most-useful-tech-skills-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Most%20Useful%20Tech%20Skills%202026&emoji=%F0%9F%93%9D&desc=Most%20useful%20tech%20skills%202026%3A%20AGI%2C%20GPU%2C%20semiconductors%2C%20AI%2FML%2C%20cloud%2C%20security.', width: 1200, height: 630, alt: 'Most Useful Tech Skills 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Most Useful Tech Skills 2026',
    description: 'Most useful tech skills 2026: AGI, GPU, semiconductors, AI/ML, cloud, security. Prioritize for growth.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/most-useful-tech-skills-2026' },
  robots: { index: false, follow: false },
};

export default function MostUsefulTechSkills2026() {
  return <MostUsefulTechSkills2026Client />;
}

