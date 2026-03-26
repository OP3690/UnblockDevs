'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function GreedyAlgorithmExplainedWithSimpleExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Greedy Algorithm Explained With Simple Examples</h1>
      <p className="lead">
        A greedy algorithm makes the locally optimal choice at each step, hoping to find the global optimum.
        It's fast, simple, and works surprisingly well for many problems. This guide explains when greedy
        works, when it fails, and covers the most common patterns with code.
      </p>

      <StatGrid stats={[
        { value: 'Local best', label: 'choice at each step', color: 'blue' },
        { value: 'O(n log n)', label: 'typical — sort + single pass', color: 'green' },
        { value: 'No backtrack', label: 'never revisits decisions', color: 'purple' },
        { value: 'Doesn\'t always', label: 'work — proof required', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact>
        Greedy is like always taking the biggest coin when making change. At each step, choose the option
        that looks best right now. No planning ahead, no reconsidering past decisions.
        Simple and fast — but only correct when the problem has the "greedy-choice property."
      </QuickFact>

      <SectionHeader number={2} title="When Greedy Works (and When It Fails)" />
      <CompareTable
        leftLabel="Greedy Works ✅"
        rightLabel="Greedy Fails ❌"
        rows={[
          { label: 'Coin change (standard denominations)', left: 'US coins: always take largest coin ≤ remaining', right: 'Arbitrary coins: greedy gives wrong answer' },
          { label: 'Activity selection', left: 'Sort by end time, take earliest-ending', right: '—' },
          { label: 'Fractional knapsack', left: 'Take items by value/weight ratio', right: '0/1 knapsack: greedy fails, need DP' },
          { label: 'Dijkstra\'s shortest path', left: 'Always process closest unvisited node', right: 'Negative edges: use Bellman-Ford' },
          { label: 'Huffman coding', left: 'Always merge two smallest frequencies', right: '—' },
        ]}
      />

      <AlertBox type="warning" title="Greedy ≠ always optimal">
        Greedy algorithms require proof that local optimality leads to global optimality.
        For the 0/1 knapsack (items can't be split), greedy fails. Use dynamic programming when
        you need to consider all possibilities.
      </AlertBox>

      <SectionHeader number={3} title="Classic 1: Activity Selection Problem" />
      <CodeBlock language="javascript" filename="Activity Selection — Greedy by End Time">
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

activitySelection([[1,3],[2,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]);
// → 4`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic 2: Jump Game" />
      <CodeBlock language="javascript" filename="Jump Game — Can You Reach the End?">
{`// Greedy: track the furthest reachable index
function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // stuck
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
}

canJump([2,3,1,1,4]); // → true
canJump([3,2,1,0,4]); // → false (stuck at index 3)`}
      </CodeBlock>

      <SectionHeader number={5} title="Classic 3: Minimum Number of Arrows" />
      <CodeBlock language="javascript" filename="Minimum Arrows to Burst Balloons">
{`function findMinArrowShots(points) {
  points.sort((a, b) => a[1] - b[1]); // sort by end

  let arrows = 1;
  let arrowPos = points[0][1]; // shoot at first balloon's end

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowPos) { // this balloon starts after current arrow
      arrows++;
      arrowPos = points[i][1]; // shoot at its end
    }
  }

  return arrows;
}

findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]); // → 2`}
      </CodeBlock>

      <SectionHeader number={6} title="Classic 4: Gas Station" />
      <CodeBlock language="javascript" filename="Gas Station — Can You Complete the Circuit?">
{`function canCompleteCircuit(gas, cost) {
  let totalGas = 0, currentGas = 0, start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i];
    currentGas += gas[i] - cost[i];

    // Current starting point fails — try next station
    if (currentGas < 0) {
      start = i + 1;
      currentGas = 0;
    }
  }

  return totalGas >= 0 ? start : -1;
}

canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]); // → 3`}
      </CodeBlock>

      <SectionHeader number={7} title="Greedy vs Dynamic Programming" />
      <KeyPointsGrid columns={2} items={[
        {
          title: 'Greedy',
          description: 'One pass, no backtracking. O(n log n) typical. Works when local optimal = global optimal. Simpler to implement.',
        },
        {
          title: 'Dynamic Programming',
          description: 'Considers all sub-problems. O(n²) or O(n·capacity) typical. Works when you need to explore all options (e.g., 0/1 knapsack). More powerful, more complex.',
        },
        {
          title: 'Try Greedy First',
          description: 'If you can prove a greedy-choice property (exchange argument), greedy is better. Start with greedy and fall back to DP if it doesn\'t work.',
        },
        {
          title: 'Greedy identifies',
          description: 'Keywords: minimum/maximum, intervals, scheduling, "can you reach". Check: does the greedy choice ever need to be undone? If yes → DP.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I prove a greedy algorithm is correct?',
          answer: 'Use an "exchange argument": assume the optimal solution differs from the greedy. Show you can swap the differing elements to make optimal look like greedy without making it worse. Repeat until optimal equals greedy. This is the standard proof technique.',
        },
        {
          question: 'When does greedy fail for coin change?',
          answer: 'For coins [1,3,4] and target 6: greedy takes 4, then 1+1 = 3 coins. Optimal is 3+3 = 2 coins. Greedy fails because taking the locally-largest coin creates a sub-optimal remainder. Use DP for arbitrary coin denominations.',
        },
        {
          question: 'Is Dijkstra\'s algorithm greedy?',
          answer: 'Yes — Dijkstra\'s always processes the unvisited node with the minimum current distance. This greedy choice works because edge weights are non-negative. With negative edges, the greedy choice can lead to a wrong result, which is why Bellman-Ford (not greedy) is needed.',
        },
        {
          question: 'What is Huffman coding and why is it greedy?',
          answer: 'Huffman coding builds an optimal prefix-free binary code. The greedy rule: always merge the two nodes with the lowest frequencies. This is provably optimal — the exchange argument shows that any other choice leads to a worse total code length.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
