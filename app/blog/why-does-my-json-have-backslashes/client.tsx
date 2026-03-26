'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhyDoesMyJsonHaveBackslashesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why Does My JSON Have Backslashes? — How to Fix Double-Escaped JSON</h1>
      <p className="lead">
        Seeing <code>{`"{\"name\":\"Alice\"}"`}</code> instead of <code>{`{"name":"Alice"}`}</code>?
        Your JSON is double-escaped — the JSON has been serialized twice. This is one of the most
        common API bugs. This guide explains exactly why it happens and how to fix it.
      </p>

      <StatGrid stats={[
        { value: 'Double-encode', label: 'JSON serialized twice — the most common cause', color: 'red' },
        { value: 'JSON.parse()', label: 'parses the outer string to get the real object', color: 'green' },
        { value: 'Back-end bug', label: 'usually caused by calling JSON.stringify() twice', color: 'amber' },
        { value: 'API response', label: 'fix by removing extra serialization at source', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="What Does Double-Escaped JSON Look Like?" />
      <QuickFact>
        Normal JSON: <code>{`{"name":"Alice","age":30}`}</code><br/>
        Double-escaped: <code>{`"{\"name\":\"Alice\",\"age\":30}"`}</code><br/>
        The outer quotes make it a JSON string containing escaped JSON.
        Parsing it once gives you a string, not an object. You need to parse it again.
      </QuickFact>

      <AlertBox type="error" title="What you see vs what you expect">
        {`Expected: {"name":"Alice","age":30}    ← object\n`}
        {`Received: "{\"name\":\"Alice\",\"age\":30}"  ← string containing JSON`}
      </AlertBox>

      <SectionHeader number={2} title="Why This Happens — JavaScript" />
      <ErrorFix
        bad={`// Backend code — accidentally serializing twice
const user = { name: "Alice", age: 30 };

// First serialization
const jsonString = JSON.stringify(user);
// jsonString = '{"name":"Alice","age":30}'  ← string

// Second serialization ❌ — serializing the string
res.json(JSON.stringify(jsonString));
// Client receives: '"{\\\"name\\\":\\\"Alice\\\"}"'`}
        good={`// Option 1: Don't serialize when using res.json() — it does it automatically
const user = { name: "Alice", age: 30 };
res.json(user);  // ✅ Express/Fastify/etc. handle serialization

// Option 2: If you must build the string manually
const jsonString = JSON.stringify(user);
res.send(jsonString);  // ✅ send raw string (already JSON)
res.setHeader('Content-Type', 'application/json');`}
        badLabel="JSON.stringify() called on already-stringified value"
        goodLabel="Use res.json() OR build and send the string once"
      />

      <SectionHeader number={3} title="Why This Happens — Python" />
      <ErrorFix
        bad={`import json
from flask import jsonify

user = {"name": "Alice", "age": 30}

# Serializing manually then using jsonify
json_string = json.dumps(user)          # ← already a string
return jsonify(json_string)             # ❌ jsonify serializes again!
# Response: "{\"name\": \"Alice\"...}"`}
        good={`from flask import jsonify
import json

user = {"name": "Alice", "age": 30}

# Option 1: Pass dict directly to jsonify
return jsonify(user)  # ✅ Flask handles serialization

# Option 2: Return raw JSON string with correct content-type
json_string = json.dumps(user)
from flask import Response
return Response(json_string, mimetype='application/json')  # ✅`}
        badLabel="json.dumps() + jsonify() = double serialized"
        goodLabel="Use jsonify(dict) or Response with raw string"
      />

      <SectionHeader number={4} title="Client-Side Fix — Parse Twice" />
      <CodeBlock language="javascript" filename="Fix on client when you can't fix the server">
{`// When you receive double-escaped JSON and can't fix the server
const response = await fetch('/api/user');
const data = await response.json();

// data might be a string instead of an object
if (typeof data === 'string') {
  const actualData = JSON.parse(data);  // parse again
  console.log(actualData.name);  // "Alice"
} else {
  console.log(data.name);  // already an object
}

// Generic helper to handle both cases
function safeParseJson(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;  // return as-is if it's just a plain string
    }
  }
  return data;
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'How do I identify double-escaped JSON quickly?',
          answer: 'Look for: the entire response being a string (starts and ends with "), backslashes before every quote inside (\\"name\\":), or typeof response === "string" when you expected an object. In Postman/DevTools, if the Response shows "{ or the raw body has escaped quotes, it\'s double-escaped.',
        },
        {
          question: 'Can JSON have backslashes legitimately?',
          answer: 'Yes — in two cases: (1) Strings containing actual backslash characters: "path": "C:\\\\Users\\\\alice" (the \\\\ represents a literal backslash). (2) Strings containing actual quote characters that need escaping: "quote": "She said \\"hello\\"". These are legitimate escapes within a JSON string value, not double-encoding.',
        },
        {
          question: 'What causes this in AWS Lambda or API Gateway?',
          answer: 'AWS API Gateway sometimes double-serializes when the Lambda return value is already a JSON string and API Gateway also applies JSON serialization. Fix: in Lambda, return an object (not a JSON string) from the handler. In API Gateway, ensure "Content Handling" is set appropriately and the integration response is not applying additional JSON encoding.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
