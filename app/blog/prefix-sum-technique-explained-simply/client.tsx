'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Calculator, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Plus, TrendingUp } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function PrefixSumTechniqueExplainedSimplyClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prefix Sum Technique Explained Simply</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Prefix Sum (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Prefix Sum Technique Explained Simply"
        description="Learn what prefix sum technique is with simple examples. Complete beginner-friendly guide to prefix sum array, range sum queries, and O(1) query time."
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is prefix sum technique?',
              answer: 'Prefix sum technique precomputes cumulative sums of array elements, allowing O(1) range sum queries. Prefix sum array stores sum of all elements from index 0 to current index. To get sum from index i to j, use prefix[j] - prefix[i-1]. This reduces time complexity from O(n) per query to O(1) per query after O(n) preprocessing. Example: array [1,2,3,4,5] has prefix sum [1,3,6,10,15].',
            },
            {
              question: 'How does prefix sum work?',
              answer: 'Prefix sum works by: 1) Create prefix array where prefix[i] = sum of elements from 0 to i, 2) To get sum from i to j, calculate prefix[j] - prefix[i-1] (or prefix[j] if i=0), 3) This gives O(1) query time after O(n) preprocessing. Prefix array is built once, then all queries are O(1). Example: prefix[2] = 6 (1+2+3), prefix[4] = 15 (1+2+3+4+5), sum from 2 to 4 = prefix[4] - prefix[1] = 15 - 3 = 12.',
            },
            {
              question: 'When to use prefix sum technique?',
              answer: 'Use prefix sum for: range sum queries (sum of subarray from i to j), multiple queries on same array (preprocessing pays off), problems requiring cumulative sums, and when you need O(1) query time. Prefix sum is great when you have many queries on static or rarely-changing arrays. Avoid prefix sum for single query (overhead not worth it) or when array changes frequently.',
            },
            {
              question: 'What is the time complexity of prefix sum?',
              answer: 'Prefix sum has O(n) time complexity for preprocessing (building prefix array) and O(1) time complexity for each range sum query. Space complexity is O(n) for storing prefix array. For m queries, total time is O(n + m) instead of O(n*m) without prefix sum. This makes prefix sum very efficient for multiple queries.',
            },
            {
              question: 'What are the advantages of prefix sum?',
              answer: 'Advantages: O(1) query time after preprocessing, efficient for multiple queries, simple to implement, reduces time complexity from O(n) to O(1) per query. Disadvantages: O(n) extra space, O(n) preprocessing time, not efficient for single query, array should be static or rarely change. Prefix sum is ideal when you have many range sum queries.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Prefix Sum Technique?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Prefix Sum Technique</strong> precomputes cumulative sums of array elements, allowing O(1) range sum queries. A <strong>prefix sum array</strong> stores the sum of all elements from index 0 to the current index. To get the sum from index i to j, you use <code className="bg-gray-100 px-2 py-1 rounded">prefix[j] - prefix[i-1]</code>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prefix sum reduces time complexity from O(n) per query to O(1) per query after O(n) preprocessing. Instead of calculating the sum from scratch each time, you precompute all cumulative sums once, then answer queries instantly using simple subtraction.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This technique is especially powerful when you have <strong>multiple range sum queries</strong> on the same array. The preprocessing cost is paid once, and all subsequent queries are O(1), making it much more efficient than calculating sums repeatedly.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Prefix sum precomputes cumulative sums in O(n) time, then answers range sum queries in O(1) time using prefix[j] - prefix[i-1]. Ideal for multiple queries on static arrays. Reduces O(n) per query to O(1) per query.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Prefix Sum</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding how prefix sum works:
            </p>
            
            {/* Real-Life Analogy: Running Total */}
            <div className="mb-8 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                Real-Life Analogy: Running Total
              </h3>
              <p className="text-gray-700 mb-4">Prefix sum is like keeping a running total of your expenses:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-teal-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Day 1:</span>
                    <span className="text-gray-700">Spent $10, Running Total: $10</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">prefix[0] = 10</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-teal-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Day 2:</span>
                    <span className="text-gray-700">Spent $20, Running Total: $30</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">prefix[1] = 10 + 20 = 30</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-teal-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Day 3:</span>
                    <span className="text-gray-700">Spent $15, Running Total: $45</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">prefix[2] = 30 + 15 = 45</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Query:</span>
                    <span className="text-gray-700">Total from Day 2 to Day 3?</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">prefix[2] - prefix[0] = 45 - 10 = $35 (instantly!)</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like a running total, prefix sum keeps cumulative sums so you can answer queries instantly.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Prefix Sum Array
                </h3>
                <p className="text-gray-700 text-sm mb-2">Prefix sum array stores cumulative sum from index 0 to current index. prefix[i] = sum of arr[0] to arr[i]. Built in O(n) time by iterating once. Example: arr = [1,2,3,4,5], prefix = [1,3,6,10,15]. Each element is sum of all previous elements plus current element.</p>
                <p className="text-gray-600 text-xs">Example: prefix[2] = arr[0] + arr[1] + arr[2] = 1 + 2 + 3 = 6</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Range Sum Query
                </h3>
                <p className="text-gray-700 text-sm mb-2">To get sum from index i to j: prefix[j] - prefix[i-1]. If i=0, just use prefix[j]. This gives O(1) query time. Without prefix sum, you'd need to iterate from i to j, giving O(n) time. Prefix sum makes range queries instant after preprocessing.</p>
                <p className="text-gray-600 text-xs">Example: Sum from index 1 to 3 = prefix[3] - prefix[0] = 10 - 1 = 9</p>
              </div>
            </div>
            
            {/* Visual: Prefix Sum Array */}
            <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-teal-600" />
                Prefix Sum Array Visualization
              </h3>
              
              <div className="space-y-4">
                {/* Original Array */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Original Array</h4>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((num, idx) => (
                      <div key={idx} className="w-16 h-16 bg-blue-100 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-600 mb-1">arr[{idx}]</div>
                        <div className="text-lg font-bold text-gray-900">{num}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Prefix Sum Array */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Prefix Sum Array</h4>
                  <div className="flex gap-2 justify-center">
                    {[1, 3, 6, 10, 15].map((num, idx) => (
                      <div key={idx} className="w-16 h-16 bg-green-100 border-2 border-green-500 rounded-lg flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-600 mb-1">prefix[{idx}]</div>
                        <div className="text-lg font-bold text-gray-900">{num}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">prefix[i] = sum of arr[0] to arr[i]</p>
                </div>
                
                {/* Range Query Example */}
                <div className="mt-4 p-4 bg-white rounded-lg border border-teal-300">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Range Sum Query: Sum from index 1 to 3</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Method:</div>
                      <div className="flex-1 text-gray-700">prefix[3] - prefix[0]</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Calculation:</div>
                      <div className="flex-1 text-gray-700">10 - 1 = 9</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Verify:</div>
                      <div className="flex-1 text-gray-700">arr[1] + arr[2] + arr[3] = 2 + 3 + 4 = 9 ✓</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs font-semibold text-gray-700">Time:</div>
                      <div className="flex-1 text-green-600 font-semibold">O(1) - Instant!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Prefix sum array stores cumulative sums. Range sum query uses prefix[j] - prefix[i-1] for O(1) time. Preprocessing takes O(n), but all queries are O(1). Ideal for multiple queries on static arrays.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Prefix Sum</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use prefix sum in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-teal-50 rounded-lg border-2 border-teal-200">
                <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Prefix Sum When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Multiple range queries:</strong> Many queries on same array</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Range sum queries:</strong> Sum of subarray from i to j</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Static array:</strong> Array doesn't change frequently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need O(1) queries:</strong> Fast query time required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Cumulative problems:</strong> Running totals, cumulative sums</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Prefix Sum When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Single query:</strong> Overhead not worth it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Frequent updates:</strong> Array changes often</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Memory constrained:</strong> O(n) extra space needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Other operations:</strong> Need min/max, not just sum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>2D arrays:</strong> Need 2D prefix sum (more complex)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use prefix sum for multiple range sum queries on static arrays. Avoid prefix sum for single queries or frequently-changing arrays. Prefix sum is ideal when preprocessing cost is amortized over many queries.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Implement Prefix Sum with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to implement prefix sum with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Basic Prefix Sum Implementation</h3>
              <p className="text-gray-700 mb-4">Create prefix sum array and answer range queries:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Prefix Sum Implementation
def build_prefix_sum(arr):
    n = len(arr)
    prefix = [0] * n
    
    # Build prefix sum array
    prefix[0] = arr[0]
    for i in range(1, n):
        prefix[i] = prefix[i-1] + arr[i]
    
    return prefix

def range_sum(prefix, i, j):
    # Sum from index i to j (inclusive)
    if i == 0:
        return prefix[j]
    return prefix[j] - prefix[i-1]

# Example usage
arr = [1, 2, 3, 4, 5]
prefix = build_prefix_sum(arr)
print(prefix)  # Output: [1, 3, 6, 10, 15]

# Range queries
print(range_sum(prefix, 0, 2))  # Sum from 0 to 2: 1+2+3 = 6
print(range_sum(prefix, 1, 3))  # Sum from 1 to 3: 2+3+4 = 9
print(range_sum(prefix, 2, 4))  # Sum from 2 to 4: 3+4+5 = 12

# How it works:
# prefix[0] = arr[0] = 1
# prefix[1] = prefix[0] + arr[1] = 1 + 2 = 3
# prefix[2] = prefix[1] + arr[2] = 3 + 3 = 6
# ...
# range_sum(1, 3) = prefix[3] - prefix[0] = 10 - 1 = 9`}</code></pre>
                </div>
                
                {/* Visual: Prefix Sum Building Process */}
                <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Prefix Sum Building Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-xs font-semibold text-gray-700">Step 1:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                        <div className="w-12 h-12 bg-gray-200 border rounded flex items-center justify-center text-xs">2</div>
                        <div className="w-12 h-12 bg-gray-200 border rounded flex items-center justify-center text-xs">3</div>
                      </div>
                      <div className="text-xs text-gray-600">prefix[0] = 1</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-xs font-semibold text-gray-700">Step 2:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">3</div>
                        <div className="w-12 h-12 bg-gray-200 border rounded flex items-center justify-center text-xs">3</div>
                      </div>
                      <div className="text-xs text-gray-600">prefix[1] = 1 + 2 = 3</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-xs font-semibold text-gray-700">Step 3:</div>
                      <div className="flex-1 flex gap-1">
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">1</div>
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">3</div>
                        <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-xs font-semibold">6</div>
                      </div>
                      <div className="text-xs text-gray-600">prefix[2] = 3 + 3 = 6</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Range Sum Query Problem</h3>
              <p className="text-gray-700 mb-4">Answer multiple range sum queries efficiently:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Problem: Answer multiple range sum queries
# Array: [2, 8, 3, 9, 6, 5, 4]
# Queries: sum from index 0 to 2, 1 to 3, 2 to 6

def answer_range_queries(arr, queries):
    # Build prefix sum array
    n = len(arr)
    prefix = [0] * n
    prefix[0] = arr[0]
    
    for i in range(1, n):
        prefix[i] = prefix[i-1] + arr[i]
    
    # Answer queries
    results = []
    for i, j in queries:
        if i == 0:
            results.append(prefix[j])
        else:
            results.append(prefix[j] - prefix[i-1])
    
    return results

# Example usage
arr = [2, 8, 3, 9, 6, 5, 4]
queries = [(0, 2), (1, 3), (2, 6)]
results = answer_range_queries(arr, queries)

print(results)  # Output: [13, 20, 27]
# Query 1: sum(0,2) = 2+8+3 = 13
# Query 2: sum(1,3) = 8+3+9 = 20
# Query 3: sum(2,6) = 3+9+6+5+4 = 27

# Time Complexity: O(n + m) where n=array size, m=number of queries
# Without prefix sum: O(n*m) - much slower!`}</code></pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Build prefix array in O(n) by iterating once. Answer queries in O(1) using prefix[j] - prefix[i-1]. Handle edge case when i=0 (use prefix[j] directly). Prefix sum reduces O(n) per query to O(1) per query, making it ideal for multiple queries.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Prefix Sum Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prefix sum matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  O(1) Query Time
                </h3>
                <p className="text-gray-700 text-sm">Prefix sum provides O(1) query time after O(n) preprocessing. Instead of O(n) per query, you get instant answers. For m queries, total time is O(n + m) instead of O(n*m). This makes prefix sum extremely efficient for multiple queries.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Simple Implementation
                </h3>
                <p className="text-gray-700 text-sm">Prefix sum is simple to implement. Just build prefix array once, then answer queries with simple subtraction. The logic is straightforward: prefix[j] - prefix[i-1]. This makes prefix sum easy to understand and implement in interviews.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Common Interview Topic
                </h3>
                <p className="text-gray-700 text-sm">Prefix sum is a common coding interview topic. Interviewers frequently ask about range sum queries, subarray problems, and cumulative sums. Understanding prefix sum is essential for technical interviews and coding challenges.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Foundation for Advanced Techniques
                </h3>
                <p className="text-gray-700 text-sm">Prefix sum is the foundation for advanced techniques: 2D prefix sum, difference array, and other range query problems. Understanding 1D prefix sum helps understand these more complex techniques. Many problems can be solved with prefix sum.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Prefix sum matters because it provides O(1) query time, is simple to implement, is a common interview topic, and is the foundation for advanced techniques. Prefix sum is one of the most important techniques for range query problems.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is prefix sum technique?</h3>
                <p className="text-gray-700 leading-relaxed">Prefix sum technique precomputes cumulative sums of array elements, allowing O(1) range sum queries. Prefix sum array stores sum of all elements from index 0 to current index. To get sum from index i to j, use prefix[j] - prefix[i-1]. This reduces time complexity from O(n) per query to O(1) per query after O(n) preprocessing. Example: array [1,2,3,4,5] has prefix sum [1,3,6,10,15].</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does prefix sum work?</h3>
                <p className="text-gray-700 leading-relaxed">Prefix sum works by: 1) Create prefix array where prefix[i] = sum of elements from 0 to i, 2) To get sum from i to j, calculate prefix[j] - prefix[i-1] (or prefix[j] if i=0), 3) This gives O(1) query time after O(n) preprocessing. Prefix array is built once, then all queries are O(1). Example: prefix[2] = 6 (1+2+3), prefix[4] = 15 (1+2+3+4+5), sum from 2 to 4 = prefix[4] - prefix[1] = 15 - 3 = 12.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use prefix sum technique?</h3>
                <p className="text-gray-700 leading-relaxed">Use prefix sum for: range sum queries (sum of subarray from i to j), multiple queries on same array (preprocessing pays off), problems requiring cumulative sums, and when you need O(1) query time. Prefix sum is great when you have many queries on static or rarely-changing arrays. Avoid prefix sum for single query (overhead not worth it) or when array changes frequently.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the time complexity of prefix sum?</h3>
                <p className="text-gray-700 leading-relaxed">Prefix sum has O(n) time complexity for preprocessing (building prefix array) and O(1) time complexity for each range sum query. Space complexity is O(n) for storing prefix array. For m queries, total time is O(n + m) instead of O(n*m) without prefix sum. This makes prefix sum very efficient for multiple queries.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the advantages of prefix sum?</h3>
                <p className="text-gray-700 leading-relaxed">Advantages: O(1) query time after preprocessing, efficient for multiple queries, simple to implement, reduces time complexity from O(n) to O(1) per query. Disadvantages: O(n) extra space, O(n) preprocessing time, not efficient for single query, array should be static or rarely change. Prefix sum is ideal when you have many range sum queries.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Prefix Sum Technique Explained Simply"
            description="Learn what prefix sum technique is with simple examples. Complete beginner-friendly guide to prefix sum array, range sum queries, and O(1) query time."
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Prefix Sum Technique Guide" />
        </section>
      </main>
    </div>
  );
}
