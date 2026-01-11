'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, AlertCircle, Lightbulb, Zap, BookOpen, Search, TrendingUp } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
export default function SEOOptimizedHTMLClient() {
  const CodeBlock = ({ code, language = 'html' }: { code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
            <span className="text-sm font-semibold text-gray-300 uppercase">{language}</span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm text-gray-100 font-mono">{code}</code>
          </pre>
        </div>
      </div>
    );
  };

  const TipBox = ({ children, type = 'tip' }: { children: React.ReactNode; type?: 'tip' | 'warning' | 'info' }) => {
    const styles = {
      tip: 'bg-blue-50 border-blue-500 text-blue-900',
      warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
      info: 'bg-purple-50 border-purple-500 text-purple-900',
    };

    const icons = {
      tip: Lightbulb,
      warning: AlertCircle,
      info: BookOpen,
    };

    const Icon = icons[type];

    return (
      <div className={`border-l-4 ${styles[type]} p-5 rounded-r-lg my-6 shadow-sm`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${type === 'tip' ? 'text-blue-600' : type === 'warning' ? 'text-yellow-600' : 'text-purple-600'}`} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              SEO & Web Development
            </span>
            <time className="text-sm text-gray-500" dateTime="2024-01-24">
              January 24, 2024
            </time>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">14 min read</span>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="SEO-Optimized HTML Markup: Complete Guide for Better Rankings"
        description="SEO-Optimized HTML Markup: Complete Guide for Better Rankings"
        variant="floating"
      />


      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            SEO-Optimized HTML Markup: Complete Guide for Better Rankings
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Learn how to write HTML that search engines love. Master semantic HTML, meta tags, structured data, and SEO best practices to improve your website's visibility.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Search className="w-8 h-8 text-blue-600" />
                Why SEO-Optimized HTML Matters
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Search engines rely on HTML structure to understand and rank your content. Proper HTML markup helps search engines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Understand your content's hierarchy and meaning</li>
                <li>Index your pages more accurately</li>
                <li>Display rich snippets in search results</li>
                <li>Improve accessibility for all users</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                1. Semantic HTML for SEO
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Semantic HTML uses meaningful tags that describe content purpose. Search engines use these tags to understand your page structure.
              </p>

              <CodeBlock code={`<!-- ❌ Bad: Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- ✅ Good: Semantic HTML -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>
<footer>...</footer>`} />

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  { tag: '<header>', purpose: 'Page or section header' },
                  { tag: '<nav>', purpose: 'Navigation links' },
                  { tag: '<main>', purpose: 'Main content area' },
                  { tag: '<article>', purpose: 'Independent content' },
                  { tag: '<section>', purpose: 'Thematic grouping' },
                  { tag: '<aside>', purpose: 'Sidebar content' },
                  { tag: '<footer>', purpose: 'Page or section footer' },
                  { tag: '<time>', purpose: 'Dates and times' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <code className="text-blue-700 font-mono font-semibold">{item.tag}</code>
                    <p className="text-gray-700 text-sm mt-1">{item.purpose}</p>
                  </div>
                ))}
              </div>

              <TipBox>
                <p className="font-semibold mb-1">💡 SEO Benefit:</p>
                <p className="text-sm">Semantic HTML helps search engines understand content hierarchy, improving your chances of appearing in featured snippets.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                2. Essential Meta Tags
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Meta tags provide crucial information to search engines about your page. Here are the most important ones:
              </p>

              <CodeBlock code={`<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport for mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary meta tags -->
  <title>Your Page Title (50-60 characters)</title>
  <meta name="description" content="Your page description (150-160 characters)">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/">
  <meta property="og:title" content="Your Page Title">
  <meta property="og:description" content="Your page description">
  <meta property="og:image" content="https://yoursite.com/image.jpg">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://yoursite.com/">
  <meta name="twitter:title" content="Your Page Title">
  <meta name="twitter:description" content="Your page description">
  <meta name="twitter:image" content="https://yoursite.com/image.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://yoursite.com/page">
</head>
<body>
  <!-- Your content -->
</body>
</html>`} />

              <TipBox type="warning">
                <p className="font-semibold mb-2">⚠️ Important:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Keep title tags under 60 characters</li>
                  <li>Keep descriptions between 150-160 characters</li>
                  <li>Use unique titles and descriptions for each page</li>
                  <li>Always include a canonical URL to avoid duplicate content issues</li>
                </ul>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                3. Heading Hierarchy (H1-H6)
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Proper heading hierarchy helps search engines understand your content structure and improves readability.
              </p>

              <CodeBlock code={`<!-- ✅ Correct heading hierarchy -->
<article>
  <h1>Main Article Title (Only one per page)</h1>
  
  <section>
    <h2>Section Heading</h2>
    <p>Content...</p>
    
    <h3>Subsection Heading</h3>
    <p>More content...</p>
    
    <h4>Sub-subsection Heading</h4>
    <p>Even more content...</p>
  </section>
  
  <section>
    <h2>Another Section</h2>
    <p>Content...</p>
  </section>
</article>

<!-- ❌ Wrong: Skipping levels -->
<h1>Title</h1>
<h3>Section (skipped h2!)</h3>
<h5>Subsection (skipped h4!)</h5>`} />

              <TipBox>
                <p className="font-semibold mb-1">✅ Best Practices:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use only <strong>one H1</strong> per page</li>
                  <li>Don't skip heading levels (H1 → H2 → H3, not H1 → H3)</li>
                  <li>Include target keywords naturally in headings</li>
                  <li>Keep headings descriptive and concise</li>
                </ul>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-600" />
                4. Structured Data (Schema.org)
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Structured data helps search engines understand your content better and can enable rich snippets in search results.
              </p>

              <CodeBlock code={`<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-24",
  "dateModified": "2024-01-24",
  "description": "Article description",
  "image": "https://yoursite.com/image.jpg"
}
</script>

<!-- Organization Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://facebook.com/yourpage",
    "https://twitter.com/yourhandle"
  ]
}
</script>`} />

              <TipBox type="info">
                <p className="font-semibold mb-1">📊 Rich Snippets:</p>
                <p className="text-sm">Structured data can enable rich snippets showing ratings, prices, events, and more in search results, increasing click-through rates.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                5. Image SEO
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Images are crucial for SEO. Proper image markup helps search engines understand and index your images.
              </p>

              <CodeBlock code={`<!-- ✅ SEO-Optimized Image -->
<img 
  src="optimized-image.jpg"
  alt="Descriptive alt text with keywords"
  title="Image title (optional)"
  width="800"
  height="600"
  loading="lazy"
>

<!-- With figure and figcaption -->
<figure>
  <img 
    src="chart.png"
    alt="Sales growth chart showing 25% increase"
    width="800"
    height="400"
  >
  <figcaption>Sales growth increased by 25% in Q4 2024</figcaption>
</figure>

<!-- Responsive images -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>`} />

              <TipBox>
                <p className="font-semibold mb-1">💡 Image SEO Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Always include descriptive <code className="bg-gray-200 px-1 rounded">alt</code> text</li>
                  <li>Use descriptive filenames (e.g., <code className="bg-gray-200 px-1 rounded">blue-widget-product.jpg</code>)</li>
                  <li>Optimize image file sizes for faster loading</li>
                  <li>Use <code className="bg-gray-200 px-1 rounded">loading="lazy"</code> for below-the-fold images</li>
                </ul>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-blue-600" />
                6. Common SEO Mistakes to Avoid
              </h2>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  '❌ Multiple H1 tags on one page',
                  '❌ Missing or duplicate meta descriptions',
                  '❌ Images without alt text',
                  '❌ Non-semantic HTML (div soup)',
                  '❌ Missing canonical URLs',
                  '❌ Poor heading hierarchy',
                  '❌ Missing lang attribute',
                  '❌ Blocking CSS/JS from crawlers',
                ].map((mistake, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: mistake }} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Final Thoughts</h2>
              <p className="text-lg leading-relaxed mb-4">
                SEO-optimized HTML is the foundation of good search engine rankings. By using semantic HTML, proper meta tags, structured data, and following best practices, you create a solid foundation for SEO success.
              </p>
              <p className="text-lg leading-relaxed">
                Remember: SEO is a long-term strategy. Focus on creating quality content with proper HTML markup, and search engines will reward you with better rankings.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/blog/html-tags-explained-guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Read HTML Tags Guide
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

