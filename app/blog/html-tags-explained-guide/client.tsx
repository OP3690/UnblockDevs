'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Code, CheckCircle, AlertCircle, Lightbulb, Zap, BookOpen, Eye } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
import BlogAdSlot from '@/components/BlogAdSlot';
export default function HTMLTagsGuideClient() {
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const HTMLSimulator = ({ htmlCode, title, description }: { htmlCode: string; title: string; description?: string }) => {
    const [code, setCode] = useState(htmlCode);
    const [output, setOutput] = useState('');

    const runCode = () => {
      try {
        // Create a temporary container to render HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = code;
        setOutput(tempDiv.innerHTML);
      } catch (e) {
        setOutput('Error: ' + (e as Error).message);
      }
    };

    return (
      <div className="my-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5" />
            {title}
          </h3>
          {description && (
            <p className="text-blue-100 text-sm mt-1">{description}</p>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">HTML Code:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-32 p-4 font-mono text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter your HTML code here..."
            />
          </div>
          <button
            onClick={runCode}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Run & Preview
          </button>
          {output && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Live Preview:</label>
              <div 
                className="w-full min-h-[100px] p-4 border-2 border-gray-300 rounded-lg bg-gray-50"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const CodeBlock = ({ code, language = 'html' }: { code: string; language?: string }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              Web Development
            </span>
            <time className="text-sm text-gray-500" dateTime="2024-01-20">
              January 20, 2024
            </time>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">12 min read</span>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips"
        description="HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips"
        variant="floating"
      />


      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            HTML is the backbone of the web. Every website you've ever visited—Google, YouTube, Amazon—starts with HTML tags. Yet many developers (even experienced ones) use only a fraction of what HTML can actually do.
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
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Core <strong>HTML tags</strong> you must know</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Best practices</strong> you should always follow</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Lesser‑known facts</strong> that can level up your markup</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Quick tricks & tips</strong> to write cleaner, smarter HTML</span>
                </div>
              </div>
            </section>

            <BlogAdSlot id="ezoic-pub-ad-placeholder-202" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-600" />
                1. What Are HTML Tags?
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                HTML (HyperText Markup Language) uses <strong>tags</strong> to structure content on the web.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A typical HTML tag looks like this:
              </p>
              
              <HTMLSimulator
                title="Basic HTML Tag Example"
                description="Try editing the code to see how HTML tags work"
                htmlCode='<p>This is a paragraph</p>'
              />

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-blue-600">•</span>
                  <div>
                    <code className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">&lt;p&gt;</code>
                    <span className="text-gray-700 ml-2">→ opening tag</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-blue-600">•</span>
                  <div>
                    <code className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">&lt;/p&gt;</code>
                    <span className="text-gray-700 ml-2">→ closing tag</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-blue-600">•</span>
                  <div>
                    <span className="text-gray-700">Content sits in between</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-6 mb-4 leading-relaxed text-lg">
                Some tags don't need closing tags (self-closing tags):
              </p>

              <CodeBlock code='<img src="image.jpg" alt="Sample image">' />
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-blue-600" />
                2. Must‑Know HTML Tags (The Essentials)
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 Document Structure Tags</h3>
              
              <CodeBlock code={`<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  Content goes here
</body>
</html>`} />

              <TipBox type="info">
                <p className="font-semibold mb-2">Why they matter:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><code className="bg-gray-200 px-1 rounded">&lt;!DOCTYPE html&gt;</code> tells the browser to use modern HTML5</li>
                  <li><code className="bg-gray-200 px-1 rounded">&lt;head&gt;</code> holds metadata (SEO, styles, scripts)</li>
                  <li><code className="bg-gray-200 px-1 rounded">&lt;body&gt;</code> contains visible content</li>
                </ul>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 Text & Content Tags</h3>
              
              <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold">Tag</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4"><code className="text-blue-600 font-mono">&lt;h1&gt; – &lt;h6&gt;</code></td>
                      <td className="px-6 py-4 text-gray-700">Headings</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4"><code className="text-blue-600 font-mono">&lt;p&gt;</code></td>
                      <td className="px-6 py-4 text-gray-700">Paragraph</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4"><code className="text-blue-600 font-mono">&lt;strong&gt;</code></td>
                      <td className="px-6 py-4 text-gray-700">Important text (SEO friendly)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4"><code className="text-blue-600 font-mono">&lt;em&gt;</code></td>
                      <td className="px-6 py-4 text-gray-700">Emphasis</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4"><code className="text-blue-600 font-mono">&lt;br&gt;</code></td>
                      <td className="px-6 py-4 text-gray-700">Line break</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <TipBox>
                <p className="font-semibold mb-1">✅ Best practice:</p>
                <p className="text-sm">Use <strong>one <code className="bg-gray-200 px-1 rounded">&lt;h1&gt;</code> per page</strong> for SEO clarity.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 Link & Media Tags</h3>

              <HTMLSimulator
                title="Interactive Link & Media Example"
                description="Try editing the href, src, or alt attributes"
                htmlCode={`<a href="https://example.com">Visit Site</a>
<br>
<img src="https://via.placeholder.com/300x200" alt="Sample Image">
<br>
<video controls src="video.mp4">Your browser doesn't support video.</video>`}
              />

              <TipBox type="warning">
                <p className="font-semibold mb-2">Must‑do:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Always use <code className="bg-gray-200 px-1 rounded">alt</code> in <code className="bg-gray-200 px-1 rounded">&lt;img&gt;</code> for accessibility & SEO</li>
                  <li>Use <code className="bg-gray-200 px-1 rounded">controls</code> in media tags for better UX</li>
                </ul>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 List Tags</h3>

              <HTMLSimulator
                title="List Example"
                description="Create ordered and unordered lists"
                htmlCode={`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`}
              />

              <TipBox>
                <p className="text-sm">Lists improve <strong>readability and SEO</strong>—search engines love structured content.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                3. Must‑Do HTML Best Practices (Non‑Negotiable)
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Use Semantic HTML (Very Important)</h3>

              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Instead of this:
              </p>

              <CodeBlock code='<div class="header"></div>' />

              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Use this:
              </p>

              <CodeBlock code='<header></header>' />

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg my-6 border-2 border-blue-200">
                <p className="font-semibold text-gray-900 mb-3">Semantic tags you should use:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {['header', 'nav', 'main', 'section', 'article', 'footer'].map((tag) => (
                    <code key={tag} className="block bg-white px-3 py-2 rounded border border-blue-200 text-blue-700 font-mono text-sm">
                      &lt;{tag}&gt;
                    </code>
                  ))}
                </div>
              </div>

              <TipBox>
                <p className="font-semibold mb-1">👉 Why?</p>
                <p className="text-sm">Better SEO, accessibility, and cleaner code.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Always Include Meta Tags</h3>

              <CodeBlock code={`<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`} />

              <p className="text-gray-700 mb-4 leading-relaxed text-lg mt-4">
                These ensure:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Proper text rendering</li>
                <li>Mobile responsiveness</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">✅ Indentation & Readability</h3>

              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                Messy HTML works—but clean HTML <strong>scales</strong>.
              </p>

              <CodeBlock code={`<section>
  <h2>Title</h2>
  <p>Description</p>
</section>`} />

              <TipBox>
                <p className="text-sm">Your future self (and teammates) will thank you.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-purple-600" />
                4. Lesser‑Known & Underrated HTML Tags
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 &lt;details&gt; & &lt;summary&gt; (Hidden Gem 💎)</h3>

              <HTMLSimulator
                title="Details & Summary Example"
                description="No JavaScript needed for collapsible content!"
                htmlCode={`<details>
  <summary>Click to expand</summary>
  <p>This content is hidden by default. No JavaScript required!</p>
  <p>Perfect for FAQs, accordions, and collapsible sections.</p>
</details>`}
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 &lt;mark&gt; (Highlight Text)</h3>

              <HTMLSimulator
                title="Mark Tag Example"
                description="Highlight important text"
                htmlCode='<p>This is <mark>important</mark> information that stands out.</p>'
              />

              <TipBox>
                <p className="text-sm">Great for search result highlights or tutorials.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 &lt;time&gt; (SEO & Accessibility Boost)</h3>

              <HTMLSimulator
                title="Time Tag Example"
                description="Help search engines understand dates"
                htmlCode='<p>Published on <time datetime="2025-01-01">January 1, 2025</time></p>'
              />

              <TipBox>
                <p className="text-sm">Search engines understand dates better with this tag.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🔹 &lt;datalist&gt; (Autocomplete Without JS)</h3>

              <HTMLSimulator
                title="Datalist Example"
                description="Create autocomplete dropdowns without JavaScript"
                htmlCode={`<label for="browser">Choose a browser:</label>
<input list="browsers" id="browser" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>`}
              />

              <TipBox>
                <p className="text-sm">Simple, clean, powerful.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-yellow-600" />
                5. Unknown Facts About HTML That Surprise Developers
              </h2>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  { icon: '💡', fact: 'HTML is not a programming language — it\'s a markup language.' },
                  { icon: '💡', fact: 'Browsers automatically fix broken HTML (sometimes in unexpected ways).' },
                  { icon: '💡', fact: 'You can build basic UI components (accordions, dialogs) without JavaScript.' },
                  { icon: '💡', fact: 'HTML is case‑insensitive, but lowercase is best practice.' },
                  { icon: '💡', fact: 'Search engines read HTML top‑to‑bottom — structure matters.' },
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
                6. Quick HTML Tricks & Pro Tips
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Use <code className="bg-gray-100 px-2 py-1 rounded">loading="lazy"</code> for Images</h3>

              <CodeBlock code='<img src="large.jpg" loading="lazy" alt="Image">' />

              <TipBox>
                <p className="text-sm">Improves page speed instantly.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Make Any Element Clickable</h3>

              <HTMLSimulator
                title="Clickable Element Example"
                description="Wrap any element in an anchor tag"
                htmlCode={`<a href="/page" style="text-decoration: none; display: inline-block;">
  <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; text-align: center;">
    <h3>Click me</h3>
    <p>This entire card is clickable!</p>
  </div>
</a>`}
              />

              <TipBox>
                <p className="text-sm">Perfect for cards & UI layouts.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Use <code className="bg-gray-100 px-2 py-1 rounded">contenteditable</code></h3>

              <HTMLSimulator
                title="Contenteditable Example"
                description="Make any element editable inline"
                htmlCode='<p contenteditable="true" style="padding: 10px; border: 2px dashed #ccc; border-radius: 4px;">Click and edit me directly!</p>'
              />

              <TipBox>
                <p className="text-sm">Great for demos and prototypes.</p>
              </TipBox>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">⚡ Use <code className="bg-gray-100 px-2 py-1 rounded">hidden</code> Attribute</h3>

              <CodeBlock code='<p hidden>This text is hidden</p>' />

              <TipBox>
                <p className="text-sm">Cleaner than CSS for simple toggles.</p>
              </TipBox>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                7. Common HTML Mistakes to Avoid
              </h2>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  '❌ Skipping alt attributes',
                  '❌ Using &lt;br&gt; instead of proper spacing',
                  '❌ Overusing &lt;div&gt; everywhere',
                  '❌ Ignoring semantic tags',
                  '❌ Multiple &lt;h1&gt; tags without reason',
                ].map((mistake, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: mistake }} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Final Thoughts</h2>
              <p className="text-lg leading-relaxed mb-4">
                HTML may look simple, but <strong>mastering it gives you a serious edge</strong> in performance, SEO, and accessibility.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                If you:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                <li>Write semantic HTML</li>
                <li>Use the right tags for the right job</li>
                <li>Follow best practices</li>
              </ul>
              <p className="text-lg leading-relaxed">
                You'll build faster, cleaner, and more future‑proof websites.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-center">
                Want a follow‑up post on advanced HTML5 APIs, SEO‑optimized markup, or HTML interview questions?
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try Our Tools
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

