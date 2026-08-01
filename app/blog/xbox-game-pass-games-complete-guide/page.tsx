import type { Metadata } from 'next';
import XboxGamePassGuideClient from './client';

export const metadata: Metadata = {
  title: 'Xbox Game Pass Games – Guide | UnblockDevs',
  description: 'Xbox Game Pass: best games, tiers, value. What\'s included, how to get most value. Must-play list.',
  keywords: [
    'xbox game pass games',
    'xbox game pass',
    'game pass games list',
    'best xbox game pass games',
    'xbox game pass ultimate',
    'xbox game pass pc',
    'game pass membership',
    'xbox game pass value',
    'game pass library',
    'xbox game pass deals',
    'game pass subscription',
    'xbox game pass new games',
    'game pass day one games',
    'xbox game pass exclusive games',
    'game pass free games',
    'xbox game pass tips',
    'game pass vs buying games',
    'xbox game pass review',
    'game pass best games 2026',
    'xbox game pass guide'
  ],
  openGraph: {
    title: 'Xbox Game Pass Games – Guide',
    description: "Xbox Game Pass: best games, tiers, value. What's included, how to get most value. Must-play list.",
    type: 'article',
    url: 'https://unblockdevs.com/blog/xbox-game-pass-games-complete-guide',
    images: [{ url: "https://unblockdevs.com/api/og?title=Xbox%20Game%20Pass%20Games%20%E2%80%93%20Guide&emoji=%F0%9F%93%9D&desc=Xbox%20Game%20Pass%3A%20best%20games%2C%20tiers%2C%20value.%20What's%20included%2C%20how%20to%20get%20most%20valu", width: 1200, height: 630, alt: 'Xbox Game Pass Games – Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xbox Game Pass Games – Guide',
    description: "Xbox Game Pass: best games, tiers, value. What's included, how to get most value. Must-play list.",
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/xbox-game-pass-games-complete-guide' },

};

export default function XboxGamePassGuide() {
  return <XboxGamePassGuideClient />;
}

