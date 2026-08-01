import type { Metadata } from 'next';
import ExpressRequestBodyUndefinedClient from './client';

export const metadata: Metadata = {
  title: 'Express req.body Undefined? Here\'s the Fix | UnblockDevs',
  description: 'Fix req.body returning undefined in Express.js. Covers body-parser middleware setup, wrong Content-Type header, JSON vs form data, and middleware order issues.',
  keywords: [
    'express req body undefined',
    'express request body undefined',
    'body parser not working express',
    'req body is undefined express',
    'express json middleware',
    'express body parser',
    'express post body undefined',
    'express middleware not working',
    'content-type json express',
    'express urlencoded middleware',
    'how to get request body express',
    'req body undefined fix',
  ],
  openGraph: {
    title: 'Express req.body Undefined? Here\'s the Fix | UnblockDevs',
    description: 'Fix req.body returning undefined in Express.js. Add body-parser middleware, set the correct Content-Type header, and handle JSON vs form-encoded data. Free guide with code examples.',
    type: 'website',
    url: 'https://unblockdevs.com/express-request-body-undefined',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Express%20req.body%20Undefined%3F%20Here%5C&emoji=%F0%9F%90%9B&desc=Free%20browser-based%20developer%20tool%20%E2%80%94%20no%20signup%20required', width: 1200, height: 630, alt: 'Express req.body Undefined? Here\ — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express req.body Undefined? Here\'s the Fix | UnblockDevs',
    description: 'Fix req.body returning undefined in Express.js. Add body-parser middleware, set Content-Type to application/json, and fix middleware order issues.',
  },
  alternates: { canonical: 'https://unblockdevs.com/express-request-body-undefined' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Express req.body Undefined',
  url: 'https://unblockdevs.com/express-request-body-undefined',
  description: 'Complete guide to fixing req.body returning undefined in Express.js, covering middleware setup, Content-Type headers, and multipart form data.',
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
      name: 'Why is req.body undefined in Express?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Express does not parse request bodies by default. You must add the express.json() middleware using app.use(express.json()) before your routes. Without this, req.body will always be undefined for JSON requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Express 4 still need the body-parser package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Since Express 4.16.0, body-parser is built in. Use app.use(express.json()) for JSON bodies and app.use(express.urlencoded({ extended: true })) for form data. The separate body-parser package is no longer required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does middleware order matter in Express?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Express processes middleware in the order it is registered. If you define a route before registering express.json(), that route will not have the body parsing middleware applied. Always register global middleware before your route definitions.',
      },
    },
    {
      '@type': 'Question',
      name: 'My req.body is still undefined even with express.json() — why?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most likely cause is the client sending the wrong Content-Type header. Your HTTP client must set Content-Type: application/json. Without this header, Express will not attempt to parse the body as JSON and req.body will remain undefined.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle file uploads in Express?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'File uploads use multipart/form-data, which express.json() and express.urlencoded() cannot parse. Use the multer package: const upload = multer({ dest: "uploads/" }), then apply it as route middleware: router.post("/upload", upload.single("file"), handler).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix Express req.body Undefined',
  description: 'Step-by-step guide to fix req.body returning undefined in Express.js.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Add express.json() middleware',
      text: 'Add app.use(express.json()) before your route definitions. This enables Express to parse JSON request bodies.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Ensure middleware comes before routes',
      text: 'Middleware must be registered before routes in Express. Move all app.use() middleware calls to the top of your file, above any app.get() or app.post() definitions.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set Content-Type header on the client',
      text: 'The HTTP client must send the Content-Type: application/json header with each request. Without this, Express will not parse the body.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Use the correct middleware for each data type',
      text: 'Use express.json() for JSON APIs, express.urlencoded() for HTML form submissions, and multer for file uploads.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Fix Express req.body Undefined', item: 'https://unblockdevs.com/express-request-body-undefined' },
  ],
};

export default function ExpressRequestBodyUndefinedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ExpressRequestBodyUndefinedClient />
    </>
  );
}
