'use client';

import Link from 'next/link';
import { ArrowLeft, Wrench, ExternalLink } from 'lucide-react';

export default function NodejsPortAlreadyInUseClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
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
            <div className="p-3 bg-purple-100 rounded-lg">
              <Wrench className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Fix "EADDRINUSE: Address Already in Use" in Node.js
              </h1>
              <p className="text-sm text-gray-500 mt-1">Kill any port on Mac, Linux, and Windows — and prevent it from happening again</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              The <strong>EADDRINUSE</strong> error means the port you are trying to use is already occupied by another process. This guide covers the fastest way to kill the blocking process on every OS, plus how to prevent this error permanently.
            </p>
          </section>

          {/* The Error */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Error Message</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
              <p className="font-semibold text-red-900 mb-2">What you see in the terminal:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1318:16)
    at listenInCluster (net.js:1366:12)
    at Server.listen (net.js:1452:7)
    at Function.listen (/app/node_modules/express/lib/application.js:618:24)
    at Object.<anonymous> (/app/server.js:10:5)`}</pre>
            </div>
            <p className="text-gray-700 mt-4">
              Port <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">3000</code> in the error can be any port — 4000, 8080, 5173, or whatever your app uses.
            </p>
          </section>

          {/* Mac / Linux */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix on Mac / Linux</h2>
            <p className="text-gray-700 mb-4">Three commands — from fastest to most explicit:</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Option 1: One-liner (fastest)</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-6">
              <p className="font-semibold text-green-900 mb-2">Kill port 3000 in one command:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`lsof -ti:3000 | xargs kill -9

# For port 8080:
lsof -ti:8080 | xargs kill -9`}</pre>
              <p className="text-green-800 text-sm mt-2">
                <code className="bg-green-100 px-1 rounded">lsof -ti:3000</code> outputs just the PID, which is piped directly to <code className="bg-green-100 px-1 rounded">kill -9</code>.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Option 2: Find PID first, then kill</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-6">
              <p className="font-semibold text-green-900 mb-2">Two-step approach — see what is running first:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Step 1: Find the process
lsof -i :3000
# Output:
# COMMAND   PID   USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
# node    12345   john   23u  IPv6  ...          3000 (LISTEN)

# Step 2: Kill it using the PID
kill -9 12345`}</pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Option 3: fuser (Linux only)</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Linux alternative using fuser:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Kill all processes on TCP port 3000
fuser -k 3000/tcp

# Verbose output (shows PIDs before killing)
fuser -v -k 3000/tcp`}</pre>
            </div>
          </section>

          {/* Windows */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fix on Windows</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">Find and kill with netstat + taskkill:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`# Step 1: Find which process uses port 3000
netstat -ano | findstr :3000
# Output:
#   TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345

# Step 2: Kill the process by PID (12345 in this example)
taskkill /PID 12345 /F

# Or kill by process name:
taskkill /IM node.exe /F`}</pre>
            </div>
            <p className="text-gray-600 text-sm">
              Run Command Prompt or PowerShell as Administrator if you get permission errors.
            </p>
          </section>

          {/* kill-port in package.json */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add npx kill-port to package.json Scripts</h2>
            <p className="text-gray-700 mb-3">
              The <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">kill-port</code> package works on all platforms (Mac, Linux, Windows) and can be chained into your start script so the port is always freed before your server launches.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">package.json — auto-kill port on start:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`{
  "scripts": {
    "dev": "npx kill-port 3000 && node server.js",
    "start": "npx kill-port 3000 && node server.js",
    "kill": "npx kill-port 3000"
  }
}

