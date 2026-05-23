import SEO from "../components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Code, AlignLeft, Minimize2, Trash2 } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <>
      <SEO title="JSON Formatter | DevSphere" description="Format, beautify, and validate your raw JSON payloads instantly directly in your browser with DevSphere." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
              <Code className="text-zinc-600" size={24} /> JSON Formatter
            </h1>
            <p className="text-zinc-500 text-sm">Validate, beautify, and minify your JSON data.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={clearAll}
              className="p-2 rounded-md hover:bg-white text-zinc-600 hover:text-zinc-900 transition-colors"
              title="Clear"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={formatJson}
              className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-100 transition-colors font-medium text-sm"
            >
              <AlignLeft size={16} /> Beautify
            </button>
            <button 
              onClick={minifyJson}
              className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-100 transition-colors font-medium text-sm"
            >
              <Minimize2 size={16} /> Minify
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          {/* Input Panel */}
          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-800">Input</span>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent p-4 outline-none resize-none font-mono text-sm text-zinc-800 placeholder-zinc-700"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-800">Output</span>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? <span className="text-green-400">Copied!</span> : <><Copy size={14} /> Copy</>}
                </button>
                <div className="w-px h-4 bg-zinc-100 mx-1 self-center" />
                <button 
                  onClick={downloadJson}
                  className="text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Download size={14} /> Save
                </button>
              </div>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent p-4 outline-none resize-none font-mono text-sm text-zinc-900"
              value={output}
              readOnly
              placeholder="Output will appear here..."
              spellCheck={false}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
