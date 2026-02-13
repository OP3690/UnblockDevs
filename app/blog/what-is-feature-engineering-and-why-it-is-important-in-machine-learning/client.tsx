'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, CheckCircle, AlertCircle, Target, TrendingUp, BarChart3, Settings, Brain, Sparkles, ChevronRight } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">What Is Feature Engineering and Why It Is Important in Machine Learning</h1>
          <p className="text-sm text-gray-500 mt-1">Learn feature engineering with examples, techniques, and why it's crucial for ML success</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="What Is Feature Engineering and Why It Is Important in Machine Learning"
        description="Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it's crucial for model performance."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Feature engineering is often called the "secret sauce" of machine learning. While algorithms get most of the attention, 
              the quality and selection of features (input variables) can make or break a machine learning model. In fact, many 
              experts say feature engineering is more important than the choice of algorithm itself.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn what feature engineering is, why it's so important, common techniques, 
              and how to apply it in real-world machine learning projects. We'll use simple examples and visualizations to make 
              everything clear, even if you're new to machine learning.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate feature data 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to format feature datasets.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is Feature Engineering?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Feature Engineering</strong> is the process of selecting, modifying, and creating features (input variables) from raw data 
              to improve machine learning model performance. It involves transforming raw data into features that better represent the underlying 
              problem to the predictive models.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key aspects of feature engineering:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Settings className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Feature Selection</h3>
                <p className="text-xs text-gray-700">Choosing which features to use</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Sparkles className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Feature Transformation</h3>
                <p className="text-xs text-gray-700">Modifying existing features</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Brain className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Feature Creation</h3>
                <p className="text-xs text-gray-700">Creating new features from existing ones</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm">
                Imagine you're a chef. Raw ingredients (raw data) need to be prepared (feature engineering) before cooking (training model). 
                You might chop vegetables (transform), combine ingredients (create new features), and select the best ones (feature selection) 
                to create a delicious dish (accurate model). The same ingredients prepared differently can result in completely different dishes!
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Features in Machine Learning?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Features</strong> (also called input variables or attributes) are the individual measurable properties or characteristics 
              of the data that are used as inputs to machine learning models. They represent the information the model uses to make predictions.
            </p>
            <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Example: House Price Prediction</h3>
              <p className="text-gray-700 text-sm mb-2"><strong>Raw Data:</strong> House listing information</p>
              <p className="text-gray-700 text-sm mb-2"><strong>Features (Inputs):</strong></p>
              <ul className="text-sm text-gray-700 ml-4 space-y-1">
                <li>• Square footage (numerical)</li>
                <li>• Number of bedrooms (numerical)</li>
                <li>• Location (categorical)</li>
                <li>• Year built (numerical)</li>
                <li>• Has garage (boolean)</li>
              </ul>
              <p className="text-gray-700 text-sm mt-2"><strong>Target (Output):</strong> House price</p>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
              <div className="text-gray-400">// Example Feature Set</div>
              <div className="text-white">{'{'}</div>
              <div className="text-white ml-4">"sqft": 2000,</div>
              <div className="text-white ml-4">"bedrooms": 3,</div>
              <div className="text-white ml-4">"location": "downtown",</div>
              <div className="text-white ml-4">"year_built": 2010,</div>
              <div className="text-white ml-4">"has_garage": true</div>
              <div className="text-white">{'}'}</div>
              <div className="text-gray-400 mt-2">// Target: price = $350,000</div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Is Feature Engineering Needed?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Feature engineering is needed in almost every machine learning project:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Raw data is messy</strong> - When data has missing values, outliers, or inconsistencies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Features don't match model requirements</strong> - When data format doesn't suit the algorithm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Model performance is poor</strong> - When initial model accuracy is low</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Domain knowledge can help</strong> - When you can create better features using expertise</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Too many features</strong> - When you have hundreds or thousands of features (curse of dimensionality)</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Feature Engineering Techniques */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Engineer Features: Common Techniques</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Feature Transformation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Transforming features to better suit the model:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Normalization/Scaling</h4>
                  <p className="text-sm text-gray-700 mb-2">Scaling features to similar ranges (0-1 or mean=0, std=1)</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Before: [100, 200, 300, 400]</div>
                    <div className="text-white">// After normalization: [0, 0.33, 0.67, 1.0]</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Encoding Categorical Variables</h4>
                  <p className="text-sm text-gray-700 mb-2">Converting categories to numbers (one-hot encoding, label encoding)</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Before: ["red", "blue", "green"]</div>
                    <div className="text-white">// After one-hot: [1,0,0], [0,1,0], [0,0,1]</div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Handling Missing Values</h4>
                  <p className="text-sm text-gray-700 mb-2">Filling or removing missing data (mean, median, mode, or deletion)</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Before: [10, null, 30, null, 50]</div>
                    <div className="text-white">// After (mean imputation): [10, 30, 30, 30, 50]</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Feature Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creating new features from existing ones:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Mathematical Operations</h4>
                  <p className="text-sm text-gray-700 mb-2">Creating ratios, differences, products</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Features: area, price</div>
                    <div className="text-white">// New feature: price_per_sqft = price / area</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Binning/Discretization</h4>
                  <p className="text-sm text-gray-700 mb-2">Converting continuous to categorical</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Before: age = 25, 35, 45, 55</div>
                    <div className="text-white">// After: age_group = "young", "middle", "senior"</div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Polynomial Features</h4>
                  <p className="text-sm text-gray-700 mb-2">Creating interaction terms (x², x*y)</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    <div className="text-gray-400">// Features: x, y</div>
                    <div className="text-white">// New: x², y², x*y</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Feature Selection</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Choosing the most important features:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Correlation Analysis</h4>
                  <p className="text-sm text-gray-700">Remove highly correlated features (redundancy)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Feature Importance</h4>
                  <p className="text-sm text-gray-700">Use model to identify most predictive features</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Dimensionality Reduction</h4>
                  <p className="text-sm text-gray-700">PCA, t-SNE to reduce feature count while preserving information</p>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Engineering Process Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Engineering Process Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Understand Data</h4>
                    <p className="text-sm text-gray-600">Explore data, identify types, check quality</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Handle Missing Values</h4>
                    <p className="text-sm text-gray-600">Fill, remove, or impute missing data</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Transform Features</h4>
                    <p className="text-sm text-gray-600">Normalize, encode, scale features</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Create New Features</h4>
                    <p className="text-sm text-gray-600">Derive features using domain knowledge</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Select Features</h4>
                    <p className="text-sm text-gray-600">Choose most important features</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Train Model</h4>
                    <p className="text-sm text-gray-600">Use engineered features for training</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Is Feature Engineering So Important?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Improves Model Accuracy</h3>
                <p className="text-gray-700 text-sm">Good features can improve accuracy by 20-50% or more</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Reduces Overfitting</h3>
                <p className="text-gray-700 text-sm">Selecting right features prevents model from learning noise</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Faster Training</h3>
                <p className="text-gray-700 text-sm">Fewer, better features mean faster model training</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Brain className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Domain Knowledge</h3>
                <p className="text-gray-700 text-sm">Leverages expertise to create meaningful features</p>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Key Insight:</strong> According to many ML experts, feature engineering can have a bigger impact on model performance 
                than choosing the algorithm itself. A simple algorithm with great features often outperforms a complex algorithm with poor features.
              </p>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Feature Engineering Example</h2>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4">Problem: Predict Customer Churn</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Raw Features:</h4>
                  <ul className="text-sm text-gray-700 ml-4 space-y-1">
                    <li>• account_age_days</li>
                    <li>• last_login_date</li>
                    <li>• total_purchases</li>
                    <li>• signup_date</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Engineered Features:</h4>
                  <ul className="text-sm text-gray-700 ml-4 space-y-1">
                    <li>• days_since_last_login = today - last_login_date (more meaningful than raw date)</li>
                    <li>• avg_purchases_per_month = total_purchases / account_age_months (normalized metric)</li>
                    <li>• is_inactive = days_since_last_login {'>'} 30 (binary flag)</li>
                    <li>• account_age_months = account_age_days / 30 (more interpretable)</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs text-gray-600">
                    <strong>Result:</strong> Engineered features capture relationships (inactivity, purchase frequency) that raw features don't, 
                    leading to much better churn prediction accuracy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Engineering Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Engineering Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start Simple</h3>
                  <p className="text-gray-700 text-sm">Begin with basic features, then add complexity based on model performance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Domain Knowledge</h3>
                  <p className="text-gray-700 text-sm">Leverage expertise to create meaningful features (e.g., price per square foot for real estate)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Avoid Data Leakage</h3>
                  <p className="text-gray-700 text-sm">Don't use future information or target-related data in features</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Iterate and Test</h3>
                  <p className="text-gray-700 text-sm">Try different feature combinations and measure impact on model performance</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between feature engineering and feature selection?',
                answer: 'Feature engineering involves creating, transforming, and modifying features. Feature selection is choosing which features to use from the available set. Feature engineering comes first (creating features), then feature selection (choosing best ones).',
              },
              {
                question: 'Can feature engineering be automated?',
                answer: 'Partially. Some aspects can be automated (scaling, encoding), but creating domain-specific features often requires human expertise. AutoML tools can help, but manual feature engineering based on domain knowledge usually produces better results.',
              },
              {
                question: 'How much time should I spend on feature engineering?',
                answer: 'Feature engineering typically takes 60-80% of a data scientist\'s time in a machine learning project. It\'s often more important than algorithm selection, so investing time here pays off significantly.',
              },
              {
                question: 'What happens if I skip feature engineering?',
                answer: 'Skipping feature engineering usually results in: lower model accuracy, longer training times, overfitting, and poor generalization. Raw data rarely works well directly with ML algorithms.',
              },
              {
                question: 'Is feature engineering still important with deep learning?',
                answer: 'Deep learning can learn features automatically, but feature engineering still helps: it can improve performance, reduce training time, and make models more interpretable. For tabular data, feature engineering is still very important.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="What Is Feature Engineering and Why It Is Important in Machine Learning"
            description="Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it's crucial for model performance."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
