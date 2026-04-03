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
        It's one of the most frequently tested patterns in coding interviews. This guide explains
        the core intuition, covers both fixed-size and variable-size windows, provides a reusable
        template, works through the key LeetCode problems, and explains when to use sliding window
        vs prefix sums vs two pointers.
      </p>

      <StatGrid stats={[
        { value: 'O(n)', label: 'sliding window converts O(n²) brute force to linear time', color: 'green' },
        { value: '2 types', label: 'fixed-size window and variable-size window', color: 'blue' },
        { value: 'Top 10', label: 'one of the most common patterns in coding interviews', color: 'purple' },
        { value: 'Arrays+Strings', label: 'primary data structures where sliding window applies', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Intuition" />
      <p>
        The key insight behind sliding window: instead of recalculating the entire subarray/substring
        for every position, maintain a "window" that slides through the data. When the window moves
        one step right, you only do two operations: add the new element entering from the right, and
        remove the element leaving from the left.
      </p>
      <QuickFact color="blue" label="The sliding window analogy">
        Imagine looking through a train window. As the train moves, you don't see a completely new
        scene from scratch — the old scene slides out from one edge and a new scene slides in on the other.
        The sliding window algorithm does the same with arrays: add a new element on the right,
        remove the old element on the left. Only O(1) work per step instead of O(k) for a window of size k.
      </QuickFact>

      <SectionHeader number={2} title="Fixed-Size vs Variable-Size Windows" />
      <CompareTable
        leftLabel="Fixed-Size Window"
        rightLabel="Variable-Size Window"
        rows={[
          { label: 'Window size', left: 'Constant k — doesn\'t change', right: 'Grows and shrinks based on a condition' },
          { label: 'Complexity', left: 'O(n) — one pass, one shrink per expand', right: 'O(n) — each element enters and leaves at most once' },
          { label: 'Pointers', left: 'Can use single right pointer + left = right - k', right: 'Two pointers: left and right, move independently' },
          { label: 'Condition', left: 'Shrink when: window size > k', right: 'Shrink when: window violates constraint (duplicates, sum too large, etc.)' },
          { label: 'Examples', left: 'Max sum subarray of size k, Permutation in string', right: 'Longest substring without repeating, Minimum window substring' },
        ]}
      />

      <SectionHeader number={3} title="Fixed-Size Sliding Window — Explained Step by Step" />
      <p>
        Window size k is constant. Slide one step at a time: add the new right element, remove the
        old left element. This gives O(1) per step instead of O(k) for brute force.
      </p>
      <ErrorFix
        title="Maximum sum subarray of size k — O(n·k) to O(n)"
        bad={`// O(n·k) brute force: recompute sum for every window from scratch
function maxSumSubarrayBrute(arr, k) {
  let maxSum = -Infinity;
  for (let i = 0; i <= arr.length - k; i++) {
    let windowSum = 0;
    for (let j = i; j < i + k; j++) {  // O(k) per window position
      windowSum += arr[j];
    }
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
// For n=1000, k=100: ~100,000 operations`}
        good={`// O(n) sliding window: update sum incrementally
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;

  // Compute first window sum (positions 0 to k-1)
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;

  // Slide: for each new right element, add it and remove the leftmost
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i];      // add new element entering from right
    windowSum -= arr[i - k];  // remove old element leaving from left
    maxSum = Math.max(maxSum, windowSum);  // O(1) per step!
  }

  return maxSum;
}

// Example walkthrough:
// arr = [2, 1, 5, 1, 3, 2], k = 3
// Window [2,1,5]: sum=8
// Slide → Window [1,5,1]: sum = 8 + 1 - 2 = 7
// Slide → Window [5,1,3]: sum = 7 + 3 - 1 = 9 ← max
// Slide → Window [1,3,2]: sum = 9 + 2 - 5 = 6
// Result: 9

maxSumSubarray([2, 1, 5, 1, 3, 2], 3); // → 9`}
        badLabel="O(n·k) — recalculate sum for every window"
        goodLabel="O(n) — update incrementally: +right, -left"
      />

      <SectionHeader number={4} title="Variable-Size Sliding Window — Two Pointer Approach" />
      <p>
        The window size grows and shrinks based on a constraint. Use two pointers (<code>left</code> and
        <code>right</code>) to define window boundaries. The right pointer always advances. The left
        pointer advances only to fix constraint violations.
      </p>
      <CodeBlock lang="javascript" title="Longest Substring Without Repeating Characters — LeetCode #3">
{`// O(n) variable window: expand right, shrink left when duplicate found
function lengthOfLongestSubstring(s) {
  const charSet = new Set();  // tracks characters currently in window
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window from left until the character at 'right' is no longer a duplicate
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);  // remove leftmost character
      left++;                   // shrink window from left
    }

    charSet.add(s[right]);                         // add new right character
    maxLen = Math.max(maxLen, right - left + 1);   // update max window size
  }

  return maxLen;
}

// Example walkthrough: "abcabcbb"
// right=0: add 'a' → window=["a"], maxLen=1
// right=1: add 'b' → window=["a","b"], maxLen=2
// right=2: add 'c' → window=["a","b","c"], maxLen=3
// right=3: 'a' is in set → remove 'a', left=1 → window=["b","c"] → add 'a', maxLen=3
// right=4: 'b' is in set → remove 'b', left=2 → window=["c","a"] → add 'b', maxLen=3
// ... continues, max stays 3
// Result: 3 ("abc")

lengthOfLongestSubstring("abcabcbb"); // → 3
lengthOfLongestSubstring("pwwkew");   // → 3 ("wke")
lengthOfLongestSubstring("bbbbb");    // → 1`}
      </CodeBlock>
      <CodeBlock lang="javascript" title="Minimum Window Substring — LeetCode #76">
{`// O(n) — expand right until all chars found, then shrink left as much as possible
function minWindow(s, t) {
  // Count required characters from target t
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let have = 0;                         // characters in window matching need count
  const required = Object.keys(need).length;  // distinct chars needed
  const window = {};                    // current window character counts
  let minLen = Infinity;
  let res = '';
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // Expand: add s[right] to window
    const c = s[right];
    window[c] = (window[c] || 0) + 1;
    if (need[c] && window[c] === need[c]) have++;  // satisfied one more requirement

    // Shrink from left while all requirements are satisfied
    while (have === required) {
      // Update result if current window is smaller
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        res = s.slice(left, right + 1);
      }
      // Remove s[left] from window and slide left pointer
      window[s[left]]--;
      if (need[s[left]] && window[s[left]] < need[s[left]]) have--;
      left++;
    }
  }

  return res;
}

minWindow("ADOBECODEBANC", "ABC"); // → "BANC"
minWindow("a", "a");               // → "a"
minWindow("a", "aa");              // → "" (impossible)`}
      </CodeBlock>

      <SectionHeader number={5} title="The Sliding Window Template" />
      <CodeBlock lang="javascript" title="Reusable template for both fixed and variable windows">
{`// ─── Template: Variable-size sliding window ──────────────────────────────────
function slidingWindowTemplate(arr) {
  let left = 0;

  // Window state — customize based on problem:
  let windowSum = 0;       // for sum-based problems
  // let windowCount = {};  // for frequency-based problems
  // let windowSet = new Set(); // for uniqueness problems

  let result = 0;  // or -Infinity, Infinity, '' depending on problem

  for (let right = 0; right < arr.length; right++) {
    // STEP 1: Expand window — add arr[right]
    windowSum += arr[right];  // or windowCount[arr[right]]++ etc.

    // STEP 2: Shrink window while constraint is violated
    while (/* window is invalid — customize condition */) {
      // Remove arr[left] from window state
      windowSum -= arr[left];  // or windowCount[arr[left]]-- etc.
      left++;  // shrink from left
    }

    // STEP 3: Update result (window is now valid)
    result = Math.max(result, right - left + 1);  // or windowSum, count, etc.
  }

  return result;
}

// ─── Template: Fixed-size window of size k ────────────────────────────────────
function fixedSlidingWindow(arr, k) {
  // Build first window
  let windowState = /* sum, map, set of arr[0..k-1] */;

  // Initial result from first window
  let result = /* process first window */;

  for (let right = k; right < arr.length; right++) {
    // Add new right element
    // windowState += arr[right];  or add arr[right] to map/set

    // Remove leftmost element (always arr[right - k] for fixed window)
    // windowState -= arr[right - k];  or remove arr[right - k] from map/set

    // Update result
    // result = Math.max(result, windowState);
  }

  return result;
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Common Sliding Window Interview Problems" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Max sum subarray of size k (LeetCode #643)', description: 'Fixed window. Classic intro problem. Add right, subtract left, track max. O(n) time, O(1) space. Good starting problem for understanding the pattern.' },
        { title: 'Longest substring without repeating (LeetCode #3)', description: 'Variable window with Set for uniqueness. Expand until duplicate, shrink from left to remove it. Very commonly asked in FAANG interviews.' },
        { title: 'Minimum window substring (LeetCode #76)', description: 'Variable window with character frequency map. Expand until all target chars included, shrink to find minimum. Hard difficulty — master this for top-tier interviews.' },
        { title: 'Sliding window maximum (LeetCode #239)', description: 'Fixed window — but needs a monotonic deque for O(1) max queries, giving O(n) overall. Hard difficulty. Deque stores indices in decreasing value order.' },
        { title: 'Fruit Into Baskets / At most K distinct (LeetCode #904)', description: 'Variable window — at most K distinct elements. HashMap frequency count. Shrink from left when distinct count exceeds K. Classic interview variant.' },
        { title: 'Permutation in string (LeetCode #567)', description: 'Fixed window — window of length t. Check if window\'s character frequencies match t\'s frequencies. Use character count array (26 elements for lowercase).' },
      ]} />

      <AlertBox type="tip" title="When to use sliding window vs prefix sum vs two pointers">
        Use sliding window when: working with contiguous subarray/substring, the condition is
        inequality-based (sum ≤ k, at most k distinct), and elements are non-negative (for sum problems).
        Use prefix sum when: equality condition (sum equals exactly k), need to count subarrays,
        or elements can be negative. Use general two pointers when: sorted array, palindrome checking,
        or pointers are not required to be adjacent/contiguous.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'When should I use sliding window vs two pointers?',
          answer: 'Sliding window is a specialized two-pointer technique applied to contiguous subarrays/substrings. The two pointers always define a window that includes everything between them. Two pointers is a broader pattern that also includes: sorted array problems (pairs that sum to target), palindrome checking (pointers from both ends), and problems where pointers can be non-adjacent. If the problem is about a contiguous subarray or substring with a constraint, it\'s probably sliding window.',
        },
        {
          question: 'How do I know when to shrink the variable window?',
          answer: 'Shrink the window when it violates the constraint you\'re maintaining. The constraint is the key to the problem: duplicates in the window → shrink until no duplicates. Sum exceeds max → shrink until sum is within limit. More than K distinct elements → shrink until K or fewer distinct. The while condition for shrinking should be the exact opposite of what makes the window "valid". For fixed-size windows: shrink (remove exactly one element) when window size exceeds k.',
        },
        {
          question: 'What is a monotonic deque and why is it used with sliding window?',
          answer: 'A monotonic deque (double-ended queue) maintains elements in increasing or decreasing order. For "sliding window maximum" (LeetCode #239), you want the maximum of each window in O(1). The deque stores indices in decreasing order of their values — the front always holds the index of the current window\'s maximum. When the right pointer advances: remove elements from the back that are smaller than the new element (they can\'t be the max). When the left pointer advances: remove from front if its index is outside the window. This gives O(n) overall.',
        },
        {
          question: 'Can sliding window work with negative numbers?',
          answer: 'For sum-based variable sliding window problems: no, sliding window requires non-negative numbers. If all elements are non-negative, adding a right element increases the sum, so you only shrink left when sum exceeds the target. With negative numbers, adding an element could decrease the sum — making it impossible to know when to shrink. For these problems, use prefix sums + HashMap instead. For fixed-size windows: negative numbers work fine because the window size is fixed regardless of values.',
        },
        {
          question: 'Can sliding window be applied to 2D arrays?',
          answer: 'Yes — 2D sliding window is used for problems like "maximum sum rectangle in a 2D matrix". The approach: fix the left and right column boundaries (outer two loops), then for each pair of columns, compress each row\'s values into a 1D array of sums, and apply Kadane\'s algorithm on that 1D array. Time complexity becomes O(n² × m) for an n×m matrix. This technique is used in LeetCode #363 (Max Sum of Rectangle No Larger Than K).',
        },
        {
          question: 'What is the difference between sliding window and Kadane\'s algorithm?',
          answer: 'Kadane\'s algorithm finds the maximum sum subarray (no size constraint) in O(n) using a greedy approach: at each position, either extend the previous subarray or start a new one. This is not typically called "sliding window" because the left boundary doesn\'t move incrementally — it resets when the running sum goes negative. The classic fixed-size sliding window (max sum of size k) is simpler: add right, remove left, no resetting. For the variable-size maximum sum subarray, Kadane\'s is more efficient than sliding window.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
