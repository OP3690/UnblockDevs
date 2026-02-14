'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Server, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, FileCode } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Unexpected token &lt; in JSON at position 0" (API Returns HTML)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing JSON Parse Errors When API Returns HTML (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Unexpected token &lt; in JSON at position 0&quot; (API Returns HTML)"
        description="Complete Guide to Fixing JSON Parse Errors When API Returns HTML (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Unexpected token < in JSON at position 0" error?',
              answer: 'This error occurs when you try to parse HTML as JSON. The "<" character is the first character of HTML tags (<html>, <body>). Common causes include: API returning HTML error pages instead of JSON, wrong Content-Type header (text/html instead of application/json), API redirects to HTML pages, CORS errors returning HTML, and API endpoints returning HTML by default.',
            },
            {
              question: 'How do I fix API returning HTML instead of JSON?',
              answer: 'Check the API endpoint URL is correct, verify Content-Type header is application/json, check for API errors (4xx/5xx status codes), handle redirects properly, ensure CORS is configured correctly, and check response status before parsing. Use response.headers.get("content-type") to verify the response type before calling response.json().',
            },
            {
              question: 'Why does my API return HTML error page?',
              answer: 'APIs return HTML error pages when: the endpoint doesn\'t exist (404), authentication fails (401/403), server errors occur (500), the API is down, CORS blocks the request, or the server is misconfigured. HTML error pages are default server responses, while JSON APIs should return JSON error responses.',
            },
            {
              question: 'How do I check if API response is JSON or HTML?',
              answer: 'Check the Content-Type header: response.headers.get("content-type") should be "application/json". Check response status: response.ok should be true. Inspect response text: const text = await response.text(); if (text.startsWith("<")) it\'s HTML. Use try-catch around JSON.parse() to handle parsing errors gracefully.',
            },
            {
              question: 'How do I handle API errors that return HTML?',
              answer: 'Check response status before parsing: if (!response.ok) throw error. Check Content-Type: if (!response.headers.get("content-type")?.includes("json")) handle as HTML. Use response.text() first to inspect, then parse conditionally. Implement proper error handling with try-catch blocks and user-friendly error messages.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is "Unexpected token &lt; in JSON at position 0" Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Unexpected token &lt; in JSON at position 0"</strong> is a JavaScript error that occurs when you try to parse HTML as JSON using <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> or <code className="bg-gray-100 px-1 rounded">response.json()</code>. The error happens because HTML starts with the <code className="bg-gray-100 px-1 rounded">&lt;</code> character (from tags like <code className="bg-gray-100 px-1 rounded">&lt;html&gt;</code>, <code className="bg-gray-100 px-1 rounded">&lt;body&gt;</code>), which is not valid JSON syntax.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error typically occurs when an API endpoint returns an HTML error page (like a 404 Not Found page, 500 Internal Server Error page, or CORS error page) instead of the expected JSON response. When your code tries to parse this HTML as JSON, JavaScript throws the "Unexpected token" error because HTML is not valid JSON.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The error is common in web development when making API requests with fetch() or axios, especially when API endpoints are incorrect, servers return error pages, Content-Type headers are wrong, or CORS issues occur. Understanding and fixing this error is essential for robust API integration and error handling.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Unexpected token &lt; in JSON at position 0" occurs when trying to parse HTML as JSON. This happens when APIs return HTML error pages instead of JSON responses. The solution is to check Content-Type headers, verify API endpoints, and handle errors properly before parsing.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding the Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The "Unexpected token &lt; in JSON at position 0" error involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-blue-600" />
                  HTML Error Pages
                </h3>
                <p className="text-gray-700 text-sm mb-2">When APIs encounter errors (404, 500, CORS), servers often return HTML error pages instead of JSON. These HTML pages start with <code className="bg-gray-100 px-1 rounded">&lt;html&gt;</code> or <code className="bg-gray-100 px-1 rounded">&lt;!DOCTYPE html&gt;</code>, which causes JSON parsing to fail. HTML error pages are default server responses, not API responses.</p>
                <p className="text-gray-600 text-xs">Example: API returns &lt;html&gt;&lt;body&gt;404 Not Found&lt;/body&gt;&lt;/html&gt; instead of {"{"}"error": "Not found"{"}"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-green-600" />
                  Wrong Content-Type Header
                </h3>
                <p className="text-gray-700 text-sm mb-2">APIs should return <code className="bg-gray-100 px-1 rounded">Content-Type: application/json</code> for JSON responses. When servers return <code className="bg-gray-100 px-1 rounded">Content-Type: text/html</code>, browsers and code expect HTML, but if you try to parse it as JSON, you get the error. Wrong Content-Type headers are common in misconfigured APIs.</p>
                <p className="text-gray-600 text-xs">Example: API sets Content-Type: text/html but returns JSON, or vice versa</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  API Redirects
                </h3>
                <p className="text-gray-700 text-sm mb-2">When APIs redirect (301, 302) to HTML pages (like login pages, error pages), the final response is HTML, not JSON. Fetch API follows redirects automatically, so you might get HTML from a redirect instead of JSON from the original endpoint. Redirects to HTML pages cause JSON parsing to fail.</p>
                <p className="text-gray-600 text-xs">Example: API redirects to /login.html or /error.html instead of returning JSON</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  JSON Parsing
                </h3>
                <p className="text-gray-700 text-sm mb-2">JavaScript's <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> and <code className="bg-gray-100 px-1 rounded">response.json()</code> expect valid JSON strings. When they encounter HTML (starting with <code className="bg-gray-100 px-1 rounded">&lt;</code>), parsing fails immediately with "Unexpected token" error. JSON parsing is strict and doesn't accept HTML syntax.</p>
                <p className="text-gray-600 text-xs">Example: JSON.parse("&lt;html&gt;...") throws "Unexpected token &lt;" error</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding HTML error pages, Content-Type headers, API redirects, and JSON parsing is key to fixing this error. The main issue is that APIs return HTML when they should return JSON, causing parsing to fail.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When This Error Occurs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Wrong API Endpoint URL</h3>
                  <p className="text-gray-700 text-sm">When the API endpoint URL is incorrect (typo, wrong path, missing parameters), servers return 404 HTML error pages instead of JSON. Your code tries to parse the HTML 404 page as JSON, causing the error. Always verify API endpoint URLs are correct.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Server Errors</h3>
                  <p className="text-gray-700 text-sm">When API servers encounter errors (500 Internal Server Error, database errors, crashes), they often return HTML error pages instead of JSON error responses. Your code receives HTML error pages and tries to parse them as JSON, causing the error.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">CORS Errors</h3>
                  <p className="text-gray-700 text-sm">When CORS (Cross-Origin Resource Sharing) blocks API requests, browsers sometimes return HTML error pages or CORS error responses. These HTML responses are parsed as JSON, causing the error. CORS errors often return HTML instead of JSON error responses.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Authentication Failures</h3>
                  <p className="text-gray-700 text-sm">When API authentication fails (401 Unauthorized, 403 Forbidden), servers often redirect to HTML login pages or return HTML error pages. Your code receives HTML instead of JSON, causing parsing errors. Authentication failures commonly return HTML responses.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> This error is most common when API endpoints are wrong, servers return error pages, CORS blocks requests, or authentication fails. The main issue is receiving HTML when expecting JSON, causing JSON parsing to fail.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix the Error</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Unexpected token &lt; in JSON at position 0" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Check Content-Type Before Parsing</h3>
              <p className="text-gray-700 mb-4">Verify the response is JSON before parsing:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Safe JSON Parsing with Content-Type Check</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchApiData(url) {
  try {
    const response = await fetch(url);
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Check Content-Type header
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(\`API returned HTML instead of JSON. Response: \${text.substring(0, 100)}\`);
    }
    
    // Parse JSON safely
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('JSON parse error - API returned HTML:', error);
      throw new Error('API returned HTML instead of JSON. Check endpoint URL and server configuration.');
    }
    throw error;
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Inspect Response Text First</h3>
              <p className="text-gray-700 mb-4">Check response content before parsing:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Inspect Response Before Parsing</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function safeFetchJson(url) {
  const response = await fetch(url);
  const text = await response.text();
  
  // Check if response is HTML
  if (text.trim().startsWith('<')) {
    console.error('API returned HTML:', text.substring(0, 200));
    throw new Error('API returned HTML instead of JSON. Check endpoint URL.');
  }
  
  // Parse JSON
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    console.error('Response text:', text.substring(0, 200));
    throw new Error('Failed to parse JSON. Response may be HTML or invalid JSON.');
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Handle API Errors Properly</h3>
              <p className="text-gray-700 mb-4">Check response status and handle errors:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Proper Error Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`async function fetchWithErrorHandling(url) {
  const response = await fetch(url);
  
  // Check response status
  if (!response.ok) {
    // Try to get error message from response
    const contentType = response.headers.get('content-type');
    let errorMessage = \`HTTP \${response.status}: \${response.statusText}\`;
    
    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Response is not JSON, might be HTML
        const text = await response.text();
        errorMessage = \`Server returned HTML error page: \${text.substring(0, 100)}\`;
      }
    }
    
    throw new Error(errorMessage);
  }
  
  // Verify Content-Type
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API did not return JSON. Content-Type: ' + contentType);
  }
  
  return await response.json();
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Fix API Server Configuration</h3>
              <p className="text-gray-700 mb-4">Ensure API returns JSON, not HTML:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Express.js - Return JSON Errors</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const express = require('express');
const app = express();

// Middleware to ensure JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Error handler - return JSON, not HTML
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// 404 handler - return JSON, not HTML
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
    path: req.path
  });
});`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Flask - Return JSON Errors</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

# Error handler - return JSON
@app.errorhandler(HTTPException)
def handle_exception(e):
    return jsonify({
        'error': e.description,
        'status': e.code
    }), e.code

# 404 handler - return JSON
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Not Found',
        'status': 404
    }), 404`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always check Content-Type headers before parsing JSON, verify response status, inspect response text when errors occur, and configure APIs to return JSON error responses instead of HTML. Use try-catch blocks and provide user-friendly error messages.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why This Error Happens</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Unexpected token &lt; in JSON at position 0" happens for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Default Server Behavior
                </h3>
                <p className="text-gray-700 text-sm">Web servers default to returning HTML error pages (404.html, 500.html) when errors occur. APIs should return JSON, but misconfigured servers return HTML by default. This causes JSON parsing to fail when code expects JSON but receives HTML.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-green-600" />
                  Missing Error Handling
                </h3>
                <p className="text-gray-700 text-sm">Code often assumes APIs always return JSON without checking Content-Type headers or response status. When APIs return HTML error pages, code tries to parse HTML as JSON, causing errors. Proper error handling and Content-Type checks prevent this.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  API Misconfiguration
                </h3>
                <p className="text-gray-700 text-sm">APIs may be misconfigured to return HTML instead of JSON, have wrong Content-Type headers, or redirect to HTML pages. API endpoints might not exist, causing 404 HTML pages. Server configuration issues cause APIs to return HTML when they should return JSON.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  JSON Parsing Strictness
                </h3>
                <p className="text-gray-700 text-sm">JavaScript&apos;s JSON.parse() is strict and fails immediately when encountering invalid JSON. HTML starts with &quot;&lt;&quot; which is not valid JSON syntax, causing immediate parsing failure. JSON parsers don&apos;t accept HTML, requiring proper content validation before parsing.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> "Unexpected token &lt; in JSON at position 0" happens because APIs return HTML instead of JSON, servers default to HTML error pages, code doesn't check Content-Type, and JSON parsing is strict. The solution is to verify Content-Type, check response status, and handle errors properly.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What causes "Unexpected token &lt; in JSON at position 0" error?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when you try to parse HTML as JSON. The "&lt;" character is the first character of HTML tags (&lt;html&gt;, &lt;body&gt;). Common causes include: API returning HTML error pages instead of JSON, wrong Content-Type header (text/html instead of application/json), API redirects to HTML pages, CORS errors returning HTML, and API endpoints returning HTML by default.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix API returning HTML instead of JSON?</h3>
                <p className="text-gray-700 leading-relaxed">Check the API endpoint URL is correct, verify Content-Type header is application/json, check for API errors (4xx/5xx status codes), handle redirects properly, ensure CORS is configured correctly, and check response status before parsing. Use response.headers.get("content-type") to verify the response type before calling response.json().</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does my API return HTML error page?</h3>
                <p className="text-gray-700 leading-relaxed">APIs return HTML error pages when: the endpoint doesn't exist (404), authentication fails (401/403), server errors occur (500), the API is down, CORS blocks the request, or the server is misconfigured. HTML error pages are default server responses, while JSON APIs should return JSON error responses.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I check if API response is JSON or HTML?</h3>
                <p className="text-gray-700 leading-relaxed">Check the Content-Type header: response.headers.get("content-type") should be "application/json". Check response status: response.ok should be true. Inspect response text: const text = await response.text(); if (text.startsWith("&lt;")) it's HTML. Use try-catch around JSON.parse() to handle parsing errors gracefully.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle API errors that return HTML?</h3>
                <p className="text-gray-700 leading-relaxed">Check response status before parsing: if (!response.ok) throw error. Check Content-Type: if (!response.headers.get("content-type")?.includes("json")) handle as HTML. Use response.text() first to inspect, then parse conditionally. Implement proper error handling with try-catch blocks and user-friendly error messages.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Unexpected token &lt; in JSON at position 0&quot; (API Returns HTML)"
            description="Complete Guide to Fixing JSON Parse Errors When API Returns HTML (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Unexpected token < in JSON Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
