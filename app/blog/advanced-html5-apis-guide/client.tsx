'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function AdvancedHTML5APIsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Advanced HTML5 APIs: Complete Guide with Code Examples</h1>
      <p className="lead">
        HTML5 is far more than markup. Its browser APIs unlock capabilities that were once only possible in native desktop apps: real-time geolocation, offline storage, GPU-accelerated graphics, background threads, drag-and-drop, file system access, and more. This guide covers the most powerful HTML5 APIs with practical code examples, browser compatibility notes, and real-world use cases — everything you need to build modern, capable web applications.
      </p>

      <StatGrid stats={[
        { value: '10+', label: 'HTML5 APIs covered', color: 'blue' },
        { value: '98%', label: 'Browser support for core APIs', color: 'green' },
        { value: '0', label: 'Plugins required', color: 'amber' },
        { value: '2026', label: 'All examples modern & up to date', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Geolocation API: Real-Time Location Access" />
      <p>
        The Geolocation API lets web apps access the device's physical location with user permission. It works via GPS, Wi-Fi triangulation, cellular data, or IP address depending on the device and context.
      </p>

      <CodeBlock language="javascript" filename="Geolocation API: basic usage">
{`// Check for browser support first
if (!navigator.geolocation) {
  console.error('Geolocation is not supported by this browser');
  return;
}

// One-time position request
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log(\`Lat: \${latitude}, Lng: \${longitude}\`);
    console.log(\`Accuracy: \${accuracy} meters\`);
  },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('User denied location permission');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Location unavailable');
        break;
      case error.TIMEOUT:
        console.error('Request timed out');
        break;
    }
  },
  {
    enableHighAccuracy: true,  // Use GPS when available
    timeout: 10000,            // Wait up to 10 seconds
    maximumAge: 60000,         // Cache position for 1 minute
  }
);

// Continuous tracking (stop with clearWatch)
const watchId = navigator.geolocation.watchPosition(
  (position) => updateMapPosition(position.coords),
  handleError,
  { enableHighAccuracy: true }
);

// Stop tracking
navigator.geolocation.clearWatch(watchId);`}
      </CodeBlock>

      <AlertBox type="warning" title="HTTPS Required">
        The Geolocation API only works on HTTPS pages (and localhost for development). Attempting to call it on HTTP will throw a security error in all modern browsers.
      </AlertBox>

      <SectionHeader number={2} title="Web Storage API: localStorage and sessionStorage" />
      <p>
        Web Storage provides simple key-value storage in the browser — no cookies needed. It comes in two flavors: localStorage (persists until explicitly cleared) and sessionStorage (cleared when the tab closes).
      </p>

      <CompareTable
        leftLabel="localStorage"
        rightLabel="sessionStorage"
        rows={[
          { label: 'Persistence', left: 'Survives browser close/reopen', right: 'Cleared when tab/window closes' },
          { label: 'Scope', left: 'Shared across all tabs for same origin', right: 'Isolated to specific tab' },
          { label: 'Capacity', left: '5–10 MB (browser-dependent)', right: '5–10 MB (browser-dependent)' },
          { label: 'Use case', left: 'User preferences, auth tokens, cached data', right: 'Form state, wizard steps, temp data' },
          { label: 'Access', left: 'window.localStorage', right: 'window.sessionStorage' },
        ]}
      />

      <CodeBlock language="javascript" filename="localStorage and sessionStorage usage">
{`// Save data
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ id: 42, name: 'Alice' }));

// Read data
const theme = localStorage.getItem('theme'); // 'dark'
const user = JSON.parse(localStorage.getItem('user')); // { id: 42, name: 'Alice' }

// Remove a specific item
localStorage.removeItem('theme');

// Clear all localStorage for this origin
localStorage.clear();

// Check storage availability
function isLocalStorageAvailable() {
  try {
    localStorage.setItem('__test__', '1');
    localStorage.removeItem('__test__');
    return true;
  } catch (e) {
    return false; // Incognito mode or storage disabled
  }
}

// sessionStorage works the same way but is tab-specific
sessionStorage.setItem('currentStep', '3');
const step = sessionStorage.getItem('currentStep'); // '3'`}
      </CodeBlock>

      <AlertBox type="tip" title="Storage Limits and JSON Serialization">
        Web Storage only stores strings. Always use JSON.stringify() to store objects and JSON.parse() to retrieve them. Storage capacity is typically 5–10 MB per origin. Use IndexedDB for larger datasets.
      </AlertBox>

      <SectionHeader number={3} title="Canvas API: 2D and Animated Graphics" />
      <p>
        The Canvas API provides a JavaScript-driven drawing surface for 2D graphics, animations, image manipulation, and even basic games. It uses immediate mode rendering — you draw pixels directly, not DOM nodes.
      </p>

      <CodeBlock language="javascript" filename="Canvas API: shapes, text, and animation">
{`const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a rectangle
ctx.fillStyle = '#4F46E5';
ctx.fillRect(10, 10, 150, 100);

// Draw a circle
ctx.beginPath();
ctx.arc(200, 60, 50, 0, Math.PI * 2);
ctx.fillStyle = '#10B981';
ctx.fill();
ctx.strokeStyle = '#fff';
ctx.lineWidth = 3;
ctx.stroke();

// Draw text
ctx.font = 'bold 24px Arial';
ctx.fillStyle = '#1F2937';
ctx.fillText('Hello Canvas!', 10, 160);

// Draw an image
const img = new Image();
img.onload = () => ctx.drawImage(img, 300, 10, 100, 100);
img.src = '/logo.png';

// Animation loop
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear frame
  ctx.fillStyle = '#6366F1';
  ctx.fillRect(x, 50, 50, 50);  // Moving square
  x = (x + 2) % canvas.width;   // Move right, wrap around
  requestAnimationFrame(animate); // Call next frame
}
animate();`}
      </CodeBlock>

      <SectionHeader number={4} title="Web Workers: Background Threading" />
      <p>
        JavaScript is single-threaded by default — heavy computations block the UI. Web Workers run scripts in a background thread, keeping the main thread (and UI) responsive during intensive tasks like data processing, image manipulation, or complex calculations.
      </p>

      <ArchDiagram
        boxes={[
          { label: 'Main Thread (UI)', color: 'blue' },
          { label: 'postMessage()', color: 'amber' },
          { label: 'Web Worker Thread', color: 'purple' },
          { label: 'onmessage result', color: 'amber' },
          { label: 'Main Thread (UI)', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→']}
      />

      <CodeBlock language="javascript" filename="main.js — spawning a Web Worker">
{`// Create a worker from a separate JS file
const worker = new Worker('/workers/compute.js');

// Send data to the worker
worker.postMessage({ data: largeDataArray, operation: 'sort' });

// Receive results from the worker
worker.onmessage = (event) => {
  console.log('Worker result:', event.data);
  updateUI(event.data);  // Safe to update DOM here (main thread)
};

// Handle worker errors
worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// Terminate worker when done
worker.terminate();`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="workers/compute.js — the worker script">
{`// Web Workers cannot access the DOM
// They have access to: fetch, setTimeout, WebSockets, IndexedDB

self.onmessage = (event) => {
  const { data, operation } = event.data;

  let result;
  if (operation === 'sort') {
    result = [...data].sort((a, b) => a - b);
  } else if (operation === 'sum') {
    result = data.reduce((acc, val) => acc + val, 0);
  }

  // Send result back to main thread
  self.postMessage(result);
};`}
      </CodeBlock>

      <SectionHeader number={5} title="File API: Reading Files in the Browser" />

      <CodeBlock language="javascript" filename="File API: reading text, JSON, and binary files">
{`const input = document.getElementById('fileInput');

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  console.log(\`Name: \${file.name}, Size: \${file.size} bytes, Type: \${file.type}\`);

  const reader = new FileReader();

  // Read as text (for .txt, .csv, .json files)
  reader.readAsText(file);

  reader.onload = (e) => {
    const content = e.target.result;
    console.log('File content:', content);

    // Parse JSON if needed
    if (file.type === 'application/json') {
      const parsed = JSON.parse(content);
      processData(parsed);
    }
  };

  reader.onerror = () => console.error('Error reading file');

  // For images: read as DataURL
  if (file.type.startsWith('image/')) {
    const imgReader = new FileReader();
    imgReader.readAsDataURL(file);
    imgReader.onload = (e) => {
      document.getElementById('preview').src = e.target.result;
    };
  }
});`}
      </CodeBlock>

      <SectionHeader number={6} title="Drag and Drop API" />

      <CodeBlock language="javascript" filename="Drag and Drop API: full working example">
{`// Make an element draggable
const draggable = document.getElementById('card');
draggable.setAttribute('draggable', 'true');

draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', draggable.id);
  e.dataTransfer.effectAllowed = 'move';
  draggable.classList.add('opacity-50');  // Visual feedback
});

draggable.addEventListener('dragend', () => {
  draggable.classList.remove('opacity-50');
});

// Set up a drop zone
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();  // Required to allow dropping
  e.dataTransfer.dropEffect = 'move';
  dropZone.classList.add('bg-blue-100');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('bg-blue-100');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const element = document.getElementById(id);
  dropZone.appendChild(element);  // Move element to drop zone
  dropZone.classList.remove('bg-blue-100');
});`}
      </CodeBlock>

      <SectionHeader number={7} title="IndexedDB: Client-Side Database" />
      <p>
        For large-scale client-side storage beyond what localStorage can handle, IndexedDB provides a full asynchronous database engine in the browser. It supports structured data, indexes, transactions, and queries.
      </p>

      <CodeBlock language="javascript" filename="IndexedDB: open, write, and read">
{`// Open (or create) a database
const request = indexedDB.open('myAppDB', 1);

// Create schema on first run or version upgrade
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('users', { keyPath: 'id' });
  store.createIndex('email', 'email', { unique: true });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // Write a record
  const tx = db.transaction('users', 'readwrite');
  tx.objectStore('users').put({ id: 1, name: 'Alice', email: 'alice@example.com' });

  // Read a record by key
  const readTx = db.transaction('users', 'readonly');
  const getReq = readTx.objectStore('users').get(1);
  getReq.onsuccess = () => console.log('User:', getReq.result);

  // Query by index
  const emailIndex = readTx.objectStore('users').index('email');
  const emailReq = emailIndex.get('alice@example.com');
  emailReq.onsuccess = () => console.log('By email:', emailReq.result);
};`}
      </CodeBlock>

      <SectionHeader number={8} title="Intersection Observer: Lazy Loading and Scroll Detection" />

      <CodeBlock language="javascript" filename="Intersection Observer: lazy-load images on scroll">
{`// Create an observer that fires when elements enter the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;  // Load the real image
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100', 'transition-opacity', 'duration-300');
        observer.unobserve(img);    // Stop watching once loaded
      }
    });
  },
  {
    rootMargin: '100px',  // Start loading 100px before entering viewport
    threshold: 0.1,       // Fire when 10% of element is visible
  }
);

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach((img) => {
  observer.observe(img);
});`}
      </CodeBlock>

      <SectionHeader number={9} title="Web Notifications API" />

      <CodeBlock language="javascript" filename="Web Notifications API: request permission and notify">
{`// Request permission first (must be triggered by user gesture)
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Send a notification
function sendNotification(title, options = {}) {
  if (Notification.permission !== 'granted') return;

  const notification = new Notification(title, {
    body: options.body || '',
    icon: options.icon || '/favicon.ico',
    badge: '/badge.png',
    tag: options.tag || 'default',  // Replaces existing notification with same tag
    requireInteraction: false,       // Auto-close after a few seconds
    data: { url: options.url },
  });

  notification.onclick = () => {
    window.focus();
    if (notification.data.url) window.location.href = notification.data.url;
    notification.close();
  };
}

// Usage
const allowed = await requestNotificationPermission();
if (allowed) sendNotification('New Message', { body: 'You have 3 unread messages', url: '/inbox' });`}
      </CodeBlock>

      <SectionHeader number={10} title="API Browser Compatibility Overview" />

      <CompareTable
        leftLabel="HTML5 API"
        rightLabel="Browser Support (2026)"
        rows={[
          { label: 'Geolocation API', left: 'All modern browsers', right: 'HTTPS required; ~97% global support' },
          { label: 'localStorage / sessionStorage', left: 'Universal support', right: '~99% global support' },
          { label: 'Canvas 2D API', left: 'All modern browsers', right: '~99% global support' },
          { label: 'Web Workers', left: 'All modern browsers', right: '~97% global support' },
          { label: 'File API', left: 'All modern browsers', right: '~98% global support' },
          { label: 'Drag & Drop API', left: 'Chrome, Firefox, Edge, Safari', right: '~96% (some mobile limitations)' },
          { label: 'IndexedDB', left: 'All modern browsers', right: '~98% global support' },
          { label: 'Intersection Observer', left: 'All modern browsers', right: '~97% global support' },
          { label: 'Web Notifications', left: 'Chrome, Firefox, Edge (limited Safari)', right: '~84%; iOS Safari restricted' },
          { label: 'WebRTC', left: 'All modern browsers', right: '~95% global support' },
        ]}
      />

      <AlertBox type="info" title="Check MDN for Live Compatibility Data">
        Browser support evolves rapidly. Always verify current support on MDN Web Docs (developer.mozilla.org) before shipping a feature. The Can I Use website (caniuse.com) provides detailed version-by-version breakdowns.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Always check permissions', description: 'Geolocation, Notifications, and Clipboard APIs require explicit user permission. Always request on user gesture, handle denial gracefully, and never prompt repeatedly.' },
        { title: 'Progressive enhancement', description: 'Check for API support before using it. Provide fallbacks for browsers that lack support. Never assume a feature is available.' },
        { title: 'Performance considerations', description: 'Canvas animations should use requestAnimationFrame, not setInterval. Web Workers prevent main thread blocking. Intersection Observer is more efficient than scroll event listeners.' },
        { title: 'Security model', description: 'Most powerful APIs require HTTPS. APIs like Geolocation and Notifications require user permission. File API cannot access the filesystem without user selection.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between localStorage and cookies?',
          answer: 'localStorage stores up to 5-10 MB of data accessible only by client-side JavaScript — it is never sent to the server automatically. Cookies are sent with every HTTP request to the server (increasing bandwidth), have smaller capacity (4 KB), and have expiration dates. Use localStorage for client-side state and cookies for session authentication and server-readable data.'
        },
        {
          question: 'Can Web Workers access the DOM?',
          answer: 'No. Web Workers run in a completely separate thread and have no access to the DOM, window object, or document. They communicate with the main thread exclusively via postMessage(). They do have access to fetch(), WebSockets, IndexedDB, setTimeout/setInterval, and crypto.'
        },
        {
          question: 'When should I use IndexedDB instead of localStorage?',
          answer: 'Use IndexedDB when you need to store more than ~5 MB, need to query data (not just key-value lookup), need transactions, or store binary data like Blobs. Use localStorage for simple key-value pairs under 5 MB. Consider using a wrapper library like Dexie.js to simplify IndexedDB\'s verbose API.'
        },
        {
          question: 'How do I prevent Intersection Observer from causing layout thrashing?',
          answer: 'Intersection Observer is already optimized to avoid layout thrashing — it fires callbacks asynchronously and batches observations. Avoid making DOM changes inside the callback that would trigger synchronous layout recalculation. Use CSS classes for visual changes instead of setting inline styles.'
        },
        {
          question: 'Are HTML5 APIs available in React and Vue applications?',
          answer: 'Yes, all HTML5 browser APIs are available in any JavaScript framework. In React, access them in useEffect hooks (for side effects) or event handlers. In Vue, use mounted() or setup() lifecycle. Always check typeof window !== "undefined" for server-side rendering (SSR) environments where browser APIs are not available.'
        },
      ]} />

      <AlertBox type="success" title="Summary">
        HTML5 browser APIs transform the web into a platform capable of native-app-level functionality. Master these 10 APIs — Geolocation, Web Storage, Canvas, Web Workers, File API, Drag and Drop, IndexedDB, Intersection Observer, Notifications, and WebRTC — and you can build offline-capable, performant, feature-rich web applications without any plugins or native code.
      </AlertBox>
    </BlogLayoutWithSidebarAds>
  );
}
