'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal, Zap, CheckCircle, AlertCircle, HelpCircle, Globe, Clock, Code, TrendingUp, BarChart3, Activity, Network, FileText, ArrowRight } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function ConsumingWebApiJsonDataUsingCurlAndJqCompleteGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consuming Web API JSON Data Using curl and jq: Complete Guide 2026</h1>
              <p className="text-sm text-gray-500 mt-1">Learn How to Fetch, Parse, and Process JSON Data from APIs Using curl and jq</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Consuming Web API JSON Data Using curl and jq: Complete Guide 2026"
        description="Learn How to Fetch, Parse, and Process JSON Data from APIs Using curl and jq"
        variant="floating"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is curl and jq for consuming Web API JSON data?',
              answer: 'curl is a command-line tool for making HTTP requests to APIs, and jq is a lightweight command-line JSON processor. Together, they allow you to fetch JSON data from web APIs using curl and then parse, filter, transform, and format that JSON data using jq. This combination is powerful for API testing, data extraction, and automation scripts.',
            },
            {
              question: 'How do I use curl and jq together?',
              answer: 'You pipe the output of curl to jq: `curl -s "https://api.example.com/data" | jq`. The `-s` flag makes curl silent (no progress bar), and jq automatically parses and pretty-prints the JSON. You can add jq filters to extract specific data: `curl -s "https://api.example.com/data" | jq ".users[0].name"`.',
            },
            {
              question: 'What are common jq filters for API JSON data?',
              answer: 'Common jq filters include: `.` (pretty print), `.field` (access field), `.[]` (array iteration), `.[0]` (first element), `.users[]` (iterate users array), `.users[0].name` (nested access), `select(.age &gt; 18)` (filtering), `map(.name)` (transform), and creating new objects with field selection.',
            },
            {
              question: 'How do I handle authentication with curl and jq?',
              answer: 'Use curl\'s `-H` flag for headers: `curl -s -H "Authorization: Bearer TOKEN" "https://api.example.com/data" | jq`. For API keys: `curl -s -H "X-API-Key: YOUR_KEY" "https://api.example.com/data" | jq`. For basic auth: `curl -s -u username:password "https://api.example.com/data" | jq`.',
            },
            {
              question: 'Can I use curl and jq in bash scripts?',
              answer: 'Yes, curl and jq are perfect for bash scripts. You can store results in variables: `result=$(curl -s "https://api.example.com/data" | jq ".data")`, use in conditionals: `if [ "$(curl -s "https://api.example.com/data" | jq ".status")" == "success" ]; then`, and loop through arrays: `curl -s "https://api.example.com/data" | jq -r ".users[] | .name" | while read name; do echo $name; done`.',
            },
            {
              question: 'What are the benefits of using curl and jq for API consumption?',
              answer: 'Benefits include: command-line efficiency (no GUI needed), automation-friendly (works in scripts), fast and lightweight, powerful JSON processing (filtering, transformation, extraction), cross-platform (works on Linux, macOS, Windows), and integrates well with other command-line tools. Perfect for CI/CD pipelines, testing, and data processing.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Consuming Web API JSON Data Using curl and jq?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Consuming Web API JSON data using curl and jq</strong> refers to the process of fetching JSON data from web APIs using the `curl` command-line tool and then processing, parsing, filtering, and transforming that JSON data using the `jq` JSON processor. This combination provides a powerful, lightweight, and scriptable way to interact with REST APIs, extract specific data, and automate API testing and data processing workflows.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>curl</strong> (Client URL) is a command-line tool for transferring data to and from servers using various protocols, most commonly HTTP/HTTPS. It's available on virtually all Unix-like systems (Linux, macOS) and Windows. curl allows you to make GET, POST, PUT, DELETE, and other HTTP requests with headers, authentication, and custom options.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>jq</strong> is a lightweight and flexible command-line JSON processor. It's like `sed`, `awk`, `grep`, and `sort` for JSON data. jq can parse JSON, extract specific fields, filter arrays, transform data structures, and format output. It's written in C and is extremely fast, making it perfect for processing large JSON responses from APIs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Together, curl and jq form a powerful combination for API consumption: curl fetches the JSON data from the API, and jq processes it. This workflow is commonly used for API testing, data extraction, automation scripts, CI/CD pipelines, and command-line data processing.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Key Point:</strong> Consuming Web API JSON data using curl and jq means using curl to fetch JSON from APIs and jq to parse, filter, and transform that JSON. This combination provides a powerful, scriptable, and efficient way to work with APIs from the command line without needing GUI tools or programming languages.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding curl and jq for API Consumption</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Let's understand what curl and jq offer for API consumption:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">curl - HTTP Client</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  curl is a command-line HTTP client that can:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Make GET, POST, PUT, DELETE requests</li>
                  <li>• Add custom headers and authentication</li>
                  <li>• Send JSON data in request body</li>
                  <li>• Handle cookies and sessions</li>
                  <li>• Follow redirects automatically</li>
                  <li>• Support HTTPS and SSL/TLS</li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Example:</strong> <code className="bg-white px-2 py-1 rounded">curl -s "https://api.example.com/users"</code>
                </p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">jq - JSON Processor</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  jq is a powerful JSON processor that can:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Parse and pretty-print JSON</li>
                  <li>• Extract specific fields and values</li>
                  <li>• Filter arrays and objects</li>
                  <li>• Transform data structures</li>
                  <li>• Combine and merge JSON objects</li>
                  <li>• Format output in various ways</li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Example:</strong> <code className="bg-white px-2 py-1 rounded">jq ".users[0].name"</code>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Workflow: curl + jq</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <span className="text-gray-700">Use curl to fetch JSON from API</span>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <span className="text-gray-700">Pipe curl output to jq</span>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <span className="text-gray-700">jq parses and processes JSON</span>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <span className="text-gray-700">Get formatted, filtered, or transformed output</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-sm font-mono text-gray-800">
                  <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq
                </p>
              </div>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use curl and jq for API Consumption</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              curl and jq are ideal for API consumption in these scenarios:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-5 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">✅ API Testing and Debugging</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Use curl and jq when you need to quickly test API endpoints, check responses, and debug issues. curl allows you to make requests with different methods, headers, and parameters, while jq helps you inspect and extract specific data from responses.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Example:</strong> Testing a new API endpoint, verifying response structure, checking authentication, debugging API errors
                </p>
              </div>

              <div className="p-5 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Automation Scripts and CI/CD</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Use curl and jq in bash scripts, automation workflows, and CI/CD pipelines. They're lightweight, fast, and don't require additional dependencies. Perfect for automated API health checks, data extraction, and integration testing.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Example:</strong> Automated API monitoring, health checks, data synchronization, CI/CD pipeline testing
                </p>
              </div>

              <div className="p-5 bg-white border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Data Extraction and Processing</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Use curl and jq when you need to extract specific data from API responses, transform JSON structures, or filter large datasets. jq's powerful filtering and transformation capabilities make it perfect for data processing tasks.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Example:</strong> Extracting user names from API response, filtering data by criteria, transforming JSON structure, generating reports
                </p>
              </div>

              <div className="p-5 bg-white border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Command-Line Workflows</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Use curl and jq when working from the command line or terminal. They're perfect for developers who prefer CLI tools over GUI applications, work in remote servers, or need to integrate with other command-line tools.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Example:</strong> Remote server administration, SSH workflows, terminal-based development, command-line data analysis
                </p>
              </div>

              <div className="p-5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Quick API Exploration</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Use curl and jq when you need to quickly explore an API, understand its structure, or test different endpoints. They're faster than opening a browser or GUI tool, and jq makes it easy to navigate complex JSON responses.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Example:</strong> API documentation exploration, endpoint discovery, response structure analysis, quick API testing
                </p>
              </div>
            </div>
          </section>

          {/* How Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How: Step-by-Step Guide to Using curl and jq</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here's a comprehensive guide to consuming Web API JSON data using curl and jq:
            </p>

            <div className="space-y-6 mb-6">
              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Install curl and jq</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Most systems come with curl pre-installed. For jq, install it based on your system:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800 mb-1">
                        <span className="text-green-600"># macOS (using Homebrew)</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">brew install jq</p>
                      <p className="text-xs font-mono text-gray-800 mb-1">
                        <span className="text-green-600"># Linux (Ubuntu/Debian)</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">sudo apt-get install jq</p>
                      <p className="text-xs font-mono text-gray-800 mb-1">
                        <span className="text-green-600"># Linux (CentOS/RHEL)</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800">sudo yum install jq</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Basic API Request with curl</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Start with a simple GET request to fetch JSON data:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users"
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Flags:</strong> `-s` makes curl silent (no progress bar), which is important when piping to jq
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pretty Print JSON with jq</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Pipe curl output to jq to pretty-print JSON:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Result:</strong> jq automatically formats JSON with proper indentation and colors (if terminal supports it)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Extract Specific Fields</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Use jq filters to extract specific fields from JSON:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># Extract all user names</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq ".users[].name"
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># Extract first user's email</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq ".users[0].email"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Filter and Transform Data</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Use jq to filter arrays and transform data:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># Filter users by age</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq ".users[] | select(.age &gt; 18)"
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># Create new object with selected fields</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800">
                        <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq ".users[] | {"{"}"name": .name, "age": .age{"}"}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Add Authentication</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Use curl headers for API authentication:
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># Bearer token authentication</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600">$</span> curl -s -H "Authorization: Bearer YOUR_TOKEN" "https://api.example.com/users" | jq
                      </p>
                      <p className="text-xs font-mono text-gray-800 mb-2">
                        <span className="text-green-600"># API key authentication</span>
                      </p>
                      <p className="text-xs font-mono text-gray-800">
                        <span className="text-green-600">$</span> curl -s -H "X-API-Key: YOUR_KEY" "https://api.example.com/users" | jq
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common jq Filters for API Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Filter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">.</td>
                      <td className="border border-gray-300 px-4 py-2">Pretty print entire JSON</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq .</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">.field</td>
                      <td className="border border-gray-300 px-4 py-2">Access object field</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq .name</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">.[]</td>
                      <td className="border border-gray-300 px-4 py-2">Iterate array</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq .users[]</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">.[0]</td>
                      <td className="border border-gray-300 px-4 py-2">First array element</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq .users[0]</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">select(.condition)</td>
                      <td className="border border-gray-300 px-4 py-2">Filter by condition</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq "select(.age &gt; 18)"</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">map(.field)</td>
                      <td className="border border-gray-300 px-4 py-2">Transform array</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq "map(.name)"</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">-r</td>
                      <td className="border border-gray-300 px-4 py-2">Raw output (no quotes)</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">jq -r .name</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Benefits of Using curl and jq for API Consumption</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Using curl and jq for consuming Web API JSON data offers several significant benefits:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Fast and Lightweight</h3>
                </div>
                <p className="text-sm text-gray-700">
                  curl and jq are extremely fast and lightweight. They don't require heavy GUI applications or complex dependencies. curl is written in C and jq is also written in C, making them much faster than interpreted languages for API requests and JSON processing.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Impact:</strong> Process large API responses quickly, use minimal system resources, perfect for automation
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Scriptable and Automatable</h3>
                </div>
                <p className="text-sm text-gray-700">
                  curl and jq are perfect for automation. They work seamlessly in bash scripts, can be integrated into CI/CD pipelines, and can be combined with other command-line tools. This makes them ideal for automated testing, monitoring, and data processing.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Impact:</strong> Automate API testing, integrate into workflows, reduce manual work
                </p>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Powerful JSON Processing</h3>
                </div>
                <p className="text-sm text-gray-700">
                  jq provides powerful JSON processing capabilities. You can filter, transform, extract, and manipulate JSON data in ways that would require complex code in other languages. jq's filter syntax is expressive and allows for complex data transformations.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Impact:</strong> Extract specific data easily, transform JSON structures, filter large datasets efficiently
                </p>
              </div>

              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Cross-Platform</h3>
                </div>
                <p className="text-sm text-gray-700">
                  curl and jq work on Linux, macOS, Windows (with WSL or Git Bash), and most Unix-like systems. This cross-platform compatibility means you can use the same commands and scripts across different environments, making your workflows portable.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Impact:</strong> Consistent workflows across platforms, easy team collaboration, portable scripts
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comparison: curl + jq vs Alternatives</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Feature</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">curl + jq</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Postman</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Python requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Speed</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Very Fast</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ GUI overhead</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Slower (interpreted)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Automation</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Excellent</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Limited</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Good</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Dependencies</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Minimal</td>
                      <td className="border border-gray-300 px-4 py-2">❌ Heavy app</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Python + libs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">JSON Processing</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Powerful (jq)</td>
                      <td className="border border-gray-300 px-4 py-2">⚠️ Basic</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Good</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">CLI Integration</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Native</td>
                      <td className="border border-gray-300 px-4 py-2">❌ GUI only</td>
                      <td className="border border-gray-300 px-4 py-2">✅ Good</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 1: Fetch and Display User Data</h3>
                <div className="bg-white p-4 rounded-lg border border-blue-200 mt-2">
                  <p className="text-xs font-mono text-gray-800 mb-2">
                    <span className="text-green-600"># Fetch users and display names</span>
                  </p>
                  <p className="text-xs font-mono text-gray-800">
                    <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq -r ".users[] | .name"
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  This command fetches user data from an API and extracts just the names, outputting them as plain text (no JSON quotes) thanks to the `-r` flag.
                </p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 2: Filter and Count Active Users</h3>
                <div className="bg-white p-4 rounded-lg border border-green-200 mt-2">
                  <p className="text-xs font-mono text-gray-800 mb-2">
                    <span className="text-green-600"># Count active users (status = "active")</span>
                  </p>
                  <p className="text-xs font-mono text-gray-800">
                    <span className="text-green-600">$</span> curl -s "https://api.example.com/users" | jq "[.users[] | select(.status == \"active\")] | length"
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  This command filters users by status, creates an array of active users, and counts them using jq's `length` function.
                </p>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 3: Extract Data with Authentication</h3>
                <div className="bg-white p-4 rounded-lg border border-purple-200 mt-2">
                  <p className="text-xs font-mono text-gray-800 mb-2">
                    <span className="text-green-600"># Fetch protected data with Bearer token</span>
                  </p>
                  <p className="text-xs font-mono text-gray-800">
                    <span className="text-green-600">$</span> curl -s -H "Authorization: Bearer $TOKEN" "https://api.example.com/data" | jq ".results"
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  This command uses environment variable `$TOKEN` for authentication and extracts the `results` field from the API response.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Consuming Web API JSON Data Using curl and jq: Complete Guide 2026"
            description="Learn How to Fetch, Parse, and Process JSON Data from APIs Using curl and jq"
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>

        <section className="mt-12">
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}
