import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowRight, Code, Image as ImageIcon, Palette, QrCode, Sparkles, Activity, History, HardDrive, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", calls: 400 },
  { name: "Tue", calls: 300 },
  { name: "Wed", calls: 550 },
  { name: "Thu", calls: 450 },
  { name: "Fri", calls: 700 },
  { name: "Sat", calls: 200 },
  { name: "Sun", calls: 100 },
];

const quickTools = [
  { name: "SEO Checker", href: "/seo-checker", icon: Activity, desc: "Audit on-page SEO", color: "from-blue-500 to-cyan-400" },
  { name: "JSON Formatter", href: "/json-formatter", icon: Code, desc: "Format & validate", color: "from-indigo-500 to-purple-500" },
  { name: "Image Compressor", href: "/image-compressor", icon: ImageIcon, desc: "Optimize images", color: "from-purple-500 to-pink-500" },
  { name: "CSS Generator", href: "/css-generator", icon: Palette, desc: "Glassmorphism UI", color: "from-orange-400 to-rose-400" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | DevSphere</title>
      </Head>

      <div className="flex flex-col gap-10 pb-10">
        {/* Colorful Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 border border-indigo-100 shadow-xl shadow-indigo-200/50 colorful-bg"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-gradient-to-tr from-indigo-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={16} /> Welcome to the new DevSphere
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Build, debug, and ship <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">faster.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl mb-8 leading-relaxed font-medium">
              Everything you need, in one highly colorful, commanding workspace.
            </p>
            <div className="flex gap-4">
              <Link href="/json-formatter" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold">
                Start formatting
                <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors border border-indigo-100 shadow-sm hover:shadow-md">
                Documentation
              </Link>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Access Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Quick Access</h2>
              <button className="text-sm font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {quickTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link href={tool.href} key={tool.name}>
                    <div className="glass-panel p-6 rounded-2xl cursor-pointer group h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative overflow-hidden bg-white/80">
                      
                      <div className="flex items-start justify-between mb-6 relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{tool.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{tool.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Analytics Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
               API Usage
            </h2>
            <div className="glass-panel rounded-2xl p-6 h-full flex flex-col bg-white/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
                <Activity size={100} />
              </div>
              <div className="mb-6 relative z-10">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total requests</p>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">2,750</div>
              </div>
              <div className="flex-1 min-h-[180px] w-full relative z-10 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#0f172a', fontWeight: 'bold' }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Area type="monotone" dataKey="calls" stroke="#6366f1" fillOpacity={1} fill="url(#colorCalls)" strokeWidth={3} activeDot={{ r: 6, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* New Sections: Activity & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          
          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
               <History className="text-indigo-500" size={20} /> Recent Activity
            </h2>
            <div className="glass-panel rounded-2xl p-6 h-full flex flex-col bg-white/80">
              <div className="space-y-6">
                {[
                  { title: "Analyzed SEO for https://example.com", time: "2 minutes ago", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
                  { title: "Compressed 'hero-banner.png' (Saved 45%)", time: "1 hour ago", icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-50" },
                  { title: "Formatted 12kb JSON payload", time: "3 hours ago", icon: Code, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { title: "Generated Glassmorphism CSS", time: "Yesterday", icon: Palette, color: "text-orange-500", bg: "bg-orange-50" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}>
                        <Icon size={18} className={item.color} />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* System Health / Storage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
               <HardDrive className="text-indigo-500" size={20} /> System Health
            </h2>
            <div className="glass-panel rounded-2xl p-6 h-full flex flex-col bg-white/80">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50 text-white">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">All Systems Operational</h3>
                  <p className="text-sm text-emerald-600 font-semibold">Running 100% Locally</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Local Storage Used</span>
                    <span className="text-sm font-bold text-slate-500">12 MB / 50 MB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Web Worker Memory</span>
                    <span className="text-sm font-bold text-slate-500">Normal</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex gap-3">
                  <Sparkles className="text-indigo-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-medium text-indigo-800">
                    <strong>Pro tip:</strong> DevSphere relies heavily on IndexedDB to store your history locally, keeping your sensitive data entirely off our servers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
