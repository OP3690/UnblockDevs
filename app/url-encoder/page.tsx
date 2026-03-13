import type { Metadata } from 'next';
import Link from 'next/link';
import UrlEncoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/url-encoder';

export const metadata: Metadata = {
  title:
    'URL Encoder Decoder — Percent Encode & Decode URLs, Parse Query Parameters, Fix Double Encoding Free Online | UnblockDevs',
  description:
    'Encode and decode URLs in RFC 3986, form-urlencoded, encodeURI, or encodeURIComponent format. Parse URLs, edit query parameters, detect double encoding, and run security checks. Free, 100% browser-based.',
  keywords: [
    'url encoder',
    'url decoder',
    'url encoder decoder online',
    'url encode online',
    'url decode online',
    'percent encoding tool',
    'encode url online free',
    'decode url online free',
    'rfc 3986 url encoder',
    'application/x-www-form-urlencoded encoder',
    'difference between rfc 3986 and form urlencoded',
    'url encode space %20 vs +',
    'query string parser online',
    'parse url query parameters online',
    'double encoded url fix',
    'url double encoding detector',
    '%2520 url encoding fix',
    'encode url parameters for api',
    'encodeURIComponent online',
    'encodeURI vs encodeURIComponent',
    'what is url encoding',
    'how to url encode a string online',
    'what is the difference between %20 and + in urls',
    'how to fix double encoded urls',
    'URL Encoder Decoder',
  ],
  openGraph: {
    title: 'URL Encoder Decoder — Percent Encode, Parse Query Params, Fix Double Encoding | UnblockDevs',
    description:
      'Encode/decode URLs in RFC 3986, form-urlencoded, encodeURI, encodeURIComponent. Parse URLs, edit query params, detect double encoding. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder Decoder — Percent Encode, Parse Params, Fix Double Encoding | UnblockDevs',
    description: 'Encode/decode URLs, parse query params, detect double encoding. Free, 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'URL Encoder Decoder — Percent Encode, Decode, Parse Query Parameters',
  description:
    'Encode and decode URLs in RFC 3986, form-urlencoded, encodeURI, or encodeURIComponent. Parse URLs, edit query parameters, detect double encoding, run security checks. Free, 100% browser-based. No URLs sent to any server.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Four encoding modes: RFC 3986, form-urlencoded, encodeURI, encodeURIComponent',
    'Auto-detect encode vs decode',
    'Full URL parser and query parameter editor',
    'Double encoding detection',
    'Security checks',
    'Code snippets and bulk mode',
    '100% client-side — no URLs sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is the difference between %20 and + in URLs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Both represent a space but in different contexts. RFC 3986 uses %20 for spaces in URL paths and query strings. The application/x-www-form-urlencoded standard uses + for spaces in form submissions. Using the wrong one causes decoding errors in APIs and web servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between encodeURI and encodeURIComponent?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'encodeURI encodes a full URL and leaves structural characters like /, ?, #, and & unencoded. encodeURIComponent encodes a single parameter value and encodes everything including /, ?, #, and & because those must be escaped inside a query value.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is double URL encoding and how do I fix it?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Double encoding happens when a URL is percent-encoded twice — the % character gets encoded to %25, turning %20 into %2520. The URL Encoder at unblockdevs.com/url-encoder detects double encoding automatically and decodes back to the original value.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is percent encoding?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Percent encoding converts characters not allowed in URLs into a % followed by two hex digits. Space becomes %20, # becomes %23, & becomes %26. This ensures special characters don\'t break URL structure when used in query parameters or paths.',
      },
    },
  ],
};

