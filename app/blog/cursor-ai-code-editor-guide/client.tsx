'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, MousePointerClick, Zap, Keyboard, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function CursorAiCodeEditorGuideClient() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const features = [
    {
      id: 'inline-edit',
      title: 'Inline Code Editing (Cmd/Ctrl+K)',
      what: 'Edit code directly in your editor using natural language',
      how: 'Select code, press Cmd/Ctrl+K, describe what you want, and Cursor edits it',
      when: 'Refactoring, fixing bugs, adding features, or modifying existing code',
      example: 'Select a function, press Cmd+K, type: "Add error handling and input validation"',
      bestPrompt: 'Add comprehensive error handling to this function:\n- Validate all inputs\n- Handle edge cases\n- Return meaningful error messages\n- Log errors appropriately\n\n[selected code]'
    },
    {
      id: 'chat',
      title: 'Chat About Code (Cmd/Ctrl+L)',
      what: 'Open a chat panel to ask questions about your codebase',
      how: 'Press Cmd/Ctrl+L, ask questions, reference files with @filename',
      when: 'Understanding code, debugging, getting explanations, or exploring codebase',
      example: 'Press Cmd+L, ask: "How does the authentication system work? @auth.ts"',
      bestPrompt: 'Explain how this authentication system works:\n1. What is the overall flow?\n2. What are the key components?\n3. How are tokens generated and validated?\n4. What security measures are in place?\n\n@auth.ts @token.ts'
    },
    {
      id: 'composer',
      title: 'Composer Mode (Cmd/Ctrl+I)',
      what: 'Generate entire files or large code blocks from scratch',
      how: 'Press Cmd/Ctrl+I, describe what you want to build, and Cursor generates it',
      when: 'Creating new files, building features from scratch, or generating boilerplate',
      example: 'Press Cmd+I, type: "Create a REST API endpoint for user registration with validation"',
      bestPrompt: 'Create a REST API endpoint for user registration:\n- Use Express.js\n- Validate email and password\n- Hash password with bcrypt\n- Return JWT token on success\n- Handle errors appropriately\n- Include TypeScript types\n- Add input validation middleware'
    },
    {
      id: 'codebase-context',
      title: 'Codebase Understanding',
      what: 'Cursor understands your entire codebase context',
      how: 'Use @filename to reference files, and Cursor uses project-wide context',
      when: 'Working with large codebases, understanding dependencies, or making cross-file changes',
      example: 'Ask: "Refactor this to use the pattern from @utils.ts"',
      bestPrompt: 'Refactor this component to follow the same pattern as @Component.tsx:\n- Use the same state management approach\n- Follow the same prop structure\n- Use the same styling pattern\n- Maintain consistency with the existing codebase\n\n[current code]'
    }
  ];

  const shortcuts = [
    { key: 'Cmd/Ctrl+K', action: 'Inline edit selected code', description: 'Edit code using natural language' },
    { key: 'Cmd/Ctrl+L', action: 'Open chat panel', description: 'Chat about your codebase' },
    { key: 'Cmd/Ctrl+I', action: 'Open composer', description: 'Generate new code from scratch' },
    { key: '@filename', action: 'Reference file in chat', description: 'Include file context in prompts' },
    { key: 'Tab', action: 'Accept AI suggestion', description: 'Accept inline code completions' },
    { key: 'Esc', action: 'Dismiss suggestion', description: 'Reject AI suggestions' }
  ];

  const bestPrompts = [
    {
      id: 'refactor',
      title: 'Refactoring Code',
      prompt: 'Refactor this code to:\n1. Improve readability (clear variable names, comments)\n2. Follow SOLID principles\n3. Add proper error handling\n4. Optimize performance\n5. Add type safety\n\nExplain each change and why it improves the code.\n\n[code]'
    },
    {
      id: 'debug',
      title: 'Debugging',
      prompt: 'I\'m getting this error: [error message]\n\nHere\'s the relevant code:\n[code]\n\nPlease:\n1. Identify the root cause\n2. Explain why it\'s happening\n3. Provide a fix\n4. Suggest how to prevent it in the future'
    },
    {
      id: 'test',
      title: 'Writing Tests',
      prompt: 'Write comprehensive unit tests for this function using Jest:\n- Test happy path\n- Test edge cases (null, empty, boundary values)\n- Test error scenarios\n- Mock external dependencies\n- Aim for 100% coverage\n\n[function code]'
    },
    {
      id: 'explain',
      title: 'Understanding Code',
      prompt: 'Explain this code in detail:\n1. What does it do?\n2. How does it work step by step?\n3. What are the key concepts used?\n4. Are there any potential issues?\n5. How could it be improved?\n\n[code]'
    },
    {
      id: 'optimize',
      title: 'Optimization',
      prompt: 'Optimize this code for:\n1. Performance (reduce time/space complexity)\n2. Memory usage\n3. Readability\n4. Maintainability\n\nProvide before/after comparison and explain improvements.\n\n[code]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MousePointerClick className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cursor AI Code Editor: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">How, What, When & Best Practices</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Cursor AI Code Editor: Complete Guide"
        description="How, What, When & Best Practices"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is Cursor and how is it different from VS Code?',
              answer: 'Cursor is a code editor based on VS Code but with AI built-in. It can edit entire files, chat about your codebase, understand project context, and generate code from scratch. VS Code requires extensions for AI features, while Cursor has AI integrated natively.',
            },
            {
              question: 'How do I use Cursor effectively?',
              answer: 'Use Cmd/Ctrl+K for inline edits, Cmd/Ctrl+L for chatting about code, and Cmd/Ctrl+I for generating new code. Reference files with @filename, provide clear context, and iterate on AI suggestions. Always review and understand generated code before using it.',
            },
            {
              question: 'What are the best Cursor prompts?',
              answer: 'Best prompts include: specific instructions with numbered steps, context about what you want to achieve, references to related files using @filename, requests for explanations, and clear output format requirements. Role-based prompts and step-by-step reasoning work well.',
            },
            {
              question: 'When should I use Cursor vs other AI tools?',
              answer: 'Use Cursor when: working with large codebases, refactoring multiple files, understanding unfamiliar code, making codebase-wide changes, or when you want AI integrated into your editor. It\'s best for code editing tasks rather than general questions.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Cursor</strong> is an AI-powered code editor that brings ChatGPT-like capabilities directly into 
              your coding environment. Understanding <strong>what</strong> it can do, <strong>how</strong> to use its 
              features effectively, and <strong>when</strong> it's most valuable can dramatically improve your 
              development workflow.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This guide covers Cursor's features, shortcuts, best practices, and proven prompt techniques for 
              maximum productivity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MousePointerClick className="w-6 h-6 text-indigo-600" />
              What is Cursor?
            </h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>Cursor</strong> is a code editor built on VS Code with AI capabilities integrated:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>AI-Powered Editing:</strong> Edit code using natural language commands</li>
                <li><strong>Codebase Chat:</strong> Ask questions about your entire codebase</li>
                <li><strong>Context Awareness:</strong> Understands your project structure and dependencies</li>
                <li><strong>File Generation:</strong> Create entire files from descriptions</li>
                <li><strong>VS Code Compatible:</strong> Works with VS Code extensions and settings</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">VS Code</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Code editor</li>
                  <li>Requires AI extensions</li>
                  <li>Limited AI context</li>
                  <li>Code completion only</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cursor</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>AI-powered editor</li>
                  <li>AI built-in natively</li>
                  <li>Full codebase context</li>
                  <li>Edit, chat, generate</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Key Features: How, What, When
            </h2>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">What:</h4>
                      <p className="text-sm text-gray-700">{feature.what}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">How:</h4>
                      <p className="text-sm text-gray-700">{feature.how}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded border border-purple-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">When:</h4>
                      <p className="text-sm text-gray-700">{feature.when}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Example:</h4>
                    <p className="text-sm text-gray-700 italic">{feature.example}</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">✨ Best Prompt:</h4>
                      <button
                        onClick={() => copyToClipboard(feature.bestPrompt, feature.id)}
                        className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                        title="Copy prompt"
                      >
                        {copiedPrompt === feature.id ? (
                          <CheckCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-white p-3 rounded border border-yellow-200 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                      {feature.bestPrompt}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-blue-600" />
              Essential Shortcuts
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                {shortcuts.map((shortcut, idx) => (
                  <div key={idx} className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono font-semibold text-gray-800">
                        {shortcut.key}
                      </kbd>
                      <span className="font-semibold text-gray-900">{shortcut.action}</span>
                    </div>
                    <p className="text-sm text-gray-600">{shortcut.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Prompt Templates for Cursor</h2>
            <div className="space-y-4">
              {bestPrompts.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{template.title}</h3>
                    <button
                      onClick={() => copyToClipboard(template.prompt, `template-${template.id}`)}
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Copy prompt"
                    >
                      {copiedPrompt === `template-${template.id}` ? (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {template.prompt}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Cursor</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Perfect For</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Refactoring large codebases</li>
                  <li>Understanding unfamiliar code</li>
                  <li>Writing new features</li>
                  <li>Debugging complex issues</li>
                  <li>Codebase-wide changes</li>
                  <li>Learning new frameworks</li>
                  <li>Generating boilerplate</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Use @filename to reference files</li>
                  <li>Provide context about your project</li>
                  <li>Ask for explanations, not just code</li>
                  <li>Iterate on AI suggestions</li>
                  <li>Review all generated code</li>
                  <li>Combine with manual coding</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Start Specific, Then Iterate</h3>
                <p className="text-gray-700 text-sm">
                  Begin with a clear, specific request. If the result isn't perfect, refine your prompt or ask for 
                  modifications. Cursor maintains context, so you can build on previous responses.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Use File References</h3>
                <p className="text-gray-700 text-sm">
                  Reference related files with @filename to give Cursor full context. This helps it understand 
                  patterns, dependencies, and maintain consistency with your codebase.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Ask for Explanations</h3>
                <p className="text-gray-700 text-sm">
                  Don't just accept code - ask Cursor to explain what it generated, why it works, and how to maintain it. 
                  This helps you learn and catch potential issues.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Review Before Committing</h3>
                <p className="text-gray-700 text-sm">
                  Always review Cursor-generated code for correctness, security, performance, and alignment with your 
                  standards. Test thoroughly before using in production.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <MousePointerClick className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate Cursor-Generated Code</h2>
                <p className="text-indigo-100">
                  When Cursor generates JSON, APIs, or data structures, use our tools to validate, format, and ensure 
                  correctness before using in production.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                JSON Validator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
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

