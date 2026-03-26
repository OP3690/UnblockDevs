'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function DomainSpecificLanguageModelsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Domain-Specific Language Models — Complete Guide: Fine-Tuning vs RAG vs General LLMs</h1>
      <p className="lead">
        General LLMs like GPT-4 and Claude know a lot about everything but aren't experts in your
        specific domain. Domain-specific language models are trained or adapted for a particular field —
        medical, legal, financial, coding. This guide explains when to build one, how, and when to
        use general models instead.
      </p>

      <StatGrid stats={[
        { value: 'Med-PaLM 2', label: 'Google\'s medical LLM — expert-level medical QA', color: 'blue' },
        { value: 'Harvey AI', label: 'legal domain LLM used by top law firms', right: true, color: 'purple' },
        { value: '3 approaches', label: 'fine-tuning, RAG, or specialized training', color: 'green' },
        { value: '10-100×', label: 'less training data needed vs from scratch', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Domain-Specific Models?" />
      <QuickFact>
        General LLMs struggle with: proprietary terminology, jurisdiction-specific regulations,
        rare domain facts not well-represented in training data, and tasks requiring deep domain
        reasoning. A medical LLM trained on clinical notes outperforms GPT-4 on clinical documentation
        tasks even though GPT-4 is larger.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Better accuracy on domain tasks', description: 'Specialized models achieve higher accuracy on in-domain benchmarks. Med-PaLM 2 passed USMLE Step exams at expert level. General LLMs perform at medical student level.' },
        { title: 'Domain terminology', description: 'Medical abbreviations (MI = myocardial infarction, not Michigan), legal citations (14 U.S.C. §252), financial jargon — domain models understand these precisely.' },
        { title: 'Regulatory compliance', description: 'Healthcare AI must meet HIPAA standards, financial AI must meet SEC requirements. Domain-specific models can be trained and evaluated specifically for regulatory compliance.' },
        { title: 'Cost efficiency', description: 'Smaller, specialized models are cheaper to run than large general models. A 7B medical model can outperform 70B general model on clinical tasks at 1/10th the inference cost.' },
      ]} />

      <SectionHeader number={2} title="Three Approaches to Domain Specialization" />
      <CompareTable
        leftLabel="Approach"
        rightLabel="When to Use"
        rows={[
          { label: 'RAG (Retrieval)', left: 'Add your docs to a knowledge base', right: 'Best for: company knowledge, current info, large doc sets. No training cost.' },
          { label: 'Fine-tuning', left: 'Adapt pre-trained model on domain data', right: 'Best for: domain terminology, response style, task-specific formatting.' },
          { label: 'Domain pre-training', left: 'Train from scratch on domain corpus', right: 'Best for: highly specialized domains needing deep knowledge. Very expensive.' },
        ]}
      />

      <SectionHeader number={3} title="RAG — Retrieval Augmented Generation" />
      <CodeBlock language="python" filename="Domain RAG with LangChain">
{`from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. Load domain documents (e.g., medical guidelines, legal statutes)
loader = PyPDFLoader("clinical_guidelines.pdf")
documents = loader.load()

# 2. Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(documents)

# 3. Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. Create QA chain with domain context
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
    return_source_documents=True
)

# 5. Query with domain knowledge
result = qa_chain.invoke(
    "What is the recommended first-line treatment for Type 2 diabetes in a patient with CKD stage 3?"
)
print(result['result'])
print("Sources:", [doc.metadata['source'] for doc in result['source_documents']])`}
      </CodeBlock>

      <SectionHeader number={4} title="Fine-Tuning for Domain Adaptation" />
      <CodeBlock language="python" filename="LoRA Fine-Tuning for Domain Specialization">
{`from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer
import datasets

# Load base model (7B is sufficient for most domain tasks)
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8b")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8b")

# LoRA config — fine-tune only a small fraction of parameters
lora_config = LoraConfig(
    r=16,                    # rank — controls adapter size
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Trainable params: 4,194,304 (0.18% of 7B) — very efficient!

# Your domain dataset (instruction-response pairs)
dataset = datasets.load_dataset("your-medical-qa-dataset")

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset["train"],
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=4,
        num_train_epochs=3,
        learning_rate=2e-4,
        output_dir="./medical-lora-adapter"
    )
)
trainer.train()`}
      </CodeBlock>

      <SectionHeader number={5} title="Notable Domain-Specific Models" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Medical: Med-PaLM 2 / BioMedLM', description: 'Google\'s Med-PaLM 2 passed USMLE medical licensing exams at expert level. BioMedLM (Stanford) trained on PubMed articles for biomedical QA.' },
        { title: 'Legal: Harvey AI / Lexis AI', description: 'Harvey AI (OpenAI + a16z investment) used by Allen & Overy for contract review. Trained on case law, contracts, and legal reasoning.' },
        { title: 'Finance: BloombergGPT', description: 'Bloomberg trained a 50B parameter model on 40+ years of financial news and data. Outperforms general LLMs on financial NLP tasks.' },
        { title: 'Code: DeepSeek Coder / StarCoder', description: 'Code-specific models trained on GitHub repositories. DeepSeek Coder outperforms GPT-3.5 on code generation benchmarks at a fraction of the cost.' },
      ]} />

      <AlertBox type="tip" title="RAG first, fine-tune second">
        Start with RAG before fine-tuning. RAG is faster to implement, doesn't require training,
        and works well when your domain knowledge is in documents. Fine-tune only when you need the
        model to adopt domain-specific reasoning patterns, terminology, or output format that
        RAG alone cannot provide.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How much domain data do I need for fine-tuning?',
          answer: 'For LoRA/QLoRA fine-tuning, 1,000-10,000 high-quality instruction-response pairs are often sufficient to adapt style and terminology. For deep domain knowledge acquisition, 100K-1M examples help. Quality matters more than quantity — 1,000 expert-curated examples beat 100,000 low-quality ones.',
        },
        {
          question: 'When should I build a domain model vs use GPT-4 with good prompts?',
          answer: 'Use GPT-4 with prompts when: you need general reasoning, your domain is well-represented in public training data, latency/cost are not critical. Build domain models when: you need to process proprietary data that can\'t be sent to external APIs, you need consistent output format, latency/cost at scale matter, or you need to outperform general models on specific benchmarks.',
        },
        {
          question: 'What is the cost of training a domain-specific LLM?',
          answer: 'LoRA/QLoRA fine-tuning of a 7B model on 10K examples: ~$50-200 on cloud GPUs. Full fine-tuning of 7B: ~$500-2,000. Domain pre-training a 7B model from scratch: ~$50K-500K. Medical or legal organizations typically use LoRA fine-tuning of strong base models (Llama 3, Mistral) rather than training from scratch.',
        },
        {
          question: 'Do domain-specific models have fewer hallucinations?',
          answer: 'They can, but it\'s not automatic. Domain models fine-tuned on high-quality expert content hallucinate less on in-domain facts. However, fine-tuning can also increase hallucination confidence — the model sounds more certain about wrong answers. Combine domain fine-tuning with RAG grounding for best factual accuracy.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
