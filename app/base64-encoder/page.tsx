import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import Base64EncoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/base64-encoder';

export const metadata: Metadata = {
  title:
    'Base64 Encoder Decoder — Encode & Decode Standard, Base64URL, MIME & No-Padding Online Free | UnblockDevs',
  description:
    'The most complete Base64 encoder decoder online. Encode or decode Standard, Base64URL, MIME, and No-Padding variants. Auto-detects JWT, images, and JSON. File upload up to 50MB. 100% browser-based, free.',
  keywords: [
    'base64 encoder decoder',
    'base64 encode online',
    'base64 decode online',
    'base64 encoder online free',
    'base64 decoder online free',
    'base64 encoding tool',
    'encode base64 online',
    'decode base64 string online',
    'base64 converter online',
    'base64url encoder',
    'base64url decoder',
    'base64url online',
    'jwt base64url decoder',
    'url safe base64 encoder',
    'mime base64 encoder',
    'image to base64 converter',
    'convert image to base64 online',
    'base64 image encoder',
    'png to base64 online',
    'base64 encode http basic auth',
    'encode credentials base64 authorization header',
    'decode jwt base64',
    'base64 decode jwt payload',
    'base64 secret scanner',
    'detect api keys in base64',
    'base64 security checker',
    'what is base64 encoding',
    'how to encode base64 online',
    'how to decode a base64 string',
    'how to convert image to base64',
    'is base64 the same as encryption',
    'Base64 Encoder Decoder',
  ],
  openGraph: {
    title: 'Base64 Encoder Decoder — Standard, Base64URL, MIME & No-Padding Online Free | UnblockDevs',
    description:
      'Encode or decode Base64 in 4 variants. Auto-detect JWT, images, JSON. Image preview, file up to 50MB, security scanner. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Base64 Encoder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder Decoder — Encode & Decode All Variants Online Free | UnblockDevs',
    description: 'Standard, Base64URL, MIME, No-Padding. Auto-detect JWT, images. 50MB files. Security scanner. 100% in browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const webAppSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'WebApplication' as const,
  name: 'Base64 Encoder Decoder — Standard, Base64URL, MIME & No-Padding Online',
  url: canonicalUrl,
  description:
    'The most complete Base64 encoder decoder online. Encode or decode Standard, Base64URL, MIME, No-Padding. Auto-detect JWT, images, JSON. Image preview, file up to 50MB, security scanner. 100% browser-based, zero data transmission.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer' as const, price: '0', priceCurrency: 'USD' },
  featureList: [
    'Standard Base64, Base64URL, MIME, No-Padding encoding and decoding',
    'Auto content-type detection (JWT, image, JSON, URL)',
    'Base64 image preview in browser',
    'File encoding up to 50MB',
    'Built-in security scanner for secrets and PII',
    '100% browser-based, zero data transmission',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    { '@type': 'Question' as const, name: 'What is Base64 encoding?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Base64 encoding converts binary or text data into a string of ASCII characters (A–Z, a–z, 0–9, +, /) so it can be safely used in JSON, URLs, or email. Each group of 3 bytes becomes 4 characters; padding with = is used when needed.' } },
    { '@type': 'Question' as const, name: 'How do I decode a Base64 string?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Paste the Base64 string into the input area, select Decode mode, and the decoded text or binary (e.g. image) appears in the output. The tool auto-normalizes URL-safe characters (- and _) and padding.' } },
    { '@type': 'Question' as const, name: 'What is the difference between Base64 and Base64URL?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Standard Base64 uses + and / and optional = padding. Base64URL uses - and _ and no padding, so it is safe in URLs and tokens (e.g. JWTs).' } },
    { '@type': 'Question' as const, name: 'Is Base64 the same as encryption?', acceptedAnswer: { '@type': 'Answer' as const, text: 'No. Base64 is encoding, not encryption. It converts binary data to ASCII text for safe transport but provides zero security — anyone can decode it instantly. Never use Base64 alone to protect sensitive data.' } },
    { '@type': 'Question' as const, name: 'How do I encode HTTP Basic Auth credentials in Base64?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Format your credentials as username:password, then Base64 encode the result. Use it as the value in your Authorization: Basic <base64> header. This tool does the encoding instantly in your browser.' } },
    { '@type': 'Question' as const, name: 'What is Base64URL used for?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Base64URL is used in JWTs, OAuth tokens, and URL parameters. It replaces + with - and / with _ so the result is safe in URLs without percent-encoding. This tool supports Base64URL encoding and decoding natively.' } },
    { '@type': 'Question' as const, name: 'How do I encode an image to Base64?', acceptedAnswer: { '@type': 'Answer' as const, text: 'Switch to File mode, then drag and drop your image or click to select it. The tool will output the raw Base64 string and show a preview. You can also paste the result into Image mode to see the preview again.' } },
    { '@type': 'Question' as const, name: 'Is it safe to paste sensitive data into a Base64 decoder?', acceptedAnswer: { '@type': 'Answer' as const, text: 'This tool runs entirely in your browser; nothing is sent to our servers. Your data never leaves your device. For extra caution, use the security scanner and avoid sharing the page URL if it contains the data in the query string.' } },
  ],
};