export default function UrlEncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="url-enc-heading">
        <h1 id="url-enc-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          URL Encoder Decoder — Percent Encode &amp; Decode URLs, Parse Query Parameters, Fix Double Encoding Free Online
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Encode and decode URLs and query strings in RFC 3986, form-urlencoded, encodeURI, or encodeURIComponent. Parse URLs into protocol, host, path, and parameters. Edit query params, detect double encoding, run security checks, and export results. All processing runs in your browser — no URLs are sent to any server.
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

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">URL Encoding vs Form Encoding — What&apos;s the Difference?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>RFC 3986</strong> (percent encoding) uses <code className="bg-gray-100 px-1 rounded">%20</code> for spaces everywhere — paths and query strings. <strong>application/x-www-form-urlencoded</strong> (used by HTML forms and many APIs) uses <code className="bg-gray-100 px-1 rounded">+</code> for spaces in query strings only. Using <code className="bg-gray-100 px-1 rounded">+</code> in a path or <code className="bg-gray-100 px-1 rounded">%20</code> where a server expects <code className="bg-gray-100 px-1 rounded">+</code> can cause decoding errors. This tool supports both so you can match your target (API, form, or generic URL).
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">encodeURI vs encodeURIComponent — When to Use Each</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>encodeURI</strong> encodes a full URL but leaves structural characters (<code className="bg-gray-100 px-1 rounded">/</code>, <code className="bg-gray-100 px-1 rounded">?</code>, <code className="bg-gray-100 px-1 rounded">#</code>, <code className="bg-gray-100 px-1 rounded">&</code>) unencoded so the URL stays valid. Use it when you have a complete URL. <strong>encodeURIComponent</strong> encodes a single query parameter value and encodes everything, including <code className="bg-gray-100 px-1 rounded">/</code>, <code className="bg-gray-100 px-1 rounded">?</code>, <code className="bg-gray-100 px-1 rounded">#</code>, <code className="bg-gray-100 px-1 rounded">&</code>, because those must be escaped inside a value. Use it for each query value when building a URL. The tool offers both modes so you can test JavaScript-equivalent output.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">What Is Double URL Encoding and How to Fix It</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Double encoding happens when a string is percent-encoded twice: the <code className="bg-gray-100 px-1 rounded">%</code> itself becomes <code className="bg-gray-100 px-1 rounded">%25</code>, so <code className="bg-gray-100 px-1 rounded">%20</code> (space) becomes <code className="bg-gray-100 px-1 rounded">%2520</code>. Servers may then decode only once and treat <code className="bg-gray-100 px-1 rounded">%2520</code> as literal text instead of a space. This tool detects double encoding and decodes in one step so you get back the intended value.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How to Parse and Edit URL Query Parameters</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Paste a full URL into the tool to see it split into protocol, hostname, port, path, <strong>query parameters</strong>, and fragment. Edit, add, or remove query keys and values, then rebuild the URL. Useful for debugging APIs, building request URLs with many params, or fixing malformed query strings. No other free tool combines encode/decode, multiple standards, and a query parameter editor in one place.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">URL Encoding for API Requests — Common Mistakes</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Common issues: (1) <strong>Encoding a full URL</strong> with encodeURIComponent — that encodes <code className="bg-gray-100 px-1 rounded">/</code> and <code className="bg-gray-100 px-1 rounded">?</code> and breaks the URL; encode only each parameter value. (2) <strong>Wrong standard</strong> — some APIs expect form-urlencoded (<code className="bg-gray-100 px-1 rounded">+</code> for space), others expect strict percent encoding (<code className="bg-gray-100 px-1 rounded">%20</code>). (3) <strong>Double encoding</strong> — if you encode and the client or server encodes again, you get <code className="bg-gray-100 px-1 rounded">%2520</code>. Use the decoder to fix it. (4) <strong>Leaving structural characters in a value</strong> — if a parameter contains <code className="bg-gray-100 px-1 rounded">&</code> or <code className="bg-gray-100 px-1 rounded">=</code>, encode the whole value with encodeURIComponent (or the equivalent in this tool).
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

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between %20 and + in URLs?</dt>
            <dd className="text-gray-700 mt-1">
              Both represent a space but in different contexts. RFC 3986 uses <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%20</code> for spaces in URL paths and query strings. The application/x-www-form-urlencoded standard (HTML forms) uses <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">+</code> for spaces in query strings only. Using the wrong one causes decoding errors in APIs.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between encodeURI and encodeURIComponent?</dt>
            <dd className="text-gray-700 mt-1">
              encodeURI encodes a full URL — it leaves characters like <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">?</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">#</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">&</code> unencoded because they have structural meaning. encodeURIComponent encodes a single parameter value — it encodes everything including those characters because they should be escaped inside a value.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is double URL encoding and how do I fix it?</dt>
            <dd className="text-gray-700 mt-1">
              Double encoding happens when a URL is encoded twice — the <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%</code> character itself gets encoded to <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%25</code>, turning <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%20</code> into <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%2520</code>. This tool detects double encoding automatically and lets you decode back to the original value.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is percent encoding?</dt>
            <dd className="text-gray-700 mt-1">
              Percent encoding (URL encoding) converts characters that aren&apos;t allowed in URLs into a <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%</code> followed by two hex digits. For example, space becomes <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%20</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">#</code> becomes <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%23</code>, and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">&</code> becomes <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">%26</code>. This ensures special characters don&apos;t break URL structure.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Is it safe to paste URLs with sensitive parameters into online encoders?</dt>
            <dd className="text-gray-700 mt-1">
              Only if the tool is 100% client-side. This URL Encoder runs entirely in your browser — no URLs, parameters, or tokens are sent to any server. Safe for URLs containing API keys, tokens, or sensitive query parameters.
            </dd>
          </div>
        </dl>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Related Tools</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          <Link href="/base64-encoder" className="text-primary-600 hover:underline font-medium">Base64 Encoder</Link> — encode or decode values for URLs (e.g. Base64URL).{' '}
          <Link href="/jwt-decoder" className="text-primary-600 hover:underline font-medium">JWT Decoder</Link> — decode JWTs that appear in URL parameters or headers.{' '}
          <Link href="/hash-generator" className="text-primary-600 hover:underline font-medium">Hash Generator</Link> — hash URL parameters or payloads.{' '}
          <Link href="/curl-failure-root-cause-engine" className="text-primary-600 hover:underline font-medium">cURL Failure Root-Cause Engine</Link> — debug 400 errors often caused by URL encoding issues in API requests.
        </p>
      </article>
    </>
  );
}
