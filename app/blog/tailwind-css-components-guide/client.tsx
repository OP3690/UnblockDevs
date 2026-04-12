'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable,
} from '@/components/blog/BlogVisuals';

export default function TailwindCssComponentsGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Tailwind CSS Components: Complete Guide to Patterns, Best Practices, and Free Examples</h1>
      <p className="lead">
        Tailwind CSS has changed the way developers write UI. Instead of naming CSS classes and switching
        between HTML and a stylesheet, you compose interfaces directly in markup using utility classes.
        But to use Tailwind effectively — especially for complex, reusable components — you need to understand
        the patterns: how to structure components, how to handle hover and focus states, how to manage responsive
        breakpoints, and how to avoid the most common Tailwind anti-patterns. This guide covers all of it,
        with practical code examples for every major component type.
      </p>

      <StatGrid stats={[
        { value: '35%', label: 'of new projects use Tailwind — #1 CSS framework in 2025', color: 'blue' },
        { value: '4M+', label: 'weekly npm downloads of Tailwind CSS', color: 'green' },
        { value: 'JIT', label: 'Just-in-Time compiler purges unused CSS — production builds stay tiny', color: 'purple' },
        { value: '401+', label: 'free Tailwind component examples at UnblockDevs', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="How Tailwind CSS Components Actually Work" />
      <p>
        In traditional CSS, you write a class name (like <code>.card</code>), then define what that class
        looks like in a separate stylesheet. In Tailwind, you compose the visual style directly on the HTML
        element using utility classes:
      </p>
      <CodeBlock language="html" filename="Traditional CSS vs Tailwind — a card component">
{`<!-- ─── Traditional CSS approach ────────────────────────────────────────────── -->
<div class="card card--elevated">
  <h3 class="card__title">Welcome back</h3>
  <p class="card__body">Your dashboard is ready.</p>
</div>

/* In styles.css — separate file, separate context */
.card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e4e4e7;
  padding: 1.5rem;
}
.card--elevated { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.card__title { font-size: 1rem; font-weight: 600; color: #18181b; }
.card__body  { font-size: 0.875rem; color: #71717a; margin-top: 0.25rem; }


<!-- ─── Tailwind approach — everything in the markup ────────────────────────── -->
<div class="rounded-xl border border-zinc-200 bg-white p-6 shadow-md">
  <h3 class="text-base font-semibold text-zinc-900">Welcome back</h3>
  <p class="mt-1 text-sm text-zinc-500">Your dashboard is ready.</p>
</div>`}
      </CodeBlock>
      <p>
        The result is identical. The trade-off is real: Tailwind HTML looks verbose, but you never leave the
        file you're working in, and there's no unused CSS in production (Tailwind's JIT compiler automatically
        removes any class not used in your HTML).
      </p>

      <AlertBox type="info" title="JIT Mode is the Default Since Tailwind v3">
        Since Tailwind CSS v3, Just-in-Time (JIT) compilation is on by default. It generates CSS only for
        the utility classes you actually use — meaning production bundles are typically 5–15 KB, not the
        3 MB+ that concerned early adopters.
      </AlertBox>

      <SectionHeader number={2} title="Core Tailwind Patterns Every Component Uses" />
      <p>
        Before diving into specific components, there are five core Tailwind patterns that appear in almost
        every component you'll build. Master these and you can compose any component from scratch.
      </p>

      <h3>Pattern 1: Flexbox layout</h3>
      <CodeBlock language="html" filename="Tailwind flexbox patterns">
{`<!-- Horizontal centering with flex -->
<div class="flex items-center justify-center gap-3">
  <img class="h-8 w-8 rounded-full" src="avatar.jpg" alt="">
  <span class="text-sm font-medium text-zinc-700">Jane Doe</span>
</div>

<!-- Flex row with space-between (nav pattern) -->
<nav class="flex items-center justify-between px-6 py-4">
  <a href="/" class="font-bold text-zinc-900">Logo</a>
  <div class="flex items-center gap-6">
    <a href="/pricing" class="text-sm text-zinc-600 hover:text-zinc-900">Pricing</a>
    <a href="/docs" class="text-sm text-zinc-600 hover:text-zinc-900">Docs</a>
    <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
      Sign In
    </button>
  </div>
</nav>`}
      </CodeBlock>

      <h3>Pattern 2: Responsive breakpoints</h3>
      <CodeBlock language="html" filename="Mobile-first responsive grid">
{`<!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-xl border border-zinc-200 bg-white p-5">Card 1</div>
  <div class="rounded-xl border border-zinc-200 bg-white p-5">Card 2</div>
  <div class="rounded-xl border border-zinc-200 bg-white p-5">Card 3</div>
</div>

<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col gap-4 lg:flex-row">
  <aside class="w-full lg:w-64 shrink-0">Sidebar</aside>
  <main class="flex-1 min-w-0">Main content</main>
</div>`}
      </CodeBlock>

      <h3>Pattern 3: Interactive states (hover, focus, active)</h3>
      <CodeBlock language="html" filename="Hover, focus, and active state variants">
{`<!-- Button with all interactive states -->
<button class="
  rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white
  hover:bg-blue-700          /* darker on hover */
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2   /* keyboard focus ring */
  active:scale-95            /* slight shrink on click */
  disabled:opacity-50 disabled:cursor-not-allowed   /* disabled state */
  transition-all duration-150
">
  Save Changes
</button>

<!-- Input with focus ring -->
<input type="text" class="
  w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-800
  placeholder:text-zinc-400
  focus:border-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-100
  transition
" placeholder="Enter your email">`}
      </CodeBlock>

      <h3>Pattern 4: Group hover (parent-triggered child styles)</h3>
      <CodeBlock language="html" filename="group and group-hover — child reacts to parent hover">
{`<!-- The "group" class on the parent enables group-hover: on children -->
<div class="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">

  <h3 class="text-sm font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors">
    Feature Title
  </h3>

  <p class="mt-1 text-xs text-zinc-500 leading-relaxed">
    Feature description text here.
  </p>

  <!-- Arrow appears on hover (opacity-0 by default, opacity-100 on parent hover) -->
  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
    →
  </span>
</div>`}
      </CodeBlock>

      <h3>Pattern 5: Conditional classes (React/JS frameworks)</h3>
      <CodeBlock language="jsx" filename="Dynamic Tailwind classes in React/Next.js">
{`// ❌ Don't concatenate class strings — Tailwind JIT can't detect dynamic class names
const btnClass = "px-4 py-2 rounded-lg text-white " + (isPrimary ? "bg-blue-600" : "bg-zinc-600");

// ✅ Use a lookup object — full class names are statically detectable
const variants = {
  primary:     "bg-blue-600 hover:bg-blue-700 text-white",
  secondary:   "bg-zinc-100 hover:bg-zinc-200 text-zinc-800",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
  ghost:       "border border-zinc-300 hover:bg-zinc-50 text-zinc-700",
};

function Button({ variant = "primary", children }) {
  return (
    <button className={\`px-5 py-2.5 rounded-lg text-sm font-semibold transition \${variants[variant]}\`}>
      {children}
    </button>
  );
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Tailwind Button Components — Every Variant You Need" />
      <p>
        Buttons are the most common Tailwind component. Here are the essential variants every project needs,
        along with loading and icon states:
      </p>
      <CodeBlock language="html" filename="Complete Tailwind button system">
{`<!-- ─── PRIMARY ────────────────────────────────────────────────────── -->
<button class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition">
  Primary
</button>

<!-- ─── SECONDARY ──────────────────────────────────────────────────── -->
<button class="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-200 active:scale-95 transition">
  Secondary
</button>

<!-- ─── GHOST / OUTLINE ────────────────────────────────────────────── -->
<button class="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 active:scale-95 transition">
  Ghost
</button>

<!-- ─── DANGER / DESTRUCTIVE ──────────────────────────────────────── -->
<button class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 active:scale-95 transition">
  Delete Account
</button>

<!-- ─── WITH LEADING ICON ─────────────────────────────────────────── -->
<button class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition">
  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
  New Project
</button>

<!-- ─── LOADING STATE ─────────────────────────────────────────────── -->
<button disabled class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white opacity-75 cursor-not-allowed">
  <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
  </svg>
  Saving…
</button>

<!-- ─── PILL SHAPE ────────────────────────────────────────────────── -->
<button class="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition">
  Get Started Free
</button>`}
      </CodeBlock>

      <SectionHeader number={4} title="Tailwind Card Components" />
      <p>
        Cards are the most versatile layout component. They wrap content into a visually contained unit.
        Here are the five most common card patterns:
      </p>
      <CodeBlock language="html" filename="Tailwind card variants">
{`<!-- ─── BASIC INFO CARD ───────────────────────────────────────────── -->
<div class="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
  <h3 class="text-sm font-semibold text-zinc-900">Monthly Revenue</h3>
  <p class="mt-1 text-2xl font-bold text-zinc-900">$24,560</p>
  <p class="mt-1 text-xs text-emerald-600 font-medium">↑ 12.5% from last month</p>
</div>

<!-- ─── FEATURE CARD WITH ICON ────────────────────────────────────── -->
<div class="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all">
  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
    <!-- icon svg here -->
    ⚡
  </div>
  <h3 class="text-sm font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors">Fast Builds</h3>
  <p class="mt-1 text-xs text-zinc-500 leading-relaxed">Deploy in seconds with instant cache invalidation.</p>
</div>

<!-- ─── PRICING CARD ───────────────────────────────────────────────── -->
<div class="rounded-2xl border-2 border-blue-600 bg-white p-6 shadow-lg">
  <p class="text-xs font-bold uppercase tracking-widest text-blue-600">Pro</p>
  <p class="mt-2 text-3xl font-black text-zinc-900">$29<span class="text-base font-normal text-zinc-500">/mo</span></p>
  <ul class="mt-4 space-y-2">
    <li class="flex items-center gap-2 text-sm text-zinc-700">
      <span class="text-emerald-500 font-bold">✓</span> Unlimited projects
    </li>
    <li class="flex items-center gap-2 text-sm text-zinc-700">
      <span class="text-emerald-500 font-bold">✓</span> Custom domains
    </li>
    <li class="flex items-center gap-2 text-sm text-zinc-700">
      <span class="text-emerald-500 font-bold">✓</span> Priority support
    </li>
  </ul>
  <button class="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition">
    Start Free Trial
  </button>
</div>

<!-- ─── PROFILE / TESTIMONIAL CARD ───────────────────────────────── -->
<div class="rounded-xl border border-zinc-200 bg-white p-5">
  <p class="text-sm text-zinc-700 leading-relaxed italic">
    "This tool saved our team weeks of frontend work."
  </p>
  <div class="mt-4 flex items-center gap-3">
    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">JD</div>
    <div>
      <p class="text-sm font-semibold text-zinc-900">Jane Doe</p>
      <p class="text-xs text-zinc-400">Lead Engineer, Acme Corp</p>
    </div>
  </div>
</div>`}
      </CodeBlock>

      <SectionHeader number={5} title="Tailwind Navbar Component" />
      <p>
        The navbar is typically the most complex component on a page — it has a logo, desktop links, a CTA
        button, and a mobile hamburger menu. Here's a complete responsive navbar in Tailwind:
      </p>
      <CodeBlock language="html" filename="Full responsive Tailwind navbar">
{`<header class="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">

    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 font-bold text-zinc-900 text-base">
      <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-black">U</span>
      YourBrand
    </a>

    <!-- Desktop links — hidden on mobile -->
    <nav class="hidden md:flex items-center gap-6">
      <a href="/features" class="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Features</a>
      <a href="/pricing"  class="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Pricing</a>
      <a href="/docs"     class="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Docs</a>
      <a href="/blog"     class="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Blog</a>
    </nav>

    <!-- CTA buttons — hidden on mobile -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/login" class="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">Log in</a>
      <a href="/signup" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
        Get Started Free
      </a>
    </div>

    <!-- Mobile hamburger button — visible only on mobile -->
    <button class="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
</header>`}
      </CodeBlock>

      <SectionHeader number={6} title="Tailwind Modal / Dialog Component" />
      <CodeBlock language="html" filename="Tailwind modal with backdrop and animation">
{`<!-- Backdrop + modal wrapper -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4">

  <!-- Backdrop — semi-transparent black -->
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <!-- Modal panel -->
  <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-base font-bold text-zinc-900">Confirm Deletion</h2>
        <p class="mt-1 text-sm text-zinc-500">This action cannot be undone.</p>
      </div>
      <!-- Close button -->
      <button class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition">
        ✕
      </button>
    </div>

    <!-- Body -->
    <p class="mt-4 text-sm text-zinc-600 leading-relaxed">
      Are you sure you want to permanently delete <strong>Project Alpha</strong>?
      All associated data, files, and settings will be removed immediately.
    </p>

    <!-- Footer actions -->
    <div class="mt-6 flex gap-3 justify-end">
      <button class="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition">
        Cancel
      </button>
      <button class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
        Delete Permanently
      </button>
    </div>
  </div>
</div>`}
      </CodeBlock>

      <SectionHeader number={7} title="Tailwind Form Components" />
      <p>
        Form inputs are notoriously hard to style consistently across browsers. Tailwind gives you
        full control. Here are the essential form components:
      </p>
      <CodeBlock language="html" filename="Tailwind input, textarea, select, and checkbox">
{`<!-- ─── Text input ────────────────────────────────────────────────── -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-zinc-700" for="email">Email address</label>
  <input id="email" type="email" placeholder="you@example.com"
    class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-800
           placeholder:text-zinc-400
           focus:border-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-100
           transition">
</div>

<!-- ─── Textarea ──────────────────────────────────────────────────── -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-zinc-700" for="message">Message</label>
  <textarea id="message" rows="4" placeholder="Your message here…"
    class="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm
           text-zinc-800 placeholder:text-zinc-400
           focus:border-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-100
           transition"></textarea>
</div>

<!-- ─── Select dropdown ───────────────────────────────────────────── -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-zinc-700" for="country">Country</label>
  <select id="country"
    class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-800
           focus:border-blue-400 focus:outline-none focus:ring-3 focus:ring-blue-100
           transition appearance-none cursor-pointer">
    <option>United States</option>
    <option>Canada</option>
    <option>United Kingdom</option>
  </select>
</div>

<!-- ─── Checkbox ─────────────────────────────────────────────────── -->
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox"
    class="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0">
  <span class="text-sm font-medium text-zinc-700">I agree to the Terms of Service</span>
</label>`}
      </CodeBlock>

      <SectionHeader number={8} title="Tailwind Badge and Alert Components" />
      <CodeBlock language="html" filename="Status badges and alert banners">
{`<!-- ─── STATUS BADGES ────────────────────────────────────────────── -->
<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
  Active
</span>

<span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
  Pending
</span>

<span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
  Failed
</span>

<!-- ─── ALERT BANNERS ─────────────────────────────────────────────── -->
<!-- Success -->
<div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
  <span class="mt-0.5 text-emerald-600 font-bold shrink-0">✓</span>
  <div>
    <p class="text-sm font-semibold text-emerald-900">Changes saved</p>
    <p class="mt-0.5 text-xs text-emerald-700">Your profile has been updated successfully.</p>
  </div>
</div>

<!-- Error -->
<div class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
  <span class="mt-0.5 text-red-600 font-bold shrink-0">✕</span>
  <div>
    <p class="text-sm font-semibold text-red-900">Something went wrong</p>
    <p class="mt-0.5 text-xs text-red-700">Please try again or contact support.</p>
  </div>
</div>

<!-- Warning -->
<div class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
  <span class="mt-0.5 text-amber-600 font-bold shrink-0">⚠</span>
  <div>
    <p class="text-sm font-semibold text-amber-900">Trial expires in 3 days</p>
    <p class="mt-0.5 text-xs text-amber-700">Upgrade to Pro to keep access to all features.</p>
  </div>
</div>`}
      </CodeBlock>

      <SectionHeader number={9} title="Common Tailwind Component Mistakes to Avoid" />

      <QuickFact>
        The most common Tailwind mistake is building components that can't be maintained — either because
        the class lists become unreadable, or because responsive states aren't handled systematically.
      </QuickFact>

      <h3>Mistake 1: Inline conditional class strings</h3>
      <p>
        Tailwind's JIT compiler scans your source files for complete class names. If you build class names
        dynamically by concatenating strings, those classes won't be included in the production CSS.
      </p>
      <CodeBlock language="jsx" filename="Dynamic Tailwind classes — right and wrong way">
{`// ❌ WRONG — Tailwind JIT can't detect bg-blue- or bg-red- partial strings
const color = isActive ? "blue" : "red";
<div className={\`bg-\${color}-600\`}>...</div>

// ✅ RIGHT — full class names are present in the source file
const className = isActive ? "bg-blue-600" : "bg-red-600";
<div className={className}>...</div>

// ✅ ALSO RIGHT — lookup table keeps all class names statically detectable
const colorMap = {
  success: "bg-emerald-600",
  danger:  "bg-red-600",
  default: "bg-zinc-600",
};
<div className={colorMap[variant]}>...</div>`}
      </CodeBlock>

      <h3>Mistake 2: Not using min-w-0 on flex children</h3>
      <p>
        Flex children have a default <code>min-width: auto</code>, which means they won't shrink below their
        content size. Long text in a flex child will overflow the container. Add <code>min-w-0</code> to
        flex children that contain potentially long content.
      </p>

      <h3>Mistake 3: Forgetting transition on hover elements</h3>
      <p>
        Any element with a hover state change should include <code>transition</code> (or
        {' '}<code>transition-colors</code>, <code>transition-shadow</code>, etc.). Without it, hover effects
        snap instantly, which looks jarring. <code>transition</code> defaults to 150ms ease — exactly right
        for most UI interactions.
      </p>

      <AlertBox type="tip" title="Use the UnblockDevs Component Library as a Tailwind Reference">
        Every component at{' '}
        <a href="/css-ui-components" className="underline font-semibold">UnblockDevs CSS UI Components</a>{' '}
        has a battle-tested Tailwind implementation — including hover states, focus rings, transitions,
        responsive breakpoints, and accessibility attributes. Use it as a reference for patterns, not
        just as a copy-paste source.
      </AlertBox>

      <SectionHeader number={10} title="Setting Up Tailwind in a New Project" />
      <CodeBlock language="bash" filename="Install Tailwind in a Next.js or Vite project">
{`# Next.js (Tailwind is now included in create-next-app)
npx create-next-app@latest my-app
# Choose: TypeScript? Yes, Tailwind? Yes

# Vite + React
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
      </CodeBlock>
      <CodeBlock language="js" filename="tailwind.config.js — content paths are critical">
{`/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⚠️ CRITICAL: tell Tailwind where your templates are
  // If a file isn't listed here, its classes won't appear in production CSS
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',      // Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}',    // Next.js Pages Router
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',          // Vite / CRA
  ],
  theme: {
    extend: {
      // Add your brand colors here
      colors: {
        brand: { 600: '#7c3aed', 700: '#6d28d9' },
      },
    },
  },
  plugins: [],
}`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Tailwind is utility-first, not framework-dependent',
          description: 'Tailwind works with plain HTML, React, Next.js, Vue, Svelte, and any other setup. It generates standard CSS — no JS runtime required.',
        },
        {
          title: 'JIT makes production bundles tiny',
          description: 'Tailwind\'s Just-in-Time compiler purges every class not present in your HTML/JSX at build time. Typical production CSS is 5–15 KB.',
        },
        {
          title: 'Full class names must be statically present',
          description: 'Don\'t build Tailwind class names with string concatenation. The JIT compiler must see the full class name (e.g. bg-blue-600) as a literal string in your source.',
        },
        {
          title: 'Responsive design is mobile-first',
          description: 'Tailwind uses min-width breakpoints: sm: applies at 640px+, md: at 768px+, lg: at 1024px+. Start with mobile layout, then add breakpoint prefixes for larger screens.',
        },
        {
          title: 'group and group-hover unlock parent-to-child interactions',
          description: 'Add group to a parent element to let child elements respond to the parent\'s hover/focus state with group-hover:, group-focus:, etc.',
        },
        {
          title: '401 free Tailwind components at UnblockDevs',
          description: 'Browse, preview, and copy complete Tailwind implementations for buttons, cards, navbars, modals, forms, tables, charts, and 28 more categories.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Do I need to pay for Tailwind CSS?',
          answer: 'Tailwind CSS (the core framework) is completely free and open source under the MIT license. Tailwind UI (a premium component library from the same team) is paid. However, there are many free alternatives — including the UnblockDevs library with 401+ free Tailwind components.',
        },
        {
          question: 'What is the difference between Tailwind CSS and Tailwind UI?',
          answer: 'Tailwind CSS is the utility class framework — it\'s free and open source. Tailwind UI is a separate, paid product from the Tailwind Labs team that sells pre-built React/Vue/HTML component templates. You can use Tailwind CSS without Tailwind UI by building your own components or using free libraries like UnblockDevs.',
        },
        {
          question: 'Can I use Tailwind CSS with plain HTML (no framework)?',
          answer: 'Yes. You can include Tailwind via CDN for prototyping: <script src="https://cdn.tailwindcss.com"></script>. For production, install it as a PostCSS plugin with npm so the JIT compiler can purge unused classes. Tailwind works with any HTML/templating system — no JavaScript framework required.',
        },
        {
          question: 'How do I add dark mode to Tailwind components?',
          answer: 'Add darkMode: "class" to tailwind.config.js, then apply a "dark" class to your <html> element to switch modes. Inside components, use dark: variants: e.g. class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100". Toggle the "dark" class on the root element with JavaScript.',
        },
        {
          question: 'Why is my Tailwind production build missing some classes?',
          answer: 'The JIT compiler only includes classes it finds in your content files. The most common causes: (1) a file path is missing from the content array in tailwind.config.js, (2) a class name is being built dynamically by string concatenation (e.g. "bg-" + color + "-600"), (3) the class is in a file the compiler doesn\'t scan (like a .json config). Make sure all template files are listed and all class names appear as complete strings.',
        },
        {
          question: 'How do I extract repeated Tailwind classes into a component?',
          answer: 'In a JavaScript framework (React, Vue, Svelte), the natural solution is to extract the element into a reusable component and pass props for variants. In plain HTML, you can use @apply in a CSS file to extract utility groups into a class name — e.g. .btn-primary { @apply rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white; } — but this removes the JIT advantage and is generally not recommended for frequent use.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
