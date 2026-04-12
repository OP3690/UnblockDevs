import type { Metadata } from 'next';
import CssUiComponentsFreeClient from './client';

const canonicalUrl = 'https://unblockdevs.com/blog/css-ui-components-free-copy-paste';

export const metadata: Metadata = {
  title: '401+ Free CSS UI Components to Copy and Paste (2026) | UnblockDevs',
  description:
    'Browse 401+ free CSS UI components — buttons, cards, modals, navbars, forms, and more. No signup. Copy Tailwind or plain CSS code instantly for any web project.',
  keywords: [
    'CSS UI components',
    'free CSS components',
    'copy paste CSS components',
    'CSS component library free',
    'HTML CSS components',
    'CSS UI kit',
    'CSS button component',
    'CSS card component',
    'CSS modal component',
    'CSS navbar component',
    'CSS form components',
    'Tailwind CSS components free',
    'frontend components free',
    'CSS components for website',
    'ready to use CSS components',
  ],
  openGraph: {
    title: '401+ Free CSS UI Components — Copy-Paste Tailwind & CSS',
    description:
      'Buttons, cards, modals, navbars, forms, and 20+ more categories. No signup, no framework lock-in. Copy Tailwind or plain CSS instantly.',
    type: 'article',
    publishedTime: '2026-04-12T00:00:00Z',
    authors: ['UnblockDevs'],
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Free CSS UI Components — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '401+ Free CSS UI Components to Copy-Paste (2026)',
    description: 'Buttons, cards, modals, navbars, and 20+ categories. Tailwind + plain CSS. Free forever.',
  },
  alternates: { canonical: canonicalUrl },
};

export default function CssUiComponentsFreeCopyPastePage() {
  return <CssUiComponentsFreeClient />;
}
