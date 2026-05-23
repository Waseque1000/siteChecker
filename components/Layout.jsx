import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-800 relative overflow-hidden">
      {/* Decorative colorful background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.99 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
