'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import HomePrivacyFirstSections from '@/components/home/HomePrivacyFirstSections';
import FeedbackNewsletterSplit from '@/components/home/FeedbackNewsletterSplit';
import RecentlyUsedTools from '@/components/home/RecentlyUsedTools';
import AdUnit from '@/components/AdUnit';
import StickyMobileAd from '@/components/StickyMobileAd';

// Mapping of tool tabs to their dedicated page URLs (used by HomePrivacyFirstSections)
const toolPageUrls: Record<string, string> = {
  beautifier: '/json-beautifier',
  fixer: '/json-fixer-online',
  comparator: '/api-comparator',
  jsoncompare: '/json-comparator',
  schema: '/json-schema-generation',
  logs: '/log-explorer',
  payload: '/payload-analyzer',
  curl: '/curl-converter',
  mock: '/mock-api-generator',
  testdata: '/test-data-generator',
  config: '/config-comparator',
  sql: '/sql-formatter',
  builder: '/log-unpacker',
  promptchunk: '/prompt-chunker',
  schemamasker: '/ai-schema-masker',
  jsonpromptshield: '/json-prompt-shield',
  codemasker: '/code-prompt-shield',
  regextester: '/regex-tester',
  tokencompare: '/token-comparator',
  timezone: '/timezone-translator',
  hartocurl: '/har-to-curl',
  curlfailure: '/curl-failure-root-cause-engine',
};

