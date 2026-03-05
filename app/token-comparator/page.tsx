import type { Metadata } from 'next';
import Link from 'next/link';
import TokenComparatorLandingClient from './client';

export const metadata: Metadata = {
  title: 'Free Token Comparator – Compare JWT, API Keys & Tokens | UnblockDevs',
  description: 'UnblockDevs Token Comparator: Compare JWT tokens, API keys, and authentication tokens character by character. Free online token comparator with visual diff highlighting. No signup, 100% private, works in your browser.',
  keywords: [
    'unblock devs token',
    'unblockdevs token',
    'token comparator',
    'jwt token comparator',
    'compare tokens',
    'api key comparator',
    'token diff',
    'compare jwt tokens',
    'authentication token comparator',
    'token verification',
    'token comparison tool',
    'compare api keys'
  ],
  openGraph: {
    title: 'UnblockDevs Token Comparator – Compare JWT, API Keys & Tokens',
    description: 'UnblockDevs Token Comparator: Compare JWT tokens, API keys, and authentication tokens character by character. Free online token comparator with visual diff highlighting.',
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
          JWT Decoder & Token Comparator — Compare and Inspect Tokens in Your Browser
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Decode JWTs and compare tokens, API keys, or any authentication strings side by side with a visual diff. All processing happens in your browser—nothing is sent to our servers. Free, no signup, 100% private.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste one or two tokens (JWT, API key, or generic string). View decoded payloads and a character-by-character comparison. Use it to verify tokens or debug auth issues without exposing secrets.
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

