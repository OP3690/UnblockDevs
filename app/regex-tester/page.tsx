import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import RegexTesterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/regex-tester';

export const metadata: Metadata = {
  title: 'Free Regex Tester — Test JavaScript Regex Online | UnblockDevs',
  description:
    'Test JavaScript regex in real time. See all matches, capture groups, and indexes highlighted live. Test regex replace with $1 $2 references — free online.',
  keywords: [
    'regex tester online',
    'regex tester free',
    'javascript regex tester',
    'test regex online',
    'regex capture group tester',
    'regex replace tester',
    'regex validator online',
    'how to test a regex pattern online',
    'regex flags explained',
    'regex checker online',
    'regex101 alternative',
    'regex pattern tester javascript',
  ],
  openGraph: {
    title:
      'Free Regex Tester — Test JavaScript Regex Online with Capture Groups & Flags | UnblockDevs',
    description:
      'Test JavaScript regex in real time against sample text. See all matches, capture groups, indexes, and test replace with $1 $2 group references. Supports all JS flags: g, i, m, s, u, y. Free, browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Regex%20Tester&emoji=%F0%9F%A7%AA&desc=Test%20JavaScript%20regex%20patterns%20with%20live%20match%20highlighting', width: 1200, height: 630, alt: 'Regex Tester — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Regex Tester — JavaScript Regex Online with Capture Groups',
    description:
      'Test regex in real time. See matches, capture groups, and replace output with $1 $2. All JavaScript flags supported. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Regex Tester — Test JavaScript Regular Expressions Online, Capture Groups, Replace & Flags',
  description:
    'Test regular expressions in real time. See all matches, capture groups, and match indexes highlighted in your text. Test regex replace with $1 $2 group references. JavaScript RegExp (ECMAScript), all flags (g i m s u y). Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Real-time matching as you type',
    'All matches and capture groups displayed with index',
    'Visual text highlighting',
    'Replace mode with $1 $2 capture group support',
    'All JavaScript flags: g, i, m, s, u, y',
    'Sample patterns: email, URL, phone, capture groups',
    '100% browser-based — nothing sent to server',
  ],};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I test a regex pattern online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your regular expression and test string at unblockdevs.com/regex-tester. Matches highlight in real time as you type — no clicking needed. The results table shows every match, its position index, and any capture groups.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the g flag in JavaScript regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The g (global) flag makes the regex find all matches in the string instead of stopping after the first one. Without g, only the first match is returned. Most search and replace use cases require the g flag.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use capture groups in regex replace?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Wrap the parts to capture in parentheses in your pattern. In the replacement field, reference them with $1 for the first group, $2 for the second, and so on. For example, pattern (\\w+)\\s(\\w+) with replacement $2 $1 swaps the first two words.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between + and * in regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '* matches 0 or more occurrences and can match nothing. + matches 1 or more and requires at least one character. Use + when a character must appear, use * when it is optional.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What does \\d mean in regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: '\\d matches any digit character — equivalent to [0-9]. Use \\d+ for one or more digits, \\d{4} for exactly 4 digits. \\D (uppercase) matches any non-digit character.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Why does my regex match in regex101 but not in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'regex101 defaults to the PCRE engine which supports features like lookbehind with variable length and possessive quantifiers that JavaScript does not support. JavaScript uses the ECMAScript (ES2018+) engine. Switch regex101 to the "JavaScript" flavor to get accurate results, or test directly here which uses the native JavaScript RegExp engine.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between global and non-global regex flags?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Without the g (global) flag, regex.match() or regex.exec() returns only the first match. With the g flag, all matches are returned. In JavaScript, string.matchAll() requires the g flag and returns an iterator of all matches with capture group details.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I match a regex in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use str.match(/pattern/g) to return all matches as an array, or regex.exec(str) inside a loop for detailed match info including index and capture groups. The regex.test(str) method returns true/false for a quick yes/no check.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use regex in Python?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Import the re module. Use re.match() to match at the start of a string, re.search() to match anywhere, re.findall() to return all matches as a list, and re.sub() to replace matches. Compile patterns with re.compile() for repeated use.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use named capture groups?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Named groups use the syntax (?<name>pattern) in JavaScript (ES2018+) and Python. In JavaScript, access named groups via match.groups.name. In Python, use match.group("name"). Named groups make regex more readable than numbered $1, $2 references.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a lookahead in regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A lookahead asserts what must come after the current position without including it in the match. Positive lookahead (?=...) requires the pattern to follow; negative lookahead (?!...) requires it not to follow. For example, \\d+(?= dollars) matches a number only if followed by " dollars".',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I validate an email with regex?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A common email regex is /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/. This validates basic email format but is intentionally simplified — full RFC 5322 compliance requires a much more complex pattern. For production validation, supplement regex with a DNS MX record lookup.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between greedy and lazy quantifiers?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Greedy quantifiers (*, +, {n,m}) match as much text as possible. Lazy quantifiers (*?, +?, {n,m}?) match as little as possible. For example, <.+> matches the longest possible tag, while <.+?> matches each tag individually. Use lazy quantifiers when extracting delimited content.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test a Regular Expression Online',
  description: 'Step-by-step guide to testing JavaScript regex patterns against sample text in real time.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your pattern', text: 'Type a regex pattern (without the surrounding /slashes/). Toggle flags — g (global), i (case-insensitive), m (multiline), s (dotAll), u (Unicode), y (sticky).' },
    { '@type': 'HowToStep', position: 2, name: 'Paste test string', text: 'Paste the text you want to match against. Matches highlight inline as you type — no need to click.' },
    { '@type': 'HowToStep', position: 3, name: 'Inspect matches', text: 'The results table shows every match, its start index, length, and all capture group values ($1, $2…) extracted from the text.' },
    { '@type': 'HowToStep', position: 4, name: 'Test replace', text: 'Switch to Replace mode and enter a replacement string with $1 $2 group references. See the transformed output immediately.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Regex Tester', item: canonicalUrl },
  ],
};

