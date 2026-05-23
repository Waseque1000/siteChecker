import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  Code,
  Palette,
  QrCode,
  Tags,
  SearchCode,
  BookOpen,
  Activity
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Docs", href: "/docs", icon: BookOpen },
  { name: "SEO Checker", href: "/seo-checker", icon: Activity },
  { name: "JSON Formatter", href: "/json-formatter", icon: Code },
  { name: "Image Compressor", href: "/image-compressor", icon: ImageIcon },
  { name: "CSS Generator", href: "/css-generator", icon: Palette },
  { name: "QR Generator", href: "/qr-generator", icon: QrCode },
  { name: "Meta Tags", href: "/meta-preview", icon: Tags },
  { name: "Regex Tester", href: "/regex-tester", icon: SearchCode },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 h-full border-r border-indigo-100/50 bg-white/70 backdrop-blur-xl flex flex-col hidden md:flex z-50 shadow-[4px_0_24px_rgba(99,102,241,0.05)]">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <span className="font-bold text-white text-sm">D</span>
        </div>
        <h1 className="font-bold text-xl tracking-tight text-slate-800">
          DevSphere
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-indigo-50 rounded-lg border border-indigo-100/50 shadow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                  isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-indigo-500" : "text-slate-400"} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-100/50 bg-indigo-50/30">
        <Link href="/settings" className="relative block">
          {router.pathname === "/settings" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-indigo-50 rounded-lg border border-indigo-100/50 shadow-sm"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <div
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
              router.pathname === "/settings"
                ? "text-indigo-600"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Settings size={18} className={router.pathname === "/settings" ? "text-indigo-500" : "text-slate-400"} />
            Settings
          </div>
        </Link>
      </div>
    </aside>
  );
}
