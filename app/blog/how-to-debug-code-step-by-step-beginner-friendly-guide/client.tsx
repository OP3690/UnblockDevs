'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToDebugCodeStepByStepBeginnerFriendlyGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Debug Code Step by Step — Beginner-Friendly Guide</h1>
      <p className="lead">
        Debugging is a skill, not luck. Every experienced developer has a systematic approach
        to finding bugs — and beginners who learn this approach stop spending hours stuck on
        problems that experts solve in minutes. This guide teaches you the mental model, the
        tools, and the systematic process to debug any code: from simple print statement debugging
        to using breakpoints in a full IDE debugger, to diagnosing production-only issues.
      </p>

      <StatGrid stats={[
        { value: '90%', label: 'of bugs found by adding a single log statement in the right place', color: 'green' },
        { value: 'Bisect', label: 'divide and conquer — binary search for where the bug lives', color: 'blue' },
        { value: 'Read errors', label: 'the error message tells you exactly what\'s wrong', color: 'purple' },
        { value: 'Rubber duck', label: 'explaining your code out loud finds most bugs', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Debugging Mindset — What Most Beginners Get Wrong" />
      <p>
        The biggest mistake beginners make is randomly changing code hoping to stumble on a fix.
        This approach takes longer, introduces new bugs, and doesn't build the skills to prevent
        similar bugs in the future. Systematic debugging is the opposite: form a hypothesis about
        what's wrong, test it with the minimum change needed to verify or falsify it, then act.
      </p>
      <QuickFact color="blue" label="The core debugging insight">
        A bug is a gap between what you think the code does and what it actually does.
        Debugging is the process of finding where that gap is. The most important skill is
        NOT guessing — it's forming a hypothesis and testing it systematically.
        Every log statement you add is an experiment: "Is X true at this point?"
      </QuickFact>

      <SectionHeader number={2} title="The 7-Step Debugging Process" />
      <VerticalSteps steps={[
        { title: 'Read the error message completely', desc: 'Most beginners skip this step. The error type, message, file name, and line number tell you exactly where to look. "TypeError: Cannot read property \'name\' of undefined at processUser (app.js:42)" → line 42, something is undefined. The stack trace shows you every function call that led there.' },
        { title: 'Reproduce the bug reliably', desc: 'Before fixing, confirm you can reproduce the bug consistently. What exact inputs or steps trigger it? What browser, OS, or environment? If you can\'t reproduce it, you can\'t verify the fix. A fix that only "seems to work" without reproduction is not a real fix.' },
        { title: 'Isolate where the bug occurs', desc: 'Add log statements around the suspected area. Binary search: does the bug happen before or after the midpoint of the code? If you have 100 lines of code, add a log at line 50. If the bug happens after, focus on lines 50–100. Repeat until you find the exact line.' },
        { title: 'Inspect the actual values', desc: 'console.log(typeof x, x) to see what x actually is — not what you think it should be. console.log(JSON.stringify(obj, null, 2)) for objects. The bug is almost always "this value is not what I expected at this point in the code."' },
        { title: 'Form a hypothesis and test it', desc: 'Don\'t randomly change code. Form a specific theory: "I think x is undefined because the API call hasn\'t resolved yet." Verify the theory first with a log, then implement the fix. If your theory was wrong, find out why before changing the hypothesis.' },
        { title: 'Fix one thing at a time', desc: 'Changing multiple things simultaneously makes it impossible to know what fixed the bug — or whether you introduced a new bug in the process. Make one change, test it, verify, then proceed to the next change.' },
        { title: 'Verify the fix and test edge cases', desc: 'Run the code with the original failing input. Then test edge cases: empty input, null values, boundary values, maximum values. Confirm the fix didn\'t break any existing functionality by running the full test suite.' },
      ]} />

      <SectionHeader number={3} title="Print Debugging — The Universal Tool" />
      <CodeBlock lang="javascript" title="Strategic console.log placement">
{`// ❌ Bad debugging — log tells you nothing
function processUser(user) {
  console.log("here"); // tells you the code reached this line — that's it
  return user.name.toUpperCase();
}

// ✅ Good debugging — log type AND value
function processUser(user) {
  console.log("[processUser] user:", typeof user, user);
  console.log("[processUser] user.name:", typeof user?.name, user?.name);
  return user.name.toUpperCase();
}

// ✅ Even better — JSON.stringify for deep object inspection
function processOrder(order) {
  console.log("[processOrder] INPUT:", JSON.stringify(order, null, 2));
  const result = calculateTotal(order.items);
  console.log("[processOrder] OUTPUT:", result);
  return result;
}

// ✅ console.table for arrays of objects — renders as a table in DevTools
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" }
];
console.table(users);  // Much easier to read than console.log for arrays

// ✅ Conditional logging — only log when condition is true
const DEBUG = process.env.NODE_ENV !== 'production';
const log = (...args) => DEBUG && console.log('[DEBUG]', ...args);

// ✅ console.time for performance debugging
console.time('fetchUsers');
const users2 = await fetchUsers();
console.timeEnd('fetchUsers'); // prints: "fetchUsers: 342ms"

// ✅ console.error for errors (shows red in console)
// ✅ console.warn for warnings (shows yellow)
// ✅ console.group / console.groupEnd for organized output`}
      </CodeBlock>

      <SectionHeader number={4} title="Using Browser DevTools Debugger" />
      <p>
        For complex bugs — especially in async code, complex object state, or issues that are
        hard to reproduce with logs — the browser debugger is more powerful. It lets you pause
        execution, inspect all variables, and step through code line by line.
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Setting breakpoints', description: 'Open DevTools (F12) → Sources tab → find your file → click the line number. A blue dot appears. When the code reaches that line, execution pauses and you can inspect all variables in scope in the right panel (Scope section).' },
        { title: 'Conditional breakpoints', description: 'Right-click a line number → "Add conditional breakpoint". Only pauses when the condition is true (e.g., i === 499 to debug iteration 500 of a loop, or userId === "problem-id"). Invaluable for debugging specific cases without pausing on every iteration.' },
        { title: 'Watch expressions', description: 'In Sources panel → Watch section → click + → add any expression. The expression is evaluated in real-time as you step through code. Watch things like array.length, obj.status, or complex expressions like items.filter(x => x.price > 100).length.' },
        { title: 'Call stack inspection', description: 'The Call Stack panel shows every function call that led to the current paused line, from bottom (first called) to top (current). Tells you HOW you got to the current line — who called whom. Essential for async debugging where the call sequence is non-obvious.' },
      ]} />

      <SectionHeader number={5} title="Debugging Async Code — The Special Challenge" />
      <CodeBlock lang="javascript" title="Common async debugging patterns">
{`// ❌ Classic async bug — missing await
async function getUser(id) {
  const user = fetchUser(id);  // ❌ forgot await — user is a Promise, not a User
  console.log(user.name);      // TypeError: Cannot read property 'name' of undefined
}

// ✅ Fix: add await
async function getUser(id) {
  const user = await fetchUser(id);  // ✅ waits for the Promise to resolve
  console.log(user.name);            // "Alice"
}

// ❌ Lost error in Promise chain
fetchUser(id)
  .then(user => processUser(user))
  // If processUser throws, the error is silently swallowed
  .then(result => saveResult(result));

// ✅ Always catch errors
fetchUser(id)
  .then(user => processUser(user))
  .then(result => saveResult(result))
  .catch(error => {
    console.error('[getUser] failed:', error.message, error.stack);
    // Now you see the error instead of silent failure
  });

// ✅ With async/await + try/catch
async function processAndSave(id) {
  try {
    const user = await fetchUser(id);
    const result = processUser(user);
    await saveResult(result);
  } catch (error) {
    console.error('[processAndSave] error at step:', error.message);
    throw error;  // re-throw so the caller knows it failed
  }
}

// ✅ Debugging parallel async operations
const [user, orders, payments] = await Promise.all([
  fetchUser(id).catch(e => { console.error('fetchUser failed:', e); return null; }),
  fetchOrders(id).catch(e => { console.error('fetchOrders failed:', e); return []; }),
  fetchPayments(id).catch(e => { console.error('fetchPayments failed:', e); return []; }),
]);
// Individual catches let you see which request failed`}
      </CodeBlock>

      <SectionHeader number={6} title="When the Bug Is in Production But Not Local" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Check environment variables', description: 'Different API keys, database URLs, feature flags between dev and prod. Log process.env variables (except secrets) at startup. A missing or incorrect env variable is the most common "works locally, fails in prod" cause.' },
        { title: 'Check data differences', description: 'Production data has edge cases that test data doesn\'t. A customer with a null middle name, a product with an empty price array, an account with zero orders. These cases break code that worked fine with your test data.' },
        { title: 'Add detailed logging to production', description: 'Use a logging service (Sentry, Datadog, CloudWatch, LogRocket). Log key events with context: user ID, request ID, critical variable values. Turn on verbose logging for suspected code paths using feature flags without redeploying.' },
        { title: 'Check for race conditions and timing', description: 'Under production load, timing-dependent bugs appear. Two requests modifying the same data simultaneously. A function called before an async initialization completes. These are invisible locally at low concurrency but appear under real load.' },
      ]} />

      <AlertBox type="tip" title="The rubber duck technique — science-backed">
        Explain your code line by line to an imaginary rubber duck, a colleague, or even yourself.
        The act of articulating what each line does forces your brain to notice where your mental
        model doesn't match the code. Studies and surveys of experienced developers show that
        60%+ of bugs are found during the explanation process, before even running any debugging tools.
        When stuck, stop and explain — don't just stare at the code.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the fastest way to find a bug in a large codebase?',
          answer: 'Binary search through the code (bisect debugging). Add a log at the midpoint of the code: if the bug manifests before the midpoint, focus on the first half; if after, focus on the second half. Repeat. This finds any bug in O(log n) steps regardless of file size — much faster than reading every line. For git-tracked code: git bisect automates this by binary searching through commits to find which commit introduced the bug.',
        },
        {
          question: 'How do I debug code that only fails in production?',
          answer: 'Add structured logging: log every significant operation with context (user ID, request ID, input values, output values). Use an error tracking service (Sentry is free tier) that captures stack traces from production. Compare environment variables between local and prod. Add a feature flag to enable verbose logging for specific users or requests without redeployment. Replicate the production environment locally using Docker Compose with production-equivalent configuration.',
        },
        {
          question: 'When should I use a debugger vs console.log?',
          answer: 'console.log is faster to add, works anywhere (including production), requires no setup, and leaves a record of what you checked. Use it first. Use the interactive debugger when: (1) the bug involves complex object state that would take dozens of logs to capture, (2) async timing is hard to capture with logs, (3) you need to step through complex logic to understand the execution flow, or (4) the issue only happens in certain loop iterations (use conditional breakpoints).',
        },
        {
          question: 'How do I debug an infinite loop?',
          answer: 'For synchronous infinite loops: the browser tab freezes. Open DevTools → Sources → click the pause button (⏸). This pauses JavaScript execution wherever it is. Inspect the call stack to see which loop is running and what values are causing it to never exit. For a while/for loop: add console.log(counter) inside to see if the counter is advancing. Check your loop condition — "while (i < arr.length)" can loop infinitely if you never increment i.',
        },
        {
          question: 'What is the "works on my machine" problem and how do I fix it?',
          answer: 'Root causes: different Node.js/Python/runtime versions between machines (fix with .nvmrc, pyenv), different OS (Mac vs Linux vs Windows path separators, case sensitivity), different environment variables (fix with .env.example files), different package versions (fix with package-lock.json/yarn.lock committed to git), missing system dependencies. Fix systematically with: Docker containers for identical environments, committed lock files for dependencies, explicit runtime version files, and documented setup procedures.',
        },
        {
          question: 'How do I debug memory leaks?',
          answer: 'In Node.js: use --inspect flag and Chrome DevTools Memory tab. Take heap snapshots before and after suspected leak, compare retained objects. In browsers: DevTools → Memory → Record allocation timeline, look for objects that accumulate without being freed. Common causes: event listeners added but never removed, global variable arrays that keep growing, caches without size limits or expiry, closures holding references to large objects. The pattern: memory usage increases consistently over time without dropping back down.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
