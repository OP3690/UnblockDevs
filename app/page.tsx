import type { Metadata } from 'next';
import HomeServerHero from '@/components/home/HomeServerHero';
import HomeClient from './page-client';

export const metadata: Metadata = {
  title: 'UnblockDevs — Free Developer Tools: JSON, SQL, JWT, Base64, cURL & More',
  description: '40+ free browser-based developer tools for JSON, SQL, JWT, Base64, cURL, regex, and AI workflows. 100% client-side — nothing sent to servers. No signup required.',
  alternates: { canonical: 'https://unblockdevs.com/' },
  openGraph: {
    title: 'UnblockDevs — 40+ Free Developer Tools',
    description: 'JSON, SQL, JWT, Base64, cURL, regex, and AI masking tools. All free, all client-side.',
    url: 'https://unblockdevs.com/',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — Free Developer Tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnblockDevs — 40+ Free Developer Tools',
    description: 'JSON, SQL, JWT, Base64, cURL, regex tools. Free, client-side, no signup.',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UnblockDevs',
  url: 'https://unblockdevs.com',
  description: '40+ free browser-based developer tools for JSON, SQL, JWT, Base64, cURL, and AI workflows.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://unblockdevs.com/tools/json?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnblockDevs',
  url: 'https://unblockdevs.com',
  logo: 'https://unblockdevs.com/og-image.png',
  description: 'Provider of free, privacy-first developer tools. All tools run 100% in the browser.',
  sameAs: [],
};

export default function Home() {
  /* Nav must be first (matches redesign); hero is passed into client shell below header */
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HomeClient hero={<HomeServerHero />} />
    </>
  );
}
