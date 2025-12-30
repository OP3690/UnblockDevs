'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, AlertCircle, Lightbulb, Zap, BookOpen, Palette, Layout, Sparkles } from 'lucide-react';

export default function CSSExplainedClient() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const CSSSimulator = ({ htmlCode, cssCode, title, description }: { htmlCode: string; cssCode: string; title: string; description?: string }) => {
    const [html, setHtml] = useState(htmlCode);
    const [css, setCss] = useState(cssCode);
    const [output, setOutput] = useState('');

    const runCode = () => {
      setOutput('rendered');
    };

    return (
      <div className="my-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            {title}
          </h3>
          {description && (
            <p className="text-purple-100 text-sm mt-1">{description}</p>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">HTML:</label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-32 p-4 font-mono text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                placeholder="Enter HTML..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CSS:</label>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-32 p-4 font-mono text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                placeholder="Enter CSS..."
              />
            </div>
          </div>
          <button
            onClick={runCode}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Run & Preview
          </button>
          {output && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Live Preview:</label>
              <div className="w-full min-h-[300px] border-2 border-gray-300 rounded-lg bg-white overflow-auto p-4">
                <style dangerouslySetInnerHTML={{ __html: css }} />
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CodeBlock = ({ code, language = 'css' }: { code: string; language?: string }) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
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
            <span className="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">
              Web Development
            </span>
            <time className="text-sm text-gray-500" dateTime="2024-01-28">
              January 28, 2024
            </time>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">13 min read</span>
          </div>
        </div>
      </header>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            CSS Explained: Must-Do Practices, Hidden Facts & Pro Tips
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            CSS (Cascading Style Sheets) is what turns plain HTML into beautiful, responsive, and interactive websites. Most developers use CSS—but very few truly master it.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Must-know CSS concepts and fundamentals',
                  'Best practices you should always follow',
                  'Lesser-known facts that surprise even experienced devs',
                  'Quick tricks & pro tips to write cleaner, smarter CSS',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Palette className="w-8 h-8 text-purple-600" />
                1. What Is CSS (Really)?
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                CSS controls how HTML elements look and behave on screen.
              </p>

              <CodeBlock code={`p {
  color: blue;
}`} />

              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                But CSS is more than colors and fonts—it controls layout, responsiveness, animation, accessibility, and performance.
              </p>

              <CSSSimulator
                title="Basic CSS Example"
                description="Try editing the CSS to see how it affects the HTML"
                htmlCode='<p>This is a paragraph</p>\n<h1>This is a heading</h1>'
                cssCode='p {\n  color: blue;\n  font-size: 18px;\n}\n\nh1 {\n  color: red;\n  font-size: 32px;\n}'
              />
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layout className="w-8 h-8 text-purple-600" />
                2. Must-Know CSS Fundamentals
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 Selectors (The Core of CSS)</h3>

              <CodeBlock code={`/* Element selector */
p { }

/* Class selector */
.card { }

/* ID selector */
#header { }

/* Attribute selector */
input[type="text"] { }

/* Pseudo-class selector */
a:hover { }

/* Descendant selector */
.container .item { }`} />

              <TipBox>
                <p className="font-semibold mb-1">✅ Best practice:</p>
                <p className="text-sm">Prefer class selectors over IDs for scalability and reusability.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 The CSS Box Model (Non-Negotiable)</h3>

              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Every element is a box with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>Content</strong> - The actual content</li>
                <li><strong>Padding</strong> - Space inside the border</li>
                <li><strong>Border</strong> - The border around padding</li>
                <li><strong>Margin</strong> - Space outside the border</li>
              </ul>

              <CodeBlock code={`* {
  box-sizing: border-box;
}`} />

              <TipBox>
                <p className="font-semibold mb-1">👉 Pro Tip:</p>
                <p className="text-sm">This single line saves hours of layout frustration. Always use <code className="bg-gray-200 px-1 rounded">box-sizing: border-box</code>.</p>
              </TipBox>

              <CSSSimulator
                title="Box Model Demo"
                description="See how padding, border, and margin work"
                htmlCode='<div class="box">Content</div>'
                cssCode='.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid blue;\n  margin: 20px;\n  background: lightblue;\n}'
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 Display & Position</h3>

              <CodeBlock code={`/* Display types */
.block { display: block; }
.inline { display: inline; }
.flex { display: flex; }
.grid { display: grid; }

/* Positioning */
.element {
  position: relative; /* or absolute, fixed, sticky */
  top: 10px;
  left: 20px;
}`} />

              <TipBox>
                <p className="text-sm">Understanding display and position solves <strong>80% of layout issues</strong>.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                3. Must-Do CSS Best Practices
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Use Flexbox & Grid (Stop Using Floats)</h3>

              <CodeBlock code={`/* Flexbox - One-dimensional layouts */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* Grid - Two-dimensional layouts */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`} />

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg my-6 border-2 border-purple-200">
                <p className="font-semibold text-gray-900 mb-2">Remember:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><strong>Flexbox</strong> = one-dimensional layouts (row or column)</li>
                  <li><strong>Grid</strong> = two-dimensional layouts (rows and columns)</li>
                </ul>
              </div>

              <CSSSimulator
                title="Flexbox Example"
                description="Try changing justify-content and align-items"
                htmlCode='<div class="container">\n  <div class="item">Item 1</div>\n  <div class="item">Item 2</div>\n  <div class="item">Item 3</div>\n</div>'
                cssCode='.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  height: 200px;\n  background: #f3f4f6;\n}\n\n.item {\n  padding: 20px;\n  background: #8b5cf6;\n  color: white;\n  border-radius: 8px;\n}'
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Mobile-First Responsive Design</h3>

              <CodeBlock code={`/* Mobile-first approach */
.card {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    width: 33.333%;
  }
}`} />

              <TipBox>
                <p className="font-semibold mb-1">💡 Best Practice:</p>
                <p className="text-sm">Design for mobile first, then scale up. This approach is more efficient and user-friendly.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Keep CSS Maintainable</h3>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <p className="font-semibold text-red-900 mb-2">❌ Bad:</p>
                  <code className="text-sm text-red-800 font-mono">
                    .header .nav ul li a span {'{ }'}
                  </code>
                  <p className="text-sm text-red-700 mt-2">Too specific, hard to maintain</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="font-semibold text-green-900 mb-2">✅ Good:</p>
                  <code className="text-sm text-green-800 font-mono">
                    .nav-link {'{ }'}
                  </code>
                  <p className="text-sm text-green-700 mt-2">Simple, reusable, maintainable</p>
                </div>
              </div>

              <TipBox>
                <p className="font-semibold mb-1">Maintainability Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use meaningful class names</li>
                  <li>Avoid deep nesting (max 2-3 levels)</li>
                  <li>Split large files into components</li>
                  <li>Use CSS variables for consistency</li>
                </ul>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                4. Lesser-Known & Underrated CSS Features
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 CSS Variables (Game Changer 💎)</h3>

              <CodeBlock code={`:root {
  --primary: #2563eb;
  --secondary: #8b5cf6;
  --spacing: 1rem;
}

.button {
  background: var(--primary);
  padding: var(--spacing);
}

/* Change once → update everywhere */`} />

              <TipBox>
                <p className="text-sm">CSS Variables make theming and maintenance <strong>incredibly easy</strong>. Change a value once, and it updates everywhere.</p>
              </TipBox>

              <CSSSimulator
                title="CSS Variables Demo"
                description="Change the --primary color and see it update everywhere"
                htmlCode='<div class="card">\n  <button class="btn">Button</button>\n  <p class="text">Text with primary color</p>\n</div>'
                cssCode=':root {\n  --primary: #2563eb;\n  --spacing: 1rem;\n}\n\n.card {\n  padding: var(--spacing);\n  border: 2px solid var(--primary);\n}\n\n.btn {\n  background: var(--primary);\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n}\n\n.text {\n  color: var(--primary);\n}'
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 clamp() for Responsive Fonts</h3>

              <CodeBlock code={`h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* min-size, preferred-size, max-size */
/* No media queries needed! */`} />

              <TipBox>
                <p className="text-sm">The <code className="bg-gray-200 px-1 rounded">clamp()</code> function creates fluid typography that scales smoothly between min and max values.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 aspect-ratio</h3>

              <CodeBlock code={`.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.card {
  aspect-ratio: 1 / 1; /* Square */
}

/* Perfect for videos, images, and cards */`} />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 :is() and :where() Selectors</h3>

              <CodeBlock code={`/* Instead of this */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
}

/* Use this */
:is(h1, h2, h3, h4, h5, h6) {
  font-weight: 600;
}

/* :where() has 0 specificity */
:where(.card, .box) {
  margin: 1rem;
}`} />

              <TipBox>
                <p className="text-sm">These selectors make your CSS <strong>cleaner and more readable</strong>, especially for complex selectors.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-yellow-600" />
                5. Unknown Facts About CSS
              </h2>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  { icon: '💡', fact: 'CSS is render-blocking—bad CSS can slow your site significantly.' },
                  { icon: '💡', fact: 'Browsers read CSS top-to-bottom, last rule wins (cascade).' },
                  { icon: '💡', fact: '!important is not evil—but overusing it creates maintenance nightmares.' },
                  { icon: '💡', fact: 'You can create complex animations without JavaScript.' },
                  { icon: '💡', fact: 'Modern CSS can replace many JavaScript UI features.' },
                  { icon: '💡', fact: 'CSS Grid can create layouts that were impossible before.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-gray-700 flex-1">{item.fact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-green-600" />
                6. Quick CSS Tricks & Pro Tips
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Center Anything (The Modern Way)</h3>

              <CodeBlock code={`/* Method 1: Grid (Simplest) */
.center {
  display: grid;
  place-items: center;
}

/* Method 2: Flexbox */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 3: Absolute positioning */
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`} />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Smooth Hover Animations</h3>

              <CodeBlock code={`.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Always animate transform and opacity for performance */`} />

              <CSSSimulator
                title="Hover Animation Demo"
                description="Hover over the card to see the animation"
                htmlCode='<div class="card">Hover me!</div>'
                cssCode='.card {\n  padding: 40px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 24px;\n  cursor: pointer;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.3);\n}'
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Disable Text Selection</h3>

              <CodeBlock code={`.no-select {
  user-select: none;
}

/* Useful for buttons & UI elements */`} />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Skeleton Loading Effect</h3>

              <CodeBlock code={`@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.loading {
  background: linear-gradient(
    90deg,
    #eee 0%,
    #f5f5f5 50%,
    #eee 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 1.5s infinite;
}`} />
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                7. Common CSS Mistakes to Avoid
              </h2>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  '❌ Using fixed widths everywhere',
                  '❌ Overusing !important',
                  '❌ Ignoring mobile design',
                  '❌ Writing overly complex selectors',
                  '❌ Not using modern layout tools (Flexbox/Grid)',
                  '❌ Not using CSS variables',
                  '❌ Inline styles in production',
                  '❌ Not optimizing for performance',
                ].map((mistake, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: mistake }} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Final Thoughts</h2>
              <p className="text-lg leading-relaxed mb-4">
                CSS isn't hard—it's misunderstood.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Once you:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                <li>Understand layout fundamentals</li>
                <li>Use modern CSS features</li>
                <li>Write clean, maintainable styles</li>
              </ul>
              <p className="text-lg leading-relaxed">
                You'll build faster, more responsive, and more beautiful websites.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-center">
                Want the same deep-dive for JavaScript, responsive design, or CSS interview questions? Just say the word.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-purple-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/blog/html-tags-explained-guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Read HTML Tags Guide
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

