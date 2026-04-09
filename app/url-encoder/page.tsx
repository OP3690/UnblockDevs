import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  C,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
} from '@/components/tools/ToolSEOContent';
import UrlEncoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/url-encoder';

export const metadata: Metadata = {
  title:
    'URL Encoder Decoder — Percent-Encode, Decode URL Components, Query Strings & Form Data Online Free | UnblockDevs',
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
    'percent encode query string',
    'url encode special characters',
    'url encoding reference',
  ],
  openGraph: {
    title: 'URL Encoder Decoder — Percent Encode, Decode URL Components & Query Strings | UnblockDevs',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1090',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
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
      name: 'When should I use + instead of %20 for spaces in a URL?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use + for spaces only in application/x-www-form-urlencoded content — the format used by HTML forms and some APIs. For RFC 3986 URLs, use %20 for spaces everywhere. Using the wrong one causes decoding errors in APIs and web servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is percent-encoding the same as Base64 encoding?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Percent-encoding (URL encoding) converts characters to %XX hex sequences so they are safe to use in URLs. Base64 encoding converts binary data into a text string using A-Z, a-z, 0-9, +, /. They serve different purposes: percent-encoding is for URLs; Base64 is for embedding binary in text formats like JSON or HTTP headers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Which characters are safe in a URL without encoding?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'RFC 3986 defines unreserved characters that never need encoding: A–Z, a–z, 0–9, hyphen (-), underscore (_), period (.), and tilde (~). All other characters — including spaces, &, =, +, /, ?, #, and @ — must be percent-encoded when used inside a query parameter value.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I decode a URL that has been double-encoded?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Double encoding happens when a URL is percent-encoded twice — %20 becomes %2520 because the % itself gets encoded to %25. Paste the double-encoded string into this URL Decoder; it detects double encoding automatically and decodes it back to the original value in one step.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to URL Encode or Decode a String Online',
  description: 'Step-by-step guide to URL encoding and decoding strings for use in query parameters.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select Encode or Decode mode', text: 'Choose Encode to convert a plain string to percent-encoded format, or Decode to convert an encoded URL back to readable text.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose the encoding standard', text: 'Select RFC 3986 (for query parameters), Component (encodes / and :), or Form-encoded (replaces spaces with +) based on your use case.' },
    { '@type': 'HowToStep', position: 3, name: 'Paste your input', text: 'Type or paste your URL or string. The output updates instantly — no button click needed.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the result', text: 'Click Copy to copy the encoded or decoded string to your clipboard for use in your API or browser.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'URL Encoder Decoder', item: canonicalUrl },
  ],
};

