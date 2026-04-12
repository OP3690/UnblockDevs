'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function GreedyAlgorithmExplainedWithSimpleExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Greedy Algorithm Explained with Simple Examples (2026)</h1>
      <p className="lead">
        A greedy algorithm is one of the most intuitive strategies in computer science: at every step,
        pick the locally best option and never look back. This guide explains the concept from scratch,
        walks through five classic problems with working code, and tells you exactly when greedy works —
        and when it fails.
      </p>

      <StatGrid stats={[
        { value: 'O(n log n)', label: 'Typical greedy time complexity', color: 'green' },
        { value: '5', label: 'Classic problems covered', color: 'blue' },
        { value: '2', label: 'Properties required for greedy to work', color: 'purple' },
        { value: 'Never', label: 'Revisits a previous choice', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Greedy Algorithm?" />

      <p>
        A <strong>greedy algorithm</strong> builds a solution step by step, always making the choice that
        looks best <em>right now</em> — the locally optimal choice. It never backtracks or reconsiders
        earlier decisions. The hope (and for many famous problems, the provable guarantee) is that a
        sequence of locally optimal choices produces a globally optimal solution.
      </p>

      <QuickFact>The name "greedy" comes from the strategy's nature: take the most immediately attractive option without worrying about tomorrow.</QuickFact>

      <p>
        Greedy algorithms require two mathematical properties to be proven correct:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Greedy Choice Property',
          description: 'A globally optimal solution can always be reached by making a locally optimal (greedy) choice at the current step. The greedy choice is safe to commit to.',
        },
        {
          title: 'Optimal Substructure',
          description: 'The optimal solution to the full problem contains the optimal solutions to its subproblems. Greedy choices reduce the problem to a smaller subproblem.',
        },
      ]} />

      <AlertBox type="info" title="When greedy is NOT correct">
        If a problem lacks the greedy choice property, a locally optimal choice can block the globally
        optimal path. The classic counterexample is the 0/1 Knapsack problem — greedy fails; dynamic
        programming is needed.
      </AlertBox>

      <SectionHeader number={2} title="Greedy vs Dynamic Programming vs Brute Force" />

      <CompareTable
        leftLabel="Greedy"
        rightLabel="Dynamic Programming"
        rows={[
          { label: 'Choices', left: 'Makes one locally optimal choice and commits', right: 'Explores all choices, stores results in a table' },
          { label: 'Time complexity', left: 'Usually O(n log n) or O(n)', right: 'Usually O(n²) or O(n·W)' },
          { label: 'Space complexity', left: 'O(1) to O(n)', right: 'O(n) to O(n²) for the DP table' },
          { label: 'Optimality', left: 'Optimal ONLY when greedy choice property holds', right: 'Always optimal' },
          { label: 'Implementation', left: 'Simple', right: 'More complex — requires recurrence relation' },
          { label: 'Use when', left: 'Activity selection, MST, fractional knapsack', right: '0/1 knapsack, longest common subsequence, edit distance' },
        ]}
      />

      <SectionHeader number={3} title="Example 1 — Coin Change (Make Change Greedily)" />

      <p>
        The classic greedy intuition: when making change, always use the largest coin that fits. This works
        perfectly with standard denominations (US coins, Euros) but fails for arbitrary denominations.
      </p>

      <CodeBlock language="python" filename="coin_change_greedy.py">
{`def make_change_greedy(amount: int, coins: list[int]) -> list[int]:
    """
    Greedy coin change — works only when coins have the 'canonical' property.
    e.g., coins = [25, 10, 5, 1] (US cents)
    """
    coins = sorted(coins, reverse=True)  # largest first
    result = []

    for coin in coins:
        while amount >= coin:
            result.append(coin)
            amount -= coin

    return result

# Works correctly for US coins
print(make_change_greedy(41, [25, 10, 5, 1]))
# → [25, 10, 5, 1]  (4 coins — optimal)

# FAILS for arbitrary coins
# make_change_greedy(6, [4, 3, 1]) → [4, 1, 1] (3 coins)
# Optimal is [3, 3] (2 coins) — greedy misses it!`}
      </CodeBlock>

      <AlertBox type="warning" title="When coin change greedy fails">
        For coins like [4, 3, 1], greedy picks 4+1+1=3 coins to make 6 cents.
        But [3, 3] gives 2 coins — optimal. Use dynamic programming for arbitrary coin sets.
      </AlertBox>

      <SectionHeader number={4} title="Example 2 — Activity Selection (Interval Scheduling)" />

      <p>
        Given a set of activities with start and end times, select the maximum number of non-overlapping
        activities. Greedy strategy: always pick the activity that finishes earliest.
      </p>

      <CodeBlock language="python" filename="activity_selection.py">
{`def activity_selection(activities: list[tuple[int, int]]) -> list[tuple[int, int]]:
    """
    Select maximum number of non-overlapping activities.
    activities = list of (start_time, end_time)

    Greedy choice: always pick the activity with the earliest finish time.
    This is provably optimal (greedy choice property holds).
    """
    # Sort by end time (the greedy key)
    sorted_acts = sorted(activities, key=lambda x: x[1])

    selected = [sorted_acts[0]]
    last_end = sorted_acts[0][1]

    for start, end in sorted_acts[1:]:
        if start >= last_end:          # no overlap
            selected.append((start, end))
            last_end = end

    return selected


activities = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11)]
result = activity_selection(activities)
print(result)
# → [(1, 4), (5, 7), (8, 11)]  — 3 activities, maximum possible
# Time complexity: O(n log n) for sorting`}
      </CodeBlock>

      <FlowDiagram steps={[
        { label: 'Sort by finish time', color: 'blue' },
        { label: 'Select first activity', color: 'green' },
        { label: 'Skip overlapping activities', color: 'amber' },
        { label: 'Select next compatible activity', color: 'green' },
        { label: 'Repeat until end', color: 'green' },
      ]} />

      <SectionHeader number={5} title="Example 3 — Fractional Knapsack" />

      <p>
        You have a knapsack with a weight limit. Items have weight and value. You can take fractions of
        items (unlike 0/1 Knapsack). Greedy works here: sort by value/weight ratio and take greedily.
      </p>

      <CodeBlock language="python" filename="fractional_knapsack.py">
{`def fractional_knapsack(capacity: int, items: list[tuple[str, int, int]]) -> float:
    """
    Maximize value in knapsack. Fractions of items allowed.
    items = [(name, weight, value), ...]

    Greedy choice: pick item with highest value-per-weight first.
    This is provably optimal for fractional knapsack.
    """
    # Sort by value-per-weight ratio descending (the greedy key)
    sorted_items = sorted(items, key=lambda x: x[2] / x[1], reverse=True)

    total_value = 0.0
    remaining = capacity

    for name, weight, value in sorted_items:
        if remaining == 0:
            break
        take = min(weight, remaining)  # take as much as fits
        fraction = take / weight
        total_value += fraction * value
        remaining -= take
        print(f"Take {fraction*100:.0f}% of '{name}': +{fraction*value:.1f} value")

    return total_value


items = [
    ("Gold",     5,  500),   # 100 value/kg
    ("Silver",   10, 600),   # 60 value/kg
    ("Bronze",   20, 800),   # 40 value/kg
]
result = fractional_knapsack(15, items)
print(f"Total value: {result}")
# Take 100% of 'Gold': +500 value
# Take 100% of 'Silver': +600 value  (capacity now 0)
# Wait — capacity = 15, Gold=5kg, Silver=10kg → exactly fills it
# Total value: 1100.0  ← optimal`}
      </CodeBlock>

      <ErrorFix
        badLabel="0/1 Knapsack — greedy FAILS (do NOT use)"
        bad={`# items: [(weight=3, value=4), (weight=4, value=5), (weight=5, value=6)]
# capacity = 7
# Greedy ratio: 4/3=1.33, 5/4=1.25, 6/5=1.2
# Greedy picks item1 (w=3), then no room for item2 → value = 4+6 = 10... wait
# Actually picks item1 (w=3, v=4) + item3 (w=5-wait exceeds 7-3=4)
# Greedy: take item1(3kg,4) + item2(4kg,5) = 7kg, value=9
# Missing: item2(4kg,5)+item3(5kg,6) impossible, but item1+item2=9 vs item2+item3=11
# Greedy misses item2+item3 combination — not optimal`}
        goodLabel="0/1 Knapsack — use Dynamic Programming"
        good={`def knapsack_01(capacity, weights, values):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]  # skip item
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                               dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]`}
      />

      <SectionHeader number={6} title="Example 4 — Minimum Spanning Tree (Kruskal's Algorithm)" />

      <p>
        Given a weighted graph, find the subset of edges that connects all vertices with minimum total
        weight. Kruskal's algorithm is a direct application of the greedy strategy.
      </p>

      <CodeBlock language="python" filename="kruskals_mst.py">
{`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # already connected — skip this edge
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True


def kruskal_mst(n: int, edges: list[tuple[int, int, int]]) -> list[tuple[int, int, int]]:
    """
    Kruskal's MST — greedy algorithm.
    edges = [(weight, u, v), ...]

    Greedy choice: always add the cheapest edge that doesn't form a cycle.
    """
    edges = sorted(edges)     # sort by weight ascending
    uf = UnionFind(n)
    mst = []

    for weight, u, v in edges:
        if uf.union(u, v):    # greedy: add if no cycle
            mst.append((weight, u, v))
        if len(mst) == n - 1:
            break             # MST is complete

    return mst


edges = [(4,0,1), (8,0,7), (11,1,7), (7,1,2), (2,7,8), (6,7,6), (1,8,6), (2,8,2), (4,2,5), (14,2,3), (9,3,4), (10,3,5), (2,5,4), (6,6,5)]
mst = kruskal_mst(9, edges)
print("MST edges:", mst)
print("Total weight:", sum(w for w,_,_ in mst))`}
      </CodeBlock>

      <SectionHeader number={7} title="Example 5 — Huffman Coding (Optimal Prefix Codes)" />

      <p>
        Huffman coding assigns shorter bit strings to more frequent characters. It uses a greedy
        min-heap strategy: repeatedly merge the two lowest-frequency nodes.
      </p>

      <CodeBlock language="python" filename="huffman_coding.py">
{`import heapq
from dataclasses import dataclass, field
from typing import Optional

@dataclass(order=True)
class Node:
    freq: int
    char: Optional[str] = field(compare=False, default=None)
    left: Optional['Node'] = field(compare=False, default=None)
    right: Optional['Node'] = field(compare=False, default=None)


def huffman_codes(frequencies: dict[str, int]) -> dict[str, str]:
    """
    Greedy choice: always merge the two nodes with the lowest frequency.
    This produces an optimal prefix-free binary code.
    """
    heap = [Node(freq, char) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        a = heapq.heappop(heap)    # lowest frequency
        b = heapq.heappop(heap)    # second lowest
        merged = Node(a.freq + b.freq, left=a, right=b)
        heapq.heappush(heap, merged)

    root = heap[0]
    codes: dict[str, str] = {}

    def traverse(node: Node, prefix: str = ''):
        if node.char:
            codes[node.char] = prefix or '0'
        else:
            if node.left:
                traverse(node.left, prefix + '0')
            if node.right:
                traverse(node.right, prefix + '1')

    traverse(root)
    return codes


freq = {'a': 45, 'b': 13, 'c': 12, 'd': 16, 'e': 9, 'f': 5}
codes = huffman_codes(freq)
for char, code in sorted(codes.items()):
    print(f"  {char}: {code}  (freq={freq[char]})")
# a: 0       (most frequent → shortest code)
# b: 101
# c: 100
# d: 111
# e: 1101
# f: 1100    (least frequent → longest code)`}
      </CodeBlock>

      <SectionHeader number={8} title="The Greedy Algorithm Template" />

      <VerticalSteps steps={[
        {
          title: 'Identify the greedy choice',
          description: 'What is the locally optimal decision at each step? Sort by end time, ratio, weight, etc.',
        },
        {
          title: 'Prove greedy choice property',
          description: 'Show that the local choice is always part of some optimal solution. Exchange argument: if you replaced the greedy choice with another, the solution would not improve.',
        },
        {
          title: 'Prove optimal substructure',
          description: 'Show that after making the greedy choice, the remaining subproblem also has an optimal solution that can be greedily solved.',
        },
        {
          title: 'Implement',
          description: 'Sort input (usually), then iterate making the greedy choice.',
          code: `# Generic greedy skeleton
def greedy(input_data):
    sorted_data = sorted(input_data, key=greedy_key)
    result = []
    state = initial_state()
    for item in sorted_data:
        if is_feasible(item, state):
            result.append(item)
            state = update(state, item)
    return result`,
        },
        {
          title: 'Verify with counterexamples',
          description: 'Run small test cases, including edge cases. If you find a counterexample, greedy does not apply — switch to dynamic programming.',
        },
      ]} />

      <SectionHeader number={9} title="Common Greedy Problems at a Glance" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Activity Selection',
          description: 'Select max non-overlapping intervals. Greedy key: earliest end time. O(n log n).',
        },
        {
          title: 'Fractional Knapsack',
          description: 'Maximize value with weight limit, fractions allowed. Greedy key: value/weight ratio. O(n log n).',
        },
        {
          title: "Kruskal's MST",
          description: 'Minimum spanning tree. Greedy key: smallest edge weight. O(E log E).',
        },
        {
          title: "Prim's MST",
          description: 'Alternative MST algorithm. Greedy key: cheapest edge connecting tree to non-tree vertex. O(E log V).',
        },
        {
          title: 'Huffman Coding',
          description: 'Optimal prefix codes. Greedy key: merge two lowest-frequency nodes. O(n log n).',
        },
        {
          title: "Dijkstra's Shortest Path",
          description: 'Shortest path from source. Greedy key: nearest unvisited vertex. O((V+E) log V).',
        },
        {
          title: 'Job Scheduling',
          description: 'Minimize lateness or maximize profit. Greedy key: deadline or profit/duration ratio.',
        },
        {
          title: 'Coin Change (canonical coins)',
          description: 'Minimum coins for standard denominations. Greedy key: largest coin first.',
        },
      ]} />

      <SectionHeader number={10} title="Timeline: History of Key Greedy Algorithms" />

      <TimelineViz events={[
        { year: '1952', title: 'Huffman Coding', description: 'David Huffman publishes optimal prefix-free coding, a pure greedy algorithm still used in DEFLATE/ZIP/JPEG today.', color: 'blue' },
        { year: '1956', title: "Kruskal's Algorithm", description: 'Joseph Kruskal presents greedy MST construction by always adding the cheapest safe edge.', color: 'green' },
        { year: '1957', title: "Prim's Algorithm", description: 'Robert Prim independently derives the greedy MST algorithm starting from a single vertex.', color: 'green' },
        { year: '1959', title: "Dijkstra's Algorithm", description: 'Edsger Dijkstra publishes greedy shortest-path algorithm for graphs with non-negative weights.', color: 'purple' },
        { year: '1971', title: 'Activity Selection Proof', description: 'Formal proof that earliest-finish-time greedy is optimal for interval scheduling.', color: 'amber' },
        { year: '1974', title: 'Matroid Theory', description: 'General mathematical framework proving which problems have the greedy choice property.', color: 'blue' },
      ]} />

      <SectionHeader number={11} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What is a greedy algorithm in simple terms?',
          answer: 'A greedy algorithm is like a hungry person at a buffet who always grabs the most attractive dish on the current pass — never going back to swap a choice. At every step it picks the locally best option. For many famous problems (activity scheduling, Huffman coding, MST) this strategy is provably optimal. For others (0/1 knapsack) it is not.',
        },
        {
          question: 'How do you know if a greedy algorithm will give the optimal answer?',
          answer: 'You need to prove two properties: (1) Greedy Choice Property — the locally optimal choice at the current step is always part of some globally optimal solution. This is usually proved with an "exchange argument": show that swapping the greedy choice for any other choice can only make things worse or equal. (2) Optimal Substructure — after the greedy choice, the remaining subproblem has the same structure and can be solved optimally by the same greedy strategy.',
        },
        {
          question: 'What is the difference between greedy and dynamic programming?',
          answer: 'Greedy commits to one locally optimal choice per step and never revisits it — running in O(n log n) time. Dynamic programming explores all possibilities, stores subproblem results in a table to avoid recomputation, and is always optimal — but at O(n²) or higher cost. Use greedy when the greedy choice property is proven; use DP when you need guaranteed optimality but greedy is incorrect.',
        },
        {
          question: 'Does greedy always give an optimal solution?',
          answer: 'No. Greedy is only optimal when the problem has the greedy choice property. Counterexamples: the 0/1 Knapsack problem (use DP), the travelling salesman problem (use exact algorithms or approximations), and coin change with arbitrary denominations (use DP). Always verify with small examples or a formal proof before trusting greedy.',
        },
        {
          question: 'What are the most common greedy algorithm problems in coding interviews?',
          answer: 'Top interview problems: (1) Activity Selection / Meeting Rooms, (2) Jump Game (LeetCode #55), (3) Gas Station (LeetCode #134), (4) Assign Cookies (LeetCode #455), (5) Minimum number of arrows to burst balloons, (6) Task Scheduler, (7) Partition Labels. In each case, find the natural "greedy key" to sort or prioritize by — end time, ratio, position — then iterate once.',
        },
        {
          question: 'Is Dijkstra\'s algorithm a greedy algorithm?',
          answer: "Yes. Dijkstra's algorithm is a greedy algorithm: at each step it selects the unvisited vertex with the smallest current known distance (the greedy choice) and relaxes its neighbors. The greedy choice property holds because all edge weights are non-negative — once a vertex is finalized, no future path can improve its distance. With negative weights the greedy choice property breaks, which is why Bellman-Ford (dynamic programming) is needed instead.",
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
