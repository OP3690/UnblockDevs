import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import LogUnpackerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/log-unpacker';

export const metadata: Metadata = {
  title: 'Free Log Unpacker — Decode Stringified JSON Logs | UnblockDevs',
  description:
    'Decode stringified JSON logs, unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub file paths. AI-safe output for ChatGPT. Free, 100% browser-based.',
  keywords: [
    'unescape json logs',
    'decode stringified json',
    'stringified json decoder',
    'parse stringified json online',
    'decode jwt in logs',
    'sanitize logs before chatgpt',
    'log json unescaper',
    'how to unescape json in logs',
    'recursive json unescape',
    'log file decoder online',
    'epoch timestamp in logs converter',
    'pii remover from logs',
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
    title: 'Free Log Unpacker — Unescape JSON, Decode JWTs & Sanitize Logs for AI | UnblockDevs',
    description:
      'Recursively unescape nested JSON logs, decode JWTs, convert epoch timestamps, and scrub file paths. AI-safe output ready for ChatGPT. Free, 100% browser-based — nothing uploaded.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Log%20Unpacker&emoji=%F0%9F%93%A6&desc=Decode%20stringified%20JSON%20logs%20and%20fix%20escaped%20log%20output', width: 1200, height: 630, alt: 'Log Unpacker — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Log Unpacker — Decode Stringified JSON Logs for ChatGPT',
    description: 'Decode stringified JSON, unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub paths. AI-safe for ChatGPT. 100% browser-based.',
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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Recursively unescape nested stringified JSON',
    'Detect and decode JWTs inline (header + payload, optional PII masking)',
    'Convert 10- and 13-digit epoch timestamps to human-readable dates',
    'Scrub Windows/Unix file paths (usernames redacted)',
    'AI-safe output — ready to paste into ChatGPT or any AI',
    '100% client-side — no data sent to any server',
  ],};

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
      name: 'Why do my logs show escaped quotes and backslashes instead of readable JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Your logging library serialized a JSON object into a string before embedding it inside another JSON field — causing the escaped quotes (\\") and backslashes you see. This happens when HTTP bodies, error objects, or nested payloads are logged as strings, or when a JSON payload is double-encoded. Log Unpacker recursively unescapes these strings even when nested multiple levels deep, restoring clean readable JSON.',
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
      name: 'How do I read the opaque token strings that appear in my auth-related log lines?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Those opaque strings are likely JWT (JSON Web Token) tokens — three Base64URL-encoded parts separated by dots: header.payload.signature. They appear in logs when Authorization headers, request bodies, or debug output are logged verbatim. Log Unpacker detects these patterns and decodes the header and payload inline to show the claims (user ID, roles, expiry) without needing to validate the signature or leave your browser.',
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
              q: 'Why do my logs show escaped quotes and backslashes instead of readable JSON?',
              a: <>Your logging library serialized a JSON object into a string — adding escaped quotes (<C>{`\\"`}</C>) and backslashes — before embedding it in another field. Log Unpacker recursively unescapes these strings, even when nested multiple levels deep, so you see clean readable JSON.</>,
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
              q: 'Why do my logs show escaped quotes and backslashes instead of readable JSON?',
              a: <>Your logging library serialized a JSON object into a string before embedding it inside another JSON field — causing the escaped quotes (<C>{`\\"`}</C>) and backslashes you see. This happens when HTTP bodies, error objects, or nested payloads are logged as strings. Log Unpacker recursively unescapes these even when nested multiple levels deep, restoring clean readable JSON.</>,
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
              q: 'How do I read the opaque token strings that appear in my auth-related log lines?',
              a: 'Those opaque strings are JWT tokens — three Base64URL-encoded parts separated by dots: header.payload.signature. They appear when Authorization headers or request bodies are logged verbatim. Log Unpacker detects and decodes the header and payload inline to show the claims (user ID, roles, expiry) without leaving your browser.',
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
