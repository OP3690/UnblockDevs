'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FixMaximumCallStackSizeExceededJavascriptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Maximum Call Stack Size Exceeded" in JavaScript</h1>
      <p className="lead">
        <code>RangeError: Maximum call stack size exceeded</code> means your code has infinite or
        excessively deep recursion. Every function call adds a frame to the call stack — when the
        stack fills up (around 10,000–15,000 frames in V8), JavaScript throws this error. This guide
        covers every cause with working fixes: infinite recursion, circular object references,
        deep recursion on large data, mutual recursion, React infinite render loops, and how to
        convert recursion to iteration for any algorithm.
      </p>

      <StatGrid stats={[
        { value: '~10,000', label: 'max call stack depth in V8 (Chrome/Node.js)', color: 'amber' },
        { value: 'Recursion', label: 'primary cause — missing base case or infinite loop', color: 'red' },
        { value: 'Iterative', label: 'the fix — convert recursion to a loop with explicit stack', color: 'green' },
        { value: 'Circular ref', label: 'JSON.stringify on circular objects also triggers this', color: 'blue' },
      ]} />

      <AlertBox type="warning" title="The exact error in each browser/runtime">
        RangeError: Maximum call stack size exceeded — Chrome, Node.js, Edge
        InternalError: too much recursion — Firefox
        RangeError: Maximum call stack size exceeded — Safari
        The error fires when the JavaScript engine runs out of stack space for new function call frames.
      </AlertBox>

      <SectionHeader number={1} title="What Is the Call Stack?" />
      <p>
        Every function call in JavaScript creates a new "stack frame" containing the function's
        local variables, parameters, and the return address. These frames are pushed onto the
        call stack. When the function returns, its frame is popped. The stack has a fixed size
        determined by the JavaScript engine — V8 allows around 10,000–15,000 frames.
      </p>
      <QuickFact color="blue" label="The stack frame model">
        Every function call pushes a "frame" onto the call stack containing local variables,
        parameters, and the return address. When the function returns, the frame is popped.
        The stack has a fixed size (~10,000–15,000 frames in V8). Filling it → RangeError.
        Recursive functions that don't eventually hit a base case never pop their frames.
      </QuickFact>

      <SectionHeader number={2} title="Cause 1 — Infinite Recursion (Missing Base Case)" />
      <p>
        The most common cause. A recursive function must always have a base case — a condition
        that stops the recursion. Without it, the function calls itself indefinitely until the
        stack overflows.
      </p>
      <ErrorFix
        title="Always include a base case in recursive functions"
        bad={`// ❌ No base case → infinite recursion → stack overflow
function countdown(n) {
  console.log(n);
  countdown(n - 1); // calls itself with no stop condition
  // Stack grows: countdown(10) → countdown(9) → ... → RangeError
}`}
        good={`// ✅ Base case prevents infinite recursion
function countdown(n) {
  if (n <= 0) return;  // base case: stop when n reaches 0
  console.log(n);
  countdown(n - 1);    // recursive case: guaranteed to reach n=0
}

// Check your base case logic:
// 1. Does the base case condition ever become true?
// 2. Does each recursive call move CLOSER to the base case?
// 3. What happens if the initial value is already at the base case?
countdown(5);  // logs: 5, 4, 3, 2, 1
countdown(0);  // returns immediately — base case on first call`}
        badLabel="No base case — infinite recursion"
        goodLabel="Base case added — stops at n=0"
      />

      <SectionHeader number={3} title="Cause 2 — Circular Object References in JSON.stringify" />
      <p>
        <code>JSON.stringify</code> internally uses recursion to walk the object tree.
        If an object references itself (directly or indirectly), JSON.stringify recurses infinitely
        and crashes the stack.
      </p>
      <ErrorFix
        title="Handle circular references before stringifying"
        bad={`const obj = { name: 'Alice', items: [] };
obj.parent = obj;  // circular: obj references itself
JSON.stringify(obj); // ❌ RangeError: Maximum call stack size exceeded`}
        good={`// Option A: Remove the circular reference (cleanest)
const obj = { name: 'Alice', items: [] };
// Don't add: obj.parent = obj

// Option B: Use a WeakSet replacer to detect and skip circular refs
function stringifyCircularSafe(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular Reference]';
      seen.add(value);
    }
    return value;
  });
}

// Option C: Use the 'flatted' or 'circular-json' npm package for full round-trip support
import { stringify, parse } from 'flatted';
const json = stringify(circularObj);  // handles circular refs with special encoding
const restored = parse(json);         // restores original structure`}
        badLabel="Circular reference crashes JSON.stringify"
        goodLabel="Detect and skip circular refs before stringifying"
      />

      <SectionHeader number={4} title="Cause 3 — Deep Recursion on Large Data" />
      <p>
        Even with a correct base case, recursing over 100,000 elements will overflow the stack.
        The ~10,000 frame limit means any recursion depth beyond that will crash.
        The fix: convert recursion to an iterative loop.
      </p>
      <ErrorFix
        title="Convert deep recursion to iteration"
        bad={`// ❌ Recursive sum — overflows on large arrays
function sum(arr, i = 0) {
  if (i >= arr.length) return 0;
  return arr[i] + sum(arr, i + 1); // 100k frames → RangeError
}
sum(new Array(100000).fill(1)); // crashes`}
        good={`// ✅ Iterative — O(1) stack space, no limit
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;  // no stack frames allocated
  return total;
}
sum(new Array(100000).fill(1)); // works fine → 100000

// ✅ Also works: Array methods (reduce, forEach) — internally iterative
const total = new Array(100000).fill(1).reduce((acc, n) => acc + n, 0);`}
        badLabel="Recursive — overflows at depth ~10k"
        goodLabel="Iterative — no stack limit, works on any size array"
      />

      <SectionHeader number={5} title="Cause 4 — Mutual Recursion (Two Functions Calling Each Other)" />
      <ErrorFix
        title="Replace mutual recursion with simple computation"
        bad={`// ❌ A calls B, B calls A — infinite mutual recursion
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);   // calls isOdd
}
function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);  // calls isEven back
}
isEven(100000); // 100k frames → RangeError`}
        good={`// ✅ Simple modulo — O(1), no recursion at all
function isEven(n) { return Math.abs(n) % 2 === 0; }
function isOdd(n)  { return Math.abs(n) % 2 !== 0; }

isEven(100000); // → true, instant`}
        badLabel="Mutual recursion — 100k frames for n=100000"
        goodLabel="Modulo operation — O(1), no recursion"
      />

      <SectionHeader number={6} title="Cause 5 — React Infinite Re-render Loop" />
      <ErrorFix
        title="Never call setState during render"
        bad={`// ❌ setState called during render → triggers re-render → setState again...
function Counter() {
  const [count, setCount] = useState(0);

  setCount(count + 1); // ❌ called directly in render body — not in event/effect

  return <div>{count}</div>;
}`}
        good={`// ✅ setState only in event handlers or useEffect
function Counter() {
  const [count, setCount] = useState(0);

  // ✅ Only update on explicit user interaction
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// ✅ useEffect with correct dependencies to avoid infinite loop
function DataLoader({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setData);
  }, [userId]);  // ✅ only re-run when userId changes, not on every render

  return <div>{data?.name}</div>;
}`}
        badLabel="setState in render body → infinite loop"
        goodLabel="setState only in event handlers or useEffect"
      />

      <SectionHeader number={7} title="Converting Tree Recursion to Iteration" />
      <p>
        Tree traversal is the most common algorithm that needs to be made iterative.
        Replace the call stack with an explicit array (stack) that you manage yourself.
      </p>
      <CodeBlock lang="javascript" title="Tree traversal — recursive vs iterative">
{`// ❌ Recursive tree traversal — overflows on deep trees
function sumRecursive(node) {
  if (!node) return 0;
  return node.value + sumRecursive(node.left) + sumRecursive(node.right);
  // A tree with 10k nodes can cause overflow if tree is unbalanced (linear chain)
}

// ✅ Iterative tree traversal — uses explicit stack array, no call stack limit
function sumIterative(root) {
  if (!root) return 0;
  let total = 0;
  const stack = [root];  // explicit stack — manages traversal ourselves

  while (stack.length > 0) {
    const node = stack.pop();    // process current node
    total += node.value;
    if (node.right) stack.push(node.right);  // push children for later
    if (node.left) stack.push(node.left);
  }
  return total;
}

// ✅ Iterative DFS for graph traversal
function dfs(graph, startNode) {
  const visited = new Set();
  const stack = [startNode];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return result;
}

// ✅ General recursion → iteration using explicit call stack
// When you have: function f(state) { ... f(newState) ... }
// Convert to:
function fIterative(initialState) {
  const stack = [initialState];
  const results = [];
  while (stack.length > 0) {
    const state = stack.pop();
    // ... process state ...
    // Instead of calling f(newState), push to stack:
    stack.push(newState);
  }
  return results;
}`}
      </CodeBlock>

      <SectionHeader number={8} title="Diagnosing Which Function Is Looping" />
      <VerticalSteps steps={[
        { title: 'Read the stack trace', desc: 'The error message includes a stack trace. Look for a function name that repeats dozens or hundreds of times: "at functionName (file.js:42)" repeated many times. That\'s your infinite recursion.' },
        { title: 'Use Chrome DevTools', desc: 'Open DevTools → Sources → enable "Pause on exceptions" → trigger the error. DevTools pauses at the exact crash point. The Call Stack panel shows the full stack — you\'ll see the repeating function frames.' },
        { title: 'Add a recursion depth counter', desc: 'Temporarily add a depth parameter: function f(n, depth = 0) { if (depth > 100) { console.trace("deep recursion at depth", depth); throw new Error("too deep"); } ... f(n-1, depth+1); }. This gives you the depth and a trace when it gets unexpectedly deep.' },
        { title: 'Check for circular dependencies in React components', desc: 'If the error is in a React app, look for: setState called during render, useEffect with missing or incorrect dependencies causing infinite re-fetching, or two components that each trigger the other\'s re-render.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I find which function is recursing infinitely?',
          answer: 'Look at the stack trace in the error — it will show the same function name repeating dozens of times. For example: "at processNode (tree.js:15)" repeated 100 times means processNode is your infinite recursion. In Chrome DevTools, enable "Pause on exceptions" and reproduce the error — DevTools pauses at the crash point and shows the full repeating call stack in the right panel.',
        },
        {
          question: 'Can I increase the call stack size in Node.js?',
          answer: 'Yes with the --stack-size flag: node --stack-size=65536 app.js (size in KB). Default is ~984KB. This is a diagnostic tool, not a fix — increasing the stack means more frames before the crash, but you\'ll still crash on true infinite recursion. Use it temporarily to capture a better stack trace or to confirm "needs larger stack" vs "truly infinite". Then fix the underlying recursion.',
        },
        {
          question: 'What is tail call optimization (TCO) and does JavaScript support it?',
          answer: 'TCO is a compiler optimization where a tail-recursive call (the last operation in a function) reuses the current stack frame instead of creating a new one, enabling unlimited recursion depth. The ES6 spec mandates TCO, but as of 2026 only Safari implements it. V8 (Chrome/Node.js) deliberately chose not to implement TCO. Don\'t rely on TCO in production JavaScript — write iterative solutions for large inputs.',
        },
        {
          question: 'Does this error happen in production or only in development?',
          answer: 'Both — the call stack limit is enforced in all JavaScript environments regardless of mode. If your production data is larger than your test data (e.g., you test with 10 items but production has 50,000), infinite recursion bugs hidden by small test data will surface in production. Always test recursive functions with realistic large inputs.',
        },
        {
          question: 'What is the trampoline pattern for handling deep recursion?',
          answer: 'A trampoline converts deep recursion into a loop by returning a function instead of calling it directly. function trampoline(fn) { let result = fn(); while (typeof result === "function") { result = result(); } return result; }. Then write: function factorial(n, acc = 1) { if (n <= 1) return acc; return () => factorial(n - 1, n * acc); }. Call as: trampoline(() => factorial(10000)). This keeps the recursive code structure while avoiding stack overflow. More elegant than full iterative conversion for complex algorithms.',
        },
        {
          question: 'Why does my recursive function work in development but overflow in production?',
          answer: 'Development environments typically use smaller test datasets. Production data is larger, deeper, or more complex. A recursive function on a tree with 100 nodes works fine (100 frames); the same function on a production tree with 50,000 nodes overflows. Fix: always test with production-scale data in staging. For any recursive function over user-supplied or database data, assume the input can be arbitrarily large and prefer iterative solutions.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
