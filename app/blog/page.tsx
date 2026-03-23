import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { blogPosts } from '@/lib/blog-posts-data';
import { BlogListClient } from './BlogListClient';

const PER_PAGE = 6;

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { page?: string };
}): Promise<Metadata> {
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const page = Math.max(1, Math.min(Number.parseInt(searchParams?.page ?? '1', 10) || 1, totalPages || 1));
  const canonical = page <= 1 ? 'https://unblockdevs.com/blog' : `https://unblockdevs.com/blog?page=${page}`;
  const isPagination = page > 1;
  return {
    title: page <= 1
      ? 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs'
      : `Developer Debugging Guides - Page ${page} | UnblockDevs`,
    description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
    alternates: { canonical },
    // Noindex pagination (page 2+) so crawl budget goes to /blog and individual posts
    ...(isPagination ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs',
      description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
      url: canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Developer Guides' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs',
      description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
      images: ['/og-image.png'],
    },
    keywords: [
      'fix json parse error',
      'unexpected token in json',
      'json syntax error checker',
      'json formatter with error highlight',
      'how to validate json online',
      'decode jwt token',
      'verify jwt signature',
      'post json data with curl',
      'api debugging guides',
      'developer troubleshooting tutorials',
    ],
  };
}

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const currentPage = Math.max(
    1,
    Math.min(
      Number.parseInt(searchParams?.page ?? '1', 10) || 1,
      totalPages || 1
    )
  );
  const start = (currentPage - 1) * PER_PAGE;
  const initialPosts = blogPosts.slice(start, start + PER_PAGE);
  const canonical = currentPage <= 1 ? 'https://unblockdevs.com/blog' : `https://unblockdevs.com/blog?page=${currentPage}`;
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: initialPosts.length,
    itemListElement: initialPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: start + index + 1,
      url: `https://unblockdevs.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <div className="min-h-0 bg-[#FAFAFA]">
      {/* Page hero — global SiteHeader is above; keep width aligned with redesign */}
      <div className="border-b border-zinc-200 bg-white/80">
        <div className="mx-auto max-w-[1100px] px-6 py-8 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
                Developer guides <span className="text-emerald-700" aria-hidden>📚</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                JSON, APIs, debugging, and workflows — free to read, no signup.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              ← All tools
            </Link>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-[1100px] px-6 pt-8 pb-4">
        <p className="text-slate-600 text-center max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Browse guides on JSON, APIs, data engineering, AI, and more.
        </p>
      </div>

      {/* Main Content - Post Grid */}
      <main className="mx-auto max-w-[1100px] px-6 pb-12 sm:pb-16">
        <Script
          id={`blog-breadcrumb-schema-${currentPage}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
        <Script
          id={`blog-itemlist-schema-${currentPage}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <BlogListClient initialPosts={initialPosts} totalPages={totalPages} currentPage={currentPage} />

        {/* SEO Content Section */}
        <section className="mt-12 sm:mt-14 ud-surface p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-5 tracking-tight">About this blog</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Welcome to <strong>Developer's Study Materials</strong> by UnblockDevs—your go-to resource for articles, tutorials, and best practices on <strong>JSON Viewer</strong>, <strong>JSON Parser</strong>, <strong>JSON Beautifier</strong>, API testing, web development, and more.
            </p>
            <p className="mb-4">
              Our blog covers a wide range of topics including:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>JSON Tools:</strong> Learn about JSON Viewer, JSON Parser, JSON Beautifier, JSON Formatter, and JSON validation tools</li>
              <li><strong>API Testing:</strong> Best practices for API response comparison, payload analysis, and API testing strategies</li>
              <li><strong>Data Conversion:</strong> Guides on converting JSON to Excel, CSV, and other formats</li>
              <li><strong>Developer Tools:</strong> Tutorials on using modern developer tools to improve your workflow</li>
              <li><strong>Performance Optimization:</strong> Tips and techniques for optimizing API payloads and improving application performance</li>
              <li><strong>Code Generation:</strong> Learn how to convert curl commands to code and generate mock APIs</li>
            </ul>
            <p>
              Whether you're a beginner learning about <strong>JSON parsing</strong> or an experienced developer looking to optimize your API responses, our blog has something for everyone. Stay updated with the latest trends, tools, and best practices in web development.
            </p>
          </div>
        </section>

        {/* Featured - Internal Links for SEO */}
        <section className="mt-10 sm:mt-12 ud-surface-soft p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-primary-50/40 via-white to-indigo-50/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 tracking-tight">Featured guides</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/chatgpt-real-life-usage-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">ChatGPT Real-Life Usage Guide</h3>
              <p className="text-sm text-gray-600">Complete guide to using ChatGPT in real life with practical use cases and best prompts.</p>
            </Link>
            <Link href="/blog/ai-prompt-engineering-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">AI Prompt Engineering Guide</h3>
              <p className="text-sm text-gray-600">Learn how to write effective AI prompts with best practices and techniques.</p>
            </Link>
            <Link href="/blog/hipaa-compliant-ai-development" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">HIPAA-Compliant AI Development</h3>
              <p className="text-sm text-gray-600">Use ChatGPT without exposing patient data. Mask SQL, JSON, and code in your browser—client-side only.</p>
            </Link>
            <Link href="/blog/blockchain-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Blockchain Complete Guide</h3>
              <p className="text-sm text-gray-600">Comprehensive guide to Blockchain technology, smart contracts, and Web3.</p>
            </Link>
            <Link href="/blog/mysql-10-most-used-functions" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">MySQL 10 Most Used Functions</h3>
              <p className="text-sm text-gray-600">Essential MySQL functions every developer should know with examples.</p>
            </Link>
            <Link href="/blog/token-security-privacy-best-practices" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Token Security Best Practices</h3>
              <p className="text-sm text-gray-600">Learn how to secure tokens and implement privacy best practices.</p>
            </Link>
            <Link href="/blog/5g-6g-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">5G & 6G Complete Guide</h3>
              <p className="text-sm text-gray-600">Comprehensive guide to 5G and 6G technologies and their impact.</p>
            </Link>
            <Link href="/blog/tokens-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Tokens Complete Guide</h3>
              <p className="text-sm text-gray-600">Everything you need to know about tokens in modern applications.</p>
            </Link>
            <Link href="/blog/token-technologies-history-evolution" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Token Technologies History</h3>
              <p className="text-sm text-gray-600">The evolution and history of token technologies in computing.</p>
            </Link>
            <Link href="/blog/agentic-ai-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Agentic AI Complete Guide</h3>
              <p className="text-sm text-gray-600">Learn about agentic AI systems and autonomous AI agents.</p>
            </Link>
            <Link href="/blog/apache-kafka-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Apache Kafka Complete Guide</h3>
              <p className="text-sm text-gray-600">Master Apache Kafka for distributed streaming and event processing.</p>
            </Link>
            <Link href="/blog/confidential-computing-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Confidential Computing Guide</h3>
              <p className="text-sm text-gray-600">Learn about confidential computing and data protection technologies.</p>
            </Link>
            <Link href="/blog/cursor-ai-code-editor-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Cursor AI Code Editor Guide</h3>
              <p className="text-sm text-gray-600">Complete guide to using Cursor AI-powered code editor effectively.</p>
            </Link>
            <Link href="/blog/digital-twins-complete-guide" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Digital Twins Complete Guide</h3>
              <p className="text-sm text-gray-600">Understanding digital twins and their applications in IoT and industry.</p>
            </Link>
            <Link href="/blog/apache-kafka-cheat-sheet" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Apache Kafka Cheat Sheet</h3>
              <p className="text-sm text-gray-600">Quick reference guide for Apache Kafka commands and concepts.</p>
            </Link>
          </div>
        </section>

        {/* Intent-focused links that match natural developer searches */}
        <section className="mt-10 ud-surface p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 tracking-tight">Popular developer searches</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/fix-unexpected-end-of-json-input-error-explained" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Fix JSON Parse Errors</h3>
              <p className="text-sm text-gray-600">Unexpected token, invalid JSON format, and parsing edge cases with reproducible fixes.</p>
            </Link>
            <Link href="/blog/why-my-api-works-in-postman-but-not-in-browser" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">API Works in Postman, Not Browser</h3>
              <p className="text-sm text-gray-600">High-intent debugging flow for CORS, auth headers, cookies, and browser-specific request behavior.</p>
            </Link>
            <Link href="/json-validator" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Validate JSON Online</h3>
              <p className="text-sm text-gray-600">Check syntax and structure fast before deploying payloads or sharing examples.</p>
            </Link>
            <Link href="/jwt-decoder" className="ud-link-card p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Decode JWT Tokens</h3>
              <p className="text-sm text-gray-600">Inspect claims, expiration, and token payloads during auth debugging workflows.</p>
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="ud-surface p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">JSON Error Hub</h2>
            <p className="mt-2 text-sm text-gray-600">Most searched debugging paths for malformed payloads and parse failures.</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/blog/fix-unexpected-end-of-json-input-error-explained" className="block text-primary-700 hover:underline">Unexpected end of JSON input</Link>
              <Link href="/blog/fix-unexpected-token-less-than-in-json-api-returns-html" className="block text-primary-700 hover:underline">Unexpected token &lt; in JSON</Link>
              <Link href="/fix-json-parse-error-javascript" className="block text-primary-700 hover:underline">JSON parse error: unexpected token</Link>
              <Link href="/json-validator" className="block text-primary-700 hover:underline">Open JSON Validator Tool</Link>
            </div>
          </div>

          <div className="ud-surface p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">JWT & Auth Hub</h2>
            <p className="mt-2 text-sm text-gray-600">High-intent auth troubleshooting for token inspection and verification.</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/jwt-decoder" className="block text-primary-700 hover:underline">Decode JWT Token Online</Link>
              <Link href="/hash-generator" className="block text-primary-700 hover:underline">Generate SHA / MD5 / HMAC Hash</Link>
              <Link href="/url-encoder" className="block text-primary-700 hover:underline">URL Encode/Decode Tool</Link>
              <Link href="/blog/token-security-privacy-best-practices" className="block text-primary-700 hover:underline">Token security best practices</Link>
            </div>
          </div>

          <div className="ud-surface p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">API Debugging Hub</h2>
            <p className="mt-2 text-sm text-gray-600">Natural search patterns developers use when APIs fail in production.</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/blog/why-my-api-works-in-postman-but-not-in-browser" className="block text-primary-700 hover:underline">API works in Postman, not browser</Link>
              <Link href="/blog/post-json-data-with-curl-examples-complete-guide" className="block text-primary-700 hover:underline">Post JSON data with curl</Link>
              <Link href="/curl-failure-root-cause-engine" className="block text-primary-700 hover:underline">Curl failure root-cause engine</Link>
              <Link href="/cors-tester" className="block text-primary-700 hover:underline">CORS tester tool</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

