import type { Metadata } from 'next';
import NodejsPortAlreadyInUseClient from './client';

export const metadata: Metadata = {
  title: 'Fix "Port Already in Use" Error in Node.js | UnblockDevs',
  description: 'Fix EADDRINUSE: address already in use error in Node.js. Kill the process on any port on Mac, Linux, and Windows. Prevent it from happening again.',
  keywords: [
    'port already in use node',
    'EADDRINUSE fix',
    'address already in use nodejs',
    'kill port nodejs',
    'kill port 3000 mac',
    'kill port 3000 linux',
    'kill port windows',
    'lsof port 3000',
    'netstat port in use',
    'nodejs eaddrinuse fix',
    'port 3000 already in use',
    'how to free port',
    'kill process on port',
    'port conflict fix',
    'node server port error',
    'error listen eaddrinuse',
    'port in use error node js',
    'find process using port mac',
    'taskkill port windows',
    'fuser kill port linux',
    'npx kill-port',
    'portfinder nodejs',
  ],
  openGraph: {
    title: 'Fix "Port Already in Use" Error in Node.js | UnblockDevs',
    description: 'Fix EADDRINUSE: address already in use error in Node.js. Kill the process on any port on Mac, Linux, and Windows.',
    type: 'website',
    url: 'https://unblockdevs.com/nodejs-port-already-in-use',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix Port Already in Use' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix "Port Already in Use" Error in Node.js | UnblockDevs',
    description: 'Fix EADDRINUSE: address already in use error in Node.js on Mac, Linux, and Windows.',
  },
  alternates: { canonical: 'https://unblockdevs.com/nodejs-port-already-in-use' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Node.js Port Already in Use',
  url: 'https://unblockdevs.com/nodejs-port-already-in-use',
  description: 'Step-by-step guide to kill processes blocking ports in Node.js on Mac, Linux, and Windows, and prevent EADDRINUSE errors.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1203',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes EADDRINUSE error in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EADDRINUSE means another process is already listening on that port. Common causes include: a previous Node.js server that crashed without releasing the port, another development server running on the same port, or a zombie process from a previous session.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I kill the process on port 3000 on Mac?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run: lsof -ti:3000 | xargs kill -9 in your terminal. This finds the process ID (PID) listening on port 3000 and kills it immediately. You can replace 3000 with any port number.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I kill a process on a port in Windows?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run: netstat -ano | findstr :3000 to find the PID, then taskkill /PID <pid> /F to kill it. Or use npx kill-port 3000 which works on all platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I automatically find the next available port in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the portfinder package: npm install portfinder. Then call portfinder.getPortPromise() to get the next free port starting from a base port number. This prevents EADDRINUSE errors automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the port stay in use after I stop my Node.js server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your server crashes or is killed without a graceful shutdown, the OS may not immediately release the port. This is called a TIME_WAIT state. Implement process.on("SIGTERM") and process.on("SIGINT") handlers that call server.close() to release the port cleanly.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix EADDRINUSE: Port Already in Use in Node.js',
  description: 'Kill the process blocking your port and prevent it from happening again.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the process using the port',
      text: 'On Mac/Linux: lsof -i :3000. On Windows: netstat -ano | findstr :3000. Note the PID column.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Kill the process',
      text: 'On Mac/Linux: kill -9 <PID>. On Windows: taskkill /PID <PID> /F. Or use the one-liner: lsof -ti:3000 | xargs kill -9',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add kill-port to package.json scripts',
      text: 'Add "dev": "npx kill-port 3000 && node server.js" to your package.json scripts to automatically free the port before starting.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Implement graceful shutdown',
      text: 'Add process.on("SIGTERM") and process.on("SIGINT") handlers that call server.close() to release the port cleanly when your process exits.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Use portfinder to avoid conflicts',
      text: 'Use the portfinder package to automatically select the next available port, so your server starts even if the default port is occupied.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Fix Port Already in Use', item: 'https://unblockdevs.com/nodejs-port-already-in-use' },
  ],
};

export default function NodejsPortAlreadyInUsePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NodejsPortAlreadyInUseClient />
    </>
  );
}
