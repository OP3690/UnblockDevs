import type { Metadata } from 'next';
import HowToFixCorsPolicyErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix CORS Policy Error in JavaScript 2026 | UnblockDevs',
  description: 'Fix CORS policy errors in JavaScript for Chrome, Firefox, Safari, and Edge. Covers Access-Control-Allow-Origin headers, proxy workarounds, and server-side CORS configuration with code.',
  keywords: [
    'cors policy error javascript',
    'fix cors error',
    'cors blocked request fix',
    'access control allow origin error',
    'cors policy error solution',
    'cors error chrome fix',
    'fix cors javascript server',
    'cors proxy workaround',
    'how to fix cors policy error',
    'why is my request blocked by cors',
    'cors error all browsers fix',
    'enable cors for javascript fetch'
  ],
  openGraph: {
    title: 'Fix CORS Policy Error in JavaScript: Server Fixes, Proxy & Workarounds',
    description: 'Getting \'Blocked by CORS policy\' in JavaScript? This guide explains CORS errors and shows you how to fix them server-side, using a proxy, or with workarounds for Chrome, Firefox, Safari, and Edge.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-cors-policy-error-javascript',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Fix&emoji=%F0%9F%94%92&desc=Fix%20CORS%20policy%20errors%20in%20JavaScript', width: 1200, height: 630, alt: 'How to Fix — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Fix CORS Policy Error in JavaScript',
    description: 'Fix \'Blocked by CORS policy\' JavaScript errors. Server-side fixes, proxy workarounds, and Access-Control-Allow-Origin solutions — with code.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-cors-policy-error-javascript' },

};

export default function HowToFixCorsPolicyErrorGuide() {
  return <HowToFixCorsPolicyErrorClient />;
}
