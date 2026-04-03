'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function MergeSortExplainedStepByStepWhyPreferredInInterviewsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Merge Sort Explained Step by Step — Why It&apos;s Preferred in Interviews</h1>
      <p className="lead">
        Merge sort is the go-to sorting algorithm for technical interviews because it is always O(n log n),
        stable, and predictable. Unlike Quick Sort, it never degrades to O(n²) on bad input. This complete
        guide walks through the divide-and-conquer logic step by step, covers implementations in multiple
        languages, and explains every related interview problem you need to know.
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
        then merge the two sorted halves back together. Merging two already-sorted arrays is O(n) —
        that is the key insight that makes the whole algorithm efficient.
      </QuickFact>

      <p>
        The elegance of merge sort lies in the fact that sorting two halves recursively reduces to the
        same problem at a smaller scale. Eventually you reach arrays of size 1, which are trivially sorted.
        Then the merge step builds the sorted result back up from those single elements.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Divide: Split array in half',
          desc: 'Keep splitting until each piece has 1 element. A single element is always sorted by definition.',
        },
        {
          title: 'Continue splitting recursively',
          desc: '[38,27,43,3,9,82,10] → [38,27,43] | [3,9,82,10] → [38] | [27,43] → [27] | [43]',
        },
        {
          title: 'Conquer: Merge sorted pairs',
          desc: 'Merge [27] + [43] = [27,43]. Then merge [38] + [27,43] = [27,38,43].',
        },
        {
          title: 'Final merge',
          desc: 'Merge sorted left half [27,38,43] + sorted right half [3,9,10,82] = [3,9,10,27,38,43,82].',
        },
      ]} />

      <SectionHeader number={2} title="JavaScript Implementation" />
      <p>
        The implementation has two functions: the recursive <code>mergeSort</code> that splits the array,
        and the <code>merge</code> function that combines two sorted arrays into one.
      </p>

      <CodeBlock lang="javascript" title="Merge Sort — JavaScript">{`function mergeSort(arr) {
  // Base case: 0 or 1 element is already sorted
  if (arr.length <= 1) return arr;

  // Divide
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));
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

  // Append remaining elements (one array will be exhausted first)
  return result.concat(left.slice(l)).concat(right.slice(r));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// → [3, 9, 10, 27, 38, 43, 82]`}</CodeBlock>

      <SectionHeader number={3} title="Python Implementation" />

      <CodeBlock lang="python" title="Merge Sort — Python">{`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
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
# [3, 9, 10, 27, 38, 43, 82]`}</CodeBlock>

      <SectionHeader number={4} title="Java Implementation" />

      <CodeBlock lang="java" title="Merge Sort — Java">{`public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;

    int mid = arr.length / 2;
    int[] left  = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));

    return merge(left, right);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int l = 0, r = 0, i = 0;

    while (l < left.length && r < right.length) {
        if (left[l] <= right[r]) result[i++] = left[l++];
        else                     result[i++] = right[r++];
    }

    while (l < left.length)  result[i++] = left[l++];
    while (r < right.length) result[i++] = right[r++];

    return result;
}`}</CodeBlock>

      <SectionHeader number={5} title="Why It's Always O(n log n)" />
      <AlertBox type="info" title="The math behind O(n log n)">
        Splitting: log₂(n) levels of recursion — each level halves the problem.
        Merging: O(n) work per level — every element is touched exactly once per level.
        Total: O(n) × O(log n) = O(n log n). There is no best case, average case, or worst case —
        the complexity is identical regardless of input order.
      </AlertBox>

      <p>
        At each level of recursion, the merge step processes every element exactly once. With log n levels
        and n work per level, the total work is always n × log n. This is why merge sort is described as
        guaranteed O(n log n), unlike Quick Sort which can hit O(n²) on already-sorted input with a naive pivot.
      </p>

      <CodeBlock lang="text" title="Recursion Tree Visualization">{`mergeSort([38,27,43,3,9,82,10])   ← Level 0: 7 elements
├── mergeSort([38,27,43])          ← Level 1: 3 elements
│   ├── mergeSort([38])
│   └── mergeSort([27,43])
│       ├── mergeSort([27])
│       └── mergeSort([43])
└── mergeSort([3,9,82,10])         ← Level 1: 4 elements
    ├── mergeSort([3,9])
    │   ├── mergeSort([3])
    │   └── mergeSort([9])
    └── mergeSort([82,10])
        ├── mergeSort([82])
        └── mergeSort([10])

Levels: log₂(7) ≈ 3 levels
Work per level: n = 7 comparisons
Total: ~3 × 7 = 21 operations = O(n log n)`}</CodeBlock>

      <SectionHeader number={6} title="Merge Sort vs Quick Sort vs Heap Sort" />

      <KeyPointsGrid items={[
        {
          title: 'Merge Sort',
          description: 'O(n log n) always, stable, O(n) space. Best for: linked lists, external sorting (data too big for RAM), stability required. Interview favorite for predictability.',
        },
        {
          title: 'Quick Sort',
          description: 'O(n log n) average, O(n²) worst case, in-place (O(log n) stack space), not stable. Fastest in practice due to cache efficiency, but risky on sorted data without good pivot selection.',
        },
        {
          title: 'Heap Sort',
          description: 'O(n log n) always, in-place (O(1) space), not stable. Best when memory is very constrained. Poor cache performance makes it slower than merge/quick in practice.',
        },
        {
          title: 'TimSort (JS/Python built-in)',
          description: 'Hybrid merge + insertion sort. O(n log n) worst, O(n) for nearly-sorted input. The actual algorithm used in JavaScript V8, Python, and Java Arrays.sort for objects.',
        },
      ]} />

      <SectionHeader number={7} title="Interview Applications — The Merge Step Pattern" />
      <p>
        The merge step from merge sort is a standalone pattern that appears in several high-frequency
        interview problems. Recognizing it is key to solving them efficiently.
      </p>

      <CodeBlock lang="javascript" title="Merge Two Sorted Arrays (LeetCode 88)">{`function mergeSortedArrays(nums1, m, nums2, n) {
  // Merge from the back to avoid shifting elements
  let i = m - 1;      // last valid element in nums1
  let j = n - 1;      // last element in nums2
  let k = m + n - 1;  // last position in result

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }

  // Copy remaining nums2 elements (nums1 elements are already in place)
  while (j >= 0) nums1[k--] = nums2[j--];

  return nums1;
}

mergeSortedArrays([1,2,3,0,0,0], 3, [2,5,6], 3);
// → [1,2,2,3,5,6]
// Time: O(m+n), Space: O(1)`}</CodeBlock>

      <CodeBlock lang="javascript" title="Count Inversions — Modified Merge Sort">{`// An inversion is a pair (i, j) where i < j but arr[i] > arr[j]
// Classic divide-and-conquer interview problem

function countInversions(arr) {
  if (arr.length <= 1) return { sorted: arr, count: 0 };

  const mid = Math.floor(arr.length / 2);
  const { sorted: left, count: leftCount }   = countInversions(arr.slice(0, mid));
  const { sorted: right, count: rightCount } = countInversions(arr.slice(mid));

  let count = leftCount + rightCount;
  const merged = [];
  let l = 0, r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) {
      merged.push(left[l++]);
    } else {
      // Every remaining element in left is > right[r]
      count += left.length - l;  // Count inversions
      merged.push(right[r++]);
    }
  }

  return {
    sorted: merged.concat(left.slice(l)).concat(right.slice(r)),
    count,
  };
}

countInversions([3, 1, 2]).count; // → 2 (pairs: (3,1), (3,2))`}</CodeBlock>

      <CodeBlock lang="javascript" title="Sort Linked List — Merge Sort Preferred">{`// Merge sort is preferred for linked lists because:
// 1. No random access needed (arrays can use quick sort with index tricks)
// 2. O(1) extra space for linked list merge (just pointer manipulation)

function sortList(head) {
  if (!head || !head.next) return head;

  // Find middle using slow/fast pointers
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Split the list in half
  const mid = slow.next;
  slow.next = null;  // Cut the list

  const left  = sortList(head);
  const right = sortList(mid);

  return mergeLists(left, right);
}

function mergeLists(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else                  { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}
// Time: O(n log n), Space: O(log n) call stack`}</CodeBlock>

      <SectionHeader number={8} title="Sorting Stability — Why It Matters" />
      <AlertBox type="tip" title="Stability is critical for multi-key sorting">
        A stable sort preserves the relative order of equal elements. If you sort a list of employees
        first by department, then by name using a stable sort, employees within each department remain
        in name order. An unstable sort would scramble that order. Merge sort is always stable; quick sort
        (standard implementation) is not.
      </AlertBox>

      <CodeBlock lang="javascript" title="Stability in Practice">{`const employees = [
  { name: 'Alice', dept: 'Engineering' },
  { name: 'Bob',   dept: 'Marketing' },
  { name: 'Carol', dept: 'Engineering' },
  { name: 'Dave',  dept: 'Marketing' },
];

// First sort by name (already alphabetical here)
// Then sort by department — stable sort preserves name order within dept

employees.sort((a, b) => a.dept.localeCompare(b.dept));
// Result (stable): Engineering: [Alice, Carol], Marketing: [Bob, Dave]
// Unstable sort might give: Engineering: [Carol, Alice] — relative order lost

// JavaScript's Array.prototype.sort() is stable in all modern engines (V8, SpiderMonkey)
// This is guaranteed by spec since ECMAScript 2019`}</CodeBlock>

      <SectionHeader number={9} title="External Sorting — Real-World Merge Sort" />
      <p>
        Merge sort is the foundation of external sorting — sorting datasets too large to fit in RAM.
        The algorithm writes sorted chunks to disk, then merges them. This is how databases handle
        ORDER BY on large tables and how Hadoop sorts terabytes of data.
      </p>

      <CodeBlock lang="python" title="External Sort Concept (Simplified)">{`import heapq
import tempfile
import os

def external_sort(input_file, output_file, chunk_size=1000):
    """
    Sort a large file that doesn't fit in memory.
    1. Read chunks, sort each chunk, write to temp files
    2. Merge-sort the temp files using a min-heap
    """
    temp_files = []

    # Phase 1: Create sorted runs
    with open(input_file) as f:
        while True:
            chunk = [int(f.readline()) for _ in range(chunk_size) if not f.readline() == '']
            if not chunk:
                break
            chunk.sort()
            tmp = tempfile.NamedTemporaryFile(mode='w', delete=False)
            tmp.write('\\n'.join(map(str, chunk)))
            temp_files.append(tmp.name)

    # Phase 2: Merge sorted runs using a min-heap
    readers = [open(f) for f in temp_files]
    heap = []

    for i, reader in enumerate(readers):
        line = reader.readline()
        if line:
            heapq.heappush(heap, (int(line), i))

    with open(output_file, 'w') as out:
        while heap:
            val, i = heapq.heappop(heap)
            out.write(str(val) + '\\n')
            line = readers[i].readline()
            if line:
                heapq.heappush(heap, (int(line), i))

    # Cleanup
    for r, f in zip(readers, temp_files):
        r.close()
        os.unlink(f)`}</CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Why is merge sort preferred over quick sort in interviews?',
          answer: 'Merge sort has guaranteed O(n log n) with no worst-case degradation. It is stable. The logic is clean and consistent — easy to explain and implement correctly under pressure. Quick sort is faster in practice due to cache efficiency, but has tricky edge cases (pivot selection, already-sorted arrays causing O(n²)). For interviews, merge sort lets you demonstrate divide-and-conquer clearly without worrying about pivot strategy.',
        },
        {
          question: 'Is merge sort stable?',
          answer: 'Yes. The merge step uses <=, which means when two elements are equal, the one from the left array is placed first — preserving the relative order from before the merge. This stability carries through all levels of recursion. Quick sort (standard implementation) is not stable because the partition step can swap non-adjacent equal elements.',
        },
        {
          question: 'Can merge sort be done in-place?',
          answer: 'In-place merge sort algorithms exist but are significantly more complex, typically running in O(n log² n) or O(n log n) time with O(1) space. The constant factors are large enough that they are rarely practical. The standard implementation using O(n) auxiliary space for the merged result is almost always preferred. Heap sort achieves O(1) space at the cost of non-stability and poor cache performance.',
        },
        {
          question: 'What is TimSort and how does it relate to merge sort?',
          answer: 'TimSort is the hybrid algorithm used in JavaScript (V8), Python, and Java. It identifies "runs" — naturally sorted sequences that already exist in the input — and merges them using merge sort logic. For nearly-sorted data it approaches O(n) by exploiting existing order. Worst case is O(n log n). TimSort is what you get when you call Array.sort() in JavaScript or list.sort() in Python.',
        },
        {
          question: 'What is the space complexity of merge sort on linked lists?',
          answer: 'For arrays, merge sort requires O(n) auxiliary space for the merged result. For linked lists, the merge step only requires pointer manipulation — you can merge two sorted linked lists in O(1) extra space by relinking nodes. The space complexity is then O(log n) for the recursive call stack.',
        },
        {
          question: 'How do I sort strings or custom objects with merge sort?',
          answer: 'Pass a comparator function. In JavaScript: arr.sort((a, b) => a.localeCompare(b)) for strings, or (a, b) => a.property - b.property for objects. The comparator returns negative (a before b), zero (equal), or positive (b before a). JavaScript built-in sort uses TimSort internally so you rarely need to implement merge sort from scratch — but the interview expects you to know the algorithm.',
        },
        {
          question: 'When would I actually use merge sort over JavaScript built-in sort?',
          answer: 'In practice, almost never — built-in sort (TimSort) is highly optimized and already O(n log n). You would implement merge sort for: learning purposes, interviews, sorting linked lists where TimSort is not directly applicable, counting inversions (requires modifying the merge step), or environments where you need a deterministic stable sort with guaranteed behavior (embedded systems, specific compliance requirements).',
        },
        {
          question: 'What is the relationship between merge sort and the k-way merge?',
          answer: 'Standard merge sort is a 2-way merge (merges two sorted halves). K-way merge extends this to merge k sorted arrays simultaneously using a min-heap. Each heap operation is O(log k), and you perform n total operations (one per output element), giving O(n log k). Used in: merge k sorted lists interview problem, merging results from distributed systems, external sorting with many sorted runs.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
