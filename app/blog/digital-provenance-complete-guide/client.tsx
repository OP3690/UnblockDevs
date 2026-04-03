'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function DigitalProvenanceCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Digital Provenance — Complete Guide: Tracking the Origin and History of Digital Content</h1>
      <p className="lead">
        Digital provenance records the origin, ownership, and transformation history of digital content.
        In the AI era, it answers the critical question: "Where did this image, document, or dataset come from,
        was it manipulated, and by whom?" This guide covers the technology, standards, real-world applications,
        and how to implement provenance in your own systems.
      </p>

      <StatGrid stats={[
        { value: 'C2PA', label: 'Coalition for Content Provenance and Authenticity standard', color: 'blue' },
        { value: 'Deepfakes', label: 'primary threat provenance standards address', color: 'red' },
        { value: '2023', label: 'Adobe, Microsoft, Google, TikTok joined C2PA', color: 'green' },
        { value: 'Cryptographic', label: 'signatures make tampering detectable', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Is Digital Provenance?" />
      <QuickFact>
        Digital provenance is the verifiable record of an asset's origin, creation, ownership, and
        modification history. Like art provenance tracks a painting from artist to current owner,
        digital provenance tracks a photo from camera shutter through every edit to publication —
        with cryptographic guarantees that make falsification detectable.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Origin', description: 'Who created it? What device? When? Where? GPS metadata, device fingerprint, and creator identity are all captured at creation time by C2PA-compliant cameras and software.' },
        { title: 'Transformation History', description: 'What edits were made? When? By which software? Was it AI-generated or human-edited? Each modification is recorded as a signed "ingredient" in the manifest.' },
        { title: 'Chain of Custody', description: 'Who owned it between creation and publication? Which platforms served it? Were there unauthorized modifications between steps?' },
        { title: 'Authenticity Verification', description: 'Has the file been tampered with since the provenance record was created? Cryptographic signatures make tampering detectable — even a single pixel change invalidates the signature.' },
      ]} />

      <SectionHeader number={2} title="C2PA — The Content Provenance Standard" />
      <AlertBox type="tip" title="C2PA is backed by Adobe, Microsoft, Google, Arm, Intel, BBC, and TikTok">
        The Coalition for Content Provenance and Authenticity (C2PA) developed an open standard
        for embedding cryptographically signed provenance metadata in digital files. When you see
        a "Content Credentials" badge on an image (the cr icon), it was created with C2PA-compliant tools.
        The standard covers images, videos, audio, and documents.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Capture', desc: 'Camera or device signs image with hardware key at capture time. Leica M11-P and Sony A9 III are the first C2PA-compliant cameras on the market.' },
        { title: 'Edit', desc: 'Editing software (Adobe Photoshop, Lightroom) adds a signed edit manifest. The type of edit (crop, color grade, AI-generated fill) is recorded.' },
        { title: 'Publish', desc: 'Publisher platform (AP, Reuters, press distributor) attaches final credential before distribution. Platforms like LinkedIn and Bing preserve the credentials on upload.' },
        { title: 'Verify', desc: 'Viewer or platform checks the signature chain to verify authenticity. Tools: contentcredentials.org verify tool, Adobe Content Credentials web panel.' },
      ]} />

      <SectionHeader number={3} title="C2PA Manifest Structure" />
      <CodeBlock lang="json" title="C2PA Manifest (Simplified)">{`{
  "@context": "https://schema.c2pa.org/v1",
  "claim": {
    "claim_generator": "Adobe Photoshop 26.0",
    "created": "2026-03-15T10:30:00Z",
    "actions": [
      {
        "action": "c2pa.edited",
        "softwareAgent": "Adobe Photoshop",
        "when": "2026-03-15T10:32:00Z",
        "changes": ["color_grade", "crop"]
      },
      {
        "action": "c2pa.placed",
        "when": "2026-03-15T10:35:00Z",
        "ingredients": [
          {
            "title": "original-photo.jpg",
            "relationship": "parentOf",
            "hash": "sha256:abc123..."
          }
        ]
      }
    ],
    "assertions": [
      {
        "label": "c2pa.training-mining",
        "data": {
          "entries": {
            "c2pa.ai_generative_training": "notAllowed",
            "c2pa.data_mining": "notAllowed"
          }
        }
      },
      {
        "label": "stds.schema-org.CreativeWork",
        "data": {
          "author": [{"@type": "Person", "name": "Jane Photographer"}],
          "copyrightNotice": "© 2026 Jane Photographer"
        }
      }
    ]
  },
  "signature": {
    "alg": "ES256",
    "issuer": "Adobe Systems Inc",
    "cert_chain": "..."
  }
}`}</CodeBlock>

      <SectionHeader number={4} title="Applications of Digital Provenance" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Deepfake Detection', description: 'Authentic media from C2PA-compliant cameras carries verifiable origin signatures. Content without a valid signature is flagged as potentially AI-generated or tampered. This is especially critical for political content and news.' },
        { title: 'Journalism and News', description: 'AP, Reuters, and BBC are implementing C2PA to verify photo authenticity before publication. Readers can check Content Credentials to verify photos are real and not manipulated.' },
        { title: 'AI Training Consent', description: 'C2PA manifests include "do not use for AI training" flags. AI developers who respect provenance can automatically filter out content where creators opted out — a direct response to creator concerns about AI training data.' },
        { title: 'NFTs and Digital Art', description: 'NFT provenance on blockchain tracks ownership transfers immutably. Combines with C2PA for complete creation-to-ownership records that survive across platforms and marketplaces.' },
        { title: 'Data Pipeline Lineage', description: 'The data engineering equivalent of digital provenance: where did this dataset come from, what transformations were applied, and are the results reproducible? Tools: dbt lineage graphs, Apache Atlas, OpenLineage.' },
        { title: 'Scientific Data', description: 'Research data provenance ensures experiments are reproducible. It records input data, code version, parameters, and output. Prevents data fabrication and makes peer review more rigorous.' },
      ]} />

      <SectionHeader number={5} title="Implementing Basic Provenance Tracking" />
      <CodeBlock lang="python" title="Basic provenance metadata for data pipelines">{`import hashlib
import json
from datetime import datetime
from dataclasses import dataclass, field, asdict
from typing import List, Optional

@dataclass
class ProvenanceRecord:
    """Track the provenance of a data artifact"""
    asset_id: str
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    created_by: str = ""
    source_files: List[str] = field(default_factory=list)
    transformations: List[dict] = field(default_factory=list)
    content_hash: Optional[str] = None

    def add_transformation(self, name: str, tool: str, params: dict = None):
        self.transformations.append({
            "name": name,
            "tool": tool,
            "timestamp": datetime.utcnow().isoformat(),
            "params": params or {}
        })

    def compute_hash(self, file_path: str) -> str:
        """Compute SHA-256 hash of file content"""
        sha256 = hashlib.sha256()
        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(65536), b''):
                sha256.update(chunk)
        self.content_hash = sha256.hexdigest()
        return self.content_hash

    def save(self, output_path: str):
        """Save provenance record alongside the artifact"""
        with open(output_path, 'w') as f:
            json.dump(asdict(self), f, indent=2)

# Usage example: tracking a dataset transformation
prov = ProvenanceRecord(
    asset_id="customer-dataset-2026-03",
    created_by="data-pipeline-v2",
    source_files=["raw/customers_march_2026.csv"]
)
prov.add_transformation("normalize_emails", "pandas", {"lowercase": True})
prov.add_transformation("remove_duplicates", "pandas", {"subset": ["email"]})
prov.add_transformation("anonymize_pii", "faker", {"fields": ["phone", "address"]})
prov.compute_hash("output/customers_clean.parquet")
prov.save("output/customers_clean.provenance.json")
print(f"Provenance saved. Hash: {prov.content_hash[:16]}...")`}</CodeBlock>

      <SectionHeader number={6} title="Data Lineage vs Digital Provenance" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Digital Provenance (Media)', description: 'Tracks images, videos, and documents. Standard: C2PA, IPTC metadata. Verification: cryptographic signatures. Use case: deepfake detection, authenticity verification, creator attribution.' },
        { title: 'Data Lineage (Analytics)', description: 'Tracks datasets, tables, and models through transformations. Standard: OpenLineage, Apache Atlas. Verification: audit logs and version control. Use case: regulatory compliance, pipeline debugging.' },
        { title: 'OpenLineage Standard', description: 'An open standard for metadata and lineage collection with integrations for Apache Spark, Airflow, dbt, and Flink. Enables cross-system lineage tracking across the entire data stack.' },
        { title: 'Content Credentials', description: 'Adobe\'s implementation of C2PA. Available in Photoshop, Lightroom, Firefly. The cr icon on images indicates verified Content Credentials. Verify at contentcredentials.org.' },
      ]} />

      <SectionHeader number={7} title="Preserving Provenance Across Platforms" />
      <AlertBox type="warning" title="Social media platforms handle C2PA inconsistently">
        LinkedIn, Bing, TikTok, and Adobe Stock preserve C2PA Content Credentials. Instagram and
        Facebook do not yet. Twitter/X strips EXIF metadata on upload. The C2PA spec allows for
        "soft binding" where the claim is stored externally and linked by content hash — enabling
        provenance recovery even after metadata stripping. Check c2pa.org for the latest platform
        support status.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Can provenance metadata be stripped from images?',
          answer: 'Yes — standard EXIF metadata can be stripped with any image editor. C2PA addresses this differently: the signature covers a hash of the file content. If the file is modified or metadata stripped, the signature becomes invalid — which itself is a signal that provenance was tampered with. C2PA also supports "hard binding" (embedding in the file) and "soft binding" (external registry linked by hash) for different resilience needs.',
        },
        {
          question: 'How does C2PA relate to AI image watermarking?',
          answer: 'C2PA metadata is cryptographically signed but can be stripped. Invisible watermarking (SynthID from Google, C2PA invisible watermarks) embeds provenance signals into the pixel values themselves — detectable even after cropping, resizing, and format conversion. The two approaches complement each other: C2PA for structured metadata, watermarking for robustness against stripping.',
        },
        {
          question: 'Is digital provenance the same as blockchain?',
          answer: 'No — though both track history. Blockchain stores provenance records in a distributed ledger. C2PA embeds provenance in the file itself with a certificate authority signing model (like HTTPS). NFTs use blockchain specifically for ownership provenance. C2PA doesn\'t require blockchain and is more practical for mass media deployment at scale.',
        },
        {
          question: 'How do I add C2PA credentials to images I create?',
          answer: 'If using Adobe tools (Photoshop, Lightroom, Firefly), Content Credentials are added automatically when you enable "Attach Content Credentials" in preferences. For programmatic use, the C2PA Rust SDK and Python bindings are available open source at github.com/contentauth/c2pa-rs. The SDK lets you create and verify C2PA manifests in your own applications.',
        },
        {
          question: 'What is OpenLineage and how does it relate to data provenance?',
          answer: 'OpenLineage is an open standard for lineage metadata collection at the job level — it captures inputs, outputs, and the transformation between them for every data job that runs. Tools like Apache Airflow, dbt, and Spark have OpenLineage integrations. Data platforms (Marquez, DataHub) collect and visualize this lineage to give a complete map of how data flows through your system.',
        },
        {
          question: 'Can digital provenance be faked?',
          answer: 'C2PA provenance requires a valid certificate from a trusted certificate authority (like Adobe or device manufacturers). An attacker cannot create a forged signature without access to the private key. However, they could present content without any provenance (which signals it may be unverified) or use compromised credentials (rare but possible). C2PA is not perfect security — it is much better than no provenance tracking at all.',
        },
        {
          question: 'How does provenance help with AI-generated content regulations?',
          answer: 'Regulatory proposals in the EU AI Act and US executive orders on AI require labeling of AI-generated content. C2PA provides the technical mechanism: AI generation tools (Adobe Firefly, DALL-E, Midjourney) can embed a c2pa.created action with the AI tool as the creator. Verification tools can then identify AI-generated content and display appropriate labels to viewers.',
        },
        {
          question: 'What is the difference between provenance and watermarking?',
          answer: 'Provenance is structured metadata describing origin and history, typically stored in the file container or in an external registry. Watermarking embeds imperceptible signals directly in the content pixels or audio samples. Provenance is easy to strip by removing metadata. Watermarks are harder to remove and survive format conversions. Both have roles — use provenance for rich structured information and watermarking for robustness.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
