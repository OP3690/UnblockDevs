import type { Metadata } from 'next';
import HowToCancelSpotifyPremiumClient from './client';

export const metadata: Metadata = {
  title: 'Cancel Spotify Premium & Get Refund 2026 | UnblockDevs',
  description: 'Cancel Spotify Premium and get refund if eligible. Step-by-step for mobile, desktop, web. 2026.',
  keywords: [
    'cancel spotify premium',
    'how to cancel spotify premium',
    'cancel spotify subscription',
    'spotify premium cancellation',
    'cancel spotify premium refund',
    'how to cancel spotify',
    'spotify cancel subscription guide',
    'cancel spotify premium mobile',
    'cancel spotify premium desktop',
    'spotify premium cancel membership',
    'cancel spotify account',
    'spotify subscription cancel 2026',
    'how to cancel spotify premium and get refund',
    'spotify premium cancellation guide',
    'cancel spotify premium step by step'
  ],
  openGraph: {
    title: 'How to Cancel Spotify Premium and Get Refund (If Eligible): Complete Guide 2026',
    description: 'Cancel Spotify Premium and get refund. Step-by-step for all devices.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-cancel-spotify-premium-and-get-refund',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-cancel-spotify-premium-and-get-refund' },

};

export default function HowToCancelSpotifyPremiumGuide() {
  return <HowToCancelSpotifyPremiumClient />;
}
