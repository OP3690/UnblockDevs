import type { Metadata } from 'next';
import SocialMediaMentalHealthStatsClient from './client';

export const metadata: Metadata = {
  title: 'Social Media Mental Health Statistics 2026: The Data Is Getting Worse | UnblockDevs',
  description: 'The latest social media mental health statistics for 2026 — teen depression, anxiety, body image, and the worsening trend. Pew Research, CDC, and peer-reviewed data.',
  keywords: [
    'social media mental health statistics 2026',
    'social media depression anxiety statistics',
    'teen mental health social media data',
    'mental health crisis social media research',
    'social media teen depression statistics',
    'social media mental health 2026',
    'teen social media anxiety data',
    'social media and depression research',
    'Pew Research social media mental health',
    'CDC teen mental health social media',
    'social media body image statistics',
    'teen girls social media depression',
    'screen time mental health statistics',
    'social media mental health adults',
    'Instagram mental health research',
    'TikTok mental health statistics',
    'social media comparison depression',
    'mental health crisis teenagers 2026',
    'social media hours per day depression risk',
    'surgeon general social media advisory',
  ],
  openGraph: {
    title: 'Social Media Mental Health Statistics 2026: The Data Is Getting Worse',
    description: '59% of teens say social media harms their mental health. 40% of teen girls report persistent sadness. Here is every major data point and what it means.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/social-media-mental-health-statistics-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Social%20Media%20Mental%20Health%20Statistics%202026&emoji=%F0%9F%93%8A&desc=The%20data%20is%20getting%20worse%20%E2%80%94%20every%20major%20study%20explained', width: 1200, height: 630, alt: 'Social Media Mental Health Statistics 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Mental Health Statistics 2026: The Data Is Getting Worse',
    description: '59% of teens say social media harms their mental health. CDC data, Pew Research, and peer-reviewed studies — all the key numbers.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/social-media-mental-health-statistics-2026' },
  robots: { index: true, follow: true },
};

export default function SocialMediaMentalHealthStatsPage() {
  return <SocialMediaMentalHealthStatsClient />;
}
