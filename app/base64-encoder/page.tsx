import type { Metadata } from 'next';
import Link from 'next/link';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
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
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Base64 encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 converts binary or text data into ASCII characters (A–Z, a–z, 0–9, +, /) for safe use in JSON, URLs, or email. Each group of 3 bytes becomes 4 characters.' } },
    { '@type': 'Question', name: 'What is the difference between Base64 and Base64URL?', acceptedAnswer: { '@type': 'Answer', text: 'Standard Base64 uses + and / with optional = padding. Base64URL replaces + with - and / with _ and omits padding, making it safe in URLs and JWTs.' } },
    { '@type': 'Question', name: 'Is Base64 the same as encryption?', acceptedAnswer: { '@type': 'Answer', text: 'No. Base64 is encoding, not encryption. Anyone can decode it instantly. Never rely on Base64 for security.' } },
    { '@type': 'Question', name: 'Is it safe to paste sensitive data here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Everything runs in your browser. Nothing is uploaded to any server. Your data never leaves your device.' } },
  ],
};

export default function Base64EncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              a: 'Format credentials as username:password (e.g. alice:s3cr3t), paste into the tool, choose Encode → Standard. Copy the result and prefix it with Basic in your Authorization header.',
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
      </ToolSEOContent>

      <ToolPageFooterBand toolName="base64_encoder" />
    </>
  );
}
