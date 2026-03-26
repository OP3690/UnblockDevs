'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToDebugJavascriptErrorsUsingBrowserDevtoolsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Debug JavaScript Errors Using Browser DevTools — Full Guide</h1>
      <p className="lead">
        Browser DevTools is the most powerful JavaScript debugging tool available — and it's
        already installed in every browser. This guide covers every DevTools debugging feature:
        breakpoints, the call stack, network inspection, memory profiling, and more.
      </p>

      <StatGrid stats={[
        { value: 'F12', label: 'open DevTools on any browser', color: 'blue' },
        { value: '6 panels', label: 'Console, Sources, Network, Performance, Memory, Application', color: 'green' },
        { value: 'Breakpoints', label: 'pause execution at any line, inspect all variables', color: 'purple' },
        { value: 'Network tab', label: 'see every API call, request, and response', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Opening DevTools" />
      <QuickFact>
        Open DevTools: F12 (Windows/Linux) | Cmd+Option+I (Mac) | Right-click → Inspect.
        Chrome and Edge have identical DevTools. Firefox has similar features with slightly
        different UI. Safari: Enable in Preferences → Advanced → Show Develop menu.
      </QuickFact>

      <SectionHeader number={2} title="Console Panel — Your First Stop" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Reading error messages', description: 'Errors appear in red with file:line reference. Click the file:line to jump directly to the source. The error message + type tells you exactly what happened.' },
        { title: 'Running JS in console', description: 'Type any JS expression and press Enter. Access current page variables. Inspect elements: document.querySelector(".my-class"). Incredibly useful for testing fixes live.' },
        { title: 'Filter by level', description: 'Use the filter dropdown to show only Errors, Warnings, or Info. In large apps, filtering to Errors cuts through the noise immediately.' },
        { title: 'Preserve log', description: 'Click gear icon → check "Preserve log". Keeps console output across page navigations. Essential for debugging errors that happen during redirects.' },
      ]} />

      <SectionHeader number={3} title="Sources Panel — Breakpoint Debugging" />
      <CodeBlock language="javascript" filename="DevTools breakpoint workflow">
{`// 1. Open Sources panel (F12 → Sources)
// 2. Navigate to your file using the file tree on left
//    OR press Ctrl+P (Cmd+P on Mac) to search by filename
// 3. Click line number to set a breakpoint (blue dot appears)

// Example: debugging an async function
async function fetchUser(userId) {
  // Set breakpoint here → code pauses before this line runs
  const response = await fetch(\`/api/users/\${userId}\`);

  // Set another breakpoint here → inspect 'response' object
  const user = await response.json();

  // Check if user is what you expect
  return user;
}

// Types of breakpoints:
// Line breakpoint: click line number
// Conditional: right-click → add conditional (e.g., userId === undefined)
// Exception breakpoint: Pause on exceptions button (pause icon)
// DOM breakpoint: Elements tab → right-click element → Break on...
// XHR/Fetch breakpoint: Sources → XHR Breakpoints → add URL pattern`}
      </CodeBlock>

      <SectionHeader number={4} title="Network Panel — Debug API Calls" />
      <KeyPointsGrid columns={2} items={[
        { title: 'See all requests', description: 'Every HTTP request your page makes. Filter by type: XHR/Fetch for API calls. Click any request to see headers, request body, and response.' },
        { title: 'Check response body', description: 'Select a request → Response tab. See exactly what the server returned. If you get "Unexpected token <", the Response shows the HTML error page.' },
        { title: 'Replay requests', description: 'Right-click a request → "Copy as cURL". Paste in terminal to replay the exact request with all headers. Or "Copy as fetch" to test in console.' },
        { title: 'Throttle network', description: 'Click the throttle dropdown → select "Slow 3G" or "Offline". Test how your app handles slow/no internet. Reveals loading state bugs.' },
      ]} />

      <SectionHeader number={5} title="Common Errors and How to Find Them" />
      <CodeBlock language="javascript" filename="Error diagnosis workflow">
{`// TypeError: Cannot read properties of undefined
// → In console, find the error and click the file:line link
// → Set breakpoint at that line
// → When paused, hover over the undefined variable to see its value
// → Check the Scope panel on right to see all variable values

// Network error (fetch failed)
// → Network tab → find the failed request (red)
// → Check Status code: 401? 404? 500? CORS error?
// → Click request → Response tab: what did server actually return?

// Async race condition (data sometimes undefined)
// → Sources → "Pause on exceptions" enabled
// → Reproduce the bug → code pauses at the crash
// → Call Stack panel shows every function that led here
// → Step up the call stack to find where data should have been set

// Memory leak (page slows over time)
// → Memory tab → Take Heap Snapshot
// → Do some actions on the page
// → Take another snapshot
// → Compare snapshots to find growing objects`}
      </CodeBlock>

      <AlertBox type="tip" title="Use debugger; in your code">
        Add <code>debugger;</code> anywhere in your JavaScript. When DevTools is open,
        execution pauses at that line exactly like a breakpoint — no clicking required.
        Remove before committing! Use in complex async flows where clicking breakpoints is tricky.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I debug minified production code?',
          answer: 'Click the {} (pretty print) button at the bottom of Sources to format minified code. Enable source maps in your build config (sourceMap: true in webpack/Vite) so DevTools shows your original unminified source even in production bundles.',
        },
        {
          question: 'What is the difference between step over, step into, and step out?',
          answer: 'Step Over (F10): execute current line, move to next line in same function. Step Into (F11): if current line calls a function, go inside that function. Step Out (Shift+F11): finish current function and return to the caller. Use step over most of the time; step into when you need to trace inside a function call.',
        },
        {
          question: 'How do I debug a React app with DevTools?',
          answer: 'Install React DevTools browser extension for component tree inspection and props/state inspection. For runtime errors, use the regular DevTools Sources breakpoints. For network/API issues, use Network tab. React error boundaries will show error details in the console in development mode.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
