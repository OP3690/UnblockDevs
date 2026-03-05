import type { Metadata } from 'next';
import Link from 'next/link';
import TokenComparatorLandingClient from './client';

export const metadata: Metadata = {
  title: 'Token Comparator & JWT Debugger – Compare, Decode, Analyze Tokens | UnblockDevs',
  description: 'Compare JWT tokens character-by-character, decode header and payload, run security audit, view token lifetime and entropy. JWT debugger, token analyzer, API key checker. 100% client-side.',
  keywords: [
    'jwt debugger',
    'jwt decoder',
    'jwt token analyzer',
    'jwt security checker',
    'compare jwt tokens',
    'token comparator',
    'api token checker',
    'jwt expiration checker',
    'decode jwt',
    'token analyzer',
    'jwt decoder online',
  ],
  openGraph: {
    title: 'Token Comparator & JWT Security Analyzer | UnblockDevs',
    description: 'Compare, decode, and analyze JWT and auth tokens. Smart detection, security audit, lifetime view. 100% client-side.',
    type: 'website',
    url: 'https://unblockdevs.com/token-comparator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/token-comparator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JWT tokens?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste each JWT into the Token Comparator. The tool decodes payloads and shows a character-by-character diff so you can see exactly what changed between tokens.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is the JWT decoder safe? Is my token sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Decoding and comparison run entirely in your browser. Nothing is sent to our servers. Do not paste production secrets into any site you do not trust; this tool is designed so you do not need to.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I decode a JWT and see the payload?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Paste a JWT and the tool shows header and payload (base64 decoded). You can also compare two tokens side by side with visual diff.',
      },
    },
  ],
};

export default function TokenComparatorLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="token-comp-heading">
        <h1 id="token-comp-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Token Comparator & JWT Security Analyzer
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Compare, decode, and analyze authentication tokens in your browser. Smart token detection (JWT, API key, UUID, Base64), JWT debugger, security audit, token lifetime, and entropy analysis. All processing is client-side—nothing is sent to our servers.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste one token to decode and analyze; paste two to compare character-by-character with visual diff. Perfect for jwt debugger, jwt decoder, token comparison, and jwt expiration check.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <TokenComparatorLandingClient />
      </div>
    </>
  );
}

