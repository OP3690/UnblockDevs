'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function MLvsDLvsAIClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>AI vs Machine Learning vs Deep Learning — The Actual Difference Explained</h1>
      <p className="lead">
        These three terms are used interchangeably by the media — but they mean different things.
        AI is the broadest concept. Machine learning is a subset of AI. Deep learning is a subset of ML.
        This guide explains each precisely, with the key algorithms and where each is used.
      </p>

      <StatGrid stats={[
        { value: '1950s', label: 'AI concept first defined', color: 'amber' },
        { value: '1980s', label: 'ML became practical', color: 'blue' },
        { value: '2012', label: 'deep learning breakthrough (AlexNet)', color: 'purple' },
        { value: '2022', label: 'LLMs (ChatGPT) go mainstream', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Nested Relationship" />
      <ArchDiagram
        boxes={[
          { label: 'Artificial Intelligence\n(any machine mimicking human intelligence)', color: 'blue' },
          { label: 'Machine Learning\n(learns from data without explicit programming)', color: 'purple' },
          { label: 'Deep Learning\n(multi-layer neural networks)', color: 'green' },
        ]}
        arrows={['⊃', '⊃']}
      />

      <QuickFact>
        All deep learning is machine learning. All machine learning is AI. But not all AI is machine learning,
        and not all ML is deep learning. The nested relationship is key to understanding the field.
      </QuickFact>

      <SectionHeader number={2} title="Artificial Intelligence (AI)" />
      <p>
        AI is any technique that enables machines to mimic human intelligence — reasoning, problem solving,
        perception, language understanding. The definition intentionally broad:
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'Rule-based AI (1950s-1980s)', description: 'Explicit IF-THEN rules written by humans. Chess engines, expert systems, chatbots with scripted responses. No learning from data.' },
        { title: 'Search-based AI', description: 'Explores possible states to find a solution. GPS navigation, game trees (Minimax), constraint solvers. Still widely used.' },
        { title: 'Machine Learning AI', description: 'Learns patterns from data instead of following hand-written rules. The dominant paradigm since the 2000s.' },
        { title: 'Generative AI (2020s)', description: 'AI that creates new content (text, images, code, audio). GPT-4, DALL-E, Stable Diffusion. Powered by deep learning.' },
      ]} />

      <SectionHeader number={3} title="Machine Learning (ML)" />
      <p>
        ML is a subset of AI where systems <strong>learn from data</strong>. Instead of writing rules
        explicitly, you provide labeled examples and the algorithm learns the patterns.
      </p>

      <CompareTable
        leftLabel="Traditional Programming"
        rightLabel="Machine Learning"
        rows={[
          { label: 'Input', left: 'Rules + Data', right: 'Data + Answers (labels)' },
          { label: 'Output', left: 'Answers', right: 'Rules (model)' },
          { label: 'Example', left: 'IF email contains "prize" → spam', right: 'Train on 10,000 spam/ham examples → model learns' },
          { label: 'Rule changes', left: 'Human rewrites rules manually', right: 'Retrain model on new data' },
        ]}
      />

      <p>The three main ML paradigms:</p>
      <KeyPointsGrid columns={3} items={[
        { title: 'Supervised Learning', description: 'Learn from labeled examples. Spam detection, price prediction, image classification. Most common type.' },
        { title: 'Unsupervised Learning', description: 'Find structure in unlabeled data. Clustering customers, anomaly detection, dimensionality reduction.' },
        { title: 'Reinforcement Learning', description: 'Agent learns by trial and error, maximizing reward. Game-playing AI (AlphaGo), robotics, recommendation systems.' },
      ]} />

      <SectionHeader number={4} title="Deep Learning (DL)" />
      <p>
        Deep learning uses <strong>artificial neural networks</strong> with many layers (hence "deep").
        Each layer learns increasingly abstract representations. The breakthrough was using GPUs to train
        networks with millions of parameters on massive datasets.
      </p>

      <AlertBox type="info" title="Why 'deep'?">
        The "depth" refers to the number of layers in the neural network. A network with 2-3 layers is shallow.
        Modern large language models (GPT-4, Claude) have hundreds of layers and billions of parameters.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'CNNs (Convolutional Neural Networks)', description: 'Specialized for image data. Learns spatial patterns. Used for: image classification, object detection, medical imaging.' },
        { title: 'RNNs / LSTMs', description: 'Designed for sequences. Learns temporal patterns. Used for: time series, speech recognition (now largely replaced by Transformers).' },
        { title: 'Transformers', description: 'The architecture behind GPT, BERT, Claude, Gemini. Attention mechanism enables long-range dependencies. Dominates NLP and increasingly vision.' },
        { title: 'GANs / Diffusion Models', description: 'Generative models. GANs (two competing networks). Diffusion (DALL-E, Stable Diffusion) for images. Power today\'s generative AI.' },
      ]} />

      <SectionHeader number={5} title="Key Algorithms by Category" />
      <CompareTable
        leftLabel="ML Algorithms (Traditional)"
        rightLabel="Deep Learning Architectures"
        rows={[
          { label: 'Classification', left: 'Logistic Regression, SVM, Random Forest', right: 'CNN, Transformer fine-tuned for classification' },
          { label: 'Regression', left: 'Linear Regression, Gradient Boosting (XGBoost)', right: 'Feedforward neural network' },
          { label: 'Clustering', left: 'K-Means, DBSCAN, Hierarchical', right: 'Autoencoders, deep clustering' },
          { label: 'NLP', left: 'TF-IDF, Naive Bayes, SVMs', right: 'BERT, GPT, LLaMA, T5 (Transformers)' },
          { label: 'Computer Vision', left: 'HOG, SIFT features + SVM', right: 'ResNet, YOLO, Vision Transformer (ViT)' },
        ]}
      />

      <SectionHeader number={6} title="When to Use What" />
      <VerticalSteps steps={[
        {
          title: 'Small dataset + structured data → Classical ML',
          description: 'XGBoost, Random Forest, or even Logistic Regression often beats deep learning when data is limited. Faster, interpretable.',
        },
        {
          title: 'Large dataset + unstructured data → Deep Learning',
          description: 'Images, text, audio: deep learning excels with millions of examples. GPU required.',
        },
        {
          title: 'Text understanding/generation → Transformers (LLMs)',
          description: 'Anything involving natural language: GPT-4, Claude, Llama. Use via API or fine-tune.',
        },
        {
          title: 'Tabular/structured business data → Gradient Boosting',
          description: 'XGBoost, LightGBM, CatBoost consistently win Kaggle tabular competitions and most real business problems.',
        },
        {
          title: 'No labeled data → Unsupervised / Clustering',
          description: 'K-Means for segmentation, isolation forest for anomaly detection, PCA for dimensionality reduction.',
        },
      ]} />

      <SectionHeader number={7} title="AI Timeline" />
      <TimelineViz events={[
        { year: '1950', title: 'Turing Test', description: 'Alan Turing proposes the imitation game as a test for machine intelligence.', color: 'blue' },
        { year: '1956', title: 'AI Field Founded', description: 'Dartmouth Conference coins "Artificial Intelligence" as a field.', color: 'blue' },
        { year: '1986', title: 'Backpropagation', description: 'Rumelhart et al. publish backprop, making neural network training practical.', color: 'purple' },
        { year: '1997', title: 'Deep Blue Beats Kasparov', description: 'IBM\'s chess engine defeats world champion — rule-based AI milestone.', color: 'amber' },
        { year: '2012', title: 'AlexNet', description: 'Deep CNN wins ImageNet by a huge margin — deep learning era begins.', color: 'green' },
        { year: '2017', title: 'Attention Is All You Need', description: 'Google publishes the Transformer architecture that powers all modern LLMs.', color: 'green' },
        { year: '2022', title: 'ChatGPT Launch', description: '100M users in 2 months — AI goes mainstream. GPT-4, Claude, Gemini follow.', color: 'green' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Is ChatGPT machine learning or deep learning?',
          answer: 'Both. ChatGPT is based on GPT (Generative Pre-trained Transformer) — a deep learning model (many transformer layers) trained with machine learning techniques (supervised learning on text + RLHF). So it\'s deep learning AND machine learning AND AI.',
        },
        {
          question: 'Do I need to know calculus and linear algebra to work in AI/ML?',
          answer: 'To use ML libraries (scikit-learn, HuggingFace): not much math needed. To understand what\'s happening under the hood (optimization, backprop): yes, calculus and linear algebra help. To do research: you need them deeply. To build production ML systems: engineering skills matter more.',
        },
        {
          question: 'What is the difference between AI and automation?',
          answer: 'Automation follows explicit, pre-programmed rules — if X then Y. AI (especially ML) learns from data and handles situations not explicitly programmed. A rule-based email filter is automation. A spam classifier that learns from examples is AI.',
        },
        {
          question: 'Is Python required for AI/ML?',
          answer: 'Python is the dominant language for ML (TensorFlow, PyTorch, scikit-learn, HuggingFace are all Python-first). R is common for statistics. Julia is gaining traction for performance. But for most practitioners: Python is the practical choice.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
