import type { Metadata } from 'next';
import CssComponentsEveryDeveloperNeedsClient from './client';

const canonicalUrl = 'https://unblockdevs.com/blog/css-components-every-developer-needs';

export const metadata: Metadata = {
  title: '10 CSS Components Every Web Developer Needs (With Code) | UnblockDevs',
  description:
    'The 10 most-used CSS components for web development — buttons, cards, modals, navbars, forms, tables, and more. Complete code examples in plain CSS and Tailwind.',
  keywords: [
    'CSS components web developer',
    'CSS components every website needs',
    'essential CSS components',
    'CSS button styles',
    'CSS card design',
    'CSS navbar',
    'CSS modal',
    'CSS form design',
    'CSS table styles',
    'CSS alert component',
    'CSS components examples',
    'HTML CSS components',
    'web developer CSS tools',
    'frontend CSS components',
    'CSS UI essentials',
  ],
  openGraph: {
    title: '10 CSS Components Every Web Developer Needs — With Full Code',
    description:
      'Buttons, cards, modals, navbars, tables, forms — the 10 CSS components that appear in almost every web project, with complete copy-paste code.',
    type: 'article',
    publishedTime: '2026-04-12T00:00:00Z',
    authors: ['UnblockDevs'],
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=10%20CSS%20Components%20Every%20Web%20Developer%20Needs%20%E2%80%94%20With%20Full%20Code&emoji=%F0%9F%8E%A8&desc=Buttons%2C%20cards%2C%20modals%2C%20navbars%2C%20tables%2C%20forms', width: 1200, height: 630, alt: '10 CSS Components Every Web Developer Needs — With Full Code — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 CSS Components Every Web Developer Needs (With Code)',
    description: 'The essential CSS components with complete copy-paste code — buttons, cards, modals, navbars, and more.',
  },
  alternates: { canonical: canonicalUrl },
};

export default function CssComponentsEveryDeveloperNeedsPage() {
  return <CssComponentsEveryDeveloperNeedsClient />;
}
