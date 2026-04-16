import type { Metadata } from 'next';
import Http403ErrorFixClient from './client';

export const metadata: Metadata = {
  title: 'HTTP 403 Forbidden Error — Causes & Fix Guide | UnblockDevs',
  description:
    'Getting a 403 Forbidden error from an API? Fix missing auth tokens, incorrect CORS headers, IP blocks, and permission issues. Includes free API testing tools.',
  keywords: [
    'http 403 forbidden error fix',
    '403 forbidden api fix',
    '403 error fetch api',
    '403 status code fix',
    'api returning 403',
    'fix 403 unauthorized api',
    'access denied 403',
    '403 error authorization header',
    '403 error cors',
    '403 error postman',
    '403 error curl',
    '403 error token missing',
    '403 error cloudflare',
    '403 error nginx',
    '403 error aws api gateway',
    'http status code 403',
    '403 forbidden fix javascript',
    '403 forbidden bearer token',
    '403 forbidden x-api-key',
    '403 vs 401 difference',
    '403 ip block fix',
    '403 waf blocked',
  ],
  openGraph: {
    title: 'HTTP 403 Forbidden Error — Causes & Fix Guide | UnblockDevs',
    description:
      'Getting a 403 Forbidden error from an API? Fix missing auth tokens, incorrect CORS headers, IP blocks, and permission issues. Free API testing tools included.',
    type: 'website',
    url: 'https://unblockdevs.com/http-403-error-fix',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix HTTP 403 Errors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP 403 Forbidden Error — Causes & Fix Guide | UnblockDevs',
    description: 'Fix missing auth tokens, IP blocks, CORS, and permission issues causing 403 errors.',
  },
  alternates: { canonical: 'https://unblockdevs.com/http-403-error-fix' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HTTP 403 Error Fix Guide',
  url: 'https://unblockdevs.com/http-403-error-fix',
  description:
    'Complete guide to diagnosing and fixing HTTP 403 Forbidden errors — missing Bearer tokens, Cloudflare WAF blocks, AWS API Gateway policies, Nginx auth, and more.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '870',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between 401 and 403?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '401 Unauthorized means the request lacks valid authentication credentials — the server does not know who you are. 403 Forbidden means the server knows who you are (authenticated) but you do not have permission to access the resource. Fix 401 by providing credentials; fix 403 by checking permissions or role assignments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix 403 in fetch/axios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add the Authorization header to your request: fetch(url, { headers: { "Authorization": "Bearer " + token } }). Also verify the token has not expired and that your account has the required permissions for the endpoint.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does Cloudflare return 403?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cloudflare returns 403 when its Web Application Firewall (WAF) or Bot Management blocks a request. Common triggers: missing User-Agent header, automated request patterns, suspicious IP, or a WAF rule matching your payload. Add a real User-Agent header and check the Cloudflare dashboard for blocked rule IDs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix 403 in AWS API Gateway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AWS API Gateway returns 403 for: (1) missing or invalid API key in the x-api-key header, (2) resource policy blocking your IP or VPC, (3) IAM authorization failure, (4) CORS preflight not configured. Check the API Gateway resource policy and Usage Plan configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can CORS cause a 403 error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Some servers return 403 instead of the usual CORS headers when the preflight OPTIONS request fails authorization checks. If your preflight gets a 403, check that your server allows OPTIONS requests without authentication, and that any WAF or firewall rules don\'t block OPTIONS.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Debug and Fix an HTTP 403 Forbidden Error',
  description: 'Step-by-step approach to diagnosing 403 errors from APIs and web servers.',
  totalTime: 'PT10M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the response body for error details',
      text: 'Open DevTools Network tab, click the failing request, and read the Response body. APIs often return JSON with a code or message field explaining exactly why access was denied.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Verify your authentication token',
      text: 'Check that your Bearer token or API key is present, correctly formatted, and not expired. Decode a JWT at jwt.io to verify the expiry (exp claim).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Test the same request with cURL',
      text: 'Run the request in cURL with the same headers to isolate whether the issue is your code or the server. Use our HAR to cURL converter to generate the exact cURL command from your browser request.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check server-side logs and WAF rules',
      text: 'If you control the server, check access logs for the 403 and look for WAF rule matches. In Cloudflare, check Security > Events. In AWS API Gateway, enable CloudWatch logging.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'HTTP 403 Error Fix', item: 'https://unblockdevs.com/http-403-error-fix' },
  ],
};

export default function Http403ErrorFixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Http403ErrorFixClient />
    </>
  );
}
