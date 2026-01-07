'use client';

import { useState } from 'react';
import { Database, Copy, Check, Download, Users, FileText, CreditCard, ShoppingBag, Newspaper, Sparkles, Server, Shield, Brain, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

type PredefinedDataType = 'user' | 'invoice' | 'banking' | 'accessories' | 'news' | 'apiLogs' | 'securityEvents' | 'aiTraining' | 'systemLogs' | 'vulnerabilities' | 'aiMetrics' | 'custom';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Sanchez',
  'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams'
];

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'example.com'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'GA'];
const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico'];

const productCategories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Automotive', 'Health', 'Beauty', 'Food'];
const brands = ['TechCorp', 'FashionHub', 'HomeStyle', 'SportMax', 'BookWorld', 'ToyLand', 'AutoPro', 'HealthPlus', 'BeautyCare', 'FoodMart'];

const invoiceStatuses = ['pending', 'paid', 'overdue', 'cancelled', 'refunded'];
const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash', 'Check', 'Cryptocurrency'];

const transactionTypes = ['deposit', 'withdrawal', 'transfer', 'payment', 'refund', 'fee', 'interest'];
const accountTypes = ['checking', 'savings', 'credit', 'investment', 'loan'];

const newsCategories = ['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics', 'World', 'Local', 'Opinion'];
const newsSources = ['Reuters', 'AP News', 'BBC', 'CNN', 'TechCrunch', 'The Verge', 'Wired', 'Forbes', 'Bloomberg', 'WSJ'];

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
const httpStatusCodes = [200, 201, 204, 400, 401, 403, 404, 500, 502, 503];
const apiEndpoints = ['/api/users', '/api/products', '/api/orders', '/api/auth', '/api/payments', '/api/analytics', '/api/reports', '/api/settings'];
const userAgents = ['Mozilla/5.0', 'Chrome/120.0', 'Safari/17.0', 'Firefox/121.0', 'Postman/10.0', 'curl/7.88', 'Python-requests/2.31'];

const securityEventTypes = ['login_attempt', 'failed_login', 'suspicious_activity', 'data_access', 'permission_change', 'file_upload', 'malware_detected', 'brute_force', 'sql_injection', 'xss_attempt'];
const threatLevels = ['low', 'medium', 'high', 'critical'];
const ipAddresses = ['192.168.1.', '10.0.0.', '172.16.0.', '203.0.113.', '198.51.100.'];

const aiModelTypes = ['GPT-4', 'GPT-3.5', 'Claude', 'Llama', 'BERT', 'ResNet', 'Transformer', 'GAN', 'RNN', 'CNN'];
const trainingStatuses = ['training', 'completed', 'failed', 'paused', 'validating'];
const datasets = ['ImageNet', 'COCO', 'SQuAD', 'GLUE', 'MNIST', 'CIFAR-10', 'WikiText', 'Common Crawl', 'Books3', 'The Pile'];

const logLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const systemComponents = ['auth-service', 'payment-gateway', 'user-service', 'api-gateway', 'database', 'cache', 'queue', 'storage', 'cdn', 'monitoring'];
const logMessages = [
  'Connection established',
  'Request processed successfully',
  'Database query executed',
  'Cache hit',
  'Rate limit exceeded',
  'Memory usage high',
  'Disk space low',
  'Service started',
  'Service stopped',
  'Configuration reloaded'
];

const vulnerabilityTypes = ['SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass', 'Privilege Escalation', 'Path Traversal', 'Remote Code Execution', 'Information Disclosure', 'DoS', 'Broken Access Control'];
const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
const cveIds = ['CVE-2024-', 'CVE-2023-', 'CVE-2022-'];
const remediationStatuses = ['open', 'in_progress', 'patched', 'mitigated', 'false_positive'];

const aiMetricsTypes = ['accuracy', 'precision', 'recall', 'f1_score', 'loss', 'latency', 'throughput', 'token_count', 'cost', 'inference_time'];

