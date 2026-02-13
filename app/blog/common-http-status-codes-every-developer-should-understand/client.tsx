'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Info, Server, Shield, BookOpen, Zap, Globe } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Common HTTP Status Codes Every Developer Should Understand</h1>
          <p className="text-sm text-gray-500 mt-1">Complete guide to HTTP status codes: 200, 400, 404, 500, and more</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Common HTTP Status Codes Every Developer Should Understand"
        description="Learn all HTTP status codes: 200, 400, 404, 500. Understand what each code means and when to use them."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              HTTP status codes are three-digit numbers returned by web servers to indicate the result of an HTTP request. 
              Understanding these codes is crucial for building robust applications, debugging API issues, and providing better user experiences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn about all major HTTP status codes, what they mean, when to use them, 
              and how to handle them in your applications. We'll cover success codes (2xx), client errors (4xx), server errors (5xx), 
              and more.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate API responses 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to format response data.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Are HTTP Status Codes?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>HTTP Status Codes</strong> are standardized three-digit numbers that indicate the outcome of an HTTP request. 
              They are part of the HTTP response message and tell the client whether the request was successful, failed, or needs further action.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Status codes are organized into five categories based on their first digit:
            </p>
            <div className="grid md:grid-cols-5 gap-3 mb-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">2xx</div>
                <div className="text-sm text-gray-700">Success</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">3xx</div>
                <div className="text-sm text-gray-700">Redirect</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">4xx</div>
                <div className="text-sm text-gray-700">Client Error</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">5xx</div>
                <div className="text-sm text-gray-700">Server Error</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-600 mb-1">1xx</div>
                <div className="text-sm text-gray-700">Informational</div>
              </div>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Status Codes Should You Know?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While there are over 60 HTTP status codes, developers typically encounter about 15-20 regularly. 
              Here are the most important ones you should memorize:
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Status Codes</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700"><strong>200 OK</strong> - Request succeeded</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700"><strong>201 Created</strong> - Resource created</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700"><strong>400 Bad Request</strong> - Invalid request</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700"><strong>401 Unauthorized</strong> - Authentication required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700"><strong>403 Forbidden</strong> - Access denied</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700"><strong>404 Not Found</strong> - Resource not found</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700"><strong>500 Internal Server Error</strong> - Server error</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700"><strong>503 Service Unavailable</strong> - Service down</span>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Status Code</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use status codes appropriately based on the request outcome:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  2xx Success Codes - When Request Succeeds
                </h3>
                <p className="text-gray-700 text-sm">Use when the request was processed successfully</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  4xx Client Errors - When Client Made a Mistake
                </h3>
                <p className="text-gray-700 text-sm">Use when the request is invalid, unauthorized, or resource doesn't exist</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-red-600" />
                  5xx Server Errors - When Server Failed
                </h3>
                <p className="text-gray-700 text-sm">Use when the server encountered an error processing the request</p>
              </div>
            </div>
          </section>

          {/* How - Detailed Status Codes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use HTTP Status Codes: Complete Reference</h2>
            
            {/* 2xx Success Codes */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                2xx Success Codes
              </h3>
              
              <div className="space-y-4">
                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded font-bold">200</div>
                    <h4 className="text-lg font-semibold text-gray-900">OK</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Standard success response for GET, PUT, PATCH requests</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Fetching user data, updating a resource</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-2">
                    <div>GET /api/users/123</div>
                    <div className="text-blue-400">→ 200 OK</div>
                    <div>{'{'} "id": 123, "name": "John" {'}'}</div>
                  </div>
                </div>

                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded font-bold">201</div>
                    <h4 className="text-lg font-semibold text-gray-900">Created</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Resource was successfully created (POST requests)</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Creating a new user, adding a blog post</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-2">
                    <div>POST /api/users</div>
                    <div className="text-blue-400">→ 201 Created</div>
                    <div>Location: /api/users/456</div>
                  </div>
                </div>

                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded font-bold">204</div>
                    <h4 className="text-lg font-semibold text-gray-900">No Content</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Request succeeded but no content to return (DELETE requests)</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Deleting a resource</p>
                </div>
              </div>
            </div>

            {/* 4xx Client Errors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                4xx Client Error Codes
              </h3>
              
              <div className="space-y-4">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold">400</div>
                    <h4 className="text-lg font-semibold text-gray-900">Bad Request</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Request syntax is invalid or malformed</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Missing required fields, invalid JSON, wrong data types</p>
                  <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm mt-2">
                    <div>POST /api/users</div>
                    <div>{'{'} "name": "John" {'}'} // Missing required "email" field</div>
                    <div className="text-red-400">→ 400 Bad Request</div>
                    <div>{'{'} "error": "Missing required field: email" {'}'}</div>
                  </div>
                </div>

                <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-600 text-white px-3 py-1 rounded font-bold">401</div>
                    <h4 className="text-lg font-semibold text-gray-900">Unauthorized</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Authentication is required or failed</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Missing or invalid authentication token</p>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded font-mono text-sm mt-2">
                    <div>GET /api/profile</div>
                    <div>// No Authorization header</div>
                    <div className="text-yellow-400">→ 401 Unauthorized</div>
                    <div>{'{'} "error": "Authentication required" {'}'}</div>
                  </div>
                </div>

                <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 text-white px-3 py-1 rounded font-bold">403</div>
                    <h4 className="text-lg font-semibold text-gray-900">Forbidden</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> User is authenticated but lacks permission</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Regular user trying to access admin endpoint</p>
                </div>

                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold">404</div>
                    <h4 className="text-lg font-semibold text-gray-900">Not Found</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Requested resource doesn't exist</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> User ID doesn't exist, wrong URL path</p>
                  <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm mt-2">
                    <div>GET /api/users/999</div>
                    <div>// User 999 doesn't exist</div>
                    <div className="text-red-400">→ 404 Not Found</div>
                    <div>{'{'} "error": "User not found" {'}'}</div>
                  </div>
                </div>

                <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-600 text-white px-3 py-1 rounded font-bold">429</div>
                    <h4 className="text-lg font-semibold text-gray-900">Too Many Requests</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Rate limit exceeded</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Too many API requests in a short time</p>
                </div>
              </div>
            </div>

            {/* 5xx Server Errors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Server className="w-6 h-6 text-red-600" />
                5xx Server Error Codes
              </h3>
              
              <div className="space-y-4">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold">500</div>
                    <h4 className="text-lg font-semibold text-gray-900">Internal Server Error</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Generic server error, unexpected condition</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Database connection failed, unhandled exception</p>
                  <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm mt-2">
                    <div>POST /api/users</div>
                    <div>// Database connection error</div>
                    <div className="text-red-400">→ 500 Internal Server Error</div>
                    <div>{'{'} "error": "Internal server error" {'}'}</div>
                  </div>
                </div>

                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold">502</div>
                    <h4 className="text-lg font-semibold text-gray-900">Bad Gateway</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Server acting as gateway received invalid response</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Upstream server is down or unreachable</p>
                </div>

                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold">503</div>
                    <h4 className="text-lg font-semibold text-gray-900">Service Unavailable</h4>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>When to use:</strong> Server is temporarily unavailable (maintenance, overload)</p>
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Server under maintenance, too many concurrent requests</p>
                </div>
              </div>
            </div>
          </section>

          {/* Status Code Flow Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">HTTP Status Code Decision Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">Start</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">HTTP Request Received</h4>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">?</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Is request valid?</h4>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-gray-700">No → 400 Bad Request</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-gray-700">Resource missing → 404 Not Found</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-gray-700">Not authenticated → 401 Unauthorized</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-gray-700">No permission → 403 Forbidden</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Yes, GET/PUT → 200 OK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Yes, POST → 201 Created</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Yes, DELETE → 204 No Content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-gray-700">Server error → 500/502/503</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Status Code Categories Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">HTTP Status Code Categories Reference</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Code Range</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Meaning</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Common Codes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">200-299</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Success</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Request was successful</td>
                    <td className="px-4 py-3 text-sm text-gray-700">200, 201, 204</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">300-399</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Redirect</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Further action needed</td>
                    <td className="px-4 py-3 text-sm text-gray-700">301, 302, 304</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">400-499</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Client Error</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Request was invalid</td>
                    <td className="px-4 py-3 text-sm text-gray-700">400, 401, 403, 404, 429</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">500-599</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Server Error</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Server failed to process</td>
                    <td className="px-4 py-3 text-sm text-gray-700">500, 502, 503</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why HTTP Status Codes Matter</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Globe className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better Error Handling</h3>
                <p className="text-gray-700 text-sm">Clients can handle different error types appropriately based on status codes</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Improved Debugging</h3>
                <p className="text-gray-700 text-sm">Status codes immediately tell you what went wrong without reading error messages</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">API Standards</h3>
                <p className="text-gray-700 text-sm">Following HTTP standards makes your API predictable and easier to use</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Info className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">User Experience</h3>
                <p className="text-gray-700 text-sm">Proper status codes help build better error messages and user feedback</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Using HTTP Status Codes</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Appropriate Codes</h3>
                  <p className="text-gray-700 text-sm">Don't use 200 for errors. Use 400 for client errors, 500 for server errors</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Include Error Messages</h3>
                  <p className="text-gray-700 text-sm">Always include descriptive error messages in the response body, not just the status code</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Be Consistent</h3>
                  <p className="text-gray-700 text-sm">Use the same status codes for the same scenarios throughout your API</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Handle All Codes</h3>
                  <p className="text-gray-700 text-sm">Make sure your client code handles all possible status codes, not just 200</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between 400 and 500 status codes?',
                answer: '400 (Bad Request) indicates the client made an error (invalid data, missing fields). 500 (Internal Server Error) indicates the server encountered an error (database failure, unhandled exception).',
              },
              {
                question: 'When should I use 401 vs 403?',
                answer: 'Use 401 (Unauthorized) when authentication is required or failed. Use 403 (Forbidden) when the user is authenticated but lacks permission to access the resource.',
              },
              {
                question: 'Is it okay to return 200 with an error message?',
                answer: 'No. Always use appropriate status codes. Returning 200 with an error message is misleading and breaks HTTP standards. Use 400 for client errors, 500 for server errors.',
              },
              {
                question: 'What status code should I use for validation errors?',
                answer: 'Use 400 (Bad Request) for validation errors. Include detailed error messages in the response body explaining what validation failed.',
              },
              {
                question: 'How do I handle rate limiting?',
                answer: 'Return 429 (Too Many Requests) when rate limit is exceeded. Include Retry-After header to indicate when the client can retry.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Common HTTP Status Codes Every Developer Should Understand"
            description="Learn all HTTP status codes: 200, 400, 404, 500. Understand what each code means and when to use them."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
