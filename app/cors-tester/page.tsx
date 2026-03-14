import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import CorsTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/cors-tester';

export const metadata: Metadata = {
  title:
    'CORS Tester — Test & Debug CORS Headers, Preflight Requests & Security Misconfigurations Online Free | UnblockDevs',
  description:
    'Test CORS headers for any API instantly. Simulate preflight OPTIONS requests, detect security misconfigurations, and debug cross-origin errors — free, browser-based, no data stored.',
  keywords: [
    'cors tester online',
    'test cors headers online',
    'cors header checker',
    'cors debugger online',
    'cors policy tester',
    'cors preflight tester',
    'online cors checker',
    'cors error fix',
    'how to fix cors error',
    'cors error in browser',
    'cors blocked request',
    'no access-control-allow-origin header',
    'cors preflight request',
    'cors options request tester',
    'test cors preflight online',
    'cors security misconfiguration',
    'cors vulnerability tester',
    'cors error nextjs',
    'cors error express',
    'cors error fastapi',
    'rest api cors tester',
    'how to test cors headers',
    'how to debug cors errors',
    'what is a cors preflight request',
    'how to fix no access-control-allow-origin',
    'cors tester without devtools',
    'cors checker no install',
    'CORS Tester',
    'test CORS',
  ],
  openGraph: {
    title: 'CORS Tester — Test CORS Headers, Preflight & Security Online Free | UnblockDevs',
    description:
      'Test CORS headers for any API. Simulate preflight OPTIONS, detect misconfigurations, debug cross-origin errors. Free, browser-based, no data stored.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CORS Tester — Test CORS Headers & Preflight Online Free | UnblockDevs',
    description: 'Simulate preflight, analyze CORS headers, detect security misconfigurations. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CORS Tester — Test & Debug CORS Headers, Preflight & Security Online',
  description:
    'Test CORS headers for any API. Simulate preflight OPTIONS requests, analyze response headers, detect security misconfigurations. Free, browser-based. No data stored.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Simulate CORS preflight OPTIONS requests',
    'Test actual GET, POST, PUT, DELETE with custom headers',
    'Analyze Access-Control-Allow-Origin and all CORS response headers',
    'Detect security misconfigurations (e.g. wildcard with credentials)',
    'Generate preflight and actual request cURL commands',
    'Multi-origin testing — no data sent to servers',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a CORS error?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "A CORS error occurs when a browser blocks a request because the server's response headers don't permit cross-origin access. The most common cause is a missing or incorrect Access-Control-Allow-Origin header.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I test CORS headers for an API?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your API URL into CORS Tester at unblockdevs.com/cors-tester, set your origin, choose your HTTP method, and run the test. It simulates preflight OPTIONS requests and actual requests, showing all headers and security analysis.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I fix the No Access-Control-Allow-Origin error?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "This error means the server isn't returning CORS headers. Use CORS Tester to confirm which headers are missing, then add the appropriate Access-Control-Allow-Origin header to your server or API response.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a CORS preflight request?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A preflight request is an automatic OPTIONS request sent by the browser before certain cross-origin requests to verify the server permits them. CORS Tester simulates this preflight automatically and shows the result.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can CORS misconfigurations be a security risk?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Setting Access-Control-Allow-Origin to wildcard (*) with credentials enabled is a known vulnerability. CORS Tester detects and flags these misconfigurations automatically.',
      },
    },
  ],
};

export default function CorsTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <CorsTesterClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="cors-heading">
        <h1 id="cors-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          CORS Tester — Test &amp; Debug CORS Headers, Preflight Requests &amp; Security Misconfigurations Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Test and debug Cross-Origin Resource Sharing (CORS) for any API. Simulate preflight requests, analyze response headers, and detect security misconfigurations. Runs entirely in your browser — no request data is stored or sent to our servers.
        </p>
        <TrackedCtaLink href="#tool" toolName="cors_tester" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </TrackedCtaLink>
      </article>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" aria-labelledby="cors-faq-heading">
        <h2 id="cors-faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          CORS Tester — FAQs &amp; How-To
        </h2>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">What is a CORS error and why does it happen?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          A CORS error occurs when the browser blocks a cross-origin request because the server&apos;s response headers don&apos;t allow it. The most common cause is a missing or incorrect <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Origin</code> header. When your frontend (e.g. <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">https://myapp.com</code>) calls an API on another origin (e.g. <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">https://api.example.com</code>), the server must explicitly allow that origin. Use CORS Tester above to see exactly which headers the API returns and whether the browser would block the request.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How to test CORS headers for any API</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Paste your API URL into CORS Tester, set the origin (the site making the request), choose the HTTP method and any custom headers, then run the test. The tool simulates both the preflight OPTIONS request (when applicable) and the actual request, showing all CORS response headers and a security analysis. No install, no data stored — everything runs in your browser.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Understanding CORS preflight requests</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          A preflight request is an automatic <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">OPTIONS</code> request the browser sends before certain cross-origin requests (e.g. with custom headers or non-simple methods). The server must respond with headers like <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Origin</code> and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Methods</code>; only then does the browser send the real request. CORS Tester simulates this flow and shows you the preflight cURL and the actual request cURL so you can debug without opening DevTools.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Common CORS misconfigurations and how to fix them</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Common issues: (1) <strong>No CORS headers at all</strong> — add <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Origin</code> (and often <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Methods</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Headers</code>) to your server. (2) <strong>Wildcard with credentials</strong> — using <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">*</code> for Allow-Origin while sending cookies/auth is insecure; use a specific origin. (3) <strong>Preflight not handled</strong> — ensure your server responds to OPTIONS with the right headers. Run CORS Tester to see which of these applies to your API.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How to debug CORS errors without DevTools</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Use CORS Tester: enter your API URL and origin, run the test, and inspect the response headers and security analysis. You get the same information you&apos;d see in the Network tab, plus preflight simulation and generated cURL commands — no browser DevTools or terminal setup required. Ideal for quick checks and for sharing exact requests with backend devs.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How do I fix &quot;No Access-Control-Allow-Origin&quot;?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          This message means the server isn&apos;t returning CORS headers. Use CORS Tester to confirm which headers are missing, then add the appropriate <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Origin</code> (and, if needed, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Methods</code> and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Headers</code>) to your server or API response.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Can CORS misconfigurations be a security risk?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Yes. Setting <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Access-Control-Allow-Origin</code> to wildcard (<code className="rounded bg-gray-100 px-1 py-0.5 text-sm">*</code>) with credentials enabled is a known vulnerability. CORS Tester detects and flags these misconfigurations automatically so you can fix them before they reach production.
        </p>

        <p className="text-gray-600 text-sm mt-8">
          For sanitizing <strong>logs</strong> or <strong>JSON</strong> before pasting into AI, try{' '}
          <Link href="/log-unpacker" className="text-primary-600 hover:text-primary-700 font-medium">
            Log Unpacker
          </Link>
          {' '}or{' '}
          <Link href="/json-prompt-shield" className="text-primary-600 hover:text-primary-700 font-medium">
            JSON Prompt Shield
          </Link>
          . For masking <strong>code</strong> or <strong>schemas</strong> before sending to AI, see{' '}
          <Link href="/code-prompt-shield" className="text-primary-600 hover:text-primary-700 font-medium">
            Code Prompt Shield
          </Link>
          {' '}and{' '}
          <Link href="/ai-schema-masker" className="text-primary-600 hover:text-primary-700 font-medium">
            AI Schema Masker
          </Link>
          .
        </p>
      </article>
    </>
  );
}
