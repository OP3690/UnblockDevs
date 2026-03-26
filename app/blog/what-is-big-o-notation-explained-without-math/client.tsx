'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Big O Notation Explained Without Math — A Developer's Visual Guide</h1>
      <p className="lead">
        Big O notation answers one question: <strong>how does my code slow down as the input grows?</strong>
        You don't need to be a mathematician to understand it. This guide uses real-world analogies and code
        examples to make O(1), O(n), O(n²), O(log n), and O(n log n) click.
      </p>

      <StatGrid
        stats={[
          { value: 'O(1)', label: 'best — constant time', color: 'green' },
          { value: 'O(log n)', label: 'great — binary search', color: 'blue' },
          { value: 'O(n²)', label: 'warning — nested loops', color: 'amber' },
          { value: 'O(2ⁿ)', label: 'danger — exponential', color: 'red' },
        ]}
      />

      <SectionHeader number={1} title="What Big O Actually Measures" />
      <p>
        Big O describes <strong>how the number of operations scales</strong> with the size of the input (n).
        It focuses on the worst-case scenario and ignores constants — because at large scale,
        the shape of the curve matters more than the exact multiplier.
      </p>

      <AlertBox type="info" title="Big O ignores constants — here's why">
        O(2n) and O(100n) are both written as O(n) because they both grow linearly.
        At n=1,000,000, a 100× constant doesn't change the fact that you need ~1M operations.
        The class of growth (linear, quadratic, etc.) is what matters.
      </AlertBox>

      <SectionHeader number={2} title="O(1) — Constant Time" />
      <p>
        The operation takes the same time regardless of input size. Like looking up a word in a dictionary
        using a tab — you jump straight to the right letter without scanning from the beginning.
      </p>

      <CodeBlock language="javascript" filename="O(1) Examples">
{`// Array index lookup — always 1 operation
const first = arr[0];

// Object property access
const name = user.name;

// Hash map lookup (average case)
const value = map.get('key');

// Math operations
const area = Math.PI * radius * radius;

// All O(1) — doesn't matter if arr has 10 or 10,000,000 elements`}
      </CodeBlock>

      <SectionHeader number={3} title="O(n) — Linear Time" />
      <p>
        Operations grow proportionally with input size. Like reading a book — 200 pages takes twice as long
        as 100 pages. You touch each element once.
      </p>

      <CodeBlock language="javascript" filename="O(n) Examples">
{`// Single loop — visit every element once
function findMax(arr) {
  let max = arr[0];
  for (const n of arr) {   // n iterations
    if (n > max) max = n;
  }
  return max;
}

// Array methods (they loop internally)
arr.forEach(...)    // O(n)
arr.map(...)        // O(n)
arr.filter(...)     // O(n)
arr.find(...)       // O(n) — worst case

// String operations
str.includes('x')   // O(n)`}
      </CodeBlock>

      <SectionHeader number={4} title="O(n²) — Quadratic Time" />
      <p>
        A loop inside a loop. For each element, you process every other element. 10 items = 100 operations.
        100 items = 10,000 operations. 1,000 items = 1,000,000 operations. Scales terribly.
      </p>

      <CodeBlock language="javascript" filename="O(n²) — Nested Loops">
{`// Bubble sort — classic O(n²)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {       // n times
    for (let j = 0; j < arr.length - 1; j++) { // n times each
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Finding all duplicate pairs — O(n²)
function findDuplicates(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
}

// Better approach: O(n) with a Set
function findDuplicatesFast(arr) {
  const seen = new Set();
  return arr.filter(x => seen.size === seen.add(x).size);
}`}
      </CodeBlock>

      <AlertBox type="warning" title="O(n²) warning sign">
        Any time you see a loop inside a loop, ask: "Is the inner loop's size proportional to n?"
        If yes — you likely have O(n²). Often fixable with a hash map to O(n).
      </AlertBox>

      <SectionHeader number={5} title="O(log n) — Logarithmic Time" />
      <p>
        The work <em>halves</em> with each step. Like binary search — every comparison eliminates half the
        remaining possibilities. 1,000,000 items → only 20 comparisons needed.
      </p>

      <CodeBlock language="javascript" filename="O(log n) — Binary Search">
{`function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;

  while (low <= high) {           // runs log₂(n) times max
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (low = mid + 1) : (high = mid - 1);
  }

  return -1;
}
// Each iteration eliminates half the array
// n=1,000,000 → at most 20 iterations`}
      </CodeBlock>

      <SectionHeader number={6} title="O(n log n) — Linearithmic Time" />
      <p>
        The sweet spot for sorting algorithms. Better than O(n²), slightly worse than O(n).
        Most real sorting you'll use (QuickSort, MergeSort, JavaScript's built-in sort) is O(n log n).
      </p>

      <CodeBlock language="javascript" filename="O(n log n) — Merge Sort">
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // log n levels of recursion
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);                   // O(n) work per level
}

