import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'JSON Viewer Tools – Free Online Formatter, Parser & Viewer | UnblockDevs',
  description: 'JSON Viewer Tools: view, format, validate, and convert JSON in your browser. Free JSON formatter, parser, and validator—no signup. Clear overview of services.',
  keywords: [
    // JSON Viewer Tools
    'json viewer',
    'json viewer online',
    'json tree view',
    'json structure viewer',
    'json tree viewer',
    'online json viewer',
    // JSON Formatter & Parser Online
    'json formatter',
    'json formatter online',
    'json parser',
    'json parser online',
    'json beautifier',
    'json beautifier online',
    'json validator',
    'json validator online',
    'json fixer',
    'fix malformed json',
    'format json online',
    'parse json online',
    // JSON to CSV / Excel / Table
    'json to csv',
    'json to csv converter',
    'convert json to csv',
    'json to excel',
    'json to excel converter',
    'convert json to excel',
    'json to table',
    'json to table converter',
    'convert json to table',
    // JSON Schema generation & validation
    'json schema generator',
    'json schema validator',
    'json schema validation',
    'generate json schema',
    'validate json schema',
    // Brand & high-intent
    'unblockdevs',
    'unblock devs json',
    'free json tools online',
    'json tools no login',
    'json editor online',
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
    title: 'Free JSON Tools | Viewer, Formatter, Parser | UnblockDevs',
    description: 'JSON Viewer Tools: view, format, validate, and convert JSON in your browser. Free formatter, parser, validator—no signup. Clear overview of services.',
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
    title: 'Free JSON Tools | Viewer, Formatter, Parser | UnblockDevs',
    description: 'JSON Viewer Tools: view, format, validate, and convert JSON in your browser. Free formatter, parser, validator—no signup. Clear overview of services.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://unblockdevs.com'),
  alternates: {
    canonical: 'https://unblockdevs.com/',
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
    description: 'JSON Viewer Tools: view, format, validate, and convert JSON in your browser. Free formatter, parser, validator—no signup. Clear overview of services.',
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
    <html lang="en" className={inter.variable}>
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
        
        {/* Canonical: strip query params (?tab= etc); homepage -> https://unblockdevs.com/ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname || '';
                var isRoot = path === '/' || path === '';
                var hasQuery = (window.location.search || '').length > 0;
                var canonicalHref = (isRoot || hasQuery)
                  ? 'https://unblockdevs.com/'
                  : 'https://unblockdevs.com' + path.replace(/\\/$/, '') || '/';
                var existing = document.querySelectorAll('link[rel="canonical"]');
                for (var i = 0; i < existing.length; i++) existing[i].remove();
                var link = document.createElement('link');
                link.rel = 'canonical';
                link.href = canonicalHref;
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        
        {/* Third-party (gtag, AdSense, Ezoic) load after LCP + idle to reduce unused JS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Ezoic early but defer loading
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
              
              // Comprehensive error handling for Ezoic and Google AdSense (suppress 403 and deprecation warnings)
              if (typeof window !== 'undefined') {
                // Suppress console errors from Ezoic and Google AdSense
                const originalError = window.console.error;
                const originalWarn = window.console.warn;
                
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
                
                // Suppress deprecation warnings from Google AdSense
                window.console.warn = function(...args) {
                  const message = args.join(' ');
                  // Suppress Google AdSense unload event listener deprecation warnings
                  if (message.includes('Unload event listeners are deprecated') ||
                      message.includes('pagead2.googlesyndication.com') ||
                      message.includes('lidar.js') ||
                      message.includes('unload') && message.includes('deprecated')) {
                    console.debug('AdSense deprecation warning suppressed:', message);
                    return;
                  }
                  originalWarn.apply(console, args);
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
              
              var deferredLoaded = false;
              function loadDeferredScripts() {
                if (deferredLoaded) return;
                deferredLoaded = true;
                // Google Analytics - load after LCP to reduce main-thread JS
                var gtagScript = document.createElement('script');
                gtagScript.async = true;
                gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8';
                document.head.appendChild(gtagScript);
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-N6DF8NPHY8', { allow_enhanced_conversions: true });
                // Google AdSense - load after LCP to reduce unused JS (518 KiB savings)
                var adsScript = document.createElement('script');
                adsScript.async = true;
                adsScript.crossOrigin = 'anonymous';
                adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6349841658473646';
                document.head.appendChild(adsScript);
                // Ezoic - gatekeeper + sa.min.js
                var gatekeeper1 = document.createElement('script');
                gatekeeper1.setAttribute('data-cfasync', 'false');
                gatekeeper1.src = 'https://cmp.gatekeeperconsent.com/min.js';
                gatekeeper1.async = true;
                document.head.appendChild(gatekeeper1);
                var gatekeeper2 = document.createElement('script');
                gatekeeper2.setAttribute('data-cfasync', 'false');
                gatekeeper2.src = 'https://the.gatekeeperconsent.com/cmp.min.js';
                gatekeeper2.async = true;
                document.head.appendChild(gatekeeper2);
                var ezoic = document.createElement('script');
                ezoic.async = true;
                ezoic.src = '//www.ezojs.com/ezoic/sa.min.js';
                ezoic.onerror = function() {};
                document.head.appendChild(ezoic);
                // Buy Me a Coffee - defer to reduce initial JS
                var bmc = document.createElement('script');
                bmc.setAttribute('data-name', 'BMC-Widget');
                bmc.setAttribute('data-cfasync', 'false');
                bmc.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
                bmc.setAttribute('data-id', 'WKbStURip');
                bmc.setAttribute('data-description', 'Support me on Buy me a coffee!');
                bmc.setAttribute('data-message', 'You have a Wonderful Day!!!');
                bmc.setAttribute('data-color', '#5F7FFF');
                bmc.setAttribute('data-position', 'Right');
                bmc.setAttribute('data-x_margin', '18');
                bmc.setAttribute('data-y_margin', '18');
                document.body.appendChild(bmc);
              }
              function whenIdleThenDeferred() {
                if (window.requestIdleCallback) {
                  requestIdleCallback(loadDeferredScripts, { timeout: 3500 });
                } else {
                  loadDeferredScripts();
                }
              }
              if ('PerformanceObserver' in window) {
                try {
                  var observer = new PerformanceObserver(function(list) {
                    var entries = list.getEntries();
                    var lastEntry = entries[entries.length - 1];
                    if (lastEntry && lastEntry.renderTime) {
                      observer.disconnect();
                      whenIdleThenDeferred();
                    }
                  });
                  observer.observe({ type: 'largest-contentful-paint', buffered: true });
                  setTimeout(function() {
                    observer.disconnect();
                    whenIdleThenDeferred();
                  }, 3500);
                } catch (e) {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() { setTimeout(whenIdleThenDeferred, 500); });
                  } else {
                    setTimeout(whenIdleThenDeferred, 1500);
                  }
                }
              } else {
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() { setTimeout(whenIdleThenDeferred, 1000); });
                } else {
                  setTimeout(whenIdleThenDeferred, 1500);
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
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
        </div>
        <BuyMeACoffeeWidget />
        
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

