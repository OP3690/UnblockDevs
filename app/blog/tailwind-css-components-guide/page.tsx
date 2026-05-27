import type { Metadata } from 'next';
import TailwindCssComponentsGuideClient from './client';

const canonicalUrl = 'https://unblockdevs.com/blog/tailwind-css-components-guide';

export const metadata: Metadata = {
  title: 'Tailwind CSS Components: Complete Guide + 401 Free Examples (2026) | UnblockDevs',
  description:
    'Everything about Tailwind CSS components — what they are, how to build them, common patterns for buttons, cards, navbars, and modals, plus 401 free copy-paste examples.',
  keywords: [
    'Tailwind CSS components',
    'Tailwind UI components free',
    'Tailwind CSS examples',
    'Tailwind button component',
    'Tailwind card component',
    'Tailwind modal component',
    'Tailwind navbar component',
    'Tailwind form components',
    'Tailwind CSS UI kit',
    'free Tailwind components',
    'copy paste Tailwind CSS',
    'Tailwind CSS patterns',
    'Tailwind component library free',
    'Next.js Tailwind components',
    'Tailwind CSS responsive components',
  ],
  openGraph: {
    title: 'Tailwind CSS Components: Complete Guide + 401 Free Examples',
    description:
      'Learn Tailwind component patterns for buttons, cards, navbars, modals, and more. 401 free copy-paste examples with live previews.',
    type: 'article',
    publishedTime: '2026-04-12T00:00:00Z',
    authors: ['UnblockDevs'],
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Tailwind%20CSS%20Components%3A%20Complete%20Guide%20%2B%20401%20Free%20Examples&emoji=%F0%9F%A4%96&desc=Learn%20Tailwind%20component%20patterns%20for%20buttons%2C%20cards%2C%20navbars%2C%20modals%2C%20and%20more', width: 1200, height: 630, alt: 'Tailwind CSS Components: Complete Guide + 401 Free Examples — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailwind CSS Components: Complete Guide + 401 Free Examples',
    description: 'Buttons, cards, navbars, modals — Tailwind patterns explained with 401 free copy-paste examples.',
  },
  alternates: { canonical: canonicalUrl },
};

export default function TailwindCssComponentsGuidePage() {
  return <TailwindCssComponentsGuideClient />;
}
