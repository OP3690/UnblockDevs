import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import LogUnpackerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/log-unpacker';

export const metadata: Metadata = {
  title:
    'Log Unpacker — Unescape Stringified JSON, Decode JWTs, Convert Epoch Timestamps & Sanitize Logs for AI | UnblockDevs',
  description:
    'Recursively unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub file paths from logs — all in your browser. AI-safe output ready to paste into ChatGPT. Free, no signup, nothing sent to servers.',
  keywords: [
    'unescape json logs',
    'decode jwt in logs',
    'log json unescaper',
    'stringified json decoder',
    'unescape nested json online',
    'parse stringified json online',
    'log sanitizer for chatgpt',
    'parse stringified json logs',
    'stringified json beautifier',
    'recursive json unescape',
    'decode jwt from logs',
    'jwt decoder logs',
    'epoch timestamp in logs converter',
    'convert epoch timestamp logs',
    'human readable timestamp logs',
    'sanitize logs before chatgpt',
    'safe logs for ai prompts',
    'scrub logs for chatgpt',
    'paste logs into chatgpt safely',
    'log file decoder online',
    'production log sanitizer',
    'log analysis tool browser',
    'how to unescape json in logs',
    'how to decode jwt from log file',
    'how to safely paste logs into chatgpt',
    'what is stringified json in logs',
    'Log Unpacker',
    'log unpacker tool',
    'json log unescape online',
    'json unescape online',
    'json string parse online',
    'decode escaped json',
    'unescape json string online',
    'json string to json object online',
    'nested json unescaper',
    'log beautifier online',
    'log cleaner for ai',
    'log sanitizer for llm',
    'log scrubber online',
    'pii remover from logs',
    'redact logs for ai',
    'redact logs for chatgpt',
    'log privacy tool',
    'jwt in log file',
    'detect jwt in logs',
    'decode base64 jwt',
    'epoch to datetime converter',
    'unix timestamp to date online',
    'unix epoch converter logs',
    'millisecond epoch converter',
    'file path scrubber',
    'file path sanitizer logs',
    'windows path sanitizer',
    'remove username from log',
    'log file pii removal',
    'stringified json multiple levels',
    'double escaped json',
    'triple escaped json',
    'unescape json string',
    'json pretty print from logs',
    'decode production logs',
    'log cleaner tool',
    'log sanitizer free',
    'log pii scrubber',
    'json log decoder',
    'epoch timestamp converter logs',
  ],
  openGraph: {
    title: 'Log Unpacker — Unescape JSON, Decode JWTs, Epoch Timestamps & Sanitize for AI | UnblockDevs',
    description:
      'Unescape nested JSON, decode JWTs, convert epochs, scrub paths — all in your browser. AI-safe output for ChatGPT. Free, nothing sent to servers.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Unpacker — Unescape JSON, Decode JWTs & Sanitize Logs for AI | UnblockDevs',
    description: 'One tool for stringified JSON, JWTs, epoch timestamps, path scrubbing. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Log Unpacker — Unescape Stringified JSON, Decode JWTs, Sanitize Logs for AI',
  description:
    'Recursively unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub file paths from logs. AI-safe output for ChatGPT. 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Recursively unescape nested stringified JSON',
    'Detect and decode JWTs inline (header + payload, optional PII masking)',
    'Convert 10- and 13-digit epoch timestamps to human-readable dates',
    'Scrub Windows/Unix file paths (usernames redacted)',
    'AI-safe output — ready to paste into ChatGPT or any AI',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '670',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I unescape stringified JSON from logs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your log line into Log Unpacker at unblockdevs.com/log-unpacker. It recursively unescapes nested JSON strings, even multiple levels deep, and outputs clean readable JSON entirely in your browser.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I decode a JWT token found in log files?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker automatically detects JWT tokens embedded in log output and decodes the header and payload inline. It also optionally masks PII fields like sub, name, and email.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste production logs into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Not without sanitizing first. Logs often contain JWTs, file paths with usernames, and sensitive data. Log Unpacker produces an AI-safe output with paths and tokens scrubbed — safe to paste into ChatGPT or any AI tool.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert epoch timestamps in logs to readable dates?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker detects both 10-digit and 13-digit epoch timestamps automatically and converts them to human-readable date strings as part of the unpacking process.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does Log Unpacker send my logs to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Everything runs in your browser. No network requests, no storage, no telemetry. Safe for sensitive production logs.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is stringified JSON in logs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Stringified JSON occurs when a JSON object is serialized to a string and embedded inside another JSON field — appearing with escaped quotes (\\") and backslashes. This happens when logging libraries serialize inner objects as strings, when HTTP bodies are double-encoded, or when a JSON payload is stored as a string value. Log Unpacker recursively unescapes these strings even when nested multiple levels deep.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I unescape doubly or triply escaped JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker applies recursive unescaping — it detects escaped JSON strings and unescapes them, then checks if the result is still an escaped JSON string and unescapes again, until the innermost value is reached. Paste your multi-level escaped log output and the tool handles 2, 3, or 4 levels of nesting automatically.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I remove PII from logs before sharing with AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Enable the "Mask PII" and "Scrub Paths" options before copying the output. The tool redacts JWT claim fields (sub, name, email), replaces Windows/Unix file paths with sanitized versions, and masks common identifier patterns. The resulting output is safe to paste into ChatGPT, Claude, or other AI assistants for debugging help.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert a Unix timestamp to a readable date?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker automatically detects 10-digit Unix timestamps (seconds since epoch) and 13-digit timestamps (milliseconds) in your log output and converts them to human-readable ISO 8601 date strings inline. You do not need to identify them manually — the conversion happens as part of the unpacking process.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a JWT token in log files?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JWT (JSON Web Token) is a Base64URL-encoded token with three parts separated by dots: header.payload.signature. When auth tokens appear in log lines (from Authorization headers, request body logging, or debug output), they look like opaque strings. Log Unpacker detects these patterns and decodes the header and payload to show the claims — without validating the signature.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I sanitize logs for an LLM or AI assistant?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Before pasting logs into ChatGPT, Claude, Gemini, or any AI assistant: enable "Mask PII" to redact JWT identity claims, enable "Scrub Paths" to remove file system paths containing usernames, and review the output for any remaining sensitive data (API keys, database passwords, internal hostnames). Log Unpacker produces an AI-ready, readable version of your logs in one step.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert multiple Unix timestamps in a log file at once?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker automatically detects and converts all Unix timestamps found in a pasted log — both seconds-precision (10-digit epoch) and milliseconds-precision (13-digit epoch) — replacing them inline with ISO 8601 UTC strings. Paste your full log block and the tool processes every timestamp in one pass, so you do not need to convert timestamps one at a time.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Unpack and Unescape Log Output Online',
  description: 'Step-by-step guide to unpacking nested escaped JSON, decoding JWTs, and converting timestamps in log output.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your log', text: 'Paste a log line, a blob of escaped JSON, or a full log file section containing stringified data.' },
    { '@type': 'HowToStep', position: 2, name: 'Auto-detect & unpack', text: 'The tool recursively unescapes nested JSON, decodes JWTs inline (header + payload), and converts epoch timestamps.' },
    { '@type': 'HowToStep', position: 3, name: 'Sanitize for AI', text: 'Enable path scrubbing and JWT PII masking to remove usernames and sensitive identifiers before sharing.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy AI-safe output', text: 'Copy the sanitized, readable output and paste into ChatGPT or any AI to get debugging help safely.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Log Unpacker', item: canonicalUrl },
  ],
};

