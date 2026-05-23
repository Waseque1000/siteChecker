import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Copy, Code2 } from "lucide-react";

export default function CssGenerator() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.05);
  const [borderOpacity, setBorderOpacity] = useState(0.1);
  const [format, setFormat] = useState("css"); // css, tailwind, jsx
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    const bg = `rgba(255, 255, 255, ${opacity.toFixed(2)})`;
    const border = `rgba(255, 255, 255, ${borderOpacity.toFixed(2)})`;

    if (format === "css") {
      return `/* Glassmorphism CSS */
background: ${bg};
border: 1px solid ${border};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: 12px;`;
    } 
    
    if (format === "tailwind") {
      // Tailwind uses arbitrary values for exact matching
      return `/* Tailwind CSS Classes */
className="bg-[${bg.replace(/\s+/g, '')}] border border-[${border.replace(/\s+/g, '')}] backdrop-blur-[${blur}px] rounded-xl"`;
    }

    if (format === "jsx") {
      return `// React / Next.js JSX Style Object
style={{
  background: "${bg}",
  border: "1px solid ${border}",
  backdropFilter: "blur(${blur}px)",
  WebkitBackdropFilter: "blur(${blur}px)",
  borderRadius: "12px"
}}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>CSS Generator | DevSphere</title>
      </Head>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
              <Palette className="text-zinc-600" size={24} /> CSS Glass Generator
            </h1>
            <p className="text-zinc-500 text-sm">Generate modern glassmorphism code for premium UIs.</p>
          </div>
          
          <div className="flex p-1 bg-white rounded-lg border border-zinc-200">
            {["css", "tailwind", "jsx"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors uppercase ${
                  format === fmt ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
          
          {/* Controls */}
          <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
            <div>
              <label className="text-sm text-zinc-600 mb-2 flex justify-between">
                <span>Backdrop Blur (px)</span>
                <span className="text-zinc-900">{blur}px</span>
              </label>
              <input 
                type="range" min="0" max="40" step="1" 
                value={blur} onChange={(e) => setBlur(parseInt(e.target.value))}
                className="w-full accent-white"
              />
            </div>
            
            <div>
              <label className="text-sm text-zinc-600 mb-2 flex justify-between">
                <span>Background Opacity</span>
                <span className="text-zinc-900">{opacity.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-600 mb-2 flex justify-between">
                <span>Border Opacity</span>
                <span className="text-zinc-900">{borderOpacity.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={borderOpacity} onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          </div>

          {/* Preview & Code */}
          <div className="flex flex-col gap-6">
            <div className="h-[250px] rounded-xl relative overflow-hidden flex items-center justify-center border border-zinc-200">
              {/* Colorful background pattern to show off the glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 z-0" />
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
              
              <div 
                className="relative z-10 w-[60%] h-[60%] flex items-center justify-center shadow-2xl transition-all"
                style={{
                  background: `rgba(255, 255, 255, ${opacity})`,
                  border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                  borderRadius: '12px'
                }}
              >
                <span className="text-zinc-900 font-medium drop-shadow-md">Glass Effect</span>
              </div>
            </div>

            <div className="glass-panel rounded-xl flex flex-col overflow-hidden relative group">
              <button 
                onClick={copyToClipboard}
                className="absolute top-3 right-3 p-2 bg-zinc-100 hover:bg-zinc-800 border border-zinc-200 rounded-md text-zinc-800 transition-colors z-10"
              >
                {copied ? <span className="text-green-400 text-xs font-medium px-1">Copied!</span> : <Copy size={14} />}
              </button>
              <pre className="p-4 overflow-x-auto text-sm text-zinc-900 font-mono leading-relaxed">
                <code>{getCode()}</code>
              </pre>
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
}
