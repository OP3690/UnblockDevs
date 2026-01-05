import type { Metadata } from 'next';
import ApacheKafkaCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka: Complete Guide - What, How, Why | UnblockDevs',
  description: 'Comprehensive guide to Apache Kafka: architecture, how it works, why it matters, real-world applications, and best practices. Learn about event streaming, topics, partitions, and producers/consumers.',
  keywords: [
    'apache kafka',
    'kafka tutorial',
    'kafka architecture',
    'event streaming',
    'kafka producer consumer',
    'kafka topics partitions',
    'distributed messaging'
  ],
};

export default function ApacheKafkaCompleteGuide() {
  return <ApacheKafkaCompleteGuideClient />;
}

