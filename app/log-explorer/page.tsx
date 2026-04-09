import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import LogExplorerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/log-explorer';

export const metadata: Metadata = {
  title: 'Log Explorer — Parse, Filter & Analyze Log Files, JSON Logs & Structured Logs Online Free | UnblockDevs',
  description:
    'Parse, filter, and analyze log files in the browser — JSON, NDJSON, Apache, Nginx, CSV, and plain text. Timeline view, error analysis, JWT detection. 100% client-side, no upload.',
  keywords: [
    'log explorer',
    'log analyzer online',
    'json log viewer',
    'log parser online',
    'debug log viewer',
    'analyze logs online',
    'cloudwatch log parser',
    'kubernetes log viewer',
    'structured log analysis',
    'ndjson log viewer',
    'nginx log parser',
    'apache log analyzer',
    'log filter online',
    'parse log file online',
    'log analysis tool',
  ],
  openGraph: {
    title: 'Log Explorer — Parse, Filter & Analyze Log Files, JSON Logs & Structured Logs Online Free | UnblockDevs',
    description: 'Parse and analyze JSON, NDJSON, Apache, Nginx, CSV, and plain text logs 100% client-side. Timeline, filters, error analysis, JWT detection.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Explorer — Parse, Filter & Analyze Logs Online Free | UnblockDevs',
    description: 'JSON, NDJSON, Apache, Nginx, CSV, plain text. Filter, search, timeline. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Log Explorer — Parse, Filter & Analyze Log Files Online',
  description:
    'Parse, filter, and analyze log files in the browser — JSON, NDJSON, Apache, Nginx, CSV, and plain text. Timeline, error analysis, JWT detection. 100% client-side.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Supports JSON, NDJSON, Apache, Nginx, CSV, and plain text log formats',
    'Auto-detects log format on paste',
    'Filter and search by keyword, level, or regex',
    'Timeline and error-rate visualization',
    'JWT token detection and decoding',
    '100% browser-based — logs never leave your machine',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1600',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I parse log files online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Visit unblockdevs.com/log-explorer and paste your log content directly into the input area. The tool auto-detects the format (JSON, NDJSON, Apache, Nginx, CSV, or plain text) and renders each entry as a structured, filterable row. No file upload required — all processing happens in your browser.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between JSON logs and plain text logs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON logs encode each entry as a JSON object with named fields (timestamp, level, message, traceId, etc.), making them machine-parseable and easy to filter. Plain text logs (like Apache Common Log Format) use positional or regex-parsed fields, which are human-readable but harder to query programmatically. Structured JSON logging is strongly preferred for production systems.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I filter logs to find specific errors?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use the level filter to show only ERROR or WARN entries, then use the keyword search to narrow down by message, service name, or trace ID. The tool also supports regex patterns for advanced filtering across any log field.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is structured logging and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Structured logging means writing each log entry as a machine-parseable format (typically JSON) with consistent field names. This makes logs queryable, alertable, and easier to aggregate in tools like Datadog, CloudWatch, or ELK Stack. Unstructured plain text logs require regex parsing and break when message formats change.',
      },
    },
  ],
};

