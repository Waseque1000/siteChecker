import SEO from "../components/SEO";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchCode, AlertCircle } from "lucide-react";

export default function RegexTester() {
  const [regex, setRegex] = useState("[A-Z][a-z]+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Hello World, this is DevSphere!");

  const { matches, error } = useMemo(() => {
    try {
      if (!regex) return { matches: [], error: null };
      const re = new RegExp(regex, flags);
      const matches = [];
      let match;
      
      // If global flag is not set, we just find the first match to avoid infinite loops
      if (!flags.includes("g")) {
        match = re.exec(testString);
        if (match) matches.push(match);
      } else {
        // Safe global matching
        let lastIndex = -1;
        while ((match = re.exec(testString)) !== null) {
          if (match.index === lastIndex) break; // Prevent zero-length infinite loops
          lastIndex = match.index;
          matches.push(match);
        }
      }
      return { matches, error: null };
    } catch (err) {
      return { matches: [], error: err.message };
    }
  }, [regex, flags, testString]);

  // Create highlighted text
  const highlightedText = useMemo(() => {
    if (error || !regex || matches.length === 0) return testString;
    
    let result = [];
    let lastIndex = 0;
    
    matches.forEach((match, i) => {
      const start = match.index;
      const end = start + match[0].length;
      
      if (start > lastIndex) {
        result.push(<span key={`text-${i}`}>{testString.substring(lastIndex, start)}</span>);
      }
      
      result.push(
        <span key={`match-${i}`} className="bg-emerald-500/30 text-emerald-300 rounded px-0.5 border border-emerald-500/40">
          {testString.substring(start, end)}
        </span>
      );
      
      lastIndex = end;
    });
    
    if (lastIndex < testString.length) {
      result.push(<span key="text-end">{testString.substring(lastIndex)}</span>);
    }
    
    return result;
  }, [matches, error, regex, testString]);

  return (
    <>
      <SEO title="Regex Tester | DevSphere" description="Write, test, and debug Regular Expressions in real-time with instant match highlighting." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
            <SearchCode className="text-zinc-600" size={24} /> Regex Tester
          </h1>
          <p className="text-zinc-500 text-sm">Write, test, and debug regular expressions in real-time.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4">
          
          <div className="glass-panel p-5 rounded-xl flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-2.5 text-zinc-500 font-mono text-lg">/</span>
                <input 
                  type="text" 
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-md pl-8 pr-4 py-2.5 text-zinc-900 font-mono outline-none focus:border-zinc-500 transition-colors"
                  placeholder="pattern"
                />
                <span className="absolute right-4 top-2.5 text-zinc-500 font-mono text-lg">/</span>
              </div>
              <div className="w-24">
                <input 
                  type="text" 
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-600 font-mono outline-none focus:border-zinc-500 transition-colors"
                  placeholder="flags"
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-md">
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-800">Test String</span>
            </div>
            <div className="relative flex-1 min-h-[200px]">
              {/* Highlight layer */}
              <div className="absolute inset-0 p-4 font-mono text-sm whitespace-pre-wrap break-words text-transparent z-0 pointer-events-none">
                {highlightedText}
              </div>
              {/* Input layer */}
              <textarea
                className="absolute inset-0 w-full h-full bg-transparent p-4 outline-none resize-none font-mono text-sm text-zinc-900 z-10 opacity-70 caret-white"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-800">Matches ({matches.length})</span>
            </div>
            <div className="p-4 max-h-[250px] overflow-y-auto space-y-2">
              {matches.length === 0 ? (
                <span className="text-zinc-500 text-sm font-mono">No matches found.</span>
              ) : (
                matches.map((match, idx) => (
                  <div key={idx} className="bg-white border border-zinc-200 rounded p-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                      <span>Match {idx + 1}</span>
                      <span>Index {match.index} - {match.index + match[0].length}</span>
                    </div>
                    <span className="text-emerald-300 font-mono text-sm">{match[0]}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
}