export default function RegexTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RegexTesterClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a Regex Tester?">
          <SEOProse>
            A <strong>regex tester</strong> lets you write and validate regular expressions against sample text in real time, seeing exactly which characters match, which capture groups fire, and what a replacement produces — without writing a test script. This tester uses the <strong>JavaScript RegExp engine</strong> (ECMAScript), the same engine running in Node.js, browsers, and Deno.
          </SEOProse>
          <SEOProse>
            Regular expressions are sequences of characters that define a search pattern. A pattern like <C>\d{'{3}'}-\d{'{4}'}</C> matches a 7-digit phone number; <C>^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{'{2,}'}$</C> validates email addresses. Testing live before using in production prevents subtle bugs from slipping through.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Test Regex Patterns in Real Time">
          <HowItWorks steps={[
            { n: '01', title: 'Enter your pattern', desc: 'Type a regex pattern (without the surrounding /slashes/). Toggle flags — g (global), i (case-insensitive), m (multiline), s (dotAll), u (Unicode), y (sticky).' },
            { n: '02', title: 'Paste test string', desc: 'Paste the text you want to match against. Matches highlight inline as you type — no need to click.' },
            { n: '03', title: 'Inspect matches', desc: 'The results table shows every match, its start index, length, and all capture group values ($1, $2…) extracted from the text.' },
            { n: '04', title: 'Test replace', desc: 'Switch to Replace mode and enter a replacement string with $1 $2 group references. See the transformed output immediately.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a Regex Tester">
          <UseCases cases={[
            { icon: '✅', title: 'Validate Input Formats', desc: 'Test email, phone, ZIP code, and URL validation patterns before adding them to form validation or API schemas.' },
            { icon: '🔍', title: 'Grep Log Files', desc: 'Build patterns to search log files for error codes, stack traces, IP addresses, or timestamp ranges.' },
            { icon: '✂️', title: 'Extract Data', desc: 'Use capture groups to pull structured values (dates, IDs, tokens) out of unstructured text or API responses.' },
            { icon: '🔄', title: 'String Replacement', desc: 'Test find-and-replace patterns for code refactoring, renaming variables, or transforming data formats.' },
            { icon: '🔗', title: 'URL Routing', desc: 'Validate Next.js, Express, or Nginx route patterns against sample URLs to check path segments and query params.' },
            { icon: '🛡️', title: 'Security Filters', desc: 'Test input sanitization patterns that block XSS payloads, SQL injection strings, or path traversal attempts.' },
          ]} />
        </SEOSection>

        <SEOSection id="cheatsheet" heading="JavaScript Regex Quick Reference">
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Token</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Meaning</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {[
                  ['.', 'Any character except newline (use s flag for newline)', '/h.t/ → "hat", "hit", "hot"'],
                  ['\\d', 'Any digit [0-9]', '/\\d+/ → "42" in "page 42"'],
                  ['\\w', 'Word character [a-zA-Z0-9_]', '/\\w+/ → "hello_world"'],
                  ['\\s', 'Whitespace (space, tab, newline)', '/a\\sb/ → "a b"'],
                  ['^', 'Start of string (or line with m flag)', '/^hello/ → only at start'],
                  ['$', 'End of string (or line with m flag)', '/world$/ → only at end'],
                  ['*', '0 or more of the preceding token', '/go*d/ → "gd", "god", "good"'],
                  ['+', '1 or more of the preceding token', '/go+d/ → "god", "good" (not "gd")'],
                  ['?', '0 or 1 (optional)', '/colou?r/ → "color" or "colour"'],
                  ['{n,m}', 'Between n and m occurrences', '/\\d{2,4}/ → 2 to 4 digits'],
                  ['(…)', 'Capture group — accessible via $1, $2', '/(\\w+)@/ captures username'],
                  ['(?:…)', 'Non-capturing group (group without capture)', '/(?:https?):\\/\\//'],
                  ['[abc]', 'Character class — any of a, b, c', '/[aeiou]/ matches vowels'],
                  ['[^abc]', 'Negated class — anything except a, b, c', '/[^aeiou]/ matches consonants'],
                  ['a|b', 'Alternation — matches a or b', '/cat|dog/ → "cat" or "dog"'],
                ].map(([token, meaning, example]) => (
                  <tr key={String(token)}>
                    <td className="px-4 py-3 font-mono text-zinc-800">{token}</td>
                    <td className="px-4 py-3 text-zinc-600">{meaning}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-zinc-500">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I test a regex pattern online?',
              a: 'Paste your pattern and test string here. Matches highlight in real time. The results table shows every match, its index position, and any capture groups — no clicking required.',
            },
            {
              q: 'What is the g flag in JavaScript regex?',
              a: <>The <C>g</C> (global) flag makes the regex find all matches in the string instead of stopping after the first. Without <C>g</C>, only the first match is returned. Most search and replace scenarios require <C>g</C>.</>,
            },
            {
              q: 'How do I use capture groups in regex replace?',
              a: <>Wrap the parts to capture in parentheses: <C>(\\w+)</C>. In the replacement string, reference them with <C>$1</C>, <C>$2</C>. For example, pattern <C>(\\w+)\\s(\\w+)</C> with replacement <C>$2 $1</C> swaps two words.</>,
            },
            {
              q: 'What is the difference between + and * in regex?',
              a: <><C>*</C> matches zero or more occurrences — it can match nothing. <C>+</C> matches one or more — it requires at least one character. Use <C>+</C> when the character must appear, <C>*</C> when it is optional.</>,
            },
            {
              q: 'What does \\d mean in regex?',
              a: <><C>\\d</C> matches any digit character — equivalent to <C>[0-9]</C>. Use <C>\\d+</C> for one or more digits, <C>\\d{'{4}'}</C> for exactly four digits. <C>\\D</C> (uppercase) matches any non-digit.</>,
            },
            {
              q: 'How do I make a regex case-insensitive?',
              a: <>Add the <C>i</C> flag. With <C>i</C>, the pattern <C>/hello/i</C> matches "Hello", "HELLO", "hElLo". Toggle it in the flags row above the pattern input.</>,
            },
            {
              q: 'Why does my regex match in regex101 but not in JavaScript?',
              a: 'regex101 defaults to the PCRE engine which supports features like variable-length lookbehind and possessive quantifiers that JavaScript does not support. Switch regex101 to the "JavaScript" flavor to get accurate results, or test directly here — this tool uses the native JavaScript RegExp engine.',
            },
            {
              q: 'What is the difference between global and non-global regex flags?',
              a: 'Without the g (global) flag, regex returns only the first match. With g, all matches are returned. In JavaScript, string.matchAll() requires the g flag and returns an iterator of all matches with capture group details.',
            },
            {
              q: 'How do I match a regex in JavaScript?',
              a: <>Use <C>str.match(/pattern/g)</C> to return all matches, or <C>regex.exec(str)</C> in a loop for match details. <C>regex.test(str)</C> returns a quick true/false.</>,
            },
            {
              q: 'How do I use regex in Python?',
              a: <>Import the <C>re</C> module. Use <C>re.findall()</C> to return all matches, <C>re.search()</C> to find anywhere, and <C>re.sub()</C> to replace matches.</>,
            },
            {
              q: 'How do I use named capture groups?',
              a: <>Named groups use <C>{'(?<name>pattern)'}</C> in JavaScript and Python. Access via <C>match.groups.name</C> in JavaScript or <C>match.group("name")</C> in Python.</>,
            },
            {
              q: 'What is a lookahead in regex?',
              a: <>Positive lookahead <C>{'(?=...)'}</C> asserts what must follow without including it in the match. Negative lookahead <C>{'(?!...)'}</C> asserts what must not follow. They do not consume characters.</>,
            },
            {
              q: 'How do I validate an email with regex?',
              a: <>A common pattern is <C>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{'{2,}'}$/</C>. For production validation, supplement regex with a DNS MX record lookup.</>,
            },
            {
              q: 'What is the difference between greedy and lazy quantifiers?',
              a: <>Greedy quantifiers (<C>*</C>, <C>+</C>) match as much as possible. Lazy quantifiers (<C>*?</C>, <C>+?</C>) match as little as possible. Use lazy when extracting delimited content like HTML tags.</>,
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax — often combined with regex for field-level content validation', icon: '✅' },
            { href: '/url-encoder', label: 'URL Encoder', desc: 'Encode strings extracted via regex before using in URLs or query parameters', icon: '🔗' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Hash matched strings for safe logging or comparison', icon: '#️⃣' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare extracted tokens or pattern matches side by side', icon: '🔍' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Regex for JSON Validation' },
            { href: '/blog/json-best-practices-production-guide', label: 'Input Validation Patterns' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Pattern Matching in APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging Regex Errors' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="regex_tester" />
    </>
  );
}
