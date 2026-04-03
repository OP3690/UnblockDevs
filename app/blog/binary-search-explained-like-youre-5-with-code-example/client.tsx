'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
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

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'The sorted prerequisite',
            description: 'Binary search only works on sorted data. If your array is unsorted, you must sort it first — but then binary search applies for all future lookups, making the total cost O(n log n) + O(log n) per query.',
          },
          {
            title: 'Why it is O(log n)',
            description: 'Each comparison cuts the search space in half. After k comparisons, only n/2^k elements remain. When n/2^k = 1, you have found it. Solving for k: k = log2(n). For n=1,000,000: log2(1,000,000) is approximately 20.',
          },
          {
            title: 'Three outcomes per step',
            description: 'At each midpoint you get one of three results: found (equal), go left (target is smaller), or go right (target is larger). This three-way branch is the heart of binary search.',
          },
          {
            title: 'Termination condition',
            description: 'The loop ends when low > high — meaning the search space is empty and the target does not exist. This off-by-one is one of the most common implementation bugs.',
          },
        ]}
      />

      <QuickFact color="blue" label="Mathematical insight">
        Why log2(n)? Each comparison cuts the search space in half. After k comparisons, you have eliminated
        all but n/2^k elements. When n/2^k = 1, you have found the answer. Solving: k = log2(n).
        For n=1,000,000: log2(1,000,000) is approximately 20.
      </QuickFact>

      <SectionHeader number={3} title="Step-by-Step Walkthrough" />
      <p>
        Array: <code>[2, 5, 8, 12, 16, 23, 38, 45, 56, 72]</code> — Find: <strong>23</strong>
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Step 1: low=0, high=9, mid=4',
            desc: 'arr[4] = 16. Target 23 > 16, so we search the right half. Set low = mid + 1 = 5. The left half [2, 5, 8, 12, 16] is completely eliminated.',
          },
          {
            title: 'Step 2: low=5, high=9, mid=7',
            desc: 'arr[7] = 45. Target 23 < 45, so we search the left half. Set high = mid - 1 = 6. Elements [45, 56, 72] are eliminated.',
          },
          {
            title: 'Step 3: low=5, high=6, mid=5',
            desc: 'arr[5] = 23. Target 23 === 23 — FOUND! Return index 5. Total: only 3 comparisons for a 10-element array.',
          },
          {
            title: 'If target was missing: low > high',
            desc: 'If we were searching for 99: the low pointer would eventually exceed high. Loop exits, return -1 to indicate not found.',
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

      <SectionHeader number={7} title="Advanced: Find First and Last Occurrence" />
      <p>
        Standard binary search returns any matching index when duplicates exist. To find the first or last
        occurrence of a value, you need a modified version that keeps searching after finding a match.
      </p>

      <CodeBlock language="javascript" filename="JavaScript — Find First and Last Occurrence">
{`// Find FIRST occurrence (leftmost)
function findFirst(arr, target) {
  let low = 0, high = arr.length - 1, result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      result = mid;   // Record this match
      high = mid - 1; // Keep searching LEFT for earlier occurrence
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return result;
}

// Find LAST occurrence (rightmost)
function findLast(arr, target) {
  let low = 0, high = arr.length - 1, result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      result = mid;   // Record this match
      low = mid + 1;  // Keep searching RIGHT for later occurrence
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return result;
}

// Example with duplicates:
const arr = [1, 2, 2, 2, 3, 4];
console.log(findFirst(arr, 2));  // → 1
console.log(findLast(arr, 2));   // → 3`}
      </CodeBlock>

      <SectionHeader number={8} title="Binary Search on the Answer Space" />
      <p>
        Binary search is not just for arrays. A powerful technique is searching the range of valid answers
        when you need to find the minimum or maximum value that satisfies a condition.
      </p>

      <CodeBlock language="javascript" filename="Binary Search on Answer — Square Root (Floor)">
{`// Find the integer square root (floor) of n
// Instead of searching an array, we binary search the range of possible answers [1, n/2]
function sqrtFloor(n) {
  if (n < 2) return n;

  let low = 1, high = Math.floor(n / 2), result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const square = mid * mid;

    if (square === n) return mid;       // Perfect square
    if (square < n) {
      result = mid;     // Valid floor candidate — try going larger
      low = mid + 1;
    } else {
      high = mid - 1;   // Too large
    }
  }

  return result;
}

console.log(sqrtFloor(16));  // → 4
console.log(sqrtFloor(10));  // → 3 (floor of 3.16...)
console.log(sqrtFloor(25));  // → 5`}
      </CodeBlock>

      <SectionHeader number={9} title="Real-World Uses of Binary Search" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Database Indexes',
            description: 'B-tree indexes use a form of binary search. That\'s why indexed queries are fast and full-table scans are slow. Every WHERE clause on an indexed column is essentially a binary search through the index.',
          },
          {
            title: 'Git Bisect',
            description: '`git bisect` uses binary search to find the commit that introduced a bug. Halves the commit range with each test — finds a bad commit among 1000 in just 10 steps.',
          },
          {
            title: 'Finding Insertion Point',
            description: 'Where should a new value be inserted to keep a sorted array sorted? Binary search gives the answer in O(log n). Python\'s bisect module is built on this pattern.',
          },
          {
            title: 'Rotated Array Problems',
            description: 'Common interview variant: find a target in a rotated sorted array [4,5,6,0,1,2,3]. Modified binary search determines which half is sorted and searches appropriately, still in O(log n).',
          },
          {
            title: 'IP Address Routing',
            description: 'Network routers use longest-prefix matching with binary search on sorted routing tables to determine the next hop for packets — billions of lookups per second.',
          },
          {
            title: 'Autocomplete and Spell Check',
            description: 'Dictionary-based autocomplete stores words in sorted order and uses binary search (often combined with trie structures) to find prefix matches instantly.',
          },
        ]}
      />

      <CompareTable
        leftLabel="Iterative Binary Search"
        rightLabel="Recursive Binary Search"
        rows={[
          { label: 'Space complexity', left: 'O(1) — constant space', right: 'O(log n) — call stack frames' },
          { label: 'Risk of stack overflow', left: 'None', right: 'On very large arrays in some languages' },
          { label: 'Code clarity', left: 'Slightly more verbose', right: 'More elegant and mathematically natural' },
          { label: 'Performance', left: 'Slightly faster (no function call overhead)', right: 'Tiny overhead per recursive call' },
          { label: 'Production recommendation', left: 'Preferred for production code', right: 'Good for learning and interview explanations' },
        ]}
      />

      <AlertBox type="tip" title="The template to memorize">
        For interviews, memorize this exact template: while(low &lt;= high), mid = low + (high - low) / 2,
        adjust with low = mid + 1 or high = mid - 1 — never set low or high to mid itself.
        This pattern prevents infinite loops and off-by-one errors in every binary search variant.
      </AlertBox>

      <FAQAccordion
        items={[
          {
            question: 'Does binary search work on strings?',
            answer: 'Yes, on any sorted array where you can compare elements. For strings, lexicographic comparison applies: "apple" < "banana". Sort strings first, then binary search works the same way.',
          },
          {
            question: 'What if there are duplicate values?',
            answer: 'Standard binary search returns *a* matching index — not necessarily the first or last. Use "leftmost binary search" (also called lower_bound) or "rightmost binary search" (upper_bound) when you need the first or last occurrence of a duplicated value.',
          },
          {
            question: 'When is linear search better than binary search?',
            answer: 'For very small arrays (fewer than about 10 elements), the overhead of binary search\'s branching can be slower than a simple linear scan. Also, if you only search once, sorting first and then binary searching is O(n log n) total, which is worse than a single O(n) linear scan.',
          },
          {
            question: 'Is binary search hard to implement in an interview?',
            answer: 'It\'s notoriously tricky to get perfectly right — the off-by-one errors catch even experienced developers. Practice the template until you can write it from memory: while(lo<=hi), mid=lo+(hi-lo)/2, adjust lo=mid+1 or hi=mid-1.',
          },
          {
            question: 'How does binary search handle an empty array?',
            answer: 'An empty array has length 0, so high = arr.length - 1 = -1. The while condition low <= high becomes 0 <= -1, which is immediately false. The loop never runs, and -1 is returned correctly. No special case needed for empty arrays.',
          },
          {
            question: 'What is the difference between lower_bound and upper_bound?',
            answer: 'lower_bound (bisect_left in Python) returns the index of the first element >= target — the leftmost position where target could be inserted. upper_bound (bisect_right) returns the index after the last occurrence of target. The count of a value x in a sorted array is upper_bound(x) - lower_bound(x).',
          },
          {
            question: 'Can binary search work on a linked list?',
            answer: 'Technically yes, but it is inefficient. Finding the midpoint of a linked list requires O(n) traversal (unlike arrays where mid index access is O(1)). So binary search on a linked list is O(n log n) — worse than simple linear search O(n). Use arrays or skip lists for fast binary search.',
          },
          {
            question: 'What is exponential search and when is it useful?',
            answer: 'Exponential search finds the range where the target exists by doubling the index (1, 2, 4, 8, 16...) until exceeding the target, then runs binary search on that range. It is useful when the array size is unknown (unbounded) or when the target is near the beginning — overall O(log n) but with a smaller constant for near-start targets.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
