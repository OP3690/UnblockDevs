import type { Metadata } from 'next';
import Link from 'next/link';
import Base64EncoderClient from './client';

export const metadata: Metadata = {
  title: 'Base64 Encoder Decoder — Free Online Tool | UnblockDevs',
  description:
    'Encode and decode Base64 online. Auto-detect images, JWTs, and JSON. Preview Base64 images instantly. Scan for secrets. 100% browser-based — your data never leaves this page.',
  keywords: [
    'base64 encode decode online',
    'base64 decoder',
    'base64 encoder',
    'image to base64',
    'base64 to text',
    'base64 file encoder',
    'base64url',
    'mime base64',
  ],
  openGraph: {
    title: 'Base64 Encoder Decoder — UnblockDevs',
    description:
      'Encode and decode Base64 online. Auto-detect images, JWTs, JSON. Preview Base64 images. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/base64-encoder',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Base64 Encoder' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/base64-encoder',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'WebApplication' as const,
  name: 'Base64 Encoder / Decoder',
  url: 'https://unblockdevs.com/base64-encoder',
  description:
    'Free browser-based Base64 encoder and decoder. Standard Base64, Base64URL, MIME, No-Padding. Auto content-type detection, image preview, file encoding up to 50MB, security secret scanner. 100% browser-based, zero data transmission.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer' as const, price: '0', priceCurrency: 'USD' },
  featureList: [
    'Standard Base64, Base64URL, MIME, No-Padding encoding',
    'Auto content-type detection',
    'Base64 image preview',
    'File encoding up to 50MB',
    'Security secret scanner',
    '100% browser-based, zero data transmission',
  ],
};

export default function Base64EncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="base64-heading">
        <h1 id="base64-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Base64 Encoder / Decoder
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          The most feature-complete base64 encoder decoder online: encode and decode in four variants (Standard, Base64URL, MIME, No-Padding),
          auto-detect content (images, JWT, JSON, URL), preview Base64 images in the browser, and scan for secrets — all without sending data to any server.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste text or Base64, use <code className="bg-gray-100 px-1 rounded">?data=...</code> in the URL to load, or drag a file in File mode. Runs fully in your browser.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <Base64EncoderClient />
      </div>

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
          </p>
        </section>

        <p className="text-gray-500 text-sm">
          This base64 encoder decoder is browser-based. Your data never leaves your device.
        </p>
      </div>
    </>
  );
}
