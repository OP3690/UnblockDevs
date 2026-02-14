'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Cpu, Layers, Brain, Table2, CheckCircle, AlertCircle } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function MLvsDLvsAIClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Machine Learning vs Deep Learning vs AI: What&apos;s the Difference?</h1>
          <p className="text-sm text-gray-500 mt-1">Definitions in simple terms, visual comparison, when to use each, and real-world use cases</p>
        </div>
      </header>

      <BlogSocialShare
        title="Machine Learning vs Deep Learning vs AI: What's the Difference?"
        description="Simple definitions, comparison table, when to use each, and real-world use cases for AI, ML, and DL."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              &quot;AI,&quot; &quot;machine learning,&quot; and &quot;deep learning&quot; are used everywhere, but they don&apos;t mean the same thing. Understanding the difference helps you choose the right approach and talk about technology accurately. This guide breaks down each term in simple language, gives you a visual comparison, and explains when to use each—with real-world examples.
            </p>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definitions in Simple Terms
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  What Is AI (Artificial Intelligence)?
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Definition:</strong> AI is the broad idea of machines doing tasks that normally require human intelligence—understanding language, recognizing images, making decisions, or learning from experience.
                </p>
                <p className="text-gray-700">
                  <strong>What / Why:</strong> It&apos;s the umbrella. Everything we call &quot;smart&quot; software—from rule-based chatbots to self-driving cars—falls under AI. Not all AI learns from data; some use hand-written rules.
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-green-600" />
                  What Is Machine Learning (ML)?
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Definition:</strong> Machine learning is a type of AI where the system learns from data instead of being programmed with every rule. It finds patterns and uses them to make predictions or decisions.
                </p>
                <p className="text-gray-700">
                  <strong>What / How:</strong> You give it examples (e.g. &quot;this email is spam, this one isn&apos;t&quot;), and an algorithm adjusts internal parameters so the model gets better at the task. ML is a subset of AI.
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  What Is Deep Learning (DL)?
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Definition:</strong> Deep learning is a type of machine learning that uses artificial neural networks with many layers (&quot;deep&quot;). These networks learn very complex patterns—like recognizing faces or understanding sentences—directly from raw data.
                </p>
                <p className="text-gray-700">
                  <strong>What / How:</strong> Instead of humans designing features (e.g. &quot;word count&quot;, &quot;has link&quot;), the network learns features automatically. DL is a subset of ML and usually needs lots of data and compute (e.g. GPUs).
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-gray-800 text-sm font-medium">
                <strong>Relationship:</strong> AI ⊃ Machine Learning ⊃ Deep Learning. All deep learning is machine learning; all machine learning is AI. Not all AI is ML, and not all ML is deep learning.
              </p>
            </div>
          </section>

          {/* Visual comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Table2 className="w-6 h-6 text-blue-600" />
              Visual Comparison: AI vs ML vs Deep Learning
            </h2>
            <div className="overflow-x-auto my-6 rounded-lg border-2 border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">AI</th>
                    <th className="px-4 py-3 font-semibold">Machine Learning</th>
                    <th className="px-4 py-3 font-semibold">Deep Learning</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3 font-medium">Definition</td><td className="px-4 py-3">Machines doing human-like tasks</td><td className="px-4 py-3">Learning from data without explicit rules</td><td className="px-4 py-3">ML using deep neural networks</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3 font-medium">Scope</td><td className="px-4 py-3">Broad (rules + learning)</td><td className="px-4 py-3">Subset of AI</td><td className="px-4 py-3">Subset of ML</td></tr>
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3 font-medium">Data</td><td className="px-4 py-3">May or may not need data</td><td className="px-4 py-3">Needs data to learn</td><td className="px-4 py-3">Usually needs large data</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3 font-medium">Features</td><td className="px-4 py-3">Hand-coded or learned</td><td className="px-4 py-3">Often hand-crafted</td><td className="px-4 py-3">Learned automatically</td></tr>
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3 font-medium">Compute</td><td className="px-4 py-3">Varies</td><td className="px-4 py-3">Moderate</td><td className="px-4 py-3">High (often GPUs)</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3 font-medium">Examples</td><td className="px-4 py-3">Chess engine, chatbot, robot</td><td className="px-4 py-3">Spam filter, recommendation, regression</td><td className="px-4 py-3">Image recognition, LLMs (e.g. ChatGPT)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When to use each */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Choosing the right approach depends on your problem, data, and resources. Here&apos;s a simple guide:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Use rule-based AI</strong> when the task has clear, stable rules (e.g. &quot;if balance &lt; 0, flag account&quot;). No learning needed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Use machine learning</strong> when you have data and the pattern is learnable but not extremely complex—e.g. spam detection, simple recommendations, forecasting. Often works with smaller data and less compute.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Use deep learning</strong> when the task is highly complex and you have lots of data and compute—e.g. image/video recognition, speech, natural language (LLMs), game-playing. DL can learn features automatically but is more data- and compute-hungry.</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-gray-800 text-sm">
                <strong>Rule of thumb:</strong> Start simple (rules or classic ML). Move to deep learning when the problem clearly benefits from it and you have the data and resources.
              </p>
            </div>
          </section>

          {/* Real-world use cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              Real-World Use Cases
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Here are concrete examples of where AI, ML, and DL show up:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AI (broad)</h3>
                <p className="text-gray-700 text-sm">Rule-based chatbots, game AI (e.g. chess), automated scheduling, basic voice commands. Some use ML; some don&apos;t.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Machine learning</h3>
                <p className="text-gray-700 text-sm">Spam filters, credit scoring, demand forecasting, simple recommendation (e.g. &quot;users who bought X bought Y&quot;), fraud detection, A/B test analysis.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Deep learning</h3>
                <p className="text-gray-700 text-sm">Face recognition, medical image analysis, speech-to-text, language models (ChatGPT, translation), self-driving perception, advanced recommendations (e.g. sequence models).</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Summary:</strong> AI is the big tent; machine learning is learning from data; deep learning is ML with deep neural networks for the hardest tasks. Use the comparison table and &quot;when to use&quot; guide to choose the right approach, and lean on real-world use cases to see how each technology is applied in practice.
            </p>
            <p className="text-gray-600 text-sm">
              Working with data for your models? Use our <Link href="/json-beautifier" className="text-primary-600 hover:underline font-medium">JSON Beautifier</Link> and <Link href="/json-schema-generation" className="text-primary-600 hover:underline font-medium">JSON Schema Generator</Link> to structure and validate data.
            </p>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
