const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace Head import with SEO import
  if (content.includes('import Head from "next/head";')) {
    // Determine relative path depth
    const depth = filePath.split(path.sep).length - 2; // e.g. pages/index.js -> 1
    const relativePrefix = depth > 1 ? '../'.repeat(depth - 1) : './';
    
    content = content.replace(
      'import Head from "next/head";',
      `import SEO from "../components/SEO";`
    );
  }

  // 2. Replace <Head> block
  const headRegex = /<Head>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<\/Head>/g;
  content = content.replace(headRegex, (match, title) => {
    let desc = "DevSphere provides essential tools to build, debug, and ship faster.";
    if (title.toLowerCase().includes('json')) desc = "Format, beautify, and validate your raw JSON payloads instantly directly in your browser with DevSphere.";
    if (title.toLowerCase().includes('image')) desc = "Compress JPG, PNG, and WebP images instantly in your browser. Save bandwidth without losing quality.";
    if (title.toLowerCase().includes('css')) desc = "Generate modern CSS glassmorphism and box-shadows. Export instantly to Raw CSS, Tailwind, or React JSX.";
    if (title.toLowerCase().includes('qr')) desc = "Generate scannable, high-resolution QR codes for URLs and text. Customize colors and download instantly.";
    if (title.toLowerCase().includes('meta')) desc = "Preview exactly how your meta tags, SEO titles, and descriptions will look on Google, Twitter, and Facebook.";
    if (title.toLowerCase().includes('regex')) desc = "Write, test, and debug Regular Expressions in real-time with instant match highlighting.";
    if (title.toLowerCase().includes('seo')) desc = "Instantly audit any webpage for on-page SEO best practices. Check title lengths, meta descriptions, and alt tags.";
    if (title.toLowerCase().includes('docs')) desc = "Documentation and tutorials for using the powerful suite of developer utilities provided by DevSphere.";

    return `<SEO title="${title}" description="${desc}" />`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated SEO in ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') && !fullPath.includes('_app.js') && !fullPath.includes('_document.js')) {
      processFile(fullPath);
    }
  }
}

walk('./pages');
console.log("SEO migration complete.");
