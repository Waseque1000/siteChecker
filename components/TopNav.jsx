import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { LayoutDashboard, Code, Image as ImageIcon, Palette, QrCode, Tags, SearchCode, BookOpen, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Docs", href: "/docs", icon: BookOpen },
  { name: "JSON", href: "/json-formatter", icon: Code },
  { name: "Images", href: "/image-compressor", icon: ImageIcon },
  { name: "CSS", href: "/css-generator", icon: Palette },
  { name: "QR", href: "/qr-generator", icon: QrCode },
  { name: "Meta", href: "/meta-preview", icon: Tags },
  { name: "Regex", href: "/regex-tester", icon: SearchCode },
];

export default function TopNav() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-pink-500/40 transition-shadow">
            <span className="font-bold text-white text-lg tracking-tight">D</span>
          </div>
          <h1 className="font-bold text-xl tracking-tight text-slate-800">
            DevSphere
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="relative block px-3 py-2 rounded-lg">
                {isActive && (
                  <motion.div
                    layoutId="topnav-pill"
                    className="absolute inset-0 bg-indigo-50 rounded-lg border border-indigo-100/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}>
                  <Icon size={16} className={isActive ? "text-indigo-500" : "text-slate-400"} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-white shadow-sm"></div>
        </div>
        
      </div>
    </header>
  );
}
