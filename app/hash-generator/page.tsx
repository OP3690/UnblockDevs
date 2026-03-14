import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import HashGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/hash-generator';

export const metadata: Metadata = {
  title:
    'Hash Generator — MD5, SHA-256, SHA3, BLAKE2, File Hash Checker, HMAC & Password Hashing (bcrypt, Argon2) Online Free | UnblockDevs',
  description:
    'Generate MD5, SHA-256, SHA3, BLAKE2 hashes. Verify file checksums, create HMAC signatures, and generate bcrypt/Argon2 password hashes — all free, 100% browser-based. Files never leave your device.',
  keywords: [
    'md5 generator online',
    'sha256 generator online',
    'hash generator online',
    'md5 hash generator',
    'sha256 hash generator',
    'sha256 checksum generator',
    'file hash checker online',
    'verify file hash online',
    'hmac generator online',
    'hmac sha256 generator',
    'bcrypt generator online',
    'argon2 hash generator',
    'checksum calculator online',
    'verify download sha256',
    'what is the difference between md5 and sha256',
    'how to verify a sha256 checksum',
    'bcrypt vs argon2',
    'is md5 safe to use',
    'Hash Generator',
  ],
  openGraph: {
    title: 'Hash Generator — MD5, SHA-256, File Hash, HMAC & Password Hashing Online Free | UnblockDevs',
    description:
      'Generate MD5, SHA-256, SHA3, BLAKE2. Verify file checksums, HMAC, bcrypt/Argon2. 100% browser-based. Files never leave your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator — MD5, SHA-256, File Hash, HMAC & bcrypt/Argon2 Online Free | UnblockDevs',
    description: 'Verify file checksums, HMAC, password hashes. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hash Generator — MD5, SHA-256, SHA3, BLAKE2, File Hash, HMAC & Password Hashing',
  description:
    'Generate and verify MD5, SHA-256, SHA3, BLAKE2 hashes. File hash checker, HMAC, bcrypt, Argon2, PBKDF2, scrypt. Compare hashes, verify checksums. 100% browser-based. Files never leave your device.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'MD5, SHA-1, SHA-256, SHA3, BLAKE2 and more',
    'File hash with drag-and-drop',
    'Hash verification mode',
    'HMAC generation for APIs and webhooks',
    'Password hashing: bcrypt, Argon2, PBKDF2, scrypt',
    'Compare two hashes securely',
    '100% client-side — no data leaves your device',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I verify a downloaded file SHA-256 checksum?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Switch to File mode in the Hash Generator at unblockdevs.com/hash-generator, drag your file in, and select SHA-256. Compare the output against the checksum on the download page. An exact match confirms the file is genuine and unmodified.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between MD5 and SHA-256?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'MD5 produces a 128-bit hash and is cryptographically broken — known collision attacks exist. SHA-256 produces a 256-bit hash and is the current recommended standard for security purposes. Use SHA-256 for file verification and signing. MD5 is only acceptable for non-security uses like cache keys.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is HMAC used for?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'HMAC adds a secret key to a hash so only someone with the same key can reproduce the value. Use it for API request signing, webhook payload verification, and anywhere you need to prove both data integrity and authenticity.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between bcrypt and Argon2 for password hashing?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Both are slow password hashing algorithms designed to resist brute force attacks. Argon2 won the Password Hashing Competition in 2015 and is the current recommendation for new applications. bcrypt is still secure and widely supported. Never use MD5 or SHA-256 alone for password storage.',
      },
    },
  ],
};

