import type { Metadata } from 'next';
import CorsErrorFixClient from './client';

export const metadata: Metadata = {
  title: 'Fix "Blocked by CORS Policy" Error — Complete Guide | UnblockDevs',
  description:
    'Getting "blocked by CORS policy" or "No Access-Control-Allow-Origin header"? Fix CORS errors in fetch, axios, React, and Node.js. Free CORS tester tool included.',
  keywords: [
    'blocked by cors policy fix',
    'no access-control-allow-origin fix',
    'cors error fix',
    'cors error fetch',
    'cors error react',
    'cors error axios',
    'cors error nodejs',
    'cors error express',
    'cors localhost fix',
    'preflight request error fix',
    'cors error chrome',
    'how to fix cors',
    'cors error javascript',
    'access-control-allow-origin missing',
    'cors policy error',
    'fix cors without backend access',
    'cors error api',
    'cors headers fix',
    'cors proxy fix',
    'cross origin resource sharing error',
    'cors options request fix',
    'cors credentials error',
  ],
  openGraph: {
    title: 'Fix "Blocked by CORS Policy" Error — Complete Guide | UnblockDevs',
    description:
      'Getting "blocked by CORS policy" or "No Access-Control-Allow-Origin header"? Fix CORS errors in fetch, axios, React, and Node.js. Free CORS tester tool included.',
    type: 'website',
    url: 'https://unblockdevs.com/cors-error-fix',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix CORS Errors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix "Blocked by CORS Policy" Error | UnblockDevs',
    description: 'Fix CORS errors in fetch, axios, React, and Node.js. Free CORS tester tool included.',
  },
  alternates: { canonical: 'https://unblockdevs.com/cors-error-fix' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CORS Error Fix Guide',
  url: 'https://unblockdevs.com/cors-error-fix',
  description:
    'Complete guide to fixing CORS errors — blocked by CORS policy, no Access-Control-Allow-Origin header, and preflight failures. Includes a free CORS tester tool.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1240',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes the blocked by CORS policy error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The "blocked by CORS policy" error occurs when a browser makes a cross-origin HTTP request (to a different domain, port, or protocol) and the server does not include the correct Access-Control-Allow-Origin response header. Browsers enforce this as a security measure called the Same-Origin Policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix CORS in Express/Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install the cors npm package and add app.use(cors()) to your Express app before your routes. For production, specify the allowed origin: app.use(cors({ origin: "https://yourdomain.com" })). This adds the correct Access-Control-Allow-Origin header to all responses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I fix CORS without touching the backend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For development only, you can use a CORS proxy service or configure your dev server to proxy requests (Vite or CRA proxy). For production, CORS must be configured on the server. Browser extensions that disable CORS should never be used in production.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does localhost get CORS errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Localhost gets CORS errors because browsers treat http://localhost:3000 and http://localhost:8000 as different origins. The API server must explicitly allow your localhost origin in its CORS configuration, or you can use a dev proxy to forward requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a preflight request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A preflight request is an HTTP OPTIONS request that browsers automatically send before certain cross-origin requests (e.g., POST with JSON body or requests with custom headers). The server must respond to the OPTIONS request with the correct Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers headers.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix a CORS Error in 5 Minutes',
  description: 'Step-by-step guide to diagnosing and fixing CORS errors in your web application.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the CORS error message',
      text: 'Open your browser DevTools (F12), go to the Console tab, and read the full error. Note which header is missing: Access-Control-Allow-Origin, Access-Control-Allow-Methods, or Access-Control-Allow-Headers.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Check the server response headers',
      text: 'In the Network tab, click the failing request and check the Response Headers. If Access-Control-Allow-Origin is missing, the server is not configured for CORS.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add CORS headers to your server',
      text: 'In Express/Node.js, install the cors package and add app.use(cors({ origin: "https://yourdomain.com" })). In FastAPI, add CORSMiddleware. In Nginx, add add_header directives.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Handle preflight OPTIONS requests',
      text: 'Ensure your server responds to HTTP OPTIONS requests with 200 OK and the correct Access-Control-Allow-Methods and Access-Control-Allow-Headers headers.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Test your CORS fix',
      text: 'Use the UnblockDevs CORS Tester to verify your server is returning the correct headers for your origin. Then retest your frontend request.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Fix CORS Error', item: 'https://unblockdevs.com/cors-error-fix' },
  ],
};

export default function CorsErrorFixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CorsErrorFixClient />
    </>
  );
}
