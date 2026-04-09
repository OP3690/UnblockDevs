import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  C,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
} from '@/components/tools/ToolSEOContent';
import CorsTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/cors-tester';

export const metadata: Metadata = {
  title:
    'CORS Tester — Test CORS Headers, Debug Cross-Origin Errors & Preflight Requests Online Free | UnblockDevs',
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
    'cors error react create react app',
    'cors aws api gateway',
    'cors cloudflare worker',
    'cors netlify fix',
    'cors vercel deployment',
    'cors nextjs',
    'cors vercel',
    'cors vs csrf',
    'what is same origin policy',
    'access-control-allow-credentials cors',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1180',
    bestRating: '5',
  },
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
      name: 'How do I fix a CORS error?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "To fix a CORS error, add the correct Access-Control-Allow-Origin header to your server response. If you're using custom headers or non-simple methods like PUT or DELETE, also add Access-Control-Allow-Methods and Access-Control-Allow-Headers. Use CORS Tester to see exactly which headers are missing.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a CORS preflight request?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A preflight request is an automatic OPTIONS request sent by the browser before certain cross-origin requests to verify the server permits them. It occurs when the request uses non-simple methods (PUT, DELETE, PATCH) or includes custom headers. CORS Tester simulates this preflight and shows the result.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between CORS and CSRF?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts which origins can read responses from cross-origin requests. CSRF (Cross-Site Request Forgery) is an attack where a malicious site tricks a user's browser into making requests to another site where the user is authenticated. CORS headers can limit who reads responses; CSRF tokens prevent unauthorized state-changing requests.",
      },
    },
  ],
};

