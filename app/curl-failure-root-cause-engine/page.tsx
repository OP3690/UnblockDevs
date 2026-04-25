import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import CurlFailureRootCauseClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-failure-root-cause-engine';

export const metadata: Metadata = {
  title:
    'cURL Failure Root-Cause Engine — Debug API Errors, Fix 401 403 400 404 & Diagnose Why Your cURL Request Is Failing | UnblockDevs',
  description:
    'Paste your failed cURL command and HTTP status code. Get ranked root causes with confidence scores, fix suggestions, and corrected cURL commands instantly. Free, 100% browser-based, nothing sent to servers.',
  keywords: [
    'curl error debugger',
    'debug curl request online',
    'curl failure analyzer',
    'api call failing debugger',
    'curl error root cause',
    'diagnose curl error',
    'api failure debugger tool',
    'works in postman but not curl',
    'api works in postman not in code',
    'postman works curl fails',
    'curl not working but postman works',
    'why does my curl fail when postman works',
    'curl 401 unauthorized fix',
    '401 unauthorized curl request',
    'curl authorization header fix',
    'fix 401 error curl api',
    'curl 400 bad request fix',
    '400 bad request curl json',
    'fix 400 error curl api',
    'curl 403 forbidden fix',
    'curl 404 not found api',
    'curl 429 rate limit fix',
    'curl 500 internal server error',
    'api debugging tool online',
    'debug api calls browser',
    'rest api debugger online',
    'curl error ranked causes',
    'api failure confidence score',
    'why is my curl request failing',
    'how to debug a curl 401 error',
    'how to fix curl 400 bad request',
    'how to fix missing authorization header in curl',
    'cURL Failure Root-Cause Engine',
    // Extended keyword cluster
    'curl error fix',
    'curl command not working',
    'curl connection refused',
    'curl ssl error',
    'curl timeout error',
    'curl 403 error',
    'curl 401 error',
    'curl 404 error',
    'curl 500 error',
    'curl empty response',
    'curl no response',
    'curl certificate error',
    'curl ssl verify peer',
    'curl handshake failed',
    'curl could not resolve host',
    'curl operation timed out',
    'curl max time exceeded',
    'curl send failure',
    'curl upload error',
    'curl download error',
    'curl proxy error',
    'curl authentication failed',
    'curl basic auth error',
    'curl content type error',
    'curl json error',
    'curl malformed url',
    'curl port error',
    'curl connection reset',
    'curl network unreachable',
    'curl debug with -v',
    'curl verbose output',
    'curl error codes explained',
    'curl exit code 6',
    'curl exit code 7',
    'curl exit code 28',
    'curl exit code 35',
    'curl exit code 52',
    'curl exit code 56',
    'curl error 60',
    'troubleshoot curl',
    'curl command help',
    'curl diagnostic tool',
    'curl request debugger',
    'curl failure analysis',
    'curl root cause',
    'diagnose curl error',
    'curl not working fix',
    'curl ssl certificate error fix',
  ],
  openGraph: {
    title: 'cURL Failure Root-Cause Engine — Debug API Errors, Fix 401 400 404 | UnblockDevs',
    description:
      'Paste your failed cURL and status code. Get ranked root causes, confidence scores, fix suggestions, and corrected cURL commands. Free, 100% in your browser.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Failure Root-Cause Engine — Debug API Errors & Fix 401 400 404 | UnblockDevs',
    description: 'Ranked root causes, confidence scores, corrected cURL commands. Free, 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL Failure Root-Cause Engine — Debug API Errors, Fix 401 403 400 404',
  description:
    'Analyze failed cURL API calls. Paste your cURL command and HTTP status code — get ranked root causes with confidence scores, fix suggestions, and corrected cURL commands. Free, 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Parse cURL command (method, headers, body, URL)',
    'Rank root causes by confidence score (60–95%)',
    'Fix suggestions and corrected cURL commands',
    'Diagnose 401, 400, 403, 404, 429, 500 and more',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '730',
    bestRating: '5',
  },
};


