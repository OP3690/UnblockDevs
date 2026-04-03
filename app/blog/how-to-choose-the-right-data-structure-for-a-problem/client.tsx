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
        between O(n²) and O(n). This guide gives you a systematic framework for picking the
        right data structure every time — covering when to use arrays, hash maps, stacks, queues,
        heaps, trees, and graphs, with real code examples and interview problem patterns.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'HashMap lookup — the most powerful optimization', color: 'green' },
        { value: 'O(log n)', label: 'sorted array binary search or BST operations', color: 'blue' },
        { value: 'O(n)', label: 'unsorted array search — often avoidable with right structure', color: 'amber' },
        { value: 'Heap', label: 'the answer when you need repeated min/max in O(log n)', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Decision Framework — Questions to Ask First" />
      <p>
        Rather than memorizing which structure to use for each problem type, train yourself
        to ask these questions in order. Each question narrows down the candidates significantly.
      </p>
      <QuickFact color="blue" label="Decision questions in order">
        Ask these questions in order: 1) Do I need O(1) lookups by key? → HashMap or Set.
        2) Do I need sorted order? → Sorted Array or TreeMap. 3) Do I process in LIFO order?
        → Stack. 4) Do I process in FIFO order? → Queue. 5) Do I need to find min/max repeatedly?
        → Heap. 6) Is the data hierarchical? → Tree. 7) Is it a network/graph problem? → Graph.
        When none of the above applies, default to an Array.
      </QuickFact>

      <SectionHeader number={2} title="Data Structure Time Complexity Reference" />
      <CompareTable
        leftLabel="Data Structure"
        rightLabel="Key Operations and Best Use"
        rows={[
          { label: 'Array', left: 'Access: O(1), Search: O(n), Insert/Delete middle: O(n)', right: 'Indexed access, iteration, sliding window, prefix sums' },
          { label: 'HashMap / HashSet', left: 'Get/Set/Delete/Contains: O(1) avg', right: 'Key-value lookups, frequency counting, deduplication' },
          { label: 'Stack', left: 'Push/Pop/Peek: O(1)', right: 'LIFO processing, undo history, DFS, bracket matching' },
          { label: 'Queue / Deque', left: 'Enqueue/Dequeue: O(1)', right: 'FIFO processing, BFS, sliding window max, task scheduling' },
          { label: 'Min/Max Heap', left: 'Insert: O(log n), Peek min/max: O(1), Poll: O(log n)', right: 'K-th largest/smallest, Dijkstra, merge sorted lists' },
          { label: 'Sorted Set / BST', left: 'Insert/Search/Delete: O(log n)', right: 'Range queries, ordered iteration, predecessor/successor' },
          { label: 'Trie', left: 'Insert/Search: O(m) where m = word length', right: 'Prefix matching, autocomplete, word dictionaries' },
          { label: 'Graph', left: 'BFS/DFS: O(V + E)', right: 'Connectivity, shortest path, network flow, dependency resolution' },
        ]}
      />

      <SectionHeader number={3} title="Pattern Recognition — When to Use What" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Use HashMap when...', description: '"Two Sum" pattern, counting frequencies, grouping elements by key, memoization cache, detecting duplicates. Any time you write "if x in array" repeatedly — convert to a Set for O(1) membership. Anagram detection, character frequency, prefix sum + complement lookup.' },
        { title: 'Use Stack when...', description: 'Matching brackets/parentheses, evaluating expressions left-to-right, "next greater element" problems, DFS traversal without recursion, backtracking implementations, undo/redo, monotonic stack for span problems.' },
        { title: 'Use Queue (Deque) when...', description: 'BFS traversal (level-order), sliding window maximum (monotonic deque), task scheduling, level-order tree traversal, shortest path in unweighted graphs. Python: collections.deque. Java: ArrayDeque. JavaScript: simulate with array.' },
        { title: 'Use Heap when...', description: '"Top K" problems (k largest/smallest elements), merging k sorted lists, median from a data stream, Dijkstra shortest path, Prim\'s MST, scheduling jobs with priorities. Min-heap for k largest; max-heap for k smallest (invert values).' },
        { title: 'Use Sorted Set/TreeMap when...', description: 'Range queries with insertion/deletion, floor/ceiling lookups (find nearest value), sliding window where you need ordered access to elements, implementing a leaderboard with score updates.' },
        { title: 'Use Trie when...', description: 'Prefix searching, autocomplete systems, word validation with prefix constraints, replace with HashMap for simple cases. Key advantage: O(m) search where m is word length, independent of total number of words.' },
      ]} />

      <SectionHeader number={4} title="Code Examples by Problem Pattern" />
      <CodeBlock lang="python" title="Common patterns with correct data structures">
{`from collections import defaultdict, deque, Counter
import heapq

# ─── Pattern 1: Frequency counting (HashMap / Counter) ───────────────────────
def most_common_element(nums):
    count = Counter(nums)           # O(n) — HashMap under the hood
    return count.most_common(1)[0]  # O(n log n) for full sort, O(n) for single max

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        key = tuple(sorted(w))      # sort chars as the HashMap key
        groups[key].append(w)
    return list(groups.values())    # O(n * m log m) where m = avg word length

# ─── Pattern 2: Bracket matching (Stack) ─────────────────────────────────────
def is_valid_brackets(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        elif not stack or stack[-1] != pairs[char]:
            return False
        else:
            stack.pop()
    return not stack  # O(n) time, O(n) space

# ─── Pattern 3: K largest elements (Min-Heap of size K) ──────────────────────
def k_largest(nums, k):
    """O(n log k) — much better than O(n log n) sort when k << n."""
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)      # remove smallest, keeping k largest
    return sorted(heap, reverse=True)

# ─── Pattern 4: BFS shortest path (Queue) ────────────────────────────────────
def bfs_shortest_path(graph, start, end):
    """O(V + E) — queue ensures shortest path in unweighted graph."""
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
    return -1  # no path found

# ─── Pattern 5: Sliding window max (Monotonic Deque) ─────────────────────────
def sliding_window_max(nums, k):
    """O(n) — deque maintains decreasing order within window."""
    dq = deque()  # stores indices, values decrease from front to back
    result = []
    for i, n in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements (they can never be the max)
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])  # front is always the max
    return result`}
      </CodeBlock>

      <SectionHeader number={5} title="Common Interview Mistakes in Structure Choice" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Array when HashSet is better', description: 'Any time you write "if x in list" in a loop, you have O(n²). Convert list to set first: seen = set(arr). Now membership check is O(1). Classic: "contains duplicate" solved in O(n) with a set, O(n²) with nested loops.' },
        { title: 'Sort when Heap is better', description: 'For "k largest" problems, sorting is O(n log n) and uses O(n) extra space. A min-heap of size k is O(n log k) and O(k) space. When k << n, the heap is significantly faster. Never sort to get only k elements from a large array.' },
        { title: 'Queue with array.shift()', description: 'JavaScript array.shift() is O(n) — it moves all elements. Use a head pointer trick or a proper deque structure. For BFS, using array with shift() makes BFS O(n²) instead of O(n). Python: use collections.deque; JavaScript: maintain a head index.' },
        { title: 'Recursive DFS without memoization', description: 'Many tree/graph problems look like DFS but have overlapping subproblems. Without memoization (a HashMap of computed results), you recompute the same paths exponentially. Always ask: "have I seen this state before?" and cache results in a HashMap.' },
      ]} />

      <AlertBox type="tip" title="Two-pointer + sorted array vs HashMap — space trade-off">
        For "find pairs that sum to target", two approaches: 1) Sort + two pointers: O(n log n)
        time, O(1) extra space. 2) HashMap: O(n) time, O(n) space. If the problem requires
        returning indices (not just values), HashMap is necessary. If only the existence of
        the pair matters and space is constrained, sort + two pointers wins. Always consider
        the space constraint when choosing between these approaches.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I know if an interview problem needs a tree vs a graph?',
          answer: 'Trees are special graphs: connected, acyclic (no cycles), with a single root. Use tree data structures when data has a natural parent-child hierarchy (file systems, HTML DOM, org charts, expression parsing). Use general graphs when: nodes can have multiple parents (not a tree anymore), cycles are possible (social networks, dependency graphs), or relationships are bidirectional with no root (road networks, routing problems). The key signal: if the problem says "root", "parent", "children" — it\'s a tree. If it says "path", "connection", "reachable" — think graph.',
        },
        {
          question: 'When should I use a sorted set instead of a sorted array?',
          answer: 'Use a sorted set (TreeSet in Java, SortedList in Python with bisect, or a BST) when you need O(log n) insertions AND queries on ordered data. Dynamic data — elements are frequently added or removed. Use a sorted array + binary search when: data is built once (or rarely modified) and then only queried. Inserting into a sorted array requires O(n) shifting. The golden rule: if you\'re inserting while also querying, use a sorted set. If data is static after construction, a sorted array with binary search is simpler and faster in practice.',
        },
        {
          question: 'What is the most commonly misused data structure?',
          answer: 'Arrays used where HashSets should be for membership testing. The classic mistake: using an array to check "is x in my collection?" with linear search O(n) when a Set would give O(1) membership testing. Any time you find yourself writing "if x in array" repeatedly inside a loop, convert to a set first. The transformation is always: seen = set(my_list). This single change often turns O(n²) into O(n). The second most common: using sort when a heap is appropriate for "top K" patterns.',
        },
        {
          question: 'When should I use a Trie vs a HashMap for string problems?',
          answer: 'Use a Trie when: 1) You need prefix searches ("find all words starting with \'pre\'"). 2) You have a large dictionary and many short prefix queries. 3) You need to find the longest common prefix. Use a HashMap when: you need exact word lookups only, the word set is small, or the implementation complexity of a Trie is not justified. HashMap with O(m) lookup (m = string length) is often equivalent to Trie lookup but far simpler to implement.',
        },
        {
          question: 'How do I decide between BFS and DFS?',
          answer: 'BFS (Queue): use when you want the SHORTEST PATH or MINIMUM STEPS in an unweighted graph. BFS finds the solution closest to the start. Use for: maze shortest path, word ladder, level-order traversal. DFS (Stack or recursion): use when you want to EXPLORE ALL PATHS or DETECT CYCLES. DFS goes deep before backtracking. Use for: topological sort, detecting cycles, generating all combinations/permutations, flood fill. Key heuristic: "shortest" → BFS, "all" or "exists" → DFS.',
        },
        {
          question: 'Is it ever correct to use O(n²) with nested loops?',
          answer: 'Yes — when n is small (n ≤ 1000), an O(n²) solution is often fine and simpler to write. During coding interviews, if n ≤ 100, brute force is almost always acceptable. For n ≤ 10,000, O(n²) is borderline — may or may not pass. For n ≥ 100,000, you need O(n log n) or O(n). Always check constraints first. If the problem says n ≤ 10, brute force is correct. If n ≤ 10^5 or 10^6, you need an efficient structure.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
