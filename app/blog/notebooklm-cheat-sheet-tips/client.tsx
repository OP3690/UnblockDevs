'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, Zap, CheckCircle, Copy, FileText, MessageSquare, Lightbulb, Target } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function NotebooklmCheatSheetTipsClient() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const quickTips = [
    {
      category: 'Getting Started',
      tips: [
        { tip: 'Start with 2-3 related documents to understand the tool', icon: '🚀' },
        { tip: 'Use descriptive notebook names: "Research: [Topic]" or "Analysis: [Project]"', icon: '📝' },
        { tip: 'Wait for documents to fully process before asking questions', icon: '⏳' },
        { tip: 'Upload documents in supported formats: PDF, Google Docs, or plain text', icon: '📄' }
      ]
    },
    {
      category: 'Question Mastery',
      tips: [
        { tip: 'Start broad, then narrow down: "Summarize" → "Explain X in detail"', icon: '🎯' },
        { tip: 'Use specific questions: "What are the 3 main findings?" not "Tell me about this"', icon: '❓' },
        { tip: 'Ask follow-up questions to dive deeper into topics', icon: '🔍' },
        { tip: 'Request structured outputs: "Create a bullet-point list" or "Make a table"', icon: '📊' },
        { tip: 'Ask for comparisons: "Compare X and Y from the sources"', icon: '⚖️' }
      ]
    },
    {
      category: 'Content Generation',
      tips: [
        { tip: 'Specify format: "Create a bullet-point outline" or "Write in markdown"', icon: '📋' },
        { tip: 'Define audience: "Write for technical audience" or "Explain for beginners"', icon: '👥' },
        { tip: 'Request revisions: "Make this more concise" or "Add more examples"', icon: '✏️' },
        { tip: 'Ask for multiple versions: "Create 3 different approaches"', icon: '🔄' },
        { tip: 'Request examples: "Give me 3 examples of [concept] from the sources"', icon: '💡' }
      ]
    },
    {
      category: 'Organization',
      tips: [
        { tip: 'Create separate notebooks for different projects or topics', icon: '📚' },
        { tip: 'Group related documents together in the same notebook', icon: '📁' },
        { tip: 'Archive old notebooks instead of deleting them', icon: '🗄️' },
        { tip: 'Use consistent naming conventions across notebooks', icon: '🏷️' }
      ]
    },
    {
      category: 'Advanced Techniques',
      tips: [
        { tip: 'Upload complementary sources to get comprehensive insights', icon: '🔗' },
        { tip: 'Ask NotebookLM to find connections across multiple documents', icon: '🌐' },
        { tip: 'Request citations: "Which sources did you use for this answer?"', icon: '📖' },
        { tip: 'Use progressive refinement: Build on previous answers', icon: '🏗️' },
        { tip: 'Ask for structured analysis: "Create a pros/cons table"', icon: '📈' }
      ]
    }
  ];

  const questionTemplates = [
    {
      category: 'Summaries',
      templates: [
        'Summarize the main points from [source/topic]',
        'What are the key takeaways from these documents?',
        'Create a bullet-point summary of [specific section]',
        'What are the 5 most important points in this document?',
        'Summarize [topic] in 3 paragraphs'
      ]
    },
    {
      category: 'Analysis',
      templates: [
        'What are the common themes across these sources?',
        'Compare and contrast [topic A] and [topic B] from the sources',
        'What are the strengths and weaknesses mentioned?',
        'Analyze the methodology used in [source]',
        'What patterns do you see across these documents?'
      ]
    },
    {
      category: 'Content Creation',
      templates: [
        'Create an outline for [topic] based on these sources',
        'Write a summary paragraph about [topic] for [audience]',
        'Generate 5 key questions about [topic]',
        'Create a study guide with key concepts and examples',
        'Write a blog post outline about [topic]'
      ]
    },
    {
      category: 'Extraction',
      templates: [
        'What are the action items from this meeting transcript?',
        'Extract all dates and deadlines mentioned in these documents',
        'List all key metrics and their values',
        'What are the main recommendations from [source]?',
        'Extract all technical terms and their definitions'
      ]
    },
    {
      category: 'Explanations',
      templates: [
        'Explain [concept] in simple terms',
        'How does [process] work according to these sources?',
        'What is the relationship between [A] and [B]?',
        'Break down [complex topic] into steps',
        'Explain [concept] with examples from the sources'
      ]
    }
  ];

  const powerUserTips = [
    {
      title: 'Multi-Source Synthesis',
      description: 'Upload 5-10 related documents and ask NotebookLM to synthesize insights across all of them',
      example: 'Upload 10 research papers, then ask: "What are the common findings and contradictions across all these papers?"',
      benefit: 'Get comprehensive insights that would take hours to compile manually'
    },
    {
      title: 'Progressive Learning',
      description: 'Start with simple explanations, then request increasingly detailed information',
      example: '1. "Explain machine learning simply"\n2. "Now explain neural networks in detail"\n3. "What are the different types of neural networks?"',
      benefit: 'Build understanding progressively, perfect for learning complex topics'
    },
    {
      title: 'Structured Output Requests',
      description: 'Ask for specific formats: tables, lists, outlines, or structured data',
      example: 'Ask: "Create a comparison table of [topic A] vs [topic B] with columns: Feature, Pros, Cons, Use Cases"',
      benefit: 'Get organized, actionable outputs ready for use in reports or presentations'
    },
    {
      title: 'Citation Verification',
      description: 'Always verify which sources NotebookLM used for answers',
      example: 'After getting an answer, ask: "Which specific sources and sections did you use for this answer?"',
      benefit: 'Ensure accuracy and traceability to original sources'
    },
    {
      title: 'Iterative Refinement',
      description: 'Refine outputs through multiple iterations',
      example: '1. "Create an outline"\n2. "Make it more detailed"\n3. "Add examples for each point"\n4. "Format as markdown"',
      benefit: 'Get exactly what you need through progressive refinement'
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Asking vague questions',
      fix: 'Be specific: "What are the 3 main findings?" instead of "Tell me about this"',
      impact: 'Vague questions lead to generic answers. Specific questions get targeted insights.'
    },
    {
      mistake: 'Not verifying citations',
      fix: 'Always ask which sources were used and verify the information',
      impact: 'Ensures accuracy and prevents using incorrect information.'
    },
    {
      mistake: 'Uploading unrelated documents',
      fix: 'Group related documents together in separate notebooks',
      impact: 'Related documents provide better context and more accurate insights.'
    },
    {
      mistake: 'Not using structured requests',
      fix: 'Request specific formats: "Create a table" or "Make bullet points"',
      impact: 'Structured outputs are easier to use and more actionable.'
    },
    {
      mistake: 'Expecting perfect results in one shot',
      fix: 'Use iterative refinement: ask follow-ups and request revisions',
      impact: 'Iteration leads to better results than single-shot requests.'
    }
  ];

  const workflowExamples = [
    {
      workflow: 'Research Paper Analysis',
      steps: [
        'Upload research paper PDF',
        'Ask: "Summarize the main findings"',
        'Follow-up: "Explain the methodology in detail"',
        'Ask: "What are the limitations mentioned?"',
        'Request: "Create a study guide with key concepts"'
      ]
    },
    {
      workflow: 'Meeting Notes Processing',
      steps: [
        'Upload meeting transcript',
        'Ask: "Summarize the key decisions"',
        'Request: "Extract all action items with owners"',
        'Ask: "What are the next steps and deadlines?"',
        'Generate: "Create a meeting summary email"'
      ]
    },
    {
      workflow: 'Content Creation',
      steps: [
        'Upload 3-5 source articles',
        'Ask: "What are the common themes?"',
        'Request: "Create an outline for a blog post"',
        'Ask: "Write the introduction paragraph"',
        'Refine: "Make it more engaging and add examples"'
      ]
    },
    {
      workflow: 'Learning & Study',
      steps: [
        'Upload textbook chapter or course materials',
        'Ask: "Explain [concept] in simple terms"',
        'Request: "Create a study guide with key points"',
        'Ask: "Generate practice questions"',
        'Follow-up: "Explain the answers in detail"'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NotebookLM Cheat Sheet</h1>
              <p className="text-sm text-gray-500 mt-1">Tips, Tricks & Quick Reference Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="NotebookLM Cheat Sheet"
        description="Tips, Tricks & Quick Reference Guide"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are the best NotebookLM tips and tricks?',
              answer: 'Best tips include: asking specific questions instead of vague ones, using progressive refinement (start broad then narrow), requesting structured outputs (tables, bullet points), verifying citations, grouping related documents, using descriptive notebook names, and iterating on outputs through follow-up questions.',
            },
            {
              question: 'How do I get better results from NotebookLM?',
              answer: 'Get better results by: being specific in questions, requesting structured formats, using progressive refinement, verifying citations, organizing documents by topic, asking follow-up questions, and iterating on outputs. Start with 2-3 related documents and build up as you understand the tool better.',
            },
            {
              question: 'What are common NotebookLM mistakes to avoid?',
              answer: 'Common mistakes: asking vague questions, not verifying citations, uploading unrelated documents together, not requesting structured outputs, expecting perfect results in one shot, and not using iterative refinement. Always be specific, verify sources, and iterate for best results.',
            },
            {
              question: 'What are the best question templates for NotebookLM?',
              answer: 'Best templates include: "Summarize [topic] from [source]", "Compare X and Y from the sources", "Create a bullet-point outline for [topic]", "What are the 3 main findings?", "Extract all action items from [document]", and "Explain [concept] with examples from the sources". Be specific and request structured outputs.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This <strong>NotebookLM Cheat Sheet</strong> provides quick reference tips, tricks, question templates, 
              and best practices to help you master Google's AI-powered notebook tool. Bookmark this page for instant 
              access to proven techniques and workflows.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Quick Tips by Category
            </h2>
            <div className="space-y-6">
              {quickTips.map((category, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">{category.category}</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {category.tips.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white p-3 rounded border border-gray-200 flex items-start gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <p className="text-sm text-gray-700 flex-1">{item.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Question Templates (Copy & Use)
            </h2>
            <div className="space-y-6">
              {questionTemplates.map((category, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.templates.map((template, templateIdx) => (
                      <div key={templateIdx} className="flex items-start justify-between bg-white p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-700 flex-1">{template}</p>
                        <button
                          onClick={() => copyToClipboard(template, `${category.category}-${templateIdx}`)}
                          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-2"
                          title="Copy template"
                        >
                          {copiedText === `${category.category}-${templateIdx}` ? (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Power User Tips
            </h2>
            <div className="space-y-4">
              {powerUserTips.map((tip, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{tip.description}</p>
                  <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap italic">{tip.example}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded border-l-4 border-green-500">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Benefit:</strong> {tip.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-600" />
              Common Mistakes & How to Fix Them
            </h2>
            <div className="space-y-4">
              {commonMistakes.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">❌ Mistake:</h4>
                      <p className="text-sm text-gray-700">{item.mistake}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2 text-sm">✅ Fix:</h4>
                      <p className="text-sm text-gray-700">{item.fix}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      <strong>Impact:</strong> {item.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              Complete Workflow Examples
            </h2>
            <div className="space-y-4">
              {workflowExamples.map((workflow, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{workflow.workflow}</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {workflow.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="text-sm text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference Checklist</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">✅ Do:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Ask specific, targeted questions</li>
                    <li>Request structured outputs (tables, lists)</li>
                    <li>Verify citations and sources</li>
                    <li>Use progressive refinement</li>
                    <li>Group related documents together</li>
                    <li>Use descriptive notebook names</li>
                    <li>Ask follow-up questions</li>
                    <li>Request revisions when needed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">❌ Don't:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Ask vague or generic questions</li>
                    <li>Upload unrelated documents together</li>
                    <li>Skip citation verification</li>
                    <li>Expect perfect results in one shot</li>
                    <li>Use unclear notebook names</li>
                    <li>Accept first output without refinement</li>
                    <li>Ignore source references</li>
                    <li>Mix different topics in one notebook</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Process NotebookLM Output</h2>
                <p className="text-purple-100">
                  When NotebookLM generates structured data, summaries, or JSON content, use our tools to validate, 
                  format, and organize the output for further use.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=beautifier"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                JSON Formatter
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
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

