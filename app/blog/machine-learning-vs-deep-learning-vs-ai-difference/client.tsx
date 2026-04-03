'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
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
        { value: '1950s', label: 'AI concept first defined by Alan Turing', color: 'amber' },
        { value: '1980s', label: 'ML became practically usable', color: 'blue' },
        { value: '2012', label: 'deep learning breakthrough (AlexNet on ImageNet)', color: 'purple' },
        { value: '2022', label: 'LLMs (ChatGPT) go mainstream — 100M users in 2 months', color: 'green' },
      ]} />

      <SectionHeader number={1} title="The Nested Relationship" />
      <QuickFact color="blue" label="The key fact to remember">
        All deep learning is machine learning. All machine learning is AI. But not all AI is machine
        learning, and not all ML is deep learning. They are nested subsets — like circles inside circles.
        Deep learning is simply the most powerful and currently dominant technique within ML.
      </QuickFact>

      <KeyPointsGrid columns={3} items={[
        { title: 'Artificial Intelligence (broadest)', description: 'Any technique that enables machines to mimic human intelligence — reasoning, problem solving, language understanding, perception. Includes rule-based systems, search algorithms, expert systems, and all of ML.' },
        { title: 'Machine Learning (subset of AI)', description: 'AI systems that learn from data instead of following hand-written rules. The algorithm improves automatically with experience. Includes both classical ML and deep learning.' },
        { title: 'Deep Learning (subset of ML)', description: 'ML using multi-layer artificial neural networks. The "deep" refers to the number of layers. Powers image recognition, LLMs, voice assistants. Requires large datasets and GPUs.' },
      ]} />

      <SectionHeader number={2} title="Artificial Intelligence (AI)" />
      <p>
        AI is any technique that enables machines to mimic human intelligence — reasoning, problem solving,
        perception, language understanding. The definition is intentionally broad:
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'Rule-based AI (1950s–1980s)', description: 'Explicit IF-THEN rules written by humans. Chess engines (early ones), expert systems, chatbots with scripted decision trees. No learning from data — rules are hard-coded by engineers.' },
        { title: 'Search-based AI', description: 'Explores possible states to find the best solution. GPS navigation (Dijkstra\'s algorithm), game trees (Minimax for chess), constraint solvers, planning algorithms. Still widely used today.' },
        { title: 'Machine Learning AI (dominant today)', description: 'Learns patterns from data instead of following hand-written rules. Replaces most rule-based systems with learned models. The dominant paradigm since the late 2000s.' },
        { title: 'Generative AI (2020s)', description: 'AI that creates new content — text (GPT-4, Claude), images (DALL-E, Midjourney), code (GitHub Copilot), audio (ElevenLabs). Powered by large deep learning models.' },
      ]} />

      <SectionHeader number={3} title="Machine Learning (ML)" />
      <CompareTable
        leftLabel="Traditional Programming"
        rightLabel="Machine Learning"
        rows={[
          { label: 'What you provide', left: 'Rules + Data → Algorithm produces Answers', right: 'Data + Answers (labels) → Algorithm produces Rules (a model)' },
          { label: 'Spam filtering example', left: 'IF email contains "prize" OR "winner" THEN spam', right: 'Train on 10,000 labeled spam/ham emails → model learns the patterns' },
          { label: 'When rules change', left: 'Engineer manually updates the rules', right: 'Retrain model on new data — adapts automatically' },
          { label: 'Novel situations', left: 'Fails on cases not covered by rules', right: 'Generalizes to new examples (within training distribution)' },
        ]}
      />

      <p>The three main ML learning paradigms:</p>
      <KeyPointsGrid columns={3} items={[
        { title: 'Supervised Learning', description: 'Train on labeled examples (input → known output). Learn a mapping function. Examples: spam detection (email → spam/not spam), price prediction (house features → price), image classification. Most common type.' },
        { title: 'Unsupervised Learning', description: 'Find structure in unlabeled data — no ground truth labels. Examples: customer segmentation (K-means clustering), anomaly detection (isolation forest), dimensionality reduction (PCA, t-SNE).' },
        { title: 'Reinforcement Learning', description: 'Agent learns by trial and error, maximizing cumulative reward through interaction with an environment. Examples: game-playing AI (AlphaGo, OpenAI Five), robot control, recommendation systems, LLM fine-tuning via RLHF.' },
      ]} />

      <SectionHeader number={4} title="Deep Learning (DL)" />
      <AlertBox type="info" title="Why 'deep'?">
        The "depth" refers to the number of layers in the neural network. A network with 2–3 layers is
        shallow. Modern large language models (GPT-4, Claude) have 96–120+ transformer layers and tens
        of billions of parameters. Each layer learns increasingly abstract representations of the input.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'CNNs (Convolutional Neural Networks)', description: 'Specialized for image and spatial data. Learn hierarchical spatial patterns — edges → shapes → objects. Used for: image classification, object detection (YOLO), medical imaging, face recognition.' },
        { title: 'RNNs / LSTMs', description: 'Designed for sequential data with temporal dependencies. Learn patterns across time steps. Used for: time series forecasting, speech recognition. Largely replaced by Transformers for NLP tasks.' },
        { title: 'Transformers', description: 'The dominant architecture since 2017. Self-attention mechanism enables learning long-range dependencies in sequences. Powers GPT-4, Claude, Gemini, BERT, DALL-E. Used in NLP, vision (ViT), audio, and multimodal models.' },
        { title: 'Diffusion Models', description: 'Generative models that learn to reverse a noise-adding process. State of the art for image generation (Stable Diffusion, DALL-E 3, Midjourney). Also applied to audio, video, and 3D generation.' },
      ]} />

      <SectionHeader number={5} title="Key Algorithms by Category" />
      <CompareTable
        leftLabel="Classical ML Algorithms"
        rightLabel="Deep Learning Architectures"
        rows={[
          { label: 'Classification', left: 'Logistic Regression, SVM, Random Forest, XGBoost', right: 'CNN (images), Transformer fine-tuned for classification tasks' },
          { label: 'Regression', left: 'Linear Regression, Gradient Boosting (XGBoost, LightGBM)', right: 'Feedforward neural network, Transformer for tabular data' },
          { label: 'Clustering', left: 'K-Means, DBSCAN, Hierarchical Clustering', right: 'Autoencoders for learned representations, deep clustering' },
          { label: 'NLP / Text', left: 'TF-IDF + Naive Bayes, SVMs with n-gram features', right: 'BERT (understanding), GPT/LLaMA (generation), Transformers' },
          { label: 'Computer Vision', left: 'HOG + SVM, SIFT feature matching', right: 'ResNet, EfficientNet, YOLO, Vision Transformer (ViT)' },
          { label: 'Anomaly Detection', left: 'Isolation Forest, One-Class SVM', right: 'Autoencoders (high reconstruction error = anomaly)' },
        ]}
      />

      <SectionHeader number={6} title="When to Use What" />
      <VerticalSteps steps={[
        { title: 'Small dataset + structured/tabular data → Classical ML', desc: 'XGBoost, Random Forest, or Logistic Regression often beats deep learning when data is limited (< 10K rows). Faster to train, more interpretable, no GPU needed. XGBoost wins most tabular ML competitions.' },
        { title: 'Large dataset + unstructured data → Deep Learning', desc: 'Images, text, audio, video: deep learning excels with millions of examples. CNNs for images, Transformers for text. Requires GPU (NVIDIA A10/A100 or cloud). The gap widens dramatically with more data.' },
        { title: 'Text understanding or generation → LLMs (Transformers)', desc: 'Anything involving natural language: use GPT-4 via API, Claude, or Llama 3 (open source). Fine-tune with LoRA for domain-specific tasks. Don\'t build from scratch — use pre-trained models and adapt them.' },
        { title: 'Tabular/structured business data → Gradient Boosting', desc: 'XGBoost, LightGBM, CatBoost consistently outperform deep learning on tabular data with < 1M rows. Faster training, better interpretability (SHAP values), no GPU required, less hyperparameter sensitivity.' },
        { title: 'No labeled data → Unsupervised Learning', desc: 'K-Means for customer segmentation, DBSCAN for spatial clustering, Isolation Forest for anomaly detection, PCA for dimensionality reduction before visualization or downstream modeling.' },
      ]} />

      <SectionHeader number={7} title="AI Timeline — Key Milestones" />
      <CompareTable
        leftLabel="Year"
        rightLabel="Milestone + Significance"
        rows={[
          { label: '1950', left: 'Turing Test proposed', right: 'Alan Turing proposes the imitation game as a test for machine intelligence — defining the field\'s goal' },
          { label: '1956', left: 'AI field founded', right: 'Dartmouth Conference coins "Artificial Intelligence" — John McCarthy, Marvin Minsky, Claude Shannon' },
          { label: '1986', left: 'Backpropagation', right: 'Rumelhart et al. make neural network training practical — enables multi-layer learning' },
          { label: '1997', left: 'Deep Blue beats Kasparov', right: 'IBM chess engine defeats world champion — landmark rule-based AI milestone' },
          { label: '2012', left: 'AlexNet (deep learning era)', right: 'CNN wins ImageNet by massive margin — GPU-accelerated deep learning proven at scale' },
          { label: '2017', left: 'Transformer architecture', right: '"Attention Is All You Need" — Google paper that powers GPT, BERT, Claude, Gemini' },
          { label: '2022', left: 'ChatGPT launch', right: '100M users in 2 months — LLMs go mainstream; GPT-4, Claude, Gemini follow within 18 months' },
        ]}
      />

      <SectionHeader number={8} title="Python Code: Classical ML vs Deep Learning" />
      <CodeBlock language="python" filename="Same task — two approaches compared">
{`# TASK: Predict if a customer will churn (binary classification)
# Dataset: 50,000 rows, 20 structured features

# ─── Approach 1: Classical ML (XGBoost) ───
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = XGBClassifier(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
)
model.fit(X_train, y_train, eval_set=[(X_test, y_test)], early_stopping_rounds=50)

auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
print(f"XGBoost AUC: {auc:.4f}")  # Likely 0.85-0.92 for structured data
# Training time: < 1 minute on CPU | Interpretable with SHAP

# ─── Approach 2: Deep Learning (PyTorch) ───
import torch
import torch.nn as nn

class ChurnNet(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 256), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(256, 128),       nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(128, 64),        nn.ReLU(),
            nn.Linear(64, 1),          nn.Sigmoid()
        )
    def forward(self, x):
        return self.net(x)

# Training time: 5-20 minutes on GPU | Less interpretable
# For 50K rows tabular data: XGBoost usually wins on AUC AND training speed`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Is ChatGPT machine learning or deep learning?',
          answer: 'Both — and also AI. ChatGPT is based on GPT (Generative Pre-trained Transformer) — a deep learning model (many transformer layers) trained with machine learning techniques (pre-training on text data + RLHF fine-tuning). So it\'s simultaneously deep learning, machine learning, and AI. These labels don\'t conflict — they\'re nested categories.',
        },
        {
          question: 'Do I need to know calculus and linear algebra to work in AI/ML?',
          answer: 'To use ML libraries (scikit-learn, HuggingFace, XGBoost): minimal math needed — understanding concepts is sufficient. To understand what\'s happening under the hood (gradient descent, backpropagation): calculus and linear algebra help significantly. To do ML research or implement architectures from scratch: deep math knowledge is required. For most production ML engineers: strong Python and software engineering skills matter more than academic math.',
        },
        {
          question: 'What is the difference between AI and automation?',
          answer: 'Automation follows explicit, pre-programmed rules — if X happens, do Y. There\'s no learning or adaptation. AI (especially ML) learns from data and handles situations not explicitly programmed. A rule-based email auto-reply is automation. A spam classifier that learns from examples is AI. Modern AI systems combine both: learned models running in automated pipelines.',
        },
        {
          question: 'Is Python required for AI/ML?',
          answer: 'Python is the dominant language for ML — TensorFlow, PyTorch, scikit-learn, HuggingFace, XGBoost are all Python-first. R is common in statistics and academia. Julia is gaining traction for numerical computing performance. For production deployment, ML models are often wrapped in Go or Java APIs for performance. But for model training, experimentation, and research: Python is the practical choice in 2026.',
        },
        {
          question: 'When does deep learning NOT beat classical ML?',
          answer: 'Deep learning underperforms classical ML when: the dataset is small (< 10,000 rows), the features are structured/tabular (not images/text/audio), interpretability is required (XGBoost with SHAP is far more explainable), training budget is limited (XGBoost trains in minutes; deep learning needs hours + GPU), or you need to deploy on edge devices with limited compute. XGBoost wins most real-world tabular prediction competitions even against deep learning.',
        },
        {
          question: 'What is transfer learning and why does it matter?',
          answer: 'Transfer learning is using a model pre-trained on a large dataset as the starting point for a new task. Instead of training from scratch (expensive), you fine-tune the pre-trained weights on your specific data. Examples: fine-tuning BERT on your legal documents for legal NLP, using ResNet pre-trained on ImageNet for medical image classification with 1,000 examples. Transfer learning makes deep learning practical for most organizations that don\'t have Google-scale data or compute budgets.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
