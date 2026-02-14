'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, GitMerge, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Layers, ArrowDown, ArrowUp } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function MergeSortExplainedStepByStepWhyPreferredInInterviewsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <GitMerge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Merge Sort Explained Step-by-Step (Why It's Preferred in Interviews)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Merge Sort (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Merge Sort Explained Step-by-Step (Why It's Preferred in Interviews)"
        description="Learn merge sort algorithm step-by-step with visual examples. Complete beginner-friendly guide to merge sort, divide and conquer, time complexity O(n log n), and why it's preferred in coding interviews."
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is merge sort?',
              answer: 'Merge sort is a divide and conquer sorting algorithm that divides array into halves, sorts each half recursively, then merges sorted halves. Merge sort has O(n log n) time complexity in all cases (best, average, worst), making it predictable and efficient. Merge sort is stable (preserves relative order of equal elements) and works well for large datasets. It\'s preferred in interviews because it demonstrates recursion, divide and conquer, and has guaranteed O(n log n) performance.',
            },
            {
              question: 'How does merge sort work?',
              answer: 'Merge sort works by: 1) Divide array into two halves, 2) Recursively sort each half, 3) Merge two sorted halves into one sorted array. The merge step compares elements from both halves and combines them in sorted order. Base case: array with 0 or 1 element is already sorted. Merge sort uses recursion to break problem into smaller subproblems, then combines solutions.',
            },
            {
              question: 'Why is merge sort preferred in interviews?',
              answer: 'Merge sort is preferred in interviews because: demonstrates recursion and divide and conquer concepts, has guaranteed O(n log n) time complexity (predictable), is stable (preserves order of equal elements), works well for large datasets, shows understanding of algorithm design principles, and is a classic algorithm that interviewers expect candidates to know. Merge sort showcases multiple important concepts in one algorithm.',
            },
            {
              question: 'What is the time complexity of merge sort?',
              answer: 'Merge sort has O(n log n) time complexity in all cases (best, average, worst). Divide step takes O(log n) levels (dividing array in half each time), merge step takes O(n) at each level, total: O(n log n). Space complexity is O(n) for temporary arrays during merge. Merge sort is efficient and predictable, unlike quicksort which can degrade to O(n²) in worst case.',
            },
            {
              question: 'What is the difference between merge sort and quicksort?',
              answer: 'Merge sort vs quicksort: Merge sort has O(n log n) guaranteed (all cases), quicksort has O(n log n) average but O(n²) worst case. Merge sort is stable, quicksort is not stable. Merge sort uses O(n) extra space, quicksort uses O(log n) space. Merge sort divides then merges, quicksort partitions then sorts. Merge sort is preferred when stability and guaranteed performance matter, quicksort is faster in practice for average case.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Merge Sort?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Merge Sort</strong> is a divide and conquer sorting algorithm that divides an array into two halves, sorts each half recursively, then merges the sorted halves into one sorted array. Merge sort has <strong>O(n log n)</strong> time complexity in all cases (best, average, worst), making it predictable and efficient.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Merge sort is a <strong>stable</strong> sorting algorithm, meaning it preserves the relative order of equal elements. It works well for large datasets and is particularly useful when you need guaranteed performance. Merge sort demonstrates important concepts like recursion, divide and conquer, and algorithm design.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Merge sort is <strong>preferred in coding interviews</strong> because it showcases multiple important concepts: recursion, divide and conquer, merging sorted arrays, and has guaranteed O(n log n) performance. It's a classic algorithm that interviewers expect candidates to understand and implement.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Merge sort divides array into halves, sorts recursively, then merges. Has O(n log n) time complexity in all cases. Stable algorithm (preserves order). Preferred in interviews because it demonstrates recursion, divide and conquer, and guaranteed performance.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Merge Sort Process</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding how merge sort works:
            </p>
            
            {/* Real-Life Analogy: Sorting Cards */}
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-indigo-600" />
                Real-Life Analogy: Sorting Playing Cards
              </h3>
              <p className="text-gray-700 mb-4">Merge sort is like sorting playing cards by dividing and merging:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowDown className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Step 1: Divide</span>
                    <span className="text-gray-700">Split deck into two piles</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Divide array into two halves</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="flex items-center gap-2 mb-2">
                    <GitMerge className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Step 2: Sort</span>
                    <span className="text-gray-700">Sort each pile separately</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Recursively sort each half</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUp className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Step 3: Merge</span>
                    <span className="text-gray-700">Combine sorted piles into one</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Merge two sorted halves</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-gray-700">Fully sorted deck</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Array is completely sorted</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like sorting cards, merge sort divides, sorts, and merges to create a sorted array.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ArrowDown className="w-5 h-5 text-blue-600" />
                  Divide Phase
                </h3>
                <p className="text-gray-700 text-sm mb-2">Divide array into two halves. Recursively divide until each subarray has 0 or 1 element (base case). Division continues until base case is reached. Each division creates smaller subproblems. Time: O(log n) levels of division.</p>
                <p className="text-gray-600 text-xs">Example: [5,2,8,1] → [5,2] and [8,1] → [5], [2], [8], [1]</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <GitMerge className="w-5 h-5 text-green-600" />
                  Merge Phase
                </h3>
                <p className="text-gray-700 text-sm mb-2">Merge two sorted halves into one sorted array. Compare elements from both halves, add smaller element to result. Continue until one half is exhausted, then add remaining elements. Merge step takes O(n) time. This is where actual sorting happens.</p>
                <p className="text-gray-600 text-xs">Example: Merge [2,5] and [1,8] → [1,2,5,8]</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Base Case
                </h3>
                <p className="text-gray-700 text-sm mb-2">Base case: array with 0 or 1 element is already sorted. Recursion stops at base case. Base case is the simplest version of the problem that doesn't need further division. Without base case, recursion would run forever.</p>
                <p className="text-gray-600 text-xs">Example: [5] is already sorted, no need to divide further</p>
              </div>
            </div>
            
            {/* Visual: Merge Sort Process */}
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GitMerge className="w-6 h-6 text-indigo-600" />
                Merge Sort Step-by-Step Visualization
              </h3>
              
              {/* Divide Phase */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Divide Phase (Splitting)</h4>
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Level 0:</div>
                      <div className="flex-1 flex gap-1">
                        {[5, 2, 8, 1, 9, 3].map((num) => (
                          <div key={num} className="w-10 h-10 bg-indigo-200 border-2 border-indigo-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Level 1:</div>
                      <div className="flex-1 flex gap-4">
                        <div className="flex gap-1">
                          {[5, 2, 8].map((num) => (
                            <div key={num} className="w-10 h-10 bg-blue-200 border-2 border-blue-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          {[1, 9, 3].map((num) => (
                            <div key={num} className="w-10 h-10 bg-blue-200 border-2 border-blue-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Level 2:</div>
                      <div className="flex-1 flex gap-2">
                        {[5, 2, 8, 1, 9, 3].map((num) => (
                          <div key={num} className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">(Base case - single elements)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Merge Phase */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Merge Phase (Combining)</h4>
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Merge 1:</div>
                      <div className="flex-1 flex gap-2">
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">2</div>
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">5</div>
                        </div>
                        <div className="text-xs text-gray-400">+</div>
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">8</div>
                        </div>
                        <ArrowUp className="w-4 h-4 text-indigo-600" />
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">2</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">5</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">8</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Merge 2:</div>
                      <div className="flex-1 flex gap-2">
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">3</div>
                          <div className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">9</div>
                        </div>
                        <ArrowUp className="w-4 h-4 text-indigo-600" />
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">3</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">9</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Final Merge:</div>
                      <div className="flex-1 flex gap-2">
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">2</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">5</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">8</div>
                        </div>
                        <div className="text-xs text-gray-400">+</div>
                        <div className="flex gap-1">
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">3</div>
                          <div className="w-10 h-10 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">9</div>
                        </div>
                        <ArrowUp className="w-4 h-4 text-indigo-600" />
                        <div className="flex gap-1">
                          {[1, 2, 3, 5, 8, 9].map((num) => (
                            <div key={num} className="w-10 h-10 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Merge sort divides array into halves recursively until base case (0 or 1 element). Then merges sorted halves back together. Divide phase: O(log n) levels. Merge phase: O(n) at each level. Total: O(n log n) time complexity.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Merge Sort</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use merge sort in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Merge Sort When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Guaranteed performance:</strong> Need O(n log n) in all cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Stability required:</strong> Preserve order of equal elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Large datasets:</strong> Works well for big arrays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Linked lists:</strong> Natural fit for linked list sorting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>External sorting:</strong> Sorting data that doesn't fit in memory</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Merge Sort When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Memory constrained:</strong> Uses O(n) extra space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Small arrays:</strong> Overhead not worth it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Already sorted:</strong> Still does full O(n log n) work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>In-place required:</strong> Merge sort needs extra space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Simple sorting:</strong> Insertion sort better for small arrays</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use merge sort when you need guaranteed O(n log n) performance, stability, or working with large datasets. Avoid merge sort when memory is constrained or for small arrays. Merge sort is preferred in interviews for its predictable performance.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Implement Merge Sort Step-by-Step</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to implement merge sort with step-by-step examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Complete Merge Sort Implementation</h3>
              <p className="text-gray-700 mb-4">Full merge sort with divide and merge functions:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Merge Sort Implementation
def merge_sort(arr):
    # Base case: array with 0 or 1 element is already sorted
    if len(arr) <= 1:
        return arr
    
    # Divide: split array into two halves
    mid = len(arr) // 2
    left = arr[:mid]   # Left half
    right = arr[mid:]  # Right half
    
    # Conquer: recursively sort both halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Combine: merge two sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # Compare elements from both arrays, add smaller to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements from left array
    while i < len(left):
        result.append(left[i])
        i += 1
    
    # Add remaining elements from right array
    while j < len(right):
        result.append(right[j])
        j += 1
    
    return result

# Example usage
arr = [5, 2, 8, 1, 9, 3]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # Output: [1, 2, 3, 5, 8, 9]

# How it works:
# [5,2,8,1,9,3] → divide → [5,2,8] and [1,9,3]
# [5,2,8] → divide → [5,2] and [8] → merge → [2,5] and [8] → merge → [2,5,8]
# [1,9,3] → divide → [1,9] and [3] → merge → [1,9] and [3] → merge → [1,3,9]
# Final merge: [2,5,8] and [1,3,9] → [1,2,3,5,8,9]`}</code></pre>
                </div>
                
                {/* Visual: Merge Function Process */}
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Merge Function Visualization</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Left Array:</div>
                      <div className="flex-1 flex gap-1">
                        {[2, 5, 8].map((num) => (
                          <div key={num} className="w-12 h-12 bg-blue-200 border-2 border-blue-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Right Array:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 3, 9].map((num) => (
                          <div key={num} className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center text-gray-400">↓ Compare and merge</div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Result:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 2, 3, 5, 8, 9].map((num) => (
                          <div key={num} className="w-12 h-12 bg-purple-200 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">Compare elements from both arrays, add smaller to result, continue until both arrays are merged</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Merge Sort with In-Place Merge (Advanced)</h3>
              <p className="text-gray-700 mb-4">Merge sort with in-place merging (more memory efficient):</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Merge Sort with In-Place Merge (Advanced)
def merge_sort_inplace(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left < right:
        mid = (left + right) // 2
        
        # Recursively sort both halves
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge in-place
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    # Create temporary arrays for left and right halves
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge two sorted arrays
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example usage
arr = [5, 2, 8, 1, 9, 3]
merge_sort_inplace(arr)
print(arr)  # Output: [1, 2, 3, 5, 8, 9]`}</code></pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Merge sort divides array recursively until base case, then merges sorted halves. Merge function compares elements from both arrays and combines them in sorted order. Time complexity: O(n log n) in all cases. Space complexity: O(n) for temporary arrays. Merge sort is stable and predictable.
              </p>
            </div>
          </section>

          {/* Why Section - Why Preferred in Interviews */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Merge Sort Is Preferred in Interviews</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Merge sort is preferred in interviews for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Demonstrates Multiple Concepts
                </h3>
                <p className="text-gray-700 text-sm">Merge sort showcases recursion, divide and conquer, merging sorted arrays, and algorithm design. Interviewers can assess understanding of multiple concepts in one algorithm. This makes merge sort a comprehensive test of algorithmic knowledge.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <GitMerge className="w-5 h-5 text-green-600" />
                  Guaranteed Performance
                </h3>
                <p className="text-gray-700 text-sm">Merge sort has O(n log n) time complexity in all cases (best, average, worst). Unlike quicksort which can degrade to O(n²), merge sort is predictable. Interviewers appreciate algorithms with guaranteed performance, especially for production code.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Classic Algorithm
                </h3>
                <p className="text-gray-700 text-sm">Merge sort is a classic, well-known algorithm that interviewers expect candidates to know. It's taught in computer science courses and appears in many algorithm textbooks. Knowing merge sort shows solid CS fundamentals.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Stable Sorting
                </h3>
                <p className="text-gray-700 text-sm">Merge sort is stable (preserves relative order of equal elements). This is important in many real-world scenarios. Interviewers may ask about stability, and merge sort is a good example of a stable sorting algorithm.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Merge sort is preferred in interviews because it demonstrates multiple concepts (recursion, divide and conquer), has guaranteed O(n log n) performance, is a classic algorithm, and is stable. It's a comprehensive test of algorithmic knowledge that interviewers value.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is merge sort?</h3>
                <p className="text-gray-700 leading-relaxed">Merge sort is a divide and conquer sorting algorithm that divides array into halves, sorts each half recursively, then merges sorted halves. Merge sort has O(n log n) time complexity in all cases (best, average, worst), making it predictable and efficient. Merge sort is stable (preserves relative order of equal elements) and works well for large datasets. It's preferred in interviews because it demonstrates recursion, divide and conquer, and has guaranteed O(n log n) performance.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does merge sort work?</h3>
                <p className="text-gray-700 leading-relaxed">Merge sort works by: 1) Divide array into two halves, 2) Recursively sort each half, 3) Merge two sorted halves into one sorted array. The merge step compares elements from both halves and combines them in sorted order. Base case: array with 0 or 1 element is already sorted. Merge sort uses recursion to break problem into smaller subproblems, then combines solutions.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is merge sort preferred in interviews?</h3>
                <p className="text-gray-700 leading-relaxed">Merge sort is preferred in interviews because: demonstrates recursion and divide and conquer concepts, has guaranteed O(n log n) time complexity (predictable), is stable (preserves order of equal elements), works well for large datasets, shows understanding of algorithm design principles, and is a classic algorithm that interviewers expect candidates to know. Merge sort showcases multiple important concepts in one algorithm.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of merge sort?</h3>
                <p className="text-gray-700 leading-relaxed">Merge sort has O(n log n) time complexity in all cases (best, average, worst). Divide step takes O(log n) levels (dividing array in half each time), merge step takes O(n) at each level, total: O(n log n). Space complexity is O(n) for temporary arrays during merge. Merge sort is efficient and predictable, unlike quicksort which can degrade to O(n²) in worst case.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between merge sort and quicksort?</h3>
                <p className="text-gray-700 leading-relaxed">Merge sort vs quicksort: Merge sort has O(n log n) guaranteed (all cases), quicksort has O(n log n) average but O(n²) worst case. Merge sort is stable, quicksort is not stable. Merge sort uses O(n) extra space, quicksort uses O(log n) space. Merge sort divides then merges, quicksort partitions then sorts. Merge sort is preferred when stability and guaranteed performance matter, quicksort is faster in practice for average case.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Merge Sort Explained Step-by-Step (Why It's Preferred in Interviews)"
            description="Learn merge sort algorithm step-by-step with visual examples. Complete beginner-friendly guide to merge sort, divide and conquer, time complexity O(n log n), and why it's preferred in coding interviews."
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Merge Sort Guide" />
        </section>
      </main>
    </div>
  );
}
