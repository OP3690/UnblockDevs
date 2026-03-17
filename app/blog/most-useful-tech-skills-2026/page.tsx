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
  alternates: { canonical: 'https://unblockdevs.com/blog/most-useful-tech-skills-2026' },
  robots: { index: false, follow: false },
};

export default function MostUsefulTechSkills2026() {
  return <MostUsefulTechSkills2026Client />;
}

