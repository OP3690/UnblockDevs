import type { Metadata } from 'next';
import RegexTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/regex-tester';

export const metadata: Metadata = {
  title: 'Regex Tester – Test & Debug Regular Expressions Online | UnblockDevs',
  description: 'Test regex in real time. Matches, capture groups, replace. All flags. 100% client-side.',
  keywords: [
    'regex tester',
    'regular expression tester',
    'regex debug',
    'test regex online',
    'regex match',
    'regex replace',
    'regex flags',
  ],
  openGraph: {
    title: 'Regex Tester – Test & Debug Regular Expressions Online',
    description: 'Test regex with live matches, groups, and replace. Supports all JavaScript regex flags.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: canonicalUrl },
};

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
