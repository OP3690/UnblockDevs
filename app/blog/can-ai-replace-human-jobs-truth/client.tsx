'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function CanAiReplaceHumanJobsTruthClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Can AI Replace Human Jobs? The Truth — What's at Risk and What Isn't</h1>
      <p className="lead">
        AI is automating tasks, not just jobs. Some roles will be radically transformed, some will shrink,
        and new ones will emerge. This guide separates hype from reality — which jobs are genuinely at risk,
        which are safe, and what the historical record says about technology and employment.
      </p>

      <StatGrid stats={[
        { value: '30%', label: 'of tasks in 60% of jobs could be automated (McKinsey)', color: 'amber' },
        { value: '97M', label: 'new jobs AI will create by 2025 (WEF estimate)', color: 'green' },
        { value: '85M', label: 'jobs AI will displace by 2025 (WEF estimate)', color: 'red' },
        { value: 'Net +12M', label: 'net new jobs in the WEF projection', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="The Nuanced Answer" />
      <QuickFact>
        AI replaces tasks, not jobs. A doctor's job involves diagnosis, patient communication, empathy,
        ethical judgment, and physical examination. AI can assist with diagnosis. It can't replace the
        whole role. The jobs most at risk are those where most tasks are routine, rule-based, and
        language/data-processing oriented.
      </QuickFact>

      <SectionHeader number={2} title="Jobs Most at Risk" />
      <CompareTable
        leftLabel="Role"
        rightLabel="Why At Risk"
        rows={[
          { label: 'Data Entry Clerk', left: 'Manual data processing', right: 'LLMs and OCR automate 90%+ of the work' },
          { label: 'Basic Customer Support', left: 'Handling repetitive queries', right: 'AI chatbots resolve 60-70% of support tickets' },
          { label: 'Junior Copywriter', left: 'High-volume content generation', right: 'GPT-4 produces acceptable drafts faster and cheaper' },
          { label: 'Paralegal (basic research)', left: 'Document review and summarization', right: 'AI reads 1000 contracts in minutes' },
          { label: 'Basic Financial Analysis', left: 'Report generation, data aggregation', right: 'AI assembles financial reports automatically' },
          { label: 'Radiologist (routine scans)', left: 'Pattern recognition in images', right: 'AI matches expert radiologists on specific tasks' },
        ]}
      />

      <SectionHeader number={3} title="Jobs That Are Safe (and Why)" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Trades and Physical Work', description: 'Plumbers, electricians, HVAC technicians. Physical dexterity in unstructured environments is extremely hard to automate. Boston Dynamics robots can\'t fix your leaky pipe yet.' },
        { title: 'Healthcare (Non-Routine)', description: 'Surgeons, therapists, nurses. Physical care, ethical judgment, and genuine human empathy cannot be replicated. Healthcare employment is actually growing.' },
        { title: 'Creative Direction', description: 'Art directors, brand strategists, product designers. AI generates options but humans make judgment calls about meaning, taste, and cultural resonance.' },
        { title: 'Management and Leadership', description: 'Managing people, navigating organizational politics, building culture, making high-stakes decisions under uncertainty. These require social and emotional intelligence AI lacks.' },
        { title: 'Complex Engineering', description: 'AI writes code but systems architects design the overall system, make trade-off decisions, and own the technical strategy.' },
        { title: 'Sales and Relationship Work', description: 'High-value B2B sales, account management. Trust, relationship building, and understanding complex organizational dynamics remain human domains.' },
      ]} />

      <SectionHeader number={4} title="Historical Context — Technology Has Disrupted Jobs Before" />
      <AlertBox type="tip" title="This has happened before — and employment grew">
        The Industrial Revolution automated physical labor. ATMs were supposed to eliminate bank tellers
        (teller employment grew because banks opened more branches). Spreadsheets were supposed to
        eliminate accountants (accounting grew). Technology creates new categories of work that didn't
        previously exist. The challenge is transition — retraining takes time.
      </AlertBox>

      <CompareTable
        leftLabel="Technology"
        rightLabel="Jobs Expected to Die"
        rows={[
          { label: 'Industrial Revolution', left: 'Weavers, mill workers', right: 'Created factory jobs, new industrial roles — net employment grew' },
          { label: 'Tractors (1900s)', left: '80% of Americans farmed → 2% today', right: 'Manufacturing and service jobs absorbed displaced workers' },
          { label: 'ATMs (1970s-80s)', left: 'Bank tellers predicted to vanish', right: 'Teller count grew 43% over 30 years (cheaper branches opened)' },
          { label: 'Spreadsheets (1980s)', left: 'Bookkeepers and accountants', right: 'Accounting firms grew — analysis became more valuable' },
          { label: 'AI (2020s)', left: 'Data entry, basic analysis, content', right: 'TBD — but history suggests net creation with significant disruption' },
        ]}
      />

      <SectionHeader number={5} title="How to Future-Proof Your Career" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Learn to Work With AI', description: 'AI fluency — knowing how to prompt, evaluate, and direct AI tools — will be as important as computer literacy was in the 1990s. The best jobs will be AI-augmented, not AI-replaced.' },
        { title: 'Focus on Judgment and Strategy', description: 'AI is excellent at execution and synthesis. Strategy, prioritization, and judgment calls remain human advantages. Move up the value chain.' },
        { title: 'Build Irreplaceable Relationships', description: 'Clients who trust you personally won\'t immediately switch to AI. High-trust relationships, domain reputation, and specialized expertise create defensible positions.' },
        { title: 'Stay Close to Production', description: 'Understand the physical, social, or creative output your work ultimately enables. Pure administrative or processing roles are most vulnerable; roles tied to physical or relational outcomes are more resilient.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Will AI take most jobs in the next 10 years?',
          answer: 'Significant disruption is likely, but "most jobs" disappearing in 10 years is not credible. Economic transitions take decades. More likely: many jobs change significantly (requiring AI skills), some job categories shrink substantially (routine knowledge work), and new categories emerge (AI trainers, prompters, evaluators, ethicists).',
        },
        {
          question: 'Which industries will be hit first?',
          answer: 'Already being disrupted: customer service, data processing, basic content creation, routine legal and financial work. Next wave: radiology interpretation, paralegal work, basic coding. Longer term: more complex knowledge work as AI capabilities improve.',
        },
        {
          question: 'What skills are most important for the AI era?',
          answer: 'Critical thinking (evaluating AI output), communication (AI handles first drafts; humans make them great), domain expertise (AI needs direction from experts), adaptability (the ability to learn new tools as they emerge), and emotional intelligence (irreplaceable in human-facing roles).',
        },
        {
          question: 'Should I avoid certain career paths because of AI?',
          answer: 'I would avoid roles where 90%+ of the work is rule-based data processing or pattern-matching without judgment. Be cautious about: data entry, basic transcription, simple report generation, rote customer service. Instead, look for roles with: physical components, complex judgment, genuine relationship requirements, or creative direction.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
