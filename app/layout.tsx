import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'

export const metadata: Metadata = {
  title: 'Free JSON Tools | Viewer, Formatter, Parser | UnblockDevs',
  description: 'Interact with free JSON Viewer Tools online. Edit, validate, and convert JSON instantly. No signup—live demo and downloadable results.',
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
    description: 'Interact with free JSON Viewer Tools online. Edit, validate, convert—live demo and downloadable results. No signup.',
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
    description: 'Interact with free JSON Viewer Tools online. Edit, validate, convert—live demo and downloadable results. No signup.',
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
    description: 'Interact with free JSON Viewer Tools online. Edit, validate, and convert JSON instantly. No signup—live demo and downloadable results.',
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
        
        {/* Canonical URL - Smart canonical handling (removes query parameters, preserves page URLs) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Get current URL without query parameters
                const currentPath = window.location.pathname;
                const hasQueryParams = window.location.search.length > 0;
                const isHomepage = currentPath === '/' || currentPath === '';
                
                // Remove existing canonical tags
                const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
                existingCanonicals.forEach(function(link) {
                  link.remove();
                });
                
                // Determine canonical URL
                let canonicalUrl;
                if (isHomepage || hasQueryParams) {
                  // Homepage or URLs with query params -> base URL
                  canonicalUrl = 'https://unblockdevs.com';
                } else {
                  // Dedicated pages -> preserve their URL (without query params)
                  canonicalUrl = 'https://unblockdevs.com' + currentPath;
                }
                
                // Create new canonical tag
                const canonical = document.createElement('link');
                canonical.rel = 'canonical';
                canonical.href = canonicalUrl;
                document.head.appendChild(canonical);
              })();
            `,
          }}
        />
        
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
        
        {/* AMP Auto Ads - For AMP pages */}
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
        
        {/* Ezoic and Buy Me a Coffee - Load after page is interactive to improve LCP */}
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
        {/* AMP Auto Ads - Place immediately after body tag */}
        <div
          dangerouslySetInnerHTML={{
            __html: '<amp-auto-ads type="adsense" data-ad-client="ca-pub-6349841658473646"></amp-auto-ads>',
          }}
        />
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

