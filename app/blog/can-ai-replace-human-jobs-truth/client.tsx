'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CanAiReplaceHumanJobsTruthClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Can AI Replace Human Jobs? The Truth — What's at Risk and What Isn't</h1>
      <p className="lead">
        AI is automating tasks, not just jobs. Some roles will be radically transformed, some will shrink,
        and new ones will emerge. This guide separates hype from reality — which jobs are genuinely at risk,
        which are safe, and what the historical record says about technology and employment. We also look at
        what skills will matter most in an AI-augmented economy.
      </p>

      <StatGrid stats={[
        { value: '30%', label: 'of tasks in 60% of jobs could be automated (McKinsey)', color: 'amber' },
        { value: '97M', label: 'new jobs AI will create by 2025 (WEF estimate)', color: 'green' },
        { value: '85M', label: 'jobs AI will displace by 2025 (WEF estimate)', color: 'red' },
        { value: 'Net +12M', label: 'net new jobs in the WEF projection', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="The Nuanced Answer" />
      <QuickFact color="blue" label="Tasks vs. jobs">
        AI replaces tasks, not jobs. A doctor's role involves diagnosis, patient communication, empathy,
        ethical judgment, and physical examination. AI can assist with diagnosis. It cannot replace the
        whole role. The jobs most at risk are those where most tasks are routine, rule-based, and
        language- or data-processing oriented — not jobs that require physical presence, trust, or judgment.
      </QuickFact>

      <SectionHeader number={2} title="Jobs Most at Risk" />
      <CompareTable
        leftLabel="Role"
        rightLabel="Why At Risk"
        rows={[
          { label: 'Data Entry Clerk', left: 'Manual data processing', right: 'LLMs and OCR automate 90%+ of the work at near-zero cost' },
          { label: 'Basic Customer Support', left: 'Handling repetitive queries', right: 'AI chatbots resolve 60-70% of support tickets autonomously' },
          { label: 'Junior Copywriter', left: 'High-volume content generation', right: 'GPT-4 produces acceptable drafts faster and 99% cheaper' },
          { label: 'Paralegal (basic research)', left: 'Document review and summarization', right: 'AI reads and summarizes 1,000 contracts in minutes' },
          { label: 'Basic Financial Analysis', left: 'Report generation, data aggregation', right: 'AI assembles financial reports and dashboards automatically' },
          { label: 'Radiologist (routine scans)', left: 'Pattern recognition in medical images', right: 'AI matches expert radiologist accuracy on specific scan types' },
          { label: 'Transcriptionist', left: 'Converting speech to text', right: 'Whisper and similar models transcribe with 95%+ accuracy for $0.006/min' },
          { label: 'Basic Code Review', left: 'Finding obvious bugs, style issues', right: 'Static analysis + AI catches most routine issues automatically' },
        ]}
      />

      <AlertBox type="warning" title="Nuance matters: within-job risk varies">
        A lawyer whose job is 80% contract review and 20% courtroom advocacy faces different risk than
        one whose work is 80% client strategy and litigation. AI disrupts the contract review part, not
        the courtroom part. The question is not "will AI replace lawyers?" but "how will AI change what
        lawyers spend their time on?"
      </AlertBox>

      <SectionHeader number={3} title="Jobs That Are Safe (and Why)" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Trades and Physical Work', description: 'Plumbers, electricians, HVAC technicians, carpenters. Physical dexterity in unstructured environments is extremely hard to automate. Robotics has advanced but general-purpose manual dexterity remains decades away from commercial viability.' },
        { title: 'Healthcare (Non-Routine)', description: 'Surgeons, therapists, nurses, GPs. Physical care, ethical judgment, diagnostic reasoning, and genuine human empathy cannot be replicated. Healthcare employment is growing, not shrinking, due to aging populations.' },
        { title: 'Creative Direction', description: 'Art directors, brand strategists, product designers. AI generates options but humans make judgment calls about meaning, taste, cultural resonance, and what to create in the first place.' },
        { title: 'Management and Leadership', description: 'Managing people, navigating organizational politics, building culture, making high-stakes decisions under uncertainty. These require social and emotional intelligence that AI demonstrably lacks.' },
        { title: 'Complex Engineering', description: 'AI writes code but systems architects design overall systems, make trade-off decisions, own technical strategy, and communicate solutions to non-technical stakeholders.' },
        { title: 'Sales and Relationship Work', description: 'High-value B2B sales, account management, enterprise consulting. Trust, relationship building, and understanding complex organizational dynamics remain deeply human domains.' },
        { title: 'Teaching and Coaching', description: 'Effective teachers adapt to individual students in real-time, build relationships, model behavior, and provide emotional support. AI tutors help but don\'t replace the relational core of good teaching.' },
        { title: 'Mental Health and Social Work', description: 'Therapists, counselors, social workers. The therapeutic relationship itself is the mechanism of change. Human presence, empathy, and lived experience cannot be replicated by AI.' },
      ]} />

      <SectionHeader number={4} title="Historical Context — Technology Has Disrupted Jobs Before" />
      <AlertBox type="tip" title="This has happened before — and employment grew">
        The Industrial Revolution automated physical labor. ATMs were supposed to eliminate bank tellers —
        teller employment grew 43% over 30 years because banks opened more, cheaper branches. Spreadsheets
        were supposed to eliminate accountants — accounting grew as analysis became more valuable. Technology
        creates new categories of work that didn't previously exist. The challenge is transition — retraining
        takes time and the burden falls unevenly.
      </AlertBox>

      <CompareTable
        leftLabel="Technology"
        rightLabel="Jobs Expected to Die"
        rows={[
          { label: 'Industrial Revolution', left: 'Weavers, mill workers, artisans', right: 'Created factory jobs and new industrial roles — net employment grew' },
          { label: 'Tractors (1900s)', left: '80% of Americans farmed → 2% today', right: 'Manufacturing and service jobs absorbed displaced agricultural workers' },
          { label: 'ATMs (1970s-80s)', left: 'Bank tellers predicted to vanish', right: 'Teller count grew 43% over 30 years — cheaper branches opened' },
          { label: 'Spreadsheets (1980s)', left: 'Bookkeepers and accountants', right: 'Accounting firms grew — financial analysis became more accessible' },
          { label: 'Internet (1990s)', left: 'Travel agents, retail jobs, newspapers', right: 'Created entire new industries: digital marketing, e-commerce, SaaS' },
          { label: 'AI (2020s)', left: 'Data entry, basic analysis, content', right: 'Early evidence: net job creation, but significant role transformation' },
        ]}
      />

      <SectionHeader number={5} title="New Jobs AI Is Creating" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Prompt Engineers', description: 'Specialists who craft and optimize prompts for AI systems. As AI becomes embedded in every product, skilled prompt engineering becomes a valuable specialization.' },
        { title: 'AI Trainers and Evaluators', description: 'Humans who rate AI outputs, create training data, identify failure modes, and provide the RLHF (reinforcement learning from human feedback) that makes AI models better.' },
        { title: 'AI Ethics and Safety Researchers', description: 'Professionals who identify biases, failure modes, and safety risks in AI systems. Every company deploying AI needs this expertise as regulations increase.' },
        { title: 'AI Integration Specialists', description: 'Developers and consultants who integrate AI APIs into existing business workflows. The demand for this skill is growing faster than the supply.' },
        { title: 'AI-Augmented Professionals', description: 'Doctors, lawyers, analysts, and designers who use AI to do their jobs dramatically better. The AI-augmented professional will out-compete the non-augmented one.' },
        { title: 'Data Curators and Annotators', description: 'Every AI model needs high-quality training data. Human curation, labeling, and quality assurance for AI datasets is a growing field, particularly for specialized domains.' },
      ]} />

      <SectionHeader number={6} title="How to Future-Proof Your Career" />
      <VerticalSteps steps={[
        { title: 'Become AI-fluent now', desc: 'AI fluency — knowing how to prompt, evaluate, and direct AI tools — will be as important as computer literacy was in the 1990s. Spend 1 hour per day using AI tools for your actual work. The learning curve is real but short.' },
        { title: 'Identify which parts of your job AI can do', desc: 'Honestly audit your role. Which tasks are routine, language-based, and rule-driven? Those are at risk. Which require physical presence, trust, or ethical judgment? Those are defensible. Focus your energy on the defensible parts.' },
        { title: 'Move up the value chain', desc: 'AI is excellent at execution and synthesis. Strategy, prioritization, and judgment calls remain human advantages. If your current role is heavy on execution and light on judgment, build skills that move you toward more strategic work.' },
        { title: 'Build domain expertise + AI skills', desc: 'The most valuable combination in 2026 is deep domain expertise plus AI literacy. A doctor who uses AI tools is more valuable than either a doctor without AI skills or an AI without medical expertise.' },
        { title: 'Invest in relationships', desc: 'Clients who trust you personally are less likely to immediately switch to AI. High-trust relationships, domain reputation, and specialized expertise create defensible professional positions.' },
        { title: 'Stay close to the physical or relational output', desc: 'Pure administrative or processing roles are most vulnerable. Roles tied to physical outcomes (healthcare, construction, manufacturing) or relational outcomes (sales, therapy, teaching) are more resilient.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Will AI take most jobs in the next 10 years?',
          answer: 'Significant disruption is likely, but "most jobs disappearing in 10 years" is not credible. Economic transitions take decades. More likely: many jobs change significantly (requiring AI skills), some job categories shrink substantially (routine knowledge work), and new categories emerge (AI trainers, integration specialists, evaluators). The WEF projects 97M new roles created vs. 85M displaced by 2025 — net positive, but with significant regional and skill-level variation.',
        },
        {
          question: 'Which industries will be hit first?',
          answer: 'Already being disrupted: customer service (60-70% of tickets handled by AI), data processing, basic content creation, routine legal and financial work. Next wave: radiology interpretation, paralegal work, basic software QA, and financial compliance. Longer term: complex knowledge work as AI capabilities improve. Industries tied to physical work or human relationships are most insulated.',
        },
        {
          question: 'What skills are most important for the AI era?',
          answer: 'Five high-value skills: (1) Critical thinking — evaluating AI output for accuracy and appropriateness. (2) Communication — AI handles first drafts; humans make them compelling. (3) Domain expertise — AI needs direction from subject-matter experts who can catch its mistakes. (4) Adaptability — the ability to learn new tools as they emerge every 6 months. (5) Emotional intelligence — irreplaceable in human-facing roles like sales, therapy, management, and teaching.',
        },
        {
          question: 'Should I avoid certain career paths because of AI?',
          answer: 'Avoid roles where 90%+ of the work is rule-based data processing or pattern-matching without judgment: data entry, basic transcription, simple report generation, rote customer service scripts. Be cautious about: junior roles in law and finance that currently involve mostly document review. Instead, look for roles with: physical components, complex judgment calls, genuine relationship requirements, creative direction, or specialized expertise that AI struggles to acquire.',
        },
        {
          question: 'Are developers and programmers safe from AI?',
          answer: 'Senior developers are relatively safe — they architect systems, make trade-off decisions, debug complex problems, and communicate technical solutions to business stakeholders. Junior developers doing routine coding tasks (CRUD endpoints, simple UI components) face more disruption. The developer role is evolving from writing code line-by-line toward directing AI to write code, reviewing AI output, and focusing on system design and product thinking. Developers who resist learning AI tools will lose relative to those who embrace them.',
        },
        {
          question: 'How should I explain AI job risk to my children or students?',
          answer: 'Focus on the distinction between routine and non-routine work. Encourage careers that combine: physical or in-person components (harder to automate), genuine human relationship elements (trust, empathy, accountability), creative judgment (direction, not just execution), and continuous learning (adaptability beats any single skill). The careers most insulated are those requiring physical presence + human judgment: healthcare, skilled trades, education, counseling, and creative direction. The careers most at risk are those that are primarily language processing without judgment or physical action.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
