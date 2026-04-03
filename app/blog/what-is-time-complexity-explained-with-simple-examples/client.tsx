'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
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
        This guide covers every common complexity class with real code examples, Big O cheat sheet,
        and the most important rules for analyzing your own code — no math degree required.
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
      <QuickFact color="blue" label="The production reality">
        Your code might work fine in development with 100 rows of test data. But what happens in production
        with 1,000,000 rows? Time complexity tells you the answer <em>before</em> you run the code.
        An O(n²) algorithm on 10,000 records performs 100 million operations — that's the difference
        between a 10ms response and a 10-second timeout.
      </QuickFact>

      <CompareTable
        leftLabel="Input size (n)"
        rightLabel="Operations for O(n²) vs O(n log n)"
        rows={[
          { label: 'n = 100', left: 'O(n²) = 10,000 ops', right: 'O(n log n) = 664 ops' },
          { label: 'n = 1,000', left: 'O(n²) = 1,000,000 ops', right: 'O(n log n) = 9,966 ops' },
          { label: 'n = 10,000', left: 'O(n²) = 100,000,000 ops (~1s)', right: 'O(n log n) = 132,877 ops (instant)' },
          { label: 'n = 100,000', left: 'O(n²) = 10 billion ops 🔥 (timeout)', right: 'O(n log n) = 1.66 million ops ✅' },
          { label: 'n = 1,000,000', left: 'O(n²) = 1 trillion ops (never finishes)', right: 'O(n log n) = 19.9 million ops (fast)' },
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

// Map/Set lookup — O(1) average case (hash table under the hood)
const map = new Map([['a', 1], ['b', 2]]);
map.get('b')   // → 2

// Object property — O(1)
const user = { name: 'Alice', age: 30 };
user.name      // → 'Alice'

// Stack push/pop — O(1)
const stack = [];
stack.push(1);  // O(1) amortized
stack.pop();    // O(1)

// Math operations — O(1) regardless of input value
const isEven = n => n % 2 === 0;  // O(1) — not O(n)
const area = (w, h) => w * h;     // O(1)`}
      </CodeBlock>

      <SectionHeader number={3} title="O(log n) — Logarithmic Time" />
      <p>
        The work required grows logarithmically — each step eliminates a fraction of the remaining work.
        Binary search is the canonical example: halve the search space each step.
        log₂(1,000,000) = 20 — only 20 steps to find anything in a million-item sorted array.
      </p>

      <CodeBlock language="javascript" filename="O(log n) — Binary Search and BST">
{`// Each comparison halves the search space
function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;  // same as Math.floor((lo + hi) / 2)
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
// n=1,000,000 → at most 20 iterations (log₂(1,000,000) ≈ 20)

// Other O(log n) examples:
// - Math.pow with exponentiation by squaring
// - TreeMap/SortedMap lookups (balanced BST)
// - Heap insert/extract (binary heap)
// - Segment tree queries

// Recursive binary search (same complexity, cleaner):
function binarySearchRecursive(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, hi);
  return binarySearchRecursive(arr, target, lo, mid - 1);
}

// Why O(log n)? At each step:
// Step 1: n candidates remain
// Step 2: n/2 candidates remain
// Step 3: n/4 candidates remain
// ... after k steps: n/2^k candidates → done when n/2^k = 1 → k = log₂(n)`}
      </CodeBlock>

      <SectionHeader number={4} title="O(n) — Linear Time" />
      <p>
        One pass through all n elements. Double the input → double the time. This is the typical single-loop
        scenario and usually the best you can achieve when every element must be examined.
      </p>

      <CodeBlock language="javascript" filename="O(n) — Single Loop Operations">
{`// Find the sum — O(n): touch each element once
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;
  return total;
}

// Find max — O(n) — even though it looks "fast"
function max(arr) {
  return arr.reduce((a, b) => Math.max(a, b), -Infinity);
}

// Array methods: map, filter, forEach, reduce — all O(n)
const doubled = arr.map(x => x * 2);          // O(n)
const evens   = arr.filter(x => x % 2 === 0); // O(n)
const total   = arr.reduce((sum, x) => sum + x, 0); // O(n)

// Multiple sequential passes are still O(n), not O(n²):
function findMinMax(arr) {
  let min = Infinity, max = -Infinity;
  for (const x of arr) {     // first pass: O(n)
    if (x < min) min = x;
    if (x > max) max = x;
  }
  return { min, max };       // O(n) total — not O(2n) — constants drop
}

// indexOf, includes, find — all O(n) (linear scan)
arr.includes(42);  // O(n)
arr.indexOf(42);   // O(n)
arr.find(x => x > 40);  // O(n)

// Why constants don't matter:
// O(3n) === O(n) — we care about growth rate, not the multiplier`}
      </CodeBlock>

      <SectionHeader number={5} title="O(n log n) — Linearithmic Time" />
      <p>
        The practical sorting sweet spot. Most efficient comparison-based sorts are O(n log n).
        This is what JavaScript's <code>Array.prototype.sort()</code> gives you (TimSort).
        O(n log n) is provably optimal for comparison-based sorting — you cannot sort faster without
        additional constraints on the data.
      </p>

      <CodeBlock language="javascript" filename="O(n log n) — Merge Sort Implementation">
{`// JavaScript's built-in sort is O(n log n) (TimSort)
const arr = [5, 2, 8, 1, 9, 3];
arr.sort((a, b) => a - b);  // O(n log n) — always, no exceptions

// Why is merge sort O(n log n)?
// - Divide phase: split into halves (log n levels of splitting)
// - Merge phase: each level does O(n) total work to merge all pairs
// - Total: O(n) × O(log n) levels = O(n log n)

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // O(log n) levels
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);  // O(n) work per level
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Other O(n log n) algorithms:
// - Heap sort (in-place)
// - Quick sort (average case — worst case O(n²))
// - FFT (Fast Fourier Transform)
// - Some graph algorithms (Dijkstra with binary heap: O((V+E) log V))`}
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

      <CodeBlock language="javascript" filename="More O(n²) patterns to recognize">
{`// Classic O(n²): bubble sort (don't use in production)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {      // O(n)
    for (let j = 0; j < arr.length - i; j++) { // O(n) nested
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
// Use arr.sort() instead — O(n log n) always

// O(n²): checking all pairs (sometimes unavoidable)
function countPairsWithSum(arr, target) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {  // O(n²) — all pairs
      if (arr[i] + arr[j] === target) count++;
    }
  }
  return count;
}

// O(n) version: use a Set
function countPairsWithSumFast(arr, target) {
  const seen = new Set();
  let count = 0;
  for (const n of arr) {
    if (seen.has(target - n)) count++;
    seen.add(n);
  }
  return count;
}`}
      </CodeBlock>

      <SectionHeader number={7} title="O(2ⁿ) and O(n!) — Avoid These" />

      <AlertBox type="error" title="Exponential and factorial complexity">
        O(2ⁿ) doubles with each added input element. O(n!) grows even faster (all permutations).
        These are only acceptable for very small n (≤ 20 for 2ⁿ, ≤ 12 for n!).
        In interviews, spotting when a naive recursive solution is O(2ⁿ) is crucial — the fix is
        almost always dynamic programming or memoization.
      </AlertBox>

      <CodeBlock language="javascript" filename="O(2ⁿ) — Naive Fibonacci vs Memoized vs DP">
{`// O(2ⁿ) — exponential, recomputes same values over and over
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);  // 2 calls each time
}
// fibNaive(50) = ~2^50 = 1 quadrillion calls — never finishes

// O(n) fix 1 — memoization (top-down DP)
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}
// fibMemo(1000) runs instantly — each n computed exactly once

// O(n) fix 2 — bottom-up DP (no recursion, O(1) space variant)
function fibDP(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
// fibDP(1000000) runs in milliseconds, only uses 2 variables

// O(n!) example: generating all permutations
function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}
// permutations([1..10]) = 10! = 3,628,800 results — feasible
// permutations([1..20]) = 20! = 2.4 quintillion — impossible`}
      </CodeBlock>

      <SectionHeader number={8} title="Big O Cheat Sheet" />
      <CompareTable
        leftLabel="Complexity"
        rightLabel="Algorithm examples and when you see it"
        rows={[
          { label: 'O(1)', left: 'Constant — always instant', right: 'Array index, Map.get(), Set.has(), Object property, stack push/pop' },
          { label: 'O(log n)', left: 'Logarithmic — very fast', right: 'Binary search, balanced BST ops, binary heap insert/extract' },
          { label: 'O(n)', left: 'Linear — scales well', right: 'Single loop, map/filter/reduce, linear search, array traversal' },
          { label: 'O(n log n)', left: 'Linearithmic — good', right: 'Merge sort, quicksort (avg), heap sort, Array.sort()' },
          { label: 'O(n²)', left: 'Quadratic — caution', right: 'Nested loops, bubble sort, naive string matching, comparing all pairs' },
          { label: 'O(n³)', left: 'Cubic — very slow', right: 'Triple nested loops, naive matrix multiplication' },
          { label: 'O(2ⁿ)', left: 'Exponential — danger', right: 'Naive Fibonacci, subset enumeration, naive TSP, naive backtracking' },
          { label: 'O(n!)', left: 'Factorial — extreme', right: 'Generating all permutations, brute-force TSP, naive scheduling' },
        ]}
      />

      <SectionHeader number={9} title="How to Analyze Your Own Code" />

      <VerticalSteps
        steps={[
          { title: 'Count the loops', desc: '1 loop over n elements = O(n). 2 nested loops both over n = O(n²). 3 nested = O(n³). But if an inner loop has a fixed bound (not dependent on n), it contributes O(1) to that level — so the nested loop is still O(n) overall.' },
          { title: 'Identify recursive calls', desc: 'Each call that branches into 2 recursive calls with half the input → O(n) (merge sort, like a tree with n leaves). Two calls with full n → O(2ⁿ). Single call reducing n by half → O(log n). Single call reducing n by 1 → O(n).' },
          { title: 'Drop constants and lower terms', desc: 'O(3n + 100) → O(n). O(n² + n) → O(n²). O(n log n + n) → O(n log n). Big O only keeps the dominant term as n grows to infinity. Constants reflect hardware speed, not algorithmic efficiency.' },
          { title: 'Check built-in method complexity', desc: 'arr.includes(x) = O(n). arr.sort() = O(n log n). arr.splice(i, 1) = O(n). Map.get() = O(1). Set.has() = O(1). String.includes() = O(n). These hidden complexities inside loops are common O(n²) bugs.' },
          { title: 'Consider both time and space', desc: 'The O(n) HashMap solution to twoSum uses O(n) extra space. The O(n²) brute force uses O(1) space. Sometimes you trade space for time. Know both — interviews often ask "what is the space complexity?" as a follow-up.' },
        ]}
      />

      <KeyPointsGrid columns={2} items={[
        { title: 'Best, average, worst case', description: 'Big O usually describes worst case. Quicksort is O(n log n) average but O(n²) worst. Binary search is O(log n) average and worst. Know which case you\'re discussing.' },
        { title: 'Amortized complexity', description: 'Array push() is O(1) amortized — most calls are O(1), occasional resizes are O(n), but the total cost across many calls averages to O(1) per operation.' },
        { title: 'O(n + m) vs O(nm)', description: 'Two independent inputs: O(n + m) means iterate both once. O(nm) means nested iteration of both. Graph problems: O(V + E) is linear, O(VE) is quadratic-like.' },
        { title: 'Space complexity', description: 'Also expressed in Big O. O(1) = constant extra space (in-place). O(n) = linear extra space (copy of input). O(log n) = recursion stack for binary search.' },
      ]} />

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between time complexity and space complexity?',
            answer: 'Time complexity measures how many operations are performed as input grows. Space complexity measures how much extra memory is used. Both use Big O notation. A HashMap lookup is O(1) time but requires O(n) space to store the hash map. Merge sort is O(n log n) time but O(n) space (for the merge buffer). In-place sorting like heapsort is O(n log n) time and O(1) space.',
          },
          {
            question: 'Does time complexity equal actual execution time?',
            answer: 'No — it\'s a relative growth rate measure, not absolute speed. An O(n) function with expensive operations (disk I/O, regex, JSON parsing) can be slower than an O(n²) function with trivial operations (array index access) for small n. Time complexity describes how performance scales with input size, not the constant factor. An O(n) algorithm with constant 1000 is slower than O(n²) with constant 0.001 until n reaches ~1,000,000.',
          },
          {
            question: 'Is O(n + m) the same as O(n)?',
            answer: 'It depends. If m is always much smaller than n, O(n+m) simplifies to O(n). But if they\'re both independent inputs of similar magnitude (like graph nodes V and edges E), keep them separate: O(V + E) is more informative than O(V). In graph BFS/DFS, the correct complexity is O(V + E) — you visit every vertex once and traverse every edge once.',
          },
          {
            question: 'What is amortized time complexity?',
            answer: 'The average cost per operation over a sequence of operations, accounting for occasional expensive operations. Example: dynamic array (JavaScript Array). Most push() calls are O(1) — just write to the next slot. But when the array is full, it doubles in size (O(n) copy). The cost of the copy is "amortized" across all the cheap inserts that preceded it. Total: n pushes take O(2n) = O(n) time → O(1) amortized per push.',
          },
          {
            question: 'Why is arr.includes() inside a loop a common bug?',
            answer: 'arr.includes(x) is O(n) — it scans the entire array. When you call it inside a loop that also runs n times, you have O(n) × O(n) = O(n²) total. The fix: convert the array to a Set before the loop (Set construction is O(n)) and use Set.has() (O(1)) inside the loop — total: O(n) + O(n) × O(1) = O(n). This pattern appears in duplicate detection, intersection, and difference operations.',
          },
          {
            question: 'When is O(n²) acceptable?',
            answer: 'When n is guaranteed small: form validation on user inputs (max ~100 fields), UI rendering of visible items (max ~100 on screen), configuration processing at startup (runs once). O(n²) becomes problematic when n can grow with user data or system load. For batch data processing, API responses, or database-sourced collections, assume n can be large and design for O(n log n) or better.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
