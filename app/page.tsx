import type { Metadata } from 'next';
import HomeServerHero from '@/components/home/HomeServerHero';
import HomeClient from './page-client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter, JWT Decoder & 50+ Developer Tools | UnblockDevs',
  description: '50+ free browser-based developer tools — JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, API debugging. 100% client-side, GDPR-safe, no signup. Works instantly in your browser.',
  alternates: { canonical: 'https://unblockdevs.com/' },
  openGraph: {
    title: 'UnblockDevs — 50+ Free Developer Tools: JSON, JWT, cURL, SQL & More',
    description: 'JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and 45+ more. 100% client-side — GDPR-safe, no data sent to servers, no signup required.',
    url: 'https://unblockdevs.com/',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — Free Developer Tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnblockDevs — 50+ Free Developer Tools: JSON, JWT, cURL & More',
    description: 'JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter. Free, client-side, GDPR-safe. No signup.',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UnblockDevs',
  url: 'https://unblockdevs.com',
  description: '50+ free browser-based developer tools — JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and AI data masking. 100% client-side, GDPR-safe.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://unblockdevs.com/tools/json?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is UnblockDevs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs is a free, 100% browser-based suite of 50+ developer tools including JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and AI data masking tools. No signup is required and nothing is sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is UnblockDevs free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — all 50+ tools are completely free with no subscription, no account required, and no usage limits. They are free forever.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does UnblockDevs store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens entirely in your browser — nothing is sent to or stored on any server. UnblockDevs is GDPR-safe, suitable for enterprise environments, and safe to use with sensitive or production data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use UnblockDevs with sensitive API data or tokens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Because all tools run 100% client-side, your JSON payloads, SQL schemas, JWT tokens, and API responses never leave your machine. This makes UnblockDevs safe for production data and GDPR-compliant for teams in the EU and regulated industries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What developer tools does UnblockDevs offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs offers 50+ tools including: JSON formatter, JSON validator, JSON beautifier, JSON fixer, JWT decoder, Base64 encoder/decoder, URL encoder, Hash generator (MD5, SHA-256), CORS tester, SQL formatter, cURL converter, HAR to cURL, Regex tester, Password generator, AI schema masker (mask data before ChatGPT), Log unpacker, and many more.',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeClient hero={<HomeServerHero />} />
    </>
  );
}
