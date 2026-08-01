import type { Metadata } from 'next';
import CurlPostJsonClient from './client';

export const metadata: Metadata = {
  title: 'cURL POST JSON — Copy-Ready Examples for REST APIs | UnblockDevs',
  description:
    'cURL POST JSON examples with headers, auth tokens, file upload, and error handling. Copy-ready curl commands for REST APIs. Free cURL converter included.',
  keywords: [
    'curl post json example',
    'curl post request json',
    'curl send json body',
    'curl with headers',
    'curl authorization header',
    'curl bearer token',
    'curl content type json',
    'how to send json with curl',
    'curl post data example',
    'curl rest api example',
    'curl api request json',
    'curl -d json',
  ],
  openGraph: {
    title: 'cURL POST JSON — Complete Copy-Ready Examples for REST APIs | UnblockDevs',
    description:
      'Copy-ready cURL POST JSON commands covering headers, auth tokens, Bearer tokens, file upload, PUT, DELETE, and verbose debugging. Free cURL converter tool included.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-post-json-example',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=cURL%20POST%20JSON%20Request%20%E2%80%94%20Complete%20Examples%20Guide&emoji=%7B%7D&desc=cURL%20POST%20JSON%20examples%20with%20headers%2C%20auth%20tokens%2C%20form%20data%2C%20and%20error%20handling', width: 1200, height: 630, alt: 'cURL POST JSON Request — Complete Examples Guide — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL POST JSON — Copy-Ready Examples for REST APIs',
    description: 'Copy-ready cURL POST JSON commands for REST APIs with Bearer auth, headers, file upload, and error handling.',
  },
  alternates: { canonical: 'https://unblockdevs.com/curl-post-json-example' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL POST JSON Examples Guide',
  url: 'https://unblockdevs.com/curl-post-json-example',
  description:
    'Copy-ready cURL POST JSON commands covering headers, auth tokens, form data, file upload, PUT, DELETE, and verbose debugging.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I send JSON data with cURL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use the -d flag with a JSON string and set the Content-Type header: curl -X POST https://api.example.com/data -H 'Content-Type: application/json' -d '{\"key\":\"value\"}'. Always set Content-Type so the server knows to parse the body as JSON.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add an Authorization header in cURL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Add the Authorization header with -H: curl -H 'Authorization: Bearer YOUR_TOKEN' https://api.example.com/protected. For API keys, use -H 'X-API-Key: your-key' or whatever header name the API requires.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between -d and --data-raw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Both send the data as the request body. The difference: -d reads from a file if the value starts with @, and strips newlines from the data. --data-raw sends the value exactly as provided, including @ signs literally without treating them as file paths. For JSON payloads, both work the same unless your JSON contains @ symbols.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I send a file with cURL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use the -F flag for multipart/form-data file uploads: curl -X POST https://api.example.com/upload -F 'file=@/path/to/file.pdf' -F 'name=document'. For sending a file as raw binary body, use --data-binary @/path/to/file with the appropriate Content-Type header.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the free cURL to Python converter at unblockdevs.com/curl-to-python. Paste your cURL command and it generates an equivalent Python requests snippet with all headers, auth, and body preserved.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Make a cURL POST Request with JSON',
  description: 'Step-by-step guide to constructing cURL POST requests with JSON bodies and authentication.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Set the HTTP method',
      text: "Use -X POST to set the HTTP method. GET is the default so you only need -X for POST, PUT, PATCH, and DELETE: curl -X POST https://api.example.com/endpoint",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Content-Type header',
      text: "Add -H 'Content-Type: application/json' so the server parses your body as JSON. Without this header many servers reject the request or fail to parse the body.",
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add the JSON body',
      text: "Use -d '{\"key\":\"value\"}' to add the request body. On Windows use double quotes outside and escaped double quotes inside: -d \"{\\\"key\\\":\\\"value\\\"}\"",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add authentication headers',
      text: "For Bearer token auth add -H 'Authorization: Bearer YOUR_TOKEN'. For API key auth add -H 'X-API-Key: YOUR_KEY'.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Debug with verbose mode',
      text: "Add -v to see the full request and response including all headers. Add -i to include response headers in the output without full verbose mode.",
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'cURL Tools', item: 'https://unblockdevs.com/curl-to-python' },
    { '@type': 'ListItem', position: 3, name: 'cURL POST JSON Examples', item: 'https://unblockdevs.com/curl-post-json-example' },
  ],
};

export default function CurlPostJsonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlPostJsonClient />
    </>
  );
}