export default function LogExplorerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LogExplorerClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Log Explorer?">
          <SEOProse>
            A <strong>log explorer</strong> is a browser-based tool for parsing, filtering, and making sense
            of application log output — without sending your logs to a third-party service. Paste raw log
            content and the tool renders each entry as a structured, searchable row.
          </SEOProse>
          <SEOProse>
            <strong>Structured vs unstructured logs:</strong> Structured logs (JSON, NDJSON) carry named
            fields like <C>level</C>, <C>timestamp</C>, and <C>traceId</C> that can be filtered precisely.
            Unstructured logs (Apache Common Log, Nginx, plain text) use fixed-position or regex-parsed
            fields. Log Explorer auto-detects both forms and normalises entries into a consistent view for
            filtering, searching, and exporting — making log analysis fast even when the format varies.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Explore Logs in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or upload logs', desc: 'Drop in raw log text — multi-line JSON, NDJSON, Apache, Nginx, CSV, or unstructured plain text.' },
            { n: '02', title: 'Auto-detect format', desc: 'The tool identifies the log format automatically and parses every entry into structured fields.' },
            { n: '03', title: 'Filter & search', desc: 'Filter by log level (ERROR, WARN, INFO), search by keyword or regex, and narrow by time range.' },
            { n: '04', title: 'Export results', desc: 'Copy filtered entries or export matching rows as JSON or CSV for sharing or further analysis.' },
          ]} />
        </SEOSection>

        {/* Supported formats */}
        <SEOSection id="formats" heading="Supported Log Formats">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-6 font-semibold text-zinc-700">Format</th>
                  <th className="pb-3 font-semibold text-zinc-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['JSON', 'Single JSON object per entry — common in Node.js, Python, and Go services'],
                  ['NDJSON / JSON Lines', 'One JSON object per line — default format for Docker, Kubernetes, and Datadog'],
                  ['Apache Common Log', 'Fixed-format access logs from Apache HTTP Server'],
                  ['Nginx', 'Access and error logs from Nginx — combined and error formats'],
                  ['CSV', 'Comma-separated log exports from CloudWatch, Splunk, or custom pipelines'],
                  ['Plain text', 'Free-form lines — level and timestamp extracted via heuristics'],
                ].map(([fmt, desc]) => (
                  <tr key={fmt}>
                    <td className="py-3 pr-6 font-semibold text-zinc-900 whitespace-nowrap">{fmt}</td>
                    <td className="py-3 text-zinc-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Log Explorer">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug Production Errors', desc: 'Paste a log dump, filter to ERROR level, and find the root cause without spinning up a log aggregator.' },
            { icon: '🌐', title: 'Analyze Access Logs', desc: 'Parse Nginx or Apache access logs to see traffic patterns, status code distribution, and slow requests.' },
            { icon: '🔍', title: 'Find Anomalies', desc: 'Search for unexpected patterns, spike in warnings, or repeated stack traces across large log files.' },
            { icon: '⚡', title: 'Performance Profiling', desc: 'Filter by service name or trace ID and sort by duration to identify slow operations in structured logs.' },
            { icon: '📋', title: 'Audit Trails', desc: 'Inspect user action logs or access audit logs without uploading sensitive data to an external service.' },
            { icon: '🚨', title: 'Incident Response', desc: 'During an outage, quickly triage logs by time range and error level to narrow down the blast radius.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Do my logs get uploaded to any server?',
              a: 'No. Log Explorer runs entirely in your browser using JavaScript. Your log data never leaves your machine — no upload, no server-side processing. Safe for sensitive production logs and PII-containing entries.',
            },
            {
              q: 'What is the difference between JSON logs and plain text logs?',
              a: <>JSON logs store each entry as a structured object with named fields (<C>level</C>, <C>message</C>, <C>timestamp</C>, <C>traceId</C>). Plain text logs (Apache, Nginx, custom formats) use positional or regex-parsed fields. Structured JSON is strongly preferred for production because it is machine-queryable and does not break when message text changes.</>,
            },
            {
              q: 'How do I filter logs by severity or keyword?',
              a: 'Use the level dropdown to show only ERROR, WARN, INFO, or DEBUG entries. The keyword search bar matches against any field in the parsed entry. For advanced matching, prefix your query with / to use a regex pattern.',
            },
            {
              q: 'What are log levels and which ones should I monitor?',
              a: 'Standard log levels in order of severity: DEBUG < INFO < WARN < ERROR < FATAL. In production, monitor ERROR and FATAL actively (they require action), investigate WARN trends, and treat DEBUG/INFO as diagnostic noise. Filter to ERROR first when triaging incidents.',
            },
            {
              q: 'Can I use regex to filter log entries?',
              a: 'Yes. Type a forward slash followed by your regex pattern (e.g. /database.*timeout) in the search bar to match entries with full regex support — useful for matching variable error messages, UUIDs, or IP address ranges.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and prettify JSON log entries for readability', icon: '✨' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two log entries or API responses side by side', icon: '🔀' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Decode Base64-encoded values found in log fields', icon: '🔤' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate trace IDs and correlation IDs for logging', icon: '🔑' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="log_explorer" />
    </>
  );
}
