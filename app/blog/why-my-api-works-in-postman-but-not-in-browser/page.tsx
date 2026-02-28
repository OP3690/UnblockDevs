import type { Metadata } from 'next';
import WhyMyApiWorksInPostmanButNotInBrowserClient from './client';

export const metadata: Metadata = {
  title: 'Why My API Works in Postman but Not in Browser | Fix Guide 2026',
  description: 'Learn why your API works in Postman but fails in browsers. Complete troubleshooting guide for CORS errors, authentication issues, preflight requests, and browser security restrictions. Includes solutions and code examples.',
  keywords: [
    'api works in postman but not browser',
    'cors error browser',
    'api not working in browser',
    'postman vs browser api',
    'cors policy error',
    'api authentication browser',
    'preflight request failed',
    'browser api error',
    'api works postman fails browser',
    'cors browser fix',
    'api request browser',
    'browser security api',
    'fetch api cors error',
    'api cors configuration',
    'browser api troubleshooting'
  ],
  openGraph: {
    title: 'Why My API Works in Postman but Not in Browser | Fix Guide 2026',
    description: 'Learn why your API works in Postman but fails in browsers. Complete troubleshooting guide for CORS errors, authentication issues, and browser security restrictions.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why My API Works in Postman but Not in Browser | Fix Guide 2026',
    description: 'Learn why your API works in Postman but fails in browsers. Complete troubleshooting guide for CORS errors, authentication issues, and browser security restrictions.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-my-api-works-in-postman-but-not-in-browser' },
};

export default function WhyMyApiWorksInPostmanButNotInBrowserPage() {
  return <WhyMyApiWorksInPostmanButNotInBrowserClient />;
}
