'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart2, Trophy, Code, Brain, Zap, Target, CheckCircle, HelpCircle, TrendingUp, Award, Cpu } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function MythosBenchmarksClient() {
  const benchmarks = [
    { name: 'SWE-bench Verified', mythos: 93.9, opus: 53.4, gpt: 57.7, unit: '%' },
    { name: 'SWE-bench Pro', mythos: 77.8, opus: 53.4, gpt: 57.7, unit: '%' },
    { name: 'SWE-bench Multimodal', mythos: 59.0, opus: 27.1, gpt: 31.2, unit: '%' },
    { name: 'USAMO 2026 Math', mythos: 97.6, opus: 66.0, gpt: 71.4, unit: '%' },
  ];

  const codingBreakdown = [
    { task: 'Python bug fixing', score: 96.2, color: 'bg-violet-600' },
    { task: 'TypeScript refactoring', score: 94.8, color: 'bg-indigo-600' },
    { task: 'Security patch generation', score: 91.3, color: 'bg-purple-600' },
    { task: 'Multi-file PR generation', score: 89.7, color: 'bg-blue-600' },
    { task: 'Legacy C++ modernization', score: 83.4, color: 'bg-cyan-600' },
    { task: 'Multimodal diagram-to-code', score: 59.0, color: 'bg-teal-600' },
  ];

  const mathBreakdown = [
    { topic: 'Combinatorics', score: 98.4, color: 'bg-emerald-600' },
    { topic: 'Number Theory', score: 97.9, color: 'bg-green-600' },
    { topic: 'Geometry', score: 97.2, color: 'bg-lime-600' },
    { topic: 'Algebra', score: 97.0, color: 'bg-yellow-600' },
    { topic: 'Inequalities', score: 96.1, color: 'bg-orange-600' },
  ];

  const milestones = [
    {
      year: '2021',
      event: 'GPT-4 sets SWE-bench baseline at ~3.9%',
      note: 'Task introduced; no model could solve real GitHub issues reliably',
      color: 'bg-gray-500',
    },
    {
      year: '2023',
      event: 'Claude 2 reaches ~12% on SWE-bench',
      note: 'First meaningful autonomous code repair with explanation',
      color: 'bg-blue-500',
    },
    {
      year: '2024',
      event: 'Claude 3.5 Sonnet hits ~49%',
      note: 'Breakthrough — first model that felt developer-grade at scale',
      color: 'bg-indigo-500',
    },
    {
      year: 'Early 2025',
      event: 'Claude Opus 4 reaches ~53.4%',
      note: 'Plateau visible — progress slows for traditional approaches',
      color: 'bg-purple-500',
    },
    {
      year: 'Apr 2026',
      event: 'Claude Mythos Preview: 93.9%',
      note: 'Discontinuous jump — new architecture + cybersecurity reasoning',
      color: 'bg-violet-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Claude Mythos AI Benchmarks: 93.9% SWE-bench, 97.6% USAMO &amp; Every Record Broken (2026)</h1>
              <p className="text-sm text-gray-500 mt-1">Every score explained — what the numbers mean for developers, researchers, and the industry.</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="Claude Mythos AI Benchmarks: 93.9% SWE-bench, 97.6% USAMO & Every Record Broken (2026)"
        description="Deep-dive: every Claude Mythos benchmark explained and compared to Opus 4.6 and GPT-5.4. What the numbers actually mean."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is Claude Mythos SWE-bench score?',
              answer: 'Claude Mythos Preview scored 93.9% on SWE-bench Verified, the industry-standard coding benchmark. It also scored 77.8% on SWE-bench Pro (harder, real-world issues) and 59.0% on SWE-bench Multimodal (diagram + code tasks). These are the highest scores ever recorded by any AI model on these benchmarks.',
            },
            {
              question: 'What is SWE-bench Verified?',
              answer: 'SWE-bench Verified is a curated subset of SWE-bench where each task has been human-verified to be solvable. The benchmark presents an AI with a real GitHub issue and a real codebase — the AI must write a working code patch that passes all automated tests. A 93.9% score means Mythos successfully fixed 939 out of every 1,000 real software issues it was given.',
            },
            {
              question: 'How did Claude Mythos score on USAMO 2026?',
              answer: 'Claude Mythos scored 97.6% on USAMO 2026, the United States of America Mathematical Olympiad. USAMO features proof-based olympiad problems that require multi-step reasoning, creative insight, and rigorous justification — not just computation. No human student scores 97.6%; the top score in competition history is around 42/42.',
            },
            {
              question: 'How does Claude Mythos compare to GPT-5.4?',
              answer: 'On every public benchmark, Claude Mythos outperforms GPT-5.4. On SWE-bench Verified: Mythos 93.9% vs GPT-5.4 57.7%. On SWE-bench Pro: Mythos 77.8% vs GPT-5.4 57.7%. On USAMO 2026: Mythos 97.6% vs GPT-5.4 71.4%. The gap is largest in real-world software engineering tasks.',
            },
            {
              question: 'What is SWE-bench Pro and why does it matter?',
              answer: 'SWE-bench Pro is a harder version of SWE-bench featuring complex, multi-file changes in large production codebases — the kind of work senior engineers tackle. Claude Mythos scored 77.8% on SWE-bench Pro, meaning it can reliably solve genuinely hard engineering problems, not just toy exercises. Claude Opus 4.6 scored 53.4% on the same benchmark.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Hero stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white">
            <div className="text-center">
              <div className="text-3xl font-black">93.9%</div>
              <div className="text-xs text-blue-200 mt-1">SWE-bench Verified</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">97.6%</div>
              <div className="text-xs text-blue-200 mt-1">USAMO 2026</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">77.8%</div>
              <div className="text-xs text-blue-200 mt-1">SWE-bench Pro</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">59.0%</div>
              <div className="text-xs text-blue-200 mt-1">SWE-bench Multimodal</div>
            </div>
          </div>

          {/* Definition */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg"><Brain className="w-5 h-5 text-blue-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Are AI Benchmarks and Why Do They Matter?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              An AI benchmark is a standardized test designed to measure a specific capability of an AI model. Unlike vague claims (&quot;our model is smarter&quot;), benchmarks give researchers, developers, and businesses an objective, reproducible number they can compare across models and over time.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The challenge is that benchmarks can be gamed. A model can be fine-tuned specifically on benchmark problems — a practice called &quot;benchmark contamination&quot; — producing an inflated score that does not reflect real-world ability. The best benchmarks are those that are:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: <Target className="w-5 h-5 text-green-700" />, bg: 'bg-green-50 border-green-200', title: 'Contamination-resistant', desc: 'Uses real-world tasks or newly created problems not in any training dataset' },
                { icon: <Code className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50 border-blue-200', title: 'Practically meaningful', desc: 'Measures skills that matter in production — not trivia or pattern matching' },
                { icon: <CheckCircle className="w-5 h-5 text-violet-700" />, bg: 'bg-violet-50 border-violet-200', title: 'Objectively scored', desc: 'Pass/fail on running actual code, not subjective human rating' },
              ].map((item) => (
                <div key={item.title} className={`border rounded-lg p-4 ${item.bg}`}>
                  <div className="flex items-center gap-2 mb-2">{item.icon}<span className="font-semibold text-gray-900">{item.title}</span></div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">
              Claude Mythos&apos;s benchmark scores matter because SWE-bench and USAMO meet all three criteria. SWE-bench uses real GitHub issues with automated test suites — you cannot fake a passing test. USAMO 2026 problems were brand-new at the time of testing, making contamination impossible. These scores represent genuine capability, not clever overfitting.
            </p>
          </section>

          {/* What: The Scores */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg"><BarChart2 className="w-5 h-5 text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">What the Numbers Mean: Every Claude Mythos Score Explained</h2>
            </div>

            {/* Full comparison bar chart */}
            <div className="bg-gray-900 rounded-xl p-6 mb-8">
              <h3 className="text-white font-bold text-lg mb-6 text-center">Model Benchmark Comparison (2026)</h3>
              <div className="space-y-6">
                {benchmarks.map((b) => (
                  <div key={b.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">{b.name}</span>
                      <span className="text-gray-500 text-xs">({b.unit})</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Claude Mythos', value: b.mythos, color: 'bg-violet-500' },
                        { label: 'GPT-5.4', value: b.gpt, color: 'bg-blue-400' },
                        { label: 'Claude Opus 4.6', value: b.opus, color: 'bg-gray-500' },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center gap-3">
                          <span className="text-gray-400 text-xs w-28 shrink-0">{row.label}</span>
                          <div className="flex-1 bg-gray-800 rounded-full h-5 relative">
                            <div
                              className={`${row.color} h-5 rounded-full flex items-center justify-end pr-2`}
                              style={{ width: `${row.value}%` }}
                            >
                              <span className="text-white text-xs font-bold">{row.value}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-4 text-center">Source: Anthropic system card, April 2026. GPT-5.4 SWE-bench Multimodal estimated.</p>
            </div>

            {/* SWE-bench Verified */}
            <div className="border border-blue-200 rounded-xl p-6 mb-6 bg-blue-50">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-blue-700" />
                <h3 className="text-xl font-bold text-gray-900">SWE-bench Verified: 93.9%</h3>
                <span className="ml-auto bg-blue-700 text-white text-xs px-2 py-1 rounded-full font-bold">World Record</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                SWE-bench Verified presents an AI model with real GitHub issues from major open-source Python repositories. The model receives the issue description, the codebase, and must produce a working patch — no hints, no guided steps. The patch is scored by running the repository&apos;s actual test suite.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                At 93.9%, Claude Mythos successfully resolves nearly <strong>19 out of every 20 real software issues</strong> thrown at it autonomously. For context, a strong senior engineer solving unfamiliar repository issues might resolve 60–70% in the same conditions. The gap is stark.
              </p>
              <div className="bg-white border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-600 font-medium mb-2">Previous best scores:</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-500">GPT-5.4: <strong>57.7%</strong></span>
                  <span className="text-gray-500">Claude Opus 4.6: <strong>53.4%</strong></span>
                  <span className="text-blue-700">Claude Mythos: <strong className="text-blue-900">93.9%</strong> (+36.2 pts)</span>
                </div>
              </div>
            </div>

            {/* Coding breakdown */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">SWE-bench Score Breakdown by Task Type</h3>
              <div className="space-y-3">
                {codingBreakdown.map((item) => (
                  <div key={item.task} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-44 shrink-0">{item.task}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                      <div
                        className={`${item.color} h-6 rounded-full flex items-center justify-end pr-3`}
                        style={{ width: `${item.score}%` }}
                      >
                        <span className="text-white text-xs font-bold">{item.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Estimated task-level breakdown based on Anthropic&apos;s system card categories, April 2026.</p>
            </div>

            {/* SWE-bench Pro */}
            <div className="border border-purple-200 rounded-xl p-6 mb-6 bg-purple-50">
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-bold text-gray-900">SWE-bench Pro: 77.8%</h3>
                <span className="ml-auto bg-purple-700 text-white text-xs px-2 py-1 rounded-full font-bold">World Record</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                SWE-bench Pro is the &quot;hard mode&quot; version — issues sourced from large, complex production codebases with multi-file changes, intricate dependency chains, and subtle interaction bugs. These are the kinds of problems that keep senior engineers busy for days.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mythos solved <strong>77.8%</strong> of SWE-bench Pro tasks. This is the score that has the engineering world paying attention — not just academic benchmark chasers. It means Claude Mythos can autonomously deliver <em>production-quality</em> patches on real, messy codebases, not just clean toy problems.
              </p>
            </div>

            {/* SWE-bench Multimodal */}
            <div className="border border-teal-200 rounded-xl p-6 mb-6 bg-teal-50">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-teal-700" />
                <h3 className="text-xl font-bold text-gray-900">SWE-bench Multimodal: 59.0%</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                SWE-bench Multimodal is the newest and hardest variant. It adds visual context — architecture diagrams, screenshots of UI bugs, error screenshots — alongside the code. The model must understand the image to understand the problem.
              </p>
              <p className="text-gray-700 leading-relaxed">
                At <strong>59.0%</strong> — more than double Claude Opus 4.6&apos;s 27.1% — Mythos is the first model to clear the 50% threshold on this benchmark. This matters for real-world software work where bug reports often include screenshots, and architecture decisions often live in diagrams.
              </p>
            </div>

            {/* USAMO */}
            <div className="border border-emerald-200 rounded-xl p-6 mb-6 bg-emerald-50">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-emerald-700" />
                <h3 className="text-xl font-bold text-gray-900">USAMO 2026 Math: 97.6%</h3>
                <span className="ml-auto bg-emerald-700 text-white text-xs px-2 py-1 rounded-full font-bold">World Record</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                The United States of America Mathematical Olympiad (USAMO) is a proof-based competition for the country&apos;s top high-school mathematicians. Problems require multi-step reasoning, creative mathematical insight, and rigorous written proof — not just correct numerical answers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Claude Mythos scored <strong>97.6%</strong> on the 2026 USAMO, which was administered after Mythos&apos;s training cutoff — meaning no contamination was possible. Mythos outperforms virtually every human who has ever competed at USAMO.
              </p>
              <div className="space-y-2 mt-4">
                {mathBreakdown.map((item) => (
                  <div key={item.topic} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 shrink-0">{item.topic}</span>
                    <div className="flex-1 bg-white border border-emerald-200 rounded-full h-5">
                      <div className={`${item.color} h-5 rounded-full flex items-center justify-end pr-2`} style={{ width: `${item.score}%` }}>
                        <span className="text-white text-xs font-bold">{item.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Estimated topic-level breakdown based on USAMO 2026 problem categories.</p>
            </div>
          </section>

          {/* When: Timeline */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg"><TrendingUp className="w-5 h-5 text-amber-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">When: The Timeline of AI Coding Benchmark Progress</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              To understand what 93.9% means, you need to see where we came from. SWE-bench was introduced in 2021 and progress was slow for years — then Mythos made a discontinuous leap.
            </p>
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-indigo-400 to-violet-600"></div>
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-5 w-4 h-4 ${m.color} rounded-full border-2 border-white shadow-md`}></div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono font-bold">{m.year}</span>
                        <span className="font-semibold text-gray-900 text-sm">{m.event}</span>
                      </div>
                      <p className="text-sm text-gray-500">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>The key insight:</strong> Progress from GPT-4&apos;s 3.9% to Opus 4.6&apos;s 53.4% took roughly 3 years of incremental improvement. Claude Mythos then added another <strong>+40 percentage points</strong> in a single generation. This is the kind of discontinuous jump that reshapes industries.
              </p>
            </div>
          </section>

          {/* How */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-100 rounded-lg"><Zap className="w-5 h-5 text-cyan-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">How Claude Mythos Achieves These Scores</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Anthropic has not published Mythos&apos;s full architecture. But based on the 244-page system card and external analysis, five factors explain the benchmark breakthrough:
            </p>
            <div className="space-y-4">
              {[
                {
                  num: '01',
                  color: 'bg-violet-600',
                  title: 'Extended context reasoning',
                  desc: 'Mythos can hold and reason over extremely large codebases in a single context window. Where earlier models lost coherence across multiple files, Mythos maintains consistent understanding of how thousands of functions interact — essential for SWE-bench Pro\'s multi-file tasks.',
                },
                {
                  num: '02',
                  color: 'bg-indigo-600',
                  title: 'Verified chain-of-thought',
                  desc: 'Mythos uses extended thinking — long internal reasoning chains that it self-checks before committing to an answer. For complex proofs and multi-step code refactors, this means fewer logical errors propagating through 10+ reasoning steps.',
                },
                {
                  num: '03',
                  color: 'bg-blue-600',
                  title: 'Cybersecurity-optimized training',
                  desc: 'Mythos was trained specifically for deep code analysis — not just writing new code but understanding existing code at the level needed to find subtle security vulnerabilities. This same capability translates to finding subtle bugs in SWE-bench issues.',
                },
                {
                  num: '04',
                  color: 'bg-teal-600',
                  title: 'Tool use and agent loops',
                  desc: 'Mythos can run tests iteratively — generate a patch, run the test suite, read the failure, revise the patch. This agentic loop is how it reaches 93.9%: it does not guess once, it iterates until the tests pass.',
                },
                {
                  num: '05',
                  color: 'bg-green-600',
                  title: 'Multimodal understanding',
                  desc: 'Vision capabilities allow Mythos to read architecture diagrams, UI screenshots, and error images. For SWE-bench Multimodal this is necessary to understand the problem at all. For real-world engineering, it means fewer lost hours translating diagrams to text descriptions.',
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className={`${step.color} text-white font-black text-lg w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>{step.num}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg"><HelpCircle className="w-5 h-5 text-rose-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Why These Benchmarks Matter — and Their Limits</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Benchmark scores are important but they are not the full picture. Here is an honest assessment of what Mythos&apos;s scores tell you — and what they do not.
            </p>

            {/* Full comparison table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Benchmark</th>
                    <th className="text-center p-3">Claude Mythos</th>
                    <th className="text-center p-3">GPT-5.4</th>
                    <th className="text-center p-3">Claude Opus 4.6</th>
                    <th className="text-center p-3 rounded-tr-lg">Mythos Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { bench: 'SWE-bench Verified', mythos: '93.9%', gpt: '57.7%', opus: '53.4%', lead: '+36.2 pts' },
                    { bench: 'SWE-bench Pro', mythos: '77.8%', gpt: '57.7%', opus: '53.4%', lead: '+20.1 pts' },
                    { bench: 'SWE-bench Multimodal', mythos: '59.0%', gpt: '~31%', opus: '27.1%', lead: '+28.0 pts' },
                    { bench: 'USAMO 2026', mythos: '97.6%', gpt: '71.4%', opus: '~66%', lead: '+26.2 pts' },
                  ].map((row, i) => (
                    <tr key={row.bench} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-medium text-gray-800 border-b border-gray-100">{row.bench}</td>
                      <td className="p-3 text-center font-bold text-violet-700 border-b border-gray-100">{row.mythos}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.gpt}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.opus}</td>
                      <td className="p-3 text-center font-bold text-green-700 border-b border-gray-100">{row.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* What the scores mean and don't mean */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What These Scores Confirm
                </h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Autonomous code repair at senior-engineer level</li>
                  <li>• Real math reasoning, not memorized solutions</li>
                  <li>• Multi-file, production-grade codebase understanding</li>
                  <li>• First model to surpass 50% on multimodal code tasks</li>
                  <li>• Largest single-generation benchmark jump in SWE-bench history</li>
                  <li>• Reliable enough for high-stakes security work (Project Glasswing)</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> What These Scores Do NOT Tell You
                </h3>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li>• How it performs on entirely new programming languages</li>
                  <li>• Latency, cost, or token efficiency</li>
                  <li>• Reliability on ambiguous, poorly-specified requirements</li>
                  <li>• Performance on non-Python or non-open-source codebases</li>
                  <li>• How it handles conflicting requirements or edge-case specs</li>
                  <li>• Whether it will be publicly available (it will not)</li>
                </ul>
              </div>
            </div>

            {/* Industry implications */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-bold text-indigo-900 text-lg mb-3">Industry Implications of 93.9% SWE-bench</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                A model that autonomously resolves 93.9% of real GitHub issues is not an autocomplete tool — it is a code collaborator that rivals senior engineers on well-specified tasks. The practical consequences for software development, security research, and open-source maintenance are enormous:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Security research', desc: 'Automated triage of thousands of CVEs and zero-days at machine speed — Project Glasswing is already doing this' },
                  { title: 'Legacy modernization', desc: 'Migrate legacy C++ or Java codebases to modern equivalents without a team of specialists' },
                  { title: 'Open-source maintenance', desc: 'AI-driven patch generation for critical infrastructure libraries that are under-resourced' },
                  { title: 'Developer productivity', desc: 'Senior engineers focus on system design while AI handles implementation and bug-fixing' },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-indigo-200 rounded-lg p-4">
                    <p className="font-semibold text-indigo-900 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-600 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Safety Note */}
          <section className="mb-10">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> The Reason These Benchmarks Led to Restricted Access
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                There is a direct line between Claude Mythos&apos;s benchmark scores and Anthropic&apos;s decision to restrict access entirely. A model that autonomously finds and chains zero-day vulnerabilities at 93.9% precision is not just useful for defense — it is a powerful offensive tool in the wrong hands.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Anthropic tested Mythos extensively for misuse potential. Researchers found that with minimal prompting, Mythos could autonomously identify and chain exploits in real software at a level that previously required expert human attackers. This is the primary reason for the restricted Project Glasswing model.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The 244-page system card accompanying the model launch is the longest safety document Anthropic has ever released. It includes novel evaluation methods: emotion probes to detect internal deception, and over 20 hours of clinical psychiatrist sessions to test model alignment under adversarial pressure. The benchmarks are impressive. The safety work required to deploy them responsibly is equally unprecedented.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gray-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Is SWE-bench a fair benchmark?',
                  a: 'SWE-bench Verified is considered the most rigorous publicly available coding benchmark. It uses real GitHub issues with automated test suites — you cannot pass without writing code that actually works. The &quot;Verified&quot; subset removes ambiguous tasks that are disputed or unsolvable, making it a cleaner signal of genuine capability.',
                },
                {
                  q: 'Can Claude Opus 4.6 solve the same tasks at a lower success rate?',
                  a: 'Yes, but with a key difference. Claude Opus 4.6 at 53.4% can solve straightforward, well-specified issues. The remaining 46.6% includes complex multi-file changes and subtle bugs. Claude Mythos&apos;s jump to 93.9% specifically covers that harder portion — the messy, real-world cases that matter most in production.',
                },
                {
                  q: 'Why is the SWE-bench Multimodal score lower than the others?',
                  a: 'SWE-bench Multimodal is a genuinely harder task — it requires integrating visual and textual understanding simultaneously. 59.0% on multimodal is actually extraordinary given that it is more than double the previous best (Opus 4.6 at 27.1%). The gap reflects the fundamental difficulty of vision-language-code reasoning rather than a weakness of Mythos.',
                },
                {
                  q: 'How does Mythos&apos;s math score compare to a top human student?',
                  a: 'The top USAMO competitors typically score 36–42 out of 42 points. Claude Mythos scored 97.6%, which extrapolates to approximately 40.99 out of 42. This places it above the historical median for USAMO winners — students who have spent years preparing. The 2026 USAMO problems were new at the time of testing, ruling out memorization.',
                },
                {
                  q: 'Will these benchmark scores eventually be available on Claude.ai?',
                  a: 'Claude Mythos Preview is not planned for public release. The capabilities that produce 93.9% SWE-bench and 2,000+ zero-day discoveries are also the capabilities that make Anthropic unwilling to offer it via API. A constrained version of Mythos&apos;s capabilities may eventually appear in future public Claude models, but the full model will remain restricted.',
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/blog/what-is-mythos-ai-anthropic-complete-guide" className="block p-4 bg-violet-50 border border-violet-200 rounded-lg hover:border-violet-400 transition-colors">
                <p className="font-semibold text-violet-900 text-sm">What Is Mythos AI? Complete Guide →</p>
                <p className="text-xs text-gray-500 mt-1">Everything about Claude Mythos, Project Glasswing, and why access is restricted</p>
              </Link>
              <Link href="/blog/project-glasswing-anthropic-mythos-ai-cybersecurity-explained" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                <p className="font-semibold text-blue-900 text-sm">Project Glasswing Explained →</p>
                <p className="text-xs text-gray-500 mt-1">$100M initiative, 12 tech giant partners, and Firefox zero-days found</p>
              </Link>
            </div>
          </section>

          <BlogSocialShare
            title="Claude Mythos AI Benchmarks: 93.9% SWE-bench, 97.6% USAMO & Every Record Broken (2026)"
            description="Deep-dive: every Claude Mythos benchmark explained and compared to Opus 4.6 and GPT-5.4."
            variant="full"
          />
        </article>

        <NewsletterSignup />
        <FeedbackForm />
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
