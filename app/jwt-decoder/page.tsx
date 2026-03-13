import type { Metadata } from 'next';
import Link from 'next/link';
import JWTDecoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/jwt-decoder';

export const metadata: Metadata = {
  title:
    'JWT Decoder — Decode JWT Tokens, Verify Signatures, Check Expiry & Security Audit Online Free | UnblockDevs',
  description:
    'Decode JWT tokens, view header and payload claims, verify HMAC signatures, check expiration, and run security analysis — 100% in your browser. Token never sent to any server. Free, no signup.',
  keywords: [
    'jwt decoder',
    'jwt decoder online',
    'decode jwt token',
    'jwt token decoder',
    'decode jwt online',
    'jwt decoder free',
    'jwt decoder no server',
    'decode jwt without sending to server',
    'jwt decoder client side only',
    'jwt decoder privacy',
    'jwt signature verification online',
    'verify jwt signature',
    'jwt hmac verifier',
    'verify jwt token online',
    'jwt security analyzer',
    'jwt vulnerability checker',
    'jwt none algorithm vulnerability',
    'jwt expiry checker',
    'check jwt expiration',
    'jwt claims viewer',
    'what is jwt token',
    'how does jwt work',
    'jwt header payload signature explained',
    'how to decode a jwt token',
    'is jwt.io safe to use',
    'how to check if jwt token is expired',
    'how to verify jwt signature',
    'jwt token invalid fix',
    'debug jwt authentication',
    'JWT Decoder',
  ],
  openGraph: {
    title: 'JWT Decoder — Decode, Verify, Check Expiry & Security Audit Online Free | UnblockDevs',
    description:
      'Decode JWT tokens, verify signatures, check expiration, run security analysis. 100% in your browser. Token never sent to any server.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JWT Decoder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder — Decode, Verify & Security Audit Online Free | UnblockDevs',
    description: 'Decode JWT, verify HMAC, check expiry. 100% client-side. Token never leaves your device.',
  },
  alternates: { canonical: canonicalUrl },
};

const webAppSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'WebApplication' as const,
  name: 'JWT Decoder — Decode, Verify Signatures, Check Expiry & Security Audit',
  url: canonicalUrl,
  description:
    'Decode JWT tokens, view header and payload claims, verify HMAC signatures, check expiration, and run security analysis. 100% in your browser. Token never sent to any server.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer' as const, price: '0', priceCurrency: 'USD' },
  featureList: [
    'Decode JWT header, payload, and signature',
    'Verify HMAC signatures (e.g. HS256)',
    'Security analysis (e.g. none algorithm, weak secrets)',
    'Token lifetime and expiration check',
    'Provider detection',
    '100% browser-based — no server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I decode a JWT token?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into the decoder at unblockdevs.com/jwt-decoder. It instantly decodes the header, payload, and all claims from Base64URL and displays them in readable JSON — 100% in your browser, nothing sent to servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste JWT tokens into online decoders?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Only if the tool is 100% client-side. This JWT Decoder processes everything in your browser — no network request is made and your token never leaves your device. Safe for production tokens and sensitive credentials.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I check if a JWT token is expired?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into the decoder. It reads the exp claim and shows the exact expiration datetime, whether the token is currently valid, and how much lifetime remains or how long ago it expired.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the JWT none algorithm vulnerability?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "The alg:none attack allows an attacker to strip the JWT signature so vulnerable servers accept any payload without verification. This JWT Decoder's built-in security analysis detects this vulnerability automatically.",
      },
    },
  ],
};

