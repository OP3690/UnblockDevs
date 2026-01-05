'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, Sparkles, Zap, Lightbulb, CheckCircle, Copy, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';

export default function NotebooklmCompleteGuideClient() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const useCases = [
    {
      id: 'research',
      title: 'Research & Analysis',
      what: 'Upload research papers, articles, or documents and get AI-powered summaries and insights',
      how: 'Upload PDFs, Google Docs, or paste text. Ask questions about the content, get summaries, and generate study guides',
      when: 'When researching topics, analyzing documents, preparing for exams, or studying complex subjects',
      example: 'Upload 10 research papers on machine learning, then ask: "What are the common themes across these papers?"',
      bestPractice: 'Upload related documents together to build a comprehensive knowledge base. Use specific questions to get targeted insights.'
    },
    {
      id: 'writing',
      title: 'Writing & Content Creation',
      what: 'Generate outlines, write articles, create summaries, and get writing suggestions based on your sources',
      how: 'Upload source material, ask NotebookLM to create outlines, write drafts, or generate content based on your sources',
      when: 'When writing articles, blog posts, reports, or any content that needs to reference multiple sources',
      example: 'Upload 5 articles about climate change, then ask: "Create an outline for a blog post about renewable energy solutions"',
      bestPractice: 'Provide clear instructions about tone, audience, and format. Reference specific sources when asking for content generation.'
    },
    {
      id: 'meeting-notes',
      title: 'Meeting Notes & Transcripts',
      what: 'Upload meeting transcripts or notes and get summaries, action items, and key insights',
      how: 'Upload meeting transcripts, ask for summaries, extract action items, and identify key decisions',
      when: 'After meetings, interviews, or any recorded conversations that need to be analyzed',
      example: 'Upload a meeting transcript, then ask: "Summarize the key decisions and action items from this meeting"',
      bestPractice: 'Upload transcripts immediately after meetings. Ask for structured outputs (action items, decisions, next steps) for better organization.'
    },
    {
      id: 'learning',
      title: 'Learning & Education',
      what: 'Create study guides, explain complex concepts, generate practice questions, and summarize course materials',
      how: 'Upload course materials, textbooks, or lecture notes. Ask for explanations, summaries, and practice questions',
      when: 'When studying for exams, learning new subjects, or preparing course materials',
      example: 'Upload a textbook chapter, then ask: "Create a study guide with key concepts and practice questions"',
      bestPractice: 'Break down large documents into chapters or sections. Ask for progressive explanations (simple to complex) when learning new topics.'
    },
    {
      id: 'document-analysis',
      title: 'Document Analysis',
      what: 'Analyze contracts, reports, legal documents, or any text documents for key information',
      how: 'Upload documents, ask specific questions about content, get summaries, and identify important sections',
      when: 'When reviewing contracts, analyzing reports, or extracting information from lengthy documents',
      example: 'Upload a contract, then ask: "What are the key terms and obligations in this contract?"',
      bestPractice: 'Ask specific questions rather than general ones. Request structured outputs (bullet points, tables) for better clarity.'
    }
  ];

  const features = [
    {
      title: 'Source Grounding',
      description: 'NotebookLM only uses information from your uploaded sources, ensuring accuracy and preventing hallucinations',
      tip: 'Always verify that NotebookLM is referencing your sources correctly. Check citations when provided.'
    },
    {
      title: 'Multi-Source Analysis',
      description: 'Upload multiple documents and NotebookLM can analyze relationships and themes across all sources',
      tip: 'Group related documents together. Upload complementary sources to get comprehensive insights.'
    },
    {
      title: 'Interactive Q&A',
      description: 'Ask questions about your sources and get detailed, source-backed answers',
      tip: 'Ask follow-up questions to dive deeper. Use specific questions for better results than vague ones.'
    },
    {
      title: 'Content Generation',
      description: 'Generate outlines, summaries, study guides, and other content based on your sources',
      tip: 'Be specific about format and requirements. Request revisions if the output doesn\'t match your needs.'
    },
    {
      title: 'Citation Tracking',
      description: 'NotebookLM can show which sources it used for each answer',
      tip: 'Always check citations to verify accuracy. Use this feature to trace back to original sources.'
    }
  ];

  const bestPractices = [
    {
      title: 'Organize Your Sources',
      description: 'Group related documents together in separate notebooks. Use clear naming conventions for easy identification.',
      example: 'Create separate notebooks for different projects: "Project Alpha Research", "Project Beta Analysis"'
    },
    {
      title: 'Ask Specific Questions',
      description: 'Instead of "Tell me about this", ask "What are the three main findings in this research paper?"',
      example: '❌ Bad: "What\'s in this document?"\n✅ Good: "What are the key metrics and their implications from the Q4 report?"'
    },
    {
      title: 'Use Progressive Refinement',
      description: 'Start with broad questions, then narrow down based on responses. Build on previous answers.',
      example: '1. "Summarize this document"\n2. "Explain the methodology in detail"\n3. "What are the limitations mentioned?"'
    },
    {
      title: 'Request Structured Outputs',
      description: 'Ask for bullet points, tables, or numbered lists for better organization and readability.',
      example: 'Ask: "Create a table comparing the pros and cons of each approach mentioned in the sources"'
    },
    {
      title: 'Verify Citations',
      description: 'Always check which sources NotebookLM used for answers. Verify accuracy by reviewing original sources.',
      example: 'After getting an answer, ask: "Which sources did you use for this answer?" and verify the information.'
    },
    {
      title: 'Combine Multiple Sources',
      description: 'Upload complementary sources to get comprehensive insights. NotebookLM can find connections across documents.',
      example: 'Upload both a research paper and a related news article to get a complete picture of a topic.'
    }
  ];

  const tips = [
    {
      category: 'Getting Started',
      items: [
        'Start with 2-3 related documents to understand how NotebookLM works',
        'Use clear, descriptive names for your notebooks',
        'Upload documents in formats NotebookLM supports (PDF, Google Docs, text)',
        'Wait for documents to process before asking questions'
      ]
    },
    {
      category: 'Question Techniques',
      items: [
        'Start with broad questions, then get more specific',
        'Use follow-up questions to dive deeper into topics',
        'Ask for comparisons: "Compare X and Y from the sources"',
        'Request examples: "Give me 3 examples of [concept] from the sources"',
        'Ask for summaries: "Summarize the main points about [topic]"'
      ]
    },
    {
      category: 'Content Generation',
      items: [
        'Be specific about format: "Create a bullet-point outline"',
        'Specify audience: "Write for a technical audience"',
        'Request revisions: "Make this more concise" or "Add more detail"',
        'Ask for multiple versions: "Create 3 different approaches to this topic"'
      ]
    },
    {
      category: 'Organization',
      items: [
        'Create separate notebooks for different projects or topics',
        'Use consistent naming: "Research: [Topic]" or "Analysis: [Project]"',
        'Archive old notebooks instead of deleting them',
        'Tag or label notebooks for easy searching'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NotebookLM Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">How to Use Google's AI-Powered Notebook: Best Practices & Tips</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is NotebookLM and how does it work?',
              answer: 'NotebookLM is Google\'s AI-powered notebook tool that lets you upload documents (PDFs, Google Docs, text) and ask questions about them. It uses AI to analyze your sources, answer questions, generate summaries, and create content based only on your uploaded documents. It\'s source-grounded, meaning it only uses information from your documents.',
            },
            {
              question: 'How do I use NotebookLM effectively?',
              answer: 'To use NotebookLM effectively: upload related documents together, ask specific questions rather than vague ones, use progressive refinement (start broad, then narrow down), request structured outputs (bullet points, tables), verify citations, and organize your notebooks by project or topic. Always check which sources were used for answers.',
            },
            {
              question: 'What are the best practices for NotebookLM?',
              answer: 'Best practices include: organizing sources by project/topic, asking specific questions, using progressive refinement, requesting structured outputs, verifying citations, combining multiple complementary sources, using clear naming conventions, and starting with 2-3 documents to understand the tool before scaling up.',
            },
            {
              question: 'What can I use NotebookLM for?',
              answer: 'NotebookLM is great for: research and analysis (upload papers and get insights), writing and content creation (generate outlines and drafts), meeting notes and transcripts (summarize and extract action items), learning and education (create study guides and explain concepts), and document analysis (analyze contracts, reports, legal documents).',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>NotebookLM</strong> is Google's AI-powered notebook tool that revolutionizes how you interact with 
              documents, research papers, and knowledge sources. Understanding <strong>what</strong> it does, 
              <strong>how</strong> to use it effectively, and <strong>when</strong> it's most valuable can transform 
              your research, writing, and learning workflows.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide covers everything you need to know about NotebookLM: features, use cases, best 
              practices, tips, and tricks to maximize your productivity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              What is NotebookLM?
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>NotebookLM</strong> is an AI-powered notebook that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Source-Grounded:</strong> Only uses information from your uploaded documents (no hallucinations)</li>
                <li><strong>Multi-Document:</strong> Can analyze and connect information across multiple sources</li>
                <li><strong>Interactive:</strong> Answer questions, generate content, and get insights from your sources</li>
                <li><strong>Citation-Aware:</strong> Shows which sources were used for each answer</li>
                <li><strong>Content Generator:</strong> Creates outlines, summaries, study guides, and more based on your sources</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Unlike general AI chatbots, NotebookLM is specifically designed to work with your documents, making it 
              ideal for research, analysis, writing, and learning tasks.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Key Features
            </h2>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{feature.description}</p>
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> {feature.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Real-World Use Cases
            </h2>
            <div className="space-y-6">
              {useCases.map((useCase) => (
                <div key={useCase.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">What:</h4>
                      <p className="text-sm text-gray-700">{useCase.what}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">How:</h4>
                      <p className="text-sm text-gray-700">{useCase.how}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded border border-purple-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">When:</h4>
                      <p className="text-sm text-gray-700">{useCase.when}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Example:</h4>
                    <p className="text-sm text-gray-700 italic">{useCase.example}</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700">
                      <strong>✨ Best Practice:</strong> {useCase.bestPractice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Best Practices
            </h2>
            <div className="space-y-4">
              {bestPractices.map((practice, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{practice.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{practice.description}</p>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{practice.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips by Category</h2>
            <div className="space-y-6">
              {tips.map((tipCategory, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{tipCategory.category}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {tipCategory.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Templates</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">For Summaries</h3>
                <div className="space-y-2">
                  {[
                    'Summarize the main points from [source/topic]',
                    'What are the key takeaways from these documents?',
                    'Create a bullet-point summary of [specific section]',
                    'What are the 5 most important points in this document?'
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm text-gray-700 flex-1">{template}</p>
                      <button
                        onClick={() => copyToClipboard(template, `summary-${idx}`)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-2"
                        title="Copy"
                      >
                        {copiedText === `summary-${idx}` ? (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">For Analysis</h3>
                <div className="space-y-2">
                  {[
                    'What are the common themes across these sources?',
                    'Compare and contrast [topic A] and [topic B] from the sources',
                    'What are the strengths and weaknesses mentioned in these documents?',
                    'Analyze the methodology used in [source]'
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm text-gray-700 flex-1">{template}</p>
                      <button
                        onClick={() => copyToClipboard(template, `analysis-${idx}`)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-2"
                        title="Copy"
                      >
                        {copiedText === `analysis-${idx}` ? (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">For Content Generation</h3>
                <div className="space-y-2">
                  {[
                    'Create an outline for [topic] based on these sources',
                    'Write a summary paragraph about [topic] for a [audience] audience',
                    'Generate 5 key questions about [topic] from these sources',
                    'Create a study guide with key concepts and examples'
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm text-gray-700 flex-1">{template}</p>
                      <button
                        onClick={() => copyToClipboard(template, `content-${idx}`)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-2"
                        title="Copy"
                      >
                        {copiedText === `content-${idx}` ? (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Export Your NotebookLM Data</h2>
                <p className="text-blue-100">
                  When NotebookLM generates JSON data, summaries, or structured content, use our tools to validate, 
                  format, and organize the output for further use.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=beautifier"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                JSON Formatter
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Schema Generator
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

