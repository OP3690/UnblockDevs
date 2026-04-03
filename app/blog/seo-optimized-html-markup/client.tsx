'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function SeoOptimizedHtmlMarkupClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>SEO-Optimized HTML Markup — Complete Technical Guide</h1>
      <p className="lead">
        Technical HTML markup is one of the most impactful and underutilized SEO levers.
        Proper semantic HTML, structured data (JSON-LD), canonical tags, Open Graph markup,
        Core Web Vitals optimization, and hreflang for international sites can significantly
        improve search rankings, click-through rates, and social sharing performance.
        This guide covers every technical HTML SEO element with complete, copy-paste ready examples
        and explains the ranking impact of each decision.
      </p>

      <StatGrid stats={[
        { value: 'Structured data', label: 'JSON-LD enables rich snippets in search results', color: 'blue' },
        { value: 'Core Web Vitals', label: 'LCP, CLS, FID — Google ranking signals since 2021', color: 'green' },
        { value: 'Canonical', label: 'prevents duplicate content penalties across URLs', color: 'purple' },
        { value: 'Open Graph', label: 'controls appearance in social media link previews', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Essential SEO Meta Tags" />
      <QuickFact color="blue" label="The three most impactful meta elements">
        The <code>&lt;title&gt;</code> tag (directly shown in search results), <code>meta description</code>
        (controls click-through rate), and <code>canonical</code> (prevents duplicate content penalties)
        are the three meta elements with the most direct ranking and traffic impact. Every other
        optimization builds on these foundations.
      </QuickFact>
      <CodeBlock lang="html" title="Complete SEO head section — all critical meta tags">
{`<head>
  <!-- ─── Required for all pages ────────────────────────────────────────────── -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Title: 50-60 chars, primary keyword first, unique per page, brand at end -->
  <title>Fix CORS Errors in JavaScript — Complete Guide | Unblock Devs</title>

  <!-- Description: 150-160 chars. This is the snippet text in search results.
       Write for humans — it directly affects click-through rate, not ranking. -->
  <meta name="description"
        content="Fix every CORS error in JavaScript and Node.js. Step-by-step solutions for preflight requests, missing headers, and proxy configs. Used by 80,000+ developers.">

  <!-- Canonical: prevents duplicate content from query params, trailing slashes, etc.
       Always self-canonical: the canonical of a page points to itself. -->
  <link rel="canonical" href="https://unblockdevs.com/blog/fix-cors-errors-javascript">

  <!-- ─── Crawl control ──────────────────────────────────────────────────────── -->
  <meta name="robots" content="index, follow">
  <!-- Common values:
       noindex      — exclude from search (thank-you pages, internal search results)
       nofollow     — don't follow outbound links (untrusted user-generated content)
       noarchive    — don't show Cached link in search results
       nosnippet    — no description snippet, no featured snippet eligibility
  -->

  <!-- ─── Open Graph (Facebook, LinkedIn, WhatsApp, Slack previews) ─────────── -->
  <meta property="og:type"        content="article">
  <meta property="og:title"       content="Fix CORS Errors in JavaScript — Complete Guide">
  <meta property="og:description" content="Fix every CORS error with working code examples.">
  <meta property="og:image"       content="https://unblockdevs.com/og/fix-cors-errors.jpg">
  <!-- OG image: 1200×630px minimum, 2400×1260px for retina. Under 8MB. -->
  <meta property="og:url"         content="https://unblockdevs.com/blog/fix-cors-errors-javascript">
  <meta property="og:site_name"   content="Unblock Devs">
  <meta property="article:published_time" content="2024-01-15T08:00:00Z">
  <meta property="article:modified_time"  content="2024-03-01T12:00:00Z">
  <meta property="article:section"        content="JavaScript">

  <!-- ─── Twitter/X Cards ───────────────────────────────────────────────────── -->
  <meta name="twitter:card"        content="summary_large_image">
  <!-- summary: small image left of text | summary_large_image: full-width image -->
  <meta name="twitter:title"       content="Fix CORS Errors in JavaScript">
  <meta name="twitter:description" content="Every CORS fix with working examples.">
  <meta name="twitter:image"       content="https://unblockdevs.com/og/fix-cors-errors.jpg">
  <meta name="twitter:site"        content="@unblockdevs">

  <!-- ─── Alternate languages (hreflang) ────────────────────────────────────── -->
  <link rel="alternate" hreflang="en"      href="https://unblockdevs.com/blog/fix-cors">
  <link rel="alternate" hreflang="es"      href="https://unblockdevs.com/es/blog/fix-cors">
  <link rel="alternate" hreflang="x-default" href="https://unblockdevs.com/blog/fix-cors">
  <!-- x-default: fallback for languages not explicitly listed -->

  <!-- ─── Performance prefetch hints ───────────────────────────────────────── -->
  <link rel="preconnect" href="https://fonts.googleapis.com">   <!-- DNS + TCP + TLS -->
  <link rel="dns-prefetch" href="https://analytics.example.com"> <!-- DNS only -->
  <link rel="preload" as="image" href="/hero.jpg">              <!-- Load early -->
</head>`}
      </CodeBlock>

      <SectionHeader number={2} title="Structured Data (JSON-LD) — Rich Snippets" />
      <p>
        JSON-LD structured data tells Google exactly what your content is about, enabling rich snippets:
        star ratings, FAQ dropdowns, how-to steps, breadcrumbs, event dates, and product prices directly
        in search results. Rich snippets dramatically improve click-through rates — FAQPage markup
        can increase CTR by 20–30% by showing your content before users even click.
      </p>
      <CodeBlock lang="html" title="JSON-LD structured data — Article, FAQ, HowTo, BreadcrumbList">
{`<!-- ─── Article / TechArticle ─────────────────────────────────────────────── -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Fix CORS Errors in JavaScript — Complete Guide",
  "description": "Every CORS fix with working code examples.",
  "image": ["https://unblockdevs.com/og/fix-cors-errors.jpg"],
  "datePublished": "2024-01-15T08:00:00Z",
  "dateModified": "2024-03-01T12:00:00Z",
  "author": {"@type": "Organization", "name": "Unblock Devs",
              "url": "https://unblockdevs.com"},
  "publisher": {
    "@type": "Organization",
    "name": "Unblock Devs",
    "logo": {"@type": "ImageObject",
             "url": "https://unblockdevs.com/logo.png",
             "width": 600, "height": 60}
  },
  "mainEntityOfPage": {"@type": "WebPage",
                        "@id": "https://unblockdevs.com/blog/fix-cors-errors-javascript"}
}
</script>

<!-- ─── FAQPage — enables FAQ dropdowns in Google results ──────────────────── -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What causes CORS errors in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CORS errors occur when a browser request crosses domain origins (different domain, protocol, or port) and the server doesn't include the required Access-Control-Allow-Origin header."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix CORS in Node.js Express?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install the cors npm package: npm install cors. Then add: app.use(cors({ origin: 'https://yourfrontend.com' })) before your route handlers."
      }
    }
  ]
}
</script>

<!-- ─── BreadcrumbList — shows path in search result URL ───────────────────── -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home",
     "item": "https://unblockdevs.com"},
    {"@type": "ListItem", "position": 2, "name": "Blog",
     "item": "https://unblockdevs.com/blog"},
    {"@type": "ListItem", "position": 3, "name": "Fix CORS Errors",
     "item": "https://unblockdevs.com/blog/fix-cors-errors-javascript"}
  ]
}
</script>

<!-- ─── HowTo — step-by-step rich results ──────────────────────────────────── -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Fix CORS Errors in Express.js",
  "step": [
    {"@type": "HowToStep", "position": 1,
     "name": "Install cors package",
     "text": "Run: npm install cors in your project directory."},
    {"@type": "HowToStep", "position": 2,
     "name": "Add cors middleware",
     "text": "Add app.use(cors()) before your route definitions."},
    {"@type": "HowToStep", "position": 3,
     "name": "Configure allowed origins",
     "text": "Pass options: app.use(cors({ origin: 'https://yourapp.com' }))"}
  ]
}
</script>`}
      </CodeBlock>

      <SectionHeader number={3} title="Semantic HTML for SEO" />
      <CodeBlock lang="html" title="Semantic page structure that search engines prefer">
{`<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/tools">Tools</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article itemscope itemtype="https://schema.org/TechArticle">
      <!-- ONE h1 per page — your primary keyword -->
      <h1 itemprop="headline">Fix CORS Errors in JavaScript — Complete Guide</h1>

      <div itemprop="author" itemscope itemtype="https://schema.org/Organization">
        By <span itemprop="name">Unblock Devs</span>
      </div>

      <!-- Machine-readable date for Google's freshness signals -->
      <time itemprop="datePublished" datetime="2024-01-15">January 15, 2024</time>
      <time itemprop="dateModified"  datetime="2024-03-01">Updated March 1, 2024</time>

      <!-- Breadcrumb navigation for UX and SEO -->
      <nav aria-label="Breadcrumb">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
            <meta itemprop="position" content="1">
          </li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/blog"><span itemprop="name">Blog</span></a>
            <meta itemprop="position" content="2">
          </li>
          <li>Fix CORS Errors</li>
        </ol>
      </nav>

      <section>
        <h2>What Causes CORS Errors?</h2>  <!-- h2 for major sections -->
        <p>Content with natural keyword usage...</p>

        <h3>Same-Origin Policy Explained</h3>  <!-- h3 for subsections -->
        <p>Subsection content...</p>
      </section>

      <!-- Internal links: ALWAYS use descriptive anchor text -->
      <a href="/blog/fix-cors-node-express">Fix CORS in Node.js Express</a>
      <!-- NOT: "click here" or "learn more" — search engines use anchor text -->

      <!-- External links to authoritative sources signal quality -->
      <a href="https://developer.mozilla.org/cors" rel="noopener">
        MDN CORS Documentation
      </a>
    </article>

    <aside aria-label="Related articles">
      <h2>Related Articles</h2>
      <!-- Related internal links pass PageRank and help Google understand topical relevance -->
    </aside>
  </main>

  <footer>
    <nav aria-label="Footer navigation">
      <a href="/sitemap.xml">Sitemap</a>
    </nav>
  </footer>
</body>`}
      </CodeBlock>

      <SectionHeader number={4} title="Core Web Vitals Optimization" />
      <CompareTable
        leftLabel="Core Web Vital"
        rightLabel="What It Measures and How to Optimize"
        rows={[
          { label: 'LCP — Largest Contentful Paint', left: 'How fast the largest visible element loads. Target: <2.5 seconds', right: 'Preload hero image: <link rel="preload" as="image" href="hero.jpg">. Use next/image for auto optimization. Serve images from CDN.' },
          { label: 'CLS — Cumulative Layout Shift', left: 'How much layout jumps during load. Target: <0.1 score', right: 'Always set width/height on img and video. Reserve space for ads. Avoid inserting DOM content above existing content after load.' },
          { label: 'FID/INP — Interaction Delay', left: 'How fast the page responds to user input. Target: <200ms', right: 'Break up long JavaScript tasks. Use web workers for heavy computation. Defer non-critical scripts. Avoid blocking the main thread.' },
          { label: 'FCP — First Contentful Paint', left: 'When first text or image is painted. Target: <1.8 seconds', right: 'Inline critical CSS. Preconnect to font servers. Avoid render-blocking scripts. Use next/font for automatic font optimization.' },
        ]}
      />

      <KeyPointsGrid columns={2} items={[
        { title: 'Image optimization for rankings', description: 'Serve WebP (30–50% smaller than JPEG) with JPEG fallback via <picture>. Use srcset for responsive images. Always lazy-load below-fold images (loading="lazy") and eager-load hero images (loading="eager"). Never serve 2MB+ images for 400px display slots.' },
        { title: 'Critical CSS inlining', description: 'Inline CSS needed for above-the-fold rendering directly in <style> tags in <head>. Defer the full stylesheet with <link rel="stylesheet" media="print" onload="this.media=\'all\'">. Eliminates render-blocking CSS — measurably improves FCP and LCP.' },
        { title: 'Script loading strategies', description: '<script defer>: downloads in parallel, executes after HTML parsed (use for most scripts). <script async>: downloads in parallel, executes immediately when downloaded (use for independent scripts like analytics). Never use <script> in <head> without defer/async.' },
        { title: 'Font loading without layout shift', description: 'Use font-display: swap in @font-face (shows fallback immediately, swaps when font loads). Preconnect to Google Fonts: <link rel="preconnect" href="https://fonts.googleapis.com">. Use next/font in Next.js for automatic font optimization with zero layout shift.' },
      ]} />

      <SectionHeader number={5} title="Canonical Tags and URL Canonicalization" />
      <AlertBox type="warning" title="Canonical tags prevent duplicate content from splitting ranking signals">
        Without canonical tags, Google may index multiple URL variations as separate pages: example.com/page,
        www.example.com/page, example.com/page/, example.com/page?utm_source=email. Each variation splits
        your page authority. A canonical tag tells Google which URL is the authoritative version,
        consolidating all ranking signals to that one URL.
      </AlertBox>
      <CodeBlock lang="html" title="Canonical tag patterns">
{`<!-- Always self-canonical: every page points to its own canonical URL -->
<link rel="canonical" href="https://example.com/blog/fix-cors-errors">

<!-- Pagination: canonical points to first page (or use rel="prev"/"next") -->
<!-- Page 2: --> <link rel="canonical" href="https://example.com/blog">
<!-- OR keep page 2 canonical to page 2 — both are valid strategies -->

<!-- HTTP → HTTPS: ensure server redirects + canonical -->
<!-- ❌ Bad: some pages use http:// in canonical while serving https:// -->
<!-- ✅ Good: all canonicals use https:// and 301 redirects enforce https -->

<!-- Cross-domain canonical (syndicated content pointing back to original) -->
<link rel="canonical" href="https://original-site.com/article">
<!-- Used by Medium, LinkedIn Articles — signals original source to Google -->`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Does HTML structure actually affect SEO rankings?',
          answer: 'Yes — significantly and directly. The <title> tag is shown verbatim in search results. Proper heading hierarchy (one h1, sequential h2/h3) helps Google understand content structure. Structured data (JSON-LD) enables rich snippets that increase CTR by 20–30%. Canonical tags prevent duplicate content from splitting page authority. Core Web Vitals (which depend on HTML structure and resource hints) are confirmed Google ranking signals since 2021.',
        },
        {
          question: 'Should I use H1 once per page or can I use multiple?',
          answer: 'Best practice: one H1 per page, containing your primary target keyword near the beginning of the tag. HTML5 technically allows multiple H1s within separate <article> or <section> elements, but Google\'s John Mueller and other search advocates consistently recommend one H1 per page for clarity. Use H2 for major sections, H3 for subsections. Never skip heading levels (h1 → h3 skipping h2) — this breaks accessibility and content outline clarity.',
        },
        {
          question: 'What is the most impactful structured data type to implement first?',
          answer: 'For a blog or content site: FAQPage JSON-LD — it can appear immediately as expandable FAQ dropdowns in Google search results, making your result much larger and more clickable. For e-commerce: Product with offers and reviews (enables star ratings, price, and availability in results). For a local business: LocalBusiness with address, hours, and reviews. FAQPage is the easiest to implement with highest immediate visible impact.',
        },
        {
          question: 'What is the difference between Open Graph and Twitter Card tags?',
          answer: 'Open Graph tags (og:title, og:description, og:image) are used by Facebook, LinkedIn, WhatsApp, Slack, and most platforms when generating link previews. Twitter Card tags (twitter:card, twitter:title, etc.) are specifically for Twitter/X. They have slightly different behaviors: Twitter defaults to Open Graph if Twitter tags are missing. The key difference is twitter:card="summary_large_image" vs "summary" — the large image version shows a full-width image preview which gets significantly higher engagement.',
        },
        {
          question: 'Do I need both canonical tags and 301 redirects?',
          answer: 'They serve different purposes. A 301 redirect sends users and search bots to a new URL — old URL effectively ceases to exist for crawlers. A canonical tag tells Google which URL to index when multiple URLs serve similar content — all URLs remain accessible but Google attributes authority to the canonical. Use 301 redirects for: moved/deleted pages, HTTP→HTTPS migration, www vs non-www consolidation. Use canonical for: URL parameter variations (?sort=, ?utm_source=), paginated content, and syndicated content pointing back to the original.',
        },
        {
          question: 'How do hreflang tags work and when do I need them?',
          answer: 'Hreflang tells Google which language/region variant of a page to show to which users. Required when: you have the same content in multiple languages (en, es, fr) OR the same language targeting different regions (en-us, en-gb, en-au). Every page in a hreflang cluster must reference all other variants including itself (including an x-default for unmatched languages). Errors in hreflang (missing self-reference, non-bidirectional links) cause Google to ignore the entire cluster. Validate with Google Search Console → International Targeting.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
