'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function ReactStateNotUpdatingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
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
            <div className="p-3 bg-cyan-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">React State Not Updating — 7 Causes and Fixes</h1>
              <p className="text-sm text-gray-500 mt-1">Complete guide with code examples for every common state bug</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              React state updates not reflecting in the UI is one of the most frustrating bugs new and experienced React
              developers encounter. The root cause is almost always one of seven predictable issues — from direct
              mutation to stale closures. This guide walks through every cause with a broken example and the exact fix.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm font-medium">
                Quick diagnosis: if the state value looks correct in React DevTools but the UI does not update, you have
                a rendering issue. If DevTools also shows the old value, the state is not being updated at all — check
                causes 1, 3, and 4 below.
              </p>
            </div>
          </section>

          {/* Cause 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 1: Mutating State Directly</h2>
            <p className="text-gray-700 mb-4">
              React uses shallow reference equality to decide whether to re-render. If you mutate an array or object in
              place, the reference stays the same, so React sees no change and skips the re-render entirely.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — direct mutation (no re-render):</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ Mutating the array directly
const [items, setItems] = useState(['apple', 'banana']);

function addItem() {
  items.push('cherry');   // mutates the same array reference
  setItems(items);        // React sees the same ref → no re-render
}

// ❌ Mutating an object directly
const [user, setUser] = useState({ name: 'Alice', age: 30 });

function birthday() {
  user.age += 1;          // mutates the same object reference
  setUser(user);          // React sees the same ref → no re-render
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">Fixed — always return a new reference:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Spread to create a new array
function addItem() {
  setItems(prev => [...prev, 'cherry']);
}

// ✅ Filter returns a new array
function removeItem(index) {
  setItems(prev => prev.filter((_, i) => i !== index));
}

// ✅ Spread to create a new object
function birthday() {
  setUser(prev => ({ ...prev, age: prev.age + 1 }));
}`}</pre>
            </div>
          </section>

          {/* Cause 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 2: State Updates Are Asynchronous</h2>
            <p className="text-gray-700 mb-4">
              Calling <code className="bg-gray-100 px-1 rounded">setState</code> does not immediately update the
              variable. React schedules the update and re-renders the component. Reading the variable right after
              calling setState will still show the old value.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — reading state right after setting it:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // ❌ still logs 0 — update hasn't happened yet
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">Fixed — use useEffect to observe the new value:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [count, setCount] = useState(0);

// ✅ useEffect runs after the render with the new value
useEffect(() => {
  console.log('New count:', count); // logs the updated value
}, [count]);

function handleClick() {
  setCount(prev => prev + 1);
  // Do not read count here — read it in the next render
}`}</pre>
            </div>
          </section>

          {/* Cause 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 3: Stale Closure in useEffect or Callbacks</h2>
            <p className="text-gray-700 mb-4">
              A closure captures the values of variables at the time it is created. If a useEffect or an event handler
              closes over a state variable and that variable later changes, the function still uses the old captured
              value — this is a stale closure.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Bug — counter stuck at 1 because of stale closure:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // ❌ 'count' is always 0 (captured at mount)
  }, 1000);
  return () => clearInterval(interval);
}, []); // empty deps — closure never refreshes`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-green-900 mb-2">Fix 1 — functional updater (preferred):</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1); // ✅ always uses latest state
  }, 1000);
  return () => clearInterval(interval);
}, []);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fix 2 — add to dependency array (re-creates effect):</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // ✅ count is fresh each time
  }, 1000);
  return () => clearInterval(interval);
}, [count]); // interval is recreated when count changes`}</pre>
            </div>
          </section>

          {/* Cause 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 4: Object/Array Reference Did Not Change</h2>
            <p className="text-gray-700 mb-4">
              React compares state with <code className="bg-gray-100 px-1 rounded">Object.is()</code>. If you pass the
              exact same object or array reference to setState, React bails out of re-rendering even if the contents
              changed internally.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — same reference passed to setState:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [list, setList] = useState([1, 2, 3]);

function update() {
  list[0] = 99;        // mutates in place
  setList(list);       // ❌ same reference — no re-render
}

// Also wrong with objects
const [config, setConfig] = useState({ theme: 'light' });
function toggle() {
  config.theme = 'dark'; // ❌ mutation
  setConfig(config);     // ❌ same reference
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — always produce a new reference:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`function update() {
  setList(prev => prev.map((v, i) => (i === 0 ? 99 : v))); // ✅ new array

  // Or with spread
  const newList = [...list];
  newList[0] = 99;
  setList(newList); // ✅ new reference
}

function toggle() {
  setConfig(prev => ({ ...prev, theme: 'dark' })); // ✅ new object
}`}</pre>
            </div>
          </section>

          {/* Cause 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 5: Setting State in the Wrong Component</h2>
            <p className="text-gray-700 mb-4">
              React state lives in a component and only re-renders that component and its children. If a sibling or
              parent component needs the updated value, you must lift state up to the nearest common ancestor.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — sibling cannot see the state:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ Counter state is isolated to this component
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

function Display() {
  // ❌ Cannot read count — it lives in Counter
  return <p>Count is: ???</p>;
}

function App() {
  return <><Counter /><Display /></>;
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — lift state to the common parent:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ State lives in App and is passed down as props
function Counter({ count, onIncrement }) {
  return <button onClick={onIncrement}>{count}</button>;
}

function Display({ count }) {
  return <p>Count is: {count}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Counter count={count} onIncrement={() => setCount(c => c + 1)} />
      <Display count={count} />
    </>
  );
}`}</pre>
            </div>
          </section>

          {/* Cause 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cause 6: React 18 Automatic Batching</h2>
            <p className="text-gray-700 mb-4">
              In React 18, all state updates are batched automatically — even those inside{' '}
              <code className="bg-gray-100 px-1 rounded">setTimeout</code>, Promises, and native event handlers. This
              means three consecutive setState calls cause only one re-render. This is a performance improvement but can
              be surprising if you expect each call to trigger a separate render.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Surprising — only one re-render for three setState calls:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// React 18: all three batched into one render
async function fetchData() {
  const data = await api.get('/user');
  setUser(data.user);       // batched
  setLoading(false);        // batched
  setError(null);           // batched
  // ← only ONE re-render happens after this function resolves
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Opt out when you need separate renders (rare):</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`import { flushSync } from 'react-dom';

// ✅ Forces a synchronous render after each call
flushSync(() => setUser(data.user));
flushSync(() => setLoading(false));
// Use sparingly — batching is almost always what you want`}</pre>
            </div>
          </section>

          {/* Cause 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cause 7: Updating Object State Without Spreading
            </h2>
            <p className="text-gray-700 mb-4">
              Unlike <code className="bg-gray-100 px-1 rounded">this.setState</code> in class components, the{' '}
              <code className="bg-gray-100 px-1 rounded">useState</code> setter replaces the entire state value. If
              you pass a partial object, all other keys are lost.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Wrong — overwrites the entire state object:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [user, setUser] = useState({ name: 'Alice', age: 30, role: 'admin' });

function updateName(newName) {
  setUser({ name: newName }); // ❌ age and role are now gone!
  // State becomes: { name: 'Bob' }
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — spread existing state, then override:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`function updateName(newName) {
  setUser(prev => ({ ...prev, name: newName })); // ✅ preserves age and role
}

// Or for deeply nested state consider useReducer:
const [user, dispatch] = useReducer(userReducer, initialUser);
dispatch({ type: 'SET_NAME', payload: newName });`}</pre>
            </div>
          </section>

          {/* Functional updater section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use the Functional Updater Form</h2>
            <p className="text-gray-700 mb-4">
              The functional updater <code className="bg-gray-100 px-1 rounded">setState(prev =&gt; newValue)</code>{' '}
              guarantees you always read the latest state, even if the component re-renders between enqueued updates.
              Use it whenever:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>The new value depends on the previous value</li>
              <li>You are updating state inside a timeout, interval, or Promise</li>
              <li>You are updating state inside a useEffect or an event handler that may be stale</li>
              <li>Multiple updates are batched together and order matters</li>
            </ul>
            <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// Always safe — never stale
setCount(prev => prev + 1);
setItems(prev => [...prev, newItem]);
setUser(prev => ({ ...prev, name: 'Bob' }));
setFlags(prev => ({ ...prev, isLoading: false }));`}</pre>
          </section>

          {/* Debugging section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Debugging React State</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">React DevTools</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Install the React DevTools browser extension. Select any component in the Components tab to see its
                  state and props in real time. You can even edit state values directly to test UI changes without code.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Log state in useEffect, not inline</h3>
                <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ Logs old value synchronously
setCount(count + 1);
console.log(count);

// ✅ Logs updated value after re-render
useEffect(() => {
  console.log('count updated to:', count);
}, [count]);`}</pre>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Render count trick</h3>
                <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const renderCount = useRef(0);
renderCount.current += 1;
console.log('Renders:', renderCount.current);
// If this climbs fast → you likely have an infinite loop`}</pre>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Format and validate your API response JSON</h2>
              <p className="text-blue-100 mb-4">
                Malformed API responses are a hidden cause of undefined state bugs. Validate your JSON structure before
                wiring it into React state.
              </p>
              <Link
                href="/json-formatter"
                className="inline-block bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Open JSON Formatter →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Why does console.log show old state after setState?',
                  a: 'setState is asynchronous. The variable in your closure still holds the old value for the rest of that synchronous execution. Use useEffect with the state as a dependency to observe the updated value.',
                },
                {
                  q: 'Does React batch state updates?',
                  a: 'Yes. React 18 batches all state updates automatically, even inside setTimeout and Promises. Multiple setState calls in one function produce a single re-render.',
                },
                {
                  q: 'How do I fix stale closure in useEffect?',
                  a: 'Use the functional updater form: setState(prev => prev + 1). This always receives the latest state regardless of when the closure was created.',
                },
                {
                  q: 'Why is my array state not updating?',
                  a: 'You are likely mutating the array in place. Use spread: setItems(prev => [...prev, newItem]) to always return a new reference that React can detect.',
                },
                {
                  q: 'When should I use functional updater form?',
                  a: 'Whenever the new value depends on the previous value — especially inside useEffect, timers, async functions, or event handlers that could capture a stale value.',
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
                { label: 'JSON Formatter', href: '/json-formatter' },
                { label: 'JSON Validator', href: '/json-validator' },
                { label: 'CORS Tester', href: '/cors-tester' },
                { label: 'HAR to cURL', href: '/har-to-curl' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
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
