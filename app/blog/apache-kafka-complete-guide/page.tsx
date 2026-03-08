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
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-complete-guide' },

};

export default function ApacheKafkaCompleteGuide() {
  return <ApacheKafkaCompleteGuideClient />;
}

