import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Debug JavaScript Errors Using Browser DevTools (Complete Guide)',
  description: 'Debug JavaScript with Chrome, Firefox, Edge DevTools. Fix errors, breakpoints, inspect variables. Step-by-step guide.',
  keywords: [
    'debug javascript errors',
    'browser devtools',
    'chrome devtools',
    'firefox devtools',
    'javascript debugging',
    'debug javascript',
    'javascript error handling',
    'devtools tutorial',
    'javascript breakpoints',
    'debug console errors',
    'javascript debugging guide',
    'fix javascript errors',
    'javascript error debugging',
    'browser debugging tools',
    'javascript troubleshooting'
  ],
  openGraph: {
    title: 'How to Debug JavaScript Errors Using Browser DevTools (Complete Guide)',
    description: 'Master JavaScript debugging with browser DevTools. Learn to fix errors, use breakpoints, and debug production issues.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Debug%20JavaScript%20Errors%20Using%20Browser%20DevTools%20%28Complete%20Guide%29&emoji=%E2%9A%A1&desc=Master%20JavaScript%20debugging%20with%20browser%20DevTools', width: 1200, height: 630, alt: 'How to Debug JavaScript Errors Using Browser DevTools (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Debug JavaScript Errors Using Browser DevTools (Complete Guide)',
    description: 'Master JavaScript debugging with browser DevTools. Learn to fix errors, use breakpoints, and debug production issues.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
