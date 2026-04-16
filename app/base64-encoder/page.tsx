import type { Metadata } from 'next';
import Link from 'next/link';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import Base64EncoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/base64-encoder';

export const metadata: Metadata = {
  title: 'Base64 Encoder Decoder — Standard, Base64URL, MIME & No-Padding Online Free | UnblockDevs',
  description:
    'Encode or decode Base64 in 4 variants: Standard, Base64URL, MIME, No-Padding. Auto-detects JWTs, images, JSON. File upload up to 50 MB. Security scanner. 100% browser-based — nothing sent to servers.',
  keywords: [
    'base64 encoder decoder', 'base64 encode online', 'base64 decode online',
    'base64 encoder online free', 'base64url encoder', 'base64url decoder',
    'image to base64 converter', 'base64 encode http basic auth',
    'mime base64 encoder', 'base64 security checker', 'what is base64 encoding',
    'how to encode base64 online', 'is base64 the same as encryption',
    // extended keyword cluster
    'base64 encode decode online', 'base64 encoder free', 'base64 decode string',
    'base64 encode file', 'base64 encode image', 'base64 to text', 'text to base64',
    'base64 encode javascript', 'base64 decode javascript', 'atob btoa javascript',
    'base64 url safe', 'base64url encode decode', 'jwt base64 decode',
    'base64 encode api', 'base64 encode curl', 'base64 encode python', 'base64 decode python',
    'python base64', 'java base64 encode', 'base64 encode c#', 'base64 encode golang',
    'base64 encode binary', 'base64 encode utf8', 'base64 encode unicode',
    'base64 file to text', 'base64 image data uri', 'base64 css background',
    'base64 email attachment mime', 'base64 mime encode', 'no padding base64',
    'base64 without padding', 'base64 vs hex encoding', 'base64 decode error fix',
    'base64 invalid character', 'base64 online tool free', 'base64 encode no signup',
    'base64 decoder browser', 'base64 encode node js', 'basic auth header base64',
    'base64 encode authorization header', 'base64 private no server',
    'base64 alphabet characters', 'base64 padding equals sign',
    'base64 encode large file', 'base64 50mb file', 'base64 encode file upload',
    'decode base64 string', 'base64 encode credentials', 'encode decode online free',
    'base64 rfc 4648', 'base64 string to text', 'base64 encode password',
  ],
  openGraph: {
    title: 'Base64 Encoder Decoder — Standard, Base64URL, MIME & No-Padding | UnblockDevs',
    description: 'Encode/decode Base64 in 4 variants. Auto-detect JWT, images. 50 MB files. Security scanner. 100% in-browser.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Base64 Encoder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder Decoder — All Variants Online Free | UnblockDevs',
    description: 'Standard, Base64URL, MIME, No-Padding. Auto-detect JWT, images. 50 MB files. 100% in browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Base64 Encoder Decoder',
  url: canonicalUrl,
  description: 'Encode or decode Base64 in Standard, Base64URL, MIME, No-Padding. Auto-detect JWT, images, JSON. File upload 50 MB. Security scanner. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Standard, Base64URL, MIME, No-Padding encoding and decoding',
    'Auto content-type detection (JWT, image, JSON, URL)',
    'Base64 image preview in browser',
    'File encoding up to 50 MB',
    'Built-in security scanner for secrets and PII',
    '100% browser-based, zero data transmission',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1320',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Base64 encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 converts binary or text data into ASCII characters (A–Z, a–z, 0–9, +, /) for safe use in JSON, URLs, or email. Each group of 3 bytes becomes 4 characters.' } },
    { '@type': 'Question', name: 'What is the difference between Base64 and Base64URL?', acceptedAnswer: { '@type': 'Answer', text: 'Standard Base64 uses + and / with optional = padding. Base64URL replaces + with - and / with _ and omits padding, making it safe in URLs and JWTs.' } },
    { '@type': 'Question', name: 'Is Base64 the same as encryption?', acceptedAnswer: { '@type': 'Answer', text: 'No. Base64 is encoding, not encryption. Anyone can decode it instantly. Never rely on Base64 for security.' } },
    { '@type': 'Question', name: 'Is it safe to paste sensitive data here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Everything runs in your browser. Nothing is uploaded to any server. Your data never leaves your device.' } },
    { '@type': 'Question', name: 'How do I encode HTTP Basic Auth credentials in Base64?', acceptedAnswer: { '@type': 'Answer', text: 'Format credentials as username:password (e.g. alice:s3cr3t), paste into the tool, choose Encode → Standard. Copy the result and prefix it with "Basic " in your Authorization header.' } },
    { '@type': 'Question', name: 'How do I decode a JWT token using Base64?', acceptedAnswer: { '@type': 'Answer', text: 'JWTs have three dot-separated parts; the header and payload are Base64URL-encoded. Paste the full JWT or one part, select Decode → Base64URL. For full JWT validation use the JWT Decoder tool.' } },
    { '@type': 'Question', name: 'Can I encode large files to Base64 in the browser?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — up to 50 MB. Files over 5 MB are processed in a background task so the page stays responsive.' } },
    { '@type': 'Question', name: 'Why does Base64 output end with = or ==?', acceptedAnswer: { '@type': 'Answer', text: '= padding makes the string length a multiple of 4 so decoders work correctly. One = means 2 padding bytes are needed; == means 1. Base64URL and No-Padding variants omit them.' } },
    { '@type': 'Question', name: 'How do I encode an image to Base64 for HTML or CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to File mode, drag and drop your image (PNG, JPG, GIF, WebP, SVG). The result can be used as data:image/png;base64,<result> in an img src or CSS background-image: url(...).' } },
    { '@type': 'Question', name: 'What is MIME Base64 used for?', acceptedAnswer: { '@type': 'Answer', text: 'MIME Base64 wraps output at 76 characters per line, which is required for email attachments (RFC 2045). Choose the MIME variant when encoding files for email clients.' } },
    { '@type': 'Question', name: 'How do I encode Base64 in JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Use btoa() for ASCII strings: btoa("hello") → "aGVsbG8=". For binary data use TextEncoder + Uint8Array. For Base64URL use the Web Crypto API or replace +/ with -_ and strip = padding.' } },
    { '@type': 'Question', name: 'What is the difference between Base64 and hex encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Both represent binary data as ASCII. Hex uses 2 characters per byte (16 symbols: 0-9, a-f), making output 2× larger than input. Base64 uses 4 characters per 3 bytes (~33% overhead), making it more compact. Base64 is used for text transport; hex is common in cryptography and debugging.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Encode or Decode Base64 Online',
  description: 'Step-by-step guide to encoding and decoding Base64 text, files, and images.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose Encode or Decode', text: 'Select Encode to convert text or binary to Base64, or Decode to reverse Base64 back to the original.' },
    { '@type': 'HowToStep', position: 2, name: 'Select the Base64 variant', text: 'Choose Standard, Base64URL, MIME, or No-Padding depending on your use case (JWTs use Base64URL).' },
    { '@type': 'HowToStep', position: 3, name: 'Paste your input or upload a file', text: 'Type or paste text, or drag and drop a file (up to 50 MB) into the input area. The output updates instantly.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the result', text: 'Click Copy to copy the encoded or decoded output to your clipboard. Use Download for binary files.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Base64 Encoder', item: canonicalUrl },
  ],
};

