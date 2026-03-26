'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader,
} from '@/components/blog/BlogVisuals';

export default function HowToReadJsonFilePython3WaysClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Read a JSON File in Python — 3 Ways Explained</h1>
      <p className="lead">
        Reading JSON files in Python takes 3 lines of code with the built-in <code>json</code>
        module. This guide covers the 3 most common approaches: reading from file, reading from
        string, and handling large files — plus common errors and how to fix them.
      </p>

      <StatGrid stats={[
        { value: 'json', label: 'built-in Python module — no install needed', color: 'green' },
        { value: 'json.load()', label: 'reads from file object', color: 'blue' },
        { value: 'json.loads()', label: 'reads from string (the "s" = string)', color: 'purple' },
        { value: 'dict/list', label: 'what json.load returns — Python native types', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Method 1 — json.load() from File" />
      <CodeBlock language="python" filename="Read JSON from file — recommended">
{`import json

# Read a JSON file and parse it
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)  # returns dict or list

# Access the data
print(data['name'])           # "Alice"
print(data['address']['city']) # "Boston"
print(data['tags'][0])        # first tag

# Always use encoding='utf-8' to handle international characters
# Using 'with' statement ensures file is properly closed

# Example data.json:
# {"name": "Alice", "address": {"city": "Boston"}, "tags": ["dev", "admin"]}`}
      </CodeBlock>

      <SectionHeader number={2} title="Method 2 — json.loads() from String" />
      <CodeBlock language="python" filename="Parse JSON from a string or API response">
{`import json

# From a raw string
json_string = '{"name": "Alice", "age": 30, "active": true}'
data = json.loads(json_string)  # s = string
print(data['name'])  # Alice
print(type(data))    # <class 'dict'>

# From an API response (requests library)
import requests
response = requests.get('https://api.example.com/users/1')
data = response.json()      # requests has built-in JSON parsing
# or manually:
data = json.loads(response.text)  # equivalent

# Note: json.load() takes a file object
#       json.loads() takes a string
# Common mistake: json.load(json_string) → TypeError!
# Fix: json.loads(json_string)  ← add the 's'`}
      </CodeBlock>

      <SectionHeader number={3} title="Method 3 — Handle Large JSON Files" />
      <CodeBlock language="python" filename="Large file handling with ijson">
{`# Standard json.load() loads entire file into memory
# For large files (100MB+), use ijson for streaming

# Install: pip install ijson
import ijson

# Stream items from a large JSON array
with open('large_data.json', 'rb') as f:
    for item in ijson.items(f, 'item'):  # 'item' = each element of top-level array
        process_item(item)  # process one at a time, memory efficient

# Stream specific nested path
with open('large_data.json', 'rb') as f:
    for user in ijson.items(f, 'users.item'):  # items inside users array
        print(user['name'])

# For moderately large files (under ~100MB):
# json.load() is fine — Python handles it efficiently`}
      </CodeBlock>

      <SectionHeader number={4} title="Error Handling" />
      <CodeBlock language="python" filename="Handle JSON errors gracefully">
{`import json

def safe_read_json(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)

    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return None

    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e.msg} at line {e.lineno}, col {e.colno}")
        return None

    except UnicodeDecodeError:
        # File might be UTF-16 or other encoding
        with open(filepath, 'r', encoding='utf-16') as f:
            return json.load(f)

data = safe_read_json('data.json')`}
      </CodeBlock>

      <SectionHeader number={5} title="Write JSON Back to File" />
      <CodeBlock language="python" filename="Writing JSON to file">
{`import json

data = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Write to file
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)      # indent=2 for pretty printing
    # json.dump(data, f)              # compact (no whitespace)

# Convert to string (don't write to file)
json_string = json.dumps(data, indent=2)
json_compact = json.dumps(data, separators=(',', ':'))  # minimal whitespace

# Handling non-JSON-serializable types
from datetime import datetime
data_with_date = {"created": datetime.now()}

# json.dumps(data_with_date)  ← TypeError: not serializable!

# Fix: use default converter
json.dumps(data_with_date, default=str)  # converts datetime to string
# or custom encoder
json.dumps(data_with_date, default=lambda x: x.isoformat() if isinstance(x, datetime) else str(x))`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is the difference between json.load() and json.loads()?',
          answer: 'json.load(f) reads JSON from a file object (f must be an open file). json.loads(s) parses JSON from a string (s must be a string). The "s" in loads stands for "string". Common mistake: passing a filename string to json.load() — that expects a file object, not a path string.',
        },
        {
          question: 'How do I handle JSON with comments (JSONC)?',
          answer: 'Standard json module doesn\'t support comments. For JSONC or JSON5: use the json5 package (pip install json5). For stripping comments from near-JSON: use strip-json-comments approach — read as text, remove // and /* */ comments with regex, then json.loads().',
        },
        {
          question: 'Why does json.loads() fail on valid-looking JSON?',
          answer: 'Common causes: 1) Python booleans use True/False/None but JSON requires true/false/null — if you built the string with Python string formatting, check this. 2) Single quotes instead of double quotes — JSON requires double quotes only. 3) Trailing commas — not allowed in JSON. Use the json module to generate JSON strings (json.dumps()) rather than building them manually.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
