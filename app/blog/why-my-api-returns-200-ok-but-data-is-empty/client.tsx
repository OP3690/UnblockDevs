'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhyMyApiReturns200OkButDataIsEmptyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Why My API Returns 200 OK but Data Is Empty — Complete Debugging Guide</h1>
      <p className="lead">
        Your API returns HTTP 200 OK — which should mean success — but the response body is empty,
        contains an empty array, or has null where you expected data. This is one of the most
        confusing scenarios in API development because the success status code is misleading.
        This guide explains every reason an API can return 200 with empty data and exactly how
        to debug and fix each one.
      </p>

      <StatGrid stats={[
        { value: '200 OK', label: 'means the request succeeded — not that data exists', color: 'blue' },
        { value: 'Empty []', label: 'valid response when a query returns no results', color: 'green' },
        { value: 'Auth filter', label: 'permissions can filter out all data without an error', color: 'amber' },
        { value: 'Pagination', label: 'wrong page/offset returns empty results past the end', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Understanding Why 200 OK Doesn't Mean Data Exists" />
      <p>
        HTTP 200 OK means the request was received, understood, and processed successfully by the server.
        It does <em>not</em> guarantee that data was found or returned. Many APIs correctly return 200
        with an empty body or empty collection when no data matches the request criteria.
        This is intentional design — not a bug.
      </p>
      <QuickFact color="blue" label="The key distinction">
        200 OK = "the server processed your request successfully."
        404 Not Found = "the specific resource you asked for doesn't exist."
        An API returning 200 with an empty array is saying: "Your request was valid, but no items match your criteria."
        This is semantically correct REST behavior for list/search endpoints.
      </QuickFact>
      <KeyPointsGrid items={[
        { title: 'Empty array []', description: 'The most common case. Returned by list endpoints when no items match the filter or query. "Your search found zero results" — valid and correct. Your code should handle this by showing a "no results" state, not treating it as an error.' },
        { title: 'Empty object {}', description: 'Returned when a resource endpoint returns an object format but has no properties to return. Less common than empty arrays, but valid for APIs that prefer empty objects over null for absent data.' },
        { title: 'Null value', description: 'Some APIs return {"data": null} to indicate a resource was not found. More common for single-resource endpoints where null explicitly means "this item doesn\'t exist." Different from missing the field entirely.' },
        { title: 'Empty response body', description: 'Some 200 responses have no body at all. Common for PATCH or PUT endpoints that confirm update success without returning the updated resource. Check Content-Length: 0 in response headers.' },
      ]} />

      <SectionHeader number={2} title="Reason 1 — Database Query Returns No Matching Records" />
      <p>
        The most common root cause: the query parameters you sent match zero records in the database.
        The API processed the request correctly, ran the query, and returned the empty result set honestly.
      </p>
      <KeyPointsGrid items={[
        { title: 'Check your filters', description: 'Log the exact SQL query or database operation being run. Is the WHERE clause too restrictive? Are you filtering by a status value that no records have? Print the query with the actual parameter values substituted in, not the template.' },
        { title: 'Verify the database actually has data', description: 'Connect directly to the database and run the equivalent of SELECT COUNT(*) with no filters. If count is 0, the database is empty. If count is > 0, your filters are excluding all records.' },
        { title: 'Check for case sensitivity', description: 'String comparisons may be case-sensitive in your database. Filtering for status = "Active" when records have status = "active" returns zero results in case-sensitive databases (PostgreSQL by default).' },
        { title: 'Check for timezone issues with date filters', description: 'Filtering by date ranges often fails due to timezone handling. A query for "today\'s records" may return empty if the server timezone differs from what you expect, putting all records outside the range.' },
      ]} />
      <CodeBlock lang="javascript" title="Debugging: log the actual query parameters being used">
{`// Add logging in your API handler to see what's actually being queried
app.get('/api/users', async (req, res) => {
  const filters = {
    status: req.query.status,
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    offset: ((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.limit) || 20),
  };

  // Log the actual filter values being applied
  console.log('Query filters:', JSON.stringify(filters, null, 2));

  const users = await db.users.findMany({
    where: { status: filters.status },
    skip: filters.offset,
    take: filters.limit,
  });

  // Log the result count before returning
  console.log('Query returned', users.length, 'records');

  return res.json({ users, total: users.length });
});`}
      </CodeBlock>

      <SectionHeader number={3} title="Reason 2 — Authentication and Authorization Filtering" />
      <p>
        Many APIs silently filter data based on the authenticated user's permissions. If your API key
        or token belongs to a user who has no access to the requested data, the API returns 200 with
        empty results rather than 403 Forbidden — to avoid leaking information about what data exists.
      </p>
      <KeyPointsGrid items={[
        { title: 'Multi-tenant data isolation', description: 'APIs that serve multiple organizations filter all data by the authenticated user\'s organization. If your API key is for Organization A but you\'re querying Organization B\'s data, the result is empty — not an error.' },
        { title: 'Role-based access control', description: 'Your API user may not have permission to view certain records. The API applies row-level security: records you can\'t access are simply excluded from results rather than causing an error.' },
        { title: 'Testing with wrong credentials', description: 'A common debugging mistake: testing with an API key that belongs to an account with no data. Create a test account with known data and use that account\'s credentials when debugging empty responses.' },
        { title: 'Verify credentials are being sent', description: 'Check that the Authorization header is actually being included in the request. In browser DevTools: Network tab → click your request → Headers → look for Authorization. Missing auth header often results in empty data filtered by guest/public permissions.' },
      ]} />

      <SectionHeader number={4} title="Reason 3 — Pagination Parameters Off the End" />
      <p>
        If you request page 10 of results but there are only 3 pages of data, the API correctly
        returns an empty array for the requested page. Pagination is a very common source of
        unexpected empty responses.
      </p>
      <CodeBlock lang="javascript" title="Common pagination mistakes that cause empty results">
{`// ❌ Requesting page that doesn't exist
const response = await fetch('/api/users?page=10&limit=20');
// Returns [] if total users < 181

// ❌ Off-by-one error in offset calculation
const page = 1;
const limit = 20;
const offset = page * limit;  // ❌ Wrong: offset = 20, skips first page
// Should be: (page - 1) * limit = 0

// ✅ Check total count alongside data
const response = await fetch('/api/users?page=1&limit=20');
const { users, total, totalPages } = await response.json();

console.log(\`Got \${users.length} of \${total} total users\`);
console.log(\`Page 1 of \${totalPages}\`);

if (users.length === 0 && total > 0) {
  console.log('Data exists but pagination is off — check page/offset');
}
if (users.length === 0 && total === 0) {
  console.log('No data exists at all — check filters');
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Reason 4 — Request Format Problems the Server Ignores" />
      <p>
        Sometimes the server receives your request but parses the parameters incorrectly,
        effectively running the query with no filters (which might return data) or wrong filters
        (which might return nothing). The server returns 200 because the parsing didn't throw an error —
        it just ignored or misread the parameters.
      </p>
      <KeyPointsGrid items={[
        { title: 'Query string vs request body', description: 'POST request body parameters are separate from URL query parameters. If your API expects parameters in the body but you sent them in the query string (or vice versa), the server receives them in the wrong place and uses default/empty values.' },
        { title: 'Content-Type header missing', description: 'POST requests with JSON body require Content-Type: application/json. Without it, many servers receive the body as a raw string and can\'t parse the JSON parameters. The request succeeds (200) but with no filter values applied.' },
        { title: 'Wrong parameter names', description: 'APIs often have specific parameter names. Sending user_id when the API expects userId, or start_date when it expects startDate, means the parameter is silently ignored.' },
        { title: 'Type coercion issues', description: 'Sending a number as a string ("1" instead of 1) can cause database query mismatches in strongly-typed systems. SELECT * FROM users WHERE id = "1" might return nothing if id is an integer column in a strict comparison.' },
      ]} />

      <SectionHeader number={6} title="How to Systematically Debug Empty Responses" />
      <VerticalSteps steps={[
        { title: 'Inspect the raw response in DevTools', desc: 'Open Browser DevTools → Network tab → click the request → Response tab. Look at the raw JSON. Is it actually empty? Is there a total or count field that shows 0? This confirms whether it\'s an API data issue or a client parsing issue.' },
        { title: 'Test with curl or Postman directly', desc: 'Make the exact same request outside your browser code. curl "https://api.example.com/users?status=active" -H "Authorization: Bearer YOUR_TOKEN". If curl returns data but your code doesn\'t, the issue is in your code (headers, params). If curl also returns empty, it\'s a server/data issue.' },
        { title: 'Remove all filters and parameters', desc: 'Make the most basic possible request — no filters, no pagination, just GET /api/users. If that returns data, add filters back one at a time until you find which filter causes the empty result.' },
        { title: 'Check server logs', desc: 'Look at your server\'s log output when the request is made. The server should log the database query being executed. Verify the query parameters are what you expect. A query with WHERE status = NULL (from an unset parameter) returns nothing.' },
        { title: 'Verify test data exists', desc: 'In your development or staging database, confirm there is actual data that should match your query. Run the database query directly. If the database has no matching records, that\'s your answer — populate test data.' },
        { title: 'Check the response structure', desc: 'Your code might be accessing the wrong key. If the API returns {"result": {"users": [...]}} but your code reads response.users (skipping the result wrapper), you\'d get undefined, which looks like empty data.' },
      ]} />

      <AlertBox type="tip" title="Use response.text() before response.json() for debugging">
        When debugging, replace response.json() with response.text() first to see the raw response string.
        Sometimes APIs return content that isn't valid JSON — like an HTML error page — which .json()
        silently fails to parse, appearing as empty data. response.text() shows you exactly what the server sent.
      </AlertBox>

      <SectionHeader number={7} title="When Empty is the Correct Response" />
      <p>
        Not every empty response is a bug. Some situations where 200 with empty data is correct
        and your code should handle it gracefully:
      </p>
      <KeyPointsGrid items={[
        { title: 'New accounts with no content', description: 'A new user\'s dashboard, inbox, or activity feed is legitimately empty. Your UI should show an empty state UI ("No messages yet") rather than an error.' },
        { title: 'Search with no matches', description: 'User searching for something that doesn\'t exist should get an empty result, not an error. Show "No results found for your search" not a generic error message.' },
        { title: 'Filtered lists that exclude everything', description: 'If a user applies filters that match nothing in the current dataset, the empty result is correct. Show the active filters and an empty state with a prompt to clear filters.' },
        { title: 'Time-based data with no events', description: 'Querying for events today when none occurred is correctly empty. Show the date range and "No events in this period."' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does my API return 200 OK but empty data?',
          answer: 'APIs return 200 OK with empty data when the database query returns no matching records, filters exclude all data, pagination is past the end of available data, authentication filters data based on permissions, or the endpoint successfully processes but legitimately has no data to return. 200 OK means the request succeeded — not that data exists.',
        },
        {
          question: 'Should my API return 200 OK or 404 when a list query returns no results?',
          answer: 'It depends on whether you\'re returning a collection or a specific resource. For collection endpoints (GET /users with filters), return 200 with an empty array — this is the REST convention because the request was valid even if no items matched. For single-resource endpoints (GET /users/999), return 404 when the specific resource doesn\'t exist. Never return 404 for empty list results.',
        },
        {
          question: 'How do I tell if the problem is my code or the API?',
          answer: 'Make the exact same request with curl or Postman. If curl returns data but your JavaScript code gets empty results, the problem is in your code — typically missing headers (Authorization, Content-Type) or incorrect parameter format. If curl also returns empty results, the issue is server-side: wrong parameters, no matching data, or permission filtering.',
        },
        {
          question: 'My API returns data in Postman but empty in production — why?',
          answer: 'Common causes: (1) Different API keys — your Postman key has access to test data, production key doesn\'t have the same data. (2) Different base URLs — you\'re hitting a different environment. (3) Missing environment variable for the API URL in production. (4) CORS blocking the response in the browser (look for status 0 or CORS error in console, not the 200 you see in Postman).',
        },
        {
          question: 'How do I handle empty API responses gracefully in my frontend?',
          answer: 'Use conditional rendering: if (!data || data.length === 0) show an empty state component, not an error. Empty states should explain why results are empty and offer an action (clear filters, create first item, try different search). Differentiate between "loading" (show spinner), "empty" (show empty state), and "error" (show error message) as three distinct UI states.',
        },
        {
          question: 'What is the difference between null, undefined, and empty array in API responses?',
          answer: 'In API design: null typically means "the resource exists but has no value for this field" or "the requested resource was found but is empty." An empty array [] means "the collection exists and was queried, but has zero items." undefined (or missing key) typically means "this field is not applicable here." When checking for empty data in JavaScript: check Array.isArray(data) && data.length === 0 for empty arrays, and data === null for null values.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
