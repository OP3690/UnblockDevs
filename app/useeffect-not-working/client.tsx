'use client';

import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export default function UseEffectNotWorkingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
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
            <div className="p-3 bg-violet-100 rounded-lg">
              <Zap className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">useEffect Not Working — Every Common Problem Fixed</h1>
              <p className="text-sm text-gray-500 mt-1">Infinite loops, double invocation, async patterns, cleanup, and more</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <code className="bg-gray-100 px-1 rounded">useEffect</code> is the most powerful and most misunderstood
              React hook. Whether your effect is not running at all, running on every render, causing an infinite loop,
              or crashing after component unmount — this guide covers every scenario with broken code and exact fixes.
            </p>
            <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-lg">
              <p className="text-violet-800 text-sm font-medium">
                Mental model: useEffect runs after every render by default. The dependency array restricts when it
                re-runs. The returned function is cleanup — it runs before the next effect and on unmount.
              </p>
            </div>
          </section>

          {/* Issue 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 1: useEffect Runs Twice in React 18 (Strict Mode)</h2>
            <p className="text-gray-700 mb-4">
              React 18 Strict Mode intentionally mounts, unmounts, and remounts components in development. This causes
              every useEffect to fire twice on mount — once for the initial mount and once for the test remount. This
              only happens in development builds; production is unaffected. The goal is to surface effects that are not
              properly cleaned up.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Symptom — API called twice on mount:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// In React 18 StrictMode this runs twice in development
useEffect(() => {
  fetch('/api/user').then(r => r.json()).then(setUser);
  // No cleanup → React cannot cancel the first request
}, []);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — add AbortController cleanup:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  const controller = new AbortController();

  fetch('/api/user', { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort(); // ✅ cancels first request on remount
}, []);`}</pre>
            </div>
          </section>

          {/* Issue 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 2: Infinite Loop — Object or Function in Dependency Array</h2>
            <p className="text-gray-700 mb-4">
              Objects and functions are compared by reference in JavaScript. If you create an object or function inside
              the component body and include it in the dependency array, a new reference is created on every render,
              causing useEffect to re-run, which triggers another render, which creates another new reference — an
              infinite loop.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Bug — new object reference on every render:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ options is a new object on every render
const options = { method: 'GET', cache: 'no-store' };

useEffect(() => {
  fetchData(options); // triggers re-render → new options → loops
}, [options]); // ← infinite loop!

// ❌ Same problem with functions
const fetchUser = () => fetch('/api/user');
useEffect(() => {
  fetchUser();
}, [fetchUser]); // ← infinite loop!`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — useMemo / useCallback / move outside component:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Option 1: define outside component (stable reference)
const OPTIONS = { method: 'GET', cache: 'no-store' };

// ✅ Option 2: useMemo for objects
const options = useMemo(() => ({ method: 'GET' }), []);

// ✅ Option 3: useCallback for functions
const fetchUser = useCallback(() => fetch('/api/user'), []);

useEffect(() => {
  fetchUser();
}, [fetchUser]); // stable reference → runs once`}</pre>
            </div>
          </section>

          {/* Issue 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 3: Missing Dependency Warning (ESLint exhaustive-deps)</h2>
            <p className="text-gray-700 mb-4">
              The <code className="bg-gray-100 px-1 rounded">react-hooks/exhaustive-deps</code> ESLint rule warns when
              you read a value inside useEffect but do not include it in the dependency array. Ignoring these warnings
              leads to stale closure bugs. Most of the time the correct fix is to add the dependency.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Warning — userId not in deps:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ ESLint: React Hook useEffect has a missing dependency: 'userId'
useEffect(() => {
  fetchUser(userId); // reads userId but userId not in deps
}, []); // ← will use stale userId if it ever changes`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">Fixed — add userId to dependency array:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  fetchUser(userId); // ✅ re-fetches when userId changes
}, [userId]);

// When to safely suppress the warning:
// Only when you intentionally want a value frozen at mount
// and you understand the stale-closure implications
// eslint-disable-next-line react-hooks/exhaustive-deps`}</pre>
            </div>
          </section>

          {/* Issue 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 4: Async Inside useEffect — Wrong Pattern</h2>
            <p className="text-gray-700 mb-4">
              You cannot make the useEffect callback itself <code className="bg-gray-100 px-1 rounded">async</code>.
              An async function returns a Promise, but React expects the callback to return either{' '}
              <code className="bg-gray-100 px-1 rounded">undefined</code> or a cleanup function. Returning a Promise
              causes React to ignore the cleanup and may produce unexpected behavior.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — async callback causes React warning:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ useEffect callback must not be async
useEffect(async () => {
  const data = await fetch('/api/data').then(r => r.json());
  setData(data);
  // React ignores the cleanup from an async callback
}, []);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — define and call async function inside:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await fetch('/api/data', { signal: controller.signal });
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    }
  }

  fetchData(); // ✅ call the async function

  return () => controller.abort(); // ✅ cleanup still works
}, []);`}</pre>
            </div>
          </section>

          {/* Issue 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 5: useEffect Not Running — Empty Deps vs No Array</h2>
            <p className="text-gray-700 mb-4">
              The second argument to useEffect controls when it runs. Many developers confuse an empty array with no
              array at all.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2 pr-4 font-semibold text-gray-800">Pattern</th>
                      <th className="py-2 pr-4 font-semibold text-gray-800">When it runs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">useEffect(() =&gt; …)</td>
                      <td className="py-2 text-gray-700">After every render</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">useEffect(() =&gt; …, [])</td>
                      <td className="py-2 text-gray-700">Once after initial mount only</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">useEffect(() =&gt; …, [a, b])</td>
                      <td className="py-2 text-gray-700">After mount and whenever a or b changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// Runs after EVERY render (no array)
useEffect(() => {
  document.title = \`Count: \${count}\`;
});

// Runs ONCE after mount (empty array)
useEffect(() => {
  initializeThirdPartyLib();
}, []);

// Runs when count or userId changes
useEffect(() => {
  analytics.track('page-view', { count, userId });
}, [count, userId]);`}</pre>
          </section>

          {/* Issue 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 6: Cleanup Function — Subscriptions, Timers, Fetch</h2>
            <p className="text-gray-700 mb-4">
              Without cleanup, long-running side effects continue after the component unmounts, causing memory leaks and
              errors when they try to update state on a dead component. Always return a cleanup function for subscriptions,
              intervals, and fetch requests.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — timer keeps running after unmount:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  const timer = setInterval(() => {
    setTick(t => t + 1); // ❌ runs after component unmounts
  }, 1000);
  // No cleanup → memory leak
}, []);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — return cleanup for all side effects:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Timer cleanup
useEffect(() => {
  const timer = setInterval(() => setTick(t => t + 1), 1000);
  return () => clearInterval(timer);
}, []);

// ✅ Event listener cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);

// ✅ WebSocket cleanup
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = e => setMessages(prev => [...prev, e.data]);
  return () => ws.close();
}, []);`}</pre>
            </div>
          </section>

          {/* Issue 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue 7: State Update After Unmount</h2>
            <p className="text-gray-700 mb-4">
              The classic React warning:{' '}
              <em>"Can't perform a React state update on an unmounted component."</em> This happens when an async
              operation completes and calls setState after the component has already unmounted. Use an{' '}
              <code className="bg-gray-100 px-1 rounded">isMounted</code> flag or{' '}
              <code className="bg-gray-100 px-1 rounded">AbortController</code> to guard against this.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Bug — setState called after unmount:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  fetch('/api/slow-endpoint')
    .then(r => r.json())
    .then(data => {
      setData(data); // ❌ component may have unmounted by now
    });
  // No cleanup → React warning in console
}, []);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — AbortController (preferred) or isMounted flag:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Method 1: AbortController (recommended)
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/slow-endpoint', { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => { if (err.name !== 'AbortError') setError(err.message); });
  return () => controller.abort();
}, []);

// ✅ Method 2: isMounted flag (for non-fetch async)
useEffect(() => {
  let isMounted = true;
  someAsyncOperation().then(data => {
    if (isMounted) setData(data);
  });
  return () => { isMounted = false; };
}, []);`}</pre>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Debug API responses in our CORS Tester</h2>
              <p className="text-blue-100 mb-4">
                If your useEffect fetch is failing silently, it may be a CORS issue. Test your API endpoint to see
                exactly what headers are returned and why the request is blocked.
              </p>
              <Link
                href="/cors-tester"
                className="inline-block bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Open CORS Tester →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Why does useEffect run twice in React 18?',
                  a: 'React 18 Strict Mode double-invokes effects in development to help surface missing cleanup functions. Production is unaffected. Add a cleanup function (e.g. AbortController) to make your effect idempotent.',
                },
                {
                  q: 'How do I run useEffect only on mount?',
                  a: 'Pass an empty dependency array as the second argument: useEffect(() => { ... }, []). The effect runs exactly once after the first render.',
                },
                {
                  q: 'How do I fix an infinite loop in useEffect?',
                  a: 'Identify which dependency triggers a state update that changes that same dependency. Wrap object/function dependencies with useMemo/useCallback, or move them outside the component.',
                },
                {
                  q: 'How do I use async/await inside useEffect?',
                  a: 'Define an async function inside the effect callback and call it immediately. Never make the callback itself async — React expects a cleanup function, not a Promise.',
                },
                {
                  q: 'What is useEffect cleanup and when do I need it?',
                  a: 'Cleanup is the function returned from useEffect. React calls it before re-running the effect and on unmount. You need it for subscriptions, timers, and fetch requests to prevent memory leaks.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-700 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'CORS Tester', href: '/cors-tester' },
                { label: 'JSON Formatter', href: '/json-formatter' },
                { label: 'HAR to cURL', href: '/har-to-curl' },
                { label: 'JSON Validator', href: '/json-validator' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
