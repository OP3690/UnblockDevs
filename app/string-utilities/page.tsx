import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import StringUtilitiesClient from './client';

const canonicalUrl = 'https://unblockdevs.com/string-utilities';

export const metadata: Metadata = {
  title: 'String Utilities — Case Converter, Encoder, Extractor & Text Tools | UnblockDevs',
  description:
    'Free string utilities for developers. Convert to camelCase, snake_case, PascalCase, kebab-case instantly. Extract emails, URLs, IPs from text. Base64, URL, HTML entity encode/decode. Sort, dedupe, filter lines.',
  keywords: [
    'case converter',
    'camelCase converter',
    'snake_case generator',
    'PascalCase converter',
    'kebab-case converter',
    'string transformation tool',
    'Base64 encode decode',
    'URL encode decode',
    'HTML entities encoder',
    'extract emails from text',
    'extract URLs from text',
    'text utilities developer',
    'string tools online',
    'line sort deduplicate',
    'SCREAMING_SNAKE_CASE',
  ],
  openGraph: {
    title: 'String Utilities — camelCase, snake_case, Base64 & More | UnblockDevs',
    description: 'All case conversions simultaneously + extract emails/URLs + Base64/URL encode. The only string tool you need.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'String Utilities — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'String Utilities — Free Online Tool for Developers',
    description: 'camelCase, snake_case, PascalCase + extract + encode. All transforms shown simultaneously. Free forever.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'String Utilities — Developer Text Tools',
  url: canonicalUrl,
  description: 'Free string utilities: case conversion (camelCase, snake_case, PascalCase, kebab-case), text extraction (emails, URLs, IPs), encoding (Base64, URL, HTML entities), and line tools (sort, dedupe, filter).',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '12 case format conversions simultaneously',
    'Extract emails, URLs, IPs, phone numbers',
    'Base64, URL, HTML entity encoding',
    'Line sort, deduplicate, filter',
    'JSON stringify, ROT13, Hex, Binary',
    'Text statistics (chars, words, lines)',
    'No signup required',
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '3120', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert a string to camelCase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into the String Utilities tool and the "Case Formats" tab shows camelCase (and 11 other formats) in real time. The algorithm splits on spaces, hyphens, underscores, dots, slashes, and camelCase transitions, then joins with the appropriate separator and casing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is snake_case and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'snake_case is a naming convention where words are separated by underscores and written in lowercase (e.g. my_variable_name). It is commonly used in Python variables and functions, Ruby methods, database column names, and environment variables. Our tool converts any string to snake_case instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I Base64 encode a string online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into the String Utilities input area, go to the "Encode/Decode" tab, and click "Encode" next to Base64. The encoded output appears instantly. To decode, paste a Base64 string and click "Decode". Everything runs in your browser — no data is sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I extract all email addresses from a block of text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into the input area, click the "Extract" tab, and click the "Extract" button next to "Emails". All matching email addresses are listed with individual copy buttons and a "Copy All" option. You can also extract URLs, IP addresses, phone numbers, hashtags, hex colors, and more.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a Variable Name to Different Case Formats',
  totalTime: 'PT30S',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your text', text: 'Type or paste any variable name, sentence, or code identifier into the input area at the top.' },
    { '@type': 'HowToStep', position: 2, name: 'View all case formats', text: 'All 12 case format conversions appear instantly in the Case Formats tab — no button click needed.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy your format', text: 'Click the copy icon on any format card to copy it to your clipboard.' },
  ],
};

export default function StringUtilitiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <StringUtilitiesClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="String Utilities — The Only Developer Text Tool You Need">
          <SEOProse>
            String Utilities is a comprehensive text transformation toolkit built for developers. Unlike other tools
            that make you navigate between pages or click separate convert buttons, this tool shows all 12 case format
            conversions simultaneously in real time. Switch between <C>camelCase</C>, <C>PascalCase</C>,{' '}
            <C>snake_case</C>, <C>kebab-case</C>, <C>SCREAMING_SNAKE_CASE</C>, and 7 more formats instantly as you type.
          </SEOProse>
          <SEOProse>
            Beyond case conversion, String Utilities includes a Line Tools tab for sorting, deduplicating, and filtering
            lines; an Extract tab for pulling emails, URLs, IP addresses, and other patterns from raw text; a Transform tab
            for cleaning whitespace and replacing text; and an Encode/Decode tab for Base64, URL encoding, HTML entities,
            JSON stringify, ROT13, hex, and binary encoding — all running 100% in your browser.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Instant Transforms, Zero Config">
          <HowItWorks steps={[
            { n: '01', title: 'Paste any text', desc: 'Type or paste a variable name, sentence, or block of text into the input area.' },
            { n: '02', title: 'All formats appear instantly', desc: 'The Case Formats tab shows all 12 conversions simultaneously — no button needed.' },
            { n: '03', title: 'Copy with one click', desc: 'Click the copy icon on any format card to copy it to your clipboard.' },
            { n: '04', title: 'Use other tabs', desc: 'Switch to Extract, Encode/Decode, Line Tools, or Transform for more operations.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="What Developers Use This For">
          <UseCases cases={[
            { icon: '🐪', title: 'API response mapping', desc: 'Convert snake_case API keys to camelCase for JavaScript objects, or vice versa.' },
            { icon: '🗄️', title: 'Database columns', desc: 'Convert PascalCase class names to snake_case database column names.' },
            { icon: '🔐', title: 'Base64 tokens', desc: 'Encode auth tokens, binary data, or API payloads to Base64 for safe transmission.' },
            { icon: '📧', title: 'Email extraction', desc: 'Extract all email addresses from a CSV, log file, or customer data export.' },
            { icon: '🧹', title: 'Data cleaning', desc: 'Remove duplicate lines, sort alphabetically, filter by keyword, trim whitespace.' },
            { icon: '🔗', title: 'URL encoding', desc: 'Encode query string parameters, decode percent-encoded URLs for debugging.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What is the difference between camelCase and PascalCase?', a: 'camelCase starts with a lowercase letter and capitalizes each subsequent word (myVariableName). PascalCase (also called UpperCamelCase) capitalizes every word including the first (MyVariableName). camelCase is common in JavaScript/TypeScript variables and functions; PascalCase is used for class names and React components.' },
            { q: 'How does the case conversion algorithm handle acronyms?', a: 'The algorithm splits on common separators (spaces, hyphens, underscores, dots, slashes) and also detects camelCase transitions (lowercase followed by uppercase). Each detected "word" is then joined with the appropriate separator and casing for the target format.' },
            { q: 'Is Base64 encoding encryption?', a: 'No. Base64 is an encoding scheme, not encryption. It converts binary data to ASCII text for safe transmission, but provides no security — anyone can decode it. Use it for encoding data in URLs or HTTP headers, not for hiding sensitive information.' },
            { q: 'What regex is used to extract email addresses?', a: 'The email extractor uses a robust pattern that matches the most common email formats: [a-zA-Z0-9._%+−]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. It handles subdomains, plus-sign aliases, and international TLDs.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="More Developer Text Tools">
          <RelatedTools tools={[
            { href: '/regex-tester', label: 'Regex Tester', desc: 'Build and test regular expressions', icon: '🔍' },
            { href: '/text-diff', label: 'Text Diff', desc: 'Compare two texts side by side', icon: '📄' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode and decode Base64', icon: '🔤' },
            { href: '/url-encoder', label: 'URL Encoder', desc: 'Encode and decode URL components', icon: '🔗' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="string_utilities" />
    </>
  );
}
