'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsTwoPointerTechniqueExplainedForBeginnersClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Two Pointer Technique Explained for Beginners — With Code Examples</h1>
      <p className="lead">
        The two pointer technique uses two index variables moving through an array to solve problems
        in O(n) that would otherwise take O(n²). It's one of the most essential patterns for
        sorted arrays, linked lists, and string problems.
      </p>

      <StatGrid stats={[
        { value: 'O(n)', label: 'from O(n²) with two loops', color: 'green' },
        { value: '3 variants', label: 'opposite ends, same direction, fast/slow', color: 'blue' },
        { value: 'Sorted', label: 'usually requires sorted input', color: 'amber' },
        { value: 'Top 5', label: 'most asked interview patterns', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Variant 1 — Opposite Ends (Converging)" />
      <QuickFact>
        Place one pointer at the start, one at the end. Move them toward each other based on a condition.
        When they meet, you've processed the entire array in O(n) with O(1) space.
      </QuickFact>

      <CodeBlock language="javascript" filename="Two Sum on Sorted Array">
{`// O(n²) brute force — two nested loops
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}

// O(n) two pointer — works on sorted array
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    else if (sum < target) left++;  // need bigger sum → move left right
    else right--;                   // need smaller sum → move right left
  }

  return [];
}

twoSumSorted([2, 7, 11, 15], 9); // → [0, 1] (2 + 7 = 9)`}
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
isPalindrome("race a car"); // → false`}
      </CodeBlock>

      <SectionHeader number={2} title="Variant 2 — Same Direction (Fast/Slow)" />
      <p>
        Both pointers move in the same direction but at different speeds or with different conditions.
        The fast pointer explores ahead; the slow pointer marks the "valid" boundary.
      </p>

      <CodeBlock language="javascript" filename="Remove Duplicates from Sorted Array">
{`function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // boundary of unique elements

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast]; // overwrite with new unique value
    }
  }

  return slow + 1; // length of unique portion
}

const arr = [1,1,2,3,3,4];
const len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // → [1, 2, 3, 4]`}
      </CodeBlock>

      <SectionHeader number={3} title="Variant 3 — Fast/Slow (Floyd's Cycle Detection)" />
      <CodeBlock language="javascript" filename="Detect Cycle in Linked List">
{`function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;        // 1 step
    fast = fast.next.next;   // 2 steps

    if (slow === fast) return true; // met → cycle exists
  }

  return false; // fast reached end → no cycle
}

// Find cycle start (Floyd's part 2)
function detectCycleStart(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  // Reset slow to head, keep fast at meeting point
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next; // same speed now
  }
  return slow; // cycle start
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Container With Most Water — Classic" />
      <CodeBlock language="javascript" filename="Container With Most Water">
{`// height = array of vertical lines. Find two lines that hold max water.
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    maxWater = Math.max(maxWater, h * w);

    // Move the shorter line inward (hoping to find a taller one)
    if (height[left] < height[right]) left++;
    else right--;
  }

  return maxWater;
}

maxArea([1,8,6,2,5,4,8,3,7]); // → 49`}
      </CodeBlock>

      <SectionHeader number={5} title="Three Sum — Extending Two Pointers" />
      <CodeBlock language="javascript" filename="Three Sum — Sort + Two Pointer">
{`function threeSum(nums) {
  nums.sort((a, b) => a - b); // sort first
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue; // skip duplicates

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (nums[left] === nums[left+1]) left++;   // skip dups
        while (nums[right] === nums[right-1]) right--; // skip dups
        left++; right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

threeSum([-1, 0, 1, 2, -1, -4]); // → [[-1,-1,2],[-1,0,1]]`}
      </CodeBlock>

      <SectionHeader number={6} title="When to Use Two Pointers" />
      <KeyPointsGrid columns={2} items={[
        { title: '✅ Perfect for', description: 'Sorted arrays (two sum, three sum). In-place array manipulation (remove duplicates). Palindrome checking. Linked list cycle detection.' },
        { title: '❌ Not suitable', description: 'Unsorted arrays where order matters. Problems requiring non-contiguous pairs. When you need all pairs (need O(n²) anyway).' },
        { title: 'Sorting trick', description: 'Many two-pointer problems sort the input first (O(n log n)) to enable the two-pointer O(n) pass. Total: O(n log n).' },
        { title: 'Space advantage', description: 'Two pointers typically use O(1) extra space — just index variables. vs O(n) for hash map approaches.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between two pointers and sliding window?',
          answer: 'Sliding window is a specialized two-pointer technique for contiguous subarrays/substrings. Two pointers is broader: it includes converging pointers from both ends, fast/slow cycle detection, and the sliding window pattern. All sliding window is two pointers; not all two pointers is sliding window.',
        },
        {
          question: 'Does two pointers require sorted input?',
          answer: 'Not always. Cycle detection (fast/slow) works on unsorted linked lists. Remove duplicates in-place works on sorted arrays. Palindrome check works on any string. The "sum" problems (two sum, three sum, container with water) typically need sorted input for the converging approach to work.',
        },
        {
          question: 'Why does moving the shorter line inward work in Container With Most Water?',
          answer: 'The water volume is min(height[left], height[right]) × (right-left). If we move the taller line, the width decreases AND the height can only stay the same or decrease (min can\'t exceed the shorter line). Moving the shorter line gives us a chance to find a taller one that compensates.',
        },
        {
          question: 'How do I identify a two-pointer problem?',
          answer: 'Key signals: "find a pair/triplet with sum X", "sorted array", "palindrome", "remove duplicates in-place", "detect cycle", "find start/end of subarray". Anytime you\'re trying to eliminate a full nested loop by exploiting sorted order or a mathematical property.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
