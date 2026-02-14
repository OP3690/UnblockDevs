'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, Sparkles, Zap, Lightbulb, CheckCircle, Copy, Target } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function AiPromptEngineeringGuideClient() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const techniques = [
    {
      id: 'role-based',
      title: 'Role-Based Prompting',
      what: 'Assign AI a specific role or persona',
      how: 'Start prompts with "You are a [role] with [expertise]"',
      when: 'When you need expert-level, context-aware responses',
      why: 'Helps AI understand context and provide appropriate responses',
      example: 'You are a senior React developer with 10 years of experience building scalable applications.',
      template: 'You are a [role] with [years] years of experience in [domain]. You specialize in [expertise].\n\n[Your question/task]',
      before: 'How do I optimize React performance?',
      after: 'You are a senior React performance engineer with expertise in optimization. How would you optimize this React component for maximum performance? [code]'
    },
    {
      id: 'step-by-step',
      title: 'Step-by-Step Reasoning',
      what: 'Ask AI to break down problems into steps',
      how: 'Request numbered steps or explicit reasoning process',
      when: 'For complex problems requiring logical thinking',
      why: 'Forces AI to think through problems systematically',
      example: 'Solve this step by step: 1) Analyze, 2) Plan, 3) Implement, 4) Verify',
      template: 'Solve this problem step by step:\n1. First, [analyze/understand]\n2. Then, [identify/plan]\n3. Next, [implement/solve]\n4. Finally, [verify/optimize]\n\n[Problem]',
      before: 'How do I fix this bug?',
      after: 'Fix this bug step by step:\n1. First, analyze the error message and identify the root cause\n2. Then, trace through the code to understand the flow\n3. Next, implement a fix\n4. Finally, verify the fix works and doesn\'t break anything\n\n[error and code]'
    },
    {
      id: 'few-shot',
      title: 'Few-Shot Learning',
      what: 'Provide examples to guide AI output format',
      how: 'Show 2-3 examples of desired output before your request',
      when: 'When you need specific format or style',
      why: 'AI learns from examples and replicates the pattern',
      example: 'Here are examples of good code comments: [examples]. Now write comments for: [code]',
      template: 'Here are examples of [what you want]:\n\nExample 1: [example]\nExample 2: [example]\n\nNow create [similar output] for: [your case]',
      before: 'Write documentation for this function',
      after: 'Here are examples of good function documentation:\n\nExample 1: "Calculates factorial using recursion. Handles edge cases."\nExample 2: "Validates email format using regex. Returns boolean."\n\nNow write similar documentation for: [function]'
    },
    {
      id: 'chain-of-thought',
      title: 'Chain of Thought',
      what: 'Ask AI to show its reasoning process',
      how: 'Request explicit explanation of thinking at each step',
      when: 'For complex problems or when you need to understand the process',
      why: 'Reveals AI\'s reasoning and helps catch errors',
      example: 'Think through this problem, showing your reasoning at each step',
      template: 'Think through this problem step by step, showing your reasoning:\n\n[Problem]\n\nExplain:\n- What you understand\n- What approach you\'ll take\n- Why you chose that approach\n- How you\'ll implement it',
      before: 'How do I design this API?',
      after: 'Design this REST API step by step, showing your reasoning:\n\n1. What you understand about the requirements\n2. What approach you\'ll take (REST principles)\n3. Why you chose that approach\n4. How you\'ll structure endpoints, request/response formats\n\n[requirements]'
    },
    {
      id: 'constraints',
      title: 'Constraints & Requirements',
      what: 'Specify limitations and requirements explicitly',
      how: 'List constraints, requirements, and preferences clearly',
      when: 'When output must meet specific criteria',
      why: 'Ensures AI considers all requirements',
      example: 'Requirements: Use TypeScript, follow SOLID principles, include error handling',
      template: 'Create [what] with these requirements:\n- [requirement 1]\n- [requirement 2]\n- [requirement 3]\n\nConstraints:\n- [constraint 1]\n- [constraint 2]\n\n[context]',
      before: 'Create a user authentication system',
      after: 'Create a user authentication system with these requirements:\n- Use JWT tokens\n- Include password hashing with bcrypt\n- Support email/password login\n- Return user data on success\n\nConstraints:\n- Must use TypeScript\n- Follow REST API conventions\n- Include input validation\n- Handle errors gracefully\n\n[tech stack]'
    },
    {
      id: 'output-format',
      title: 'Output Format Specification',
      what: 'Explicitly specify desired output format',
      how: 'Request specific format: markdown, JSON, code with comments, etc.',
      when: 'When you need structured or formatted output',
      why: 'Ensures output matches your needs exactly',
      example: 'Provide code with comments, include type definitions, and format as markdown',
      template: 'Provide [output] in this format:\n- [format requirement 1]\n- [format requirement 2]\n- [format requirement 3]\n\n[request]',
      before: 'Write a function to sort data',
      after: 'Write a Python function to sort data in this format:\n- Include type hints\n- Add docstring with examples\n- Include inline comments\n- Format code with proper indentation\n- Show usage example\n\n[requirements]'
    }
  ];

  const bestPractices = [
    {
      title: 'Be Specific and Detailed',
      bad: 'Write a function to sort data',
      good: 'Write a Python function that sorts a list of dictionaries by the "price" key in descending order. Handle edge cases like empty lists and missing keys. Include type hints, docstring, and error handling.',
      tip: 'More details = better results. Include types, edge cases, error handling, and examples.'
    },
    {
      title: 'Provide Context',
      bad: 'Fix this bug',
      good: 'I\'m getting "Cannot read property of undefined" error in my React component. I\'m using React 18, TypeScript, and this is a functional component. Here\'s the code: [code]. The error occurs when [scenario].',
      tip: 'Include: your experience level, what you\'ve tried, error messages, code snippets, constraints, and desired outcome.'
    },
    {
      title: 'Use Clear Structure',
      bad: 'Help me with authentication and also database queries and maybe some frontend stuff',
      good: 'I need help with three things:\n1. User authentication (JWT tokens)\n2. Database queries (PostgreSQL)\n3. Frontend integration (React)\n\nLet\'s start with #1: [details]',
      tip: 'Break complex requests into numbered points. Address one thing at a time or clearly separate multiple topics.'
    },
    {
      title: 'Ask for Explanations',
      bad: 'Write code to do X',
      good: 'Write code to do X. Also explain:\n- Why this approach\n- How it works\n- Alternative approaches\n- Trade-offs\n- Best practices',
      tip: 'Don\'t just ask for code - ask for understanding. Request explanations, alternatives, and best practices.'
    },
    {
      title: 'Iterate and Refine',
      bad: 'Expecting perfect result from one prompt',
      good: 'Start broad: "How do I implement user authentication?"\nThen refine: "Can you show me JWT implementation?"\nThen iterate: "Add refresh token support"',
      tip: 'Start with a broad question, then refine based on responses. Build on previous answers in the conversation.'
    }
  ];

  const promptTemplates = [
    {
      id: 'code-generation',
      title: 'Code Generation',
      template: 'You are a [role] expert. Create [what] with these requirements:\n\nRequirements:\n- [requirement 1]\n- [requirement 2]\n\nConstraints:\n- [constraint 1]\n- [constraint 2]\n\nPlease provide:\n1. Implementation with comments\n2. Explanation of approach\n3. Usage example\n4. Edge cases handled\n\n[context/code]'
    },
    {
      id: 'debugging',
      title: 'Debugging',
      template: 'You are a [role] debugging expert. I\'m getting this error:\n\n[error message]\n\nContext:\n- [context 1]\n- [context 2]\n\nCode:\n[code]\n\nPlease:\n1. Identify the root cause\n2. Explain why it\'s happening\n3. Provide a fix\n4. Suggest prevention strategies'
    },
    {
      id: 'refactoring',
      title: 'Refactoring',
      template: 'You are a [role] code reviewer. Refactor this code to:\n\nGoals:\n1. Improve [aspect 1]\n2. Enhance [aspect 2]\n3. Follow [principles]\n\nCurrent code:\n[code]\n\nProvide:\n- Refactored code\n- Explanation of changes\n- Before/after comparison\n- Benefits of refactoring'
    },
    {
      id: 'learning',
      title: 'Learning',
      template: 'I\'m a [current level] developer learning [topic]. Explain [concept] by:\n\n1. Comparing to what I know: [familiar concept]\n2. Showing practical examples\n3. Explaining when to use it\n4. Providing best practices\n5. Including common pitfalls\n\nMake it beginner-friendly and relate to [my background].'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Prompt Engineering Guide</h1>
              <p className="text-sm text-gray-500 mt-1">Best Prompts for Great Results: How, What, When & Why</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="AI Prompt Engineering Guide"
        description="Best Prompts for Great Results: How, What, When & Why"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is prompt engineering and why is it important?',
              answer: 'Prompt engineering is the practice of crafting effective prompts to get the best results from AI tools. It\'s important because well-written prompts produce more accurate, relevant, and useful responses. Good prompts can mean the difference between generic output and expert-level assistance.',
            },
            {
              question: 'What are the best prompt engineering techniques?',
              answer: 'Best techniques include: role-based prompting (assign AI a role), step-by-step reasoning (break down problems), few-shot learning (provide examples), chain-of-thought (show reasoning), constraints specification (list requirements), and output format specification (define structure).',
            },
            {
              question: 'How do I write effective AI prompts?',
              answer: 'Write effective prompts by: being specific and detailed, providing context (code, errors, constraints), using clear structure, asking for explanations, iterating and refining, specifying output format, and using proven techniques like role-based or step-by-step prompting.',
            },
            {
              question: 'What makes a good AI prompt?',
              answer: 'A good prompt is: specific (not vague), contextual (includes relevant information), structured (clear organization), goal-oriented (defines desired outcome), formatted (specifies output format), and iterative (allows refinement). It should provide enough context for AI to understand and respond appropriately.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Prompt engineering</strong> is the art and science of crafting effective prompts to get the best 
              results from AI tools like ChatGPT, Cursor, and Claude. Understanding <strong>how</strong> to structure 
              prompts, <strong>what</strong> techniques work best, <strong>when</strong> to use each technique, and 
              <strong>why</strong> they work can dramatically improve the quality of AI responses.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide covers proven prompt engineering techniques, best practices, templates, and 
              real-world examples to help you get great results from AI tools.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-600" />
              What is Prompt Engineering?
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>Prompt engineering</strong> is the practice of designing and optimizing prompts to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Get Better Results:</strong> More accurate, relevant, and useful responses</li>
                <li><strong>Control Output:</strong> Shape AI responses to match your needs</li>
                <li><strong>Improve Efficiency:</strong> Reduce iterations and get desired results faster</li>
                <li><strong>Enhance Understanding:</strong> Get explanations, not just answers</li>
                <li><strong>Maintain Consistency:</strong> Get reliable, predictable outputs</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The difference between a good prompt and a bad prompt can be the difference between getting generic, 
              unhelpful output and expert-level, actionable assistance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Essential Prompt Engineering Techniques
            </h2>
            <div className="space-y-6">
              {techniques.map((technique) => (
                <div key={technique.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{technique.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">What:</h4>
                      <p className="text-sm text-gray-700 mb-3">{technique.what}</p>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">How:</h4>
                      <p className="text-sm text-gray-700">{technique.how}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">When:</h4>
                      <p className="text-sm text-gray-700 mb-3">{technique.when}</p>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Why:</h4>
                      <p className="text-sm text-gray-700">{technique.why}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 p-4 rounded border border-red-200">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">❌ Before:</h4>
                      <p className="text-sm text-gray-700 italic">{technique.before}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">✅ After:</h4>
                      <p className="text-sm text-gray-700 italic">{technique.after}</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">📝 Template:</h4>
                      <button
                        onClick={() => copyToClipboard(technique.template, technique.id)}
                        className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                        title="Copy template"
                      >
                        {copiedPrompt === technique.id ? (
                          <CheckCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-white p-3 rounded border border-yellow-200 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                      {technique.template}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Best Practices: Before & After
            </h2>
            <div className="space-y-4">
              {bestPractices.map((practice, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{practice.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">❌ Bad:</h4>
                      <p className="text-sm text-gray-700 italic">{practice.bad}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2 text-sm">✅ Good:</h4>
                      <p className="text-sm text-gray-700 italic whitespace-pre-wrap">{practice.good}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> {practice.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-600" />
              Ready-to-Use Prompt Templates
            </h2>
            <div className="space-y-4">
              {promptTemplates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{template.title}</h3>
                    <button
                      onClick={() => copyToClipboard(template.template, `template-${template.id}`)}
                      className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                      title="Copy template"
                    >
                      {copiedPrompt === `template-${template.id}` ? (
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {template.template}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Vague Prompts:</strong> "Fix my code" without providing code, context, or error messages
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>No Context:</strong> Asking complex questions without background information or constraints
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Single Shot Expectation:</strong> Expecting perfect results from one prompt instead of iterating
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>No Format Specification:</strong> Not specifying desired output format, leading to inconsistent results
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="text-gray-700 text-sm">
                  <strong>Ignoring Responses:</strong> Not building on previous responses or asking follow-up questions
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Quick Reference: Prompt Checklist
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">✅ Include:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Specific role or expertise level</li>
                    <li>Clear context and background</li>
                    <li>Exact requirements and constraints</li>
                    <li>Desired output format</li>
                    <li>Examples or references</li>
                    <li>Step-by-step instructions</li>
                    <li>Request for explanations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">❌ Avoid:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Vague or ambiguous language</li>
                    <li>Missing context or code</li>
                    <li>Unclear requirements</li>
                    <li>No output format specification</li>
                    <li>Expecting perfection in one shot</li>
                    <li>Not iterating on responses</li>
                    <li>Ignoring AI suggestions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate AI-Generated Output</h2>
                <p className="text-amber-100">
                  When AI generates JSON, code, or data structures, use our tools to validate, format, and ensure 
                  correctness before using in production.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                JSON Validator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
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

