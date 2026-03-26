'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader,
} from '@/components/blog/BlogVisuals';

export default function HowToParseNestedJsonJavaClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Parse Nested JSON in Java — Jackson, Gson, and org.json Guide</h1>
      <p className="lead">
        Parsing nested JSON in Java is straightforward once you know which library to use.
        Jackson is the industry standard for production apps. Gson works well for Android.
        org.json is simple for quick scripts. This guide covers all three with nested examples.
      </p>

      <StatGrid stats={[
        { value: 'Jackson', label: 'most widely used JSON library in Java', color: 'blue' },
        { value: 'Gson', label: 'Google\'s JSON library, great for Android', color: 'green' },
        { value: 'POJO mapping', label: 'best approach for complex nested structures', color: 'purple' },
        { value: 'JsonNode', label: 'Jackson\'s tree model for dynamic JSON navigation', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Nested JSON Example" />
      <CodeBlock language="json" filename="Example nested JSON to parse">
{`{
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
}`}
      </CodeBlock>

      <SectionHeader number={2} title="Jackson — POJO Mapping (Recommended)" />
      <CodeBlock language="java" filename="Jackson nested JSON with POJOs">
{`// Maven dependency:
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
System.out.println(root.user.orders.get(0).items.get(0).name); // Laptop`}
      </CodeBlock>

      <SectionHeader number={3} title="Jackson — JsonNode (Dynamic Navigation)" />
      <CodeBlock language="java" filename="JsonNode for dynamic/unknown JSON structure">
{`import com.fasterxml.jackson.databind.JsonNode;
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
boolean isMissing = missing.isMissingNode(); // true — no NPE`}
      </CodeBlock>

      <SectionHeader number={4} title="Gson — Simple Nested Parsing" />
      <CodeBlock language="java" filename="Gson nested JSON parsing">
{`// Maven: <dependency><groupId>com.google.code.gson</groupId>
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
String orderId = orders.get(0).getAsJsonObject().get("orderId").getAsString();`}
      </CodeBlock>

      <SectionHeader number={5} title="Which Library to Choose?" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Jackson', description: 'Best for: Spring Boot apps (auto-configured), REST APIs, complex nested structures. Fastest performance, most features. Industry default in Java backend.' },
        { title: 'Gson', description: 'Best for: Android development, simple projects, when you prefer Google\'s API style. Slightly less complex configuration than Jackson.' },
        { title: 'org.json', description: 'Best for: quick scripts, learning JSON in Java, minimal dependencies. No POJO mapping — manual field access only. Not recommended for large production apps.' },
        { title: 'JSON-B (Jakarta)', description: 'Best for: Jakarta EE/Quarkus applications. Standard Java EE JSON binding. Auto-configured in Quarkus and Jakarta apps.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I handle optional/nullable nested fields in Jackson?',
          answer: 'Use path() instead of get() for JsonNode — path() returns a MissingNode instead of null when a field doesn\'t exist. For POJO mapping, make fields Optional<T> or nullable (add @JsonInclude(NON_NULL)). Use .asText("default") to provide defaults for missing text fields.',
        },
        {
          question: 'How do I parse JSON with dynamic/unknown keys?',
          answer: 'Map to Map<String, Object> with Jackson: mapper.readValue(json, new TypeReference<Map<String, Object>>() {}).  For nested dynamics, use JsonNode tree model which handles any structure. For specific dynamic keys at a known level: use @JsonAnySetter in your POJO to capture unknown fields into a Map.',
        },
        {
          question: 'What is the fastest JSON library for Java?',
          answer: 'Jackson is generally the fastest production JSON library for Java. In benchmarks: Jackson > Gson > org.json for most use cases. DSL-JSON and jsoniter are faster than Jackson but less commonly used. For most applications, Jackson\'s performance is more than sufficient.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
