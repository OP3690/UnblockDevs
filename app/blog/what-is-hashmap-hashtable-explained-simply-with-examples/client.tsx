'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Key, CheckCircle, AlertCircle, HelpCircle, Zap, Globe, Hash, Database, Lock } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function WhatIsHashMapHashTableExplainedSimplyWithExamplesClient() {
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
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">What Is HashMap / HashTable? Explained Simply (With Examples)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Beginner-Friendly Guide to Hash Maps (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="What Is HashMap / HashTable? Explained Simply (With Examples)"
        description="Complete Beginner-Friendly Guide to Hash Maps (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is a HashMap?',
              answer: 'HashMap is a data structure that stores key-value pairs. It uses a hash function to convert keys into array indices, allowing O(1) average time for insert, search, and delete operations. Think of it like a dictionary: you look up a word (key) to find its definition (value). HashMap is fast because it uses hashing to directly access values by key.',
            },
            {
              question: 'How does HashMap work?',
              answer: 'HashMap works by: 1) Hash function converts key to array index, 2) Value is stored at that index, 3) To retrieve, hash function finds index from key, 4) Direct access gives O(1) average time. If two keys hash to same index (collision), HashMap uses chaining (linked list) or open addressing to handle it. Hash function should distribute keys evenly to avoid collisions.',
            },
            {
              question: 'What is a hash function?',
              answer: 'Hash function converts a key into an array index. Good hash function: distributes keys evenly, avoids collisions, is fast to compute. Example: hash("apple") = 5, hash("banana") = 2. Hash function takes key, performs calculation, returns index. Same key always produces same index. Different keys should produce different indices (but collisions can happen).',
            },
            {
              question: 'What is collision in HashMap?',
              answer: 'Collision happens when two different keys hash to the same array index. HashMap handles collisions using: chaining (store multiple key-value pairs at same index using linked list), or open addressing (find next available slot). Collisions slow down operations, so good hash function minimizes collisions. Load factor (items/capacity) affects collision rate.',
            },
            {
              question: 'What is the difference between HashMap and HashTable?',
              answer: 'HashMap vs HashTable: HashMap is not synchronized (faster, not thread-safe), HashTable is synchronized (thread-safe, slower). HashMap allows null keys/values, HashTable does not. HashMap is preferred in Java (newer), HashTable is legacy. Both use hashing for O(1) operations. Choose HashMap for single-threaded, HashTable for multi-threaded (though ConcurrentHashMap is better).',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is HashMap / HashTable?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>HashMap</strong> (or <strong>HashTable</strong>) is a data structure that stores key-value pairs. It uses a <strong>hash function</strong> to convert keys into array indices, allowing fast O(1) average time for insert, search, and delete operations. Think of it like a dictionary: you look up a word (key) to find its definition (value).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              HashMap is fast because it uses <strong>hashing</strong> to directly access values by key, instead of searching through all items. The hash function converts a key into an array index, and the value is stored at that index. When you want to retrieve a value, the hash function finds the index from the key, and you get direct access.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              HashMap handles <strong>collisions</strong> (when two keys hash to the same index) using techniques like chaining (linked list) or open addressing. HashMap is one of the most important data structures for fast lookups and is used in many real-world applications.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> HashMap stores key-value pairs using a hash function to convert keys into array indices. This gives O(1) average time for insert, search, and delete. Think of it like a dictionary: look up key to find value. HashMap is fast because of direct access via hashing.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding HashMap Components</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              HashMap consists of several key components:
            </p>
            
            {/* Real-Life Analogy: Dictionary */}
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-600" />
                Real-Life Analogy: Dictionary
              </h3>
              <p className="text-gray-700 mb-4">HashMap is like a dictionary or phone book:</p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Key (Word):</span>
                    <span className="text-gray-700">"apple"</span>
                  </div>
                  <div className="pl-8 text-sm text-gray-600">Hash function converts "apple" to index 5</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-indigo-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Value (Definition):</span>
                    <span className="text-gray-700">"A red fruit"</span>
                  </div>
                  <div className="pl-8 text-sm text-gray-600">Stored at index 5 in the array</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Fast Lookup:</span>
                    <span className="text-gray-700">O(1) average time</span>
                  </div>
                  <div className="pl-8 text-sm text-gray-600">Direct access by key, no need to search through all items</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Just like looking up a word in a dictionary, HashMap lets you find values instantly by key.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-blue-600" />
                  Hash Function
                </h3>
                <p className="text-gray-700 text-sm mb-2">Hash function converts a key into an array index. Good hash function: distributes keys evenly, avoids collisions, is fast to compute. Example: hash("apple") = 5, hash("banana") = 2. Same key always produces same index. Different keys should produce different indices (but collisions can happen). Hash function is the heart of HashMap.</p>
                <p className="text-gray-600 text-xs">Example: Simple hash function: sum of character codes modulo array size</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Array (Buckets)
                </h3>
                <p className="text-gray-700 text-sm mb-2">Array stores key-value pairs. Each array position is called a bucket. Hash function maps keys to buckets. Values are stored in buckets. Array size affects performance: too small causes many collisions, too large wastes memory. Load factor (items/capacity) should be kept low (e.g., 0.75) to minimize collisions.</p>
                <p className="text-gray-600 text-xs">Example: Array of size 10, hash("apple") = 5, so value stored at index 5</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Collision Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">Collision happens when two keys hash to the same index. HashMap handles collisions using: chaining (store multiple key-value pairs at same index using linked list), or open addressing (find next available slot). Collisions slow down operations, so good hash function minimizes collisions. Load factor affects collision rate.</p>
                <p className="text-gray-600 text-xs">Example: hash("apple") = 5, hash("grape") = 5 (collision), use chaining to store both</p>
              </div>
            </div>
            
            {/* Visual: HashMap Structure */}
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-600" />
                HashMap Structure Visualization
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 0</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 1</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg border-2 border-green-500 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 2</div>
                    <div className="text-xs text-gray-600">banana</div>
                    <div className="text-xs text-gray-500">→ "yellow"</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 3</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 4</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div className="p-3 bg-blue-100 rounded-lg border-2 border-blue-500 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 5</div>
                    <div className="text-xs text-gray-600">apple</div>
                    <div className="text-xs text-gray-500">→ "red"</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 6</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg border-2 border-orange-500 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 7</div>
                    <div className="text-xs text-gray-600">grape</div>
                    <div className="text-xs text-gray-500">→ "purple"</div>
                    <div className="text-xs text-red-600 mt-1">(collision)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 8</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border-2 border-gray-300 text-center">
                    <div className="font-semibold text-gray-700 mb-1">Index 9</div>
                    <div className="text-xs text-gray-500">Empty</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 text-center">HashMap stores key-value pairs at indices calculated by hash function</p>
            </div>
            
            {/* Visual: Hash Function Flow */}
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Hash Function Flow</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold text-gray-700">Key:</div>
                  <div className="flex-1 bg-white p-2 rounded border border-blue-300">"apple"</div>
                </div>
                <div className="text-center text-gray-400">↓ Hash Function</div>
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold text-gray-700">Hash:</div>
                  <div className="flex-1 bg-white p-2 rounded border border-blue-300">hash("apple") = 5</div>
                </div>
                <div className="text-center text-gray-400">↓ Array Index</div>
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold text-gray-700">Store:</div>
                  <div className="flex-1 bg-green-100 p-2 rounded border border-green-300 font-semibold">Value "red" at index 5</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> HashMap uses hash function to convert keys into array indices. Array stores key-value pairs. Collisions happen when two keys hash to same index, handled by chaining or open addressing. HashMap gives O(1) average time for operations.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use HashMap</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use HashMap in these situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Use HashMap When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Fast lookups needed:</strong> O(1) average time for search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Key-value pairs:</strong> Store and retrieve by key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Frequent insert/delete:</strong> O(1) average time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No ordering needed:</strong> Keys not sorted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Count frequencies:</strong> Track occurrences of items</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avoid HashMap When:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need sorted order:</strong> Use TreeMap instead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Memory constrained:</strong> HashMap uses extra memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Thread safety needed:</strong> Use ConcurrentHashMap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Small dataset:</strong> Array might be simpler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Need range queries:</strong> HashMap doesn't support ranges</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Use HashMap for fast lookups, key-value storage, frequent insert/delete, and counting frequencies. Avoid HashMap when you need sorted order, are memory constrained, need thread safety, or have a small dataset.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Use HashMap with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn to use HashMap with examples:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Basic HashMap Operations (Python)</h3>
              <p className="text-gray-700 mb-4">Create and use a HashMap (dictionary in Python):</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Python dictionary (HashMap)
# Create empty HashMap
fruits = {}

# Insert key-value pairs
fruits["apple"] = "red"
fruits["banana"] = "yellow"
fruits["grape"] = "purple"

# Get value by key (O(1) average)
print(fruits["apple"])  # Output: "red"

# Check if key exists
if "banana" in fruits:
    print("Found!")  # Output: Found!

# Delete key-value pair
del fruits["grape"]

# Get all keys
print(fruits.keys())  # Output: dict_keys(['apple', 'banana'])

# Get all values
print(fruits.values())  # Output: dict_values(['red', 'yellow'])

# Iterate over key-value pairs
for key, value in fruits.items():
    print(f"{key}: {value}")
# Output:
# apple: red
# banana: yellow`}</code></pre>
                </div>
                
                {/* Visual: HashMap Operations */}
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-3">HashMap Operations Visualization</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Insert:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-indigo-300">put("apple", "red") → hash("apple") = 5 → store at index 5</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Get:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-indigo-300">get("apple") → hash("apple") = 5 → return value at index 5</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Delete:</div>
                      <div className="flex-1 bg-white p-2 rounded border border-indigo-300">remove("apple") → hash("apple") = 5 → remove from index 5</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-semibold text-gray-700">Time:</div>
                      <div className="flex-1 bg-green-100 p-2 rounded border border-green-300 font-semibold">O(1) average for all operations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Count Word Frequencies</h3>
              <p className="text-gray-700 mb-4">Use HashMap to count how many times each word appears:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`# Count word frequencies using HashMap
def count_words(text):
    words = text.split()
    frequency = {}  # HashMap to store word counts
    
    for word in words:
        # If word exists, increment count
        if word in frequency:
            frequency[word] += 1
        else:
            # First occurrence, set count to 1
            frequency[word] = 1
    
    return frequency

# Example usage
text = "apple banana apple grape banana apple"
result = count_words(text)
print(result)
# Output: {'apple': 3, 'banana': 2, 'grape': 1}

# More efficient version using get()
def count_words_efficient(text):
    words = text.split()
    frequency = {}
    
    for word in words:
        frequency[word] = frequency.get(word, 0) + 1
    
    return frequency`}</code></pre>
                </div>
                
                {/* Visual: Word Frequency HashMap */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Word Frequency HashMap</h4>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-white rounded border border-blue-300 text-center">
                        <div className="font-semibold text-gray-700">Key</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-300 text-center">
                        <div className="font-semibold text-gray-700">Value</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-300 text-center">
                        <div className="font-semibold text-gray-700">Count</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-green-100 rounded border border-green-300 text-center">"apple"</div>
                      <div className="p-2 bg-green-100 rounded border border-green-300 text-center">3</div>
                      <div className="p-2 bg-green-100 rounded border border-green-300 text-center">✓✓✓</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-blue-100 rounded border border-blue-300 text-center">"banana"</div>
                      <div className="p-2 bg-blue-100 rounded border border-blue-300 text-center">2</div>
                      <div className="p-2 bg-blue-100 rounded border border-blue-300 text-center">✓✓</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-purple-100 rounded border border-purple-300 text-center">"grape"</div>
                      <div className="p-2 bg-purple-100 rounded border border-purple-300 text-center">1</div>
                      <div className="p-2 bg-purple-100 rounded border border-purple-300 text-center">✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: HashMap vs HashTable (Java)</h3>
              <p className="text-gray-700 mb-4">Difference between HashMap and HashTable:</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="text-sm"><code>{`// Java: HashMap vs HashTable
import java.util.HashMap;
import java.util.Hashtable;

// HashMap (not synchronized, faster)
HashMap<String, Integer> hashMap = new HashMap<>();
hashMap.put("apple", 5);
hashMap.put(null, 10);  // Allows null key
hashMap.put("banana", null);  // Allows null value

// HashTable (synchronized, thread-safe, slower)
Hashtable<String, Integer> hashTable = new Hashtable<>();
hashTable.put("apple", 5);
// hashTable.put(null, 10);  // ERROR: NullPointerException
// hashTable.put("banana", null);  // ERROR: NullPointerException

// Key Differences:
// 1. HashMap: Not synchronized (faster, not thread-safe)
// 2. HashTable: Synchronized (thread-safe, slower)
// 3. HashMap: Allows null keys/values
// 4. HashTable: Does not allow null keys/values
// 5. HashMap: Preferred in modern Java
// 6. HashTable: Legacy class, use ConcurrentHashMap instead`}</code></pre>
                </div>
                
                {/* Visual: HashMap vs HashTable Comparison */}
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">HashMap vs HashTable Comparison</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-white rounded-lg border border-purple-300">
                      <h5 className="font-semibold text-gray-900 mb-2">HashMap</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>✓ Not synchronized</li>
                        <li>✓ Faster</li>
                        <li>✓ Allows null keys/values</li>
                        <li>✓ Preferred in Java</li>
                        <li>✗ Not thread-safe</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-purple-300">
                      <h5 className="font-semibold text-gray-900 mb-2">HashTable</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>✓ Synchronized</li>
                        <li>✓ Thread-safe</li>
                        <li>✗ Slower</li>
                        <li>✗ No null keys/values</li>
                        <li>✗ Legacy class</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Use HashMap for fast O(1) lookups, key-value storage, and counting frequencies. Choose HashMap over HashTable (HashMap is faster and preferred). Handle collisions properly. Keep load factor low (0.75) to minimize collisions. Use HashMap when you need fast lookups without ordering.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why HashMap Matters</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              HashMap matters for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  O(1) Average Time
                </h3>
                <p className="text-gray-700 text-sm">HashMap provides O(1) average time for insert, search, and delete operations. This is much faster than arrays (O(n) search) or linked lists (O(n) search). HashMap is one of the fastest data structures for lookups, making it essential for performance-critical applications.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Key-Value Storage
                </h3>
                <p className="text-gray-700 text-sm">HashMap stores key-value pairs, which is a natural way to represent data. Many real-world problems involve key-value relationships (user IDs to names, words to definitions, products to prices). HashMap makes it easy to store and retrieve these relationships.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Widely Used
                </h3>
                <p className="text-gray-700 text-sm">HashMap is used in many real-world applications: databases (indexing), caches (key-value stores), compilers (symbol tables), and web applications (session storage). Understanding HashMap is essential for software development and coding interviews.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Interview Essential
                </h3>
                <p className="text-gray-700 text-sm">HashMap is a common coding interview topic. Interviewers ask about HashMap operations, hash functions, collision handling, and when to use HashMap. Understanding HashMap is essential for technical interviews and coding challenges.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> HashMap matters because it provides O(1) average time for operations, stores key-value pairs naturally, is widely used in real-world applications, and is essential for coding interviews. HashMap is one of the most important data structures to understand.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a HashMap?</h3>
                <p className="text-gray-700 leading-relaxed">HashMap is a data structure that stores key-value pairs. It uses a hash function to convert keys into array indices, allowing O(1) average time for insert, search, and delete operations. Think of it like a dictionary: you look up a word (key) to find its definition (value). HashMap is fast because it uses hashing to directly access values by key.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does HashMap work?</h3>
                <p className="text-gray-700 leading-relaxed">HashMap works by: 1) Hash function converts key to array index, 2) Value is stored at that index, 3) To retrieve, hash function finds index from key, 4) Direct access gives O(1) average time. If two keys hash to same index (collision), HashMap uses chaining (linked list) or open addressing to handle it. Hash function should distribute keys evenly to avoid collisions.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a hash function?</h3>
                <p className="text-gray-700 leading-relaxed">Hash function converts a key into an array index. Good hash function: distributes keys evenly, avoids collisions, is fast to compute. Example: hash("apple") = 5, hash("banana") = 2. Hash function takes key, performs calculation, returns index. Same key always produces same index. Different keys should produce different indices (but collisions can happen).</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is collision in HashMap?</h3>
                <p className="text-gray-700 leading-relaxed">Collision happens when two different keys hash to the same array index. HashMap handles collisions using: chaining (store multiple key-value pairs at same index using linked list), or open addressing (find next available slot). Collisions slow down operations, so good hash function minimizes collisions. Load factor (items/capacity) affects collision rate.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between HashMap and HashTable?</h3>
                <p className="text-gray-700 leading-relaxed">HashMap vs HashTable: HashMap is not synchronized (faster, not thread-safe), HashTable is synchronized (thread-safe, slower). HashMap allows null keys/values, HashTable does not. HashMap is preferred in Java (newer), HashTable is legacy. Both use hashing for O(1) operations. Choose HashMap for single-threaded, HashTable for multi-threaded (though ConcurrentHashMap is better).</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="What Is HashMap / HashTable? Explained Simply (With Examples)"
            description="Complete Beginner-Friendly Guide to Hash Maps (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="What Is HashMap Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
