import SEO from "../components/SEO";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, UploadCloud, Download, RefreshCw } from "lucide-react";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setOriginalFile(file);
    setCompressedFile(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file);
      setCompressedFile(null);
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;
    setIsCompressing(true);
    
    try {
      const options = {
        maxSizeMB: quality, // Simplification for UI slider 0.1 to 2 MB limit target
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed_${originalFile.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <SEO title="Image Compressor | DevSphere" description="Compress JPG, PNG, and WebP images instantly in your browser. Save bandwidth without losing quality." />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1 flex items-center gap-2">
              <ImageIcon className="text-zinc-600" size={24} /> Image Compressor
            </h1>
            <p className="text-zinc-500 text-sm">Optimize JPG, PNG, and WebP images locally in your browser.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="glass-panel p-6 rounded-xl flex flex-col gap-6 lg:col-span-1">
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-200 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors text-center"
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*"
                onChange={handleFileUpload}
              />
              <UploadCloud size={40} className="text-zinc-500 mb-3" />
              <p className="text-sm font-medium text-zinc-900">Click or drag image here</p>
              <p className="text-xs text-zinc-500 mt-1">Supports JPG, PNG, WebP</p>
            </div>

            {originalFile && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-600 mb-2 flex justify-between">
                    <span>Target Max Size (MB)</span>
                    <span className="text-zinc-900">{quality} MB</span>
                  </label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>
                
                <button 
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-2.5 rounded-md font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {isCompressing ? <RefreshCw className="animate-spin" size={18} /> : "Compress Image"}
                </button>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-xl flex flex-col overflow-hidden h-[400px]">
              <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-800">Original</span>
                {originalFile && <span className="text-xs text-zinc-500">{formatSize(originalFile.size)}</span>}
              </div>
              <div className="flex-1 p-4 flex items-center justify-center relative bg-zinc-100">
                {originalFile ? (
                  <img 
                    src={URL.createObjectURL(originalFile)} 
                    alt="Original" 
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                ) : (
                  <span className="text-zinc-600 text-sm">No image selected</span>
                )}
              </div>
            </div>

            <div className="glass-panel rounded-xl flex flex-col overflow-hidden h-[400px]">
              <div className="bg-white px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-800">Compressed</span>
                <div className="flex items-center gap-3">
                  {compressedFile && (
                    <span className="text-xs text-green-400 font-medium">
                      -{Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
                    </span>
                  )}
                  {compressedFile && <span className="text-xs text-zinc-500">{formatSize(compressedFile.size)}</span>}
                  {compressedFile && (
                    <>
                      <div className="w-px h-4 bg-zinc-100 mx-1" />
                      <button 
                        onClick={downloadImage}
                        className="text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
                        title="Download Image"
                      >
                        <Download size={14} /> Download
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center relative bg-zinc-100">
                {compressedFile ? (
                  <img 
                    src={URL.createObjectURL(compressedFile)} 
                    alt="Compressed" 
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                ) : (
                  <span className="text-zinc-600 text-sm">Waiting for compression...</span>
                )}
              </div>
              {compressedFile && (
                <div className="p-3 border-t border-zinc-200 bg-white">
                  <button 
                    onClick={downloadImage}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-zinc-200 text-zinc-900 py-2 rounded-md font-medium hover:bg-zinc-100 transition-colors text-sm"
                  >
                    <Download size={16} /> Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
