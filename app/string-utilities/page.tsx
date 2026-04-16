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
    'string utilities online',
    'trim whitespace online',
    'remove whitespace string',
    'string case converter',
    'uppercase lowercase converter',
    'title case converter',
    'reverse string online',
    'count characters online',
    'word count online',
    'string length calculator',
    'remove duplicate lines',
    'sort lines alphabetically',
    'remove empty lines',
    'find replace text online',
    'string escape unescape',
    'escape html online',
    'unescape html',
    'escape json string online',
    'url encode string',
    'base64 encode string',
    'md5 string hash',
    'sha256 string',
    'string to hex',
    'hex to string',
    'string to binary',
    'binary to string',
    'string to ascii',
    'ascii to string',
    'string to unicode',
    'unicode decode',
    'rot13 encoder',
    'caesar cipher',
    'string palindrome check',
    'string comparison',
    'split string online',
    'join strings online',
    'string wrap',
    'string format online',
    'text manipulation online',
    'developer string tools',
    'string operations online',
    'free text tools',
    'string truncate',
    'string repeat',
    'string count occurrences',
    'string extract numbers',
    'slug generator',
    'string normalize',
    'unicode normalization',
    'strip accents string',
    'remove special chars',
    'string line endings',
    'CRLF LF converter',
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
    {
      '@type': 'Question',
      name: 'What string utilities are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'String Utilities provides case conversion (camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE_CASE, Title Case, and more), text extraction (emails, URLs, IPs, phone numbers), encoding and decoding (Base64, URL, HTML entities, JSON stringify, ROT13, hex, binary), and line tools (sort, deduplicate, filter, reverse). All operations run entirely in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a string to snake_case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into the String Utilities input and the Case Formats tab instantly shows the snake_case version alongside all other formats. The converter handles spaces, hyphens, existing camelCase, and PascalCase as word separators, joins the words with underscores, and lowercases everything.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I remove whitespace from a string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to the Transform tab in String Utilities and use the "Trim" or "Remove all whitespace" option. Trim removes leading and trailing whitespace only, while the remove option strips all spaces and tabs from the string. You can also collapse multiple consecutive spaces into one using the normalize whitespace option.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I reverse a string online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into String Utilities, go to the Transform tab, and click "Reverse". The tool reverses the entire string character by character. For reversing line order rather than individual characters, use the Line Tools tab and choose "Reverse lines".',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I count words and characters in text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'String Utilities displays a live character count, word count, and line count in the statistics bar below the input field as you type or paste text. No button click is required — the counts update instantly with every keystroke.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I remove duplicate lines from text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to the Line Tools tab in String Utilities and click "Remove duplicates". The tool removes repeated lines, keeping the first occurrence of each unique line. You can also choose case-insensitive deduplication to treat "Hello" and "hello" as duplicates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I escape a string for JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to the Encode/Decode tab and click "JSON Stringify". This wraps your string in JSON quotes and escapes backslashes, double quotes, newlines, tabs, and other control characters so the result is a valid JSON string literal. This is equivalent to calling JSON.stringify(str) in JavaScript.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a string to Base64?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into String Utilities, go to the Encode/Decode tab, and click "Encode" next to Base64. The tool uses the browser\'s built-in btoa() function (with proper UTF-8 handling for non-ASCII characters). To decode, paste a Base64 string and click "Decode".',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert text to hex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the Encode/Decode tab, click "Text to Hex". Each character is converted to its hexadecimal ASCII code, separated by spaces. For example, "Hello" becomes "48 65 6c 6c 6f". To convert back, use "Hex to Text".',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I sort lines alphabetically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to the Line Tools tab and click "Sort A-Z" for ascending alphabetical order or "Sort Z-A" for descending. You can also sort numerically if your lines contain numbers. The sort is case-insensitive by default, but a case-sensitive option is available.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert between Unix and Windows line endings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to the Transform tab in String Utilities and use the line ending converter. "Convert to LF" replaces all CRLF (\\r\\n) sequences with LF (\\n) for Unix/macOS compatibility. "Convert to CRLF" does the reverse for Windows compatibility. The current line ending style is detected and shown automatically.',
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
            { q: 'What string utilities are available?', a: 'String Utilities provides case conversion (camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE_CASE, Title Case, and more), text extraction (emails, URLs, IPs, phone numbers), encoding and decoding (Base64, URL, HTML entities, JSON stringify, ROT13, hex, binary), and line tools (sort, deduplicate, filter, reverse). All operations run entirely in your browser.' },
            { q: 'How do I convert a string to camelCase?', a: 'Paste your text into the String Utilities input and the Case Formats tab instantly shows the camelCase version. The converter handles spaces, hyphens, underscores, and existing PascalCase as word separators, lowercases the first word, and capitalizes the first letter of each subsequent word.' },
            { q: 'How do I convert a string to snake_case?', a: 'Paste your text into String Utilities and the Case Formats tab instantly shows the snake_case version. The converter splits on spaces, hyphens, camelCase transitions, and existing separators, then joins the words with underscores and lowercases everything.' },
            { q: 'How do I remove whitespace from a string?', a: 'Go to the Transform tab in String Utilities and use the "Trim" or "Remove all whitespace" option. Trim removes leading and trailing whitespace only, while the remove option strips all spaces and tabs from the string. You can also collapse multiple consecutive spaces into one using the normalize whitespace option.' },
            { q: 'How do I reverse a string online?', a: 'Paste your text into String Utilities, go to the Transform tab, and click "Reverse". The tool reverses the entire string character by character. For reversing line order rather than individual characters, use the Line Tools tab and choose "Reverse lines".' },
            { q: 'How do I count words and characters in text?', a: 'String Utilities displays a live character count, word count, and line count in the statistics bar below the input field as you type or paste text. No button click is required — the counts update instantly with every keystroke.' },
            { q: 'How do I remove duplicate lines from text?', a: 'Go to the Line Tools tab in String Utilities and click "Remove duplicates". The tool removes repeated lines, keeping the first occurrence of each unique line. You can also choose case-insensitive deduplication to treat "Hello" and "hello" as duplicates.' },
            { q: 'How do I escape a string for JSON?', a: 'Go to the Encode/Decode tab and click "JSON Stringify". This wraps your string in JSON quotes and escapes backslashes, double quotes, newlines, tabs, and other control characters so the result is a valid JSON string literal — equivalent to calling JSON.stringify(str) in JavaScript.' },
            { q: 'How do I convert a string to Base64?', a: 'Paste your text into String Utilities, go to the Encode/Decode tab, and click "Encode" next to Base64. The tool uses the browser\'s built-in btoa() function with proper UTF-8 handling for non-ASCII characters. To decode, paste a Base64 string and click "Decode".' },
            { q: 'How do I convert text to hex?', a: 'In the Encode/Decode tab, click "Text to Hex". Each character is converted to its hexadecimal ASCII code, separated by spaces. For example, "Hello" becomes "48 65 6c 6c 6f". To convert back, use "Hex to Text".' },
            { q: 'How do I sort lines alphabetically?', a: 'Go to the Line Tools tab and click "Sort A-Z" for ascending alphabetical order or "Sort Z-A" for descending. You can also sort numerically if your lines contain numbers. The sort is case-insensitive by default, but a case-sensitive option is available.' },
            { q: 'How do I convert between Unix and Windows line endings?', a: 'Go to the Transform tab in String Utilities and use the line ending converter. "Convert to LF" replaces all CRLF (\\r\\n) sequences with LF (\\n) for Unix/macOS compatibility. "Convert to CRLF" does the reverse for Windows compatibility. The current line ending style is detected and shown automatically.' },
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
