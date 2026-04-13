'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function SqlListToInClauseClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Convert Any List to SQL IN Clause — CSV, Excel, JSON, Newline</h1>
      <p className="lead">
        You have a list of IDs in a spreadsheet, a CSV export, a JSON response, or a plain
        text file. You need a SQL <code>WHERE id IN (...)</code> clause. Manually formatting
        hundreds of values is slow and error-prone. This guide covers every method to convert
        any list format to a SQL IN clause — from a one-click online tool to Python/JavaScript
        scripts, Excel formulas, and command-line approaches.
      </p>

      <StatGrid stats={[
        { value: '< 5s', label: 'Paste any format → get a SQL IN clause in under 5 seconds online', color: 'blue' },
        { value: '5 DBs', label: 'MySQL, PostgreSQL, SQL Server, Oracle, SQLite — correct quoting for each', color: 'green' },
        { value: '5 fmts', label: 'Output as SQL IN, JSON, CSV, GraphQL, or MongoDB filter in one click', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Method 1 — Online SQL IN Clause Generator (Fastest)" />
      <p>
        The fastest method for any list size. No code, no formulas, no manual editing.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Copy your list from any source',
          desc: 'Select the IDs in Excel (one column), a CSV file, a JSON array, a text file, or any app. Copy them to clipboard. Any format works — comma-separated, newline, tab, JSON array, or mixed.',
        },
        {
          title: 'Paste into unblockdevs.com/sql-formatter',
          desc: 'Go to the SQL IN Clause Generator. Paste your list into the input box. The tool auto-detects the format — CSV, newline, JSON array, tab-separated — and normalizes it automatically.',
        },
        {
          title: 'Select value type and database',
          desc: 'Choose Numeric (no quotes) or String (with quotes). Select your database: MySQL, PostgreSQL, SQL Server, Oracle, or SQLite. Each applies the correct string quoting for that dialect.',
        },
        {
          title: 'Click Format — get the IN clause',
          desc: 'Click Format or press ⌘+Enter. Duplicates are removed automatically. The SQL IN clause appears instantly. Click Copy to copy to clipboard, or download as .sql or .csv.',
        },
        {
          title: 'Use advanced options if needed',
          desc: 'Enable Parameterized for prepared statements, set Chunk Size for Oracle\'s 1000-item limit, enable Range Compression for consecutive numeric IDs, or switch to JSON/GraphQL/MongoDB output.',
        },
      ]} />

      <SectionHeader number={2} title="Method 2 — Excel Formula to Generate SQL IN Clause" />

      <CodeBlock lang="text" title="Excel formulas to build a SQL IN clause">
{`-- Assume IDs are in column A (A1:A100)

---- Method 1: TEXTJOIN (Excel 2019+, 365) ----
For numeric IDs (no quotes):
  =TEXTJOIN(", ", TRUE, A1:A100)
  Then manually add: WHERE id IN ( ... );

For string IDs (with single quotes):
  ="WHERE id IN ('" & TEXTJOIN("', '", TRUE, A1:A100) & "')"
  Result: WHERE id IN ('alice@example.com', 'bob@example.com', ...)

---- Method 2: CONCATENATE per row (older Excel) ----
In B1: =IF(A1="", "", "'" & A1 & "',")
Drag down through B100
Then copy column B into a text editor and join

---- Method 3: Power Query (any size, recommended for 1000+ rows) ----
1. Load IDs into Power Query
2. Add Column → Custom Column: = "'" & [ID] & "'"
3. Transform → Merge Column with ", " delimiter
4. Copy the result and wrap in WHERE id IN ( ... );`}
      </CodeBlock>

      <QuickFact color="blue" label="TEXTJOIN is the fastest Excel method for small lists">
        For lists under ~500 items, the Excel <code>TEXTJOIN</code> formula is the quickest manual
        approach. For larger lists, copy the entire column and paste into the online SQL IN Clause
        Generator — it handles 10,000+ items instantly without formula complexity.
      </QuickFact>

      <SectionHeader number={3} title="Method 3 — Python Script to Convert CSV to SQL IN Clause" />

      <CodeBlock lang="python" title="Python: convert CSV column or list to SQL IN clause">
{`import csv

# ---- From a CSV file ----
def csv_column_to_sql_in(filepath, column_name, value_type='string', db='mysql'):
    """Convert a CSV column to a SQL IN clause."""
    with open(filepath, newline='') as f:
        reader = csv.DictReader(f)
        values = [row[column_name].strip() for row in reader if row[column_name].strip()]

    # Deduplicate while preserving order
    seen = set()
    unique = [v for v in values if not (v in seen or seen.add(v))]

    if value_type == 'string':
        formatted = ', '.join(f"'{v}'" for v in unique)
    else:
        formatted = ', '.join(unique)

    return f"WHERE {column_name} IN ({formatted});"

# Usage
print(csv_column_to_sql_in('users.csv', 'user_id', value_type='numeric'))

# ---- From a plain list ----
ids = [1001, 1002, 1003, 1004, 1005]
placeholders = ', '.join(str(i) for i in ids)
print(f"WHERE id IN ({placeholders});")

# ---- Parameterized (psycopg2 PostgreSQL style) ----
ids = [1, 2, 3, 4, 5]
params = ', '.join('$' + str(i+1) for i in range(len(ids)))
print("WHERE id IN (" + params + ");")  # WHERE id IN ($1, $2, $3, $4, $5)

# ---- Chunked for Oracle (1000-item limit) ----
def chunked_in(ids, chunk_size=1000, value_type='numeric', column='id'):
    chunks = [ids[i:i+chunk_size] for i in range(0, len(ids), chunk_size)]
    conditions = []
    for chunk in chunks:
        if value_type == 'string':
            vals = ', '.join(f"'{v}'" for v in chunk)
        else:
            vals = ', '.join(str(v) for v in chunk)
        conditions.append(f"{column} IN ({vals})")
    return 'WHERE ' + '\n   OR '.join(conditions) + ';'

ids = list(range(1, 2501))  # 2500 IDs
print(chunked_in(ids, chunk_size=1000))`}
      </CodeBlock>

      <SectionHeader number={4} title="Method 4 — JavaScript / Node.js" />

      <CodeBlock lang="javascript" title="JavaScript: array to SQL IN clause">
{`// ---- Basic: array of numbers to SQL IN ----
const ids = [1001, 1002, 1003, 1004, 1005];
const sqlIn = \`WHERE id IN (\${ids.join(', ')})\`;
console.log(sqlIn);
// WHERE id IN (1001, 1002, 1003, 1004, 1005)

// ---- String values with single quotes ----
const emails = ['alice@example.com', 'bob@example.com', 'carol@example.com'];
const sqlInStr = \`WHERE email IN ('\${emails.join("', '")}')\`;
console.log(sqlInStr);
// WHERE email IN ('alice@example.com', 'bob@example.com', 'carol@example.com')

// ---- Deduplicate first ----
const rawIds = [1, 2, 2, 3, 3, 4];
const uniqueIds = [...new Set(rawIds)];
const sqlInDeduped = \`WHERE id IN (\${uniqueIds.join(', ')})\`;

// ---- Parameterized for PostgreSQL ----
const ids2 = [1, 2, 3, 4, 5];
const placeholders = ids2.map((_, i) => \`$\${i + 1}\`).join(', ');
const query = \`SELECT * FROM users WHERE id IN (\${placeholders})\`;
// query = "SELECT * FROM users WHERE id IN ($1, $2, $3, $4, $5)"
// Execute: pool.query(query, ids2)

// ---- Chunked for Oracle (1000 limit) ----
function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
const bigIds = Array.from({ length: 2500 }, (_, i) => i + 1);
const chunks = chunkArray(bigIds, 1000);
const oracleWhere = chunks
  .map(chunk => \`id IN (\${chunk.join(', ')})\`)
  .join('\\n  OR ');
console.log(\`WHERE \${oracleWhere}\`);`}
      </CodeBlock>

      <SectionHeader number={5} title="Method 5 — Command Line (sed, awk, jq)" />

      <CodeBlock lang="bash" title="Shell: convert text file or JSON to SQL IN clause">
{`# ---- From a newline-separated text file (numeric IDs) ----
paste -sd ',' ids.txt | sed "s/^/WHERE id IN (/; s/$/)/"
# WHERE id IN (1001,1002,1003)

# ---- From a newline-separated file (string values with quotes) ----
awk '{printf "%s\x27%s\x27", NR==1?"":",",$0} END{print ""}' ids.txt | \
  sed "s/^/WHERE email IN (/; s/$/)/"

# ---- From a CSV column (column 3) ----
cut -d',' -f3 data.csv | tail -n +2 | paste -sd ',' | \
  sed "s/^/WHERE user_id IN (/; s/$/)/"

# ---- From a JSON array using jq ----
echo '[1001,1002,1003,1004]' | jq -r 'map(tostring) | join(",")'
# 1001,1002,1003,1004
echo '[1001,1002,1003]' | jq '"WHERE id IN (" + (map(tostring)|join(",")) + ")"'
# "WHERE id IN (1001,1002,1003)"

# ---- From a JSON array of strings ----
echo '["alice@example.com","bob@example.com"]' | \
  jq '"WHERE email IN (" + (map("'\''" + . + "'\''") | join(",")) + ")"'`}
      </CodeBlock>

      <SectionHeader number={6} title="Handling Special Cases" />

      <KeyPointsGrid columns={2} items={[
        {
          title: "Single quotes inside string values",
          description:
            "If a string value contains a single quote (e.g., O'Brien), escape it by doubling the quote: WHERE name IN ('O''Brien', 'Smith'). Most databases use '' (two single quotes) to represent a literal single quote inside a string.",
        },
        {
          title: 'UUIDs — always use string quoting',
          description:
            "UUIDs like '550e8400-e29b-41d4-a716-446655440000' must be treated as strings in SQL IN clauses. Select String mode and use single quotes. PostgreSQL also accepts UUID literals without quotes in some contexts, but single-quoted strings are universally safe.",
        },
        {
          title: 'Emails and alphanumeric IDs',
          description:
            "Emails, alphanumeric codes (SKU-12345), and any non-numeric identifier require string mode with single quotes. The SQL IN Clause Generator auto-detects non-numeric values and switches to string quoting.",
        },
        {
          title: 'Very large lists (10,000+ items)',
          description:
            'For 10,000+ IDs, SQL IN clause performance degrades. Consider: (1) a temp table + JOIN, (2) batched queries with chunk_size=1000, or (3) range compression for consecutive integers. The BETWEEN approach for sequential IDs can reduce a 10,000-item IN list to just a few BETWEEN clauses.',
        },
      ]} />

      <AlertBox type="info" title="Use ANY($1) in PostgreSQL for unlimited parameterized IN">
        Instead of building dynamic placeholder strings for PostgreSQL, use{' '}
        <code>WHERE id = ANY($1)</code> and pass the array directly:{' '}
        <code>{'pool.query("SELECT * FROM users WHERE id = ANY($1)", [[1,2,3,4,5]])'}</code>.
        This accepts arrays of any size, avoids string concatenation, is fully parameterized,
        and prevents SQL injection. It is the recommended PostgreSQL approach for any list size.
      </AlertBox>

      <SectionHeader number={7} title="Which Method Is Best for Your Situation?" />

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
          <thead>
            <tr className="border-b border-zinc-200 text-left">
              <th className="pb-3 pr-4 font-semibold text-zinc-700">Situation</th>
              <th className="pb-3 font-semibold text-zinc-700">Best method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {[
              ['One-off query — list of IDs from a report', 'Online generator (unblockdevs.com/sql-formatter)'],
              ['Excel column of IDs — small list (< 500)', 'TEXTJOIN formula in Excel'],
              ['Excel column of IDs — large list (500+)', 'Paste column into online generator'],
              ['Recurring task in a Python script', 'Python csv module + string join'],
              ['Node.js application query', 'Array.join() + parameterized query'],
              ['PostgreSQL production query', 'WHERE id = ANY($1) with array parameter'],
              ['Oracle with 1000+ IDs', 'Online generator with Chunk Size = 1000'],
              ['Shell script / data pipeline', 'jq or awk one-liner'],
              ['10,000+ sequential IDs', 'Range compression (BETWEEN) or temp table + JOIN'],
            ].map(([situation, method]) => (
              <tr key={situation}>
                <td className="py-3 pr-4 text-zinc-700">{situation}</td>
                <td className="py-3 font-medium text-zinc-900">{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FAQAccordion items={[
        {
          question: 'How do I convert a CSV column to a SQL IN clause?',
          answer: "Three approaches: (1) Online — copy the CSV column, paste into unblockdevs.com/sql-formatter, click Format. (2) Excel TEXTJOIN — =TEXTJOIN(\", \", TRUE, A1:A100) then wrap in WHERE id IN (...). (3) Command line — cut -d',' -f1 data.csv | paste -sd ',' | sed \"s/^/WHERE id IN (/; s/$/);\". The online generator is fastest for one-off tasks.",
        },
        {
          question: 'How do I convert an Excel column to SQL IN clause?',
          answer: "Select the cells with your IDs, copy, go to unblockdevs.com/sql-formatter, and paste. The tool handles Excel paste format (tab-separated rows) automatically. Alternatively, use the TEXTJOIN formula: =\"WHERE id IN ('\" & TEXTJOIN(\"', '\", TRUE, A1:A100) & \"')\" for string IDs, or =TEXTJOIN(\", \", TRUE, A1:A100) for numeric IDs wrapped manually in WHERE id IN (...).",
        },
        {
          question: 'How do I handle an Oracle ORA-01795 error (too many values in IN clause)?',
          answer: "Oracle limits IN clause literal lists to 1000 items. Solutions: (1) Use the online generator with Chunk Size=1000 to split into multiple IN clauses joined with OR. (2) Use a temporary table and JOIN. (3) Use range compression (BETWEEN) for consecutive integer IDs. (4) Use a WITH clause or inline view with SYS.ODCINUMBERLIST.",
        },
        {
          question: 'How do I deduplicate IDs before generating a SQL IN clause?',
          answer: 'The online SQL IN Clause Generator at unblockdevs.com/sql-formatter automatically removes duplicates before generating output — it shows the original count and the deduplicated count. In Python: list(dict.fromkeys(ids)). In JavaScript: [...new Set(ids)]. In SQL: SELECT DISTINCT id FROM source_table.',
        },
        {
          question: 'What is the difference between SQL IN clause and JOIN for filtering?',
          answer: 'Both filter rows, but IN is simpler for literal lists and subqueries. JOIN is better when you need columns from the joined table or when the filtering table is large. For a list of literal IDs, IN is cleaner. For dynamic data (e.g., filter users by IDs from another table), a JOIN or IN subquery both work — use EXISTS for large subquery results since it short-circuits after the first match.',
        },
        {
          question: 'How do I generate parameterized SQL IN clause to prevent SQL injection?',
          answer: 'Build placeholder strings dynamically based on the count of values. For MySQL: build "WHERE id IN (?,?,?)" with one ? per value and pass ids as the parameter array. For PostgreSQL: build "WHERE id IN ($1,$2,$3)" with $N placeholders, or use WHERE id = ANY($1) with a single array parameter — the cleanest PostgreSQL approach. Never concatenate user-supplied IDs directly into SQL strings.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
