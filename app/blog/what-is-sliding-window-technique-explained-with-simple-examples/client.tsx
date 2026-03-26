'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Sliding Window Technique Explained With Simple Examples</h1>
      <p className="lead">
        The sliding window technique converts O(n²) brute-force solutions into O(n) by maintaining a
        "window" of elements and updating it incrementally instead of recomputing from scratch.
        It's one of the most frequently asked patterns in coding interviews.
      </p>

      <StatGrid stats={[
        { value: 'O(n)', label: 'from O(n²) or O(n·k)', color: 'green' },
        { value: '2 types', label: 'fixed window & variable window', color: 'blue' },
        { value: 'Top 10', label: 'most common interview patterns', color: 'purple' },
        { value: 'Arrays+Strings', label: 'primary use cases', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact>
        Imagine a train window. As the train moves, you don't look at a new scene from scratch —
        the old scene slides out and a new scene slides in. The sliding window does the same with arrays:
        add a new element on the right, remove the old element on the left.
      </QuickFact>

      <SectionHeader number={2} title="Fixed-Size Sliding Window" />
      <p>Window size k is constant. Slide one step at a time: add new right element, remove old left element.</p>

      <ErrorFix
        bad={`// O(n·k) brute force: recompute sum for every window
function maxSumSubarrayBrute(arr, k) {
  let maxSum = -Infinity;
  for (let i = 0; i <= arr.length - k; i++) {
    let windowSum = 0;
    for (let j = i; j < i + k; j++) {  // O(k) per window
      windowSum += arr[j];
    }
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`}
        good={`// O(n) sliding window: add right, subtract left
function maxSumSubarray(arr, k) {
  let windowSum = 0;

  // Compute first window sum
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;

  // Slide window: add new right, remove old left
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];   // O(1) per step
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

maxSumSubarray([2, 1, 5, 1, 3, 2], 3); // → 9 ([5,1,3])`}
        badLabel="O(n·k) brute force"
        goodLabel="O(n) sliding window"
      />

      <SectionHeader number={3} title="Variable-Size Sliding Window" />
      <p>
        Window size grows or shrinks based on a condition. Use two pointers (<code>left</code> and <code>right</code>)
        to define the window boundaries.
      </p>

      <CodeBlock language="javascript" filename="Longest Substring Without Repeating Characters">
{`function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window from left until no duplicate
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

lengthOfLongestSubstring("abcabcbb"); // → 3 ("abc")
lengthOfLongestSubstring("pwwkew");   // → 3 ("wke")`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Minimum Window Substring">
{`function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let have = 0, required = Object.keys(need).length;
  const window = {};
  let res = '';
  let minLen = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;
    if (need[c] && window[c] === need[c]) have++;

    // Shrink from left when all chars satisfied
    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        res = s.slice(left, right + 1);
      }
      window[s[left]]--;
      if (need[s[left]] && window[s[left]] < need[s[left]]) have--;
      left++;
    }
  }

  return res;
}

minWindow("ADOBECODEBANC", "ABC"); // → "BANC"`}
      </CodeBlock>

      <SectionHeader number={4} title="The Template" />
      <CodeBlock language="javascript" filename="Sliding Window Template">
{`function slidingWindowTemplate(arr, k /* or condition */) {
  let left = 0;
  let windowState = /* e.g., sum = 0, map = {}, set = new Set() */;
  let result = /* maxLen / minLen / count */;

  for (let right = 0; right < arr.length; right++) {
    // 1. Expand: add arr[right] to window
    // windowState += arr[right]; OR windowState.add(arr[right]);

    // 2. Shrink (for variable window: while condition violated)
    //    OR fixed window: if (right - left + 1 === k) { shrink once }
    while (/* window invalid */) {
      // Remove arr[left] from window
      left++;
    }

    // 3. Update result
    // result = Math.max(result, right - left + 1);
  }

  return result;
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Common Sliding Window Problems" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Max sum subarray of size k', description: 'Fixed window. Classic intro problem.' },
        { title: 'Longest substring without repeating', description: 'Variable window with Set. LeetCode #3.' },
        { title: 'Minimum window substring', description: 'Variable window with character frequency map. LeetCode #76.' },
        { title: 'Sliding window maximum', description: 'Fixed window — use a monotonic deque for O(n). LeetCode #239.' },
        { title: 'Fruit into baskets / At most K distinct', description: 'Variable window with hashmap frequency count.' },
        { title: 'Permutation in string', description: 'Fixed window — check if window matches target character counts.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'When should I use sliding window vs two pointers?',
          answer: 'Sliding window is a specialized two-pointer technique. Two pointers is a broader concept (also used for sorted array problems, palindromes). Sliding window specifically refers to maintaining a contiguous subarray/substring and updating window boundaries. If you\'re working with a contiguous subarray/substring — sliding window. If pointers can be non-adjacent — two pointers.',
        },
        {
          question: 'How do I know when to shrink the window?',
          answer: 'In variable-size sliding window: shrink when the window violates the constraint (e.g., has duplicates, exceeds k distinct characters). In fixed-size: shrink exactly when window reaches size k (one element added = one removed).',
        },
        {
          question: 'What is a monotonic deque and why is it used with sliding window?',
          answer: 'A monotonic deque maintains elements in increasing (or decreasing) order. For "sliding window maximum" — you want the max of each window in O(1). The deque stores indices and removes elements that can\'t be the max (smaller elements behind the current one). This gives O(n) overall instead of O(n·k).',
        },
        {
          question: 'Can sliding window be used on 2D arrays?',
          answer: 'Yes — 2D sliding window exists. Fix one dimension (e.g., row range) and slide the column boundary. Used for: max sum rectangle in a 2D array. Time complexity becomes O(n² × m) for an n×m matrix.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
