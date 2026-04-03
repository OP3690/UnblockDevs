'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
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
        examples to make O(1), O(n), O(n²), O(log n), and O(n log n) click — and shows you the most common
        patterns that cause performance bugs in production.
      </p>

      <StatGrid
        stats={[
          { value: 'O(1)', label: 'best — constant time, always fast', color: 'green' },
          { value: 'O(log n)', label: 'great — binary search, 20 steps for 1M items', color: 'blue' },
          { value: 'O(n²)', label: 'warning — nested loops, scales terribly', color: 'amber' },
          { value: 'O(2ⁿ)', label: 'danger — exponential, unusable at scale', color: 'red' },
        ]}
      />

      <SectionHeader number={1} title="What Big O Actually Measures" />
      <QuickFact color="blue" label="The one-sentence definition">
        Big O describes <strong>how the number of operations scales</strong> with the size of the input (n).
        It focuses on the worst-case scenario and ignores constants — because at large scale,
        the shape of the curve matters more than the exact multiplier.
      </QuickFact>

      <AlertBox type="info" title="Big O ignores constants — here's why">
        O(2n) and O(100n) are both written as O(n) because they both grow linearly.
        At n=1,000,000, a 100× constant doesn't change the fact that you need ~1M operations.
        What matters is the class of growth: does it double when input doubles? Quadruple?
        That's what Big O measures — the shape, not the exact speed.
      </AlertBox>

      <SectionHeader number={2} title="O(1) — Constant Time" />
      <p>
        The operation takes the same time regardless of input size. Like looking up a word in a dictionary
        using a tab — you jump straight to the right letter without scanning from the beginning.
      </p>

      <CodeBlock language="javascript" filename="O(1) Examples — Always the Same Speed">
{`const arr = [10, 20, 30, 40, 50];

// Array index lookup — always 1 operation, no matter array size
const first = arr[0];    // O(1)
const last = arr[arr.length - 1];  // O(1)

// Object property access — hash table lookup
const user = { name: 'Alice', role: 'admin' };
const name = user.name;  // O(1)

// Hash map lookup (average case)
const map = new Map([['alice', { age: 30 }]]);
const alice = map.get('alice');  // O(1)

// Math operations — constant regardless of number size
const area = Math.PI * radius * radius;  // O(1)
const isEven = n => n % 2 === 0;        // O(1)

// Stack push/pop — O(1) amortized
const stack = [];
stack.push(42);  // O(1)
stack.pop();     // O(1)

// All O(1) — doesn't matter if the collection has 10 or 10,000,000 elements
// The key: direct computation or direct address access, no traversal`}
      </CodeBlock>

      <SectionHeader number={3} title="O(n) — Linear Time" />
      <p>
        Operations grow proportionally with input size. Like reading a book — 200 pages takes twice as long
        as 100 pages. You touch each element once and can't skip any.
      </p>

      <CodeBlock language="javascript" filename="O(n) Examples — Scales Linearly">
{`// Single loop — visit every element once
function findMax(arr) {
  let max = arr[0];
  for (const n of arr) {   // n iterations — can't skip any element
    if (n > max) max = n;
  }
  return max;
}

// Multiple separate passes are STILL O(n) — not O(2n):
function minAndMax(arr) {
  let min = Infinity, max = -Infinity;
  for (const x of arr) min = Math.min(min, x);  // pass 1: O(n)
  for (const x of arr) max = Math.max(max, x);  // pass 2: O(n)
  return { min, max };  // Total: O(2n) = O(n) — constants drop
}

// Array built-in methods — all O(n) (they loop internally):
arr.forEach(x => ...)    // O(n) — visits every element
arr.map(x => x * 2)     // O(n) — creates new array of same size
arr.filter(x => x > 0)  // O(n) — worst case visits all
arr.find(x => x > 5)    // O(n) — worst case visits all
arr.reduce(...)          // O(n)
arr.includes(42)         // O(n) — linear scan!
arr.indexOf(42)          // O(n) — linear scan!

// String operations are also O(n):
str.includes('x')        // O(n)
str.split(',')           // O(n)
JSON.stringify(obj)      // O(n) where n = number of keys/values`}
      </CodeBlock>

      <SectionHeader number={4} title="O(n²) — Quadratic Time" />
      <p>
        A loop inside a loop. For each element, you process every other element. 10 items = 100 operations.
        100 items = 10,000 operations. 1,000 items = 1,000,000 operations. The most common performance bug.
      </p>

      <ErrorFix
        bad={`// O(n²) — the most common production performance bug
function getUserNames(userIds, allUsers) {
  return userIds.map(id =>
    allUsers.find(u => u.id === id)?.name  // O(n) find × O(n) map = O(n²)
  );
}
// 10,000 userIds × 10,000 users = 100,000,000 operations 🔥`}
        good={`// O(n) — build a lookup map first, then access O(1)
function getUserNames(userIds, allUsers) {
  const userMap = new Map(allUsers.map(u => [u.id, u]));  // O(n) — build once
  return userIds.map(id => userMap.get(id)?.name);         // O(1) per lookup
}
// 10,000 userIds + 10,000 users = 20,000 operations ✅`}
        badLabel="O(n²) — find() inside map()"
        goodLabel="O(n) — Map lookup"
      />

      <CodeBlock language="javascript" filename="O(n²) Patterns to Recognize">
{`// Pattern 1: Classic nested loops
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {       // n times
    for (let j = 0; j < arr.length - 1; j++) { // n times each = O(n²)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
// Use arr.sort() instead — O(n log n), always

// Pattern 2: arr.includes() inside a loop
function hasAllItems(arr, required) {
  return required.every(item => arr.includes(item));  // O(n²): O(n) × O(n)
}
// Fix: const set = new Set(arr); required.every(item => set.has(item)); — O(n)

// Pattern 3: Cartesian product (sometimes unavoidable)
function allPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;  // Must generate n(n-1)/2 pairs — O(n²) is unavoidable
}

// Key question to ask: "Is the inner loop size dependent on n?"
// If yes: O(n²). If inner loop has a fixed bound: still O(n).`}
      </CodeBlock>

      <AlertBox type="warning" title="O(n²) warning sign — check every nested loop">
        Any time you see a loop inside a loop, ask: "Is the inner loop's size proportional to n?"
        If yes — you likely have O(n²). This is the most common fix in code review:
        replace the inner arr.find() or arr.includes() with a Map or Set lookup → O(n).
      </AlertBox>

      <SectionHeader number={5} title="O(log n) — Logarithmic Time" />
      <p>
        The work <em>halves</em> with each step. Like binary search — every comparison eliminates half the
        remaining possibilities. 1,000,000 items → only 20 comparisons needed. log₂(1,000,000) ≈ 20.
      </p>

      <CodeBlock language="javascript" filename="O(log n) — Binary Search">
{`// Binary search on sorted array — halves the search space each step
function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;

  while (low <= high) {           // runs at most log₂(n) times
    const mid = (low + high) >> 1;  // bitwise divide by 2, no overflow
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;  // not found
}

// Why O(log n)? Each step:
// n=1,000,000 → step 1: 500,000 left
// n=1,000,000 → step 2: 250,000 left
// n=1,000,000 → step 3: 125,000 left
// ...step 20: 1 left — found! log₂(1,000,000) ≈ 20

// Other O(log n) operations:
// - TreeMap / SortedMap lookups (balanced BST)
// - Binary heap insert/extract (priority queue)
// - Math.pow(base, exponent) with fast exponentiation
// - Segment tree queries

// JavaScript's Set.has() and Map.get() are O(1) average (hash table)
// but TreeMap / SortedDict (if using a library) are O(log n)`}
      </CodeBlock>

      <SectionHeader number={6} title="O(n log n) — Linearithmic Time" />
      <p>
        The sweet spot for sorting algorithms. Better than O(n²), slightly worse than O(n).
        JavaScript's built-in sort is O(n log n) (TimSort). This is the best possible complexity
        for comparison-based sorting — provably cannot do better.
      </p>

      <CodeBlock language="javascript" filename="O(n log n) — Merge Sort Walkthrough">
{`// JavaScript's built-in sort — O(n log n) always (TimSort)
const arr = [5, 2, 8, 1, 9, 3];
arr.sort((a, b) => a - b);  // O(n log n) — always safe to use

// Why is merge sort O(n log n)?
// - Divide: split into halves (log n levels deep — like a tree)
// - Conquer: merge each level (O(n) total work per level)
// - Total: O(n) × O(log n levels) = O(n log n)

function mergeSort(arr) {
  if (arr.length <= 1) return arr;  // base case

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // split left half
  const right = mergeSort(arr.slice(mid));      // split right half

  return merge(left, right);  // O(n) merge work at each level
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

// Visualization for n=8:
// Level 0: [5,2,8,1,9,3,7,4]              — 1 array, n=8 total work to merge
// Level 1: [5,2,8,1] [9,3,7,4]            — 2 arrays, n=8 total work to merge
// Level 2: [5,2][8,1] [9,3][7,4]          — 4 arrays, n=8 total work to merge
// Level 3: [5][2][8][1][9][3][7][4]       — 8 base cases
// log₂(8) = 3 levels × O(n=8) work per level = O(8 × 3) = O(n log n)`}
      </CodeBlock>

      <SectionHeader number={7} title="The Complete Big O Reference" />
      <CompareTable
        leftLabel="Notation"
        rightLabel="Name, Example, and Practical Threshold"
        rows={[
          { label: 'Fastest', left: 'O(1) — Constant', right: 'Hash lookup, array index. n=∞ → still instant.' },
          { label: '2nd', left: 'O(log n) — Logarithmic', right: 'Binary search. n=1M → 20 ops. Use sorted + binary search.' },
          { label: '3rd', left: 'O(n) — Linear', right: 'Single loop. n=1M → 1M ops. Usually acceptable.' },
          { label: '4th', left: 'O(n log n) — Linearithmic', right: 'Sorting. n=1M → 20M ops. Good for sorting.' },
          { label: 'Caution', left: 'O(n²) — Quadratic', right: 'Nested loops. n=10K → 100M ops. Optimize or fail.' },
          { label: 'Danger', left: 'O(2ⁿ) — Exponential', right: 'Naive recursion. n=50 → 1 quadrillion ops. Memoize.' },
          { label: 'Impossible', left: 'O(n!) — Factorial', right: 'All permutations. n=20 → 2.4 quintillion ops. Only for n<12.' },
        ]}
      />

      <SectionHeader number={8} title="Practical: How to Improve Your Code's Big O" />
      <VerticalSteps steps={[
        { title: 'Identify your loops', desc: 'Count loops from the outside in. One loop = O(n). Two nested loops over the same collection = O(n²). The inner loop with a fixed bound (e.g., always 26 letters of the alphabet) is O(1) — so the outer loop gives O(n) overall, not O(n²).' },
        { title: 'Replace O(n) inner operations with O(1)', desc: 'Any arr.find(), arr.includes(), or arr.indexOf() inside a loop is O(n) × O(n) = O(n²). Build a Map or Set from the array before the loop (O(n) once), then use Map.get() or Set.has() (O(1)) inside the loop — total O(n).' },
        { title: 'Cache repeated computation', desc: 'If you compute the same value inside a loop, compute it once before the loop starts. arr.length inside a for condition recalculates each iteration (minor in JS but a habit worth having). Expensive function calls in loops should be memoized.' },
        { title: 'Sort once, then binary search repeatedly', desc: 'If you need to search the same data multiple times: O(n log n) sort once + O(log n) binary search each time beats O(n) linear search each time after ~log n queries. For 1M elements: sort+binary is faster than linear search after just 20 queries.' },
        { title: 'Use the right data structure', desc: 'Array insertions at front are O(n) — use a deque or linked list. Finding if a value exists in an array is O(n) — use a Set. Finding the minimum repeatedly — use a heap (O(log n) vs O(n) for array scan). Match data structure to your dominant operation.' },
      ]} />

      <KeyPointsGrid columns={2} items={[
        { title: 'Best, average, worst case', description: 'Big O usually describes worst case. QuickSort is O(n log n) average but O(n²) worst case with bad pivots. Binary search is O(log n) best and worst. Specify which case you\'re discussing.' },
        { title: 'Amortized complexity', description: 'Dynamic array push() is O(1) amortized — most calls are instant but occasional resize is O(n). The resize cost spreads across all cheap pushes. Total n pushes cost O(2n) = O(n).' },
        { title: 'O(n + m) vs O(nm)', description: 'Two independent inputs: O(n + m) means iterate both once sequentially. O(nm) means nested iteration. Graph BFS is O(V + E) — vertices once, edges once. Not O(VE).' },
        { title: 'Space complexity', description: 'Same notation applied to memory. O(1) space = constant extra memory (in-place). O(n) space = memory proportional to input (copy of array). Trading space for time is the most common optimization.' },
      ]} />

      <FAQAccordion
        items={[
          {
            question: 'Does Big O matter for small inputs?',
            answer: 'Usually not. An O(n²) algorithm on 100 items is faster than an O(n) algorithm with expensive operations (disk I/O, regex, JSON parsing). Big O matters when n is large — thousands to millions. For small fixed inputs (configuration data, a list of 10 options), readability and correctness matter more than Big O optimization.',
          },
          {
            question: 'What is the difference between worst, average, and best case?',
            answer: 'Big O typically describes worst case (maximum possible operations). Quick Sort is O(n log n) average but O(n²) worst case if you always pick the smallest element as pivot. Linear search is O(n) worst case (last element) but O(1) best case (first element). When discussing Big O without qualification, assume worst case.',
          },
          {
            question: 'What is space complexity?',
            answer: 'The same Big O idea applied to memory usage instead of operations. O(1) space means constant extra memory regardless of input (in-place sorting). O(n) space means memory proportional to input (creating a copy of the array). Many time-complexity improvements involve a space trade-off: the O(n) HashMap solution to avoid O(n²) lookups uses O(n) extra space to store the map.',
          },
          {
            question: 'Is O(n log n) always better than O(n²)?',
            answer: 'At large n (1,000+), yes decisively. But for very small n (< ~20 items), O(n²) with tiny constants can outperform O(n log n) in practice — which is why TimSort (Python and JavaScript\'s built-in sort) uses insertion sort (O(n²)) for subarrays smaller than 64 elements. The constant factors matter at tiny n; the complexity class dominates at large n.',
          },
          {
            question: 'Why do interviews ask about Big O so much?',
            answer: 'Big O is a precise, universal language for discussing code efficiency. Interviewers use it to assess whether you can recognize performance bottlenecks, understand trade-offs between time and space, and optimize code systematically rather than by trial and error. The ability to say "this is O(n²) because of the nested loop, and I can fix it to O(n) by using a hash map" demonstrates both theoretical understanding and practical optimization skill.',
          },
          {
            question: 'Can O(n log n) be faster than O(n) in practice?',
            answer: 'Theoretically no — O(n) grows slower. But in practice, an O(n log n) algorithm with cache-friendly memory access (like merge sort\'s sequential reads) can outperform an O(n) algorithm that does scattered memory accesses (like some hash-based approaches). Cache misses cost 100-300 CPU cycles vs 1-4 cycles for cache hits. At large n with modern CPUs, memory access patterns often matter more than the theoretical operation count.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
