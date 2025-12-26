# Favicon Setup Instructions

## How to Add Your Favicon

1. **Prepare Your Icon Files:**
   - Convert your icon image to the following formats and sizes:
     - `favicon.ico` - Main favicon (16x16, 32x32, 48x48 sizes)
     - `favicon-16x16.png` - 16x16 pixels
     - `favicon-32x32.png` - 32x32 pixels
     - `apple-touch-icon.png` - 180x180 pixels (for iOS devices)

2. **Place Files in Public Directory:**
   - Copy all favicon files to: `/public/` directory
   - The files should be:
     - `/public/favicon.ico`
     - `/public/favicon-16x16.png`
     - `/public/favicon-32x32.png`
     - `/public/apple-touch-icon.png`

3. **File Naming:**
   - Make sure the file names match exactly as shown above
   - The code is already configured to use these file names

4. **Recommended Tools:**
   - Use online tools like:
     - https://favicon.io/favicon-converter/
     - https://realfavicongenerator.net/
   - Upload your icon image and download all required formats

5. **Testing:**
   - After adding the files, restart your development server
   - Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
   - The favicon should appear in the browser tab

## Current Configuration

The favicon is configured in `app/layout.tsx` with:
- Standard favicon.ico
- PNG favicons for different sizes
- Apple touch icon for iOS devices

All files should be placed in the `/public/` directory.

