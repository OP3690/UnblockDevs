'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, MessageSquare, Zap, Lightbulb, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function ChatgptRealLifeUsageGuideClient() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const useCases = [
    {
      id: 'code-generation',
      title: 'Code Generation & Debugging',
      when: 'When writing boilerplate code, debugging errors, or learning new frameworks',
      how: 'Provide clear context, specify language/framework, include error messages, and ask for explanations',
      example: 'I\'m getting a "Cannot read property of undefined" error in my React component. Here\'s my code: [paste code]. Can you help me debug this and explain what\'s causing the error?',
      bestPrompt: 'You are an expert React developer. I have a React functional component that\'s throwing "Cannot read property of undefined" error. Here\'s the code:\n\n[code]\n\nPlease:\n1. Identify the exact cause of the error\n2. Explain why it\'s happening\n3. Provide a fixed version\n4. Suggest best practices to prevent this'
    },
    {
      id: 'documentation',
      title: 'Writing Documentation & Comments',
      when: 'When documenting code, writing README files, or creating technical documentation',
      how: 'Provide code/context, specify format (markdown, JSDoc), and ask for clear explanations',
      example: 'Write comprehensive documentation for this API endpoint: [code]. Include request/response examples, error cases, and usage instructions.',
      bestPrompt: 'You are a technical writer. Document this API endpoint following OpenAPI 3.0 format:\n\n[code]\n\nInclude:\n- Clear description of what it does\n- Request parameters with types and validation rules\n- Response schemas for success and error cases\n- Example requests and responses\n- Common use cases\n- Error handling guidelines'
    },
    {
      id: 'refactoring',
      title: 'Code Refactoring & Optimization',
      when: 'When improving code quality, performance, or maintainability',
      how: 'Share current code, specify goals (performance, readability, best practices), and ask for improvements with explanations',
      example: 'Refactor this function to be more efficient and follow best practices: [code]. Explain the improvements.',
      bestPrompt: 'You are a senior software engineer. Refactor this code to improve:\n1. Performance (reduce time complexity)\n2. Readability (clear variable names, comments)\n3. Maintainability (follow SOLID principles)\n4. Error handling\n\nCurrent code:\n[code]\n\nProvide:\n- Refactored code\n- Explanation of each improvement\n- Before/after comparison\n- Performance impact if applicable'
    },
    {
      id: 'learning',
      title: 'Learning New Technologies',
      when: 'When learning new programming languages, frameworks, or concepts',
      how: 'Specify your current knowledge level, what you want to learn, and ask for structured explanations with examples',
      example: 'I know JavaScript. Explain how async/await works in Python with practical examples.',
      bestPrompt: 'I\'m a JavaScript developer learning Python. Explain async/await in Python by:\n1. Comparing it to JavaScript promises/async-await\n2. Showing Python syntax with examples\n3. Explaining when to use it\n4. Providing common patterns and best practices\n5. Including error handling examples\n\nMake it practical and relate concepts to what I already know from JavaScript.'
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving & Algorithm Design',
      when: 'When stuck on a problem, need algorithm ideas, or want to understand solutions',
      how: 'Describe the problem clearly, show what you\'ve tried, and ask for multiple approaches with complexity analysis',
      example: 'I need to find the longest common subsequence between two strings. Explain different approaches and their time complexity.',
      bestPrompt: 'You are an algorithms expert. I need to solve: [problem description]\n\nConstraints: [constraints]\n\nI\'ve tried: [your attempts]\n\nPlease provide:\n1. Multiple solution approaches (brute force, optimized, optimal)\n2. Time and space complexity for each\n3. Step-by-step explanation of the best approach\n4. Code implementation with comments\n5. Edge cases to consider\n6. How to test the solution'
    },
    {
      id: 'testing',
      title: 'Writing Tests & Test Cases',
      when: 'When writing unit tests, integration tests, or test cases',
      how: 'Provide code to test, specify testing framework, and ask for comprehensive test coverage including edge cases',
      example: 'Write unit tests for this function using Jest. Include edge cases and error scenarios: [code]',
      bestPrompt: 'You are a QA engineer. Write comprehensive unit tests for this function using Jest:\n\n[code]\n\nInclude:\n- Happy path tests\n- Edge cases (empty inputs, null values, boundary conditions)\n- Error scenarios\n- Mock external dependencies\n- Test descriptions that explain what is being tested\n- Aim for 100% code coverage\n\nUse describe/it blocks and follow AAA pattern (Arrange, Act, Assert).'
    }
  ];

  const promptTemplates = [
    {
      id: 'role-based',
      title: 'Role-Based Prompting',
      description: 'Assign ChatGPT a specific role for better context-aware responses',
      template: 'You are a [role] with [years] years of experience in [domain]. [Specific expertise].\n\n[Your question/task]',
      example: 'You are a senior backend engineer with 10 years of experience building scalable microservices. You specialize in distributed systems and API design.\n\nI need to design a REST API for a task management system. What endpoints would you recommend and why?'
    },
    {
      id: 'step-by-step',
      title: 'Step-by-Step Reasoning',
      description: 'Ask ChatGPT to think through problems step by step',
      template: 'Solve this problem step by step:\n1. First, [analyze/understand]\n2. Then, [identify/plan]\n3. Next, [implement/solve]\n4. Finally, [verify/optimize]\n\n[Problem]',
      example: 'Solve this coding problem step by step:\n1. First, analyze the problem and identify the requirements\n2. Then, identify the data structures and algorithms needed\n3. Next, write the solution with comments\n4. Finally, verify edge cases and optimize if needed\n\nProblem: Find all pairs in an array that sum to a target value.'
    },
    {
      id: 'few-shot',
      title: 'Few-Shot Learning',
      description: 'Provide examples to guide ChatGPT\'s response format',
      template: 'Here are examples of [what you want]:\n\nExample 1: [example]\nExample 2: [example]\n\nNow create [similar output] for: [your case]',
      example: 'Here are examples of good function documentation:\n\nExample 1: "Calculates the factorial of a number using recursion"\nExample 2: "Validates email format using regex pattern"\n\nNow create similar documentation for: function calculateTotal(items)'
    },
    {
      id: 'chain-of-thought',
      title: 'Chain of Thought',
      description: 'Ask ChatGPT to show its reasoning process',
      template: 'Think through this problem step by step, showing your reasoning at each step:\n\n[Problem]\n\nExplain:\n- What you understand\n- What approach you\'ll take\n- Why you chose that approach\n- How you\'ll implement it',
      example: 'Think through this problem step by step, showing your reasoning:\n\nHow would you optimize a database query that\'s running slowly?\n\nExplain:\n- What information you need first\n- What approach you\'ll take to diagnose\n- Why you chose that approach\n- Specific optimization techniques you\'d apply'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ChatGPT Real-Life Usage Guide</h1>
              <p className="text-sm text-gray-500 mt-1">How, What, When & Best Prompts for Great Results</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="ChatGPT Real-Life Usage Guide"
        description="How, What, When & Best Prompts for Great Results"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is ChatGPT and how do I use it effectively?',
              answer: 'ChatGPT is an AI language model that can help with coding, writing, problem-solving, and more. To use it effectively: provide clear context, specify your role/expertise level, break complex tasks into steps, use role-based prompting, and iterate on responses. Good prompts include specific details, examples, and desired output format.',
            },
            {
              question: 'When should I use ChatGPT for coding?',
              answer: 'Use ChatGPT for: learning new technologies, debugging errors, generating boilerplate code, writing tests, refactoring code, understanding complex code, and getting code explanations. Don\'t rely on it for production code without review - always test and understand the code it generates.',
            },
            {
              question: 'What are the best ChatGPT prompts for developers?',
              answer: 'Best prompts include: role-based prompts ("You are a senior React developer"), step-by-step reasoning requests, few-shot examples, chain-of-thought prompts, and specific context (language, framework, error messages). Always provide code context, specify requirements clearly, and ask for explanations.',
            },
            {
              question: 'How do I get better results from ChatGPT?',
              answer: 'Get better results by: being specific and detailed, providing context and examples, using role-based prompting, asking for step-by-step explanations, iterating and refining prompts, specifying output format, and asking follow-up questions. Break complex tasks into smaller prompts and build on previous responses.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>ChatGPT</strong> has revolutionized how developers, writers, and professionals work. But getting 
              great results requires understanding <strong>how</strong> to prompt effectively, <strong>what</strong> to 
              use it for, <strong>when</strong> it's most valuable, and the <strong>best practices</strong> for prompt engineering.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide covers real-life ChatGPT usage with practical examples, proven prompt templates, 
              and techniques to maximize the quality of AI-generated responses.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
              What is ChatGPT?
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>ChatGPT</strong> is an AI language model developed by OpenAI that can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Understand Context:</strong> Maintains conversation context across multiple messages</li>
                <li><strong>Generate Code:</strong> Writes code in multiple programming languages</li>
                <li><strong>Explain Concepts:</strong> Breaks down complex topics into understandable explanations</li>
                <li><strong>Solve Problems:</strong> Helps debug, refactor, and optimize code</li>
                <li><strong>Create Content:</strong> Writes documentation, emails, articles, and more</li>
                <li><strong>Answer Questions:</strong> Provides information on a wide range of topics</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              When to Use ChatGPT
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Great For</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Learning new technologies</li>
                  <li>Debugging and error fixing</li>
                  <li>Writing boilerplate code</li>
                  <li>Code explanations</li>
                  <li>Refactoring suggestions</li>
                  <li>Writing tests</li>
                  <li>Documentation generation</li>
                  <li>Problem-solving approaches</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">❌ Not Ideal For</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Production code without review</li>
                  <li>Time-sensitive critical systems</li>
                  <li>Highly specific domain knowledge</li>
                  <li>Real-time data or current events</li>
                  <li>Security-sensitive code</li>
                  <li>Replacing human judgment</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              Real-Life Use Cases with Best Prompts
            </h2>
            <div className="space-y-6">
              {useCases.map((useCase) => (
                <div key={useCase.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">When:</h4>
                      <p className="text-sm text-gray-700">{useCase.when}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">How:</h4>
                      <p className="text-sm text-gray-700">{useCase.how}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Basic Example:</h4>
                    <p className="text-sm text-gray-700 italic mb-2">{useCase.example}</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">✨ Best Prompt Template:</h4>
                      <button
                        onClick={() => copyToClipboard(useCase.bestPrompt, useCase.id)}
                        className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                        title="Copy prompt"
                      >
                        {copiedPrompt === useCase.id ? (
                          <CheckCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-white p-3 rounded border border-yellow-200 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                      {useCase.bestPrompt}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-600" />
              Advanced Prompt Engineering Techniques
            </h2>
            <div className="space-y-4">
              {promptTemplates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(template.template, `template-${template.id}`)}
                      className="ml-4 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      title="Copy template"
                    >
                      {copiedPrompt === `template-${template.id}` ? (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Template:</h4>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{template.template}</pre>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Example:</h4>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{template.example}</pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Great Results</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Be Specific and Detailed</h3>
                <p className="text-gray-700 text-sm">
                  ❌ Bad: "Write a function to sort data"<br/>
                  ✅ Good: "Write a Python function that sorts a list of dictionaries by a specific key in descending order. Handle edge cases like empty lists and missing keys. Include type hints and docstring."
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Provide Context</h3>
                <p className="text-gray-700 text-sm">
                  Include relevant information: your experience level, what you've tried, constraints, error messages, 
                  code snippets, and desired outcome. More context = better responses.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Use Role-Based Prompting</h3>
                <p className="text-gray-700 text-sm">
                  Assign ChatGPT a role: "You are a senior React developer" or "You are a technical writer." This 
                  helps ChatGPT provide more appropriate, expert-level responses.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Ask for Explanations</h3>
                <p className="text-gray-700 text-sm">
                  Don't just ask for code - ask "why" and "how." Request explanations, best practices, alternatives, 
                  and trade-offs. This helps you learn and understand better.
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-gray-900 mb-2">5. Iterate and Refine</h3>
                <p className="text-gray-700 text-sm">
                  Start with a broad question, then refine based on the response. Ask follow-up questions, request 
                  modifications, and build on previous answers. Conversation context improves results.
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-semibold text-gray-900 mb-2">6. Specify Output Format</h3>
                <p className="text-gray-700 text-sm">
                  Tell ChatGPT how you want the output: "Provide code with comments," "Use markdown format," "Include 
                  examples," "Show before/after comparison." Clear format requirements = better results.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Vague Prompts:</strong> "Fix my code" without providing code or context
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>No Context:</strong> Asking complex questions without background information
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Single Shot:</strong> Expecting perfect results from one prompt instead of iterating
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>No Verification:</strong> Using generated code without testing or understanding it
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Over-Reliance:</strong> Using ChatGPT for everything instead of learning fundamentals
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate Your ChatGPT Output</h2>
                <p className="text-green-100">
                  When ChatGPT generates JSON, code, or data structures, use our tools to validate, format, 
                  and ensure correctness before using in production.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                JSON Validator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
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
