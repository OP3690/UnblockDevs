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
        then backtracking to try another route. This guide covers the three DFS traversal orders for trees,
        recursive and iterative implementations, graph DFS with cycle detection, classic interview problems
        (max depth, number of islands, path sum, topological sort), and when to use DFS vs BFS.
      </p>

      <StatGrid stats={[
        { value: 'O(V+E)', label: 'time — visits all vertices and edges exactly once', color: 'blue' },
        { value: 'O(V)', label: 'space — call stack depth or explicit stack size', color: 'amber' },
        { value: 'Stack', label: 'DFS uses a stack — implicit (call stack) or explicit', color: 'purple' },
        { value: 'Pre/In/Post', label: '3 tree traversal orders with distinct use cases', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Core Idea — How DFS Works" />
      <QuickFact color="blue" label="The DFS mental model">
        DFS explores as far as possible along each branch before backtracking. Think of it as reading
        a book chapter-by-chapter (depth — finish chapter 1 completely), vs skimming all chapter titles
        first (breadth). DFS uses a stack; BFS uses a queue. In recursive DFS, the call stack IS the stack.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Start at root (or any node)', desc: 'Mark the starting node as visited. Add it to the result or process it.' },
        { title: 'Explore the first unvisited neighbor', desc: 'Recursively call DFS on the first unvisited child/neighbor. Go as deep as possible down this branch.' },
        { title: 'When dead end reached, backtrack', desc: 'Return to parent node (function returns from recursive call). Explore the next unvisited child/neighbor.' },
        { title: 'Repeat until all nodes visited', desc: 'Every vertex is visited exactly once, in DFS order. For disconnected graphs: restart from each unvisited node to reach all components.' },
      ]} />

      <SectionHeader number={2} title="DFS on Binary Tree — 3 Traversal Orders" />
      <CompareTable
        leftLabel="Traversal Order"
        rightLabel="When Root is Visited / Best Use Case"
        rows={[
          { label: 'Pre-order (NLR)', left: 'Root → Left → Right. Root visited BEFORE its children.', right: 'Copy a tree structure, serialize tree to array, prefix expressions' },
          { label: 'In-order (LNR)', left: 'Left → Root → Right. Root visited BETWEEN children.', right: 'BST: produces nodes in sorted ascending order. Validate BST.' },
          { label: 'Post-order (LRN)', left: 'Left → Right → Root. Root visited AFTER all children.', right: 'Delete tree (delete children before parent), calculate directory sizes, postfix expressions' },
        ]}
      />

      <CodeBlock lang="javascript" title="Tree DFS — All Three Orders (Recursive and Iterative)">
{`// ─── Recursive implementations ────────────────────────────────────────────────
function preOrder(node, result = []) {
  if (!node) return result;
  result.push(node.val);           // 1. Visit root FIRST
  preOrder(node.left, result);     // 2. Go left
  preOrder(node.right, result);    // 3. Go right
  return result;
}

function inOrder(node, result = []) {
  if (!node) return result;
  inOrder(node.left, result);      // 1. Go left
  result.push(node.val);           // 2. Visit root IN MIDDLE
  inOrder(node.right, result);     // 3. Go right
  return result;
}

function postOrder(node, result = []) {
  if (!node) return result;
  postOrder(node.left, result);    // 1. Go left
  postOrder(node.right, result);   // 2. Go right
  result.push(node.val);           // 3. Visit root LAST
  return result;
}

// For a BST with nodes [4, 2, 6, 1, 3, 5, 7]:
//         4
//        / \\
//       2   6
//      / \\ / \\
//     1  3 5  7
// Pre-order:  [4, 2, 1, 3, 6, 5, 7]  ← root first, great for copying
// In-order:   [1, 2, 3, 4, 5, 6, 7]  ← sorted! BST property
// Post-order: [1, 3, 2, 5, 7, 6, 4]  ← root last, great for deletion

// ─── Iterative In-Order (avoids call stack overflow on deep trees) ─────────────
function inOrderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    // Go as far left as possible, pushing nodes to stack
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // Pop and visit
    current = stack.pop();
    result.push(current.val);
    // Move to right subtree
    current = current.right;
  }

  return result;
}

// ─── Iterative Pre-Order ──────────────────────────────────────────────────────
function preOrderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    // Push right first so left is processed first (LIFO)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}`}
      </CodeBlock>

      <SectionHeader number={3} title="DFS on a Graph — Recursive and Iterative" />
      <p>
        Graphs (unlike trees) can have cycles. You need a <code>visited</code> set to avoid
        infinite loops. For disconnected graphs, run DFS from every unvisited node.
      </p>
      <CodeBlock lang="javascript" title="Graph DFS — Recursive and Iterative">
{`const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

// ─── Recursive DFS ────────────────────────────────────────────────────────────
function dfsRecursive(graph, start) {
  const visited = new Set();
  const result = [];

  function explore(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);

    for (const neighbor of graph[node] || []) {
      explore(neighbor); // recurse into each unvisited neighbor
    }
  }

  explore(start);
  return result;
}

dfsRecursive(graph, 'A'); // → ['A', 'B', 'D', 'E', 'F', 'C']

// ─── Iterative DFS (explicit stack — safe for deep graphs) ────────────────────
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop(); // LIFO — stack (not queue like BFS)

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Push neighbors in reverse to maintain same left-to-right order as recursive
    const neighbors = graph[node] || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i]);
      }
    }
  }

  return result;
}

// ─── All Connected Components (disconnected graph) ────────────────────────────
function allComponents(graph) {
  const visited = new Set();
  const components = [];

  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      const component = [];
      // DFS from this unvisited node finds one complete component
      function explore(n) {
        if (visited.has(n)) return;
        visited.add(n);
        component.push(n);
        for (const nb of graph[n] || []) explore(nb);
      }
      explore(node);
      components.push(component);
    }
  }

  return components; // each inner array = one connected component
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic DFS Interview Problems" />
      <CodeBlock lang="javascript" title="Max depth, path sum, and cycle detection">
{`// ─── Maximum Depth of Binary Tree — LeetCode #104 ────────────────────────────
function maxDepth(root) {
  if (!root) return 0;
  // Depth at this node = 1 + deeper of the two subtrees
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ─── Path Sum — LeetCode #112 ────────────────────────────────────────────────
// Does any root-to-leaf path sum equal target?
function hasPathSum(root, targetSum) {
  if (!root) return false;
  const remaining = targetSum - root.val;
  if (!root.left && !root.right) return remaining === 0; // leaf node check
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// ─── All Root-to-Leaf Paths — LeetCode #257 ──────────────────────────────────
function binaryTreePaths(root) {
  const paths = [];

  function dfs(node, currentPath) {
    if (!node) return;
    currentPath.push(node.val);
    if (!node.left && !node.right) {
      paths.push([...currentPath].join('->'));  // found a leaf — record path
    }
    dfs(node.left, currentPath);
    dfs(node.right, currentPath);
    currentPath.pop();  // backtrack — remove current node before returning
  }

  dfs(root, []);
  return paths;
}

// ─── Detect Cycle in Directed Graph ──────────────────────────────────────────
// Uses 3-color marking: white (unvisited), gray (in current path), black (done)
function hasCycle(graph) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {};
  for (const node of Object.keys(graph)) color[node] = WHITE;

  function dfs(node) {
    color[node] = GRAY;  // Mark as "in progress" on current path
    for (const neighbor of graph[node] || []) {
      if (color[neighbor] === GRAY) return true;  // Back edge = cycle!
      if (color[neighbor] === WHITE && dfs(neighbor)) return true;
    }
    color[node] = BLACK;  // Mark as "fully explored"
    return false;
  }

  for (const node of Object.keys(graph)) {
    if (color[node] === WHITE && dfs(node)) return true;
  }
  return false;
}`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Number of Islands and Topological Sort">
{`// ─── Number of Islands — LeetCode #200 (Grid DFS) ────────────────────────────
function numIslands(grid) {
  if (!grid.length) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;

  function dfs(r, c) {
    // Out of bounds or water or already visited — stop
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;

    grid[r][c] = '0'; // "sink" the island cell to mark as visited

    // Explore all 4 directions
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // sink the entire connected island
      }
    }
  }

  return count;
}

// ─── Topological Sort — Course Schedule ──────────────────────────────────────
// Given prerequisites: [[1,0], [2,0], [3,1], [3,2]]
// (course 1 requires course 0, etc.)
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  const UNVISITED = 0, VISITING = 1, VISITED = 2;
  const state = new Array(numCourses).fill(UNVISITED);

  function dfs(node) {
    if (state[node] === VISITING) return false; // cycle detected
    if (state[node] === VISITED) return true;   // already processed

    state[node] = VISITING;
    for (const neighbor of graph[node]) {
      if (!dfs(neighbor)) return false;
    }
    state[node] = VISITED;
    return true;
  }

  // Check every course (graph may be disconnected)
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}`}
      </CodeBlock>

      <SectionHeader number={5} title="DFS vs BFS — When to Use Which" />
      <CompareTable
        leftLabel="DFS — Use For"
        rightLabel="BFS — Use For"
        rows={[
          { label: 'Path finding', left: 'Finding ANY path between two nodes (not necessarily shortest)', right: 'Shortest path in unweighted graphs' },
          { label: 'Tree traversal', left: 'Pre/In/Post-order — when you need parent before children or reverse', right: 'Level-order — when you need all nodes at depth d before depth d+1' },
          { label: 'Backtracking', left: '✅ Natural fit — recursion with undo (pop) after each branch', right: '❌ Not suitable for backtracking' },
          { label: 'Topological sort', left: '✅ Post-order DFS naturally produces reverse topological order', right: '✅ Also possible with Kahn\'s algorithm (BFS-based)' },
          { label: 'Cycle detection', left: '✅ 3-color DFS detects back edges (cycles) efficiently', right: '✅ Also works but DFS is simpler for directed graphs' },
          { label: 'Memory', left: 'O(depth) — good for deep, narrow structures', right: 'O(width) — good for shallow, wide structures' },
        ]}
      />

      <AlertBox type="tip" title="Backtracking is DFS with explicit undo">
        Backtracking problems (N-Queens, Sudoku solver, permutations, combination sum) are
        DFS with a specific pattern: add element to current path → recurse → remove element (backtrack).
        The "pop" after recursion is what makes it backtracking. Master this pattern for a huge
        class of interview problems.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does DFS always find the shortest path?',
          answer: 'No — DFS finds A path, not necessarily the shortest one. DFS goes deep, so it might find a long winding path before a short direct path. For shortest path in unweighted graphs, use BFS (guaranteed to find shortest in terms of edge count). For weighted graphs, use Dijkstra\'s algorithm.',
        },
        {
          question: 'What is the difference between DFS and backtracking?',
          answer: 'Backtracking IS DFS with explicit pruning and undo operations. Standard DFS just marks nodes as visited and explores. Backtracking additionally: (1) prunes branches that can\'t lead to valid solutions early, and (2) explicitly undoes choices after returning from a branch (the "pop" after recursion). Used for: N-Queens, Sudoku, permutations, combinations, word search. The key pattern: add → recurse → remove (backtrack).',
        },
        {
          question: 'What is topological sort and why does it use DFS?',
          answer: 'Topological sort orders nodes in a DAG (directed acyclic graph) such that for every edge u→v, u appears before v in the ordering. Used for: build systems (compile A before B), course prerequisites, task scheduling. DFS post-order traversal produces a reverse topological order naturally: each node is added to the result AFTER all its dependencies (descendants) have been fully processed. Reverse that list to get topological order.',
        },
        {
          question: 'When should I use iterative DFS vs recursive DFS?',
          answer: 'Recursive DFS is simpler to write and read — use it for most interview problems and when tree/graph depth is bounded (binary tree height is O(log n) for balanced). Use iterative DFS when: the depth could exceed ~10,000 (JavaScript call stack limit causing Maximum call stack size exceeded), you need fine-grained control over the stack state, or you\'re implementing in a context where recursion is expensive.',
        },
        {
          question: 'How does DFS detect cycles in directed vs undirected graphs?',
          answer: 'For directed graphs: use 3-color marking (unvisited/in-progress/done). If you reach a node marked "in-progress" (currently on the DFS call stack), you\'ve found a back edge = cycle. For undirected graphs: simpler — if you reach a visited node that is NOT the parent of the current node, it\'s a cycle. Track the parent of each node: function dfs(node, parent) — if visited[neighbor] && neighbor !== parent → cycle.',
        },
        {
          question: 'What is the difference between pre-order and level-order traversal?',
          answer: 'Pre-order DFS: visits root, then recursively visits left subtree completely, then right subtree completely. Result: [root, all left descendants, all right descendants]. Level-order BFS: visits all nodes at depth 1, then all at depth 2, then depth 3, etc. Result: [[root], [depth-1 nodes], [depth-2 nodes]]. Pre-order is a DFS traversal. Level-order is a BFS traversal. They produce completely different orderings of the same tree.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
