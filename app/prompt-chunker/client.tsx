'use client';

import Link from 'next/link';
import { ArrowLeft, Scissors, ExternalLink, CheckCircle, Zap, Info, Copy, Download } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function PromptChunkerLandingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Scissors className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Prompt Chunker - Split Long Prompts</h1>
              <p className="text-sm text-gray-500 mt-1">Split long AI prompts into manageable chunks with overlap</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is an AI Prompt Chunker?',
              answer: 'An AI Prompt Chunker is a tool that splits long AI prompts into smaller, manageable chunks. This is essential for AI tools like ChatGPT, Claude, and others that have token limits. The tool adds instructions to help AI understand the chunking process and consolidate chunks in memory.',
            },
            {
              question: 'Why do I need to chunk AI prompts?',
              answer: 'AI tools have token limits (e.g., ChatGPT has context windows). Long prompts may exceed these limits. Chunking allows you to send prompts in parts, with the AI storing each chunk in memory and consolidating them for the final output.',
            },
            {
              question: 'How does the Prompt Chunker work?',
              answer: 'The Prompt Chunker splits your long prompt into smaller chunks by words or characters. The first chunk includes instructions for the AI to store chunks in memory. The final chunk includes instructions to consolidate all stored chunks and generate output. Overlap between chunks preserves context.',
            },
            {
              question: 'Is the Prompt Chunker free?',
              answer: 'Yes, 100% free. No signup required, no usage limits. All processing happens in your browser for maximum privacy. You can chunk unlimited prompts without any restrictions.',
            },
            {
              question: 'Which AI tools work with chunked prompts?',
              answer: 'The Prompt Chunker works with any AI tool that accepts text input, including ChatGPT, Claude, Gemini, Perplexity, and other conversational AI models. The chunking instructions are designed to work with most modern AI systems.',
            },
            {
              question: 'What is overlap in prompt chunking?',
              answer: 'Overlap is the percentage of content that repeats between consecutive chunks. For example, 50% overlap means half of each chunk\'s content appears in the next chunk. This helps preserve context and ensures the AI understands the relationship between chunks.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>AI Prompt Chunker</strong> is a free online tool that splits long AI prompts into smaller, 
              manageable chunks. Perfect for <strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Gemini</strong>, 
              and other AI tools that have token limits. The tool automatically adds instructions to help AI understand 
              the chunking process and consolidate chunks in memory.
            </p>
            <p className="text-gray-700 leading-relaxed">
              No signup required, 100% privacy-focused (all processing happens in your browser). 
              Use our <Link href="/?tab=promptchunk" className="text-purple-600 hover:underline font-semibold">Prompt Chunker tool</Link> to split long prompts instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Scissors className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Smart Chunking</h3>
                <p className="text-sm text-gray-700">Split by words or characters with configurable chunk size</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Context Preservation</h3>
                <p className="text-sm text-gray-700">Configurable overlap (0-50%) to maintain context between chunks</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">AI Instructions</h3>
                <p className="text-sm text-gray-700">Automatically adds instructions for AI to store and consolidate chunks</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Copy className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Easy Copy & Download</h3>
                <p className="text-sm text-gray-700">Copy individual chunks or download all chunks as a file</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <Info className="w-6 h-6 text-pink-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Collapsible View</h3>
                <p className="text-sm text-gray-700">View More/Less options for long chunks with preview mode</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <CheckCircle className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">100% Free & Private</h3>
                <p className="text-sm text-gray-700">No signup, no limits, all processing in your browser</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use AI Prompt Chunker</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Paste Your Long Prompt</h3>
                  <p className="text-gray-700 text-sm">Copy and paste your long AI prompt into the text area</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Configure Settings</h3>
                  <p className="text-gray-700 text-sm">Choose chunk type (words or characters), set chunk size, and configure overlap percentage</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Split into Chunks</h3>
                  <p className="text-gray-700 text-sm">Click "Split into Chunks" to generate manageable pieces with AI instructions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Copy & Use</h3>
                  <p className="text-gray-700 text-sm">Copy individual chunks or all chunks. Send them to your AI tool in sequence, starting with Chunk 1</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Prompt Chunking?</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Token Limit Management</h3>
                <p className="text-sm text-gray-700">
                  AI tools like ChatGPT and Claude have token limits. Long prompts may exceed these limits. 
                  Chunking allows you to work within these constraints while maintaining context.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Better Context Preservation</h3>
                <p className="text-sm text-gray-700">
                  Overlap between chunks ensures the AI maintains context across all parts of your prompt. 
                  This results in more coherent and accurate responses.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Organized Prompt Management</h3>
                <p className="text-sm text-gray-700">
                  Chunking helps organize complex prompts into manageable sections. Each chunk can be reviewed, 
                  edited, and sent separately, giving you better control over the process.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">AI Memory Instructions</h3>
                <p className="text-sm text-gray-700">
                  The tool automatically adds instructions for AI to store chunks in memory and consolidate 
                  them for the final output. This ensures the AI understands the chunking process.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Start with Chunk 1:</strong> Always send chunks in order, starting with the first chunk that includes the "wait" instruction.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Use Appropriate Overlap:</strong> 30-50% overlap works well for most prompts. Higher overlap preserves more context but creates more chunks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Wait for AI Acknowledgment:</strong> After sending Chunk 1, wait for the AI to acknowledge before sending the next chunk.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Send All Chunks:</strong> Make sure to send all chunks in sequence. The final chunk includes instructions to consolidate everything.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Scissors className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Try the Prompt Chunker Now</h2>
                <p className="text-purple-100">
                  Split your long AI prompts into manageable chunks with automatic AI instructions. 
                  100% free, no signup required.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=promptchunk"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Open Prompt Chunker
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/?tab=fixer"
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">JSON Fixer</h3>
                <p className="text-sm text-gray-600">Fix malformed JSON instantly</p>
              </Link>
              <Link
                href="/?tab=schema"
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Schema Generator</h3>
                <p className="text-sm text-gray-600">Generate JSON schemas from JSON data</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

