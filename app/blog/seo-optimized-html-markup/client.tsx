'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function SeoOptimizedHtmlMarkupClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>SEO-Optimized HTML Markup — Complete Technical Guide</h1>
      <p className="lead">
        Technical HTML markup is one of the most impactful and underutilized SEO levers.
        Proper semantic HTML, structured data, canonical tags, and Open Graph markup can
        significantly improve search rankings, click-through rates, and social sharing.
      </p>

      <StatGrid stats={[
        { value: 'Structured data', label: 'JSON-LD for rich snippets in search results', color: 'blue' },
        { value: 'Core Web Vitals', label: 'Google ranking factor — LCP, FID, CLS', color: 'green' },
        { value: 'Canonical', label: 'prevents duplicate content penalties', color: 'purple' },
        { value: 'Open Graph', label: 'controls how content appears on social media', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Essential SEO Meta Tags" />
      <CodeBlock language="html" filename="Complete SEO head section">
{`<head>
  <!-- Required -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Primary Keyword — Secondary Keyword | Brand Name</title>
  <!-- Title: 50-60 chars, keyword first, unique per page -->

  <!-- Description: 150-160 chars, include CTA -->
  <meta name="description" content="Learn X in 5 minutes. Step-by-step guide covering Y and Z. Used by 50,000+ developers.">

  <!-- Canonical — prevents duplicate content -->
  <link rel="canonical" href="https://example.com/exact-url-of-this-page">

  <!-- Index control -->
  <meta name="robots" content="index, follow">
  <!-- noindex: exclude from search  |  nofollow: don't follow links -->

  <!-- Open Graph (social sharing) -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Page Title for Social Share">
  <meta property="og:description" content="Description shown in social preview cards">
  <meta property="og:image" content="https://example.com/og-image-1200x630.jpg">
  <meta property="og:url" content="https://example.com/page-url">
  <meta property="og:site_name" content="Your Site Name">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">

  <!-- Alternate languages (hreflang) -->
  <link rel="alternate" hreflang="en" href="https://example.com/page">
  <link rel="alternate" hreflang="es" href="https://es.example.com/page">
  <link rel="alternate" hreflang="x-default" href="https://example.com/page">
</head>`}
      </CodeBlock>

      <SectionHeader number={2} title="Structured Data (JSON-LD)" />
      <QuickFact>
        JSON-LD structured data enables rich snippets in Google Search: star ratings, FAQ dropdowns,
        how-to steps, event dates, product prices. Add JSON-LD in a script tag — it doesn't affect
        visible content. Google Structured Data Testing Tool validates it.
      </QuickFact>

      <CodeBlock language="html" filename="JSON-LD for articles and FAQs">
{`<!-- Article structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How to X — Complete Guide",
  "description": "Step-by-step guide to...",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Unblock Devs"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Unblock Devs",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-03-01"
}
</script>

<!-- FAQ structured data (enables FAQ dropdowns in Google) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is X?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "X is a..."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use X?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To use X..."
      }
    }
  ]
}
</script>`}
      </CodeBlock>

      <SectionHeader number={3} title="Semantic HTML for SEO" />
      <CodeBlock language="html" filename="Semantic structure that search engines prefer">
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
      <h1 itemprop="headline">One h1 per page — your primary keyword</h1>

      <div itemprop="author" itemscope itemtype="https://schema.org/Organization">
        <span itemprop="name">Author Name</span>
      </div>

      <time itemprop="datePublished" datetime="2024-01-15">January 15, 2024</time>

      <section>
        <h2>Section with keyword-rich heading</h2>
        <p>Content...</p>

        <h3>Subsection heading</h3>
        <p>More content...</p>
      </section>

      <!-- Internal links with descriptive anchor text -->
      <a href="/related-topic">Learn about related topic</a>
      <!-- NOT: "click here" — use descriptive text -->
    </article>
  </main>

  <footer>
    <nav aria-label="Footer navigation">...</nav>
  </footer>
</body>`}
      </CodeBlock>

      <SectionHeader number={4} title="Core Web Vitals Optimization" />
      <KeyPointsGrid columns={2} items={[
        { title: 'LCP — Largest Contentful Paint', description: 'Load the largest visible element fast. Preload hero images: <link rel="preload" as="image" href="hero.jpg">. Use next/image in Next.js for automatic optimization.' },
        { title: 'CLS — Cumulative Layout Shift', description: 'Reserve space for images/ads: always set width and height on img elements. Avoid inserting content above existing content after page load.' },
        { title: 'FCP — First Contentful Paint', description: 'Inline critical CSS, defer non-critical JS. Use next/font for font loading without layout shift. Preconnect to critical origins.' },
        { title: 'Image optimization', description: 'Use WebP/AVIF format (30-50% smaller than JPEG). Implement srcset for responsive images. Lazy load below-the-fold images: loading="lazy".' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does HTML structure actually affect SEO rankings?',
          answer: 'Yes — significantly. Proper semantic HTML helps Google understand page structure and content hierarchy. One H1 with target keyword matters. Structured data enables rich snippets that improve click-through rate by 20-30%. Canonical tags prevent duplicate content penalties. Technical HTML SEO is foundational — no amount of backlinks overcomes severe technical issues.',
        },
        {
          question: 'Should I use H1 once per page or can I use multiple?',
          answer: 'Best practice: one H1 per page, containing your primary target keyword. HTML5 technically allows multiple H1s within sections, but Google still recommends one H1 for clarity. Use H2 for major sections, H3 for subsections. Proper heading hierarchy helps both SEO and accessibility.',
        },
        {
          question: 'What is the most impactful structured data type to implement first?',
          answer: 'For a blog: FAQPage JSON-LD — enables FAQ dropdown in search results immediately improving click-through rate. For an e-commerce site: Product (with offers, reviews, availability). For a local business: LocalBusiness. FAQ markup is the easiest to implement and has among the highest visible impact in search results.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
