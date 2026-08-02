import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Copy Request as cURL in Chrome DevTools | UnblockDevs',
  description: 'Learn how to copy any Chrome DevTools network request as a cURL command. Step-by-step guide, plus how to export all requests from a HAR file when copy as cURL doesn\'t work.',
  keywords: [
    'copy as curl chrome devtools',
    'how to copy request as curl in chrome',
    'where is copy as curl in devtools',
    'how to convert network request to curl',
    'how to generate curl from browser request',
    'copy as curl not working in chrome fix',
    'chrome network request to curl',
    'copy network request as curl',
    'how to export api request as curl',
    'how to debug api using curl command',
    'har file export chrome devtools',
    'right click copy as curl chrome'
  ],
  openGraph: {
    title: 'How to Copy Any Chrome DevTools Network Request as a cURL Command',
    description: 'Right-click any network request in Chrome DevTools and select \'Copy as cURL\' — step-by-step. Also covers what to do when it\'s greyed out, and how to export all requests at once from a HAR file.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-copy-request-as-curl-in-chrome',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Copy%20a%20Request%20as%20cURL%20in%20Chrome%20%E2%80%94%20DevTools%20Guide&emoji=%E2%9A%A1&desc=Step-by-step%3A%20how%20to%20copy%20any%20network%20request%20as%20a%20cURL%20command%20in%20Chrome', width: 1200, height: 630, alt: 'How to Copy a Request as cURL in Chrome — DevTools Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copy Request as cURL in Chrome DevTools',
    description: 'Step-by-step: right-click any Chrome DevTools network request and copy it as cURL. Plus, how to export HAR files when copy as cURL is greyed out.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-copy-request-as-curl-in-chrome' },
};

export default function HowToCopyRequestAsCurlInChrome() {
  return <BlogPostClient />;
}