# Now: npm run dev will always free port 3000 first
# Or kill manually: npm run kill`}</pre>
            </div>
          </section>

          {/* portfinder */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Automatically Use Next Free Port</h2>
            <p className="text-gray-700 mb-3">
              Instead of hardcoding a port, use the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">portfinder</code> package to automatically find and bind to the next available port.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Auto-select next free port:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// npm install portfinder
const portfinder = require('portfinder');
const express = require('express');
const app = express();

portfinder.basePort = 3000; // start searching from 3000

portfinder.getPortPromise()
  .then((port) => {
    app.listen(port, () => {
      console.log(\`Server running on http://localhost:\${port}\`);
    });
  })
  .catch((err) => {
    console.error('Could not find a free port:', err);
  });`}</pre>
            </div>
          </section>

          {/* Graceful shutdown */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prevent It: Use process.on('SIGTERM') for Graceful Shutdown</h2>
            <p className="text-gray-700 mb-3">
              The most permanent fix is ensuring your server always releases the port when it exits. This prevents zombie processes from accumulating.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Graceful shutdown — always release the port:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

function shutdown(signal) {
  console.log(\`Received \${signal}, shutting down gracefully...\`);
  server.close(() => {
    console.log('Port released. Process exiting.');
    process.exit(0);
  });

  // Force exit if close takes too long
  setTimeout(() => process.exit(1), 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM')); // Docker stop, Heroku
process.on('SIGINT',  () => shutdown('SIGINT'));  // Ctrl+C`}</pre>
            </div>
          </section>

          {/* Why does this happen */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Does This Happen?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Server crashed mid-run</strong> — unhandled exception exits the process without releasing the port</li>
              <li><strong>Ctrl+C timing</strong> — the port enters TCP TIME_WAIT state briefly after a fast kill</li>
              <li><strong>Multiple dev servers</strong> — running <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">npm run dev</code> twice without stopping the first one</li>
              <li><strong>Hot-reloader re-bind race</strong> — nodemon or ts-node-dev restarting before the old socket fully closes</li>
              <li><strong>Docker containers</strong> — a stopped container still holding the port binding on the host</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="mb-10">
            <Link href="/har-to-curl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                <ExternalLink className="w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">Debug your API requests with our HAR to cURL tool →</p>
                  <p className="text-blue-100 text-sm">Convert browser HAR exports to cURL commands you can run from any terminal.</p>
                </div>
              </div>
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What causes EADDRINUSE in Node.js?</h3>
                <p className="text-gray-700">Another process is already listening on that port. Common causes include a crashed server that did not release the port, or running two instances of your dev server simultaneously.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I kill port 3000 on Mac?</h3>
                <p className="text-gray-700">Run <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">lsof -ti:3000 | xargs kill -9</code> in your terminal. This works for any port — replace 3000 with your port number.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I kill a port on Windows?</h3>
                <p className="text-gray-700">Run <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">netstat -ano | findstr :3000</code> to get the PID, then <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">taskkill /PID &lt;pid&gt; /F</code>. Or use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">npx kill-port 3000</code>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How can I automatically find the next available port?</h3>
                <p className="text-gray-700">Use the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">portfinder</code> package. Call <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">portfinder.getPortPromise()</code> to get the next free port from your base port.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why does the port stay in use after stopping my server?</h3>
                <p className="text-gray-700">Without a graceful shutdown handler, the OS may keep the port in TIME_WAIT state. Implement <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">process.on('SIGINT')</code> to call <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">server.close()</code> before exiting.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/har-to-curl" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">HAR to cURL</p>
                <p className="text-sm text-gray-600 mt-1">Debug API requests from any browser</p>
              </Link>
              <Link href="/process-env-undefined" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">Fix process.env Undefined</p>
                <p className="text-sm text-gray-600 mt-1">Fix env variable issues in Node.js</p>
              </Link>
              <Link href="/express-request-body-undefined" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">Fix Express req.body Undefined</p>
                <p className="text-sm text-gray-600 mt-1">Fix body parsing in Express.js</p>
              </Link>
              <Link href="/json-formatter" className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-semibold text-gray-900">JSON Formatter</p>
                <p className="text-sm text-gray-600 mt-1">Format and validate JSON files</p>
              </Link>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
