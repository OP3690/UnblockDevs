import type { Metadata } from 'next';
import ApacheKafkaApplicationsClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka Applications & Examples | UnblockDevs',
  description: 'Explore real-world Apache Kafka applications: microservices, IoT, real-time analytics, log aggregation, financial systems, and event-driven architectures with practical examples.',
  keywords: [
    'kafka applications',
    'kafka use cases',
    'kafka real world examples',
    'event streaming applications',
    'kafka microservices',
    'kafka iot',
    'kafka analytics'
  ],
  openGraph: {
    title: 'Apache Kafka Applications: Real-World Use Cases & Examples | UnblockDevs',
    description: 'Explore real-world Apache Kafka applications: microservices, IoT, real-time analytics, log aggregation, financial systems, and event-driven architectures with practical examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/apache-kafka-applications',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-applications' },
};

export default function ApacheKafkaApplications() {
  return <ApacheKafkaApplicationsClient />;
}

