'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToReadJsonFilePython3WaysClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Read a JSON File in Python — 3 Ways Explained</h1>
      <p className="lead">
        Reading JSON files in Python takes 3 lines of code with the built-in <code>json</code>
        module — no installation required. This guide covers the 3 most common approaches:
        reading from a file, parsing from a string, and handling large files efficiently with streaming.
        We also cover writing JSON back to files, error handling, and the most common mistakes
        that trip up beginners.
      </p>

      <StatGrid stats={[
        { value: 'json', label: 'built-in Python module — no pip install needed', color: 'green' },
        { value: 'json.load()', label: 'reads and parses JSON from a file object', color: 'blue' },
        { value: 'json.loads()', label: 'parses JSON from a string (the "s" = string)', color: 'purple' },
        { value: 'dict/list', label: 'what json.load() returns — Python native types', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Method 1 — json.load() to Read from a File" />
      <p>
        This is the standard way to read a JSON file in Python. Use a <code>with</code> statement
        to ensure the file is properly closed after reading, even if an error occurs.
        Always specify <code>encoding='utf-8'</code> to handle international characters correctly.
      </p>
      <CodeBlock lang="python" title="Read JSON from file — the recommended pattern">
{`import json

# Read a JSON file and parse it into a Python object
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)  # returns dict if JSON is object, list if JSON is array

# Access data like a regular Python dict or list
print(data['name'])                # "Alice"
print(data['address']['city'])     # "Boston" (nested dict)
print(data['tags'][0])             # first element of a list
print(data.get('email', 'N/A'))    # safe access with default value

# Example data.json:
# {
#   "name": "Alice",
#   "address": {"city": "Boston", "zip": "02101"},
#   "tags": ["dev", "admin"],
#   "active": true,
#   "score": 9.5
# }

# Type mapping: JSON → Python
# object {}  → dict
# array []   → list
# string ""  → str
# number     → int or float
# true/false → True/False
# null       → None`}
      </CodeBlock>

      <SectionHeader number={2} title="Method 2 — json.loads() to Parse a JSON String" />
      <p>
        Use <code>json.loads()</code> (with an "s") when you already have JSON as a string —
        from an API response, a database column, or a string variable. The most common beginner
        mistake is confusing <code>json.load()</code> (file object) with <code>json.loads()</code> (string).
      </p>
      <CodeBlock lang="python" title="Parse JSON from a string or API response">
{`import json

# Parse from a string
json_string = '{"name": "Alice", "age": 30, "active": true, "data": null}'
data = json.loads(json_string)  # 's' = string
print(data['name'])    # Alice
print(data['active'])  # True (Python bool)
print(data['data'])    # None (Python None)
print(type(data))      # <class 'dict'>

# From an API response using the requests library
import requests
response = requests.get('https://api.example.com/users/1')

# Option 1: requests has built-in JSON parsing
data = response.json()  # parses response.text as JSON automatically

# Option 2: manual parsing (equivalent)
data = json.loads(response.text)

# Option 3: parse a JSON array response
json_array = '[{"id": 1}, {"id": 2}, {"id": 3}]'
items = json.loads(json_array)
print(type(items))    # <class 'list'>
print(items[0]['id']) # 1

# Common mistake: passing a filename string to json.load()
# ❌ json.load('data.json')  → TypeError: expected file object, got str
# ✅ json.load(open('data.json'))  → correct (but use 'with' statement instead)`}
      </CodeBlock>

      <QuickFact color="blue" label="json.load() vs json.loads() memory trick">
        The "s" in <code>json.loads()</code> stands for "string."
        No "s" in <code>json.load()</code> means it expects a file object, not a filename.
        This is the single most common confusion — if you get a TypeError about expecting a file-like object,
        you almost certainly need to add the "s."
      </QuickFact>

      <SectionHeader number={3} title="Method 3 — Handle Large JSON Files with Streaming" />
      <p>
        For large JSON files (100MB+), loading the entire file into memory at once can exhaust
        available RAM. The <code>ijson</code> library provides streaming JSON parsing that processes
        one item at a time without loading the whole file.
      </p>
      <CodeBlock lang="python" title="Streaming large JSON files with ijson">
{`# Standard json.load() loads the ENTIRE file into memory at once
# For large files (100MB+), use ijson for streaming

# Install: pip install ijson
import ijson

# Stream individual items from a top-level JSON array
# Good for: [{"name": "Alice"}, {"name": "Bob"}, ...]
with open('large_users.json', 'rb') as f:  # 'rb' = read binary for ijson
    for user in ijson.items(f, 'item'):    # 'item' = each element of the root array
        process_user(user)  # process one user at a time — low memory usage

# Stream from a nested path
# Good for: {"data": {"users": [{"id": 1}, {"id": 2}, ...]}}
with open('large_response.json', 'rb') as f:
    for user in ijson.items(f, 'data.users.item'):
        print(user['id'])

# Stream key-value pairs from a large object
with open('large_object.json', 'rb') as f:
    parser = ijson.kvitems(f, '')  # root-level key-value pairs
    for key, value in parser:
        print(f"{key}: {value}")

# For moderately large files (under ~100MB):
# json.load() is fine — Python handles it efficiently in most cases
# Only use ijson for genuinely large files where memory is a concern`}
      </CodeBlock>

      <SectionHeader number={4} title="Error Handling When Reading JSON Files" />
      <p>
        JSON reading can fail for several reasons: the file doesn't exist, the content isn't valid JSON,
        or the file uses a different encoding. Always handle these cases explicitly in production code.
      </p>
      <CodeBlock lang="python" title="Comprehensive error handling">
{`import json

def safe_read_json(filepath):
    """Read a JSON file with comprehensive error handling."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)

    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return None

    except PermissionError:
        print(f"No permission to read: {filepath}")
        return None

    except json.JSONDecodeError as e:
        # Provides exact location of the syntax error
        print(f"Invalid JSON: {e.msg}")
        print(f"Error at line {e.lineno}, column {e.colno}")
        print(f"Near: {e.doc[max(0, e.pos-20):e.pos+20]!r}")
        return None

    except UnicodeDecodeError:
        # File might be UTF-16 encoded — try alternative
        try:
            with open(filepath, 'r', encoding='utf-16') as f:
                return json.load(f)
        except Exception:
            print(f"Cannot decode file: {filepath}")
            return None

data = safe_read_json('config.json')
if data is not None:
    process(data)

# For JSON in a string with error location:
broken = '{"name": "Alice", "age": }'  # invalid — trailing content
try:
    json.loads(broken)
except json.JSONDecodeError as e:
    print(f"Error at position {e.pos}: {e.msg}")
    # Error at position 24: Expecting value`}
      </CodeBlock>

      <SectionHeader number={5} title="Writing JSON Back to Files" />
      <CodeBlock lang="python" title="Writing JSON to files with json.dump()">
{`import json
from datetime import datetime

data = {
    "name": "Alice",
    "scores": [95, 87, 92],
    "active": True,
    "address": None
}

# Write to file — json.dump() (no 's')
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)    # indent=2 for human-readable output
    # json.dump(data, f)            # compact, no whitespace

# Convert to string — json.dumps() (with 's')
pretty = json.dumps(data, indent=2)
compact = json.dumps(data, separators=(',', ':'))  # no spaces — minimized

# Sort keys for consistent output (useful for diffs)
sorted_json = json.dumps(data, indent=2, sort_keys=True)

# Handle non-serializable types
data_with_date = {
    "name": "Alice",
    "created_at": datetime.now()    # not JSON serializable!
}

# ❌ json.dumps(data_with_date)  → TypeError: Object of type datetime is not JSON serializable

# ✅ Option 1: Use default=str (converts to ISO string)
json.dumps(data_with_date, default=str)

# ✅ Option 2: Custom serializer for specific types
def custom_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

json.dumps(data_with_date, default=custom_serializer)`}
      </CodeBlock>

      <SectionHeader number={6} title="Common Patterns and Practical Examples" />
      <KeyPointsGrid items={[
        { title: 'Reading a config file', description: 'Use json.load() with a with statement. Provide sensible defaults using dict.get() so missing keys don\'t crash your application. Cache the loaded config at module level rather than re-reading the file on every request.' },
        { title: 'Parsing API responses', description: 'Use requests.response.json() for automatic parsing. Always check response.status_code before parsing. Wrap in try/except for json.JSONDecodeError in case the server returns non-JSON error pages.' },
        { title: 'Saving state between runs', description: 'json.dump() and json.load() make a simple key-value store. Use atomic writes (write to temp file, then rename) to prevent corrupting the state file if the process crashes mid-write.' },
        { title: 'Processing JSONL (JSON Lines)', description: 'JSONL files have one JSON object per line. Parse with: for line in f: data = json.loads(line). This is common for log files and ML training datasets. Each line is parsed independently, so errors on one line don\'t affect others.' },
      ]} />

      <AlertBox type="tip" title="Use pathlib for file paths in modern Python">
        In Python 3.4+, use pathlib.Path instead of raw strings for file paths.
        json.load() and json.dump() accept file objects opened from pathlib.Path.
        Example: path = Path('config/settings.json'); data = json.loads(path.read_text(encoding='utf-8')).
        This handles cross-platform path separators automatically.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between json.load() and json.loads()?',
          answer: 'json.load(f) reads and parses JSON from a file object — f must be an open file, not a filename string. json.loads(s) parses JSON from a string variable — s must be a string. The "s" in loads stands for "string." The most common mistake is calling json.load("filename.json") which raises TypeError because it expects a file object. Either use open() first, or use json.loads(Path("filename.json").read_text()).',
        },
        {
          question: 'How do I handle JSON with comments (JSONC format)?',
          answer: 'Standard Python json module doesn\'t support comments. For JSONC or JSON5 files: install the json5 package (pip install json5) which supports // and /* */ comments and trailing commas. For stripping comments from near-JSON: read as text, remove comments with regex, then json.loads() the cleaned string. Many config files use JSONC — VS Code settings.json is JSONC, for example.',
        },
        {
          question: 'Why does json.loads() fail on valid-looking JSON?',
          answer: 'Common causes: (1) Python boolean capitalization — Python uses True/False/None but JSON requires true/false/null. If you built the string using Python f-strings or str(), the capitalization may be wrong. Always use json.dumps() to generate JSON from Python data. (2) Single quotes — JSON requires double quotes everywhere; single quotes cause parse failure. (3) Trailing commas — valid Python dict/list syntax but not allowed in JSON. (4) BOM characters at the start of the file from Windows text editors — use encoding="utf-8-sig" to strip the BOM.',
        },
        {
          question: 'How do I pretty-print JSON in Python?',
          answer: 'Use json.dumps(data, indent=2) or json.dumps(data, indent=4). The indent parameter controls the number of spaces per level. For printing to terminal: print(json.dumps(data, indent=2)). For writing to file: json.dump(data, f, indent=2). To also sort keys alphabetically: add sort_keys=True. For maximum compression (APIs, databases): use json.dumps(data, separators=(",", ":")) which removes all whitespace.',
        },
        {
          question: 'How do I read a JSON file with unknown structure?',
          answer: 'json.load() always returns a Python type matching the JSON structure — a dict for JSON objects, a list for JSON arrays, and primitives (str, int, float, bool, None) for scalar values. To handle unknown structure: check isinstance(data, dict) or isinstance(data, list) before accessing. For deeply nested unknown structure, use data.get() with defaults for dicts and check len() before indexing into lists.',
        },
        {
          question: 'What\'s the fastest way to read JSON in Python?',
          answer: 'For standard use: built-in json module is fast enough. For performance-critical applications: orjson is significantly faster (written in Rust) and has the same API — import orjson; data = orjson.loads(f.read()). ujson is another fast alternative. For very large files, ijson streaming avoids loading everything into memory. Benchmark comparison: orjson is typically 5–10× faster than the built-in json module for parsing.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
