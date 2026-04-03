'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToParseNestedJsonJavaClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Parse Nested JSON in Java — Jackson, Gson, and org.json Guide</h1>
      <p className="lead">
        Parsing nested JSON in Java is straightforward once you know which library to use.
        Jackson is the industry standard for production apps. Gson works well for Android.
        org.json is simple for quick scripts. This guide covers all three with nested examples,
        error handling, and performance tips.
      </p>

      <StatGrid stats={[
        { value: 'Jackson', label: 'most widely used JSON library in Java', color: 'blue' },
        { value: 'Gson', label: "Google's JSON library, great for Android", color: 'green' },
        { value: 'POJO mapping', label: 'best approach for complex nested structures', color: 'purple' },
        { value: 'JsonNode', label: "Jackson's tree model for dynamic JSON navigation", color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Nested JSON Example Used Throughout This Guide" />
      <p>
        We will use this nested JSON structure for all examples. It contains objects, arrays,
        deeply nested objects, and multiple levels of nesting — covering the most common
        patterns you will encounter in real APIs.
      </p>
      <CodeBlock lang="json" title="Example nested JSON to parse">{`{
  "user": {
    "id": 123,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "address": {
      "street": "123 Main St",
      "city": "Boston",
      "country": "USA"
    },
    "orders": [
      {
        "orderId": "ORD-001",
        "total": 99.99,
        "items": [
          {"name": "Laptop", "qty": 1},
          {"name": "Mouse", "qty": 2}
        ]
      }
    ]
  }
}`}</CodeBlock>

      <SectionHeader number={2} title="Jackson — POJO Mapping (Recommended for Production)" />
      <p>
        Jackson's POJO (Plain Old Java Object) mapping is the cleanest approach for deeply
        nested JSON. Define classes that mirror the JSON structure, and Jackson handles all
        the parsing with a single call to <code>readValue()</code>. This approach gives you
        compile-time type safety and works with any depth of nesting.
      </p>
      <CodeBlock lang="java" title="Jackson nested JSON with POJOs">{`// Maven dependency:
// <dependency><groupId>com.fasterxml.jackson.core</groupId>
// <artifactId>jackson-databind</artifactId><version>2.17.0</version></dependency>

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

// Define POJOs matching JSON structure
public class Address {
    public String street, city, country;
}

public class Item {
    public String name;
    public int qty;
}

public class Order {
    public String orderId;
    public double total;
    public List<Item> items;
}

public class User {
    public int id;
    public String name, email;
    public Address address;
    public List<Order> orders;
}

public class Root {
    public User user;
}

// Parse — one line for any depth of nesting
ObjectMapper mapper = new ObjectMapper();
Root root = mapper.readValue(jsonString, Root.class);

// Access deeply nested data
System.out.println(root.user.name);                     // Alice Johnson
System.out.println(root.user.address.city);             // Boston
System.out.println(root.user.orders.get(0).orderId);    // ORD-001
System.out.println(root.user.orders.get(0).items.get(0).name); // Laptop

// Read from file instead of string
Root rootFromFile = mapper.readValue(new File("data.json"), Root.class);`}</CodeBlock>

      <SectionHeader number={3} title="Jackson — JsonNode (Dynamic Navigation)" />
      <p>
        When the JSON structure is unknown, dynamic, or you only need a few fields,
        Jackson's <code>JsonNode</code> tree model is better than defining POJOs.
        It lets you navigate JSON like a tree using path expressions,
        without any upfront class definitions.
      </p>
      <CodeBlock lang="java" title="JsonNode for dynamic/unknown JSON structure">{`import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

ObjectMapper mapper = new ObjectMapper();
JsonNode root = mapper.readTree(jsonString);

// Navigate nested structure
String name = root.path("user").path("name").asText();    // Alice Johnson
String city = root.path("user").path("address").path("city").asText(); // Boston

// Access array elements
JsonNode orders = root.path("user").path("orders");
String orderId = orders.get(0).path("orderId").asText();  // ORD-001

// Iterate array
for (JsonNode order : orders) {
    System.out.println(order.path("orderId").asText());
    JsonNode items = order.path("items");
    for (JsonNode item : items) {
        System.out.println("  " + item.path("name").asText()
            + " x" + item.path("qty").asInt());
    }
}

// Safely handle missing fields (returns null node, not exception)
JsonNode missing = root.path("user").path("nonexistent"); // returns MissingNode
boolean isMissing = missing.isMissingNode(); // true — no NPE

// path() vs get() difference:
// path() — returns MissingNode if not found (safe)
// get()  — returns null if not found (NPE risk if you call methods on null)
// Always prefer path() for safe navigation`}</CodeBlock>

      <SectionHeader number={4} title="Jackson — Reading from File and URL" />
      <CodeBlock lang="java" title="Read JSON from different sources">{`import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.net.URL;
import java.io.InputStream;

ObjectMapper mapper = new ObjectMapper();

// From String
Root fromString = mapper.readValue(jsonString, Root.class);

// From File
Root fromFile = mapper.readValue(new File("data.json"), Root.class);

// From URL (downloads and parses)
Root fromUrl = mapper.readValue(new URL("https://api.example.com/user/123"), Root.class);

// From InputStream (useful for classpath resources)
InputStream stream = getClass().getResourceAsStream("/test-data.json");
Root fromStream = mapper.readValue(stream, Root.class);

// Handle unknown properties gracefully
// By default, Jackson throws on unknown fields
// To ignore them:
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
// Or per-class with annotation: @JsonIgnoreProperties(ignoreUnknown = true)`}</CodeBlock>

      <SectionHeader number={5} title="Gson — Simple Nested Parsing" />
      <p>
        Gson is Google's JSON library and the preferred choice for Android development.
        It has a simpler API than Jackson for basic use cases and works well when you need
        a lightweight dependency without Spring Boot's auto-configuration.
      </p>
      <CodeBlock lang="java" title="Gson nested JSON parsing">{`// Maven: <dependency><groupId>com.google.code.gson</groupId>
// <artifactId>gson</artifactId><version>2.10.1</version></dependency>

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

Gson gson = new Gson();

// Option 1: Map to POJO (same structure as Jackson)
Root root = gson.fromJson(jsonString, Root.class);
System.out.println(root.user.address.city); // Boston

// Option 2: Dynamic navigation with JsonObject
JsonObject json = JsonParser.parseString(jsonString).getAsJsonObject();
String name = json.getAsJsonObject("user").get("name").getAsString();
String city = json.getAsJsonObject("user")
                  .getAsJsonObject("address")
                  .get("city").getAsString();

// Array access
JsonArray orders = json.getAsJsonObject("user").getAsJsonArray("orders");
String orderId = orders.get(0).getAsJsonObject().get("orderId").getAsString();

// Read from file
try (Reader reader = new FileReader("data.json")) {
    Root rootFromFile = gson.fromJson(reader, Root.class);
}

// Serialize back to JSON
String jsonOutput = gson.toJson(root);
// Pretty printing:
Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
System.out.println(prettyGson.toJson(root));`}</CodeBlock>

      <SectionHeader number={6} title="org.json — Simple Script Parsing" />
      <CodeBlock lang="java" title="org.json for quick scripts">{`// Maven: <dependency><groupId>org.json</groupId>
// <artifactId>json</artifactId><version>20231013</version></dependency>

import org.json.JSONObject;
import org.json.JSONArray;

JSONObject json = new JSONObject(jsonString);

// Navigate nested objects
JSONObject user = json.getJSONObject("user");
String name = user.getString("name");        // Alice Johnson
int id = user.getInt("id");                   // 123

JSONObject address = user.getJSONObject("address");
String city = address.getString("city");      // Boston

// Access arrays
JSONArray orders = user.getJSONArray("orders");
JSONObject firstOrder = orders.getJSONObject(0);
String orderId = firstOrder.getString("orderId");  // ORD-001

// Safely get optional fields (returns null instead of throwing)
String phone = user.optString("phone", "N/A");    // "N/A" if not present
int rating = user.optInt("rating", 0);            // 0 if not present

// Iterate array
for (int i = 0; i < orders.length(); i++) {
    System.out.println(orders.getJSONObject(i).getString("orderId"));
}`}</CodeBlock>

      <SectionHeader number={7} title="Error Handling for JSON Parsing" />
      <p>
        Production code must handle malformed JSON, missing fields, and type mismatches
        gracefully. Here is how to handle exceptions properly for each library.
      </p>
      <CodeBlock lang="java" title="Robust error handling for JSON parsing">{`import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

ObjectMapper mapper = new ObjectMapper();
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

// Safe parse with full error handling
public Optional<Root> parseUserJson(String json) {
    if (json == null || json.isBlank()) {
        log.warn("Empty JSON input");
        return Optional.empty();
    }

    try {
        return Optional.of(mapper.readValue(json, Root.class));

    } catch (JsonProcessingException e) {
        // Includes: invalid syntax, missing required fields, type mismatch
        log.error("Failed to parse user JSON: {}", e.getMessage());
        log.debug("Raw JSON that failed: {}", json);
        return Optional.empty();

    } catch (Exception e) {
        log.error("Unexpected error parsing JSON", e);
        return Optional.empty();
    }
}

// Use in application:
parseUserJson(apiResponse)
    .map(root -> root.user)
    .ifPresentOrElse(
        user -> processUser(user),
        () -> handleParseFailure(apiResponse)
    );`}</CodeBlock>

      <SectionHeader number={8} title="Which Library to Choose?" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Jackson', description: 'Best for: Spring Boot apps (auto-configured), REST APIs, complex nested structures. Fastest performance, most features. Industry default in Java backend. Use Jackson unless you have a specific reason not to.' },
        { title: 'Gson', description: "Best for: Android development, simple projects, when you prefer Google's API style. Slightly simpler API than Jackson. Good for projects that need a lightweight JSON library without Spring." },
        { title: 'org.json', description: 'Best for: quick scripts, learning JSON in Java, minimal dependencies. No POJO mapping — manual field access only. Not recommended for large production apps — too much boilerplate.' },
        { title: 'JSON-B (Jakarta)', description: 'Best for: Jakarta EE/Quarkus applications. Standard Java EE JSON binding API. Auto-configured in Quarkus and Jakarta EE apps. Growing ecosystem but less ubiquitous than Jackson.' },
      ]} />

      <AlertBox type="tip" title="Always use ObjectMapper as a singleton">
        Creating a new ObjectMapper instance for every parse call is expensive — it initializes
        the full Jackson machinery each time. In Spring, inject it as a bean. In plain Java,
        store it as a static final field. A single ObjectMapper is thread-safe for reads.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I handle optional/nullable nested fields in Jackson?',
          answer: 'Use path() instead of get() for JsonNode — path() returns a MissingNode instead of null when a field does not exist. For POJO mapping, make fields Optional<T> or nullable (add @JsonInclude(NON_NULL)). Use .asText("default") to provide defaults for missing text fields. Configure FAIL_ON_UNKNOWN_PROPERTIES = false to tolerate extra fields.',
        },
        {
          question: 'How do I parse JSON with dynamic/unknown keys?',
          answer: 'Map to Map<String, Object> with Jackson: mapper.readValue(json, new TypeReference<Map<String, Object>>() {}). For nested dynamics, use JsonNode tree model which handles any structure. For specific dynamic keys at a known level: use @JsonAnySetter in your POJO to capture unknown fields into a Map.',
        },
        {
          question: 'What is the fastest JSON library for Java?',
          answer: 'Jackson is generally the fastest production JSON library for Java. In benchmarks: Jackson > Gson > org.json for most use cases. DSL-JSON and jsoniter are faster than Jackson but less commonly used. For most applications, Jackson performance is more than sufficient.',
        },
        {
          question: 'How do I parse a JSON array as the root element in Jackson?',
          answer: 'Use TypeReference: List<User> users = mapper.readValue(jsonArray, new TypeReference<List<User>>() {}). Or as JsonNode: JsonNode array = mapper.readTree(json); for (JsonNode item : array) { ... }. Arrays as root elements are common in REST API responses.',
        },
        {
          question: 'How do I convert Java objects back to JSON with Jackson?',
          answer: 'mapper.writeValueAsString(object) returns a JSON string. mapper.writeValue(new File("output.json"), object) writes to a file. mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object) for pretty-printed JSON. For deeply nested objects, Jackson handles all levels automatically.',
        },
        {
          question: 'Why does Jackson fail when JSON has extra fields?',
          answer: 'By default, Jackson throws UnrecognizedPropertyException for fields in JSON that have no corresponding POJO field. Fix: configure mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false), or add @JsonIgnoreProperties(ignoreUnknown = true) on the class. This is essential when consuming APIs that may add new fields over time.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
