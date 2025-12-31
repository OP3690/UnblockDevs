import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON Fixer Online - Free Tools | UnblockDevs',
  description: 'Free online JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON Fixer & Repair Tool, JSON to Excel converter, JSON to CSV converter, and JSON to Table converter. Edit, view, analyze, format, validate, fix malformed JSON, and convert JSON data instantly. No installation required. Professional JSON tools for developers.',
  keywords: [
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
    'JSON compare'
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
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
        {/* Ezoic Privacy Scripts - Must be loaded first */}
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
        
        {/* Ezoic Header Script */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
              // Handle Ezoic errors gracefully
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e.message && (e.message.includes('Ezoic') || e.message.includes('_ezaq'))) {
                    e.preventDefault();
                    console.debug('Ezoic error handled:', e.message);
                  }
                }, true);
              }
            `,
          }}
        />
        
        {/* Force CSS to load by adding cache-busting */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Favicon for Google Search Results - Next.js 14 automatically serves favicon.ico from app/ directory */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N6DF8NPHY8');
            `,
          }}
        />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6349841658473646"
          crossOrigin="anonymous"
        />
        
        {/* Buy Me a Coffee Widget */}
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="WKbStURip"
          data-description="Support me on Buy me a coffee!"
          data-message="You have a wonderful day!!!"
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
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

