'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Depth-First Search (DFS) Explained Step by Step — With Code Examples</h1>
      <p className="lead">
        DFS is one of the two fundamental graph/tree traversal algorithms. It goes as deep as possible
        before backtracking — like exploring a maze by always taking the first path until you hit a dead end,
        then backtracking. This guide covers recursive and iterative DFS with real problems.
      </p>

      <StatGrid stats={[
        { value: 'O(V+E)', label: 'time — visits all vertices and edges', color: 'blue' },
        { value: 'O(V)', label: 'space — call stack depth', color: 'amber' },
        { value: 'Stack', label: 'DFS uses a stack (implicit or explicit)', color: 'purple' },
        { value: 'Pre/In/Post', label: '3 tree traversal orders', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact>
        DFS explores as far as possible along each branch before backtracking. Think of it as reading
        a book chapter-by-chapter (depth), vs skimming all chapter titles first (breadth, which is BFS).
        DFS uses a stack; BFS uses a queue.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Start at root (or any node)', description: 'Mark it as visited. Add to result.' },
        { title: 'Explore first child recursively', description: 'Go as deep as possible down the first branch.' },
        { title: 'When dead end reached, backtrack', description: 'Return to parent, then explore next unvisited child.' },
        { title: 'Repeat until all nodes visited', description: 'Every vertex is visited exactly once.' },
      ]} />

      <SectionHeader number={2} title="DFS on Binary Tree — 3 Traversal Orders" />

      <CompareTable
        leftLabel="Traversal Order"
        rightLabel="When Root is Visited"
        rows={[
          { label: 'Pre-order', left: 'Root → Left → Right', right: 'Visit root BEFORE children. Good for: copy tree, serialize' },
          { label: 'In-order', left: 'Left → Root → Right', right: 'Visit root BETWEEN children. BST: gives sorted output' },
          { label: 'Post-order', left: 'Left → Right → Root', right: 'Visit root AFTER children. Good for: delete tree, calculate directory sizes' },
        ]}
      />

      <CodeBlock language="javascript" filename="Tree DFS — All Three Orders">
{`function preOrder(node, result = []) {
  if (!node) return result;
  result.push(node.val);           // Visit root FIRST
  preOrder(node.left, result);
  preOrder(node.right, result);
  return result;
}

function inOrder(node, result = []) {
  if (!node) return result;
  inOrder(node.left, result);
  result.push(node.val);           // Visit root IN MIDDLE
  inOrder(node.right, result);
  return result;
}

function postOrder(node, result = []) {
  if (!node) return result;
  postOrder(node.left, result);
  postOrder(node.right, result);
  result.push(node.val);           // Visit root LAST
  return result;
}

// For BST: [1,2,3,4,5,6,7] as a balanced tree:
// Pre-order:  [4, 2, 1, 3, 6, 5, 7]
// In-order:   [1, 2, 3, 4, 5, 6, 7] ← sorted!
// Post-order: [1, 3, 2, 5, 7, 6, 4]`}
      </CodeBlock>

      <SectionHeader number={3} title="DFS on a Graph" />
      <p>
        Graphs (unlike trees) can have cycles. You need a <code>visited</code> set to avoid infinite loops.
      </p>

      <CodeBlock language="javascript" filename="Graph DFS — Recursive">
{`// Adjacency list representation
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function explore(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);

    for (const neighbor of graph[node]) {
      explore(neighbor); // recurse into each neighbor
    }
  }

  explore(start);
  return result;
}

dfs(graph, 'A'); // → ['A', 'B', 'D', 'E', 'F', 'C']`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Graph DFS — Iterative (Explicit Stack)">
{`function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start]; // explicit stack instead of call stack
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();  // LIFO — stack!

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Push neighbors in reverse so first neighbor is explored first
    for (let i = graph[node].length - 1; i >= 0; i--) {
      if (!visited.has(graph[node][i])) {
        stack.push(graph[node][i]);
      }
    }
  }

  return result;
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic DFS Problems" />

      <CodeBlock language="javascript" filename="Max Depth of Binary Tree">
{`function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  // At each node: 1 (current) + deeper of the two subtrees
}`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Number of Islands (Grid DFS)">
{`function numIslands(grid) {
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= grid.length ||
        c < 0 || c >= grid[0].length ||
        grid[r][c] === '0') return;

    grid[r][c] = '0'; // mark visited by "sinking" the island

    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // sink the whole island
      }
    }
  }

  return count;
}`}
      </CodeBlock>

      <SectionHeader number={5} title="DFS vs BFS — When to Use Which" />
      <CompareTable
        leftLabel="DFS"
        rightLabel="BFS"
        rows={[
          { label: 'Data structure', left: 'Stack (implicit call stack or explicit)', right: 'Queue' },
          { label: 'Memory', left: 'O(depth) — good for deep, narrow trees', right: 'O(width) — good for shallow, wide trees' },
          { label: 'Shortest path?', left: 'No — not guaranteed', right: 'Yes — in unweighted graphs' },
          { label: 'Backtracking', left: 'Natural — base of backtracking algorithms', right: 'Not suitable' },
          { label: 'Detect cycles', left: 'Yes (with visited set)', right: 'Yes' },
          { label: 'Use for', left: 'Maze solving, topological sort, tree paths, connected components', right: 'Shortest path, level-order traversal, nearest neighbor' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Does DFS always find the shortest path?',
          answer: 'No — DFS finds A path, not necessarily the shortest one. Use BFS for shortest path in unweighted graphs, or Dijkstra\'s algorithm for weighted graphs.',
        },
        {
          question: 'What is the difference between DFS and backtracking?',
          answer: 'Backtracking IS DFS with pruning. It explores depth-first but "prunes" branches that can\'t lead to valid solutions early. Used in: N-Queens, Sudoku solver, permutations/combinations, word search.',
        },
        {
          question: 'What is topological sort and why does it use DFS?',
          answer: 'Topological sort orders nodes in a DAG (directed acyclic graph) such that for every edge u→v, u comes before v. DFS post-order traversal naturally produces a reverse topological order — each node is added AFTER all its dependencies. Used in: build systems, course prerequisites, task scheduling.',
        },
        {
          question: 'When should I use iterative DFS vs recursive DFS?',
          answer: 'Recursive DFS is simpler to write and read. Use iterative DFS when: the depth might exceed ~10,000 (call stack overflow risk), you need to manage the stack explicitly (like for complex backtracking states), or you\'re in a non-recursive environment.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
