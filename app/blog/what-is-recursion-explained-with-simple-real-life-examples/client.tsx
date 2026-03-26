'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>What Is Recursion? Explained With Simple Real-Life Examples + Code</h1>
      <p className="lead">
        Recursion is a function that calls itself. That sounds circular — because it is. The key is knowing
        when to stop. This guide explains recursion through analogies, walks through the call stack visually,
        and shows you when to use it (and when not to).
      </p>

      <StatGrid
        stats={[
          { value: '2', label: 'components: base case + recursive case', color: 'blue' },
          { value: 'O(n)', label: 'stack frames for depth-n recursion', color: 'amber' },
          { value: '∞', label: 'stack overflow if base case missing', color: 'red' },
          { value: '3', label: 'classic examples: factorial, Fibonacci, trees', color: 'green' },
        ]}
      />

      <SectionHeader number={1} title="The Real-Life Analogy" />
      <p>
        Imagine you're standing in a line and ask the person in front of you: "What position am I?"
        They don't know, so they ask the person in front of them. That person asks the next, and so on —
        until someone at the front says "I'm position 1." That answer ripples back: "I'm 2",
        "I'm 3"... until it reaches you. <strong>That's recursion.</strong>
      </p>

      <QuickFact>
        Every recursive solution has two parts: a <strong>base case</strong> (the stop condition — "I'm position 1")
        and a <strong>recursive case</strong> (the self-referential step — "I'm 1 + the person in front of me").
      </QuickFact>

      <SectionHeader number={2} title="The Simplest Possible Example: Countdown" />

      <CodeBlock language="javascript" filename="Countdown — Recursion vs Loop">
{`// ITERATIVE version (loop)
function countdownLoop(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

// RECURSIVE version
function countdownRecursive(n) {
  if (n < 0) return;  // BASE CASE: stop here

  console.log(n);
  countdownRecursive(n - 1);  // RECURSIVE CASE: call self with smaller n
}

// Both print: 5, 4, 3, 2, 1, 0
countdownRecursive(5);`}
      </CodeBlock>

      <VerticalSteps
        steps={[
          { title: 'countdownRecursive(5)', description: 'Prints 5, then calls countdownRecursive(4)' },
          { title: 'countdownRecursive(4)', description: 'Prints 4, then calls countdownRecursive(3)' },
          { title: 'countdownRecursive(3)', description: 'Prints 3, then calls countdownRecursive(2)' },
          { title: 'countdownRecursive(2)', description: 'Prints 2, then calls countdownRecursive(1)' },
          { title: 'countdownRecursive(1)', description: 'Prints 1, then calls countdownRecursive(0)' },
          { title: 'countdownRecursive(0)', description: 'Prints 0, then calls countdownRecursive(-1)' },
          { title: 'countdownRecursive(-1)', description: 'n < 0 → BASE CASE → return. Unwinding begins.' },
        ]}
      />

      <SectionHeader number={3} title="Classic Example: Factorial" />
      <p>
        5! (factorial) = 5 × 4 × 3 × 2 × 1 = 120. This is naturally recursive: 5! = 5 × 4!
      </p>

      <CodeBlock language="javascript" filename="Factorial — Recursive">
{`function factorial(n) {
  if (n <= 1) return 1;       // BASE CASE: 0! = 1! = 1
  return n * factorial(n - 1); // RECURSIVE CASE: n! = n × (n-1)!
}

// How factorial(4) unfolds:
// factorial(4)
//   = 4 * factorial(3)
//   = 4 * (3 * factorial(2))
//   = 4 * (3 * (2 * factorial(1)))
//   = 4 * (3 * (2 * 1))    ← base case reached
//   = 4 * (3 * 2)
//   = 4 * 6
//   = 24

console.log(factorial(5)); // → 120`}
      </CodeBlock>

      <SectionHeader number={4} title="Where Recursion Really Shines: Tree Traversal" />
      <p>
        Loops are great for flat lists. Recursion is <strong>natural for tree-shaped data</strong>:
        file systems, DOM trees, JSON with nested objects, org charts, comment threads.
      </p>

      <CodeBlock language="javascript" filename="File System — Recursive Traversal">
{`// File system tree (simplified)
const fileSystem = {
  name: 'root',
  children: [
    { name: 'src', children: [
      { name: 'index.js', children: [] },
      { name: 'utils', children: [
        { name: 'helper.js', children: [] }
      ]}
    ]},
    { name: 'package.json', children: [] },
  ]
};

// Recursive: naturally mirrors the tree structure
function printTree(node, depth = 0) {
  console.log(' '.repeat(depth * 2) + node.name);

  for (const child of node.children) {
    printTree(child, depth + 1);  // recurse into each child
  }
}

// Output:
// root
//   src
//     index.js
//     utils
//       helper.js
//   package.json`}
      </CodeBlock>

      <AlertBox type="info" title="Iterative tree traversal requires a stack">
        You CAN traverse a tree iteratively — but you'd have to manually manage a stack (array).
        Recursion uses the call stack automatically. For deeply nested structures, recursion is cleaner.
      </AlertBox>

      <SectionHeader number={5} title="The Stack Overflow Problem" />
      <p>
        Every function call takes up space on the call stack. If recursion goes too deep — or if the base
        case is missing — you get a stack overflow error.
      </p>

      <ErrorFix
        bad={`// Missing base case → infinite recursion → stack overflow!
function countDown(n) {
  console.log(n);
  countDown(n - 1);  // No stop condition — runs forever
}

// RangeError: Maximum call stack size exceeded`}
        good={`// Base case stops the recursion
function countDown(n) {
  if (n <= 0) return;  // ← base case
  console.log(n);
  countDown(n - 1);
}`}
        badLabel="Stack overflow"
        goodLabel="Base case prevents overflow"
      />

      <SectionHeader number={6} title="Fibonacci: Naive vs Memoized" />
      <p>
        The classic Fibonacci sequence is where most people first see recursion — and where they first see
        it go wrong. Naive recursive Fibonacci is O(2ⁿ) — exponentially slow.
      </p>

      <ErrorFix
        bad={`// Naive Fibonacci — O(2ⁿ) — extremely slow for n > 40
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);  // recomputes same values millions of times
}
// fib(50) takes seconds; fib(100) practically never finishes`}
        good={`// Memoized Fibonacci — O(n) — fast
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];  // return cached result

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);  // cache it
  return memo[n];
}
// fib(1000) is instant`}
        badLabel="Naive O(2ⁿ) — too slow"
        goodLabel="Memoized O(n) — fast"
      />

      <SectionHeader number={7} title="Recursion vs Iteration" />

      <CompareTable
        leftLabel="Recursion"
        rightLabel="Iteration (loops)"
        rows={[
          { label: 'Best for', left: 'Trees, graphs, divide-and-conquer', right: 'Linear sequences, simple counting' },
          { label: 'Stack usage', left: 'O(depth) call stack frames', right: 'O(1) constant stack space' },
          { label: 'Readability', left: 'Often more elegant for nested data', right: 'More explicit, easier to follow' },
          { label: 'Overflow risk', left: 'Stack overflow if depth > ~10,000', right: 'No overflow risk' },
          { label: 'Performance', left: 'Function call overhead per level', right: 'Slightly faster in practice' },
        ]}
      />

      <SectionHeader number={8} title="Tail Recursion — Optimized Recursion" />
      <p>
        A recursive call is <strong>tail-recursive</strong> if the recursive call is the very last operation —
        no work happens after it returns. Some environments optimize this to use O(1) stack space.
        JavaScript engines (V8) have limited TCO support, but it's a useful concept.
      </p>

      <CodeBlock language="javascript" filename="Tail Recursion Example">
{`// NOT tail-recursive: n * factorial(n-1) does work AFTER the recursive call
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // multiplication happens after return
}

// Tail-recursive: accumulator carries state, last op is the recursive call
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);  // nothing after the call
}`}
      </CodeBlock>

      <FAQAccordion
        items={[
          {
            question: 'Is recursion always slower than a loop?',
            answer: 'In practice, yes — function calls have overhead (pushing frames onto the call stack). But the performance difference is often negligible compared to the algorithmic difference. An O(n) recursive function still beats an O(n²) loop.',
          },
          {
            question: 'What is the maximum recursion depth in JavaScript?',
            answer: 'Approximately 10,000-15,000 frames in V8 (Chrome/Node.js), depending on frame size. If you need deeper recursion, use an iterative approach with an explicit stack.',
          },
          {
            question: 'When should I NOT use recursion?',
            answer: 'For linear sequences (sum, countdown, string processing) — use a loop. It\'s simpler and avoids stack overhead. Recursion shines when the problem is naturally hierarchical (trees, divide-and-conquer, backtracking).',
          },
          {
            question: 'Can every recursive algorithm be converted to iterative?',
            answer: 'Yes — by using an explicit stack data structure. The call stack IS a stack — you\'re just managing it manually. This is how most compilers convert tail recursion to loops.',
          },
          {
            question: 'What is mutual recursion?',
            answer: 'When function A calls function B, and function B calls function A. isEven/isOdd is the classic example: isEven(n) = isOdd(n-1) and isOdd(n) = isEven(n-1).',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