const POPULAR_BLOG_LINKS: { href: string; label: string }[] = [
  // JSON deep dives
  { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
  { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
  { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
  { href: '/blog/json-stringify-complete-guide', label: 'JSON.stringify Guide' },
  { href: '/blog/json-stringify-vs-json-parse-difference', label: 'stringify vs parse' },
  { href: '/blog/why-does-my-json-have-backslashes', label: 'JSON Backslash Fix' },
  { href: '/blog/why-json-stringify-returns-undefined-fix', label: 'stringify Undefined Fix' },
  { href: '/blog/json-schema-complete-guide', label: 'JSON Schema Guide' },
  { href: '/blog/25-broken-json-examples-fix', label: '25 Broken JSON Examples' },
  { href: '/blog/why-ai-generated-json-is-always-broken', label: 'Why AI JSON Is Broken' },
  { href: '/blog/json-parse-stringify-complete-guide', label: 'JSON.parse & stringify Guide' },
  { href: '/blog/hidden-json-errors-that-silently-break-apps', label: 'Hidden JSON Errors' },
  { href: '/blog/json-prompt-injection-ai-security-guide', label: 'JSON Prompt Injection' },
  { href: '/blog/json-lines-ndjson-streaming-format-guide', label: 'NDJSON Streaming Guide' },
  { href: '/blog/llm-structured-json-outputs-complete-guide-2026', label: 'LLM Structured Outputs' },
  { href: '/blog/jwt-json-web-tokens-complete-guide-2026', label: 'JWT Complete Guide' },
  { href: '/blog/rest-api-json-design-best-practices-2026', label: 'REST API JSON Best Practices' },
  { href: '/blog/websocket-sse-long-polling-realtime-json-2026', label: 'WebSocket vs SSE vs Polling' },
  { href: '/blog/oauth2-complete-guide-2026', label: 'OAuth 2.0 Complete Guide' },
  { href: '/blog/json-in-databases-postgresql-jsonb-mysql-mongodb', label: 'JSON in Databases Guide' },
  { href: '/blog/api-rate-limiting-complete-guide-2026', label: 'API Rate Limiting Guide' },
  { href: '/blog/invalid-json-vs-valid-json-examples', label: 'Invalid vs Valid JSON' },
  { href: '/blog/json-format-standards-complete-guide', label: 'JSON Format Standards' },
  // API & cURL
  { href: '/blog/why-my-api-works-in-postman-but-not-in-browser', label: 'Postman vs Browser' },
  { href: '/blog/why-my-api-returns-200-ok-but-data-is-empty', label: '200 OK But Empty' },
  { href: '/blog/how-to-fix-cors-policy-error-javascript', label: 'CORS Policy Fix' },
  { href: '/blog/debug-api-changes-compare-responses', label: 'Debug API Changes' },
  { href: '/blog/api-payload-size-optimization', label: 'API Payload Optimization' },
  { href: '/blog/post-json-data-with-curl-examples-complete-guide', label: 'POST JSON with cURL' },
  { href: '/blog/curl-to-code-converter-guide', label: 'cURL to Code Guide' },
  { href: '/blog/har-to-curl-converter-complete-guide', label: 'HAR to cURL Guide' },
  // JavaScript / Node.js fixes
  { href: '/blog/why-async-await-is-not-working-javascript-common-mistakes', label: 'async/await Mistakes' },
  { href: '/blog/fix-failed-to-fetch-error-javascript-cors-https-network', label: 'Failed to Fetch Fix' },
  { href: '/blog/fix-uncaught-in-promise-error-javascript-explained', label: 'Uncaught Promise Fix' },
  { href: '/blog/fix-cannot-read-property-map-of-undefined-javascript', label: 'Cannot Read .map Fix' },
  { href: '/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it', label: 'process.env Fix' },
  { href: '/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use', label: 'EADDRINUSE Port Fix' },
  // SQL & MySQL
  { href: '/blog/mysql-10-most-used-functions', label: 'MySQL Functions' },
  { href: '/blog/mysql-25-most-used-queries', label: 'MySQL Queries' },
  { href: '/blog/mysql-json-complete-guide', label: 'MySQL JSON Guide' },
  { href: '/blog/is-it-safe-to-paste-sql-into-chatgpt', label: 'Safe to Paste SQL to AI?' },
  // AI & security
  { href: '/blog/chatgpt-real-life-usage-guide', label: 'ChatGPT Usage' },
  { href: '/blog/ai-prompt-engineering-guide', label: 'AI Prompt Engineering' },
  { href: '/blog/token-security-privacy-best-practices', label: 'Token Security' },
  { href: '/blog/hipaa-compliant-ai-development', label: 'HIPAA-Compliant AI' },
  { href: '/blog/how-to-use-ai-for-mysql-without-exposing-database-schema', label: 'AI for MySQL Safely' },
  { href: '/blog/agentic-ai-complete-guide', label: 'Agentic AI' },
  // CS fundamentals
  { href: '/blog/what-is-hashmap-hashtable-explained-simply-with-examples', label: 'HashMap/HashTable' },
  { href: '/blog/binary-search-explained-like-youre-5-with-code-example', label: 'Binary Search' },
  { href: '/blog/what-is-big-o-notation-explained-without-math', label: 'Big O Notation' },
  { href: '/blog/what-is-recursion-explained-with-simple-real-life-examples', label: 'Recursion Explained' },
  // Career & tools
  { href: '/blog/best-free-developer-tools-2026', label: 'Free Dev Tools 2026' },
  { href: '/blog/most-useful-tech-skills-2026', label: 'Tech Skills 2026' },
  { href: '/blog/must-learn-tech-skills-2030', label: 'Tech Skills 2030' },
  { href: '/blog/cursor-ai-code-editor-guide', label: 'Cursor AI Editor' },
  { href: '/blog/apache-kafka-complete-guide', label: 'Apache Kafka' },
  { href: '/blog/apache-kafka-cheat-sheet', label: 'Kafka Cheat Sheet' },
];

const INITIAL_BLOG_LINKS = 15;

function HomeClient({ hero }: { hero: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [showAllBlogLinks, setShowAllBlogLinks] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Redirect legacy ?tab= links to dedicated tool pages
    if (typeof window !== 'undefined') {
      const tab = new URLSearchParams(window.location.search).get('tab');
      const dest = tab ? toolPageUrls[tab] : null;
      if (dest) window.location.replace(dest);
    }
  }, []);

  // Analytics heartbeat
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      fetch('/api/stats', { method: 'POST', credentials: 'include' }).catch(() => {});
    }, 30000);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <div className="relative flex w-full min-w-0 flex-col" style={{ contain: 'layout' }}>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[9999] px-4 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg ring-2 ring-emerald-600 ring-offset-2 opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto"
      >
        Skip to main content
      </a>

      {/* Hero */}
      {hero}

      {/* High-visibility ad — right after hero, before tool tabs (SQ slot unused on homepage) */}
      <div role="region" aria-label="Advertisement" className="border-b border-zinc-100 bg-white py-2">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <AdUnit slot="1255275563" format="auto" minHeight={90} className="w-full" />
        </div>
      </div>

      {/* Recently used tools — personalized shortcut strip */}
      <RecentlyUsedTools />

      {/* ART2 — between shortcuts and tools grid, high scroll-through viewability */}
      <div role="region" aria-label="Advertisement" className="border-b border-zinc-100 bg-zinc-50/40 py-2">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <AdUnit slot="6289722500" format="fluid" layout="in-article" minHeight={90} className="w-full rounded-xl overflow-hidden" />
        </div>
      </div>

      {/* Tools grid + How it works */}
      <main id="main-content">
        <HomePrivacyFirstSections toolPageUrls={toolPageUrls} />
      </main>

      {/* Homepage ads — between tools and newsletter */}
      <div className="border-b border-zinc-200/80 bg-white/60" style={{ contain: 'layout' }}>
        <div role="region" aria-label="Advertisement" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-3">
          <AdUnit slot="1550643245" format="auto" minHeight={60} className="w-full" />
        </div>
        <div role="region" aria-label="Advertisement" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-3">
          <AdUnit slot="6611398233" format="fluid" layout="in-article" minHeight={90} className="w-full rounded-xl overflow-hidden" />
        </div>
      </div>

      {/* Feedback + newsletter */}
      <FeedbackNewsletterSplit layout="split" />

      {/* HOR2 — after newsletter, before footer multiplex */}
      <div role="region" aria-label="Advertisement" className="border-t border-zinc-100 bg-white py-3">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <AdUnit slot="1130443324" format="auto" minHeight={90} className="w-full" />
        </div>
      </div>

      {/* Before-footer multiplex */}
      <div role="region" aria-label="Advertisement" className="border-t border-zinc-100 bg-zinc-50/40 py-4" style={{ contain: 'layout' }}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <AdUnit slot="4987800735" format="autorelaxed" minHeight={90} className="w-full" />
        </div>
      </div>

      {/* Sticky bottom on mobile — VER slot not used anywhere else on homepage */}
      <StickyMobileAd />

      {/* GEO content — AI-extractable definitions, comparisons, and facts */}
      <section className="border-t border-zinc-100 bg-zinc-50/60 py-10 sm:py-14" data-speakable aria-label="About UnblockDevs">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">What is UnblockDevs?</h2>
            <p className="text-zinc-600 text-sm leading-relaxed mb-6">
              <strong>UnblockDevs</strong> is a free suite of 50+ browser-based developer tools — JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, Base64 encoder, regex tester, UUID generator, password generator, and AI data masking tools.
              Every tool runs <strong>100% client-side</strong>: your JSON payloads, API keys, tokens, and SQL schemas never leave your browser.
              No account, no signup, no usage limits — free forever.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { heading: '50+ Tools', body: 'JSON, JWT, cURL, SQL, Base64, regex, UUID, CORS, password, hash, URL encoding, and more — all in one place.' },
                { heading: '100% Private', body: 'All processing happens in your browser. Nothing is sent to any server. Safe for production data, PII, and regulated environments.' },
                { heading: 'No Signup Required', body: 'Open any tool and start immediately. No account creation, no email, no credit card — ever.' },
              ].map(({ heading, body }) => (
                <div key={heading} className="rounded-xl border border-zinc-200 bg-white p-4">
                  <p className="font-semibold text-zinc-900 text-sm mb-1">{heading}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-zinc-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  q: 'Is UnblockDevs free?',
                  a: 'Yes — all 50+ tools are completely free with no subscription, no account, and no usage limits.',
                },
                {
                  q: 'Does UnblockDevs store my data?',
                  a: 'No. Every tool processes data locally in your browser. Nothing is sent to any server, making it GDPR-safe and suitable for enterprise and production use.',
                },
                {
                  q: 'What is the best free online JSON formatter?',
                  a: 'UnblockDevs JSON Formatter (unblockdevs.com/json-formatter) validates, beautifies, and fixes malformed JSON in the browser. No upload, no signup, supports large files.',
                },
                {
                  q: 'How do I convert cURL to Python or JavaScript?',
                  a: 'Use the UnblockDevs cURL Converter (unblockdevs.com/curl-converter). Paste any cURL command and select a target language: Python (requests), JavaScript (fetch/Axios), Go, Java, PHP, Ruby, or Rust.',
                },
                {
                  q: 'How do I decode a JWT token safely?',
                  a: 'Use the UnblockDevs JWT Decoder (unblockdevs.com/jwt-decoder). It decodes the header, payload, and claims entirely in your browser — your token is never transmitted.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-lg border border-zinc-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-zinc-800 list-none [&::-webkit-details-marker]:hidden">
                    {q}
                    <span className="ml-2 shrink-0 text-zinc-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="px-4 pb-3 text-xs text-zinc-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO link hub */}
      <section className="border-t border-zinc-200 bg-white py-8 sm:py-12">
        <div className="ud-content container-padding">
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-gray-700 px-1">
              <strong className="text-gray-900">UnblockDevs</strong> — Free Online Developer Tools Suite
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-1 px-1">
              JSON Viewer, Formatter, Parser, Beautifier, Fixer, JSON to Excel/CSV, API testing, schema generation, SQL formatting, log analysis, and more. All tools are free and run in your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 mt-3 text-xs text-gray-600 [&_a]:py-2 [&_a]:min-h-[44px] [&_a]:inline-flex [&_a]:items-center [&_a]:touch-manipulation">
              {[
                ['/json-formatter', 'JSON Formatter'],
                ['/json-validator', 'JSON Validator'],
                ['/json-beautifier', 'JSON Beautifier'],
                ['/json-fixer-online', 'JSON Fixer'],
                ['/json-schema-generation', 'JSON Schema Generator'],
                ['/json-to-excel', 'JSON to Excel'],
                ['/json-comparator', 'JSON Comparator'],
                ['/api-comparator', 'API Comparator'],
                ['/har-to-curl', 'HAR to cURL'],
                ['/curl-converter', 'cURL to Code'],
                ['/json-stringify-online', 'JSON.stringify()'],
                ['/token-comparator', 'Token Comparator'],
                ['/jwt-decoder', 'JWT Decoder'],
                ['/base64-encoder', 'Base64 Encoder'],
                ['/password-generator', 'Password Generator'],
                ['/uuid-generator', 'UUID Generator'],
                ['/cors-tester', 'CORS Tester'],
                ['/hash-generator', 'Hash Generator'],
                ['/url-encoder', 'URL Encoder'],
                ['/prompt-chunker', 'Prompt Chunker'],
                ['/sql-formatter', 'SQL Formatter'],
                ['/sql-in-generator', 'SQL IN Generator'],
                ['/regex-tester', 'Regex Tester'],
                ['/log-explorer', 'Log Explorer'],
                ['/log-unpacker', 'Log Unpacker'],
                ['/curl-failure-root-cause-engine', 'cURL Failure Analyzer'],
                ['/ai-schema-masker', 'AI Schema Masker'],
                ['/code-prompt-shield', 'Code Prompt Shield'],
                ['/svg-to-image', 'SVG to Image'],
                ['/data-insights', 'Data Insights'],
                ['/speed-test', 'Speed Test'],
                ['/timezone-translator', 'Timezone Translator'],
                ['/truth-table-generator', 'Truth Table'],
                ['/password-audit', 'Password Audit'],
                ['/mock-api-generator', 'Mock API Generator'],
                ['/test-data-generator', 'Test Data Generator'],
                ['/payload-analyzer', 'Payload Analyzer'],
                ['/config-comparator', 'Config Comparator'],
                ['/pdf-to-excel-word', 'PDF to Excel/Word'],
                ['/cron-expression', 'Cron Expression Builder'],
                ['/markdown-preview', 'Markdown Preview'],
                ['/http-headers-analyzer', 'HTTP Headers Analyzer'],
                ['/string-utilities', 'String Utilities'],
                ['/image-to-text', 'Image to Text (OCR)'],
                ['/json-error-explainer', 'AI JSON Error Explainer'],
                ['/html-viewer', 'HTML Viewer'],
                ['/html-formatter', 'HTML Formatter'],
                ['/color-picker', 'Color Picker'],
                ['/css-box-shadow', 'CSS Box Shadow'],
                ['/css-gradient-generator', 'CSS Gradient Generator'],
                ['/text-diff', 'Text Diff'],
                ['/timestamp-converter', 'Timestamp Converter'],
                ['/image-to-base64', 'Image to Base64'],
                ['/json-to-typescript', 'JSON to TypeScript'],
                ['/curl-to-python', 'cURL to Python'],
                ['/curl-to-requests', 'cURL to Requests'],
                ['/convert-curl-to-http-request', 'Convert cURL to HTTP'],
                ['/sql-formatter', 'SQL Formatter'],
                ['/sql-in-clause-generator', 'SQL IN Clause Generator'],
                ['/json-formatter', 'JSON Formatter'],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="text-emerald-800 hover:text-emerald-950 hover:underline">
                  ✓ {label}
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 sm:py-2 text-sm font-medium rounded-lg transition-colors touch-manipulation text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50"
              >
                <FileText className="w-4 h-4 text-emerald-800" aria-hidden />
                <span>Developer&apos;s Study Materials 📚</span>
              </Link>
            </div>
          </div>

          {/* Popular Blog Posts */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">Popular Developer Guides</h3>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs [&_a]:py-2 [&_a]:inline-flex [&_a]:items-center [&_a]:touch-manipulation">
              {(showAllBlogLinks ? POPULAR_BLOG_LINKS : POPULAR_BLOG_LINKS.slice(0, INITIAL_BLOG_LINKS)).map(({ href, label }) => (
                <Link key={href} href={href} className="text-emerald-800 hover:text-emerald-950 hover:underline">{label}</Link>
              ))}
            </div>
            {!showAllBlogLinks && POPULAR_BLOG_LINKS.length > INITIAL_BLOG_LINKS && (
              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={() => setShowAllBlogLinks(true)}
                  className="text-emerald-800 hover:text-emerald-950 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded px-2 py-1"
                >
                  Show all {POPULAR_BLOG_LINKS.length} guides →
                </button>
              </div>
            )}
          </div>

          {/* Footer links */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
              {[
                ['/about', 'About Us'],
                ['/badges', 'Badges'],
                ['/contact', 'Contact'],
                ['/blog', 'Blog'],
                ['/privacy-policy', 'Privacy Policy'],
                ['/terms', 'Terms & Conditions'],
                ['/disclaimer', 'Disclaimer'],
              ].map(([href, label], i, arr) => (
                <span key={href} className="inline-flex items-center gap-4">
                  <Link href={href} className="hover:text-emerald-900 hover:underline transition-colors">{label}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">•</span>}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              🚀 Built for developers who ship — by developers who get it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeClient;
