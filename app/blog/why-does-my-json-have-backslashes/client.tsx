'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, KeyPointsGrid, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhyDoesMyJsonHaveBackslashesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why Does My JSON Have Backslashes? — How to Fix Double-Escaped JSON</h1>
      <p className="lead">
        Seeing <code>{`"{\"name\":\"Alice\"}"`}</code> instead of <code>{`{"name":"Alice"}`}</code>?
        Your JSON is double-escaped — the JSON has been serialized twice. This is one of the most
        common API bugs encountered by developers, especially when connecting frontend applications
        to backend APIs. This guide explains exactly why it happens, how to diagnose it quickly,
        and how to fix it permanently at the source — or work around it client-side when you can't.
      </p>

      <StatGrid stats={[
        { value: 'Double-encode', label: 'JSON serialized twice — the most common cause', color: 'red' },
        { value: 'JSON.parse()', label: 'parses the outer string to get the real object', color: 'green' },
        { value: 'Back-end bug', label: 'usually caused by calling JSON.stringify() twice', color: 'amber' },
        { value: 'API response', label: 'fix by removing extra serialization at source', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="What Does Double-Escaped JSON Look Like?" />
      <p>
        The difference between normal JSON and double-escaped JSON is subtle but critical.
        When you look at a raw API response or log it to your console, the format reveals the problem immediately.
      </p>
      <QuickFact color="blue" label="Visual comparison">
        Normal JSON: <code>{`{"name":"Alice","age":30}`}</code> — parses to an object.<br/>
        Double-escaped: <code>{`"{\"name\":\"Alice\",\"age\":30}"`}</code> — parses to a string.<br/>
        The outer quotes make the entire payload a JSON string <em>containing</em> escaped JSON.
        Parsing once gives you a string. You must parse a second time to get the actual object.
      </QuickFact>
      <p>
        The telltale signs of double-escaped JSON are:
        the response body starts and ends with a double quote character,
        every internal quote is preceded by a backslash (<code>\"</code>),
        and <code>typeof response === 'string'</code> in JavaScript when you expected an object.
        In Postman or Chrome DevTools, the Response tab will show the entire body as a quoted string.
      </p>

      <AlertBox type="error" title="What you see vs what you expect">
        Expected: {`{"name":"Alice","age":30}`} — object with .name property{'\n'}
        Received: {`"{\"name\":\"Alice\",\"age\":30}"`} — a string that contains JSON
      </AlertBox>

      <SectionHeader number={2} title="Root Cause: JSON.stringify() Called Twice in JavaScript" />
      <p>
        The overwhelming majority of double-escaped JSON issues trace back to a single mistake:
        calling <code>JSON.stringify()</code> on a value that is already a JSON string,
        or using a framework method that performs automatic serialization on data you've already serialized.
      </p>
      <ErrorFix
        title="The double-stringify mistake in Node.js"
        bad={`// Backend code — accidentally serializing twice
const user = { name: "Alice", age: 30 };

// First serialization — produces a string
const jsonString = JSON.stringify(user);
// jsonString = '{"name":"Alice","age":30}'

// Second serialization ❌ — serializing the string again
res.json(JSON.stringify(jsonString));
// Client receives: '"{\\\"name\\\":\\\"Alice\\\"}"'
// Because res.json() runs JSON.stringify() internally,
// wrapping your already-stringified string in another layer of quotes`}
        good={`// Option 1: Pass the object directly to res.json()
// res.json() handles all serialization automatically
const user = { name: "Alice", age: 30 };
res.json(user);  // ✅ Correct — serialized exactly once

// Option 2: If you must build the string manually and send it raw
const jsonString = JSON.stringify(user);
res.setHeader('Content-Type', 'application/json');
res.send(jsonString);  // ✅ send the raw string (already valid JSON)
// Do NOT call res.json() when data is already a string`}
        badLabel="JSON.stringify() called on already-stringified value"
        goodLabel="Use res.json(object) OR res.send(string) — never both"
      />

      <SectionHeader number={3} title="Root Cause: Python Flask and Django Double Serialization" />
      <p>
        Python web frameworks have the same trap. The <code>jsonify()</code> function in Flask and
        <code>JsonResponse</code> in Django both serialize your data automatically.
        Passing an already-serialized string to them results in double encoding.
      </p>
      <ErrorFix
        title="Python Flask double serialization"
        bad={`import json
from flask import jsonify

user = {"name": "Alice", "age": 30}

# Manually serialize first
json_string = json.dumps(user)          # → '{"name": "Alice", "age": 30}'

# Then pass the string to jsonify ❌
# jsonify() calls json.dumps() on the string again!
return jsonify(json_string)
# Response body: '"{\\"name\\": \\"Alice\\", \\"age\\": 30}"'`}
        good={`from flask import jsonify, Response
import json

user = {"name": "Alice", "age": 30}

# Option 1: Pass dict directly to jsonify ✅
return jsonify(user)

# Option 2: Return raw JSON string with explicit content-type ✅
json_string = json.dumps(user)
return Response(json_string, mimetype='application/json')`}
        badLabel="json.dumps() + jsonify() = double serialized"
        goodLabel="Pass a dict to jsonify() OR use Response() with raw string"
      />

      <SectionHeader number={4} title="AWS Lambda and API Gateway Double Encoding" />
      <p>
        AWS API Gateway is a particularly common source of double-escaped JSON because it can apply
        its own serialization to Lambda return values. Understanding the flow helps you identify
        where the extra encoding is introduced.
      </p>
      <KeyPointsGrid items={[
        { title: 'How Lambda + API Gateway interacts', description: 'Lambda returns a JavaScript object. API Gateway serializes it based on the Integration Response settings. If your Lambda function returns an already-serialized JSON string instead of an object, API Gateway may serialize it again.' },
        { title: 'The Lambda handler mistake', description: 'Returning JSON.stringify(data) from a Lambda handler instead of returning data directly causes API Gateway to treat the string as a regular string value and wrap it in additional serialization.' },
        { title: 'Lambda Proxy Integration', description: 'When using Lambda Proxy Integration, the body field of the response object should be a string. But if you\'re also wrapping this in JSON.stringify(), the body becomes double-encoded.' },
        { title: 'Content Handling setting', description: 'API Gateway has a "Content Handling" option in integration responses. If set to "Convert to text," it may apply additional encoding. Check this setting and the mapping templates if double encoding persists.' },
      ]} />
      <CodeBlock lang="javascript" title="Correct AWS Lambda handler — return object, not string">
{`// ❌ Common mistake — returns double-encoded JSON
exports.handler = async (event) => {
  const data = { name: "Alice", age: 30 };
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(data))  // ❌ double stringify
  };
};

// ✅ Correct — stringify the body once
exports.handler = async (event) => {
  const data = { name: "Alice", age: 30 };
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // ✅ stringify exactly once for the body field
  };
};`}
      </CodeBlock>

      <SectionHeader number={5} title="Client-Side Fix — Parse Twice When You Can't Fix the Server" />
      <p>
        Sometimes you're consuming a third-party API or legacy service that you can't modify.
        In that case, you need to handle double-encoded responses client-side.
        The approach is straightforward: detect whether the parsed value is a string, and if so, parse again.
      </p>
      <CodeBlock lang="javascript" title="Handle double-encoded JSON client-side">
{`// When you receive double-escaped JSON and can't fix the server
const response = await fetch('/api/user');
const data = await response.json();

// data might be a string instead of an object due to double encoding
if (typeof data === 'string') {
  const actualData = JSON.parse(data);  // parse the inner JSON
  console.log(actualData.name);  // "Alice"
} else {
  console.log(data.name);  // already an object — normal case
}

// Generic helper to safely unwrap potentially double-encoded JSON
function unwrapJson(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;  // not JSON, return the string as-is
    }
  }
  return data;
}

// Usage
const raw = await response.json();
const result = unwrapJson(raw);
// result is always an object (or primitive), never a JSON string`}
      </CodeBlock>

      <AlertBox type="tip" title="Identify the encoding layer using curl">
        Run <code>curl -v https://your-api.com/endpoint</code> and look at the raw response body.
        If the body starts with <code>"</code> and contains <code>\"</code> throughout, it's double-encoded.
        Compare with your framework's output directly (bypass the framework and return raw) to isolate which layer adds the extra encoding.
      </AlertBox>

      <SectionHeader number={6} title="Diagnosing Where the Double Encoding Happens" />
      <VerticalSteps steps={[
        { title: 'Check the raw API response', desc: 'Use curl or Postman to see the raw HTTP response body. If it starts with a quote character, it\'s double-encoded. This rules out client-side parsing issues.' },
        { title: 'Add logging at the serialization point', desc: 'Log the value just before sending the response on the server. If the logged value already contains escaped quotes, the serialization is happening upstream — in middleware or a data access layer.' },
        { title: 'Check middleware stack', desc: 'Many Express/Fastify middleware components serialize responses automatically. If you have JSON serialization middleware AND you call res.json(), you get double encoding. Audit your middleware pipeline.' },
        { title: 'Test framework defaults', desc: 'Create a minimal test endpoint that returns a hardcoded object with res.json(). Compare its output format to the problematic endpoint. If the minimal endpoint works correctly, the issue is in your data handling code, not the framework.' },
        { title: 'Check ORM and database layers', desc: 'Some ORM libraries return stringified JSON for JSON/JSONB database columns. If your database stores {"name":"Alice"} in a JSON column and your ORM returns it as a string, then calling JSON.stringify() on that string double-encodes it.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I identify double-escaped JSON quickly?',
          answer: 'Look for: the entire response being a string (starts and ends with double quotes in the raw body), backslashes before every internal quote (\\"name\\":), or typeof parsedResponse === "string" when you expected an object. In Postman, the Response tab will show the entire body as a quoted string with visible backslashes. In Chrome DevTools Network tab, the Preview panel will show a string instead of an expandable object tree.',
        },
        {
          question: 'Can JSON have backslashes legitimately?',
          answer: 'Yes — in two cases: (1) Strings containing actual backslash characters: "path": "C:\\\\Users\\\\alice" where \\\\ represents a literal backslash. (2) Strings containing actual quote characters that need escaping: "quote": "She said \\"hello\\"". These are legitimate escape sequences within a JSON string value, not double-encoding. The difference: legitimate escapes appear inside a property value, not wrapping the entire JSON structure.',
        },
        {
          question: 'What causes this in AWS Lambda or API Gateway?',
          answer: 'AWS API Gateway can double-serialize when the Lambda return value\'s body field contains an already-serialized JSON string AND API Gateway\'s integration response applies additional serialization. Fix: return a properly structured response object from Lambda where body is a single JSON.stringify() call. Also check the Integration Response mapping templates in API Gateway — a passthrough template should not add additional serialization.',
        },
        {
          question: 'Does this happen with GraphQL APIs?',
          answer: 'Less commonly, but yes. GraphQL servers can double-encode if you manually serialize the response before returning it from a resolver. Most GraphQL frameworks (Apollo, Hasura, GraphQL Yoga) handle serialization automatically. Returning a string from a resolver when the schema expects an object type will cause the server to wrap the string in a JSON response, resulting in a stringified string at the client.',
        },
        {
          question: 'How do I fix this in Spring Boot (Java)?',
          answer: 'Spring Boot uses Jackson to serialize responses. Double encoding happens when you return a String from a @RestController method — Jackson wraps it in JSON string quotes. Fix: return an object instead of a pre-serialized string, or annotate the endpoint with @ResponseBody and set produces = MediaType.APPLICATION_JSON_VALUE with a raw ResponseEntity<String>. The safest fix is always returning POJOs from @RestController methods and letting Jackson handle serialization.',
        },
        {
          question: 'What about JSON stored in databases?',
          answer: 'PostgreSQL and MySQL store JSON/JSONB columns as structured data. Some JDBC drivers and ORMs return these as Java Strings or Python dicts depending on configuration. If your ORM returns a JSON column as a String, then you serialize it again in your response handler, you get double encoding. Check your ORM\'s type mapping configuration and ensure JSON columns are mapped to proper object types, not strings.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
