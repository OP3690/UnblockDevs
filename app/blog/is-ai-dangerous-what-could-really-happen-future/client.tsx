'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, Scale, Shield, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function IsAIDangerousClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Is AI Dangerous? What Could Really Happen in the Future</h1>
          <p className="text-sm text-gray-500 mt-1">AI risks (misinformation, deepfakes), myths vs reality, regulation and control, and should we be worried?</p>
        </div>
      </header>

      <BlogSocialShare
        title="Is AI Dangerous? What Could Really Happen in the Future"
        description="AI risks (misinformation, deepfakes), myths vs reality, regulation, and should we be worried?"
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Is AI dangerous? The answer isn&apos;t &quot;yes&quot; or &quot;no&quot;—it depends on how we build and use it. This guide covers real AI risks (misinformation, deepfakes), separates myths from reality, explains regulation and control, and helps you decide: should we be worried?
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Do We Mean by &quot;AI Danger&quot;?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Definition:</strong> When we ask &quot;is AI dangerous,&quot; we mean: can AI cause serious harm to people or society—through misuse (e.g. fraud, manipulation), unintended effects (e.g. bias, errors), or loss of control (e.g. autonomous systems making bad decisions)? Danger can be immediate (deepfakes, misinformation) or longer-term (employment, concentration of power).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What</strong> we&apos;re assessing: Risk of harm from how AI is used today and how it might be used in the future. <strong>When</strong> it matters: When we design systems, set policy, or choose how much to rely on AI. <strong>Why</strong> it matters: Getting the level of concern right helps us invest in real safeguards without either ignoring risks or panicking over myths.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
              AI Risks: Misinformation, Deepfakes, and More
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These are <strong>real</strong> risks that are already here or growing fast:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 min-w-[120px]">Misinformation:</strong>
                <span>AI can generate convincing false text, images, and video at scale. That can spread fake news, influence elections, and undermine trust in media. <strong>Why</strong> it&apos;s serious: Speed and volume make it hard for people and platforms to verify everything.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 min-w-[120px]">Deepfakes:</strong>
                <span>AI-generated video or audio that mimics real people. Used for fraud (e.g. impersonating executives), harassment, or political manipulation. <strong>When</strong> it hurts: When viewers can&apos;t tell it&apos;s fake and act on it.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 min-w-[120px]">Bias and unfairness:</strong>
                <span>Models trained on biased data can discriminate in hiring, lending, or law enforcement. <strong>How</strong> it happens: Data reflects past inequities; the model learns and can amplify them.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 min-w-[120px]">Privacy and surveillance:</strong>
                <span>AI can analyze huge amounts of personal data for tracking, profiling, or manipulation. <strong>Why</strong> it matters: Without strong rules, power shifts to those who hold the data and models.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 min-w-[120px]">Dependence and fragility:</strong>
                <span>Over-reliance on AI for critical decisions (e.g. medical, legal) can cause harm when the system fails or is wrong. <strong>When</strong> to worry: When humans stop checking and defer entirely to the machine.</span>
              </li>
            </ul>
            <div className="my-6 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-500">
              <h3 className="font-semibold text-gray-900 mb-2">Risk flow (simplified)</h3>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm font-medium">
                <span className="px-4 py-2 bg-white rounded-lg border border-amber-200">Bad use / Bad data</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-lg border border-amber-200">AI amplifies</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-red-100 rounded-lg border border-red-300">Harm (misinfo, bias, fraud)</span>
              </div>
              <p className="text-gray-700 text-sm mt-3">Mitigation: better data, oversight, transparency, and human-in-the-loop for high-stakes decisions.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600" />
              AI Myths vs Reality
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Separating hype from what&apos;s actually true helps us focus on real risks:
            </p>
            <div className="overflow-x-auto my-6 rounded-lg border-2 border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Myth</th>
                    <th className="px-4 py-3 font-semibold">Reality</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3">AI will wake up and take over</td><td className="px-4 py-3">Today&apos;s AI has no goals, consciousness, or desire to &quot;take over.&quot; Risk is from how <em>people</em> use it, not from AI &quot;waking up.&quot;</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3">AI is neutral and objective</td><td className="px-4 py-3">AI reflects data and design choices. It can encode bias and error. &quot;Objective&quot; often means &quot;trained on past data,&quot; which can be unfair.</td></tr>
                  <tr className="border-t border-gray-200 bg-white"><td className="px-4 py-3">We can&apos;t do anything about AI risk</td><td className="px-4 py-3">We can: regulation, audits, transparency, safety research, and design choices (e.g. human oversight, limits on use).</td></tr>
                  <tr className="border-t border-gray-200 bg-gray-50"><td className="px-4 py-3">AI will solve everything</td><td className="px-4 py-3">AI is a tool. It can help with many problems but also create new ones (e.g. misinformation, job displacement). Benefits and risks must be managed together.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Regulation and Control
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What</strong> regulation and control mean here: Laws, standards, and practices that limit misuse and encourage safe, fair, and transparent AI. <strong>How</strong> it works in practice:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li><strong>Laws and rules:</strong> Bans or limits on certain uses (e.g. facial recognition in public), requirements for transparency or impact assessments (e.g. EU AI Act), and liability when AI causes harm.</li>
              <li><strong>Industry standards:</strong> Safety testing, red-teaming, disclosure of AI-generated content (e.g. watermarks, labels).</li>
              <li><strong>Organizational control:</strong> Internal policies, human review for high-stakes decisions, and ethics boards.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>When</strong> it helps: When rules are clear, enforceable, and updated as technology changes. <strong>Why</strong> it matters: Without guardrails, the same technology that helps can also harm; regulation and control aim to keep benefits and reduce harms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Should We Be Worried?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Short answer:</strong> Be concerned about <strong>real</strong> risks (misinformation, deepfakes, bias, privacy, over-reliance)—not about sci-fi scenarios like AI &quot;waking up.&quot; Worry in a way that leads to action: support good regulation, demand transparency, use AI critically, and keep humans in the loop for important decisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What</strong> to do: Stay informed, verify important information, and advocate for sensible rules and corporate responsibility. <strong>Why</strong> that helps: Public awareness and policy shape how AI is built and used; informed concern is more useful than either denial or panic.
            </p>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-gray-800 text-sm font-medium">
                <strong>Takeaway:</strong> AI can be dangerous when misused or poorly designed—but &quot;dangerous&quot; is not inevitable. Risks can be reduced with better design, regulation, and behavior. Focus on the risks we can actually address.
              </p>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Summary:</strong> AI poses real dangers: misinformation, deepfakes, bias, privacy, and over-reliance. Myths (e.g. AI &quot;taking over&quot;) distract from these. Regulation, standards, and human oversight can reduce harm. We should be worried enough to act—not to panic, but to demand and support sensible safeguards and use AI responsibly.
            </p>
            <p className="text-gray-600 text-sm">
              Working with data safely? Use our <Link href="/json-beautifier" className="text-primary-600 hover:underline font-medium">JSON Beautifier</Link> and <Link href="/token-comparator" className="text-primary-600 hover:underline font-medium">Token Comparator</Link> to inspect and compare data locally.
            </p>
          </section>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