const generateUserData = (count: number) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    users.push({
      id: `user-${String(i + 1).padStart(6, '0')}`,
      firstName,
      lastName,
      email,
      phone,
      age: Math.floor(Math.random() * 50) + 18,
      city,
      state,
      country,
      zipCode: Math.floor(Math.random() * 90000) + 10000,
      registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: Math.random() > 0.2,
      role: Math.random() > 0.7 ? 'admin' : Math.random() > 0.5 ? 'premium' : 'user'
    });
  }
  return users;
};

const generateInvoiceData = (count: number) => {
  const invoices = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const subtotal = Math.floor(Math.random() * 5000) + 100;
    const tax = Math.round(subtotal * 0.1 * 100) / 100;
    const total = subtotal + tax;
    const status = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const date = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    
    invoices.push({
      id: `INV-${String(i + 1).padStart(6, '0')}`,
      customerName: `${firstName} ${lastName}`,
      customerEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      invoiceNumber: `INV-${date.getFullYear()}-${String(i + 1).padStart(5, '0')}`,
      date: date.toISOString().split('T')[0],
      dueDate: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      currency: 'USD',
      status,
      paymentMethod,
      items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, idx) => ({
        itemId: `ITEM-${i + 1}-${idx + 1}`,
        description: `Product ${idx + 1}`,
        quantity: Math.floor(Math.random() * 5) + 1,
        unitPrice: (Math.random() * 500 + 10).toFixed(2),
        total: (Math.random() * 2000 + 50).toFixed(2)
      }))
    });
  }
  return invoices;
};

