'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BinarySearchExplainedLikeYoure5WithCodeExampleClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Binary Search Explained Simply — With Code Examples in JavaScript, Python & Java</h1>
      <p className="lead">
        Binary search is the first algorithm that shows you why O(log n) matters. Instead of checking every
        item in a list, you eliminate half the remaining possibilities with each comparison.
        This guide explains it from first principles — with visual examples and complete code implementations.
      </p>

      <StatGrid
        stats={[
          { value: 'O(log n)', label: 'time complexity', color: 'green' },
          { value: '1M items', label: 'found in max 20 comparisons', color: 'blue' },
          { value: 'O(1)', label: 'space complexity (iterative)', color: 'purple' },
          { value: '~240×', label: 'faster than linear on 1M items', color: 'amber' },
        ]}
      />

      <SectionHeader number={1} title="The Problem: Why Not Just Check Every Item?" />
      <p>
        Imagine you have a sorted list of 1,000,000 numbers and you need to find the number 734,291.
        A <strong>linear search</strong> checks each item one by one — worst case: 1,000,000 checks.
      </p>
      <p>
        <strong>Binary search</strong> uses the fact that the list is <em>sorted</em>:
        check the middle, eliminate half, repeat. Worst case: just <strong>20 checks</strong> for 1 million items.
      </p>

      <CompareTable
        leftLabel="Linear Search"
        rightLabel="Binary Search"
        rows={[
          { label: 'Requirement', left: 'Any list (sorted or not)', right: 'Must be SORTED' },
          { label: '10 items — worst case', left: '10 comparisons', right: '4 comparisons' },
          { label: '1,000 items — worst case', left: '1,000 comparisons', right: '10 comparisons' },
          { label: '1,000,000 items — worst case', left: '1,000,000 comparisons', right: '20 comparisons' },
          { label: 'Time complexity', left: 'O(n)', right: 'O(log n)' },
          { label: 'Implementation', left: 'Simple', right: 'Slightly more complex' },
        ]}
      />

      <SectionHeader number={2} title="How It Works — The Phonebook Analogy" />
      <p>
        Think about finding a name in a physical phonebook. You don't start at page 1 and read every name.
        You open to the middle. If the name you want comes before the middle — flip to the left half.
        If it comes after — flip to the right half. Repeat until found.
      </p>

      <FlowDiagram
        steps={[
          { label: 'Start: low=0, high=n-1', color: 'blue' },
          { label: 'mid = (low + high) / 2', color: 'blue' },
          { label: 'Compare arr[mid] with target', color: 'amber' },
          { label: 'Equal → Found! Return mid', color: 'green' },
          { label: 'Target < arr[mid] → high = mid - 1', color: 'orange' },
          { label: 'Target > arr[mid] → low = mid + 1', color: 'orange' },
          { label: 'low > high → Not found, return -1', color: 'red' },
        ]}
      />

      <QuickFact>
        Why log₂(n)? Each comparison cuts the search space in half. After k comparisons, you've eliminated
        all but n/2ᵏ elements. When n/2ᵏ = 1, you've found the answer. Solving: k = log₂(n).
        For n=1,000,000: log₂(1,000,000) ≈ 20.
      </QuickFact>

      <SectionHeader number={3} title="Step-by-Step Walkthrough" />
      <p>
        Array: <code>[2, 5, 8, 12, 16, 23, 38, 45, 56, 72]</code> — Find: <strong>23</strong>
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Step 1: low=0, high=9, mid=4',
            description: 'arr[4] = 16. Target 23 > 16 → search right half.',
            code: '[2, 5, 8, 12, 16, | 23, 38, 45, 56, 72]  ← right half',
          },
          {
            title: 'Step 2: low=5, high=9, mid=7',
            description: 'arr[7] = 45. Target 23 < 45 → search left half.',
            code: '[23, 38, 45 | 45, 56, 72]  ← left half: [23, 38]',
          },
          {
            title: 'Step 3: low=5, high=6, mid=5',
            description: 'arr[5] = 23. Target 23 === 23 → FOUND at index 5!',
            code: 'arr[5] = 23 ✓ — found in 3 comparisons',
          },
        ]}
      />

      <SectionHeader number={4} title="Code — Iterative (Recommended)" />

      <CodeBlock language="javascript" filename="JavaScript — Iterative Binary Search">
{`function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Use Math.floor((low + high) / 2) to avoid overflow
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid;  // Found! Return index
    } else if (arr[mid] < target) {
      low = mid + 1;  // Target is in right half
    } else {
      high = mid - 1;  // Target is in left half
    }
  }

  return -1;  // Not found
}

// Usage:
const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72];
console.log(binarySearch(arr, 23));  // → 5
console.log(binarySearch(arr, 99));  // → -1`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python — Iterative Binary Search">
{`def binary_search(arr: list, target: int) -> int:
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid        # Found
        elif arr[mid] < target:
            low = mid + 1     # Right half
        else:
            high = mid - 1    # Left half

    return -1  # Not found

# Usage:
arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
print(binary_search(arr, 23))  # → 5
print(binary_search(arr, 99))  # → -1

# Python also has bisect in the standard library:
import bisect
idx = bisect.bisect_left(arr, 23)
# bisect returns insertion point, verify arr[idx] == target`}
      </CodeBlock>

      <CodeBlock language="java" filename="Java — Iterative Binary Search">
{`public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;  // Avoids integer overflow

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72};
        System.out.println(binarySearch(arr, 23));  // → 5
        System.out.println(binarySearch(arr, 99));  // → -1

        // Java Arrays has it built-in:
        System.out.println(java.util.Arrays.binarySearch(arr, 23)); // → 5
    }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Recursive Version" />
      <AlertBox type="info" title="Iterative vs recursive">
        Both are O(log n). The iterative version uses O(1) space. The recursive version uses O(log n) stack space.
        Use iterative in production to avoid stack overflow on large arrays.
      </AlertBox>

      <CodeBlock language="javascript" filename="JavaScript — Recursive Binary Search">
{`function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;  // Base case: not found

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, high);
  return binarySearchRecursive(arr, target, low, mid - 1);
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Common Mistakes" />

      <ErrorFix
        bad={`// Bug: integer overflow when low + high overflows 32-bit int
const mid = (low + high) / 2;  // can overflow in some languages`}
        good={`// Safe: avoids overflow by computing distance from low
const mid = Math.floor(low + (high - low) / 2);
// In Python: (low + high) // 2 is fine (arbitrary precision ints)`}
        badLabel="Potential overflow"
        goodLabel="Overflow-safe"
      />

      <ErrorFix
        bad={`// Bug: wrong termination — loop runs forever
while (low < high) {  // missing =
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}
// When low === high, that element is never checked!`}
        good={`// Correct: low <= high ensures single element is checked
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}`}
        badLabel="Off-by-one: misses last element"
        goodLabel="Correct termination"
      />

      <SectionHeader number={7} title="Real-World Uses of Binary Search" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Database Indexes',
            description: 'B-tree indexes use a form of binary search. That\'s why indexed queries are fast and full-table scans are slow.',
          },
          {
            title: 'Git Bisect',
            description: '`git bisect` uses binary search to find the commit that introduced a bug. Halves the commit range with each test.',
          },
          {
            title: 'Finding Insertion Point',
            description: 'Where should a new value be inserted to keep a sorted array sorted? Binary search gives the answer in O(log n).',
          },
          {
            title: 'Rotated Array Problems',
            description: 'Common interview variant: find a target in a rotated sorted array. Modified binary search still solves it in O(log n).',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Does binary search work on strings?',
            answer: 'Yes, on any sorted array where you can compare elements. For strings, lexicographic comparison applies: "apple" < "banana". Sort strings first, then binary search works the same way.',
          },
          {
            question: 'What if there are duplicate values?',
            answer: 'Standard binary search returns *a* matching index — not necessarily the first or last. Use "leftmost binary search" (also called lower_bound) or "rightmost binary search" (upper_bound) when you need the first or last occurrence.',
          },
          {
            question: 'When is linear search better than binary search?',
            answer: 'For very small arrays (< ~10 elements), the overhead of binary search\'s branching can actually be slower than a simple linear scan. Also, if you only search once, sorting + binary search is O(n log n) which is worse than a single O(n) linear scan.',
          },
          {
            question: 'Is binary search hard to implement in an interview?',
            answer: 'It\'s notoriously tricky to get perfectly right — the off-by-one errors catch even experienced developers. Practice the template until you can write it from memory: while(lo<=hi), mid=lo+(hi-lo)/2, adjust lo=mid+1 or hi=mid-1.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
