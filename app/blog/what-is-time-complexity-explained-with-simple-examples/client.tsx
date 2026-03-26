'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>What Is Time Complexity? Explained With Simple Examples</h1>
      <p className="lead">
        Time complexity is how we measure "will this code still be fast when I have a million records?"
        Understanding it helps you write code that doesn't grind to a halt in production.
        This guide covers every common complexity class with real code examples — no math degree required.
      </p>

      <StatGrid
        stats={[
          { value: 'O(1)', label: 'constant — always fast', color: 'green' },
          { value: 'O(n)', label: 'linear — grows with data', color: 'blue' },
          { value: 'O(n²)', label: 'quadratic — danger zone', color: 'amber' },
          { value: 'O(2ⁿ)', label: 'exponential — avoid', color: 'red' },
        ]}
      />

      <SectionHeader number={1} title="Why Time Complexity Matters" />
      <p>
        Your code might work fine in development with 100 rows of test data. But what happens in production
        with 1,000,000 rows? Time complexity tells you the answer <em>before</em> you run the code.
      </p>

      <CompareTable
        leftLabel="Input size (n)"
        rightLabel="Operations for O(n²) vs O(n log n)"
        rows={[
          { label: 'n = 100', left: 'O(n²) = 10,000', right: 'O(n log n) = 664' },
          { label: 'n = 1,000', left: 'O(n²) = 1,000,000', right: 'O(n log n) = 9,966' },
          { label: 'n = 10,000', left: 'O(n²) = 100,000,000', right: 'O(n log n) = 132,877' },
          { label: 'n = 100,000', left: 'O(n²) = 10 billion 🔥', right: 'O(n log n) = 1.66 million ✅' },
        ]}
      />

      <SectionHeader number={2} title="O(1) — Constant Time" />
      <p>
        The operation completes in the same number of steps regardless of how big the input is.
        Think of looking up a value by key in a dictionary — one operation, always.
      </p>

      <CodeBlock language="javascript" filename="O(1) Operations">
{`const arr = [10, 20, 30, 40, 50];

// Index access — O(1): same time whether array has 5 or 5 million items
arr[2]         // → 30

// Map/Set lookup — O(1) average case
const map = new Map([['a', 1], ['b', 2]]);
map.get('b')   // → 2

// Object property — O(1)
const user = { name: 'Alice', age: 30 };
user.name      // → 'Alice'

// Stack push/pop — O(1)
const stack = [];
stack.push(1);
stack.pop();`}
      </CodeBlock>

      <SectionHeader number={3} title="O(log n) — Logarithmic Time" />
      <p>
        The work required grows logarithmically — each step eliminates a fraction of the remaining work.
        Binary search is the canonical example: halve the search space each step.
      </p>

      <CodeBlock language="javascript" filename="O(log n) — Binary Search">
{`// Each comparison halves the search space
function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    sorted[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}
// n=1,000,000 → at most 20 iterations`}
      </CodeBlock>

      <SectionHeader number={4} title="O(n) — Linear Time" />
      <p>
        One pass through all n elements. Double the input → double the time. This is the typical single-loop
        scenario.
      </p>

      <CodeBlock language="javascript" filename="O(n) — Single Loop">
{`// Find the sum — O(n): touch each element once
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;
  return total;
}

// Find max — O(n)
function max(arr) {
  return arr.reduce((a, b) => Math.max(a, b), -Infinity);
}

// Array methods: map, filter, forEach, reduce — all O(n)
const doubled = arr.map(x => x * 2);    // O(n)
const evens   = arr.filter(x => x % 2 === 0); // O(n)`}
      </CodeBlock>

      <SectionHeader number={5} title="O(n log n) — Linearithmic Time" />
      <p>
        The practical sorting sweet spot. Most efficient comparison-based sorts are O(n log n).
        This is what JavaScript's <code>Array.prototype.sort()</code> gives you.
      </p>

      <CodeBlock language="javascript" filename="O(n log n) — Sorting">
{`// JavaScript's built-in sort is O(n log n) (TimSort)
const arr = [5, 2, 8, 1, 9, 3];
arr.sort((a, b) => a - b);  // O(n log n)

// Merge Sort (classic O(n log n)):
// - Divide array in half (log n levels)
// - Merge each level (O(n) work per level)
// - Total: O(n log n)`}
      </CodeBlock>

      <SectionHeader number={6} title="O(n²) — Quadratic Time" />
      <p>
        A loop inside a loop, both proportional to n. The most common performance bug:
        an <code>includes()</code> or <code>find()</code> inside a loop.
      </p>

      <ErrorFix
        bad={`// O(n²) — common mistake: find() inside a loop
function getUserNames(userIds, users) {
  return userIds.map(id =>
    users.find(u => u.id === id)?.name  // O(n) find() × O(n) map = O(n²)
  );
}
// 10,000 users × 10,000 IDs = 100 million operations`}
        good={`// O(n) — build a map first, then look up O(1)
function getUserNames(userIds, users) {
  const userMap = new Map(users.map(u => [u.id, u]));  // O(n)
  return userIds.map(id => userMap.get(id)?.name);      // O(1) per lookup
}
// 10,000 users + 10,000 lookups = 20,000 operations`}
        badLabel="O(n²) — slow"
        goodLabel="O(n) — fast"
      />

      <SectionHeader number={7} title="O(2ⁿ) and O(n!) — Avoid These" />

      <AlertBox type="error" title="Exponential and factorial complexity">
        O(2ⁿ) doubles with each added input element. O(n!) grows even faster (all permutations).
        These are only acceptable for very small n (≤ 20 for 2ⁿ, ≤ 12 for n!).
        In interviews, spotting when a naive recursive solution is O(2ⁿ) is crucial.
      </AlertBox>

      <CodeBlock language="javascript" filename="O(2ⁿ) — Naive Fibonacci (avoid)">
{`// O(2ⁿ) — exponential, recomputes same values over and over
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// fib(50) = ~2^50 = 1 quadrillion operations — never finishes

// O(n) fix — memoization
function fib(n, memo = {}) {
  if (n <= 1) return n;
  return memo[n] ?? (memo[n] = fib(n-1, memo) + fib(n-2, memo));
}`}
      </CodeBlock>

      <SectionHeader number={8} title="How to Analyze Your Own Code" />

      <VerticalSteps
        steps={[
          {
            title: 'Count the loops',
            description: '1 loop = O(n). 2 nested loops = O(n²). 3 nested = O(n³). But only if each loop runs n times.',
          },
          {
            title: 'Identify recursive calls',
            description: 'Each call that branches into 2 recursive calls → O(2ⁿ). Single recursive call reducing n by half → O(log n). Single call reducing n by 1 → O(n).',
          },
          {
            title: 'Drop constants',
            description: 'O(3n) → O(n). O(100) → O(1). O(n + log n) → O(n). Keep only the dominant term.',
          },
          {
            title: 'Check built-in methods',
            description: 'arr.includes(x) = O(n). arr.sort() = O(n log n). Map.get() = O(1). Set.has() = O(1). Know your tools.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between time complexity and space complexity?',
            answer: 'Time complexity measures how many operations are performed. Space complexity measures how much extra memory is used. Both use Big O notation. A hash map lookup is O(1) time but requires O(n) space to store the map.',
          },
          {
            question: 'Does time complexity equal actual execution time?',
            answer: 'No — it\'s a relative measure. An O(n) function with expensive operations can be slower than an O(n²) function with trivial operations for small n. Time complexity describes growth rate, not absolute speed.',
          },
          {
            question: 'Is O(n + m) the same as O(n)?',
            answer: 'It depends. If m is much smaller than n, O(n+m) simplifies to O(n). If they\'re both independent inputs (like graph nodes + edges), keep them separate: O(V + E).',
          },
          {
            question: 'What is amortized time complexity?',
            answer: 'Average cost per operation over a sequence of operations. Example: dynamic array (like JavaScript Array). Most push() calls are O(1), but occasionally the array resizes (O(n)). Amortized: O(1) per push because resizes are rare enough that the total cost averages out.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
