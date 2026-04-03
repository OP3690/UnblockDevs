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
        { value: '8+', label: 'common async/await bugs covered with fixes', color: 'red' },
        { value: 'await', label: 'missing keyword = silent undefined, not an error', color: 'amber' },
        { value: 'Promise.all', label: 'correct pattern for parallel async operations', color: 'green' },
        { value: 'try/catch', label: 'only way to catch errors from async functions', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Mistake 1 — Missing await" />
      <QuickFact color="red" label="Most common silent bug">
        Without await, you get back a Promise object, not the resolved value. The function doesn't
        throw — it silently returns undefined when you access properties on the Promise. This is the
        most common async/await bug because it fails quietly rather than crashing loudly.
      </QuickFact>

      <ErrorFix
        bad={`async function getUser(id) {
  const user = fetch(\`/api/users/\${id}\`); // ❌ missing await — user is a Promise
  console.log(user); // Promise { <pending> } — NOT the user data
  return user.name;  // undefined — accessing .name on a Promise object
}`}
        good={`async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`); // ✅ await the fetch
  const user = await res.json();                  // ✅ await the json parsing too
  console.log(user); // { id: 1, name: 'Alice' }
  return user.name;  // 'Alice'
}`}
        badLabel="Missing await — returns Promise instead of value"
        goodLabel="Await both fetch and .json()"
      />

      <SectionHeader number={2} title="Mistake 2 — await in forEach (Doesn't Work)" />
      <AlertBox type="warning" title="forEach is not async-aware">
        Array.forEach fires all callbacks and returns immediately — it does not wait for async callbacks
        to complete. The awaits inside forEach are real but they only pause the callback, not the outer
        function. The "Done" log prints before any emails are sent.
      </AlertBox>

      <ErrorFix
        bad={`// forEach doesn't wait for async callbacks
async function processUsers(users) {
  users.forEach(async (user) => {  // ❌ awaits inside forEach are ignored
    await sendEmail(user.email);
  });
  console.log('Done'); // prints BEFORE emails are sent — wrong!
}`}
        good={`// Option A: for...of (sequential — each waits for previous)
async function processUsers(users) {
  for (const user of users) {
    await sendEmail(user.email);  // ✅ truly sequential, one at a time
  }
  console.log('Done'); // prints after all emails sent

}

// Option B: Promise.all (parallel — all start at once, faster)
async function processUsersFast(users) {
  await Promise.all(users.map(user => sendEmail(user.email)));
  console.log('Done'); // prints after all done in parallel
}`}
        badLabel="await inside forEach — callbacks not awaited"
        goodLabel="for...of for sequential, Promise.all for parallel"
      />

      <SectionHeader number={3} title="Mistake 3 — Sequential Instead of Parallel" />
      <ErrorFix
        bad={`// Sequential: each await blocks until the previous finishes
async function loadDashboard() {
  const user    = await getUser();     // 300ms — then waits
  const orders  = await getOrders();   // 400ms — then waits
  const stats   = await getStats();    // 200ms — then waits
  // Total: 900ms 🐢 — even though these are independent requests!
}`}
        good={`// Parallel with Promise.all: all start at once
async function loadDashboard() {
  const [user, orders, stats] = await Promise.all([
    getUser(),    // starts immediately
    getOrders(),  // starts immediately, doesn't wait for getUser
    getStats(),   // starts immediately
  ]);
  // Total: ~400ms (bounded by the slowest request) 🚀
  // 900ms → 400ms just by switching to parallel execution
}`}
        badLabel="Sequential: 900ms total"
        goodLabel="Parallel: 400ms — 2.25× faster"
      />

      <SectionHeader number={4} title="Mistake 4 — Unhandled Promise Rejection" />
      <ErrorFix
        bad={`// No try/catch — errors are swallowed silently
async function fetchData() {
  const data = await fetch('/api/might-fail').then(r => r.json());
  return data;
}