const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Diagnose a Failing cURL Command',
  description: 'Use the cURL Failure Analyzer to identify the root cause of a failed cURL request and get a corrected command.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your failing cURL command', text: 'Copy your cURL command and paste it into the input. Include the full command with all flags.' },
    { '@type': 'HowToStep', position: 2, name: 'Add the error output', text: 'Paste the error message or HTTP response code you received when the cURL command failed.' },
    { '@type': 'HowToStep', position: 3, name: 'Run the analysis', text: 'Click Analyze. The tool diagnoses common causes: SSL errors, auth failures, CORS, DNS issues, timeouts.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply the fix', text: 'The tool provides specific fixes and the corrected cURL command to retry.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL Failure Root-Cause Engine', item: canonicalUrl },
  ],
};

export default function CurlFailureRootCausePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlFailureRootCauseClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Debug cURL Failures — Ranked Root Causes with Confidence Scores">
          <SEOProse>
            When a cURL command fails, the error message is often vague: a 401 could mean wrong API key, expired token, missing Authorization header, or incorrect auth scheme. This <strong>cURL Failure Root-Cause Engine</strong> analyzes your failed command and HTTP status code to produce a ranked list of probable root causes — each with a confidence score, explanation, and a corrected cURL command to try next.
          </SEOProse>
          <SEOProse>
            It also detects the classic &quot;works in Postman but not in cURL&quot; pattern — usually caused by missing headers, URL encoding differences, or Bearer vs Basic auth scheme mismatches.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Diagnose cURL Failures in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your cURL command', desc: 'Paste the full cURL command that is failing — including headers, data, and auth flags.' },
            { n: '02', title: 'Enter the HTTP status code', desc: 'Add the status code you received (401, 403, 400, 404, 429, 500, etc.) to narrow down the root cause.' },
            { n: '03', title: 'Get ranked root causes', desc: 'The engine produces a ranked list of probable causes with confidence scores — from highest to lowest likelihood.' },
            { n: '04', title: 'Apply the fix', desc: 'Each root cause includes a suggested fix and a corrected cURL command you can copy and run immediately.' },
          ]} />
        </SEOSection>

        <SEOSection id="errors" heading="Common cURL Error Status Codes">
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Meaning</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Common causes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {[
                  ['401', 'Unauthorized', 'Missing, expired, or malformed Authorization header; wrong auth scheme (Bearer vs Basic)'],
                  ['403', 'Forbidden', 'Valid auth but insufficient permissions; IP allowlist; wrong API scope'],
                  ['400', 'Bad Request', 'Wrong Content-Type header; malformed JSON body; missing required field'],
                  ['404', 'Not Found', 'Wrong URL path; endpoint removed or versioned; wrong API base URL'],
                  ['429', 'Rate Limited', 'Too many requests; missing Retry-After handling; exceeded plan quota'],
                  ['500', 'Server Error', 'Internal API bug; malformed request body triggering server-side crash'],
                  ['000', 'No Response', 'DNS failure; firewall/proxy blocking; SSL certificate error; wrong port'],
                ].map(([status, meaning, causes]) => (
                  <tr key={String(status)}>
                    <td className="px-4 py-3 font-mono font-semibold text-zinc-900">{status}</td>
                    <td className="px-4 py-3 font-semibold text-zinc-700">{meaning}</td>
                    <td className="px-4 py-3 text-zinc-500">{causes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Why does my API work in Postman but not in cURL?',
              a: 'Usually because Postman adds headers automatically — like Content-Type: application/json or Authorization — that you forgot to add in cURL. Paste your cURL command into this engine and it will detect missing headers.',
            },
            {
              q: 'How do I fix a 401 Unauthorized cURL error?',
              a: <>Common causes: missing <C>-H &quot;Authorization: Bearer YOUR_TOKEN&quot;</C>, expired token, wrong scheme (Basic vs Bearer), or extra spaces in the token string. Paste your command and the engine will rank the most likely cause with a corrected command.</>,
            },
            {
              q: 'How do I fix a 400 Bad Request cURL error?',
              a: <>Usually a missing <C>-H &quot;Content-Type: application/json&quot;</C> header, malformed JSON in the <C>-d</C> body, or a missing required field. The engine analyzes your command for these patterns and shows the most likely fix.</>,
            },
            {
              q: 'Is my cURL command sent to any server?',
              a: 'No. All analysis runs in your browser. Your cURL commands, URLs, and headers never leave your device.',
            },
            {
              q: 'What does curl error 6 (Could not resolve host) mean?',
              a: <>Curl error 6 means DNS resolution failed — the hostname could not be resolved to an IP address. Check for a typo in the URL, verify your DNS server is reachable, and confirm the hostname exists. Try <C>ping yourhostname.com</C> to test DNS outside of curl.</>,
            },
            {
              q: 'How do I fix a curl SSL certificate error?',
              a: <>SSL certificate errors (curl error 60) mean the server certificate cannot be verified. For local testing add <C>-k</C> to skip verification. For production, update your CA bundle with the correct certificate chain using <C>--cacert /path/to/ca.pem</C>.</>,
            },
            {
              q: 'What does curl exit code 28 mean?',
              a: <>Curl exit code 28 is an operation timeout. Add <C>--max-time 30</C> to set a 30-second global timeout or <C>--connect-timeout 10</C> to limit just the connection phase. Check whether a firewall is silently dropping packets if timeouts persist.</>,
            },
            {
              q: 'How do I debug a curl request with -v?',
              a: <>Add <C>-v</C> to see the full TLS handshake, request headers (prefixed with <C>&gt;</C>), and response headers (prefixed with <C>&lt;</C>). For a complete hex dump of every byte, use <C>--trace -</C>. The verbose output usually makes the root cause immediately obvious.</>,
            },
            {
              q: "How do I fix 'curl: (7) Failed to connect'?",
              a: <>Curl error 7 means the connection was refused or the host was unreachable. Verify the server is running on the correct port, the URL scheme is correct (http vs https), and no firewall is blocking the connection. Run <C>curl -v</C> to see the exact connection attempt details.</>,
            },
            {
              q: 'How do I fix a 403 error in curl?',
              a: <>A 403 Forbidden means authentication passed but the request lacks the required permissions. Check that your API key has the needed scopes, your IP is not on a block list, and you are not hitting a rate-limited or subscription-gated endpoint.</>,
            },
            {
              q: 'How do I send a POST request with curl?',
              a: <>Use <C>-X POST</C> with <C>-d</C> for the body: <C>{`curl -X POST https://api.example.com -H 'Content-Type: application/json' -d '{"key":"value"}'`}</C>. Omitting the Content-Type header is the most common cause of 400 errors with JSON APIs.</>,
            },
            {
              q: 'How do I add custom headers to a curl request?',
              a: <>Use the <C>-H</C> flag for each header: <C>{`curl -H 'Authorization: Bearer TOKEN' -H 'X-Custom-Header: value' https://api.example.com`}</C>. Multiple <C>-H</C> flags can be chained. Each flag adds exactly one header.</>,
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/curl-converter', label: 'cURL Converter', desc: 'Convert cURL to JavaScript fetch, Python, Go, and more', icon: '🔄' },
            { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser network requests to cURL commands', icon: '📤' },
            { href: '/cors-tester', label: 'CORS Tester', desc: 'Test CORS headers and diagnose cross-origin errors', icon: '🌐' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode and verify the JWT token used in your Authorization header', icon: '🪙' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'cURL Error Reference' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Debugging cURL Failures' },
            { href: '/blog/json-best-practices-production-guide', label: 'REST API Debugging Guide' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'HTTP Status Codes Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="curl_failure_root_cause_engine" />
    </>
  );
}
