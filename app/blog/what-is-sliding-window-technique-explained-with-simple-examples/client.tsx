'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Square, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Move, ArrowRight, Maximize2 } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Square className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is Sliding Window Technique? Explained with Simple Examples</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Sliding Window (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is Sliding Window Technique? Explained with Simple Examples"
        description="Complete Beginner-Friendly Guide to Sliding Window (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is the sliding window technique?',
              answer: 'Sliding window technique uses two pointers to maintain a window (subarray/substring) that slides through an array or string. The window expands or contracts based on conditions, allowing efficient O(n) solutions for subarray/substring problems. Common types: fixed-size window (window size stays constant) and variable-size window (window size changes). Sliding window avoids recalculating overlapping elements.',
            },
            {
              question: 'How does sliding window technique work?',
              answer: 'Sliding window works by: 1) Initialize left and right pointers, 2) Expand window by moving right pointer, 3) Contract window by moving left pointer when condition is met, 4) Process elements within window, 5) Continue until right pointer reaches end. Each element is added/removed from window once, giving O(n) time complexity. Window slides through array without recalculating overlapping parts.',
            },
            {
              question: 'When to use sliding window technique?',
              answer: 'Use sliding window for: subarray/substring problems (longest substring with k distinct characters), problems with constraints (sum less than k, at most k elements), problems requiring contiguous subarrays, and when you can maintain window state efficiently. Sliding window is great for problems that ask about subarrays/substrings with specific properties.',
            },
            {
              question: 'What is the difference between fixed and variable sliding window?',
              answer: 'Fixed sliding window: window size stays constant (e.g., find maximum sum of subarray of size k). Variable sliding window: window size changes based on conditions (e.g., find longest substring with at most k distinct characters). Fixed window moves both pointers together, variable window expands/contracts independently. Both use O(n) time complexity.',
            },
            {
              question: 'What is the time complexity of sliding window technique?',
              answer: 'Sliding window technique has O(n) time complexity, where n is the size of the array or string. Each element is added to window once (right pointer) and removed once (left pointer), so each element is processed at most twice. Space complexity is O(k) where k is the window size (for hash map/set). Sliding window is one of the most efficient techniques for subarray/substring problems.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Sliding Window Technique?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>Sliding Window Technique</strong> uses two pointers to maintain a <strong>window</strong> (subarray or substring) that slides through an array or string. The window expands or contracts based on conditions, allowing efficient O(n) solutions for subarray/substring problems without recalculating overlapping elements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sliding window is efficient because instead of checking all possible subarrays (O(n²) or O(n³)), you maintain a window that slides through the array, adding and removing elements as needed. Each element is processed at most twice (added once, removed once), giving O(n) time complexity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common types include: <strong>fixed-size window</strong> (window size stays constant) and <strong>variable-size window</strong> (window size changes based on conditions). Sliding window is one of the most important techniques for solving subarray/substring problems efficiently.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Sliding window uses two pointers to maintain a window that slides through an array/string. Window expands/contracts based on conditions, giving O(n) time complexity. Common types: fixed-size (constant size) and variable-size (size changes). Avoids recalculating overlapping elements.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Sliding Window Types</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sliding window has two main types:
            </p>
            
            {/* Real-Life Analogy: Window Shopping */}
            <div className="mb-8 p-6 bg-cyan-50 rounded-lg border-2 border-cyan-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Square className="w-6 h-6 text-cyan-600" />
                Real-Life Analogy: Window Shopping
              </h3>
              <p className="text-gray-700 mb-4">Sliding window is like looking through a store window:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-cyan-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-5 h-5 text-cyan-600" />
                    <span className="font-semibold text-gray-900">Fixed Window:</span>
                    <span className="text-gray-700">Always look at 3 items at a time</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Window size stays constant as you slide along the display</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-cyan-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Move className="w-5 h-5 text-cyan-600" />
                    <span className="font-semibold text-gray-900">Variable Window:</span>
                    <span className="text-gray-700">Look at items until you find what you want</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Window size changes based on what you're looking for</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Efficient:</span>
                    <span className="text-gray-700">Don't re-examine items you've already seen</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Just slide the window and update what's inside</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like window shopping, sliding window efficiently processes elements without re-examining what you've already seen.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-blue-600" />
                  Fixed-Size Sliding Window
                </h3>
                <p className="text-gray-700 text-sm mb-2">Window size stays constant. Both left and right pointers move together, maintaining the same window size. Common for: finding maximum/minimum sum of subarray of size k, average of subarray of size k. Example: Find maximum sum of subarray of size 3 in [1, 2, 3, 4, 5] → windows: [1,2,3], [2,3,4], [3,4,5].</p>
                <p className="text-gray-600 text-xs">Example: Find maximum sum of subarray of size k</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Move className="w-5 h-5 text-green-600" />
                  Variable-Size Sliding Window
                </h3>
                <p className="text-gray-700 text-sm mb-2">Window size changes based on conditions. Right pointer expands window, left pointer contracts when condition is met. Common for: longest substring with at most k distinct characters, minimum window substring, longest subarray with sum less than k. Window expands/contracts independently.</p>
                <p className="text-gray-600 text-xs">Example: Find longest substring with at most k distinct characters</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Window State
                </h3>
                <p className="text-gray-700 text-sm mb-2">Window state tracks elements within the window (using hash map, set, or variables). When window expands, add new element to state. When window contracts, remove element from state. State is updated incrementally, avoiding recalculation. This makes sliding window O(n) instead of O(n²).</p>
                <p className="text-gray-600 text-xs">Example: Use hash map to track character frequencies in window</p>
              </div>
            </div>
            
            {/* Visual: Sliding Window Types */}
            <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Square className="w-6 h-6 text-cyan-600" />
                Sliding Window Types Visualization
              </h3>
              
              {/* Fixed Window */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Fixed-Size Window (Size = 3)</h4>
                <div className="p-4 bg-white rounded-lg border border-cyan-300">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 0 && idx < 3 ? 'bg-cyan-200 border-2 border-cyan-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window 1: [1,2,3]</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 1 && idx < 4 ? 'bg-cyan-200 border-2 border-cyan-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window 2: [2,3,4]</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 2 && idx < 5 ? 'bg-cyan-200 border-2 border-cyan-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window 3: [3,4,5]</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">Window size stays constant (3), slides one position at a time</p>
                </div>
              </div>
              
              {/* Variable Window */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Variable-Size Window</h4>
                <div className="p-4 bg-white rounded-lg border border-cyan-300">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {['a', 'b', 'c', 'a', 'b'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 0 && idx < 2 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window size: 2</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {['a', 'b', 'c', 'a', 'b'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 0 && idx < 3 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window size: 3 (expanded)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {['a', 'b', 'c', 'a', 'b'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 1 && idx < 4 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-2">Window size: 3 (contracted)</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">Window size changes based on conditions (expands/contracts)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Fixed window maintains constant size, both pointers move together. Variable window changes size, expands/contracts independently. Window state tracks elements efficiently, avoiding recalculation. Both types give O(n) time complexity.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Sliding Window</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use sliding window in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                <h3 className="font-bold text-cyan-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Sliding Window When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Subarray/substring problems:</strong> Longest substring, minimum window</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Constraints on window:</strong> Sum less than k, at most k elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Contiguous elements:</strong> Need consecutive subarray/substring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Fixed-size subarray:</strong> Maximum sum of subarray of size k</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Can maintain state:</strong> Track window efficiently with hash map/set</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Sliding Window When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Non-contiguous elements:</strong> Need non-consecutive elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Complex state:</strong> Window state too complex to maintain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need all subarrays:</strong> Sliding window finds one solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Sorted order needed:</strong> Sliding window works on unsorted arrays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Non-linear structure:</strong> Sliding window works on arrays/strings</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use sliding window for subarray/substring problems, constraints on window, contiguous elements, and when you can maintain window state efficiently. Avoid sliding window for non-contiguous elements or complex state.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Use Sliding Window with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to use sliding window with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Maximum Sum of Subarray of Size K (Fixed Window)</h3>
              <p className="text-gray-700 mb-4">Find maximum sum of subarray of fixed size k:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Maximum sum of subarray of size k
# Array: [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4

def max_sum_subarray_fixed(arr, k):
    n = len(arr)
    if n < k:
        return -1
    
    # Calculate sum of first window
    window_sum = sum(arr[0:k])
    max_sum = window_sum
    
    # Slide window: remove leftmost, add rightmost
    for i in range(k, n):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example usage
arr = [1, 4, 2, 10, 23, 3, 1, 0, 20]
k = 4
result = max_sum_subarray_fixed(arr, k)
print(result)  # Output: 39 (subarray [4, 2, 10, 23])

# How it works:
# Window 1: [1,4,2,10] sum = 17
# Window 2: [4,2,10,23] sum = 39 (max)
# Window 3: [2,10,23,3] sum = 38
# Window 4: [10,23,3,1] sum = 37
# ... and so on`}</code></pre>
                </div>
                
                {/* Visual: Fixed Window Sliding */}
                <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Fixed Window Sliding Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Window 1:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 4, 2, 10, 23, 3, 1, 0, 20].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 0 && idx < 4 ? 'bg-cyan-200 border-2 border-cyan-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Sum: 17</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Window 2:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 4, 2, 10, 23, 3, 1, 0, 20].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 1 && idx < 5 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Sum: 39 (max!)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Window 3:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 4, 2, 10, 23, 3, 1, 0, 20].map((num, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 2 && idx < 6 ? 'bg-cyan-200 border-2 border-cyan-500' : 'bg-gray-200'}`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Sum: 38</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Longest Substring with At Most K Distinct Characters (Variable Window)</h3>
              <p className="text-gray-700 mb-4">Find longest substring with at most k distinct characters:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Longest substring with at most k distinct characters
# String: "eceba", k = 2

def longest_substring_k_distinct(s, k):
    if not s or k == 0:
        return 0
    
    left = 0
    max_len = 0
    char_count = {}  # Track character frequencies in window
    
    for right in range(len(s)):
        # Add current character to window
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        
        # Shrink window if more than k distinct characters
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        
        # Update maximum length
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Example usage
s = "eceba"
k = 2
result = longest_substring_k_distinct(s, k)
print(result)  # Output: 3 (substring "ece" or "ceb")

# How it works:
# Expand window by moving right pointer
# Contract window when distinct chars > k
# Track max length of valid window`}</code></pre>
                </div>
                
                {/* Visual: Variable Window */}
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Variable Window Process: "eceba", k=2</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Step 1:</div>
                      <div className="flex-1 flex gap-1">
                        {['e', 'c', 'e', 'b', 'a'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 0 && idx < 3 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Window: "ece" (2 distinct: e,c) Length: 3</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Step 2:</div>
                      <div className="flex-1 flex gap-1">
                        {['e', 'c', 'e', 'b', 'a'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 1 && idx < 4 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Window: "ceb" (3 distinct: c,e,b) → Contract</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Step 3:</div>
                      <div className="flex-1 flex gap-1">
                        {['e', 'c', 'e', 'b', 'a'].map((char, idx) => (
                          <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold ${idx >= 2 && idx < 4 ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-200'}`}>
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">Window: "eb" (2 distinct: e,b) Length: 2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: Minimum Window Substring (Variable Window)</h3>
              <p className="text-gray-700 mb-4">Find minimum window substring containing all characters of pattern:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Minimum window substring
# String: "ADOBECODEBANC", Pattern: "ABC"
# Find minimum window containing all characters of pattern

def min_window_substring(s, t):
    if not s or not t or len(s) < len(t):
        return ""
    
    # Count characters needed
    need = {}
    for char in t:
        need[char] = need.get(char, 0) + 1
    
    left = 0
    min_len = float('inf')
    min_start = 0
    missing = len(t)  # Characters still needed
    
    for right in range(len(s)):
        # Expand window
        if s[right] in need:
            if need[s[right]] > 0:
                missing -= 1
            need[s[right]] -= 1
        
        # Contract window when all characters found
        while missing == 0:
            # Update minimum window
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_start = left
            
            # Shrink window from left
            if s[left] in need:
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
            left += 1
    
    return s[min_start:min_start + min_len] if min_len != float('inf') else ""

# Example usage
s = "ADOBECODEBANC"
t = "ABC"
result = min_window_substring(s, t)
print(result)  # Output: "BANC" (minimum window containing A, B, C)`}</code></pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> For fixed window, calculate first window sum, then slide by subtracting leftmost and adding rightmost. For variable window, expand with right pointer, contract with left pointer when condition met. Use hash map/set to track window state efficiently. Sliding window gives O(n) time complexity.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Sliding Window Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sliding window matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  O(n) Time Complexity
                </h3>
                <p className="text-gray-700 text-sm">Sliding window provides O(n) time complexity for subarray/substring problems. Instead of O(n²) or O(n³) brute force, sliding window processes each element at most twice (added once, removed once). This makes algorithms much faster, especially for large inputs.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Square className="w-5 h-5 text-green-600" />
                  Avoids Recalculation
                </h3>
                <p className="text-gray-700 text-sm">Sliding window avoids recalculating overlapping elements. When window slides, you only update the state (add new element, remove old element), instead of recalculating the entire window. This makes sliding window much more efficient than brute force approaches.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Common Interview Topic
                </h3>
                <p className="text-gray-700 text-sm">Sliding window is a very common coding interview topic. Interviewers frequently ask about longest substring, minimum window, maximum sum subarray, and other sliding window problems. Understanding sliding window is essential for technical interviews.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Versatile Technique
                </h3>
                <p className="text-gray-700 text-sm">Sliding window works for many problems: fixed-size subarrays, variable-size substrings, constraints on window, and problems requiring contiguous elements. It's a versatile technique that can be adapted to different problem types. Learning sliding window helps solve many coding problems efficiently.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Sliding window matters because it provides O(n) time complexity (better than O(n²)), avoids recalculating overlapping elements, is a common interview topic, and is versatile for many problem types. Sliding window is one of the most important techniques for subarray/substring problems.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the sliding window technique?</h3>
                <p className="text-gray-700 leading-relaxed">Sliding window technique uses two pointers to maintain a window (subarray/substring) that slides through an array or string. The window expands or contracts based on conditions, allowing efficient O(n) solutions for subarray/substring problems. Common types: fixed-size window (window size stays constant) and variable-size window (window size changes). Sliding window avoids recalculating overlapping elements.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does sliding window technique work?</h3>
                <p className="text-gray-700 leading-relaxed">Sliding window works by: 1) Initialize left and right pointers, 2) Expand window by moving right pointer, 3) Contract window by moving left pointer when condition is met, 4) Process elements within window, 5) Continue until right pointer reaches end. Each element is added/removed from window once, giving O(n) time complexity. Window slides through array without recalculating overlapping parts.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use sliding window technique?</h3>
                <p className="text-gray-700 leading-relaxed">Use sliding window for: subarray/substring problems (longest substring with k distinct characters), problems with constraints (sum less than k, at most k elements), problems requiring contiguous subarrays, and when you can maintain window state efficiently. Sliding window is great for problems that ask about subarrays/substrings with specific properties.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between fixed and variable sliding window?</h3>
                <p className="text-gray-700 leading-relaxed">Fixed sliding window: window size stays constant (e.g., find maximum sum of subarray of size k). Variable sliding window: window size changes based on conditions (e.g., find longest substring with at most k distinct characters). Fixed window moves both pointers together, variable window expands/contracts independently. Both use O(n) time complexity.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of sliding window technique?</h3>
                <p className="text-gray-700 leading-relaxed">Sliding window technique has O(n) time complexity, where n is the size of the array or string. Each element is added to window once (right pointer) and removed once (left pointer), so each element is processed at most twice. Space complexity is O(k) where k is the window size (for hash map/set). Sliding window is one of the most efficient techniques for subarray/substring problems.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is Sliding Window Technique? Explained with Simple Examples"
            description="Complete Beginner-Friendly Guide to Sliding Window (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is Sliding Window Technique Guide" />
        </section>
      </main>
    </div>
  );
}
