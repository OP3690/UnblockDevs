import type { Metadata } from 'next';
import HowToCancelNetflixSubscriptionClient from './client';

export const metadata: Metadata = {
  title: 'Cancel Netflix Without Losing Watch History 2026 | UnblockDevs',
  description: 'Cancel Netflix without losing watch history. Step-by-step for mobile, desktop, TV. Preserve history. 2026.',
  keywords: [
    'cancel netflix subscription',
    'how to cancel netflix',
    'cancel netflix without losing history',
    'cancel netflix subscription 2026',
    'how to cancel netflix account',
    'netflix cancellation guide',
    'cancel netflix mobile',
    'cancel netflix desktop',
    'netflix subscription cancel',
    'how to cancel netflix membership',
    'cancel netflix keep watch history',
    'netflix account cancellation',
    'cancel netflix on phone',
    'cancel netflix on computer',
    'netflix cancel subscription guide'
  ],
  openGraph: {
    title: 'How to Cancel Netflix Subscription Without Losing Watch History: Complete Guide 2026',
    description: 'Cancel Netflix without losing watch history. Step-by-step for all devices.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-cancel-netflix-subscription-without-losing-watch-history',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-cancel-netflix-subscription-without-losing-watch-history' },

};

export default function HowToCancelNetflixSubscriptionGuide() {
  return <HowToCancelNetflixSubscriptionClient />;
}