export default function HashGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <HashGeneratorClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="hash-heading">
        <h1 id="hash-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Hash Generator — MD5, SHA-256, SHA3, BLAKE2, File Hash Checker, HMAC &amp; Password Hashing (bcrypt, Argon2) Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Generate and verify cryptographic hashes (MD5, SHA-1, SHA-256, SHA3, BLAKE2), hash files, create HMACs and
          password hashes (bcrypt, Argon2, PBKDF2, scrypt). Compare hashes, check security strength, and export results.
          All processing runs in your browser — no data leaves your device.
        </p>
        <p className="flex flex-wrap gap-3">
          <TrackedCtaLink href="#tool" toolName="hash_generator" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
            Use the tool →
          </TrackedCtaLink>
          <Link href="#what-is-hash" className="inline-block text-sm text-gray-600 hover:text-gray-900">
            Learn more about hashes
          </Link>
        </p>
      </article>

      {/* SEO content — detailed guide to rank for hash-related queries */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-gray-200">
        <h2 id="what-is-hash" className="text-xl font-bold text-gray-900 mt-0 mb-4">
          What is a Hash Generator?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A <strong>hash generator</strong> (or cryptographic hash calculator) turns any input—text or file—into a fixed-length string called a <strong>hash</strong> or <strong>checksum</strong>. The same input always produces the same hash; a tiny change in the input produces a completely different hash. Hash generators are used for integrity checks, digital signatures, password storage, and verifying downloads.
        </p>

        <h2 id="hash-algorithms" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Hash Algorithms: MD5, SHA-1, SHA-256, SHA3, BLAKE2
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Different algorithms offer different security and output sizes:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li><strong>MD5</strong> — 128-bit output. Fast but <strong>cryptographically broken</strong>; avoid for security. Still used for non-security checksums (e.g. cache keys).</li>
          <li><strong>SHA-1</strong> — 160-bit. Deprecated for security (collision attacks). Prefer SHA-256 or SHA3 for new use.</li>
          <li><strong>SHA-256</strong> — 256-bit, part of the SHA-2 family. <strong>Recommended</strong> for most uses: file verification, signing, TLS. Widely supported.</li>
          <li><strong>SHA-384 / SHA-512</strong> — Longer SHA-2 variants. Use when you need larger output or extra margin.</li>
          <li><strong>SHA3-256 / SHA3-512</strong> — SHA-3 (Keccak). Secure and modern; good alternative to SHA-2.</li>
          <li><strong>BLAKE2b / BLAKE2s</strong> — Fast and secure. Used in many protocols and password hashing (e.g. Argon2).</li>
        </ul>

        <h2 id="file-hash" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          File Hash Checker &amp; Verification
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A <strong>file hash checker</strong> computes the hash of an entire file. Use it to <strong>verify downloads</strong>: compare the hash you get with the one published by the provider (e.g. SHA-256 on a software release page). If they match, the file is unchanged. This tool supports drag-and-drop and any file size; hashes are computed in your browser so the file never leaves your device.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          How to Verify a Downloaded File&apos;s SHA-256 Checksum
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Switch to <strong>File</strong> mode, drag your downloaded file in, and select SHA-256. Copy the output hash and compare it (character-for-character) against the checksum published on the download page. An exact match means the file is genuine and unmodified. Use the tool&apos;s <strong>Verify</strong> mode to paste the expected checksum and have the comparison done for you in constant time.
        </p>

        <h2 id="hash-verification" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Hash Verification Tool
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>hash verification</strong> mode lets you paste content and an <strong>expected hash</strong> (e.g. SHA-256). The tool hashes your input and compares it to the expected value in constant time, telling you whether the content matches—ideal for checking installers, firmware, or config files against published checksums.
        </p>

        <h2 id="hmac" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          HMAC Generator for APIs &amp; Signatures
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>HMAC</strong> (Hash-based Message Authentication Code) produces a keyed hash: only someone with the same secret key can reproduce the same value. Use an <strong>HMAC generator</strong> for API request signing, webhook verification, or integrity+authenticity together. This tool supports HMAC with MD5, SHA-1, SHA-256, SHA3, and BLAKE2.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          HMAC for API Signing and Webhook Verification
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Many platforms (GitHub, Stripe, Shopify, Twilio) use HMAC SHA-256 to sign webhooks. You receive a payload and a signature header; you recompute HMAC with your shared secret and compare it to the header in constant time. Use this tool&apos;s <strong>HMAC</strong> tab to generate or verify HMAC signatures — paste the payload and secret to get the expected signature, or use <strong>Verify</strong> to check a hash against an expected value.
        </p>

        <h2 id="password-hashing" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Password Hashing: bcrypt, Argon2, PBKDF2, scrypt
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Storing passwords requires <strong>password hashing</strong>, not plain cryptographic hashes. This tool can generate <strong>bcrypt</strong>, <strong>Argon2</strong>, <strong>PBKDF2</strong>, and <strong>scrypt</strong> hashes. These algorithms are slow by design to resist brute force. Use Argon2 or bcrypt for new applications; add a random <strong>salt</strong> (the tool includes a salt generator) to prevent rainbow table attacks.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          bcrypt vs Argon2 — Which Password Hash to Use in 2025
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Both are slow, memory-hard (or configurable) and designed to resist brute force. <strong>Argon2</strong> won the Password Hashing Competition in 2015 and is the current recommendation for new applications (e.g. OWASP, modern libs). <strong>bcrypt</strong> is still secure and widely supported. Prefer Argon2 when you can; bcrypt is fine for existing systems. Never use MD5 or plain SHA-256 for password storage — they are too fast and vulnerable to brute force and rainbow tables.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          MD5 Is Broken — When It&apos;s Still Safe to Use
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          MD5 is <strong>cryptographically broken</strong>: collision attacks exist, so two different inputs can produce the same hash. Do not use MD5 for security (signatures, passwords, or integrity where an attacker could craft inputs). It is still acceptable for non-security uses: cache keys, ETags, or internal checksums where collision resistance is not required. For any security-related use, switch to SHA-256 or SHA3.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          How to Compare Two Hashes Securely
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Comparing hashes with a simple string equality can leak timing information (character-by-character comparison stops at the first mismatch). Use <strong>constant-time comparison</strong> so the time taken does not depend on where the hashes differ. This tool&apos;s <strong>Verify</strong> and <strong>Compare</strong> modes use constant-time comparison, so you can safely check checksums or HMAC signatures without timing side channels.
        </p>

        <h2 id="checksum" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Checksum vs Hash
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          In practice, <strong>checksum</strong> and <strong>hash</strong> are often used interchangeably. Technically, a checksum can be a simple sum (e.g. for error detection); a <strong>cryptographic hash</strong> is one-way and collision-resistant. When you see “SHA-256 checksum” on a download page, it means the SHA-256 hash of the file—use this tool to compute it and verify.
        </p>

        <h2 id="privacy" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Privacy &amp; Security
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This hash generator runs entirely in your browser. Your input and files are never sent to our servers; hashes are computed locally. No data is stored. Use it for sensitive content, passwords (when generating hashes), or large files without privacy concerns.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">How do I verify a downloaded file&apos;s SHA-256 checksum?</dt>
            <dd className="text-gray-700 mt-1">
              Switch to File mode, drag your downloaded file in, and select SHA-256. Copy the output hash and compare it against the checksum published on the download page. An exact match means the file is genuine and unmodified.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between MD5 and SHA-256?</dt>
            <dd className="text-gray-700 mt-1">
              MD5 produces a 128-bit hash and is cryptographically broken — collision attacks exist. SHA-256 produces a 256-bit hash and is the current recommended standard. Use SHA-256 for security purposes. MD5 is still acceptable for non-security uses like cache keys.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is HMAC and when do I need it?</dt>
            <dd className="text-gray-700 mt-1">
              HMAC (Hash-based Message Authentication Code) adds a secret key to a hash so only someone with the same key can reproduce the value. Use it for API request signing, webhook payload verification, and any case where you need to prove both integrity and authenticity.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between bcrypt and Argon2?</dt>
            <dd className="text-gray-700 mt-1">
              Both are slow password hashing algorithms designed to resist brute force. Argon2 is newer, won the Password Hashing Competition in 2015, and is the current recommendation for new applications. bcrypt is still widely used and secure. Avoid MD5 or SHA-256 for password storage — they are too fast and vulnerable to brute force.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Is it safe to hash sensitive files online?</dt>
            <dd className="text-gray-700 mt-1">
              Yes, with this tool. All hashing runs entirely in your browser — your files and text are never uploaded or sent to any server. The hashing computation happens locally using the Web Crypto API.
            </dd>
          </div>
        </dl>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Related Tools</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          <Link href="/password-generator" className="text-primary-600 hover:underline font-medium">Password Generator</Link> — create secure passwords and passphrases.{' '}
          <Link href="/base64-encoder" className="text-primary-600 hover:underline font-medium">Base64 Encoder</Link> — encode hash output (e.g. hex to Base64).{' '}
          <Link href="/jwt-decoder" className="text-primary-600 hover:underline font-medium">JWT Decoder</Link> — JWTs often use HMAC for signing.{' '}
          <Link href="/token-comparator" className="text-primary-600 hover:underline font-medium">Token Comparator</Link> — compare hash values character-by-character.
        </p>
      </article>
    </>
  );
}
