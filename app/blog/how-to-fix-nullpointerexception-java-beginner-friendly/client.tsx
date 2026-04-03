'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact, KeyPointsGrid,
} from '@/components/blog/BlogVisuals';

export default function HowToFixNullPointerExceptionJavaBeginnerFriendlyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix NullPointerException in Java — Beginner-Friendly Guide</h1>
      <p className="lead">
        NullPointerException (NPE) is Java's most common runtime exception. It happens when you
        try to use a reference that points to nothing (null) — calling a method on it, accessing
        a field from it, or using it as an array. This guide explains every common cause,
        how to read and understand the stack trace, and modern Java tools including Optional
        and helpful NPE messages that make these errors much easier to diagnose and prevent.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'most common Java runtime exception in production', color: 'red' },
        { value: 'null', label: 'a reference that points to no object in memory', color: 'amber' },
        { value: 'Optional<T>', label: 'Java 8+ approach for handling possibly-null values', color: 'green' },
        { value: 'Stack trace', label: 'always points to the exact line causing the NPE', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="Understanding What NullPointerException Actually Means" />
      <p>
        Java is an object-oriented language where variables hold either a reference to an object in memory
        or the special value <code>null</code>. Null means "this variable doesn't point to anything."
        When you try to use a null reference — calling a method on it, reading a field from it,
        or indexing into it as an array — Java throws a NullPointerException because there's no object
        to operate on.
      </p>
      <QuickFact color="blue" label="Key insight">
        NPE occurs when you call a method or access a field on a null reference.
        Java throws NPE at runtime — not compile time — which is why it can surprise you even in code that compiles cleanly.
        The stack trace always tells you the exact class, method, and line number where the null was used.
        Read it carefully before trying to fix anything.
      </QuickFact>

      <AlertBox type="error" title="Reading a NullPointerException stack trace">
        {`Exception in thread "main" java.lang.NullPointerException\n`}
        {`  at com.example.UserService.getFullName(UserService.java:42)  ← exact line with null\n`}
        {`  at com.example.Main.main(Main.java:15)  ← called from here\n\n`}
        {`Java 14+: "Cannot invoke String.length() because str is null"  ← tells you WHICH variable`}
      </AlertBox>

      <SectionHeader number={2} title="Cause 1 — Calling a Method on a Null Object" />
      <p>
        The most common NPE cause: a method call returns null for "not found," and the caller
        uses the result directly without checking.
      </p>
      <ErrorFix
        title="Null return from repository or service method"
        bad={`User user = userRepository.findById(id); // might return null
String name = user.getName(); // ❌ NPE if user is null
// Exception: Cannot invoke "User.getName()" because "user" is null`}
        good={`// Option 1: Explicit null check
User user = userRepository.findById(id);
if (user != null) {
    String name = user.getName(); // ✅ safe
} else {
    // handle the not-found case
}

// Option 2: Optional (Java 8+) — preferred approach
Optional<User> userOpt = userRepository.findByIdOptional(id);
String name = userOpt.map(User::getName).orElse("Unknown"); // ✅ safe

// Option 3: Objects.requireNonNull for fast-fail with message
User user = Objects.requireNonNull(userRepository.findById(id),
    "User not found for id: " + id); // throws descriptive NPE instead of silent null`}
        badLabel="No null check — assumes findById never returns null"
        goodLabel="Null check / Optional / requireNonNull"
      />

      <SectionHeader number={3} title="Cause 2 — Uninitialized Object Fields" />
      <p>
        In Java, object fields that aren't explicitly initialized default to null (for reference types),
        0 (for int/long), or false (for boolean). This surprises beginners who expect fields to start
        as empty collections or empty strings.
      </p>
      <ErrorFix
        title="Uninitialized collection field"
        bad={`public class ShoppingCart {
    private List<Item> items; // ❌ default value is null, NOT an empty list!

    public void addItem(Item item) {
        items.add(item); // ❌ NPE — items is null, not an empty ArrayList
    }

    public int getCount() {
        return items.size(); // ❌ NPE
    }
}`}
        good={`public class ShoppingCart {
    private List<Item> items = new ArrayList<>(); // ✅ initialize at declaration

    public void addItem(Item item) {
        items.add(item); // ✅ safe — items is never null
    }

    public int getCount() {
        return items.size(); // ✅ safe
    }
}`}
        badLabel="Field declared but not initialized — defaults to null"
        goodLabel="Initialize fields at declaration time with a default value"
      />

      <SectionHeader number={4} title="Cause 3 — Method That Returns Null for 'Not Found'" />
      <p>
        Returning null to indicate "nothing found" is a common Java pattern that leaks the null problem
        to all callers. The Java 8 <code>Optional</code> type was designed specifically to solve this.
      </p>
      <ErrorFix
        title="Returning null from a lookup method"
        bad={`// Service method returns null for "not found"
public String getConfigValue(String key) {
    if (!config.containsKey(key)) return null; // ❌ caller might not check
    return config.get(key);
}

// Caller doesn't check for null
String timeout = getConfigValue("timeout");
int timeoutMs = Integer.parseInt(timeout); // ❌ NPE if timeout key missing`}
        good={`// Option 1: Return Optional — communicates "might be empty" in the type
public Optional<String> getConfigValue(String key) {
    return Optional.ofNullable(config.get(key));
}
// Caller is forced to handle the empty case:
int timeout = getConfigValue("timeout")
    .map(Integer::parseInt)
    .orElse(30000); // ✅ default if key missing

// Option 2: Return a default value directly
public String getConfigValue(String key, String defaultValue) {
    return config.getOrDefault(key, defaultValue); // ✅ never returns null
}
int timeout = Integer.parseInt(getConfigValue("timeout", "30000")); // ✅`}
        badLabel="Return null for missing value — requires callers to always null-check"
        goodLabel="Return Optional or accept a default parameter"
      />

      <SectionHeader number={5} title="Cause 4 — NullPointerException in Chained Method Calls" />
      <p>
        Long method chains are convenient but dangerous when any step might return null.
        If any intermediate result is null, the chain throws NPE at the entire line, making
        it harder to identify exactly which step was null.
      </p>
      <ErrorFix
        title="Long chain where any step might be null"
        bad={`// Any of these methods might return null
String city = order.getCustomer().getAddress().getCity(); // ❌ three potential NPEs in one line

// When it throws, the stack trace shows this line — but which step was null?`}
        good={`// Option 1: Break the chain and check each step
Customer customer = order.getCustomer();
if (customer == null) return "Unknown";

Address address = customer.getAddress();
if (address == null) return "Unknown";

String city = address.getCity(); // ✅ safe
return city != null ? city : "Unknown";

// Option 2: Optional chaining (Java 8+) — more concise
String city = Optional.ofNullable(order)
    .map(Order::getCustomer)
    .map(Customer::getAddress)
    .map(Address::getCity)
    .orElse("Unknown"); // ✅ safe — any null returns "Unknown"`}
        badLabel="Chained calls with no null checks anywhere in the chain"
        goodLabel="Check each step or use Optional.map() chaining"
      />

      <SectionHeader number={6} title="Java 14+ Helpful NPE Messages" />
      <p>
        Java 14 introduced "helpful NullPointerExceptions" — instead of just saying
        "NullPointerException at line 42," Java now tells you exactly which variable or expression
        was null. This is enabled by default in Java 14+ and dramatically reduces debugging time.
      </p>
      <CodeBlock lang="java" title="Java 14+ helpful NPE messages vs older Java">
{`// Old Java (before 14): unhelpful message
// Exception in thread "main" java.lang.NullPointerException at Main.java:5

// Java 14+: tells you exactly what was null
String str = null;
int len = str.length();
// Exception: Cannot invoke "String.length()" because "str" is null

// Chain example in Java 14+:
String city = user.getAddress().getCity();
// If user.getAddress() returns null:
// Cannot invoke "Address.getCity()" because the return value of "User.getAddress()" is null

// Enable helpful NPE messages in Java 11–13 (not default):
// Add JVM flag: -XX:+ShowCodeDetailsInExceptionMessages

// @NonNull annotation for compile-time protection
import org.springframework.lang.NonNull;
public void sendEmail(@NonNull String recipient, @NonNull String subject) {
    // IDE warns at call sites that pass null arguments
    // Static analysis tools catch null before runtime
}`}
      </CodeBlock>

      <KeyPointsGrid items={[
        { title: 'Use @NonNull / @Nullable annotations', description: 'Annotating method parameters and return types with @NonNull and @Nullable (from Spring, Lombok, or JetBrains) lets IDEs and static analysis tools (SpotBugs, Checkstyle) catch null problems at compile time rather than runtime.' },
        { title: 'Initialize fields at declaration', description: 'Always initialize reference type fields at the point of declaration when a sensible default exists. Use new ArrayList<>() instead of leaving List fields as null. This eliminates an entire category of NPE.' },
        { title: 'Prefer Optional for return types', description: 'Use Optional<T> for methods where the return value may legitimately be absent. This communicates the possibility in the type signature and forces callers to handle the empty case.' },
        { title: 'Use Objects.requireNonNull for validation', description: 'At the start of methods that require non-null parameters, use Objects.requireNonNull(param, "message") to fail fast with a descriptive error rather than failing deep in the code where the null is actually used.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between null and Optional.empty()?',
          answer: 'null means "no value" but doesn\'t communicate intent — callers may not know they need to check, and forgetting the check causes NPE. Optional.empty() explicitly models "no value" in the type system. Callers must actively unwrap the Optional, which forces them to handle the empty case. Use null for internal/private code where you control all callers. Use Optional for public API return types where absence is a normal, expected outcome.',
        },
        {
          question: 'How do I fix NPE in Spring/Hibernate lazy loading?',
          answer: 'Hibernate lazy-loaded collections (List<Order>, Set<Item>) are null if accessed outside an active Hibernate session. Fix options: (1) Add @Transactional to the service method so the session stays open during the operation. (2) Use JOIN FETCH in JPQL/HQL queries to eagerly load the collection in a single query. (3) Use @EntityGraph to define which associations to load eagerly. (4) Use DTOs — copy the data you need into a DTO while the session is active.',
        },
        {
          question: 'Can I prevent NullPointerException at compile time?',
          answer: 'Yes — several approaches: (1) Use @NonNull/@Nullable annotations (Spring, Lombok, IntelliJ) with static analysis tools that check nullability at compile time. (2) Use Kotlin instead of Java — Kotlin\'s type system distinguishes nullable (String?) from non-nullable (String), eliminating most NPEs at compile time. (3) Use NullAway (a Checker Framework plugin) for automated compile-time null safety checking in existing Java codebases.',
        },
        {
          question: 'Why does my NPE happen on a line that doesn\'t look like it uses null?',
          answer: 'Auto-unboxing is a common hidden NPE source. If you have an Integer variable and assign it to an int, Java automatically calls .intValue() on it — which throws NPE if the Integer is null. Example: Integer count = null; int total = count + 1; — the += triggers unboxing and NPE. Always check for null before unboxing Integer, Long, Boolean, and other wrapper types.',
        },
        {
          question: 'What\'s the best practice to avoid NPE when parsing API responses?',
          answer: 'Defensive programming for JSON/API responses: (1) Use Optional.ofNullable() when extracting values from parsed JSON objects. (2) Use getOrDefault() on Map objects from JSON parsers. (3) With Jackson, configure DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES to catch type mismatches early. (4) Use DTO classes with @JsonProperty and validate that required fields are non-null after deserialization before processing the object.',
        },
        {
          question: 'How do I debug which variable is null when NPE happens inside a library?',
          answer: 'When NPE occurs inside third-party library code, the stack trace shows library internals — not your code. Work backwards from the stack trace: find the call in your code that called the library method, and inspect each parameter you passed. Add null checks or logging before the library call. Also check: are you passing a null to the library that it doesn\'t expect? Use Java 14+ helpful NPE messages which often identify the null variable even inside library code.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
