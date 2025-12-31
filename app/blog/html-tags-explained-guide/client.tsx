'use client';

export default function HTMLTagsGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            HTML Tags Explained: Must-Do Practices, Hidden Facts & Pro Tips
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Master HTML tags with this comprehensive guide. Learn essential HTML tags, best practices, 
              lesser-known facts, and pro tips to write cleaner, smarter HTML code.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential HTML Tags</h2>
            <p className="text-gray-700 mb-4">
              HTML (HyperText Markup Language) is the foundation of web development. Understanding 
              HTML tags is crucial for creating well-structured, semantic, and accessible web pages.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Use semantic HTML5 elements for better accessibility and SEO</li>
              <li>Always close your tags properly</li>
              <li>Use proper indentation for readability</li>
              <li>Include alt text for images</li>
              <li>Use meaningful class and ID names</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Pro Tips</h2>
            <p className="text-gray-700 mb-4">
              When working with HTML, always validate your markup and ensure it follows modern 
              web standards. This will improve your site's performance, accessibility, and SEO rankings.
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                For more developer tools and resources, visit our{' '}
                <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                  main tools page
                </a>.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

