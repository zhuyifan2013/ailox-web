"use client"

import { motion } from "framer-motion"
import { APPS } from "@/lib/apps-data"
import { AppCard } from "@/components/ui/AppCard"

export function AppShowcase() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-mono uppercase tracking-widest">
            The Apps
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Everything You Need,
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #f0abfc, #6366f1)" }}
            >
              Powered by AI
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            8 apps. 1 backend. Unlimited intelligence.
          </p>
        </motion.div>

        {/* App grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPS.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
