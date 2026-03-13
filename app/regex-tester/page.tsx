import type { Metadata } from 'next';
import RegexTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/regex-tester';

export const metadata: Metadata = {
  title:
    'Regex Tester — Test JavaScript Regular Expressions Online, Capture Groups, Replace & Flags Real-Time Free | UnblockDevs',
  description:
    'Test regular expressions in real time. See all matches, capture groups, and match indexes highlighted in your text. Test regex replace with $1 $2 group references. JavaScript RegExp engine, all flags, free online.',
  keywords: [
    'regex tester',
    'regex tester online',
    'regex tester free',
    'test regex online',
    'regex checker online',
    'javascript regex tester',
    'regex pattern tester',
    'regex capture group tester',
    'regex replace tester online',
    'regex validator online',
    'test javascript regex online',
    'regex flags tester',
    'common regex patterns',
    'email validation regex',
    'how to test a regex pattern online',
    'what does \\d mean in regex',
    'regex cheat sheet',
  ],
  openGraph: {
    title:
      'Regex Tester — Test JavaScript Regular Expressions Online, Capture Groups, Replace & Flags Free | UnblockDevs',
    description:
      'Test regex in real time. Matches, capture groups, match index, replace with $1 $2. JavaScript RegExp, all flags (g i m s u y). Free, 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester — JavaScript Regex Online, Capture Groups, Replace & Flags Free | UnblockDevs',
    description:
      'Test regex in real time. Matches, capture groups, replace with $1 $2. All JS flags. Free, 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Regex Tester — Test JavaScript Regular Expressions Online, Capture Groups, Replace & Flags',
  description:
    'Test regular expressions in real time. See all matches, capture groups, and match indexes highlighted in your text. Test regex replace with $1 $2 group references. JavaScript RegExp (ECMAScript), all flags (g i m s u y). Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Real-time matching as you type',
    'All matches and capture groups displayed with index',
    'Visual text highlighting',
    'Replace mode with $1 $2 capture group support',
    'All JavaScript flags: g, i, m, s, u, y',
    'Sample patterns: email, URL, phone, capture groups',
    '100% browser-based — nothing sent to server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I test a regex pattern online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your regular expression and test string at unblockdevs.com/regex-tester. Matches highlight in real time as you type — no clicking needed. The results table shows every match, its position index, and any capture groups.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the g flag in JavaScript regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The g (global) flag makes the regex find all matches in the string instead of stopping after the first one. Without g, only the first match is returned. Most search and replace use cases require the g flag.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use capture groups in regex replace?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Wrap the parts to capture in parentheses in your pattern. In the replacement field, reference them with $1 for the first group, $2 for the second, and so on. For example, pattern (\\w+)\\s(\\w+) with replacement $2 $1 swaps the first two words.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between + and * in regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '* matches 0 or more occurrences and can match nothing. + matches 1 or more and requires at least one character. Use + when a character must appear, use * when it is optional.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What does \\d mean in regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '\\d matches any digit character — equivalent to [0-9]. Use \\d+ for one or more digits, \\d{4} for exactly 4 digits. \\D (uppercase) matches any non-digit character.',
      },
    },
  ],
};

export default function RegexTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RegexTesterClient />
    </>
  );
}
