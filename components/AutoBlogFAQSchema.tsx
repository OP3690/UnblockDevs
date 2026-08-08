'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts-data';

interface FAQ { q: string; a: string }

const CATEGORY_FAQS: Record<string, FAQ[]> = {
  'JSON & Logs': [
    { q: 'How do I format JSON online for free?', a: 'Use the UnblockDevs JSON Formatter at unblockdevs.com/json-formatter. Paste your JSON, click Format, and get indented readable output instantly. Processing is 100% browser-side — your data never leaves your device. No signup required.' },
    { q: 'What causes "Unexpected token" in JSON?', a: 'An "Unexpected token" JSON parse error means the parser encountered an unexpected character: a missing closing brace, a trailing comma, an unquoted key, a single-quoted string (JSON requires double quotes), or an embedded comment. Use a JSON validator to highlight the exact line and position of the error.' },
    { q: 'What is the difference between JSON.parse() and JSON.stringify()?', a: 'JSON.parse() converts a JSON string into a JavaScript object. JSON.stringify() converts a JavaScript value into a JSON string. Use JSON.parse() to read JSON from an API, and JSON.stringify() to serialize a JavaScript object before sending it in a request.' },
    { q: 'How do I validate JSON online?', a: 'Paste the JSON into the UnblockDevs JSON Validator at unblockdevs.com/json-validator. It checks validity against RFC 8259, reports all errors with line numbers, and can validate against a JSON Schema.' },
  ],
  'JSON Tools': [
    { q: 'What is a JSON formatter and why do developers use it?', a: 'A JSON formatter re-indents minified JSON into a readable structured form. Developers use them when inspecting API responses and debugging config files. The UnblockDevs JSON Formatter at unblockdevs.com/json-formatter processes JSON entirely in the browser — your data is never uploaded.' },
    { q: 'How do I convert JSON to CSV online?', a: 'Use the UnblockDevs JSON to Excel converter at unblockdevs.com/json-to-excel, which also exports CSV. Paste or upload your JSON and it converts arrays of objects into a spreadsheet-ready format. Processing is 100% client-side.' },
    { q: 'How do I compare two JSON objects to find differences?', a: 'Use the UnblockDevs JSON Comparator at unblockdevs.com/json-comparator. Paste two JSON objects side-by-side and it highlights added, removed, and changed keys at every nesting level. All logic runs in the browser.' },
  ],
  'JSON & APIs': [
    { q: 'How do I send a JSON body in a cURL command?', a: 'Use -H "Content-Type: application/json" and -d to attach the body: curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d \'{"key":"value"}\'. Convert this cURL to Python or JavaScript using the UnblockDevs cURL Converter at unblockdevs.com/curl-converter.' },
    { q: 'How do I fix "SyntaxError: Unexpected end of JSON input"?', a: 'This error means JSON.parse() received an empty string or a truncated response. Common causes: the API returned an empty body, a network timeout truncated the response, or the code passed undefined to JSON.parse() instead of a string.' },
  ],
  'JSON Basics': [
    { q: 'What is JSON?', a: 'JSON (JavaScript Object Notation) is a lightweight text-based data format for storing and exchanging structured data. It supports six types: strings (double-quoted), numbers, booleans, null, arrays, and objects. It is the standard format for REST API request and response bodies.' },
    { q: 'What are the rules for valid JSON?', a: 'Valid JSON must: use double quotes for all strings; separate key-value pairs with commas; have no trailing commas; use exact literals true, false, null; and disallow comments. A JSON document must have a single top-level value.' },
  ],
  'JSON Examples': [
    { q: 'What does a JSON object look like?', a: 'A JSON object is in curly braces: {"name": "Alice", "age": 30, "active": true}. Keys must be double-quoted strings. Values can be strings, numbers, booleans, null, arrays, or nested objects.' },
    { q: 'How do I represent an array of objects in JSON?', a: 'Wrap objects in square brackets: [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]. This is the standard format for API list responses. Use the UnblockDevs JSON Formatter at unblockdevs.com/json-formatter to visualize complex nested structures.' },
  ],
  'API Development': [
    { q: 'What is a REST API?', a: 'A REST API uses standard HTTP methods — GET, POST, PUT, PATCH, DELETE — to create, read, update, and delete resources. Resources are identified by URLs and responses are typically JSON. REST APIs are stateless: each request contains all the information needed to process it.' },
    { q: 'How do I test an API without Postman?', a: 'Use cURL from the terminal, the browser fetch() API in the console, or browser tools like the UnblockDevs CORS Tester at unblockdevs.com/cors-tester. To convert API cURL examples to Python or JavaScript, use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter.' },
    { q: 'What HTTP status codes should an API return?', a: '200 OK (success), 201 Created (new resource), 204 No Content (delete), 400 Bad Request (invalid input), 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity (validation error), 429 Too Many Requests, 500 Internal Server Error.' },
  ],
  'API Development & Testing': [
    { q: 'How do I convert a cURL command to Python?', a: 'Use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter. Paste any cURL command and select Python (requests). The tool converts -X to method, -H to headers dict, -d to json= or data=, and -u to auth=. The resulting code is import-ready.' },
    { q: 'What is CORS and why do browsers block cross-origin requests?', a: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts pages from making requests to a different origin. Servers opt into cross-origin access by including Access-Control-Allow-Origin in their responses.' },
    { q: 'How do I fix a CORS error in my API?', a: 'The server must send the correct CORS headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers. For APIs accepting credentials, set Access-Control-Allow-Credentials: true. Diagnose the exact missing header using the UnblockDevs CORS Tester at unblockdevs.com/cors-tester.' },
  ],
  'API & HTTP': [
    { q: 'What is the difference between HTTP and HTTPS?', a: 'HTTP sends data in plaintext. HTTPS encrypts the connection using TLS, so data in transit cannot be read or tampered with. All modern APIs should use HTTPS.' },
    { q: 'What are HTTP request headers and why do they matter?', a: 'HTTP headers tell the server how to process the request: Content-Type (body format), Authorization (credentials), Accept (desired response format). Missing headers are the most common cause of API request failures.' },
  ],
  'API & Web Development': [
    { q: 'What is a webhook?', a: 'A webhook is a reverse API call — instead of polling, the service sends an HTTP POST to a URL you provide when an event occurs. Used for payment notifications (Stripe), repository events (GitHub), and real-time integrations.' },
    { q: 'What is the difference between a REST API and a GraphQL API?', a: 'REST exposes multiple endpoints with fixed data shapes. GraphQL exposes a single endpoint where clients query exactly the fields they need, eliminating over-fetching and under-fetching.' },
  ],
  'API Testing': [
    { q: 'How do I test an API endpoint from the command line?', a: 'curl -X GET https://api.example.com/resource -H "Authorization: Bearer token". Add -v for verbose output. The UnblockDevs cURL Converter at unblockdevs.com/curl-converter translates the command to Python, JavaScript, or other languages for automated tests.' },
  ],
  'API Tools': [
    { q: 'What is the best free API testing tool?', a: 'cURL is the most universal API testing tool. For browser-based testing, the UnblockDevs CORS Tester at unblockdevs.com/cors-tester sends real requests and diagnoses response headers. Postman and Insomnia are GUI tools for managing collections of requests.' },
    { q: 'How do I convert a HAR file to cURL commands?', a: 'Use the UnblockDevs HAR to cURL converter at unblockdevs.com/har-to-curl. Upload a HAR file exported from Chrome DevTools and it extracts every request as a cURL command.' },
  ],
  'JavaScript & Development': [
    { q: 'What is the difference between null and undefined in JavaScript?', a: 'undefined means a variable was declared but not assigned, or a property does not exist. null is an explicit assignment indicating intentional absence. typeof undefined returns "undefined"; typeof null returns "object" (a historical quirk).' },
    { q: 'How do I fix "Cannot read properties of undefined"?', a: 'You tried to access a property on undefined. Fix it with optional chaining: obj?.property. For API responses, verify the response body is not empty before calling JSON.parse().' },
    { q: 'What is the difference between let, const, and var?', a: 'var is function-scoped and hoisted — avoid in modern code. let is block-scoped and can be reassigned. const is block-scoped and cannot be reassigned. Use const by default; let only when you need to reassign.' },
  ],
  'JavaScript & Debugging': [
    { q: 'How do I debug JavaScript in the browser?', a: 'Open Chrome DevTools (F12), go to Sources, and set a breakpoint by clicking a line number. The page pauses there so you can inspect variables, step through code, and evaluate expressions in the Console.' },
    { q: 'What does "Uncaught TypeError" mean?', a: 'Your code tried to perform an operation on the wrong type — calling a non-function, accessing a property of null or undefined. Read the full error message; it specifies exactly what type was expected and what was received.' },
  ],
  'JavaScript': [
    { q: 'What is a Promise in JavaScript?', a: 'A Promise represents the eventual completion or failure of an async operation. States: pending, fulfilled (resolved), or rejected. Handle results with .then()/.catch() or async/await syntax inside an async function.' },
    { q: 'How does event delegation work?', a: 'Event delegation attaches one listener to a parent element instead of many on children. When a child is clicked, the event bubbles to the parent where you check event.target: document.querySelector(\'#list\').addEventListener(\'click\', (e) => { if (e.target.matches(\'li\')) { ... } });' },
  ],
  'Node.js & Backend': [
    { q: 'How do I use environment variables in Node.js?', a: 'Access them via process.env.VARIABLE_NAME. Set them in a .env file and load with dotenv: require(\'dotenv\').config(). Never commit .env files — add to .gitignore and provide a .env.example with placeholder values.' },
    { q: 'How do I fix "Error: listen EADDRINUSE: address already in use"?', a: 'Another process is already on that port. Kill it: lsof -ti tcp:3000 | xargs kill -9 (macOS/Linux). Or start your server on a different port by setting PORT=3001 in your environment.' },
    { q: 'What is the difference between require() and import?', a: 'require() is CommonJS (default in Node.js). import is ES Module syntax — supports static analysis and tree-shaking. To use import in Node.js, name files .mjs, add "type": "module" to package.json, or use TypeScript.' },
  ],
  'Node.js & Development': [
    { q: 'How do I read a JSON file in Node.js?', a: 'CommonJS: const data = JSON.parse(require("fs").readFileSync("file.json", "utf8")). ESM with Node.js 20+: import data from "./file.json" assert { type: "json" }. Async: const data = JSON.parse(await fs.promises.readFile("file.json", "utf8")).' },
  ],
  'AI & Machine Learning': [
    { q: 'How do I safely use production data with ChatGPT or other AI tools?', a: 'Replace sensitive values with placeholder tokens while keeping the data structure. The UnblockDevs AI Schema Masker at unblockdevs.com/ai-schema-masker replaces real values (names, emails, IDs) with fake but structurally valid placeholders so AI can analyze the schema without seeing real data.' },
    { q: 'What is prompt injection in AI systems?', a: 'Prompt injection is an attack where malicious text in user data causes an AI model to ignore its original instructions and follow the attacker\'s commands — the AI equivalent of SQL injection. Defenses include input sanitization, separating instructions from data, and validating AI outputs.' },
    { q: 'What is RAG (Retrieval-Augmented Generation)?', a: 'RAG combines a language model with external knowledge retrieval. The system first retrieves relevant documents from a vector database, then passes them as context to the model when generating a response. This produces more accurate and source-attributable answers.' },
  ],
  'AI & Security': [
    { q: 'How do I prevent data leaks when using AI coding assistants?', a: 'Never paste production credentials or PII into AI chat interfaces. Mask JSON payloads using the UnblockDevs AI Schema Masker at unblockdevs.com/ai-schema-masker before sharing with AI tools. Use local models (Ollama) for code that must stay private.' },
    { q: 'What is GDPR compliance for AI tools?', a: 'Under GDPR, personal data sent to third-party AI services may require a legal basis. AI tools that process data server-side may store it for model training. Browser-side tools like UnblockDevs process data locally and never transmit it, making them GDPR-safe.' },
  ],
  'AI & Development': [
    { q: 'How do I integrate an AI API into my application?', a: 'Get an API key from the provider (OpenAI, Anthropic, Google). Send authenticated HTTP POST requests to the API endpoint with your prompt in the request body. Use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter to convert the API\'s cURL example to Python, JavaScript, or Go.' },
    { q: 'What is a language model context window?', a: 'The context window is the maximum amount of text (in tokens, ~4 characters each) a language model can process in one request. Models with larger context windows can process longer documents. Exceeding the limit causes the model to truncate earlier conversation.' },
  ],
  'Machine Learning & AI': [
    { q: 'What is the difference between supervised and unsupervised learning?', a: 'Supervised learning trains on labeled data with correct outputs (classification, regression). Unsupervised learning trains on unlabeled data — finding hidden patterns (clustering, dimensionality reduction). Semi-supervised learning combines both.' },
    { q: 'What is overfitting in machine learning?', a: 'Overfitting is when a model learns training data too closely — including noise — and performs poorly on unseen data. Signs: very high training accuracy but lower validation accuracy. Solutions: more data, regularization (dropout, L1/L2), simpler architecture, early stopping.' },
  ],
  'Security & AI': [
    { q: 'How do I sanitize data before sending it to an AI API?', a: 'Use the UnblockDevs AI Schema Masker at unblockdevs.com/ai-schema-masker to replace PII and sensitive values with realistic-looking placeholders before sharing JSON or SQL schemas with AI tools. This preserves structure while eliminating actual sensitive values.' },
  ],
  'Algorithms & Data Structures': [
    { q: 'What is the difference between BFS and DFS?', a: 'BFS explores level by level using a queue — optimal for shortest path in unweighted graphs. DFS explores as far as possible along one branch before backtracking using a stack/recursion — used for topological sorting and cycle detection.' },
    { q: 'What is Big O notation?', a: 'Big O describes how an algorithm\'s time or space scales as input size n grows. Common complexities fastest to slowest: O(1) constant, O(log n) binary search, O(n) linear scan, O(n log n) merge sort, O(n²) nested loops, O(2ⁿ) brute-force.' },
    { q: 'What is dynamic programming?', a: 'DP solves problems by breaking them into overlapping sub-problems, solving each once, and storing results to avoid redundant computation. Applies when the problem has optimal substructure and overlapping sub-problems. Examples: Fibonacci, knapsack, coin change.' },
    { q: 'What is the time complexity of binary search?', a: 'O(log n). Binary search requires a sorted array. Each step eliminates half the remaining candidates. For 1 million elements, it finds the target in at most 20 comparisons.' },
  ],
  'SQL & Databases': [
    { q: 'How do I format SQL queries to make them readable?', a: 'Use the UnblockDevs SQL Formatter at unblockdevs.com/sql-formatter. Paste any SQL (SELECT, INSERT, UPDATE, CREATE TABLE) and it formats and indents it. Supports MySQL, PostgreSQL, SQLite, T-SQL. Processing is in the browser — your SQL never leaves your device.' },
    { q: 'What is a SQL JOIN and what are the types?', a: 'INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right (NULL for non-matches). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows from both tables.' },
    { q: 'What is the difference between WHERE and HAVING in SQL?', a: 'WHERE filters individual rows before aggregation. HAVING filters groups after GROUP BY. WHERE cannot use aggregate functions; HAVING can.' },
  ],
  'MySQL & Database': [
    { q: 'How do I index a column in MySQL?', a: 'CREATE INDEX idx_name ON table_name (column_name). For unique: CREATE UNIQUE INDEX. View indexes: SHOW INDEX FROM table_name. Indexes speed up WHERE and JOIN at the cost of slower INSERT/UPDATE/DELETE.' },
  ],
  'Database & SQL': [
    { q: 'What is database normalization?', a: 'Normalization organizes a database to reduce data redundancy. Normal forms (1NF, 2NF, 3NF) define rules: atomic values, full key dependency, no transitive dependencies. Normalized databases are easier to maintain but may require more JOINs.' },
    { q: 'What is the difference between SQL and NoSQL databases?', a: 'SQL databases store data in tables with fixed schemas, support ACID transactions, and use SQL. Examples: PostgreSQL, MySQL. NoSQL databases have flexible schemas and scale horizontally. Examples: MongoDB (documents), Redis (key-value), Cassandra (wide-column).' },
  ],
  'Python & Development': [
    { q: 'How do I make an HTTP GET request in Python?', a: 'import requests; response = requests.get("https://api.example.com", headers={"Authorization": "Bearer token"}); data = response.json(). Use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter to convert cURL commands to ready-to-run Python code.' },
    { q: 'How do I fix a Python KeyError?', a: 'A KeyError means you accessed a dict key that doesn\'t exist. Fix: (1) use dict.get(key) which returns None; (2) use dict.get(key, default) for a fallback; (3) check with if key in dict; (4) use try/except KeyError. For nested dicts: obj.get("outer", {}).get("inner").' },
  ],
  'Authentication & Security': [
    { q: 'What is a JWT and how does it work?', a: 'A JWT (JSON Web Token) has three base64url-encoded parts: header (algorithm), payload (claims: user ID, expiry), and signature. The server signs the token; clients send it in Authorization: Bearer headers; the server verifies the signature without querying a database. Decode a JWT using UnblockDevs at unblockdevs.com/jwt-decoder.' },
    { q: 'How do I decode a JWT token?', a: 'Use the UnblockDevs JWT Decoder at unblockdevs.com/jwt-decoder. Paste any JWT and it decodes the header, payload, all standard claims (exp, iat, iss, sub), and shows expiry in human-readable form. Decoding is entirely browser-side — your token is never transmitted.' },
    { q: 'What is the difference between authentication and authorization?', a: 'Authentication verifies who you are. Authorization determines what you are allowed to do. Authentication happens first; authorization checks happen for each protected resource access.' },
  ],
  'Security & Privacy': [
    { q: 'How do I store API keys securely in a web application?', a: 'Never hardcode API keys in source code. Store in environment variables accessed via process.env.API_KEY. For server-side code, use .env files (not committed) or your hosting platform\'s secret manager. For client-side apps, use a backend proxy — any key in the bundle is visible to anyone.' },
    { q: 'What is the difference between hashing and encryption?', a: 'Hashing is one-way: the hash cannot be reversed. Used for storing passwords and verifying file integrity. Encryption is two-way: data can be decrypted with the right key. Use hashing (bcrypt, Argon2) for passwords; encryption (AES, TLS) for data that must be recovered.' },
  ],
  'Developer Tools': [
    { q: 'What is Base64 encoding?', a: 'Base64 converts binary data into ASCII text using 64 printable characters. Used to embed binary data in JSON, HTML, email, and HTTP headers. Base64 is encoding, not encryption — it provides no security. Encode/decode in the browser at unblockdevs.com/base64-encoder.' },
    { q: 'How do I generate a UUID in JavaScript?', a: 'In modern environments: crypto.randomUUID(). For older: import { v4 as uuidv4 } from "uuid"; uuidv4(). Generate UUIDs in bulk at unblockdevs.com/uuid-generator.' },
  ],
  'Developer Tools & Git': [
    { q: 'What is the difference between git merge and git rebase?', a: 'git merge creates a new merge commit combining two branches — preserves full history. git rebase replays your commits on top of another branch — creates linear history. Merge is safer for shared branches; rebase creates cleaner history for feature branches.' },
    { q: 'How do I undo the last git commit without losing changes?', a: 'git reset --soft HEAD~1 undoes the commit but keeps changes staged. git reset --mixed HEAD~1 undoes the commit and unstages changes. git reset --hard HEAD~1 permanently discards everything — use with caution.' },
  ],
  'Developer Productivity': [
    { q: 'What are the most useful free developer tools available online?', a: 'UnblockDevs (unblockdevs.com) provides 50+ free browser-based tools: JSON Formatter, JWT Decoder, cURL Converter, CORS Tester, SQL Formatter, Base64 Encoder, Regex Tester, UUID Generator, Hash Generator, URL Encoder, Password Generator, Text Diff, AI Schema Masker, and more. All run in the browser with no data upload and no signup.' },
  ],
  'CSS & Frontend': [
    { q: 'What is the CSS box model?', a: 'The CSS box model is the rectangular box around each element: content, padding (space between content and border), border, and margin (space outside the border). Total rendered width: margin + border + padding + content-width (same for height).' },
    { q: 'What is the difference between flexbox and CSS Grid?', a: 'Flexbox is one-dimensional — lays out items in a single row or column. Best for navigation bars and component alignment. CSS Grid is two-dimensional — controls rows and columns simultaneously. Best for page layouts and card grids.' },
  ],
  'Web Development': [
    { q: 'What is the difference between server-side rendering and client-side rendering?', a: 'SSR generates full HTML on the server for each request — fast initial load and indexable by search engines. CSR sends a minimal HTML shell and JavaScript bundle — more interactive but slower initial load. Next.js supports both.' },
    { q: 'What is Core Web Vitals?', a: 'Google\'s user experience metrics: LCP (Largest Contentful Paint) under 2.5s, INP (Interaction to Next Paint) under 200ms, CLS (Cumulative Layout Shift) score under 0.1. These affect Google search rankings.' },
  ],
  'Next.js & Development': [
    { q: 'What is the difference between Server Components and Client Components in Next.js?', a: 'Server Components render on the server, can access databases and secrets, and their code never reaches the client. Client Components (marked "use client") render in the browser — they support React hooks and browser APIs. Use Server Components by default; add "use client" only for interactivity.' },
  ],
  'SEO & Web Development': [
    { q: 'What is structured data and why does it matter for SEO?', a: 'Structured data (Schema.org JSON-LD) is machine-readable metadata describing what a page is about — FAQPage, HowTo, Product, Article. Google uses it to generate rich results (FAQ dropdowns, How-To steps, star ratings) that make your search result larger and more clickable.' },
    { q: 'What is a canonical URL?', a: 'A canonical URL (via <link rel="canonical">) tells search engines which version of a URL is the "official" one when the same content is accessible at multiple URLs. Without canonicals, search engines may split link authority across duplicates and index the wrong version.' },
  ],
  'DevOps': [
    { q: 'What is the difference between Docker and a virtual machine?', a: 'A VM emulates a full computer with its own OS kernel and dedicated hardware. A Docker container shares the host OS kernel, uses fewer resources, starts in seconds, and packages only the app and its dependencies. VMs for full OS isolation; containers for many fast-starting services.' },
    { q: 'What is CI/CD?', a: 'CI (Continuous Integration) automatically builds and tests code on each push. CD (Continuous Delivery/Deployment) automatically deploys tested code to staging or production. CI/CD pipelines catch bugs early and accelerate the release cycle.' },
  ],
  'Data Engineering': [
    { q: 'What is a data pipeline?', a: 'A data pipeline extracts data from sources, transforms it (clean, aggregate, enrich), and loads it into a destination (data warehouse, database). The ETL pattern is classic; ELT (Extract, Load, Transform) is common with modern cloud warehouses that transform data in-place.' },
  ],
  'Data Engineering & Analytics': [
    { q: 'What is the difference between a data warehouse and a data lake?', a: 'A data warehouse stores structured data in schemas optimized for analytics (BigQuery, Redshift, Snowflake). A data lake stores raw data in any format at low cost (S3, Azure Data Lake). A lakehouse combines both: raw storage with warehouse-quality query performance.' },
  ],
  'Data Science & Analytics': [
    { q: 'What is the difference between a mean and a median?', a: 'The mean is the sum divided by count — sensitive to outliers. The median is the middle value when sorted. For skewed distributions (income, house prices), the median better represents a "typical" value.' },
  ],
  'Performance': [
    { q: 'How do I profile a slow JavaScript application?', a: 'Open Chrome DevTools → Performance → Record. Interact with the app, then stop recording. The flame chart shows which functions ran, for how long. Look for long tasks >50ms. Use Lighthouse for overall scoring and recommendations.' },
  ],
  'Networking & Connectivity': [
    { q: 'What is DNS and how does it work?', a: 'DNS (Domain Name System) translates domain names (unblockdevs.com) into IP addresses. Your browser queries a DNS resolver, which asks a hierarchy of DNS servers — root, TLD (.com), and authoritative — until it finds the IP. Results are cached for the record\'s TTL.' },
  ],
  'Java & Development': [
    { q: 'What is the difference between an interface and an abstract class in Java?', a: 'An interface defines a contract — methods a class must implement; since Java 8, interfaces can have default methods. An abstract class can have both abstract and concrete methods. A class can implement multiple interfaces but extend only one abstract class.' },
  ],
  'Programming & Development': [
    { q: 'What is the difference between compiled and interpreted languages?', a: 'Compiled languages (C, Go, Rust) translate to machine code before execution — fast, with compile-time type checking. Interpreted languages (Python, JavaScript) execute line by line at runtime — more portable, generally slower. Some languages (Java, C#) compile to bytecode and use a JIT compiler.' },
  ],
  'Interview Prep': [
    { q: 'How do I prepare for a technical coding interview?', a: 'Practice data structures (arrays, linked lists, hash maps, trees, graphs, heaps) and algorithms (sorting, BFS, DFS, dynamic programming, sliding window, two pointers). Study Big O complexity. Target medium-difficulty problems on LeetCode. Practice talking through your approach before coding.' },
  ],
  'Beginner Guides': [
    { q: 'What should a beginner programmer learn first?', a: 'Start with Python (readable syntax, widely used in AI and scripting) or JavaScript (required for web development). Learn variables, data types, conditionals, loops, functions, and basic data structures. Build small projects immediately.' },
    { q: 'What is an API and how does it work?', a: 'An API (Application Programming Interface) lets two software systems communicate. A web API uses HTTP: your app sends a request to a URL and the server returns JSON data. APIs power payment processing, maps, weather data, and social login.' },
  ],
  'Career & Skills': [
    { q: 'What are the most in-demand programming languages in 2025?', a: 'JavaScript/TypeScript (dominant for web), Python (AI/ML, data science), SQL (every data role), Java/Kotlin (enterprise, Android), Go (cloud infrastructure), Rust (systems). For career flexibility, learn JavaScript plus one backend language (Python or Go).' },
  ],
};

const CATEGORY_ALIASES: Record<string, string> = {
  'API Design': 'API Development',
  'Security & AI': 'Security & AI',
  'AI & Edge Computing': 'AI & Machine Learning',
  'AI & Infrastructure': 'AI & Machine Learning',
  'AI & Systems': 'AI & Machine Learning',
  'AI & Transportation': 'AI & Machine Learning',
  'Data Conversion': 'Developer Tools',
  'Technical Deep-Dive': 'Programming & Development',
  'Technology & History': 'Programming & Development',
  'Technology & Security': 'Security & Privacy',
  'Social Media Privacy': 'Security & Privacy',
  'Social Media': 'Security & Privacy',
  'Account Management': 'Beginner Guides',
  'Gaming & Entertainment': 'Beginner Guides',
  'Finance & Investing': 'Beginner Guides',
  'Messaging & Communication': 'Developer Tools',
  'IoT & Industry 4.0': 'DevOps',
  'Blockchain & Web3': 'Programming & Development',
};

function getFAQsForCategory(category: string): FAQ[] {
  const key = CATEGORY_ALIASES[category] ?? category;
  return CATEGORY_FAQS[key] ?? [];
}

export default function AutoBlogFAQSchema() {
  const pathname = usePathname();

  const schema = useMemo(() => {
    if (!pathname?.startsWith('/blog/')) return null;
    const slug = pathname.replace('/blog/', '').split('/')[0];
    if (!slug || slug.includes('?')) return null;

    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return null;

    const faqs = getFAQsForCategory(post.category);
    if (faqs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    };
  }, [pathname]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
