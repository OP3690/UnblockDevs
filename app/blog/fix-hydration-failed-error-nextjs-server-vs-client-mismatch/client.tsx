'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FixHydrationFailedErrorNextjsServerVsClientMismatchClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Hydration Failed" Error in Next.js — Server vs Client Mismatch Explained</h1>
      <p className="lead">
        The Next.js hydration error is one of the most confusing bugs in React — the page renders fine
        on the server, but React throws a mismatch error in the browser. This guide explains exactly why
        it happens and covers every common cause with working fixes.
      </p>

      <StatGrid stats={[
        { value: 'SSR', label: 'root cause: server/client HTML differs at render time', color: 'red' },
        { value: '8+', label: 'common causes covered with before/after fixes', color: 'blue' },
        { value: 'Next.js', label: '13/14/15 App & Pages Router — same root causes', color: 'purple' },
        { value: 'useEffect', label: 'key pattern for browser-only operations', color: 'green' },
      ]} />

      <AlertBox type="error" title="The error you're seeing">
        Error: Hydration failed because the initial UI does not match what was rendered on the server.
        Warning: Expected server HTML to contain a matching element in the client tree.
        This error means React generated different HTML during hydration than what the server sent.
      </AlertBox>

      <SectionHeader number={1} title="Why Hydration Errors Happen" />
      <QuickFact color="red" label="The core problem">
        Next.js renders your page HTML on the server first, then "hydrates" it in the browser — attaching
        React event listeners to the existing server-rendered HTML. If React generates different HTML during
        hydration than what the server sent, it throws a mismatch error. The server and browser must
        produce identical HTML from the same component tree.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Server renders your component tree to HTML', desc: 'Next.js runs your React components on the server and produces a static HTML string. This string is sent to the browser as the initial page response — it\'s what users see before JavaScript loads.' },
        { title: 'HTML is sent to the browser', desc: 'The browser receives the pre-rendered HTML and displays it immediately (fast initial paint). At this point, the page looks right but has no interactivity — buttons don\'t work, state doesn\'t update.' },
        { title: 'React hydrates — re-runs components in the browser', desc: 'React runs your component tree again in the browser to attach event handlers. During this re-run, React generates its own virtual DOM and compares it to the server HTML.' },
        { title: 'React compares browser output to server HTML', desc: 'If the component produces identical HTML — great, hydration succeeds silently. If the output differs by even one character, React throws the hydration error.' },
        { title: 'Mismatch → hydration error thrown', desc: 'React throws "Hydration failed" and displays the error overlay in development. In production, React tries to recover by re-rendering the entire tree client-side, causing a visible flash of content and performance degradation.' },
      ]} />

      <SectionHeader number={2} title="Cause 1 — Using Browser-Only APIs During SSR" />
      <AlertBox type="warning" title="window, localStorage, navigator don't exist on the server">
        If your component reads from window, localStorage, document, or navigator during the render phase,
        the server throws or returns nothing while the client renders with real values — a guaranteed mismatch.
      </AlertBox>

      <ErrorFix
        bad={`// Reads localStorage during render — crashes on server
export default function ThemeButton() {
  const theme = localStorage.getItem('theme') || 'light'; // ❌ no localStorage on server
  return <button>{theme}</button>;
  // Server: ReferenceError: localStorage is not defined
  // Client: renders "dark" → mismatch
}`}
        good={`// Only read localStorage after mount
'use client';
import { useState, useEffect } from 'react';

export default function ThemeButton() {
  const [theme, setTheme] = useState('light'); // ✅ safe server default

  useEffect(() => {
    // useEffect only runs in the browser, never on the server
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  return <button>{theme}</button>;
  // Server: renders "light" | Client: hydrates as "light", then updates after mount
}`}
        badLabel="localStorage during render — server crash"
        goodLabel="localStorage inside useEffect — runs only in browser"
      />

      <SectionHeader number={3} title="Cause 2 — Date/Time Differences" />
      <ErrorFix
        bad={`export default function Timestamp() {
  return <p>Now: {new Date().toLocaleString()}</p>;
  // ❌ Server: "1/15/2025, 10:00:00 AM" (UTC server time)
  // Client: "1/15/2025, 2:00:00 PM" (user's local timezone)
  // Different strings = hydration mismatch
}`}
        good={`'use client';
import { useState, useEffect } from 'react';

export default function Timestamp() {
  const [time, setTime] = useState<string>(''); // empty on server

  useEffect(() => {
    setTime(new Date().toLocaleString()); // ✅ only rendered client-side
  }, []);

  if (!time) return <p>Loading time...</p>; // server shows placeholder

  return <p>Now: {time}</p>;
  // Server: "Loading time..." | Browser: shows actual local time after mount
}`}
        badLabel="Date during SSR render — timezone mismatch"
        goodLabel="Date inside useEffect — client-only rendering"
      />

      <SectionHeader number={4} title="Cause 3 — Invalid HTML Nesting" />
      <ErrorFix
        bad={`// <div> inside <p> is invalid HTML — browsers auto-correct it differently than React expects
export default function Card() {
  return (
    <p>
      <div>Content here</div>  {/* ❌ block element inside inline element */}
    </p>
  );
  // Browser moves <div> outside <p> automatically.
  // React sees a different DOM structure than it rendered → hydration mismatch
}`}
        good={`export default function Card() {
  return (
    <div>                    {/* ✅ div inside div is valid */}
      <div>Content here</div>
    </div>
  );
}

// Other common invalid nesting to avoid:
// <ul> inside <p>  → invalid
// <h1> inside <span> → invalid (block in inline)
// <table> without <tbody> → browsers add one automatically`}
        badLabel="Invalid HTML — browser auto-corrects, React doesn't"
        goodLabel="Valid HTML nesting — no auto-correction surprises"
      />

      <SectionHeader number={5} title="Cause 4 — Browser Extensions" />
      <AlertBox type="tip" title="Test in incognito mode first">
        Extensions like Grammarly, password managers, LastPass, or ad blockers inject HTML attributes
        and DOM nodes (data-gramm, data-lt-installed) that React didn't render. This shows as hydration
        mismatches in development. Open Chrome in incognito (no extensions) and reload — if the error
        disappears, an extension is causing it, not your code.
      </AlertBox>

      <SectionHeader number={6} title="Cause 5 — Math.random() or Unique IDs" />
      <ErrorFix
        bad={`// Different random value on server vs client
export default function Badge() {
  const id = Math.random(); // ❌ server gets 0.123, client gets 0.456
  return <div id={\`badge-\${id}\`}>New</div>;
  // Different id values = mismatch
}`}
        good={`'use client';
import { useId } from 'react'; // React 18+ built-in stable ID generator

export default function Badge() {
  const id = useId(); // ✅ same value on server and client — stable
  return <div id={id}>New</div>;
}

// useId() generates deterministic IDs based on component position in the tree
// Same tree position = same ID on server and client`}
        badLabel="Math.random() during render — different every time"
        goodLabel="useId() for stable server/client IDs"
      />

      <SectionHeader number={7} title="Cause 6 — Conditional Rendering Based on window" />
      <ErrorFix
        bad={`// window is undefined on server → renders null → client renders something
export default function MobileMenu() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return <nav>Mobile Nav</nav>;
  }
  return null;
  // Server: window is undefined → always returns null
  // Client: window.innerWidth may be 375 → returns <nav> → MISMATCH
}`}
        good={`'use client';
import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isMobile, setIsMobile] = useState(false); // false on server

  useEffect(() => {
    setIsMobile(window.innerWidth < 768); // ✅ runs only in browser
    // Optionally add a resize listener here
  }, []);

  if (!isMobile) return null; // server and initial client both return null
  return <nav>Mobile Nav</nav>; // shown after mount on mobile
}`}
        badLabel="Checking window during render — always null on server"
        goodLabel="Check window after mount with useEffect"
      />

      <SectionHeader number={8} title="Cause 7 — CSS-in-JS Class Name Mismatch" />
      <AlertBox type="warning" title="styled-components and emotion generate different class names">
        CSS-in-JS libraries that generate class names at runtime (styled-components, emotion) will
        produce different class names on the server vs client unless configured with SSR support.
        Configure the SSR provider to serialize styles on the server and inject them into the page.
      </AlertBox>

      <CodeBlock language="jsx" filename="styled-components SSR fix for Next.js App Router">
{`// app/layout.tsx — wrap with styled-components registry
'use client';
import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

// Wrap your root layout:
// export default function RootLayout({ children }) {
//   return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
// }`}
      </CodeBlock>

      <SectionHeader number={9} title="The suppressHydrationWarning and dynamic() Escape Hatches" />
      <CompareTable
        leftLabel="Approach"
        rightLabel="When to Use + Trade-offs"
        rows={[
          { label: 'suppressHydrationWarning', left: 'Add to a specific element', right: 'Use only for intentional mismatches (timestamps, user content). Hides the warning without fixing the root cause.' },
          { label: 'dynamic({ ssr: false })', left: 'Skip SSR for entire component', right: 'Best for browser-only components (maps, charts, WebGL). Shows loading state on server, renders component client-side only.' },
          { label: 'useEffect + state', left: 'Defer browser value to after mount', right: 'Cleanest fix. Server renders with safe default. Browser updates state after hydration. Small visual flash.' },
          { label: 'isClient state', left: 'Boolean: false on server, true after mount', right: 'Simple pattern for "render X only on client" without dynamic import overhead.' },
        ]}
      />

      <CodeBlock language="jsx" filename="All escape hatch patterns side by side">
{`// Pattern 1: suppressHydrationWarning (for intentional, safe mismatches)
export default function LastSeen() {
  return (
    <time suppressHydrationWarning>
      {new Date().toLocaleString()}
    </time>
  );
  // ⚠️ Use only when the mismatch is harmless — don't hide real bugs
}

// Pattern 2: dynamic() with ssr: false (for browser-only components)
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

// Pattern 3: isClient pattern (lightweight alternative to dynamic)
'use client';
import { useState, useEffect } from 'react';

export function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}

// Usage:
// <ClientOnly fallback={<Skeleton />}>
//   <ComponentWithBrowserAPIs />
// </ClientOnly>`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'The hydration error only happens in development — is that normal?',
          answer: 'Yes. In production, Next.js suppresses the hydration mismatch warning and attempts to recover by re-rendering the component tree client-side (discarding server HTML). The visual glitch may still appear as a flash of content. Fix the root cause regardless — production recovery causes layout shifts, performance degradation, and potential SEO issues from mismatched content.',
        },
        {
          question: 'I see the error but can\'t find where it\'s coming from. How do I debug it?',
          answer: 'In Next.js 13+, the error overlay includes a component stack trace. Look for the specific element that mismatches. Debugging steps: (1) Test in incognito mode to rule out browser extensions. (2) Search your code for window, localStorage, Math.random(), new Date(), navigator — any of these during render causes mismatches. (3) Comment out components one by one until the error disappears — binary search your component tree.',
        },
        {
          question: 'Why does my styled-components/emotion cause hydration errors?',
          answer: 'CSS-in-JS libraries that generate class names at runtime produce different names on server vs client because the generation counter resets. Configure SSR support: styled-components requires ServerStyleSheet and useServerInsertedHTML in App Router. Emotion requires the cache provider. Both libraries have official Next.js integration guides with step-by-step setup.',
        },
        {
          question: 'Can third-party components cause hydration errors?',
          answer: 'Yes — any third-party component that uses browser APIs (window, document, navigator) during render will cause hydration errors. Common culprits: map libraries (Leaflet, Google Maps), rich text editors (Quill, Slate), chart libraries that read DOM dimensions. Fix: wrap them with dynamic(() => import("..."), { ssr: false }) to prevent server-side rendering entirely.',
        },
        {
          question: 'What is the difference between Next.js App Router and Pages Router for hydration?',
          answer: 'The root cause is identical in both routers — server/client HTML mismatch. The difference is in error messages and recovery. In App Router (Next.js 13+), error messages are more detailed with component stacks. Server Components in App Router never run in the browser, so they can\'t cause hydration mismatches — only Client Components (with "use client") can. Move browser-specific code to Client Components.',
        },
        {
          question: 'How do I handle user-specific content that differs on server vs client?',
          answer: 'Two approaches: (1) Use the dynamic({ ssr: false }) pattern to skip SSR for user-specific sections entirely — shows a skeleton on server, loads real content in browser. (2) Use suppressHydrationWarning on elements where user-specific values appear (username, preferences) if the mismatch is intentional. Avoid approach (2) for important content since it won\'t be in the initial HTML for crawlers.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
