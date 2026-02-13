'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart3, Layers } from 'lucide-react';
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
          <h1 className="text-3xl font-bold text-gray-900">Difference Between Array and Linked List Explained Simply</h1>
          <p className="text-sm text-gray-500 mt-1">Learn when to use arrays vs linked lists with simple examples and visual comparisons</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Difference Between Array and Linked List Explained Simply"
        description="Learn the difference between arrays and linked lists with simple examples. Understand when to use each data structure."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Arrays and linked lists are two fundamental data structures that every programmer should understand. While they might seem similar 
              at first, they have crucial differences that affect when and how you should use them.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn the key differences between arrays and linked lists, when to use each one, 
              their time complexities, memory usage, and real-world applications. We'll use simple analogies and visual examples to make 
              everything crystal clear.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to check array structures 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to visualize data organization.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Are Arrays and Linked Lists?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Array
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  An <strong>array</strong> is a collection of elements stored in contiguous (adjacent) memory locations. 
                  Each element can be accessed directly using its index.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs text-gray-600 mb-2"><strong>Visual:</strong></p>
                  <div className="flex gap-1">
                    <div className="bg-blue-200 px-2 py-1 rounded text-xs font-mono">[0]</div>
                    <div className="bg-blue-200 px-2 py-1 rounded text-xs font-mono">[1]</div>
                    <div className="bg-blue-200 px-2 py-1 rounded text-xs font-mono">[2]</div>
                    <div className="bg-blue-200 px-2 py-1 rounded text-xs font-mono">[3]</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Contiguous memory blocks</p>
                </div>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-green-600" />
                  Linked List
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A <strong>linked list</strong> is a collection of nodes where each node contains data and a pointer to the next node. 
                  Elements are not stored in contiguous memory.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-xs text-gray-600 mb-2"><strong>Visual:</strong></p>
                  <div className="flex gap-1 items-center">
                    <div className="bg-green-200 px-2 py-1 rounded text-xs font-mono">A</div>
                    <div className="text-gray-400">→</div>
                    <div className="bg-green-200 px-2 py-1 rounded text-xs font-mono">B</div>
                    <div className="text-gray-400">→</div>
                    <div className="bg-green-200 px-2 py-1 rounded text-xs font-mono">C</div>
                    <div className="text-gray-400">→</div>
                    <div className="text-gray-400 text-xs">null</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Nodes connected by pointers</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Array:</strong> Like a row of lockers in a school. Each locker has a number, and you can go directly to locker #5 
                without checking lockers 1-4 first.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Linked List:</strong> Like a treasure hunt with clues. Each clue tells you where to find the next clue. 
                To reach clue #5, you must follow clues 1→2→3→4→5.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are the Key Differences?</h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Array</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Linked List</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Memory Layout</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Contiguous (adjacent blocks)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Non-contiguous (scattered)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Access by Index</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(1) - Direct access</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(n) - Must traverse</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Insert at Beginning</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(n) - Shift all elements</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(1) - Just update head</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Insert at End</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(1) - If space available</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(n) - Must find end first</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Delete at Beginning</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(n) - Shift all elements</td>
                    <td className="px-4 py-3 text-sm text-gray-700">O(1) - Just update head</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Memory Overhead</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Low (just data)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">High (data + pointers)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Cache Performance</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Excellent (contiguous)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Poor (scattered)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Size Flexibility</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Fixed (or resize with cost)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Dynamic (grows/shrinks easily)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Arrays vs Linked Lists</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                Use Arrays When:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>You need random access</strong> - When you frequently access elements by index</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Looking up user by ID, accessing array[userId]</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Size is known in advance</strong> - When you know how many elements you'll have</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Storing 100 student grades, fixed-size buffer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Performance is critical</strong> - When cache performance matters</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Image processing, numerical computations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Memory efficiency matters</strong> - When you want minimal overhead</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Large datasets, embedded systems</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Use Linked Lists When:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <Zap className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Frequent insertions/deletions at beginning</strong> - When you add/remove from start often</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Implementing a stack, undo/redo functionality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Size is unknown or changes frequently</strong> - When size varies a lot</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Reading unknown number of items from a file</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>No random access needed</strong> - When you process elements sequentially</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Processing a queue, traversing a list</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <BarChart3 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Memory fragmentation is a concern</strong> - When contiguous memory is hard to allocate</p>
                    <p className="text-gray-600 text-sm mt-1">Example: Embedded systems with limited memory</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Arrays and Linked Lists Work</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Array: How It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Arrays store elements in contiguous memory blocks. Each element has a fixed position:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Array in memory</div>
                <div className="text-white">Memory Address: 1000  1004  1008  1012</div>
                <div className="text-white">Array Index:    [0]    [1]    [2]    [3]</div>
                <div className="text-white">Value:          10     20     30     40</div>
                <div className="text-gray-400 mt-2">// Access array[2] directly:</div>
                <div className="text-white">address = 1000 + (2 × 4) = 1008  // O(1) direct access</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Key Point:</strong> Arrays use simple math to find any element: start_address + (index × element_size). 
                  This makes random access extremely fast (O(1)).
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Linked List: How It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Linked lists store elements as nodes, each containing data and a pointer to the next node:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Linked List structure</div>
                <div className="text-white">Node 1: {'{'} data: 10, next: → Node 2 {'}'}</div>
                <div className="text-white">Node 2: {'{'} data: 20, next: → Node 3 {'}'}</div>
                <div className="text-white">Node 3: {'{'} data: 30, next: → Node 4 {'}'}</div>
                <div className="text-white">Node 4: {'{'} data: 40, next: → null {'}'}</div>
                <div className="text-gray-400 mt-2">// To access 3rd element:</div>
                <div className="text-white">Start at head → follow next → follow next → found!  // O(n) traversal</div>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-green-800 text-sm">
                  <strong>Key Point:</strong> Linked lists require following pointers from node to node. 
                  To reach the 100th element, you must visit all 99 previous nodes.
                </p>
              </div>
            </div>
          </section>

          {/* Visual Comparison Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Operation Comparison Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessing Element at Index 3</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-blue-900 mb-3">Array</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                      <span className="text-gray-700">Calculate address: start + (3 × size)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                      <span className="text-gray-700">Go directly to that address</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">✓</div>
                      <span className="text-gray-700 font-semibold">Result: O(1) - Instant!</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-green-900 mb-3">Linked List</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                      <span className="text-gray-700">Start at head node</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                      <span className="text-gray-700">Follow next pointer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                      <span className="text-gray-700">Follow next pointer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                      <span className="text-gray-700">Follow next pointer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">✓</div>
                      <span className="text-gray-700 font-semibold">Result: O(n) - Must traverse</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why These Differences Matter</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Performance Impact</h3>
                <p className="text-gray-700 text-sm">Choosing the wrong structure can make your code 100x slower for large datasets</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Memory Efficiency</h3>
                <p className="text-gray-700 text-sm">Arrays use less memory, but linked lists are more flexible for dynamic sizes</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Scalability</h3>
                <p className="text-gray-700 text-sm">Understanding these differences helps you build scalable applications</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Interview Success</h3>
                <p className="text-gray-700 text-sm">This is a common interview topic—knowing when to use each is crucial</p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Array Use Cases</h3>
                <ul className="space-y-2 text-sm text-gray-700 ml-4">
                  <li>• <strong>Image pixels:</strong> 2D array for pixel data (need random access)</li>
                  <li>• <strong>Lookup tables:</strong> User ID to user data mapping (O(1) access)</li>
                  <li>• <strong>Mathematical operations:</strong> Matrix calculations (contiguous memory helps)</li>
                  <li>• <strong>Fixed-size buffers:</strong> Network packet buffers (known size)</li>
                </ul>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Linked List Use Cases</h3>
                <ul className="space-y-2 text-sm text-gray-700 ml-4">
                  <li>• <strong>Undo/Redo:</strong> Each action is a node, easy to add/remove from start</li>
                  <li>• <strong>Music playlists:</strong> Songs linked together, easy to reorder</li>
                  <li>• <strong>Browser history:</strong> Back/forward buttons (doubly linked list)</li>
                  <li>• <strong>Memory allocators:</strong> Dynamic memory management</li>
                </ul>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'Which is faster: array or linked list?',
                answer: 'It depends on the operation. Arrays are faster for random access (O(1) vs O(n)), but linked lists are faster for insertions/deletions at the beginning (O(1) vs O(n)).',
              },
              {
                question: 'Can you access array elements by index in a linked list?',
                answer: 'Technically yes, but it requires traversing from the head to that index, making it O(n) instead of O(1). Arrays provide true random access with O(1) time complexity.',
              },
              {
                question: 'Do arrays or linked lists use more memory?',
                answer: 'Arrays use less memory (just data). Linked lists use more memory because each node stores both data and a pointer to the next node, adding overhead.',
              },
              {
                question: 'When should I use a linked list over an array?',
                answer: 'Use linked lists when you frequently insert/delete at the beginning, size is unknown or changes frequently, or you don\'t need random access. Use arrays when you need fast random access or know the size in advance.',
              },
              {
                question: 'Are JavaScript arrays actually arrays?',
                answer: 'JavaScript arrays are actually objects with array-like behavior. They can behave like arrays (contiguous) or linked lists (sparse arrays), depending on how they\'re used. Modern engines optimize them as arrays when possible.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Difference Between Array and Linked List Explained Simply"
            description="Learn the difference between arrays and linked lists with simple examples. Understand when to use each data structure."
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
