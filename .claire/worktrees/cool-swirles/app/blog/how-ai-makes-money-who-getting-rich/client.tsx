'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowAIMakesMoneyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How AI Makes Money (And Who Is Getting Rich From It?)</h1>
      <p className="lead">
        AI is the fastest-growing industry in history — but the money flows in very specific directions.
        This guide maps the entire AI revenue ecosystem: infrastructure providers, foundation model labs,
        AI SaaS companies, the hyperscalers, and the individual creators and freelancers who are quietly
        building real income streams on top of it all.
      </p>

      <StatGrid stats={[
        { value: '$200B+', label: 'Hyperscaler AI capex in 2024', color: 'blue' },
        { value: '$1.7B', label: 'OpenAI annual revenue (2024 est.)', color: 'green' },
        { value: '7 layers', label: 'AI value chain layers', color: 'purple' },
        { value: '$6T', label: 'Projected global AI market by 2030', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The AI Value Chain — Who Makes What" />

      <ArchDiagram
        boxes={[
          { label: 'Chip manufacturers (NVIDIA, AMD, TSMC)', color: 'blue' },
          { label: 'Cloud infrastructure (AWS, Azure, GCP)', color: 'blue' },
          { label: 'Foundation model labs (OpenAI, Anthropic, Google)', color: 'purple' },
          { label: 'AI SaaS products (Jasper, Cursor, Midjourney)', color: 'amber' },
          { label: 'End users (businesses and individuals)', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→']}
      />

      <p>
        Each layer extracts value by adding a capability on top of the layer below. NVIDIA sells
        shovels to the gold rush. OpenAI builds a model on top of those chips. Cursor wraps OpenAI
        in a developer-friendly interface. Freelancers use Cursor to charge clients more per hour.
      </p>

      <SectionHeader number={2} title="Layer 1: Chip Manufacturers — The Picks and Shovels" />

      <QuickFact>NVIDIA's data center revenue grew from $3B (2021) to $47B (2024) — a 15x increase driven almost entirely by AI GPU demand.</QuickFact>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'NVIDIA (NVDA)',
          description: 'Dominates AI training GPUs (H100, B200). Data center segment is now 80%+ of revenue. CUDA ecosystem creates massive switching costs.',
        },
        {
          title: 'AMD (AMD)',
          description: 'MI300X AI accelerators growing fast. More competitive pricing than NVIDIA. Gaining share in inference workloads.',
        },
        {
          title: 'TSMC (TSM)',
          description: 'Manufactures chips for NVIDIA, AMD, Apple, Google. AI demand drove record revenue. No viable western alternative.',
        },
        {
          title: 'Custom AI ASICs',
          description: 'Google (TPU), Amazon (Trainium/Inferentia), Meta (MTIA) build custom chips to reduce NVIDIA dependency and inference costs.',
        },
      ]} />

      <SectionHeader number={3} title="Layer 2: Cloud Hyperscalers — Renting the Infrastructure" />

      <CompareTable
        leftLabel="Hyperscaler"
        rightLabel="AI Revenue Strategy"
        rows={[
          { label: 'Amazon Web Services', left: 'Bedrock (multi-model API), Trainium chips, SageMaker', right: 'Charges per inference token + cloud compute markup' },
          { label: 'Microsoft Azure', left: 'OpenAI partnership — Azure OpenAI Service, Copilot in every product', right: 'Per-token API pricing + M365 Copilot seats ($30/user/mo)' },
          { label: 'Google Cloud', left: 'Vertex AI, Gemini API, TPU access', right: 'API usage + cloud compute + Search AI integration' },
          { label: 'All three', left: 'GPU rental to AI startups', right: 'H100/A100 hours at $2-8/hour each — high margin' },
        ]}
      />

      <SectionHeader number={4} title="Layer 3: Foundation Model Labs" />

      <p>
        These companies train the core models and monetize them through APIs or consumer products.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'OpenAI',
          description: 'GPT-4/o API ($0.01-$0.06/1K tokens), ChatGPT Plus ($20/mo), ChatGPT Teams/Enterprise. Estimated $1.7B revenue in 2024, growing to $5B+ in 2025.',
        },
        {
          title: 'Anthropic',
          description: 'Claude API. Backed by Amazon ($4B) and Google ($2B). API revenue growing fast as enterprises choose Claude for safety-focused use cases.',
        },
        {
          title: 'Mistral AI',
          description: 'European open-weight model lab. API + enterprise deployment. Raised at $6B valuation. Competitive with OpenAI on cost.',
        },
        {
          title: 'Meta (open-weight)',
          description: 'Llama models are free to use. Meta monetizes indirectly — better AI makes Facebook/Instagram ads more effective, driving ad revenue.',
        },
      ]} />

      <SectionHeader number={5} title="Layer 4: AI SaaS Products — The Fastest-Growing Category" />

      <p>
        AI SaaS products build on top of foundation model APIs and sell to end users or businesses.
        Margins are high because the AI capability is rented, not built.
      </p>

      <KeyPointsGrid columns={3} items={[
        {
          title: 'Developer tools',
          description: 'Cursor ($20/mo), GitHub Copilot ($10-19/mo), Codeium. Millions of developers paying monthly for AI-assisted coding.',
        },
        {
          title: 'Writing & content',
          description: 'Jasper, Copy.ai, Grammarly. SMBs pay $40-100/mo for AI writing assistance. Jasper reached $75M ARR.',
        },
        {
          title: 'Image generation',
          description: 'Midjourney ($10-60/mo), Adobe Firefly (bundled in CC). Midjourney profitable at $200M+ ARR with a tiny team.',
        },
        {
          title: 'Video generation',
          description: 'Runway ($15-95/mo), Sora (bundled in ChatGPT Pro). Used by marketing teams and film productions.',
        },
        {
          title: 'Sales & CRM',
          description: 'HubSpot AI, Salesforce Einstein. Enterprise deals worth $50K-$500K/year.',
        },
        {
          title: 'Vertical AI agents',
          description: 'Harvey (legal), Nabla (medical), Klarna (customer service). These narrow AI products command premium enterprise pricing.',
        },
      ]} />

      <SectionHeader number={6} title="How Individuals Can Monetize AI (2026)" />

      <VerticalSteps steps={[
        {
          title: 'AI-assisted freelancing',
          description: 'Use AI tools to deliver work 2-5x faster — coding, writing, design, video editing. Charge the same rate, earn more per hour. This is the most immediate income opportunity.',
        },
        {
          title: 'Prompt engineering and AI consulting',
          description: 'Help companies deploy AI tools, write system prompts, and build AI workflows. Rates of $100-300/hour are common for experienced practitioners.',
        },
        {
          title: 'Build niche AI micro-SaaS products',
          description: 'Wrap an LLM API with a specific use case (e.g., AI for restaurant menus, AI for real estate listings). Build with tools like Bubble or Next.js. Charge $29-99/mo. Thousands of such products exist.',
        },
        {
          title: 'Sell AI-generated content at scale',
          description: 'AI-assisted blogs, social media content, YouTube scripts, stock photography. Volume and niche specificity are the key advantages.',
        },
        {
          title: 'Teach AI skills',
          description: 'Courses on Udemy, Gumroad, or your own platform. High demand for practical AI tool tutorials. Creators earning $50K-$500K/year teaching ChatGPT, Midjourney, and automation.',
        },
      ]} />

      <SectionHeader number={7} title="Revenue Models Compared" />

      <CompareTable
        leftLabel="Business model"
        rightLabel="AI company examples"
        rows={[
          { label: 'Per-token API pricing', left: 'OpenAI, Anthropic, Cohere', right: 'Scales with usage — good for startups, variable cost' },
          { label: 'Subscription (per seat)', left: 'Cursor, GitHub Copilot, ChatGPT', right: 'Predictable recurring revenue, high retention if sticky' },
          { label: 'Enterprise contracts', left: 'Salesforce AI, Harvey, Glean', right: 'Large deal sizes ($50K-$5M/yr), long sales cycles' },
          { label: 'Freemium', left: 'Canva AI, Notion AI', right: 'Large free user base converts to paid at 3-10%' },
          { label: 'Bundling', left: 'Adobe Firefly in CC, Microsoft Copilot in M365', right: 'AI drives retention and price increase justification' },
        ]}
      />

      <SectionHeader number={8} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Who is making the most money from AI right now?',
          answer: 'NVIDIA is the clearest winner — data center GPU revenue grew 15x from 2021 to 2024. The three hyperscalers (AWS, Azure, GCP) earn billions from renting GPU clusters and hosting AI APIs. OpenAI is the fastest-growing AI startup with ~$1.7B revenue in 2024. Microsoft is monetizing AI through Copilot subscriptions layered on its existing Office 365 base of 400M+ users.',
        },
        {
          question: 'How does OpenAI make money?',
          answer: 'OpenAI earns through: (1) ChatGPT Plus/Teams/Enterprise subscriptions ($20-$30/seat/month); (2) API revenue — businesses pay per token to use GPT-4o and other models; (3) partnerships and licensing deals. OpenAI is growing rapidly but still operates at a significant loss due to training and inference costs. Profitability is expected as compute costs fall and revenue scales.',
        },
        {
          question: 'Can individuals make real money with AI in 2026?',
          answer: 'Yes, in specific ways: (1) AI-augmented freelancing is the most accessible — writers, coders, designers, and marketers who use AI well can take on more clients at the same quality. (2) Building niche AI micro-SaaS tools requires technical skill but has produced many $10K-$100K/month businesses. (3) Creating educational content about AI tools has very high demand. (4) AI consulting for small businesses is underserved and commands $100+/hr.',
        },
        {
          question: 'What is the difference between an AI startup and a big tech AI product?',
          answer: 'AI startups (OpenAI, Anthropic, Runway, Cursor) build AI-first products with dedicated teams and typically rely on venture funding while scaling to profitability. Big tech AI products (Microsoft Copilot, Google Gemini, Amazon Bedrock) leverage existing user bases, distribution, and sales infrastructure to monetize AI as a feature layered on existing products. The startup advantage is speed and focus; the big tech advantage is distribution and enterprise relationships.',
        },
        {
          question: 'Is AI investing a bubble?',
          answer: 'There are characteristics of speculative excess in AI valuations: OpenAI\'s $90B+ valuation relative to revenue, massive GPU capex with uncertain ROI timelines, and many funded AI startups without clear differentiation. However, the underlying technology is real and the revenue growth at NVIDIA, Microsoft, and Google is genuine. Whether AI investments deliver on their valuations depends on how quickly AI generates measurable productivity gains for enterprise customers — which is the key debate in 2026.',
        },
        {
          question: 'How do AI companies charge for their APIs?',
          answer: 'Most foundation model APIs charge per token — typically measured in thousands of tokens (1K tokens ≈ 750 words). Prices range from $0.0001/1K tokens (small/fast models) to $0.06/1K tokens (GPT-4 turbo for complex tasks). Input tokens are usually cheaper than output tokens. Many companies also offer rate-limited free tiers, subscription-based access with included credits, and enterprise contracts with volume discounts.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
