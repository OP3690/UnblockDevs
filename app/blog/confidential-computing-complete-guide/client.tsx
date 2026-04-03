'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function ConfidentialComputingCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Confidential Computing — Complete Guide: How to Protect Data In Use</h1>
      <p className="lead">
        Encryption protects data at rest and in transit — but what about while it's being processed?
        Confidential computing uses hardware-based Trusted Execution Environments (TEEs) to protect
        data even while it's being computed on, keeping it secret from cloud providers, hypervisors,
        and even the OS. This guide covers TEE technologies, attestation, and real-world use cases.
      </p>

      <StatGrid stats={[
        { value: '3 states', label: 'of data: at rest, in transit, in use', color: 'blue' },
        { value: 'TEE', label: 'Trusted Execution Environment — the core technology', color: 'purple' },
        { value: 'Intel SGX', label: 'most widely deployed TEE technology', color: 'green' },
        { value: 'Zero trust', label: 'even the cloud provider cannot see your data', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Problem: Data In Use Is Exposed" />
      <QuickFact color="red" label="The gap in traditional encryption">
        Even with full-disk encryption and TLS in transit, when your application processes data, it is
        decrypted in memory. The OS kernel, hypervisor, cloud provider operations staff, and any other
        compromised process on the same physical machine can potentially access that plaintext memory.
        Confidential computing closes this gap with hardware-enforced memory isolation.
      </QuickFact>

      <CompareTable
        leftLabel="Traditional Cloud"
        rightLabel="Confidential Computing"
        rows={[
          { label: 'Data at rest', left: 'Encrypted with AES-256', right: 'Encrypted (same — no change)' },
          { label: 'Data in transit', left: 'Encrypted with TLS 1.3', right: 'Encrypted (same — no change)' },
          { label: 'Data in use', left: 'Plaintext in memory — exposed to OS and hypervisor', right: 'Encrypted in TEE — CPU decrypts only inside the enclave boundary' },
          { label: 'Cloud provider trust', left: 'Must trust cloud provider staff and infrastructure', right: 'Zero-trust — provider cannot access data even with physical server access' },
          { label: 'Hypervisor access', left: 'Can read VM memory at any time', right: 'Hardware blocks hypervisor from reading enclave memory' },
          { label: 'Rogue admin attack', left: 'Root access → memory dump → plaintext data', right: 'Root access still cannot read encrypted enclave memory' },
        ]}
      />

      <SectionHeader number={2} title="How TEEs Work" />
      <VerticalSteps steps={[
        { title: 'Secure enclave is created', desc: 'The CPU creates an isolated memory region (the enclave) that is encrypted by the Memory Encryption Engine. This happens at hardware level — the CPU uses a key that is only known to itself, stored in protected fuses, never accessible to software.' },
        { title: 'Code and data loaded', desc: 'The application code and sensitive data are loaded into the enclave. Everything inside is encrypted in DRAM. The CPU transparently decrypts when executing code and re-encrypts when writing back to memory — all in the CPU die, invisible to the rest of the system.' },
        { title: 'Attestation proves integrity', desc: 'Before sending sensitive data to the enclave, you remotely verify: is the expected code running? Is it on genuine hardware? Is the hardware firmware up to date? This cryptographic proof prevents MitM attacks.' },
        { title: 'Secure channel established', desc: 'After attestation succeeds, a TLS-like secure channel is established directly to the enclave, bypassing the untrusted OS. Sensitive data is sent only through this verified channel.' },
        { title: 'Computation in isolation', desc: 'The enclave processes data with complete hardware isolation. Even DMA attacks are blocked. The hypervisor, kernel, other VMs, and cloud provider cannot observe memory contents during computation.' },
        { title: 'Results returned securely', desc: 'Results are returned through the secure channel, re-encrypted before leaving the enclave. Keys and intermediate state are destroyed when the enclave closes — no data leaks to the untrusted environment.' },
      ]} />

      <SectionHeader number={3} title="TEE Technologies" />
      <CompareTable
        leftLabel="Technology"
        rightLabel="Description"
        rows={[
          { label: 'Intel SGX', left: 'Application-level TEE — process isolation', right: 'Fine-grained memory isolation, strong attestation. ~256MB EPC limit (expandable with SGX2). High overhead for large workloads.' },
          { label: 'AMD SEV-SNP', left: 'VM-level TEE — full VM isolation', right: 'Entire VM is confidential. Larger memory, lower overhead (~5-10%). Strong attestation. Available on Azure, GCP, AWS.' },
          { label: 'ARM TrustZone', left: 'Processor-level TEE — two worlds', right: 'Splits processor into Secure/Normal worlds. Used in smartphones, IoT, payment terminals. Qualcomm Secure Execution Environment built on TrustZone.' },
          { label: 'Intel TDX', left: 'VM-level TEE (Intel\'s SEV equivalent)', right: 'Confidential VMs on 4th gen+ Intel Xeon. Lower overhead than SGX. Emerging cloud support.' },
          { label: 'AWS Nitro Enclaves', left: 'Cloud-native enclave', right: 'Isolated EC2 enclaves with no persistent storage, no external networking. Attestation via AWS KMS. AWS-specific.' },
          { label: 'Google Confidential Space', left: 'Container-based confidential computing', right: 'Runs container workloads in AMD SEV-SNP. Integrates with Google Cloud Attestation and Workload Identity Federation.' },
        ]}
      />

      <SectionHeader number={4} title="Attestation — Proving the Enclave is Trusted" />
      <AlertBox type="tip" title="Attestation is what makes TEEs genuinely trustworthy">
        Attestation lets you cryptographically verify: (1) the exact code running in the enclave matches
        what you expect (code integrity), (2) the enclave is on genuine hardware with a valid CPU, and
        (3) the firmware and microcode are up to date (no known vulnerabilities). Verify this before sending
        any sensitive data to the enclave — without attestation, you're trusting blindly.
      </AlertBox>

      <CodeBlock language="python" filename="Intel SGX Remote Attestation Flow">
{`# Simplified attestation flow using Intel SGX + DCAP
# Real implementation uses gramine, Open Enclave SDK, or Fortanix EDP

# 1. Request a quote from the enclave
from sgx import Enclave

enclave = Enclave("my_secure_app.signed.so")
quote = enclave.get_quote()  # Signed by Intel SGX hardware

# 2. Verify the quote with Intel PCCS (Provisioning Certificate Caching Service)
import requests

response = requests.post(
    "https://api.trustedservices.intel.com/sgx/dev/attestation/v4/report",
    json={"isvEnclaveQuote": quote.base64()},
    headers={"Ocp-Apim-Subscription-Key": INTEL_API_KEY}
)

attestation_report = response.json()

# 3. Verify the attestation report
assert attestation_report["isvEnclaveQuoteStatus"] == "OK"
assert attestation_report["platformInfoBlob"]["tcbStatus"] == "UP_TO_DATE"

# What you've now verified:
# - The enclave contains exactly the code you compiled (MRENCLAVE hash matches)
# - It's running on a genuine Intel SGX processor
# - The firmware has no known vulnerabilities (TCB is up to date)

# 4. Now safe to establish a TLS channel and send sensitive data
enclave.establish_secure_channel()
enclave.send_secret_data(sensitive_payload)`}
      </CodeBlock>

      <SectionHeader number={5} title="Use Cases for Confidential Computing" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Multi-Party Computation', description: 'Multiple organizations compute on combined datasets without revealing raw data to each other. Example: banks collaborating on fraud detection models using combined transaction data without exposing customer records to competitors.' },
        { title: 'AI Model Protection', description: 'Run AI inference on sensitive data (medical imaging, financial records) without exposing either the patient data or the proprietary model weights to the cloud provider. The TEE sees both — no one else does.' },
        { title: 'Regulated Data Processing', description: 'Process HIPAA-regulated medical records or GDPR-sensitive personal data in public cloud without violating data residency and access requirements. Attestation provides the audit trail for compliance.' },
        { title: 'Cryptocurrency Key Management', description: 'Store and sign transactions with private keys that never leave the TEE — even in memory. Coinbase, Anchorage, and institutional custodians use TEEs for this to prevent insider theft and server compromise.' },
        { title: 'Federated Learning Privacy', description: 'Train ML models across distributed data sources. Each participant\'s gradient updates are computed in a TEE — the aggregation server sees encrypted gradients, preventing reverse-engineering of training data.' },
        { title: 'Secure Database Queries', description: 'Query encrypted databases where the query planner runs inside a TEE. The planner decrypts only the data needed for the query result, then re-encrypts. Examples: CipherCore, Microsoft Always Encrypted with secure enclaves.' },
      ]} />

      <SectionHeader number={6} title="Cloud Provider Support" />
      <CompareTable
        leftLabel="Cloud Provider"
        rightLabel="Confidential Computing Offering"
        rows={[
          { label: 'Microsoft Azure', left: 'Most mature offering', right: 'Confidential VMs (AMD SEV-SNP, Intel TDX), Confidential Containers (AKS), Azure Attestation Service, SGX VMs (DCsv3 series)' },
          { label: 'Google Cloud', left: 'Strong AMD SEV integration', right: 'Confidential VMs (AMD SEV-SNP), Confidential GKE Nodes, Confidential Space (container workloads), Confidential Dataflow' },
          { label: 'AWS', left: 'Nitro-based architecture', right: 'AWS Nitro Enclaves (isolated EC2 partitions), Nitro System hardware security, AWS KMS integration for attestation' },
          { label: 'IBM Cloud', left: 'LinuxONE + SGX', right: 'Hyper Protect Services (LinuxONE), SGX-enabled bare metal, Hyper Protect DBaaS (confidential managed DB)' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is the performance overhead of confidential computing?',
          answer: 'Depends heavily on the TEE technology: Intel SGX has significant overhead — context switches between enclave and normal world are expensive (10,000+ cycles), and the limited EPC memory (256MB) causes page swapping for larger workloads. Expect 2-10× overhead for SGX. AMD SEV-SNP and Intel TDX work at VM granularity and have much lower overhead (~5-15%) because the entire VM is encrypted without per-call context switching. AWS Nitro Enclaves have minimal overhead — isolation is at the CPU partition level.',
        },
        {
          question: 'Is confidential computing the same as homomorphic encryption?',
          answer: 'No — they solve similar problems differently. Homomorphic encryption (HE) allows computation on ciphertext without ever decrypting — purely software-based, no special hardware. It\'s theoretically elegant but extremely slow: 1,000-10,000× slower than plaintext computation. Only feasible for simple operations like additions. Confidential computing (TEEs) decrypts inside protected hardware in real-time, with near-native performance. TEEs are practical and widely deployed today; FHE is a research area with limited production use.',
        },
        {
          question: 'Which cloud providers support confidential computing?',
          answer: 'Azure has the most mature and broad offering: SGX VMs (DCsv3 series), AMD SEV-SNP VMs (DCasv5 series), Intel TDX VMs, Confidential Containers in AKS, and Azure Attestation Service. GCP supports AMD SEV-SNP Confidential VMs and Confidential GKE Nodes. AWS offers Nitro Enclaves and the entire Nitro System provides hardware security guarantees. IBM Cloud offers Hyper Protect Services on LinuxONE. All three major providers support attestation.',
        },
        {
          question: 'Does confidential computing protect against side-channel attacks?',
          answer: 'Partially. TEEs protect against direct memory access attacks (no process/hypervisor/cloud can read enclave memory). They are NOT fully immune to: timing side-channels (cache timing attacks), power analysis, and speculative execution attacks (Spectre/Meltdown variants targeting SGX have been demonstrated in research). Hardware vendors continuously release microcode patches for known attacks. For maximum security: combine TEEs with software mitigations (constant-time code, cache flushing), keep firmware updated, and monitor security advisories.',
        },
        {
          question: 'What is the difference between SEV, SEV-ES, and SEV-SNP?',
          answer: 'Three generations of AMD\'s Secure Encrypted Virtualization: SEV (2016) — VM memory is encrypted, preventing hypervisor from reading VM memory. SEV-ES (2020) — also encrypts CPU register state on context switch, preventing hypervisor from reading register contents. SEV-SNP (2021) — adds Secure Nested Paging which prevents integrity attacks (prevents hypervisor from remapping memory pages to attack the VM). SEV-SNP is the current production standard for confidential VMs and is what Azure, GCP, and AWS use for their confidential VM offerings.',
        },
        {
          question: 'How do I choose between SGX and SEV-SNP for my workload?',
          answer: 'Choose Intel SGX for: fine-grained isolation of specific sensitive functions (key management, crypto operations), when you want minimal TCB (trusted computing base), or when the sensitive data fits within 256MB. Choose AMD SEV-SNP for: protecting entire VM workloads with minimal code changes, large memory requirements (>256MB), lower performance overhead, or when you want to run existing applications without SGX SDK changes. SGX requires significant application refactoring; SEV-SNP is nearly transparent to the application.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
