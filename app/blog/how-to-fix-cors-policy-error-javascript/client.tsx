'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Server } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function HowToFixCorsPolicyErrorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Fix "CORS Policy Error" in JavaScript (All Browsers)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to CORS Solutions & Troubleshooting (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Fix &quot;CORS Policy Error&quot; in JavaScript (All Browsers)"
        description="Complete Guide to CORS Solutions & Troubleshooting (2026)"
        variant="floating"
      />


      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is a CORS policy error?',
              answer: 'CORS (Cross-Origin Resource Sharing) policy error occurs when a web page tries to make a request to a different domain, protocol, or port than the one serving the page. Browsers block these requests for security reasons unless the server explicitly allows them with proper CORS headers like Access-Control-Allow-Origin.',
            },
            {
              question: 'How do I fix CORS policy error in JavaScript?',
              answer: 'To fix CORS errors, you can: 1) Configure the server to send proper CORS headers (Access-Control-Allow-Origin, Access-Control-Allow-Methods), 2) Use a proxy server to forward requests, 3) Use browser extensions for development (not recommended for production), or 4) Use JSONP for simple GET requests (legacy method). The proper solution is server-side CORS configuration.',
            },
            {
              question: 'Can I fix CORS error on the client side only?',
              answer: 'No, CORS errors cannot be fixed purely on the client side for security reasons. The server must send appropriate CORS headers to allow cross-origin requests. However, you can use proxy servers or browser extensions for development, but these are not solutions for production applications.',
            },
            {
              question: 'How do I fix CORS error in Chrome?',
              answer: 'For development, you can launch Chrome with --disable-web-security flag (not recommended for production). The proper fix is to configure your server to send CORS headers. For production, always fix CORS on the server side by adding Access-Control-Allow-Origin and related headers.',
            },
            {
              question: 'What CORS headers do I need to add?',
              answer: 'Essential CORS headers include: Access-Control-Allow-Origin (specifies allowed origins), Access-Control-Allow-Methods (allowed HTTP methods), Access-Control-Allow-Headers (allowed request headers), and Access-Control-Allow-Credentials (if using cookies/auth). Configure these on your server based on your security requirements.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is a CORS Policy Error?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>CORS (Cross-Origin Resource Sharing) policy error</strong> is a browser security mechanism that blocks web pages from making requests to a different domain, protocol, or port than the one serving the page. When a JavaScript application tries to fetch data from a different origin, the browser checks if the server allows such cross-origin requests by examining CORS headers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              CORS errors typically appear as messages like "Access to fetch at 'URL' from origin 'origin' has been blocked by CORS policy" or "No 'Access-Control-Allow-Origin' header is present on the requested resource." These errors occur because browsers enforce the Same-Origin Policy, which restricts web pages from accessing resources from different origins unless explicitly permitted.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Same-Origin Policy considers two URLs to have the same origin if they share the same protocol (http/https), domain (example.com), and port (80/443). Any difference in these components makes them different origins, requiring CORS headers for cross-origin requests to succeed.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> CORS is a browser security feature, not a bug. The proper fix requires server-side configuration to send appropriate CORS headers. Client-side workarounds are only suitable for development, not production.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding CORS Policy Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              CORS policy errors manifest in different ways:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Common Error Messages
                </h3>
                <p className="text-gray-700 text-sm mb-2">Typical CORS error messages include: "Access to fetch at 'URL' from origin 'origin' has been blocked by CORS policy", "No 'Access-Control-Allow-Origin' header is present", or "CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."</p>
                <p className="text-gray-600 text-xs">Error messages vary slightly by browser but indicate the same issue.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Server-Side Requirement
                </h3>
                <p className="text-gray-700 text-sm mb-2">CORS errors occur when the server doesn't send appropriate CORS headers. The server must explicitly allow cross-origin requests by sending headers like Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers.</p>
                <p className="text-gray-600 text-xs">CORS is enforced by browsers but configured on servers.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Security Mechanism
                </h3>
                <p className="text-gray-700 text-sm mb-2">CORS is a security feature that prevents malicious websites from accessing resources from other domains. It protects users from cross-site request forgery (CSRF) attacks and unauthorized data access.</p>
                <p className="text-gray-600 text-xs">CORS errors indicate the security system is working as intended.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Browser Enforcement
                </h3>
                <p className="text-gray-700 text-sm mb-2">All modern browsers (Chrome, Firefox, Safari, Edge) enforce CORS policies. The error occurs in the browser, but the solution requires server-side configuration. Client-side JavaScript cannot bypass CORS restrictions.</p>
                <p className="text-gray-600 text-xs">Browsers block requests that violate CORS policy.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> CORS errors cannot be fixed purely on the client side. The server must send appropriate CORS headers to allow cross-origin requests. Understanding this is crucial for proper troubleshooting.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When CORS Policy Errors Occur</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              CORS policy errors occur in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cross-Origin API Requests</h3>
                  <p className="text-gray-700 text-sm">When your frontend application (e.g., running on localhost:3000) tries to fetch data from an API on a different domain (e.g., api.example.com), CORS errors occur if the server doesn't allow cross-origin requests.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Different Protocols or Ports</h3>
                  <p className="text-gray-700 text-sm">Requests between http and https, or between different ports (e.g., localhost:3000 to localhost:8000) are considered cross-origin and require CORS headers, even if they're on the same domain.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Third-Party API Integration</h3>
                  <p className="text-gray-700 text-sm">When integrating with third-party APIs or services, CORS errors occur if those services don't send appropriate CORS headers. Some APIs require specific configuration or API keys for CORS access.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Development Environment Issues</h3>
                  <p className="text-gray-700 text-sm">During development, CORS errors are common when frontend and backend run on different ports or domains. This is normal and should be fixed with proper server-side CORS configuration.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> CORS errors are most common during development when frontend (localhost:3000) and backend (localhost:8000) run on different ports, or when deploying frontend and backend to different domains.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Solutions to Fix CORS Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix CORS policy errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Server-Side CORS Configuration (Recommended)</h3>
              <p className="text-gray-700 mb-4">The proper way to fix CORS errors is to configure your server to send appropriate CORS headers. Here are examples for different server technologies:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Node.js/Express Example</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm"><code>{`// Install cors package: npm install cors
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Or configure specific origins
app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Or for specific route
app.get('/api/data', cors({
  origin: 'https://yourdomain.com'
}), (req, res) => {
  res.json({ data: 'example' });
});`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Manual CORS Headers (Any Server)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm"><code>{`// Node.js/Express manual headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Python/Flask example
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="https://yourdomain.com")

