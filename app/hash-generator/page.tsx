import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import HashGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/hash-generator';

export const metadata: Metadata = {
  title: 'Free Hash Generator — MD5, SHA-256 & HMAC Online | UnblockDevs',
  description:
    'Generate and verify MD5, SHA-256, SHA3, BLAKE2 hashes. Drag-and-drop file checksums, HMAC for API signing, bcrypt and Argon2 password hashing — all 100% in your browser. Files never leave your device.',
  keywords: [
    'md5 generator online',
    'sha256 generator online',
    'hash generator online',
    'file hash checker online',
    'hmac generator online',
    'hmac sha256 generator',
    'bcrypt generator online',
    'argon2 hash generator',
    'checksum calculator online',
    'what is the difference between md5 and sha256',
    'bcrypt vs argon2',
    'verify file hash online',
  ],
  openGraph: {
    title: 'Free Hash Generator — MD5, SHA-256, File Hash, HMAC & bcrypt/Argon2 | UnblockDevs',
    description: 'Generate MD5, SHA-256, SHA3, and BLAKE2 hashes online. Drag-drop files for checksum verification, create HMAC for API signing, and hash passwords with bcrypt or Argon2. 100% browser-based, files never leave your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Hash%20Generator&emoji=%F0%9F%94%90&desc=Generate%20MD5%2C%20SHA-256%2C%20SHA-512%20and%20HMAC%20hashes%20online', width: 1200, height: 630, alt: 'Hash Generator — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator — MD5, SHA-256, File, HMAC & bcrypt/Argon2 | UnblockDevs',
    description: 'Verify checksums, HMAC, password hashes. 100% in your browser. Files never leave your device.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hash Generator — MD5, SHA-256, File Hash, HMAC & Password Hashing',
  url: canonicalUrl,
  description: 'Generate MD5, SHA-256, SHA3, BLAKE2. File drag-and-drop. HMAC, bcrypt, Argon2. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'MD5, SHA-1, SHA-256, SHA3, BLAKE2 and more',
    'File hash with drag-and-drop',
    'Hash verification mode',
    'HMAC generation for APIs and webhooks',
    'Password hashing: bcrypt, Argon2, PBKDF2, scrypt',
    '100% client-side — no data leaves your device',
  ],};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I verify a SHA-256 checksum?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to File mode, drag your downloaded file in, select SHA-256, and compare the output to the checksum on the download page. An exact match means the file is genuine.' } },
    { '@type': 'Question', name: 'What is the difference between MD5 and SHA-256?', acceptedAnswer: { '@type': 'Answer', text: 'MD5 is 128-bit and cryptographically broken — do not use it for security. SHA-256 is 256-bit and the current recommended standard. Use SHA-256 or SHA-3 for any security-sensitive use case.' } },
    { '@type': 'Question', name: 'How do I verify a GitHub or Stripe webhook signature with HMAC?', acceptedAnswer: { '@type': 'Answer', text: 'Both GitHub and Stripe sign webhook payloads with HMAC-SHA256. Compute HMAC-SHA256 of the raw request body using your webhook secret as the key, then compare the result to the signature in the request header (X-Hub-Signature-256 for GitHub, Stripe-Signature for Stripe). Use the HMAC tab in Hash Generator to compute and verify signatures without writing code.' } },
    { '@type': 'Question', name: 'bcrypt vs Argon2 — which should I use?', acceptedAnswer: { '@type': 'Answer', text: 'Both resist brute force. Argon2 won the Password Hashing Competition in 2015 and is recommended for new applications. bcrypt remains widely used and secure for existing systems.' } },
    { '@type': 'Question', name: 'Why should I not use SHA-256 directly to hash user passwords?', acceptedAnswer: { '@type': 'Answer', text: 'SHA-256 is designed to be fast — modern GPUs can compute billions of SHA-256 hashes per second, making brute force and rainbow table attacks practical. Password hashing algorithms like bcrypt and Argon2 are intentionally slow (thousands of iterations) and include automatic salting, making them computationally infeasible to crack even with GPU hardware.' } },
    { '@type': 'Question', name: 'Can I reverse a hash?', acceptedAnswer: { '@type': 'Answer', text: 'No. Cryptographic hashes are one-way functions — you cannot compute the original input from the hash output. Only brute force or rainbow table attacks can crack weak passwords. Strong passwords with proper salt are computationally infeasible to crack.' } },
    { '@type': 'Question', name: 'How do I verify a file\'s integrity using its checksum?', acceptedAnswer: { '@type': 'Answer', text: 'Download the file, then drag it into the Hash Generator in File mode. Select SHA-256 (or whichever algorithm the publisher used) and compare the output to the published checksum. Any difference means the file may be corrupted or tampered with.' } },
    { '@type': 'Question', name: 'What is the difference between SHA-256 and SHA-512?', acceptedAnswer: { '@type': 'Answer', text: 'SHA-256 produces a 256-bit (32 byte) digest; SHA-512 produces a 512-bit (64 byte) digest. Both are secure. SHA-512 is slightly faster on 64-bit processors but produces a longer output. SHA-256 is the most commonly used standard.' } },
    { '@type': 'Question', name: 'How do I generate a SHA-256 hash in JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Use the Web Crypto API: const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)); then convert to hex with Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2,"0")).join("").' } },
    { '@type': 'Question', name: 'How do I generate an MD5 hash in Python?', acceptedAnswer: { '@type': 'Answer', text: 'import hashlib; hashlib.md5(b"hello").hexdigest(). For SHA-256: hashlib.sha256(b"hello").hexdigest(). For files: hash a file in chunks using hashlib.sha256() with file.read(65536) in a loop.' } },
    { '@type': 'Question', name: 'What is Argon2 and why is it better than MD5 for passwords?', acceptedAnswer: { '@type': 'Answer', text: 'Argon2 is a memory-hard password hashing algorithm designed to resist GPU and ASIC attacks. MD5 is a general-purpose hash — extremely fast and computationally cheap, making it trivial to brute-force passwords. Never use MD5 or SHA-256 directly to hash passwords; always use bcrypt, Argon2, or scrypt.' } },
    { '@type': 'Question', name: 'Is it safe to hash files in the browser?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool uses the Web Crypto API built into your browser. Files are read locally using JavaScript and never uploaded to any server. Even very large files (up to several GB) are processed entirely on your device.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Hash Online',
  description: 'Step-by-step guide to generating MD5, SHA-1, SHA-256, and other hashes.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your input text', text: 'Type or paste the string you want to hash into the input box. Hash values update instantly as you type.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose a hash algorithm', text: 'Select MD5, SHA-1, SHA-256, SHA-384, SHA-512, or HMAC depending on your use case. SHA-256 is recommended for security.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy the hash output', text: 'The hash digest is shown in hex and Base64 format. Click Copy to copy it to your clipboard.' },
    { '@type': 'HowToStep', position: 4, name: 'Verify or compare hashes', text: 'Paste a known hash in the verify field to check if two inputs produce the same digest — useful for integrity checks.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Hash Generator', item: canonicalUrl },
  ],
};

