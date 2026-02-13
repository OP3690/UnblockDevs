'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Network, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Layers, TreePine, ArrowRight } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is BFS vs DFS? Differences Explained with Examples</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Graph Traversal (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is BFS vs DFS? Differences Explained with Examples"
        description="Complete Beginner-Friendly Guide to Graph Traversal (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is BFS (Breadth-First Search)?',
              answer: 'BFS is a graph traversal algorithm that explores nodes level by level, starting from the root. BFS visits all nodes at the current level before moving to the next level. Uses a queue data structure (FIFO - First In First Out). BFS finds the shortest path in unweighted graphs. Traversal order: level 0, then level 1, then level 2, etc. Example: exploring a maze by checking all adjacent rooms before going deeper.',
            },
            {
              question: 'What is DFS (Depth-First Search)?',
              answer: 'DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. DFS goes deep into the graph before exploring other branches. Uses a stack data structure (LIFO - Last In First Out) or recursion. DFS is memory efficient and good for finding paths. Traversal order: go deep first, then backtrack. Example: exploring a maze by going as far as possible down one path before trying another.',
            },
            {
              question: 'What is the difference between BFS and DFS?',
              answer: 'BFS vs DFS: BFS explores level by level (breadth-first), DFS explores branch by branch (depth-first). BFS uses queue (FIFO), DFS uses stack (LIFO) or recursion. BFS finds shortest path, DFS finds any path. BFS uses more memory (stores all nodes at current level), DFS uses less memory (stores path from root to current node). BFS is iterative, DFS can be recursive or iterative.',
            },
            {
              question: 'When to use BFS vs DFS?',
              answer: 'Use BFS when: need shortest path in unweighted graph, need level-order traversal, need to find nodes at specific distance, graph is shallow and wide. Use DFS when: need to explore all paths, need to detect cycles, need to find strongly connected components, graph is deep and narrow, memory is limited. Choose based on problem requirements.',
            },
            {
              question: 'What is the time complexity of BFS and DFS?',
              answer: 'Both BFS and DFS have O(V + E) time complexity, where V is number of vertices (nodes) and E is number of edges. Each node is visited once, each edge is traversed once. Space complexity: BFS is O(V) for queue (worst case: all nodes at one level), DFS is O(V) for recursion stack (worst case: depth of graph). Both are efficient for graph traversal.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is BFS vs DFS?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>BFS (Breadth-First Search)</strong> and <strong>DFS (Depth-First Search)</strong> are two fundamental graph traversal algorithms. <strong>BFS</strong> explores nodes level by level, visiting all nodes at the current level before moving to the next level. <strong>DFS</strong> explores as far as possible along each branch before backtracking.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              BFS uses a <strong>queue</strong> (FIFO - First In First Out) to store nodes, ensuring level-by-level traversal. DFS uses a <strong>stack</strong> (LIFO - Last In First Out) or recursion, allowing deep exploration before backtracking. Both algorithms visit each node exactly once, but in different orders.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              BFS finds the <strong>shortest path</strong> in unweighted graphs and is useful for level-order traversal. DFS is <strong>memory efficient</strong> and good for finding paths, detecting cycles, and exploring all possibilities. Both are essential algorithms for graph problems.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> BFS explores level by level (breadth-first), uses queue (FIFO). DFS explores branch by branch (depth-first), uses stack (LIFO) or recursion. BFS finds shortest path, DFS is memory efficient. Both have O(V + E) time complexity.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding BFS vs DFS</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding the key differences between BFS and DFS:
            </p>
            
            {/* Real-Life Analogy: Exploring a Building */}
            <div className="mb-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-amber-600" />
                Real-Life Analogy: Exploring a Building
              </h3>
              <p className="text-gray-700 mb-4">BFS vs DFS is like exploring a building:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-amber-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">BFS (Breadth-First):</span>
                    <span className="text-gray-700">Explore floor by floor</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Visit all rooms on floor 1, then all rooms on floor 2, then floor 3...</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-amber-300">
                  <div className="flex items-center gap-2 mb-2">
                    <TreePine className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">DFS (Depth-First):</span>
                    <span className="text-gray-700">Explore room by room deeply</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Go into room 1, then room 1A, then room 1A1, go as deep as possible before trying another path</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Different Strategies:</span>
                    <span className="text-gray-700">BFS finds shortest path, DFS explores all paths</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">BFS is like checking all exits on each floor, DFS is like following one path to the end</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like exploring a building, BFS and DFS use different strategies to traverse graphs.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  BFS (Breadth-First Search)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Explores level by level. Uses queue (FIFO). Visits all nodes at current level before next level. Finds shortest path in unweighted graphs. Uses more memory (stores all nodes at current level). Traversal: level 0, level 1, level 2, etc. Example: [1] → [2,3] → [4,5,6,7] (level by level).</p>
                <p className="text-gray-600 text-xs">Example: Traverse tree level by level: root, then all children, then all grandchildren</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  DFS (Depth-First Search)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Explores branch by branch. Uses stack (LIFO) or recursion. Goes deep into graph before backtracking. Memory efficient (stores path from root to current node). Traversal: go deep first, then backtrack. Example: [1] → [2] → [4] → backtrack → [5] → backtrack → [3] → [6] (deep first).</p>
                <p className="text-gray-600 text-xs">Example: Traverse tree by going deep: root → left child → left grandchild → backtrack → right grandchild</p>
              </div>
            </div>
            
            {/* Visual: BFS vs DFS Traversal */}
            <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-amber-600" />
                BFS vs DFS Traversal Visualization
              </h3>
              
              {/* Tree Structure */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Tree Structure</h4>
                <div className="p-4 bg-white rounded-lg border border-amber-300 text-center">
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">1</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">2</div>
                      </div>
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">3</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">4</div>
                      </div>
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">5</div>
                      </div>
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">6</div>
                      </div>
                      <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* BFS Traversal */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">BFS Traversal (Level by Level)</h4>
                <div className="p-4 bg-white rounded-lg border border-amber-300">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Level 0:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">1</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Level 1:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">2</div>
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">3</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Level 2:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">4</div>
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">5</div>
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">6</div>
                        <div className="p-2 bg-green-200 border-2 border-green-500 rounded text-xs font-semibold">7</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">BFS Order: 1 → 2 → 3 → 4 → 5 → 6 → 7 (level by level)</p>
                  </div>
                </div>
              </div>
              
              {/* DFS Traversal */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">DFS Traversal (Deep First)</h4>
                <div className="p-4 bg-white rounded-lg border border-amber-300">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Path 1:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">1</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">2</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">4</div>
                      </div>
                      <div className="text-xs text-gray-600">(backtrack)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Path 2:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">2</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">5</div>
                      </div>
                      <div className="text-xs text-gray-600">(backtrack)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-xs font-semibold text-gray-700">Path 3:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">1</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">3</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">6</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="p-2 bg-purple-200 border-2 border-purple-500 rounded text-xs font-semibold">7</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">DFS Order: 1 → 2 → 4 → (backtrack) → 5 → (backtrack) → 3 → 6 → 7 (deep first)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comparison Table */}
            <div className="mt-6 p-6 bg-white rounded-lg border-2 border-amber-200">
              <h4 className="font-semibold text-gray-900 mb-3">BFS vs DFS Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2 font-semibold text-gray-700">Feature</th>
                      <th className="text-left p-2 font-semibold text-gray-700">BFS</th>
                      <th className="text-left p-2 font-semibold text-gray-700">DFS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Traversal</td>
                      <td className="p-2 text-gray-600">Level by level (breadth-first)</td>
                      <td className="p-2 text-gray-600">Branch by branch (depth-first)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Data Structure</td>
                      <td className="p-2 text-gray-600">Queue (FIFO)</td>
                      <td className="p-2 text-gray-600">Stack (LIFO) or Recursion</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Shortest Path</td>
                      <td className="p-2 text-gray-600">Finds shortest path (unweighted)</td>
                      <td className="p-2 text-gray-600">Finds any path</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Memory Usage</td>
                      <td className="p-2 text-gray-600">More (stores all nodes at level)</td>
                      <td className="p-2 text-gray-600">Less (stores path from root)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Use Cases</td>
                      <td className="p-2 text-gray-600">Shortest path, level-order</td>
                      <td className="p-2 text-gray-600">Cycle detection, all paths</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-gray-700">Time Complexity</td>
                      <td className="p-2 text-gray-600">O(V + E)</td>
                      <td className="p-2 text-gray-600">O(V + E)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> BFS explores level by level using queue, finds shortest path, uses more memory. DFS explores branch by branch using stack/recursion, memory efficient, finds any path. Both have O(V + E) time complexity. Choose based on problem requirements.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use BFS vs DFS</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              When to use BFS vs DFS:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-amber-50 rounded-lg border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use BFS When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Shortest path needed:</strong> Unweighted graph shortest path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Level-order traversal:</strong> Process nodes level by level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Shallow graph:</strong> Graph is wide and shallow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Find nodes at distance:</strong> Find all nodes at distance k</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Social networks:</strong> Find degrees of separation</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use DFS When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Explore all paths:</strong> Need to find all possible paths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Cycle detection:</strong> Detect cycles in graph</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Deep graph:</strong> Graph is deep and narrow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Memory limited:</strong> DFS uses less memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Topological sort:</strong> Order nodes by dependencies</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use BFS for shortest path, level-order traversal, and shallow graphs. Use DFS for exploring all paths, cycle detection, and deep graphs. Choose based on problem requirements and memory constraints.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Implement BFS and DFS</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to implement BFS and DFS with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: BFS Implementation (Level-Order Traversal)</h3>
              <p className="text-gray-700 mb-4">BFS using queue to traverse tree level by level:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# BFS (Breadth-First Search) Implementation
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs_level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])  # Queue for BFS
    
    while queue:
        level_size = len(queue)
        level = []
        
        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()  # FIFO: remove from front
            level.append(node.val)
            
            # Add children to queue
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result

# Example usage
# Tree:     1
#          / \\
#         2   3
#        / \\ / \\
#       4  5 6  7
# BFS: [[1], [2, 3], [4, 5, 6, 7]]
# Traversal: 1 → 2 → 3 → 4 → 5 → 6 → 7`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: DFS Implementation (Recursive)</h3>
              <p className="text-gray-700 mb-4">DFS using recursion to traverse tree depth-first:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# DFS (Depth-First Search) Implementation - Recursive
def dfs_inorder(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        # Inorder: left → root → right
        traverse(node.left)   # Go deep left
        result.append(node.val)  # Process node
        traverse(node.right)  # Go deep right
    
    traverse(root)
    return result

def dfs_preorder(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        # Preorder: root → left → right
        result.append(node.val)  # Process node first
        traverse(node.left)
        traverse(node.right)
    
    traverse(root)
    return result

def dfs_postorder(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        # Postorder: left → right → root
        traverse(node.left)
        traverse(node.right)
        result.append(node.val)  # Process node last
    
    traverse(root)
    return result

# Example usage
# Tree:     1
#          / \\
#         2   3
#        / \\ / \\
#       4  5 6  7
# Inorder: [4, 2, 5, 1, 6, 3, 7]
# Preorder: [1, 2, 4, 5, 3, 6, 7]
# Postorder: [4, 5, 2, 6, 7, 3, 1]`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: DFS Implementation (Iterative with Stack)</h3>
              <p className="text-gray-700 mb-4">DFS using stack (iterative) instead of recursion:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# DFS (Depth-First Search) Implementation - Iterative
def dfs_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]  # Stack for DFS (LIFO)
    
    while stack:
        node = stack.pop()  # LIFO: remove from end
        result.append(node.val)
        
        # Add children to stack (right first, then left)
        # This ensures left is processed first (stack is LIFO)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result

# Example usage
# Tree:     1
#          / \\
#         2   3
#        / \\ / \\
#       4  5 6  7
# DFS Iterative: [1, 2, 4, 5, 3, 6, 7]
# Uses stack instead of recursion`}</code></pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> BFS uses queue (FIFO) for level-by-level traversal. DFS uses stack (LIFO) or recursion for depth-first traversal. BFS finds shortest path, DFS is memory efficient. Both have O(V + E) time complexity. Choose based on problem requirements.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why BFS vs DFS Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              BFS and DFS matter for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Fundamental Algorithms
                </h3>
                <p className="text-gray-700 text-sm">BFS and DFS are fundamental graph traversal algorithms. They form the basis for many other algorithms: shortest path (Dijkstra, BFS), cycle detection (DFS), topological sort (DFS), and more. Understanding BFS and DFS is essential for graph problems.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Network className="w-5 h-5 text-green-600" />
                  Different Use Cases
                </h3>
                <p className="text-gray-700 text-sm">BFS and DFS solve different problems efficiently. BFS finds shortest paths and level-order traversal. DFS explores all paths and detects cycles. Knowing when to use each algorithm is crucial for solving graph problems efficiently.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Interview Essential
                </h3>
                <p className="text-gray-700 text-sm">BFS and DFS are very common coding interview topics. Interviewers frequently ask about graph traversal, shortest paths, cycle detection, and tree problems. Understanding BFS and DFS is essential for technical interviews.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Real-World Applications
                </h3>
                <p className="text-gray-700 text-sm">BFS and DFS have many real-world applications: social networks (degrees of separation), web crawling (BFS), file system traversal (DFS), network routing (BFS), and game AI (DFS for decision trees). Understanding these algorithms helps solve real problems.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> BFS and DFS matter because they are fundamental algorithms, solve different problems efficiently, are essential for interviews, and have many real-world applications. Understanding when to use BFS vs DFS is crucial for graph problems.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is BFS (Breadth-First Search)?</h3>
                <p className="text-gray-700 leading-relaxed">BFS is a graph traversal algorithm that explores nodes level by level, starting from the root. BFS visits all nodes at the current level before moving to the next level. Uses a queue data structure (FIFO - First In First Out). BFS finds the shortest path in unweighted graphs. Traversal order: level 0, then level 1, then level 2, etc. Example: exploring a maze by checking all adjacent rooms before going deeper.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is DFS (Depth-First Search)?</h3>
                <p className="text-gray-700 leading-relaxed">DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. DFS goes deep into the graph before exploring other branches. Uses a stack data structure (LIFO - Last In First Out) or recursion. DFS is memory efficient and good for finding paths. Traversal order: go deep first, then backtrack. Example: exploring a maze by going as far as possible down one path before trying another.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between BFS and DFS?</h3>
                <p className="text-gray-700 leading-relaxed">BFS vs DFS: BFS explores level by level (breadth-first), DFS explores branch by branch (depth-first). BFS uses queue (FIFO), DFS uses stack (LIFO) or recursion. BFS finds shortest path, DFS finds any path. BFS uses more memory (stores all nodes at current level), DFS uses less memory (stores path from root to current node). BFS is iterative, DFS can be recursive or iterative.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use BFS vs DFS?</h3>
                <p className="text-gray-700 leading-relaxed">Use BFS when: need shortest path in unweighted graph, need level-order traversal, need to find nodes at specific distance, graph is shallow and wide. Use DFS when: need to explore all paths, need to detect cycles, need to find strongly connected components, graph is deep and narrow, memory is limited. Choose based on problem requirements.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of BFS and DFS?</h3>
                <p className="text-gray-700 leading-relaxed">Both BFS and DFS have O(V + E) time complexity, where V is number of vertices (nodes) and E is number of edges. Each node is visited once, each edge is traversed once. Space complexity: BFS is O(V) for queue (worst case: all nodes at one level), DFS is O(V) for recursion stack (worst case: depth of graph). Both are efficient for graph traversal.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is BFS vs DFS? Differences Explained with Examples"
            description="Complete Beginner-Friendly Guide to Graph Traversal (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is BFS vs DFS Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
