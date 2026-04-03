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
        the Console panel for reading errors, the Sources panel for breakpoints and call stack
        inspection, the Network panel for API debugging, Performance and Memory profiling, and
        specific workflows for the most common JavaScript error types.
      </p>

      <StatGrid stats={[
        { value: 'F12', label: 'open DevTools in any browser on Windows/Linux', color: 'blue' },
        { value: '6 panels', label: 'Console, Sources, Network, Performance, Memory, Application', color: 'green' },
        { value: 'Breakpoints', label: 'pause execution at any line and inspect all variables', color: 'purple' },
        { value: 'Network tab', label: 'see every API call, request, response, and timing', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Opening DevTools and Navigating Panels" />
      <p>
        DevTools is built into every major browser. Chrome DevTools and Edge DevTools are identical.
        Firefox has equivalent features with a slightly different UI. Safari requires enabling the
        Develop menu first.
      </p>
      <QuickFact color="blue" label="Opening DevTools in every browser">
        Open DevTools: F12 (Windows/Linux) | Cmd+Option+I (Mac) | Right-click → Inspect.
        Chrome and Edge have identical DevTools. Firefox has similar features with slightly
        different UI. Safari: Enable in Preferences → Advanced → Show Develop menu, then
        Develop → Show Web Inspector (Cmd+Option+I).
      </QuickFact>

      <SectionHeader number={2} title="Console Panel — Your First Stop for Errors" />
      <p>
        The Console panel is where JavaScript errors, warnings, and your console.log output appear.
        Every error includes a clickable link to the exact file and line number where it occurred.
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Reading error messages', description: 'Errors appear in red with a clickable file:line reference on the right. Click the file:line link to jump directly to the source code location. The error type + message tells you what happened; the file:line tells you where.' },
        { title: 'Running JS in the Console', description: 'Type any JS expression and press Enter to run it immediately on the current page. Access all global variables, call functions, inspect the DOM: document.querySelector(".my-class"). Test fixes live before editing your source code.' },
        { title: 'Filter console output', description: 'Use the filter dropdown to show only Errors, Warnings, Info, or Verbose. In large applications with lots of logging, filtering to Errors immediately cuts through the noise. You can also type in the filter box to search by message text.' },
        { title: 'Preserve log across navigations', description: 'Click the gear icon (⚙) → check "Preserve log". Keeps all console output even when the page navigates or redirects. Essential for debugging errors that happen during form submissions, login redirects, or any navigation event.' },
      ]} />
      <CodeBlock lang="javascript" title="Useful console methods for debugging">
{`// Standard log — use for general debugging
console.log('[ComponentName]', typeof data, data);

// Table — renders arrays of objects as a formatted table
console.table(users);  // Much easier than console.log for arrays of objects

// Group related logs together (collapsible in DevTools)
console.group('fetchUser request');
console.log('userId:', userId);
console.log('response:', response.status);
console.groupEnd();

// Time performance of a code section
console.time('data processing');
processLargeDataSet(data);
console.timeEnd('data processing'); // prints: "data processing: 245ms"

// Assert — only logs if condition is false
console.assert(user.id > 0, 'User ID must be positive', user);

// Log with a stack trace (where was this called from?)
console.trace('called from here');

// Error and warning (different colors/icons in DevTools)
console.error('Something failed:', error.message);
console.warn('Deprecation warning: use newMethod() instead');`}
      </CodeBlock>

      <SectionHeader number={3} title="Sources Panel — Breakpoint Debugging" />
      <p>
        The Sources panel is the most powerful debugging tool in DevTools. Breakpoints pause
        execution at any line, letting you inspect all variables, step through code, and watch
        expressions update in real time.
      </p>
      <CodeBlock lang="javascript" title="Breakpoint types and workflow">
{`// HOW TO SET A LINE BREAKPOINT:
// 1. Open Sources panel (F12 → Sources tab)
// 2. Find your file in the left sidebar, or press Ctrl+P (Cmd+P Mac) to search
// 3. Click any line number → a blue dot appears
// 4. Reload the page or trigger the code → execution pauses at that line
// 5. All variables in scope are visible in the right panel (Scope section)
// 6. Hover over any variable in the code to see its current value

// STEPPING CONTROLS (when paused at a breakpoint):
// F8 / ▶ : Resume — continue until the next breakpoint
// F10 / →: Step Over — execute this line, move to next line in same function
// F11 / ↓: Step Into — enter the function being called on this line
// Shift+F11: Step Out — finish current function, return to caller
// Ctrl+F8:  Deactivate all breakpoints temporarily

// Example: debugging an async function
async function fetchUser(userId) {
  // SET BREAKPOINT HERE → pauses before fetch executes
  // Check: is userId what you expect?
  const response = await fetch(\`/api/users/\${userId}\`);

  // SET BREAKPOINT HERE → pauses after fetch completes
  // Check: response.status, response.ok
  const user = await response.json();

  // SET BREAKPOINT HERE → inspect the parsed user object
  return user;
}

// CONDITIONAL BREAKPOINT: right-click line number → "Add conditional breakpoint"
// Only pauses when the condition is true:
// userId === undefined     (debug only when userId is missing)
// items.length > 100       (debug only with large datasets)
// i === 499                (debug only at loop iteration 500)

// DOM BREAKPOINT: Elements tab → right-click an element → "Break on..."
// Pauses when JavaScript modifies the DOM element — great for "why did this change?"

// XHR/FETCH BREAKPOINT: Sources → XHR/fetch Breakpoints → click + → add URL pattern
// Pauses on any fetch/XHR matching the URL pattern (e.g., "api/users")

// EXCEPTION BREAKPOINT: Pause on exceptions button (⏸ icon in Sources)
// Pauses on any uncaught exception — shows you exactly where the error was thrown`}
      </CodeBlock>

      <SectionHeader number={4} title="Network Panel — Debug API Calls" />
      <KeyPointsGrid columns={2} items={[
        { title: 'See all HTTP requests', description: 'Every request your page makes is listed: XHR/fetch for API calls, JS/CSS file loads, images. Filter by type using the toolbar buttons (XHR for API calls). Click any request to see its full details.' },
        { title: 'Check request and response details', description: 'Click a request → Headers tab: see exact request headers sent and response headers received. → Payload tab: see the request body you sent. → Response tab: see exactly what the server returned, including error responses.' },
        { title: 'Replay requests from the console', description: 'Right-click any request → "Copy as cURL" to get a cURL command that replays the exact request with all headers and body. Or "Copy as fetch" to test in the console. Essential for isolating whether a problem is in your frontend code or the server.' },
        { title: 'Throttle and simulate conditions', description: 'Click the throttle dropdown → select "Slow 3G", "Fast 3G", or "Offline". Tests how your app handles slow or no internet. Reveals loading state bugs that only appear when requests take longer than expected.' },
      ]} />

      <SectionHeader number={5} title="Diagnosing Specific Common Errors" />
      <CodeBlock lang="javascript" title="Debugging workflow for common error types">
{`// ─── TypeError: Cannot read properties of undefined ─────────────────────────
// 1. Console → click the file:line link in red error message
// 2. Sources → set breakpoint at the reported line
// 3. When paused: hover over the undefined variable, or check Scope panel (right)
// 4. The variable is null or undefined → trace back to where it should be assigned
// 5. Common causes: async data not loaded yet, API response different shape expected

// ─── Network/Fetch Error ─────────────────────────────────────────────────────
// 1. Network tab → look for the failed request (shown in red)
// 2. Check the Status code:
//    401 → authentication missing or expired
//    403 → authenticated but no permission
//    404 → URL is wrong or resource doesn't exist
//    422 → request body failed validation (check Payload tab)
//    500 → server crashed (check server logs, not browser)
//    CORS → response has no CORS headers (check Console for CORS error details)
// 3. Click the request → Response tab → see what server actually returned
//    (often an error message or HTML error page instead of JSON)

// ─── Async Race Condition (data sometimes undefined) ─────────────────────────
// 1. Sources → click the "Pause on exceptions" button (⏸)
// 2. Reproduce the bug → code pauses at the crash point automatically
// 3. Call Stack panel shows every function in the chain
// 4. Step up the call stack to find where data should have been set
// 5. Look for: missing await, promise not caught, state set before async resolves

// ─── "Unexpected token '<'" — API returning HTML instead of JSON ──────────────
// 1. Network tab → find the failing API request
// 2. Click request → Response tab
// 3. You'll see an HTML error page (the server is returning its error page)
// 4. Check the status code: 404 (wrong URL), 500 (server error), 302 (redirect to login)

// ─── Memory Leak (page slows over time) ──────────────────────────────────────
// 1. Memory tab → Take heap snapshot (initial state)
// 2. Use the application for a few minutes
// 3. Memory tab → Take another heap snapshot
// 4. Click "Comparison" in the dropdown → see objects that increased
// 5. Common culprits: event listeners not removed, global arrays growing, closures`}
      </CodeBlock>

      <SectionHeader number={6} title="Application Panel — Debug Storage and Cookies" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Inspect and edit local storage', description: 'Application → Storage → Local Storage → your domain. See all key-value pairs. Double-click any value to edit. Useful for debugging auth tokens, cached data, or feature flags stored in localStorage.' },
        { title: 'Clear cache and cookies', description: 'Application → Clear storage → check what to clear → Clear site data button. Resets the page to a fresh state. Essential for debugging caching bugs or authentication issues where old cookies interfere.' },
        { title: 'Inspect cookies', description: 'Application → Cookies → your domain. See all cookies with name, value, domain, expiry, and flags (HttpOnly, Secure, SameSite). Useful for verifying authentication cookies are being set correctly by your server.' },
        { title: 'Service worker debugging', description: 'Application → Service Workers. See registered service workers, their status, and force update or unregister them. Useful when cached service worker content is causing issues where your code changes aren\'t showing up.' },
      ]} />

      <AlertBox type="tip" title="Use the debugger; statement in your code">
        Add <code>debugger;</code> anywhere in your JavaScript code. When DevTools is open,
        execution pauses at that line exactly like a manually set breakpoint — no clicking in
        the UI required. Particularly useful in complex async code or callback chains where
        finding the exact line in Sources is difficult. Always remove <code>debugger;</code>
        statements before committing code.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I debug minified production JavaScript code?',
          answer: 'Click the {} button (pretty print) at the bottom of the Sources panel to auto-format minified code into readable format. For full debugging with your original source code, enable source maps in your build configuration (sourceMap: true in webpack, or vite.config.js build.sourcemap: true). Source maps tell DevTools how to map minified code back to your original TypeScript/JSX files, so breakpoints and error locations show in your source files, not the minified output.',
        },
        {
          question: 'What is the difference between Step Over, Step Into, and Step Out?',
          answer: 'Step Over (F10): execute the current line completely, then move to the next line in the same function. If the current line calls a function, that function runs completely without pausing inside it. Step Into (F11): if the current line calls a function, enter that function and pause at its first line. Use this to dig into the code being called. Step Out (Shift+F11): run the rest of the current function without pausing, and pause at the line that called this function. Use when you\'ve seen enough inside a function and want to return to the caller.',
        },
        {
          question: 'How do I debug a React or Vue app with DevTools?',
          answer: 'For React: install the React DevTools browser extension. It adds a Components panel (inspect component tree, props, and state) and a Profiler panel (find rendering performance issues). For Vue: install the Vue DevTools extension for component inspection. For runtime JavaScript errors in both, use the standard DevTools Sources breakpoints. React 18+ shows detailed error boundaries in the console in development mode, with the component stack that caused the error.',
        },
        {
          question: 'How do I see the full network request body that my code is sending?',
          answer: 'Network tab → click the request → Payload tab. This shows the request body parsed into a readable format. For JSON requests, it shows the parsed JSON object. For form data, it shows each field. If the Payload tab is missing, the request had no body (GET request or empty POST). If you see "Request payload" as raw text, click the "view source" toggle to see the raw bytes or decode URL-encoded form data.',
        },
        {
          question: 'Can I use DevTools to debug Node.js or server-side JavaScript?',
          answer: 'Yes — Node.js supports the Chrome DevTools Protocol. Run Node.js with the --inspect flag: node --inspect app.js (or --inspect-brk to pause at the first line). Then open Chrome and navigate to chrome://inspect. Click "inspect" next to your Node process to open a DevTools window connected to your server-side JavaScript. This gives you the full Sources panel breakpoints, Call Stack, and Scope inspection for server-side code.',
        },
        {
          question: 'Why do some of my errors not appear in the Console?',
          answer: 'Unhandled Promise rejections may appear as warnings rather than errors in older browser versions. Add .catch(console.error) to all Promise chains during debugging. Also check the Console filter — if you\'ve filtered by "Errors", warnings won\'t show. Some errors are swallowed by error boundaries in React or try/catch blocks in your code without being re-logged. Add console.error in your catch blocks: catch(e) { console.error("Caught:", e); }',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
