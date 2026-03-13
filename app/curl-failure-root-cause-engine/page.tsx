import type { Metadata } from 'next';
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

export default function CurlFailureRootCausePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <CurlFailureRootCauseClient />
      </div>
    </>
  );
}
