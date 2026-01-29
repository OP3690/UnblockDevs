'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Server, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, Zap } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function FixErrorListenEaddrinuseNodejsPortAlreadyInUseClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fix: "Error: listen EADDRINUSE" in Node.js (Port Already in Use)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Fixing Port Conflicts in Node.js (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Fix: &quot;Error: listen EADDRINUSE&quot; in Node.js (Port Already in Use)"
        description="Complete Guide to Fixing Port Conflicts in Node.js (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What causes "Error: listen EADDRINUSE" in Node.js?',
              answer: 'This error occurs when Node.js tries to start a server on a port that is already in use by another process. Common causes include: another Node.js process running on the same port, a previous server instance not properly closed, another application using the port, or multiple instances of the same application trying to use the same port. EADDRINUSE means "Error: Address Already In Use".',
            },
            {
              question: 'How do I fix port already in use error?',
              answer: 'Kill the process using the port: lsof -ti:3000 | xargs kill -9 (macOS/Linux) or netstat -ano | findstr :3000 then taskkill /PID <pid> /F (Windows). Change the port in your application, use process.env.PORT for dynamic ports, or find and close the process using the port. Always ensure previous server instances are closed before starting new ones.',
            },
            {
              question: 'How do I find what process is using a port?',
              answer: 'Use lsof -i :3000 (macOS/Linux) or netstat -ano | findstr :3000 (Windows) to find the process ID (PID) using the port. Then kill it with kill -9 <PID> (macOS/Linux) or taskkill /PID <PID> /F (Windows). Use ps aux | grep node to find Node.js processes, or use Activity Monitor (macOS) / Task Manager (Windows) to find processes.',
            },
            {
              question: 'How do I change the port in Node.js?',
              answer: 'Set port via environment variable: const port = process.env.PORT || 3000, use command line: PORT=3001 node server.js, create .env file with PORT=3001, or hardcode a different port: app.listen(3001). Always use process.env.PORT for production deployments (Heroku, Vercel) which set ports dynamically.',
            },
            {
              question: 'Why does my Node.js server keep showing port in use?',
              answer: 'Previous server instances may not have closed properly, you may have multiple terminal windows running the same server, or the process crashed without releasing the port. Always stop servers with Ctrl+C, check for running processes before starting, and use process managers (PM2, nodemon) that handle process cleanup properly.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            We earn commissions when you shop through the links below.
          </p>
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is "Error: listen EADDRINUSE"?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>"Error: listen EADDRINUSE"</strong> is a Node.js error that occurs when attempting to start a server on a network port that is already in use by another process. EADDRINUSE stands for "Error: Address Already In Use", indicating that the port you're trying to bind to is already occupied by another application or process.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error happens when Node.js applications (Express, HTTP servers, WebSocket servers) try to listen on a port (like 3000, 8000, 8080) that another process is already using. Each port can only be used by one process at a time, so attempting to use an occupied port causes this error.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This error is common in Node.js development when multiple server instances are running, previous servers weren't properly closed, or when ports conflict with other applications. Understanding and fixing this error is essential for running Node.js servers successfully.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> "Error: listen EADDRINUSE" occurs when a port is already in use. The solution is to kill the process using the port, change to a different port, or ensure previous server instances are properly closed.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Port Conflicts</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Port conflicts involve several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Network Ports
                </h3>
                <p className="text-gray-700 text-sm mb-2">Network ports are numbered endpoints (0-65535) that applications use to communicate. Common ports include 3000 (development), 80 (HTTP), 443 (HTTPS), 8080 (alternative HTTP). Each port can only be bound by one process at a time. Port conflicts occur when multiple processes try to use the same port.</p>
                <p className="text-gray-600 text-xs">Example: Port 3000 can only be used by one Node.js server at a time</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Process Binding
                </h3>
                <p className="text-gray-700 text-sm mb-2">When Node.js servers start, they bind to a port using app.listen(port). If the port is already bound by another process, binding fails with EADDRINUSE error. The operating system prevents multiple processes from binding to the same port simultaneously for security and functionality reasons.</p>
                <p className="text-gray-600 text-xs">Example: app.listen(3000) fails if another process is using port 3000</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Process Identification
                </h3>
                <p className="text-gray-700 text-sm mb-2">Each process using a port has a Process ID (PID) that can be identified and terminated. Finding the PID allows you to kill the process and free the port. Process identification is essential for resolving port conflicts by terminating conflicting processes.</p>
                <p className="text-gray-600 text-xs">Example: lsof -i :3000 shows PID of process using port 3000</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Port Management
                </h3>
                <p className="text-gray-700 text-sm mb-2">Port management involves finding available ports, changing ports when conflicts occur, and properly closing servers to release ports. Using environment variables (process.env.PORT) allows dynamic port assignment, preventing hardcoded port conflicts. Proper port management prevents EADDRINUSE errors.</p>
                <p className="text-gray-600 text-xs">Example: const port = process.env.PORT || 3000 allows dynamic port assignment</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding network ports, process binding, process identification, and port management is key to fixing EADDRINUSE errors. The main issue is multiple processes trying to use the same port simultaneously.
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
              "Error: listen EADDRINUSE" occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Multiple Server Instances</h3>
                  <p className="text-gray-700 text-sm">When multiple instances of the same Node.js server are started (multiple terminal windows, background processes, or PM2 instances), they try to use the same port, causing EADDRINUSE. Only one process can bind to a port at a time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Previous Server Not Closed</h3>
                  <p className="text-gray-700 text-sm">When previous server instances weren't properly closed (crashed, force-quit, or didn't stop with Ctrl+C), the port remains bound. Starting a new server on the same port causes EADDRINUSE because the previous process still holds the port.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Port Conflicts with Other Apps</h3>
                  <p className="text-gray-700 text-sm">When other applications (databases, other Node.js apps, system services) are using the same port, starting your server causes EADDRINUSE. Common conflicts occur with ports 3000, 8000, 8080, which are popular for development servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hardcoded Ports</h3>
                  <p className="text-gray-700 text-sm">When applications use hardcoded ports (app.listen(3000)) instead of environment variables, port conflicts are more likely. Hardcoded ports don't adapt to different environments, causing conflicts when multiple apps or instances use the same port.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> EADDRINUSE is most common with multiple server instances, previous servers not closed, port conflicts with other apps, and hardcoded ports. The main issue is trying to bind to a port that's already in use.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Fix EADDRINUSE Errors</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix "Error: listen EADDRINUSE" errors:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Kill Process Using the Port</h3>
              <p className="text-gray-700 mb-4">Find and kill the process using the port:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">macOS/Linux</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Find process using port 3000
