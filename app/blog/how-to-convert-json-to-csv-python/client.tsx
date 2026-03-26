'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToConvertJsonToCsvPythonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert JSON to CSV in Python: 3 Methods with Examples (2026)</h1>
      <p className="lead">
        JSON and CSV are the two most common data formats in software development. Converting between them is a daily task for data engineers, analysts, and backend developers. This guide covers three battle-tested Python methods — from the standard library to pandas — with real examples, edge cases, and production-ready patterns.
      </p>

      <StatGrid stats={[
        { value: '3', label: 'methods covered in this guide', color: 'blue' },
        { value: 'pandas', label: 'best for complex/nested data', color: 'green' },
        { value: 'csv module', label: 'best for simple flat data', color: 'purple' },
        { value: '0 deps', label: 'for the standard library approach', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="When to Use Each Method" />

      <CompareTable
        leftLabel="Use csv + json modules"
        rightLabel="Use pandas"
        rows={[
          { label: 'Dependencies', left: 'None (standard library)', right: 'pip install pandas' },
          { label: 'Data structure', left: 'Simple flat JSON arrays', right: 'Nested, complex, or large data' },
          { label: 'Performance (large files)', left: 'Use csv.DictWriter for streaming', right: 'Optimized with chunking support' },
          { label: 'Column control', left: 'Manual with fieldnames param', right: 'Automatic column detection' },
          { label: 'Nested objects', left: 'Requires manual flattening', right: 'json_normalize() handles it' },
          { label: 'Data cleaning', left: 'Manual string operations', right: 'Built-in data manipulation' },
          { label: 'Learning curve', left: 'Low', right: 'Medium' },
        ]}
      />

      <SectionHeader number={2} title="Method 1: csv and json Standard Library" />

      <p>
        The simplest approach for flat JSON arrays. No external dependencies required. This works when your JSON is an array of objects where every object has the same keys.
      </p>

      <CodeBlock language="python" filename="json_to_csv_basic.py">
{`import json
import csv

# Load JSON data (from file)
with open('data.json', 'r') as f:
    data = json.load(f)

# data looks like:
# [
#   {"name": "Alice", "age": 30, "city": "New York"},
#   {"name": "Bob", "age": 25, "city": "London"}
# ]

# Write to CSV
with open('output.csv', 'w', newline='', encoding='utf-8') as f:
    if not data:
        print("No data to write")
    else:
        # Get column names from first record
        fieldnames = list(data[0].keys())
        writer = csv.DictWriter(f, fieldnames=fieldnames)

        writer.writeheader()       # Write the header row
        writer.writerows(data)     # Write all data rows

print(f"Wrote {len(data)} rows to output.csv")`}
      </CodeBlock>

      <AlertBox type="tip" title="Always use newline='' when writing CSV">
        On Windows, Python's csv module requires you to open the file with <code>newline=''</code> to prevent extra blank lines between rows. This is a common gotcha.
      </AlertBox>

      <p>
        If your JSON is a string (not already loaded), you can convert in memory without writing to disk:
      </p>

      <CodeBlock language="python" filename="json_string_to_csv.py">
{`import json
import csv
import io

def json_to_csv_string(json_string: str) -> str:
    """Convert a JSON string to a CSV string."""
    data = json.loads(json_string)

    if not data or not isinstance(data, list):
        raise ValueError("Input must be a JSON array of objects")

    output = io.StringIO()
    fieldnames = list(data[0].keys())
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)

    return output.getvalue()

# Usage
json_data = '[{"name":"Alice","score":95},{"name":"Bob","score":87}]'
csv_output = json_to_csv_string(json_data)
print(csv_output)
# name,score
# Alice,95
# Bob,87`}
      </CodeBlock>

      <SectionHeader number={3} title="Method 2: pandas json_normalize for Nested JSON" />

      <p>
        When your JSON has nested objects or arrays inside objects, the standard library requires manual flattening. pandas <code>json_normalize()</code> handles this automatically.
      </p>

      <CodeBlock language="python" filename="nested_json_to_csv.py">
{`import pandas as pd
import json

# Nested JSON example:
# [
#   {
#     "name": "Alice",
#     "address": {"city": "New York", "country": "US"},
#     "scores": [95, 87, 92]
#   }
# ]

with open('nested_data.json', 'r') as f:
    data = json.load(f)

# json_normalize flattens nested objects using dot notation
df = pd.json_normalize(data)
# Creates columns: name, address.city, address.country, scores

# For custom separator between parent and child keys:
df = pd.json_normalize(data, sep='_')
# Creates columns: name, address_city, address_country

# Save to CSV
df.to_csv('output.csv', index=False)
print(df.head())
print(f"Shape: {df.shape}")  # (rows, columns)`}
      </CodeBlock>

      <p>
        For deeply nested structures or JSON where the records are inside a nested key:
      </p>

      <CodeBlock language="python" filename="deep_nested.py">
{`import pandas as pd
import json

# JSON like: {"status": "ok", "data": {"users": [{"id":1,"name":"Alice"}]}}
with open('api_response.json', 'r') as f:
    response = json.load(f)

# Extract the array from its nested path
users = response['data']['users']

# Or use json_normalize with record_path
# For JSON like: {"users": [{"name":"Alice","tags":["dev","python"]}]}
df = pd.json_normalize(
    response,
    record_path=['users'],           # Path to the array
    meta=['status'],                  # Top-level fields to include
    errors='ignore'                   # Skip missing fields
)

df.to_csv('users.csv', index=False)`}
      </CodeBlock>

      <SectionHeader number={4} title="Method 3: Manual Flattening for Custom Control" />

      <p>
        Sometimes you need full control over how nested data maps to columns — for example, handling arrays differently, or choosing a custom column naming scheme.
      </p>

      <CodeBlock language="python" filename="manual_flatten.py">
{`import json
import csv

def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """Recursively flatten a nested dictionary."""
    items = {}
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_dict(v, new_key, sep))
        elif isinstance(v, list):
            # Convert list to comma-separated string
            items[new_key] = ', '.join(str(i) for i in v)
        else:
            items[new_key] = v
    return items

def json_to_csv(input_file: str, output_file: str) -> None:
    with open(input_file, 'r') as f:
        data = json.load(f)

    # Flatten each record
    flat_records = [flatten_dict(record) for record in data]

    # Collect all unique keys (some records may have different keys)
    all_keys = []
    for record in flat_records:
        for key in record:
            if key not in all_keys:
                all_keys.append(key)

    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=all_keys, extrasaction='ignore')
        writer.writeheader()
        for record in flat_records:
            # Fill missing keys with empty string
            writer.writerow({k: record.get(k, '') for k in all_keys})

    print(f"Converted {len(flat_records)} records to {output_file}")

# Usage
json_to_csv('data.json', 'output.csv')`}
      </CodeBlock>

      <SectionHeader number={5} title="Handling Large JSON Files" />

      <p>
        For JSON files too large to fit in memory, use streaming parsing with the <code>ijson</code> library:
      </p>

      <CodeBlock language="python" filename="large_json_streaming.py">
{`# pip install ijson
import ijson
import csv

def stream_json_to_csv(json_file: str, csv_file: str, first_n: int = None):
    """Stream large JSON files to CSV without loading into memory."""
    row_count = 0

    with open(json_file, 'rb') as jf, open(csv_file, 'w', newline='') as cf:
        writer = None

        # ijson.items streams each element of the top-level array
        for record in ijson.items(jf, 'item'):
            if writer is None:
                # Initialize writer with keys from first record
                fieldnames = list(record.keys())
                writer = csv.DictWriter(cf, fieldnames=fieldnames)
                writer.writeheader()

            writer.writerow(record)
            row_count += 1

            if first_n and row_count >= first_n:
                break

    print(f"Streamed {row_count} rows to {csv_file}")

# Process a 10GB JSON file without loading it all into memory
stream_json_to_csv('massive_dataset.json', 'output.csv')`}
      </CodeBlock>

      <AlertBox type="info" title="pandas also supports chunking">
        For large files with pandas, use <code>pd.read_json('file.json', lines=True, chunksize=10000)</code> for JSON Lines format, or process in batches.
      </AlertBox>

      <SectionHeader number={6} title="Common Issues and Fixes" />

      <ErrorFix
        bad={`# Missing newline='' parameter
with open('output.csv', 'w') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    # On Windows: produces extra blank lines between rows`}
        good={`# Correct: always use newline='' with csv module
with open('output.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)`}
        badLabel="Missing newline parameter"
        goodLabel="Correct file opening"
      />

      <ErrorFix
        bad={`# Passing raw object list (works but loses nested data silently)
data = json.load(f)
df = pd.DataFrame(data)  # Nested dicts become object columns`}
        good={`# Use json_normalize for proper nested handling
import pandas as pd
data = json.load(f)
df = pd.json_normalize(data, sep='_')  # Flattens nested objects`}
        badLabel="pd.DataFrame loses nested data"
        goodLabel="json_normalize handles nesting"
      />

      <SectionHeader number={7} title="Complete Production Example" />

      <CodeBlock language="python" filename="production_converter.py">
{`"""
Production-ready JSON to CSV converter with error handling,
encoding support, and progress reporting.
"""
import json
import csv
import sys
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def flatten_record(record: dict, sep: str = '.') -> dict:
    def _flatten(obj, prefix=''):
        result = {}
        if isinstance(obj, dict):
            for k, v in obj.items():
                result.update(_flatten(v, f"{prefix}{k}{sep}" if prefix else f"{k}{sep}"))
        elif isinstance(obj, list):
            result[prefix.rstrip(sep)] = json.dumps(obj)
        else:
            result[prefix.rstrip(sep)] = obj
        return result
    return _flatten(record)

def convert_json_to_csv(
    input_path: str,
    output_path: str,
    flatten: bool = True,
    encoding: str = 'utf-8',
) -> int:
    input_file = Path(input_path)
    if not input_file.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    logger.info(f"Reading {input_file.stat().st_size / 1024:.1f} KB from {input_path}")

    with open(input_path, 'r', encoding=encoding) as f:
        data = json.load(f)

    if isinstance(data, dict):
        # Try to find the array inside common wrapper keys
        for key in ('data', 'results', 'items', 'records', 'rows'):
            if key in data and isinstance(data[key], list):
                logger.info(f"Found array at key '{key}'")
                data = data[key]
                break
        else:
            data = [data]

    if not data:
        logger.warning("No records found in JSON")
        return 0

    records = [flatten_record(r) if flatten else r for r in data]

    # Collect all unique fieldnames
    fieldnames = list(dict.fromkeys(k for r in records for k in r.keys()))

    with open(output_path, 'w', newline='', encoding=encoding) as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()
        for record in records:
            writer.writerow({k: record.get(k, '') for k in fieldnames})

    logger.info(f"Wrote {len(records)} rows × {len(fieldnames)} columns to {output_path}")
    return len(records)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python converter.py input.json output.csv")
        sys.exit(1)

    count = convert_json_to_csv(sys.argv[1], sys.argv[2])
    print(f"Done: {count} rows converted")`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'How do I convert JSON to CSV in Python without pandas?',
          answer: 'Use the built-in json and csv modules. Load the JSON with json.load(), then open a CSV file with csv.DictWriter(). Pass fieldnames from the first record\'s keys, call writeheader(), and writerows(data). Always open the CSV file with newline="" to prevent blank lines on Windows.',
        },
        {
          question: 'How do I handle nested JSON when converting to CSV?',
          answer: 'Use pandas pd.json_normalize(data, sep="_") which automatically flattens nested objects into columns like address_city, address_country. For manual control, write a recursive flatten_dict() function that concatenates parent and child keys with a separator.',
        },
        {
          question: 'How do I convert a large JSON file to CSV without running out of memory?',
          answer: 'Use the ijson library for streaming: it iterates over JSON elements without loading the whole file. Install with pip install ijson, then use ijson.items(file, "item") to iterate over array elements one at a time.',
        },
        {
          question: 'How do I include only specific columns in the CSV output?',
          answer: 'Pass your desired columns list as fieldnames to csv.DictWriter(). Set extrasaction="ignore" to silently skip any keys not in your list. For pandas, use df[["col1", "col2", "col3"]].to_csv("output.csv", index=False).',
        },
        {
          question: 'How do I handle JSON arrays within objects when converting to CSV?',
          answer: 'Arrays inside JSON objects cannot directly map to a single CSV cell. Common approaches: 1) Join the array to a comma-separated string with json.dumps(arr) or ", ".join(arr), 2) Create multiple rows (one per array element) using pandas explode(), 3) Create multiple columns (col_0, col_1, etc.) by indexing the array elements.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
