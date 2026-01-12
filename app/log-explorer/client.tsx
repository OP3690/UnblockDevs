'use client';

import Link from 'next/link';
import { ArrowLeft, FileSearch, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const LogExplorer = dynamic(() => import('@/components/tools/LogExplorer'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});

export default function LogExplorerClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Log Explorer - Analyze & Explore Logs Instantly</h1>
          <p className="text-sm text-gray-500 mt-1">Parse, filter, search, and analyze log files with ease</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Component */}
        <div className="mb-8">
          <LogExplorer />
        </div>

        {/* SEO Content Section - 1000-1200 words */}
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Problem Does Log Explorer Solve?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Log files are essential for debugging, monitoring, and understanding application behavior. However, log files can be 
              massive, unstructured, and difficult to navigate. Finding specific errors, tracking user actions, or analyzing 
              application performance requires powerful log exploration tools.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The core problem:</strong> Without proper log exploration tools, developers and DevOps engineers struggle with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Searching through thousands of log lines to find specific errors or events</li>
              <li>Understanding unstructured log formats and parsing log entries</li>
              <li>Filtering logs by time, severity, or keywords</li>
              <li>Identifying patterns and trends in log data</li>
              <li>Correlating events across multiple log entries</li>
              <li>Analyzing application performance and error rates</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Log Explorer solves all these problems by providing powerful log parsing, filtering, searching, and analysis 
              capabilities. It helps you quickly find what you're looking for, understand log patterns, and debug issues faster. 
              Whether you're dealing with structured JSON logs or unstructured text logs, our tool makes log analysis effortless.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Real-World Example</p>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Scenario:</strong> Your application is experiencing errors, and you need to find all ERROR-level log entries 
                from the last hour that contain "database connection".
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Solution:</strong> Upload your log file to our Log Explorer, filter by severity "ERROR", search for 
                "database connection", and instantly see all matching entries with timestamps and context.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Is Log Explorer For?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Log Explorer is essential for anyone who works with log files, whether for debugging, monitoring, or analysis:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Developers</h3>
                <p className="text-gray-700 mb-3">
                  Developers need to debug issues, trace errors, and understand application behavior through logs. A log explorer 
                  helps them quickly find relevant log entries, filter by criteria, and analyze error patterns.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Debugging errors, tracing user actions, analyzing application behavior, performance investigation
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">DevOps Engineers</h3>
                <p className="text-gray-700 mb-3">
                  DevOps engineers monitor application health, investigate incidents, and analyze system performance through logs. 
                  A log explorer helps them quickly identify issues, track system events, and analyze trends.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Incident investigation, system monitoring, performance analysis, security auditing
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">QA Engineers</h3>
                <p className="text-gray-700 mb-3">
                  QA engineers analyze logs to verify test results, identify bugs, and understand test failures. A log explorer 
                  helps them filter test-related logs, find error patterns, and document issues.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Test result analysis, bug investigation, test failure debugging, test coverage analysis
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Site Reliability Engineers (SRE)</h3>
                <p className="text-gray-700 mb-3">
                  SREs analyze logs to ensure system reliability, identify performance bottlenecks, and prevent incidents. A log 
                  explorer helps them monitor system health, analyze trends, and detect anomalies.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Reliability monitoring, performance optimization, incident prevention, trend analysis
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features of Our Log Explorer</h2>
            <div className="space-y-4">
              <div className="p-5 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Powerful Search & Filter</h3>
                <p className="text-gray-700 text-sm">
                  Search logs by keywords, filter by severity level, time range, or custom criteria. Find exactly what you're 
                  looking for in seconds, even in massive log files.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Structured & Unstructured Log Support</h3>
                <p className="text-gray-700 text-sm">
                  Works with both structured JSON logs and unstructured text logs. Automatically parses JSON logs and provides 
                  tools for analyzing text-based logs.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Pattern Detection</h3>
                <p className="text-gray-700 text-sm">
                  Identify patterns, trends, and anomalies in log data. Group similar log entries, detect recurring errors, 
                  and analyze log frequency.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Time-Based Analysis</h3>
                <p className="text-gray-700 text-sm">
                  Filter and analyze logs by time ranges. View logs chronologically, identify time-based patterns, and correlate 
                  events across different time periods.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy-First</h3>
                <p className="text-gray-700 text-sm">
                  All log analysis happens in your browser. No data is sent to servers. Your logs stay private and secure. 
                  Perfect for sensitive production logs or confidential information.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Guides and Resources</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn more about log analysis, debugging, and best practices with these comprehensive guides:
            </p>
            
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/structured-log-analysis-tools" className="text-blue-600 hover:text-blue-700 underline">
                    Structured Log Analysis: Tools and Techniques
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Master structured log analysis with modern tools. Learn how to parse, filter, and analyze logs effectively 
                  for debugging and monitoring applications.
                </p>
                <p className="text-xs text-gray-600">Covers: log analysis, structured logs, log parser, debugging tools</p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-debug-javascript-errors-using-browser-devtools" className="text-green-600 hover:text-green-700 underline">
                    How to Debug JavaScript Errors Using Browser DevTools
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to use browser DevTools to debug JavaScript errors, analyze console logs, and troubleshoot 
                  application issues effectively.
                </p>
                <p className="text-xs text-gray-600">Covers: JavaScript debugging, DevTools, error analysis, troubleshooting</p>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-debug-code-step-by-step-beginner-friendly-guide" className="text-purple-600 hover:text-purple-700 underline">
                    How to Debug Code Step by Step: Beginner-Friendly Guide
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Step-by-step guide to debugging code effectively. Learn debugging techniques, tools, and best practices 
                  for finding and fixing bugs.
                </p>
                <p className="text-xs text-gray-600">Covers: debugging techniques, code analysis, error handling, troubleshooting</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enhance your debugging and analysis workflow with these complementary tools:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/payload-analyzer" className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Payload Analyzer</h3>
                <p className="text-sm text-gray-700">Analyze API payloads and responses</p>
              </Link>
              <Link href="/json-beautifier" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Beautifier</h3>
                <p className="text-sm text-gray-700">Format and beautify JSON logs</p>
              </Link>
              <Link href="/api-comparator" className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">API Comparator</h3>
                <p className="text-sm text-gray-700">Compare API responses</p>
              </Link>
              <Link href="/json-validator" className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Validator</h3>
                <p className="text-sm text-gray-700">Validate structured JSON logs</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
