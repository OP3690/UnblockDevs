import type { Metadata } from 'next';
import MustLearnTechSkills2030Client from './client';

export const metadata: Metadata = {
  title: 'Must-Learn Tech Skills for 2030 | UnblockDevs',
  description: 'Must-learn tech skills for 2030: AGI, quantum computing, semiconductors, neuromorphic chips. Prepare now.',
  keywords: [
    'tech skills 2030',
    'must learn tech skills',
    'future tech skills',
    'artificial general intelligence 2030',
    'quantum computing skills',
    'neuromorphic computing',
    'advanced semiconductor',
    'future programming',
    '2030 technology'
  ],
  openGraph: {
    title: 'Must-Learn Tech Skills for 2030',
    description: 'Must-learn tech skills for 2030: AGI, quantum computing, semiconductors,',
    type: 'article',
    url: 'https://unblockdevs.com/blog/must-learn-tech-skills-2030',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Must-Learn%20Tech%20Skills%20for%202030&emoji=%F0%9F%93%96&desc=Must-learn%20tech%20skills%20for%202030%3A%20AGI%2C%20quantum%20computing%2C%20semiconductors%2C', width: 1200, height: 630, alt: 'Must-Learn Tech Skills for 2030 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Must-Learn Tech Skills for 2030',
    description: 'Must-learn tech skills for 2030: AGI, quantum computing, semiconductors,',
    images: ['https://unblockdevs.com/api/og?title=Must-Learn%20Tech%20Skills%20for%202030&emoji=%F0%9F%93%96&desc=Must-learn%20tech%20skills%20for%202030%3A%20AGI%2C%20quantum%20computing%2C%20semiconductors%2C'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/must-learn-tech-skills-2030' },
  robots: { index: false, follow: false },
};

export default function MustLearnTechSkills2030() {
  return <MustLearnTechSkills2030Client />;
}

