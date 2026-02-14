'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Repeat, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Infinity, Layers, TreePine } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function WhatIsRecursionExplainedWithSimpleRealLifeExamplesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <Repeat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is Recursion? Explained with Simple Real-Life Examples</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Recursion (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is Recursion? Explained with Simple Real-Life Examples"
        description="Complete Beginner-Friendly Guide to Recursion (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is recursion?',
              answer: 'Recursion is when a function calls itself to solve a problem. Instead of using loops, recursion breaks a problem into smaller versions of itself. A recursive function has: base case (stops recursion) and recursive case (calls itself). Real-life example: Russian dolls (doll contains smaller doll, which contains even smaller doll). Recursion is powerful but needs a base case to stop.',
            },
            {
              question: 'How does recursion work?',
              answer: 'Recursion works by: 1) Function calls itself with smaller input, 2) Each call solves a smaller version of the problem, 3) Base case stops recursion when problem is small enough, 4) Results bubble back up through call stack. Think of it like opening nested boxes: open box, find smaller box inside, open that, find even smaller box, repeat until you find the smallest box (base case).',
            },
            {
              question: 'What is a base case in recursion?',
              answer: 'Base case is the condition that stops recursion. Without a base case, recursion runs forever (infinite recursion). Base case is the simplest version of the problem that doesn\'t need recursion. Example: factorial(0) = 1 (base case), factorial(n) = n * factorial(n-1) (recursive case). Base case prevents infinite recursion and allows results to return.',
            },
            {
              question: 'When to use recursion?',
              answer: 'Use recursion for: problems that can be broken into smaller versions of themselves (factorial, Fibonacci, tree traversal), problems with natural recursive structure (file system, tree structures), divide and conquer algorithms (merge sort, quick sort), and when recursive solution is simpler than iterative. Recursion is great for tree/graph problems and mathematical sequences.',
            },
            {
              question: 'What are the advantages and disadvantages of recursion?',
              answer: 'Advantages: simpler code for recursive problems, natural for tree/graph structures, elegant solutions. Disadvantages: can be slower than iteration, uses more memory (call stack), risk of stack overflow with deep recursion, harder to debug. Use recursion when problem is naturally recursive, but be careful with deep recursion.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Recursion?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Recursion</strong> is when a function calls itself to solve a problem. Instead of using loops to repeat code, recursion breaks a problem into smaller versions of the same problem. A recursive function solves a problem by solving a smaller version of the same problem, then using that result to solve the original problem.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of recursion like Russian nesting dolls: you open a doll, and inside is a smaller doll. You open that doll, and inside is an even smaller doll. You keep opening dolls until you reach the smallest one (the base case). Then you work your way back out, putting the dolls back together.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Recursion has two essential parts: a <strong>base case</strong> (stops the recursion) and a <strong>recursive case</strong> (calls the function again with a smaller input). Without a base case, recursion would run forever. Recursion is powerful for solving problems that have a natural recursive structure.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Recursion is when a function calls itself. It has a base case (stops recursion) and recursive case (calls itself with smaller input). Recursion is like Russian dolls—each call opens a smaller version until you reach the base case.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Recursion Components</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Recursion involves several key components:
            </p>
            
            {/* Real-Life Analogy: Russian Dolls */}
            <div className="mb-8 p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-emerald-600" />
                Real-Life Analogy: Russian Nesting Dolls
              </h3>
              <p className="text-gray-700 mb-4">Recursion is like Russian nesting dolls—each doll contains a smaller version of itself:</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-emerald-300">
                  <div className="text-4xl">🎎</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Doll 1 (Largest)</p>
                    <p className="text-sm text-gray-600">Contains Doll 2 inside</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-8">
                  <div className="text-3xl">🎎</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Doll 2</p>
                    <p className="text-sm text-gray-600">Contains Doll 3 inside</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-16">
                  <div className="text-2xl">🎎</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Doll 3</p>
                    <p className="text-sm text-gray-600">Contains Doll 4 inside</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-24">
                  <div className="text-xl">🎎</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Doll 4 (Smallest - Base Case)</p>
                    <p className="text-sm text-gray-600">No more dolls inside - recursion stops!</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Each doll is like a recursive call. The smallest doll is the base case that stops the recursion.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Base Case
                </h3>
                <p className="text-gray-700 text-sm mb-2">Base case is the condition that stops recursion. It's the simplest version of the problem that doesn't need recursion. Without a base case, recursion runs forever (infinite recursion). Base case prevents infinite loops and allows results to return back through the call stack.</p>
                <p className="text-gray-600 text-xs">Example: factorial(0) = 1 (base case), or finding the smallest Russian doll (no more dolls inside)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-blue-600" />
                  Recursive Case
                </h3>
                <p className="text-gray-700 text-sm mb-2">Recursive case is where the function calls itself with a smaller input. It breaks the problem into a smaller version of itself. Each recursive call should move closer to the base case. Recursive case solves the problem by solving a smaller version first.</p>
                <p className="text-gray-600 text-xs">Example: factorial(n) = n * factorial(n-1) (recursive case), or opening a doll to find a smaller doll inside</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  Call Stack
                </h3>
                <p className="text-gray-700 text-sm mb-2">Call stack is where recursive calls are stored. Each recursive call is added to the stack. When base case is reached, calls return in reverse order (last in, first out). Call stack grows with each recursive call and shrinks as calls return. Deep recursion can cause stack overflow.</p>
                <p className="text-gray-600 text-xs">Example: factorial(5) creates 5 calls on stack, which return in reverse order (5, 4, 3, 2, 1)</p>
              </div>
            </div>
            
            {/* Visual: Recursion Flow Diagram */}
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TreePine className="w-6 h-6 text-emerald-600" />
                Recursion Flow Diagram
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-emerald-300 text-center">
                  <div className="font-semibold text-gray-900 mb-1">Call: factorial(5)</div>
                  <div className="text-sm text-gray-600">5 × factorial(4)</div>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 text-center ml-8">
                  <div className="font-semibold text-gray-900 mb-1">Call: factorial(4)</div>
                  <div className="text-sm text-gray-600">4 × factorial(3)</div>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 text-center ml-16">
                  <div className="font-semibold text-gray-900 mb-1">Call: factorial(3)</div>
                  <div className="text-sm text-gray-600">3 × factorial(2)</div>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 text-center ml-24">
                  <div className="font-semibold text-gray-900 mb-1">Call: factorial(2)</div>
                  <div className="text-sm text-gray-600">2 × factorial(1)</div>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="p-3 bg-green-100 rounded-lg border-2 border-green-500 text-center ml-32">
                  <div className="font-semibold text-gray-900 mb-1">Call: factorial(1)</div>
                  <div className="text-sm text-gray-600 font-bold">Base Case! Return 1</div>
                </div>
                <div className="text-center text-gray-400">↓ (Returns bubble back up)</div>
                <div className="p-3 bg-blue-100 rounded-lg border border-blue-300 text-center ml-24">
                  <div className="font-semibold text-gray-900 mb-1">Return: 2 × 1 = 2</div>
                </div>
                <div className="text-center text-gray-400">↑</div>
                <div className="p-3 bg-blue-100 rounded-lg border border-blue-300 text-center ml-16">
                  <div className="font-semibold text-gray-900 mb-1">Return: 3 × 2 = 6</div>
                </div>
                <div className="text-center text-gray-400">↑</div>
                <div className="p-3 bg-blue-100 rounded-lg border border-blue-300 text-center ml-8">
                  <div className="font-semibold text-gray-900 mb-1">Return: 4 × 6 = 24</div>
                </div>
                <div className="text-center text-gray-400">↑</div>
                <div className="p-3 bg-green-100 rounded-lg border-2 border-green-500 text-center">
                  <div className="font-semibold text-gray-900 mb-1">Final Return: 5 × 24 = 120</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 text-center">Visual flow showing how recursion calls itself and returns results</p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Recursion has base case (stops recursion) and recursive case (calls itself). Call stack stores recursive calls. Each call should move closer to base case. Visualize recursion like Russian dolls or a tree structure.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Recursion</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use recursion in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use Recursion When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Problem breaks into smaller versions:</strong> Factorial, Fibonacci, tree traversal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Natural recursive structure:</strong> File system, tree structures, nested data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Divide and conquer:</strong> Merge sort, quick sort, binary search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Simpler recursive solution:</strong> When recursion is cleaner than iteration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Tree/graph problems:</strong> DFS, tree traversal, graph algorithms</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid Recursion When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Deep recursion risk:</strong> Very large inputs cause stack overflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Performance critical:</strong> Iteration is usually faster</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Simple loops work:</strong> When iteration is straightforward</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Memory constraints:</strong> Recursion uses more memory (call stack)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Hard to debug:</strong> Recursive code can be harder to trace</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use recursion for problems that break into smaller versions (factorial, tree traversal), natural recursive structures (file system), and when recursive solution is simpler. Avoid recursion for deep recursion risks, performance-critical code, and when iteration is straightforward.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Write Recursive Functions</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to write recursive functions with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Factorial (Simple Recursion)</h3>
              <p className="text-gray-700 mb-4">Calculate factorial using recursion:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Factorial: n! = n × (n-1) × (n-2) × ... × 1
# Example: 5! = 5 × 4 × 3 × 2 × 1 = 120

def factorial(n):
    # Base case: stop recursion
    if n == 0 or n == 1:
        return 1
    
    # Recursive case: call itself with smaller input
    return n * factorial(n - 1)

# Example usage
print(factorial(5))  # Output: 120

# How it works:
# factorial(5) = 5 × factorial(4)
# factorial(4) = 4 × factorial(3)
# factorial(3) = 3 × factorial(2)
# factorial(2) = 2 × factorial(1)
# factorial(1) = 1 (base case)
# Then returns: 1 → 2 → 6 → 24 → 120`}</code></pre>
                </div>
                
                {/* Visual: Factorial Call Stack */}
                <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Factorial(5) Call Stack Visualization</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Call Stack:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-emerald-300 text-sm">
                        factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Base Case:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded border border-green-300 text-sm font-semibold">
                        factorial(1) returns 1
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-semibold text-gray-700">Returns:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-emerald-300 text-sm">
                        1 → 2 → 6 → 24 → 120
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Fibonacci Sequence</h3>
              <p className="text-gray-700 mb-4">Calculate Fibonacci numbers using recursion:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Fibonacci: F(n) = F(n-1) + F(n-2)
# F(0) = 0, F(1) = 1
# Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Recursive case: sum of previous two
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
print(fibonacci(6))  # Output: 8

# How it works:
# fibonacci(6) = fibonacci(5) + fibonacci(4)
# Each branch calls itself until base case`}</code></pre>
                </div>
                
                {/* Visual: Fibonacci Tree */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Fibonacci(4) Recursion Tree</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-center p-2 bg-white rounded border border-blue-300">
                      <div className="font-semibold">fibonacci(4)</div>
                    </div>
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <div className="p-2 bg-white rounded border border-blue-300 mb-1">
                          <div className="font-semibold">fibonacci(3)</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="p-1 bg-green-100 rounded border border-green-300 text-xs mb-1">
                              <div className="font-semibold">fib(2)</div>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <div className="p-1 bg-green-200 rounded">fib(1)=1</div>
                              <div className="p-1 bg-green-200 rounded">fib(0)=0</div>
                            </div>
                          </div>
                          <div className="p-1 bg-green-200 rounded text-xs">
                            <div className="font-semibold">fib(1)=1</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="p-2 bg-white rounded border border-blue-300 mb-1">
                          <div className="font-semibold">fibonacci(2)</div>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <div className="p-1 bg-green-200 rounded">fib(1)=1</div>
                          <div className="p-1 bg-green-200 rounded">fib(0)=0</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">Tree shows how fibonacci(4) breaks into smaller calls</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: Countdown (Simple Example)</h3>
              <p className="text-gray-700 mb-4">Countdown from n to 0:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Countdown from n to 0
def countdown(n):
    # Base case: stop at 0
    if n <= 0:
        print("Blast off!")
        return
    
    # Print current number
    print(n)
    
    # Recursive case: countdown with n-1
    countdown(n - 1)

# Example usage
countdown(5)
# Output:
# 5
# 4
# 3
# 2
# 1
# Blast off!`}</code></pre>
                </div>
                
                {/* Visual: Countdown Flow */}
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Countdown(3) Flow</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Call 1:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-purple-300 text-sm">countdown(3) prints 3, calls countdown(2)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Call 2:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-purple-300 text-sm">countdown(2) prints 2, calls countdown(1)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Call 3:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-purple-300 text-sm">countdown(1) prints 1, calls countdown(0)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Base Case:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded border border-green-300 text-sm font-semibold">countdown(0) prints "Blast off!", returns</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always include a base case to stop recursion. Make sure recursive case moves toward base case (smaller input). Visualize recursion as a tree or call stack. Test with small inputs first. Be careful with deep recursion to avoid stack overflow.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Recursion Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Recursion matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Simpler Code
                </h3>
                <p className="text-gray-700 text-sm">Recursion can make code simpler and more elegant for recursive problems. Problems like tree traversal, factorial, and Fibonacci are naturally recursive. Recursive solutions are often easier to understand than iterative ones for these problems.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  Natural for Trees/Graphs
                </h3>
                <p className="text-gray-700 text-sm">Recursion is natural for tree and graph structures. Tree traversal (preorder, inorder, postorder) is recursive. Graph algorithms (DFS) use recursion. Recursive code matches the recursive structure of trees and graphs.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Divide and Conquer
                </h3>
                <p className="text-gray-700 text-sm">Recursion enables divide and conquer algorithms. Merge sort, quick sort, and binary search use recursion to break problems into smaller parts. Recursion is essential for these efficient algorithms.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Interview Essential
                </h3>
                <p className="text-gray-700 text-sm">Recursion is a common coding interview topic. Interviewers ask about recursion, base cases, and recursive solutions. Understanding recursion is essential for technical interviews and coding challenges.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Recursion matters because it makes code simpler for recursive problems, is natural for trees/graphs, enables divide and conquer algorithms, and is essential for interviews. However, be careful with deep recursion and stack overflow.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is recursion?</h3>
                <p className="text-gray-700 leading-relaxed">Recursion is when a function calls itself to solve a problem. Instead of using loops, recursion breaks a problem into smaller versions of itself. A recursive function has: base case (stops recursion) and recursive case (calls itself). Real-life example: Russian dolls (doll contains smaller doll, which contains even smaller doll). Recursion is powerful but needs a base case to stop.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does recursion work?</h3>
                <p className="text-gray-700 leading-relaxed">Recursion works by: 1) Function calls itself with smaller input, 2) Each call solves a smaller version of the problem, 3) Base case stops recursion when problem is small enough, 4) Results bubble back up through call stack. Think of it like opening nested boxes: open box, find smaller box inside, open that, find even smaller box, repeat until you find the smallest box (base case).</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a base case in recursion?</h3>
                <p className="text-gray-700 leading-relaxed">Base case is the condition that stops recursion. Without a base case, recursion runs forever (infinite recursion). Base case is the simplest version of the problem that doesn't need recursion. Example: factorial(0) = 1 (base case), factorial(n) = n * factorial(n-1) (recursive case). Base case prevents infinite recursion and allows results to return.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When to use recursion?</h3>
                <p className="text-gray-700 leading-relaxed">Use recursion for: problems that can be broken into smaller versions of themselves (factorial, Fibonacci, tree traversal), problems with natural recursive structure (file system, tree structures), divide and conquer algorithms (merge sort, quick sort), and when recursive solution is simpler than iterative. Recursion is great for tree/graph problems and mathematical sequences.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the advantages and disadvantages of recursion?</h3>
                <p className="text-gray-700 leading-relaxed">Advantages: simpler code for recursive problems, natural for tree/graph structures, elegant solutions. Disadvantages: can be slower than iteration, uses more memory (call stack), risk of stack overflow with deep recursion, harder to debug. Use recursion when problem is naturally recursive, but be careful with deep recursion.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is Recursion? Explained with Simple Real-Life Examples"
            description="Complete Beginner-Friendly Guide to Recursion (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is Recursion Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
