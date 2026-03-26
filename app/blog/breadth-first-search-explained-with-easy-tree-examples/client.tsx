'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BreadthFirstSearchExplainedWithEasyTreeExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Breadth-First Search (BFS) Explained With Easy Tree Examples</h1>
      <p className="lead">
        BFS explores all neighbors at the current depth before going deeper — like ripples spreading
        outward from a stone dropped in water. It's the algorithm behind shortest paths in unweighted
        graphs, level-order tree traversal, and "degrees of separation" problems.
      </p>

      <StatGrid stats={[
        { value: 'O(V+E)', label: 'time — visits all vertices and edges', color: 'blue' },
        { value: 'Queue', label: 'BFS uses a queue (FIFO)', color: 'green' },
        { value: 'Shortest', label: 'path in unweighted graphs', color: 'purple' },
        { value: 'Level-order', label: 'natural tree traversal', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="BFS vs DFS — The Key Difference" />
      <QuickFact>
        BFS = queue (FIFO). DFS = stack (LIFO). BFS explores level by level — all nodes at depth 1, then depth 2, etc.
        DFS goes as deep as possible first. BFS guarantees the shortest path in unweighted graphs; DFS does not.
      </QuickFact>

      <CompareTable
        leftLabel="BFS"
        rightLabel="DFS"
        rows={[
          { label: 'Data structure', left: 'Queue (FIFO)', right: 'Stack (LIFO) / call stack' },
          { label: 'Traversal order', left: 'Level by level', right: 'Branch by branch' },
          { label: 'Shortest path', left: '✅ Yes (unweighted)', right: '❌ Not guaranteed' },
          { label: 'Memory (tree)', left: 'O(width) — worst: last level', right: 'O(depth) — worst: height' },
          { label: 'Use cases', left: 'Shortest path, level-order, nearest neighbor', right: 'Topological sort, cycle detection, backtracking' },
        ]}
      />

      <SectionHeader number={2} title="BFS on a Tree — Level-Order Traversal" />

      <CodeBlock language="javascript" filename="BFS Level-Order Traversal">
{`function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root]; // Queue — FIFO

  while (queue.length > 0) {
    const levelSize = queue.length; // nodes at current level
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue
      level.push(node.val);

      if (node.left)  queue.push(node.left);  // enqueue children
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

//       3
//      / \\
//     9   20
//        / \\
//       15   7

levelOrder(root); // → [[3], [9,20], [15,7]]`}
      </CodeBlock>

      <SectionHeader number={3} title="BFS on a Graph — Shortest Path" />

      <CodeBlock language="javascript" filename="BFS Shortest Path — Unweighted Graph">
{`function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]]; // [node, path]

  while (queue.length > 0) {
    const [node, path] = queue.shift();

    if (node === end) return path; // found shortest path!

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return null; // no path exists
}

const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

shortestPath(graph, 'A', 'F'); // → ['A', 'C', 'F']`}
      </CodeBlock>

      <SectionHeader number={4} title="BFS on a Grid — 0/1 Matrix" />

      <CodeBlock language="javascript" filename="Shortest Distance from Each Cell to Nearest 0">
{`function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
  const queue = [];

  // Initialize: cells with 0 have distance 0
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
          dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Efficient Queue for BFS in JavaScript" />
      <AlertBox type="tip" title="Array.shift() is O(n) — use a pointer instead">
        JavaScript's array shift() moves all elements left — it's O(n). For large BFS problems, use a pointer to simulate dequeue in O(1):
      </AlertBox>

      <CodeBlock language="javascript" filename="O(1) Queue with Pointer">
{`// Instead of queue.shift() (O(n)):
const queue = [startNode];
let head = 0;

while (head < queue.length) {
  const node = queue[head++]; // O(1) dequeue
  // process node...
  for (const neighbor of graph[node]) {
    queue.push(neighbor);
  }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Classic BFS Problems" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Level-order traversal', description: 'Process a binary tree level by level. Return [[level1], [level2], ...].' },
        { title: 'Word ladder', description: 'Find shortest transformation from one word to another changing one letter at a time.' },
        { title: 'Rotting oranges', description: 'Multi-source BFS from all rotten oranges simultaneously — find when all fresh rot.' },
        { title: 'Number of islands', description: 'BFS from each unvisited "1" cell, mark all connected land. Count BFS starts.' },
        { title: 'Clone graph', description: 'BFS + HashMap to track original→clone mapping while building the copy.' },
        { title: 'Bipartite graph check', description: 'BFS with 2-coloring — can you color graph with 2 colors s.t. no adjacent same color?' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does BFS guarantee the shortest path but DFS doesn\'t?',
          answer: 'BFS explores all nodes at distance d before any node at distance d+1. So the first time it reaches a target, it has used the minimum number of steps. DFS can reach a target via a long path before finding the short one.',
        },
        {
          question: 'What is multi-source BFS?',
          answer: 'Start BFS from multiple source nodes simultaneously. Add all sources to the queue initially. Used in "rotting oranges" (all rotten cells are sources), "walls and gates" (all gates are sources). Equivalent to adding a virtual super-source node connected to all real sources.',
        },
        {
          question: 'Does BFS work for weighted graphs?',
          answer: 'Standard BFS only gives shortest path in unweighted (or equal-weight) graphs. For weighted graphs use Dijkstra\'s (non-negative weights) or Bellman-Ford (negative weights allowed).',
        },
        {
          question: 'When does BFS use more memory than DFS?',
          answer: 'BFS stores an entire level at once — O(maximum width of the tree/graph). For a balanced binary tree, the last level has n/2 nodes. DFS only stores the current path — O(height). For wide shallow structures, DFS uses less memory; for deep narrow ones, BFS wins.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
