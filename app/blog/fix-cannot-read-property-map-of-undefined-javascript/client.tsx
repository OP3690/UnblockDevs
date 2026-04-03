'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixCannotReadPropertyMapOfUndefinedJavascriptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Cannot read property 'map' of undefined" — Every Cause with Solutions</h1>
      <p className="lead">
        <code>TypeError: Cannot read properties of undefined (reading 'map')</code> is one of the most
        common JavaScript and React runtime errors. It means you called <code>.map()</code> on a value that is
        <code>undefined</code> or <code>null</code>. This guide covers every cause — async data loading,
        wrong API shape, missing props, nested object access, and object vs array confusion — with the
        exact fix for each case, plus a universal safe map utility and TypeScript patterns to prevent
        this error entirely.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'most common React runtime error in production', color: 'red' },
        { value: 'undefined', label: 'the value you\'re calling .map() on', color: 'amber' },
        { value: '6 causes', label: 'all covered with exact fixes and code examples', color: 'blue' },
        { value: '?.operator', label: 'optional chaining prevents most cases instantly', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Root Cause — Why This Error Happens" />
      <QuickFact color="red" label="The core issue">
        <code>.map()</code> is an Array method. If the variable is <code>undefined</code>,
        <code>null</code>, a string, a number, or a plain object, JavaScript throws this TypeError.
        The fix is always the same: ensure the value is actually an array before calling <code>.map()</code>.
        The question is just why it became undefined in the first place.
      </QuickFact>

      <AlertBox type="error" title="The exact error messages">
        {`TypeError: Cannot read properties of undefined (reading 'map')  — Chrome, Node.js 16+`}
        {`\nTypeError: Cannot read property 'map' of undefined  — Chrome, Node.js <16 (older format)`}
        {`\nTypeError: undefined is not an object (evaluating 'items.map')  — Safari`}
        {`\nTypeError: items is undefined  — Firefox`}
      </AlertBox>

      <SectionHeader number={2} title="Cause 1 — Data Not Loaded Yet (Async React)" />
      <p>
        The most common cause in React. The component renders before the async fetch completes —
        so on the first render, the state variable is still at its initial value (often <code>undefined</code>).
        The fix: always initialize array state with an empty array <code>[]</code>, never with <code>undefined</code>.
      </p>
      <ErrorFix
        title="Always initialize array state with [] not undefined"
        bad={`// ❌ products is undefined on first render (before fetch completes)
function ProductList() {
  const [products, setProducts] = useState(); // initial state = undefined
  // React renders immediately with this undefined value

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data)); // sets state AFTER first render
  }, []);

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)} // ❌ CRASH on first render
    </ul>
  );
}`}
        good={`// ✅ Empty array initial state → safe on first render
function ProductList() {
  const [products, setProducts] = useState([]); // [] not undefined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.items ?? []);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)} // ✅ always works
    </ul>
  );
}`}
        badLabel="undefined initial state → crash on first render"
        goodLabel="[] initial state → safe on all renders"
      />

      <SectionHeader number={3} title="Cause 2 — API Returns Unexpected Shape" />
      <p>
        You expected an array directly but the API wraps it: <code>{`{ data: [...], total: 100 }`}</code>.
        The fix: always check the actual API response shape before assuming it's an array.
      </p>
      <ErrorFix
        title="Check actual API shape — don't assume array at root"
        bad={`// ❌ Assumed API returns array, but it returns an object
const response = await fetch('/api/products');
const products = await response.json();
// Actual response: { data: [...], total: 100, page: 1 }
// But 'products' is the whole object, not the array

products.map(p => p.name); // ❌ products is an object, not array`}
        good={`// ✅ Inspect response before assuming shape
const response = await fetch('/api/products');
const json = await response.json();

// Log in development to see actual shape:
if (process.env.NODE_ENV === 'development') {
  console.log('API response shape:', JSON.stringify(json).slice(0, 200));
}

// Safely extract array regardless of API wrapping:
const products = Array.isArray(json) ? json          // direct array
               : Array.isArray(json.data) ? json.data  // { data: [...] }
               : Array.isArray(json.items) ? json.items // { items: [...] }
               : Array.isArray(json.results) ? json.results // { results: [...] }
               : [];  // fallback — log a warning

if (!products.length && json) {
  console.warn('Could not find array in API response:', Object.keys(json));
}

products.map(p => p.name); // ✅ always an array`}
        badLabel="Assume API returns array at root"
        goodLabel="Handle multiple possible API shapes with explicit extraction"
      />

      <SectionHeader number={4} title="Cause 3 — Props Not Passed or Missing Default" />
      <ErrorFix
        title="Always provide default values for array props"
        bad={`// ❌ Parent forgets to pass products prop
function Parent() {
  return <ProductList />; // no products prop = undefined in child
}

function ProductList({ products }) {
  // products = undefined (prop was never passed)
  return products.map(p => <div key={p.id}>{p.name}</div>); // ❌ crash
}`}
        good={`// ✅ Option 1: Default parameter value (recommended)
function ProductList({ products = [] }) {
  return products.map(p => <div key={p.id}>{p.name}</div>); // always works
}

// ✅ Option 2: Guard clause
function ProductList({ products }) {
  if (!Array.isArray(products)) return null; // or return <EmptyState />
  return products.map(p => <div key={p.id}>{p.name}</div>);
}

// ✅ Option 3: TypeScript to catch at compile time (preferred)
interface ProductListProps {
  products: Product[]; // required — TypeScript error if parent doesn't pass it
}
function ProductList({ products }: ProductListProps) {
  return products.map(p => <div key={p.id}>{p.name}</div>);
}

// ✅ Option 4: PropTypes for runtime validation
import PropTypes from 'prop-types';
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};`}
        badLabel="No default value — crashes when prop not passed"
        goodLabel="Default value or guard clause prevents crash"
      />

      <SectionHeader number={5} title="Cause 4 — Nested Object Access" />
      <ErrorFix
        title="Use optional chaining for nested property access"
        bad={`// ❌ Nested property may not exist
const user = { name: 'Alice' }; // no 'orders' property
user.orders.map(order => order.id); // ❌ user.orders is undefined

// ❌ Deeply nested
response.data.users.map(u => u.email); // fails if any level is undefined`}
        good={`// ✅ Option 1: Optional chaining (modern, recommended)
user.orders?.map(order => order.id) ?? [];

// ✅ Option 2: Nullish coalescing with fallback
(user.orders ?? []).map(order => order.id);

// ✅ Option 3: Explicit guard
if (user.orders && Array.isArray(user.orders)) {
  user.orders.map(order => order.id);
}

// ✅ Deeply nested with optional chaining
(response?.data?.users ?? []).map(u => u.email);

// ✅ In JSX:
{user?.orders?.map(order => (
  <div key={order.id}>{order.name}</div>
)) ?? <p>No orders</p>}`}
        badLabel="No optional chaining — crashes on any undefined in chain"
        goodLabel="Optional chaining handles any undefined in the chain safely"
      />

      <SectionHeader number={6} title="Cause 5 — Object Instead of Array" />
      <ErrorFix
        title="Objects don't have .map() — convert to array first"
        bad={`// ❌ .map() called on a plain object
const userMap = { alice: {id: 1}, bob: {id: 2} };
userMap.map(user => user.id); // TypeError: userMap.map is not a function

// ❌ JSON response parsed as object when you expected array
const data = JSON.parse('{"user1": {...}, "user2": {...}}');
data.map(u => u.name); // TypeError`}
        good={`// ✅ Convert object to array using Object methods
const userMap = { alice: {id: 1}, bob: {id: 2} };

Object.values(userMap).map(user => user.id);         // [1, 2]
Object.keys(userMap).map(key => userMap[key].id);    // [1, 2]
Object.entries(userMap).map(([key, val]) => val.id); // [1, 2]

// ✅ In JSX — mapping over object values:
{Object.values(userMap).map(user => (
  <div key={user.id}>{user.name}</div>
))}`}
        badLabel=".map() on an object → TypeError"
        goodLabel="Object.values() → array → .map()"
      />

      <SectionHeader number={7} title="Cause 6 — Redux/Context State Not Initialized" />
      <ErrorFix
        title="Initialize Redux slice array state correctly"
        bad={`// ❌ Redux slice initial state is undefined
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: undefined, // ❌ will be undefined until first fetch
    loading: false,
  },
  // ...
});

// Component:
const items = useSelector(state => state.products.items);
items.map(item => item.id); // ❌ crash before first fetch`}
        good={`// ✅ Redux slice with array initial state
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],     // ✅ always an array
    loading: false,
    error: null,
  },
  // ...
});

// Component with safe selector:
const items = useSelector(state => state.products.items ?? []);
items.map(item => item.id); // ✅ always works`}
        badLabel="undefined initial Redux state"
        goodLabel="[] initial state + nullish coalescing in selector"
      />

      <SectionHeader number={8} title="Universal Safe .map() Utility" />
      <CodeBlock lang="javascript" title="safeMap utility + TypeScript version">
{`// ─── JavaScript safeMap ──────────────────────────────────────────────────────
function safeMap(value, callback, fallback = []) {
  if (value === null || value === undefined) return fallback;
  if (!Array.isArray(value)) {
    console.warn('[safeMap] Expected array, got:', typeof value, value);
    return fallback;
  }
  return value.map(callback);
}

// Usage — never throws even if data is undefined/null/object
const ids = safeMap(apiResponse?.data, item => item.id);
const names = safeMap(user?.orders, order => order.name, ['No orders']);

// ─── Inline alternatives (no utility needed) ─────────────────────────────────
const ids = apiResponse?.data?.map(item => item.id) ?? [];
const ids = (apiResponse?.data ?? []).map(item => item.id);
const ids = Array.isArray(data) ? data.map(item => item.id) : [];

// ─── TypeScript: prevent at compile time ─────────────────────────────────────
// Using strict types forces callers to handle undefined explicitly
function mapItems<T, R>(
  items: T[] | undefined | null,
  callback: (item: T) => R
): R[] {
  return (items ?? []).map(callback);
}

// Now TypeScript will error if you forget the safe access pattern
// mapItems(undefined, x => x); // returns []
// mapItems(null, x => x);      // returns []
// mapItems([1,2,3], x => x*2); // returns [2,4,6]

// ─── React custom hook for async arrays ──────────────────────────────────────
function useApiArray<T>(url: string): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => setData(Array.isArray(json) ? json : json.data ?? []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage:
const { data: products, loading } = useApiArray<Product>('/api/products');
// products is always a Product[] — never undefined`}
      </CodeBlock>

      <SectionHeader number={9} title="Debugging Checklist" />
      <VerticalSteps steps={[
        { title: 'Log the value before .map()', desc: 'Add console.log("value:", typeof myValue, myValue) immediately before the .map() call. This shows the actual type and value.' },
        { title: 'Check initial state', desc: 'If in React: is the useState() initialized with [] or undefined? Always use [] for arrays.' },
        { title: 'Check the API response shape', desc: 'Open DevTools → Network → find the request → Preview tab. Is the response an array or an object wrapping an array? Extract the nested array.' },
        { title: 'Check prop passing', desc: 'In React DevTools, inspect the component. Is the prop value undefined? Did the parent forget to pass it, or pass the wrong variable name?' },
        { title: 'Add Array.isArray() guard', desc: 'Wrap in: if (!Array.isArray(value)) { console.error("not array:", value); return null; } as a temporary diagnostic.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does this error happen only sometimes in React?',
          answer: 'Because React renders before async data loads. The first render happens with initial state, then data loads and triggers a re-render with the fetched data. If initial state is undefined and you call .map() without a guard, only the first render crashes. The fix: always use [] as initial state for arrays — then the first render shows an empty list (or loading state), and subsequent renders show real data.',
        },
        {
          question: 'What is the difference between undefined and null in this context?',
          answer: 'Both cause the same error message but slightly differently: undefined.map() → "Cannot read properties of undefined" and null.map() → "Cannot read properties of null". The fix is identical for both: guard with if (!value) return []; or use optional chaining value?.map(). The nullish coalescing pattern (value ?? []).map() handles both: null and undefined both trigger ?? and return [].',
        },
        {
          question: 'How do I debug this error quickly?',
          answer: 'Add console.log(typeof yourValue, yourValue) right before the .map() call. If it logs "undefined undefined" — the variable was never assigned. If it logs "object {...}" — you have an object not an array (use Object.values()). If it logs "object null" — it\'s null (use optional chaining or ?? []). The typeof output is always the fastest debugging signal.',
        },
        {
          question: 'Should I use optional chaining everywhere?',
          answer: 'Use it for uncertain data (API responses, props from external callers, localStorage values, deeply nested objects). Don\'t use it as a lazy crutch on data that should always be an array — if a value should always be an array, use a non-optional type in TypeScript or an explicit assertion so you get clear errors when something unexpected happens. Silent failures (returning undefined instead of throwing) can hide real bugs.',
        },
        {
          question: 'How do I prevent this in TypeScript?',
          answer: 'TypeScript with strict mode will catch most of these at compile time. Type your state: useState<Product[]>([]) forces the type to always be Product[], so TypeScript errors if you try to assign undefined. Type your props: products: Product[] makes it required. Use the non-null assertion (products!) sparingly — it silences TypeScript without actually preventing the runtime error. The best protection: proper types + [] initial values.',
        },
        {
          question: 'What if the array is empty vs undefined — should I handle them the same?',
          answer: 'No — they represent different situations. undefined usually means "hasn\'t loaded yet" (show loading spinner). [] means "loaded successfully, no items" (show empty state UI). null often means "failed to load" (show error). Handle them distinctly: if (loading) return <Spinner />; if (error) return <Error />; if (!products.length) return <EmptyState />; return products.map(...).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
