import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'

export const metadata: Metadata = {
  title: 'JSON Schema Generator, JSON to Excel Converter, Curl to Requests - Free Developer Tools | UnblockDevs.com',
  description: 'Free online JSON schema generator, JSON schema validation, JSON to Excel converter, curl to requests converter, and JSON schema creator. Export JSON to Excel, convert curl to JavaScript, generate JSON schema, validate JSON schema, and create JSON schemas instantly. Professional developer tools at UnblockDevs.com.',
  keywords: [
    // Primary SEO keywords
    'curl to requests',
    'json schema validation',
    'json schema generator',
    'export json to excel',
    'json schema generation',
    'convert curl to http request',
    'json-schema-generator',
    'unblockdevs.com',
    'how to convert json to excel',
    'json schema creation',
    'json validation schema',
    'json schema creator',
    'json schema for json schema',
    'schema validation json',
    'schema generator json',
    'schema generator from json',
    'notebooklm cheat sheet',
    'creating a json schema',
    'json generate schema',
    'defining json schema',
    'convert json to excel table',
    'convert curl to javascript',
    'convert curl',
    'generate json schema',
    'curl to',
    'validation json schema',
    'define json schema',
    'json validator against schema',
    'validate json schema',
    'json to excel integration',
    // Additional related keywords
    'json viewer',
    'json formatter',
    'json parser',
    'json beautifier',
    'json fixer',
    'json to csv',
    'json to table',
    'api comparator',
    'json comparator',
    'curl converter',
    'mock api generator',
    'test data generator',
    'sql formatter',
    'log analyzer',
    'payload analyzer',
    'token comparator',
    'timezone translator',
    'prompt chunker',
    'ai prompt chunker',
    'notebooklm cheat sheet',
    'developer tools',
    'free online tools',
    'web development tools',
    'programming utilities',
    // Primary keywords (from top search results)
    'json viewer',
    'json viewer online',
    'online json viewer',
    'json formatter',
    'json formatter online',
    'online json formatter',
    'json parser',
    'json parser online',
    'online json parser',
    'json beautifier',
    'json beautifier online',
    'online json beautifier',
    'json fixer',
    'json fixer online',
    'online json fixer',
    'json repair tool',
    'fix malformed json',
    'repair json syntax errors',
    'json error fixer',
    'json validator and fixer',
    'json to csv converter',
    'json to csv',
    'convert json to csv',
    'json to excel converter',
    'json to excel',
    'convert json to excel',
    'json to table converter',
    'json to table',
    'convert json to table',
    // Secondary keywords
    'JSON Viewer',
    'JSON Parser',
    'JSON Beautifier',
    'JSON Formatter',
    'JSON to Excel',
    'JSON to CSV',
    'JSON to Table',
    'JSON converter',
    'JSON validator',
    'JSON minifier',
    'JSON prettifier',
    'JSON structure viewer',
    'JSON tree viewer',
    'JSON editor',
    'JSON validator online',
    'JSON formatter online',
    'JSON parser online',
    'JSON beautifier online',
    'free json tools',
    'online json tools',
    'json tools online',
    'json editor online',
    'json viewer and formatter',
    'json formatter and validator',
    'json parser online free',
    'json beautifier tool',
    'json to excel online',
    'json to csv online',
    'json to table online',
    'API comparator',
    'API testing',
    'JSON schema generator',
    'SQL formatter',
    'comma separated id list mysql',
    'mysql in clause formatter',
    'comma separated values mysql',
    'convert ids to comma separated list',
    'mysql where in clause',
    'sql in clause generator',
    'comma separated list for mysql',
    'mysql in query formatter',
    'postgresql comma separated ids',
    'postgresql in clause formatter',
    'oracle comma separated ids',
    'oracle in clause formatter',
    'trino comma separated ids',
    'trino in clause formatter',
    'sql server comma separated ids',
    'sqlite comma separated ids',
    'comma separated id list postgresql',
    'comma separated id list oracle',
    'comma separated id list trino',
    'comma separated id list sql server',
    'postgresql in clause',
    'oracle in clause',
    'trino in clause',
    'sql server in clause',
    'sqlite in clause',
    'log analyzer',
    'payload analyzer',
    'curl converter',
    'mock API generator',
    'test data generator',
    'config comparator',
    'free developer tools',
    'data converter',
    'Excel converter',
    'API testing tools',
    'web development tools',
    'programming utilities',
    'JSON visualization',
    'JSON diff tool',
    'JSON compare',
    'ai prompt chunker',
    'prompt chunker',
    'split ai prompts',
    'chunk ai prompts',
    'prompt splitter',
    'ai prompt tool',
    // MySQL + JSON Keywords
    'mysql json column',
    'mysql json functions',
    'mysql json extract',
    'mysql json query',
    'mysql json validation',
    'mysql json index',
    'mysql json array',
    'mysql json to table',
    'mysql convert json to rows',
    'mysql parse json',
    'mysql json schema validation',
    'mysql json performance issues',
    'mysql json vs normalized tables',
    'mysql json search',
    'mysql json path examples',
    'mysql import json data',
    'mysql export json',
    'mysql json errors',
    'mysql invalid json error',
    'mysql json length',
    'mysql json pretty print',
    // Python + JSON Keywords
    'python json parsing',
    'python json load',
    'python json dump',
    'python json schema validation',
    'python validate json schema',
    'python json to dict',
    'python dict to json',
    'python json file read',
    'python json file write',
    'python json pretty print',
    'python json serialization',
    'python json deserialization',
    'python pandas json analysis',
    'python convert json to excel',
    'python json to csv',
    'python json flatten',
    'python nested json handling',
    'python json normalize',
    'python json schema generator',
    'python json validation error',
    // Java + JSON Keywords
    'java json parsing',
    'java json object',
    'java json array',
    'java json schema validation',
    'java validate json against schema',
    'java jackson json',
    'java gson json',
    'java json to pojo',
    'java pojo to json',
    'java json mapper',
    'java json serialization',
    'java json deserialization',
    'java read json file',
    'java write json file',
    'java json pretty print',
    'java json parsing error',
    'java convert json to map',
    'java json to excel',
    'java json schema generator',
    'java json validation example',
    // JavaScript + JSON Keywords
    'javascript json parse',
    'javascript json stringify',
    'javascript validate json schema',
    'javascript json schema validator',
    'javascript json object',
    'javascript json array',
    'javascript fetch json api',
    'javascript json response handling',
    'javascript json to csv',
    'javascript json to excel',
    'javascript nested json',
    'javascript flatten json',
    'javascript json manipulation',
    'javascript json pretty print',
    'javascript json schema generator',
    'javascript ajv json schema',
    'javascript json data analysis',
    'javascript json transform',
    'javascript convert json',
    'javascript json error handling',
    // R + JSON Keywords
    'r json parsing',
    'r read json',
    'r write json',
    'r jsonlite',
    'r fromjson',
    'r tojson',
    'r json schema validation',
    'r json to dataframe',
    'r dataframe to json',
    'r tidy json',
    'r nested json',
    'r json data analysis',
    'r json flatten',
    'r convert json to csv',
    'r convert json to excel',
    'r json visualization',
    'r json import',
    'r json export',
    'r json api response',
    'r json preprocessing',
    // JSON Data Analysis Keywords
    'json data analysis',
    'json data visualization',
    'json data processing',
    'json analytics',
    'json big data',
    'json data transformation',
    'json data normalization',
    'json data cleaning',
    'json schema for analytics',
    'json exploratory analysis',
    'json dataset analysis',
    'analyze nested json',
    'json metrics extraction',
    'json reporting tools',
    'json to dataframe',
    'json to table conversion',
    'json aggregation',
    'json statistical analysis',
    'json time series data',
    'json data pipeline',
    // Conversion & Developer Utility Keywords
    'json to sql',
    'json to mysql',
    'json to postgresql',
    'json to mongodb',
    'json api tester',
    'json formatter online',
    'json minifier',
    'json diff tool',
    'json compare tool',
    'json editor online',
    'json viewer',
    'json debugging tools',
    'api json validator',
    'rest api json tools',
    'developer json utilities'
  ],
  authors: [{ name: 'UnblockDevs' }],
  creator: 'UnblockDevs',
  publisher: 'UnblockDevs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://unblockdevs.com',
    title: 'JSON Viewer, JSON Formatter, JSON Parser Online - Free Tools | UnblockDevs',
    description: 'Free online JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON Fixer & Repair Tool, JSON to Excel, JSON to CSV, and JSON to Table converter. Edit, view, analyze, format, validate, fix malformed JSON, and convert JSON data instantly. No installation required.',
    siteName: 'UnblockDevs',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'UnblockDevs - Free Developer Tools Suite',
        },
      ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Viewer, JSON Formatter, JSON Parser Online - Free Tools',
    description: 'Free online JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON Fixer & Repair Tool, JSON to Excel, JSON to CSV converter. Edit, view, analyze, format, fix malformed JSON data instantly.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://unblockdevs.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png',
      },
    ],
  },
  category: 'Developer Tools',
  classification: 'Web Application',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
    other: {
      'msvalidate.01': 'your-bing-verification-code', // Replace with actual verification code
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UnblockDevs',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON to Excel converter, JSON to CSV converter, and JSON to Table converter. Edit, view, analyze, format, validate, and convert JSON data instantly. Professional JSON tools for developers.',
    url: 'https://unblockdevs.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2500',
    },
    featureList: [
      'JSON Viewer Online',
      'JSON Formatter Online',
      'JSON Parser Online',
      'JSON Beautifier Online',
      'JSON Fixer & Repair Tool',
      'JSON to Excel Converter',
      'JSON to CSV Converter',
      'JSON to Table Converter',
      'JSON Beautifier & Minifier',
      'API Response Comparator',
      'JSON Schema Generator',
      'Logs Analyzer',
      'Payload Analyzer',
      'Curl to Code Converter',
      'Mock API Generator',
      'Test Data Generator',
      'Config Comparator',
      'SQL Formatter',
    ],
    provider: {
      '@type': 'Organization',
      name: 'UnblockDevs',
      url: 'https://unblockdevs.com',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Critical preconnect hints - Must be first for mobile performance (1,000ms+ savings) */}
        <link rel="preconnect" href="https://g.ezoic.net" />
        <link rel="preconnect" href="https://privacy.gatekeeperconsent.com" />
        <link rel="preconnect" href="https://cdnjs.buymeacoffee.com" />
        <link rel="preconnect" href="https://www.ezojs.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://lb.eu-1-id5-sync.com" />
        <link rel="dns-prefetch" href="https://cdn.id5-sync.com" />
        
        {/* Favicon for Google Search Results - Multiple formats for better compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google Analytics - Load after page load */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N6DF8NPHY8', {
                allow_enhanced_conversions: true
              });
            `,
          }}
        />
        
        {/* Google AdSense - Defer loading */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6349841658473646"
          crossOrigin="anonymous"
        />
        
        {/* Ezoic and Buy Me a Coffee - Load after page is interactive to improve LCP */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Ezoic early but defer loading
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
              
              // Comprehensive error handling for Ezoic (suppress 403 and other errors)
              if (typeof window !== 'undefined') {
                // Suppress console errors from Ezoic
                const originalError = window.console.error;
                window.console.error = function(...args) {
                  const message = args.join(' ');
                  // Suppress Ezoic-related errors
                  if (message.includes('Ezoic') || 
                      message.includes('_ezaq') || 
                      message.includes('Monetization not allowed') ||
                      message.includes('visit_uuid not found') ||
                      message.includes('bad response') ||
                      message.includes('Status; 403') ||
                      message.includes('[EzoicAds JS]')) {
                    console.debug('Ezoic error suppressed:', message);
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                // Suppress network errors from Ezoic
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('Ezoic') || 
                    e.message.includes('_ezaq') ||
                    e.message.includes('g.ezoic.net') ||
                    e.message.includes('ezojs.com') ||
                    e.message.includes('gatekeeperconsent.com')
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.debug('Ezoic error handled:', e.message);
                    return false;
                  }
                }, true);
                
                // Suppress unhandled promise rejections from Ezoic
                window.addEventListener('unhandledrejection', function(e) {
                  const reason = e.reason?.message || e.reason?.toString() || '';
                  if (reason.includes('Ezoic') || 
                      reason.includes('_ezaq') ||
                      reason.includes('g.ezoic.net') ||
                      reason.includes('ezojs.com') ||
                      reason.includes('Monetization not allowed')) {
                    e.preventDefault();
                    console.debug('Ezoic promise rejection handled:', reason);
                  }
                });
              }
              
              // Defer non-critical scripts until after page load and LCP
              function loadDeferredScripts() {
                // Ezoic Privacy Scripts - Load after LCP
                const gatekeeper1 = document.createElement('script');
                gatekeeper1.setAttribute('data-cfasync', 'false');
                gatekeeper1.src = 'https://cmp.gatekeeperconsent.com/min.js';
                gatekeeper1.async = true;
                document.head.appendChild(gatekeeper1);
                
                const gatekeeper2 = document.createElement('script');
                gatekeeper2.setAttribute('data-cfasync', 'false');
                gatekeeper2.src = 'https://the.gatekeeperconsent.com/cmp.min.js';
                gatekeeper2.async = true;
                document.head.appendChild(gatekeeper2);
                
                // Ezoic Header Script - Load after LCP (with error handling)
                const ezoic = document.createElement('script');
                ezoic.async = true;
                ezoic.src = '//www.ezojs.com/ezoic/sa.min.js';
                ezoic.onerror = function() {
                  console.debug('Ezoic script failed to load (site may not be approved yet)');
                };
                ezoic.onload = function() {
                  console.debug('Ezoic script loaded successfully');
                };
                document.head.appendChild(ezoic);
                
                // Buy Me a Coffee Widget is now loaded in BuyMeACoffeeWidget component
                // Removed from here to avoid conflicts
              }
              
              // Wait for LCP before loading deferred scripts
              if ('PerformanceObserver' in window) {
                try {
                  const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry && lastEntry.renderTime) {
                      // LCP has occurred, load deferred scripts
                      loadDeferredScripts();
                      observer.disconnect();
                    }
                  });
                  observer.observe({ type: 'largest-contentful-paint', buffered: true });
                  
                  // Fallback: Load after 2 seconds if LCP doesn't fire
                  setTimeout(() => {
                    observer.disconnect();
                    loadDeferredScripts();
                  }, 2000);
                } catch (e) {
                  // Fallback if PerformanceObserver fails
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', loadDeferredScripts);
                  } else {
                    setTimeout(loadDeferredScripts, 1000);
                  }
                }
              } else {
                // Fallback for browsers without PerformanceObserver
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(loadDeferredScripts, 1000);
                  });
                } else {
                  setTimeout(loadDeferredScripts, 1000);
                }
              }
            `,
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
        </div>
        <BuyMeACoffeeWidget />
        
        {/* Buy Me a Coffee Widget Script - Load synchronously to catch DOMContentLoaded */}
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="WKbStURip"
          data-description="Support me on Buy me a coffee!"
          data-message="You have a Wonderful Day!!!"
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              marginBottom: '80px', // Space above Buy Me a Coffee widget
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

