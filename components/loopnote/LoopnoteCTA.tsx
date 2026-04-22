"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const PURPLE = "#8B7FD4"

export function LoopnoteCTA() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#07070f" }}
    >
      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ background: PURPLE }}
      />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6"
            style={{ background: `${PURPLE}22`, border: `1px solid ${PURPLE}44` }}
          >
            💬
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Start capturing,
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${PURPLE}, #c4b5fd)` }}
            >
              stop forgetting.
            </span>
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Free to start. No credit card required.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200"
              style={{
                background: PURPLE,
                boxShadow: `0 0 32px ${PURPLE}44`,
              }}
            >
              <span>🍎</span> Download for iOS
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white glass hover:bg-white/10 transition-all duration-200"
            >
              <span>🤖</span> Download for Android
            </a>
          </div>

          <div className="mt-5">
            <Link
              href="/dashboard/loopnote"
              className="text-sm transition-colors"
              style={{ color: `${PURPLE}88` }}
            >
              Or use the web app →
            </Link>
          </div>
        </motion.div>

        {/* Sub-stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-3 gap-4"
        >
          {[
            { value: "6 AM", label: "Daily digest" },
            { value: "BYOK", label: "API key support" },
            { value: "100%", label: "Data export" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl py-4 px-3">
              <p className="text-xl font-bold text-white" style={{ color: PURPLE }}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
