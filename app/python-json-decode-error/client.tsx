'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, ExternalLink } from 'lucide-react';

export default function PythonJsonDecodeErrorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
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
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileCode className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix Python json.JSONDecodeError — Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Every cause and fix for Python JSON parsing errors</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>json.JSONDecodeError</strong> is raised by <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads()</code> when
              the input is not valid JSON. It is a subclass of <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">ValueError</code> and
              includes the line and column of the error. This guide walks through every common cause and the exact fix for each.
            </p>
          </section>

          {/* What is JSONDecodeError */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is JSONDecodeError?</h2>
            <p className="text-gray-700 mb-3">
              Introduced in Python 3.5, <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.JSONDecodeError</code> is
              raised whenever <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads()</code> receives a string
              that doesn&apos;t conform to the JSON specification. You can catch it as either
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">json.JSONDecodeError</code> or
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">ValueError</code>.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import json

try:
    data = json.loads("not valid json")
except json.JSONDecodeError as e:
    print(e.msg)        # Expecting value
    print(e.lineno)     # 1
    print(e.colno)      # 1
    print(e.pos)        # 0`}</pre>
          </section>

          {/* Cause 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 1: HTML Response Instead of JSON</h2>
            <p className="text-gray-700 mb-4">
              The most common cause. The server returns an HTML error page (e.g., a 404 or 500) instead of JSON.
              Always check the status code and Content-Type before parsing.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Broken — crashes when server returns HTML:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import requests

response = requests.get("https://api.example.com/data")
data = response.json()  # JSONDecodeError if response is HTML`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">Fixed — validate before parsing:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import requests

response = requests.get("https://api.example.com/data")

# Check status first
response.raise_for_status()

# Check Content-Type
content_type = response.headers.get("Content-Type", "")
if "application/json" not in content_type:
    raise ValueError(f"Expected JSON, got: {content_type}\\n{response.text[:200]}")

data = response.json()`}</pre>
            </div>
          </section>

          {/* Cause 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 2: Empty Response Body</h2>
            <p className="text-gray-700 mb-4">
              Some endpoints return an empty 200 OK response. Calling <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads(&quot;&quot;)</code> raises
              &quot;Expecting value: line 1 column 1&quot;.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Broken:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import json
text = ""
data = json.loads(text)  # JSONDecodeError: Expecting value: line 1 column 1`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">Fixed:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import json

def safe_json_loads(text: str, fallback=None):
    if not text or not text.strip():
        return fallback
    return json.loads(text)

data = safe_json_loads(response.text, fallback={})`}</pre>
            </div>
          </section>

          {/* Cause 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 3: BOM (Byte Order Mark) Characters</h2>
            <p className="text-gray-700 mb-4">
              Files saved by Windows editors sometimes start with a UTF-8 BOM
              (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">\ufeff</code>).
              JSON parsers reject this invisible character at the start of the string.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Broken:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`with open("data.json", encoding="utf-8") as f:
    data = json.load(f)  # JSONDecodeError if file has BOM`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">Fixed — two approaches:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Option 1: Strip BOM from string
text = response.text.lstrip('\ufeff')
data = json.loads(text)

# Option 2: Open file with utf-8-sig encoding (strips BOM automatically)
with open("data.json", encoding="utf-8-sig") as f:
    data = json.load(f)`}</pre>
            </div>
          </section>

          {/* Cause 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 4: Single Quotes Instead of Double Quotes</h2>
            <p className="text-gray-700 mb-4">
              Python dicts use single quotes when printed, but JSON requires double quotes. If you paste a
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">str(dict)</code> output
              into <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads()</code>, it will fail.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Broken:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Python dict printed to string — single quotes, not valid JSON
text = "{'name': 'Alice', 'age': 30}"
data = json.loads(text)  # JSONDecodeError: Expecting property name`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">Fixed — use json.dumps() to serialize Python objects:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Serialize Python dict to proper JSON string first
d = {"name": "Alice", "age": 30}
json_text = json.dumps(d)   # '{"name": "Alice", "age": 30}'
data = json.loads(json_text)  # OK

# If you received a Python-repr string, use ast.literal_eval (carefully)
import ast
data = ast.literal_eval("{'name': 'Alice', 'age': 30}")`}</pre>
            </div>
          </section>

          {/* Cause 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 5: Trailing Commas</h2>
            <p className="text-gray-700 mb-4">
              Trailing commas after the last element (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">[1, 2, 3,]</code>)
              are valid in Python and JavaScript but not in JSON.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Broken:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`text = '{"items": [1, 2, 3,], "count": 3,}'
data = json.loads(text)  # JSONDecodeError: Expecting value`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-2">Fixed — strip trailing commas (or use the json5 library):</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import re

def strip_trailing_commas(text: str) -> str:
    # Remove trailing commas before ] or }
    return re.sub(r',\\s*([}\\]])', r'\\1', text)

clean = strip_trailing_commas(text)
data = json.loads(clean)

# Or use the json5 library for lenient parsing
# pip install json5
import json5
data = json5.loads(text)`}</pre>
            </div>
          </section>

          {/* Cause 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cause 6: API Error Message Not JSON (500 Error)</h2>
            <p className="text-gray-700 mb-4">
              When a server throws an unhandled exception, it often returns an HTML error page. Your code gets a 500 response with
              HTML body and crashes when calling <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">.json()</code>.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import requests
import json
import logging

def call_api(url: str) -> dict | None:
    try:
        response = requests.get(url, timeout=10)
    except requests.RequestException as e:
        logging.error("Network error: %s", e)
        return None

    if not response.ok:
        logging.error(
            "API error %s: %s",
            response.status_code,
            response.text[:300]
        )
        return None

    try:
        return response.json()
    except json.JSONDecodeError as e:
        logging.error(
            "Invalid JSON (status=%s): %s | body: %s",
            response.status_code, e, response.text[:300]
        )
        return None`}</pre>
          </section>

          {/* Safe patterns */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safe json.loads() Pattern</h2>
            <p className="text-gray-700 mb-3">A reusable utility function that handles all common failure modes:</p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import json
import logging
from typing import Any

def safe_json_loads(text: str | bytes, fallback: Any = None) -> Any:
    """Parse JSON safely — returns fallback on any error."""
    if not text:
        return fallback
    if isinstance(text, bytes):
        text = text.decode("utf-8", errors="replace")
    text = text.lstrip('\ufeff').strip()
    if not text:
        return fallback
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logging.warning("JSONDecodeError at pos %d: %s | snippet: %r", e.pos, e.msg, text[:200])
        return fallback`}</pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safe requests.json() Pattern</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import requests
import json
import logging

def get_json(url: str, **kwargs) -> dict | None:
    """Fetch a URL and return parsed JSON or None."""
    try:
        r = requests.get(url, timeout=15, **kwargs)
    except requests.RequestException as e:
        logging.error("Request failed: %s", e)
        return None

    if not r.ok:
        logging.error("HTTP %s from %s: %s", r.status_code, url, r.text[:300])
        return None

    ct = r.headers.get("Content-Type", "")
    if "json" not in ct:
        logging.warning("Unexpected Content-Type %r from %s", ct, url)

    try:
        return r.json()
    except json.JSONDecodeError as e:
        logging.error("JSONDecodeError from %s: %s | body: %r", url, e, r.text[:300])
        return None`}</pre>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <ExternalLink className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Validate your JSON before parsing</p>
                <p className="text-blue-100 text-sm mb-3">Paste any JSON string and instantly see if it&apos;s valid — and where the error is.</p>
                <Link
                  href="/json-validator"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Validate your JSON before parsing →
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What is json.JSONDecodeError in Python?</h3>
                <p className="text-gray-700">
                  It is a subclass of <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">ValueError</code> raised
                  by <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads()</code> when the input
                  is not valid JSON. It includes the error position via <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">e.lineno</code> and
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 ml-1">e.pos</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why does requests.json() raise JSONDecodeError?</h3>
                <p className="text-gray-700">
                  Usually because the server returned HTML (an error page) instead of JSON. Always check
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">response.status_code</code> and
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">response.headers[&quot;Content-Type&quot;]</code> before
                  calling <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 ml-1">.json()</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I handle JSONDecodeError safely?</h3>
                <p className="text-gray-700">
                  Wrap <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">json.loads()</code> in
                  a <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">try/except json.JSONDecodeError</code> block,
                  log the raw text and error position, and return a safe fallback such as <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">None</code> or
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 ml-1">{'{}'}</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What causes &quot;Expecting value: line 1 column 1&quot;?</h3>
                <p className="text-gray-700">
                  The input is either an empty string or starts with an invalid character such as
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">&lt;</code> (HTML).
                  Print <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">repr(response.text[:100])</code> to
                  see exactly what was received.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix BOM characters in JSON?</h3>
                <p className="text-gray-700">
                  Strip the BOM with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">text.lstrip(&apos;\ufeff&apos;)</code>,
                  or open JSON files with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">encoding=&quot;utf-8-sig&quot;</code> which
                  strips the BOM automatically.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON and find exactly where errors are' },
                { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format and beautify JSON for easier debugging' },
                { href: '/curl-to-python', label: 'cURL to Python', desc: 'Convert cURL to Python requests code' },
                { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser network logs to cURL commands' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500 mt-1 shrink-0 group-hover:text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-blue-700">{label}</p>
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
