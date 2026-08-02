import type { Metadata } from 'next';
import ApacheKafkaCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka: Complete Guide - What, How, Why | UnblockDevs',
  description: 'Apache Kafka complete guide: architecture, topics, partitions, producers, and consumers. Learn how Kafka event streaming works and when to use it in practice.',
  keywords: [
    'apache kafka',
    'kafka tutorial',
    'kafka architecture',
    'event streaming',
    'kafka producer consumer',
    'kafka topics partitions',
    'distributed messaging',
    'kafka complete guide',
    'how does kafka work',
    'kafka brokers',
    'kafka consumer groups',
    'apache kafka explained',
    'when to use kafka'
  ],
  openGraph: {
    title: 'Apache Kafka Complete Guide: Architecture, Topics, Producers, Consumers & Event Streaming',
    description: 'Everything you need to know about Apache Kafka — how event streaming works, Kafka architecture, topics and partitions, producers and consumers, and best practices for real-world deployments.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/apache-kafka-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apache%20Kafka%3A%20Complete%20Guide%20-%20What%2C%20How%2C%20Why&emoji=%F0%9F%93%9D&desc=Apache%20Kafka%3A%20architecture%2C%20event%20streaming%2C%20topics%2C%20partitions%2C%20producers%2Fconsu', width: 1200, height: 630, alt: 'Apache Kafka: Complete Guide - What, How, Why — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka: Complete Guide - What, How, Why',
    description: 'Apache Kafka explained: architecture, topics, partitions, producers, consumers, and event streaming. Complete guide with best practices included.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-complete-guide' },

};

export default function ApacheKafkaCompleteGuide() {
  return <ApacheKafkaCompleteGuideClient />;
}

