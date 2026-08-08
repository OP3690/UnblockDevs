import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'
import DevModeWrapper from '@/components/DevModeWrapper'
import GA4RouteTracker from '@/components/GA4RouteTracker'
import TabVisibilityTracker from '@/components/TabVisibilityTracker'
import GlobalAdSlot from '@/components/GlobalAdSlot'
import AdSenseScriptLoader from '@/components/AdSenseScriptLoader'
import ToolPagesAdWrap from '@/components/ToolPagesAdWrap'
import HomeBookmarkStrip from '@/components/HomeBookmarkStrip'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import VisitTracker from '@/components/VisitTracker'
import AutoToolSchema from '@/components/AutoToolSchema'
import AutoBlogArticleSchema from '@/components/AutoBlogArticleSchema'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: true })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap', preload: true })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://unblockdevs.com'),
  alternates: {
    canonical: 'https://unblockdevs.com',
  },
  title: 'UnblockDevs — Free JSON Formatter, JWT Decoder & 50+ Developer Tools',
  description: 'Free browser-based developer tools: JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, Base64 encoder, Regex tester. 100% client-side, GDPR-safe, no signup required.',
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
    // cURL converter cluster
    'curl to python',
    'curl to javascript',
    'curl to axios',
    'curl to fetch',
    'curl post json',
    'curl post json example',
    'curl content-type application json',
    'convert curl command online',
    'curl converter online',
    // HAR to cURL — copy as cURL cluster
    'har to curl',
    'har file converter',
    'copy as curl chrome devtools',
    'chrome devtools copy as curl',
    'copy network request as curl',
    'extract curl from har',
    // CORS cluster
    'cors tester online',
    'blocked by cors policy no access-control-allow-origin',
    'how to fix cors error',
    'cors error fix',
    'cors header checker',
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
    // Long-tail natural queries
    'how to safely use chatgpt with production data',
    'gdpr compliant ai tool for developers',
    'mask pii before sending to llm',
    'anonymize api response before ai',
    'how to convert curl to python',
    'how to fix no access-control-allow-origin',
    'how to export har file from chrome',
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
    'free developer tools online',
    'json tools no login',
    'json editor online',
    'developer tools no signup',
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
    title: 'UnblockDevs — Free JSON Formatter, JWT Decoder & 50+ Developer Tools',
    description: 'Free browser-based developer tools: JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and 45+ more. GDPR-safe, 100% client-side, no signup.',
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
    title: 'UnblockDevs — Free JSON Formatter, JWT Decoder & 50+ Developer Tools',
    description: 'JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter. 100% client-side, GDPR-safe, no signup.',
    images: ['/og-image.png'],
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
  verification: {
    google: 'Y5HAW7dJrOgoSP6ycSbnbNWeKIeHH-fwCM4p5Fgh11I',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://unblockdevs.com/#website',
    name: 'UnblockDevs',
    url: 'https://unblockdevs.com',
    inLanguage: 'en-US',
    description: 'Free browser-based developer tools: JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and 50+ more. 100% client-side, GDPR-safe, no signup.',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://unblockdevs.com/#organization',
      name: 'UnblockDevs',
      url: 'https://unblockdevs.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://unblockdevs.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://unblockdevs.com/#organization',
    name: 'UnblockDevs',
    alternateName: 'Unblock Devs',
    url: 'https://unblockdevs.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://unblockdevs.com/icon.png',
      width: 512,
      height: 512,
    },
    description: 'UnblockDevs provides 50+ free browser-based developer tools including JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and AI schema masker. All tools run 100% client-side — no data ever leaves your browser.',
    foundingDate: '2024',
    sameAs: [
      'https://github.com/OP3690',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://unblockdevs.com/contact',
      email: 'support@unblockdevs.com',
      availableLanguage: 'English',
    },
    areaServed: ['US', 'GB', 'CA', 'AU', 'IN', 'EU'],
    knowsAbout: [
      'JSON formatting and validation',
      'JWT token decoding and verification',
      'cURL command conversion to Python, JavaScript, Go, Java',
      'CORS testing and debugging',
      'SQL formatting and prettifying',
      'API debugging and testing',
      'Base64 encoding and decoding',
      'Regular expression testing',
      'UUID generation',
      'Data privacy tools for AI workflows',
      'GDPR-compliant developer tools',
      'Browser-based developer utilities',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free Developer Tools',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'JSON Formatter', url: 'https://unblockdevs.com/json-formatter', applicationCategory: 'DeveloperApplication' } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'cURL Converter', url: 'https://unblockdevs.com/curl-converter', applicationCategory: 'DeveloperApplication' } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'JWT Decoder', url: 'https://unblockdevs.com/jwt-decoder', applicationCategory: 'DeveloperApplication' } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'SQL Formatter', url: 'https://unblockdevs.com/sql-formatter', applicationCategory: 'DeveloperApplication' } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Base64 Encoder', url: 'https://unblockdevs.com/base64-encoder', applicationCategory: 'DeveloperApplication' } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Regex Tester', url: 'https://unblockdevs.com/regex-tester', applicationCategory: 'DeveloperApplication' } },
      ],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* JSON-LD: WebSite (with SearchAction) + Organization (with sameAs, catalog, logo) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      <body
        className="font-sans antialiased text-zinc-900 bg-[#FAFAFA] selection:bg-emerald-200/50 selection:text-zinc-900"
        suppressHydrationWarning
      >
        {/* Skip-to-content — keyboard/screen-reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <GA4RouteTracker />
        <TabVisibilityTracker />
        <DevModeWrapper>
          <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 antialiased">
            <HomeBookmarkStrip />
            <SiteHeader />
            <div id="main-content" className="flex min-h-0 flex-1 flex-col min-w-0" suppressHydrationWarning>
              <ToolPagesAdWrap>{children}</ToolPagesAdWrap>
            </div>
            <SiteFooter />
          </div>
          <GlobalAdSlot />
          <BuyMeACoffeeWidget />
          <ScrollToTop />
        </DevModeWrapper>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2500,
            style: {
              fontSize: '14px',
              borderRadius: '10px',
              background: '#18181b',
              color: '#fff',
              marginBottom: '80px', // Space above Buy Me a Coffee widget
            },
            success: {
              duration: 2500,
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
        {/* AdSense — loaded via client component so the tag has no data-nscript (AdSense requirement) */}
        <AdSenseScriptLoader />
        {/* Microsoft Clarity — lazyOnload so it never blocks interactions (INP) */}
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wga2c8iwtm");`}
        </Script>
        {/* GA4 — afterInteractive so page_path works on first paint */}
        <Script id="ga4-js" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8" />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-N6DF8NPHY8',{page_path:window.location.pathname,allow_enhanced_conversions:true});`}
        </Script>
      </body>
    </html>
  )
}