export default function JWTDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="jwt-decoder-heading">
        <h1 id="jwt-decoder-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          JWT Decoder — Decode JWT Tokens, Verify Signatures, Check Expiry &amp; Security Audit Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Decode, validate, and analyze JWTs in your browser. View header and payload, verify HMAC signatures, check token lifetime, and run security analysis. Nothing is sent to any server — your token never leaves your device.
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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" aria-labelledby="jwt-content-heading">
        <h2 id="jwt-content-heading" className="text-2xl font-bold text-gray-900 mb-6">
          What Is a JWT Token?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A <strong>JWT (JSON Web Token)</strong> is an open standard (RFC 7519) for securely transmitting information between parties as a compact, URL-safe string. A JWT consists of three Base64URL-encoded parts separated by dots:
        </p>
        <p className="font-mono text-sm bg-gray-100 p-3 rounded-lg text-gray-800 mb-4">
          header.payload.signature
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-2">
          <li><strong>Header:</strong> Specifies the token type (JWT) and signing algorithm (e.g. HS256, RS256).</li>
          <li><strong>Payload:</strong> Contains the claims — user data, expiry (<code className="rounded bg-gray-100 px-1 py-0.5 text-sm">exp</code>), issued-at (<code className="rounded bg-gray-100 px-1 py-0.5 text-sm">iat</code>), and custom fields.</li>
          <li><strong>Signature:</strong> Verifies the token hasn&apos;t been tampered with; the server validates it using the secret or public key.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">What Are JWT Claims?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Claims are statements about the user or session stored in the payload. Standard registered claims include:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6 ml-2">
          <li><strong>iss</strong> (issuer) — who created the token</li>
          <li><strong>sub</strong> (subject) — who the token refers to (e.g. user ID)</li>
          <li><strong>aud</strong> (audience) — who the token is intended for</li>
          <li><strong>exp</strong> (expiration) — when the token expires (Unix timestamp)</li>
          <li><strong>nbf</strong> (not before) — when the token becomes valid</li>
          <li><strong>iat</strong> (issued at) — when the token was created</li>
          <li><strong>jti</strong> (JWT ID) — unique identifier for the token</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Is jwt.io Safe? Why Client-Side Matters</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          jwt.io is widely used but processes tokens through their servers. For tokens containing user IDs, emails, roles, or sensitive claims, that can be a privacy concern — especially in regulated environments or when debugging production issues.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          This JWT Decoder runs <strong>100% in your browser</strong>. Your token never leaves your device: no network request is made, no data is logged or stored. Safe for production tokens, staging credentials, and sensitive authentication data. Decoding is just Base64URL — it can be done entirely locally.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">How do I decode a JWT token?</dt>
            <dd className="text-gray-700 mt-1">
              Paste your JWT into the decoder above. It instantly splits the header, payload, and signature, decodes each part from Base64URL, and displays all claims in readable JSON — entirely in your browser.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Is it safe to paste JWT tokens into online decoders?</dt>
            <dd className="text-gray-700 mt-1">
              Only if the tool is 100% client-side. This decoder processes everything in your browser — no network request is made, your token never leaves your device. Safe for production tokens and sensitive credentials.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">How do I check if a JWT token is expired?</dt>
            <dd className="text-gray-700 mt-1">
              Paste your JWT above. The decoder reads the <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">exp</code> claim and shows the exact expiration datetime, whether the token is currently valid, and remaining or elapsed lifetime in human-readable format.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">How do I verify a JWT signature?</dt>
            <dd className="text-gray-700 mt-1">
              Paste your JWT and enter your HMAC secret in the verification field. The decoder runs the signature verification locally in your browser and confirms whether the token signature is valid.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What does a JWT token look like?</dt>
            <dd className="text-gray-700 mt-1">
              A JWT has three Base64URL-encoded parts separated by dots: <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">eyJhbGci....</code>.<code className="rounded bg-gray-100 px-1 py-0.5 text-sm">eyJzdWI....</code>.<code className="rounded bg-gray-100 px-1 py-0.5 text-sm">signature</code>. The first part is the header, the second is the payload (claims), the third is the cryptographic signature.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is the JWT &quot;none&quot; algorithm vulnerability?</dt>
            <dd className="text-gray-700 mt-1">
              The <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">alg:none</code> vulnerability allows an attacker to set the algorithm to &quot;none&quot; and strip the signature, potentially bypassing verification on vulnerable servers. This decoder&apos;s security analysis flags this automatically.
            </dd>
          </div>
        </dl>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Related Tools</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          <Link href="/token-comparator" className="text-blue-600 hover:underline font-medium">Token Comparator</Link> — compare two JWTs character-by-character with visual diff and security audit.{' '}
          <Link href="/base64-encoder" className="text-blue-600 hover:underline font-medium">Base64 Encoder</Link> — decode JWT parts (header/payload) manually.{' '}
          <Link href="/log-unpacker" className="text-blue-600 hover:underline font-medium">Log Unpacker</Link> — decode JWTs found in log lines.{' '}
          <Link href="/code-prompt-shield" className="text-blue-600 hover:underline font-medium">Code Prompt Shield</Link> — mask tokens and secrets before sharing code with AI.
        </p>
      </article>
    </>
  );
}
