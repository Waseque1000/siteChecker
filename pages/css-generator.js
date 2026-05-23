import SEO from "../components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Copy, LayoutTemplate, UserCircle, LogIn, UserPlus, Type, Layout } from "lucide-react";

export default function CssGenerator() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.1);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [format, setFormat] = useState("jsx"); // tailwind or jsx
  const [selectedComp, setSelectedComp] = useState("card");
  const [copied, setCopied] = useState(false);

  // Dynamic values
  const bg = `rgba(255, 255, 255, ${opacity.toFixed(2)})`;
  const border = `rgba(255, 255, 255, ${borderOpacity.toFixed(2)})`;

  // Helper strings for code generation
  const twClass = `bg-[${bg.replace(/\s+/g, '')}] border border-[${border.replace(/\s+/g, '')}] backdrop-blur-[${blur}px]`;
  const jsxStyle = `style={{ background: "${bg}", border: "1px solid ${border}", backdropFilter: "blur(${blur}px)", WebkitBackdropFilter: "blur(${blur}px)" }}`;
  const rawStyle = { background: bg, border: `1px solid ${border}`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` };

  const components = {
    card: {
      name: "Profile Card",
      icon: UserCircle,
      render: () => (
        <div className="w-64 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4 transition-all" style={rawStyle}>
          <div className="w-24 h-24 rounded-full bg-white/20 border border-white/30 shadow-inner" />
          <div className="flex flex-col items-center w-full">
            <div className="h-5 w-32 bg-white/40 rounded-full mb-3" />
            <div className="h-3 w-24 bg-white/20 rounded-full" />
          </div>
          <button className="w-full py-2.5 mt-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">Follow</button>
        </div>
      ),
      code: {
        tailwind: `<div className="${twClass} w-64 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4">
  <div className="w-24 h-24 rounded-full bg-white/20 border border-white/30 shadow-inner"></div>
  <div className="flex flex-col items-center w-full">
    <div className="h-5 w-32 bg-white/40 rounded-full mb-3"></div>
    <div className="h-3 w-24 bg-white/20 rounded-full"></div>
  </div>
  <button className="w-full py-2.5 mt-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
    Follow
  </button>
</div>`,
        jsx: `<div \n  className="w-64 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4"\n  ${jsxStyle}\n>
  <div className="w-24 h-24 rounded-full bg-white/20 border border-white/30 shadow-inner" />
  <div className="flex flex-col items-center w-full">
    <div className="h-5 w-32 bg-white/40 rounded-full mb-3" />
    <div className="h-3 w-24 bg-white/20 rounded-full" />
  </div>
  <button className="w-full py-2.5 mt-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
    Follow
  </button>
</div>`
      }
    },
    login: {
      name: "Login Form",
      icon: LogIn,
      render: () => (
        <div className="w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-5 transition-all" style={rawStyle}>
          <div className="text-center mb-2">
            <h3 className="text-white font-bold text-xl mb-1">Welcome Back</h3>
            <p className="text-white/60 text-sm">Sign in to your account</p>
          </div>
          <input disabled placeholder="Email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none" />
          <input disabled placeholder="Password" type="password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none" />
          <button className="w-full py-3 mt-2 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-bold transition-colors shadow-lg">Sign In</button>
        </div>
      ),
      code: {
        tailwind: `<div className="${twClass} w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-5">
  <div className="text-center mb-2">
    <h3 className="text-white font-bold text-xl mb-1">Welcome Back</h3>
    <p className="text-white/60 text-sm">Sign in to your account</p>
  </div>
  <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="password" placeholder="Password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <button className="w-full py-3 mt-2 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-bold transition-colors shadow-lg">
    Sign In
  </button>
</div>`,
        jsx: `<div \n  className="w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-5"\n  ${jsxStyle}\n>
  <div className="text-center mb-2">
    <h3 className="text-white font-bold text-xl mb-1">Welcome Back</h3>
    <p className="text-white/60 text-sm">Sign in to your account</p>
  </div>
  <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="password" placeholder="Password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <button className="w-full py-3 mt-2 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-bold transition-colors shadow-lg">
    Sign In
  </button>
</div>`
      }
    },
    register: {
      name: "Register",
      icon: UserPlus,
      render: () => (
        <div className="w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-4 transition-all" style={rawStyle}>
          <div className="text-center mb-2">
            <h3 className="text-white font-bold text-xl">Create Account</h3>
          </div>
          <input disabled placeholder="Full Name" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none" />
          <input disabled placeholder="Email Address" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none" />
          <input disabled placeholder="Password" type="password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none" />
          <button className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-sm font-bold transition-colors shadow-lg">Sign Up</button>
        </div>
      ),
      code: {
        tailwind: `<div className="${twClass} w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-4">
  <div className="text-center mb-2">
    <h3 className="text-white font-bold text-xl">Create Account</h3>
  </div>
  <input type="text" placeholder="Full Name" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="password" placeholder="Password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <button className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90 text-white text-sm font-bold transition-all shadow-lg">
    Sign Up
  </button>
</div>`,
        jsx: `<div \n  className="w-80 rounded-3xl p-8 shadow-2xl flex flex-col gap-4"\n  ${jsxStyle}\n>
  <div className="text-center mb-2">
    <h3 className="text-white font-bold text-xl">Create Account</h3>
  </div>
  <input type="text" placeholder="Full Name" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <input type="password" placeholder="Password" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 transition-colors" />
  <button className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90 text-white text-sm font-bold transition-all shadow-lg">
    Sign Up
  </button>
</div>`
      }
    },
    header: {
      name: "Nav Header",
      icon: Layout,
      render: () => (
        <div className="w-full max-w-2xl rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between transition-all" style={rawStyle}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white" />
            <span className="text-white font-bold text-lg">Brand</span>
          </div>
          <div className="hidden md:flex gap-6 text-white/80 text-sm font-medium">
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
          <button className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">Login</button>
        </div>
      ),
      code: {
        tailwind: `<nav className="${twClass} w-full max-w-5xl mx-auto rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between sticky top-4 z-50">
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-white shadow-sm"></div>
    <span className="text-white font-bold text-xl tracking-tight">Brand</span>
  </div>
  <div className="hidden md:flex gap-8 text-white/80 text-sm font-medium">
    <a href="#" className="hover:text-white transition-colors">Features</a>
    <a href="#" className="hover:text-white transition-colors">Pricing</a>
    <a href="#" className="hover:text-white transition-colors">About</a>
  </div>
  <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
    Get Started
  </button>
</nav>`,
        jsx: `<nav \n  className="w-full max-w-5xl mx-auto rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between sticky top-4 z-50"\n  ${jsxStyle}\n>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-white shadow-sm" />
    <span className="text-white font-bold text-xl tracking-tight">Brand</span>
  </div>
  <div className="hidden md:flex gap-8 text-white/80 text-sm font-medium">
    <a href="#" className="hover:text-white transition-colors">Features</a>
    <a href="#" className="hover:text-white transition-colors">Pricing</a>
    <a href="#" className="hover:text-white transition-colors">About</a>
  </div>
  <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
    Get Started
  </button>
</nav>`
      }
    },
    hero: {
      name: "Hero Section",
      icon: Type,
      render: () => (
        <div className="w-full max-w-2xl rounded-[2rem] p-10 md:p-14 shadow-2xl flex flex-col items-center text-center transition-all" style={rawStyle}>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">Design at the <br/>Speed of Light</h1>
          <p className="text-white/80 text-lg mb-8 max-w-md">Build beautiful, frosted glass interfaces in seconds using our powerful new component library.</p>
          <div className="flex gap-4">
            <button className="px-8 py-3.5 rounded-xl bg-white text-indigo-600 font-bold shadow-lg">Start Building</button>
            <button className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-colors">Documentation</button>
          </div>
        </div>
      ),
      code: {
        tailwind: `<header className="${twClass} w-full max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 shadow-2xl flex flex-col items-center text-center">
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8">
    <span className="flex h-2 w-2 rounded-full bg-green-400"></span> Live Release v2.0
  </div>
  <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
    Design at the <br/>Speed of Light
  </h1>
  <p className="text-white/80 text-xl mb-10 max-w-2xl">
    Build beautiful, responsive frosted glass interfaces in seconds using our powerful new UI component library.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    <button className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-indigo-600 font-bold shadow-xl transition-all">
      Start Building for Free
    </button>
    <button className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all shadow-lg">
      Read Documentation
    </button>
  </div>
</header>`,
        jsx: `<header \n  className="w-full max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 shadow-2xl flex flex-col items-center text-center"\n  ${jsxStyle}\n>
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8">
    <span className="flex h-2 w-2 rounded-full bg-green-400" /> Live Release v2.0
  </div>
  <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
    Design at the <br/>Speed of Light
  </h1>
  <p className="text-white/80 text-xl mb-10 max-w-2xl">
    Build beautiful, responsive frosted glass interfaces in seconds using our powerful new UI component library.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    <button className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-indigo-600 font-bold shadow-xl transition-all">
      Start Building for Free
    </button>
    <button className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all shadow-lg">
      Read Documentation
    </button>
  </div>
</header>`
      }
    }
  };

  const copyToClipboard = () => {
    const codeObj = components[selectedComp].code;
    navigator.clipboard.writeText(format === 'jsx' ? codeObj.jsx : codeObj.tailwind);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO title="UI Glass Library | DevSphere" description="Generate complete modern UI components with CSS glassmorphism. Export instantly to Tailwind HTML or React JSX." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-8 max-w-6xl mx-auto w-full pb-10 relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-blob" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-slate-800">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                <LayoutTemplate className="text-white" size={24} />
              </div>
              Glass UI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Library</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">Build beautiful frosted glass components with exportable Tailwind & JSX markup.</p>
          </div>
          
          <div className="flex p-1 bg-white rounded-xl border border-indigo-100 shadow-sm">
            {["tailwind", "jsx"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all uppercase ${
                  format === fmt ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {fmt === 'tailwind' ? 'Tailwind HTML' : 'React JSX'}
              </button>
            ))}
          </div>
        </div>

        {/* Component Selector Menu */}
        <div className="flex flex-wrap gap-3 relative z-10">
          {Object.entries(components).map(([key, comp]) => {
            const Icon = comp.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedComp(key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border shadow-sm ${
                  selectedComp === key 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                <Icon size={16} /> {comp.name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Controls - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-8 border border-indigo-100/50 shadow-sm bg-white/80">
              
              <div className="flex items-center gap-2 mb-2 pb-4 border-b border-slate-100">
                <Palette size={20} className="text-indigo-500" />
                <h2 className="font-bold text-slate-800 text-lg">Glass Material Properties</h2>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex justify-between">
                  <span>Backdrop Blur</span>
                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{blur}px</span>
                </label>
                <input 
                  type="range" min="0" max="40" step="1" 
                  value={blur} onChange={(e) => setBlur(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex justify-between">
                  <span>Background Opacity</span>
                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{Math.round(opacity * 100)}%</span>
                </label>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex justify-between">
                  <span>Border Opacity</span>
                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{Math.round(borderOpacity * 100)}%</span>
                </label>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={borderOpacity} onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Live Preview & Code - 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Live Interactive Preview */}
            <div className="h-[450px] rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200 shadow-sm group">
              {/* Vibrant abstract background to showcase the glass */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 z-0" />
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob" />
              <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob animation-delay-2000" />
              <div className="absolute bottom-0 left-40 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-[90px] opacity-50 animate-blob animation-delay-4000" />
              
              {/* Render the dynamically selected component */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                 {components[selectedComp].render()}
              </div>
            </div>

            {/* Code Output */}
            <div className="glass-panel rounded-2xl flex flex-col overflow-hidden relative border border-indigo-100/50 shadow-sm bg-slate-900">
              <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800 bg-slate-950">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{format === 'jsx' ? 'React JSX' : 'Tailwind HTML'}</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-white transition-colors"
                >
                  {copied ? <span className="text-emerald-400 text-xs font-bold px-2">Copied!</span> : <Copy size={16} />}
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-sm text-indigo-300 font-mono leading-relaxed max-h-[400px]">
                <code>{format === 'jsx' ? components[selectedComp].code.jsx : components[selectedComp].code.tailwind}</code>
              </pre>
            </div>

          </div>

        </div>
      </motion.div>
    </>
  );
}