fetchData(); // if this throws, nobody catches it
// Node.js: UnhandledPromiseRejection warning, may crash
// Browser: console error, but execution continues with broken state`}
        good={`// Always wrap async code in try/catch
async function fetchData() {
  try {
    const res = await fetch('/api/might-fail');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('fetchData failed:', err);
    return null; // return a default, or re-throw to let caller handle it
  }
}

// Or handle at the call site with .catch():
const data = await fetchData().catch(err => {
  console.error('Dashboard load failed:', err);
  return { defaultState: true };
});`}
        badLabel="No error handling — UnhandledPromiseRejection"
        goodLabel="try/catch inside or .catch() at call site"
      />

      <SectionHeader number={5} title="Mistake 5 — Top-Level await Without async" />
      <ErrorFix
        bad={`// SyntaxError: await is only valid in async functions and modules
function getConfig() {
  const config = await fetch('/config.json').then(r => r.json()); // ❌
  return config;
}
// Error: "await is only valid in async functions, async generators
// and modules"`}
        good={`// Option A: Make the function async
async function getConfig() {
  const res = await fetch('/config.json');
  return res.json();
}

// Option B: Top-level await (ES2022 — only in ES modules)
// Requires "type": "module" in package.json or .mjs file extension:
const config = await fetch('/config.json').then(r => r.json());

// Option C: IIFE for CommonJS files
(async () => {
  const config = await fetch('/config.json').then(r => r.json());
  startApp(config);
})();`}
        badLabel="await without async — SyntaxError"
        goodLabel="async function, top-level await (modules), or IIFE"
      />

      <SectionHeader number={6} title="Mistake 6 — async Event Listeners" />
      <AlertBox type="warning" title="async event listeners swallow errors">
        Adding an async function as an event listener means any unhandled error inside it becomes an
        unhandled promise rejection — it will NOT bubble up to the surrounding try/catch or window.onerror
        in the way you might expect. Always add try/catch inside the async listener.
      </AlertBox>

      <ErrorFix
        bad={`// Error inside async listener is silently lost — nobody catches it
button.addEventListener('click', async () => {
  const data = await riskyOperation(); // if this throws, nobody knows
  displayData(data); // never runs if riskyOperation throws
});

// The click handler returns a Promise, but event listeners ignore return values`}
        good={`// Wrap the async logic with explicit error handling
button.addEventListener('click', async () => {
  try {
    const data = await riskyOperation();
    displayData(data);
  } catch (err) {
    showErrorMessage(err.message);  // user sees a helpful error
    console.error('Click handler failed:', err);
  }
});`}
        badLabel="Unhandled error in async listener — silently lost"
        goodLabel="try/catch inside every async event listener"
      />

      <SectionHeader number={7} title="Mistake 7 — Promise.all Fails Fast" />
      <ErrorFix
        bad={`// If ANY promise rejects, Promise.all rejects immediately
const [a, b, c] = await Promise.all([
  fetchA(), // if this rejects, b and c results are lost forever
  fetchB(),
  fetchC(),
]);
// One failure = lose all results, even the successful ones`}
        good={`// Promise.allSettled: get ALL results, even if some fail
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);

results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(\`Request \${i} succeeded:\`, result.value);
  } else {
    console.error(\`Request \${i} failed:\`, result.reason);
    // Show partial data — render what worked, show error for what didn't
  }
});`}
        badLabel="Promise.all — one failure = all fail"
        goodLabel="Promise.allSettled — handle each result independently"
      />

      <SectionHeader number={8} title="Mistake 8 — Async Constructor or Return" />
      <CodeBlock language="javascript" filename="Async constructor anti-pattern and fix">
{`// ❌ Constructors cannot be async — 'new' always returns the instance synchronously
class UserService {
  constructor() {
    this.user = await fetchUser(); // SyntaxError: await in non-async context
  }
}

// ❌ Also broken: returning a value from an async function doesn't work as expected
async function getCount() {
  return 42;  // this works, but...
}
const count = getCount(); // count is a Promise { 42 }, not 42!

// ✅ Fix for constructor: use a static async factory method
class UserService {
  constructor(user) {
    this.user = user; // set synchronously from factory
  }

  static async create() {
    const user = await fetchUser();
    return new UserService(user); // create instance after async work
  }
}

const service = await UserService.create(); // ✅ correct
console.log(service.user); // the fetched user

// ✅ Fix for async return value: always await the call
async function getCount() {
  return 42;
}
const count = await getCount(); // count = 42 ✅
console.log(count); // 42`}
      </CodeBlock>

      <SectionHeader number={9} title="Quick Reference" />
      <CompareTable
        leftLabel="Situation"
        rightLabel="Correct Pattern"
        rows={[
          { label: 'Multiple async, sequential', left: 'for...of loop with await', right: 'Each waits for previous — use when order matters' },
          { label: 'Multiple async, parallel', left: 'Promise.all([...])', right: 'All start at once — fastest when independent' },
          { label: 'Parallel, partial failure OK', left: 'Promise.allSettled([...])', right: 'All complete, check each result status' },
          { label: 'First result wins', left: 'Promise.race([...])', right: 'Resolves with first settled promise (success or error)' },
          { label: 'Loop with await inside', left: 'for...of (not forEach)', right: 'forEach ignores async callbacks — use for...of' },
          { label: 'Error handling', left: 'try/catch inside async function', right: '.catch() at call site also works' },
          { label: 'Async constructor', left: 'Static async factory method', right: 'constructor() cannot be async' },
          { label: 'Top-level await (Node)', left: '"type": "module" in package.json', right: 'CommonJS: wrap in (async () => {})()' },
        ]}
      />

      <VerticalSteps steps={[
        { title: 'Add console.log before and after each await', desc: 'If the log before the await prints but not after, the Promise never resolved — you have an infinite pending Promise. Check that the function you\'re awaiting actually resolves: does it have a return statement? Does it call resolve() if it wraps a callback?' },
        { title: 'Check for missing await with strict TypeScript', desc: 'Enable TypeScript\'s @typescript-eslint/no-floating-promises rule. It catches every place you call an async function without awaiting it. This catches the #1 async/await bug (missing await) at compile time instead of at runtime.' },
        { title: 'Verify try/catch scope covers the await', desc: 'The try/catch must wrap the await statement itself, not just the function call. A try/catch outside a setTimeout or Promise.then chain won\'t catch errors from inside those callbacks.' },
        { title: 'Check if the function is actually async', desc: 'If you\'re awaiting a function that doesn\'t return a Promise, it still works (await on a non-Promise returns the value immediately) — but if the function throws synchronously, the throw propagates immediately, not as a rejected Promise.' },
        { title: 'Use Promise.race with a timeout to detect hung Promises', desc: 'If a Promise seems to hang forever, race it against a timeout: await Promise.race([yourPromise, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000))]). This turns an infinite hang into a diagnosable error.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does my async function return a Promise instead of the value?',
          answer: 'All async functions always return a Promise — this is by design and cannot be changed. When you call an async function, you must await it (inside another async function) or use .then() to get the resolved value. You cannot synchronously unwrap a Promise. If you see "Promise { <pending> }" in your logs, you forgot to await the call.',
        },
        {
          question: 'Can I use await outside of an async function?',
          answer: 'In modern JavaScript (ES2022+) with ES modules (set "type": "module" in package.json or use .mjs extension), you can use top-level await directly in module files. In CommonJS (require()), you must wrap in an async IIFE: (async () => { const data = await fetch(url); })(); or refactor into an async function.',
        },
        {
          question: 'Why does try/catch not catch errors in async callbacks?',
          answer: 'A try/catch around an async function call only catches the synchronous part. If the async function is passed as a callback (setTimeout, addEventListener, Promise.then), you need try/catch INSIDE the callback itself. By the time the callback runs, the outer try/catch has already completed and its stack frame is gone. This is why async event listeners need their own internal error handling.',
        },
        {
          question: 'What is the difference between Promise.all and Promise.allSettled?',
          answer: 'Promise.all rejects immediately if any promise rejects (fail-fast behavior — you lose all results). Promise.allSettled always waits for all promises to complete and returns an array of {status: "fulfilled"|"rejected", value|reason} objects — you get all results regardless of individual failures. Use allSettled when partial results are acceptable or when you want to show partial UI.',
        },
        {
          question: 'How do I add a timeout to an async operation?',
          answer: 'Use Promise.race() with a timeout Promise: const withTimeout = (promise, ms) => Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms))]); Then: const data = await withTimeout(fetch(url), 5000); This throws if the fetch takes more than 5 seconds. In Node.js 18+, AbortController with AbortSignal.timeout(ms) provides cleaner native timeout support.',
        },
        {
          question: 'Why is my async code running in the wrong order?',
          answer: 'The most common cause: accidentally running operations sequentially when you wanted parallel (or parallel when you needed sequential). Check: are you using await inside a loop? That\'s sequential. Do you need strict ordering? Use for...of with await. Do operations need to complete before the next starts? Sequential await. Are operations independent? Use Promise.all for parallel execution. Also check: are you missing an await somewhere, causing the next line to run before the Promise settles?',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
