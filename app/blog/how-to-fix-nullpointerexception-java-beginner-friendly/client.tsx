'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Bug, CheckCircle, AlertCircle, HelpCircle, Clock, Shield, Lock } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToFixNullpointerexceptionClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Fix "NullPointerException" in Java (Beginner-Friendly)</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Troubleshooting NPE in Java (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Fix &quot;NullPointerException&quot; in Java (Beginner-Friendly)"
        description="Complete Guide to Troubleshooting NPE in Java (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is a NullPointerException in Java?',
              answer: 'NullPointerException (NPE) is a runtime exception in Java that occurs when you try to use a null reference (an object that hasn\'t been initialized) as if it were an actual object. For example, calling a method on a null object like obj.method() when obj is null raises NullPointerException.',
            },
            {
              question: 'How do I fix NullPointerException in Java?',
              answer: 'To fix NullPointerException: 1) Check for null before using objects with if (obj != null), 2) Use Optional class to handle potentially null values, 3) Initialize objects properly before use, 4) Use try-catch blocks to handle NPE, 5) Use Objects.requireNonNull() to validate non-null parameters, or 6) Use null-safe operators and methods when available.',
            },
            {
              question: 'How do I check if an object is null in Java?',
              answer: 'You can check if an object is null using: 1) if (obj == null) or if (obj != null), 2) Objects.isNull(obj) returns true if null, 3) Objects.nonNull(obj) returns true if not null, or 4) Use Optional.ofNullable(obj) to wrap potentially null values. The most common way is the simple null check: if (obj != null) then use obj.',
            },
            {
              question: 'What causes NullPointerException?',
              answer: 'NullPointerException occurs when: 1) Calling methods on null objects (obj.method() when obj is null), 2) Accessing fields of null objects (obj.field when obj is null), 3) Accessing array elements when array is null, 4) Uninitialized object references, 5) Methods returning null unexpectedly, or 6) Passing null to methods that don\'t handle it.',
            },
            {
              question: 'How do I prevent NullPointerException?',
              answer: 'To prevent NullPointerException: 1) Always initialize objects before use, 2) Check for null before accessing object members, 3) Use Optional class for potentially null values, 4) Validate method parameters with Objects.requireNonNull(), 5) Use defensive programming practices, 6) Initialize collections and arrays properly, and 7) Handle null returns from methods appropriately.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is a NullPointerException?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>NullPointerException (NPE)</strong> is a runtime exception in Java that occurs when you try to use a null reference as if it were an actual object. In Java, <code className="bg-gray-100 px-1 rounded">null</code> represents the absence of an object, and attempting to call methods or access fields on a null reference causes the JVM to throw a NullPointerException.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              NullPointerException is one of the most common exceptions in Java programming. It occurs when you try to perform operations on an object that hasn't been initialized or has been explicitly set to <code className="bg-gray-100 px-1 rounded">null</code>. This can happen when calling methods, accessing fields, or using array elements on null references.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike some languages that have null safety built-in, Java allows null references and requires developers to explicitly check for null values. This makes NullPointerException a frequent issue, especially for beginners, but it can be prevented with proper null checking and defensive programming practices.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> NullPointerException occurs when you try to use a null reference. Always check for null before using objects, initialize objects properly, and use defensive programming practices to prevent NPE.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bug className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding NullPointerException</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              NullPointerException manifests in different ways:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Method Calls on Null
                </h3>
                <p className="text-gray-700 text-sm mb-2">Calling a method on a null object raises NullPointerException. For example, <code className="bg-gray-100 px-1 rounded">obj.method()</code> when <code className="bg-gray-100 px-1 rounded">obj</code> is null causes NPE. This is the most common cause of NullPointerException.</p>
                <p className="text-gray-600 text-xs">Example: String str = null; int len = str.length(); // NullPointerException</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Field Access on Null
                </h3>
                <p className="text-gray-700 text-sm mb-2">Accessing instance fields or static fields through a null reference causes NullPointerException. For example, <code className="bg-gray-100 px-1 rounded">obj.field</code> when <code className="bg-gray-100 px-1 rounded">obj</code> is null raises NPE.</p>
                <p className="text-gray-600 text-xs">Example: Person person = null; String name = person.name; // NullPointerException</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Array Access on Null
                </h3>
                <p className="text-gray-700 text-sm mb-2">Accessing array elements when the array reference is null causes NullPointerException. For example, <code className="bg-gray-100 px-1 rounded">arr[0]</code> when <code className="bg-gray-100 px-1 rounded">arr</code> is null raises NPE.</p>
                <p className="text-gray-600 text-xs">Example: int[] arr = null; int val = arr[0]; // NullPointerException</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  Uninitialized References
                </h3>
                <p className="text-gray-700 text-sm mb-2">Using uninitialized object references (declared but not assigned) causes NullPointerException. Local variables must be initialized before use, but instance variables default to null if not initialized.</p>
                <p className="text-gray-600 text-xs">Example: String str; int len = str.length(); // NullPointerException (if str is instance variable)</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> NullPointerException is a runtime exception, meaning it occurs during program execution, not during compilation. Always check for null before using objects to prevent NPE.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When NullPointerException Occurs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              NullPointerException occurs in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Uninitialized Object References</h3>
                  <p className="text-gray-700 text-sm">When you declare an object reference but don't initialize it, or when a method returns null unexpectedly, using that reference causes NullPointerException. Instance variables default to null if not initialized.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Method Calls on Null Objects</h3>
                  <p className="text-gray-700 text-sm">Calling methods on objects that are null causes NullPointerException. This commonly happens when methods return null, when objects aren't properly initialized, or when null is passed as a parameter.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Collection and Array Operations</h3>
                  <p className="text-gray-700 text-sm">Accessing elements of null arrays or collections, or calling methods on null collection references causes NullPointerException. Collections must be initialized before use.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Chained Method Calls</h3>
                  <p className="text-gray-700 text-sm">In chained method calls like <code className="bg-gray-100 px-1 rounded">obj.getA().getB().getC()</code>, if any method in the chain returns null, the next method call causes NullPointerException.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> NullPointerException is most common when working with method return values, user input, database results, or API responses that may be null. Always check for null before using these values.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Solutions with Examples</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to fix and prevent NullPointerException:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Null Checks (Most Common)</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Null Check</h4>
                <p className="text-gray-700 text-sm mb-2">Always check for null before using objects:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Raises NullPointerException if str is null
String str = getString();
int length = str.length();  // NPE if str is null

// ✅ Safe - check for null first
String str = getString();
if (str != null) {
    int length = str.length();
    System.out.println("Length: " + length);
} else {
    System.out.println("String is null");
}

// ✅ With default value
String str = getString();
int length = (str != null) ? str.length() : 0;`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Use Objects.requireNonNull()</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Validate Parameters</h4>
                <p className="text-gray-700 text-sm mb-2">Use Objects.requireNonNull() to validate non-null parameters:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import java.util.Objects;

// Validate parameter is not null
public void processUser(User user) {
    // Throws NullPointerException with message if user is null
    Objects.requireNonNull(user, "User cannot be null");
    
    // Now safe to use user
    String name = user.getName();
}

// Or with custom message
public void processUser(User user) {
    Objects.requireNonNull(user, "User parameter is required");
    // Continue processing...
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Use Optional Class (Java 8+)</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Handle Potentially Null Values</h4>
                <p className="text-gray-700 text-sm mb-2">Use Optional to safely handle potentially null values:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import java.util.Optional;

// Wrap potentially null value
String str = getString();
Optional<String> optionalStr = Optional.ofNullable(str);

// Safe access with default value
String result = optionalStr.orElse("Default");
int length = optionalStr.map(String::length).orElse(0);

// Or use ifPresent
optionalStr.ifPresent(s -> System.out.println("Value: " + s));

// Method returning Optional
public Optional<String> findUser(String id) {
    User user = userRepository.findById(id);
    return Optional.ofNullable(user != null ? user.getName() : null);
}

// Usage
Optional<String> name = findUser("123");
String userName = name.orElse("Unknown");`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Use Try-Catch Blocks</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Handle NullPointerException</h4>
                <p className="text-gray-700 text-sm mb-2">Catch and handle NullPointerException:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// Handle NullPointerException
String str = getString();

try {
    int length = str.length();
    System.out.println("Length: " + length);
} catch (NullPointerException e) {
    System.out.println("String is null, using default length");
    int length = 0;
}

// Or catch and log
try {
    processString(str);
} catch (NullPointerException e) {
    logger.error("NullPointerException occurred", e);
    // Handle error appropriately
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 5: Initialize Objects Properly</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Prevent Null References</h4>
                <p className="text-gray-700 text-sm mb-2">Always initialize objects before use:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ Uninitialized - defaults to null (instance variable)
private String name;  // null by default
int length = name.length();  // NullPointerException

// ✅ Initialize properly
private String name = "";  // Empty string
int length = name.length();  // Works (returns 0)

// Or initialize in constructor
public class User {
    private String name;
    
    public User() {
        this.name = "";  // Initialize to empty string
    }
}

// For collections
// ❌ Null reference
List<String> items;  // null
items.add("item");  // NullPointerException

// ✅ Initialize collection
List<String> items = new ArrayList<>();
items.add("item");  // Works`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 6: Safe Chained Method Calls</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Handle Null in Chains</h4>
                <p className="text-gray-700 text-sm mb-2">Safely handle chained method calls that may return null:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ NPE if any method returns null
String city = user.getAddress().getCity().getName();

// ✅ Check each level
User user = getUser();
if (user != null) {
    Address address = user.getAddress();
    if (address != null) {
        City city = address.getCity();
        if (city != null) {
            String cityName = city.getName();
        }
    }
}

// ✅ Using Optional for chained calls
Optional.ofNullable(user)
    .map(User::getAddress)
    .map(Address::getCity)
    .map(City::getName)
    .orElse("Unknown");`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Best Practice:</strong> Always check for null before using objects, especially when dealing with method return values, user input, or external data sources. Use Optional for potentially null values, and initialize objects properly to prevent NullPointerException.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Fix NullPointerException Properly</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fixing NullPointerException properly is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Prevent Application Crashes
                </h3>
                <p className="text-gray-700 text-sm">Unhandled NullPointerException can crash your application. Using null checks, Optional, or try-catch blocks ensures your application continues running even when null values are encountered.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Defensive Programming
                </h3>
                <p className="text-gray-700 text-sm">Proper null handling is a fundamental defensive programming practice. It makes your code more robust, reliable, and less prone to unexpected crashes, especially when dealing with external data sources.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Better Error Messages
                </h3>
                <p className="text-gray-700 text-sm">Proper null handling allows you to provide meaningful error messages instead of generic NullPointerException. You can guide users or log helpful information about what went wrong.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-orange-600" />
                  Easier Debugging
                </h3>
                <p className="text-gray-700 text-sm">Proper null checks make debugging easier. You can identify null values early, handle them appropriately, and prevent cascading errors that make debugging more difficult.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> NullPointerException is one of the most common exceptions in Java. Learning to handle null values properly is essential for writing robust Java applications. Always use defensive programming practices.
              </p>
            </div>
          </section>

          {/* Common Examples Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common NullPointerException Examples and Solutions</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 1: String Operations</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ NPE if name is null
String name = getUserName();
int length = name.length();

// ✅ Safe access
String name = getUserName();
int length = (name != null) ? name.length() : 0;`}</code></pre>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 2: Collection Operations</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ NPE if list is null
List<String> items = getItems();
int size = items.size();

// ✅ Safe access
List<String> items = getItems();
int size = (items != null) ? items.size() : 0;`}</code></pre>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Example 3: Method Return Values</h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`// ❌ NPE if getUser() returns null
User user = getUser();
String email = user.getEmail();

// ✅ Safe access
User user = getUser();
if (user != null) {
    String email = user.getEmail();
} else {
    // Handle null user
}`}</code></pre>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I check if an object is null in Java?</h3>
                <p className="text-gray-700 leading-relaxed">You can check if an object is null using: 1) <code className="bg-gray-100 px-1 rounded">if (obj == null)</code> or <code className="bg-gray-100 px-1 rounded">if (obj != null)</code>, 2) <code className="bg-gray-100 px-1 rounded">Objects.isNull(obj)</code> returns true if null, 3) <code className="bg-gray-100 px-1 rounded">Objects.nonNull(obj)</code> returns true if not null, or 4) Use <code className="bg-gray-100 px-1 rounded">Optional.ofNullable(obj)</code> to wrap potentially null values. The most common way is the simple null check: <code className="bg-gray-100 px-1 rounded">if (obj != null)</code> then use obj.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between == null and .equals() for null checks?</h3>
                <p className="text-gray-700 leading-relaxed">Use <code className="bg-gray-100 px-1 rounded">== null</code> or <code className="bg-gray-100 px-1 rounded">!= null</code> to check if an object is null. Never use <code className="bg-gray-100 px-1 rounded">obj.equals(null)</code> or <code className="bg-gray-100 px-1 rounded">null.equals(obj)</code> because calling <code className="bg-gray-100 px-1 rounded">.equals()</code> on null raises NullPointerException. Always use <code className="bg-gray-100 px-1 rounded">== null</code> for null checks.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I use Optional instead of null checks?</h3>
                <p className="text-gray-700 leading-relaxed">Use Optional when: 1) Method return values that may be null (makes null explicit), 2) Chained method calls that may return null, 3) When you want to provide default values easily, or 4) When working with streams and functional programming. Use simple null checks for straightforward cases where Optional would add unnecessary complexity.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I prevent NullPointerException in chained method calls?</h3>
                <p className="text-gray-700 leading-relaxed">To prevent NPE in chained calls: 1) Check each level individually with nested if statements, 2) Use Optional to safely chain calls: <code className="bg-gray-100 px-1 rounded">Optional.ofNullable(obj).map(Obj::getNext).map(Next::getValue).orElse(default)</code>, 3) Use try-catch to handle NPE at any level, or 4) Refactor code to avoid deep chaining. Optional is the most elegant solution for chained calls.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the best way to handle NullPointerException in production code?</h3>
                <p className="text-gray-700 leading-relaxed">The best approach depends on context: Use null checks for simple cases, use Optional for method returns that may be null, use Objects.requireNonNull() for parameter validation, use try-catch when you need to handle multiple potential exceptions, and always initialize objects properly. Choose the method that makes your code most readable and maintainable while preventing NPE effectively.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="How to Fix &quot;NullPointerException&quot; in Java (Beginner-Friendly)"
            description="Complete Guide to Troubleshooting NPE in Java (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Fix NullPointerException Guide" />
        </section>
      </main>
    </div>
  );
}
