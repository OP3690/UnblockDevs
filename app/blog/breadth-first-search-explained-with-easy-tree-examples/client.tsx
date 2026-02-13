'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, Layers, CheckCircle, AlertCircle, Target, TrendingUp, BarChart3, Network } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Breadth-First Search Explained with Easy Tree Examples</h1>
          <p className="text-sm text-gray-500 mt-1">Learn BFS algorithm with simple examples, step-by-step visualizations, and code</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Breadth-First Search Explained with Easy Tree Examples"
        description="Learn Breadth-First Search (BFS) algorithm with simple tree examples, step-by-step visualizations, and code examples."
        variant="floating"
      />

      {/* Main Content */}
      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores all nodes at the current depth level 
              before moving to nodes at the next depth level. It's like exploring a building floor by floor, visiting every room on 
              one floor before going to the next.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn how BFS works with simple tree examples, step-by-step visualizations, 
              code implementations, and real-world use cases. We'll make it easy to understand without complex math or jargon.
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
              Definition: What Is Breadth-First Search?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Breadth-First Search (BFS)</strong> is a graph traversal algorithm that visits all nodes at the current level (depth) 
              before moving to nodes at the next level. It uses a queue data structure to keep track of nodes to visit next.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key characteristics of BFS:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Network className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Level-by-Level</h3>
                <p className="text-xs text-gray-700">Visits nodes level by level, not depth by depth</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Layers className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Uses Queue</h3>
                <p className="text-xs text-gray-700">FIFO (First In First Out) structure</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Finds Shortest Path</h3>
                <p className="text-xs text-gray-700">In unweighted graphs, finds shortest path</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Zap className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Complete Search</h3>
                <p className="text-xs text-gray-700">Visits all reachable nodes</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm">
                Imagine you're searching for a friend in a building. BFS is like checking every room on the 1st floor first, 
                then every room on the 2nd floor, then the 3rd floor, and so on. You explore level by level, not room by room 
                going deep into one area first.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does BFS Do?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              BFS systematically explores a graph or tree by:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">1. Starting at the Root</h3>
                    <p className="text-gray-700 text-sm">Begins at a starting node (usually the root in trees)</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2. Visiting Level by Level</h3>
                    <p className="text-gray-700 text-sm">Visits all nodes at distance 1, then distance 2, then distance 3, etc.</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">3. Using a Queue</h3>
                    <p className="text-gray-700 text-sm">Maintains a queue of nodes to visit, processing them in order</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">4. Marking Visited Nodes</h3>
                    <p className="text-gray-700 text-sm">Keeps track of visited nodes to avoid revisiting them</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use BFS?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use BFS in these scenarios:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Finding shortest path</strong> - In unweighted graphs, BFS finds the shortest path</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Level-order traversal</strong> - When you need to process nodes level by level</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Social network analysis</strong> - Finding connections within N degrees of separation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Web crawling</strong> - Exploring websites level by level</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Puzzle solving</strong> - Finding minimum moves to solve puzzles</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How BFS Works: Step-by-Step Example</h2>
            
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">BFS Traversal Steps</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <h4 className="font-semibold text-gray-900">Start: Queue = [1], Visited = {}</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 1, add its children (2, 3) to queue</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Queue: [2, 3] | Visited: [1]</div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <h4 className="font-semibold text-gray-900">Process: Queue = [2, 3]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 2, add its children (4, 5) to queue</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Queue: [3, 4, 5] | Visited: [1, 2]</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-semibold text-gray-900">Process: Queue = [3, 4, 5]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit node 3, add its children (6, 7) to queue</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Queue: [4, 5, 6, 7] | Visited: [1, 2, 3]</div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4-7</div>
                    <h4 className="font-semibold text-gray-900">Process: Queue = [4, 5, 6, 7]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">Visit nodes 4, 5, 6, 7 (no children to add)</p>
                  <div className="mt-2 ml-11 text-xs text-gray-600">Queue: [] | Visited: [1, 2, 3, 4, 5, 6, 7]</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">✓</div>
                    <h4 className="font-semibold text-gray-900">Result: BFS Order = [1, 2, 3, 4, 5, 6, 7]</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">All nodes visited level by level!</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">BFS Code Implementation</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// JavaScript BFS implementation</div>
                <div className="text-blue-400">function</div> <div className="text-yellow-400">bfs</div><div className="text-white">(root) {'{'}</div>
                <div className="text-blue-400 ml-4">if</div> <div className="text-white">(!root) </div><div className="text-blue-400">return</div><div className="text-white"> [];</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> queue = [root];</div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> result = [];</div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white"> visited = </div><div className="text-blue-400">new</div> <div className="text-yellow-400">Set</div><div className="text-white">();</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">while</div> <div className="text-white">(queue.length {'>'} </div><div className="text-yellow-400">0</div><div className="text-white">) {'{'}</div>
                <div className="text-blue-400 ml-8">const</div> <div className="text-white"> node = queue.shift(); </div><div className="text-gray-400">// Remove from front</div>
                <div className="text-white ml-8">result.push(node.val);</div>
                <div className="text-white ml-8">visited.add(node);</div>
                <div className="text-white ml-8"></div>
                <div className="text-blue-400 ml-8">for</div> <div className="text-white">(</div><div className="text-blue-400">const</div> <div className="text-white"> child of node.children) {'{'}</div>
                <div className="text-blue-400 ml-12">if</div> <div className="text-white">(!visited.has(child)) {'{'}</div>
                <div className="text-white ml-16">queue.push(child); </div><div className="text-gray-400">// Add to end</div>
                <div className="text-white ml-12">{'}'}</div>
                <div className="text-white ml-8">{'}'}</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-blue-400 ml-4">return</div> <div className="text-white"> result;</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
          </section>

          {/* Visual Flow Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BFS Algorithm Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">Start</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Initialize Queue with Root</h4>
                    <p className="text-sm text-gray-600">Queue = [root], Visited = {}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">?</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Is Queue Empty?</h4>
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
                    <h4 className="font-semibold text-gray-900">Dequeue Node</h4>
                    <p className="text-sm text-gray-600">Remove from front of queue</p>
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
                    <h4 className="font-semibold text-gray-900">Enqueue Children</h4>
                    <p className="text-sm text-gray-600">Add unvisited children to end of queue</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">Loop</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Repeat Until Queue Empty</h4>
                    <p className="text-sm text-gray-600">Go back to check queue</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Time Complexity Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BFS Time & Space Complexity</h2>
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
                    <td className="px-4 py-3 text-sm text-gray-700">V = vertices (nodes), E = edges. Visit each node once, check each edge once</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Space Complexity</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">O(V)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Queue can hold at most all nodes at the widest level</td>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use BFS?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Shortest Path</h3>
                <p className="text-gray-700 text-sm">Finds shortest path in unweighted graphs (minimum number of edges)</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Layers className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Level Order</h3>
                <p className="text-gray-700 text-sm">Natural for level-order traversal, perfect for tree printing</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Network className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Complete Search</h3>
                <p className="text-gray-700 text-sm">Visits all reachable nodes, guaranteed to find solution if exists</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Zap className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Simple Implementation</h3>
                <p className="text-gray-700 text-sm">Uses simple queue, easy to understand and implement</p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World BFS Applications</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Shortest Path Finding</h3>
                <p className="text-gray-700 text-sm mb-2">Finding minimum steps in unweighted graphs (maze solving, game AI)</p>
                <p className="text-xs text-gray-600">Example: Finding shortest path in a maze, minimum moves in chess</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Social Network Analysis</h3>
                <p className="text-gray-700 text-sm mb-2">Finding connections within N degrees (LinkedIn connections, friend suggestions)</p>
                <p className="text-xs text-gray-600">Example: "People you may know" feature, finding mutual connections</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Web Crawling</h3>
                <p className="text-gray-700 text-sm mb-2">Crawling websites level by level (search engine indexing)</p>
                <p className="text-xs text-gray-600">Example: Googlebot crawling pages, exploring website structure</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Level-Order Tree Printing</h3>
                <p className="text-gray-700 text-sm mb-2">Printing tree nodes level by level (binary tree visualization)</p>
                <p className="text-xs text-gray-600">Example: Displaying directory structure, printing organizational chart</p>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between BFS and DFS?',
                answer: 'BFS explores level by level (uses queue), while DFS explores depth first (uses stack/recursion). BFS finds shortest path in unweighted graphs, DFS uses less memory.',
              },
              {
                question: 'Why does BFS use a queue?',
                answer: 'Queue provides FIFO (First In First Out) behavior, ensuring nodes at the current level are processed before nodes at the next level. This gives level-by-level traversal.',
              },
              {
                question: 'Can BFS find shortest path in weighted graphs?',
                answer: 'No, BFS only finds shortest path in unweighted graphs (minimum number of edges). For weighted graphs, use Dijkstra\'s algorithm or A* search.',
              },
              {
                question: 'What is the time complexity of BFS?',
                answer: 'O(V + E) where V is number of vertices (nodes) and E is number of edges. For trees, this simplifies to O(V) since E = V-1.',
              },
              {
                question: 'When should I use BFS instead of DFS?',
                answer: 'Use BFS when you need shortest path, level-order traversal, or when solution is likely near the root. Use DFS when memory is limited or you need to explore deep paths.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Breadth-First Search Explained with Easy Tree Examples"
            description="Learn Breadth-First Search (BFS) algorithm with simple tree examples, step-by-step visualizations, and code examples."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