export default function HashGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HashGeneratorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Hash Generator?">
          <SEOProse>
            A hash generator turns any input — text or file — into a fixed-length fingerprint called a{' '}
            <strong>hash</strong> or <strong>checksum</strong>. The same input always produces the same hash; a
            single-bit change produces a completely different one. Hashes are used for integrity checks,
            digital signatures, password storage, API signing, and verifying downloads.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate Any Hash in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste text or drop a file', desc: 'Type directly, paste a string, or drag a file of any size into the File tab.' },
            { n: '02', title: 'Pick an algorithm', desc: 'Choose MD5, SHA-256, SHA3, BLAKE2, HMAC, bcrypt, Argon2, and more.' },
            { n: '03', title: 'Copy the hash', desc: 'Output updates instantly. Copy the hex, Base64, or binary result.' },
            { n: '04', title: 'Verify with one click', desc: 'Paste an expected hash into Verify mode for constant-time comparison.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When to Use Each Hash Algorithm">
          <UseCases cases={[
            { icon: '✅', title: 'Verify File Downloads', desc: 'Drop a file in File mode, select SHA-256, compare against the published checksum.' },
            { icon: '🔑', title: 'API & Webhook Signing', desc: 'Use HMAC-SHA256 to sign request payloads and verify GitHub, Stripe, or Shopify webhooks.' },
            { icon: '🔒', title: 'Password Hashing', desc: 'Hash passwords with bcrypt or Argon2 — slow by design, salted, and resistant to brute force.' },
            { icon: '🗂️', title: 'Content ETags', desc: 'Generate MD5 or SHA-1 checksums for cache ETag headers.' },
            { icon: '🛡️', title: 'Data Integrity', desc: 'Hash config files or build artifacts to detect unauthorized changes.' },
            { icon: '📊', title: 'Deduplication', desc: 'Use SHA-256 to fingerprint data blobs and deduplicate storage.' },
          ]} />
        </SEOSection>

        {/* Algorithm guide */}
        <SEOSection id="algorithms" heading="MD5 vs SHA-1 vs SHA-256 vs SHA3 vs BLAKE2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Algorithm</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Output</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Security</th>
                  <th className="pb-3 font-semibold text-zinc-700">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['MD5', '128-bit', '❌ Broken', 'Cache keys, non-security ETags'],
                  ['SHA-1', '160-bit', '⚠️ Deprecated', 'Legacy only'],
                  ['SHA-256', '256-bit', '✅ Recommended', 'File verification, signing, TLS'],
                  ['SHA3-256', '256-bit', '✅ Modern', 'SHA-2 alternative'],
                  ['BLAKE2b', '256–512-bit', '✅ Fast & secure', 'Performance-critical hashing'],
                  ['bcrypt', 'variable', '✅ For passwords', 'Password storage'],
                  ['Argon2', 'variable', '✅ Best-in-class', 'New app password hashing'],
                ].map(([alg, out, sec, use]) => (
                  <tr key={alg}>
                    <td className="py-3 pr-4 font-mono font-medium text-zinc-900">{alg}</td>
                    <td className="py-3 pr-4 text-zinc-600">{out}</td>
                    <td className="py-3 pr-4">{sec}</td>
                    <td className="py-3 text-zinc-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* HMAC */}
        <SEOSection id="hmac" heading="HMAC for API Signing and Webhook Verification">
          <SEOProse>
            <strong>HMAC</strong> (Hash-based Message Authentication Code) combines a message with a secret
            key to produce a value only the key-holder can reproduce. Platforms like GitHub, Stripe, Shopify,
            and Twilio sign webhook payloads with <C>HMAC-SHA256</C>. Paste the payload and your secret into
            the HMAC tab to generate or verify a signature — all without sending your secret to any server.
          </SEOProse>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I verify a downloaded file\'s SHA-256 checksum?',
              a: 'Switch to File mode, drag your downloaded file in, select SHA-256. Compare the output against the checksum on the download page. Use Verify mode to paste the expected checksum and have the comparison done for you.',
            },
            {
              q: 'What is the difference between MD5 and SHA-256?',
              a: 'MD5 is 128-bit and cryptographically broken — collision attacks exist. SHA-256 is 256-bit and the current recommended standard for file verification, signing, and TLS. Use SHA-256 for all security-related hashing.',
            },
            {
              q: 'How do I verify a GitHub or Stripe webhook signature with HMAC?',
              a: 'Both GitHub and Stripe sign webhook payloads with HMAC-SHA256. Compute HMAC-SHA256 of the raw request body using your webhook secret as the key, then compare against the signature in the request header. Use the HMAC tab in Hash Generator to compute and verify signatures without writing code.',
            },
            {
              q: 'bcrypt vs Argon2 — which should I use for passwords?',
              a: 'Both are slow, salted, and brute-force-resistant. Argon2 won the Password Hashing Competition in 2015 and is the current recommendation for new applications. bcrypt is still widely used and secure. Never use MD5 or plain SHA-256 for passwords.',
            },
            {
              q: 'Is it safe to hash sensitive files or text here?',
              a: 'Yes. All hashing runs entirely in your browser using the Web Crypto API. Your files and text are never uploaded or sent to any server.',
            },
            {
              q: 'Why should I not use SHA-256 directly to hash user passwords?',
              a: 'SHA-256 is designed to be fast — modern GPUs can compute billions of hashes per second, making brute force practical. Password hashing algorithms like bcrypt and Argon2 are intentionally slow and automatically add a unique salt per password, making them computationally infeasible to crack even with GPU hardware.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/password-generator', label: 'Password Generator', desc: 'Create strong, secure passwords and passphrases', icon: '🔑' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode hash output from hex to Base64', icon: '🔤' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'JWTs use HMAC or RSA for signing — decode them', icon: '🪙' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare hash values character-by-character', icon: '🔍' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Hashing & Security Guide' },
            { href: '/blog/json-best-practices-production-guide', label: 'API Security Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Encoding in REST APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging Data Integrity' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="hash_generator" />
    </>
  );
}
