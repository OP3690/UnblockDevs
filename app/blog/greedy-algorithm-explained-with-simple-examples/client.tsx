'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function GreedyAlgorithmExplainedWithSimpleExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Greedy Algorithm Explained With Simple Examples</h1>
      <p className="lead">
        A greedy algorithm makes the locally optimal choice at each step, hoping to find the global optimum.
        It's fast, simple, and works surprisingly well for many problems — often reducing O(n²) dynamic
        programming solutions to a single O(n log n) sort followed by a linear pass. This guide explains
        the core greedy-choice property, when greedy works vs fails, covers the most common interview
        patterns with complete code examples, and shows how to prove correctness using exchange arguments.
      </p>

      <StatGrid stats={[
        { value: 'Local best', label: 'choice at each step — never revisits decisions', color: 'blue' },
        { value: 'O(n log n)', label: 'typical — sort + single pass', color: 'green' },
        { value: 'No backtrack', label: 'committed to each decision permanently', color: 'purple' },
        { value: 'Proof required', label: 'must verify greedy-choice property before using', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Idea — What Makes Greedy Work" />
      <QuickFact color="blue" label="The greedy intuition">
        Greedy is like always taking the biggest coin when making change. At each step, choose the option
        that looks best right now. No planning ahead, no reconsidering past decisions.
        Simple and fast — but only correct when the problem has the "greedy-choice property":
        making the locally best choice at each step leads to a globally optimal solution.
      </QuickFact>
      <p>
        Two conditions must hold for greedy to be correct: the <strong>greedy-choice property</strong>
        (a global optimum can be reached by making locally optimal choices) and <strong>optimal
        substructure</strong> (the optimal solution contains optimal solutions to its subproblems).
        Without these, greedy gives a suboptimal answer — and the algorithm doesn't know.
      </p>

      <SectionHeader number={2} title="When Greedy Works and When It Fails" />
      <CompareTable
        leftLabel="Greedy Works ✅"
        rightLabel="Greedy Fails ❌"
        rows={[
          { label: 'Coin change (standard denominations)', left: 'US coins: always take largest coin ≤ remaining', right: 'Coins [1,3,4], target 6: greedy picks 4+1+1=3 coins, optimal is 3+3=2 coins' },
          { label: 'Activity selection / interval scheduling', left: 'Sort by end time, take earliest-ending first', right: 'Weighted interval scheduling: need DP when intervals have values' },
          { label: 'Fractional knapsack', left: 'Take items by value/weight ratio (can split items)', right: '0/1 knapsack: items can\'t be split, greedy fails — use DP' },
          { label: 'Dijkstra\'s shortest path', left: 'Always process closest unvisited node', right: 'Negative edges: greedy choice becomes wrong — use Bellman-Ford' },
          { label: 'Huffman coding', left: 'Always merge two smallest frequencies', right: '—' },
          { label: 'Jump Game (can you reach end?)', left: 'Track max reachable index', right: 'Jump Game II (minimum jumps) requires careful greedy, not obvious' },
        ]}
      />

      <AlertBox type="warning" title="Greedy ≠ always optimal">
        Greedy algorithms require proof that local optimality leads to global optimality.
        For the 0/1 knapsack (items can't be split), greedy fails completely. The danger:
        greedy runs without error and returns a wrong answer silently. Always verify with
        small counterexamples before relying on greedy for a new problem type.
      </AlertBox>

      <SectionHeader number={3} title="Classic 1: Activity Selection Problem" />
      <p>
        Given intervals representing activities with start and end times, find the maximum number
        of non-overlapping activities you can attend. The greedy insight: always pick the activity
        that ends earliest — this leaves the most room for future activities.
      </p>
      <CodeBlock lang="javascript" title="Activity Selection — Greedy by End Time">
{`// Given intervals, find max number of non-overlapping activities
function activitySelection(intervals) {
  // Sort by end time (greedy choice: finish earliest first)
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= lastEnd) { // starts after last ends
      count++;
      lastEnd = intervals[i][1];
    }
  }

  return count;
}

// Walkthrough:
// Intervals sorted by end: [[1,3],[2,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]
// Take [1,3]: lastEnd=3, count=1
// Skip [2,4]: starts at 2 < lastEnd=3
// Take [3,5]: starts at 3 >= lastEnd=3, count=2, lastEnd=5
// Take [5,7]: starts at 5 >= lastEnd=5, count=3, lastEnd=7
// Take [8,11]: starts at 8 >= lastEnd=7, count=4, lastEnd=11
// Take [12,16]: starts at 12 >= lastEnd=11, count=5

activitySelection([[1,3],[2,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]);
// → 5`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic 2: Jump Game — Can You Reach the End?" />
      <p>
        Each element in an array tells you the maximum number of steps you can jump forward from that position.
        The greedy key: track the furthest index reachable at each step. If you're ever at a position
        beyond the max reach, you're stuck.
      </p>
      <CodeBlock lang="javascript" title="Jump Game — Greedy Maximum Reach">
{`// Greedy: track the furthest reachable index at each position
function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // stuck — can't reach position i
    maxReach = Math.max(maxReach, i + nums[i]); // extend reach
    if (maxReach >= nums.length - 1) return true; // reached end
  }

  return true;
}

canJump([2,3,1,1,4]); // → true  (0→1→4 or 0→2→3→4)
canJump([3,2,1,0,4]); // → false (always gets stuck at index 3, jump=0)

// Jump Game II — Minimum Jumps (Greedy Level BFS)
function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;  // furthest position reachable with 'jumps' jumps
  let farthest = 0;    // furthest position reachable with 'jumps+1' jumps

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) { // used up all positions at current jump count
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}

jump([2,3,1,1,4]); // → 2 (0→1→4)
jump([2,3,0,1,4]); // → 2 (0→1→4)`}
      </CodeBlock>

      <SectionHeader number={5} title="Classic 3: Minimum Arrows to Burst Balloons" />
      <CodeBlock lang="javascript" title="Minimum Arrows to Burst Balloons — LeetCode #452">
{`// Each balloon is an interval [start, end]. One arrow shot at x bursts all balloons where start≤x≤end.
// Find minimum arrows needed to burst all balloons.
function findMinArrowShots(points) {
  points.sort((a, b) => a[1] - b[1]); // sort by end position

  let arrows = 1;
  let arrowPos = points[0][1]; // shoot first arrow at end of first balloon

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowPos) { // this balloon starts AFTER current arrow position
      arrows++;                     // need a new arrow
      arrowPos = points[i][1];      // shoot it at this balloon's end
    }
    // else: current arrow already bursts this balloon too (it overlaps)
  }

  return arrows;
}

// Walkthrough: [[10,16],[2,8],[1,6],[7,12]]
// Sorted by end: [[1,6],[2,8],[7,12],[10,16]]
// Arrow 1 at x=6: bursts [1,6] and [2,8] (both contain 6)
// [7,12]: starts at 7 > 6 → Arrow 2 at x=12: bursts [7,12] and [10,16]
// Result: 2 arrows

findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]); // → 2
findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]);    // → 4 (no overlaps)`}
      </CodeBlock>

      <SectionHeader number={6} title="Classic 4: Gas Station" />
      <CodeBlock lang="javascript" title="Gas Station — LeetCode #134">
{`// n gas stations in a circle. gas[i] = gas at station i, cost[i] = cost to reach station i+1.
// Find starting station for a full circuit, or return -1.
function canCompleteCircuit(gas, cost) {
  let totalGas = 0;     // total surplus across all stations
  let currentGas = 0;   // current surplus from the candidate start
  let start = 0;        // candidate starting station

  for (let i = 0; i < gas.length; i++) {
    const surplus = gas[i] - cost[i];
    totalGas += surplus;
    currentGas += surplus;

    // If we can't reach station i+1 from current 'start', reset
    if (currentGas < 0) {
      start = i + 1;    // try starting from the next station
      currentGas = 0;   // reset running surplus
    }
  }

  // If total gas < total cost, no solution exists
  return totalGas >= 0 ? start : -1;
}

// Key insight: if total gas >= total cost, a solution always exists.
// The greedy: if we run out of gas at station k, no station between
// start and k can be the starting point (they'd run out even sooner).

canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]); // → 3
canCompleteCircuit([2,3,4], [3,4,3]);          // → -1`}
      </CodeBlock>

      <SectionHeader number={7} title="Classic 5: Fractional Knapsack" />
      <ErrorFix
        title="0/1 Knapsack vs Fractional Knapsack — When Greedy Works"
        bad={`// ❌ 0/1 Knapsack: items can't be split — greedy fails
// Items: [{weight:3, value:4}, {weight:4, value:5}, {weight:5, value:6}], capacity=7
// Greedy by value/weight ratio: 4/3=1.33, 5/4=1.25, 6/5=1.2
// Takes item0 (3kg,4val) + item1 (4kg,5val) = 7kg, value=9
// But optimal: item1 (4kg,5val) + item2 (3kg of item2 at 6/5=3.6) — wrong for 0/1
// Actually 0/1 optimal: item0+item2=3+5=8kg>7 too heavy; item1+item2=9kg>7 too heavy
// Only item0+item1=7kg, value=9 OR item2 alone=5kg, value=6
// In THIS case greedy gets the right answer but it's not always correct for 0/1`}
        good={`// ✅ Fractional Knapsack: can take fractions — greedy by value/weight ratio is optimal
function fractionalKnapsack(items, capacity) {
  // Sort by value-to-weight ratio (greedy choice)
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let totalValue = 0;
  let remaining = capacity;

  for (const item of items) {
    if (remaining <= 0) break;

    const take = Math.min(item.weight, remaining); // take all or partial
    totalValue += take * (item.value / item.weight);
    remaining -= take;
  }

  return totalValue;
}

const items = [
  { weight: 10, value: 60 },  // ratio: 6
  { weight: 20, value: 100 }, // ratio: 5
  { weight: 30, value: 120 }, // ratio: 4
];

fractionalKnapsack(items, 50); // → 240 (all of item0, all of item1, 20/30 of item2)`}
        badLabel="0/1 Knapsack — use Dynamic Programming"
        goodLabel="Fractional Knapsack — greedy by value/weight ratio is provably optimal"
      />

      <SectionHeader number={8} title="Greedy vs Dynamic Programming" />
      <KeyPointsGrid columns={2} items={[
        {
          title: 'Use Greedy When',
          description: 'Problem has greedy-choice property (proven or well-known). Keywords: scheduling, intervals, minimum/maximum single dimension. Exchange argument shows greedy is safe. O(n log n) preferred over O(n²) DP.',
        },
        {
          title: 'Use Dynamic Programming When',
          description: 'Choices depend on future or previous choices. 0/1 selection (can\'t partially take items). Multiple constraints simultaneously. Counting ways rather than optimizing value.',
        },
        {
          title: 'The Decision Process',
          description: 'Try greedy first — sketch an exchange argument. If you can always swap a non-greedy choice for the greedy one without making it worse, greedy is correct. If you find a counterexample with small inputs, switch to DP.',
        },
        {
          title: 'Common Greedy Interview Patterns',
          description: 'Sort by end time (interval scheduling). Sort by ratio (fractional knapsack, task scheduling). Track running maximum (jump game). Merge smallest (Huffman). Always-reset start (gas station).',
        },
      ]} />

      <SectionHeader number={9} title="How to Prove a Greedy Algorithm Correct" />
      <VerticalSteps steps={[
        { title: 'State the greedy choice', desc: 'Define precisely what "locally optimal" means at each step. Example: "always pick the activity with the earliest end time."' },
        { title: 'Exchange argument', desc: 'Assume an optimal solution OPT differs from greedy solution G. Find the first position where they differ. Show you can swap OPT\'s choice for G\'s choice without making the solution worse.' },
        { title: 'Repeat the swap', desc: 'Apply the exchange repeatedly until OPT looks exactly like G. This shows G is at least as good as any other solution — therefore G is optimal.' },
        { title: 'Verify optimal substructure', desc: 'After making the greedy choice, confirm the remaining subproblem is the same type as the original. The same greedy choice applies recursively.' },
        { title: 'Test with counterexamples', desc: 'Try small inputs where greedy might fail. If you find a counterexample, greedy is wrong. Try arbitrary coin denominations, items with specific weight/value ratios, or graphs with unusual structure.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I prove a greedy algorithm is correct?',
          answer: 'Use an "exchange argument": assume the optimal solution differs from the greedy solution. Find the first position where they differ. Show you can swap the optimal\'s choice for the greedy choice without making the solution worse. Repeat the swap until the optimal solution equals the greedy solution — proving they have the same quality. This is the standard proof technique for activity selection, fractional knapsack, and Huffman coding.',
        },
        {
          question: 'When does greedy fail for coin change?',
          answer: 'For coins [1,3,4] and target 6: greedy takes 4 (largest ≤ 6), then needs 2 more. Greedy takes 1+1 = 3 coins total. Optimal is 3+3 = 2 coins. Greedy fails because taking the locally-largest coin creates a sub-optimal remainder. Use DP for arbitrary coin denominations. US standard coins (1¢, 5¢, 10¢, 25¢) work with greedy because of their specific mathematical properties.',
        },
        {
          question: 'Is Dijkstra\'s algorithm greedy?',
          answer: 'Yes — Dijkstra\'s always processes the unvisited node with the minimum current distance. This greedy choice works because edge weights are non-negative: once you\'ve found the shortest path to a node, no future path through other nodes can be shorter (since adding more non-negative edges only increases cost). With negative edges, the greedy choice can lead to a wrong result, which is why Bellman-Ford (which considers all edges repeatedly) is needed.',
        },
        {
          question: 'What is Huffman coding and why is it greedy?',
          answer: 'Huffman coding builds an optimal prefix-free binary code for data compression. The greedy rule: always merge the two nodes with the lowest frequencies into a new internal node. This is provably optimal via exchange argument — swapping any pair of frequencies in the merging order can only increase the total code length. The resulting tree assigns shorter codes to more frequent characters, minimizing total encoded length.',
        },
        {
          question: 'How do I recognize greedy problems in interviews?',
          answer: 'Common patterns: interval scheduling ("given N meetings, fit as many as possible"), resource allocation ("assign tasks to minimize time"), single-constraint optimization ("maximize value given one constraint"). Key question: does making the best local choice ever need to be undone? If you can always commit to a decision and never look back — it\'s likely greedy. If each decision depends on previous choices in complex ways — use DP.',
        },
        {
          question: 'Can greedy be combined with other algorithms?',
          answer: 'Yes — greedy is frequently used as a component inside larger algorithms. Dijkstra\'s uses a greedy selection inside a graph traversal. Kruskal\'s MST sorts edges greedily then applies union-find. Prim\'s MST uses a greedy min-heap selection. Many divide-and-conquer algorithms use greedy choices at the merge step. The pattern: greedy handles the "which element to process next" decision, while another technique handles the overall structure.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
