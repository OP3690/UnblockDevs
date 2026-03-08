import type { Metadata } from 'next';
import Link from 'next/link';
import HashGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Hash Generator — MD5, SHA256, SHA3, BLAKE2, File Hash, HMAC | UnblockDevs',
  description:
    'Generate and verify cryptographic hashes: MD5, SHA-1, SHA-256, SHA3, BLAKE2. File hashing, HMAC, bcrypt, Argon2, PBKDF2. Live hashing, verification, security analyzer. 100% in your browser.',
  keywords: [
    'hash generator',
    'md5 generator',
    'sha256 generator',
    'file hash checker',
    'hash verification tool',
    'HMAC generator',
    'bcrypt',
    'checksum',
  ],
  openGraph: {
    title: 'Hash Generator — UnblockDevs',
    description: 'MD5, SHA256, SHA3, BLAKE2, file hash, HMAC, password hashes. Verify and compare. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/hash-generator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/hash-generator',
  },
};

export default function HashGeneratorPage() {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="hash-heading">
        <h1 id="hash-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Hash Generator &amp; Analyzer
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Generate and verify cryptographic hashes (MD5, SHA-1, SHA-256, SHA3, BLAKE2), hash files, create HMACs and
          password hashes (bcrypt, Argon2, PBKDF2, scrypt). Compare hashes, check security strength, and export results.
          All processing runs in your browser — no data leaves your device.
        </p>
        <p className="flex flex-wrap gap-3">
          <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
            Use the tool →
          </Link>
          <Link href="#what-is-hash" className="inline-block text-sm text-gray-600 hover:text-gray-900">
            Learn more about hashes
          </Link>
        </p>
      </article>
      <div id="tool">
        <HashGeneratorClient />
      </div>

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

        <h2 id="password-hashing" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Password Hashing: bcrypt, Argon2, PBKDF2, scrypt
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Storing passwords requires <strong>password hashing</strong>, not plain cryptographic hashes. This tool can generate <strong>bcrypt</strong>, <strong>Argon2</strong>, <strong>PBKDF2</strong>, and <strong>scrypt</strong> hashes. These algorithms are slow by design to resist brute force. Use Argon2 or bcrypt for new applications; add a random <strong>salt</strong> (the tool includes a salt generator) to prevent rainbow table attacks.
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

        <p className="text-gray-600 text-sm mt-8">
          Keywords: hash generator, md5 generator, sha256 generator, file hash checker, hash verification tool, HMAC generator, checksum calculator, password hash generator, bcrypt, Argon2, SHA3, BLAKE2.
        </p>
      </article>
    </>
  );
}
