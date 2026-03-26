import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
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
  ],
};

export default function LogUnpackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
      </ToolSEOContent>

      <ToolPageFooterBand toolName="log_unpacker" />
    </>
  );
}
