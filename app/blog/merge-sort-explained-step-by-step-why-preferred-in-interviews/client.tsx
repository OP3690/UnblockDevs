'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MergeSortExplainedStepByStepWhyPreferredInInterviewsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Merge Sort Explained Step by Step — Why It's Preferred in Interviews</h1>
      <p className="lead">
        Merge sort is the go-to sorting algorithm for interviews because it's always O(n log n),
        stable, and predictable. Unlike Quick Sort, it has no worst-case degradation. This guide
        explains the divide-and-conquer logic with a step-by-step visual walkthrough and complete code.
      </p>

      <StatGrid stats={[
        { value: 'O(n log n)', label: 'time — always, no worst case', color: 'green' },
        { value: 'O(n)', label: 'space — extra array needed', color: 'amber' },
        { value: 'Stable', label: 'preserves order of equal elements', color: 'blue' },
        { value: 'Divide & Conquer', label: 'split → sort → merge', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Idea — Divide and Conquer" />
      <QuickFact>
        Merge sort follows a simple principle: split the array in half, sort each half recursively,
        then merge the two sorted halves back together. Merging two sorted arrays is O(n) —
        that's the key insight.
      </QuickFact>

      <VerticalSteps steps={[
        {
          title: 'Divide: Split array in half',
          description: 'Keep splitting until each piece has 1 element (a single element is always sorted)',
          code: '[38,27,43,3,9,82,10] → [38,27,43] | [3,9,82,10]',
        },
        {
          title: 'Continue splitting',
          description: '[38,27,43] → [38] | [27,43] → [38] | [27] | [43]',
          code: '[3,9,82,10] → [3,9] | [82,10] → [3] | [9] | [82] | [10]',
        },
        {
          title: 'Conquer: Merge sorted pairs',
          description: 'Merge [27] + [43] = [27,43]. Merge [38] + [27,43] = [27,38,43]',
          code: 'Merge [3]+[9] = [3,9]. Merge [82]+[10] = [10,82]. Merge [3,9]+[10,82] = [3,9,10,82]',
        },
        {
          title: 'Final merge',
          description: 'Merge sorted left half + sorted right half = fully sorted array',
          code: 'Merge [27,38,43] + [3,9,10,82] = [3,9,10,27,38,43,82]',
        },
      ]} />

      <SectionHeader number={2} title="Implementation" />

      <CodeBlock language="javascript" filename="Merge Sort — JavaScript">
{`function mergeSort(arr) {
  // Base case: 0 or 1 element is already sorted
  if (arr.length <= 1) return arr;

  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Conquer
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let l = 0, r = 0;

  // Compare front elements of both arrays, take the smaller
  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  // Append remaining elements
  return result.concat(left.slice(l)).concat(right.slice(r));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// → [3, 9, 10, 27, 38, 43, 82]`}
      </CodeBlock>

      <CodeBlock language="python" filename="Merge Sort — Python">
{`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    l, r = 0, 0

    while l < len(left) and r < len(right):
        if left[l] <= right[r]:
            result.append(left[l]); l += 1
        else:
            result.append(right[r]); r += 1

    result.extend(left[l:])
    result.extend(right[r:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]`}
      </CodeBlock>

      <SectionHeader number={3} title="Why It's Always O(n log n)" />
      <AlertBox type="info" title="The math">
        Splitting: log₂(n) levels of recursion.
        Merging: O(n) work per level (every element is touched exactly once per level).
        Total: O(n) × O(log n) = O(n log n). There is no best/average/worst — it's always exactly the same.
      </AlertBox>

      <SectionHeader number={4} title="Merge Sort vs Quick Sort vs Heap Sort" />
      <CompareTable
        leftLabel="Algorithm"
        rightLabel="Key Properties"
        rows={[
          { label: 'Merge Sort', left: 'O(n log n) always, stable, O(n) space', right: 'Best for linked lists, external sorting, stability required' },
          { label: 'Quick Sort', left: 'O(n log n) avg, O(n²) worst, in-place', right: 'Fastest in practice, poor on already-sorted data without pivot tricks' },
          { label: 'Heap Sort', left: 'O(n log n) always, in-place, not stable', right: 'O(1) space advantage, poor cache performance' },
          { label: 'TimSort (built-in)', left: 'O(n log n) worst, O(n) best (nearly sorted)', right: 'JavaScript/Python built-in. Hybrid of merge + insertion sort' },
        ]}
      />

      <SectionHeader number={5} title="Interview Applications — Merge Step Pattern" />
      <p>
        The merge step from merge sort appears in several important interview problems beyond sorting:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Merge Two Sorted Arrays',
          description: 'Classic O(n+m) merge. Used in "merge k sorted lists" (extend with a min-heap).',
        },
        {
          title: 'Count Inversions',
          description: 'Modified merge sort counts pairs (i,j) where i<j but arr[i]>arr[j]. Classic divide-and-conquer problem.',
        },
        {
          title: 'Sort Linked List',
          description: 'Merge sort is preferred for linked lists (no random access). Find middle with slow/fast pointer, split, sort halves, merge.',
        },
        {
          title: 'External Sorting',
          description: 'Sorting datasets too large to fit in RAM. Write sorted chunks to disk, then merge-sort the chunks. Classic CS problem.',
        },
      ]} />

      <CodeBlock language="javascript" filename="Merge Two Sorted Arrays — Interview Classic">
{`function mergeSortedArrays(nums1, m, nums2, n) {
  // Merge from the back to avoid shifting
  let i = m - 1;      // last valid in nums1
  let j = n - 1;      // last in nums2
  let k = m + n - 1;  // last position in result

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }

  // Copy remaining nums2 elements
  while (j >= 0) nums1[k--] = nums2[j--];

  return nums1;
}

mergeSortedArrays([1,2,3,0,0,0], 3, [2,5,6], 3);
// → [1,2,2,3,5,6]`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Why is merge sort preferred over quick sort in interviews?',
          answer: 'Merge sort has guaranteed O(n log n) with no worst-case degradation. It\'s stable. The logic is clean and consistent — easy to explain. Quick sort is faster in practice but has tricky edge cases (pivot selection, already-sorted arrays).',
        },
        {
          question: 'Is merge sort stable?',
          answer: 'Yes. The merge step uses <=, which means equal elements from the left array come before equal elements from the right array — preserving relative order. Quick sort is typically not stable.',
        },
        {
          question: 'Can merge sort be done in-place?',
          answer: 'In-place merge sort exists but is complex (O(n log² n) time) and rarely practical. The standard implementation uses O(n) auxiliary space for the merged result. This is the trade-off vs heap sort (O(1) space).',
        },
        {
          question: 'What is TimSort?',
          answer: 'TimSort is the hybrid algorithm used in JavaScript (V8), Python, and Java. It identifies "runs" (already sorted sequences) in the input and merges them using merge sort. For nearly-sorted data it approaches O(n). Worst case is O(n log n).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
