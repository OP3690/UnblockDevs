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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Cancel%20Audible%20Subscription%20on%20Mobile%20%26%20Desktop%3A%20Complete%20Guide%202026&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Complete%20guide%20to%20canceling%20your%20Audible%20subscription%20on%20mobile%20and%20desktop', width: 1200, height: 630, alt: 'How to Cancel Audible Subscription on Mobile & Desktop: Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Cancel Audible Subscription on Mobile & Desktop: Complete Guide 2026',
    description: 'Complete guide to canceling your Audible subscription on mobile and desktop. Step-by-step instructions to cancel without losing your audiobooks.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-cancel-audible-subscription-mobile-desktop' },
  robots: { index: false, follow: false },
};

export default function HowToCancelAudibleSubscriptionGuide() {
  return <HowToCancelAudibleSubscriptionClient />;
}