export default function UrlEncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <UrlEncoderClient />
      <ToolSEOContent>
        <SEOSection id="what" heading="What Is URL Encoding?">
          <SEOProse>
            <strong>URL encoding</strong>, formally called percent-encoding, is the process of converting
            characters that are not allowed or have special meaning in a URL into a safe representation.
            Each unsafe character is replaced with a <C>%</C> sign followed by two hexadecimal digits — for
            example, a space becomes <C>%20</C>, an ampersand becomes <C>%26</C>, and a hash becomes{' '}
            <C>%23</C>. This ensures that special characters inside query strings or path segments do not
            break the URL structure.
          </SEOProse>
          <SEOProse>
            RFC 3986 defines the authoritative standard for URL encoding. It divides characters into{' '}
            <strong>unreserved</strong> (A–Z, a–z, 0–9, <C>-</C>, <C>_</C>, <C>.</C>, <C>~</C>) which
            never need encoding, and everything else which must be percent-encoded when used inside a
            component like a query parameter value. A competing standard —{' '}
            <strong>application/x-www-form-urlencoded</strong> — is used by HTML forms and some APIs; it
            encodes spaces as <C>+</C> instead of <C>%20</C>. Using the wrong standard is one of the most
            common causes of API decoding errors.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Encode or Decode URLs in Seconds">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Paste your input',
                desc: 'Enter a raw URL, a query string, a path segment, or a percent-encoded value into the input field.',
              },
              {
                n: '02',
                title: 'Choose mode & standard',
                desc: 'Select Encode, Decode, or Auto (auto-detects which is needed). Pick the encoding standard: RFC 3986, form-urlencoded, encodeURI, or encodeURIComponent.',
              },
              {
                n: '03',
                title: 'Get instant output',
                desc: 'The result updates live as you type. Copy the encoded or decoded value, or paste a full URL to open the query parameter editor.',
              },
              {
                n: '04',
                title: 'Edit & rebuild',
                desc: 'Use the parsed URL view to add, remove, or edit query parameters individually, then copy the rebuilt URL — no manual string manipulation needed.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers URL-Encode">
          <UseCases
            cases={[
              {
                icon: '🔗',
                title: 'Query parameter encoding',
                desc: 'Encode values that contain &, =, +, or spaces before appending them to a URL so they do not break the query string structure.',
              },
              {
                icon: '🔑',
                title: 'OAuth redirects',
                desc: 'Percent-encode the redirect_uri parameter in OAuth flows — many providers reject requests where the URI is not correctly encoded.',
              },
              {
                icon: '📋',
                title: 'Form POST data',
                desc: 'Encode form field values in application/x-www-form-urlencoded format before submitting to APIs that expect form-encoded bodies.',
              },
              {
                icon: '🔒',
                title: 'API request signing',
                desc: 'Many APIs (AWS Signature V4, HMAC-based auth) require query parameters to be canonically percent-encoded before hashing.',
              },
              {
                icon: '🍪',
                title: 'Cookie values',
                desc: 'Encode special characters in cookie values to prevent them from being misinterpreted by browsers or servers during Set-Cookie / Cookie parsing.',
              },
              {
                icon: '📁',
                title: 'Path segments',
                desc: 'Encode file names or user-generated slugs used in URL paths so characters like spaces, #, or ? do not break routing.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="chars" heading="URL Encoding Reference — Special Characters">
          <SEOProse>
            Common characters that must be percent-encoded when used inside a URL component such as a query
            parameter value or path segment.
          </SEOProse>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Character</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Encoded (RFC 3986)</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">space</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%20</td>
                  <td className="px-4 py-3 text-zinc-600">Form-encoded standard uses <C>+</C> instead</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">&amp;</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%26</td>
                  <td className="px-4 py-3 text-zinc-600">Parameter separator — must be encoded inside values</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">=</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%3D</td>
                  <td className="px-4 py-3 text-zinc-600">Key/value delimiter — encode when it appears in a value</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">+</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%2B</td>
                  <td className="px-4 py-3 text-zinc-600">Encodes to %2B in RFC 3986; represents space in form-encoded</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">/</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%2F</td>
                  <td className="px-4 py-3 text-zinc-600">Path separator — encode in query values with encodeURIComponent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">?</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%3F</td>
                  <td className="px-4 py-3 text-zinc-600">Query start character — encode inside query values</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">#</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%23</td>
                  <td className="px-4 py-3 text-zinc-600">Fragment identifier — encode to prevent truncation of query string</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800">@</td>
                  <td className="px-4 py-3 font-mono text-zinc-800">%40</td>
                  <td className="px-4 py-3 text-zinc-600">User-info delimiter — encode when used inside a path or query value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'What is the difference between encodeURI and encodeURIComponent?',
                a: (
                  <>
                    <C>encodeURI</C> encodes a complete URL. It leaves structural characters like{' '}
                    <C>/</C>, <C>?</C>, <C>#</C>, and <C>&</C> untouched because they have meaning in the
                    URL structure. <C>encodeURIComponent</C> encodes a single value to be embedded inside a
                    URL — it encodes everything including <C>/</C>, <C>?</C>, <C>#</C>, and <C>&</C> so
                    they cannot break the surrounding URL. Use <C>encodeURIComponent</C> for each query
                    parameter value when building a URL programmatically.
                  </>
                ),
              },
              {
                q: 'When should I use + instead of %20 for spaces?',
                a: (
                  <>
                    Use <C>+</C> for spaces only when building{' '}
                    <C>application/x-www-form-urlencoded</C> content — the format used by HTML form
                    submissions and some REST APIs. For standard RFC 3986 URLs (used everywhere else),
                    encode spaces as <C>%20</C>. Using <C>+</C> in a path segment or an API that expects
                    RFC 3986 will cause the server to receive a literal <C>+</C> character instead of a
                    space.
                  </>
                ),
              },
              {
                q: 'Is percent-encoding the same as Base64 encoding?',
                a: (
                  <>
                    No — they serve completely different purposes. Percent-encoding converts individual
                    characters to <C>%XX</C> hex sequences so they are safe inside a URL. Base64 converts
                    arbitrary binary data into a printable ASCII string using a 64-character alphabet. If
                    you need to embed a Base64 value in a URL, you should also percent-encode its{' '}
                    <C>+</C>, <C>/</C>, and <C>=</C> characters (or use the Base64URL variant which
                    replaces them with <C>-</C>, <C>_</C>, and no padding).
                  </>
                ),
              },
              {
                q: 'Which characters are safe in a URL without encoding?',
                a: (
                  <>
                    RFC 3986 defines <strong>unreserved characters</strong> that never need encoding:
                    uppercase and lowercase letters (A–Z, a–z), digits (0–9), and the four symbols{' '}
                    <C>-</C> <C>_</C> <C>.</C> <C>~</C>. Every other character — including spaces,{' '}
                    <C>&</C>, <C>=</C>, <C>+</C>, <C>/</C>, <C>?</C>, <C>#</C>, <C>@</C>, and non-ASCII
                    Unicode — must be percent-encoded when placed inside a URL component like a query
                    parameter value or path segment.
                  </>
                ),
              },
              {
                q: 'How do I decode a URL that has been double-encoded?',
                a: (
                  <>
                    Double encoding occurs when a string is percent-encoded twice. The <C>%</C> character
                    itself becomes <C>%25</C>, so a space that was encoded as <C>%20</C> becomes{' '}
                    <C>%2520</C> after a second pass. Paste the double-encoded string into this tool — it
                    detects double encoding automatically and decodes back to the original value. You can
                    also use Decode mode manually and apply it twice to step through the layers.
                  </>
                ),
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools
            tools={[
              {
                href: '/base64-encoder',
                label: 'Base64 Encoder',
                desc: 'Encode or decode Base64 and Base64URL strings, useful when embedding binary data in URLs.',
                icon: '📦',
              },
              {
                href: '/jwt-decoder',
                label: 'JWT Decoder',
                desc: 'Decode JSON Web Tokens that appear in URL parameters, Authorization headers, or cookies.',
                icon: '🔍',
              },
              {
                href: '/hash-generator',
                label: 'Hash Generator',
                desc: 'Generate MD5, SHA-256, HMAC, and other hashes for API request signing and checksum verification.',
                icon: '#️⃣',
              },
              {
                href: '/token-comparator',
                label: 'Token Comparator',
                desc: 'Compare two encoded strings or tokens side-by-side to find differences quickly.',
                icon: '🔀',
              },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="url_encoder" />
    </>
  );
}