const generateBankingData = (count: number) => {
  const transactions = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const amount = Math.random() * 10000;
    const date = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    
    transactions.push({
      id: `TXN-${String(i + 1).padStart(8, '0')}`,
      accountNumber: `****${Math.floor(Math.random() * 9000) + 1000}`,
      accountHolder: `${firstName} ${lastName}`,
      accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
      transactionType: type,
      amount: amount.toFixed(2),
      currency: 'USD',
      balance: (Math.random() * 50000 + 1000).toFixed(2),
      date: date.toISOString().split('T')[0],
      timestamp: date.toISOString(),
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} transaction`,
      merchant: type === 'payment' ? `${brands[Math.floor(Math.random() * brands.length)]} Store` : null,
      reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: Math.random() > 0.1 ? 'completed' : 'pending'
    });
  }
  return transactions;
};

const generateAccessoriesData = (count: number) => {
  const accessories = [];
  const accessoryTypes = ['Phone Case', 'Charger', 'Headphones', 'Screen Protector', 'Stand', 'Cable', 'Adapter', 'Power Bank', 'Keyboard', 'Mouse'];
  
  for (let i = 0; i < count; i++) {
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const type = accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = Math.random() * 200 + 10;
    const stock = Math.floor(Math.random() * 500);
    
    accessories.push({
      id: `ACC-${String(i + 1).padStart(6, '0')}`,
      name: `${brand} ${type}`,
      category,
      type,
      brand,
      sku: `SKU-${brand.toUpperCase().substr(0, 3)}-${String(i + 1).padStart(6, '0')}`,
      price: price.toFixed(2),
      currency: 'USD',
      stock,
      inStock: stock > 0,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 1000),
      color: ['Black', 'White', 'Blue', 'Red', 'Silver', 'Gold'][Math.floor(Math.random() * 6)],
      material: ['Plastic', 'Metal', 'Leather', 'Silicone', 'Fabric'][Math.floor(Math.random() * 5)],
      warranty: `${Math.floor(Math.random() * 3) + 1} year${Math.floor(Math.random() * 3) + 1 > 1 ? 's' : ''}`,
      description: `High-quality ${type.toLowerCase()} from ${brand} for your devices.`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  return accessories;
};

const generateNewsData = (count: number) => {
  const news = [];
  const headlines = [
    'Breaking: Major Technology Breakthrough Announced',
    'Market Update: Stocks Reach New Highs',
    'Sports: Championship Game Scheduled',
    'Entertainment: New Movie Release Date Confirmed',
    'Health: New Study Reveals Important Findings',
    'Science: Researchers Make Significant Discovery',
    'Politics: Policy Changes Announced',
    'World: International Summit Concludes',
    'Local: Community Event This Weekend',
    'Opinion: Expert Analysis on Current Events'
  ];
  
  for (let i = 0; i < count; i++) {
    const category = newsCategories[Math.floor(Math.random() * newsCategories.length)];
    const source = newsSources[Math.floor(Math.random() * newsSources.length)];
    const headline = headlines[Math.floor(Math.random() * headlines.length)];
    const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    news.push({
      id: `NEWS-${String(i + 1).padStart(6, '0')}`,
      headline,
      category,
      source,
      author: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      date: date.toISOString().split('T')[0],
      timestamp: date.toISOString(),
      views: Math.floor(Math.random() * 100000),
      likes: Math.floor(Math.random() * 5000),
      shares: Math.floor(Math.random() * 1000),
      readingTime: `${Math.floor(Math.random() * 10) + 3} min`,
      excerpt: `This is a sample excerpt for the news article about ${category.toLowerCase()}. The article discusses important developments and provides insights into current events.`,
      tags: [category, source.split(' ')[0], 'breaking', 'news'].slice(0, 3),
      featured: Math.random() > 0.7,
      published: Math.random() > 0.1
    });
  }
  return news;
};

const generateApiLogsData = (count: number) => {
  const logs = [];
  for (let i = 0; i < count; i++) {
    const method = httpMethods[Math.floor(Math.random() * httpMethods.length)];
    const endpoint = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
    const statusCode = httpStatusCodes[Math.floor(Math.random() * httpStatusCodes.length)];
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const ip = `${ipAddresses[Math.floor(Math.random() * ipAddresses.length)]}${Math.floor(Math.random() * 255)}`;
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const responseTime = Math.floor(Math.random() * 500) + 10;
    const requestSize = Math.floor(Math.random() * 5000) + 100;
    const responseSize = Math.floor(Math.random() * 10000) + 200;
    
    logs.push({
      id: `LOG-${String(i + 1).padStart(8, '0')}`,
      timestamp: timestamp.toISOString(),
      method,
      endpoint,
      statusCode,
      statusText: statusCode >= 200 && statusCode < 300 ? 'OK' : statusCode >= 400 ? 'Error' : 'Redirect',
      responseTime: `${responseTime}ms`,
      requestSize: `${requestSize}B`,
      responseSize: `${responseSize}B`,
      ipAddress: ip,
      userAgent,
      userId: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 1000)}` : null,
      requestId: `req-${Math.random().toString(36).substr(2, 9)}`,
      correlationId: `corr-${Math.random().toString(36).substr(2, 9)}`,
      error: statusCode >= 400 ? `Error ${statusCode}: ${endpoint} failed` : null,
      success: statusCode < 400
    });
  }
  return logs;
};

