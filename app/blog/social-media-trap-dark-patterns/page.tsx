import type { Metadata } from 'next';
import SocialMediaTrapClient from './client';

export const metadata: Metadata = {
  title: 'The Social Media Trap: 8 Design Tricks That Keep You Scrolling | UnblockDevs',
  description: 'Infinite scroll, variable reward notifications, autoplay — these are deliberate dark patterns designed to hijack your attention. Learn all 8 tricks and how to escape them.',
  keywords: [
    'social media trap',
    'dark patterns social media',
    'why can\'t stop scrolling social media',
    'infinite scroll addiction',
    'social media design tricks to keep you engaged',
    'social media dark patterns',
    'infinite scroll dark pattern',
    'variable reward notifications',
    'social media manipulation',
    'social media attention economy',
    'how to stop scrolling social media',
    'social media compulsive use',
    'Aza Raskin infinite scroll',
    'social media UX manipulation',
    'autoplay social media',
    'social media gamification',
    'FOMO notifications social media',
    'disappearing content stories',
    'algorithmic personalization addiction',
    'how to escape social media trap',
  ],
  openGraph: {
    title: 'The Social Media Trap: 8 Design Tricks That Keep You Scrolling for Hours',
    description: 'These are not accidents — they are deliberate UX dark patterns documented by ex-engineers. Here are all 8 and how to escape them.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/social-media-trap-dark-patterns',
    images: [{ url: 'https://unblockdevs.com/api/og?title=The%20Social%20Media%20Trap%3A%208%20Dark%20Patterns&emoji=%F0%9F%AA%A4&desc=Deliberate%20UX%20tricks%20that%20keep%20you%20scrolling%20for%20hours', width: 1200, height: 630, alt: 'The Social Media Trap: 8 Design Tricks That Keep You Scrolling — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Social Media Trap: 8 Design Tricks That Keep You Scrolling for Hours',
    description: 'Infinite scroll, autoplay, FOMO notifications — all deliberate dark patterns. Here\'s how each one works and how to escape.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/social-media-trap-dark-patterns' },
  robots: { index: true, follow: true },
};

export default function SocialMediaTrapPage() {
  return <SocialMediaTrapClient />;
}
