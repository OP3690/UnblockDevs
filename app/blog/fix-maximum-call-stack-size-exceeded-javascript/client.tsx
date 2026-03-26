'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function FixMaximumCallStackSizeExceededJavascriptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Maximum Call Stack Size Exceeded" in JavaScript</h1>
      <p className="lead">
        <code>RangeError: Maximum call stack size exceeded</code> means your code has infinite (or very deep)
        recursion. Every function call adds a frame to the call stack — when the stack fills up, JavaScript
        throws this error. This guide covers every cause with working fixes.
      </p>

      <StatGrid stats={[
        { value: '~10,000', label: 'max call stack depth in V8', color: 'amber' },
        { value: 'Recursion', label: 'primary cause — infinite or too deep', color: 'red' },
        { value: 'Iterative', label: 'fix: convert recursion to loop', color: 'green' },
        { value: 'TCO', label: 'tail call optimization (limited support)', color: 'blue' },
      ]} />

      <AlertBox type="error" title="The error">
        RangeError: Maximum call stack size exceeded
        — Chrome/Node.js —
        InternalError: too much recursion
        — Firefox —
      </AlertBox>

      <SectionHeader number={1} title="What Is the Call Stack?" />
      <QuickFact>
        Every function call pushes a "frame" onto the call stack containing local variables, parameters,
        and the return address. When the function returns, the frame is popped. The stack has a fixed size
        (~10,000-15,000 frames in V8). Overflow it → RangeError.
      </QuickFact>

      <SectionHeader number={2} title="Cause 1 — Infinite Recursion (Missing Base Case)" />
      <ErrorFix
        bad={`// No base case → infinite recursion → stack overflow
function countdown(n) {
  console.log(n);
  countdown(n - 1); // ❌ no stop condition
}`}
        good={`// Base case prevents infinite recursion
function countdown(n) {
  if (n <= 0) return;  // ✅ stop condition
  console.log(n);
  countdown(n - 1);
}`}
        badLabel="Missing base case"
        goodLabel="Base case added"
      />

      <SectionHeader number={3} title="Cause 2 — Circular Object Reference in JSON.stringify" />
      <ErrorFix
        bad={`const obj = { name: 'Alice' };
obj.self = obj;  // circular reference!
JSON.stringify(obj); // RangeError: Maximum call stack size exceeded`}
        good={`// Option A: Remove circular reference before stringifying
const obj = { name: 'Alice' };
// Don't add obj.self = obj

// Option B: Use replacer to handle circular refs
const seen = new WeakSet();
JSON.stringify(obj, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) return '[Circular]';
    seen.add(value);
  }
  return value;
});`}
        badLabel="Circular reference crashes JSON.stringify"
        goodLabel="Detect and skip circular refs"
      />

      <SectionHeader number={4} title="Cause 3 — Too-Deep Recursion on Large Data" />
      <p>
        Even with a base case, recursing on a list of 100,000 items will overflow the stack.
        The fix: convert recursion to an iterative loop.
      </p>

      <ErrorFix
        bad={`// Recursive sum — overflows on large arrays
function sum(arr, i = 0) {
  if (i >= arr.length) return 0;
  return arr[i] + sum(arr, i + 1); // ❌ 100k frames → overflow
}
sum(new Array(100000).fill(1));`}
        good={`// Iterative — O(1) stack space
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;  // ✅ no stack growth
  return total;
}
sum(new Array(100000).fill(1)); // works fine`}
        badLabel="Recursive — overflows at depth ~10k"
        goodLabel="Iterative — no stack limit"
      />

      <SectionHeader number={5} title="Cause 4 — Mutual Recursion / Circular Calls" />
      <ErrorFix
        bad={`// A calls B, B calls A — infinite loop
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);  // calls isOdd
}
function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1); // calls isEven back
}
isEven(100000); // stack overflow`}
        good={`// Simple iterative solution
function isEven(n) { return n % 2 === 0; }
function isOdd(n)  { return n % 2 !== 0; }`}
        badLabel="Mutual recursion overflows"
        goodLabel="Simple modulo — no recursion"
      />

      <SectionHeader number={6} title="Cause 5 — Infinite Event Loop / Circular Handlers" />
      <ErrorFix
        bad={`// Component re-renders trigger state change which re-renders...
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ❌ called during render → infinite re-renders
  return <div>{count}</div>;
}`}
        good={`function Counter() {
  const [count, setCount] = useState(0);
  // Only update on button click, not during render
  return (
    <div>
      {count}
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`}
        badLabel="setState during render → infinite loop"
        goodLabel="setState only in event handlers"
      />

      <SectionHeader number={7} title="Converting Recursion to Iteration with an Explicit Stack" />
      <p>
        For tree traversal or other naturally recursive algorithms, use an explicit stack array
        instead of the call stack:
      </p>

      <CodeBlock language="javascript" filename="Tree traversal — iterative with explicit stack">
{`// Recursive — overflows on deep trees
function sumTree(node) {
  if (!node) return 0;
  return node.value + sumTree(node.left) + sumTree(node.right);
}

// Iterative — no stack limit
function sumTreeIterative(root) {
  if (!root) return 0;
  let total = 0;
  const stack = [root]; // explicit stack

  while (stack.length > 0) {
    const node = stack.pop();
    total += node.value;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return total;
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'How do I find which function is recursing infinitely?',
          answer: 'Look at the stack trace in the error — it will show the same function name repeating dozens of times. That\'s your infinite recursion. In Chrome DevTools, the error stacktrace will show: "at functionName (file.js:10)" repeated many times.',
        },
        {
          question: 'Can I increase the call stack size in Node.js?',
          answer: 'Yes with --stack-size flag: node --stack-size=65536 app.js. But this is a bandage, not a fix. Increase it only temporarily to diagnose the real issue, then fix the recursion.',
        },
        {
          question: 'What is tail call optimization (TCO) and does JavaScript support it?',
          answer: 'TCO is a compiler optimization where a tail-recursive call (last operation in a function) reuses the current stack frame instead of creating a new one — enabling unlimited recursion depth. The ES6 spec mandates TCO, but only Safari implements it. V8 (Chrome/Node) does not implement TCO.',
        },
        {
          question: 'Does this error happen in production or only development?',
          answer: 'Both. The call stack limit is enforced in all JavaScript environments. If your production data is larger than your test data, infinite recursion bugs that were hidden locally will surface in production.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
