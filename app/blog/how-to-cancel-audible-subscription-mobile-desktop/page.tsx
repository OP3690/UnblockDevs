import type { Metadata } from 'next';
import HowToCancelAudibleSubscriptionClient from './client';

export const metadata: Metadata = {
  title: 'Cancel Audible on Mobile & Desktop 2026 | UnblockDevs',
  description: 'Cancel Audible on mobile (Android, iPhone) and desktop. Step-by-step: keep credits, preserve library. Guide 2026.',
  keywords: [
    'cancel audible subscription',
    'how to cancel audible',
    'cancel audible membership',
    'cancel audible on mobile',
    'cancel audible on desktop',
    'how to cancel audible subscription',
    'audible cancellation guide',
    'cancel audible android',
    'cancel audible iphone',
    'audible subscription cancel',
    'how to cancel audible account',
    'audible membership cancellation',
    'cancel audible subscription 2026',
    'audible cancel membership',
    'how to unsubscribe from audible'
  ],
  openGraph: {
    title: 'How to Cancel Audible Subscription on Mobile & Desktop: Complete Guide 2026',
    description: 'Complete guide to canceling your Audible subscription on mobile and desktop. Step-by-step instructions to cancel without losing your audiobooks.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-cancel-audible-subscription-mobile-desktop',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-cancel-audible-subscription-mobile-desktop' },
};

export default function HowToCancelAudibleSubscriptionGuide() {
  return <HowToCancelAudibleSubscriptionClient />;
}