export default function LogUnpackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LogUnpackerClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is Log Unpacker?">
          <SEOProse>
            <strong>Log Unpacker</strong> is a browser-based tool that decodes messy production log output into clean, readable data. It recursively unescapes nested stringified JSON (even multiple levels deep), automatically detects and decodes JWT tokens embedded in log lines, converts Unix epoch timestamps to human-readable dates, and scrubs Windows/Unix file paths to protect usernames. The result is AI-safe output you can paste directly into ChatGPT or any AI assistant for debugging help.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Unpack and Sanitize Logs in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your log', desc: 'Paste a log line, a blob of escaped JSON, or a full log file section containing stringified data.' },
            { n: '02', title: 'Auto-detect & unpack', desc: 'The tool recursively unescapes nested JSON, decodes JWTs inline (header + payload), and converts epoch timestamps.' },
            { n: '03', title: 'Sanitize for AI', desc: 'Enable path scrubbing and JWT PII masking to remove usernames and sensitive identifiers before sharing.' },
            { n: '04', title: 'Copy AI-safe output', desc: 'Copy the sanitized, readable output and paste into ChatGPT or any AI to get debugging help safely.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Log Unpacker">
          <UseCases cases={[
            { icon: '📋', title: 'Unescape Stringified JSON', desc: 'Decode nested escaped JSON strings in log files — even three or four levels deep — into readable format.' },
            { icon: '🔐', title: 'Decode JWT in Logs', desc: 'Automatically detect and decode JWT tokens embedded in log output to inspect claims without a separate tool.' },
            { icon: '⏱️', title: 'Convert Epoch Timestamps', desc: 'Turn 10-digit and 13-digit Unix timestamps into human-readable dates without switching to a separate converter.' },
            { icon: '🛡️', title: 'Sanitize for AI', desc: 'Scrub file paths and redact JWT PII fields before pasting production logs into ChatGPT.' },
            { icon: '🐛', title: 'Debug Microservice Logs', desc: 'Quickly read nested JSON payloads and auth tokens in distributed system logs without writing parsing scripts.' },
            { icon: '🔒', title: 'HIPAA/Privacy Compliance', desc: 'Remove usernames and PII from log exports before sharing with third-party tools or AI assistants.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is stringified JSON in logs?',
              a: <>Stringified JSON is JSON that has been serialized into a string — with escaped quotes (<C>{`\\"`}</C>) and backslashes — often when one JSON payload is nested inside another. Log Unpacker recursively unescapes these strings so you see clean, readable JSON.</>,
            },
            {
              q: 'How do I decode a JWT token found in log files?',
              a: 'Paste your log line. Log Unpacker automatically detects JWT tokens (three Base64URL parts separated by dots), decodes the header and payload, and shows them inline. Enable "Mask PII" to redact sub, name, and email fields.',
            },
            {
              q: 'Is it safe to paste production logs into ChatGPT?',
              a: 'Not without sanitizing first. Logs often contain JWTs, file paths with usernames, and sensitive data. Log Unpacker produces AI-safe output with paths and tokens scrubbed — safe to paste into any AI tool.',
            },
            {
              q: 'How are epoch timestamps converted?',
              a: 'Log Unpacker detects both 10-digit (seconds) and 13-digit (milliseconds) Unix timestamps and converts them to human-readable ISO date strings automatically as part of the unpacking process.',
            },
            {
              q: 'Does Log Unpacker send my logs to a server?',
              a: 'No. Everything runs in your browser. No network requests, no storage, no telemetry. Safe for sensitive production logs.',
            },
            {
              q: 'What is stringified JSON in logs?',
              a: <>Stringified JSON is a JSON object serialized into a string — with escaped quotes (<C>{`\\"`}</C>) — embedded inside another JSON field. It happens when logging libraries serialize inner objects as strings. Log Unpacker recursively unescapes these even multiple levels deep.</>,
            },
            {
              q: 'How do I unescape doubly or triply escaped JSON?',
              a: 'Log Unpacker applies recursive unescaping — it detects escaped JSON, unescapes it, checks if the result is still escaped, and repeats until the innermost value is reached. Handles 2, 3, or 4 levels of nesting automatically.',
            },
            {
              q: 'How do I remove PII from logs before sharing with AI?',
              a: 'Enable "Mask PII" and "Scrub Paths" options before copying output. The tool redacts JWT identity claims (sub, name, email), sanitizes file paths, and masks common PII patterns — safe to paste into ChatGPT or any AI assistant.',
            },
            {
              q: 'How do I convert a Unix timestamp to a readable date?',
              a: 'Log Unpacker automatically detects 10-digit (seconds) and 13-digit (milliseconds) Unix timestamps and converts them to ISO 8601 date strings inline. No manual identification needed — conversion happens during unpacking.',
            },
            {
              q: 'What is a JWT token in log files?',
              a: 'A JWT is a Base64URL-encoded token with three dot-separated parts: header.payload.signature. Log Unpacker detects JWT patterns in log lines and decodes the header and payload to show the claims inline — without validating the signature.',
            },
            {
              q: 'How do I sanitize logs for an LLM or AI assistant?',
              a: 'Enable Mask PII to redact JWT identity claims, enable Scrub Paths to remove file system paths with usernames, then review the output for remaining sensitive data (API keys, passwords). Log Unpacker produces AI-ready output in one step.',
            },
            {
              q: 'How do I convert multiple Unix timestamps in a log file at once?',
              a: <>Log Unpacker automatically detects and converts all Unix timestamps in a pasted log — both 10-digit (seconds) and 13-digit (milliseconds) epoch values — replacing them inline with ISO 8601 UTC strings. Paste your full log block and every timestamp is converted in one pass.</>,
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Full JWT decoder with HMAC verification and security audit', icon: '🪙' },
            { href: '/json-prompt-shield', label: 'JSON Prompt Shield', desc: 'Mask JSON keys and values before sending to AI', icon: '🛡️' },
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Sanitize code files with secrets and tokens before AI prompts', icon: '🔐' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask database schema names before sharing with AI', icon: '🔒' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'JSON in Log Lines Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Structured Log Debugging' },
            { href: '/blog/json-best-practices-production-guide', label: 'Log Parsing Best Practices' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fixing Escaped JSON in Logs' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="log_unpacker" />
    </>
  );
}
