import type { Metadata } from 'next';
import Link from 'next/link';
import UrlEncoderClient from './client';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder — Encode Decode, Parse, Query Editor | UnblockDevs',
  description:
    'Encode and decode URLs, parse into components, edit query parameters. RFC 3986, form-urlencoded. Double-encoding detection, security analysis, bulk mode. 100% in your browser.',
  keywords: [
    'url encoder',
    'url decoder',
    'percent encoding',
    'encode uri online',
    'decode url parameters',
    'query string parser',
  ],
  openGraph: {
    title: 'URL Encoder / Decoder — UnblockDevs',
    description: 'Encode, decode, parse URLs. Query editor, security analysis, double-encoding detection. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/url-encoder',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/url-encoder',
  },
};

export default function UrlEncoderPage() {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="url-enc-heading">
        <h1 id="url-enc-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          URL Encoder / Decoder
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Encode and decode URLs and query strings. Parse URLs into protocol, host, path, and parameters. Edit query params, detect double encoding, run security checks, and export results. All processing runs in your browser — no URLs are sent to any server.
        </p>
        <p className="flex flex-wrap gap-3">
          <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
            Use the tool →
          </Link>
          <Link href="#what-is-url-encoding" className="inline-block text-sm text-gray-600 hover:text-gray-900">
            Learn more
          </Link>
        </p>
      </article>
      <div id="tool">
        <UrlEncoderClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-gray-200">
        <h2 id="what-is-url-encoding" className="text-xl font-bold text-gray-900 mt-0 mb-4">
          What is URL encoding?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>URL encoding</strong> (percent encoding) converts special characters into a <code className="bg-gray-100 px-1 rounded">%XX</code> form so they can be safely used in URLs and query strings. For example, a space becomes <code className="bg-gray-100 px-1 rounded">%20</code>. A <strong>URL encoder</strong> does this conversion; a <strong>URL decoder</strong> reverses it. Standards like RFC 3986 and <strong>application/x-www-form-urlencoded</strong> (used in forms) differ in how spaces are encoded (<code className="bg-gray-100 px-1 rounded">%20</code> vs <code className="bg-gray-100 px-1 rounded">+</code>).
        </p>
        <h2 id="encode-decode" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Encode vs decode vs auto
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          In <strong>Encode</strong> mode, your input is percent-encoded. In <strong>Decode</strong> mode, percent-encoded sequences are converted back to characters. <strong>Auto</strong> detects whether the input looks encoded (contains <code className="bg-gray-100 px-1 rounded">%XX</code>) and decodes it; otherwise it encodes.
        </p>
        <h2 id="query-params" className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Query parameter editor
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Paste a full URL to see it parsed into protocol, hostname, port, path, <strong>query parameters</strong>, and fragment. Edit, add, or remove parameters and rebuild the URL. Useful for debugging APIs and building request URLs.
        </p>
        <p className="text-gray-600 text-sm mt-8">
          Keywords: url encoder, url decoder, percent encoding tool, encode uri online, decode url parameters, query string parser.
        </p>
      </article>
    </>
  );
}
