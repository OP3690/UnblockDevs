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
        converts O(n) range sum queries into O(1). Precompute once, answer any range sum in constant time.
        This guide covers 1D and 2D prefix sums with interview applications.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'range sum query after O(n) build', color: 'green' },
        { value: 'O(n)', label: 'precomputation time and space', color: 'blue' },
        { value: '2D', label: 'prefix sum works on matrices too', color: 'purple' },
        { value: 'HashMap', label: 'combine with map for subarray problems', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact>
        prefix[i] = sum of all elements from index 0 to i.
        Range sum from index l to r = prefix[r] - prefix[l-1].
        Precompute once in O(n). Answer any range sum in O(1).
      </QuickFact>

      <ErrorFix
        bad={`// O(n) per query — recalculates every time
function rangeSum(arr, l, r) {
  let sum = 0;
  for (let i = l; i <= r; i++) sum += arr[i]; // O(n) every call
  return sum;
}
// 1000 queries on array of 1000 = 1M operations`}
        good={`// O(n) once, then O(1) per query
function buildPrefix(arr) {
  const prefix = [0]; // prefix[0] = 0 (empty prefix)
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l]; // O(1)
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const prefix = buildPrefix(arr);
rangeSum(prefix, 2, 5); // sum of arr[2..5] = 4+1+5+9 = 19
// 1000 queries = 1000 + 1000 = 2000 operations`}
        badLabel="O(n) per query"
        goodLabel="O(1) per query with prefix sum"
      />

      <SectionHeader number={2} title="Step-by-Step Example" />
      <CodeBlock language="javascript" filename="Prefix Sum Walkthrough">
{`const arr     = [3,  1,  4,  1,  5,  9,  2,  6];
// indices:       0   1   2   3   4   5   6   7

const prefix  = [0,  3,  4,  8,  9, 14, 23, 25, 31];
// prefix[i] = sum of arr[0..i-1]
// prefix[0] = 0 (empty)
// prefix[1] = arr[0] = 3
// prefix[2] = arr[0]+arr[1] = 4
// prefix[5] = arr[0..3] = 3+1+4+1 = 9

// Range sum query: sum of arr[2..5]?
// = prefix[6] - prefix[2]
// = 23 - 4
// = 19  ✅ (4 + 1 + 5 + 9 = 19)`}
      </CodeBlock>

      <SectionHeader number={3} title="Subarray Sum Equals K — Prefix + HashMap" />
      <p>
        The most powerful prefix sum pattern: combine with a HashMap to count subarrays with a target sum in O(n).
      </p>

      <CodeBlock language="javascript" filename="Subarray Sum Equals K (LeetCode #560)">
{`function subarraySum(nums, k) {
  // prefixCount[sum] = how many times we've seen this prefix sum
  const prefixCount = new Map([[0, 1]]); // empty prefix has sum 0
  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    // If (prefixSum - k) was seen before, there's a subarray summing to k
    if (prefixCount.has(prefixSum - k)) {
      count += prefixCount.get(prefixSum - k);
    }

    prefixCount.set(prefixSum, (prefixCount.get(prefixSum) || 0) + 1);
  }

  return count;
}

subarraySum([1, 1, 1], 2); // → 2 (two subarrays [1,1] sum to 2)
subarraySum([1, 2, 3], 3); // → 2 ([1,2] and [3])`}
      </CodeBlock>

      <SectionHeader number={4} title="2D Prefix Sum — Matrix Range Sum" />
      <CodeBlock language="javascript" filename="2D Prefix Sum">
{`class NumMatrix {
  constructor(matrix) {
    const m = matrix.length, n = matrix[0].length;
    this.prefix = Array.from({length: m+1}, () => new Array(n+1).fill(0));

    for (let r = 1; r <= m; r++) {
      for (let c = 1; c <= n; c++) {
        this.prefix[r][c] = matrix[r-1][c-1]
          + this.prefix[r-1][c]
          + this.prefix[r][c-1]
          - this.prefix[r-1][c-1]; // subtract double-counted corner
      }
    }
  }

  // Sum of rectangle (r1,c1) to (r2,c2) in O(1)
  sumRegion(r1, c1, r2, c2) {
    return this.prefix[r2+1][c2+1]
      - this.prefix[r1][c2+1]
      - this.prefix[r2+1][c1]
      + this.prefix[r1][c1]; // add back double-subtracted corner
  }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Common Applications" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Range sum queries', description: 'Answer many sum queries on static arrays efficiently. Build once, query in O(1).' },
        { title: 'Subarray sum = k', description: 'Count subarrays with a specific sum. Prefix sum + HashMap = O(n).' },
        { title: 'Equilibrium index', description: 'Find index where left sum equals right sum. prefix[i] = total - prefix[i+1].' },
        { title: 'Max subarray sum', description: 'Kadane\'s algorithm can be viewed as a prefix sum variant: track minimum prefix seen so far.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'When should I use prefix sum vs sliding window?',
          answer: 'Prefix sum: when you need range sum queries on a static array, or when the subarray constraint is "equals k" (fixed target). Sliding window: when the constraint is inequality-based ("at most k", "maximum", "minimum") and the window expands/contracts based on a condition.',
        },
        {
          question: 'Does prefix sum work with negative numbers?',
          answer: 'Yes — prefix sum works with any integers (positive, negative, zero). The "subarray sum equals k" problem with HashMap works for negative numbers too. The "maximum subarray" problem (Kadane\'s) also handles negatives.',
        },
        {
          question: 'What is a difference array (reverse of prefix sum)?',
          answer: 'A difference array allows O(1) range updates (add value to range [l,r]) and O(n) final reconstruction. Prefix sum = fast range query. Difference array = fast range update. They are inverses of each other.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
