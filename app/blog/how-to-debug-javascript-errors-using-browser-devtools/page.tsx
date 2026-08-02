import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Debug JavaScript Errors with Browser DevTools | UnblockDevs',
  description: 'Debug JavaScript errors using Chrome, Firefox, and Edge DevTools. Set breakpoints, inspect variables, use the console, and track down production errors. Complete guide with examples.',
  keywords: [
    'debug javascript errors',
    'browser devtools javascript debugging',
    'chrome devtools debugging',
    'javascript breakpoints devtools',
    'fix javascript errors devtools',
    'javascript console error debugging',
    'firefox devtools debugging',
    'how to debug javascript in chrome',
    'how to find javascript errors in browser',
    'what does the console tab in devtools do',
    'javascript error debugging guide',
    'debug production javascript errors'
  ],
  openGraph: {
    title: 'Debug JavaScript Errors with Browser DevTools: Chrome, Firefox & Edge',
    description: 'Master JavaScript debugging using browser DevTools in Chrome, Firefox, and Edge. Learn to set breakpoints, inspect variables, read console errors, and track down production bugs — step by step.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Debug%20JavaScript%20Errors%20Using%20Browser%20DevTools%20%28Complete%20Guide%29&emoji=%E2%9A%A1&desc=Master%20JavaScript%20debugging%20with%20browser%20DevTools', width: 1200, height: 630, alt: 'How to Debug JavaScript Errors Using Browser DevTools (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug JavaScript Errors with Browser DevTools',
    description: 'Debug JavaScript errors in Chrome, Firefox, and Edge DevTools. Set breakpoints, inspect variables, and read console errors like a pro.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
