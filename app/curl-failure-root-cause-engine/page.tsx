import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cURL Failure Root-Cause Engine | UnblockDevs',
  description: 'Diagnose why your API call is failing. Ranked root causes, confidence scores, fix suggestions. Debug 401, 400, 404. Free, no signup.',
  keywords: [
    'curl failure root cause',
    'api call failure diagnosis',
    'curl error analyzer',
    'api debugging tool',
    'curl 401 unauthorized fix',
    'curl 400 bad request fix',
    'api error diagnosis',
    'curl failure analyzer',
    'why api call failing',
    'curl error root cause',
    'api debugging',
    'curl error fix',
    'http error analyzer',
    'api failure diagnosis',
    'curl troubleshooting',
    'api call debugger',
    'curl error diagnosis',
    'api error root cause',
    'curl failure analysis',
    'debug api calls'
  ],
  openGraph: {
    title: 'cURL Failure Root-Cause Engine | UnblockDevs',
    description: 'Diagnose why your API call is failing. Get ranked root causes, confidence scores, and fix suggestions.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-failure-root-cause-engine',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/curl-failure-root-cause-engine',
  },
};

import CurlFailureRootCauseClient from './client';

export default function CurlFailureRootCausePage() {
  return <CurlFailureRootCauseClient />;
}
