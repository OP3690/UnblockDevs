import type { Metadata } from 'next';
import CurlVsPythonRequestsComparisonClient from './client';

export const metadata: Metadata = {
  title: 'cURL vs Python Requests: Complete Comparison Guide | UnblockDevs',
  description: 'Compare cURL vs Python Requests: when to use each, pros and cons, conversion guide, and real-world examples. Learn which tool is best for your use case.',
  keywords: [
    'curl vs python requests',
    'curl vs requests',
    'curl or python requests',
    'when to use curl vs requests',
    'curl vs requests library',
    'curl python requests comparison'
  ],
};

export default function CurlVsPythonRequestsComparison() {
  return <CurlVsPythonRequestsComparisonClient />;
}

