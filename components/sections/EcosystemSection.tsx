"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const EcosystemGraph = dynamic(
  () => import("@/components/three/EcosystemGraph").then((m) => m.EcosystemGraph),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] flex items-center justify-center text-slate-600">
        Loading ecosystem...
      </div>
    ),
  }
)

export function EcosystemSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: "#08080f" }}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            App Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            One Universe,
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #06b6d4, #6366f1)" }}
            >
              Infinite Connections
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Every app in the Ailox ecosystem shares a unified AI backend. Your data flows
            between apps, compounding intelligence over time.
          </p>
        </motion.div>

        {/* 3D Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-[520px] relative"
        >
          <EcosystemGraph />
          <p className="text-center text-slate-600 text-xs mt-2">
            Hover app nodes to explore
          </p>
        </motion.div>
      </div>
    </section>
  )
}
