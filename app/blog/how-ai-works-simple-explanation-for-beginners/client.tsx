'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Cpu, Layers, MessageCircle, ShoppingBag, Camera, Zap } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function HowAIWorksClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">How AI Works: A Simple Explanation for Beginners</h1>
          <p className="text-sm text-gray-500 mt-1">What AI is, machine learning vs deep learning, how models are trained, and real-world examples</p>
        </div>
      </header>

      <BlogSocialShare
        title="How AI Works: A Simple Explanation for Beginners"
        description="Learn how AI works in simple terms. Machine learning vs deep learning, how models are trained, and real-world examples."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Artificial Intelligence (AI) is everywhere—from the recommendations on Netflix to the voice assistant on your phone. But what <em>is</em> AI, and how does it actually work? This guide explains AI in simple terms, with real-world examples, so you can understand the basics without a technical background.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We&apos;ll cover what AI actually is, the difference between machine learning and deep learning, how models are trained, and how AI shows up in chatbots, recommendations, and image recognition.
            </p>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is AI?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Artificial Intelligence (AI)</strong> is the ability of a computer or system to perform tasks that normally require human intelligence—such as understanding language, recognizing images, making decisions, or learning from experience. Instead of being explicitly programmed for every situation, AI systems learn patterns from data and improve over time.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What</strong> it is: Software that can sense, reason, and act in ways that mimic (or exceed) human capabilities in specific domains. <strong>When</strong> we use it: Whenever we need automation that adapts—recommendations, search, translation, fraud detection. <strong>Why</strong> it matters: It scales decision-making and pattern recognition beyond what humans can do manually.
            </p>
          </section>

          {/* Machine Learning vs Deep Learning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600" />
              Machine Learning vs Deep Learning
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Not all AI is the same. <strong>Machine Learning (ML)</strong> is a subset of AI where systems learn from data without being programmed for every rule. <strong>Deep Learning (DL)</strong> is a subset of ML that uses artificial &quot;neural networks&quot; with many layers to learn very complex patterns—like recognizing faces or understanding sentences.
            </p>
            <div className="overflow-x-auto my-6 rounded-lg border-2 border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Aspect</th>
                    <th className="px-4 py-3 font-semibold">Machine Learning</th>
                    <th className="px-4 py-3 font-semibold">Deep Learning</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3 font-medium">Definition</td><td className="px-4 py-3">Learns from data using algorithms; often needs hand-crafted features</td><td className="px-4 py-3">Uses neural networks with many layers; learns features automatically</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3 font-medium">Data needed</td><td className="px-4 py-3">Can work with smaller datasets</td><td className="px-4 py-3">Usually needs large amounts of data</td></tr>
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3 font-medium">Compute</td><td className="px-4 py-3">Often runs on standard hardware</td><td className="px-4 py-3">Often needs GPUs / heavy compute</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3 font-medium">Examples</td><td className="px-4 py-3">Spam filters, simple recommendations, regression</td><td className="px-4 py-3">Image recognition, speech, language models (e.g. ChatGPT)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              In short: <strong>AI</strong> is the big goal; <strong>ML</strong> is learning from data; <strong>DL</strong> is ML using deep neural networks for the hardest tasks.
            </p>
          </section>

          {/* How models are trained - Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-600" />
              How Are AI Models Trained?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Training is the process of showing the model lots of examples so it can learn patterns. Here&apos;s a simple flow of how it works:
            </p>
            <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Training flow (high level)</h3>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm font-medium">
                <span className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200">1. Data</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200">2. Features</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200">3. Model</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200">4. Training</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-green-100 rounded-lg border border-green-300">5. Prediction</span>
              </div>
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li><strong>Data:</strong> Collect many examples (e.g. images, text, user clicks).</li>
                <li><strong>Features:</strong> In ML, we often extract useful signals (e.g. &quot;has link&quot;, &quot;word count&quot;). In deep learning, the network learns these automatically.</li>
                <li><strong>Model:</strong> A mathematical structure (e.g. neural network) with parameters to be learned.</li>
                <li><strong>Training:</strong> The model sees examples, makes predictions, and adjusts its parameters to reduce errors (using methods like gradient descent).</li>
                <li><strong>Prediction:</strong> Once trained, the model can take new inputs and produce outputs (e.g. &quot;spam or not,&quot; &quot;next word,&quot; &quot;cat or dog&quot;).</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Why</strong> this matters: Without training on representative data, the model wouldn&apos;t know what patterns to look for. The more (and better) data, the better the model can generalize—while avoiding overfitting to the training set.
            </p>
          </section>

          {/* Real-world examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples of AI</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Here are three familiar places where AI shows up—chatbots, recommendations, and image recognition—and how they work in simple terms.
            </p>

            <div className="space-y-8">
              <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Chatbots (e.g. customer support, ChatGPT-style)
                </h3>
                <p className="text-gray-700 mb-2"><strong>What:</strong> Systems that understand your message and generate a relevant reply.</p>
                <p className="text-gray-700 mb-2"><strong>How:</strong> Often powered by large language models (LLMs) trained on huge amounts of text. They predict the next words (tokens) given your input, so the reply sounds natural.</p>
                <p className="text-gray-700"><strong>Why sometimes wrong:</strong> They don&apos;t &quot;know&quot; facts like a database; they repeat patterns from training data, so they can hallucinate or be outdated.</p>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  Recommendations (Netflix, Spotify, Amazon)
                </h3>
                <p className="text-gray-700 mb-2"><strong>What:</strong> &quot;You might also like…&quot; suggestions based on your behavior and similar users.</p>
                <p className="text-gray-700 mb-2"><strong>How:</strong> ML models are trained on data like clicks, watches, purchases, and ratings. They learn patterns (e.g. &quot;users who liked A also liked B&quot;) and score items for you.</p>
                <p className="text-gray-700"><strong>Why it works:</strong> More data and better algorithms improve relevance; companies constantly retrain and test models.</p>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Image Recognition (photos, medical imaging, self-driving)
                </h3>
                <p className="text-gray-700 mb-2"><strong>What:</strong> Identifying objects, faces, or conditions in images (e.g. &quot;cat,&quot; &quot;tumor,&quot; &quot;stop sign&quot;).</p>
                <p className="text-gray-700 mb-2"><strong>How:</strong> Usually deep learning—convolutional neural networks (CNNs) trained on millions of labeled images. Early layers learn edges and textures; deeper layers learn shapes and objects.</p>
                <p className="text-gray-700"><strong>When it fails:</strong> Unusual angles, lighting, or rare classes the model didn&apos;t see enough of in training.</p>
              </div>
            </div>
          </section>

          {/* When and Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              When to Use AI (and Why It Matters)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>When</strong> to use AI: When the task involves pattern recognition, prediction, or decision-making at scale and rules are hard to write by hand (e.g. speech, vision, language, recommendations). When the cost of errors is acceptable or can be reduced with human review.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Why</strong> it matters: AI automates and scales tasks that would be impossible or expensive for humans alone—from answering millions of support queries to analyzing medical images. Understanding the basics helps you use these tools wisely and recognize their limits.
            </p>
          </section>

          {/* Conclusion */}
          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              AI is software that learns from data to perform tasks that usually require human intelligence. Machine learning is the engine of learning from data; deep learning uses multi-layer neural networks for the most complex tasks. Models are trained on data, then used to make predictions—powering chatbots, recommendations, and image recognition. With this foundation, you can better understand how AI works and when it&apos;s used in the real world.
            </p>
            <p className="text-gray-600 text-sm">
              Need to work with data? Use our free <Link href="/json-beautifier" className="text-primary-600 hover:underline font-medium">JSON Beautifier</Link> and <Link href="/json-schema-generation" className="text-primary-600 hover:underline font-medium">JSON Schema Generator</Link> to structure and validate data for your projects.
            </p>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
