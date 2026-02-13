'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Clock, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, TrendingUp, BarChart3, Activity } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is Time Complexity? Explained with Simple Examples</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Big O Notation with Visual Graphs and Examples (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is Time Complexity? Explained with Simple Examples"
        description="Complete Guide to Big O Notation with Visual Graphs and Examples (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is time complexity?',
              answer: 'Time complexity measures how long an algorithm takes to run as the input size increases. It describes how the execution time grows with input size using Big O notation (O(1), O(n), O(log n), O(n²)). O(1) is constant time (fastest), O(n) is linear time, O(log n) is logarithmic time, and O(n²) is quadratic time (slowest). Time complexity helps compare algorithm efficiency.',
            },
            {
              question: 'What is Big O notation?',
              answer: 'Big O notation describes the worst-case time complexity of an algorithm. It shows how execution time grows with input size. O(1) means constant time (same time regardless of input), O(n) means linear time (time grows proportionally with input), O(log n) means logarithmic time (time grows slowly), and O(n²) means quadratic time (time grows quickly). Big O focuses on the worst-case scenario.',
            },
            {
              question: 'What is O(1) time complexity?',
              answer: 'O(1) is constant time complexity—the algorithm takes the same amount of time regardless of input size. Examples: accessing array element by index, hash table lookup, adding to end of array. O(1) is the fastest time complexity. The execution time doesn\'t change whether you have 10 items or 10 million items.',
            },
            {
              question: 'What is O(n) time complexity?',
              answer: 'O(n) is linear time complexity—execution time grows proportionally with input size. If input doubles, time doubles. Examples: looping through array, finding element in unsorted array, printing all elements. O(n) is efficient for single-pass algorithms. Time grows linearly: 10 items = 10 operations, 100 items = 100 operations.',
            },
            {
              question: 'What is O(log n) time complexity?',
              answer: 'O(log n) is logarithmic time complexity—execution time grows slowly as input increases. Examples: binary search, balanced binary tree operations. O(log n) is very efficient. With 1 million items, binary search needs only ~20 comparisons. Time grows logarithmically: 10 items = 3 operations, 100 items = 7 operations, 1000 items = 10 operations.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Time Complexity?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Time complexity</strong> measures how long an algorithm takes to run as the input size increases. It describes how the execution time grows with input size using Big O notation. Time complexity helps you understand and compare algorithm efficiency.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of time complexity like this: if you have 10 items, how long does your algorithm take? What about 100 items? 1,000 items? Time complexity tells you how the time grows. Some algorithms take the same time regardless of input size (O(1)), while others take much longer as input grows (O(n²)).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Time complexity is written using Big O notation: O(1), O(n), O(log n), O(n²), etc. The "O" stands for "order of" and describes the worst-case scenario. Understanding time complexity helps you write efficient code and choose the right algorithm for your problem.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Time complexity measures how execution time grows with input size. It's written using Big O notation (O(1), O(n), O(log n), O(n²)). Lower time complexity means faster algorithms. Understanding time complexity helps you write efficient code.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Time Complexity Types</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common time complexity types:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  O(1) - Constant Time
                </h3>
                <p className="text-gray-700 text-sm mb-2">O(1) means constant time—the algorithm takes the same amount of time regardless of input size. Examples: accessing array element by index (arr[5]), hash table lookup, adding to end of array. O(1) is the fastest time complexity. Execution time doesn't change whether you have 10 items or 10 million items.</p>
                <p className="text-gray-600 text-xs">Example: Getting the first element of an array always takes 1 operation, whether the array has 10 or 10,000 elements</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  O(n) - Linear Time
                </h3>
                <p className="text-gray-700 text-sm mb-2">O(n) means linear time—execution time grows proportionally with input size. If input doubles, time doubles. Examples: looping through array, finding element in unsorted array, printing all elements. O(n) is efficient for single-pass algorithms. Time grows linearly: 10 items = 10 operations, 100 items = 100 operations.</p>
                <p className="text-gray-600 text-xs">Example: Finding a number in an unsorted list requires checking each item once</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  O(log n) - Logarithmic Time
                </h3>
                <p className="text-gray-700 text-sm mb-2">O(log n) means logarithmic time—execution time grows slowly as input increases. Examples: binary search, balanced binary tree operations. O(log n) is very efficient. With 1 million items, binary search needs only ~20 comparisons. Time grows logarithmically: 10 items = 3 operations, 100 items = 7 operations, 1000 items = 10 operations.</p>
                <p className="text-gray-600 text-xs">Example: Binary search halves the search space each time, so it needs very few comparisons</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  O(n²) - Quadratic Time
                </h3>
                <p className="text-gray-700 text-sm mb-2">O(n²) means quadratic time—execution time grows quickly with input size. If input doubles, time quadruples. Examples: nested loops, bubble sort, selection sort. O(n²) is inefficient for large inputs. Time grows quadratically: 10 items = 100 operations, 100 items = 10,000 operations. Avoid O(n²) when possible.</p>
                <p className="text-gray-600 text-xs">Example: Comparing every element with every other element requires n × n operations</p>
              </div>
            </div>
            
            {/* Time Complexity Comparison Chart */}
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
                Time Complexity Comparison Chart
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-gray-700">O(1)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '10%' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">Constant - Fastest</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-gray-700">O(log n)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '20%' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">Logarithmic - Very Fast</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-gray-700">O(n)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: '50%' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">Linear - Good</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-gray-700">O(n²)</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">Quadratic - Slow</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Chart showing relative execution time for different time complexities (for n=100)</p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding O(1), O(n), O(log n), and O(n²) helps you choose efficient algorithms. O(1) is fastest, O(log n) is very fast, O(n) is good, and O(n²) is slow. Always aim for lower time complexity when possible.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Consider Time Complexity</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Consider time complexity in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Writing Algorithms</h3>
                  <p className="text-gray-700 text-sm">When writing algorithms, consider time complexity to ensure efficiency. Choose algorithms with lower time complexity (O(1), O(log n), O(n)) over higher complexity (O(n²), O(n³)). Efficient algorithms run faster and use fewer resources, especially with large inputs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Comparing Solutions</h3>
                  <p className="text-gray-700 text-sm">When comparing multiple solutions to the same problem, use time complexity to choose the best one. A solution with O(n) is better than O(n²) for large inputs. Time complexity helps you make informed decisions about which algorithm to use.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Optimizing Code</h3>
                  <p className="text-gray-700 text-sm">When optimizing code for performance, analyze time complexity to identify bottlenecks. If your code has O(n²) operations, optimize them to O(n) or O(log n) if possible. Time complexity analysis guides optimization efforts.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Preparing for Interviews</h3>
                  <p className="text-gray-700 text-sm">When preparing for coding interviews, understanding time complexity is essential. Interviewers often ask about time complexity of your solutions. Being able to analyze and explain time complexity demonstrates strong problem-solving skills.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Consider time complexity when writing algorithms, comparing solutions, optimizing code, and preparing for interviews. Understanding time complexity helps you write efficient, scalable code.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Calculate Time Complexity with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to calculate time complexity with these examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: O(1) - Constant Time</h3>
              <p className="text-gray-700 mb-4">Accessing an array element by index:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Python example
arr = [10, 20, 30, 40, 50]
first_element = arr[0]  # O(1) - constant time
# Takes same time whether array has 5 or 5 million elements`}</code></pre>
                </div>
                
                {/* Visual: O(1) Graph */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">O(1) Time Complexity Graph</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=10:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-green-500 h-full rounded" style={{ width: '20px' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">1 operation</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=100:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-green-500 h-full rounded" style={{ width: '20px' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">1 operation</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=1000:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-green-500 h-full rounded" style={{ width: '20px' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">1 operation</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">Time stays constant regardless of input size</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: O(n) - Linear Time</h3>
              <p className="text-gray-700 mb-4">Looping through an array:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Python example
arr = [10, 20, 30, 40, 50]
for num in arr:  # O(n) - linear time
    print(num)
# Time grows proportionally: 5 elements = 5 operations, 100 elements = 100 operations`}</code></pre>
                </div>
                
                {/* Visual: O(n) Graph */}
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-3">O(n) Time Complexity Graph</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=10:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-yellow-500 h-full rounded" style={{ width: '10%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">10 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=100:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-yellow-500 h-full rounded" style={{ width: '100%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">100 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=1000:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-yellow-500 h-full rounded" style={{ width: '100%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">1000 operations</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">Time grows linearly with input size</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: O(log n) - Logarithmic Time</h3>
              <p className="text-gray-700 mb-4">Binary search:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Python example - Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# O(log n) - halves search space each time
# 1 million items needs only ~20 comparisons`}</code></pre>
                </div>
                
                {/* Visual: O(log n) Graph */}
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">O(log n) Time Complexity Graph</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=10:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-purple-500 h-full rounded" style={{ width: '15%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">~3 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=100:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-purple-500 h-full rounded" style={{ width: '25%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">~7 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=1000:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-purple-500 h-full rounded" style={{ width: '35%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">~10 operations</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">Time grows slowly (logarithmically) with input size</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 4: O(n²) - Quadratic Time</h3>
              <p className="text-gray-700 mb-4">Nested loops:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Python example - Nested loops
arr = [1, 2, 3, 4, 5]
for i in arr:  # Outer loop: n iterations
    for j in arr:  # Inner loop: n iterations
        print(i, j)  # Total: n × n = n² operations
# O(n²) - quadratic time
# 5 elements = 25 operations, 100 elements = 10,000 operations`}</code></pre>
                </div>
                
                {/* Visual: O(n²) Graph */}
                <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-3">O(n²) Time Complexity Graph</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=10:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-red-500 h-full rounded" style={{ width: '10%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">100 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=100:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-red-500 h-full rounded" style={{ width: '100%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">10,000 operations</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-xs text-gray-600">n=1000:</div>
                      <div className="flex-1 bg-gray-200 rounded h-4">
                        <div className="bg-red-500 h-full rounded" style={{ width: '100%' }}></div>
                      </div>
                      <div className="w-16 text-xs text-gray-600">1,000,000 operations</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">Time grows quickly (quadratically) with input size</p>
                </div>
              </div>
            </div>

            {/* Combined Comparison Graph */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-lg border-2 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                Time Complexity Growth Comparison
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Input Size (n)</span>
                    <span>Operations</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    <div className="text-center font-semibold">n=10</div>
                    <div className="text-center font-semibold">n=100</div>
                    <div className="text-center font-semibold">n=1,000</div>
                    <div className="text-center font-semibold">n=10,000</div>
                    <div className="text-center font-semibold">n=100,000</div>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-xs font-semibold text-green-700">O(1):</div>
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs">1</div>
                      <div className="text-center text-xs">1</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-xs font-semibold text-purple-700">O(log n):</div>
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      <div className="text-center text-xs">~3</div>
                      <div className="text-center text-xs">~7</div>
                      <div className="text-center text-xs">~10</div>
                      <div className="text-center text-xs">~13</div>
                      <div className="text-center text-xs">~17</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-xs font-semibold text-yellow-700">O(n):</div>
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      <div className="text-center text-xs">10</div>
                      <div className="text-center text-xs">100</div>
                      <div className="text-center text-xs">1,000</div>
                      <div className="text-center text-xs">10,000</div>
                      <div className="text-center text-xs">100,000</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-xs font-semibold text-red-700">O(n²):</div>
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      <div className="text-center text-xs">100</div>
                      <div className="text-center text-xs">10,000</div>
                      <div className="text-center text-xs">1M</div>
                      <div className="text-center text-xs">100M</div>
                      <div className="text-center text-xs">10B</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">Table showing how operations grow with input size for different time complexities</p>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Calculate time complexity by counting operations: O(1) = constant operations, O(n) = n operations, O(log n) = log n operations, O(n²) = n² operations. Use the charts and examples above to visualize how time complexity grows with input size.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Time Complexity Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Time complexity matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Performance
                </h3>
                <p className="text-gray-700 text-sm">Lower time complexity means faster algorithms. O(1) and O(log n) algorithms run much faster than O(n²) algorithms, especially with large inputs. Understanding time complexity helps you write performant code that scales well.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Scalability
                </h3>
                <p className="text-gray-700 text-sm">Time complexity determines how well your code scales. O(n) code handles 10x more input in 10x more time, but O(n²) code needs 100x more time. Scalable code uses efficient algorithms with lower time complexity.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Resource Usage
                </h3>
                <p className="text-gray-700 text-sm">Lower time complexity uses fewer CPU cycles and less energy. Efficient algorithms reduce server costs and improve user experience. Time complexity directly impacts resource consumption and costs.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  Problem Solving
                </h3>
                <p className="text-gray-700 text-sm">Understanding time complexity improves problem-solving skills. It helps you choose the right algorithm for each problem and optimize solutions. Time complexity analysis is essential for technical interviews and real-world programming.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Time complexity matters because it affects performance, scalability, resource usage, and problem-solving. Lower time complexity means faster, more efficient code. Always consider time complexity when writing algorithms.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is time complexity?</h3>
                <p className="text-gray-700 leading-relaxed">Time complexity measures how long an algorithm takes to run as the input size increases. It describes how the execution time grows with input size using Big O notation (O(1), O(n), O(log n), O(n²)). O(1) is constant time (fastest), O(n) is linear time, O(log n) is logarithmic time, and O(n²) is quadratic time (slowest). Time complexity helps compare algorithm efficiency.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Big O notation?</h3>
                <p className="text-gray-700 leading-relaxed">Big O notation describes the worst-case time complexity of an algorithm. It shows how execution time grows with input size. O(1) means constant time (same time regardless of input), O(n) means linear time (time grows proportionally with input), O(log n) means logarithmic time (time grows slowly), and O(n²) means quadratic time (time grows quickly). Big O focuses on the worst-case scenario.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is O(1) time complexity?</h3>
                <p className="text-gray-700 leading-relaxed">O(1) is constant time complexity—the algorithm takes the same amount of time regardless of input size. Examples: accessing array element by index, hash table lookup, adding to end of array. O(1) is the fastest time complexity. The execution time doesn't change whether you have 10 items or 10 million items.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is O(n) time complexity?</h3>
                <p className="text-gray-700 leading-relaxed">O(n) is linear time complexity—execution time grows proportionally with input size. If input doubles, time doubles. Examples: looping through array, finding element in unsorted array, printing all elements. O(n) is efficient for single-pass algorithms. Time grows linearly: 10 items = 10 operations, 100 items = 100 operations.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is O(log n) time complexity?</h3>
                <p className="text-gray-700 leading-relaxed">O(log n) is logarithmic time complexity—execution time grows slowly as input increases. Examples: binary search, balanced binary tree operations. O(log n) is very efficient. With 1 million items, binary search needs only ~20 comparisons. Time grows logarithmically: 10 items = 3 operations, 100 items = 7 operations, 1000 items = 10 operations.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is Time Complexity? Explained with Simple Examples"
            description="Complete Guide to Big O Notation with Visual Graphs and Examples (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is Time Complexity Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