lsof -i :3000

# Kill process by PID
kill -9 <PID>

# Or kill directly
lsof -ti:3000 | xargs kill -9

# Find all Node.js processes
ps aux | grep node

# Kill all Node.js processes (use carefully)
pkill -f node`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Windows</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Find process using port 3000
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID> /F

# Find all Node.js processes
tasklist | findstr node

# Kill all Node.js processes
taskkill /F /IM node.exe`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Change Port in Application</h3>
              <p className="text-gray-700 mb-4">Use environment variables for dynamic ports:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Express.js with Dynamic Port</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const express = require('express');
const app = express();

// Use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// Start with different port:
// PORT=3001 node server.js`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Using .env File</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// .env file
PORT=3001

// server.js
require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server on port \${PORT}\`);
});`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Handle Port Errors Gracefully</h3>
              <p className="text-gray-700 mb-4">Add error handling for port conflicts:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Error Handling with Port Retry</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const express = require('express');
const app = express();

function startServer(port) {
  app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(\`Port \${port} is in use, trying \${port + 1}\`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const PORT = process.env.PORT || 3000;
startServer(PORT);`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Use Process Managers</h3>
              <p className="text-gray-700 mb-4">Use PM2 or nodemon for better process management:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">PM2 Process Manager</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`# Install PM2
npm install -g pm2

# Start server with PM2
pm2 start server.js

# Stop server
pm2 stop server.js

# List all processes
pm2 list

# Kill all processes
pm2 kill

# PM2 handles process cleanup automatically`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always use process.env.PORT for dynamic ports, kill processes using ports before starting servers, handle EADDRINUSE errors gracefully, use process managers (PM2) for production, and check for running processes before starting new servers. Test with different ports to avoid conflicts.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why EADDRINUSE Happens</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Error: listen EADDRINUSE" happens for these reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Operating System Limits
                </h3>
                <p className="text-gray-700 text-sm">Operating systems allow only one process to bind to a port at a time for security and functionality. This prevents port conflicts, ensures proper network communication, and maintains system stability. Multiple processes can't share the same port simultaneously.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Process Lifecycle
                </h3>
                <p className="text-gray-700 text-sm">When processes don't close properly (crashes, force-quit, or improper shutdown), ports remain bound until the process terminates or the system releases them. This causes EADDRINUSE when starting new servers on the same port before the previous process releases it.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Development Workflow
                </h3>
                <p className="text-gray-700 text-sm">During development, developers often start/stop servers multiple times, run multiple instances, or forget to close previous instances. This workflow increases the likelihood of port conflicts. Development environments need proper process management to prevent conflicts.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Port Management
                </h3>
                <p className="text-gray-700 text-sm">Hardcoded ports and lack of port management cause conflicts when multiple applications or instances try to use the same port. Using environment variables and dynamic port assignment prevents conflicts by allowing flexible port allocation based on availability.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> EADDRINUSE happens due to operating system limits, process lifecycle issues, development workflow patterns, and port management. The solution is to kill conflicting processes, use dynamic ports, handle errors gracefully, and manage processes properly.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What causes "Error: listen EADDRINUSE" in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">This error occurs when Node.js tries to start a server on a port that is already in use by another process. Common causes include: another Node.js process running on the same port, a previous server instance not properly closed, another application using the port, or multiple instances of the same application trying to use the same port. EADDRINUSE means "Error: Address Already In Use".</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I fix port already in use error?</h3>
                <p className="text-gray-700 leading-relaxed">Kill the process using the port: lsof -ti:3000 | xargs kill -9 (macOS/Linux) or netstat -ano | findstr :3000 then taskkill /PID &lt;pid&gt; /F (Windows). Change the port in your application, use process.env.PORT for dynamic ports, or find and close the process using the port. Always ensure previous server instances are closed before starting new ones.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find what process is using a port?</h3>
                <p className="text-gray-700 leading-relaxed">Use lsof -i :3000 (macOS/Linux) or netstat -ano | findstr :3000 (Windows) to find the process ID (PID) using the port. Then kill it with kill -9 &lt;PID&gt; (macOS/Linux) or taskkill /PID &lt;PID&gt; /F (Windows). Use ps aux | grep node to find Node.js processes, or use Activity Monitor (macOS) / Task Manager (Windows) to find processes.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I change the port in Node.js?</h3>
                <p className="text-gray-700 leading-relaxed">Set port via environment variable: const port = process.env.PORT || 3000, use command line: PORT=3001 node server.js, create .env file with PORT=3001, or hardcode a different port: app.listen(3001). Always use process.env.PORT for production deployments (Heroku, Vercel) which set ports dynamically.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does my Node.js server keep showing port in use?</h3>
                <p className="text-gray-700 leading-relaxed">Previous server instances may not have closed properly, you may have multiple terminal windows running the same server, or the process crashed without releasing the port. Always stop servers with Ctrl+C, check for running processes before starting, and use process managers (PM2, nodemon) that handle process cleanup properly.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Fix: &quot;Error: listen EADDRINUSE&quot; in Node.js (Port Already in Use)"
            description="Complete Guide to Fixing Port Conflicts in Node.js (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Fix Error listen EADDRINUSE Guide" />
        </section>
      </main>
    </div>
  );
}
