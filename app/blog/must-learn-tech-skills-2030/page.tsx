import type { Metadata } from 'next';
import MustLearnTechSkills2030Client from './client';

export const metadata: Metadata = {
  title: 'Must-Learn Tech Skills for 2030: AGI, Quantum Computing & Future Tech | UnblockDevs',
  description: 'Discover the must-learn tech skills for 2030: artificial general intelligence (AGI), quantum computing, advanced semiconductor design, neuromorphic chips, and future technologies. Prepare for the next decade.',
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
};

export default function MustLearnTechSkills2030() {
  return <MustLearnTechSkills2030Client />;
}

