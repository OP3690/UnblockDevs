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
  alternates: { canonical: 'https://unblockdevs.com/blog/must-learn-tech-skills-2030' },

};

export default function MustLearnTechSkills2030() {
  return <MustLearnTechSkills2030Client />;
}

