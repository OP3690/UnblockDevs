'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhatIsFeatureEngineeringAndWhyItIsImportantInMachineLearningClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>What Is Feature Engineering and Why It Matters in Machine Learning</h1>
      <p className="lead">
        Feature engineering is the process of transforming raw data into features that make
        machine learning models more effective. It is often said that better features beat
        better algorithms — a simple model with great features outperforms a complex model
        with raw data. This guide explains the key techniques with code examples.
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

      <p>
        In machine learning, the distinction between raw data and engineered features is
        fundamental. Raw data is what you collect — timestamps, text strings, category codes.
        Features are what you give the model — numerical representations that encode meaning.
        A date string "2020-03-15" means nothing to a linear regression model. But
        "account_age_days=1200" and "signup_month=3" give the model something it can learn from.
        The transformation between the two is feature engineering.
      </p>

      <SectionHeader number={2} title="Core Feature Engineering Techniques" />
      <CodeBlock lang="python" title="Feature engineering with pandas">{`import pandas as pd
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

print(df[['revenue', 'log_revenue', 'revenue_per_purchase', 'age_group', 'is_high_value']].head())`}</CodeBlock>

      <SectionHeader number={3} title="Key Feature Engineering Categories" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Numerical transformations', description: 'Log/sqrt for skewed distributions, Min-Max normalization, Z-score standardization, polynomial features (x squared, x cubed). Linear models especially benefit from normalized features. Skewed distributions like revenue often perform better log-transformed.' },
        { title: 'Categorical encoding', description: 'One-hot encoding for low-cardinality categoricals. Target encoding for high-cardinality (cities, zip codes). Ordinal encoding for ordered categories (low/medium/high). The wrong encoding can destroy model performance.' },
        { title: 'Time-based features', description: 'Extract: day of week, month, hour, quarter. Compute: time since event, recency (days since last purchase), frequency (purchases per day), tenure (account age). Time features capture behavioral patterns and seasonality.' },
        { title: 'Interaction features', description: 'Combine features: revenue/sessions (revenue per visit), purchases times recency, age times income. Domain knowledge drives which interactions are meaningful. Tree models discover interactions automatically; linear models need them explicit.' },
      ]} />

      <SectionHeader number={4} title="Feature Selection — Remove Noise" />
      <p>
        Creating features is only half the work. Many engineered features will be redundant,
        correlated with each other, or simply not useful. Adding too many weak features hurts
        model performance through the curse of dimensionality and increased overfitting risk.
        Feature selection identifies which features to keep.
      </p>
      <CodeBlock lang="python" title="Feature selection methods">{`from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np

X = df.drop('target', axis=1)
y = df['target']

# 1. Correlation analysis (remove highly correlated features)
corr_matrix = X.corr().abs()
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [col for col in upper.columns if any(upper[col] > 0.95)]
X_reduced = X.drop(columns=to_drop)
print(f"Dropped {len(to_drop)} highly correlated features: {to_drop}")

# 2. Feature importance from Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X, y)
importance = pd.Series(rf.feature_importances_, index=X.columns)
top_features = importance.nlargest(20).index.tolist()
print("Top 20 features by importance:", top_features)

# 3. Mutual information (captures non-linear relationships)
mi_scores = mutual_info_classif(X, y)
mi_df = pd.DataFrame({'feature': X.columns, 'mi_score': mi_scores})
mi_df = mi_df.sort_values('mi_score', ascending=False)
print(mi_df.head(10))

# 4. Variance threshold (remove near-constant features)
from sklearn.feature_selection import VarianceThreshold
selector = VarianceThreshold(threshold=0.01)  # remove features with <1% variance
X_var = selector.fit_transform(X)`}</CodeBlock>

      <SectionHeader number={5} title="RFM Feature Engineering — A Real-World Example" />
      <p>
        RFM (Recency, Frequency, Monetary) is one of the most powerful feature engineering
        frameworks for customer data. It transforms raw transaction history into three
        high-signal features that predict churn, lifetime value, and purchase probability
        remarkably well — often outperforming complex deep learning approaches on transactional data.
      </p>
      <CodeBlock lang="python" title="RFM feature engineering for customer data">{`import pandas as pd
from datetime import datetime

# Sample transaction data
transactions = pd.DataFrame({
    'customer_id': [1, 1, 1, 2, 2, 3],
    'order_date': pd.to_datetime(['2024-01-01', '2024-02-15', '2024-03-10',
                                   '2023-12-01', '2024-01-20', '2024-03-01']),
    'order_value': [50, 120, 80, 200, 150, 90],
})

snapshot_date = pd.Timestamp('2024-04-01')

# Build RFM features per customer
rfm = transactions.groupby('customer_id').agg(
    recency=('order_date', lambda x: (snapshot_date - x.max()).days),
    frequency=('order_date', 'count'),
    monetary=('order_value', 'sum'),
).reset_index()

# Normalize to 1-5 scores
rfm['r_score'] = pd.qcut(rfm['recency'], q=5, labels=[5,4,3,2,1])  # lower recency = better
rfm['f_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1,2,3,4,5])
rfm['m_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1,2,3,4,5])

# Composite RFM score
rfm['rfm_score'] = rfm['r_score'].astype(int) + rfm['f_score'].astype(int) + rfm['m_score'].astype(int)
rfm['segment'] = pd.cut(rfm['rfm_score'],
    bins=[0, 5, 8, 11, 15],
    labels=['at_risk', 'needs_attention', 'loyal', 'champion']
)

print(rfm)`}</CodeBlock>

      <SectionHeader number={6} title="Handling Missing Values as Features" />
      <p>
        Missing values are not just a preprocessing problem — the fact that a value is missing
        is often itself a highly predictive signal. Imputing the value without capturing the
        missingness pattern throws away information.
      </p>
      <CodeBlock lang="python" title="Missing value features">{`import pandas as pd
import numpy as np

df = pd.DataFrame({
    'income': [50000, None, 120000, None, 80000],
    'credit_score': [720, 680, None, 590, 750],
    'loan_amount': [10000, 25000, 50000, 5000, 15000],
})

# 1. Create missingness indicator features BEFORE imputing
df['income_missing'] = df['income'].isna().astype(int)
df['credit_score_missing'] = df['credit_score'].isna().astype(int)

# 2. Impute with median (preserves distribution better than mean for skewed data)
df['income'] = df['income'].fillna(df['income'].median())
df['credit_score'] = df['credit_score'].fillna(df['credit_score'].median())

# Now model sees BOTH the imputed value AND whether it was originally missing
# The missingness pattern itself may be predictive
# (e.g., missing income might indicate self-employment or refusal to disclose)`}</CodeBlock>

      <AlertBox type="tip" title="Domain knowledge beats algorithmic feature search">
        The best features come from understanding your domain. For churn prediction: days since
        last login is more predictive than random polynomial combinations. Talk to domain experts,
        look at what analysts track manually, and translate that knowledge into features before
        trying automated approaches.
      </AlertBox>

      <SectionHeader number={7} title="Feature Engineering Pipeline — Production Setup" />
      <p>
        In production, feature engineering must be reproducible, versioned, and applied
        consistently to both training and inference data. Using sklearn Pipelines prevents
        the most common production bug in ML: different preprocessing at training vs. serving time.
      </p>
      <CodeBlock lang="python" title="sklearn Pipeline for reproducible feature engineering">{`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

# Define preprocessing for each column type
numeric_features = ['age', 'income', 'account_age_days']
categorical_features = ['city', 'plan_type']

numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
])

categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore')),
])

# Combine into a ColumnTransformer
preprocessor = ColumnTransformer([
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features),
])

# Full ML pipeline: preprocessing + model
model_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100)),
])

# Fit on training data
model_pipeline.fit(X_train, y_train)

# Inference: same transformations applied automatically
predictions = model_pipeline.predict(X_test)

# Save entire pipeline — preprocessing included
import joblib
joblib.dump(model_pipeline, 'model_pipeline.pkl')`}</CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Do deep learning models need feature engineering?',
          answer: 'Less so — deep learning models (especially CNNs and Transformers) learn representations automatically from raw data. However, even deep learning benefits from: proper normalization, handling missing values, encoding time-based features, and domain-specific preprocessing. Feature engineering is most critical for classical ML (tree models, linear models, SVMs) on tabular data.',
        },
        {
          question: 'What is the difference between feature engineering and feature selection?',
          answer: 'Feature engineering: creating new features from existing data (transformations, combinations, encodings). Feature selection: choosing which features to include or exclude from the model. You typically engineer many features first, then select the best subset. Both are important for model performance and preventing overfitting.',
        },
        {
          question: 'What tools automate feature engineering?',
          answer: 'Featuretools (Python) — automated deep feature synthesis from relational data. AutoML frameworks (H2O AutoML, AutoGluon) — include automated feature engineering pipelines. MLflow — tracks feature transformations and experiments. For tabular data, these tools are powerful but do not replace domain-specific feature creation.',
        },
        {
          question: 'How do I know if a feature is good or not?',
          answer: 'Several signals: (1) Feature importance from a tree model — high importance suggests the model finds it predictive. (2) Mutual information score — measures non-linear relationship with the target. (3) Cross-validation performance improvement — add the feature and run CV. If test score improves consistently, it is a good feature. (4) Domain logic — does the feature make business sense? Sensible features generalize better.',
        },
        {
          question: 'What is target leakage in feature engineering?',
          answer: 'Target leakage happens when a feature contains information that would only be available after the prediction target is known. Example: including "days to churn" as a feature when predicting churn — obviously the model cannot know this before the event. Leakage causes falsely high training accuracy but terrible production performance. Always check whether each feature could logically exist at prediction time.',
        },
        {
          question: 'Should I normalize features for tree-based models?',
          answer: 'No — tree models (Random Forest, XGBoost, LightGBM) are scale-invariant. They split on thresholds, so whether a feature is in range 0-1 or 0-1000000 does not affect them. Normalization is critical for: linear models, neural networks, SVMs, k-NN, and PCA. Always normalize for distance-based or gradient-based models.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
