'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HtmlTagsExplainedGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HTML Tags Explained — Complete Guide to Every Essential Tag</h1>
      <p className="lead">
        HTML tags are the building blocks of every web page. From semantic structure tags
        like &lt;article&gt; and &lt;nav&gt; to interactive elements like &lt;form&gt; and
        &lt;input&gt;, understanding what each tag means and when to use it is fundamental to
        web development.
      </p>

      <StatGrid stats={[
        { value: '100+', label: 'HTML tags in the HTML5 specification', color: 'blue' },
        { value: '~20', label: 'tags used in most real websites', color: 'green' },
        { value: 'Semantic', label: 'HTML5 tags that describe meaning, not just appearance', color: 'purple' },
        { value: 'SEO impact', label: 'correct semantic tags improve search rankings', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Document Structure Tags" />
      <CodeBlock language="html" filename="Essential document structure">
{`<!DOCTYPE html>          <!-- Declares HTML5 document type -->
<html lang="en">         <!-- Root element, lang for accessibility -->
  <head>                 <!-- Metadata — not visible on page -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>    <!-- Shows in browser tab and search results -->
    <meta name="description" content="Page description for SEO">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>                 <!-- All visible content goes here -->

    <header>             <!-- Site header — logo, nav -->
    <nav>                <!-- Navigation links -->
    <main>               <!-- Primary page content (only one per page) -->
    <article>            <!-- Self-contained piece of content -->
    <section>            <!-- Thematic grouping of content -->
    <aside>              <!-- Sidebar, secondary content -->
    <footer>             <!-- Site footer — copyright, links -->

  </body>
</html>`}
      </CodeBlock>

      <SectionHeader number={2} title="Text Content Tags" />
      <CodeBlock language="html" filename="Text and heading tags">
{`<!-- Headings — h1 through h6 (most to least important) -->
<h1>Page Title — ONE per page for SEO</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>

<!-- Paragraphs and text -->
<p>A paragraph of text</p>
<strong>Bold (semantically important)</strong>
<em>Italic (emphasis)</em>
<mark>Highlighted text</mark>
<code>Inline code</code>
<pre>Preformatted (preserves whitespace and newlines)</pre>
<blockquote>A long quoted passage</blockquote>
<q>Short inline quote</q>
<abbr title="HyperText Markup Language">HTML</abbr>
<br>  <!-- Line break — use sparingly, prefer CSS margin -->
<hr>  <!-- Horizontal rule / thematic break -->`}
      </CodeBlock>

      <SectionHeader number={3} title="Links and Media" />
      <CodeBlock language="html" filename="Links, images, video, audio">
{`<!-- Links -->
<a href="https://example.com">External link</a>
<a href="/about">Internal link</a>
<a href="mailto:user@example.com">Email link</a>
<a href="tel:+15551234567">Phone link</a>
<a href="/doc.pdf" download>Download link</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in new tab (rel="noopener" for security)
</a>

<!-- Images -->
<img src="image.jpg" alt="Descriptive alt text" width="400" height="300">
<picture>  <!-- Responsive images -->
  <source media="(min-width: 800px)" srcset="large.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>

<!-- Video and Audio -->
<video src="video.mp4" controls width="640">
  <p>Your browser doesn't support video</p>
</video>
<audio src="audio.mp3" controls></audio>`}
      </CodeBlock>

      <SectionHeader number={4} title="Lists and Tables" />
      <CodeBlock language="html" filename="Lists and table structure">
{`<!-- Unordered list (bullets) -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>

<!-- Ordered list (numbers) -->
<ol>
  <li>Step one</li>
  <li>Step two</li>
</ol>

<!-- Description list -->
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>

<!-- Accessible table structure -->
<table>
  <caption>Table description for screen readers</caption>
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>30</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Total: 1 row</td></tr>
  </tfoot>
</table>`}
      </CodeBlock>

      <SectionHeader number={5} title="Forms" />
      <CodeBlock language="html" filename="Form elements">
{`<form action="/submit" method="POST">
  <!-- Text inputs -->
  <input type="text" name="name" placeholder="Your name" required>
  <input type="email" name="email" required>
  <input type="password" name="password" minlength="8">
  <input type="number" name="age" min="0" max="120">
  <input type="date" name="birthday">
  <input type="tel" name="phone">
  <input type="url" name="website">

  <!-- Multiline text -->
  <textarea name="message" rows="5" cols="40"></textarea>

  <!-- Select dropdown -->
  <select name="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>

  <!-- Checkboxes and radio buttons -->
  <input type="checkbox" id="agree" name="agree" value="yes">
  <label for="agree">I agree</label>

  <input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label>

  <!-- File upload -->
  <input type="file" name="avatar" accept="image/*">

  <!-- Submit button -->
  <button type="submit">Submit</button>
</form>`}
      </CodeBlock>

      <SectionHeader number={6} title="Semantic vs Non-Semantic Tags" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Semantic tags (use these)', description: '<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, <figure>, <figcaption>, <time>, <mark>, <address>. Describe meaning — helpful for SEO and accessibility.' },
        { title: 'Non-semantic (avoid for structure)', description: '<div> and <span> have no meaning — they\'re containers for styling. Use them only when no semantic tag applies. Overusing divs ("div soup") makes HTML harder to understand.' },
        { title: 'When to use <div>', description: 'Use <div> as a layout wrapper when no semantic element fits. E.g., a flexbox container for a card grid has no specific semantic meaning — <div> is appropriate.' },
        { title: 'When to use <span>', description: 'Use <span> for inline styling needs: highlighting a specific word in a sentence, adding a class to one word. No semantic meaning — pure styling hook.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between <strong> and <b>?',
          answer: '<strong> indicates semantic importance — screen readers emphasize it, search engines treat it as important. <b> is purely visual bold with no semantic meaning. Use <strong> for genuinely important content, <b> only for stylistic bold with no emphasis intended.',
        },
        {
          question: 'Should I use <section> or <div>?',
          answer: 'Use <section> when the content is a distinct, themed section of a page that would logically appear in a document outline. A section typically has a heading. Use <div> when you need a container purely for layout/styling purposes with no semantic meaning.',
        },
        {
          question: 'What HTML tags are most important for SEO?',
          answer: '<title> (most important), <h1> (one per page), <meta name="description">, <h2>-<h6> (content hierarchy), <a href> (internal linking), <img alt> (image SEO), <article>/<main> (content signals). Semantic structure helps Google understand page content and context.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
