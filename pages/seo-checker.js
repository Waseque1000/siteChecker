import SEO from "../components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, Code2, AlertCircle, CheckCircle2, Search, XCircle } from "lucide-react";

export default function SeoChecker() {
  const [inputType, setInputType] = useState("url"); // 'url' or 'html'
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const analyzeHtml = (html) => {
    // Create a dummy DOM element to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 1. Title
    const titleTag = doc.querySelector("title");
    const title = titleTag ? titleTag.textContent : "";
    
    // 2. Meta Description
    const metaDescTag = doc.querySelector('meta[name="description"]');
    const description = metaDescTag ? metaDescTag.getAttribute("content") : "";

    // 3. H1 Tags
    const h1Tags = doc.querySelectorAll("h1");
    
    // 4. Images (Alt attributes)
    const images = doc.querySelectorAll("img");
    let missingAltCount = 0;
    images.forEach(img => {
      if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
        missingAltCount++;
      }
    });

    // 5. Links
    const links = doc.querySelectorAll("a");
    let emptyLinksCount = 0;
    links.forEach(a => {
      if (!a.hasAttribute("href") || a.getAttribute("href").trim() === "" || a.getAttribute("href") === "#") {
        emptyLinksCount++;
      }
    });

    // Calculate Score (Max 100)
    let score = 100;
    
    // Title scoring
    if (!title) score -= 20;
    else if (title.length < 30 || title.length > 65) score -= 10;

    // Description scoring
    if (!description) score -= 20;
    else if (description.length < 120 || description.length > 165) score -= 10;

    // H1 scoring
    if (h1Tags.length === 0) score -= 15;
    else if (h1Tags.length > 1) score -= 5;

    // Images scoring
    if (images.length > 0 && missingAltCount > 0) {
      score -= Math.min(15, missingAltCount * 2);
    }

    // Links scoring
    if (links.length > 0 && emptyLinksCount > 0) {
      score -= Math.min(10, emptyLinksCount * 2);
    }

    setResults({
      score: Math.max(0, score),
      title: { value: title, length: title.length },
      description: { value: description, length: description ? description.length : 0 },
      h1Count: h1Tags.length,
      images: { total: images.length, missingAlt: missingAltCount },
      links: { total: links.length, empty: emptyLinksCount }
    });
  };

  const handleAnalyze = async () => {
    if (!inputValue.trim()) {
      setError("Please enter a URL or HTML content.");
      return;
    }
    
    setError("");
    setResults(null);
    setIsLoading(true);

    try {
      if (inputType === "url") {
        const res = await fetch("/api/fetch-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: inputValue }),
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to fetch URL");
        
        analyzeHtml(data.html);
      } else {
        analyzeHtml(inputValue);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (condition, warningCondition = false) => {
    if (condition) return <CheckCircle2 className="text-emerald-500" size={20} />;
    if (warningCondition) return <AlertCircle className="text-amber-500" size={20} />;
    return <XCircle className="text-rose-500" size={20} />;
  };

  return (
    <>
      <SEO title="SEO Checker | DevSphere" description="Instantly audit any webpage for on-page SEO best practices. Check title lengths, meta descriptions, and alt tags." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full pb-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-slate-800">
              <Activity className="text-indigo-500" size={32} /> SEO Analyzer
            </h1>
            <p className="text-slate-500 text-lg">Instantly audit your web pages for on-page SEO best practices.</p>
          </div>
          
          <div className="flex p-1 bg-white rounded-lg border border-indigo-100 shadow-sm">
            <button
              onClick={() => { setInputType("url"); setResults(null); }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
                inputType === "url" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Globe size={16} /> URL
            </button>
            <button
              onClick={() => { setInputType("html"); setResults(null); }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
                inputType === "html" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Code2 size={16} /> Raw HTML
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="glass-panel p-6 rounded-2xl border border-indigo-100/50 shadow-sm">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            {inputType === "url" ? "Enter Website URL" : "Paste HTML Source Code"}
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {inputType === "url" ? (
              <input 
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            ) : (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="<!DOCTYPE html><html>..."
                rows={5}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-sm resize-none"
              />
            )}
            
            <button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className={`btn-primary whitespace-nowrap px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Search size={18} /> Analyze</>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Score Card */}
            <div className="glass-panel p-8 rounded-2xl border border-indigo-100/50 shadow-sm flex flex-col items-center justify-center relative overflow-hidden bg-white/80">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
              
              <h2 className="text-xl font-bold text-slate-700 mb-6 relative z-10">Overall SEO Score</h2>
              <div className="relative z-10 w-48 h-48 rounded-full flex items-center justify-center shadow-inner border-[12px] bg-white" 
                   style={{ borderColor: results.score >= 80 ? '#10b981' : results.score >= 50 ? '#f59e0b' : '#ef4444' }}>
                <span className="text-6xl font-black text-slate-800 tracking-tighter">{results.score}</span>
              </div>
              <p className="mt-6 text-slate-500 font-medium relative z-10 text-center max-w-md">
                {results.score >= 80 ? "Great job! This page is well optimized for search engines." : 
                 results.score >= 50 ? "There is room for improvement. Fix the warnings below." : 
                 "Critical SEO issues found. Please address the errors immediately."}
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title Tag */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-lg">Title Tag</h3>
                  {getStatusIcon(results.title.length >= 30 && results.title.length <= 65, results.title.length > 0)}
                </div>
                <div className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium break-words">
                  {results.title.value || <span className="text-rose-500 italic">Missing Title</span>}
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Length: {results.title.length} chars</span>
                  <span className={results.title.length >= 30 && results.title.length <= 65 ? 'text-emerald-500' : 'text-amber-500'}>
                    Optimal: 50 - 60
                  </span>
                </div>
              </div>

              {/* Meta Description */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-lg">Meta Description</h3>
                  {getStatusIcon(results.description.length >= 120 && results.description.length <= 165, results.description.length > 0)}
                </div>
                <div className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium line-clamp-3">
                  {results.description.value || <span className="text-rose-500 italic">Missing Meta Description</span>}
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Length: {results.description.length} chars</span>
                  <span className={results.description.length >= 120 && results.description.length <= 165 ? 'text-emerald-500' : 'text-amber-500'}>
                    Optimal: 150 - 160
                  </span>
                </div>
              </div>

              {/* H1 Tag */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">H1 Headings</h3>
                  {getStatusIcon(results.h1Count === 1, results.h1Count > 1)}
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-3xl font-black ${results.h1Count === 1 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {results.h1Count}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {results.h1Count === 1 
                      ? "Perfect! You have exactly one H1 tag." 
                      : results.h1Count === 0 
                        ? "Missing H1 tag. A page should have one main heading." 
                        : "Multiple H1 tags found. Stick to one per page."}
                  </div>
                </div>
              </div>

              {/* Images & Links */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col gap-6">
                
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800 text-md">Image Alt Attributes</h3>
                    {getStatusIcon(results.images.missingAlt === 0, results.images.total > 0 && results.images.missingAlt > 0)}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Found {results.images.total} images. {results.images.missingAlt > 0 ? (
                      <span className="text-rose-500">{results.images.missingAlt} missing alt text.</span>
                    ) : (
                      <span className="text-emerald-500">All have alt text.</span>
                    )}
                  </div>
                </div>
                
                <div className="w-full h-px bg-slate-100" />

                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800 text-md">Link Destinations</h3>
                    {getStatusIcon(results.links.empty === 0, results.links.total > 0 && results.links.empty > 0)}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Found {results.links.total} links. {results.links.empty > 0 ? (
                      <span className="text-rose-500">{results.links.empty} have empty/invalid hrefs.</span>
                    ) : (
                      <span className="text-emerald-500">All have valid hrefs.</span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
