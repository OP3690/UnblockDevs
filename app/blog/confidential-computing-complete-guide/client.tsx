'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function ConfidentialComputingCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Confidential Computing — Complete Guide: How to Protect Data In Use</h1>
      <p className="lead">
        Encryption protects data at rest and in transit — but what about while it's being processed?
        Confidential computing uses hardware-based Trusted Execution Environments (TEEs) to protect
        data even while it's being computed on, keeping it secret from cloud providers, hypervisors,
        and even the OS.
      </p>

      <StatGrid stats={[
        { value: '3 states', label: 'of data: at rest, in transit, in use', color: 'blue' },
        { value: 'TEE', label: 'Trusted Execution Environment — the core technology', color: 'purple' },
        { value: 'Intel SGX', label: 'most widely deployed TEE technology', color: 'green' },
        { value: 'Zero trust', label: 'even the cloud provider can\'t see your data', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Problem: Data In Use Is Exposed" />
      <QuickFact>
        Even with full-disk encryption and TLS, when your application processes data, the data is
        decrypted in memory. The OS, hypervisor, cloud provider, and any compromised process on the
        same machine can potentially access that memory. Confidential computing solves this with
        hardware-enforced memory isolation.
      </QuickFact>

      <CompareTable
        leftLabel="Traditional Cloud"
        rightLabel="Confidential Computing"
        rows={[
          { label: 'Data at rest', left: 'Encrypted (AES-256)', right: 'Encrypted (same)' },
          { label: 'Data in transit', left: 'Encrypted (TLS 1.3)', right: 'Encrypted (same)' },
          { label: 'Data in use', left: 'Plaintext in memory', right: 'Encrypted in TEE — CPU decrypts only inside enclave' },
          { label: 'Cloud provider trust', left: 'Must trust cloud provider', right: 'Zero-trust — provider cannot access data' },
          { label: 'Hypervisor', left: 'Can access VM memory', right: 'Cannot access enclave memory' },
          { label: 'Rogue admin', left: 'Can dump memory', right: 'Cannot read enclave memory even with root access' },
        ]}
      />

      <SectionHeader number={2} title="How TEEs Work" />
      <ArchDiagram
        title="Trusted Execution Environment Architecture"
        layers={[
          { name: 'Untrusted World (Normal Execution)', components: ['Operating System', 'Hypervisor', 'Other Processes', 'Cloud Provider Infrastructure'] },
          { name: 'TEE Boundary (Hardware Enforced)', components: ['Memory Encryption Engine', 'Attestation Service', 'Secure Key Storage'] },
          { name: 'Trusted Execution Environment (Enclave)', components: ['Encrypted Memory Region', 'Application Code', 'Sensitive Data', 'Cryptographic Keys'] },
        ]}
      />

      <SectionHeader number={3} title="TEE Technologies" />
      <CompareTable
        leftLabel="Technology"
        rightLabel="Description"
        rows={[
          { label: 'Intel SGX', left: 'Application-level TEE', right: 'Fine-grained memory isolation, attestation. Widely supported. Limited EPC memory (~256MB).' },
          { label: 'AMD SEV-SNP', left: 'VM-level TEE', right: 'Entire VM is confidential. Larger memory, easier to use than SGX. Strong on AMD EPYC.' },
          { label: 'ARM TrustZone', left: 'Processor-level TEE', right: 'Splits processor into secure/non-secure worlds. Used in mobile devices and IoT.' },
          { label: 'Intel TDX', left: 'VM-level TEE (Intel)', right: 'Intel\'s answer to AMD SEV. Confidential VMs on Intel Xeon 4th gen+.' },
          { label: 'AWS Nitro Enclaves', left: 'Cloud-native TEE', right: 'Isolated EC2 enclaves. No persistent storage, no external networking. AWS-specific.' },
        ]}
      />

      <SectionHeader number={4} title="Attestation — Proving the Enclave is Trusted" />
      <AlertBox type="tip" title="Attestation is what makes TEEs truly trustworthy">
        Attestation lets you cryptographically verify that: (1) the correct code is running in the
        enclave, (2) the enclave is running on genuine hardware, and (3) the hardware is in a secure
        state. You can verify this remotely before sending sensitive data to the enclave.
      </AlertBox>

      <CodeBlock language="python" filename="Intel SGX Remote Attestation Flow">
{`# Simplified attestation flow using Intel SGX + DCAP

# 1. Request a quote from the enclave
from sgx import Enclave

enclave = Enclave("my_secure_app.signed.so")
quote = enclave.get_quote()  # Signed by Intel SGX hardware

# 2. Send quote to Intel's attestation service for verification
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

# 4. Now safe to send sensitive data to the verified enclave
enclave.send_secret_data(sensitive_payload)`}
      </CodeBlock>

      <SectionHeader number={5} title="Use Cases for Confidential Computing" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Multi-Party Computation', description: 'Multiple organizations compute on combined datasets without revealing their raw data to each other. Banks analyzing fraud patterns together without sharing customer records.' },
        { title: 'AI Model Protection', description: 'Run AI inference on sensitive data (medical, financial) without exposing either the data or the model weights to the cloud provider.' },
        { title: 'Regulated Data Processing', description: 'Process HIPAA-regulated medical records or GDPR-sensitive personal data in the cloud without violating data residency and access requirements.' },
        { title: 'Cryptocurrency Key Management', description: 'Store and sign transactions with private keys that never leave the TEE — even in memory. Used by custodians like Coinbase and Anchorage.' },
        { title: 'Federated Learning', description: 'Train ML models across distributed data sources. Each participant\'s gradient updates are computed in a TEE, preventing reverse-engineering of training data.' },
        { title: 'Secure Database Queries', description: 'Query encrypted databases — the query planner runs inside a TEE, decrypts only what\'s needed, returns encrypted results. Examples: Ciphercore, CipherBase.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the performance overhead of confidential computing?',
          answer: 'Intel SGX has significant overhead — context switches between enclave and normal world are expensive, and the limited EPC memory causes page swapping. Expect 2-10× overhead for SGX workloads. AMD SEV and Intel TDX have much lower overhead (~5-10%) since they work at VM granularity rather than application level.',
        },
        {
          question: 'Is confidential computing the same as homomorphic encryption?',
          answer: 'No — they solve similar problems differently. Homomorphic encryption allows computation on ciphertext without decrypting. It\'s purely software-based and extremely slow (1000-10,000× overhead). Confidential computing (TEEs) decrypts inside protected hardware. TEEs are practical today; homomorphic encryption is currently only feasible for simple operations.',
        },
        {
          question: 'Which cloud providers support confidential computing?',
          answer: 'Azure: Confidential VMs (AMD SEV-SNP, Intel TDX), Confidential Containers, Azure Attestation. AWS: Nitro Enclaves, Nitro System. GCP: Confidential VMs (AMD SEV). All three support attestation services. Azure has the most mature offering with the broadest service coverage.',
        },
        {
          question: 'Does confidential computing protect against side-channel attacks?',
          answer: 'Partially. TEEs protect against direct memory access attacks. They are NOT fully immune to timing attacks, power analysis, or speculative execution attacks (Spectre/Meltdown variants targeting SGX have been demonstrated). Hardware vendors continuously patch these. For highest security, combine TEEs with software mitigations.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
