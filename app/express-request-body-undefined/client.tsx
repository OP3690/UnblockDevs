'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ExternalLink } from 'lucide-react';

export default function ExpressRequestBodyUndefinedClient() {
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
              <h1 className="text-3xl font-bold text-gray-900">
                Express <code className="bg-gray-100 px-2 py-0.5 rounded text-2xl font-mono text-gray-800">req.body</code> is undefined — How to Fix It
              </h1>
              <p className="text-sm text-gray-500 mt-1">6 fixes covering middleware setup, Content-Type, and multipart data</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">req.body</code> being <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">undefined</code> is one of the most common Express.js beginner issues. Express does not parse request bodies by default — you have to explicitly tell it how to handle incoming data.
            </p>
          </section>

          {/* Root Cause */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Root Cause</h2>
            <p className="text-gray-700 mb-4">
              Express is a minimal framework. It receives the raw HTTP request but leaves body parsing to middleware. Without registering the correct middleware, Express will not attempt to parse the request body, so <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">req.body</code> stays <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">undefined</code>.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">Symptom — POST handler receives undefined body:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`app.post('/api/user', (req, res) => {
  console.log(req.body); // ❌ undefined
  res.json({ received: req.body });
});`}</pre>
            </div>
          </section>

          {/* Fix 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 1: Add express.json() Middleware</h2>
            <p className="text-gray-700 mb-3">
              Since Express 4.16.0, body parsing is built in. Add <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code> to parse JSON request bodies. You no longer need the separate <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">body-parser</code> package.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken — no body parsing middleware:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const express = require('express');
const app = express();

// ❌ Missing middleware — req.body will be undefined
app.post('/login', (req, res) => {
  const { username, password } = req.body; // ❌ crashes
});`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — add express.json() before routes:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const express = require('express');
const app = express();

app.use(express.json()); // ✅ parse JSON bodies

app.post('/login', (req, res) => {
  const { username, password } = req.body; // ✅ works
  res.json({ username });
});`}</pre>
            </div>
          </section>

          {/* Fix 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 2: Middleware ORDER Matters</h2>
            <p className="text-gray-700 mb-3">
              Express processes middleware top to bottom. If you define a route <em>before</em> registering <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code>, that route will never see a parsed body.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken — route defined before middleware:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`app.post('/api/data', (req, res) => {
  console.log(req.body); // ❌ undefined — middleware not yet registered
});

app.use(express.json()); // too late!`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — middleware before all routes:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`app.use(express.json()); // ✅ registered first

app.post('/api/data', (req, res) => {
  console.log(req.body); // ✅ parsed JSON object
});`}</pre>
            </div>
          </section>

          {/* Fix 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 3: Wrong Content-Type Header</h2>
            <p className="text-gray-700 mb-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code> only parses requests with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">Content-Type: application/json</code>. If your HTTP client sends a different content type, Express will skip parsing and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">req.body</code> stays undefined.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Broken — missing or wrong Content-Type:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// fetch without Content-Type header
fetch('/api/user', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice' }), // ❌ no Content-Type
});

// OR wrong Content-Type:
fetch('/api/user', {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' }, // ❌ wrong type
  body: JSON.stringify({ name: 'Alice' }),
});`}</pre>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — correct Content-Type header:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // ✅ required
  },
  body: JSON.stringify({ name: 'Alice' }),
});`}</pre>
            </div>
          </section>

          {/* Fix 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 4: Form Data vs JSON — Use express.urlencoded()</h2>
            <p className="text-gray-700 mb-3">
              HTML form submissions send data as <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">application/x-www-form-urlencoded</code>, not JSON. Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.urlencoded()</code> alongside <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code> to handle both.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Handle both JSON and form data:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`app.use(express.json());                          // for JSON APIs
app.use(express.urlencoded({ extended: true }));  // for HTML forms

// Now req.body works for both:
// - fetch with Content-Type: application/json
// - <form method="POST"> submissions`}</pre>
            </div>
          </section>

          {/* Fix 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 5: Route-Specific Middleware</h2>
            <p className="text-gray-700 mb-3">
              Sometimes you only want to apply body parsing to specific routes rather than globally. Pass the middleware directly to the route handler.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Apply middleware to a single route:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const jsonParser = express.json();

// Only this route gets JSON parsing
app.post('/webhook', jsonParser, (req, res) => {
  console.log(req.body); // ✅ parsed
  res.sendStatus(200);
});

// This route is unaffected
app.post('/upload', (req, res) => {
  // req.body is undefined here — intentional
});`}</pre>
            </div>
          </section>

          {/* Fix 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix 6: Multer for multipart/form-data (File Uploads)</h2>
            <p className="text-gray-700 mb-3">
              Neither <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code> nor <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.urlencoded()</code> can parse <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">multipart/form-data</code> (used for file uploads). You need the <strong>multer</strong> package.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">File upload with multer:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.file);   // ✅ uploaded file info
  console.log(req.body);   // ✅ other form fields
  res.json({ success: true });
});`}</pre>
            </div>
          </section>

          {/* Full Working Example */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Full Working Express POST Route</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Complete Express server setup:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const express = require('express');
const app = express();

// ✅ Register middleware FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON API endpoint
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  // Process the data...
  res.status(201).json({ id: 1, name, email });
});

// HTML form endpoint
app.post('/contact', (req, res) => {
  const { message } = req.body; // works for form submissions too
  res.redirect('/thank-you');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}</pre>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-10">
            <Link href="/har-to-curl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                <ExternalLink className="w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">Convert your HAR file to cURL commands to debug requests →</p>
                  <p className="text-blue-100 text-sm">Inspect request headers and body payloads with our free HAR to cURL tool.</p>
                </div>
              </div>
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why is req.body undefined in Express?</h3>
                <p className="text-gray-700">Express does not parse request bodies by default. Add <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">app.use(express.json())</code> before your routes.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Does Express 4 still need the body-parser package?</h3>
                <p className="text-gray-700">No. Since Express 4.16.0, use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.json()</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">express.urlencoded()</code> directly. The separate body-parser package is no longer required.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why does middleware order matter in Express?</h3>
                <p className="text-gray-700">Express applies middleware in the order they are registered. Routes defined before <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">app.use(express.json())</code> will not have body parsing applied to them.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">req.body is still undefined even with express.json() — why?</h3>
                <p className="text-gray-700">Your HTTP client must send <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">Content-Type: application/json</code>. Without this header, Express will not attempt to parse the body as JSON.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I handle file uploads in Express?</h3>
                <p className="text-gray-700">File uploads use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">multipart/form-data</code>, which requires the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">multer</code> package. Use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">upload.single('fieldname')</code> as route middleware.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/har-to-curl" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">HAR to cURL</p>
                <p className="text-sm text-gray-600 mt-1">Debug HTTP requests and inspect headers</p>
              </Link>
              <Link href="/json-formatter" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Formatter</p>
                <p className="text-sm text-gray-600 mt-1">Format and validate JSON request bodies</p>
              </Link>
              <Link href="/json-validator" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Validator</p>
                <p className="text-sm text-gray-600 mt-1">Validate your API request payloads</p>
              </Link>
              <Link href="/process-env-undefined" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">Fix process.env Undefined</p>
                <p className="text-sm text-gray-600 mt-1">Fix env variable issues in Node.js</p>
              </Link>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