const generateSecurityEventsData = (count: number) => {
  const events = [];
  for (let i = 0; i < count; i++) {
    const eventType = securityEventTypes[Math.floor(Math.random() * securityEventTypes.length)];
    const threatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)];
    const ip = `${ipAddresses[Math.floor(Math.random() * ipAddresses.length)]}${Math.floor(Math.random() * 255)}`;
    const country = countries[Math.floor(Math.random() * countries.length)];
    const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const user = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    
    events.push({
      id: `SEC-${String(i + 1).padStart(8, '0')}`,
      timestamp: timestamp.toISOString(),
      eventType,
      threatLevel,
      severity: threatLevel === 'critical' ? 10 : threatLevel === 'high' ? 8 : threatLevel === 'medium' ? 5 : 2,
      sourceIp: ip,
      sourceCountry: country,
      targetResource: apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)],
      user: Math.random() > 0.4 ? user : null,
      action: eventType.includes('login') ? 'authentication' : eventType.includes('access') ? 'data_access' : 'system_event',
      description: `${eventType.replace(/_/g, ' ')} detected from ${country}`,
      blocked: threatLevel === 'critical' || threatLevel === 'high',
      ruleId: `RULE-${Math.floor(Math.random() * 100)}`,
      signature: `SIG-${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
      remediation: threatLevel === 'critical' ? 'IP blocked automatically' : threatLevel === 'high' ? 'Alert sent to security team' : 'Logged for review'
    });
  }
  return events;
};

const generateAiTrainingData = (count: number) => {
  const trainingData = [];
  for (let i = 0; i < count; i++) {
    const modelType = aiModelTypes[Math.floor(Math.random() * aiModelTypes.length)];
    const dataset = datasets[Math.floor(Math.random() * datasets.length)];
    const status = trainingStatuses[Math.floor(Math.random() * trainingStatuses.length)];
    const timestamp = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const epochs = Math.floor(Math.random() * 100) + 10;
    const accuracy = status === 'completed' ? (Math.random() * 0.2 + 0.8) : (Math.random() * 0.8);
    
    trainingData.push({
      id: `TRAIN-${String(i + 1).padStart(6, '0')}`,
      modelName: `${modelType}-v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
      modelType,
      dataset,
      status,
      startTime: timestamp.toISOString(),
      endTime: status === 'completed' ? new Date(timestamp.getTime() + Math.random() * 48 * 60 * 60 * 1000).toISOString() : null,
      epochs,
      currentEpoch: status === 'training' ? Math.floor(epochs * Math.random()) : status === 'completed' ? epochs : 0,
      accuracy: accuracy.toFixed(4),
      loss: (1 - accuracy + Math.random() * 0.1).toFixed(4),
      learningRate: (Math.random() * 0.01 + 0.0001).toFixed(6),
      batchSize: [16, 32, 64, 128][Math.floor(Math.random() * 4)],
      gpuHours: (Math.random() * 100 + 10).toFixed(2),
      parameters: Math.floor(Math.random() * 1000000000) + 1000000,
      datasetSize: Math.floor(Math.random() * 1000000) + 10000,
      framework: ['PyTorch', 'TensorFlow', 'JAX', 'HuggingFace'][Math.floor(Math.random() * 4)],
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`
    });
  }
  return trainingData;
};

const generateSystemLogsData = (count: number) => {
  const logs = [];
  for (let i = 0; i < count; i++) {
    const level = logLevels[Math.floor(Math.random() * logLevels.length)];
    const component = systemComponents[Math.floor(Math.random() * systemComponents.length)];
    const message = logMessages[Math.floor(Math.random() * logMessages.length)];
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const traceId = `trace-${Math.random().toString(36).substr(2, 16)}`;
    const spanId = `span-${Math.random().toString(36).substr(2, 8)}`;
    
    logs.push({
      id: `SYS-${String(i + 1).padStart(8, '0')}`,
      timestamp: timestamp.toISOString(),
      level,
      component,
      message,
      traceId,
      spanId,
      thread: `thread-${Math.floor(Math.random() * 100)}`,
      hostname: `server-${Math.floor(Math.random() * 10) + 1}`,
      environment: ['production', 'staging', 'development'][Math.floor(Math.random() * 3)],
      stackTrace: level === 'ERROR' || level === 'FATAL' ? `at ${component}.process()\nat ${component}.handle()` : null,
      metadata: {
        userId: Math.random() > 0.5 ? `user-${Math.floor(Math.random() * 1000)}` : null,
        requestId: `req-${Math.random().toString(36).substr(2, 9)}`,
        duration: level === 'ERROR' ? null : `${Math.floor(Math.random() * 1000)}ms`,
        memoryUsage: `${(Math.random() * 80 + 10).toFixed(2)}%`,
        cpuUsage: `${(Math.random() * 70 + 5).toFixed(2)}%`
      }
    });
  }
  return logs;
};

const generateVulnerabilitiesData = (count: number) => {
  const vulnerabilities = [];
  for (let i = 0; i < count; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    const cveId = `${cveIds[Math.floor(Math.random() * cveIds.length)]}${Math.floor(Math.random() * 20000) + 1000}`;
    const status = remediationStatuses[Math.floor(Math.random() * remediationStatuses.length)];
    const discoveredDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const cvssScore = severity === 'Critical' ? (Math.random() * 1 + 9) : severity === 'High' ? (Math.random() * 1 + 7) : severity === 'Medium' ? (Math.random() * 1 + 4) : (Math.random() * 2 + 0);
    
    vulnerabilities.push({
      id: `VULN-${String(i + 1).padStart(6, '0')}`,
      cveId,
      title: `${vulnType} Vulnerability`,
      description: `A ${vulnType.toLowerCase()} vulnerability that could allow unauthorized access or data exposure.`,
      severity,
      cvssScore: cvssScore.toFixed(1),
      affectedComponent: systemComponents[Math.floor(Math.random() * systemComponents.length)],
      affectedVersion: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      fixedVersion: status === 'patched' ? `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}` : null,
      discoveredDate: discoveredDate.toISOString().split('T')[0],
      remediationStatus: status,
      exploitability: severity === 'Critical' ? 'High' : severity === 'High' ? 'Medium' : 'Low',
      impact: severity === 'Critical' ? 'Data breach, system compromise' : severity === 'High' ? 'Unauthorized access' : 'Limited impact',
      remediation: status === 'patched' ? 'Applied security patch' : status === 'in_progress' ? 'Patch in development' : 'Pending remediation',
      references: [`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`, `https://nvd.nist.gov/vuln/detail/${cveId}`],
      tags: [vulnType, severity.toLowerCase(), status]
    });
  }
  return vulnerabilities;
};

