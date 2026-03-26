'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why async/await Is Not Working in JavaScript — Common Mistakes Fixed</h1>
      <p className="lead">
        async/await looks simple, but there are half a dozen ways it silently breaks. Promises that never
        resolve, missing awaits, swallowed errors, sequential when it should be parallel — this guide
        covers every common mistake with before/after fixes.
      </p>

      <StatGrid stats={[
        { value: '8+', label: 'common async/await bugs', color: 'red' },
        { value: 'await', label: 'missing keyword = silent undefined', color: 'amber' },
        { value: 'Promise.all', label: 'for parallel execution', color: 'green' },
        { value: 'try/catch', label: 'only way to catch async errors', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Mistake 1 — Missing await" />
      <p>The most common mistake. Without <code>await</code>, you get a Promise object, not the resolved value.</p>

      <ErrorFix
        bad={`async function getUser(id) {
  const user = fetch(\`/api/users/\${id}\`); // ❌ missing await
  console.log(user); // Promise { <pending> } — not the user data
  return user.name;  // undefined
}`}
        good={`async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`); // ✅ await the fetch
  const user = await res.json();                  // ✅ await the json parsing
  console.log(user); // { id: 1, name: 'Alice' }
  return user.name;  // 'Alice'
}`}
        badLabel="Missing await"
        goodLabel="Await both fetch and .json()"
      />

      <SectionHeader number={2} title="Mistake 2 — await in forEach (Doesn't Work)" />
      <p>
        <code>Array.forEach</code> is not async-aware. It fires all callbacks and moves on without waiting.
        Use <code>for...of</code> or <code>Promise.all</code> instead.
      </p>

      <ErrorFix
        bad={`// forEach doesn't wait for async callbacks
async function processUsers(users) {
  users.forEach(async (user) => {  // ❌ awaits inside forEach are ignored
    await sendEmail(user.email);
  });
  console.log('Done'); // prints BEFORE emails are sent
}`}
        good={`// Option A: for...of (sequential)
async function processUsers(users) {
  for (const user of users) {
    await sendEmail(user.email);  // ✅ truly sequential
  }
  console.log('Done'); // prints after all emails sent
}

// Option B: Promise.all (parallel — faster)
async function processUsers(users) {
  await Promise.all(users.map(user => sendEmail(user.email)));
  console.log('Done'); // prints after all done
}`}
        badLabel="await inside forEach"
        goodLabel="for...of or Promise.all"
      />

      <SectionHeader number={3} title="Mistake 3 — Sequential Instead of Parallel" />
      <ErrorFix
        bad={`// Sequential: waits for each before starting next
async function loadDashboard() {
  const user    = await getUser();     // 300ms
  const orders  = await getOrders();   // 400ms
  const stats   = await getStats();    // 200ms
  // Total: 900ms 🐢
}`}
        good={`// Parallel with Promise.all: all start at once
async function loadDashboard() {
  const [user, orders, stats] = await Promise.all([
    getUser(),    // starts immediately
    getOrders(),  // starts immediately
    getStats(),   // starts immediately
  ]);
  // Total: ~400ms (longest single request) 🚀
}`}
        badLabel="Sequential: 900ms"
        goodLabel="Parallel: 400ms"
      />

      <SectionHeader number={4} title="Mistake 4 — Unhandled Promise Rejection" />
      <ErrorFix
        bad={`// No try/catch — errors are swallowed silently (or cause UnhandledPromiseRejection)
async function fetchData() {
  const data = await fetch('/api/might-fail').then(r => r.json());
  return data;
}

fetchData(); // if this throws, nothing catches it — app may crash`}
        good={`// Always wrap async code in try/catch
async function fetchData() {
  try {
    const res = await fetch('/api/might-fail');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('fetchData failed:', err);
    return null; // or re-throw, or return a default
  }
}

// Or handle at call site:
const data = await fetchData().catch(err => {
  console.error(err);
  return null;
});`}
        badLabel="No error handling"
        goodLabel="try/catch around async operations"
      />

      <SectionHeader number={5} title="Mistake 5 — Top-Level await Without async" />
      <ErrorFix
        bad={`// SyntaxError: await is only valid in async functions
function getConfig() {
  const config = await fetch('/config.json').then(r => r.json()); // ❌
  return config;
}`}
        good={`// Option A: Make the function async
async function getConfig() {
  const res = await fetch('/config.json');
  return res.json();
}

// Option B: Top-level await (ES2022, only in modules)
// In a .mjs file or with "type": "module" in package.json:
const config = await fetch('/config.json').then(r => r.json());`}
        badLabel="await without async"
        goodLabel="async function or module top-level await"
      />

      <SectionHeader number={6} title="Mistake 6 — async Event Listeners" />
      <AlertBox type="warning" title="async event listeners swallow errors">
        Adding an async function as an event listener means any error inside it becomes an unhandled
        promise rejection — it won't bubble up to the surrounding code.
      </AlertBox>

      <ErrorFix
        bad={`// Error inside async listener is silently lost
button.addEventListener('click', async () => {
  const data = await riskyOperation(); // if this throws, nobody knows
});`}
        good={`// Wrap the async logic with error handling
button.addEventListener('click', async () => {
  try {
    const data = await riskyOperation();
    displayData(data);
  } catch (err) {
    showErrorMessage(err.message);
  }
});`}
        badLabel="Unhandled error in async listener"
        goodLabel="try/catch inside async listener"
      />

      <SectionHeader number={7} title="Mistake 7 — Promise.all Fails Fast" />
      <AlertBox type="info" title="Promise.all rejects if ANY promise rejects">
        If one request fails, <code>Promise.all</code> rejects immediately and you lose all results.
        Use <code>Promise.allSettled</code> if you want all results regardless of failures.
      </AlertBox>

      <ErrorFix
        bad={`// If ANY request fails, everything fails
const [a, b, c] = await Promise.all([
  fetchA(), // if this rejects, b and c results are lost
  fetchB(),
  fetchC(),
]);`}
        good={`// Promise.allSettled: get all results, even if some fail
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);

results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(\`Request \${i} succeeded:\`, result.value);
  } else {
    console.error(\`Request \${i} failed:\`, result.reason);
  }
});`}
        badLabel="Promise.all — one failure = all fail"
        goodLabel="Promise.allSettled — handle each result"
      />

      <SectionHeader number={8} title="Quick Reference" />
      <CompareTable
        leftLabel="Situation"
        rightLabel="Correct Pattern"
        rows={[
          { label: 'Multiple async, sequential', left: 'for...of loop with await', right: 'Each waits for previous to finish' },
          { label: 'Multiple async, parallel', left: 'Promise.all([...])', right: 'All start at once, wait for all' },
          { label: 'Parallel, ignore failures', left: 'Promise.allSettled([...])', right: 'All complete, check each status' },
          { label: 'First result wins', left: 'Promise.race([...])', right: 'Resolves/rejects with first settled' },
          { label: 'Loop with await inside', left: 'for...of (not forEach)', right: 'forEach ignores async callbacks' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Why does my async function return a Promise instead of the value?',
          answer: 'All async functions always return a Promise. When you call an async function, you must await it (inside another async function) or use .then() to get the value. You cannot "unwrap" a Promise synchronously.',
        },
        {
          question: 'Can I use await outside of an async function?',
          answer: 'In modern JavaScript (ES2022+) with ES modules ("type": "module" in package.json), you can use top-level await directly in module files. In CommonJS (require), you must wrap in an async function or use an IIFE: (async () => { await ... })();',
        },
        {
          question: 'Why does try/catch not catch errors in async callbacks?',
          answer: 'A try/catch around an async function call only catches the synchronous part. If the function is passed as a callback (setTimeout, event listener, Promise.then), you need try/catch INSIDE the callback itself, since the outer code has already moved on.',
        },
        {
          question: 'What is the difference between Promise.all and Promise.allSettled?',
          answer: 'Promise.all rejects immediately if any promise rejects (fail-fast). Promise.allSettled always waits for all promises to complete and returns an array of {status: "fulfilled"|"rejected", value|reason} objects. Use allSettled when partial results are acceptable.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
