'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToChooseTheRightDataStructureForAProblemClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Choose the Right Data Structure for a Problem</h1>
      <p className="lead">
        Choosing the right data structure is the most impactful decision you make when solving
        a coding problem. The same algorithm with a HashMap vs an Array can be the difference
        between O(n²) and O(n). This guide gives you a framework for picking the right one every time.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'HashMap lookup — the most powerful optimization', color: 'green' },
        { value: 'O(log n)', label: 'sorted array or BST operations', color: 'blue' },
        { value: 'O(n)', label: 'unsorted array search — often avoidable', color: 'amber' },
        { value: 'Stack/Queue', label: 'the answer when order of processing matters', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Decision Framework" />
      <QuickFact>
        Ask these questions in order: 1) Do I need O(1) lookups by key? → HashMap. 2) Do I need
        sorted order? → Array (sorted) or TreeMap. 3) Do I process in LIFO order? → Stack.
        4) Do I process in FIFO order? → Queue. 5) Do I need to find min/max repeatedly? → Heap.
        6) Is the data hierarchical? → Tree. 7) Is it a network/graph? → Graph.
      </QuickFact>

      <SectionHeader number={2} title="Data Structure Time Complexity" />
      <CompareTable
        leftLabel="Data Structure"
        rightLabel="Key Operations"
        rows={[
          { label: 'Array', left: 'Access: O(1), Search: O(n)', right: 'Best for: indexed access, iteration, fixed-size collections' },
          { label: 'HashMap', left: 'Get/Set/Delete: O(1) avg', right: 'Best for: key-value lookups, counting frequencies, deduplication' },
          { label: 'Stack', left: 'Push/Pop: O(1)', right: 'Best for: LIFO, undo, parsing expressions, DFS' },
          { label: 'Queue', left: 'Enqueue/Dequeue: O(1)', right: 'Best for: FIFO, BFS, task scheduling' },
          { label: 'Heap (Priority Queue)', left: 'Insert: O(log n), Min/Max: O(1)', right: 'Best for: k-th largest/smallest, Dijkstra, merge k sorted lists' },
          { label: 'Sorted Set/BST', left: 'Insert/Search: O(log n)', right: 'Best for: range queries, ordered iteration, sliding window max' },
        ]}
      />

      <SectionHeader number={3} title="Pattern Recognition — When to Use What" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Use HashMap when...', description: '"Two Sum" pattern — need O(1) lookup, counting occurrences, grouping elements by key. Anagram detection, frequency maps, memoization cache.' },
        { title: 'Use Stack when...', description: 'Matching brackets/parentheses, evaluating expressions, "next greater element" problems, backtracking, undo/redo functionality.' },
        { title: 'Use Queue (or Deque) when...', description: 'BFS traversal, sliding window maximum, task queues, level-order tree traversal, shortest path in unweighted graphs.' },
        { title: 'Use Heap when...', description: '"Top K" patterns (k largest elements), merging sorted lists, median from data stream, Dijkstra shortest path, scheduling problems.' },
      ]} />

      <SectionHeader number={4} title="Code Examples by Problem Type" />
      <CodeBlock language="python" filename="Common patterns with correct data structures">
{`from collections import defaultdict, deque
import heapq

# Pattern 1: Frequency counting (HashMap)
def most_common(nums):
    count = defaultdict(int)  # O(1) insertions
    for n in nums:
        count[n] += 1
    return max(count, key=count.get)  # O(n)

# Pattern 2: Matching brackets (Stack)
def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        elif not stack or stack[-1] != pairs[char]:
            return False
        else:
            stack.pop()
    return not stack

# Pattern 3: K largest elements (Min-Heap)
def k_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)  # removes smallest
    return list(heap)  # O(n log k) — much better than sorting O(n log n)

# Pattern 4: BFS shortest path (Queue)
from collections import deque
def bfs_distance(graph, start, end):
    queue = deque([(start, 0)])
    visited = {start}
    while queue:
        node, dist = queue.popleft()
        if node == end:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1`}
      </CodeBlock>

      <AlertBox type="tip" title="Two-pointer + sorted array is often better than HashMap">
        For problems like "find pairs that sum to target", sorting + two pointers is O(n log n)
        time and O(1) space vs HashMap which is O(n) time but O(n) space. If space is constrained,
        prefer the sorted array approach.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I know if an interview problem needs a tree vs a graph?',
          answer: 'Trees are graphs with no cycles and a single root. Use tree data structures when data has a natural parent-child hierarchy (file system, HTML DOM, org charts). Use general graphs when: nodes can have multiple parents, cycles exist, or relationships are bidirectional (social networks, routing).',
        },
        {
          question: 'When should I use a sorted set instead of a sorted array?',
          answer: 'Use a sorted set (TreeSet in Java, SortedList in Python) when you need O(log n) insertions AND order. Use a sorted array when data is built once and then only queried — binary search gives O(log n) lookups on a static sorted array. Dynamic insertion into a sorted array is O(n) due to shifting.',
        },
        {
          question: 'What is the most commonly misused data structure?',
          answer: 'Arrays used where HashMaps should be. The classic mistake: using an array to check if an element exists (O(n) linear scan) when a Set would give O(1) membership testing. Any time you find yourself writing "if x in array", consider converting to a Set first.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
