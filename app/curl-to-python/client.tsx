'use client';

import Link from 'next/link';
import { ArrowLeft, Code2 } from 'lucide-react';
import CurlConverter from '@/components/tools/CurlConverter';
import FAQSchema from '@/components/FAQSchema';

export default function CurlToPythonClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/50 to-orange-50/50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Code2 className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Convert cURL to Python Requests — Free Online Converter</h1>
              <p className="text-sm text-gray-500 mt-1">Paste a cURL command, get Python code with the <code className="bg-gray-100 px-1 rounded">requests</code> library. Headers, auth, JSON, and files supported.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I convert cURL to Python?',
              answer: 'Paste your cURL command into the converter above, choose "Python (Requests)" as the target, and click Convert. You get ready-to-run Python code using the requests library.',
            },
            {
              question: 'Does it support POST and JSON body?',
              answer: 'Yes. The converter handles GET, POST, PUT, PATCH, DELETE, and preserves JSON bodies (-d), headers (-H), Basic Auth (-u), and Bearer tokens.',
            },
            {
              question: 'Is the Python code safe to use in production?',
              answer: 'Yes. The output uses the standard requests library and follows common Python practices. Always validate and sanitize inputs when calling external APIs.',
            },
            {
              question: 'Can I convert cURL with file upload to Python?',
              answer: 'Yes. cURL -F (multipart/form-data) is converted to the files parameter in requests. The converter preserves file field names and content types.',
            },
            {
              question: 'What is the difference between cURL and Python requests?',
              answer: 'cURL is a command-line tool for making HTTP requests. Python requests is a library for making the same requests inside Python code. Converting cURL to Python lets you automate API calls in scripts and applications.',
            },
          ]}
        />

        <div className="mb-8 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-yellow-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-800">Select <strong>Python (Requests)</strong> or <strong>Python (HTTPX)</strong> in the target dropdown, then paste your cURL and convert.</p>
          </div>
          <div className="p-4">
            <CurlConverter />
          </div>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to convert cURL to Python requests</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use the converter above: paste your cURL command, choose <strong>Python (Requests)</strong>, and click convert. The tool maps cURL options to Python <code className="bg-gray-100 px-1 rounded">requests</code> calls so you get runnable code with the same URL, method, headers, and body.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have many cURL commands or need other languages (JavaScript, Go, Java, PHP), use our full <Link href="/curl-converter" className="text-blue-600 hover:underline font-semibold">cURL to Code Converter</Link>. For step-by-step guides and examples, see <Link href="/blog/curl-to-python-requests-complete-guide" className="text-blue-600 hover:underline font-semibold">cURL to Python Requests: Complete Guide</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">cURL vs Python requests — syntax comparison</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              cURL uses flags and positional args; Python requests uses method calls and keyword arguments. The converter handles the mapping so you don&apos;t have to.
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">cURL</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Python requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3 text-gray-700"><code>-X POST</code></td><td className="px-4 py-3 text-gray-700"><code>requests.post(url, ...)</code></td></tr>
                  <tr><td className="px-4 py-3 text-gray-700"><code>-H &quot;Content-Type: application/json&quot;</code></td><td className="px-4 py-3 text-gray-700"><code>headers=&#123;&#39;Content-Type&#39;: &#39;application/json&#39;&#125;</code></td></tr>
                  <tr><td className="px-4 py-3 text-gray-700"><code>-d &apos;&#123;&quot;key&quot;:&quot;val&quot;&#125;&apos;</code></td><td className="px-4 py-3 text-gray-700"><code>json=&#123;&#39;key&#39;: &#39;val&#39;&#125;</code></td></tr>
                  <tr><td className="px-4 py-3 text-gray-700"><code>-u user:pass</code></td><td className="px-4 py-3 text-gray-700"><code>auth=(&#39;user&#39;, &#39;pass&#39;)</code></td></tr>
                  <tr><td className="px-4 py-3 text-gray-700"><code>-H &quot;Authorization: Bearer TOKEN&quot;</code></td><td className="px-4 py-3 text-gray-700"><code>headers=&#123;&#39;Authorization&#39;: &#39;Bearer TOKEN&#39;&#125;</code></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common cURL flags and their Python equivalent</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong><code className="bg-gray-100 px-1 rounded">-X METHOD</code></strong> → <code className="bg-gray-100 px-1 rounded">requests.get/post/put/delete/patch(url, ...)</code></li>
              <li><strong><code className="bg-gray-100 px-1 rounded">-H &quot;Name: value&quot;</code></strong> → <code className="bg-gray-100 px-1 rounded">headers=&#123;&#39;Name&#39;: &#39;value&#39;&#125;</code></li>
              <li><strong><code className="bg-gray-100 px-1 rounded">-d &apos;...&apos;</code></strong> → <code className="bg-gray-100 px-1 rounded">data=...</code> or <code className="bg-gray-100 px-1 rounded">json=...</code> for JSON</li>
              <li><strong><code className="bg-gray-100 px-1 rounded">-u user:pass</code></strong> → <code className="bg-gray-100 px-1 rounded">auth=(&#39;user&#39;, &#39;pass&#39;)</code></li>
              <li><strong><code className="bg-gray-100 px-1 rounded">--connect-timeout N</code></strong> → <code className="bg-gray-100 px-1 rounded">timeout=N</code></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Code examples: GET, POST, headers, auth</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              After converting, you get Python like this. For GET with headers:
            </p>
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-x-auto mb-4">
{`import requests
url = "https://api.example.com/data"
headers = {"Authorization": "Bearer YOUR_TOKEN"}
r = requests.get(url, headers=headers)
print(r.json())`}
            </pre>
            <p className="text-gray-700 leading-relaxed mb-4">
              For POST with JSON body:
            </p>
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-x-auto mb-4">
{`import requests
url = "https://api.example.com/users"
headers = {"Content-Type": "application/json"}
payload = {"name": "John", "email": "john@example.com"}
r = requests.post(url, json=payload, headers=headers)
print(r.status_code)`}
            </pre>
            <p className="text-gray-700 leading-relaxed">
              The converter above fills in <code className="bg-gray-100 px-1 rounded">url</code>, <code className="bg-gray-100 px-1 rounded">headers</code>, and body from your cURL so you can run or tweak the code immediately. For more examples and edge cases, use our <Link href="/curl-to-python-requests" className="text-blue-600 hover:underline font-semibold">cURL to Python Requests</Link> tool page or the full <Link href="/curl-converter" className="text-blue-600 hover:underline font-semibold">cURL Converter</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why convert cURL to Python?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              cURL is ideal for one-off tests in the terminal. Python with <code className="bg-gray-100 px-1 rounded">requests</code> is better for scripts, automation, and production code: you get loops, error handling, and integration with the rest of your app. Converting cURL to Python lets you keep the exact request (URL, headers, body) while moving from the command line into code.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This converter is free, runs in your browser, and doesn&apos;t store your commands. For HAR-based conversion (browser network export to cURL then to code), use our <Link href="/har-to-curl" className="text-blue-600 hover:underline font-semibold">HAR to cURL</Link> tool first, then paste the generated cURL here.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
