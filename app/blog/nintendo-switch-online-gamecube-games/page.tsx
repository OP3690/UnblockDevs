import type { Metadata } from 'next';
import NintendoSwitchGamecubeGamesClient from './client';

export const metadata: Metadata = {
  title: 'Nintendo Switch Online GameCube Games: Complete Guide - What, When, How & Why | UnblockDevs',
  description: 'Complete guide to Nintendo Switch Online GameCube games. Learn what GameCube games are available, when they were added, how to access them, and why they matter for retro gaming. Full list and instructions included.',
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
    title: 'Nintendo Switch Online GameCube Games: Complete Guide - What, When, How & Why',
    description: 'Complete guide to Nintendo Switch Online GameCube games. Learn what games are available, when they were added, how to access them, and why they matter.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function NintendoSwitchGamecubeGamesGuide() {
  return <NintendoSwitchGamecubeGamesClient />;
}
