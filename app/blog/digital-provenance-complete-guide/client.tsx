'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, FlowDiagram,
} from '@/components/blog/BlogVisuals';

export default function DigitalProvenanceCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Digital Provenance — Complete Guide: Tracking the Origin and History of Digital Content</h1>
      <p className="lead">
        Digital provenance records the origin, ownership, and transformation history of digital content.
        In the AI era, it answers the critical question: "Where did this image/document/data come from,
        was it manipulated, and by whom?" This guide covers the technology, standards, and applications.
      </p>

      <StatGrid stats={[
        { value: 'C2PA', label: 'Coalition for Content Provenance and Authenticity standard', color: 'blue' },
        { value: 'Deepfakes', label: 'primary threat provenance standards address', color: 'red' },
        { value: '2023', label: 'Adobe, Microsoft, Google joined C2PA', color: 'green' },
        { value: 'Metadata', label: 'signed and embedded in files at creation time', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Is Digital Provenance?" />
      <QuickFact>
        Digital provenance is the verifiable record of an asset's origin, creation, ownership, and
        modification history. Like art provenance tracks a painting from artist to current owner,
        digital provenance tracks a photo from camera shutter through every edit to publication —
        with cryptographic guarantees.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Origin', description: 'Who created it? What device? When? Where? (GPS metadata, device fingerprint, creator identity)' },
        { title: 'Transformation History', description: 'What edits were made? When? By which software? AI-generated or human-edited? Each modification is recorded as a signed "ingredient".' },
        { title: 'Chain of Custody', description: 'Who owned it between creation and publication? Which platforms served it? Were there unauthorized modifications?' },
        { title: 'Authenticity Verification', description: 'Has the file been tampered with since the provenance record was created? Cryptographic signatures make tampering detectable.' },
      ]} />

      <SectionHeader number={2} title="C2PA — The Content Provenance Standard" />
      <AlertBox type="tip" title="C2PA is backed by Adobe, Microsoft, Google, Arm, Intel, and BBC">
        The Coalition for Content Provenance and Authenticity (C2PA) developed an open standard
        for embedding cryptographically signed provenance metadata in digital files. When you see
        a "Content Credentials" badge on an image, it was created with C2PA-compliant tools.
      </AlertBox>

      <FlowDiagram
        title="C2PA Provenance Flow"
        steps={[
          { label: 'Capture', description: 'Camera/device signs image with hardware key at capture time' },
          { label: 'Edit', description: 'Editing software (Photoshop, Lightroom) adds signed edit manifest' },
          { label: 'Publish', description: 'Publisher platform attaches final credential before distribution' },
          { label: 'Verify', description: 'Viewer/platform checks signature chain to verify authenticity' },
        ]}
      />

      <SectionHeader number={3} title="C2PA Manifest Structure" />
      <CodeBlock language="json" filename="C2PA Manifest (Simplified)">
{`{
  "@context": "https://schema.c2pa.org/v1",
  "claim": {
    "claim_generator": "Adobe Photoshop 25.0",
    "created": "2026-03-15T10:30:00Z",
    "actions": [
      {
        "action": "c2pa.edited",
        "softwareAgent": "Adobe Photoshop",
        "when": "2026-03-15T10:32:00Z",
        "changes": ["color_grade", "crop"]
      }
    ],
    "assertions": [
      {
        "label": "c2pa.training-mining",
        "data": {
          "entries": {
            "c2pa.ai_generative_training": "notAllowed"
          }
        }
      }
    ]
  },
  "signature": {
    "alg": "ES256",
    "issuer": "Adobe Systems Inc",
    "cert_chain": "..."
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Applications of Digital Provenance" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Deepfake Detection', description: 'Authentic media from C2PA-compliant cameras carries verifiable origin signatures. Content without a valid signature is flagged as potentially AI-generated or tampered.' },
        { title: 'Journalism and News', description: 'AP, Reuters, and BBC are implementing C2PA to verify photo authenticity before publication. Readers can check Content Credentials to verify photos are real.' },
        { title: 'AI Training Consent', description: 'C2PA manifests can include "do not use for AI training" flags. AI developers who respect provenance can filter out content where creators opted out.' },
        { title: 'NFTs and Digital Art', description: 'NFT provenance on blockchain tracks ownership transfers immutably. Combines with C2PA for complete creation-to-ownership record.' },
        { title: 'Data Pipeline Lineage', description: 'Data engineering equivalent: where did this dataset come from, what transformations were applied, and are the results reproducible? dbt lineage graphs provide data provenance.' },
        { title: 'Scientific Data', description: 'Research data provenance ensures experiments are reproducible. Records input data, code version, parameters, and output. Prevents data fabrication in peer-reviewed science.' },
      ]} />

      <SectionHeader number={5} title="Data Lineage vs Digital Provenance" />
      <CompareTable
        leftLabel="Digital Provenance (Media)"
        rightLabel="Data Lineage (Analytics)"
        rows={[
          { label: 'What it tracks', left: 'Images, videos, documents', right: 'Datasets, tables, models' },
          { label: 'Standard', left: 'C2PA, IPTC metadata', right: 'OpenLineage, Apache Atlas' },
          { label: 'Verification', left: 'Cryptographic signatures', right: 'Audit logs, version control' },
          { label: 'Use case', left: 'Deepfake detection, authenticity', right: 'Regulatory compliance, debugging pipelines' },
          { label: 'Tools', left: 'Adobe Content Credentials, Truepic', right: 'dbt, Apache Atlas, DataHub, Marquez' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Can provenance metadata be stripped from images?',
          answer: 'Yes — standard EXIF metadata can be stripped with any image editor. C2PA addresses this differently: the signature covers a hash of the file content. If the file is modified or metadata stripped, the signature becomes invalid — which itself is a signal that provenance was tampered with.',
        },
        {
          question: 'Do social media platforms preserve C2PA metadata?',
          answer: 'Increasingly yes. LinkedIn, Bing, TikTok, and Adobe Stock preserve C2PA Content Credentials. Instagram and Facebook do not yet. Twitter/X strips EXIF metadata on upload. The C2PA spec allows for "soft binding" where the claim is stored externally and linked by content hash, enabling provenance recovery even after stripping.',
        },
        {
          question: 'How does C2PA relate to AI image watermarking?',
          answer: 'C2PA metadata is cryptographically signed but can be stripped. Invisible watermarking (SynthID from Google, C2PA invisible watermarks) embeds provenance signals into the pixel values themselves — detectable even after cropping, resizing, and format conversion. The two approaches complement each other.',
        },
        {
          question: 'Is digital provenance the same as blockchain?',
          answer: 'No — though both track history. Blockchain stores provenance records in a distributed ledger. C2PA embeds provenance in the file itself with a certificate authority signing model (like HTTPS). NFTs use blockchain specifically for ownership provenance. C2PA doesn\'t require blockchain and is more practical for mass media deployment.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
