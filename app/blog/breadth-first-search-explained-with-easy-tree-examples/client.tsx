'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function BreadthFirstSearchExplainedWithEasyTreeExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Breadth-First Search (BFS) Explained With Easy Tree Examples</h1>
      <p className="lead">
        BFS explores all neighbors at the current depth before going deeper — like ripples spreading
        outward from a stone dropped in water. It's the algorithm behind shortest paths in unweighted
        graphs, level-order tree traversal, "degrees of separation" problems, and multi-source flood fill.
        This guide covers BFS on trees, graphs, grids, and explains the key patterns used in coding interviews
        with complete JavaScript implementations and step-by-step walkthroughs.
      </p>

      <StatGrid stats={[
        { value: 'O(V+E)', label: 'time — visits all vertices and edges exactly once', color: 'blue' },
        { value: 'Queue', label: 'BFS uses a queue (FIFO) — the core data structure', color: 'green' },
        { value: 'Shortest path', label: 'guaranteed in unweighted graphs', color: 'purple' },
        { value: 'Level-order', label: 'natural tree traversal — processes nodes level by level', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="BFS vs DFS — The Key Difference" />
      <QuickFact color="blue" label="The queue vs stack insight">
        BFS = queue (FIFO). DFS = stack (LIFO). BFS explores level by level — all nodes at depth 1, then depth 2, etc.
        DFS goes as deep as possible first along one branch before backtracking. BFS guarantees the shortest path in
        unweighted graphs because it reaches each node via the minimum number of edges; DFS does not.
      </QuickFact>

      <CompareTable
        leftLabel="BFS"
        rightLabel="DFS"
        rows={[
          { label: 'Data structure', left: 'Queue (FIFO) — first in, first out', right: 'Stack (LIFO) / call stack for recursion' },
          { label: 'Traversal order', left: 'Level by level — all nodes at depth d before d+1', right: 'Branch by branch — fully explores one path before backtracking' },
          { label: 'Shortest path', left: '✅ Yes (unweighted graphs)', right: '❌ Not guaranteed — may find long path first' },
          { label: 'Memory (tree)', left: 'O(width) — worst case: last level has n/2 nodes', right: 'O(depth) — worst case: O(n) for skewed tree' },
          { label: 'Finds closest first', left: '✅ Yes — nearest neighbors first', right: '❌ No — may find distant nodes first' },
          { label: 'Use cases', left: 'Shortest path, level-order, nearest neighbor, word ladder', right: 'Topological sort, cycle detection, backtracking, DFS components' },
        ]}
      />

      <SectionHeader number={2} title="BFS on a Tree — Level-Order Traversal" />
      <p>
        Level-order traversal visits nodes level by level from top to bottom, left to right. The key technique:
        track how many nodes are in the queue at the start of each level — that's <code>levelSize</code>.
        Process exactly that many nodes, then all their children form the next level.
      </p>
      <CodeBlock lang="javascript" title="BFS Level-Order Traversal — LeetCode #102">
{`function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root]; // Queue — FIFO

  while (queue.length > 0) {
    const levelSize = queue.length; // all nodes at the current level
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue (process current node)
      level.push(node.val);

      if (node.left)  queue.push(node.left);  // enqueue left child
      if (node.right) queue.push(node.right); // enqueue right child
    }

    result.push(level); // all nodes at this level are done
  }

  return result;
}

//       3
//      / \\
//     9   20
//        / \\
//       15   7
//
// Step-by-step:
// Queue: [3] → level=[3], enqueue 9,20 → result=[[3]]
// Queue: [9,20] → level=[9,20], enqueue 15,7 → result=[[3],[9,20]]
// Queue: [15,7] → level=[15,7], no children → result=[[3],[9,20],[15,7]]

levelOrder(root); // → [[3], [9,20], [15,7]]

// Variant: Right side view (last node of each level)
function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (i === levelSize - 1) result.push(node.val); // last node = visible from right
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}

rightSideView(root); // → [3, 20, 7]`}
      </CodeBlock>

      <SectionHeader number={3} title="BFS on a Graph — Shortest Path" />
      <p>
        BFS in a graph requires tracking visited nodes to avoid infinite loops in cycles. The first time BFS
        reaches any node, it has found the shortest path to that node (in terms of number of edges).
        Store the path itself by carrying the path array alongside each node in the queue.
      </p>
      <CodeBlock lang="javascript" title="BFS Shortest Path — Unweighted Graph">
{`function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]]; // each entry: [currentNode, pathSoFar]

  while (queue.length > 0) {
    const [node, path] = queue.shift();

    if (node === end) return path; // first time we reach 'end' = shortest path

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

shortestPath(graph, 'A', 'F'); // → ['A', 'C', 'F']  (2 edges, shortest)
// BFS considers A's neighbors: B, C
// Then B's neighbors: D, E (A already visited)
// Then C's neighbors: F ← found! Path: A→C→F

// Shortest distance only (without path):
function shortestDistance(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, 0]]; // [node, distance]

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1; // unreachable
}`}
      </CodeBlock>

      <SectionHeader number={4} title="BFS on a Grid — 0/1 Matrix" />
      <p>
        Grid BFS is a special case where the "graph" is implicit — neighbors are the 4 adjacent cells (up/down/left/right).
        Multi-source BFS initializes all source cells simultaneously in the queue, computing distance from
        the nearest source for every cell in one pass.
      </p>
      <CodeBlock lang="javascript" title="Shortest Distance from Each Cell to Nearest 0 — LeetCode #542">
{`function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
  const queue = [];

  // Multi-source BFS: initialize all 0 cells as sources with distance 0
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]]; // down, up, right, left

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
          dist[nr][nc] > dist[r][c] + 1) {  // found shorter distance
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}

// Matrix: [[0,0,0],[0,1,0],[1,1,1]]
// Result: [[0,0,0],[0,1,0],[1,2,1]]
// The center bottom cell has distance 2 from nearest 0`}
      </CodeBlock>

      <SectionHeader number={5} title="Efficient Queue for BFS in JavaScript" />
      <AlertBox type="warning" title="Array.shift() is O(n) — use a pointer for large BFS">
        JavaScript's array shift() moves all elements left — O(n) per dequeue. For BFS on large graphs,
        this makes the total complexity O(V²) instead of O(V+E). Use an index pointer to simulate dequeue in O(1).
      </AlertBox>
      <CodeBlock lang="javascript" title="O(1) Queue with Index Pointer">
{`// ❌ Slow for large inputs: queue.shift() is O(n)
while (queue.length > 0) {
  const node = queue.shift(); // O(n) — shifts all elements left
  // ...
}

// ✅ Fast: use a pointer — O(1) dequeue
const queue = [startNode];
let head = 0; // points to front of queue

while (head < queue.length) {
  const node = queue[head++]; // O(1) — just increment pointer
  // process node...
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push(neighbor); // O(1) amortized
    }
  }
}

// For competitive programming, consider a proper deque:
class Deque {
  constructor() { this.data = {}; this.head = 0; this.tail = 0; }
  push(val) { this.data[this.tail++] = val; }
  shift() { return this.data[this.head++]; }
  get length() { return this.tail - this.head; }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Classic BFS Interview Problems" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Level-order traversal (LeetCode #102)', description: 'Process binary tree level by level. Key: use levelSize = queue.length at start of each level to separate levels. Return [[level1], [level2], ...].' },
        { title: 'Word ladder (LeetCode #127)', description: 'Find shortest transformation from start word to end word, changing one letter at a time. BFS from start word, neighbors = all words differing by one character. Each step = one transformation.' },
        { title: 'Rotting oranges (LeetCode #994)', description: 'Multi-source BFS from all rotten oranges simultaneously. Each minute, rotten oranges infect adjacent fresh ones. Return minutes until all rotten, or -1 if impossible.' },
        { title: 'Number of islands (LeetCode #200)', description: 'BFS from each unvisited "1" cell, mark all connected land cells as visited. Count how many separate BFS runs you start — each is one island.' },
        { title: 'Clone graph (LeetCode #133)', description: 'BFS with HashMap mapping original node → clone node. Clone each node when first seen, copy neighbors once all clones exist. Return clone of start node.' },
        { title: 'Bipartite graph check (LeetCode #785)', description: 'BFS with 2-coloring. Color each node alternating colors. If you ever try to color a node with the same color as its neighbor — graph is not bipartite.' },
      ]} />

      <SectionHeader number={7} title="BFS Implementation Checklist" />
      <VerticalSteps steps={[
        { title: 'Initialize queue with starting node(s)', desc: 'For single-source BFS: queue = [start]. For multi-source: queue = [all sources]. Mark all initial nodes as visited immediately.' },
        { title: 'Mark visited on enqueue, not dequeue', desc: 'Always add nodes to visited when pushing to queue, not when popping. Otherwise the same node gets enqueued multiple times, causing O(V²) work in dense graphs.' },
        { title: 'Process queue until empty', desc: 'while (queue.length > 0) or while (head < queue.length). Each iteration: dequeue front, process it, enqueue unvisited neighbors.' },
        { title: 'Track what you need: path vs distance vs level', desc: 'For distance: carry integer. For path: carry array. For level: use levelSize = queue.length pattern at start of each while iteration.' },
        { title: 'Handle disconnected graphs', desc: 'For graphs that may not be fully connected, run BFS from every unvisited node (outer loop over all nodes). Each BFS run finds one connected component.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does BFS guarantee the shortest path but DFS doesn\'t?',
          answer: 'BFS explores all nodes at distance d before any node at distance d+1. The first time BFS reaches the target, it has taken the minimum possible number of edges to get there — any other path would have been found first if it were shorter. DFS can reach a target via a long winding path before it ever explores the short direct path.',
        },
        {
          question: 'What is multi-source BFS?',
          answer: 'Multi-source BFS starts from multiple source nodes simultaneously by adding all of them to the queue initially (all with distance 0). This is equivalent to adding a virtual "super-source" node connected to all real sources. Used in: rotting oranges (all rotten cells are sources), walls and gates (all gates are sources at distance 0), and 0-1 matrix distance (all 0 cells are sources).',
        },
        {
          question: 'Does BFS work for weighted graphs?',
          answer: 'Standard BFS only gives shortest path in unweighted (or equal-weight) graphs. For weighted graphs, use Dijkstra\'s algorithm (non-negative weights, O((V+E) log V)) or Bellman-Ford (negative weights allowed, O(VE)). A special case: 0-1 BFS works on graphs where edges have weight 0 or 1 — use a deque (double-ended queue) instead of a regular queue.',
        },
        {
          question: 'When does BFS use more memory than DFS?',
          answer: 'BFS stores an entire frontier at once — O(maximum width of the tree/graph). For a balanced binary tree with n nodes, the last level has n/2 nodes, so BFS uses O(n) memory. DFS only stores the current path — O(height) = O(log n) for balanced trees. For wide shallow structures, DFS uses far less memory. For very deep trees (like a linked list as a tree), DFS uses O(n) stack space while BFS only uses O(1) at each level.',
        },
        {
          question: 'How do I do BFS on an implicit graph (like word ladder)?',
          answer: 'In word ladder, you don\'t build the full graph first. Instead, generate neighbors on the fly: for each word in the queue, try changing each character to each letter a-z. If the resulting word is in the word list and not visited, it\'s a neighbor. This is more memory-efficient than pre-building all edges. The same pattern applies to number puzzles (sliding tiles), chess piece moves, and other problems where the state space is defined implicitly.',
        },
        {
          question: 'What is bidirectional BFS and when should I use it?',
          answer: 'Bidirectional BFS runs two simultaneous BFS searches — one from the source forward, one from the target backward. They stop when they meet in the middle. For a graph of branching factor b and depth d, standard BFS explores O(b^d) nodes. Bidirectional BFS explores O(2 * b^(d/2)), which is dramatically faster for large d. Used when you know both the start and end of the search path (word ladder, shortest path between two specific nodes). The meeting condition: a node seen by both searches has been found — reconstruct the path through it.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
