import type { Metadata } from 'next';
import Link from 'next/link';
import JWTDecoderClient from './client';

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode, Verify & Analyze JWTs Free | UnblockDevs',
  description:
    'Decode JWT tokens instantly. View header, payload, verify signatures (HS256, RS256, ES256). Security analysis, provider detection, token lifetime. 100% browser-based.',
  keywords: [
    'jwt decoder',
    'jwt decoder online',
    'decode jwt',
    'jwt parser',
    'jwt payload decoder',
    'verify jwt signature',
    'jwt header decoder',
    'jwt analyzer',
    'jwt security',
    'decode jwt online free',
  ],
  openGraph: {
    title: 'JWT Decoder — Decode, Verify & Analyze JWTs Free | UnblockDevs',
    description:
      'Decode JWT tokens instantly. View header, payload, verify signatures. 100% browser-based — your tokens never leave this page.',
    type: 'website',
    url: 'https://unblockdevs.com/jwt-decoder',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JWT Decoder' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/jwt-decoder',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'WebApplication' as const,
  name: 'JWT Decoder',
  applicationCategory: 'DeveloperApplication',
  offers: { '@type': 'Offer' as const, price: '0', priceCurrency: 'USD' },
  featureList: [
    'JWT decoding',
    'Signature verification (HMAC)',
    'Security analysis',
    'Provider detection',
    'Token lifetime timeline',
    'Browser-based — no server',
  ],
};

export default function JWTDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="jwt-decoder-heading">
        <h1 id="jwt-decoder-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          JWT Decoder & Analyzer
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Decode, validate, and analyze JWTs in your browser. View header and payload, check token lifetime,
          run security analysis, and verify HMAC signatures. Nothing is sent to any server.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste a JWT or use <code className="bg-gray-100 px-1 rounded">?token=...</code> in the URL. Supports Bearer prefix and auto-sanitization.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <JWTDecoderClient />
      </div>
    </>
  );
}
