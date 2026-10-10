import type { Metadata } from 'next';
import SocialMediaComparisonTrapClient from './client';

export const metadata: Metadata = {
  title: 'The Comparison Trap: Why Social Media Makes You Feel Like You\'re Never Enough | UnblockDevs',
  description: 'Research-backed breakdown of why social media comparison makes you feel inadequate — the highlight reel effect, FOMO, and how to break the cycle.',
  keywords: [
    'social media comparison trap',
    'FOMO social media effect',
    'social media self-esteem',
    'highlight reel effect Instagram',
    'why social media makes you feel bad about yourself',
    'social comparison theory social media',
    'Instagram comparison depression',
    'social media and self worth',
    'social media FOMO anxiety',
    'social media inadequacy',
    'upward social comparison social media',
    'social media body image',
    'social media and self esteem teens',
    'highlight reel social media psychology',
    'curated life social media',
    'social media makes me feel bad',
    'Festinger social comparison theory',
    'social media comparison anxiety',
    'Instagram highlight reel effect',
    'social media peer comparison',
  ],
  openGraph: {
    title: 'The Comparison Trap: Why Social Media Makes You Feel Like You\'re Never Enough',
    description: 'From the highlight reel effect to FOMO — the psychology of social media comparison and how to stop it from defining how you feel about yourself.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/social-media-comparison-trap',
    images: [
      {
        url: 'https://unblockdevs.com/api/og?title=The%20Comparison%20Trap%3A%20Why%20Social%20Media%20Makes%20You%20Feel%20Like%20You%27re%20Never%20Enough&emoji=%F0%9F%AA%9E&desc=The%20psychology%20behind%20social%20media%20comparison%20and%20FOMO',
        width: 1200,
        height: 630,
        alt: 'The Comparison Trap: Why Social Media Makes You Feel Like You\'re Never Enough — UnblockDevs Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Comparison Trap: Why Social Media Makes You Feel Like You\'re Never Enough',
    description: 'The highlight reel effect, FOMO, and upward comparison — the psychology of why social media makes you feel inadequate and how to break the cycle.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/social-media-comparison-trap' },
  robots: { index: true, follow: true },
};

export default function SocialMediaComparisonTrapPage() {
  return <SocialMediaComparisonTrapClient />;
}
