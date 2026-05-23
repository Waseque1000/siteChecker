import SEO from "../components/SEO";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, Link2, Wifi, Type } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerator() {
  const [text, setText] = useState("https://devsphere.io");
  const [fgColor, setFgColor] = useState("#fafafa");
  const [bgColor, setBgColor] = useState("#0a0a0a");
  const [mode, setMode] = useState("url"); // url, text, wifi
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "devsphere-qr.png";
    a.click();
  };

  return (
    <>
      <SEO title="QR Generator | DevSphere" description="Generate scannable, high-resolution QR codes for URLs and text. Customize colors and download instantly." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
            <QrCode className="text-zinc-600" size={24} /> QR Code Generator
          </h1>
          <p className="text-zinc-500 text-sm">Generate customizable QR codes for links, text, or WiFi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 p-1 bg-white rounded-lg border border-zinc-200 w-fit">
              <button 
                onClick={() => setMode("url")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "url" ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                <Link2 size={16} /> URL
              </button>
              <button 
                onClick={() => setMode("text")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "text" ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                <Type size={16} /> Text
              </button>
            </div>

            <div className="glass-panel p-5 rounded-xl flex flex-col gap-5">
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Content</label>
                <input 
                  type="text" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={mode === "url" ? "https://example.com" : "Enter text here"}
                  className="w-full bg-white border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Foreground Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <span className="text-sm font-mono text-zinc-800">{fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <span className="text-sm font-mono text-zinc-800">{bgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-xl flex flex-col items-center justify-center p-10 min-h-[350px]">
              <div 
                ref={qrRef}
                className="p-4 rounded-xl shadow-2xl transition-all duration-300 bg-white"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeCanvas 
                  value={text || "https://devsphere.io"} 
                  size={200}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            <button 
              onClick={downloadQR}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 rounded-md font-medium hover:bg-zinc-800 transition-colors"
            >
              <Download size={18} /> Download PNG
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
