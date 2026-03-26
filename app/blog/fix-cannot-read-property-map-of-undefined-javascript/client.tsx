'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function FixCannotReadPropertyMapOfUndefinedJavascriptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Fix "Cannot read property 'map' of undefined" — Every Cause with Solutions</h1>
      <p className="lead">
        <code>TypeError: Cannot read properties of undefined (reading 'map')</code> is one of the most
        common JavaScript errors. It means you called <code>.map()</code> on a value that is
        <code>undefined</code> or <code>null</code>. This guide covers every cause and the exact fix for each.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'most common React runtime error', color: 'red' },
        { value: 'undefined', label: 'the value you\'re trying to .map()', color: 'amber' },
        { value: '5 causes', label: 'all explained with code', color: 'blue' },
        { value: '?. operator', label: 'optional chaining prevents most cases', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Root Cause" />
      <QuickFact>
        <code>.map()</code> only works on arrays. If the variable is <code>undefined</code>,
        <code>null</code>, a string, or an object, you get this error. The fix is always to ensure
        the value is an array before calling <code>.map()</code>.
      </QuickFact>

      <AlertBox type="error" title="The error message">
        {`TypeError: Cannot read properties of undefined (reading 'map')`}
        {`\nOR (older browsers): TypeError: Cannot read property 'map' of undefined`}
      </AlertBox>

      <SectionHeader number={2} title="Cause 1 — Data Not Loaded Yet (Async)" />
      <ErrorFix
        bad={`// products is undefined while fetch is in progress
function ProductList() {
  const [products, setProducts] = useState(); // ❌ initial state is undefined

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return products.map(p => <div key={p.id}>{p.name}</div>); // ❌ crashes on first render
}`}
        good={`function ProductList() {
  const [products, setProducts] = useState([]); // ✅ empty array as initial state

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  if (!products.length) return <div>Loading...</div>;

  return products.map(p => <div key={p.id}>{p.name}</div>); // ✅ safe
}`}
        badLabel="undefined initial state"
        goodLabel="[] initial state + loading check"
      />

      <SectionHeader number={3} title="Cause 2 — API Returns Unexpected Shape" />
      <ErrorFix
        bad={`// You assumed API returns an array, but it returns an object
const response = await fetch('/api/products');
const products = await response.json();
// API actually returns: { data: [...], total: 100 }
// But you assumed: [...]
products.map(p => p.name); // ❌ products is an object, not array`}
        good={`const response = await fetch('/api/products');
const json = await response.json();

// Safely extract the array regardless of API shape
const products = Array.isArray(json) ? json
               : Array.isArray(json.data) ? json.data
               : Array.isArray(json.items) ? json.items
               : [];

products.map(p => p.name); // ✅ always an array`}
        badLabel="Assume API returns array"
        goodLabel="Handle multiple possible shapes"
      />

      <SectionHeader number={4} title="Cause 3 — Props Not Passed" />
      <ErrorFix
        bad={`// Parent forgets to pass the products prop
function Parent() {
  return <ProductList />; // ❌ products prop is undefined
}

function ProductList({ products }) {
  return products.map(p => <div key={p.id}>{p.name}</div>); // ❌ crash
}`}
        good={`// Option 1: Default prop value
function ProductList({ products = [] }) {
  return products.map(p => <div key={p.id}>{p.name}</div>); // ✅ safe
}

// Option 2: Prop validation with PropTypes
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Option 3: Guard clause
function ProductList({ products }) {
  if (!Array.isArray(products)) return null;
  return products.map(p => <div key={p.id}>{p.name}</div>);
}`}
        badLabel="No default value for prop"
        goodLabel="Default value or guard clause"
      />

      <SectionHeader number={5} title="Cause 4 — Nested Object Access" />
      <ErrorFix
        bad={`// Trying to map over a nested property that may not exist
const user = { name: 'Alice' }; // no 'orders' property

user.orders.map(order => order.id); // ❌ user.orders is undefined`}
        good={`// Option 1: Optional chaining (modern, recommended)
user.orders?.map(order => order.id) ?? [];

// Option 2: Nullish coalescing with fallback
(user.orders ?? []).map(order => order.id);

// Option 3: Explicit check
if (user.orders && Array.isArray(user.orders)) {
  user.orders.map(order => order.id);
}`}
        badLabel="No optional chaining"
        goodLabel="Optional chaining or nullish coalescing"
      />

      <SectionHeader number={6} title="Cause 5 — Object.entries() / Object.keys() Mix-up" />
      <ErrorFix
        bad={`const userMap = { alice: {id: 1}, bob: {id: 2} };

// ❌ Objects don't have .map() — only arrays do
userMap.map(user => user.id); // TypeError!`}
        good={`const userMap = { alice: {id: 1}, bob: {id: 2} };

// ✅ Convert object to array first
Object.values(userMap).map(user => user.id);        // [1, 2]
Object.keys(userMap).map(key => userMap[key].id);   // [1, 2]
Object.entries(userMap).map(([key, val]) => val.id); // [1, 2]`}
        badLabel=".map() called on object"
        goodLabel="Object.values() → array → .map()"
      />

      <SectionHeader number={7} title="Universal Safe .map() Wrapper" />
      <CodeBlock language="javascript" filename="safeMap utility">
{`// Universal safe map helper — use when data shape is uncertain
function safeMap(value, callback) {
  if (!value) return [];
  if (!Array.isArray(value)) {
    console.warn('safeMap: expected array, got', typeof value);
    return [];
  }
  return value.map(callback);
}

// Usage — never throws even if data is undefined/null/object
const items = safeMap(apiResponse?.data, item => item.id);

// Or inline with optional chaining:
const items = apiResponse?.data?.map(item => item.id) ?? [];`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Why does this error happen only sometimes in React?',
          answer: 'Because React renders before async data loads. The first render happens with initial state (often undefined), then data loads and triggers a re-render. If initial state is undefined and you call .map() without a guard, the first render crashes. Fix: always use [] as initial state for arrays.',
        },
        {
          question: 'What is the difference between undefined and null in this context?',
          answer: 'Both cause the same error. undefined.map() and null.map() both throw TypeError. The fix is the same for both: guard with if (!value) return []; or use optional chaining value?.map().',
        },
        {
          question: 'How do I debug this error quickly?',
          answer: 'Add console.log(typeof yourValue, yourValue) right before the .map() call. This immediately shows you what type the value actually is and what it contains. If it logs "undefined undefined", the variable was never assigned. If it logs "object {...}", you have an object not an array.',
        },
        {
          question: 'Should I use optional chaining everywhere?',
          answer: 'Use it for uncertain data (API responses, props, localStorage values). Don\'t use it as a crutch — if a value should always be an array, use a non-optional type assertion or default value so you get clear errors when something is wrong instead of silently returning undefined.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
