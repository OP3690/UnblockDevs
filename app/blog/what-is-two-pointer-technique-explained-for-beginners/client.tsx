'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhatIsTwoPointerTechniqueExplainedForBeginnersClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Two Pointer Technique Explained for Beginners — With Code Examples</h1>
      <p className="lead">
        The two pointer technique uses two index variables moving through an array to solve problems
        in O(n) that would otherwise take O(n²). It's one of the most essential patterns for
        sorted arrays, linked lists, and string problems — and one of the top 5 patterns tested
        in coding interviews. This guide covers all three variants with complete examples.
      </p>

      <StatGrid stats={[
        { value: 'O(n)', label: 'from O(n²) with two nested loops', color: 'green' },
        { value: '3 variants', label: 'opposite ends, same direction, fast/slow', color: 'blue' },
        { value: 'Sorted', label: 'usually requires sorted input', color: 'amber' },
        { value: 'Top 5', label: 'most asked interview patterns', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact color="blue" label="Why two pointers work">
        Instead of checking every pair with two nested loops (O(n²)), two pointers exploit sorted order
        or mathematical properties to eliminate candidates without checking them. When the sum of two
        elements is too large, you don't need to check all pairs with the larger element — just move
        the right pointer left. This insight reduces O(n²) to O(n).
      </QuickFact>

      <CompareTable
        leftLabel="Approach"
        rightLabel="Complexity"
        rows={[
          { label: 'Brute force (nested loops)', left: 'Check all pairs: O(n²) time, O(1) space', right: 'Two nested for loops — 1000 elements = 1M checks' },
          { label: 'Hash map', left: 'O(n) time, O(n) space', right: 'Fast but uses extra memory for the hash table' },
          { label: 'Two pointers', left: 'O(n) time, O(1) space', right: 'Best: linear time with no extra memory — requires sorted input' },
          { label: 'Sorting + two pointers', left: 'O(n log n) time, O(1) space', right: 'Sort first, then two-pointer pass — works for unsorted input' },
        ]}
      />

      <SectionHeader number={2} title="Variant 1 — Opposite Ends (Converging Pointers)" />
      <p>
        Place one pointer at the start, one at the end. Move them toward each other based on a condition.
        When they meet, you've processed the entire array in O(n) with O(1) space.
      </p>

      <CodeBlock language="javascript" filename="Two Sum on Sorted Array — the canonical example">
{`// O(n²) brute force — two nested loops
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}
// 1000 elements → up to 500,000 iterations

// O(n) two pointer — works on SORTED array
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    else if (sum < target) left++;   // sum too small → move left pointer right
    else right--;                     // sum too big → move right pointer left
  }

  return []; // no pair found
}

// Key insight: when sum < target, we know nums[left] + anything_to_left_of_right
// is also too small — so we can skip those without checking.

twoSumSorted([2, 7, 11, 15], 9);  // → [0, 1]  (2 + 7 = 9)
twoSumSorted([1, 2, 3, 4, 6], 6); // → [1, 3]  (2 + 4 = 6)`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Palindrome Check — Two Pointers">
{`function isPalindrome(s) {
  // Clean: only alphanumeric, lowercase
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}

isPalindrome("A man, a plan, a canal: Panama"); // → true
isPalindrome("race a car");                       // → false
isPalindrome("Was it a car or a cat I saw?");    // → true

// Variation: longest palindromic substring uses "expand from center" two pointers
function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return s.substring(left + 1, right); // last valid palindrome
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Variant 2 — Same Direction (Fast/Slow Read-Write)" />
      <p>
        Both pointers move in the same direction but at different speeds or with different conditions.
        The fast pointer explores ahead; the slow pointer marks the "valid" or "written" boundary.
      </p>

      <CodeBlock language="javascript" filename="Remove Duplicates from Sorted Array — LeetCode 26">
{`function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // boundary of the unique portion (write pointer)

  for (let fast = 1; fast < nums.length; fast++) {
    // fast scans ahead; when it finds a new unique value...
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast]; // ...write it to the slow position
    }
  }

  return slow + 1; // length of the unique portion
}

const arr = [1,1,2,3,3,4];
const len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // → [1, 2, 3, 4]

// Same pattern: Remove Element (LeetCode 27)
function removeElement(nums, val) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast];
    }
  }
  return slow; // count of non-val elements
}

