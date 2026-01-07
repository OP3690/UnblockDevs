'use client';

import { useState } from 'react';
import { Database, Copy, Check, Download, Users, FileText, CreditCard, ShoppingBag, Newspaper, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

type PredefinedDataType = 'user' | 'invoice' | 'banking' | 'accessories' | 'news' | 'custom';

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
