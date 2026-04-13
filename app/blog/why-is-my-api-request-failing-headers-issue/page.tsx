import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Why Is My API Request Failing? Fix HTTP Header Issues (Auth, CORS, Content-Type) | UnblockDevs',
  description:
    'API request failing with 401, 403, or CORS error? The problem is almost always a missing or wrong HTTP header. Here\'s how to debug and fix authorization headers, content-type errors, and CORS header issues step by step.',
  keywords: [
    'why is my api request failing headers issue',
    'missing authorization header error fix',
    'how to debug cors headers issue',
    'invalid headers in http request fix',
    'how to check content-type header',
    'how to fix incorrect headers in api request',
    'why is my header not being sent',
    'how to debug network request headers',
    'http headers not working properly',
    'how to verify headers in api calls',
    'inspect api headers without postman',
  ],
  openGraph: {
    title: 'Why Is My API Request Failing? Fix HTTP Header Issues (Auth, CORS, Content-Type) | UnblockDevs',
    description:
      'API request failing with 401, 403, or CORS error? Debug and fix authorization headers, content-type errors, and CORS header issues step by step.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-is-my-api-request-failing-headers-issue',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is My API Request Failing? Fix HTTP Header Issues (Auth, CORS, Content-Type)',
    description:
      'API failing with 401, 403, or CORS error? Almost always a header issue. Debug and fix authorization, content-type, and CORS headers step by step.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-is-my-api-request-failing-headers-issue' },
};

export default function WhyIsMyApiRequestFailingPage() {
  return <BlogPostClient />;
}
