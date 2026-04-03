'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HtmlTagsExplainedGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HTML Tags Explained — Complete Guide to Every Essential Tag</h1>
      <p className="lead">
        HTML tags are the building blocks of every web page. From semantic structure tags like
        &lt;article&gt; and &lt;nav&gt; to interactive form elements, media embeds, and accessibility
        attributes — understanding what each tag means and when to use it is fundamental to web development.
        This guide covers every essential HTML5 tag with practical examples, explains the semantic vs
        non-semantic distinction that matters for SEO, and clarifies the most common tag confusion points
        developers encounter.
      </p>

      <StatGrid stats={[
        { value: '110+', label: 'HTML tags in the HTML5 specification', color: 'blue' },
        { value: '~20', label: 'tags used in most real-world web pages', color: 'green' },
        { value: 'Semantic', label: 'HTML5 tags describe meaning, not just appearance', color: 'purple' },
        { value: 'SEO impact', label: 'correct semantic tags improve search rankings', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Document Structure — The Required Skeleton" />
      <CodeBlock language="html" filename="Complete HTML5 document structure">
{`<!DOCTYPE html>          <!-- Tells browser this is HTML5 (not HTML4 or XHTML) -->
<html lang="en">         <!-- Root element. lang= is important for accessibility/screen readers -->
  <head>                 <!-- Metadata — never visible on the page itself -->
    <meta charset="UTF-8">                    <!-- Enable all Unicode characters -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">  <!-- Mobile responsiveness -->
    <title>Page Title — 50-60 chars</title>  <!-- Browser tab + Google search result title -->
    <meta name="description"
          content="Page description for search results — 150-160 chars">
    <link rel="canonical" href="https://example.com/this-page">  <!-- Prevents duplicate content -->
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
  </head>

  <body>                    <!-- All visible content lives here -->
    <header>                <!-- Site-wide header: logo, navigation, search bar -->
      <nav aria-label="Main navigation">  <!-- Primary navigation landmark -->
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </header>

    <main>                  <!-- Primary content (only ONE per page) -->
      <article>             <!-- Self-contained content: blog post, news article -->
        <section>           <!-- Thematic grouping with its own heading -->
        </section>
      </article>
      <aside>               <!-- Related but not primary: sidebar, ads, related links -->
      </aside>
    </main>

    <footer>                <!-- Site footer: copyright, links, contact info -->
    </footer>
  </body>
</html>`}
      </CodeBlock>

      <SectionHeader number={2} title="Text Content Tags" />
      <CodeBlock language="html" filename="Headings, paragraphs, and inline text elements">
{`<!-- ─── Headings — h1 through h6 ────────────────────────────────────────────── -->
<h1>Page Title — USE EXACTLY ONE per page (primary SEO signal)</h1>
<h2>Major Section — use multiple per page</h2>
<h3>Subsection under h2</h3>
<h4>Sub-subsection — use sparingly</h4>
<!-- Don't skip heading levels: h1 → h2 → h3, never h1 → h3 -->

<!-- ─── Block text elements ────────────────────────────────────────────────── -->
<p>A paragraph of text. Block element — starts on new line.</p>
<blockquote cite="https://source.com">
  A quoted passage from an external source. Use cite= for attribution.
</blockquote>
<pre>Preformatted text.
  Preserves whitespace    and newlines.
  Used for code blocks, ASCII art, poetry.</pre>

<!-- ─── Inline text elements ───────────────────────────────────────────────── -->
<strong>Bold — semantically important text</strong>  <!-- Screen readers may emphasize -->
<em>Italic — emphasis, stress</em>
<b>Bold — visual only, no semantic importance</b>   <!-- Use strong instead in most cases -->
<i>Italic — visual only (use for: technical terms, foreign phrases)</i>
<mark>Highlighted text</mark>                       <!-- Like a yellow highlighter -->
<code>inline_code()</code>                          <!-- Code in flowing text -->
<kbd>Ctrl+C</kbd>                                   <!-- Keyboard input -->
<samp>output text</samp>                            <!-- Program output -->
<var>x</var>                                        <!-- Mathematical/programming variable -->
<abbr title="HyperText Markup Language">HTML</abbr> <!-- Abbreviation with tooltip -->
<time datetime="2024-01-15">January 15, 2024</time> <!-- Machine-readable date -->
<cite>Book Title</cite>                             <!-- Title of a creative work -->
<del>deleted text</del>                             <!-- Strikethrough (removed content) -->
<ins>inserted text</ins>                            <!-- Inserted/added content -->
<sup>superscript</sup>  <sub>subscript</sub>        <!-- Math, footnotes, chemistry -->
<small>fine print, legal disclaimers</small>
<br>  <!-- Line break — use sparingly; prefer CSS margin-top for spacing -->
<hr>  <!-- Thematic break / horizontal rule — topic change in content -->`}
      </CodeBlock>

      <SectionHeader number={3} title="Links and Media" />
      <CodeBlock language="html" filename="Links, images, video, audio, and responsive media">
{`<!-- ─── Links ──────────────────────────────────────────────────────────────── -->
<a href="https://example.com">External link</a>
<a href="/about">Internal link (absolute path)</a>
<a href="../blog">Internal link (relative path)</a>
<a href="#section-id">In-page anchor link</a>
<a href="mailto:user@example.com">Email link</a>
<a href="tel:+15551234567">Phone link (mobile dialers)</a>
<a href="/report.pdf" download="annual-report-2024.pdf">Download link with filename</a>

<!-- ALWAYS add rel="noopener noreferrer" for target="_blank" links -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in new tab (rel="noopener" prevents tab-napping security issue)
</a>

<!-- ─── Images ──────────────────────────────────────────────────────────────── -->
<!-- ALWAYS specify width and height to prevent Cumulative Layout Shift (CLS) -->
<img src="image.jpg"
     alt="Descriptive text for screen readers and search engines"
     width="400" height="300"
     loading="lazy">  <!-- Defer off-screen images (use "eager" for hero/above-fold) -->

<!-- Responsive images with srcset — browser picks best for screen density -->
<img src="image-800.jpg"
     srcset="image-400.jpg 400w, image-800.jpg 800w, image-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Responsive image example"
     width="800" height="500">

<!-- art direction with <picture> — different crop for different viewports -->
<picture>
  <source media="(min-width: 800px)" srcset="desktop-hero.jpg">
  <source media="(min-width: 400px)" srcset="tablet-hero.jpg">
  <img src="mobile-hero.jpg" alt="Hero image" width="400" height="300">
</picture>

<!-- ─── Video and Audio ─────────────────────────────────────────────────────── -->
<video width="640" height="360" controls preload="metadata" poster="thumbnail.jpg">
  <source src="video.webm" type="video/webm">  <!-- WebM (better compression) -->
  <source src="video.mp4" type="video/mp4">   <!-- MP4 (wider compatibility) -->
  <track kind="subtitles" src="subs.vtt" srclang="en" label="English" default>
  <p>Your browser doesn't support HTML video. <a href="video.mp4">Download here</a>.</p>
</video>

<audio controls preload="none">
  <source src="audio.ogg" type="audio/ogg">
  <source src="audio.mp3" type="audio/mpeg">
</audio>`}
      </CodeBlock>

      <SectionHeader number={4} title="Lists and Tables" />
      <CodeBlock language="html" filename="Lists, description lists, and accessible table structure">
{`<!-- ─── Lists ──────────────────────────────────────────────────────────────── -->
<ul>                                <!-- Unordered list — order doesn't matter -->
  <li>Apples</li>
  <li>Oranges
    <ul><li>Navel oranges</li></ul>  <!-- Nested list inside li -->
  </li>
</ul>

<ol type="1" start="1">            <!-- Ordered list — sequence matters -->
  <li>First step</li>              <!-- type: "1", "a", "A", "i", "I" -->
  <li>Second step</li>             <!-- start= for starting number -->
</ol>

<dl>                                <!-- Description list — term/definition pairs -->
  <dt>CSS</dt>
  <dd>Cascading Style Sheets — controls visual presentation of HTML</dd>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structure of web pages</dd>
</dl>

<!-- ─── Tables — use for tabular data only, NEVER for layout ───────────────── -->
<table>
  <caption>Monthly sales by region — 2024</caption>  <!-- Accessible table title -->
  <thead>
    <tr>
      <th scope="col">Region</th>     <!-- scope="col" for column headers -->
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>      <!-- scope="row" for row headers -->
      <td>$45,000</td>
      <td>$52,000</td>
    </tr>
    <tr>
      <td colspan="2">Combined total</td>  <!-- Span multiple columns -->
    </tr>
  </tbody>
  <tfoot>
    <tr><td colspan="3">Total: $97,000</td></tr>
  </tfoot>
</table>`}
      </CodeBlock>

      <SectionHeader number={5} title="Forms — Complete Input Reference" />
      <CodeBlock language="html" filename="All form input types with attributes">
{`<form action="/submit" method="POST" novalidate>
  <!-- ALWAYS associate labels with inputs via for/id matching -->
  <label for="name">Full Name</label>
  <input type="text" id="name" name="name"
         placeholder="John Doe"
         required minlength="2" maxlength="100"
         autocomplete="name">

  <input type="email"    name="email" required autocomplete="email">
  <input type="password" name="password" minlength="8" autocomplete="new-password">
  <input type="number"   name="age" min="0" max="120" step="1">
  <input type="tel"      name="phone" pattern="[0-9]{10}" autocomplete="tel">
  <input type="url"      name="website" placeholder="https://example.com">
  <input type="date"     name="birthday" min="1900-01-01" max="2024-12-31">
  <input type="datetime-local" name="appointment">
  <input type="range"    name="volume" min="0" max="100" value="50">
  <input type="color"    name="theme_color" value="#0066cc">
  <input type="search"   name="q" placeholder="Search...">

  <!-- Textarea for multiline text -->
  <textarea name="message" rows="5" cols="40"
            placeholder="Your message..."
            maxlength="500"></textarea>

  <!-- Select dropdown with option groups -->
  <select name="country" required>
    <option value="" disabled selected>Select country...</option>
    <optgroup label="North America">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </optgroup>
  </select>

  <!-- Checkboxes — multiple selection -->
  <fieldset>
    <legend>Interests</legend>
    <input type="checkbox" id="coding" name="interests[]" value="coding">
    <label for="coding">Coding</label>
    <input type="checkbox" id="design" name="interests[]" value="design">
    <label for="design">Design</label>
  </fieldset>

  <!-- Radio buttons — single selection from a group -->
  <fieldset>
    <legend>Preferred contact</legend>
    <input type="radio" id="email_contact" name="contact" value="email">
    <label for="email_contact">Email</label>
    <input type="radio" id="phone_contact" name="contact" value="phone">
    <label for="phone_contact">Phone</label>
  </fieldset>

  <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp" multiple>
  <input type="hidden" name="csrf_token" value="abc123">

  <!-- Buttons -->
  <button type="submit">Submit Form</button>
  <button type="reset">Reset</button>
  <button type="button" onclick="preview()">Preview</button>
</form>`}
      </CodeBlock>

      <SectionHeader number={6} title="Semantic vs Non-Semantic Tags" />
      <CompareTable
        leftLabel="Semantic HTML (use these)"
        rightLabel="Non-semantic / when to use div/span"
        rows={[
          { label: 'Page sections', left: '<header>, <main>, <footer>, <nav> — describe the role of the content', right: '<div> only when no semantic element fits (layout wrapper with no meaning)' },
          { label: 'Content type', left: '<article> (self-contained), <section> (themed group), <aside> (supplementary)', right: '<div> for flex/grid containers with no inherent semantic meaning' },
          { label: 'Text emphasis', left: '<strong> (important), <em> (stress), <mark> (highlighted)', right: '<span> for inline styling when no semantic meaning applies' },
          { label: 'Time/dates', left: '<time datetime="2024-01-15"> for machine-readable dates', right: '<div> or <p> only when the content has no temporal meaning' },
          { label: 'Navigation', left: '<nav> for primary and secondary navigation landmark regions', right: '<div> for non-navigation link groups (social icons, tag lists)' },
          { label: 'Quotes', left: '<blockquote> (long), <q> (inline), <cite> (title of work)', right: '<p> only when the quoted nature is purely visual, not semantic' },
        ]}
      />

      <AlertBox type="tip" title="Semantic HTML improves SEO and accessibility simultaneously">
        Screen readers use HTML landmarks (&lt;main&gt;, &lt;nav&gt;, &lt;header&gt;, &lt;footer&gt;) for navigation.
        Google uses semantic tags to understand content structure. Using &lt;article&gt; for blog posts
        and exactly one &lt;h1&gt; per page improves both rankings and accessibility with zero extra effort.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between <strong> and <b>?',
          answer: '<strong> indicates semantic importance — screen readers may add emphasis when reading it aloud, and search engines treat it as a signal of importance. <b> is purely visual bold with no semantic meaning — it looks the same but doesn\'t communicate importance. Use <strong> for genuinely important content (warnings, key terms). Use <b> only for stylistic bold without emphasis intent (e.g., product names in a context where all names are bolded).',
        },
        {
          question: 'Should I use <section> or <div>?',
          answer: 'Use <section> when the content is a distinct, themed grouping that would logically appear in a document outline — sections typically have their own heading (h2, h3, etc.). Use <div> when you need a container purely for CSS layout or JavaScript targeting with no semantic meaning. A good test: if you\'d write a heading for this block of content in a table of contents, it\'s a <section>. If it\'s just a styling wrapper, it\'s a <div>.',
        },
        {
          question: 'What HTML tags are most important for SEO?',
          answer: 'In order of impact: <title> (most important — appears in search results), <meta name="description"> (click-through rate), <h1> (one per page, contains target keyword), <h2>-<h6> (content hierarchy signals), <a href> with descriptive anchor text (internal linking), <img alt> (image search + context), <article>/<main> (content landmark signals). Structured data (JSON-LD in <script>) unlocks rich snippets which dramatically improve CTR.',
        },
        {
          question: 'Why should I always set width and height on images?',
          answer: 'Setting width and height on <img> tags prevents Cumulative Layout Shift (CLS) — a Core Web Vitals metric that Google uses as a ranking factor. Without dimensions, the browser doesn\'t know how much space to reserve before the image loads. When the image loads, it pushes content down, creating a jarring layout jump. With width and height specified, the browser reserves the exact space upfront. Use CSS aspect-ratio for responsive scaling while keeping the reserved space.',
        },
        {
          question: 'What is the difference between <article> and <section>?',
          answer: '<article> represents a self-contained piece of content that makes sense on its own if extracted from the page — a blog post, a news article, a forum post, a product card. <section> is a thematic grouping of content within a page that requires context. A blog page might have <main> containing multiple <article> elements, each blog post being an article. Each article might have multiple <section> elements for introduction, body, and conclusion.',
        },
        {
          question: 'When should I use <label> and why does it matter for forms?',
          answer: 'Always associate a <label> with every form input using matching for/id attributes. This provides three critical benefits: clicking the label focuses/checks the input (bigger click target — better UX), screen readers announce the label when the input is focused (accessibility), and it helps autofill tools correctly identify what each field is for. Never use placeholder as a substitute for label — placeholder disappears when typing begins, leaving users confused about what the field requires.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
