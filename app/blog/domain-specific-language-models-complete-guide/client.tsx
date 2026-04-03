'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function DomainSpecificLanguageModelsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Domain-Specific Language Models — Complete Guide: Fine-Tuning vs RAG vs General LLMs</h1>
      <p className="lead">
        General LLMs like GPT-4 and Claude know a lot about everything but aren't experts in your
        specific domain. Domain-specific language models are trained or adapted for a particular field —
        medical, legal, financial, coding. This guide explains when to build one, the three main
        approaches, real-world examples, and how to choose the right strategy for your use case.
      </p>

      <StatGrid stats={[
        { value: 'Med-PaLM 2', label: 'Google\'s medical LLM — expert-level USMLE performance', color: 'blue' },
        { value: 'Harvey AI', label: 'legal domain LLM used by top 100 law firms', color: 'purple' },
        { value: '3 approaches', label: 'RAG, fine-tuning, or domain pre-training', color: 'green' },
        { value: '10-100×', label: 'less training data needed for fine-tuning vs from scratch', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Domain-Specific Models?" />
      <QuickFact color="blue" label="The specialization advantage">
        General LLMs struggle with: proprietary terminology, jurisdiction-specific regulations,
        rare domain facts not well-represented in public training data, and tasks requiring deep domain
        reasoning. A medical LLM trained on clinical notes outperforms GPT-4 on clinical documentation
        tasks — even though GPT-4 is a significantly larger model.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Better accuracy on domain tasks', description: 'Specialized models achieve higher accuracy on in-domain benchmarks. Med-PaLM 2 passed USMLE Step exams at expert physician level. General LLMs perform at medical student level on the same tests. Domain specialization delivers measurable accuracy gains.' },
        { title: 'Domain terminology precision', description: 'Medical abbreviations (MI = myocardial infarction, not Michigan or million), legal citations (14 U.S.C. §252), financial jargon (EBITDA, basis points, convexity) — domain models understand these with the precision required for professional use.' },
        { title: 'Regulatory compliance readiness', description: 'Healthcare AI must meet HIPAA standards, financial AI must align with SEC and FINRA requirements. Domain-specific models can be trained on compliant data, evaluated on regulatory benchmarks, and deployed within compliant infrastructure.' },
        { title: 'Cost and latency efficiency', description: 'Smaller, specialized models are cheaper to run. A 7B parameter medical model can outperform a 70B general model on clinical tasks at 1/10th the inference cost and 3-5x lower latency. Critical for high-volume production deployments.' },
      ]} />

      <SectionHeader number={2} title="Three Approaches to Domain Specialization" />
      <CompareTable
        leftLabel="Approach"
        rightLabel="When to Use + Trade-offs"
        rows={[
          { label: 'RAG (Retrieval-Augmented Generation)', left: 'Add domain docs to a knowledge base — no model training', right: 'Best first choice. No training cost, handles large doc sets, knowledge stays current. Weaker at terminology and reasoning patterns.' },
          { label: 'Fine-tuning (LoRA/QLoRA)', left: 'Adapt a pre-trained model on domain instruction pairs', right: 'Best for: domain terminology, output format/style, task-specific reasoning. Needs 1K-100K examples. $50-$2000 cost.' },
          { label: 'Domain pre-training', left: 'Continue pre-training on massive domain corpus', right: 'Best for deep domain knowledge (BloombergGPT on 40 years of financial text). Very expensive ($50K-$500K). Rarely necessary.' },
        ]}
      />

      <SectionHeader number={3} title="RAG — Retrieval Augmented Generation" />
      <CodeBlock language="python" filename="Domain RAG with LangChain">
{`from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# 1. Load domain documents (medical guidelines, legal statutes, product manuals)
loader = DirectoryLoader('./domain_docs/', glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()
print(f"Loaded {len(documents)} document pages")

# 2. Split into chunks that fit in context window
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,      # overlap preserves context across chunks
    separators=["\\n\\n", "\\n", ". "]  # prefer semantic boundaries
)
chunks = splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks")

# 3. Embed and store in vector database
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
vectorstore = Chroma.from_documents(
    chunks, embeddings,
    persist_directory="./domain_vectorstore"
)

# 4. Domain-specific prompt that enforces professional standards
domain_prompt = PromptTemplate(
    template="""You are a clinical decision support assistant.
Use ONLY the following clinical guidelines to answer.
If the guidelines don't cover this case, say so explicitly.
Never provide medical advice not supported by the referenced guidelines.

Context from clinical guidelines:
{context}

Clinical question: {question}

Evidence-based answer:""",
    input_variables=["context", "question"]
)

# 5. Create retrieval chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o", temperature=0),  # low temp for factual domain tasks
    retriever=vectorstore.as_retriever(
        search_type="mmr",  # maximal marginal relevance — diverse chunks
        search_kwargs={"k": 5, "fetch_k": 20}
    ),
    chain_type_kwargs={"prompt": domain_prompt},
    return_source_documents=True
)

# 6. Query with domain knowledge
result = qa_chain.invoke({
    "query": "First-line treatment for Type 2 diabetes with CKD stage 3 and eGFR 45?"
})
print(result['result'])
print("\\nSources cited:")
for doc in result['source_documents']:
    print(f"  - {doc.metadata.get('source', 'Unknown')}: {doc.page_content[:100]}...")`}
      </CodeBlock>

      <SectionHeader number={4} title="Fine-Tuning for Domain Adaptation" />
      <CodeBlock language="python" filename="LoRA Fine-Tuning for Domain Specialization">
{`from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
from datasets import load_dataset

# Load base model — 7-8B is sufficient for most domain tasks
base_model = "meta-llama/Meta-Llama-3-8B-Instruct"
model = AutoModelForCausalLM.from_pretrained(base_model, torch_dtype="auto", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(base_model)

# LoRA config — fine-tune only a fraction of parameters (very efficient)
lora_config = LoraConfig(
    r=16,                        # rank — higher = more capacity, more memory
    lora_alpha=32,               # scaling factor (typically 2x rank)
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],  # attention layers
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 20,971,520 || all params: 8,051,240,960 || trainable%: 0.26%
# Only 0.26% of parameters are updated — very memory-efficient!

# Domain dataset: instruction-response pairs in your domain
# Format: [{"instruction": "...", "response": "..."}]
dataset = load_dataset("json", data_files={
    "train": "medical_qa_train.jsonl",
    "test": "medical_qa_test.jsonl"
})

def format_instruction(sample):
    """Format as instruction-following prompt"""
    return f"""<|begin_of_text|><|start_header_id|>user<|end_header_id|>
{sample['instruction']}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
{sample['response']}<|eot_id|>"""

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    formatting_func=format_instruction,
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,       # effective batch size = 16
        num_train_epochs=3,
        learning_rate=2e-4,
        lr_scheduler_type="cosine",
        warmup_ratio=0.05,
        fp16=True,
        evaluation_strategy="steps",
        eval_steps=100,
        save_steps=100,
        output_dir="./medical-llama3-lora",
        logging_steps=10,
    )
)

trainer.train()
model.save_pretrained("./medical-llama3-lora-final")`}
      </CodeBlock>

      <SectionHeader number={5} title="Notable Domain-Specific Models" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Medical: Med-PaLM 2 / BioMedLM', description: 'Google\'s Med-PaLM 2 achieved expert-level performance on USMLE medical licensing exams. BioMedLM (Stanford) trained on PubMed articles for biomedical QA. OpenBioLLM (Saama AI) is an open-source option fine-tuned on medical instruction data.' },
        { title: 'Legal: Harvey AI / Lexis AI', description: 'Harvey AI (backed by OpenAI and a16z, used by Allen & Overy and Cravath) handles contract drafting, legal research, and due diligence. Lexis AI integrates directly into LexisNexis research platform with legal citation grounding.' },
        { title: 'Finance: BloombergGPT / FinGPT', description: 'BloombergGPT (50B parameters) trained on 40+ years of Bloomberg financial news and data. Outperforms general LLMs on financial sentiment analysis, named entity recognition in financial text, and market commentary generation.' },
        { title: 'Code: DeepSeek Coder / StarCoder 2', description: 'DeepSeek Coder-V2 outperforms GPT-4 on code generation benchmarks at significantly lower cost. StarCoder 2 (15B) is fully open-source and permissively licensed. Both trained specifically on GitHub code repositories with high-quality filtering.' },
      ]} />

      <SectionHeader number={6} title="Choosing the Right Approach for Your Use Case" />
      <VerticalSteps steps={[
        { title: 'Start with prompt engineering on a general LLM', desc: 'Before building anything, test whether a well-crafted system prompt with few-shot examples on GPT-4 or Claude achieves acceptable accuracy. Many "domain specialization" problems are actually prompt engineering problems. This takes hours vs weeks, costs nothing to build, and is easy to update. Only move to RAG or fine-tuning if this fails.' },
        { title: 'Add RAG if your domain knowledge is in documents', desc: 'If the problem is that the general LLM doesn\'t know your specific documents (internal guidelines, regulations, product specs, case law), RAG is the answer. Index your documents in a vector database, retrieve relevant chunks at query time, inject them into the prompt. No training required — knowledge stays current as you update documents.' },
        { title: 'Fine-tune when RAG isn\'t enough', desc: 'RAG fails when: the model doesn\'t understand domain terminology well enough to reason about retrieved content, you need specific output format/style that prompting can\'t reliably achieve, or you have thousands of training examples and need consistent in-context behavior. LoRA/QLoRA fine-tuning of a 7-8B model is the standard approach — cost-effective and reversible.' },
        { title: 'Consider domain pre-training only for deep specialization', desc: 'Domain pre-training (continuing training on massive domain corpus before fine-tuning) makes sense when your domain is poorly represented in general training data (highly specialized scientific fields, proprietary technical documentation, non-English low-resource languages) and you have access to 10B+ tokens of domain text. This is BloombergGPT territory — most organizations don\'t need this.' },
        { title: 'Evaluate rigorously on domain-specific benchmarks', desc: 'General benchmarks (MMLU, HumanEval) don\'t measure domain performance. Build or use existing domain benchmarks: USMLE for medical, LexGLUE for legal, FinanceBench for finance. If benchmarks don\'t exist, create a held-out test set of 200-500 expert-annotated examples. Track accuracy, hallucination rate, and citation accuracy separately.' },
      ]} />

      <AlertBox type="tip" title="RAG first, fine-tune second">
        Start with RAG before fine-tuning. RAG is faster to implement, doesn't require ML training
        infrastructure, handles large doc sets that wouldn't fit in fine-tuning data, and the knowledge
        base stays current as you add documents. Fine-tune only when you need the model to internalize
        domain-specific reasoning patterns or terminology that RAG prompting alone cannot provide consistently.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How much domain data do I need for fine-tuning?',
          answer: 'For LoRA/QLoRA fine-tuning of style, terminology, and output format: 1,000-10,000 high-quality instruction-response pairs are often sufficient. For acquiring genuine domain knowledge: 100K-1M examples help significantly. Quality matters more than quantity — 1,000 expert-curated examples beat 100,000 low-quality ones. Start small and evaluate; add more data if accuracy plateaus below your target.',
        },
        {
          question: 'When should I build a domain model vs use GPT-4 with good prompts?',
          answer: 'Use GPT-4 with prompts when: accuracy with prompting is already acceptable, your domain is well-represented in public training data, latency and cost are not critical, and you need frequent updates to knowledge. Build domain models when: you must process proprietary data that can\'t be sent to external APIs, you need sub-100ms latency at scale, fine-tuned accuracy meaningfully exceeds prompted GPT-4, or regulatory requirements mandate on-premises deployment.',
        },
        {
          question: 'What is the cost of fine-tuning a domain-specific LLM?',
          answer: 'LoRA/QLoRA fine-tuning of a 7-8B model on 10K examples: $50-200 on cloud GPUs (single A100 for a few hours). Full fine-tuning of 7B: $500-2,000. Domain pre-training of 7B: $50K-500K. Inference costs: a self-hosted 7B model on one A10G GPU costs ~$0.30/hr — much cheaper than GPT-4 at $10-30 per million tokens for high-volume use cases.',
        },
        {
          question: 'Do domain-specific models hallucinate less?',
          answer: 'Domain fine-tuning can reduce hallucinations on in-domain facts — the model has seen the correct information many times during training. However, fine-tuning can also increase hallucination confidence — the model sounds more certain about wrong answers. The best approach: combine domain fine-tuning with RAG grounding. Fine-tuning provides domain terminology and reasoning patterns; RAG provides factual grounding that prevents fabrication.',
        },
        {
          question: 'Can I use open-source models for domain fine-tuning?',
          answer: 'Yes — Llama 3 (Meta), Mistral 7B, Qwen 2.5, and Phi-3 are all permissively licensed for commercial use. These are the standard bases for domain fine-tuning. Llama 3 Instruct and Mistral Instruct variants start from a strong instruction-following baseline, requiring less fine-tuning data to achieve domain adaptation. Run them on your own infrastructure for full data privacy.',
        },
        {
          question: 'How do I evaluate a domain-specific LLM objectively?',
          answer: 'Create a held-out test set of 200-500 examples that experts have answered correctly. For accuracy: automated comparison with correct answers (exact match, ROUGE, or LLM-as-judge). For hallucination: check if every factual claim is grounded in source documents (citation accuracy). For domain terminology: test on terminology recognition tasks. Compare your domain model against the general baseline on the same test set — the delta is your specialization gain.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