const generateAiMetricsData = (count: number) => {
  const metrics = [];
  for (let i = 0; i < count; i++) {
    const metricType = aiMetricsTypes[Math.floor(Math.random() * aiMetricsTypes.length)];
    const modelType = aiModelTypes[Math.floor(Math.random() * aiModelTypes.length)];
    const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const value = metricType === 'accuracy' ? (Math.random() * 0.2 + 0.8) : 
                  metricType === 'precision' ? (Math.random() * 0.15 + 0.85) :
                  metricType === 'recall' ? (Math.random() * 0.15 + 0.85) :
                  metricType === 'f1_score' ? (Math.random() * 0.15 + 0.85) :
                  metricType === 'loss' ? (Math.random() * 0.5) :
                  metricType === 'latency' ? (Math.random() * 500 + 10) :
                  metricType === 'throughput' ? (Math.random() * 1000 + 100) :
                  metricType === 'token_count' ? (Math.random() * 2000 + 100) :
                  metricType === 'cost' ? (Math.random() * 10 + 0.01) :
                  (Math.random() * 100 + 1);
    
    metrics.push({
      id: `METRIC-${String(i + 1).padStart(6, '0')}`,
      timestamp: timestamp.toISOString(),
      modelName: `${modelType}-production`,
      modelType,
      metricType,
      value: value.toFixed(4),
      unit: metricType === 'latency' ? 'ms' : 
            metricType === 'throughput' ? 'req/s' : 
            metricType === 'token_count' ? 'tokens' : 
            metricType === 'cost' ? 'USD' : 
            metricType === 'inference_time' ? 'ms' : 
            'ratio',
      dataset: datasets[Math.floor(Math.random() * datasets.length)],
      environment: ['production', 'staging', 'testing'][Math.floor(Math.random() * 3)],
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
      baseline: metricType === 'accuracy' ? '0.85' : metricType === 'loss' ? '0.15' : null,
      improvement: metricType === 'accuracy' ? ((value - 0.85) * 100).toFixed(2) : null,
      trend: value > (metricType === 'accuracy' ? 0.85 : 0.5) ? 'improving' : 'degrading',
      notes: metricType === 'accuracy' && value > 0.9 ? 'Model performing above baseline' : 
             metricType === 'loss' && value < 0.2 ? 'Low loss, good convergence' : 
             'Within expected range'
    });
  }
  return metrics;
};

