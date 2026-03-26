'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
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
        { value: 'SSR', label: 'root cause: server/client HTML differs', color: 'red' },
        { value: '8+', label: 'common causes covered', color: 'blue' },
        { value: 'Next.js', label: '13/14/15 App & Pages Router', color: 'purple' },
        { value: '5 min', label: 'to diagnose and fix', color: 'green' },
      ]} />

      <AlertBox type="error" title="The error you're seeing">
        Error: Hydration failed because the initial UI does not match what was rendered on the server.
        Warning: Expected server HTML to contain a matching &lt;div&gt; in &lt;div&gt;.
      </AlertBox>

      <SectionHeader number={1} title="Why Hydration Errors Happen" />
      <p>
        Next.js renders your page HTML on the server first, then "hydrates" it in the browser — attaching
        React event listeners to the existing HTML. If React generates different HTML during hydration than
        what the server sent, it throws a mismatch error.
      </p>

      <FlowDiagram steps={[
        { label: 'Server renders HTML', color: 'blue' },
        { label: 'HTML sent to browser', color: 'blue' },
        { label: 'React hydrates (re-runs components)', color: 'amber' },
        { label: 'React output ≠ server HTML?', color: 'red' },
        { label: 'Hydration error thrown', color: 'red' },
      ]} />

      <SectionHeader number={2} title="Cause 1 — Using Browser-Only APIs During SSR" />
      <p>
        <code>window</code>, <code>localStorage</code>, <code>navigator</code>, and <code>document</code>
        don't exist on the server. If your component uses them during render, the server outputs nothing
        (or throws) while the client renders with real values.
      </p>

      <ErrorFix
        bad={`// Reads localStorage during render — crashes on server
export default function ThemeButton() {
  const theme = localStorage.getItem('theme') || 'light'; // ❌ no localStorage on server
  return <button>{theme}</button>;
}`}
        good={`// Only read localStorage after mount
'use client';
import { useState, useEffect } from 'react';

export default function ThemeButton() {
  const [theme, setTheme] = useState('light'); // safe default for SSR

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light'); // runs only in browser
  }, []);

  return <button>{theme}</button>;
}`}
        badLabel="localStorage during render"
        goodLabel="localStorage after mount"
      />

      <SectionHeader number={3} title="Cause 2 — Date/Time Differences" />
      <p>
        <code>new Date()</code> on the server and client will return different values if there's any
        time gap between render and hydration. Even milliseconds cause a mismatch.
      </p>

      <ErrorFix
        bad={`export default function Timestamp() {
  return <p>Now: {new Date().toLocaleString()}</p>; // ❌ different value server vs client
}`}
        good={`'use client';
import { useState, useEffect } from 'react';

export default function Timestamp() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(new Date().toLocaleString()); // Only rendered client-side
  }, []);

  if (!time) return null; // or a skeleton

  return <p>Now: {time}</p>;
}`}
        badLabel="Date during SSR render"
        goodLabel="Date after mount"
      />

      <SectionHeader number={4} title="Cause 3 — Invalid HTML Nesting" />
      <p>
        Browsers auto-correct invalid HTML nesting (e.g., <code>&lt;p&gt;</code> inside
        <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code> inside <code>&lt;p&gt;</code>), but they do it
        differently than React expects — causing a mismatch.
      </p>

      <ErrorFix
        bad={`// <div> inside <p> is invalid HTML — browser auto-corrects
export default function Card() {
  return (
    <p>
      <div>Content here</div>  {/* ❌ block element inside inline */}
    </p>
  );
}`}
        good={`export default function Card() {
  return (
    <div>                    {/* ✅ div inside div is fine */}
      <div>Content here</div>
    </div>
  );
}`}
        badLabel="Invalid HTML nesting"
        goodLabel="Valid nesting"
      />

      <SectionHeader number={5} title="Cause 4 — Browser Extensions" />
      <p>
        Extensions like Grammarly, password managers, or ad blockers inject HTML/attributes into the DOM
        (e.g., adding <code>data-gramm</code> to inputs) that React didn't render. This causes hydration
        mismatches in development.
      </p>

      <AlertBox type="tip" title="Test in incognito mode">
        Open Chrome in incognito (which disables extensions by default) and reload.
        If the hydration error disappears — a browser extension is causing it, not your code.
      </AlertBox>

      <SectionHeader number={6} title="Cause 5 — Math.random() or Unique IDs" />
      <ErrorFix
        bad={`// Different random value on server vs client
export default function Badge() {
  const id = Math.random(); // ❌ server gets 0.123, client gets 0.456
  return <div id={\`badge-\${id}\`}>New</div>;
}`}
        good={`'use client';
import { useId } from 'react'; // React 18+ built-in

export default function Badge() {
  const id = useId(); // ✅ stable across server and client
  return <div id={id}>New</div>;
}`}
        badLabel="Math.random() during render"
        goodLabel="useId() for stable IDs"
      />

      <SectionHeader number={7} title="Cause 6 — Conditional Rendering Based on window" />
      <ErrorFix
        bad={`// window is undefined on server → renders nothing → client renders something
export default function MobileMenu() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return <nav>Mobile Nav</nav>;
  }
  return null; // server always returns null — client may not
}`}
        good={`'use client';
import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!isMobile) return null;
  return <nav>Mobile Nav</nav>;
}`}
        badLabel="Checking window during render"
        goodLabel="Check window after mount"
      />

      <SectionHeader number={8} title="The suppressHydrationWarning Escape Hatch" />
      <p>
        For intentional server/client differences (like timestamps or user-specific content),
        you can suppress the warning on a specific element:
      </p>

      <CodeBlock language="jsx" filename="suppressHydrationWarning">
{`// Use only when the mismatch is intentional and safe
export default function LastSeen() {
  return (
    <time suppressHydrationWarning>
      {new Date().toLocaleString()}
    </time>
  );
}
// ⚠️ Don't use this to hide real bugs — fix those properly`}
      </CodeBlock>

      <SectionHeader number={9} title="The dynamic() No-SSR Pattern" />
      <CodeBlock language="jsx" filename="dynamic import — disable SSR">
{`import dynamic from 'next/dynamic';

// This component will ONLY render on the client
const ClientOnlyMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function Page() {
  return (
    <div>
      <h1>Store Locator</h1>
      <ClientOnlyMap />  {/* No SSR — no hydration mismatch */}
    </div>
  );
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'The hydration error only happens in development — is that normal?',
          answer: 'Yes. In production, Next.js suppresses the hydration mismatch warning and attempts to recover by re-rendering the component tree client-side. The visual glitch may still appear. Fix the root cause regardless — production recovery can cause layout shifts and performance issues.',
        },
        {
          question: 'I see the error but can\'t find where it\'s coming from. How do I debug it?',
          answer: 'In Next.js 13+, the error message includes a component stack. Look for the specific element that mismatches. Also try: (1) comment out components one by one until the error disappears, (2) check if the error goes away in incognito mode (extensions), (3) search your code for window, localStorage, Math.random(), new Date().',
        },
        {
          question: 'Why does my styled-components/emotion cause hydration errors?',
          answer: 'CSS-in-JS libraries that generate class names can produce different names on server vs client. Configure them with SSR support: for styled-components use ServerStyleSheet, for emotion use the cache provider. Both libraries have official Next.js integration guides.',
        },
        {
          question: 'Can third-party components cause hydration errors?',
          answer: 'Yes. Any third-party component that uses browser APIs during render will cause issues. Wrap them with dynamic(() => import("..."), { ssr: false }) to prevent server-side rendering.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
