const fs = require('fs');
const path = require('path');

// Recursively find all client.tsx files in blog directory
function findBlogFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findBlogFiles(filePath, fileList);
    } else if (file === 'client.tsx') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Find all blog client.tsx files
const blogFiles = findBlogFiles('app/blog');

console.log(`Found ${blogFiles.length} blog files to update`);

blogFiles.forEach((filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Skip if already has BlogSocialShare
    if (content.includes('BlogSocialShare')) {
      console.log(`Skipping ${filePath} - already has BlogSocialShare`);
      return;
    }
    
    // Extract title from h1 tag
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Blog Post';
    
    // Extract description from meta or use title
    const descMatch = content.match(/<p[^>]*className="text-sm text-gray-500[^"]*"[^>]*>([^<]+)<\/p>/);
    const description = descMatch ? descMatch[1].trim() : title;
    
    // Add import
    if (!content.includes("import BlogSocialShare")) {
      const importMatch = content.match(/(import.*from.*['"]@\/components\/[^'"]+['"];)/);
      if (importMatch) {
        const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
        content = content.slice(0, lastImportIndex) + 
          "\nimport BlogSocialShare from '@/components/BlogSocialShare';" + 
          content.slice(lastImportIndex);
      } else {
        // Find where imports end
        const importEnd = content.indexOf("export default");
        if (importEnd > 0) {
          content = content.slice(0, importEnd) + 
            "import BlogSocialShare from '@/components/BlogSocialShare';\n" + 
            content.slice(importEnd);
        }
      }
    }
    
    // Add floating bar after header
    if (!content.includes('Floating Social Share Bar')) {
      const headerEnd = content.indexOf('</header>');
      if (headerEnd > 0) {
        const afterHeader = content.indexOf('\n', headerEnd) + 1;
        content = content.slice(0, afterHeader) + 
          `\n      {/* Floating Social Share Bar */}\n      <BlogSocialShare \n        title="${title.replace(/"/g, '&quot;')}"\n        description="${description.replace(/"/g, '&quot;')}"\n        variant="floating"\n      />\n\n` + 
          content.slice(afterHeader);
      }
    }
    
    // Update main padding if needed
    if (content.includes('<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">')) {
      content = content.replace(
        '<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">',
        '<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">'
      );
    }
    
    // Add full sharing section before newsletter
    if (!content.includes('Social Share Section')) {
      const newsletterMatch = content.match(/(\{\/\* Newsletter Signup \*\/\})/);
      if (newsletterMatch) {
        const beforeNewsletter = content.indexOf(newsletterMatch[0]);
        content = content.slice(0, beforeNewsletter) + 
          `        {/* Social Share Section */}\n        <section className="mt-12">\n          <BlogSocialShare \n            title="${title.replace(/"/g, '&quot;')}"\n            description="${description.replace(/"/g, '&quot;')}"\n            variant="full"\n          />\n        </section>\n\n        ` + 
          content.slice(beforeNewsletter);
      }
    }
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated ${filePath}`);
    } else {
      console.log(`- No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('\nDone!');
