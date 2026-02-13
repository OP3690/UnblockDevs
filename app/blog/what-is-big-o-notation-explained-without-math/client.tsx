'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, TrendingUp, AlertCircle, CheckCircle, BarChart3, Clock, Target } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">What Is Big-O Notation? Explained Without Math</h1>
          <p className="text-sm text-gray-500 mt-1">Learn Big-O notation with simple examples, visual charts, and real-world analogies</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="What Is Big-O Notation? Explained Without Math"
        description="Learn Big-O notation explained simply without complex math. Understand O(1), O(n), O(log n), O(n²) with real-world examples."
        variant="floating"
      />

      {/* Main Content */}
      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Big-O notation is a way to describe how fast an algorithm runs as the input size grows. It's essential for understanding 
              algorithm efficiency, but many explanations are filled with complex math that makes it hard to grasp. This guide explains 
              Big-O notation using simple language, real-world examples, and visual charts—no math required!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you're preparing for coding interviews, optimizing your code, or just curious about how algorithms work, 
              understanding Big-O notation will help you write better, faster code and make smarter decisions about which algorithms to use.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to check data structures 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to visualize nested data.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is Big-O Notation?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Big-O Notation</strong> (pronounced "Big Oh") is a way to describe how the runtime or space requirements of an algorithm 
              grow as the input size increases. It tells you the worst-case scenario—how slow your algorithm could be in the worst situation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of it like this: If you have 10 items, an algorithm might take 1 second. Big-O tells you how long it will take 
              if you have 100 items, 1,000 items, or 1 million items—without actually running the code.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-World Analogy</h3>
              <p className="text-gray-700 mb-3">
                Imagine you're looking for a book in a library:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li><strong>O(1) - Constant Time:</strong> You know exactly where the book is (like a dictionary lookup). Takes the same time whether the library has 100 or 1 million books.</li>
                <li><strong>O(n) - Linear Time:</strong> You check each shelf one by one. If the library doubles in size, it takes twice as long.</li>
                <li><strong>O(log n) - Logarithmic Time:</strong> You use the catalog system to narrow down the location. Even if the library is huge, you find it quickly.</li>
                <li><strong>O(n²) - Quadratic Time:</strong> You compare every book with every other book. If the library doubles, it takes 4 times longer!</li>
              </ul>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does Each Big-O Notation Mean?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here are the most common Big-O notations you'll encounter, explained with simple examples:
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 text-white px-4 py-2 rounded font-bold text-lg">O(1)</div>
                  <h3 className="text-xl font-semibold text-gray-900">Constant Time</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Meaning:</strong> The algorithm takes the same amount of time, no matter how big the input is.</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Getting the first item from an array, looking up a value in a hash map</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                  <div className="text-gray-400">// O(1) - Always takes same time</div>
                  <div className="text-blue-400">const</div> <div className="text-white">firstItem = array[</div><div className="text-yellow-400">0</div><div className="text-white">];</div>
                  <div className="text-blue-400">const</div> <div className="text-white">value = hashMap.get(</div><div className="text-yellow-400">'key'</div><div className="text-white">);</div>
                </div>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-sm text-gray-700"><strong>Visual:</strong> Input size: 10 → Time: 1s | Input size: 1000 → Time: 1s | Input size: 1M → Time: 1s</p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-lg">O(n)</div>
                  <h3 className="text-xl font-semibold text-gray-900">Linear Time</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Meaning:</strong> The time grows proportionally with the input size. Double the input, double the time.</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Looping through an array, finding an item in an unsorted list</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                  <div className="text-gray-400">// O(n) - Time grows with input size</div>
                  <div className="text-blue-400">for</div> <div className="text-white">(let i = </div><div className="text-yellow-400">0</div><div className="text-white">; i {'<'} array.length; i++) {'{'}</div>
                  <div className="text-white ml-4">console.log(array[i]);</div>
                  <div className="text-white">{'}'}</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-sm text-gray-700"><strong>Visual:</strong> Input size: 10 → Time: 1s | Input size: 100 → Time: 10s | Input size: 1000 → Time: 100s</p>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded font-bold text-lg">O(log n)</div>
                  <h3 className="text-xl font-semibold text-gray-900">Logarithmic Time</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Meaning:</strong> Very efficient! Time grows slowly even as input grows. Each step eliminates half the possibilities.</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Binary search, searching in a sorted array</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                  <div className="text-gray-400">// O(log n) - Very efficient, eliminates half each time</div>
                  <div className="text-blue-400">function</div> <div className="text-yellow-400">binarySearch</div><div className="text-white">(arr, target) {'{'}</div>
                  <div className="text-white ml-4">// Check middle, then left or right half</div>
                  <div className="text-white ml-4">// Each step eliminates half the array</div>
                  <div className="text-white">{'}'}</div>
                </div>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-sm text-gray-700"><strong>Visual:</strong> Input size: 10 → Time: 1s | Input size: 100 → Time: 2s | Input size: 1000 → Time: 3s</p>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-lg">O(n²)</div>
                  <h3 className="text-xl font-semibold text-gray-900">Quadratic Time</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Meaning:</strong> Slow! Time grows much faster than input. Double the input, quadruple the time.</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Nested loops, comparing every item with every other item</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                  <div className="text-gray-400">// O(n²) - Nested loops, slow for large inputs</div>
                  <div className="text-blue-400">for</div> <div className="text-white">(let i = </div><div className="text-yellow-400">0</div><div className="text-white">; i {'<'} array.length; i++) {'{'}</div>
                  <div className="text-blue-400 ml-4">for</div> <div className="text-white">(let j = </div><div className="text-yellow-400">0</div><div className="text-white">; j {'<'} array.length; j++) {'{'}</div>
                  <div className="text-white ml-8">// Compare array[i] with array[j]</div>
                  <div className="text-white ml-4">{'}'}</div>
                  <div className="text-white">{'}'}</div>
                </div>
                <div className="bg-white p-3 rounded border border-red-200">
                  <p className="text-sm text-gray-700"><strong>Visual:</strong> Input size: 10 → Time: 1s | Input size: 100 → Time: 100s | Input size: 1000 → Time: 10,000s</p>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Comparison Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Big-O Notation Performance Comparison</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Input Size</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">O(1)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">O(log n)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">O(n)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">O(n²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">10 items</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 operation</td>
                    <td className="px-4 py-3 text-sm text-gray-700">~3 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">10 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">100 operations</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">100 items</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 operation</td>
                    <td className="px-4 py-3 text-sm text-gray-700">~7 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">100 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">10,000 operations</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">1,000 items</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 operation</td>
                    <td className="px-4 py-3 text-sm text-gray-700">~10 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1,000 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1,000,000 operations</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">1,000,000 items</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 operation</td>
                    <td className="px-4 py-3 text-sm text-gray-700">~20 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1,000,000 operations</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1,000,000,000,000 operations</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Key Insight:</strong> Notice how O(1) and O(log n) stay fast even with huge inputs, while O(n²) becomes extremely slow. 
                This is why choosing the right algorithm matters!
              </p>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Should You Care About Big-O?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Big-O notation matters most in these situations:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Coding interviews</strong> - Interviewers expect you to analyze algorithm complexity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Large datasets</strong> - When processing thousands or millions of items</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Performance-critical code</strong> - When speed is important for user experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Choosing algorithms</strong> - When deciding between different approaches</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Optimizing existing code</strong> - When your code is too slow and needs improvement</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> For small inputs (less than 100 items), Big-O differences might not matter. 
                But as data grows, the right algorithm choice becomes critical!
              </p>
            </div>
          </section>

          {/* How */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Identify Big-O Notation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here's a simple guide to identify Big-O notation in code:
            </p>
            
            <div className="space-y-6">
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  O(1) - Constant Time
                </h3>
                <p className="text-gray-700 text-sm mb-2"><strong>Look for:</strong> Single operations, array indexing, hash map lookups</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div>array[0]  // O(1)</div>
                  <div>hashMap.get('key')  // O(1)</div>
                  <div>return value  // O(1)</div>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  O(n) - Linear Time
                </h3>
                <p className="text-gray-700 text-sm mb-2"><strong>Look for:</strong> Single loops that visit each element once</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div>for (let i = 0; i {'<'} n; i++)  // O(n)</div>
                  <div>array.forEach(item =&gt; ...)  // O(n)</div>
                  <div>array.find(item =&gt; ...)  // O(n)</div>
                </div>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  O(log n) - Logarithmic Time
                </h3>
                <p className="text-gray-700 text-sm mb-2"><strong>Look for:</strong> Algorithms that eliminate half the data each step</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div>Binary search  // O(log n)</div>
                  <div>Searching in balanced tree  // O(log n)</div>
                  <div>while (left {'<'} right) {'{'} mid = (left + right) / 2 {'}'}  // O(log n)</div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  O(n²) - Quadratic Time
                </h3>
                <p className="text-gray-700 text-sm mb-2"><strong>Look for:</strong> Nested loops, comparing every item with every other item</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div>for (let i = 0; i {'<'} n; i++) {'{'}</div>
                  <div className="ml-4">for (let j = 0; j {'<'} n; j++)  // O(n²)</div>
                  <div>{'}'}</div>
                  <div>Bubble sort, selection sort  // O(n²)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Growth Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Big-O Growth Visualization</h2>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <p className="text-gray-700 mb-4 text-sm">How operations grow with input size (relative scale):</p>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">O(1)</span>
                    <span className="text-xs text-gray-500">Constant</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-600 h-4 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">O(log n)</span>
                    <span className="text-xs text-gray-500">Logarithmic</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-purple-600 h-4 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">O(n)</span>
                    <span className="text-xs text-gray-500">Linear</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">O(n²)</span>
                    <span className="text-xs text-gray-500">Quadratic</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                * Visual representation showing relative growth. O(1) stays flat, O(log n) grows slowly, O(n) grows proportionally, O(n²) grows rapidly.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Big-O Notation Matters</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better Algorithm Choices</h3>
                <p className="text-gray-700 text-sm">Understanding Big-O helps you choose the most efficient algorithm for your problem</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Performance Optimization</h3>
                <p className="text-gray-700 text-sm">Identify bottlenecks and optimize slow parts of your code</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Scalability Planning</h3>
                <p className="text-gray-700 text-sm">Predict how your code will perform as data grows</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Interview Success</h3>
                <p className="text-gray-700 text-sm">Big-O is a common interview topic—understanding it helps you stand out</p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Big-O Mistakes to Avoid</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mistake: Ignoring Constants</h3>
                  <p className="text-gray-700 text-sm">O(2n) is still O(n). Constants don't change the Big-O classification.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mistake: Confusing Best Case with Big-O</h3>
                  <p className="text-gray-700 text-sm">Big-O describes worst-case performance, not best case. A linear search might find the item first (best case), but it's still O(n) worst case.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mistake: Over-Optimizing Small Data</h3>
                  <p className="text-gray-700 text-sm">For small inputs, a simpler O(n²) algorithm might be faster than a complex O(n log n) one due to overhead.</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What does the "O" in Big-O stand for?',
                answer: 'The "O" stands for "Order of" or "Order". Big-O notation describes the order of growth of an algorithm\'s runtime or space requirements as input size increases.',
              },
              {
                question: 'Is O(n) always better than O(n²)?',
                answer: 'Yes, for large inputs. O(n) grows linearly while O(n²) grows quadratically. However, for very small inputs, the actual performance difference might be negligible, and O(n²) might have less overhead.',
              },
              {
                question: 'What is the difference between time complexity and space complexity?',
                answer: 'Time complexity (Big-O) describes how runtime grows with input size. Space complexity describes how memory usage grows. Both use the same Big-O notation (e.g., O(n) time, O(1) space).',
              },
              {
                question: 'Can you have O(0.5n)?',
                answer: 'No, Big-O notation ignores constants and lower-order terms. O(0.5n) is written as O(n). The constant 0.5 doesn\'t change how the algorithm scales with input size.',
              },
              {
                question: 'What is the best Big-O notation?',
                answer: 'O(1) is the best (constant time), followed by O(log n) (logarithmic). O(n) is good for most cases. O(n²) and higher are generally slow for large inputs and should be avoided when possible.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="What Is Big-O Notation? Explained Without Math"
            description="Learn Big-O notation explained simply without complex math. Understand O(1), O(n), O(log n), O(n²) with real-world examples."
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
