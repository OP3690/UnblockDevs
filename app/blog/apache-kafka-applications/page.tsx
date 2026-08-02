import type { Metadata } from 'next';
import ApacheKafkaApplicationsClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka Applications & Examples | UnblockDevs',
  description: 'Apache Kafka applications in practice: microservices, IoT, real-time analytics, log aggregation, and event-driven systems. Real-world Kafka use cases with practical examples.',
  keywords: [
    'kafka applications',
    'kafka use cases',
    'kafka real world examples',
    'event streaming applications',
    'kafka microservices',
    'kafka iot',
    'kafka analytics',
    'kafka log aggregation',
    'kafka financial systems',
    'kafka event driven architecture',
    'apache kafka examples',
    'what is kafka used for',
    'kafka real time data'
  ],
  openGraph: {
    title: 'Apache Kafka Applications: Real-World Use Cases & Practical Examples',
    description: 'Explore how Apache Kafka is used in real-world systems — microservices, IoT, real-time analytics, log aggregation, and event-driven architectures. Includes practical examples for each use case.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/apache-kafka-applications',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apache%20Kafka%20Applications%3A%20Real-World%20Use%20Cases%20%26%20Examples&emoji=%F0%9F%97%84%EF%B8%8F&desc=Explore%20real-world%20Apache%20Kafka%20applications%3A%20microservices%2C%20IoT%2C%20real-time', width: 1200, height: 630, alt: 'Apache Kafka Applications: Real-World Use Cases & Examples — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka Applications & Examples',
    description: 'Real-world Apache Kafka use cases: microservices, IoT, real-time analytics, log aggregation, and event-driven systems. Practical examples included.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-applications' },
};

export default function ApacheKafkaApplications() {
  return <ApacheKafkaApplicationsClient />;
}

