import Head from "next/head";
import { motion } from "framer-motion";
import { BookOpen, Code, Image as ImageIcon, Palette, QrCode, Tags, SearchCode, Activity } from "lucide-react";

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    content: "DevSphere is an all-in-one, privacy-first developer utility hub. All tools run completely locally in your browser, meaning your sensitive JSON data, images, and strings are never sent to a server. Navigate through the sidebar to access individual tools.",
    image: null
  },
  {
    id: "seo-checker",
    title: "SEO Checker",
    icon: Activity,
    content: "Instantly audit any webpage for on-page SEO best practices. Enter a live URL to have DevSphere automatically fetch it, or paste raw HTML directly if you're working locally. The tool generates an overall SEO score (0-100) and provides actionable checklists covering Title lengths, Meta Descriptions, H1 Headings, missing Image Alt Attributes, and broken links.",
    image: "/images/seo_checker_ui_1779549426906.png"
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    icon: Code,
    content: "Paste any raw JSON string into the input panel on the left. Click 'Beautify' to properly indent and format the structure, or 'Minify' to strip all whitespace for minimal payload size. If there is a syntax error in your JSON, a red banner will pinpoint the exact line and character issue. You can instantly copy or download the formatted result.",
    image: "/images/json_formatter_ui_1779516649000.png"
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    icon: ImageIcon,
    content: "Drag and drop any JPG, PNG, or WebP image into the upload zone. Use the slider to define your target max file size (in MB) and hit 'Compress Image'. The compression runs locally in a Web Worker, ensuring high performance without locking up the UI. You can instantly see the size reduction percentage and download the optimized asset using the prominent download button in the header.",
    image: "/images/image_compressor_ui_1779516666023.png"
  },
  {
    id: "css-generator",
    title: "CSS Glass Generator",
    icon: Palette,
    content: "Adjust the blur, background opacity, and border opacity sliders to achieve the perfect glassmorphism effect over a colorful backdrop. Use the format toggle to instantly switch the output between raw CSS, Tailwind utility classes, or a Next.js/React JSX style object. Click the copy icon to instantly grab the code.",
    image: "/images/css_generator_ui_1779516686538.png"
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    icon: QrCode,
    content: "Generate high-resolution QR codes for URLs, contact cards, or raw text. Customize the foreground and background colors to perfectly match your brand's aesthetic. The real-time preview shows exactly what you'll get. Click 'Download PNG' to save the generated code to your device for immediate use in marketing materials or presentations.",
    image: "/images/qr_generator_ui_1779516864523.png"
  },
  {
    id: "meta-preview",
    title: "Meta Tags Preview",
    icon: Tags,
    content: "Visualize exactly how your webpage will appear when shared on social media and search engines. Enter your page title, description, and Open Graph Image URL. DevSphere renders pixel-perfect, live previews of Google Search results, Twitter Cards, and Facebook / LinkedIn link embeds to help you optimize your SEO and click-through rates.",
    image: "/images/meta_preview_ui_1779516879232.png"
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    icon: SearchCode,
    content: "Write, debug, and test regular expressions in real-time. Enter your regex pattern and flags at the top, and your test string below. The test string pane automatically highlights matches in vibrant green. A dedicated matches sidebar provides a quick list of all captured strings and their exact index positions, making debugging complex patterns a breeze.",
    image: "/images/regex_tester_ui_1779516900614.png"
  }
];

export default function Documentation() {
  return (
    <>
      <Head>
        <title>Documentation | DevSphere</title>
      </Head>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full gap-8 max-w-4xl mx-auto w-full pb-10"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2 flex items-center gap-3">
            <BookOpen className="text-zinc-600" size={28} /> Documentation
          </h1>
          <p className="text-zinc-500 text-lg">Learn how to make the most of your DevSphere workspace.</p>
        </div>

        <div className="flex flex-col gap-6">
          {docSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel p-6 rounded-2xl border border-indigo-100/50 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-200/50">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{section.title}</h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  {section.content}
                </p>
                
                {section.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-indigo-100 shadow-md">
                    <img src={section.image} alt={`${section.title} UI Preview`} className="w-full h-auto object-cover" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
