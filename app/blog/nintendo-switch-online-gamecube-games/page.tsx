import type { Metadata } from 'next';
import NintendoSwitchGamecubeGamesClient from './client';

export const metadata: Metadata = {
  title: 'Switch Online GameCube Games Guide | UnblockDevs',
  description: 'Nintendo Switch Online GameCube games: what\'s available, how to access. Full list. Retro gaming.',
  keywords: [
    'Nintendo Switch Online GameCube games',
    'GameCube games Switch',
    'Nintendo Switch Online',
    'GameCube emulation Switch',
    'retro games Switch',
    'Nintendo GameCube',
    'Switch Online expansion',
    'GameCube classics',
    'Nintendo retro gaming',
    'Switch GameCube library',
    'Nintendo 64 Switch',
    'GameCube games list',
    'Switch Online membership',
    'Nintendo classic games',
    'GameCube Switch Online'
  ],
  openGraph: {
    title: 'Switch Online GameCube Games Guide',
    description: 'Switch Online GameCube games: list, how to access.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/nintendo-switch-online-gamecube-games',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/nintendo-switch-online-gamecube-games' },

};

export default function NintendoSwitchGamecubeGamesGuide() {
  return <NintendoSwitchGamecubeGamesClient />;
}
