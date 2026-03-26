'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function CSSExplainedClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="CSS Explained: Complete Beginner to Advanced Guide 2026"
      description="Everything you need to know about CSS — selectors, the box model, Flexbox, Grid, animations, and modern best practices."
    >
      <h1>CSS Explained: Complete Beginner to Advanced Guide 2026</h1>
      <p className="lead">
        CSS (Cascading Style Sheets) is the language that makes the web beautiful. It controls every visual aspect of a web page — colors, fonts, layouts, animations, and responsive behavior. Whether you are just starting out or want to solidify your understanding of modern CSS, this complete guide covers everything from the basics to advanced techniques used in production today.
      </p>

      <StatGrid stats={[
        { value: '3', label: 'CSS versions (CSS1, CSS2, CSS3+)', color: 'blue' },
        { value: '500+', label: 'CSS properties available', color: 'purple' },
        { value: '98%', label: 'browser support for Flexbox', color: 'green' },
        { value: '96%', label: 'browser support for CSS Grid', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is CSS and How Does it Work?" />

      <p>
        CSS stands for <strong>Cascading Style Sheets</strong>. The word "cascading" means that styles apply in a specific order of priority, with later rules overriding earlier ones. CSS works by selecting HTML elements and applying visual rules to them.
      </p>

      <ArchDiagram
        boxes={[
          { label: 'HTML Structure', color: 'blue' },
          { label: 'CSS Styles', color: 'purple' },
          { label: 'Rendered Page', color: 'green' },
        ]}
        arrows={['→', '→']}
      />

      <p>There are three ways to add CSS to an HTML document:</p>

      <CompareTable
        leftLabel="Method"
        rightLabel="When to use"
        rows={[
          { label: 'External stylesheet', left: '<link rel="stylesheet" href="styles.css">', right: 'Always — best practice for reusability and caching.' },
          { label: 'Internal style tag', left: '<style>body { color: red; }</style>', right: 'Quick prototypes or email HTML templates.' },
          { label: 'Inline style', left: '<p style="color:red">...</p>', right: 'Dynamic styles from JavaScript, or single-element overrides.' },
        ]}
      />

      <SectionHeader number={2} title="CSS Selectors" />

      <p>
        Selectors are patterns that match HTML elements. They are the most important part of CSS to master — without the right selector, your styles will not reach the right elements.
      </p>

      <CodeBlock language="css" filename="selectors.css">{`/* Universal selector — matches everything */
* { box-sizing: border-box; }

/* Type selector — matches all <p> elements */
p { line-height: 1.6; }

/* Class selector — matches elements with class="card" */
.card { border-radius: 8px; }

/* ID selector — matches element with id="header" */
#header { background: #1a1a2e; }

/* Attribute selector — matches <input type="email"> */
input[type="email"] { border: 2px solid blue; }

/* Descendant — <a> inside .nav */
.nav a { text-decoration: none; }

/* Child — direct <li> children of <ul> only */
ul > li { padding: 8px; }

/* Adjacent sibling — <p> immediately after <h2> */
h2 + p { font-size: 1.1rem; }

/* Pseudo-class — link on hover */
a:hover { color: royalblue; }

/* Pseudo-element — first line of a paragraph */
p::first-line { font-weight: bold; }`}</CodeBlock>

      <AlertBox type="tip" title="Specificity determines which rule wins">
        When multiple selectors target the same element, the most specific one wins. ID selectors beat class selectors; class selectors beat type selectors. Use browser DevTools to inspect which rule is overriding another.
      </AlertBox>

      <SectionHeader number={3} title="The CSS Box Model" />

      <QuickFact>Every HTML element is a rectangular box. Understanding the box model is the foundation of all CSS layout work.</QuickFact>

      <p>
        The box model describes how every element is rendered as a box with four layers: Content, Padding, Border, and Margin.
      </p>

      <ArchDiagram
        boxes={[
          { label: 'Content', color: 'blue' },
          { label: 'Padding', color: 'green' },
          { label: 'Border', color: 'amber' },
          { label: 'Margin', color: 'purple' },
        ]}
        arrows={['→', '→', '→']}
      />

      <CodeBlock language="css" filename="box-model.css">{`.box {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 8px;
  margin: 24px;
}

/* box-sizing: border-box makes width include padding+border */
* {
  box-sizing: border-box;
}`}</CodeBlock>

      <ErrorFix
        bad={`/* Without border-box: element overflows its container */
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Actual rendered width: 300 + 40 + 4 = 344px */
}`}
        good={`/* With border-box: padding and border included in width */
*, *::before, *::after {
  box-sizing: border-box;
}
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Actual rendered width: 300px exactly */
}`}
        badLabel="Without border-box (confusing)"
        goodLabel="With border-box (predictable)"
      />

      <SectionHeader number={4} title="CSS Flexbox" />

      <p>
        Flexbox is a one-dimensional layout system — it arranges items in a row or column. It is the best tool for navigation bars, card rows, centering content, and any layout where items need to flex and wrap.
      </p>

      <CodeBlock language="css" filename="flexbox.css">{`/* Make a container a flex container */
.container {
  display: flex;
  flex-direction: row;        /* row | column */
  flex-wrap: wrap;            /* wrap items to next line */
  justify-content: space-between; /* main-axis alignment */
  align-items: center;        /* cross-axis alignment */
  gap: 16px;
}

/* Flex item properties */
.item {
  flex: 1 0 200px; /* grow shrink basis */
  align-self: flex-end;
}

/* Center anything perfectly */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`}</CodeBlock>

      <SectionHeader number={5} title="CSS Grid" />

      <p>
        CSS Grid is a two-dimensional layout system — it manages rows AND columns simultaneously. Use Grid for page-level layouts: headers, sidebars, content areas, and complex responsive designs.
      </p>

      <CodeBlock language="css" filename="css-grid.css">{`/* Responsive grid with auto-fill */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

/* Named grid areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 60px 1fr 80px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Span multiple cells */
.featured-card {
  grid-column: span 2;
  grid-row: span 2;
}`}</CodeBlock>

      <SectionHeader number={6} title="CSS Positioning" />

      <CompareTable
        leftLabel="Position value"
        rightLabel="Behavior"
        rows={[
          { label: 'static', left: 'static (default)', right: 'Normal document flow. top/left/right/bottom have no effect.' },
          { label: 'relative', left: 'relative', right: 'Offset from its normal position. Other elements are unaffected.' },
          { label: 'absolute', left: 'absolute', right: 'Removed from flow. Positioned relative to nearest non-static ancestor.' },
          { label: 'fixed', left: 'fixed', right: 'Removed from flow. Positioned relative to viewport. Stays on scroll.' },
          { label: 'sticky', left: 'sticky', right: 'Normal flow until scroll threshold, then fixed. Great for headers.' },
        ]}
      />

      <CodeBlock language="css" filename="positioning.css">{`/* Sticky navigation bar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Badge on a card */
.card { position: relative; }
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  border-radius: 50%;
  width: 24px;
  height: 24px;
}`}</CodeBlock>

      <SectionHeader number={7} title="Responsive Design and Media Queries" />

      <QuickFact>Mobile-first CSS means writing your base styles for small screens, then using media queries to add complexity for larger screens.</QuickFact>

      <CodeBlock language="css" filename="responsive.css">{`/* Mobile-first base styles */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body { background: #0f0f0f; color: #f5f5f5; }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`}</CodeBlock>

      <SectionHeader number={8} title="CSS Custom Properties (Variables)" />

      <CodeBlock language="css" filename="variables.css">{`/* Declare variables on :root for global scope */
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --spacing-md: 16px;
  --border-radius: 8px;
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

/* Override for dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #60a5fa;
    --color-text: #f9fafb;
  }
}`}</CodeBlock>

      <SectionHeader number={9} title="CSS Animations and Transitions" />

      <CodeBlock language="css" filename="animations.css">{`/* Smooth hover transition */
.button {
  background: #3b82f6;
  transform: scale(1);
  transition: background 0.2s ease, transform 0.15s ease;
}
.button:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

/* Keyframe animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card {
  animation: fadeInUp 0.4s ease forwards;
}

/* Stagger children */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }

/* Spinning loader */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.loader {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`}</CodeBlock>

      <SectionHeader number={10} title="Modern CSS Features (2024-2026)" />

      <KeyPointsGrid columns={2} items={[
        { title: ':has() selector', description: 'Parent selector — style a parent based on its children. .card:has(img) targets cards that contain an image.' },
        { title: 'CSS Container Queries', description: 'Style elements based on their container size instead of viewport size. Perfect for truly reusable components.' },
        { title: 'CSS Nesting', description: 'Write nested selectors directly in CSS (like Sass), now supported natively in all modern browsers.' },
        { title: 'color-mix()', description: 'Mix two colors in CSS: color-mix(in srgb, blue 30%, white) creates a light blue tint.' },
        { title: 'CSS Layers (@layer)', description: 'Explicitly control cascade layers, making it easier to manage third-party styles vs. your own styles.' },
        { title: 'Logical properties', description: 'margin-inline-start instead of margin-left — works correctly for both LTR and RTL languages.' },
      ]} />

      <CodeBlock language="css" filename="modern-css.css">{`/* :has() — parent selector */
.form-group:has(input:invalid) { border-color: red; }

/* Container queries */
.card-wrapper { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* CSS Nesting (native, no Sass needed) */
.nav {
  display: flex;
  gap: 16px;

  & a {
    text-decoration: none;
    &:hover { color: royalblue; }
  }
}

/* CSS @layer */
@layer reset, base, components, utilities;
@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}`}</CodeBlock>

      <SectionHeader number={11} title="CSS Specificity and the Cascade" />

      <CompareTable
        leftLabel="Selector"
        rightLabel="Specificity score"
        rows={[
          { label: '*', left: '* (universal)', right: '0,0,0,0 — lowest possible' },
          { label: 'p', left: 'p (type)', right: '0,0,0,1' },
          { label: '.class', left: '.card (class)', right: '0,0,1,0' },
          { label: '#id', left: '#header (ID)', right: '0,1,0,0' },
          { label: 'inline', left: 'style="..."', right: '1,0,0,0 — highest' },
          { label: '!important', left: '!important', right: 'Overrides everything — use sparingly' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between margin and padding?',
          answer: 'Padding is the space between the content and the border (inside the element). Margin is the space outside the border (between elements). Background color fills padding but not margin. Margins can collapse — two adjacent vertical margins merge into one (the larger value).',
        },
        {
          question: 'When should I use Flexbox vs CSS Grid?',
          answer: 'Use Flexbox for one-dimensional layouts — rows of items, navigation bars, centering content. Use Grid for two-dimensional layouts — full page layouts with rows and columns. They work well together: Grid for the page structure, Flexbox for the components inside each grid area.',
        },
        {
          question: 'What does display: none vs visibility: hidden do?',
          answer: 'display: none removes the element from the layout entirely — no space is reserved. visibility: hidden hides the element visually but preserves its space in the layout. For screen readers, both hide content. Use opacity: 0 to hide visually while keeping it accessible to screen readers and preserving layout space.',
        },
        {
          question: 'Why does z-index not work on my element?',
          answer: 'z-index only works on positioned elements (position: relative, absolute, fixed, or sticky). Elements with position: static (the default) ignore z-index. Also, z-index is scoped to stacking contexts — a child cannot appear above an element outside its parent stacking context, even with a high z-index.',
        },
        {
          question: 'What is the difference between em, rem, px, and %?',
          answer: 'px is absolute (fixed size). em is relative to the parent element font-size. rem is relative to the root element font-size (usually 16px) — more predictable than em. % is relative to the parent element dimension. For font sizes, use rem for consistency. For spacing, rem or px both work. For responsive widths, use % or viewport units (vw, vh).',
        },
      ]} />

      <AlertBox type="success" title="CSS mastery comes from practice">
        The best way to learn CSS is to build real projects. Start with a simple webpage, then add Flexbox for the navigation, Grid for the content layout, custom properties for theming, and media queries for responsiveness. Each concept reinforces the others.
      </AlertBox>
    </BlogLayoutWithSidebarAds>
  );
}
