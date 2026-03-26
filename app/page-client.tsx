'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import HomePrivacyFirstSections from '@/components/home/HomePrivacyFirstSections';
import FeedbackNewsletterSplit from '@/components/home/FeedbackNewsletterSplit';

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
  { href: '/blog/chatgpt-real-life-usage-guide', label: 'ChatGPT Usage' },
  { href: '/blog/ai-prompt-engineering-guide', label: 'AI Prompt Engineering' },
  { href: '/blog/blockchain-complete-guide', label: 'Blockchain' },
  { href: '/blog/mysql-10-most-used-functions', label: 'MySQL Functions' },
  { href: '/blog/token-security-privacy-best-practices', label: 'Token Security' },
  { href: '/blog/5g-6g-complete-guide', label: '5G & 6G' },
  { href: '/blog/agentic-ai-complete-guide', label: 'Agentic AI' },
  { href: '/blog/apache-kafka-complete-guide', label: 'Apache Kafka' },
  { href: '/blog/confidential-computing-complete-guide', label: 'Confidential Computing' },
  { href: '/blog/cursor-ai-code-editor-guide', label: 'Cursor AI' },
  { href: '/blog/ai-productivity-tools-complete-guide', label: 'AI Productivity' },
  { href: '/blog/digital-twins-complete-guide', label: 'Digital Twins' },
  { href: '/blog/apache-kafka-cheat-sheet', label: 'Kafka Cheat Sheet' },
  { href: '/blog/hipaa-compliant-ai-development', label: 'HIPAA-Compliant AI' },
  { href: '/blog/must-learn-tech-skills-2030', label: 'Tech Skills 2030' },
  { href: '/blog/most-useful-tech-skills-2026', label: 'Tech Skills 2026' },
  { href: '/blog/what-is-hashmap-hashtable-explained-simply-with-examples', label: 'HashMap/HashTable' },
  { href: '/blog/how-to-fix-cors-policy-error-javascript', label: 'CORS Policy Error' },
  { href: '/blog/binary-search-explained-like-youre-5-with-code-example', label: 'Binary Search' },
  { href: '/blog/best-free-developer-tools-2026', label: 'Free Dev Tools 2026' },
];

const INITIAL_BLOG_LINKS = 20;

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

      {/* Tools grid + How it works */}
      <main id="main-content">
        <HomePrivacyFirstSections toolPageUrls={toolPageUrls} />
      </main>

      {/* Ad slots */}
      <div className="ud-content py-0 border-b border-zinc-200/80 bg-white/60">
        <div id="ezoic-pub-ad-placeholder-101" role="region" aria-label="Advertisement" className="min-h-[50px] w-full flex items-center justify-center" style={{ contain: 'layout' }} />
        <div id="ezoic-pub-ad-placeholder-111" role="region" aria-label="Advertisement" className="min-h-[90px] w-full flex items-center justify-center" style={{ contain: 'layout' }} />
      </div>

      {/* Feedback + newsletter */}
      <FeedbackNewsletterSplit layout="split" />

      {/* Before-footer ad */}
      <div id="ezoic-pub-ad-placeholder-103" role="region" aria-label="Advertisement" className="min-h-[50px] sm:min-h-[90px] w-full" style={{ contain: 'layout' }} />

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
                <>
                  <Link key={href} href={href} className="hover:text-emerald-900 hover:underline transition-colors">{label}</Link>
                  {i < arr.length - 1 && <span key={`sep-${i}`} className="text-gray-300">•</span>}
                </>
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
