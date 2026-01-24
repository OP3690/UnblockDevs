import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free cURL Failure Root-Cause Engine – Diagnose API Call Failures | UnblockDevs',
  description: 'Diagnose why your API call is failing. Get ranked root causes, confidence scores, fix suggestions, and corrected cURL commands. Free online tool for debugging 401, 400, 404, and other HTTP errors.',
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
    title: 'Free cURL Failure Root-Cause Engine – Diagnose API Call Failures',
    description: 'Diagnose why your API call is failing. Get ranked root causes, confidence scores, and fix suggestions.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-failure-root-cause-engine',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/curl-failure-root-cause-engine',
  },
};

import CurlFailureRootCauseClient from './client';

export default function CurlFailureRootCausePage() {
  return <CurlFailureRootCauseClient />;
}
