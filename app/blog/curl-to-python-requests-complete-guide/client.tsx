'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Copy, CheckCircle, ExternalLink, Play, FileText } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function CurlToPythonRequestsGuideClient() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const examples = [
    {
      id: 'basic-get',
      title: 'Basic GET Request',
      curl: `curl https://api.github.com/users/octocat`,
      python: `import requests

response = requests.get('https://api.github.com/users/octocat')
print(response.json())`,
      description: 'Simple GET request to fetch user data from GitHub API'
    },
    {
      id: 'post-json',
      title: 'POST with JSON Data',
      curl: `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'`,
      python: `import requests

data = {
    "name": "John",
    "email": "john@example.com"
}

response = requests.post(
    'https://api.example.com/users',
    json=data
)
print(response.json())`,
      description: 'POST request with JSON payload using the json parameter'
    },
    {
      id: 'basic-auth',
      title: 'Basic Authentication',
      curl: `curl -u username:password https://api.example.com/protected`,
      python: `import requests
from requests.auth import HTTPBasicAuth

response = requests.get(
    'https://api.example.com/protected',
    auth=HTTPBasicAuth('username', 'password')
)
print(response.json())`,
      description: 'Authenticated request using Basic Auth'
    },
    {
      id: 'bearer-token',
      title: 'Bearer Token Authentication',
      curl: `curl -X GET https://api.example.com/data \\
  -H "Authorization: Bearer your-token-here"`,
      python: `import requests

headers = {
    'Authorization': 'Bearer your-token-here'
}

response = requests.get(
    'https://api.example.com/data',
    headers=headers
)
print(response.json())`,
      description: 'API request with Bearer token authentication'
    },
    {
      id: 'custom-headers',
      title: 'Custom Headers',
      curl: `curl -X GET https://api.example.com/data \\
  -H "X-API-Key: abc123" \\
  -H "User-Agent: MyApp/1.0"`,
      python: `import requests

headers = {
    'X-API-Key': 'abc123',
    'User-Agent': 'MyApp/1.0'
}

response = requests.get(
    'https://api.example.com/data',
    headers=headers
)
print(response.json())`,
      description: 'Request with custom headers for API keys and user agents'
    },
    {
      id: 'file-upload',
      title: 'File Upload (Multipart)',
      curl: `curl -X POST https://api.example.com/upload \\
  -F "file=@/path/to/file.jpg" \\
  -F "description=Profile picture"`,
      python: `import requests

files = {
    'file': ('file.jpg', open('/path/to/file.jpg', 'rb'), 'image/jpeg')
}
data = {
    'description': 'Profile picture'
}

response = requests.post(
    'https://api.example.com/upload',
    files=files,
    data=data
)
print(response.json())`,
      description: 'Upload files using multipart/form-data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Convert cURL to Python Requests</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide with Real Examples</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Convert cURL to Python Requests"
        description="Complete Guide with Real Examples"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I convert a cURL command to Python Requests?',
              answer: 'Use our free cURL to Python Requests converter tool. Simply paste your cURL command, select Python (Requests) as the target language, and get instant Python code. Alternatively, manually convert by mapping cURL flags to Requests methods.',
            },
            {
              question: 'What is the difference between cURL and Python Requests?',
              answer: 'cURL is a command-line tool for making HTTP requests, while Python Requests is a library for making HTTP requests in Python code. Both can make the same API calls, but Requests is better for programmatic use in Python applications.',
            },
            {
              question: 'How do I handle authentication in Python Requests?',
              answer: 'Python Requests supports Basic Auth using auth=HTTPBasicAuth(username, password), Bearer tokens via Authorization header, and custom authentication methods. Our converter automatically handles all authentication types.',
            },
            {
              question: 'Can I convert cURL commands with file uploads to Python?',
              answer: 'Yes! Python Requests supports file uploads using the files parameter. Our converter automatically handles multipart/form-data uploads from cURL -F flags.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Converting cURL commands to Python Requests is a common task for developers. Whether you're integrating APIs, 
              testing endpoints, or building Python applications, knowing how to convert cURL to Python Requests is essential.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this comprehensive guide, we'll show you how to convert cURL commands to Python Requests with real examples, 
              covering authentication, headers, JSON data, file uploads, and error handling. Use our free 
              <Link href="/" className="text-blue-600 hover:underline font-semibold"> cURL to Python Requests converter</Link> to automate the process.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Convert cURL to Python Requests?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">cURL (Command Line)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Great for testing APIs quickly</li>
                  <li>Useful for debugging</li>
                  <li>Not suitable for production code</li>
                  <li>Limited error handling</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Python Requests (Library)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Perfect for production applications</li>
                  <li>Better error handling</li>
                  <li>Session management</li>
                  <li>Easy to integrate in code</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Conversion Guide</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">1. Install Python Requests</h3>
                <p className="text-gray-700 text-sm mb-2">First, install the Requests library if you haven't already:</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm">pip install requests</code>
                    <button
                      onClick={() => copyToClipboard('pip install requests', 'install')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copiedExample === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">2. Map cURL Flags to Requests</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">cURL Flag</th>
                        <th className="text-left py-2">Python Requests</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2"><code>-X GET</code></td>
                        <td className="py-2"><code>requests.get()</code></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2"><code>-X POST</code></td>
                        <td className="py-2"><code>requests.post()</code></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2"><code>-H "Header: Value"</code></td>
                        <td className="py-2"><code>headers={'{"Header": "Value"}'}</code></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2"><code>-d {'\''}{'{'}"key":"value"{'}'}{'\''}</code></td>
                        <td className="py-2"><code>json={'{"key": "value"}'}</code></td>
                      </tr>
                      <tr>
                        <td className="py-2"><code>-u username:password</code></td>
                        <td className="py-2"><code>auth=HTTPBasicAuth('user', 'pass')</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
            <p className="text-gray-700 mb-6">
              Try these examples! Click the copy button to use them in your code. All examples are production-ready.
            </p>
            <div className="space-y-6">
              {examples.map((example) => (
                <div key={example.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{example.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{example.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-red-900 text-sm">cURL Command:</p>
                        <button
                          onClick={() => copyToClipboard(example.curl, `${example.id}-curl`)}
                          className="text-red-600 hover:text-red-700"
                        >
                          {copiedExample === `${example.id}-curl` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="bg-white p-3 rounded border border-red-200 text-xs overflow-x-auto">
                        <code>{example.curl}</code>
                      </pre>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-green-900 text-sm">Python Requests:</p>
                        <button
                          onClick={() => copyToClipboard(example.python, `${example.id}-python`)}
                          className="text-green-600 hover:text-green-700"
                        >
                          {copiedExample === `${example.id}-python` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto">
                        <code>{example.python}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">1. Use Session for Multiple Requests</h3>
                <pre className="bg-white p-3 rounded border border-blue-200 text-sm overflow-x-auto">
{`import requests

session = requests.Session()
session.headers.update({'Authorization': 'Bearer token'})

# Reuse session for multiple requests
response1 = session.get('https://api.example.com/users')
response2 = session.get('https://api.example.com/posts')`}
                </pre>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">2. Always Handle Errors</h3>
                <pre className="bg-white p-3 rounded border border-green-200 text-sm overflow-x-auto">
{`import requests

try:
    response = requests.get('https://api.example.com/data')
    response.raise_for_status()  # Raises exception for bad status codes
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f'Error: {e}')`}
                </pre>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">3. Use json Parameter for JSON Data</h3>
                <p className="text-sm text-gray-700 mb-2">Instead of manually setting Content-Type and encoding:</p>
                <pre className="bg-white p-3 rounded border border-purple-200 text-sm overflow-x-auto">
{`# Good ✅
response = requests.post(url, json={'key': 'value'})

# Avoid ❌
response = requests.post(url, data=json.dumps({'key': 'value'}), headers={'Content-Type': 'application/json'})`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Convert cURL to Python Requests Instantly</h2>
                <p className="text-blue-100">
                  Don't convert manually! Use our free cURL to Python Requests converter to transform any cURL command 
                  into production-ready Python code in seconds.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=curl"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try Free Converter Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/curl-to-code-converter-2026" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">How to Convert cURL Commands to Code in 2026</h3>
                <p className="text-sm text-gray-600">Complete guide for JavaScript, Python, Go, PHP & more</p>
              </Link>
              <Link href="/curl-to-requests" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">cURL to Requests Converter Tool</h3>
                <p className="text-sm text-gray-600">Free online converter for 7+ programming languages</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

