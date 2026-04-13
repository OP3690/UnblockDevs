import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Debug API Request Errors — Common Dev Errors Explained',
  description: 'CORS errors, process.env undefined, maximum call stack exceeded — here\'s how to debug the most common API and JavaScript errors developers hit daily.',
  keywords: [
    'why is process.env undefined in nodejs',
    'how to fix environment variable not set nodejs',
    'how to fix cors error no access control allow origin',
    'why am i getting cors policy error',
    'how to fix maximum call stack size exceeded',
    'how to handle keyerror in python dictionary',
    'how to debug api request errors',
    'why is my api request failing',
    'how to test api requests without postman',
    'how to debug backend errors quickly',
  ],
  openGraph: {
    title: 'How to Debug API Request Errors — Common Dev Errors Explained',
    description: 'CORS errors, process.env undefined, maximum call stack exceeded — here\'s how to debug the most common API and JavaScript errors developers hit daily.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-debug-api-request-errors',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Debug API Request Errors — Common Dev Errors Explained',
    description: 'CORS errors, process.env undefined, maximum call stack exceeded — here\'s how to debug the most common API and JavaScript errors developers hit daily.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-debug-api-request-errors' },
};

export default function HowToDebugApiRequestErrors() {
  return <BlogPostClient />;
}
