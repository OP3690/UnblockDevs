'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function CannotReadPropertyUndefinedClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
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
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Fix &quot;Cannot Read Properties of Undefined&quot; in JavaScript
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Optional chaining, nullish coalescing, and defensive patterns for every case
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* What the error means */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Error Means</h2>
            <p className="text-gray-700 mb-4">
              The full error is typically:{' '}
              <code className="bg-gray-100 px-1 rounded text-red-700">
                TypeError: Cannot read properties of undefined (reading &apos;X&apos;)
              </code>{' '}
              or the older form:{' '}
              <code className="bg-gray-100 px-1 rounded text-red-700">
                TypeError: Cannot read property &apos;X&apos; of null
              </code>
              . Both mean the same thing: you tried to access a property on a value that is{' '}
              <code className="bg-gray-100 px-1 rounded">undefined</code> or{' '}
              <code className="bg-gray-100 px-1 rounded">null</code>, which have no properties.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">The error in action:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const user = undefined;

console.log(user.name);
// TypeError: Cannot read properties of undefined (reading 'name')

const data = null;
console.log(data.items.map(x => x.id));
// TypeError: Cannot read properties of null (reading 'items')`}</pre>
            </div>
            <p className="text-gray-700">
              The property name in parentheses is the first property that failed — not necessarily the deepest one in
              your chain. Read the stack trace to find exactly which line triggered it.
            </p>
          </section>

          {/* Fix 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 1: Optional Chaining (?.) — The Modern Solution</h2>
            <p className="text-gray-700 mb-4">
              Optional chaining (<code className="bg-gray-100 px-1 rounded">?.</code>) short-circuits and returns{' '}
              <code className="bg-gray-100 px-1 rounded">undefined</code> instead of throwing when the left side is
              null or undefined. It works with property access, method calls, and bracket notation.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Without optional chaining — crashes on undefined:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const user = { address: undefined };

console.log(user.address.city); // ❌ TypeError
console.log(user.profile.avatar); // ❌ TypeError
user.save(); // ❌ TypeError if save doesn't exist`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">With optional chaining — returns undefined safely:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Property chains
const city = user?.address?.city;           // undefined, no crash
const avatar = user?.profile?.avatar;       // undefined, no crash

// ✅ Method calls
user?.save();                               // skipped if save doesn't exist

// ✅ Array / bracket access
const first = items?.[0]?.name;            // undefined if items is empty

// ✅ Deep chain
const zip = response?.data?.user?.address?.zip;`}</pre>
            </div>
          </section>

          {/* Fix 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 2: Default Values — Nullish Coalescing (??)</h2>
            <p className="text-gray-700 mb-4">
              Combine optional chaining with the nullish coalescing operator{' '}
              <code className="bg-gray-100 px-1 rounded">??</code> to provide a fallback when the value is null or
              undefined. Unlike <code className="bg-gray-100 px-1 rounded">||</code>, it does not fall through for
              falsy values like <code className="bg-gray-100 px-1 rounded">0</code> or{' '}
              <code className="bg-gray-100 px-1 rounded">""</code>.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">OR operator swallows valid falsy values:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const count = apiData.count || 10;
// ❌ If count is 0, this gives 10 instead of 0!

const name = user.name || 'Anonymous';
// ❌ If name is "" (empty string), this gives 'Anonymous'`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Nullish coalescing only falls back for null/undefined:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Only falls back if null or undefined
const count = apiData?.count ?? 0;       // 0 stays 0
const name = user?.name ?? 'Anonymous'; // "" stays ""
const items = data?.items ?? [];        // safe array default
const label = config?.label ?? 'Default Label';`}</pre>
            </div>
          </section>

          {/* Fix 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 3: Async Data in React — Guard Before Render</h2>
            <p className="text-gray-700 mb-4">
              In React, data fetched from an API is not available on the first render. The component renders with
              initial state (often <code className="bg-gray-100 px-1 rounded">null</code> or{' '}
              <code className="bg-gray-100 px-1 rounded">undefined</code>) before the fetch resolves. Always guard
              your render with a loading or existence check.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Bug — render runs before data loads:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`function UserProfile() {
  const [user, setUser] = useState(null); // null on first render

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);

  // ❌ Crashes on first render — user is null
  return <div>{user.name}</div>;
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — guard with loading state and conditional render:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(data => { setUser(data); setLoading(false); });
  }, []);

  // ✅ Guard patterns
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  // Safe to access user here
  return <div>{user.name}</div>;
}`}</pre>
            </div>
          </section>

          {/* Fix 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 4: API Response Structure — Always Destructure Safely</h2>
            <p className="text-gray-700 mb-4">
              One of the most common sources of this error is assuming an API response has a certain shape when it does
              not. Always validate or inspect the response structure first, then access properties defensively.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Assuming too much about the response:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// API returns: { status: "ok", payload: { users: [...] } }
// But you assumed: { users: [...] }

const res = await fetch('/api/users');
const data = await res.json();

// ❌ TypeError: Cannot read properties of undefined (reading 'map')
data.users.map(u => u.name);  // data.users is undefined!`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — inspect then destructure with defaults:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const res = await fetch('/api/users');
const data = await res.json();

// ✅ Log to understand the shape first
console.log('API response:', JSON.stringify(data, null, 2));

// ✅ Destructure with safe defaults
const { payload: { users = [] } = {} } = data;
users.map(u => u.name); // safe

// ✅ Or use optional chaining
const users = data?.payload?.users ?? [];`}</pre>
            </div>
          </section>

          {/* Fix 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 5: Array Methods on Undefined</h2>
            <p className="text-gray-700 mb-4">
              Calling <code className="bg-gray-100 px-1 rounded">.map()</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">.filter()</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">.find()</code>, or{' '}
              <code className="bg-gray-100 px-1 rounded">.length</code> on undefined is one of the most common causes
              of this error in React components rendering lists from API data.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Common crashes with array methods:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`const [products, setProducts] = useState(); // ❌ no initial value

// ❌ Cannot read properties of undefined (reading 'map')
return products.map(p => <li key={p.id}>{p.name}</li>);

// ❌ Cannot read properties of undefined (reading 'length')
console.log(products.length);

// ❌ Cannot read properties of undefined (reading 'filter')
const active = products.filter(p => p.active);`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — initialize with empty array, guard with ?? []:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Initialize state with empty array
const [products, setProducts] = useState([]);

// ✅ Fallback in case API returns undefined
(products ?? []).map(p => <li key={p.id}>{p.name}</li>);

// ✅ Optional chaining with array methods
products?.map(p => <li key={p.id}>{p.name}</li>);

// ✅ Guard before render
{Array.isArray(products) && products.map(p => (
  <li key={p.id}>{p.name}</li>
))}`}</pre>
            </div>
          </section>

          {/* Fix 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fix 6: Deep Object Access — Lodash get or Optional Chaining Chain</h2>
            <p className="text-gray-700 mb-4">
              When accessing deeply nested properties (4+ levels), optional chaining chains can get verbose. Lodash{' '}
              <code className="bg-gray-100 px-1 rounded">_.get()</code> provides a clean alternative with a default
              value parameter.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-900 mb-2">Deeply nested access — easy to miss a level:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ❌ Crashes if any level is undefined
const zip = response.body.data.user.address.zip;

// ❌ Verbose but still error-prone
if (response && response.body && response.body.data &&
    response.body.data.user && response.body.data.user.address) {
  const zip = response.body.data.user.address.zip;
}`}</pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-900 mb-2">Fixed — optional chaining or lodash get:</p>
              <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{`// ✅ Optional chaining chain
const zip = response?.body?.data?.user?.address?.zip ?? 'N/A';

// ✅ Lodash _.get with default
import _ from 'lodash';
const zip = _.get(response, 'body.data.user.address.zip', 'N/A');

// ✅ For arrays of objects
const firstTag = _.get(post, 'metadata.tags[0].name', 'untagged');
// Equivalent to: post?.metadata?.tags?.[0]?.name ?? 'untagged'`}</pre>
            </div>
          </section>

          {/* Quick patterns */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Defensive Programming Patterns</h2>
            <p className="text-gray-700 mb-4">
              Keep these patterns in your toolkit for writing resilient JavaScript and React code:
            </p>
            <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto font-mono">{`// Safe property access
const name = user?.name ?? 'Anonymous';

// Safe method calls
user?.save?.();

// Safe array defaults
const list = data?.items ?? [];
const count = data?.items?.length ?? 0;

// Safe array methods
const names = (users ?? []).map(u => u.name);
const active = users?.filter(u => u.active) ?? [];

// Safe destructuring with defaults
const { name = '', age = 0, roles = [] } = user ?? {};

// Type guards before operations
if (typeof value === 'string') { /* safe to call .trim() */ }
if (Array.isArray(items)) { /* safe to call .map() */ }
if (value != null) { /* safe: not null or undefined */ }

// Early return guard
function getUserCity(user) {
  if (!user?.address) return null;
  return user.address.city;
}`}</pre>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Validate your JSON API response structure</h2>
              <p className="text-blue-100 mb-4">
                Paste your API response into the JSON Validator to see the exact structure and verify property paths
                before accessing them in your code.
              </p>
              <Link
                href="/json-validator"
                className="inline-block bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Open JSON Validator →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What causes 'Cannot read properties of undefined'?",
                  a: "You tried to access a property on a value that is undefined or null. Common causes: API data not yet loaded, typo in property name, array method called on undefined, or missing key in a nested object.",
                },
                {
                  q: 'How does optional chaining fix this?',
                  a: 'Optional chaining (?.) returns undefined instead of throwing when the left side is null or undefined. user?.profile?.name returns undefined safely rather than crashing.',
                },
                {
                  q: 'How do I safely access deeply nested object properties?',
                  a: "Use optional chaining: user?.address?.city ?? 'Unknown'. For very deep paths, lodash _.get(obj, 'a.b.c', default) never throws regardless of depth.",
                },
                {
                  q: 'Why does my API response show undefined in React?',
                  a: 'On the first render, async data has not loaded yet. Initialize state with a safe default (null or []) and render conditionally: if (!data) return <Loading />.',
                },
                {
                  q: 'What is the difference between null and undefined?',
                  a: 'undefined is the absence of assignment; null is an intentional empty value. Both cause this error when you access properties on them. Optional chaining handles both.',
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
                { label: 'JSON Validator', href: '/json-validator' },
                { label: 'JSON Formatter', href: '/json-formatter' },
                { label: 'CORS Tester', href: '/cors-tester' },
                { label: 'HAR to cURL', href: '/har-to-curl' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
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
