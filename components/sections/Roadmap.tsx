"use client"

import { motion } from "framer-motion"
import { ROADMAP } from "@/lib/apps-data"
import { TimelineItem } from "@/components/ui/TimelineNode"

export function Roadmap() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Where We're Going
          </h2>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            Shipping fast, building in public. Here's what's done and what's coming.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-indigo-500/50 to-slate-700/30" />

          <div className="space-y-10">
            {ROADMAP.map((milestone, i) => (
              <TimelineItem
                key={milestone.quarter}
                quarter={milestone.quarter}
                title={milestone.title}
                items={milestone.items}
                status={milestone.status}
                align={i % 2 === 0 ? "left" : "right"}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
