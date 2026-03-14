import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'
import DevModeWrapper from '@/components/DevModeWrapper'
import Celebration1MPopup from '@/components/Celebration1MPopup'
import GA4RouteTracker from '@/components/GA4RouteTracker'
import GlobalAdSlot from '@/components/GlobalAdSlot'
import ToolPagesAdWrap from '@/components/ToolPagesAdWrap'
import VisitTracker from '@/components/VisitTracker'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: true })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap', preload: true })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Use AI Safely — JSON Masking & Log Unpacker | UnblockDevs',
  description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs, decode JWTs. Schema masking, formatter, parser—100% in-browser, no signup.',
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
    // Primary (high intent) — mask/sanitize before AI
    'mask json before sending to ai',
    'sanitize data before chatgpt',
    'json masking tool online',
    'sql schema masking ai',
    'hide sensitive data before chatgpt',
    'mask api response before ai',
    'safe json for chatgpt',
    'base64 encode decode online',
    'json formatter online free',
    'json diff tool online',
    // Secondary — developer tools
    'online json formatter',
    'jwt decoder online',
    'log unpacker tool',
    'unescape json logs',
    'fix stringified json',
    // Long-tail
    'how to safely use chatgpt with production data',
    'gdpr compliant ai tool for developers',
    'mask pii before sending to llm',
    'anonymize api response before ai',
    // AI safety & masking
    'ai schema masking',
    'json masking',
    'mask json for ai',
    'log unpacker',
    'stringified json fix',
    'unescape json',
    'decode jwt',
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
    title: 'Use AI Safely — JSON Masking & Log Unpacker | UnblockDevs',
    description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs. Schema masking, formatter, parser—100% in-browser, no signup.',
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
    title: 'Use AI Safely — JSON Masking & Log Unpacker | UnblockDevs',
    description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs. Schema masking—100% in-browser, no signup.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://unblockdevs.com'),
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
  verification: {
    google: 'Y5HAW7dJrOgoSP6ycSbnbNWeKIeHH-fwCM4p5Fgh11I',
    other: {
      'msvalidate.01': 'your-bing-verification-code', // Replace with actual Bing code when you have it
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
    description: 'Mask JSON and SQL before sending to AI. Sanitize data before ChatGPT—JSON masking, schema masking, log unpacker, JWT decoder. 100% browser-based. Free formatter, parser, validator.',
    url: 'https://unblockdevs.com',
    featureList: [
      'Mask JSON before sending to AI',
      'JSON masking tool online',
      'SQL schema masking for AI',
      'Sanitize data before ChatGPT',
      'Log unpacker — unescape JSON logs',
      'JWT decoder online',
      'Fix stringified JSON',
      'JSON Formatter & Parser',
      'JSON to Excel Converter',
      'API Response Comparator',
      'JSON Schema Generator',
      'Smart JSON Data Diff',
      'Config Comparator',
      'SQL Formatter',
      '100% browser-based — no data stored',
    ],
    provider: {
      '@type': 'Organization',
      name: 'UnblockDevs',
      url: 'https://unblockdevs.com',
    },
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UnblockDevs',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free online tools to mask JSON and SQL before sending to AI, sanitize data before ChatGPT, fix stringified JSON, and unpack logs. GDPR-friendly; 100% client-side.',
    url: 'https://unblockdevs.com',
    featureList: ['JSON masking', 'AI schema masking', 'Log unpacker', 'JWT decoder', 'JSON formatter', 'No signup required'],
  };

  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* JSON-LD for rich results: WebApplication + SoftwareApplication (crawlers see first) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        {/* Only 2 preconnects — no gatekeeper, no BMC, no adtrafficquality (~400ms saved on mobile) */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fundingchoicesmessages.google.com" />
        
        {/* Favicon for Google Search Results - Multiple formats for better compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GA4RouteTracker />
        <DevModeWrapper>
          <div suppressHydrationWarning>
            <ToolPagesAdWrap>{children}</ToolPagesAdWrap>
          </div>
          <GlobalAdSlot />
          <BuyMeACoffeeWidget />
          <Celebration1MPopup />
        </DevModeWrapper>
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
        {/* Canonical: use metadata alternates.canonical per page (initial HTML). No client script — Google reads from server response. */}
        {/* AdSense — in layout so it loads on every page; manual ad units need this before they can fill */}
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6349841658473646"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* GA4 — afterInteractive so page_path works on first paint */}
        <Script id="ga4-js" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8" />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-N6DF8NPHY8',{page_path:window.location.pathname,allow_enhanced_conversions:true});`}
        </Script>
      </body>
    </html>
  )
}

