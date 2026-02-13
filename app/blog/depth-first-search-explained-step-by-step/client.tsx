'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, Layers, CheckCircle, AlertCircle, Target, TrendingDown, BarChart3, Network } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Depth-First Search Explained Step by Step</h1>
          <p className="text-sm text-gray-500 mt-1">Learn DFS algorithm with step-by-step examples, visualizations, and code</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Depth-First Search Explained Step by Step"
        description="Learn Depth-First Search (DFS) algorithm step by step with simple examples, visualizations, and code examples."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Depth-First Search (DFS) is a fundamental graph traversal algorithm that explores as far as possible along each branch 
              before backtracking. It's like exploring a maze by always taking the leftmost path until you hit a dead end, then backtracking 
              to try the next path.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn how DFS works with step-by-step examples, visualizations, both recursive and 
              iterative implementations, and real-world use cases. We'll make it easy to understand with clear explanations.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate tree structures 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to visualize hierarchical data.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is Depth-First Search?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Depth-First Search (DFS)</strong> is a graph traversal algorithm that explores as deeply as possible along each branch 
              before backtracking. It uses a stack (either explicit or via recursion) to keep track of nodes to visit.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key characteristics of DFS:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingDown className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Go Deep First</h3>
                <p className="text-xs text-gray-700">Explores one path completely before trying another</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Layers className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Uses Stack</h3>
                <p className="text-xs text-gray-700">LIFO (Last In First Out) structure</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Memory Efficient</h3>
                <p className="text-xs text-gray-700">Uses less memory than BFS (O(h) vs O(w))</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Zap className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Backtracking</h3>
                <p className="text-xs text-gray-700">Returns to previous node when path ends</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm">
                Imagine exploring a cave system. DFS is like following one tunnel all the way to the end, marking your path, 
                then backtracking to explore the next tunnel. You go as deep as possible before trying another path.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does DFS Do?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DFS systematically explores a graph or tree by:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">1. Starting at a Node</h3>
                    <p className="text-gray-700 text-sm">Begins at a starting node (usually the root in trees)</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2. Going Deep</h3>
                    <p className="text-gray-700 text-sm">Follows one path as far as possible before backtracking</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">3. Using Stack/Recursion</h3>
                    <p className="text-gray-700 text-sm">Maintains a stack of nodes to visit, processing most recent first</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">4. Backtracking</h3>
                    <p className="text-gray-700 text-sm">Returns to previous node when no more unvisited neighbors</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use DFS?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use DFS in these scenarios:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Path finding</strong> - Finding any path between two nodes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Cycle detection</strong> - Detecting cycles in graphs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Topological sorting</strong> - Ordering nodes in directed acyclic graphs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Tree/graph problems</strong> - Many tree problems use DFS naturally</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Memory constraints</strong> - When memory is limited (DFS uses less than BFS)</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How DFS Works: Step-by-Step Example</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Tree</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
                <div className="text-center font-mono text-sm">
                  <div className="mb-2">        1</div>
                  <div className="mb-2">      /   \</div>
                  <div className="mb-2">     2     3</div>
                  <div className="mb-2">   / \   / \</div>
                  <div className="mb-2">  4   5 6   7</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">DFS Traversal Steps (Pre-order)</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <h4 className="font-semibold text-gray-900">Start: Visit 1, Stack = [1]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 1, go to left child (2)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1] | Stack: [2, 3]</div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <h4 className="font-semibold text-gray-900">Visit: 2, Stack = [2, 3]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 2, go to left child (4)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1, 2] | Stack: [4, 5, 3]</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-semibold text-gray-900">Visit: 4, Stack = [4, 5, 3]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 4 (leaf), backtrack to 2</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1, 2, 4] | Stack: [5, 3]</div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <h4 className="font-semibold text-gray-900">Backtrack: Visit 5, Stack = [5, 3]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Backtracked to 2, now visit right child (5)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1, 2, 4, 5] | Stack: [3]</div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                    <h4 className="font-semibold text-gray-900">Backtrack: Visit 3, Stack = [3]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Backtracked to 1, now visit right child (3)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1, 2, 4, 5, 3] | Stack: [6, 7]</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">6-7</div>
                    <h4 className="font-semibold text-gray-900">Visit: 6, 7</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit nodes 6 and 7 (leaves)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Path: [1, 2, 4, 5, 3, 6, 7] | Stack: []</div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">✓</div>
                    <h4 className="font-semibold text-gray-900">Result: DFS Order = [1, 2, 4, 5, 3, 6, 7]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">All nodes visited depth-first!</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">DFS Code Implementation (Recursive)</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Recursive DFS (Pre-order)</div>
                <div className="text-blue-400">function</div> <div className="text-yellow-400">dfs</div><div className="text-white">(node, visited = </div><div className="text-blue-400">new</div> <div className="text-yellow-400">Set</div><div className="text-white">(), result = []) {'{'}</div>
                <div className="text-blue-400 ml-4">if</div> <div className="text-white">(!node || visited.has(node)) </div><div className="text-blue-400">return</div> <div className="text-white">result;</div>
                <div className="text-white ml-4"></div>
                <div className="text-white ml-4">visited.add(node);</div>
                <div className="text-white ml-4">result.push(node.val); </div><div className="text-gray-400">// Visit node</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">for</div> <div className="text-white">(</div><div className="text-blue-400">const</div> <div className="text-white"> child of node.children) {'{'}</div>
                <div className="text-white ml-8">dfs(child, visited, result); </div><div className="text-gray-400">// Recursive call</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-blue-400 ml-4">return</div> <div className="text-white"> result;</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">DFS Code Implementation (Iterative)</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Iterative DFS using stack</div>
                <div className="text-blue-400">function</div> <div className="text-yellow-400">dfsIterative</div><div className="text-white">(root) {'{'}</div>
                <div className="text-blue-400 ml-4">if</div> <div className="text-white">(!root) </div><div className="text-blue-400">return</div> <div className="text-white">[];</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> stack = [root];</div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> result = [];</div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> visited = </div><div className="text-blue-400">new</div> <div className="text-yellow-400">Set</div><div className="text-white">();</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">while</div> <div className="text-white">(stack.length {'>'} </div><div className="text-yellow-400">0</div><div className="text-white">) {'{'}</div>
                <div className="text-blue-400 ml-8">const</div> <div className="text-white"> node = stack.pop(); </div><div className="text-gray-400">// Remove from end</div>
                <div className="text-blue-400 ml-8">if</div> <div className="text-white">(visited.has(node)) </div><div className="text-blue-400">continue</div><div className="text-white">;</div>
                <div className="text-white ml-8">visited.add(node);</div>
                <div className="text-white ml-8">result.push(node.val);</div>
                <div className="text-white ml-8"></div>
                <div className="text-gray-400 ml-8">// Add children in reverse order (for correct traversal)</div>
                <div className="text-blue-400 ml-8">for</div> <div className="text-white">(let i = node.children.length - </div><div className="text-yellow-400">1</div><div className="text-white">; i {'>='} </div><div className="text-yellow-400">0</div><div className="text-white">; i--) {'{'}</div>
                <div className="text-white ml-12">stack.push(node.children[i]);</div>
                <div className="text-white ml-8">{'}'}</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-blue-400 ml-4">return</div> <div className="text-white"> result;</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
          </section>

          {/* Visual Flow Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">DFS Algorithm Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">Start</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Start at Root Node</h4>
                    <p className="text-sm text-gray-600">Stack = [root], Visited = {}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">?</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Is Stack Empty?</h4>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">Yes → Done</span>
                    </div>
                    <p className="text-xs text-gray-600">Return result</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">No → Continue</span>
                    </div>
                    <p className="text-xs text-gray-600">Process next node</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Pop Node from Stack</h4>
                    <p className="text-sm text-gray-600">Remove from end (LIFO)</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Mark as Visited & Process</h4>
                    <p className="text-sm text-gray-600">Add to result, mark visited</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Push Children to Stack</h4>
                    <p className="text-sm text-gray-600">Add unvisited children to end of stack</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">Loop</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Repeat Until Stack Empty</h4>
                    <p className="text-sm text-gray-600">Go back to check stack</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DFS Variants */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">DFS Traversal Variants</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Pre-order (Root → Left → Right)</h3>
                <p className="text-gray-700 text-sm mb-2">Visit root, then left subtree, then right subtree</p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs text-gray-600 font-mono">Example: [1, 2, 4, 5, 3, 6, 7]</p>
                </div>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">In-order (Left → Root → Right)</h3>
                <p className="text-gray-700 text-sm mb-2">Visit left subtree, then root, then right subtree</p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-xs text-gray-600 font-mono">Example: [4, 2, 5, 1, 6, 3, 7]</p>
                </div>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Post-order (Left → Right → Root)</h3>
                <p className="text-gray-700 text-sm mb-2">Visit left subtree, then right subtree, then root</p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-xs text-gray-600 font-mono">Example: [4, 5, 2, 6, 7, 3, 1]</p>
                </div>
              </div>
            </div>
          </section>

          {/* Time Complexity Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">DFS Time & Space Complexity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Metric</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Complexity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Time Complexity</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">O(V + E)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">V = vertices, E = edges. Visit each node once, check each edge once</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Space Complexity</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">O(h)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">h = height. Stack depth equals tree height (worst case)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">For Tree (V nodes)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">O(V)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">In trees, E = V-1, so O(V + E) = O(V)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use DFS?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Memory Efficient</h3>
                <p className="text-gray-700 text-sm">Uses O(h) space vs O(w) for BFS (h = height, w = width)</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Layers className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Natural for Trees</h3>
                <p className="text-gray-700 text-sm">Many tree problems naturally use DFS (pre/in/post-order)</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Network className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Path Finding</h3>
                <p className="text-gray-700 text-sm">Good for finding any path, not necessarily shortest</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Zap className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Simple Recursion</h3>
                <p className="text-gray-700 text-sm">Can be implemented elegantly with recursion</p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World DFS Applications</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. File System Traversal</h3>
                <p className="text-gray-700 text-sm mb-2">Exploring directory structures, finding files recursively</p>
                <p className="text-xs text-gray-600">Example: Finding all .txt files in a directory tree</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Cycle Detection</h3>
                <p className="text-gray-700 text-sm mb-2">Detecting cycles in directed/undirected graphs</p>
                <p className="text-xs text-gray-600">Example: Detecting circular dependencies in build systems</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Topological Sorting</h3>
                <p className="text-gray-700 text-sm mb-2">Ordering nodes in directed acyclic graphs (DAGs)</p>
                <p className="text-xs text-gray-600">Example: Task scheduling, course prerequisites</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Maze Solving</h3>
                <p className="text-gray-700 text-sm mb-2">Finding paths through mazes (any path, not shortest)</p>
                <p className="text-xs text-gray-600">Example: Game AI pathfinding, puzzle solving</p>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between DFS and BFS?',
                answer: 'DFS explores depth-first (uses stack), going as deep as possible before backtracking. BFS explores breadth-first (uses queue), visiting all nodes at current level before next level. DFS uses less memory (O(h)) but doesn\'t find shortest path.',
              },
              {
                question: 'Why does DFS use a stack?',
                answer: 'Stack provides LIFO (Last In First Out) behavior, ensuring the most recently discovered node is explored next. This gives depth-first exploration - going deep before exploring other branches.',
              },
              {
                question: 'Can DFS find shortest path?',
                answer: 'No, DFS doesn\'t guarantee shortest path. It finds any path. For shortest path in unweighted graphs, use BFS. For weighted graphs, use Dijkstra\'s or A* algorithm.',
              },
              {
                question: 'What is the time complexity of DFS?',
                answer: 'O(V + E) where V is number of vertices and E is number of edges. For trees, this simplifies to O(V) since E = V-1.',
              },
              {
                question: 'When should I use DFS instead of BFS?',
                answer: 'Use DFS when memory is limited, when you need to explore deep paths, for tree problems (pre/in/post-order), or when you don\'t need shortest path. Use BFS when you need shortest path or level-order traversal.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Depth-First Search Explained Step by Step"
            description="Learn Depth-First Search (DFS) algorithm step by step with simple examples, visualizations, and code examples."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
