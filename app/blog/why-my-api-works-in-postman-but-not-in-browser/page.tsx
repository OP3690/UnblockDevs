import type { Metadata } from 'next';
import WhyMyApiWorksInPostmanButNotInBrowserClient from './client';

export const metadata: Metadata = {
  title: 'Why My API Works in Postman but Not in Browser | UnblockDevs',
  description: 'Fix APIs that work in Postman but fail in the browser. Learn about CORS errors, preflight requests, auth headers, and browser security restrictions.',
  keywords: [
    'api works in postman but not browser',
    'cors error browser',
    'api not working in browser',
    'cors policy error fix',
    'api authentication browser',
    'preflight request failed',
    'api works postman fails browser',
    'fetch api cors error',
    'api cors configuration',
    'browser api troubleshooting',
    'why api fails in browser',
    'cors headers missing',
    'postman vs browser differences'
  ],
  openGraph: {
    title: 'Why My API Works in Postman but Fails in the Browser — Fix Guide',
    description: 'Learn why your API works in Postman but fails in browsers. Complete troubleshooting guide for CORS errors, authentication issues, and browser security restrictions.',
    type: 'article',
    publishedTime: '2026-01-29T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-my-api-works-in-postman-but-not-in-browser',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20My%20API%20Works%20in%20Postman%20but%20Not%20in%20Browser%20%7C%20Fix%20Guide%202026&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20why%20your%20API%20works%20in%20Postman%20but%20fails%20in%20browsers', width: 1200, height: 630, alt: 'Why My API Works in Postman but Not in Browser | Fix Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why My API Works in Postman but Not in Browser',
    description: 'CORS errors, preflight failures, auth headers — learn exactly why APIs work in Postman but break in the browser and how to fix each issue.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-my-api-works-in-postman-but-not-in-browser' },
};

export default function WhyMyApiWorksInPostmanButNotInBrowserPage() {
  return <WhyMyApiWorksInPostmanButNotInBrowserClient />;
}
