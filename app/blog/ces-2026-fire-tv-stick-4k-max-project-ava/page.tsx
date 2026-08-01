import type { Metadata } from 'next';
import Ces2026FireTvStickProjectAvaClient from './client';

export const metadata: Metadata = {
  title: 'CES 2026: Fire TV Stick 4K Max & Project AVA | UnblockDevs',
  description: 'CES 2026: Fire TV Stick 4K Max, Project AVA AI. Streaming, AI, smart home. Features and specs.',
  keywords: [
    'CES 2026',
    'Amazon Fire TV Stick 4K Max',
    'Project AVA',
    'Fire TV Stick 4K Max 2026',
    'Amazon Fire TV 2026',
    'Project AVA AI',
    'CES 2026 highlights',
    'streaming device 2026',
    '4K streaming device',
    'AI assistant TV',
    'smart TV streaming',
    'Amazon Alexa TV',
    'Fire TV Stick review',
    'CES 2026 announcements',
    'Amazon Fire TV features'
  ],
  openGraph: {
    title: 'CES 2026: Fire TV Stick 4K Max & Project AVA',
    description: 'CES 2026: Fire TV Stick 4K Max, Project AVA AI. Streaming, AI, smart home. Features and specs.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/ces-2026-fire-tv-stick-4k-max-project-ava',
    images: [{ url: 'https://unblockdevs.com/api/og?title=CES%202026%3A%20Fire%20TV%20Stick%204K%20Max%20%26%20Project%20AVA&emoji=%F0%9F%93%9D&desc=CES%202026%3A%20Fire%20TV%20Stick%204K%20Max%2C%20Project%20AVA%20AI.%20Streaming%2C%20AI%2C%20smart%20home.%20Featu', width: 1200, height: 630, alt: 'CES 2026: Fire TV Stick 4K Max & Project AVA — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CES 2026: Fire TV Stick 4K Max & Project AVA',
    description: 'CES 2026: Fire TV Stick 4K Max, Project AVA AI. Streaming, AI, smart home. Features and specs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ces-2026-fire-tv-stick-4k-max-project-ava' },
  robots: { index: false, follow: false },
};

export default function Ces2026FireTvStickProjectAva() {
  return <Ces2026FireTvStickProjectAvaClient />;
}

