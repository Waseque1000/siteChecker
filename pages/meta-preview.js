import SEO from "../components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tags, Globe } from "lucide-react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function MetaPreview() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch URL");
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.html, "text/html");
      
      const fetchedTitle = doc.querySelector('meta[property="og:title"]')?.content || doc.querySelector("title")?.textContent || "";
      const fetchedDesc = doc.querySelector('meta[property="og:description"]')?.content || doc.querySelector('meta[name="description"]')?.content || "";
      const fetchedImage = doc.querySelector('meta[property="og:image"]')?.content || doc.querySelector('meta[name="twitter:image"]')?.content || doc.querySelector('link[rel="apple-touch-icon"]')?.href || "";
      const fetchedSiteName = doc.querySelector('meta[property="og:site_name"]')?.content || "";
      
      setTitle(fetchedTitle);
      setDescription(fetchedDesc);
      setImage(fetchedImage);
      setSiteName(fetchedSiteName);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };

  const getDomain = (urlStr) => {
    if (!urlStr) return "Website Name";
    try {
      const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
      let domain = parsed.hostname.replace(/^www\./, '');
      if (domain) domain = domain.charAt(0).toUpperCase() + domain.slice(1).split('.')[0];
      return domain;
    } catch {
      return "Website Name";
    }
  };

  const displaySiteName = siteName || getDomain(url);
  const displayLetter = displaySiteName.charAt(0).toUpperCase();

  return (
    <>
      <SEO title="Meta Tag Preview | DevSphere" description="Preview exactly how your meta tags, SEO titles, and descriptions will look on Google, Twitter, and Facebook." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-6xl mx-auto w-full relative"
      >
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-blob" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-tr from-cyan-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-blob animation-delay-2000" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-200/50">
            <Tags className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 text-slate-800">
              Meta Tags <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Preview</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">Visualize how your links will appear across search engines and social media.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 relative z-10">
          {/* Controls - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-5 border border-indigo-100/50 shadow-sm bg-white/80">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">URL to Fetch</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                    placeholder="https://example.com"
                    className="flex-1 w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm"
                  />
                  <button 
                    onClick={handleFetch}
                    disabled={isLoading}
                    className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-70 flex items-center justify-center min-w-[80px]"
                  >
                    {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Fetch"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Page Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm"
                  maxLength={70}
                />
                <div className="flex justify-between mt-1.5 px-1 text-xs font-bold text-slate-500">
                  <span>Recommended: ~60 chars</span>
                  <span className={title.length > 60 ? "text-rose-500" : "text-emerald-500"}>{title.length}/70</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm resize-none"
                  maxLength={160}
                />
                <div className="flex justify-between mt-1.5 px-1 text-xs font-bold text-slate-500">
                  <span>Recommended: ~155 chars</span>
                  <span className={description.length > 155 ? "text-rose-500" : "text-emerald-500"}>{description.length}/160</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (OG Image)</label>
                <input 
                  type="text" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm"
                />
              </div>
            </div>
          </div>

          {/* Previews - 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Google Preview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm bg-white/60 w-fit px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <Globe size={18} className="text-indigo-500" /> Google Search Preview
              </div>
              <div className="glass-panel p-6 rounded-2xl bg-white text-left shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-slate-700 shadow-inner">{displayLetter}</div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[14px] text-[#202124] leading-tight font-medium">{displaySiteName}</span>
                    <span className="text-[12px] text-[#4d5156] leading-tight">{url || "https://example.com"}</span>
                  </div>
                </div>
                <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-normal truncate">
                  {title || "Please enter a title"}
                </div>
                <div className="text-[14px] text-[#4d5156] leading-[1.58]">
                  {truncate(description || "Please enter a meta description.", 160)}
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm bg-white/60 w-fit px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <FaTwitter size={18} className="text-[#1DA1F2]" /> Twitter Card Preview
              </div>
              <div className="w-full max-w-[500px] border border-slate-200 rounded-2xl overflow-hidden bg-white text-left font-sans shadow-sm hover:shadow-md hover:border-[#1DA1F2]/50 transition-all">
                {image && (
                  <div className="w-full h-[260px] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                    <img src={image} alt="OG" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
                <div className="p-3">
                  <div className="text-[15px] text-zinc-500 mb-0.5 truncate">{url.replace(/^https?:\/\//, '')}</div>
                  <div className="text-[15px] text-zinc-900 mb-0.5 truncate">{title}</div>
                  <div className="text-[15px] text-zinc-500 line-clamp-2">{description}</div>
                </div>
              </div>
            </div>

            {/* Facebook / LinkedIn Preview */}
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm bg-white/60 w-fit px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <FaFacebook size={18} className="text-[#1877F2]" /> Facebook / LinkedIn Preview
              </div>
              <div className="w-full max-w-[500px] border border-slate-200 bg-[#f0f2f5] text-[#1c1e21] rounded-2xl overflow-hidden text-left font-sans shadow-sm hover:shadow-md hover:border-[#1877F2]/50 transition-all">
                {image && (
                  <div className="w-full h-[260px] bg-[#e4e6eb] overflow-hidden border-b border-zinc-200">
                    <img src={image} alt="OG" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
                <div className="px-4 py-2.5 bg-[#f0f2f5]">
                  <div className="text-[12px] text-[#606770] uppercase tracking-wide mb-1">{url.replace(/^https?:\/\//, '').split('/')[0]}</div>
                  <div className="text-[16px] font-bold mb-1 leading-tight line-clamp-1">{title}</div>
                  <div className="text-[14px] text-[#606770] line-clamp-1">{description}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
}
