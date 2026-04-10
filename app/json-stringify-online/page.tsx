import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonStringifyOnlineClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-stringify-online';

export const metadata: Metadata = {
  title: 'JSON.stringify() Online — Convert JS Object to JSON String, Escape, Pretty Print | UnblockDevs',
  description:
    'Convert JavaScript objects to JSON strings online. Simulate JSON.stringify() with custom indent, escape special characters, remove undefined values, and view raw output. Free, 100% browser-based.',
  keywords: [
    'json stringify online',
    'json stringify',
    'json stringify pretty',
    'json stringify to json online',
    'stringify json online',
    'json stringify tool',
    'javascript json stringify',
    'json stringify online without newlines',
    'json stringify without newlines',
    'json stringify js',
    'json stringify example',
    'json serialize online',
    'convert js object to json string',
    'json escape online',
  ],
  openGraph: {
    title: 'JSON.stringify() Online — Convert JS Object to JSON String | UnblockDevs',
    description: 'Simulate JSON.stringify() in your browser. Custom indent, escape characters, remove undefined values. Free, 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JSON.stringify() Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.stringify() Online — Convert JS Object to JSON String | UnblockDevs',
    description: 'Simulate JSON.stringify() in your browser. Custom indent, pretty print. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON.stringify() Online',
  url: canonicalUrl,
  description: 'Convert JavaScript objects to JSON strings online. Simulate JSON.stringify() with custom indent, escape special characters, remove undefined values.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert JavaScript objects to JSON strings',
    'Custom indentation (space or tab)',
    'Pretty print and minified output',
    'Escape special characters',
    'Remove undefined and function values',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '1400',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pretty-print JSON with JSON.stringify()?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pass a number as the third argument (the space parameter) to JSON.stringify(). For example, JSON.stringify(obj, null, 2) produces output indented with 2 spaces. Use JSON.stringify(obj, null, "\\t") for tab indentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does JSON.stringify() handle undefined values?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON.stringify() omits object properties whose value is undefined, a function, or a Symbol. If an array element is undefined, it is serialized as null to preserve index positions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes a circular reference error in JSON.stringify()?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A circular reference error (TypeError: Converting circular structure to JSON) occurs when an object contains a reference back to itself. To handle this, use a custom replacer function or a library like flatted or json-stringify-safe.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Stringify a JavaScript Object to JSON Online',
  description: 'Step-by-step guide to converting JavaScript objects to JSON strings using JSON.stringify() in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JS object', text: 'Paste a JavaScript object literal, JSON, or any serializable value into the input panel.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose indent and options', text: 'Select indentation (2 spaces, 4 spaces, tab, or none for minified output) and toggle options like removing undefined values.' },
    { '@type': 'HowToStep', position: 3, name: 'Get the JSON string', text: 'The output panel shows the result of JSON.stringify() with your chosen settings, updated in real time.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the output', text: 'Copy the serialized JSON string for use in API requests, localStorage, config files, or debug logs.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON.stringify() Online', item: canonicalUrl },
  ],
};

export default function JsonStringifyOnline() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonStringifyOnlineClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is JSON.stringify()?">
          <SEOProse>
            <C>JSON.stringify()</C> is a built-in JavaScript function that converts a value — an object, array,
            number, string, or boolean — into a JSON-formatted string. It is the standard way to serialize data
            for sending over a network, storing in <C>localStorage</C>, writing to a file, or logging structured
            output.
          </SEOProse>
          <SEOProse>
            The function accepts three parameters: the <strong>value</strong> to serialize, an optional{' '}
            <strong>replacer</strong> (a function or array that filters which keys are included), and an optional{' '}
            <strong>space</strong> parameter that controls indentation. Passing <C>2</C> as the space argument
            produces readable, pretty-printed JSON — for example,{' '}
            <C>{'JSON.stringify({name:"Alice"}, null, 2)'}</C> outputs a formatted JSON object with each key on
            its own indented line. Passing <C>null</C> or omitting space produces compact, minified JSON with no
            whitespace.
          </SEOProse>
          <SEOProse>
            This tool simulates <C>JSON.stringify()</C> directly in your browser. Paste any JavaScript object
            literal, choose your indentation and options, and instantly see the serialized JSON string output —
            no Node.js runtime required.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Stringify a JavaScript Object in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JS object', desc: 'Paste a JavaScript object literal, JSON, or any serializable value into the input panel.' },
            { n: '02', title: 'Choose indent and options', desc: 'Select indentation (2 spaces, 4 spaces, tab, or none for minified output) and toggle options like removing undefined values.' },
            { n: '03', title: 'Get the JSON string', desc: 'The output panel shows the result of JSON.stringify() with your chosen settings, updated in real time.' },
            { n: '04', title: 'Copy the output', desc: 'Copy the serialized JSON string for use in API requests, localStorage, config files, or debug logs.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use JSON.stringify()">
          <UseCases cases={[
            { icon: '📡', title: 'API Request Bodies', desc: 'Serialize a JavaScript object to JSON before sending it as the body of a fetch or axios POST request.' },
            { icon: '💾', title: 'localStorage Storage', desc: 'localStorage only stores strings. Use JSON.stringify() to serialize objects before saving and JSON.parse() to restore them.' },
            { icon: '📋', title: 'Log Serialization', desc: 'Pretty-print complex objects in server logs or browser console with indentation so nested data is readable.' },
            { icon: '⚙️', title: 'Config Serialization', desc: 'Convert in-memory configuration objects to a JSON string for writing to config files or sending to a settings API.' },
            { icon: '🐛', title: 'Debug Output', desc: 'Inspect the exact serialized form of an object to understand what JSON.stringify() includes, excludes, and transforms.' },
            { icon: '🔁', title: 'Deep Clone via parse+stringify', desc: 'The JSON.parse(JSON.stringify(obj)) pattern creates a deep clone of an object — useful for simple data structures without circular refs.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I pretty-print JSON with JSON.stringify()?',
              a: <>Pass a number as the third argument: <C>JSON.stringify(obj, null, 2)</C> indents with 2 spaces. Use <C>"\t"</C> instead of a number for tab indentation. Omit the argument or pass <C>null</C> for minified, compact output.</>,
            },
            {
              q: 'How does JSON.stringify() handle undefined values?',
              a: 'Object properties whose value is undefined, a function, or a Symbol are omitted from the output entirely. If an array element is undefined, it is serialized as null to preserve array index positions.',
            },
            {
              q: 'What causes a circular reference error?',
              a: <>A <C>TypeError: Converting circular structure to JSON</C> occurs when an object contains a reference back to itself. Fix it with a custom replacer function, or use a library like <C>flatted</C> or <C>json-stringify-safe</C> for circular-safe serialization.</>,
            },
            {
              q: 'What is the difference between JSON.stringify() and a JSON formatter?',
              a: 'JSON.stringify() serializes a JavaScript value into a JSON string — it is a serialization operation. A JSON formatter (beautifier) takes an existing JSON string and re-formats it with indentation and line breaks for readability. This tool does the former; use the JSON Beautifier tool for the latter.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print an existing JSON string', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate that your serialized JSON is syntactically correct', icon: '✅' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Auto-repair malformed JSON before stringifying', icon: '🔧' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode your JSON string as Base64 for safe transport', icon: '🔡' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/json-stringify-vs-json-parse-difference', label: 'stringify vs parse' },
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_stringify_online" />
    </>
  );
}
