import type { Metadata } from 'next';
import RegexTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/regex-tester';

export const metadata: Metadata = {
  title: 'Regex Tester – Test & Debug Regular Expressions Online | UnblockDevs',
  description:
    'Test regular expressions in real time. See matches, capture groups, and replace results. Flags: global, case-insensitive, multiline, dotall, unicode, sticky. 100% client-side.',
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
  },
  alternates: { canonical: canonicalUrl },
};

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
