'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, BookOpen, Zap, Brain, Target, TrendingUp, Code, Database, GraduationCap, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function DomainSpecificLanguageModelsClient() {
  const faqData = [
    {
      question: 'What is a domain-specific language model?',
      answer: 'A domain-specific language model (DSLM) is a language model that has been specialized or fine-tuned for a specific domain, industry, or use case. Unlike general-purpose language models (like GPT-4), domain-specific models are trained or fine-tuned on domain-specific data to excel at tasks within that domain, such as medical diagnosis, legal document analysis, or financial analysis.'
    },
    {
      question: 'What are domain-specific language models?',
      answer: 'Domain-specific language models are AI models specialized for particular domains through fine-tuning, domain-specific training, or retrieval-augmented generation (RAG). They understand domain terminology, context, and nuances better than general models. Examples include: medical LLMs (for healthcare), legal LLMs (for law), financial LLMs (for finance), code models (for software), and scientific LLMs (for research).'
    },
    {
      question: 'When should I use domain-specific language models?',
      answer: 'Use domain-specific models when: you need high accuracy in a specific domain, general models lack domain knowledge, you have domain-specific data, accuracy is critical (healthcare, finance, legal), or you need to understand domain terminology and context. Ideal for: medical diagnosis, legal research, financial analysis, scientific research, and technical documentation.'
    },
    {
      question: 'How do domain-specific language models work?',
      answer: 'Domain-specific models work through: 1) Fine-tuning (train general model on domain data), 2) Domain-specific pre-training (train from scratch on domain data), 3) RAG (retrieve domain documents and augment prompts), 4) Prompt engineering (use domain-specific prompts and few-shot examples). The model learns domain terminology, patterns, and context through specialized training or data augmentation.'
    },
    {
      question: 'Why use domain-specific language models?',
      answer: 'Domain-specific models provide: higher accuracy in specialized domains, better understanding of domain terminology, reduced hallucinations in domain contexts, improved performance on domain tasks, cost efficiency (smaller models can outperform larger general models), and compliance with domain regulations. They excel where general models struggle with specialized knowledge.'
    },
    {
      question: 'What are examples of domain-specific language models?',
      answer: 'Examples include: BioGPT (biology/medicine), Legal-BERT (legal), FinBERT (finance), CodeBERT (software), SciBERT (scientific), ClinicalBERT (healthcare), PatentBERT (patents), and domain-specific versions of GPT, Claude, and Llama. Each is optimized for its specific domain through training or fine-tuning.'
    },
    {
      question: 'How do I create a domain-specific language model?',
      answer: 'Create domain-specific models by: 1) Collect domain-specific data, 2) Choose base model (GPT, Llama, etc.), 3) Fine-tune on domain data, 4) Evaluate on domain tasks, 5) Iterate and improve. Alternatively, use RAG with domain documents, or use domain-specific prompts with general models. Fine-tuning requires ML expertise and computational resources.'
    },
    {
      question: 'What is the difference between fine-tuning and RAG for domain-specific models?',
      answer: 'Fine-tuning modifies model weights by training on domain data, creating a specialized model. RAG retrieves domain documents and augments prompts without modifying the model. Fine-tuning provides deeper domain knowledge but requires training. RAG is easier to implement and update but may have retrieval limitations. Both approaches can be combined.'
    }
  ];

  const domainExamples = [
    { domain: 'Healthcare', model: 'ClinicalBERT, BioGPT', useCases: 'Medical diagnosis, drug discovery, patient records', accuracy: 'High' },
    { domain: 'Legal', model: 'Legal-BERT, CaseLaw-BERT', useCases: 'Legal research, contract analysis, case law', accuracy: 'High' },
    { domain: 'Finance', model: 'FinBERT, BloombergGPT', useCases: 'Financial analysis, risk assessment, trading', accuracy: 'High' },
    { domain: 'Software', model: 'CodeBERT, CodeT5, StarCoder', useCases: 'Code generation, code review, documentation', accuracy: 'High' },
    { domain: 'Scientific', model: 'SciBERT, Galactica', useCases: 'Research papers, scientific discovery, literature review', accuracy: 'High' },
    { domain: 'Education', model: 'Educational LLMs', useCases: 'Tutoring, curriculum design, assessment', accuracy: 'Medium-High' },
  ];

  const creationMethods = [
    { method: 'Fine-Tuning', description: 'Train general model on domain data', pros: 'Deep domain knowledge, high accuracy', cons: 'Requires training, computational cost', bestFor: 'High-accuracy requirements' },
    { method: 'RAG (Retrieval-Augmented Generation)', description: 'Retrieve domain documents and augment prompts', pros: 'Easy to implement, updatable, no training', cons: 'Retrieval limitations, may miss context', bestFor: 'Quick implementation, dynamic data' },
    { method: 'Domain Pre-Training', description: 'Train model from scratch on domain data', pros: 'Deep specialization, optimal performance', cons: 'Expensive, requires large datasets', bestFor: 'Large organizations, critical domains' },
    { method: 'Prompt Engineering', description: 'Use domain-specific prompts with general models', pros: 'No training, flexible, cost-effective', cons: 'Limited domain knowledge, may hallucinate', bestFor: 'Prototyping, low-accuracy needs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Developer Study Materials</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              February 4, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              30 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Domain-Specific Language Models: Complete Guide 2026
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover domain-specific language models: definition, what they are, when to use them, how they work, 
            and why they're essential for specialized AI. Learn about fine-tuning, RAG, domain adaptation, 
            and industry-specific AI models.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#definition" className="text-blue-600 hover:underline">Definition</a></li>
            <li><a href="#what-are-they" className="text-blue-600 hover:underline">What are Domain-Specific Language Models?</a></li>
            <li><a href="#when-to-use" className="text-blue-600 hover:underline">When to Use Domain-Specific Models</a></li>
            <li><a href="#how-they-work" className="text-blue-600 hover:underline">How Domain-Specific Models Work</a></li>
            <li><a href="#why-use" className="text-blue-600 hover:underline">Why Use Domain-Specific Models</a></li>
            <li><a href="#domains" className="text-blue-600 hover:underline">Domain Examples</a></li>
            <li><a href="#creation" className="text-blue-600 hover:underline">How to Create Domain-Specific Models</a></li>
            <li><a href="#best-practices" className="text-blue-600 hover:underline">Best Practices</a></li>
            <li><a href="#dos-donts" className="text-blue-600 hover:underline">Dos and Don'ts</a></li>
          </ul>
        </div>

        {/* Definition */}
        <section id="definition" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            Definition: What is a Domain-Specific Language Model?
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            A <strong>domain-specific language model (DSLM)</strong> is a language model that has been specialized 
            or fine-tuned for a specific domain, industry, or use case. Unlike general-purpose language models 
            (like GPT-4 or Claude), domain-specific models are trained, fine-tuned, or augmented with domain-specific 
            data to excel at tasks within that particular domain.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Characteristics</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Domain Expertise:</strong> Deep understanding of domain-specific terminology, concepts, and context</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Specialized Training:</strong> Trained or fine-tuned on domain-specific datasets</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Higher Accuracy:</strong> Better performance on domain tasks than general models</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Reduced Hallucinations:</strong> Less likely to generate incorrect domain information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Domain Context:</strong> Understands domain-specific relationships and patterns</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Mission: Specialized AI for Every Domain</h3>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Mission:</strong> Domain-specific language models aim to bring the power of AI to specialized 
              domains where general models fall short. By specializing models for specific industries and use cases, 
              we can achieve higher accuracy, better understanding, and more reliable results in critical applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Vision:</strong> The future of AI is specialization. Every industry will have domain-specific 
              models optimized for its unique needs. From healthcare to finance, legal to scientific research, 
              specialized models will enable AI applications that are accurate, reliable, and trustworthy.
            </p>
          </div>
        </section>

        {/* What are they */}
        <section id="what-are-they" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            What are Domain-Specific Language Models?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Domain-specific language models are AI models that have been specialized for particular domains through 
            various techniques. They understand domain terminology, context, and nuances better than general-purpose models.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                Domain Knowledge
              </h3>
              <p className="text-gray-700 mb-3">
                Deep understanding of domain-specific terminology, concepts, relationships, and context. Models 
                learn domain patterns through specialized training.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Domain terminology</li>
                <li>• Concept relationships</li>
                <li>• Context understanding</li>
                <li>• Pattern recognition</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Specialized Training
              </h3>
              <p className="text-gray-700 mb-3">
                Trained or fine-tuned on domain-specific datasets: medical literature, legal documents, financial 
                reports, scientific papers, or code repositories.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Domain datasets</li>
                <li>• Fine-tuning</li>
                <li>• Domain pre-training</li>
                <li>• RAG augmentation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Task Optimization
              </h3>
              <p className="text-gray-700 mb-3">
                Optimized for specific domain tasks: medical diagnosis, legal research, financial analysis, code 
                generation, or scientific discovery.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Task-specific optimization</li>
                <li>• Higher accuracy</li>
                <li>• Better performance</li>
                <li>• Reduced errors</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-600" />
                Data Integration
              </h3>
              <p className="text-gray-700 mb-3">
                Integrated with domain-specific data sources: knowledge bases, databases, documents, or APIs. 
                Models can access and reason about domain data.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Knowledge bases</li>
                <li>• Domain databases</li>
                <li>• Document repositories</li>
                <li>• API integration</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Types of Domain-Specific Models</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Fine-Tuned Models</h4>
              <p className="text-gray-700 text-sm mb-2">
                General models fine-tuned on domain data. Examples: GPT-3.5 fine-tuned for medical, Llama fine-tuned 
                for legal. Balance between general knowledge and domain expertise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Domain Pre-Trained Models</h4>
              <p className="text-gray-700 text-sm mb-2">
                Models trained from scratch on domain data. Examples: BioGPT, Legal-BERT, FinBERT. Deep domain 
                specialization but require large datasets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">3. RAG-Enhanced Models</h4>
              <p className="text-gray-700 text-sm mb-2">
                General models augmented with domain documents via RAG. Retrieve relevant domain documents and 
                augment prompts. Easier to implement and update.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">4. Hybrid Models</h4>
              <p className="text-gray-700 text-sm mb-2">
                Combine fine-tuning with RAG or other techniques. Best of both worlds: deep domain knowledge 
                plus access to latest information.
              </p>
            </div>
          </div>
        </section>

        {/* When to use */}
        <section id="when-to-use" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-8 h-8 text-orange-600" />
            When to Use Domain-Specific Language Models
          </h2>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Domain-Specific Models When:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>High Accuracy Required:</strong> Domain accuracy is critical (healthcare, finance, legal)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>General Models Lack Domain Knowledge:</strong> General models don't understand domain terminology or context</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Domain-Specific Data Available:</strong> You have access to domain datasets for training</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Regulatory Compliance:</strong> Domain requires compliance (HIPAA, financial regulations)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Specialized Tasks:</strong> Tasks require deep domain expertise</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Don't Use Domain-Specific Models When:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span><strong>General Tasks:</strong> Tasks don't require domain specialization</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span><strong>Limited Domain Data:</strong> Insufficient domain data for training or fine-tuning</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span><strong>Budget Constraints:</strong> Cannot afford training or fine-tuning costs</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span><strong>Rapid Prototyping:</strong> Need quick results without training overhead</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Use Case Examples</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">✅ Essential For:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Medical diagnosis and treatment</li>
                <li>• Legal research and analysis</li>
                <li>• Financial risk assessment</li>
                <li>• Scientific research</li>
                <li>• Technical documentation</li>
                <li>• Code generation and review</li>
                <li>• Patent analysis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Recommended For:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Customer support (domain-specific)</li>
                <li>• Content generation (industry-specific)</li>
                <li>• Data analysis (domain-specific)</li>
                <li>• Knowledge management</li>
                <li>• Training and education</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How they work */}
        <section id="how-they-work" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-600" />
            How Domain-Specific Language Models Work
          </h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Creation Methods</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fine-Tuning</h4>
                  <p className="text-gray-700 text-sm">Take a pre-trained general model (GPT, Llama) and continue training on domain-specific data. Model weights are adjusted to learn domain patterns while retaining general knowledge.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Domain Pre-Training</h4>
                  <p className="text-gray-700 text-sm">Train model from scratch on domain-specific data. Model learns domain patterns from the beginning. Requires large domain datasets and computational resources.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">RAG (Retrieval-Augmented Generation)</h4>
                  <p className="text-gray-700 text-sm">Use general model but retrieve relevant domain documents and augment prompts. Model accesses domain knowledge without training. Easier to implement and update.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Prompt Engineering</h4>
                  <p className="text-gray-700 text-sm">Use domain-specific prompts, few-shot examples, and context with general models. No training required but limited domain knowledge.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Method Comparison</h3>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pros</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cons</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {creationMethods.map((method, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{method.method}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{method.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{method.pros}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{method.cons}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{method.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why use */}
        <section id="why-use" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            Why Use Domain-Specific Language Models?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Higher Accuracy
              </h3>
              <p className="text-gray-700 mb-3">
                Domain-specific models achieve higher accuracy on domain tasks than general models. They understand 
                domain terminology, context, and relationships better.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Better domain understanding</li>
                <li>• Reduced errors</li>
                <li>• Higher precision</li>
                <li>• Task-specific optimization</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Reduced Hallucinations
              </h3>
              <p className="text-gray-700 mb-3">
                Less likely to generate incorrect or made-up domain information. Trained on domain data, models 
                have better grounding in domain facts.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Better factuality</li>
                <li>• Domain grounding</li>
                <li>• Reduced errors</li>
                <li>• More reliable outputs</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Cost Efficiency
              </h3>
              <p className="text-gray-700 mb-3">
                Smaller domain-specific models can outperform larger general models on domain tasks. More efficient 
                inference and lower costs.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Smaller models</li>
                <li>• Faster inference</li>
                <li>• Lower costs</li>
                <li>• Better efficiency</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Compliance & Trust
              </h3>
              <p className="text-gray-700 mb-3">
                Domain-specific models can be designed for compliance (HIPAA, financial regulations) and build 
                trust through domain expertise and accuracy.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Regulatory compliance</li>
                <li>• Domain expertise</li>
                <li>• User trust</li>
                <li>• Professional credibility</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Comparison</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-2">General Model (GPT-4):</p>
                <ul className="space-y-1">
                  <li>• Medical accuracy: ~70%</li>
                  <li>• Legal accuracy: ~65%</li>
                  <li>• Financial accuracy: ~68%</li>
                  <li>• Broad knowledge, limited depth</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Domain-Specific Model:</p>
                <ul className="space-y-1">
                  <li>• Medical accuracy: ~90%+</li>
                  <li>• Legal accuracy: ~88%+</li>
                  <li>• Financial accuracy: ~85%+</li>
                  <li>• Deep domain expertise</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Domains */}
        <section id="domains" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Domain Examples</h2>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Domain</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Example Models</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Use Cases</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {domainExamples.map((domain, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{domain.domain}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{domain.model}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{domain.useCases}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          {domain.accuracy}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Creation */}
        <section id="creation" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Create Domain-Specific Models</h2>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Process</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Collect Domain Data</h4>
                  <p className="text-gray-700 text-sm">Gather domain-specific datasets: documents, papers, code, or structured data. Quality and quantity matter for model performance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Choose Base Model</h4>
                  <p className="text-gray-700 text-sm">Select base model (GPT, Llama, BERT) based on your needs, budget, and computational resources. Consider model size and capabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Preprocess Data</h4>
                  <p className="text-gray-700 text-sm">Clean, format, and prepare domain data for training. Remove noise, standardize format, and create training/validation splits.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fine-Tune or Train</h4>
                  <p className="text-gray-700 text-sm">Fine-tune base model on domain data or train from scratch. Use appropriate hyperparameters, learning rates, and training strategies.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Evaluate & Iterate</h4>
                  <p className="text-gray-700 text-sm">Evaluate model on domain tasks, measure accuracy, and iterate. Compare with general models and baseline performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices</h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. High-Quality Domain Data</h3>
              <p className="text-gray-700 text-sm">
                Use high-quality, representative domain data. Data quality directly impacts model performance. 
                Ensure data is accurate, comprehensive, and representative of domain use cases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Appropriate Training Strategy</h3>
              <p className="text-gray-700 text-sm">
                Choose the right approach: fine-tuning for quick results, domain pre-training for deep specialization, 
                or RAG for flexibility. Match strategy to your needs and resources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Comprehensive Evaluation</h3>
              <p className="text-gray-700 text-sm">
                Evaluate on domain-specific tasks and metrics. Compare with general models and domain baselines. 
                Test on diverse domain scenarios to ensure robustness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Continuous Improvement</h3>
              <p className="text-gray-700 text-sm">
                Continuously update models with new domain data. Monitor performance, collect feedback, and 
                retrain or fine-tune as domain evolves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Balance General and Domain Knowledge</h3>
              <p className="text-gray-700 text-sm">
                Don't over-specialize. Maintain some general knowledge while specializing. Over-specialization 
                can reduce model flexibility and generalizability.
              </p>
            </div>
          </div>
        </section>

        {/* Dos and Don'ts */}
        <section id="dos-donts" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dos and Don'ts</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Dos
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do use high-quality domain data</strong> - Data quality directly impacts model performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do evaluate on domain tasks</strong> - Test on real domain scenarios, not just general benchmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do compare with general models</strong> - Ensure domain model outperforms general models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do consider RAG for flexibility</strong> - RAG is easier to implement and update than fine-tuning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do monitor for domain drift</strong> - Domain knowledge evolves; update models accordingly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do balance specialization</strong> - Maintain some general knowledge while specializing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Do document domain assumptions</strong> - Document what domain knowledge the model has</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                Don'ts
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't use low-quality data</strong> - Poor data leads to poor model performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't over-specialize</strong> - Over-specialization reduces flexibility and generalizability</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't skip evaluation</strong> - Always evaluate on domain tasks before deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't ignore general knowledge</strong> - Domain models should retain some general capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't forget to update</strong> - Domain knowledge evolves; models need updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't use for general tasks</strong> - Domain models may underperform on general tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Don't ignore costs</strong> - Training and fine-tuning can be expensive; consider ROI</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Schema */}
        <FAQSchema faqs={faqData} />
      </article>
    </div>
  );
}

