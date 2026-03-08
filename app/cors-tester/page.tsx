import type { Metadata } from 'next';
import Link from 'next/link';
import CorsTesterClient from './client';

export const metadata: Metadata = {
  title: 'CORS Tester — Debug Cross-Origin & Test API Headers | UnblockDevs',
  description:
    'Test and debug CORS policies. Preflight simulator, response header analyzer, security misconfiguration scanner. Multi-origin testing. 100% in your browser.',
  keywords: [
    'cors tester',
    'test cors headers',
    'debug cors api',
    'cors debugging tool',
    'access control allow origin',
  ],
  openGraph: {
    title: 'CORS Tester — UnblockDevs',
    description: 'Debug CORS: preflight simulator, header analyzer, security scanner. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/cors-tester',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/cors-tester',
  },
};

export default function CorsTesterPage() {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="cors-heading">
        <h1 id="cors-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          CORS Tester
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Test and debug Cross-Origin Resource Sharing (CORS) for any API. Simulate preflight requests,
          analyze response headers, and detect security misconfigurations. Runs entirely in your browser — no request data is stored or sent to our servers.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <CorsTesterClient />
      </div>
    </>
  );
}