export default function Base64EncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Base64EncoderClient />

      <ToolSEOContent>
        {/* What & Why */}
        <SEOSection id="what" heading="What Is a Base64 Encoder Decoder?">
          <SEOProse>
            A Base64 encoder decoder converts binary or text data into a portable ASCII string — and back again.
            Base64 is used everywhere: HTTP Basic Auth headers, JWT tokens, data URIs in HTML/CSS, email
            attachments (MIME), and API payloads. This tool handles all four variants in one place:{' '}
            <strong>Standard</strong> (RFC 4648), <strong>Base64URL</strong> (safe in URLs and tokens),{' '}
            <strong>MIME</strong> (line-wrapped for email), and <strong>No-Padding</strong>.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Encode or Decode in 4 Steps">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or upload', desc: 'Type text, paste a Base64 string, or drag a file. The tool auto-detects JWT, image, and JSON content.' },
            { n: '02', title: 'Pick a mode', desc: 'Choose Encode or Decode. Select a variant: Standard, Base64URL, MIME, or No-Padding.' },
            { n: '03', title: 'See instant output', desc: 'Output updates automatically. Images are previewed live. JWTs link to the JWT Decoder.' },
            { n: '04', title: 'Copy or export', desc: 'Click Copy or download the result. Use the security scanner to check for secrets before sharing.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Base64">
          <UseCases cases={[
            { icon: '🔐', title: 'HTTP Basic Auth', desc: 'Encode username:password as Base64 for the Authorization: Basic header.' },
            { icon: '🪙', title: 'JWT Decoding', desc: 'JWT header and payload are Base64URL-encoded. Decode them to inspect claims.' },
            { icon: '🖼️', title: 'Image Data URIs', desc: 'Convert PNG/JPG/SVG to Base64 for inline use in HTML <img> or CSS background-image.' },
            { icon: '📧', title: 'Email Attachments', desc: 'MIME Base64 (line-wrapped at 76 chars) is the standard for email attachment encoding.' },
            { icon: '🔗', title: 'URL-safe Tokens', desc: 'Base64URL avoids + / = so tokens survive in URLs and query strings unchanged.' },
            { icon: '🔍', title: 'Secret Detection', desc: 'Run the built-in security scanner to flag passwords, API keys, and PII in any string.' },
          ]} />
        </SEOSection>

        {/* Base64 vs Base64URL */}
        <SEOSection id="variants" heading="Base64 vs Base64URL — Key Differences">
          <SEOProse>
            Standard Base64 uses <C>+</C> and <C>/</C> with <C>=</C> padding — these characters are percent-encoded
            in URLs, breaking tokens. <strong>Base64URL</strong> replaces <C>+</C> with <C>-</C> and <C>/</C> with{' '}
            <C>_</C> and omits padding, so the result is safe in URLs, JWTs, and OAuth tokens with no escaping
            needed. Choose Base64URL for any token or query-string value; use Standard for general encoding.
          </SEOProse>
        </SEOSection>

        {/* Images */}
        <SEOSection id="images" heading="How to Encode an Image to Base64 for HTML or CSS">
          <SEOProse>
            Switch to <strong>File</strong> mode, drag and drop your image (PNG, JPG, GIF, WebP, SVG), and the tool
            reads it entirely in your browser. The output is the raw Base64 string. Use it as{' '}
            <C>data:image/png;base64,&lt;result&gt;</C> in an <C>img src</C> or CSS{' '}
            <C>background-image: url(...)</C>. Switch to <strong>Image</strong> mode to paste any Base64 string and
            see a live preview.
          </SEOProse>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is Base64 encoding?',
              a: 'Base64 converts binary or text data into ASCII characters (A–Z, a–z, 0–9, +, /) for safe transport in JSON, URLs, or email. Every 3 bytes become 4 characters; = padding fills the remainder.',
            },
            {
              q: 'What is the difference between Base64 and Base64URL?',
              a: 'Standard Base64 uses + and / with optional = padding. Base64URL replaces + with - and / with _ and omits padding, making it safe in URLs, query strings, and JWT tokens without percent-encoding.',
            },
            {
              q: 'Is Base64 the same as encryption?',
              a: 'No. Base64 is encoding, not encryption. It converts binary to ASCII for safe transport but provides zero security — anyone can decode it instantly. Never use Base64 alone to protect sensitive data.',
            },
            {
              q: 'How do I encode HTTP Basic Auth credentials in Base64?',
              a: 'Format credentials as username:password (e.g. alice:s3cr3t), paste into the tool, choose Encode → Standard. Copy the result and prefix it with "Basic " in your Authorization header.',
            },
            {
              q: 'How do I decode a JWT token using Base64?',
              a: 'JWTs have three dot-separated parts; the header and payload are Base64URL-encoded. Paste the full JWT or one part, select Decode → Base64URL. For full JWT validation use our JWT Decoder.',
            },
            {
              q: 'Is it safe to paste sensitive data here?',
              a: 'Yes. This tool runs entirely in your browser. Nothing is uploaded to any server. Your data never leaves your device. Use the security scanner to detect secrets before sharing output.',
            },
            {
              q: 'Can I encode large files to Base64 in the browser?',
              a: 'Yes — up to 50 MB. Files over 5 MB are processed in a background task so the page stays responsive.',
            },
            {
              q: 'Why does Base64 output end with = or ==?',
              a: '= padding makes the string length a multiple of 4 so decoders work correctly. One = means 2 padding bytes needed; == means 1. Base64URL and No-Padding variants omit them.',
            },
            {
              q: 'How do I encode an image to Base64 for HTML or CSS?',
              a: 'Switch to File mode and drag in your image (PNG, JPG, GIF, WebP, SVG). Copy the output and use it as data:image/png;base64,<result> in an img src or CSS background-image: url(...).',
            },
            {
              q: 'What is MIME Base64 used for?',
              a: 'MIME Base64 wraps output at 76 characters per line as required for email attachments (RFC 2045). Choose the MIME variant when encoding files for email clients.',
            },
            {
              q: 'How do I encode Base64 in JavaScript?',
              a: 'Use btoa() for ASCII strings: btoa("hello") → "aGVsbG8=". For binary data use FileReader or TextEncoder. For Base64URL replace +/ with -_ and strip = padding.',
            },
            {
              q: 'What is the difference between Base64 and hex encoding?',
              a: 'Hex uses 2 characters per byte (~100% overhead). Base64 uses 4 characters per 3 bytes (~33% overhead), making it more compact. Base64 is preferred for text transport; hex is common in cryptography output.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode, verify, and security-audit JWT tokens', icon: '🪙' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'MD5, SHA-256, HMAC, bcrypt/Argon2 hashes', icon: '#️⃣' },
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Mask secrets before sending code to AI', icon: '🔐' },
            { href: '/json-prompt-shield', label: 'JSON Prompt Shield', desc: 'Mask JSON keys and values before AI', icon: '🔒' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Encoding in HTTP APIs' },
            { href: '/blog/json-best-practices-production-guide', label: 'Base64 Use Cases Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Binary Data in REST APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Data Encoding Best Practices' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="base64_encoder" />
    </>
  );
}
