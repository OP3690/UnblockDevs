'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Target, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Coins, TrendingUp } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function GreedyAlgorithmExplainedWithSimpleExamplesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-amber-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Greedy Algorithm Explained with Simple Examples</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Greedy Algorithms (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Greedy Algorithm Explained with Simple Examples"
        description="Learn what greedy algorithm is with simple examples. Complete beginner-friendly guide to greedy algorithms, when to use them, and step-by-step examples."
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is a greedy algorithm?',
              answer: 'Greedy algorithm makes locally optimal choice at each step, hoping it leads to globally optimal solution. Greedy chooses best option available at current moment without considering future consequences. Greedy is simple and efficient, but doesn\'t always give optimal solution. Greedy works when local optimal choices lead to global optimum (greedy choice property and optimal substructure).',
            },
            {
              question: 'How does greedy algorithm work?',
              answer: 'Greedy algorithm works by: 1) Make locally optimal choice at each step, 2) Never reconsider previous choices, 3) Hope local choices lead to global optimum. Greedy is fast (O(n log n) or O(n) typically) but may not find optimal solution. Greedy is simple: just pick best option at each step. Example: coin change problem - always pick largest coin that fits.',
            },
            {
              question: 'When to use greedy algorithm?',
              answer: 'Use greedy when: problem has greedy choice property (local optimal leads to global optimal), problem has optimal substructure (optimal solution contains optimal subproblems), need fast solution (greedy is efficient), and problem is known to work with greedy (activity selection, minimum spanning tree). Avoid greedy when: need guaranteed optimal solution, problem doesn\'t have greedy choice property, or need to consider all possibilities.',
            },
            {
              question: 'What is the difference between greedy and dynamic programming?',
              answer: 'Greedy vs Dynamic Programming: Greedy makes choice and never reconsiders, DP considers all possibilities and stores results. Greedy is faster (O(n log n) typically), DP is slower (O(n²) or more). Greedy may not find optimal solution, DP finds optimal solution. Greedy is simpler, DP is more complex. Use greedy when local optimal leads to global optimal, use DP when need to consider all possibilities.',
            },
            {
              question: 'What are common greedy algorithm problems?',
              answer: 'Common greedy problems: Activity Selection (choose maximum non-overlapping activities), Fractional Knapsack (maximize value with weight constraint), Minimum Spanning Tree (Kruskal\'s, Prim\'s algorithms), Coin Change (minimum coins for amount), Interval Scheduling (schedule maximum tasks), Huffman Coding (optimal prefix codes). These problems have greedy choice property and optimal substructure.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            We earn commissions when you shop through the links below.
          </p>
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Greedy Algorithm?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              A <strong>Greedy Algorithm</strong> makes the locally optimal choice at each step, hoping it leads to a globally optimal solution. Greedy algorithms choose the best option available at the current moment without considering future consequences. They are simple and efficient, but don't always give the optimal solution.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Greedy algorithms work when <strong>local optimal choices lead to global optimum</strong>. This requires two properties: <strong>greedy choice property</strong> (locally optimal choice is part of globally optimal solution) and <strong>optimal substructure</strong> (optimal solution contains optimal solutions to subproblems).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Greedy algorithms are <strong>fast</strong> (typically O(n log n) or O(n)) and <strong>simple</strong> to implement. They're used in many real-world applications: activity selection, minimum spanning tree, coin change, and scheduling problems. However, greedy doesn't always find the optimal solution, so it's important to verify when greedy works.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Greedy algorithm makes locally optimal choice at each step, hoping for globally optimal solution. Requires greedy choice property and optimal substructure. Fast and simple, but may not find optimal solution. Works for problems where local optimal leads to global optimal.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Greedy Algorithm</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding how greedy algorithms work:
            </p>
            
            {/* Real-Life Analogy: Coin Change */}
            <div className="mb-8 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                Real-Life Analogy: Making Change
              </h3>
              <p className="text-gray-700 mb-4">Greedy algorithm is like making change with coins:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-gray-900">Goal:</span>
                    <span className="text-gray-700">Make $0.67 with minimum coins</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Available: $0.25, $0.10, $0.05, $0.01</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-gray-900">Greedy Choice:</span>
                    <span className="text-gray-700">Always pick largest coin that fits</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Step 1: Pick $0.25 (largest that fits), remaining: $0.42</div>
                  <div className="pl-7 text-sm text-gray-600">Step 2: Pick $0.25 (largest that fits), remaining: $0.17</div>
                  <div className="pl-7 text-sm text-gray-600">Step 3: Pick $0.10 (largest that fits), remaining: $0.07</div>
                  <div className="pl-7 text-sm text-gray-600">Step 4: Pick $0.05, Step 5: Pick $0.01 × 2</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-gray-700">6 coins total (2×$0.25 + 1×$0.10 + 1×$0.05 + 2×$0.01)</span>
                  </div>
                  <div className="pl-7 text-sm text-gray-600">Greedy gives optimal solution for US coins!</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like making change, greedy picks the best option at each step without reconsidering.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Greedy Choice Property
                </h3>
                <p className="text-gray-700 text-sm mb-2">Greedy choice property means locally optimal choice is part of globally optimal solution. At each step, greedy makes best choice available, and this choice is correct for final solution. Not all problems have this property. Example: Activity selection - choosing activity that ends earliest is always part of optimal solution.</p>
                <p className="text-gray-600 text-xs">Example: In coin change, picking largest coin is always correct (for US coins)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Optimal Substructure
                </h3>
                <p className="text-gray-700 text-sm mb-2">Optimal substructure means optimal solution contains optimal solutions to subproblems. After making greedy choice, remaining problem is similar to original problem. This allows greedy to work recursively. Example: Minimum spanning tree - optimal tree contains optimal trees for subgraphs.</p>
                <p className="text-gray-600 text-xs">Example: After picking activity, remaining problem is same type (activity selection)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  No Backtracking
                </h3>
                <p className="text-gray-700 text-sm mb-2">Greedy algorithm never reconsiders previous choices. Once a choice is made, it's final. This makes greedy fast and simple, but also means it may miss optimal solution if greedy choice property doesn't hold. Greedy is "make choice and move on" approach, unlike backtracking which can undo choices.</p>
                <p className="text-gray-600 text-xs">Example: Once you pick an activity, you never reconsider it</p>
              </div>
            </div>
            
            {/* Visual: Greedy vs Optimal */}
            <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-yellow-600" />
                Greedy Algorithm Flow
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Greedy Decision Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                      <div className="flex-1 text-gray-700">Look at all available options</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                      <div className="flex-1 text-gray-700">Choose the best option at this moment (locally optimal)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                      <div className="flex-1 text-gray-700">Never reconsider this choice (no backtracking)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">4</div>
                      <div className="flex-1 text-gray-700 font-semibold">Repeat until problem is solved</div>
                    </div>
                  </div>
                </div>
                
                {/* Greedy vs Optimal Example */}
                <div className="p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Example: Activity Selection</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Activities:</div>
                      <div className="flex-1 text-gray-700">A(1-3), B(2-5), C(4-6), D(5-7)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Greedy:</div>
                      <div className="flex-1 text-gray-700">Pick A (ends earliest), then C (ends earliest), then D → 3 activities</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Optimal:</div>
                      <div className="flex-1 text-green-600 font-semibold">Same! Greedy gives optimal solution ✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Greedy makes locally optimal choice at each step, never reconsiders. Requires greedy choice property (local optimal is part of global optimal) and optimal substructure (optimal solution contains optimal subproblems). Greedy is fast but may not find optimal solution.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Greedy Algorithm</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use greedy algorithm in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Greedy When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Greedy choice property:</strong> Local optimal leads to global optimal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Optimal substructure:</strong> Optimal solution has optimal subproblems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need fast solution:</strong> Greedy is efficient (O(n log n))</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Known greedy problems:</strong> Activity selection, MST, coin change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Approximation OK:</strong> Near-optimal solution acceptable</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Greedy When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need guaranteed optimal:</strong> Greedy may not find optimal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No greedy property:</strong> Local optimal doesn't lead to global</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need to consider all:</strong> Must explore all possibilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Complex dependencies:</strong> Choices affect future options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>0-1 Knapsack:</strong> Need dynamic programming, not greedy</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use greedy when problem has greedy choice property and optimal substructure, and you need fast solution. Avoid greedy when you need guaranteed optimal solution or problem doesn't have greedy properties. Greedy is great for activity selection, MST, and coin change problems.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Implement Greedy Algorithms with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to implement greedy algorithms with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Activity Selection Problem</h3>
              <p className="text-gray-700 mb-4">Select maximum number of non-overlapping activities:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Activity Selection Problem (Greedy)
# Select maximum number of non-overlapping activities
# Activities: (start, end) times

def activity_selection(activities):
    # Sort activities by end time (greedy: pick activity that ends earliest)
    activities.sort(key=lambda x: x[1])
    
    selected = []
    last_end = -1
    
    for start, end in activities:
        # Greedy choice: if activity doesn't overlap, select it
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected

# Example usage
activities = [(1, 3), (2, 5), (4, 6), (5, 7), (6, 8)]
selected = activity_selection(activities)
print(selected)  # Output: [(1, 3), (4, 6), (6, 8)]
print(f"Maximum activities: {len(selected)}")  # Output: 3

# How it works:
# Sort by end time: [(1,3), (2,5), (4,6), (5,7), (6,8)]
# Pick (1,3) - ends earliest
# Pick (4,6) - doesn't overlap, ends earliest
# Pick (6,8) - doesn't overlap, ends earliest
# Greedy gives optimal solution!`}</code></pre>
                </div>
                
                {/* Visual: Activity Selection */}
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Activity Selection Visualization</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-xs font-semibold text-gray-700">Activities:</div>
                      <div className="flex-1">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-6 bg-blue-200 border border-blue-500 rounded text-xs flex items-center justify-center">A(1-3)</div>
                            <div className="text-xs text-gray-600">Selected ✓</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-6 bg-gray-200 border border-gray-400 rounded text-xs flex items-center justify-center">B(2-5)</div>
                            <div className="text-xs text-gray-600">Overlaps ✗</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-6 bg-green-200 border border-green-500 rounded text-xs flex items-center justify-center">C(4-6)</div>
                            <div className="text-xs text-gray-600">Selected ✓</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-6 bg-gray-200 border border-gray-400 rounded text-xs flex items-center justify-center">D(5-7)</div>
                            <div className="text-xs text-gray-600">Overlaps ✗</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-6 bg-green-200 border border-green-500 rounded text-xs flex items-center justify-center">E(6-8)</div>
                            <div className="text-xs text-gray-600">Selected ✓</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Greedy: Always pick activity that ends earliest and doesn't overlap</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Coin Change Problem (Greedy)</h3>
              <p className="text-gray-700 mb-4">Find minimum coins to make amount (greedy approach):</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Coin Change Problem (Greedy)
# Find minimum coins to make amount
# Note: Greedy works for US coins, but not all coin systems!

def coin_change_greedy(coins, amount):
    # Sort coins in descending order (greedy: use largest coins first)
    coins.sort(reverse=True)
    
    result = []
    remaining = amount
    
    for coin in coins:
        # Greedy choice: use as many of this coin as possible
        count = remaining // coin
        if count > 0:
            result.extend([coin] * count)
            remaining -= coin * count
    
    return result if remaining == 0 else None

# Example usage (US coins - greedy works!)
coins = [25, 10, 5, 1]  # Quarters, dimes, nickels, pennies
amount = 67
result = coin_change_greedy(coins, amount)
print(result)  # Output: [25, 25, 10, 5, 1, 1]
print(f"Total coins: {len(result)}")  # Output: 6

# How it works:
# Use 2 quarters (25×2 = 50), remaining: 17
# Use 1 dime (10), remaining: 7
# Use 1 nickel (5), remaining: 2
# Use 2 pennies (1×2 = 2), remaining: 0
# Total: 6 coins (greedy gives optimal for US coins!)`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: Fractional Knapsack Problem</h3>
              <p className="text-gray-700 mb-4">Maximize value with weight constraint (can take fractions):</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Fractional Knapsack Problem (Greedy)
# Maximize value, can take fractions of items
# Items: (weight, value)

def fractional_knapsack(items, capacity):
    # Sort by value/weight ratio (greedy: take items with best ratio first)
    items.sort(key=lambda x: x[1] / x[0], reverse=True)
    
    total_value = 0
    remaining_capacity = capacity
    
    for weight, value in items:
        if remaining_capacity >= weight:
            # Take entire item
            total_value += value
            remaining_capacity -= weight
        else:
            # Take fraction of item
            fraction = remaining_capacity / weight
            total_value += value * fraction
            break
    
    return total_value

# Example usage
items = [(10, 60), (20, 100), (30, 120)]  # (weight, value)
capacity = 50
max_value = fractional_knapsack(items, capacity)
print(f"Maximum value: {max_value}")  # Output: 240.0

# How it works:
# Ratios: 60/10=6, 100/20=5, 120/30=4
# Take item 1 (ratio 6): value 60, capacity left: 40
# Take item 2 (ratio 5): value 100, capacity left: 20
# Take 2/3 of item 3 (ratio 4): value 80, capacity left: 0
# Total: 240 (greedy gives optimal for fractional knapsack!)`}</code></pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Greedy makes locally optimal choice at each step. Sort items by relevant criteria (end time, value/weight ratio, etc.), then make greedy choices. Greedy is fast (O(n log n) for sorting) but verify it gives optimal solution. Works for activity selection, fractional knapsack, and MST problems.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Greedy Algorithm Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Greedy algorithm matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Fast and Efficient
                </h3>
                <p className="text-gray-700 text-sm">Greedy algorithms are typically O(n log n) or O(n), making them very fast. They're much faster than dynamic programming (O(n²) or more) and backtracking (exponential). For problems where greedy works, it provides optimal or near-optimal solutions quickly.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Simple to Implement
                </h3>
                <p className="text-gray-700 text-sm">Greedy algorithms are simple to understand and implement. The logic is straightforward: make best choice at each step. This makes greedy algorithms easy to code, debug, and maintain. Simplicity is a major advantage of greedy approach.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Common Interview Topic
                </h3>
                <p className="text-gray-700 text-sm">Greedy algorithms are very common in coding interviews. Interviewers frequently ask about activity selection, coin change, interval scheduling, and other greedy problems. Understanding greedy algorithms is essential for technical interviews.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Real-World Applications
                </h3>
                <p className="text-gray-700 text-sm">Greedy algorithms have many real-world applications: scheduling (activity selection), networking (minimum spanning tree), compression (Huffman coding), and resource allocation. Understanding greedy helps solve practical problems efficiently.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Greedy algorithm matters because it's fast and efficient, simple to implement, is a common interview topic, and has many real-world applications. Greedy is one of the most important algorithmic techniques to understand, especially for coding interviews.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a greedy algorithm?</h3>
                <p className="text-gray-700 leading-relaxed">Greedy algorithm makes locally optimal choice at each step, hoping it leads to globally optimal solution. Greedy chooses best option available at current moment without considering future consequences. Greedy is simple and efficient, but doesn't always give optimal solution. Greedy works when local optimal choices lead to global optimum (greedy choice property and optimal substructure).</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does greedy algorithm work?</h3>
                <p className="text-gray-700 leading-relaxed">Greedy algorithm works by: 1) Make locally optimal choice at each step, 2) Never reconsider previous choices, 3) Hope local choices lead to global optimum. Greedy is fast (O(n log n) or O(n) typically) but may not find optimal solution. Greedy is simple: just pick best option at each step. Example: coin change problem - always pick largest coin that fits.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use greedy algorithm?</h3>
                <p className="text-gray-700 leading-relaxed">Use greedy when: problem has greedy choice property (local optimal leads to global optimal), problem has optimal substructure (optimal solution contains optimal subproblems), need fast solution (greedy is efficient), and problem is known to work with greedy (activity selection, minimum spanning tree). Avoid greedy when: need guaranteed optimal solution, problem doesn't have greedy choice property, or need to consider all possibilities.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between greedy and dynamic programming?</h3>
                <p className="text-gray-700 leading-relaxed">Greedy vs Dynamic Programming: Greedy makes choice and never reconsiders, DP considers all possibilities and stores results. Greedy is faster (O(n log n) typically), DP is slower (O(n²) or more). Greedy may not find optimal solution, DP finds optimal solution. Greedy is simpler, DP is more complex. Use greedy when local optimal leads to global optimal, use DP when need to consider all possibilities.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are common greedy algorithm problems?</h3>
                <p className="text-gray-700 leading-relaxed">Common greedy problems: Activity Selection (choose maximum non-overlapping activities), Fractional Knapsack (maximize value with weight constraint), Minimum Spanning Tree (Kruskal's, Prim's algorithms), Coin Change (minimum coins for amount), Interval Scheduling (schedule maximum tasks), Huffman Coding (optimal prefix codes). These problems have greedy choice property and optimal substructure.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Greedy Algorithm Explained with Simple Examples"
            description="Learn what greedy algorithm is with simple examples. Complete beginner-friendly guide to greedy algorithms, when to use them, and step-by-step examples."
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Greedy Algorithm Guide" />
        </section>
      </main>
    </div>
  );
}
