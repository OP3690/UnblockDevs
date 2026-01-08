import type { Metadata } from 'next';
import XboxGamePassGuideClient from './client';

export const metadata: Metadata = {
  title: 'Xbox Game Pass Games: Complete Guide to Best Games, Value & Membership | UnblockDevs',
  description: 'Complete guide to Xbox Game Pass games: best games library, membership tiers, value analysis, what games are included, how to get the most value, and tips for choosing the right subscription. Discover must-play games on Game Pass.',
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
};

export default function XboxGamePassGuide() {
  return <XboxGamePassGuideClient />;
}

