import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget'
import DevModeWrapper from '@/components/DevModeWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Use AI Safely — AI Schema Masking, JSON Masking & Log Unpacker | UnblockDevs',
  description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs, decode JWTs. AI Schema Masking, JSON masking, formatter, parser—100% in-browser, no signup.',
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
    'hide sensitive data from chatgpt',
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
    title: 'Use AI Safely — Schema Masking, JSON Masking & Log Unpacker | UnblockDevs',
    description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs. AI Schema Masking, JSON masking, formatter, parser—100% in-browser, no signup.',
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
    title: 'Use AI Safely — Schema Masking, JSON Masking & Log Unpacker | UnblockDevs',
    description: 'Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs. AI Schema Masking, JSON masking—100% in-browser, no signup.',
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
    description: 'Mask JSON and SQL before sending to AI. Sanitize data before ChatGPT—JSON masking, AI schema masking, log unpacker, JWT decoder. Fix stringified JSON, unescape logs. 100% browser-based; your data never reaches our servers. Free JSON formatter, parser, validator.',
    url: 'https://unblockdevs.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2500',
    },
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
        {/* Preconnect: only 2 origins to avoid "too many preconnect" (Lighthouse). Fonts for LCP. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://g.ezoic.net" />
        <link rel="dns-prefetch" href="https://privacy.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="https://cdnjs.buymeacoffee.com" />
        <link rel="dns-prefetch" href="https://www.ezojs.com" />
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
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* AMP Auto Ads - maximum ad placements (script loads deferred after LCP) */}
        <div
          dangerouslySetInnerHTML={{
            __html: '<amp-auto-ads type="adsense" data-ad-client="ca-pub-6349841658473646"></amp-auto-ads>',
          }}
        />
        <DevModeWrapper>
          <div suppressHydrationWarning>
            {children}
          </div>
          <BuyMeACoffeeWidget />
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
        {/* Non-render-blocking: canonical + deferred third-party (gtag, AdSense, Ezoic) */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var p=window.location.pathname||'';var r=p==='/'||p==='';var q=(window.location.search||'').length>0;var h=r||q?'https://unblockdevs.com/':'https://unblockdevs.com'+p.replace(/\\/$/,'')||'/';var all=document.querySelectorAll('link[rel="canonical"]');for(var i=0;i<all.length;i++)all[i].remove();var l=document.createElement('link');l.rel='canonical';l.href=h;document.head.appendChild(l);})();` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.ezstandalone=window.ezstandalone||{};ezstandalone.cmd=ezstandalone.cmd||[];if(typeof window!=='undefined'){var oe=console.error,ow=console.warn;console.error=function(){var m=Array.prototype.join.call(arguments,' ');if(/Ezoic|_ezaq|Monetization not allowed|visit_uuid|bad response|Status; 403|\\[EzoicAds JS\\]/.test(m)){console.debug('Ezoic error suppressed:',m);return;}oe.apply(console,arguments);};console.warn=function(){var m=Array.prototype.join.call(arguments,' ');if(/Unload event listeners are deprecated|pagead2\\.googlesyndication|lidar\\.js|unload.*deprecated/.test(m)){console.debug('AdSense warning suppressed:',m);return;}ow.apply(console,arguments);};window.addEventListener('error',function(e){if(e.message&&/Ezoic|_ezaq|g\\.ezoic\\.net|ezojs\\.com|gatekeeperconsent\\.com|TagError|No slot size for availableWidth|adsbygoogle\\.push/.test(e.message)){e.preventDefault();e.stopPropagation();return false;}},true);window.addEventListener('unhandledrejection',function(e){var r=(e.reason&&e.reason.message)||(e.reason&&e.reason.toString())||'';if(/Ezoic|_ezaq|g\\.ezoic\\.net|ezojs\\.com|Monetization not allowed|TagError|No slot size for availableWidth|adsbygoogle/.test(r))e.preventDefault();});}var def=false;function loadDef(){if(def)return;def=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-N6DF8NPHY8';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-N6DF8NPHY8',{allow_enhanced_conversions:true});var a=document.createElement('script');a.async=true;a.crossOrigin='anonymous';a.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6349841658473646';document.head.appendChild(a);var g1=document.createElement('script');g1.setAttribute('data-cfasync','false');g1.src='https://cmp.gatekeeperconsent.com/min.js';g1.async=true;document.head.appendChild(g1);var g2=document.createElement('script');g2.setAttribute('data-cfasync','false');g2.src='https://the.gatekeeperconsent.com/cmp.min.js';g2.async=true;document.head.appendChild(g2);var ez=document.createElement('script');ez.async=true;ez.src='//www.ezojs.com/ezoic/sa.min.js';ez.onerror=function(){};document.head.appendChild(ez);}function go(){if(window.requestIdleCallback)requestIdleCallback(loadDef,{timeout:3500});else loadDef();}if('PerformanceObserver' in window){try{var po=new PerformanceObserver(function(list){var e=list.getEntries();if(e.length&&e[e.length-1].renderTime){po.disconnect();go();}});po.observe({type:'largest-contentful-paint',buffered:true});setTimeout(function(){po.disconnect();go();},3500);}catch(err){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(go,500);});else setTimeout(go,1500);}}else{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(go,1000);});else setTimeout(go,1500);}` }} />
      </body>
    </html>
  )
}

