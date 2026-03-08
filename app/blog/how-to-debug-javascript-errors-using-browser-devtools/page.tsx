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
    url: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-debug-javascript-errors-using-browser-devtools',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
