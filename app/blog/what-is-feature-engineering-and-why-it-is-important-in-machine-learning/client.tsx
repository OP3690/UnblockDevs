'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsFeatureEngineeringAndWhyItIsImportantInMachineLearningClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>What Is Feature Engineering and Why It Matters in Machine Learning</h1>
      <p className="lead">
        Feature engineering is the process of transforming raw data into features that make
        machine learning models more effective. It's often said that better features beat
        better algorithms — a simple model with great features outperforms a complex model
        with raw data. This guide explains the key techniques.
      </p>

      <StatGrid stats={[
        { value: '80%', label: 'of ML project time spent on data and feature work', color: 'amber' },
        { value: 'Better features', label: 'usually beat better algorithms', color: 'green' },
        { value: 'Domain knowledge', label: 'the key input to great feature engineering', color: 'blue' },
        { value: 'AutoML', label: 'automates feature engineering — partially', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What is a Feature?" />
      <QuickFact>
        A feature is any measurable property or characteristic of the data used as input to a
        machine learning model. Raw data (customer birth date) becomes a feature through
        engineering (age, days since last birthday, birth month). Good features encode the
        domain knowledge that helps the model make correct predictions.
      </QuickFact>

      <SectionHeader number={2} title="Core Feature Engineering Techniques" />
      <CodeBlock language="python" filename="Feature engineering with pandas">
{`import pandas as pd
import numpy as np

# Sample dataset
df = pd.DataFrame({
    'signup_date': pd.to_datetime(['2022-01-15', '2023-06-20', '2021-03-05']),
    'last_login': pd.to_datetime(['2024-01-01', '2024-01-15', '2024-01-10']),
    'revenue': [150, 2500, 450],
    'age': [25, 45, 32],
    'city': ['Boston', 'New York', 'Boston'],
    'n_purchases': [3, 25, 7],
})

# 1. Date/time features
df['account_age_days'] = (pd.Timestamp.now() - df['signup_date']).dt.days
df['days_since_login'] = (pd.Timestamp.now() - df['last_login']).dt.days
df['signup_month'] = df['signup_date'].dt.month
df['signup_day_of_week'] = df['signup_date'].dt.dayofweek

# 2. Ratio/interaction features
df['revenue_per_purchase'] = df['revenue'] / df['n_purchases'].clip(1)
df['purchase_frequency'] = df['n_purchases'] / df['account_age_days'].clip(1)

# 3. Log transform (reduces skew on revenue)
df['log_revenue'] = np.log1p(df['revenue'])  # log1p handles zeros

# 4. Binning (age groups)
df['age_group'] = pd.cut(df['age'],
    bins=[0, 25, 35, 50, 100],
    labels=['young', 'adult', 'mid', 'senior']
)

# 5. Target encoding (encode categorical by target mean)
city_revenue_mean = df.groupby('city')['revenue'].mean()
df['city_avg_revenue'] = df['city'].map(city_revenue_mean)

# 6. Boolean flags
df['is_high_value'] = (df['revenue'] > 1000).astype(int)
df['is_active'] = (df['days_since_login'] < 30).astype(int)

print(df[['revenue', 'log_revenue', 'revenue_per_purchase', 'age_group', 'is_high_value']].head())`}
      </CodeBlock>

      <SectionHeader number={3} title="Key Feature Engineering Categories" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Numerical transformations', description: 'Log/sqrt for skewed distributions, Min-Max normalization, Z-score standardization, polynomial features (x², x³). Linear models especially benefit from normalized features.' },
        { title: 'Categorical encoding', description: 'One-hot encoding for low-cardinality categoricals. Target encoding for high-cardinality (cities, zip codes). Ordinal encoding for ordered categories (low/medium/high).' },
        { title: 'Time-based features', description: 'Extract: day of week, month, hour, quarter. Compute: time since event, recency (days since last purchase), frequency (purchases per day), tenure (account age).' },
        { title: 'Interaction features', description: 'Combine features: revenue/sessions (revenue per visit), purchases × recency, age × income. Domain knowledge drives which interactions are meaningful.' },
      ]} />

      <SectionHeader number={4} title="Feature Selection — Remove Noise" />
      <CodeBlock language="python" filename="Feature selection methods">
{`from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

X = df.drop('target', axis=1)
y = df['target']

# 1. Correlation analysis (remove highly correlated features)
corr_matrix = X.corr().abs()
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [col for col in upper.columns if any(upper[col] > 0.95)]
X_reduced = X.drop(columns=to_drop)

# 2. Feature importance from Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X, y)
importance = pd.Series(rf.feature_importances_, index=X.columns)
top_features = importance.nlargest(20).index.tolist()

# 3. Mutual information (non-linear relationships)
mi_scores = mutual_info_classif(X, y)
mi_df = pd.DataFrame({'feature': X.columns, 'mi_score': mi_scores})
mi_df = mi_df.sort_values('mi_score', ascending=False)
print(mi_df.head(10))`}
      </CodeBlock>

      <AlertBox type="tip" title="Domain knowledge beats algorithmic feature search">
        The best features come from understanding your domain. For churn prediction: days since
        last login is more predictive than random polynomial combinations. Talk to domain experts,
        look at what analysts track manually, and translate that knowledge into features before
        trying automated approaches.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Do deep learning models need feature engineering?',
          answer: 'Less so — deep learning models (especially CNNs and Transformers) learn representations automatically from raw data. However, even deep learning benefits from: proper normalization, handling missing values, encoding time-based features, and domain-specific preprocessing. Feature engineering is most critical for classical ML (tree models, linear models, SVMs).',
        },
        {
          question: 'What is the difference between feature engineering and feature selection?',
          answer: 'Feature engineering: creating new features from existing data (transformations, combinations, encodings). Feature selection: choosing which features to include or exclude from the model. You typically engineer many features first, then select the best subset. Both are important for model performance and preventing overfitting.',
        },
        {
          question: 'What tools automate feature engineering?',
          answer: 'Featuretools (Python) — automated deep feature synthesis from relational data. AutoML frameworks (H2O AutoML, AutoGluon) — include automated feature engineering pipelines. MLflow — tracks feature transformations. For tabular data, these tools are powerful but don\'t replace domain-specific feature creation.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
