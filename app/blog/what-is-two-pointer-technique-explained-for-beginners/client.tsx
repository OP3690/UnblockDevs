'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Target, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Move, ArrowRight, ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function WhatIsTwoPointerTechniqueExplainedForBeginnersClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is Two Pointer Technique? Explained for Beginners</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Two Pointers (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is Two Pointer Technique? Explained for Beginners"
        description="Complete Beginner-Friendly Guide to Two Pointers (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is the two pointer technique?',
              answer: 'Two pointer technique uses two pointers (indices) to traverse an array or string, usually from different positions or moving at different speeds. It reduces time complexity from O(n²) to O(n) by avoiding nested loops. Common patterns: opposite ends (left and right), same start (fast and slow), or sliding window. Two pointers is efficient and commonly used in coding interviews.',
            },
            {
              question: 'How does two pointer technique work?',
              answer: 'Two pointer technique works by: 1) Initialize two pointers at different positions, 2) Move pointers based on condition, 3) Process elements at pointer positions, 4) Continue until pointers meet or condition is met. Pointers move toward each other (opposite ends) or in same direction (fast/slow). Each element is visited at most once, giving O(n) time complexity.',
            },
            {
              question: 'When to use two pointer technique?',
              answer: 'Use two pointers for: sorted arrays (find pairs, remove duplicates), palindromes (check if string is palindrome), linked lists (find middle, detect cycle), sliding window (subarray problems), and problems that can be solved with O(n) instead of O(n²). Two pointers is great when you can eliminate possibilities by moving pointers.',
            },
            {
              question: 'What are the types of two pointer techniques?',
              answer: 'Types of two pointers: 1) Opposite ends (left and right pointers move toward each other), 2) Fast and slow (both start at beginning, move at different speeds), 3) Sliding window (two pointers define window that slides), 4) Meeting in middle (pointers start at ends, meet in middle). Each type solves different problems efficiently.',
            },
            {
              question: 'What is the time complexity of two pointer technique?',
              answer: 'Two pointer technique has O(n) time complexity, where n is the size of the array or string. Each element is visited at most once by the pointers. This is much better than O(n²) brute force approach. Space complexity is O(1) if no extra data structures are used. Two pointers is one of the most efficient techniques for array/string problems.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            All products are independently selected and reviewed by CNN Underscored editors. When you buy through links on our site, we may earn a commission.
          </p>
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Two Pointer Technique?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>Two Pointer Technique</strong> uses two pointers (indices) to traverse an array or string, usually from different positions or moving at different speeds. It reduces time complexity from O(n²) to O(n) by avoiding nested loops and processing each element at most once.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Two pointers is efficient because instead of checking all pairs of elements (O(n²)), you use two pointers to eliminate possibilities and find solutions in a single pass (O(n)). The pointers move based on conditions, and each element is visited at most once, making it much faster than brute force approaches.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common patterns include: <strong>opposite ends</strong> (left and right pointers move toward each other), <strong>fast and slow</strong> (both start at beginning, move at different speeds), and <strong>sliding window</strong> (two pointers define a window that slides). Two pointers is one of the most important techniques for coding interviews.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Two pointer technique uses two pointers to traverse an array/string, reducing time complexity from O(n²) to O(n). Pointers move based on conditions, and each element is visited at most once. Common patterns: opposite ends, fast/slow, and sliding window.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Two Pointer Patterns</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Two pointer technique has several common patterns:
            </p>
            
            {/* Real-Life Analogy: Two People Meeting */}
            <div className="mb-8 p-6 bg-rose-50 rounded-lg border-2 border-rose-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Move className="w-6 h-6 text-rose-600" />
                Real-Life Analogy: Two People Walking Toward Each Other
              </h3>
              <p className="text-gray-700 mb-4">Two pointers is like two people walking toward each other:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-rose-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
                      <span className="font-semibold text-gray-900">Left Pointer</span>
                    </div>
                    <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Right Pointer</span>
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">They start at opposite ends and move toward each other</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-rose-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
                      <span className="font-semibold text-gray-900">Left Pointer</span>
                    </div>
                    <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Right Pointer</span>
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">They move based on conditions (e.g., sum too large/small)</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                  </div>
                  <p className="text-sm text-gray-600 text-center font-semibold">They meet in the middle - solution found!</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like two people meeting, pointers move toward each other until they find the solution.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ArrowLeftIcon className="w-5 h-5 text-blue-600" />
                  <ArrowRight className="w-5 h-5 text-red-600" />
                  Opposite Ends (Left & Right)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Two pointers start at opposite ends of array/string and move toward each other. Left pointer starts at beginning, right pointer starts at end. They move based on conditions (sum, comparison, etc.). Common for: finding pairs, palindromes, sorted array problems. Time: O(n).</p>
                <p className="text-gray-600 text-xs">Example: Find two numbers that sum to target in sorted array</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Fast and Slow Pointers
                </h3>
                <p className="text-gray-700 text-sm mb-2">Both pointers start at beginning, but move at different speeds. Fast pointer moves 2 steps, slow pointer moves 1 step. Common for: finding middle of linked list, detecting cycles, removing nth node from end. Time: O(n).</p>
                <p className="text-gray-600 text-xs">Example: Find middle of linked list, detect cycle in linked list</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Move className="w-5 h-5 text-purple-600" />
                  Sliding Window
                </h3>
                <p className="text-gray-700 text-sm mb-2">Two pointers define a window that slides through the array. Left and right pointers expand/contract the window. Common for: subarray problems, substring problems, longest/shortest subarray. Time: O(n).</p>
                <p className="text-gray-600 text-xs">Example: Find longest substring with at most k distinct characters</p>
              </div>
            </div>
            
            {/* Visual: Two Pointer Patterns */}
            <div className="mt-8 p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg border-2 border-rose-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-rose-600" />
                Two Pointer Patterns Visualization
              </h3>
              
              {/* Pattern 1: Opposite Ends */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Pattern 1: Opposite Ends</h4>
                <div className="p-4 bg-white rounded-lg border border-rose-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
                      <span className="text-sm font-semibold">Left</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <div key={num} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">{num}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Right</span>
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Pointers start at opposite ends, move toward each other</p>
                </div>
              </div>
              
              {/* Pattern 2: Fast and Slow */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Pattern 2: Fast and Slow</h4>
                <div className="p-4 bg-white rounded-lg border border-rose-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
                    <span className="text-sm font-semibold">Slow (1 step)</span>
                    <div className="flex-1"></div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">F</div>
                    <span className="text-sm font-semibold">Fast (2 steps)</span>
                  </div>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div key={num} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">{num}</div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">Both start at beginning, fast moves twice as fast</p>
                </div>
              </div>
              
              {/* Pattern 3: Sliding Window */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pattern 3: Sliding Window</h4>
                <div className="p-4 bg-white rounded-lg border border-rose-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">L</div>
                    <span className="text-sm font-semibold">Left</span>
                    <div className="flex-1 mx-2 border-t-2 border-purple-400"></div>
                    <span className="text-sm font-semibold">Right</span>
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">R</div>
                  </div>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <div key={num} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">{num}</div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">Window slides, expanding/contracting based on conditions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Two pointer patterns: opposite ends (left/right move toward each other), fast/slow (different speeds), and sliding window (window expands/contracts). Each pattern solves different problems efficiently with O(n) time complexity.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Two Pointers</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use two pointers in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-rose-50 rounded-lg border-2 border-rose-200">
                <h3 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Two Pointers When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Sorted arrays:</strong> Find pairs, remove duplicates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Palindromes:</strong> Check if string is palindrome</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Linked lists:</strong> Find middle, detect cycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Subarray problems:</strong> Sliding window technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span><strong>O(n²) to O(n):</strong> Optimize nested loops</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Two Pointers When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Unsorted arrays:</strong> Need sorting first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need all pairs:</strong> Two pointers finds one solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Complex conditions:</strong> Hard to determine pointer movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Non-linear structure:</strong> Two pointers work on arrays/lists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need backtracking:</strong> Two pointers moves forward only</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use two pointers for sorted arrays, palindromes, linked lists, subarray problems, and when you can optimize O(n²) to O(n). Avoid two pointers for unsorted arrays, when you need all pairs, or complex conditions.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Use Two Pointers with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to use two pointers with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Two Sum (Opposite Ends)</h3>
              <p className="text-gray-700 mb-4">Find two numbers in sorted array that sum to target:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Find two numbers that sum to target
# Array is sorted: [1, 2, 3, 4, 5, 6], target = 7

def two_sum_sorted(arr, target):
    left = 0  # Start at beginning
    right = len(arr) - 1  # Start at end
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]  # Found!
        elif current_sum < target:
            left += 1  # Sum too small, move left pointer right
        else:
            right -= 1  # Sum too large, move right pointer left
    
    return []  # No solution

# Example usage
arr = [1, 2, 3, 4, 5, 6]
target = 7
result = two_sum_sorted(arr, target)
print(result)  # Output: [0, 5] (1 + 6 = 7)

# How it works:
# left=0, right=5: 1+6=7 → Found!
# If sum < target: move left right (need larger sum)
# If sum > target: move right left (need smaller sum)`}</code></pre>
                </div>
                
                {/* Visual: Two Sum Process */}
                <div className="p-6 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Two Sum Process Visualization</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Array:</div>
                      <div className="flex-1 flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                          <div key={idx} className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold">{num}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Step 1:</div>
                      <div className="flex-1 flex gap-1 relative">
                        {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                          <div key={idx} className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold relative">
                            {num}
                            {idx === 0 && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold">L</div>}
                            {idx === 5 && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-600 font-bold">R</div>}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">1 + 6 = 7 ✓ Found!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Check Palindrome (Opposite Ends)</h3>
              <p className="text-gray-700 mb-4">Check if string is palindrome using two pointers:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Check if string is palindrome
# "racecar" is palindrome (reads same forwards and backwards)

def is_palindrome(s):
    # Remove non-alphanumeric and convert to lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    
    left = 0
    right = len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False  # Not palindrome
        left += 1
        right -= 1
    
    return True  # Is palindrome

# Example usage
print(is_palindrome("racecar"))  # Output: True
print(is_palindrome("hello"))    # Output: False

# How it works:
# Compare characters at left and right pointers
# If they match, move pointers toward center
# If all match, string is palindrome`}</code></pre>
                </div>
                
                {/* Visual: Palindrome Check */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Palindrome Check: "racecar"</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      {['r', 'a', 'c', 'e', 'c', 'a', 'r'].map((char, idx) => (
                        <div key={idx} className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold relative">
                          {char}
                          {idx === 0 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold text-xs">L</div>}
                          {idx === 6 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-red-600 font-bold text-xs">R</div>}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-600">r == r ✓, a == a ✓, c == c ✓ → Palindrome!</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: Find Middle of Linked List (Fast & Slow)</h3>
              <p className="text-gray-700 mb-4">Find middle node using fast and slow pointers:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Find middle of linked list
# Fast pointer moves 2 steps, slow pointer moves 1 step
# When fast reaches end, slow is at middle

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def find_middle(head):
    slow = head  # Slow pointer
    fast = head   # Fast pointer
    
    # Fast moves 2 steps, slow moves 1 step
    while fast and fast.next:
        slow = slow.next      # Move 1 step
        fast = fast.next.next # Move 2 steps
    
    return slow  # Slow is at middle

# Example: 1 -> 2 -> 3 -> 4 -> 5
# slow at 1, fast at 1
# slow at 2, fast at 3
# slow at 3, fast at 5 (end)
# Return slow (node 3) - middle!

# How it works:
# Fast pointer reaches end in n/2 steps
# Slow pointer is at middle (n/2 steps)`}</code></pre>
                </div>
                
                {/* Visual: Fast and Slow Pointers */}
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Fast & Slow Pointers: Find Middle</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((num, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold relative">
                            {num}
                            {idx === 0 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-xs">S,F</div>}
                          </div>
                          {idx < 4 && <div className="w-4 h-0.5 bg-gray-400"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-600">Step 1: S at 1, F at 1</div>
                    <div className="flex items-center gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((num, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold relative">
                            {num}
                            {idx === 1 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-xs">S</div>}
                            {idx === 2 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold text-xs">F</div>}
                          </div>
                          {idx < 4 && <div className="w-4 h-0.5 bg-gray-400"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-600">Step 2: S at 2, F at 3</div>
                    <div className="flex items-center gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((num, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold relative">
                            {num}
                            {idx === 2 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-xs">S</div>}
                            {idx === 4 && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold text-xs">F</div>}
                          </div>
                          {idx < 4 && <div className="w-4 h-0.5 bg-gray-400"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-600">Step 3: S at 3 (middle!), F at 5 (end)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Use opposite ends for sorted arrays and palindromes. Use fast/slow for linked lists (middle, cycle detection). Use sliding window for subarray problems. Two pointers reduces O(n²) to O(n). Make sure pointers move correctly based on conditions.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Two Pointers Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Two pointers matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  O(n) Time Complexity
                </h3>
                <p className="text-gray-700 text-sm">Two pointers reduces time complexity from O(n²) to O(n). Instead of nested loops checking all pairs, two pointers processes each element once. This makes algorithms much faster, especially for large inputs. O(n) is optimal for many array/string problems.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Space Efficient
                </h3>
                <p className="text-gray-700 text-sm">Two pointers uses O(1) extra space (just two pointer variables). No need for extra data structures like hash maps or arrays. This makes two pointers memory-efficient, important for memory-constrained environments or large datasets.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Common Interview Topic
                </h3>
                <p className="text-gray-700 text-sm">Two pointers is a very common coding interview topic. Interviewers frequently ask about two sum, palindromes, linked list problems, and sliding window. Understanding two pointers is essential for technical interviews and coding challenges.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Versatile Technique
                </h3>
                <p className="text-gray-700 text-sm">Two pointers works for many problems: arrays, strings, linked lists, and sliding windows. It's a versatile technique that can be adapted to different problem types. Learning two pointers helps solve many coding problems efficiently.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Two pointers matters because it provides O(n) time complexity (better than O(n²)), uses O(1) space, is a common interview topic, and is versatile for many problem types. Two pointers is one of the most important techniques for coding interviews.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the two pointer technique?</h3>
                <p className="text-gray-700 leading-relaxed">Two pointer technique uses two pointers (indices) to traverse an array or string, usually from different positions or moving at different speeds. It reduces time complexity from O(n²) to O(n) by avoiding nested loops. Common patterns: opposite ends (left and right), same start (fast and slow), or sliding window. Two pointers is efficient and commonly used in coding interviews.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does two pointer technique work?</h3>
                <p className="text-gray-700 leading-relaxed">Two pointer technique works by: 1) Initialize two pointers at different positions, 2) Move pointers based on condition, 3) Process elements at pointer positions, 4) Continue until pointers meet or condition is met. Pointers move toward each other (opposite ends) or in same direction (fast/slow). Each element is visited at most once, giving O(n) time complexity.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use two pointer technique?</h3>
                <p className="text-gray-700 leading-relaxed">Use two pointers for: sorted arrays (find pairs, remove duplicates), palindromes (check if string is palindrome), linked lists (find middle, detect cycle), sliding window (subarray problems), and problems that can be solved with O(n) instead of O(n²). Two pointers is great when you can eliminate possibilities by moving pointers.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the types of two pointer techniques?</h3>
                <p className="text-gray-700 leading-relaxed">Types of two pointers: 1) Opposite ends (left and right pointers move toward each other), 2) Fast and slow (both start at beginning, move at different speeds), 3) Sliding window (two pointers define window that slides), 4) Meeting in middle (pointers start at ends, meet in middle). Each type solves different problems efficiently.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of two pointer technique?</h3>
                <p className="text-gray-700 leading-relaxed">Two pointer technique has O(n) time complexity, where n is the size of the array or string. Each element is visited at most once by the pointers. This is much better than O(n²) brute force approach. Space complexity is O(1) if no extra data structures are used. Two pointers is one of the most efficient techniques for array/string problems.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is Two Pointer Technique? Explained for Beginners"
            description="Complete Beginner-Friendly Guide to Two Pointers (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is Two Pointer Technique Guide" />
        </section>
      </main>
    </div>
  );
}