removeElement([3,2,2,3], 3); // → 2, array is [2,2,_,_]`}
      </CodeBlock>

      <SectionHeader number={4} title="Variant 3 — Fast/Slow (Floyd's Cycle Detection)" />
      <CodeBlock language="javascript" filename="Detect Cycle in Linked List — Floyd's Algorithm">
{`// Floyd's tortoise and hare algorithm
// Slow moves 1 step, fast moves 2 steps
// If there's a cycle, they must eventually meet

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;        // 1 step (tortoise)
    fast = fast.next.next;   // 2 steps (hare)

    if (slow === fast) return true; // they met → cycle exists
  }

  return false; // fast reached end → no cycle (linear list)
}

// Part 2: Find WHERE the cycle starts (not just if it exists)
function detectCycleStart(head) {
  let slow = head, fast = head;

  // Phase 1: find meeting point inside cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null; // no cycle

  // Phase 2: reset slow to head, advance both at same speed
  // They meet exactly at the cycle start — mathematical proof exists
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next; // same speed now
  }
  return slow; // cycle start node

}

// Other fast/slow applications:
// - Find middle of linked list (slow lands at middle when fast reaches end)
// - Find nth node from end (advance fast n steps first, then move both)`}
      </CodeBlock>

      <SectionHeader number={5} title="Container With Most Water — Classic Interview Problem" />
      <CodeBlock language="javascript" filename="Container With Most Water — LeetCode 11">
{`// height = array of vertical wall heights.
// Find two walls that maximize the water container area.

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]); // min = limiting wall
    const w = right - left;                           // width between walls
    maxWater = Math.max(maxWater, h * w);

    // Key insight: move the shorter wall inward
    // If we move the taller wall, width decreases AND height stays the same or worse
    // Moving the shorter wall gives a chance to find a taller wall that compensates
    if (height[left] < height[right]) left++;
    else right--;
  }

  return maxWater;
}

maxArea([1,8,6,2,5,4,8,3,7]); // → 49  (walls at index 1 and 8, h=7, w=7)
maxArea([1,1]);                  // → 1`}
      </CodeBlock>

      <SectionHeader number={6} title="Three Sum — Extending Two Pointers" />
      <CodeBlock language="javascript" filename="3Sum — Sort + Two Pointer — LeetCode 15">
{`// Find all unique triplets that sum to 0
// Key: sort first, then use two pointers for the inner loop

function threeSum(nums) {
  nums.sort((a, b) => a - b); // O(n log n)
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Optimization: if smallest possible is already > 0, no triplet possible
    if (nums[i] > 0) break;

    // Skip duplicate values for i to avoid duplicate triplets
    if (i > 0 && nums[i] === nums[i-1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for left and right pointers
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;   // need larger sum
      } else {
        right--;  // need smaller sum
      }
    }
  }

  return result;
}

threeSum([-1, 0, 1, 2, -1, -4]); // → [[-1,-1,2],[-1,0,1]]
threeSum([0, 0, 0]);               // → [[0,0,0]]`}
      </CodeBlock>

      <SectionHeader number={7} title="When to Use Two Pointers" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Perfect for', description: 'Sorted arrays (two sum, three sum). In-place array modification (remove duplicates, remove element). Palindrome checking. Linked list cycle detection. Container with most water.' },
        { title: 'Not suitable when', description: 'Array is unsorted and you can\'t sort it. Need to find all pairs (inherently O(n²)). Problem requires non-contiguous elements. Elements have complex relationships requiring the full context.' },
        { title: 'Sort + two pointer trick', description: 'Many problems sort the input first (O(n log n)) to enable the O(n) two-pointer pass. Total complexity: O(n log n) — often the best achievable for comparison-based problems.' },
        { title: 'Space advantage', description: 'Two pointers use O(1) extra space — just index variables. Hash map approaches are also O(n) time but use O(n) space. Two pointers are optimal when space matters.' },
      ]} />

      <VerticalSteps steps={[
        { title: 'Identify the pattern signals', desc: 'Sorted array, "find pair with sum X", palindrome, cycle detection, in-place modification, "find minimum window" — any of these signal two pointers.' },
        { title: 'Choose the variant', desc: 'Converging (opposite ends): pair-sum problems, palindrome. Same direction (fast/slow read-write): in-place modification, removing elements. Floyd\'s fast/slow: cycle detection, find middle.' },
        { title: 'Sort if needed', desc: 'If the array isn\'t sorted but sorting is allowed, sort first. The O(n log n) sort cost is usually worth the O(n²) → O(n) improvement in the main loop.' },
        { title: 'Handle duplicates explicitly', desc: 'For problems that require unique results (Three Sum, etc.), skip duplicate values after finding a valid answer. Missing this step gives wrong answers with duplicate elements.' },
        { title: 'Define the invariant', desc: 'Know what the left/right pointers represent at all times. For Two Sum: everything to the left of left and to the right of right has been eliminated. Maintaining this invariant prevents off-by-one errors.' },
      ]} />

      <AlertBox type="tip" title="The key interview insight examiners want to see">
        Don't just produce the working code — explain WHY moving the shorter pointer in Container With Most Water is correct. The exchange argument: moving the taller pointer can never increase the area (width decreases AND height stays bounded by the shorter wall). This type of reasoning — proving why we can safely eliminate a candidate — is what distinguishes a strong two-pointer solution from a lucky one.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between two pointers and sliding window?',
          answer: 'Sliding window is a specialized two-pointer technique specifically for contiguous subarrays or substrings. The window grows and shrinks as both pointers move in the same direction. Two pointers is broader: it includes converging pointers from both ends (palindrome, two sum), same-direction read/write (remove duplicates), fast/slow cycle detection, and the sliding window pattern. All sliding window problems use two pointers, but not all two-pointer problems are sliding window.',
        },
        {
          question: 'Does two pointers always require sorted input?',
          answer: 'No. Three variants: (1) Converging pointers for sum problems — requires sorted input to know which direction to move. (2) Same-direction read/write — works on sorted arrays (remove duplicates) but also unsorted (remove element, move zeros). (3) Floyd\'s fast/slow — works on unsorted linked lists for cycle detection and finding the middle. The sorting requirement is specifically for the converging variant where you use sorted order to eliminate candidates.',
        },
        {
          question: 'Why does moving the shorter line inward work in Container With Most Water?',
          answer: 'The water volume is min(height[left], height[right]) × (right-left). If we move the taller line inward: width decreases by 1, AND the height is still bounded by the shorter line (min can\'t improve). So the area can only stay the same or decrease — moving the taller line is guaranteed to not improve the answer. Moving the shorter line at least gives a chance of finding a taller line that compensates for the reduced width. This is an "exchange argument" proof.',
        },
        {
          question: 'How do I identify a two-pointer problem in an interview?',
          answer: 'Key signals in the problem statement: "find a pair/triplet with sum X" (converging pointers on sorted array), "sorted array" (almost always enables two pointers), "palindrome" (converge from both ends), "remove/modify in-place" (fast/slow same direction), "detect cycle" (Floyd\'s fast/slow), "find minimum window containing X" (sliding window variant), "O(1) space" constraint (rules out hash map, suggests two pointers). When you see these signals, immediately consider whether sorting the input would unlock a two-pointer solution.',
        },
        {
          question: 'Can two pointers work on 2D arrays or strings?',
          answer: 'Yes. For strings: most array two-pointer patterns translate directly (palindrome, two sum on character codes, minimum window substring). For 2D arrays: "Trapping Rain Water" uses a two-pointer approach on a 1D representation. Matrix sorting problems sometimes use two pointers per row. The key is that you still need some monotonic ordering property that lets you eliminate candidates as the pointers move.',
        },
        {
          question: 'What is the time complexity when combining sorting with two pointers?',
          answer: 'Sort: O(n log n). Two-pointer pass: O(n). Combined: O(n log n), dominated by the sort. For 3Sum: O(n log n) sort + O(n²) outer loop with O(n) inner two-pointer = O(n²) total. For 4Sum: O(n³). The pattern: kSum with two pointers runs in O(n^(k-1)) time. Sorting + two-pointer pass is O(n log n) — better than O(n²) brute force for k=2, and the standard approach for sorted input.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
