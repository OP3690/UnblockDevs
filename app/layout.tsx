import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'UnblockDevs - Free Online Developer Tools | JSON Viewer, JSON Parser, JSON Beautifier & More',
  description: 'UnblockDevs offers 11+ free developer tools: JSON Viewer, JSON Parser, JSON Beautifier, JSON to Excel converter, JSON formatter, API response comparator, schema generator, SQL formatter, log analyzer, payload analyzer, curl converter, mock API generator, test data generator, and config comparator. Professional tools for developers.',
  keywords: [
    'UnblockDevs',
    'developer tools',
    'JSON Viewer',
    'JSON Parser',
    'JSON Beautifier',
    'JSON Formatter',
    'JSON to Excel',
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
    'API comparator',
    'API testing',
    'JSON schema generator',
    'SQL formatter',
    'log analyzer',
    'payload analyzer',
    'curl converter',
    'mock API generator',
    'test data generator',
    'config comparator',
    'free developer tools',
    'online JSON tools',
    'data converter',
    'Excel converter',
    'API testing tools',
    'web development tools',
    'programming utilities',
    'JSON online tools',
    'JSON visualization',
    'JSON diff tool',
    'JSON compare',
    'JSON to CSV',
    'JSON to table'
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
    title: 'UnblockDevs - Free Online Developer Tools | JSON Converter, API Testing & More',
    description: 'UnblockDevs provides 11+ free developer tools: JSON to Excel converter, API testing, data analysis, schema generation, and more. Professional tools for developers.',
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
    title: 'UnblockDevs - Free Online Developer Tools | JSON Converter & API Testing',
    description: 'UnblockDevs offers 11+ free developer tools: JSON converter, API testing, data analysis, and more. Professional tools for developers.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://unblockdevs.com',
  },
  icons: {
    icon: [
      { url: '/support.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/support.png', sizes: '180x180', type: 'image/png' },
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
    description: 'UnblockDevs provides 11+ free developer tools including JSON to Excel converter, JSON beautifier, API response comparator, schema generator, SQL formatter, log analyzer, payload analyzer, curl converter, mock API generator, test data generator, and config comparator.',
    url: 'https://unblockdevs.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2500',
    },
    featureList: [
      'JSON to Excel Converter',
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
            `,
          }}
        />
        
        {/* Force CSS to load by adding cache-busting */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" type="image/png" href="/support.png" />
        <link rel="apple-touch-icon" href="/support.png" />
        
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