export default function Base64EncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <Base64EncoderClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="base64-heading">
        <h1 id="base64-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Base64 Encoder Decoder — Encode &amp; Decode Standard, Base64URL, MIME &amp; No-Padding Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          The most feature-complete base64 encoder decoder online: encode and decode in four variants (Standard, Base64URL, MIME, No-Padding),
          auto-detect content (images, JWT, JSON, URL), preview Base64 images in the browser, and scan for secrets — all without sending data to any server.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste text or Base64, use <code className="bg-gray-100 px-1 rounded">?data=...</code> in the URL to load, or drag a file in File mode. Runs fully in your browser.
        </p>
        <TrackedCtaLink href="#tool" toolName="base64_encoder" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </TrackedCtaLink>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
          <p className="text-gray-700 leading-relaxed">
            Encode plain text to Base64 and decode Base64 to text in one click. Choose Standard (RFC 4648), Base64URL (for JWTs and URLs),
            MIME (line-wrapped for email), or No-Padding. The tool auto-detects content: paste a Base64 image and see a live preview; paste a JWT
            and get a link to the JWT Decoder; paste JSON and format it. Encode any file up to 50MB by drag-and-drop. A security scanner flags
            passwords, API keys, and PII. All processing is browser-based — no signup, no upload to servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-700 leading-relaxed">
            Type or paste in the input panel, select encode or decode and your preferred variant. Output updates automatically with a short delay.
            Use Cmd+Enter to process immediately. In File mode, drop a file or click to pick one — the tool reads it in the browser and outputs
            Base64. In Image mode, paste Base64 image data to see a preview. No data is sent to any server; everything runs in your browser with
            no signup required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Use Cases</h2>
          <p className="text-gray-700 leading-relaxed">
            Encode credentials for HTTP Basic Auth or API headers. Decode JWT tokens to inspect claims. Convert images to Base64 for data URIs
            in HTML or CSS. Encode file contents for email attachments (MIME Base64). Encode payloads for URL parameters (Base64URL). Check whether
            a string contains sensitive data with the built-in security scanner. Format JSON after decoding. All from one tool, instantly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Base64 vs Base64URL — What&apos;s the Difference?</h2>
          <p className="text-gray-700 leading-relaxed">
            Standard Base64 uses characters <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">+</code> and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/</code> and optional <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">=</code> padding, which are unsafe in URLs (they get percent-encoded). Base64URL replaces <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">+</code> with <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">-</code> and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/</code> with <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">_</code> and omits padding, so the result is safe in URLs, query strings, and tokens like JWTs. This tool supports both: choose Standard for general use or Base64URL for JWTs and URL parameters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Encode Images to Base64 for HTML and CSS</h2>
          <p className="text-gray-700 leading-relaxed">
            Switch to <strong>File</strong> mode in the tool, then drag and drop your image (PNG, JPG, GIF, WebP, SVG) or click to select it. The tool reads the file in your browser and outputs the raw Base64 string. Use it in a data URI: <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">data:image/png;base64,&lt;your-base64&gt;</code> in HTML <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">img src</code> or CSS <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">background-image</code>. In <strong>Image</strong> mode you can paste Base64 image data to see a live preview. No upload to any server — everything runs locally.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Encode HTTP Basic Auth Credentials in Base64</h2>
          <p className="text-gray-700 leading-relaxed">
            Format your credentials as <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">username:password</code> (e.g. <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">alice:secret123</code>), paste into the input, select <strong>Encode</strong> and <strong>Standard</strong> (or Base64URL if your client expects it). Copy the output and use it in the <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">Authorization: Basic &lt;base64&gt;</code> header. This tool does the encoding in your browser so credentials never leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Decode JWT Tokens Using Base64</h2>
          <p className="text-gray-700 leading-relaxed">
            JWTs have three parts (header, payload, signature) separated by dots; the header and payload are Base64URL-encoded. Paste the full JWT or just one part into the tool, select <strong>Decode</strong> and <strong>Base64URL</strong> (the tool auto-normalizes URL-safe characters). You&apos;ll see the decoded JSON. For full JWT decoding with claim validation and signature verification, use our <Link href="/jwt-decoder" className="text-primary-600 hover:underline">JWT Decoder</Link> — it links from here when you paste a JWT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Is Base64 Encoding Safe? What the Security Scanner Checks</h2>
          <p className="text-gray-700 leading-relaxed">
            Base64 is <strong>encoding</strong>, not encryption — anyone can decode it. The tool&apos;s built-in security scanner checks for passwords, API keys, connection strings, and PII in the input or decoded output and flags them so you don&apos;t accidentally share sensitive data. All processing is in your browser; nothing is sent to our servers. For masking code or JSON before sending to AI, use <Link href="/code-prompt-shield" className="text-primary-600 hover:underline">Code Prompt Shield</Link> or <Link href="/json-prompt-shield" className="text-primary-600 hover:underline">JSON Prompt Shield</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-gray-900">What is Base64 encoding?</dt>
              <dd className="text-gray-700 mt-1">
                Base64 encoding converts binary or text data into a string of ASCII characters (A–Z, a–z, 0–9, +, /) so it can be safely used in
                JSON, URLs, or email. Each group of 3 bytes becomes 4 characters; padding with = is used when needed.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">How do I decode a Base64 string?</dt>
              <dd className="text-gray-700 mt-1">
                Paste the Base64 string into the input area, select Decode mode, and the decoded text or binary (e.g. image) appears in the output.
                The tool auto-normalizes URL-safe characters (- and _) and padding.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">What is the difference between Base64 and Base64URL?</dt>
              <dd className="text-gray-700 mt-1">
                Standard Base64 uses + and / and optional = padding. Base64URL uses - and _ and no padding, so it is safe in URLs and tokens (e.g. JWTs).
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Is Base64 the same as encryption?</dt>
              <dd className="text-gray-700 mt-1">
                No. Base64 is encoding, not encryption. It converts binary data to ASCII text for safe transport but provides zero security — anyone can decode it instantly. Never use Base64 alone to protect sensitive data.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">How do I encode HTTP Basic Auth credentials in Base64?</dt>
              <dd className="text-gray-700 mt-1">
                Format your credentials as username:password, then Base64 encode the result. Use it as the value in your Authorization: Basic &lt;base64&gt; header. This tool does the encoding instantly in your browser.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">What is Base64URL used for?</dt>
              <dd className="text-gray-700 mt-1">
                Base64URL is used in JWTs, OAuth tokens, and URL parameters. It replaces + with - and / with _ so the result is safe in URLs without percent-encoding. This tool supports Base64URL encoding and decoding natively.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Is it safe to paste sensitive data into a Base64 decoder?</dt>
              <dd className="text-gray-700 mt-1">
                This tool runs entirely in your browser; nothing is sent to our servers. Your data never leaves your device. For extra caution, use the
                security scanner and avoid sharing the page URL if it contains the data in the query string.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">How do I encode an image to Base64?</dt>
              <dd className="text-gray-700 mt-1">
                Switch to File mode, then drag and drop your image or click to select it. The tool will output the raw Base64 string (and show a preview).
                You can also paste the result into Image mode to see the preview again.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Why does Base64 encoded output end with = or ==?</dt>
              <dd className="text-gray-700 mt-1">
                Padding characters (=) make the string length a multiple of 4 so the decoder can work correctly. One = means 2 padding bytes; == means 1.
                Base64URL and No-Padding variants omit them.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">What is MIME Base64 used for?</dt>
              <dd className="text-gray-700 mt-1">
                MIME Base64 (RFC 2045) wraps lines at 76 characters with CRLF. It is used in email attachments and multipart MIME bodies.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Can I encode large files to Base64 in the browser?</dt>
              <dd className="text-gray-700 mt-1">
                Yes. This tool supports files up to 50MB. Files over 5MB are processed in a background task so the page stays responsive.
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Related Tools</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <Link href="/jwt-decoder" className="text-primary-600 hover:underline">JWT Decoder</Link> — decode and verify JWTs.
            {' '}<Link href="/json-formatter" className="text-primary-600 hover:underline">JSON Formatter</Link> — format and validate JSON.
            {' '}<Link href="/curl-converter" className="text-primary-600 hover:underline">cURL Converter</Link> — convert cURL to fetch/axios.
            {' '}<Link href="/code-prompt-shield" className="text-primary-600 hover:underline">Code Prompt Shield</Link> — mask code and scan for secrets before sending to AI.
          </p>
        </section>

        <p className="text-gray-500 text-sm">
          This base64 encoder decoder is browser-based. Your data never leaves your device.
        </p>
      </div>
    </>
  );
}