# Or manual headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://yourdomain.com')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use a Proxy Server (Development)</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Proxy servers are suitable for development but not recommended for production. For production, always configure CORS on your server.
                </p>
              </div>
              <div className="space-y-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Next.js Proxy Configuration</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm"><code>{`// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};`}</code></pre>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Create React App Proxy</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm"><code>{`// package.json
{
  "name": "my-app",
  "proxy": "https://api.example.com"
}

// Then use relative URLs in your code
fetch('/api/data') // Proxied to https://api.example.com/api/data`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Browser Extensions (Development Only)</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                <p className="text-red-800 text-sm">
                  <strong>Warning:</strong> Browser extensions that disable CORS are for development only and should never be used in production. They disable important security features and should only be used for local development.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome: Launch with Disabled Security</h4>
                    <p className="text-gray-700 text-sm mb-2">For development only, launch Chrome with: <code className="bg-gray-100 px-1 rounded">chrome --disable-web-security --user-data-dir=/tmp/chrome_dev</code></p>
                    <p className="text-gray-600 text-xs">This disables CORS but also disables important security features. Use only for local development.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">CORS Browser Extensions</h4>
                    <p className="text-gray-700 text-sm mb-2">Extensions like "CORS Unblock" or "Allow CORS" can temporarily disable CORS for development. Install from Chrome Web Store, but remember to disable them after development.</p>
                    <p className="text-gray-600 text-xs">Never use these extensions for production or browsing regular websites.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Best Practice:</strong> Always fix CORS errors on the server side by configuring proper CORS headers. Client-side workarounds are only for development and should never be used in production applications.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Fix CORS Errors Properly</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fixing CORS errors properly is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Security Best Practices
                </h3>
                <p className="text-gray-700 text-sm">Proper CORS configuration maintains security while allowing necessary cross-origin requests. Disabling CORS entirely exposes your application to security vulnerabilities like CSRF attacks.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Production Readiness
                </h3>
                <p className="text-gray-700 text-sm">Client-side workarounds don't work in production. Proper server-side CORS configuration ensures your application works correctly for all users across all browsers and environments.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-600" />
                  Controlled Access
                </h3>
                <p className="text-gray-700 text-sm">Server-side CORS configuration allows you to control which origins can access your API, which methods are allowed, and which headers are permitted, providing fine-grained security control.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  Cross-Browser Compatibility
                </h3>
                <p className="text-gray-700 text-sm">Proper CORS configuration works consistently across all browsers (Chrome, Firefox, Safari, Edge). Browser-specific workarounds may not work for all users and can cause compatibility issues.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Security Warning:</strong> Never disable CORS entirely or use client-side workarounds in production. Always configure CORS properly on your server to maintain security while allowing necessary cross-origin requests.
              </p>
            </div>
          </section>

          {/* Common CORS Headers Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential CORS Headers Explained</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Access-Control-Allow-Origin</h3>
                <p className="text-gray-700 text-sm mb-2">Specifies which origins are allowed to access the resource. Use <code className="bg-gray-100 px-1 rounded">*</code> for public APIs (not recommended with credentials), or specify exact origins like <code className="bg-gray-100 px-1 rounded">https://yourdomain.com</code>.</p>
                <p className="text-gray-600 text-xs">Example: Access-Control-Allow-Origin: https://yourdomain.com</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Access-Control-Allow-Methods</h3>
                <p className="text-gray-700 text-sm mb-2">Specifies which HTTP methods are allowed for cross-origin requests. Common values: GET, POST, PUT, DELETE, PATCH, OPTIONS.</p>
                <p className="text-gray-600 text-xs">Example: Access-Control-Allow-Methods: GET, POST, PUT, DELETE</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Access-Control-Allow-Headers</h3>
                <p className="text-gray-700 text-sm mb-2">Specifies which headers can be used in cross-origin requests. Common headers: Content-Type, Authorization, X-Requested-With.</p>
                <p className="text-gray-600 text-xs">Example: Access-Control-Allow-Headers: Content-Type, Authorization</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Access-Control-Allow-Credentials</h3>
                <p className="text-gray-700 text-sm mb-2">When set to <code className="bg-gray-100 px-1 rounded">true</code>, allows cookies and authentication headers to be sent with cross-origin requests. Cannot be used with <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Origin: *</code>.</p>
                <p className="text-gray-600 text-xs">Example: Access-Control-Allow-Credentials: true</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I fix CORS error on the client side only?</h3>
                <p className="text-gray-700 leading-relaxed">No, CORS errors cannot be fixed purely on the client side for security reasons. The server must send appropriate CORS headers to allow cross-origin requests. However, you can use proxy servers or browser extensions for development, but these are not solutions for production applications.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why do I get CORS errors in development but not production?</h3>
                <p className="text-gray-700 leading-relaxed">In development, frontend and backend often run on different ports (e.g., localhost:3000 and localhost:8000), which are considered different origins. In production, if both are on the same domain, CORS errors may not occur. However, if they're on different domains, you still need proper CORS configuration.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use Access-Control-Allow-Origin: * in production?</h3>
                <p className="text-gray-700 leading-relaxed">Using <code className="bg-gray-100 px-1 rounded">*</code> allows any origin to access your API, which is a security risk. It's acceptable for public APIs that don't use authentication, but for APIs with authentication or sensitive data, always specify exact origins. Also, <code className="bg-gray-100 px-1 rounded">*</code> cannot be used with <code className="bg-gray-100 px-1 rounded">Access-Control-Allow-Credentials: true</code>.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a preflight request?</h3>
                <p className="text-gray-700 leading-relaxed">A preflight request is an OPTIONS request sent by the browser before the actual request for certain cross-origin requests (e.g., requests with custom headers or non-simple methods). The server must respond with appropriate CORS headers to allow the actual request. Handle OPTIONS requests in your server code.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix CORS errors for specific routes only?</h3>
                <p className="text-gray-700 leading-relaxed">You can configure CORS for specific routes instead of all routes. In Express, use <code className="bg-gray-100 px-1 rounded">app.get('/route', cors(options), handler)</code> or apply CORS middleware to specific route groups. This allows fine-grained control over which endpoints allow cross-origin requests.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="How to Fix &quot;CORS Policy Error&quot; in JavaScript (All Browsers)"
            description="Complete Guide to CORS Solutions & Troubleshooting (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Fix CORS Policy Error Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
