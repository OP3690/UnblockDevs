'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function PrefixSumTechniqueExplainedSimplyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Prefix Sum Technique Explained Simply — With Code Examples</h1>
      <p className="lead">
        The prefix sum (also called cumulative sum or running sum) is a preprocessing technique that
        converts O(n) range sum queries into O(1) lookups. Precompute once, then answer any range sum
        in constant time. This guide covers the core idea, 1D and 2D prefix sums, the powerful
        prefix-sum-plus-HashMap pattern for subarray problems, and practical interview applications
        that make this one of the most frequently tested techniques in coding interviews.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'range sum query time after O(n) build phase', color: 'green' },
        { value: 'O(n)', label: 'precomputation time and extra space required', color: 'blue' },
        { value: '2D', label: 'prefix sum works on matrices for rectangle queries', color: 'purple' },
        { value: 'HashMap', label: 'combine with map for O(n) subarray counting problems', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Idea — Why Prefix Sums Exist" />
      <p>
        Imagine you have an array of numbers and need to answer hundreds of "what is the sum of elements
        from index L to R?" queries. The naive approach recalculates the sum each time, running through
        the subarray for every query. If you have 1000 queries on an array of 1000 elements, that's
        up to 1,000,000 operations.
      </p>
      <p>
        Prefix sums solve this with a simple insight: precompute the cumulative sum up to every index,
        then any range sum becomes just two lookups and one subtraction.
      </p>
      <QuickFact color="blue" label="The key formula">
        prefix[i] = sum of all elements from index 0 through index i-1.
        Range sum from index L to R = prefix[R+1] - prefix[L].
        Precompute the prefix array in O(n). Answer any range sum in O(1).
        Trade space (the prefix array) for time (constant query speed).
      </QuickFact>
      <ErrorFix
        title="O(n) per query vs O(1) with prefix sum"
        bad={`// Naive approach — O(n) per query, recalculates every time
function rangeSum(arr, l, r) {
  let sum = 0;
  for (let i = l; i <= r; i++) {
    sum += arr[i]; // O(n) per call
  }
  return sum;
}
// 1000 queries on 1000-element array = up to 1,000,000 operations`}
        good={`// Prefix sum — O(n) once, then O(1) per query
function buildPrefix(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  // prefix[0] = 0 (empty prefix — sum of zero elements)
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l]; // O(1) — just two lookups
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const prefix = buildPrefix(arr);
console.log(rangeSum(prefix, 2, 5)); // 4+1+5+9 = 19
// 1000 queries = n (build) + 1000 (queries) = 2000 operations`}
        badLabel="O(n) per query — expensive for many queries"
        goodLabel="O(n) build + O(1) per query — efficient for many queries"
      />

      <SectionHeader number={2} title="Step-by-Step Walkthrough with Real Numbers" />
      <CodeBlock lang="javascript" title="Visualizing the prefix array construction">
{`// Original array
const arr     = [3,  1,  4,  1,  5,  9,  2,  6];
// indices:       0   1   2   3   4   5   6   7

// Build prefix array (length = arr.length + 1)
const prefix  = [0,  3,  4,  8,  9, 14, 23, 25, 31];
// index:         0   1   2   3   4   5   6   7   8

// How each prefix value is computed:
// prefix[0] = 0         (empty prefix, always 0)
// prefix[1] = 0 + 3 = 3       (arr[0] alone)
// prefix[2] = 3 + 1 = 4       (arr[0..1])
// prefix[3] = 4 + 4 = 8       (arr[0..2])
// prefix[4] = 8 + 1 = 9       (arr[0..3])
// prefix[5] = 9 + 5 = 14      (arr[0..4])
// prefix[6] = 14 + 9 = 23     (arr[0..5])
// prefix[7] = 23 + 2 = 25     (arr[0..6])
// prefix[8] = 25 + 6 = 31     (arr[0..7])

// Range sum queries using: prefix[r+1] - prefix[l]
console.log(rangeSum(prefix, 0, 3)); // arr[0..3] = 3+1+4+1 = 9  → 9 - 0 = 9 ✅
console.log(rangeSum(prefix, 2, 5)); // arr[2..5] = 4+1+5+9 = 19 → 23 - 4 = 19 ✅
console.log(rangeSum(prefix, 0, 7)); // entire array = 31          → 31 - 0 = 31 ✅
console.log(rangeSum(prefix, 5, 5)); // single element arr[5] = 9  → 23 - 14 = 9 ✅`}
      </CodeBlock>

      <SectionHeader number={3} title="Python Implementation" />
      <CodeBlock lang="python" title="Prefix sum in Python — clean and simple">
{`def build_prefix(arr):
    """Build prefix sum array with one extra leading 0."""
    prefix = [0] * (len(arr) + 1)
    for i, val in enumerate(arr):
        prefix[i + 1] = prefix[i] + val
    return prefix

def range_sum(prefix, l, r):
    """Sum of arr[l..r] inclusive in O(1)."""
    return prefix[r + 1] - prefix[l]

# Python built-in alternative using itertools
import itertools
arr = [3, 1, 4, 1, 5, 9, 2, 6]
prefix = list(itertools.accumulate(arr, initial=0))
# [0, 3, 4, 8, 9, 14, 23, 25, 31]

# Or using NumPy for large arrays
import numpy as np
arr_np = np.array([3, 1, 4, 1, 5, 9, 2, 6])
prefix_np = np.cumsum(arr_np)
# array([ 3,  4,  8,  9, 14, 23, 25, 31])
# Note: NumPy cumsum doesn't include the leading 0
range_sum_np = prefix_np[5] - (prefix_np[1] if 2 > 0 else 0)`}
      </CodeBlock>

      <SectionHeader number={4} title="Subarray Sum Equals K — Prefix Sum + HashMap (O(n))" />
      <p>
        The most powerful prefix sum pattern combines the prefix array with a HashMap to solve
        subarray counting problems that would otherwise require O(n²). The key insight: if
        prefix[j] - prefix[i] = k, then the subarray from index i to j-1 sums to k.
      </p>
      <CodeBlock lang="javascript" title="Count subarrays with sum equal to k — LeetCode #560">
{`function subarraySum(nums, k) {
  // prefixCount maps: prefix_sum → number of times we've seen it
  const prefixCount = new Map([[0, 1]]); // prefix[0] = 0 occurs once (empty prefix)
  let runningSum = 0;
  let count = 0;

  for (const num of nums) {
    runningSum += num;

    // Check: does (runningSum - k) exist in our map?
    // If yes, there are that many subarrays ending here that sum to k
    const complement = runningSum - k;
    if (prefixCount.has(complement)) {
      count += prefixCount.get(complement);
    }

    // Record this prefix sum
    prefixCount.set(runningSum, (prefixCount.get(runningSum) || 0) + 1);
  }

  return count;
}

// Examples:
subarraySum([1, 1, 1], 2); // → 2 ([1,1] at positions 0-1 and 1-2)
subarraySum([1, 2, 3], 3); // → 2 ([1,2] and [3])
subarraySum([-1, -1, 1], 0); // → 1 ([-1, -1, 1] + [-1,1] don't sum to 0; [-1,1] no... actually [-1, -1, 1] does)
// Works with negative numbers too!`}
      </CodeBlock>

      <SectionHeader number={5} title="2D Prefix Sum — Matrix Rectangle Queries" />
      <p>
        The same principle extends to 2D. Precompute a 2D prefix sum matrix, then answer
        any rectangle region sum query in O(1) using the inclusion-exclusion principle.
      </p>
      <CodeBlock lang="javascript" title="2D prefix sum for matrix range queries (LeetCode #304)">
{`class NumMatrix {
  constructor(matrix) {
    const m = matrix.length, n = matrix[0].length;
    // prefix[r][c] = sum of all elements in rectangle (0,0) to (r-1, c-1)
    this.prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let r = 1; r <= m; r++) {
      for (let c = 1; c <= n; c++) {
        this.prefix[r][c] = matrix[r - 1][c - 1]  // current cell
          + this.prefix[r - 1][c]                  // row above
          + this.prefix[r][c - 1]                  // column to left
          - this.prefix[r - 1][c - 1];             // subtract corner counted twice
      }
    }
  }

  // Sum of rectangle from (r1,c1) to (r2,c2) inclusive — O(1)
  sumRegion(r1, c1, r2, c2) {
    return this.prefix[r2 + 1][c2 + 1]   // full rectangle
      - this.prefix[r1][c2 + 1]           // remove top
      - this.prefix[r2 + 1][c1]           // remove left
      + this.prefix[r1][c1];              // add back top-left (double-subtracted)
  }
}

// Usage
const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
];
const nm = new NumMatrix(matrix);
nm.sumRegion(2, 1, 4, 3); // → 8 (rectangle rows 2-4, cols 1-3)
nm.sumRegion(1, 1, 2, 2); // → 11`}
      </CodeBlock>

      <SectionHeader number={6} title="Common Interview Problems Using Prefix Sums" />
      <KeyPointsGrid items={[
        { title: 'Range sum queries (Static)', description: 'Build a prefix array once. Answer any range sum in O(1). Classic application: given an immutable array and Q queries each asking for a range sum, solve in O(n + Q) instead of O(n × Q).' },
        { title: 'Subarray sum equals k', description: 'Count subarrays with a specific target sum. Use prefix sum + HashMap for O(n). Works with negative numbers. Key LeetCode problems: #560 (Subarray Sum Equals K), #974 (Subarray Sums Divisible by K).' },
        { title: 'Equilibrium index', description: 'Find the index where the sum of elements to the left equals the sum to the right. With prefix sums: left_sum = prefix[i], right_sum = total - prefix[i+1]. O(n) solution using a single prefix scan.' },
        { title: 'Binary array range queries', description: 'Count the number of 1s in a range of a binary array. Build prefix counts: count[i] = number of 1s in arr[0..i-1]. Range count = count[r+1] - count[l]. Used in problems involving ranges of on/off values.' },
        { title: 'Minimum operations to balance array', description: 'Given target values, use prefix sums to find the minimum number of operations to make all elements equal. Difference arrays (inverse of prefix sums) efficiently apply range updates.' },
        { title: 'Product array except self', description: 'LeetCode #238: compute the product of all array elements except the current index without division. Solve with a prefix product array (left products) and a suffix product scan — same pattern as prefix sums but with multiplication.' },
      ]} />

      <AlertBox type="tip" title="Difference array — the inverse of prefix sum">
        The difference array is the inverse operation: it enables O(1) range updates and O(n) reconstruction.
        While prefix sum allows fast range queries, the difference array allows fast range updates.
        If you need to add value v to all elements in range [l, r]: diff[l] += v; diff[r+1] -= v.
        Then reconstruct with a prefix sum of the difference array. Often tested alongside prefix sums in interviews.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'When should I use prefix sum vs sliding window?',
          answer: 'Prefix sum: when you need range sum queries on a static array, or when the subarray constraint is an equality (sum equals exactly k). The prefix+HashMap pattern is essential for counting problems. Sliding window: when the constraint is inequality-based ("at most k", "longest subarray with sum ≤ k") and all elements are non-negative. For negative elements with inequality constraints, neither technique works directly — you may need a deque or segment tree.',
        },
        {
          question: 'Does prefix sum work with negative numbers?',
          answer: 'Yes — prefix sums work with any integers: positive, negative, or zero. The "subarray sum equals k" pattern with HashMap handles negative numbers correctly because the mathematical identity (prefix[j] - prefix[i] = k) works for any integers. The sliding window technique does NOT work with negative numbers for sum problems because shrinking the window can increase or decrease the sum unpredictably.',
        },
        {
          question: 'What is a difference array and how does it relate to prefix sums?',
          answer: 'A difference array enables O(1) range updates (add a constant to all elements in [l, r]) followed by O(n) reconstruction. Prefix sum = fast range query on static array. Difference array = fast range update with deferred reconstruction. They are mathematical inverses: the prefix sum of a difference array reconstructs the original array after all updates. Use difference arrays when you have many range update operations followed by a single read-all operation.',
        },
        {
          question: 'How does the prefix+HashMap pattern work for "subarray sum equals k"?',
          answer: 'The key insight: if the running prefix sum at index j minus the prefix sum at index i equals k (prefix[j] - prefix[i] = k), then the subarray from i to j-1 sums to k. Rearranged: we look for prefix[i] = prefix[j] - k in the HashMap. For every index j, check if (currentSum - k) has been seen before as a prefix sum — the number of times it was seen equals the number of valid subarrays ending at j. Map<prefixSum, frequency> tracks all prefix sums seen so far.',
        },
        {
          question: 'Is there an O(1) space prefix sum approach?',
          answer: 'For range sum queries, you need O(n) extra space to store the prefix array. You can compute prefix sums in-place by modifying the original array, but this destroys the original data. For problems that don\'t require the original array after the prefix computation, in-place modification works. For problems where you need both the original and prefix values, the O(n) space is unavoidable.',
        },
        {
          question: 'What is the difference between 0-indexed and 1-indexed prefix arrays?',
          answer: 'The convention in this guide uses a 1-indexed prefix array with one extra leading zero: prefix[0] = 0, prefix[i] = sum of arr[0..i-1]. This makes the range sum formula: prefix[r+1] - prefix[l]. Some implementations use 0-indexed prefix arrays where prefix[i] = sum of arr[0..i], leading to the formula: prefix[r] - (l > 0 ? prefix[l-1] : 0) with a special case for l=0. The 1-indexed version with leading zero is cleaner and avoids edge cases.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
