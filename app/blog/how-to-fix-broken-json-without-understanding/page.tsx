import type { Metadata } from 'next';
import HowToFixBrokenJsonWithoutUnderstandingClient from './client';

export const metadata: Metadata = {
  title: 'Fix Broken JSON Without Understanding It | UnblockDevs',
  description: 'Fix broken JSON without knowing how to code. This step-by-step guide helps beginners, non-developers, and students repair invalid JSON quickly using a free online JSON Fixer tool.',
  keywords: [
    'fix broken json',
    'fix json without coding',
    'json fixer for beginners',
    'repair invalid json online',
    'json fixer non developer',
    'fix json without understanding',
    'fix json simple guide',
    'online json fixer tool',
    'how to fix broken json file',
    'what is invalid json',
    'how do i fix json without knowing code',
    'beginner json repair guide'
  ],
  openGraph: {
    title: 'How to Fix Broken JSON Without Understanding It — Beginner\'s Guide',
    description: 'Not a developer? No problem. This guide shows non-devs, students, and beginners how to fix broken or invalid JSON step by step — using a free online JSON Fixer tool, no coding required.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-broken-json-without-understanding',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20Broken%20JSON%20Without%20Understanding%20It&emoji=%F0%9F%93%9D&desc=Fix%20broken%20JSON%20without%20coding.%20Step-by-step%20for%20non-devs%2C%20students.%20Free%20JSON%20F', width: 1200, height: 630, alt: 'Fix Broken JSON Without Understanding It — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Broken JSON Without Understanding It',
    description: 'Fix broken JSON without any coding knowledge. Step-by-step guide for beginners and non-developers using a free online JSON Fixer tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-broken-json-without-understanding' },

};

export default function HowToFixBrokenJsonWithoutUnderstanding() {
  return <HowToFixBrokenJsonWithoutUnderstandingClient />;
}

