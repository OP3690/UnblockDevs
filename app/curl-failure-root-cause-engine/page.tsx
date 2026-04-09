import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools,
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

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Why does my API work in Postman but not in cURL?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Postman automatically adds headers like Content-Type, Authorization, and Accept that cURL omits by default. Paste your cURL command into the Root-Cause Engine at unblockdevs.com/curl-failure-root-cause-engine — it identifies missing headers and generates a corrected command.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I fix a 401 Unauthorized cURL error?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A 401 error means your request is missing or has an invalid Authorization header. The Root-Cause Engine analyzes your cURL command, detects missing auth headers, and provides a corrected cURL with the proper Authorization: Bearer TOKEN format.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I fix curl 400 Bad Request?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '400 errors are usually caused by missing Content-Type headers, invalid JSON syntax in the body, or method/body mismatches. Paste your cURL command and 400 status code into the Root-Cause Engine for an instant ranked diagnosis with fix suggestions.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the cURL Failure Root-Cause Engine?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "It's a free browser-based tool that analyzes failed cURL API calls. Paste your cURL command and HTTP status code — it returns ranked root causes with confidence scores, specific fix instructions, and corrected cURL commands. Nothing is sent to any server.",
      },
    },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              a: <>Common causes: missing <C>-H &quot;Authorization: Bearer YOUR_TOKEN&quot;</C>, expired token, wrong scheme (Basic vs Bearer), or the token string having extra spaces. Paste your command and the engine will rank the most likely cause with a fix.</>,
            },
            {
              q: 'How do I fix a 400 Bad Request cURL error?',
              a: <>Usually a missing <C>-H &quot;Content-Type: application/json&quot;</C> header, malformed JSON in the <C>-d</C> body, or a missing required field. The engine analyzes your command for these patterns.</>,
            },
            {
              q: 'Is my cURL command sent to any server?',
              a: 'No. All analysis runs in your browser. Your cURL commands, URLs, and headers never leave your device.',
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
      </ToolSEOContent>

      <ToolPageFooterBand toolName="curl_failure_root_cause_engine" />
    </>
  );
}
