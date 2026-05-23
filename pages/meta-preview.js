import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tags, Globe } from "lucide-react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function MetaPreview() {
  const [title, setTitle] = useState("DevSphere - Premium Developer Hub");
  const [description, setDescription] = useState("The ultimate collection of developer tools including JSON formatter, Image compressor, CSS generators, and more built with Next.js and Tailwind CSS.");
  const [url, setUrl] = useState("https://devsphere.io");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");

  const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };

  return (
    <>
      <Head>
        <title>Meta Tag Preview | DevSphere</title>
      </Head>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-6xl mx-auto w-full"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
            <Tags className="text-zinc-600" size={24} /> Meta Tags Preview
          </h1>
          <p className="text-zinc-500 text-sm">Preview how your website will appear on Google, Twitter, and Facebook.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          {/* Controls - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-2">Page Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-zinc-900 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors text-sm"
                  maxLength={70}
                />
                <div className="flex justify-between mt-1 px-1 text-xs text-zinc-500">
                  <span>Recommended: ~60 chars</span>
                  <span className={title.length > 60 ? "text-red-400" : ""}>{title.length}/70</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-zinc-900 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors text-sm resize-none"
                  maxLength={160}
                />
                <div className="flex justify-between mt-1 px-1 text-xs text-zinc-500">
                  <span>Recommended: ~155 chars</span>
                  <span className={description.length > 155 ? "text-red-400" : ""}>{description.length}/160</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-2">URL</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-zinc-900 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-2">Image URL (OG Image)</label>
                <input 
                  type="text" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-zinc-900 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          {/* Previews - 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Google Preview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-zinc-600 font-medium text-sm">
                <Globe size={16} /> Google Search Preview
              </div>
              <div className="glass-panel p-5 rounded-xl bg-white text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">D</div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#202124] leading-tight">DevSphere</span>
                    <span className="text-[12px] text-[#4d5156] leading-tight">{url}</span>
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
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-zinc-600 font-medium text-sm">
                <FaTwitter size={16} /> Twitter Card Preview
              </div>
              <div className="w-full max-w-[500px] border border-zinc-200 rounded-xl overflow-hidden bg-white text-left font-sans">
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
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-zinc-600 font-medium text-sm">
                <FaFacebook size={16} /> Facebook / LinkedIn Preview
              </div>
              <div className="w-full max-w-[500px] border border-zinc-200 bg-[#f0f2f5] text-[#1c1e21] rounded-lg overflow-hidden text-left font-sans">
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
