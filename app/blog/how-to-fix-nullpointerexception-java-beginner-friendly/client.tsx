'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, ErrorFix, CodeBlock, FAQAccordion,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToFixNullPointerExceptionJavaBeginnerFriendlyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix NullPointerException in Java — Beginner-Friendly Guide</h1>
      <p className="lead">
        NullPointerException (NPE) is Java's most common runtime exception. It happens when you
        try to use a reference that points to nothing (null). This guide explains every cause,
        how to read the stack trace, and modern Java tools to prevent NPEs entirely.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'most common Java runtime exception', color: 'red' },
        { value: 'null', label: 'a reference that points to no object', color: 'amber' },
        { value: 'Optional<T>', label: 'Java 8+ way to handle possibly-null values', color: 'green' },
        { value: 'Stack trace', label: 'always points to the exact line causing the NPE', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="What Causes NullPointerException" />
      <QuickFact>
        NPE occurs when you call a method or access a field on a null reference.
        Java throws NPE at runtime — not compile time. The stack trace always tells you
        the exact class, method, and line number. Read it carefully before trying to fix anything.
      </QuickFact>

      <AlertBox type="error" title="Reading a NullPointerException stack trace">
        {`Exception in thread "main" java.lang.NullPointerException\n`}
        {`  at com.example.UserService.getFullName(UserService.java:42)  ← exact line\n`}
        {`  at com.example.Main.main(Main.java:15)  ← called from here`}
      </AlertBox>

      <SectionHeader number={2} title="Cause 1 — Calling Method on Null Object" />
      <ErrorFix
        bad={`User user = userRepository.findById(id); // might return null
String name = user.getName(); // ❌ NPE if user is null`}
        good={`// Option 1: Null check
User user = userRepository.findById(id);
if (user != null) {
    String name = user.getName(); // ✅ safe
}

// Option 2: Optional (Java 8+)
Optional<User> userOpt = userRepository.findByIdOptional(id);
String name = userOpt.map(User::getName).orElse("Unknown"); // ✅ safe

// Option 3: Objects.requireNonNull for fast-fail
User user = Objects.requireNonNull(userRepository.findById(id),
    "User not found for id: " + id); // throws descriptive NPE if null`}
        badLabel="No null check"
        goodLabel="Null check / Optional / requireNonNull"
      />

      <SectionHeader number={3} title="Cause 2 — Uninitialized Field" />
      <ErrorFix
        bad={`public class ShoppingCart {
    private List<Item> items; // ❌ default value is null, not empty list

    public void addItem(Item item) {
        items.add(item); // ❌ NPE — items is null
    }
}`}
        good={`public class ShoppingCart {
    private List<Item> items = new ArrayList<>(); // ✅ initialize in declaration

    public void addItem(Item item) {
        items.add(item); // ✅ safe
    }
}`}
        badLabel="Field declared but not initialized"
        goodLabel="Initialize at declaration time"
      />

      <SectionHeader number={4} title="Cause 3 — Method Returns Null" />
      <ErrorFix
        bad={`// Method returns null for "not found"
public String getConfigValue(String key) {
    if (!config.containsKey(key)) return null; // ❌ caller might not check
}

// Caller doesn't check
String value = getConfigValue("timeout");
int timeout = Integer.parseInt(value); // ❌ NPE if value is null`}
        good={`// Option 1: Return Optional
public Optional<String> getConfigValue(String key) {
    return Optional.ofNullable(config.get(key));
}

// Option 2: Return default value
public String getConfigValue(String key, String defaultValue) {
    return config.getOrDefault(key, defaultValue); // ✅ never null
}

// Usage
int timeout = Integer.parseInt(getConfigValue("timeout", "30")); // ✅`}
        badLabel="Return null for missing value"
        goodLabel="Return Optional or default value"
      />

      <SectionHeader number={5} title="Java 14+ Helpful NPE Messages" />
      <CodeBlock language="java" filename="Enabling helpful NPE messages">
{`// Java 14+ shows exactly which variable was null:
// "Cannot invoke String.length() because str is null"
// vs older: just "NullPointerException"

// Enable in older Java 11-13:
// -XX:+ShowCodeDetailsInExceptionMessages

// Modern Java (14+) — helpful by default:
String str = null;
int len = str.length(); // Java 14+: "Cannot invoke String.length() because str is null"

// @NonNull annotation (with Lombok or spring-null-safety)
import org.springframework.lang.NonNull;
public void process(@NonNull String data) {
    // IDE and tools warn if you pass null here at compile time
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is the difference between null and Optional.empty()?',
          answer: 'null means "no value" but doesn\'t communicate intent — callers may not know to check. Optional.empty() explicitly models "no value" in the type system. Callers must unwrap the Optional, forcing them to handle the empty case. Use Optional for return types where absence is a normal, expected outcome.',
        },
        {
          question: 'How do I fix NPE in Spring/Hibernate lazy loading?',
          answer: 'Hibernate lazy-loaded collections are null outside an active session. Fix: 1) Add @Transactional to the service method, 2) Use JOIN FETCH in JPQL queries to eagerly load the collection, 3) Use DTOs to copy data while the session is active before it closes.',
        },
        {
          question: 'Can I prevent NullPointerException at compile time?',
          answer: 'Yes — use @NonNull/@Nullable annotations with a static analysis tool (Checkstyle, SpotBugs, or IntelliJ inspections). Kotlin eliminates most NPEs by distinguishing nullable (String?) from non-nullable (String) in the type system at compile time. If working in Java, adopt Optional for method return types and @NonNull for parameters.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
