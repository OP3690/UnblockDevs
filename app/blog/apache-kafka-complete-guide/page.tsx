import type { Metadata } from 'next';
import ApacheKafkaCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka: Complete Guide - What, How, Why | UnblockDevs',
  description: 'Apache Kafka: architecture, event streaming, topics, partitions, producers/consumers. How it works, best practices.',
  keywords: [
    'apache kafka',
    'kafka tutorial',
    'kafka architecture',
    'event streaming',
    'kafka producer consumer',
    'kafka topics partitions',
    'distributed messaging'
  ],
  openGraph: {
    title: 'Apache Kafka: Complete Guide - What, How, Why',
    description: 'Apache Kafka: architecture, event streaming, topics, partitions,',
    type: 'article',
    url: 'https://unblockdevs.com/blog/apache-kafka-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apache%20Kafka%3A%20Complete%20Guide%20-%20What%2C%20How%2C%20Why&emoji=%F0%9F%93%A1&desc=Apache%20Kafka%3A%20architecture%2C%20event%20streaming%2C%20topics%2C%20partitions%2C', width: 1200, height: 630, alt: 'Apache Kafka: Complete Guide - What, How, Why — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka: Complete Guide - What, How, Why',
    description: 'Apache Kafka: architecture, event streaming, topics, partitions,',
    images: ['https://unblockdevs.com/api/og?title=Apache%20Kafka%3A%20Complete%20Guide%20-%20What%2C%20How%2C%20Why&emoji=%F0%9F%93%A1&desc=Apache%20Kafka%3A%20architecture%2C%20event%20streaming%2C%20topics%2C%20partitions%2C'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-complete-guide' },

};

export default function ApacheKafkaCompleteGuide() {
  return <ApacheKafkaCompleteGuideClient />;
}

