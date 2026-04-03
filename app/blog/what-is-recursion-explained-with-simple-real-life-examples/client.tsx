'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
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

      <StatGrid stats={[
        { value: '2', label: 'components every recursive function must have', color: 'blue' },
        { value: 'O(n)', label: 'stack frames consumed for depth-n recursion', color: 'amber' },
        { value: '∞', label: 'stack overflow if base case is missing', color: 'red' },
        { value: '3', label: 'classic examples: factorial, Fibonacci, trees', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Real-Life Analogy" />
      <p>
        Imagine you're standing in a line and ask the person in front of you: "What position am I?"
        They don't know, so they ask the person in front of them. That person asks the next, and so on —
        until someone at the front says "I'm position 1." That answer ripples back: "I'm 2",
        "I'm 3"... until it reaches you. <strong>That's recursion.</strong>
      </p>

      <QuickFact color="blue" label="The two required parts">
        Every recursive solution has two parts: a <strong>base case</strong> (the stop condition — "I'm position 1,
        I know the answer") and a <strong>recursive case</strong> (the self-referential step — "I'm 1 + whatever
        the person in front of me says"). Missing either one breaks the recursion entirely.
      </QuickFact>

      <SectionHeader number={2} title="The Simplest Possible Example: Countdown" />
      <CodeBlock language="javascript" filename="Countdown — Recursion vs Loop">
{`// ITERATIVE version (loop)
function countdownLoop(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

// RECURSIVE version — does the exact same thing
function countdownRecursive(n) {
  if (n < 0) return;          // BASE CASE: stop when n goes negative
  console.log(n);
  countdownRecursive(n - 1);  // RECURSIVE CASE: call self with smaller n
}

// Both print: 5, 4, 3, 2, 1, 0
countdownRecursive(5);`}
      </CodeBlock>

      <VerticalSteps steps={[
        { title: 'countdownRecursive(5)', desc: 'Prints 5, then calls countdownRecursive(4). Waits for it to return before continuing.' },
        { title: 'countdownRecursive(4)', desc: 'Prints 4, then calls countdownRecursive(3). Now 2 frames on the call stack.' },
        { title: 'countdownRecursive(3)', desc: 'Prints 3, then calls countdownRecursive(2). 3 frames deep.' },
        { title: 'countdownRecursive(2)', desc: 'Prints 2, then calls countdownRecursive(1). 4 frames deep.' },
        { title: 'countdownRecursive(1)', desc: 'Prints 1, then calls countdownRecursive(0). 5 frames deep.' },
        { title: 'countdownRecursive(0)', desc: 'Prints 0, then calls countdownRecursive(-1). 6 frames deep.' },
        { title: 'countdownRecursive(-1)', desc: 'n < 0 → BASE CASE → returns immediately. All 6 frames unwind in sequence.' },
      ]} />

      <SectionHeader number={3} title="Classic Example: Factorial" />
      <p>
        5! (factorial) = 5 × 4 × 3 × 2 × 1 = 120. This is naturally recursive: 5! = 5 × 4!.
        The problem breaks into a smaller version of itself — the hallmark of a recursive problem.
      </p>

      <CodeBlock language="javascript" filename="Factorial — Recursive with call trace">
{`function factorial(n) {
  if (n <= 1) return 1;        // BASE CASE: 0! = 1! = 1
  return n * factorial(n - 1); // RECURSIVE CASE: n! = n × (n-1)!
}

// How factorial(4) unfolds on the call stack:
// factorial(4)
//   = 4 * factorial(3)
//   = 4 * (3 * factorial(2))
//   = 4 * (3 * (2 * factorial(1)))
//   = 4 * (3 * (2 * 1))    ← base case reached, unwinding begins
//   = 4 * (3 * 2)
//   = 4 * 6
//   = 24

console.log(factorial(5)); // → 120
console.log(factorial(0)); // → 1 (base case)`}
      </CodeBlock>

      <SectionHeader number={4} title="Where Recursion Really Shines: Tree Traversal" />
      <AlertBox type="info" title="Loops are for flat data; recursion is for nested data">
        Loops are great for flat lists (arrays, strings). Recursion is natural for tree-shaped data:
        file systems, DOM trees, JSON with nested objects, org charts, comment threads with replies.
        An iterative tree traversal requires manually managing a stack — recursion uses the call stack automatically.
      </AlertBox>

      <CodeBlock language="javascript" filename="File System — Recursive Traversal">
{`// File system tree
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

// Recursive: naturally mirrors the tree structure — no manual stack needed
function printTree(node, depth = 0) {
  console.log('  '.repeat(depth) + node.name);

  for (const child of node.children) {
    printTree(child, depth + 1);  // recurse into each child
  }
}

printTree(fileSystem);
// root
//   src
//     index.js
//     utils
//       helper.js
//   package.json

// Counting all files recursively:
function countFiles(node) {
  if (node.children.length === 0) return 1;  // leaf node = file
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
}
console.log(countFiles(fileSystem)); // 3 (index.js, helper.js, package.json)`}
      </CodeBlock>

      <SectionHeader number={5} title="The Stack Overflow Problem" />
      <ErrorFix
        bad={`// Missing base case → infinite recursion → stack overflow!
function countDown(n) {
  console.log(n);
  countDown(n - 1);  // No stop condition — calls itself forever
}

// RangeError: Maximum call stack size exceeded
// JavaScript allows ~10,000-15,000 frames before crashing`}
        good={`// Base case stops the recursion before the stack overflows
function countDown(n) {
  if (n <= 0) return;  // ← base case: stop here
  console.log(n);
  countDown(n - 1);
}

// If you genuinely need deep recursion (>10,000 levels),
// convert to iterative with an explicit stack array instead`}
        badLabel="Missing base case — stack overflow"
        goodLabel="Base case prevents infinite recursion"
      />

      <SectionHeader number={6} title="Fibonacci: Naive vs Memoized" />
      <ErrorFix
        bad={`// Naive Fibonacci — O(2ⁿ) exponential time — catastrophically slow
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);  // recomputes same values millions of times
}

// fib(40) → ~1 billion recursive calls
// fib(50) takes seconds; fib(100) practically never finishes
// fib(40) recalculates fib(2) over 100 million times!`}
        good={`// Memoized Fibonacci — O(n) linear time — fast for any n
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];  // return cached result

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);  // cache before returning
  return memo[n];
}

// fib(1000) returns instantly — each value computed exactly once
console.log(fib(50)); // 12586269025`}
        badLabel="Naive O(2ⁿ) — exponentially slow"
        goodLabel="Memoized O(n) — linear, instant"
      />

      <SectionHeader number={7} title="Recursion vs Iteration" />
      <CompareTable
        leftLabel="Recursion"
        rightLabel="Iteration (loops)"
        rows={[
          { label: 'Best for', left: 'Trees, graphs, divide-and-conquer, backtracking', right: 'Linear sequences, simple counting, array processing' },
          { label: 'Stack usage', left: 'O(depth) call stack frames — limited to ~10K deep', right: 'O(1) constant stack — no depth limit' },
          { label: 'Readability', left: 'Often more elegant for nested/hierarchical data', right: 'More explicit, easier to trace line by line' },
          { label: 'Overflow risk', left: 'Stack overflow if depth > ~10,000 (language-dependent)', right: 'No overflow risk — loop runs indefinitely' },
          { label: 'Performance', left: 'Function call overhead per level', right: 'Slightly faster — no call overhead' },
          { label: 'Debugging', left: 'Harder — must trace call stack mentally', right: 'Easier — sequential, straightforward to trace' },
        ]}
      />

      <SectionHeader number={8} title="Tail Recursion — Optimized Recursion" />
      <CodeBlock language="javascript" filename="Tail Recursion — Accumulator Pattern">
{`// NOT tail-recursive: multiplication happens AFTER the recursive call returns
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // n * ... requires waiting for the recursive result
}

// Tail-recursive: accumulator carries the running result
// The recursive call is the VERY LAST thing — no work after it
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;        // base case: return accumulated result
  return factorialTail(n - 1, n * acc);  // multiply into acc BEFORE calling
}

// factorialTail(5):
// → factorialTail(4, 5)
// → factorialTail(3, 20)
// → factorialTail(2, 60)
// → factorialTail(1, 120) → 120

// Some engines (Scheme, Proper Tail Calls in V8 strict mode) optimize
// tail-recursive calls to use O(1) stack space instead of O(n)`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        { title: 'Merge Sort (Divide and Conquer)', description: 'Recursively splits the array in half, sorts each half, then merges. O(n log n) — the standard fast sort. Each recursive call works on a smaller subarray until single-element base case.' },
        { title: 'Binary Search (Recursive)', description: 'Check the middle element — if target is less, recurse left half; if more, recurse right half. O(log n). Elegant recursive solution that mirrors the mental model of divide-and-conquer search.' },
        { title: 'Backtracking (Permutations/Sudoku)', description: 'Try a choice, recurse, and if it leads to a dead end, undo (backtrack) and try another choice. Used for Sudoku solvers, N-queens, maze solving — problems where you explore a decision tree.' },
        { title: 'JSON Deep Clone/Traverse', description: 'Recursively traverse any JSON structure — arrays, objects, nested values — without knowing the depth in advance. Each value is either a leaf (primitive) or a node (object/array) that recurses further.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Is recursion always slower than a loop?',
          answer: 'In practice, yes — function calls have overhead (pushing/popping frames from the call stack, saving registers). But the performance difference is often negligible compared to the algorithmic complexity difference. An O(n) recursive function still beats an O(n²) iterative loop. For most tree/graph traversals, the overhead is invisible at practical depths.',
        },
        {
          question: 'What is the maximum recursion depth in JavaScript?',
          answer: 'Approximately 10,000–15,000 frames in V8 (Chrome/Node.js), depending on how many local variables each frame uses. Other languages: Python defaults to 1,000 (configurable via sys.setrecursionlimit), Java ~500 on default JVM stack size. If you need deeper recursion, use an iterative approach with an explicit stack data structure.',
        },
        {
          question: 'When should I NOT use recursion?',
          answer: 'For linear sequences (sum a list, process an array, build a string) — use a loop. It\'s simpler, avoids stack overhead, and has no overflow risk. Also avoid recursion for deep data structures (files systems with 100K+ files, large graphs) — prefer iterative BFS/DFS with an explicit queue/stack. Recursion shines when the problem is naturally hierarchical and depth is bounded.',
        },
        {
          question: 'Can every recursive algorithm be converted to iterative?',
          answer: 'Yes — by using an explicit stack data structure to simulate the call stack. The call stack IS a stack — recursion just uses it implicitly. Push each pending computation onto your own array stack, process it, push children, and continue. This is how compilers convert recursion to loops and how most iterative tree/graph traversals work.',
        },
        {
          question: 'What is mutual recursion?',
          answer: 'When function A calls function B, and function B calls function A (or a chain of functions that eventually call back to A). The classic example: isEven(n) calls isOdd(n-1) and isOdd(n) calls isEven(n-1). Both functions are recursive through each other. The base case must still exist to terminate the chain.',
        },
        {
          question: 'How does recursion relate to the call stack?',
          answer: 'Every function call pushes a "stack frame" onto the call stack — containing local variables, parameters, and the return address. Recursive calls stack up these frames until the base case returns. Then frames unwind in reverse order, each resuming from where it paused. This is why deep recursion overflows the stack — you run out of memory for new frames before reaching the base case.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
