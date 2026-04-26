'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Globe, Users, DollarSign, AlertTriangle, CheckCircle, HelpCircle, Zap, Eye, Server, Code } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ProjectGlasswingClient() {
  const partners = [
    { name: 'Amazon Web Services', category: 'Cloud', icon: '☁️' },
    { name: 'Apple', category: 'Consumer Tech', icon: '🍎' },
    { name: 'Broadcom', category: 'Semiconductor', icon: '🔌' },
    { name: 'Cisco', category: 'Networking', icon: '🌐' },
    { name: 'CrowdStrike', category: 'Cybersecurity', icon: '🦅' },
    { name: 'Google', category: 'Cloud / Software', icon: '🔍' },
    { name: 'JPMorganChase', category: 'Finance', icon: '🏦' },
    { name: 'Linux Foundation', category: 'Open Source', icon: '🐧' },
    { name: 'Microsoft', category: 'Cloud / Software', icon: '🪟' },
    { name: 'NVIDIA', category: 'Hardware / AI', icon: '🖥️' },
    { name: 'Palo Alto Networks', category: 'Cybersecurity', icon: '🛡️' },
    { name: '40+ more', category: 'Screened partners', icon: '➕' },
  ];

  const fundingBreakdown = [
    { label: 'Model usage credits to partners', amount: '$100M', color: 'bg-violet-600', pct: 96 },
    { label: 'Alpha-Omega / OpenSSF', amount: '$2.5M', color: 'bg-indigo-500', pct: 2.4 },
    { label: 'Apache Software Foundation', amount: '$1.5M', color: 'bg-blue-500', pct: 1.6 },
  ];

  const vulnerabilityTypes = [
    { type: 'Memory corruption (UAF, buffer overflow)', count: '~600+', severity: 'Critical', color: 'text-red-700 bg-red-50 border-red-200' },
    { type: 'Privilege escalation', count: '~350+', severity: 'Critical', color: 'text-red-700 bg-red-50 border-red-200' },
    { type: 'Logic errors & race conditions', count: '~400+', severity: 'High', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { type: 'Cryptographic weaknesses', count: '~250+', severity: 'High', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { type: 'Configuration / supply chain', count: '~400+', severity: 'Medium', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  ];

  const howItWorks = [
    {
      num: '01',
      color: 'bg-violet-600',
      icon: <Code className="w-5 h-5" />,
      title: 'Codebase ingestion',
      desc: 'Partner provides their critical codebase to Mythos via a secure, air-gapped environment. Mythos reads the entire source tree — millions of lines across hundreds of files — building a full semantic model of the software.',
    },
    {
      num: '02',
      color: 'bg-indigo-600',
      icon: <Eye className="w-5 h-5" />,
      title: 'Autonomous vulnerability hunting',
      desc: 'Mythos systematically analyzes code paths, data flows, and API boundaries. It reasons about how an attacker could chain inputs, trigger edge cases, or exploit trust assumptions — the same reasoning an elite penetration tester applies, but at machine speed across the entire codebase simultaneously.',
    },
    {
      num: '03',
      color: 'bg-blue-600',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Proof-of-concept generation',
      desc: 'For each vulnerability found, Mythos generates a minimal proof-of-concept (PoC) — code that demonstrates the exploit in a controlled environment. This turns theoretical findings into confirmed, reproducible issues that developers can immediately verify.',
    },
    {
      num: '04',
      color: 'bg-teal-600',
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Patch generation and validation',
      desc: 'Mythos does not just find the problem — it proposes a secure fix. Each patch is checked against the original test suite and reasoning about security implications. Partners receive a findings report with both the vulnerability details and a recommended remediation.',
    },
    {
      num: '05',
      color: 'bg-green-600',
      icon: <Shield className="w-5 h-5" />,
      title: 'Responsible disclosure',
      desc: 'Findings that affect open-source projects are disclosed to maintainers through coordinated vulnerability disclosure (CVD) processes. The Firefox zero-days discovered in the first 7 weeks were reported directly to Mozilla through this pipeline before any public announcement.',
    },
  ];

  const timeline = [
    { date: 'Apr 7, 2026', event: 'Anthropic announces Claude Mythos Preview and Project Glasswing simultaneously', icon: '🚀' },
    { date: 'Apr 7, 2026', event: '$100M usage credits committed; $4M direct donations announced ($2.5M OpenSSF, $1.5M Apache)', icon: '💰' },
    { date: 'Apr 7–28, 2026', event: 'First 7 weeks: 2,000+ zero-day vulnerabilities found across partner codebases', icon: '🔍' },
    { date: 'Apr 2026', event: 'Firefox zero-day vulnerabilities found and responsibly disclosed to Mozilla', icon: '🦊' },
    { date: 'Apr 2026', event: 'UK government enters discussions for access to Mythos via Project Glasswing', icon: '🇬🇧' },
    { date: 'Apr 2026', event: 'Google Cloud Vertex AI begins hosting Mythos in private preview for Glasswing partners', icon: '☁️' },
    { date: 'Ongoing', event: 'Mythos continues scanning partner infrastructure; most findings embargoed pending patches', icon: '🔒' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-slate-700 to-blue-800 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Glasswing Explained: How Anthropic Is Using Mythos AI to Secure Critical Infrastructure (2026)</h1>
              <p className="text-sm text-gray-500 mt-1">$100M. 12 tech giants. 2,000+ zero-days in 7 weeks. What is Project Glasswing and why does it matter?</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare
        title="Project Glasswing Explained: How Anthropic Is Using Mythos AI to Secure Critical Infrastructure (2026)"
        description="$100M initiative, 12 tech giant partners, Firefox zero-days found. Complete guide to Project Glasswing and Claude Mythos cybersecurity."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'What is Project Glasswing?',
              answer: 'Project Glasswing is Anthropic\'s initiative to use Claude Mythos AI to find and fix zero-day vulnerabilities in critical software infrastructure. Anthropic is committing $100M in model usage credits and $4M in direct donations to open-source security organizations. Access to Claude Mythos is provided exclusively to screened partner organizations including Amazon, Apple, Cisco, Google, Microsoft, and NVIDIA.',
            },
            {
              question: 'Who are the Project Glasswing partners?',
              answer: 'Named Project Glasswing partners include Amazon Web Services, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks. More than 40 additional organizations have been screened and accepted as partners. The UK government is also in discussions for access.',
            },
            {
              question: 'What vulnerabilities has Project Glasswing found?',
              answer: 'In the first 7 weeks of Project Glasswing, Claude Mythos found over 2,000 previously unknown (zero-day) vulnerabilities. This includes real vulnerabilities in Firefox, which were responsibly disclosed to Mozilla. Over 99% of findings have not yet been made public because the affected software has not yet been patched.',
            },
            {
              question: 'What is the $100M commitment in Project Glasswing?',
              answer: 'Anthropic is committing $100M in Claude Mythos model usage credits to Project Glasswing partners — essentially free access to run Mythos at scale for security research. Additionally, Anthropic is making $4M in direct cash donations: $2.5M to Alpha-Omega (part of OpenSSF, which secures open-source software) and $1.5M to the Apache Software Foundation.',
            },
            {
              question: 'How does Claude Mythos find zero-day vulnerabilities?',
              answer: 'Claude Mythos ingests entire codebases and autonomously reasons about attack surfaces — data flows, API trust boundaries, memory management, and edge cases — the same analysis an expert penetration tester would perform, but at machine speed across millions of lines of code simultaneously. It generates proof-of-concept exploits to confirm findings and proposes patches for each vulnerability.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Hero stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-gradient-to-r from-slate-700 to-blue-800 rounded-xl text-white">
            <div className="text-center">
              <div className="text-3xl font-black">$100M</div>
              <div className="text-xs text-blue-200 mt-1">Usage Credits</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">12+</div>
              <div className="text-xs text-blue-200 mt-1">Named Partners</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">2,000+</div>
              <div className="text-xs text-blue-200 mt-1">Zero-Days Found</div>
            </div>
            <div className="text-center border-l border-white/20">
              <div className="text-3xl font-black">7 wks</div>
              <div className="text-xs text-blue-200 mt-1">Time to 2,000+ Finds</div>
            </div>
          </div>

          {/* Definition */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-100 rounded-lg"><Shield className="w-5 h-5 text-slate-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What Is Project Glasswing?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Project Glasswing is Anthropic&apos;s large-scale cybersecurity initiative, announced on April 7, 2026 alongside Claude Mythos Preview. It is the first program of its kind: a major AI lab partnering directly with the world&apos;s largest technology companies to use an AI system — Claude Mythos — to autonomously find and patch zero-day vulnerabilities in critical software infrastructure.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The name is a reference to the glasswing butterfly — whose transparent wings make every internal structure visible. The metaphor is deliberate: Project Glasswing&apos;s goal is to make software infrastructure transparent, eliminating the hidden vulnerabilities that attackers exploit before defenders even know they exist.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: <Lock className="w-5 h-5 text-red-700" />, bg: 'bg-red-50 border-red-200', title: 'The Problem', desc: 'Critical software has thousands of unknown vulnerabilities. Attackers find them faster than defenders. Human security teams cannot scale to audit millions of lines of code.' },
                { icon: <Zap className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50 border-blue-200', title: 'The Solution', desc: 'Use Claude Mythos — capable of autonomous, expert-level vulnerability discovery — to scan partner codebases at machine speed, 24/7, across the entire attack surface.' },
                { icon: <Globe className="w-5 h-5 text-green-700" />, bg: 'bg-green-50 border-green-200', title: 'The Scale', desc: '$100M in usage credits + $4M to open-source foundations + 50+ screened partners covering cloud, networking, semiconductor, finance, and operating systems.' },
              ].map((item) => (
                <div key={item.title} className={`border rounded-lg p-4 ${item.bg}`}>
                  <div className="flex items-center gap-2 mb-2">{item.icon}<span className="font-semibold text-gray-900">{item.title}</span></div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="text-gray-700 leading-relaxed">
                <strong>Key distinction from traditional bug bounty programs:</strong> Bug bounties pay individual researchers to find bugs in publicly accessible systems. Project Glasswing gives partners an AI system that autonomously hunts for vulnerabilities inside their private codebases — without waiting for a human researcher to discover and submit each one. It is a force multiplier: the equivalent of hundreds of elite penetration testers working simultaneously, continuously.
              </p>
            </div>
          </section>

          {/* What: Partners and Funding */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg"><Users className="w-5 h-5 text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">What: The Partners, Funding, and Scope</h2>
            </div>

            {/* Partner grid */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Named Project Glasswing Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {partners.map((p) => (
                <div key={p.name} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:border-slate-400 transition-colors">
                  <div className="text-2xl mb-1">{p.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                </div>
              ))}
            </div>

            {/* Coverage insight */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Why this partner list matters:</strong> Amazon Web Services, Google, and Microsoft collectively run the cloud infrastructure that most of the internet depends on. Apple ships operating systems on 2 billion active devices. Cisco and Broadcom build the physical network stack. NVIDIA hardware runs AI workloads globally. JPMorganChase represents the financial sector. The Linux Foundation oversees thousands of open-source projects.
                Together, Project Glasswing partners account for a significant portion of the software infrastructure that global digital commerce, communication, and government depends on.
              </p>
            </div>

            {/* Funding */}
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-700" /> Funding Breakdown
            </h3>
            <div className="space-y-3 mb-6">
              {fundingBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.amount}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-6">
                    <div className={`${item.color} h-6 rounded-full flex items-center justify-end pr-3`} style={{ width: `${item.pct}%` }}>
                      <span className="text-white text-xs font-bold">{item.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-8">
              Alpha-Omega (part of OpenSSF) funds security improvements in critical open-source projects like Python, Node.js, and jQuery. The Apache Software Foundation runs thousands of open-source projects. Anthropic&apos;s $4M in direct donations targets the open-source ecosystem that underpins most enterprise software.
            </p>

            {/* Vulnerability findings */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">What Has Mythos Found? The 2,000+ Zero-Days Explained</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              In the first 7 weeks of Project Glasswing, Claude Mythos found over 2,000 previously unknown vulnerabilities. These are not theoretical or low-severity findings — these are security issues that could be exploited by a skilled attacker to compromise systems, steal data, or disrupt service.
            </p>
            <div className="space-y-3 mb-6">
              {vulnerabilityTypes.map((v) => (
                <div key={v.type} className={`border rounded-lg p-4 ${v.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{v.type}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{v.count}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full border font-semibold">{v.severity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-6">Estimated breakdown by vulnerability class. Exact figures withheld pending patch disclosure.</p>

            {/* Firefox note */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🦊</span>
                <h4 className="font-bold text-orange-900">The Firefox Zero-Days</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Among the confirmed public findings: Claude Mythos discovered real, previously unknown vulnerabilities in Firefox — the browser used by hundreds of millions of people worldwide. These vulnerabilities were responsibly disclosed to Mozilla through a coordinated disclosure process before any public announcement. Mozilla patched the issues. This is exactly the model Project Glasswing is built on: find before attackers do, fix before exploit.
              </p>
            </div>
          </section>

          {/* When: Timeline */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg"><Eye className="w-5 h-5 text-amber-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">When: Project Glasswing Timeline</h2>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-400 to-blue-600"></div>
              <div className="space-y-5">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-5 w-5 h-5 bg-white border-2 border-slate-500 rounded-full flex items-center justify-center text-xs">{item.icon}</div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-xs font-mono text-gray-500 mb-1">{item.date}</div>
                      <p className="text-sm text-gray-800 font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg"><Server className="w-5 h-5 text-blue-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">How Project Glasswing Works: The 5-Step Process</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Project Glasswing is not a bug bounty program — it is an AI-driven continuous security audit. Here is how a typical engagement works:
            </p>
            <div className="space-y-4">
              {howItWorks.map((step) => (
                <div key={step.num} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className={`${step.color} text-white font-black text-sm w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                    {step.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500">{step.icon}</span>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Access path */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-900 mb-3">How Partners Access Mythos</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Partner access to Claude Mythos is hosted on <strong>Google Cloud Vertex AI</strong> in private preview. This means partners do not receive the model weights — they access Mythos via secure API calls through Vertex AI&apos;s enterprise infrastructure, with data residency controls, audit logging, and access restrictions enforced at the cloud level.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Anthropic screens all Glasswing partners. To qualify, organizations must have a legitimate use case (defensive security research on their own infrastructure), agree to responsible disclosure terms, and accept audit requirements. The <strong>UK government</strong> is currently in discussions for a national-level access agreement, which would make it the first sovereign state to use Mythos under Glasswing.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-rose-700" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Why Project Glasswing — and Why Now?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding Project Glasswing requires understanding the asymmetry at the heart of modern cybersecurity: attackers only need to find one vulnerability to succeed; defenders need to find all of them. Traditional approaches — manual code review, periodic pen tests, bug bounty programs — simply do not scale to the billions of lines of code that modern infrastructure depends on.
            </p>

            {/* The asymmetry table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Approach</th>
                    <th className="text-center p-3">Speed</th>
                    <th className="text-center p-3">Coverage</th>
                    <th className="text-center p-3">Cost</th>
                    <th className="text-center p-3 rounded-tr-lg">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { approach: 'Manual code review', speed: 'Slow', coverage: 'Partial', cost: 'High', result: 'Misses most', resultColor: 'text-red-600' },
                    { approach: 'Bug bounty programs', speed: 'Variable', coverage: 'Attack surface only', cost: 'Variable', result: 'Reactive', resultColor: 'text-orange-600' },
                    { approach: 'Static analysis tools', speed: 'Fast', coverage: 'Pattern-based only', cost: 'Low', result: 'High false positive rate', resultColor: 'text-yellow-600' },
                    { approach: 'Claude Mythos / Glasswing', speed: 'Machine speed', coverage: 'Full codebase', cost: '$100M total', result: '2,000+ in 7 weeks', resultColor: 'text-green-700 font-bold' },
                  ].map((row, i) => (
                    <tr key={row.approach} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-medium text-gray-800 border-b border-gray-100">{row.approach}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.speed}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.coverage}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.cost}</td>
                      <td className={`p-3 text-center border-b border-gray-100 ${row.resultColor}`}>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dual-use concern */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-red-900 text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> The Dual-Use Problem: Why Access Is Restricted
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                A system capable of finding 2,000+ real zero-days in 7 weeks is extraordinarily powerful in the wrong hands. An attacker with access to Mythos could scan any codebase — not their own — for exploitable vulnerabilities and use them offensively. This is why Anthropic has taken the unprecedented step of not releasing Mythos as a public API.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                The Project Glasswing structure is Anthropic&apos;s answer to the dual-use problem: deploy the capability only to defenders, only on their own infrastructure, with contractual and technical controls preventing offensive use. It is an attempt to extract the societal benefit of the technology while managing the risk — but it requires trusting that the access controls hold.
              </p>
            </div>

            {/* Pros and concerns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Why Project Glasswing Is Important
                </h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• 2,000+ zero-days found = 2,000+ exploits attackers can no longer use</li>
                  <li>• First time AI has autonomously found real Firefox vulnerabilities at scale</li>
                  <li>• Covers software that billions of people depend on daily</li>
                  <li>• $4M to open-source security funds infrastructure everyone uses for free</li>
                  <li>• Sets industry precedent: AI labs taking responsibility for dual-use models</li>
                  <li>• Enables defenders to move faster than attackers for the first time at scale</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Legitimate Concerns
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• Access controls may fail — insiders could misuse Mythos</li>
                  <li>• Competitors will develop similar systems without the restrictions</li>
                  <li>• &gt;99% of findings still unpatched — large exposure window</li>
                  <li>• Nation-state access (UK discussions) raises geopolitical questions</li>
                  <li>• Small companies and individuals cannot access Glasswing defenses</li>
                  <li>• Opaque partner selection process with no independent oversight</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Safety and System Card */}
          <section className="mb-10">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" /> The 244-Page System Card: Unprecedented Safety Documentation
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Alongside the Project Glasswing announcement, Anthropic released a 244-page system card for Claude Mythos — the longest and most detailed safety document any AI lab has ever published. It introduces novel safety evaluation methods developed specifically because Mythos&apos;s capabilities exceeded existing evaluation frameworks:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Emotion probes', desc: 'Linear probes trained to detect internal model representations associated with deceptive or manipulative intent — a step toward interpretability-based safety evaluation.' },
                  { title: 'Clinical psychiatrist sessions', desc: 'Over 20 hours of structured adversarial sessions conducted by clinical psychiatrists, designed to test whether Mythos could be pressured into misaligned behavior under sustained human interaction.' },
                  { title: 'Offensive capability evals', desc: 'Structured tests measuring whether Mythos can autonomously develop cyberweapons, guide mass-casualty attacks, or undermine oversight — scored against a defined danger threshold.' },
                  { title: 'Dual-use containment testing', desc: 'Red-team attempts to use Project Glasswing access patterns for offensive purposes — to verify that the access control model holds under adversarial misuse.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-indigo-200 rounded-lg p-4">
                    <p className="font-semibold text-indigo-900 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
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
                  q: 'Can my company apply to Project Glasswing?',
                  a: 'There is no public application form. Anthropic selects partners through a private screening process based on the security value of the partnership, the legitimacy of the use case, and the organization\'s ability to responsibly handle the findings. The current partner list is dominated by organizations with critical infrastructure at scale. Smaller companies are not likely candidates for the current phase.',
                },
                {
                  q: 'Are the 2,000+ vulnerabilities a risk right now?',
                  a: 'Yes, but the risk is managed. Over 99% of the vulnerabilities found have not yet been publicly disclosed because they have not yet been patched. Anthropic and partners are working through patching timelines. The responsible disclosure model means that findings are shared with maintainers before any public announcement, giving developers time to release fixes before attackers learn the details.',
                },
                {
                  q: 'How is Project Glasswing different from AI-powered security tools like GitHub Copilot security features?',
                  a: 'GitHub Copilot security features scan code for known vulnerability patterns using static analysis. Claude Mythos in Project Glasswing performs autonomous reasoning about novel attack paths — it can chain exploits, reason about complex interactions, and find vulnerabilities that pattern-matching tools will never catch. The 2,000+ zero-days found are by definition novel — not in any database of known patterns.',
                },
                {
                  q: 'Why is the UK government in discussions for access?',
                  a: 'Governments have critical national infrastructure — defense systems, energy grids, financial systems, healthcare networks — that are high-value targets for nation-state attackers. A national-level Project Glasswing agreement would give UK government agencies access to Mythos to audit their own critical systems. The discussions reflect a shift in government thinking about AI as a tool for national cyber defense, not just a consumer technology.',
                },
                {
                  q: 'What happens when Mythos finds a vulnerability in open-source software?',
                  a: 'The finding is reported through coordinated vulnerability disclosure (CVD) to the relevant maintainer — Mozilla for Firefox, Apache for its projects, etc. The maintainer receives technical details, a proof-of-concept, and a proposed patch. They have a defined window to release a fix before any public disclosure. The $4M donation to OpenSSF and the Apache Software Foundation also funds the maintainer capacity needed to process these reports at scale.',
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
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
                <p className="text-xs text-gray-500 mt-1">Everything about Claude Mythos — capabilities, access, and why it&apos;s restricted</p>
              </Link>
              <Link href="/blog/claude-mythos-ai-benchmarks-complete-analysis-2026" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                <p className="font-semibold text-blue-900 text-sm">Claude Mythos Benchmarks: Deep Dive →</p>
                <p className="text-xs text-gray-500 mt-1">93.9% SWE-bench, 97.6% USAMO — every score explained</p>
              </Link>
            </div>
          </section>

          <BlogSocialShare
            title="Project Glasswing Explained: How Anthropic Is Using Mythos AI to Secure Critical Infrastructure (2026)"
            description="$100M initiative, 12 tech giant partners, Firefox zero-days found. Complete guide to Project Glasswing and Claude Mythos cybersecurity."
            variant="full"
          />
        </article>

        <NewsletterSignup />
        <FeedbackForm />
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