// JavaScript's built-in sort uses TimSort — O(n log n)
arr.sort((a, b) => a - b);`}
      </CodeBlock>

      <SectionHeader number={7} title="The Big O Cheat Sheet" />

      <CompareTable
        leftLabel="Notation"
        rightLabel="Name & Typical Use"
        rows={[
          { label: 'Speed rank: fastest', left: 'O(1)', right: 'Constant — hash lookups, array index' },
          { label: 'Speed rank: 2nd', left: 'O(log n)', right: 'Logarithmic — binary search, BST ops' },
          { label: 'Speed rank: 3rd', left: 'O(n)', right: 'Linear — single loop, array scan' },
          { label: 'Speed rank: 4th', left: 'O(n log n)', right: 'Linearithmic — merge sort, heap sort' },
          { label: 'Speed rank: 5th', left: 'O(n²)', right: 'Quadratic — nested loops, bubble sort' },
          { label: 'Speed rank: 6th', left: 'O(2ⁿ)', right: 'Exponential — naive recursion (Fibonacci)' },
          { label: 'Speed rank: worst', left: 'O(n!)', right: 'Factorial — all permutations (brute force TSP)' },
        ]}
      />

      <SectionHeader number={8} title="Practical: How to Improve Your Code's Big O" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Replace O(n²) lookups with O(1)',
            description: 'Use a Map or Set instead of array.includes() inside a loop. Trading memory for speed.',
          },
          {
            title: 'Cache repeated computation',
            description: 'If you compute the same value inside a loop, compute it once before the loop starts.',
          },
          {
            title: 'Sort once, then binary search',
            description: 'If you search multiple times: O(n log n) sort + O(log n) searches beats O(n) linear search each time.',
          },
          {
            title: 'Use the right data structure',
            description: 'Array insertions are O(n). Linked list insertions are O(1). Stack/queue operations are O(1). Choose based on your dominant operation.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Does Big O matter for small inputs?',
            answer: 'Usually not. An O(n²) algorithm on 100 items is faster than an O(n) algorithm with expensive operations. Big O matters when n is large — thousands to millions. For small fixed inputs, readability > optimization.',
          },
          {
            question: 'What is the difference between worst, average, and best case?',
            answer: 'Big O typically describes worst case. Quick Sort is O(n log n) average but O(n²) worst case. Linear search is O(n) worst case but O(1) best case (if first element matches). Unless specified, assume worst case.',
          },
          {
            question: 'What is space complexity?',
            answer: 'The same idea applied to memory: how does memory usage grow with input size? O(1) space means constant extra memory. O(n) means you allocate memory proportional to input. It\'s a trade-off — many O(n²) time algorithms can be improved to O(n log n) by using O(n) extra space.',
          },
          {
            question: 'Is O(n log n) always better than O(n²)?',
            answer: 'At large n, yes. But for very small n (< ~10 items), O(n²) with low constants can beat O(n log n) — which is why Tim Sort (used in Python and JavaScript) uses insertion sort (O(n²)) for small subarrays.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
