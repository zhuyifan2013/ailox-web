"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

// Load Three.js canvas client-side only
const StarField = dynamic(
  () => import("@/components/three/StarField").then((m) => m.StarField),
  { ssr: false }
)

const BRAND = "Ailox"
const SUBTITLE = "AI-powered apps for a better life"

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center aurora-bg overflow-hidden">
      {/* Star field background */}
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>

      {/* Aurora glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-indigo-300 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          AI Ecosystem — Now in Beta
        </motion.div>

        {/* Brand name — staggered letter animation */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-7xl md:text-9xl font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #f8fafc 30%, #6366f1 60%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {BRAND.split("").map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 text-xl md:text-2xl text-slate-400 font-light tracking-wide"
        >
          {SUBTITLE}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            Explore Apps
          </button>
          <button className="px-8 py-3 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