export default function TestDataGenerator() {
  const [schemaText, setSchemaText] = useState('');
  const [count, setCount] = useState(10);
  const [generatedData, setGeneratedData] = useState('');
  const [copied, setCopied] = useState(false);
  const [dataType, setDataType] = useState<PredefinedDataType>('custom');

  const generateValue = (type: string, key: string): any => {
    switch (type) {
      case 'string':
        if (key.toLowerCase().includes('email')) {
          return `test${Math.floor(Math.random() * 1000)}@example.com`;
        }
        if (key.toLowerCase().includes('name')) {
          return `Test${key}${Math.floor(Math.random() * 100)}`;
        }
        if (key.toLowerCase().includes('id')) {
          return `id-${Math.random().toString(36).substr(2, 9)}`;
        }
        return `test_${key}_${Math.floor(Math.random() * 1000)}`;
      case 'number':
        return Math.floor(Math.random() * 1000);
      case 'boolean':
        return Math.random() > 0.5;
      case 'null':
        return null;
      default:
        return 'test';
    }
  };

  const generateFromSchema = (schema: any, count: number): any[] => {
    const results: any[] = [];

    for (let i = 0; i < count; i++) {
      const obj: any = {};
      
      if (schema.properties) {
        for (const key in schema.properties) {
          const prop = schema.properties[key];
          if (prop.type === 'array' && prop.items) {
            obj[key] = [generateValue(prop.items.type, key)];
          } else if (prop.type === 'object' && prop.properties) {
            obj[key] = generateFromSchema(prop, 1)[0];
          } else {
            obj[key] = generateValue(prop.type, key);
          }
        }
      }

      results.push(obj);
    }

    return results;
  };

  const handleGenerate = () => {
    try {
      let data: any[] = [];

      if (dataType === 'custom') {
        const validation = validateJson(schemaText);
        if (!validation.valid) {
          toast.error('Invalid JSON Schema format');
          return;
        }
        data = generateFromSchema(validation.data, count);
      } else {
        // Generate predefined data
        switch (dataType) {
          case 'user':
            data = generateUserData(count);
            break;
          case 'invoice':
            data = generateInvoiceData(count);
            break;
          case 'banking':
            data = generateBankingData(count);
            break;
          case 'accessories':
            data = generateAccessoriesData(count);
            break;
          case 'news':
            data = generateNewsData(count);
            break;
          case 'apiLogs':
            data = generateApiLogsData(count);
            break;
          case 'securityEvents':
            data = generateSecurityEventsData(count);
            break;
          case 'aiTraining':
            data = generateAiTrainingData(count);
            break;
          case 'systemLogs':
            data = generateSystemLogsData(count);
            break;
          case 'vulnerabilities':
            data = generateVulnerabilitiesData(count);
            break;
          case 'aiMetrics':
            data = generateAiMetricsData(count);
            break;
        }
      }

      setGeneratedData(JSON.stringify(data, null, 2));
      toast.success(`Generated ${data.length} test records`);
    } catch (err: any) {
      toast.error('Failed to generate test data');
    }
  };

  const handlePredefinedSelect = (type: PredefinedDataType) => {
    setDataType(type);
    if (type !== 'custom') {
      setSchemaText(''); // Clear schema when using predefined
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedData);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-data-${dataType}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  const predefinedDataTypes = [
    { id: 'user' as PredefinedDataType, name: 'User Data', icon: Users, description: 'Generate user profiles with names, emails, addresses, and registration data' },
    { id: 'invoice' as PredefinedDataType, name: 'Invoice Data', icon: FileText, description: 'Generate invoice records with customer info, items, totals, and payment status' },
    { id: 'banking' as PredefinedDataType, name: 'Banking Data', icon: CreditCard, description: 'Generate banking transactions with accounts, amounts, and transaction types' },
    { id: 'accessories' as PredefinedDataType, name: 'Accessories Data', icon: ShoppingBag, description: 'Generate product data for accessories with prices, stock, and specifications' },
    { id: 'news' as PredefinedDataType, name: 'News Data', icon: Newspaper, description: 'Generate news articles with headlines, categories, sources, and engagement metrics' },
    { id: 'apiLogs' as PredefinedDataType, name: 'API Logs', icon: Server, description: 'Generate API request/response logs with endpoints, status codes, response times, and metadata' },
    { id: 'securityEvents' as PredefinedDataType, name: 'Security Events', icon: Shield, description: 'Generate security event logs with threat levels, IP addresses, event types, and remediation actions' },
    { id: 'aiTraining' as PredefinedDataType, name: 'AI Training Data', icon: Brain, description: 'Generate AI/ML training records with model info, datasets, epochs, accuracy, and training metrics' },
    { id: 'systemLogs' as PredefinedDataType, name: 'System Logs', icon: Activity, description: 'Generate application/system logs with log levels, components, messages, and system metadata' },
    { id: 'vulnerabilities' as PredefinedDataType, name: 'Vulnerabilities', icon: AlertTriangle, description: 'Generate security vulnerability records with CVE IDs, severity, CVSS scores, and remediation status' },
    { id: 'aiMetrics' as PredefinedDataType, name: 'AI Model Metrics', icon: TrendingUp, description: 'Generate AI model performance metrics with accuracy, precision, recall, latency, and cost data' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-primary-600" />
          Test Data Generator
        </h2>
        <p className="text-gray-600 mb-4">
          Generate realistic test data for your applications. Choose from predefined data templates or create custom data using JSON Schema.
        </p>

        {/* Predefined Data Types */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Predefined Test Data Templates</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {predefinedDataTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handlePredefinedSelect(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    dataType === type.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${dataType === type.id ? 'text-primary-600' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${dataType === type.id ? 'text-primary-700' : 'text-gray-900'}`}>
                        {type.name}
                      </h3>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            <button
              onClick={() => handlePredefinedSelect('custom')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                dataType === 'custom'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <Sparkles className={`w-5 h-5 mt-0.5 ${dataType === 'custom' ? 'text-primary-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${dataType === 'custom' ? 'text-primary-700' : 'text-gray-900'}`}>
                    Custom Schema
                  </h3>
                  <p className="text-xs text-gray-600">Define your own JSON Schema for custom data generation</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Record Count (1-50)</label>
            <input
              type="number"
              value={count}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setCount(Math.min(Math.max(val, 1), 50));
              }}
              min="1"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum 50 records for predefined templates</p>
          </div>
        </div>

        {dataType === 'custom' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">JSON Schema</label>
            <textarea
              value={schemaText}
              onChange={(e) => setSchemaText(e.target.value)}
              placeholder='{"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "number"}}}'
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="mt-2 text-xs text-gray-500">
              <p className="font-semibold mb-1">Example Schema:</p>
              <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "number"},
    "email": {"type": "string"},
    "active": {"type": "boolean"}
  }
}`}
              </pre>
            </div>
          </div>
        )}

        {dataType !== 'custom' && (
          <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> {predefinedDataTypes.find(t => t.id === dataType)?.name}
              <br />
              <span className="text-xs">Click "Generate Test Data" to create {count} realistic {predefinedDataTypes.find(t => t.id === dataType)?.name.toLowerCase()} records.</span>
            </p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={dataType === 'custom' && !schemaText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Database className="w-5 h-5" />
          Generate Test Data
        </button>
      </div>

      {generatedData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Generated Test Data ({dataType !== 'custom' ? predefinedDataTypes.find(t => t.id === dataType)?.name : 'Custom'})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm max-h-[500px] overflow-y-auto whitespace-pre">
            <code>{generatedData}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
