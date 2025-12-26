import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'UnblockDevs - Free Online Developer Tools | JSON Converter, API Testing & Data Analysis',
  description: 'UnblockDevs offers 11+ free developer tools: JSON to Excel converter, JSON beautifier, API response comparator, schema generator, SQL formatter, log analyzer, payload analyzer, curl converter, mock API generator, test data generator, and config comparator. Professional tools for developers.',
  keywords: [
    'UnblockDevs',
    'developer tools',
    'JSON to Excel',
    'JSON converter',
    'JSON beautifier',
    'JSON formatter',
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
    'JSON parser',
    'Excel converter',
    'API testing tools',
    'JSON validator',
    'web development tools',
    'programming utilities'
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
        <link rel="icon" type="image/png" href="/support.png" />
        <link rel="apple-touch-icon" href="/support.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Buy Me a Coffee Widget - Minimum amount (₹499) must be set in Buy Me a Coffee account settings */}
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
      </head>
      <body>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 2000,
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

