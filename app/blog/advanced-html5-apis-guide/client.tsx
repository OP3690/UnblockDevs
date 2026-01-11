'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Code, CheckCircle, AlertCircle, Lightbulb, Zap, BookOpen, MapPin, Database, Paintbrush, Cpu, Camera } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
export default function AdvancedHTML5APIsClient() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [storageValue, setStorageValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const CodeBlock = ({ code, language = 'javascript' }: { code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
            <span className="text-sm font-semibold text-gray-300 uppercase">{language}</span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm text-gray-100 font-mono">{code}</code>
          </pre>
        </div>
      </div>
    );
  };

  const TipBox = ({ children, type = 'tip' }: { children: React.ReactNode; type?: 'tip' | 'warning' | 'info' }) => {
    const styles = {
      tip: 'bg-blue-50 border-blue-500 text-blue-900',
      warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
      info: 'bg-purple-50 border-purple-500 text-purple-900',
    };

    const icons = {
      tip: Lightbulb,
      warning: AlertCircle,
      info: BookOpen,
    };

    const Icon = icons[type];

    return (
      <div className={`border-l-4 ${styles[type]} p-5 rounded-r-lg my-6 shadow-sm`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${type === 'tip' ? 'text-blue-600' : type === 'warning' ? 'text-yellow-600' : 'text-purple-600'}`} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demoStorage', storageValue);
      setStoredValue(storageValue);
      alert('Value saved to localStorage!');
    }
  };

  const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem('demoStorage');
      setStoredValue(value || '');
      setStorageValue(value || '');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem('demoStorage');
      if (value) {
        setStoredValue(value);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              Web Development
            </span>
            <time className="text-sm text-gray-500" dateTime="2024-01-22">
              January 22, 2024
            </time>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">15 min read</span>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Advanced HTML5 APIs: Complete Guide with Examples"
        description="Advanced HTML5 APIs: Complete Guide with Examples"
        variant="floating"
      />


      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Advanced HTML5 APIs: Complete Guide with Examples
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Take your HTML skills to the next level with advanced HTML5 APIs. Learn Geolocation, Web Storage, Canvas, Web Workers, and more with interactive examples.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Geolocation API for location-based features',
                  'Web Storage (localStorage & sessionStorage)',
                  'Canvas API for graphics and animations',
                  'Web Workers for background processing',
                  'File API for file handling',
                  'Drag & Drop API for interactive UIs',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-blue-600" />
                1. Geolocation API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                The Geolocation API allows web applications to access the user's geographical location. Perfect for location-based services, maps, and navigation apps.
              </p>

              <CodeBlock code={`// Get user's current position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Accuracy:', position.coords.accuracy, 'meters');
    },
    (error) => {
      console.error('Error:', error.message);
    }
  );
} else {
  console.error('Geolocation not supported');
}`} language="javascript" />

              <div className="my-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Try Geolocation API
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <button
                    onClick={getLocation}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Get My Location
                  </button>
                  {location && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-semibold text-green-900 mb-2">Your Location:</p>
                      <p className="text-gray-700">Latitude: <strong>{location.lat.toFixed(6)}</strong></p>
                      <p className="text-gray-700">Longitude: <strong>{location.lng.toFixed(6)}</strong></p>
                      <a
                        href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <TipBox type="warning">
                <p className="font-semibold mb-1">⚠️ Privacy Note:</p>
                <p className="text-sm">Always request user permission before accessing location. Users can deny access, so handle errors gracefully.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-blue-600" />
                2. Web Storage API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Web Storage provides two mechanisms: <code className="bg-gray-100 px-1 rounded">localStorage</code> (persistent) and <code className="bg-gray-100 px-1 rounded">sessionStorage</code> (session-only). Perfect for storing user preferences, form data, and app state.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">localStorage vs sessionStorage</h3>
              
              <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold">Feature</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">localStorage</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">sessionStorage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-700">Persistence</td>
                      <td className="px-6 py-4 text-gray-700">Persists until cleared</td>
                      <td className="px-6 py-4 text-gray-700">Cleared when tab closes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-700">Scope</td>
                      <td className="px-6 py-4 text-gray-700">Shared across tabs</td>
                      <td className="px-6 py-4 text-gray-700">Tab-specific</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-700">Use Case</td>
                      <td className="px-6 py-4 text-gray-700">User preferences, settings</td>
                      <td className="px-6 py-4 text-gray-700">Temporary form data</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock code={`// localStorage - persists across sessions
localStorage.setItem('username', 'John');
const username = localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear(); // Clear all

// sessionStorage - cleared when tab closes
sessionStorage.setItem('tempData', 'value');
const temp = sessionStorage.getItem('tempData');`} language="javascript" />

              <div className="my-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Try Web Storage API
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Enter value to store:</label>
                    <input
                      type="text"
                      value={storageValue}
                      onChange={(e) => setStorageValue(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type something..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={saveToStorage}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Save to localStorage
                    </button>
                    <button
                      onClick={loadFromStorage}
                      className="px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Load from localStorage
                    </button>
                  </div>
                  {storedValue && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-semibold text-green-900 mb-1">Stored Value:</p>
                      <p className="text-gray-700 font-mono">{storedValue}</p>
                    </div>
                  )}
                </div>
              </div>

              <TipBox>
                <p className="font-semibold mb-1">💡 Pro Tip:</p>
                <p className="text-sm">localStorage can store up to 5-10MB of data. Always handle storage quota errors and validate data before storing.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Paintbrush className="w-8 h-8 text-blue-600" />
                3. Canvas API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                The Canvas API provides a powerful way to draw graphics, animations, and interactive content using JavaScript. Perfect for games, data visualization, and image editing.
              </p>

              <CodeBlock code={`// Basic Canvas Drawing
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

// Draw a circle
ctx.beginPath();
ctx.arc(150, 60, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

// Draw text
ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas!', 10, 150);`} language="javascript" />

              <div className="my-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Paintbrush className="w-5 h-5" />
                    Canvas Example
                  </h3>
                </div>
                <div className="p-6">
                  <canvas
                    id="demoCanvas"
                    width="400"
                    height="200"
                    className="w-full border-2 border-gray-300 rounded-lg bg-white"
                    style={{ maxWidth: '100%' }}
                  />
                  <button
                    onClick={() => {
                      const canvas = document.getElementById('demoCanvas') as HTMLCanvasElement;
                      if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          ctx.fillStyle = '#3B82F6';
                          ctx.fillRect(10, 10, 100, 100);
                          ctx.beginPath();
                          ctx.arc(200, 60, 50, 0, 2 * Math.PI);
                          ctx.fillStyle = '#EF4444';
                          ctx.fill();
                          ctx.font = '20px Arial';
                          ctx.fillStyle = '#1F2937';
                          ctx.fillText('Hello Canvas!', 10, 150);
                        }
                      }
                    }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Draw on Canvas
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-blue-600" />
                4. Web Workers API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Web Workers allow you to run JavaScript in background threads, preventing heavy computations from blocking the main UI thread. Perfect for data processing, image manipulation, and complex calculations.
              </p>

              <CodeBlock code={`// main.js - Create a worker
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

// Receive result from worker
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js - Background processing
self.onmessage = (e) => {
  const numbers = e.data.numbers;
  const sum = numbers.reduce((a, b) => a + b, 0);
  self.postMessage({ result: sum });
};`} language="javascript" />

              <TipBox>
                <p className="font-semibold mb-1">💡 Use Cases:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Heavy data processing</li>
                  <li>Image filtering and manipulation</li>
                  <li>Complex mathematical calculations</li>
                  <li>Real-time data analysis</li>
                </ul>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Camera className="w-8 h-8 text-blue-600" />
                5. File API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                The File API allows web applications to access files selected by users. Perfect for file uploads, image previews, and file processing.
              </p>

              <CodeBlock code={`// Handle file input
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      console.log('File content:', content);
    };
    
    // Read as text
    reader.readAsText(file);
    
    // Or read as data URL (for images)
    // reader.readAsDataURL(file);
  }
});`} language="javascript" />
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                6. Drag & Drop API
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                The Drag & Drop API enables native drag-and-drop functionality in HTML5. Perfect for file uploads, reordering lists, and interactive UIs.
              </p>

              <CodeBlock code={`// Make element draggable
<div draggable="true" id="dragElement">
  Drag me!
</div>

// JavaScript
const dragElement = document.getElementById('dragElement');

dragElement.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', dragElement.id);
});

// Drop zone
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  // Handle drop
});`} language="html" />
            </section>

            <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Final Thoughts</h2>
              <p className="text-lg leading-relaxed mb-4">
                HTML5 APIs unlock powerful capabilities for modern web applications. From location services to background processing, these APIs enable rich, interactive experiences.
              </p>
              <p className="text-lg leading-relaxed">
                Remember to always check browser compatibility and provide fallbacks for older browsers. Use these APIs responsibly, especially when dealing with user privacy and data.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/blog/html-tags-explained-guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Read HTML Tags Guide
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

