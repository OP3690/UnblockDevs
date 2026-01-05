'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, Sparkles, Zap, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';

export default function AiProductivityToolsCompleteGuideClient() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const tools = [
    {
      id: 'cursor',
      name: 'Cursor AI',
      category: 'Code Editor',
      what: 'AI-powered code editor that understands your codebase and helps you write, refactor, and debug code',
      when: 'When coding, refactoring, debugging, or learning new codebases',
      how: 'Use Cursor\'s chat to ask questions about code, request code changes, or get explanations. Use Composer for multi-file edits. Use Cmd+K for inline edits.',
      bestPrompts: [
        {
          title: 'Understand Codebase',
          prompt: 'Explain how authentication works in this codebase. Show me the key files and flow.',
          result: 'Cursor analyzes your codebase and provides a clear explanation with file references'
        },
        {
          title: 'Refactor Code',
          prompt: 'Refactor this function to be more readable and add error handling. Keep the same functionality.',
          result: 'Cursor refactors code while maintaining functionality and improving quality'
        },
        {
          title: 'Add Feature',
          prompt: 'Add user authentication to this app. Create login, signup, and protected routes. Use JWT tokens.',
          result: 'Cursor generates complete authentication implementation across multiple files'
        }
      ],
      pros: ['Deep codebase understanding', 'Multi-file edits', 'Context-aware suggestions', 'Integrated workflow'],
      cons: ['Requires codebase access', 'Can be slow on large projects', 'Subscription required']
    },
    {
      id: 'claude',
      name: 'Claude (Anthropic)',
      category: 'AI Assistant',
      what: 'Advanced AI assistant with excellent reasoning, long context window, and strong coding capabilities',
      when: 'When you need detailed analysis, long-form writing, code review, or complex problem-solving',
      how: 'Use Claude for tasks requiring deep reasoning, long context, or careful analysis. Upload files for context. Use for code review and documentation.',
      bestPrompts: [
        {
          title: 'Code Review',
          prompt: 'Review this code for security vulnerabilities, performance issues, and best practices. Provide specific recommendations.',
          result: 'Claude provides comprehensive code review with actionable suggestions'
        },
        {
          title: 'Long-Form Writing',
          prompt: 'Write a comprehensive technical blog post about microservices architecture. Include examples, best practices, and common pitfalls. 2000+ words.',
          result: 'Claude generates detailed, well-structured long-form content'
        },
        {
          title: 'Complex Analysis',
          prompt: 'Analyze this architecture diagram and identify potential bottlenecks, scalability issues, and improvement opportunities.',
          result: 'Claude provides deep technical analysis with reasoning'
        }
      ],
      pros: ['Excellent reasoning', 'Long context (200K tokens)', 'Strong coding skills', 'File upload support'],
      cons: ['Slower response time', 'No real-time data', 'Limited free tier']
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      category: 'Research Assistant',
      what: 'AI-powered search engine that provides answers with citations and real-time information',
      when: 'When researching topics, need current information, or want cited sources',
      how: 'Ask research questions naturally. Perplexity searches the web, synthesizes information, and provides answers with citations. Use for current events and research.',
      bestPrompts: [
        {
          title: 'Research Topic',
          prompt: 'What are the latest developments in quantum computing in 2025? Include recent breakthroughs and company announcements.',
          result: 'Perplexity provides current information with citations and sources'
        },
        {
          title: 'Compare Options',
          prompt: 'Compare the top 5 database solutions for high-traffic applications. Include pros, cons, and use cases.',
          result: 'Perplexity researches and compares options with sources'
        },
        {
          title: 'Technical Deep Dive',
          prompt: 'Explain how React Server Components work. Include recent updates, examples, and best practices.',
          result: 'Perplexity provides comprehensive explanation with current information and citations'
        }
      ],
      pros: ['Real-time information', 'Citations and sources', 'Web search integration', 'Free tier available'],
      cons: ['Less creative than ChatGPT', 'Limited code generation', 'Can be verbose']
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'Code Assistant',
      what: 'AI pair programmer that suggests code completions and entire functions as you type',
      when: 'When writing code, need quick suggestions, or want to speed up coding',
      how: 'Start typing code and Copilot suggests completions. Accept with Tab. Use comments to request specific code. Works in most IDEs.',
      bestPrompts: [
        {
          title: 'Function Generation',
          prompt: '// Function to calculate fibonacci sequence up to n terms',
          result: 'Copilot generates the complete function based on the comment'
        },
        {
          title: 'Test Generation',
          prompt: '// Write unit tests for the calculateTotal function',
          result: 'Copilot generates comprehensive test cases'
        },
        {
          title: 'Code Documentation',
          prompt: '// Add JSDoc comments explaining parameters and return value',
          result: 'Copilot adds detailed documentation comments'
        }
      ],
      pros: ['Fast code suggestions', 'IDE integration', 'Multiple languages', 'Context-aware'],
      cons: ['Can suggest incorrect code', 'Requires review', 'Subscription required', 'Privacy concerns']
    }
  ];

  const comparisonTable = [
    { feature: 'Code Understanding', cursor: '⭐⭐⭐⭐⭐', claude: '⭐⭐⭐⭐', perplexity: '⭐⭐', copilot: '⭐⭐⭐' },
    { feature: 'Writing Quality', cursor: '⭐⭐⭐', claude: '⭐⭐⭐⭐⭐', perplexity: '⭐⭐⭐⭐', copilot: '⭐⭐' },
    { feature: 'Real-Time Info', cursor: '⭐', claude: '⭐', perplexity: '⭐⭐⭐⭐⭐', copilot: '⭐' },
    { feature: 'Code Generation', cursor: '⭐⭐⭐⭐⭐', claude: '⭐⭐⭐⭐', perplexity: '⭐⭐', copilot: '⭐⭐⭐⭐⭐' },
    { feature: 'Context Window', cursor: 'Large', claude: 'Very Large (200K)', perplexity: 'Medium', copilot: 'Medium' },
    { feature: 'Best For', cursor: 'Coding & Refactoring', claude: 'Analysis & Writing', perplexity: 'Research', copilot: 'Quick Coding' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Productivity Tools: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Cursor, Claude, Perplexity & More</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is Cursor AI and how does it work?',
              answer: 'Cursor AI is an AI-powered code editor that understands your entire codebase. It helps you write, refactor, and debug code by analyzing context across multiple files. Use Cursor\'s chat to ask questions, Composer for multi-file edits, and Cmd+K for inline code changes.',
            },
            {
              question: 'When should I use Cursor vs ChatGPT for coding?',
              answer: 'Use Cursor when working within a codebase - it understands file relationships, imports, and project structure. Use ChatGPT for general coding questions, learning concepts, or when you need explanations without codebase context. Cursor excels at refactoring and understanding existing code.',
            },
            {
              question: 'What are the best prompts for AI productivity tools?',
              answer: 'Best prompts include: being specific about requirements, providing context, using role-based prompts ("You are an expert..."), breaking tasks into steps, specifying format and style, providing examples, and iterating on responses. The more context you give, the better the results.',
            },
            {
              question: 'How do I choose the right AI tool for my task?',
              answer: 'Choose based on task: Cursor for codebase work, Claude for deep analysis and writing, Perplexity for research with citations, GitHub Copilot for quick code completions, ChatGPT for general tasks. Consider: context needs, output quality, real-time data requirements, and integration with your workflow.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>AI productivity tools</strong> have transformed how developers, writers, and professionals work. 
              From code editors to research assistants, AI tools can dramatically increase productivity when used 
              effectively.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This guide explores the top AI productivity tools: what they do, when to use them, how to use them 
              effectively, and the best prompts for maximum results.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Top AI Productivity Tools
            </h2>
            <div className="space-y-8">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                      <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">{tool.category}</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">What</h4>
                      <p className="text-sm text-gray-700">{tool.what}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">When</h4>
                      <p className="text-sm text-gray-700">{tool.when}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">How</h4>
                      <p className="text-sm text-gray-700">{tool.how}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Best Prompts & Examples</h4>
                    <div className="space-y-3">
                      {tool.bestPrompts.map((promptExample, idx) => (
                        <div key={idx} className="bg-white p-4 rounded border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-gray-800 text-sm">{promptExample.title}</h5>
                            <button
                              onClick={() => copyToClipboard(promptExample.prompt, `${tool.id}-${idx}`)}
                              className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Copy prompt"
                            >
                              {copiedPrompt === `${tool.id}-${idx}` ? (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <pre className="bg-gray-900 text-blue-400 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-2">
                            <code>{promptExample.prompt}</code>
                          </pre>
                          <p className="text-xs text-gray-600 italic">Result: {promptExample.result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">✅ Pros</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                        {tool.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">❌ Cons</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                        {tool.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tool Comparison</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Cursor</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Claude</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Perplexity</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Copilot</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium text-gray-800">{row.feature}</td>
                      <td className="py-2 px-3 text-center text-gray-700">{row.cursor}</td>
                      <td className="py-2 px-3 text-center text-gray-700">{row.claude}</td>
                      <td className="py-2 px-3 text-center text-gray-700">{row.perplexity}</td>
                      <td className="py-2 px-3 text-center text-gray-700">{row.copilot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for AI Tools</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Provide Context</h3>
                <p className="text-gray-700 text-sm">
                  Always provide relevant context: code snippets, file structure, requirements, constraints. 
                  The more context AI tools have, the better their suggestions.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Be Specific</h3>
                <p className="text-gray-700 text-sm">
                  Specify exactly what you want: format, style, length, constraints. Vague prompts lead to 
                  generic results. Specific prompts lead to targeted outputs.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Iterate and Refine</h3>
                <p className="text-gray-700 text-sm">
                  Don't accept the first response. Ask follow-up questions, request changes, and refine 
                  until you get the desired result. AI tools improve with iteration.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Review and Verify</h3>
                <p className="text-gray-700 text-sm">
                  Always review AI-generated code, content, and suggestions. AI tools can make mistakes. 
                  Verify facts, test code, and ensure accuracy before using in production.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Enhance Your AI Workflow</h2>
                <p className="text-blue-100">
                  Use our tools to prepare data structures, validate formats, and generate schemas for 
                  AI tool integration. Ensure your data is AI-ready.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Schema Generator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                JSON Validator
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

