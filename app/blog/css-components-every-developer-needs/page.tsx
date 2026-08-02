import type { Metadata } from 'next';
import CssComponentsEveryDeveloperNeedsClient from './client';

const canonicalUrl = 'https://unblockdevs.com/blog/css-components-every-developer-needs';

export const metadata: Metadata = {
  title: '10 CSS Components Every Web Developer Needs | UnblockDevs',
  description:
    'The 10 most-used CSS components — buttons, cards, modals, navbars, forms, and tables. Copy-paste code examples in plain CSS and Tailwind CSS included for free.',
  keywords: [
    'CSS components web developer',
    'essential CSS components',
    'CSS button styles',
    'CSS card design',
    'CSS navbar',
    'CSS modal',
    'CSS form design',
    'CSS table styles',
    'CSS alert component',
    'HTML CSS components',
    'frontend CSS components',
    'CSS components examples'
  ],
  openGraph: {
    title: '10 CSS Components Every Web Developer Needs — With Full Copy-Paste Code Examples',
    description:
      'The 10 CSS components that appear in almost every web project — buttons, cards, modals, navbars, forms, and tables. Complete copy-paste code in plain CSS and Tailwind CSS for each component.',
    type: 'article',
    publishedTime: '2026-04-12T00:00:00Z',
    authors: ['UnblockDevs'],
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=10%20CSS%20Components%20Every%20Web%20Developer%20Needs%20%E2%80%94%20With%20Full%20Code&emoji=%F0%9F%8E%A8&desc=Buttons%2C%20cards%2C%20modals%2C%20navbars%2C%20tables%2C%20forms', width: 1200, height: 630, alt: '10 CSS Components Every Web Developer Needs — With Full Code — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 CSS Components Every Web Developer Needs',
    description: 'The essential CSS components every web project needs: buttons, cards, modals, navbars, forms, and more. All with copy-paste code in CSS and Tailwind.',
  },
  alternates: { canonical: canonicalUrl },
};

export default function CssComponentsEveryDeveloperNeedsPage() {
  return <CssComponentsEveryDeveloperNeedsClient />;
}
