'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileCode, CheckCircle, XCircle, AlertTriangle, BookOpen, Code, Zap, Shield, Lightbulb, Info } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
export default function JsonFormatStandardsGuideClient() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileCode className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON Format & Standards: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">RFC 8259 Compliance, Syntax Rules & Production-Grade Fixing</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="JSON Format & Standards: Complete Guide"
        description="RFC 8259 Compliance, Syntax Rules & Production-Grade Fixing"
        variant="floating"
      />


      {/* Main Content */}
      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                What is JSON Format?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                JSON (JavaScript Object Notation) is a lightweight data-interchange format defined by <strong>RFC 8259</strong>. 
                It's human-readable, language-independent, and widely used for APIs, configuration files, and data storage. 
                Understanding JSON format and standards is crucial for developers working with modern web applications.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This comprehensive guide covers everything you need to know about JSON format, standards, syntax rules, 
              common violations, and how to fix malformed JSON. Whether you're building APIs, working with data pipelines, 
              or debugging JSON parsing errors, this guide will help you master JSON format and standards.
            </p>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#what-is-json-fixing" className="text-blue-600 hover:underline">1. What JSON Fixing Actually Means</a></li>
              <li><a href="#canonical-rules" className="text-blue-600 hover:underline">2. Canonical JSON Rules (RFC 8259)</a></li>
              <li><a href="#structural-integrity" className="text-blue-600 hover:underline">3. Structural Integrity Rules</a></li>
              <li><a href="#parsing-detection" className="text-blue-600 hover:underline">4. Parsing-Based Detection Logic</a></li>
              <li><a href="#fixing-rules" className="text-blue-600 hover:underline">5. Logical Fixing Rules</a></li>
              <li><a href="#error-classification" className="text-blue-600 hover:underline">6. Error Classification Model</a></li>
              <li><a href="#production-algorithm" className="text-blue-600 hover:underline">7. Production-Grade Algorithm Design</a></li>
              <li><a href="#edge-cases" className="text-blue-600 hover:underline">8. Hard Edge Cases</a></li>
              <li><a href="#best-practices" className="text-blue-600 hover:underline">9. JSON Best Practices</a></li>
            </ul>
          </section>

          {/* Section 1: What JSON Fixing Means */}
          <section id="what-is-json-fixing" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              1. What "JSON Fixing" Actually Means
            </h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg mb-6">
              <p className="text-gray-800 font-semibold mb-2">⚠️ Important Distinction</p>
              <p className="text-gray-700 text-sm">
                <strong>JSON Fixing is NOT schema validation or data correction.</strong> It fixes format, not business logic.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              A JSON Fixer is a tool that:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
              <li><strong>Detects syntactic violations</strong> of the JSON standard (RFC 8259)</li>
              <li><strong>Detects structural inconsistencies</strong> like unclosed braces or brackets</li>
              <li><strong>Applies minimal, deterministic corrections</strong> that preserve the intended meaning</li>
              <li><strong>Outputs valid JSON</strong> without changing the data's semantic intent</li>
            </ol>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Golden Rule of JSON Fixing</h3>
              <p className="text-blue-800 text-lg font-bold">
                "Fix structure, preserve intent, never invent data"
              </p>
            </div>
          </section>

          {/* Section 2: Canonical JSON Rules */}
          <section id="canonical-rules" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              2. Canonical JSON Rules (RFC 8259 - The Ground Truth)
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              A JSON fixer must enforce all of these rules to be RFC 8259 compliant. These are the absolute requirements 
              that define valid JSON format.
            </p>

            {/* 2.1 Top-Level Structure */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.1 Top-Level Structure Rules</h3>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
                <p className="font-semibold text-green-900 mb-2">✅ Valid JSON must be exactly one of:</p>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                  <li>Object: <code className="bg-white px-2 py-1 rounded">{`{ ... }`}</code></li>
                  <li>Array: <code className="bg-white px-2 py-1 rounded">{`[ ... ]`}</code></li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
                <p className="font-semibold text-red-900 mb-2">❌ Invalid (not valid JSON):</p>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`"hello"
123
true`}
                </pre>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Fix Strategy:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                  <li>If multiple roots → wrap in array: <code className="bg-white px-1 rounded">["hello", 123, true]</code></li>
                  <li>If plain text → quote it: <code className="bg-white px-1 rounded">"hello"</code></li>
                  <li>If key:value without braces → wrap in object: <code className="bg-white px-1 rounded">{`{"key": "value"}`}</code></li>
                </ul>
              </div>
            </div>

            {/* 2.2 Object Rules */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.2 Object Rules</h3>
              
              <div className="bg-gray-50 rounded-lg p-5 mb-4">
                <p className="font-semibold text-gray-900 mb-3">Valid Object Example:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "key": "value"
}`}
                </pre>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rule</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Keys must be strings</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Keys must be quoted with <code className="bg-gray-100 px-1 rounded">"</code></td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Colon between key and value</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Comma between pairs</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">No trailing comma</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">1. Unquoted Keys</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`{ name: "John" }`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix:</p>
                  <pre className="bg-white p-3 rounded text-sm">{`{ "name": "John" }`}</pre>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">2. Trailing Comma</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`{ "a": 1, }`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix: remove last comma</p>
                  <pre className="bg-white p-3 rounded text-sm">{`{ "a": 1 }`}</pre>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">3. Missing Colon</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`{ "a" 1 }`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix: insert <code className="bg-white px-1 rounded">:</code></p>
                  <pre className="bg-white p-3 rounded text-sm">{`{ "a": 1 }`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-yellow-900 mb-2">4. Duplicate Keys</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`{ "a": 1, "a": 2 }`}</pre>
                  <p className="text-yellow-800 text-sm mb-2">✅ Fix strategy (must choose one):</p>
                  <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                    <li>Keep last value (most parsers): <code className="bg-white px-1 rounded">{`{ "a": 2 }`}</code></li>
                    <li>OR flag as non-fixable ambiguity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2.3 Array Rules */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.3 Array Rules</h3>
              
              <div className="bg-gray-50 rounded-lg p-5 mb-4">
                <p className="font-semibold text-gray-900 mb-3">Valid Array Example:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm">{`[1, 2, 3]`}</pre>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">Trailing Comma</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`[1, 2, 3,]`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix: remove comma</p>
                  <pre className="bg-white p-3 rounded text-sm">{`[1, 2, 3]`}</pre>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-yellow-900 mb-2">Missing Comma</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`[1 2 3]`}</pre>
                  <p className="text-yellow-800 text-sm mb-2">✅ Fix: infer comma between values</p>
                  <pre className="bg-white p-3 rounded text-sm">{`[1, 2, 3]`}</pre>
                </div>
              </div>
            </div>

            {/* 2.4 String Rules */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.4 String Rules (Most Error-Prone)</h3>
              
              <div className="bg-gray-50 rounded-lg p-5 mb-4">
                <p className="font-semibold text-gray-900 mb-3">Valid String Example:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm">{`"Hello\\nWorld"`}</pre>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rule</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Must use double quotes</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Escape internal <code className="bg-gray-100 px-1 rounded">"</code></td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">No raw newlines</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Valid escape sequences only</td>
                      <td className="px-4 py-3 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200 mb-4">
                <p className="font-semibold text-blue-900 mb-2">Escape Sequences Allowed:</p>
                <code className="text-blue-800 text-sm">{`\\" \\\\ \\/ \\b \\f \\n \\r \\t \\uXXXX`}</code>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">Single Quotes</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`'hello'`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix:</p>
                  <pre className="bg-white p-3 rounded text-sm">{`"hello"`}</pre>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">Unescaped Quotes</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`"She said "hi""`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix:</p>
                  <pre className="bg-white p-3 rounded text-sm">{`"She said \\"hi\\""`}</pre>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">Raw Newline</p>
                  <pre className="bg-white p-3 rounded text-sm mb-2">{`"hello
world"`}</pre>
                  <p className="text-red-800 text-sm mb-2">✅ Fix:</p>
                  <pre className="bg-white p-3 rounded text-sm">{`"hello\\nworld"`}</pre>
                </div>
              </div>
            </div>

            {/* 2.5 Number Rules */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.5 Number Rules</h3>
              
              <div className="bg-gray-50 rounded-lg p-5 mb-4">
                <p className="font-semibold text-gray-900 mb-3">Valid Numbers:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm">{`-12
3.14
1e5`}</pre>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Invalid</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fix</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">01</code> (leading zero)</td>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">1</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">1.</code> (trailing dot)</td>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">1.0</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">NaN, Infinity</code></td>
                      <td className="px-4 py-3 text-sm text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">null</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2.6 Boolean & Null Rules */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2.6 Boolean & Null Rules</h3>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
                <p className="font-semibold text-green-900 mb-2">✅ Only allowed (case-sensitive):</p>
                <pre className="bg-white p-3 rounded text-sm">{`true
false
null`}</pre>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
                <p className="font-semibold text-red-900 mb-2">❌ Invalid:</p>
                <pre className="bg-white p-3 rounded text-sm mb-2">{`True
FALSE
None`}</pre>
                <p className="text-red-800 text-sm mb-2">✅ Fix:</p>
                <pre className="bg-white p-3 rounded text-sm">{`true
false
null`}</pre>
              </div>
            </div>
          </section>

          {/* Section 3: Structural Integrity */}
          <section id="structural-integrity" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              3. Structural Integrity Rules
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3.1 Balanced Tokens</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Every opening token must have a corresponding closing token:
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><code className="bg-gray-100 px-2 py-1 rounded">{`{`}</code> must have <code className="bg-gray-100 px-2 py-1 rounded">{`}`}</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">{`[`}</code> must have <code className="bg-gray-100 px-2 py-1 rounded">{`]`}</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">{`"`}</code> must be closed</li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Fix Strategy:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                  <li>Track stack of openings</li>
                  <li>Auto-insert missing closers at logical boundary</li>
                  <li>Prefer closing at end of structure</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3.2 Ordering Rules</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                JSON does not require ordering, but fixers should:
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>✅ Preserve original order</li>
                  <li>✅ Never reorder unless explicitly configured</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Parsing-Based Detection */}
          <section id="parsing-detection" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              4. Parsing-Based Detection Logic (Core Algorithm)
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Tokenize</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Recognize all JSON tokens:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <code className="text-sm">{`{ } [ ] , : " string number true false null`}</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Stateful Parse</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Maintain parsing state:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Stack of objects/arrays</li>
                  <li>Current expected token</li>
                  <li>String escape state</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Error Classification</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Each error must be classified as:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-semibold text-red-900 text-sm">Missing token</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-semibold text-red-900 text-sm">Extra token</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-semibold text-red-900 text-sm">Invalid token</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-semibold text-red-900 text-sm">Ambiguous intent</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Logical Fixing Rules */}
          <section id="fixing-rules" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              5. Logical Fixing Rules (Decision Tree)
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  5.1 Safe Auto-Fix (Always Fix)
                </h3>
                <p className="text-green-800 mb-3">These fixes are deterministic and safe to apply automatically:</p>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>✅ Trailing commas</li>
                  <li>✅ Unquoted keys</li>
                  <li>✅ Single quotes</li>
                  <li>✅ Missing closing braces</li>
                  <li>✅ Invalid booleans/null</li>
                  <li>✅ Escaping strings</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  5.2 Heuristic Fix (Fix with Assumptions)
                </h3>
                <p className="text-yellow-800 mb-3">These fixes require assumptions and should be applied carefully:</p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li>⚠️ Missing commas</li>
                  <li>⚠️ Missing colons</li>
                  <li>⚠️ Root-level fragments</li>
                </ul>
                <div className="mt-3 bg-white rounded p-3 border border-yellow-200">
                  <p className="text-yellow-900 font-semibold text-sm">Rule:</p>
                  <p className="text-yellow-800 text-sm">Apply minimal insertion that restores validity</p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  5.3 Non-Fixable (Must Report)
                </h3>
                <p className="text-red-800 mb-3">These errors cannot be automatically fixed:</p>
                <div className="space-y-3">
                  <div className="bg-white rounded p-3 border border-red-200">
                    <p className="text-red-900 font-semibold text-sm mb-1">Conflicting structures:</p>
                    <pre className="text-xs bg-gray-50 p-2 rounded">{`{ "a": [1, 2 }`}</pre>
                  </div>
                  <div className="bg-white rounded p-3 border border-red-200">
                    <p className="text-red-900 font-semibold text-sm mb-1">Semantic ambiguity:</p>
                    <pre className="text-xs bg-gray-50 p-2 rounded">{`{ "a" "b" "c" }`}</pre>
                  </div>
                </div>
                <p className="text-red-800 text-sm mt-3">
                  <strong>Fixer must stop and explain, not guess.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Error Classification */}
          <section id="error-classification" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileCode className="w-8 h-8 text-blue-600" />
              6. Error Classification Model
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Every issue must map to one category. Here's a production-grade error classification system:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E001</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Unclosed structure</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Missing closing brace or bracket</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E002</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Trailing comma</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Comma before closing bracket/brace</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E003</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Missing comma</td>
                    <td className="px-4 py-3 text-sm text-gray-600">No comma between values</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E004</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Missing colon</td>
                    <td className="px-4 py-3 text-sm text-gray-600">No colon between key and value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E005</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Invalid string</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Unescaped quotes, raw newlines</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E006</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Invalid number</td>
                    <td className="px-4 py-3 text-sm text-gray-600">NaN, Infinity, leading zeros</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E007</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Invalid literal</td>
                    <td className="px-4 py-3 text-sm text-gray-600">True, FALSE, None instead of true, false, null</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E008</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Unquoted key</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Object key without quotes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E009</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Extra token</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Unexpected token in context</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">E010</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Root violation</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Invalid top-level structure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">Error Object Structure:</p>
              <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`{
  "code": "E003",
  "position": 124,
  "expected": ",",
  "found": "STRING",
  "context": "ARRAY"
}`}
              </pre>
            </div>
          </section>

          {/* Section 7: Production Algorithm */}
          <section id="production-algorithm" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              7. Production-Grade Algorithm Design
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">High-Level Architecture</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Raw Input   │</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Lexer       │  ← tolerant tokenizer</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Recovering  │  ← state machine + stack</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Parser      │</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Error Model │  ← classified issues</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Fix Engine  │  ← rule-based mutations</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Validator   │  ← strict RFC 8259</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────┬───────┘</div>
                <div className="bg-white p-3 rounded border border-gray-200">      ↓</div>
                <div className="bg-white p-3 rounded border border-gray-200">┌─────────────┐</div>
                <div className="bg-white p-3 rounded border border-gray-200">│ Output JSON │</div>
                <div className="bg-white p-3 rounded border border-gray-200">└─────────────┘</div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg mb-6">
              <p className="font-semibold text-yellow-900 mb-2">Key Principle:</p>
              <p className="text-yellow-800">
                The fixer never edits blindly. All fixes come from parser-detected expectations.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fix Engine Execution Order</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fixes must be applied in this specific order:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>String normalization</li>
                <li>Literal normalization</li>
                <li>Structural closure</li>
                <li>Comma/colon insertion</li>
                <li>Trailing comma removal</li>
                <li>Root correction</li>
              </ol>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
                <p className="text-blue-900 font-semibold text-sm">Why this order?</p>
                <p className="text-blue-800 text-sm">
                  Early fixes change token boundaries; late fixes assume stable structure.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Pseudocode</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
{`tokens = lex(input)
parser = new RecoveringParser()
errors = []

for token in tokens:
    expected = parser.expected()
    
    if token violates expected:
        error = classify(token, expected)
        errors.append(error)
        
        if fixable(error):
            applyFix(token, error)
        else:
            abort(error)
    
    parser.consume(token)

if parser.stack not empty:
    closeStructures(parser.stack)

output = serialize(parser.ast)

assert strictParse(output)
return output`}
              </pre>
            </div>
          </section>

          {/* Section 8: Edge Cases */}
          <section id="edge-cases" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-blue-600" />
              8. Hard Edge Cases (Handled Explicitly)
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">Case 1: Mixed Structures</h3>
                <pre className="bg-white p-4 rounded border border-red-200 text-sm mb-3">{`{ "a": [1, 2 }`}</pre>
                <p className="text-red-800 font-semibold">❌ Abort — ambiguous closure</p>
                <p className="text-red-700 text-sm mt-2">
                  The fixer cannot determine whether to close the array or object first. This requires manual intervention.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">Case 2: Duplicate Keys</h3>
                <pre className="bg-white p-4 rounded border border-yellow-200 text-sm mb-3">{`{ "a": 1, "a": 2 }`}</pre>
                <p className="text-yellow-800 font-semibold">✔ Keep last, emit warning</p>
                <p className="text-yellow-700 text-sm mt-2">
                  Most JSON parsers keep the last value for duplicate keys. The fixer should do the same but warn the user.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-900 mb-3">Case 3: Fragmented Root</h3>
                <pre className="bg-white p-4 rounded border border-green-200 text-sm mb-3">{`"a": 1,
"b": 2`}</pre>
                <p className="text-green-800 font-semibold">✔ Wrap in {}</p>
                <p className="text-green-700 text-sm mt-2">
                  When properties exist without an object wrapper, automatically wrap them in an object.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Best Practices */}
          <section id="best-practices" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              9. JSON Best Practices
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4">Fixing Policy (Non-Negotiable Rules)</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>✅ Never reorder keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>✅ Never invent keys or values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>✅ Never change numeric magnitude</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>✅ Never coerce types unless invalid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>✅ Never "fix" schema violations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Validation After Fix</h3>
                <p className="text-blue-800 mb-3">After applying fixes, always:</p>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 ml-4">
                  <li>Re-parse entire output</li>
                  <li>Ensure zero syntax errors</li>
                  <li>Ensure no fixer-introduced invalid JSON</li>
                  <li>Optional: pretty-print or minify</li>
                </ol>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Try Our JSON Fixer Tool</h2>
            <p className="text-blue-100 mb-6">
              Use our free online JSON Fixer to automatically detect and fix JSON syntax errors. 
              It follows RFC 8259 standards and provides detailed error reports.
            </p>
            <Link
              href="/?tab=fixer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Try JSON Fixer Now
            </Link>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related JSON Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">JSON Viewer & Formatter</h3>
                <p className="text-sm text-gray-600">View, format, and beautify JSON data with syntax highlighting</p>
              </Link>
              <Link
                href="/"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">JSON to Excel Converter</h3>
                <p className="text-sm text-gray-600">Convert nested JSON to Excel spreadsheets and CSV files</p>
              </Link>
              <Link
                href="/"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">JSON Schema Generator</h3>
                <p className="text-sm text-gray-600">Generate JSON schemas automatically from JSON data</p>
              </Link>
              <Link
                href="/"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">API Response Comparator</h3>
                <p className="text-sm text-gray-600">Compare two JSON responses and detect differences</p>
              </Link>
            </div>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try JSON Tools
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

