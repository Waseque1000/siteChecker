const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /bg-\[#0a0a0a\]/g, to: 'bg-zinc-50' },
  { from: /bg-\[#0a0a0a\]\/50/g, to: 'bg-white/70' },
  { from: /text-\[#fafafa\]/g, to: 'text-zinc-900' },
  { from: /text-white/g, to: 'text-zinc-900' },
  { from: /text-\[#a1a1aa\]/g, to: 'text-zinc-600' },
  { from: /border-\[#ffffff14\]/g, to: 'border-zinc-200' },
  { from: /border-\[#ffffff0a\]/g, to: 'border-zinc-200' },
  { from: /bg-\[#ffffff0a\]/g, to: 'bg-white' },
  { from: /bg-\[#ffffff05\]/g, to: 'bg-white' },
  { from: /bg-\[#ffffff14\]/g, to: 'bg-zinc-100' },
  { from: /hover:bg-\[#ffffff14\]/g, to: 'hover:bg-zinc-100' },
  { from: /hover:bg-\[#ffffff05\]/g, to: 'hover:bg-zinc-50' },
  { from: /hover:bg-\[#ffffff20\]/g, to: 'hover:bg-zinc-200' },
  { from: /hover:text-white/g, to: 'hover:text-zinc-900' },
  { from: /text-zinc-300/g, to: 'text-zinc-800' },
  { from: /text-zinc-400/g, to: 'text-zinc-600' },
  { from: /text-zinc-500/g, to: 'text-zinc-500' }, // neutral
  { from: /from-zinc-800\/20/g, to: 'from-zinc-200/50' },
  { from: /bg-black\/20/g, to: 'bg-zinc-100' },
  { from: /bg-black/g, to: 'bg-white' }, // Twitter preview container
  { from: /border-zinc-700/g, to: 'border-zinc-200' }, // Previews border
  { from: /bg-zinc-900/g, to: 'bg-zinc-100' }, // Twitter img placeholder
  { from: /text-zinc-100/g, to: 'text-zinc-900' }, // Twitter title
  { from: /bg-\[#242526\]/g, to: 'bg-[#f0f2f5]' }, // FB preview
  { from: /bg-\[#3a3b3c\]/g, to: 'bg-[#e4e6eb]' }, // FB img placeholder
  { from: /text-\[#e4e6eb\]/g, to: 'text-[#1c1e21]' }, // FB text
  { from: /text-\[#b0b3b8\]/g, to: 'text-[#606770]' }, // FB secondary text
  { from: /bg-white text-black/g, to: 'bg-zinc-900 text-white' }, // Buttons that were inverted
  { from: /hover:bg-zinc-200/g, to: 'hover:bg-zinc-800' }, // Buttons inverted hover
  { from: /setFgColor\("#fafafa"\)/g, to: 'setFgColor("#0a0a0a")' },
  { from: /setBgColor\("#0a0a0a"\)/g, to: 'setBgColor("#ffffff")' }
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      replacements.forEach(r => {
        content = content.replace(r.from, r.to);
      });
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk('./pages');
walk('./components');
console.log("Migration to light mode complete.");
