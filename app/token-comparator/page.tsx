import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import TokenComparatorLandingClient from './client';

const canonicalUrl = 'https://unblockdevs.com/token-comparator';

export const metadata: Metadata = {
  title:
    'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check Online Free | UnblockDevs',
  description:
    'Decode and debug JWT tokens, compare authentication tokens character-by-character, run security audits, check expiration, and analyze entropy. Free, 100% browser-based, nothing sent to servers.',
  keywords: [
    'jwt debugger online',
    'token comparator online',
    'jwt decoder online',
    'compare jwt tokens',
    'jwt security analyzer',
    'decode jwt token online',
    'jwt expiration checker',
    'api key comparator',
    'authentication token debugger',
    'jwt token analyzer free',
    'jwt security audit tool',
    'jwt vulnerability scanner',
    'jwt none algorithm detector',
    'compare two jwt tokens',
    'jwt token diff tool',
    'check jwt expiry online',
    'jwt token expired checker',
    'token entropy checker',
    'api key entropy analyzer',
    'token mismatch between environments',
    'how to decode a jwt token online',
    'how to compare two jwt tokens',
    'how to check if a jwt token is expired',
    'what is the none algorithm jwt vulnerability',
    'JWT Debugger',
    'Token Comparator',
  ],
  openGraph: {
    title: 'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check | UnblockDevs',
    description:
      'Decode JWT, compare tokens, security audit, expiration check, entropy analysis. Free, 100% browser-based. Nothing sent to servers.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Debugger & Token Comparator — Decode, Compare & Security Audit | UnblockDevs',
    description: 'JWT decode, compare tokens, security audit, expiry check. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check',
  description:
    'Decode and debug JWT tokens, compare authentication tokens character-by-character, run security audits, check expiration, and analyze entropy. Smart detection for JWT, API key, UUID, Base64. 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Smart token detection (JWT, API key, UUID, Base64)',
    'Character-by-character visual diff for two tokens',
    'JWT security audit (e.g. none algorithm, weak secrets)',
    'Token lifetime and expiration check',
    'Entropy analysis for token strength',
    '100% client-side — nothing sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I decode a JWT token online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into Token Comparator at unblockdevs.com/token-comparator. It auto-detects the JWT, decodes the header, payload, and all claims including expiration — 100% in your browser, nothing sent to servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I check if a JWT token is expired?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into Token Comparator. It reads the exp claim and shows the exact expiration datetime, whether the token is currently valid, and how long ago it expired or how much lifetime remains.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the JWT none algorithm vulnerability?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "The none algorithm vulnerability allows an attacker to remove the JWT signature so the server accepts any payload without verification. Token Comparator's security audit detects this and other JWT security misconfigurations automatically.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JWT tokens?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your first token in Token 1 and your second token in Token 2 at unblockdevs.com/token-comparator. Click Compare for an instant character-by-character visual diff with match percentage and mismatch highlighting.',
      },
    },
  ],
};

export default function TokenComparatorLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <TokenComparatorLandingClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="token-comp-heading">
        <h1 id="token-comp-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          JWT Debugger &amp; Token Comparator — Decode, Compare, Security Audit &amp; Expiry Check Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Decode and debug JWT tokens, compare authentication tokens character-by-character, run security audits, check expiration, and analyze entropy. Smart detection for JWT, API key, UUID, Base64. All processing is client-side—nothing is sent to our servers.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste one token to decode and analyze; paste two to compare with visual diff. Unlike basic JWT decoders, this tool also runs a security audit, checks expiration, analyzes entropy, and compares two tokens — all without sending anything to a server.
        </p>
        <TrackedCtaLink href="#tool" toolName="token_comparator" className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
          Use the tool →
        </TrackedCtaLink>
      </article>
    </>
  );
}
