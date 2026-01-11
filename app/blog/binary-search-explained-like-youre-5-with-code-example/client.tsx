'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Search, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Divide, Target, Lightbulb } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function BinarySearchExplainedLikeYoure5WithCodeExampleClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Binary Search Explained Like You're 5 (With Code Example)</h1>
              <p className="text-sm text-gray-500 mt-1">Simple, Visual Guide to Binary Search Algorithm (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Binary Search Explained Like You're 5 (With Code Example)"
        description="Simple, Visual Guide to Binary Search Algorithm (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is binary search?',
              answer: 'Binary search is a fast way to find a number in a sorted list. Instead of checking every number (slow), you start in the middle, check if your number is bigger or smaller, then search only the half where your number could be. You keep dividing in half until you find it. Binary search is O(log n) - very fast!',
            },
            {
              question: 'How does binary search work?',
              answer: 'Binary search works by: 1) Start in the middle of sorted list, 2) Compare middle number with target, 3) If target is smaller, search left half, 4) If target is bigger, search right half, 5) Repeat until found or list is empty. Each step cuts the search space in half, making it very fast.',
            },
            {
              question: 'Why is binary search fast?',
              answer: 'Binary search is fast because it cuts the search space in half each time. With 1 million numbers, binary search needs only ~20 comparisons, while regular search needs up to 1 million. Binary search is O(log n) - time grows slowly. Regular search is O(n) - time grows linearly.',
            },
            {
              question: 'When can I use binary search?',
              answer: 'Use binary search when: list is sorted, you need to find a specific value, you need fast search (O(log n)). Examples: finding number in sorted array, searching in phone book, finding word in dictionary, searching in sorted database. Binary search only works on sorted data.',
            },
            {
              question: 'What is the time complexity of binary search?',
              answer: 'Binary search has O(log n) time complexity - very fast! With 10 numbers, it needs ~3 comparisons. With 100 numbers, it needs ~7 comparisons. With 1 million numbers, it needs only ~20 comparisons. Time grows logarithmically, not linearly. This makes binary search one of the fastest search algorithms.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Binary Search?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Binary search</strong> is a fast way to find a number in a sorted list. Instead of checking every number one by one (which is slow), binary search starts in the middle, checks if your number is bigger or smaller, then searches only the half where your number could be. It keeps dividing the list in half until it finds your number.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of it like finding a word in a dictionary: you don't start at page 1 and read every page. Instead, you open to the middle, see if your word comes before or after, then search only that half. You keep doing this until you find your word. That's exactly how binary search works!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Binary search is very fast—it has O(log n) time complexity. With 1 million numbers, binary search needs only about 20 comparisons, while checking every number could need up to 1 million comparisons. Binary search only works on sorted lists, but when it works, it's incredibly efficient.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Binary search finds numbers in sorted lists by dividing the list in half each time. It's like finding a word in a dictionary—start in the middle, then search only the half where your word could be. Binary search is O(log n) - very fast!
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Binary Search</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Binary search involves these key concepts:
            </p>
            
            {/* Simple Analogy */}
            <div className="mb-8 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                Simple Analogy: Finding a Number in a Phone Book
              </h3>
              <p className="text-gray-700 mb-4">Imagine you're looking for "Smith" in a phone book with 1,000 pages:</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Regular Search (Slow):</h4>
                  <p className="text-sm text-gray-700 mb-2">Start at page 1, check every page until you find "Smith". Could take 500+ pages!</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <div key={i} className="w-8 h-8 bg-red-200 rounded text-xs flex items-center justify-center">P{i}</div>
                    ))}
                    <div className="w-8 h-8 bg-gray-300 rounded text-xs flex items-center justify-center">...</div>
                    <div className="w-8 h-8 bg-green-500 rounded text-white text-xs flex items-center justify-center">✓</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Might check 500+ pages</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Binary Search (Fast):</h4>
                  <p className="text-sm text-gray-700 mb-2">Open to middle (page 500), check if "Smith" comes before or after, then search only that half. Repeat!</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-24">Step 1:</span>
                      <div className="flex gap-1 flex-1">
                        <div className="w-16 h-8 bg-blue-300 rounded text-xs flex items-center justify-center">1-500</div>
                        <div className="w-16 h-8 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">500</div>
                        <div className="w-16 h-8 bg-blue-300 rounded text-xs flex items-center justify-center">501-1000</div>
                      </div>
                      <span className="text-xs text-gray-600">Check middle (500)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-24">Step 2:</span>
                      <div className="flex gap-1 flex-1">
                        <div className="w-16 h-8 bg-blue-300 rounded text-xs flex items-center justify-center">1-250</div>
                        <div className="w-16 h-8 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">250</div>
                        <div className="w-16 h-8 bg-blue-300 rounded text-xs flex items-center justify-center">251-500</div>
                      </div>
                      <span className="text-xs text-gray-600">Search left half</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-24">Step 3:</span>
                      <div className="flex gap-1 flex-1">
                        <div className="w-16 h-8 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">✓ Found!</div>
                      </div>
                      <span className="text-xs text-gray-600">Found in ~10 steps!</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Only needs ~10 steps instead of 500+</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Divide className="w-5 h-5 text-blue-600" />
                  Divide and Conquer
                </h3>
                <p className="text-gray-700 text-sm mb-2">Binary search uses "divide and conquer": it divides the list in half each time, then searches only the half where the target could be. Each step eliminates half of the remaining numbers, making it very fast. With 1 million numbers, it needs only ~20 comparisons.</p>
                <p className="text-gray-600 text-xs">Example: 1 million numbers → 500,000 → 250,000 → 125,000 → ... → found in ~20 steps</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Sorted List Required
                </h3>
                <p className="text-gray-700 text-sm mb-2">Binary search only works on sorted lists (numbers in order: 1, 2, 3, 4, 5). If the list isn't sorted, binary search won't work correctly. You must sort the list first, or use regular search. Sorted lists allow binary search to eliminate half the numbers each time.</p>
                <p className="text-gray-600 text-xs">Example: [1, 3, 5, 7, 9] is sorted - binary search works. [5, 2, 8, 1, 9] is not sorted - binary search won't work</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  O(log n) Time Complexity
                </h3>
                <p className="text-gray-700 text-sm mb-2">Binary search has O(log n) time complexity—very fast! Time grows logarithmically: 10 numbers = 3 comparisons, 100 numbers = 7 comparisons, 1,000 numbers = 10 comparisons, 1 million numbers = 20 comparisons. This is much faster than O(n) which needs n comparisons.</p>
                <p className="text-gray-600 text-xs">Example: Finding number in 1 million sorted numbers takes only ~20 comparisons with binary search</p>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Binary search divides the list in half each time, requires a sorted list, and has O(log n) time complexity. It's like finding a word in a dictionary—start in the middle, then search only the half where your word could be. Very fast!
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Binary Search</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use binary search in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When List Is Sorted</h3>
                  <p className="text-gray-700 text-sm">Use binary search when your list is sorted (numbers in order). Binary search only works on sorted data. If your list isn't sorted, sort it first or use regular search. Sorted lists allow binary search to eliminate half the numbers each step.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When You Need Fast Search</h3>
                  <p className="text-gray-700 text-sm">Use binary search when you need fast search (O(log n)). With large lists (thousands or millions of items), binary search is much faster than checking every item. Binary search is perfect for searching in large sorted databases or arrays.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Searching Multiple Times</h3>
                  <p className="text-gray-700 text-sm">Use binary search when you'll search the same list multiple times. The cost of sorting once is worth it if you search many times. Binary search makes repeated searches very fast, even on large lists.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">When Preparing for Interviews</h3>
                  <p className="text-gray-700 text-sm">Binary search is a common coding interview topic. Interviewers ask about binary search, its time complexity, and implementation. Understanding binary search helps you solve many interview problems efficiently.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use binary search when the list is sorted, you need fast search, you'll search multiple times, or you're preparing for interviews. Binary search is perfect for large sorted lists where speed matters.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Binary Search Step by Step</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these steps to understand binary search:
            </p>
            
            {/* Step-by-Step Visual Example */}
            <div className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Finding 7 in [1, 3, 5, 7, 9, 11, 13, 15]</h3>
              
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 1: Start with the whole list</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-600 w-16">Array:</div>
                    <div className="flex gap-1 flex-1">
                      {[1, 3, 5, 7, 9, 11, 13, 15].map((num, idx) => (
                        <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-sm font-semibold ${
                          num === 7 ? 'bg-green-500 text-white' : 'bg-blue-200 text-gray-800'
                        }`}>
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Looking for: 7</p>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 2: Check the middle (index 3, value 7)</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-600 w-16">Array:</div>
                    <div className="flex gap-1 flex-1">
                      {[1, 3, 5, 7, 9, 11, 13, 15].map((num, idx) => (
                        <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-sm font-semibold ${
                          idx === 3 ? 'bg-yellow-500 text-white border-2 border-yellow-700' : 
                          num === 7 ? 'bg-green-500 text-white' : 'bg-blue-200 text-gray-800'
                        }`}>
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Middle: 7. Is 7 == 7? Yes! Found it!</p>
                </div>
              </div>
            </div>

            {/* Another Example: Finding 11 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Finding 11 in [1, 3, 5, 7, 9, 11, 13, 15]</h3>
              
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 bg-white rounded-lg border border-blue-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 1: Check middle (index 3, value 7)</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-600 w-16">Array:</div>
                    <div className="flex gap-1 flex-1">
                      {[1, 3, 5, 7, 9, 11, 13, 15].map((num, idx) => (
                        <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-sm font-semibold ${
                          idx === 3 ? 'bg-yellow-500 text-white border-2 border-yellow-700' : 
                          idx >= 4 && idx <= 7 ? 'bg-blue-100 text-gray-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Middle: 7. Is 11 &gt; 7? Yes! Search right half [9, 11, 13, 15]</p>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-white rounded-lg border border-blue-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 2: Check middle of right half (index 5, value 11)</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-600 w-16">Array:</div>
                    <div className="flex gap-1 flex-1">
                      {[1, 3, 5, 7, 9, 11, 13, 15].map((num, idx) => (
                        <div key={idx} className={`w-10 h-10 rounded flex items-center justify-center text-sm font-semibold ${
                          idx === 5 ? 'bg-yellow-500 text-white border-2 border-yellow-700' : 
                          num === 11 ? 'bg-green-500 text-white' : 
                          idx >= 4 && idx <= 7 ? 'bg-blue-200 text-gray-800' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Middle: 11. Is 11 == 11? Yes! Found it in 2 steps!</p>
                </div>
              </div>
            </div>

            {/* Binary Search Code */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Binary Search Code Example</h3>
              <p className="text-gray-700 mb-4">Python implementation:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Binary Search Implementation
def binary_search(arr, target):
    """
    Find target in sorted array using binary search
    Returns index if found, -1 if not found
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        # Find middle index
        mid = (left + right) // 2
        
        # Check if target is at middle
        if arr[mid] == target:
            return mid  # Found!
        
        # If target is smaller, search left half
        elif arr[mid] > target:
            right = mid - 1
        
        # If target is larger, search right half
        else:
            left = mid + 1
    
    return -1  # Not found

# Example Usage
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
result = binary_search(numbers, 11)
print(f"Found at index: {result}")  # Output: Found at index: 5`}</code></pre>
                </div>
                
                {/* Visual: Binary Search Flow Chart */}
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Binary Search Flow Chart</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-yellow-300 text-center">
                      <div className="font-semibold text-gray-900 mb-2">Start: Array [1, 3, 5, 7, 9, 11, 13, 15], Target: 11</div>
                      <div className="text-sm text-gray-600">left=0, right=7</div>
                    </div>
                    <div className="text-center text-gray-400">↓</div>
                    <div className="p-3 bg-white rounded border border-yellow-300 text-center">
                      <div className="font-semibold text-gray-900 mb-2">Step 1: mid = (0+7)//2 = 3, arr[3] = 7</div>
                      <div className="text-sm text-gray-600">Is 11 &gt; 7? Yes → Search right half</div>
                      <div className="text-sm text-gray-600">left=4, right=7</div>
                    </div>
                    <div className="text-center text-gray-400">↓</div>
                    <div className="p-3 bg-white rounded border border-yellow-300 text-center">
                      <div className="font-semibold text-gray-900 mb-2">Step 2: mid = (4+7)//2 = 5, arr[5] = 11</div>
                      <div className="text-sm text-gray-600">Is 11 == 11? Yes → Found at index 5!</div>
                    </div>
                    <div className="text-center text-gray-400">↓</div>
                    <div className="p-3 bg-green-100 rounded border-2 border-green-500 text-center">
                      <div className="font-bold text-green-800">Result: Found at index 5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Comparison: Binary Search vs Linear Search */}
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border-2 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Binary Search vs Linear Search</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-red-300">
                  <h4 className="font-bold text-red-700 mb-3">Linear Search (Slow)</h4>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=10:</div>
                      <div className="flex-1 bg-red-100 p-2 rounded text-center font-semibold">Up to 10 checks</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=100:</div>
                      <div className="flex-1 bg-red-100 p-2 rounded text-center font-semibold">Up to 100 checks</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=1M:</div>
                      <div className="flex-1 bg-red-100 p-2 rounded text-center font-semibold">Up to 1M checks</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Time: O(n) - grows linearly</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-300">
                  <h4 className="font-bold text-green-700 mb-3">Binary Search (Fast)</h4>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=10:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded text-center font-semibold">~3 checks</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=100:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded text-center font-semibold">~7 checks</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-gray-600">n=1M:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded text-center font-semibold">~20 checks</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Time: O(log n) - grows slowly</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Binary search works by: 1) Start in middle, 2) Compare with target, 3) Search left half if smaller, right half if larger, 4) Repeat until found. It requires a sorted list and has O(log n) time complexity. Use binary search for fast searching in large sorted lists.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Binary Search Is Important</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Binary search is important for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Very Fast
                </h3>
                <p className="text-gray-700 text-sm">Binary search is O(log n) - very fast! With 1 million numbers, it needs only ~20 comparisons instead of up to 1 million. This makes it perfect for searching in large databases, sorted arrays, and real-world applications where speed matters.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Efficient Algorithm
                </h3>
                <p className="text-gray-700 text-sm">Binary search is one of the most efficient search algorithms. It uses divide and conquer to eliminate half the numbers each step. This efficiency makes it essential for computer science and programming.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  Real-World Applications
                </h3>
                <p className="text-gray-700 text-sm">Binary search is used in many real-world applications: searching in databases, finding words in dictionaries, searching in phone books, and more. Understanding binary search helps you solve real problems efficiently.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  Interview Essential
                </h3>
                <p className="text-gray-700 text-sm">Binary search is a common coding interview topic. Interviewers ask about binary search, its implementation, and time complexity. Understanding binary search is essential for technical interviews and coding challenges.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Binary search is important because it's very fast (O(log n)), efficient, used in real-world applications, and essential for coding interviews. Understanding binary search helps you write efficient code and solve problems faster.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is binary search?</h3>
                <p className="text-gray-700 leading-relaxed">Binary search is a fast way to find a number in a sorted list. Instead of checking every number (slow), you start in the middle, check if your number is bigger or smaller, then search only the half where your number could be. You keep dividing in half until you find it. Binary search is O(log n) - very fast!</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does binary search work?</h3>
                <p className="text-gray-700 leading-relaxed">Binary search works by: 1) Start in the middle of sorted list, 2) Compare middle number with target, 3) If target is smaller, search left half, 4) If target is bigger, search right half, 5) Repeat until found or list is empty. Each step cuts the search space in half, making it very fast.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is binary search fast?</h3>
                <p className="text-gray-700 leading-relaxed">Binary search is fast because it cuts the search space in half each time. With 1 million numbers, binary search needs only ~20 comparisons, while regular search needs up to 1 million. Binary search is O(log n) - time grows slowly. Regular search is O(n) - time grows linearly.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When can I use binary search?</h3>
                <p className="text-gray-700 leading-relaxed">Use binary search when: list is sorted, you need to find a specific value, you need fast search (O(log n)). Examples: finding number in sorted array, searching in phone book, finding word in dictionary, searching in sorted database. Binary search only works on sorted data.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of binary search?</h3>
                <p className="text-gray-700 leading-relaxed">Binary search has O(log n) time complexity - very fast! With 10 numbers, it needs ~3 comparisons. With 100 numbers, it needs ~7 comparisons. With 1 million numbers, it needs only ~20 comparisons. Time grows logarithmically, not linearly. This makes binary search one of the fastest search algorithms.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Binary Search Explained Like You're 5 (With Code Example)"
            description="Simple, Visual Guide to Binary Search Algorithm (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Binary Search Explained Like You're 5 Guide" />
        </section>
      </main>
    </div>
  );
}
