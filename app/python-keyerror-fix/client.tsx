'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ExternalLink } from 'lucide-react';

export default function PythonKeyErrorFixClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix Python KeyError — Every Pattern You Need</h1>
              <p className="text-sm text-gray-500 mt-1">Safe dictionary access patterns for Python developers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              A <strong>Python KeyError</strong> is raised when you access a dictionary with a key that doesn&apos;t exist.
              It&apos;s one of the most common runtime errors — especially when parsing API responses, JSON payloads, or
              configuration files. This guide covers every pattern you need to handle it safely.
            </p>
          </section>

          {/* What is a KeyError */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a KeyError?</h2>
            <p className="text-gray-700 mb-3">
              When you access <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dict[key]</code> and
              that key doesn&apos;t exist, Python raises a <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">KeyError</code>.
              The error message shows the missing key name.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`user = {"name": "Alice", "email": "alice@example.com"}

# This raises KeyError: 'age'
print(user["age"])

# Traceback:
# KeyError: 'age'`}</pre>
          </section>

          {/* Fix 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 1: Use dict.get() — The Safest Pattern</h2>
            <p className="text-gray-700 mb-3">
              The <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get()</code> method returns
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">None</code> if the key is missing,
              or a default value you specify. It never raises a KeyError.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`user = {"name": "Alice"}

# Returns None — no error
age = user.get("age")

# Returns a default value
age = user.get("age", 0)
role = user.get("role", "viewer")

print(age)   # 0
print(role)  # "viewer"`}</pre>
          </section>

          {/* Fix 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 2: Check with &apos;in&apos; Before Accessing</h2>
            <p className="text-gray-700 mb-3">
              Use the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">in</code> operator to
              guard access. Best when you need different logic for present vs absent keys.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`data = {"status": "active", "score": 95}

if "score" in data:
    print(f"Score: {data['score']}")
else:
    print("Score not available")

# Combine with walrus operator (Python 3.8+)
if (score := data.get("score")) is not None:
    print(f"Score: {score}")`}</pre>
          </section>

          {/* Fix 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 3: try/except KeyError</h2>
            <p className="text-gray-700 mb-3">
              Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">try/except</code> when you
              want to log the error or handle it differently from other exceptions. Always log the full payload for debugging.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import logging

def get_user_email(data: dict) -> str:
    try:
        return data["user"]["email"]
    except KeyError as e:
        logging.warning("Missing key in user data: %s | payload: %s", e, data)
        return ""

result = get_user_email({"user": {"name": "Bob"}})
print(result)  # ""  — no crash, warning logged`}</pre>
          </section>

          {/* Fix 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 4: Nested Dictionaries — Chain get()</h2>
            <p className="text-gray-700 mb-3">
              For nested dicts, chain <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get()</code> calls.
              Each intermediate <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get("key", {})</code> returns
              an empty dict on a missing key, so the next <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get()</code> has
              something to call on.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`response = {
    "data": {
        "user": {
            "profile": {"city": "New York"}
        }
    }
}

# Safe — returns "" if any level is missing
city = (
    response
    .get("data", {})
    .get("user", {})
    .get("profile", {})
    .get("city", "")
)
print(city)  # "New York"

# Missing path — no KeyError, returns ""
country = (
    response
    .get("data", {})
    .get("user", {})
    .get("profile", {})
    .get("country", "")
)
print(country)  # ""`}</pre>
          </section>

          {/* Fix 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 5: Use defaultdict for Counters</h2>
            <p className="text-gray-700 mb-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">defaultdict</code> from
              the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">collections</code> module
              auto-creates a default value when a missing key is accessed — no KeyError, no pre-initialization needed.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`from collections import defaultdict

# Count word frequency — no KeyError on first encounter
word_counts = defaultdict(int)
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
for word in words:
    word_counts[word] += 1

print(dict(word_counts))
# {'apple': 3, 'banana': 2, 'cherry': 1}

# Group items by category
grouped = defaultdict(list)
items = [("fruit", "apple"), ("veg", "carrot"), ("fruit", "banana")]
for category, item in items:
    grouped[category].append(item)

print(dict(grouped))
# {'fruit': ['apple', 'banana'], 'veg': ['carrot']}`}</pre>
          </section>

          {/* Fix 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 6: setdefault() for Auto-Initialization</h2>
            <p className="text-gray-700 mb-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">setdefault(key, default)</code> sets
              a key only if it doesn&apos;t exist yet, then returns the value. Useful for building nested structures incrementally.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Build a nested dict without KeyError
index = {}
records = [("UK", "London"), ("UK", "Manchester"), ("US", "New York")]
for country, city in records:
    index.setdefault(country, []).append(city)

print(index)
# {'UK': ['London', 'Manchester'], 'US': ['New York']}

# Also useful for caching
cache = {}
def get_config(key: str) -> dict:
    return cache.setdefault(key, {"loaded": False})`}</pre>
          </section>

          {/* Fix 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 7: API Responses — Always Validate Structure</h2>
            <p className="text-gray-700 mb-3">
              Never assume an API response has all the expected keys. Check the shape of the response before accessing nested keys.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import requests

def fetch_user(user_id: int) -> dict:
    response = requests.get(f"https://api.example.com/users/{user_id}")
    response.raise_for_status()
    data = response.json()

    # Validate structure before accessing
    if not isinstance(data, dict):
        raise ValueError(f"Expected dict, got {type(data)}")

    user = data.get("user") or {}
    return {
        "id": user.get("id", user_id),
        "name": user.get("name", "Unknown"),
        "email": user.get("email", ""),
        "role": user.get("role", "viewer"),
    }`}</pre>
          </section>

          {/* Real-world API example */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">KeyError in API Responses — Real Example</h2>
            <p className="text-gray-700 mb-4">
              APIs often return different shapes depending on success, error state, or version. Here&apos;s a defensive
              parser for a typical paginated API response:
            </p>
            <div className="mb-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
                <p className="text-sm font-semibold text-red-800 mb-2">Fragile — crashes on unexpected shape:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# KeyError if "results" or "items" is absent
data = response.json()
users = data["results"]["items"]
total = data["results"]["total_count"]`}</pre>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-green-800 mb-2">Defensive — handles missing keys gracefully:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import logging

def parse_paginated_response(data: dict) -> dict:
    results = data.get("results") or {}
    return {
        "items": results.get("items") or [],
        "total": results.get("total_count", 0),
        "page": results.get("page", 1),
        "has_more": results.get("has_more", False),
    }

try:
    data = response.json()
    parsed = parse_paginated_response(data)
except Exception as e:
    logging.error("Failed to parse response: %s | body: %s", e, response.text[:500])
    parsed = {"items": [], "total": 0, "page": 1, "has_more": False}`}</pre>
              </div>
            </div>
          </section>

          {/* Python vs JS */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Python vs JavaScript — Similar Error, Different Fix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Language</th>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Error</th>
                    <th className="bg-gray-100 p-3 text-left font-semibold border border-gray-200">Safe Access</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-t border-gray-200 font-medium">Python</td>
                    <td className="p-3 border-t border-gray-200 font-mono text-red-700 text-xs">KeyError: &apos;key&apos;</td>
                    <td className="p-3 border-t border-gray-200 font-mono text-xs">dict.get(&apos;key&apos;, default)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-t border-gray-200 font-medium">JavaScript</td>
                    <td className="p-3 border-t border-gray-200 font-mono text-red-700 text-xs">TypeError: Cannot read properties of undefined</td>
                    <td className="p-3 border-t border-gray-200 font-mono text-xs">obj?.key ?? &apos;default&apos;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <ExternalLink className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Validate your JSON API responses</p>
                <p className="text-blue-100 text-sm mb-3">Paste your JSON and instantly check its structure before writing Python parsing code.</p>
                <Link
                  href="/json-validator"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Validate your JSON API responses →
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What causes a Python KeyError?</h3>
                <p className="text-gray-700">
                  A KeyError is raised when you access a dictionary with a key that doesn&apos;t exist —
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">data[&quot;missing&quot;]</code>
                  instead of <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">data.get(&quot;missing&quot;)</code>.
                  It commonly occurs when API responses or JSON objects have optional or variable fields.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the difference between dict[key] and dict.get(key)?</h3>
                <p className="text-gray-700">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dict[key]</code> raises KeyError if
                  the key is absent. <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dict.get(key)</code> returns
                  None, and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dict.get(key, default)</code> returns
                  your fallback value. Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get()</code> when the key&apos;s
                  presence is uncertain.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I handle KeyError in a loop?</h3>
                <p className="text-gray-700">
                  Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">dict.get(key, default)</code> inside
                  the loop, or use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">defaultdict</code> from
                  collections when building aggregations. If you need per-item error handling, wrap access in try/except and log the failing item.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What is defaultdict and when should I use it?</h3>
                <p className="text-gray-700">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">defaultdict(int)</code> auto-initializes
                  missing keys to 0, <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">defaultdict(list)</code> to
                  an empty list. Use it for counters, grouping, and accumulation patterns where you&apos;d otherwise need to check key existence on every iteration.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix KeyError in a nested dictionary?</h3>
                <p className="text-gray-700">
                  Chain <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.get()</code> calls with empty dict
                  fallbacks: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">data.get(&quot;a&quot;, {}).get(&quot;b&quot;, &quot;&quot;)</code>.
                  Each level returns a safe empty dict if the key is missing, so the chain never raises KeyError.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON structure before parsing in Python' },
                { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format and inspect JSON API responses' },
                { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser requests to cURL commands' },
                { href: '/curl-to-python', label: 'cURL to Python', desc: 'Convert cURL commands to Python requests code' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-yellow-500 mt-1 shrink-0 group-hover:text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-yellow-700">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