export default function CorsTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CorsTesterClient />
      <ToolSEOContent>
        <SEOSection id="what" heading="What Is CORS and Why Does It Matter?">
          <SEOProse>
            The <strong>Same Origin Policy</strong> is a fundamental browser security rule: a web page at{' '}
            <C>https://myapp.com</C> cannot read responses from a different origin like{' '}
            <C>https://api.example.com</C> unless that server explicitly allows it.{' '}
            <strong>Cross-Origin Resource Sharing (CORS)</strong> is the mechanism that lets servers grant
            those permissions via HTTP response headers. When the browser detects a cross-origin request, it
            checks for headers like <C>Access-Control-Allow-Origin</C> — if they are missing or incorrect,
            the browser blocks the response and you see a CORS error in the console. CORS misconfigurations
            are among the most common issues developers hit when building frontend applications that talk to
            external APIs.
          </SEOProse>
          <SEOProse>
            <strong>Preflight requests</strong> add another layer: for non-simple requests (those using
            custom headers, or methods like PUT, DELETE, or PATCH), the browser first sends an{' '}
            <C>OPTIONS</C> request to ask the server what it allows. The server must respond with the
            correct <C>Access-Control-Allow-Methods</C> and <C>Access-Control-Allow-Headers</C> before the
            browser will send the real request. CORS Tester simulates both the preflight and the actual
            request so you can debug the full flow without leaving your browser.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Test CORS in 3 Steps">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Enter a URL',
                desc: 'Paste your API endpoint into the Target URL field. Set a custom origin if you want to simulate requests from a specific domain.',
              },
              {
                n: '02',
                title: 'Choose method & headers',
                desc: 'Select GET, POST, PUT, DELETE, or OPTIONS. Add custom request headers and toggle credentials to test the exact scenario that is failing.',
              },
              {
                n: '03',
                title: 'Run the test',
                desc: 'Click Run test. The tool sends the request from your browser, showing all CORS response headers, a security analysis score, and generated cURL commands for both preflight and actual requests.',
              },
              {
                n: '04',
                title: 'Review & fix',
                desc: 'Inspect which headers are present or missing, check the security score for misconfigurations, and copy the cURL to reproduce the issue in your terminal or share with backend devs.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Test CORS">
          <UseCases
            cases={[
              {
                icon: '🚫',
                title: 'Debug browser CORS errors',
                desc: 'Reproduce the exact cross-origin request that is failing and see which CORS headers are missing or misconfigured.',
              },
              {
                icon: '✈️',
                title: 'Verify preflight handling',
                desc: 'Check that your server responds correctly to OPTIONS requests with the right Allow-Methods and Allow-Headers before the real request is sent.',
              },
              {
                icon: '🌐',
                title: 'Test CDN and cache headers',
                desc: 'Confirm that a CDN or reverse proxy is not stripping CORS headers and that Access-Control-Max-Age is set to reduce preflight traffic.',
              },
              {
                icon: '🔧',
                title: 'Validate API gateway config',
                desc: 'Verify that AWS API Gateway, Cloudflare Workers, or Nginx is returning CORS headers correctly for each environment (staging, production).',
              },
              {
                icon: '🔑',
                title: 'OAuth redirect debugging',
                desc: 'Test CORS behavior for OAuth token endpoints and callback URLs where credentials and specific origins must be explicitly allowed.',
              },
              {
                icon: '🔗',
                title: 'Third-party API integration',
                desc: 'Before building a frontend integration, confirm that the third-party API allows requests from your domain and returns the correct headers.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="headers" heading="CORS Headers Reference">
          <SEOProse>
            These are the standard response headers a server sends to control cross-origin access. All are
            checked by CORS Tester automatically.
          </SEOProse>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Header</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Purpose</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Example value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Allow-Origin</td>
                  <td className="px-4 py-3 text-zinc-600">Specifies which origins may read the response</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">https://myapp.com</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Allow-Methods</td>
                  <td className="px-4 py-3 text-zinc-600">Lists the HTTP methods permitted for cross-origin requests</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">GET, POST, PUT, DELETE</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Allow-Headers</td>
                  <td className="px-4 py-3 text-zinc-600">Lists the request headers the server will accept</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">Content-Type, Authorization</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Allow-Credentials</td>
                  <td className="px-4 py-3 text-zinc-600">Allows cookies and Authorization headers to be sent cross-origin</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">true</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Max-Age</td>
                  <td className="px-4 py-3 text-zinc-600">How long (in seconds) the browser may cache the preflight response</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">86400</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">Access-Control-Expose-Headers</td>
                  <td className="px-4 py-3 text-zinc-600">Headers the browser is allowed to expose to client-side JavaScript</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">X-Request-Id, X-Rate-Limit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'What is a CORS error and why does it happen?',
                a: (
                  <>
                    A CORS error occurs when your browser blocks a cross-origin request because the
                    server&apos;s response headers do not allow it. The most common cause is a missing or
                    incorrect <C>Access-Control-Allow-Origin</C> header. The browser enforces this — the
                    server still receives and processes the request, but the response is hidden from your
                    JavaScript.
                  </>
                ),
              },
              {
                q: 'How do I fix the "No Access-Control-Allow-Origin" error?',
                a: (
                  <>
                    Add <C>Access-Control-Allow-Origin: https://yourdomain.com</C> (or <C>*</C> for public
                    APIs) to your server&apos;s response headers. If you also send custom headers or use
                    non-simple methods, add <C>Access-Control-Allow-Methods</C> and{' '}
                    <C>Access-Control-Allow-Headers</C>. Use CORS Tester to confirm exactly which headers
                    are missing before making changes.
                  </>
                ),
              },
              {
                q: 'What is a CORS preflight request and when does it happen?',
                a: (
                  <>
                    A preflight is an automatic <C>OPTIONS</C> request the browser sends before any
                    non-simple cross-origin request. It is triggered when you use methods like PUT, DELETE,
                    or PATCH, or when you include custom headers like <C>Authorization</C> or{' '}
                    <C>Content-Type: application/json</C>. The server must respond with the correct{' '}
                    <C>Access-Control-Allow-*</C> headers or the actual request will not be sent.
                  </>
                ),
              },
              {
                q: 'Can I use credentials (cookies or Authorization) with CORS?',
                a: (
                  <>
                    Yes, but you must set <C>Access-Control-Allow-Credentials: true</C> on the server{' '}
                    <em>and</em> specify an explicit origin in <C>Access-Control-Allow-Origin</C> — you
                    cannot use <C>*</C> when credentials are involved. On the client side, set{' '}
                    <C>credentials: &apos;include&apos;</C> in your fetch call. CORS Tester lets you
                    toggle credentials on and flags the wildcard+credentials misconfiguration automatically.
                  </>
                ),
              },
              {
                q: 'What is the difference between CORS and using a proxy?',
                a: (
                  <>
                    CORS is enforced by the browser: the request still reaches the server, but the browser
                    hides the response if headers are missing. A proxy (e.g. your own backend or a CORS
                    proxy service) forwards the request server-side, bypassing browser enforcement entirely.
                    Proxies are a common workaround during development, but the correct production fix is
                    adding proper CORS headers on the target server.
                  </>
                ),
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools
            tools={[
              {
                href: '/jwt-decoder',
                label: 'JWT Decoder',
                desc: 'Decode and inspect JSON Web Tokens sent in Authorization headers.',
                icon: '🔍',
              },
              {
                href: '/token-comparator',
                label: 'Token Comparator',
                desc: 'Compare two tokens or headers side-by-side to spot differences.',
                icon: '🔀',
              },
              {
                href: '/hash-generator',
                label: 'Hash Generator',
                desc: 'Generate MD5, SHA-256, HMAC and other hashes for API request signing.',
                icon: '#️⃣',
              },
              {
                href: '/url-encoder',
                label: 'URL Encoder',
                desc: 'Percent-encode URLs and query parameters before sending in API requests.',
                icon: '🔗',
              },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="cors_tester" />
    </>
  );
}
