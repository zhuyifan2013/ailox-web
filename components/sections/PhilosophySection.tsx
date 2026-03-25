"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PHILOSOPHY, STATS } from "@/lib/apps-data"
import { GlassCard } from "@/components/ui/GlassCard"

function CountUp({ value }: { value: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-4xl font-black text-white"
    >
      {value}
    </motion.span>
  )
}

export function PhilosophySection() {
  return (
    <section className="py-32 px-6 bg-[#0d0d1a]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-indigo-400 text-sm font-mono uppercase tracking-widest">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Built Different.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #6366f1, #06b6d4)",
              }}
            >
              Connected by Design.
            </span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center glass rounded-2xl py-6 px-4"
            >
              <CountUp value={stat.value} />
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PHILOSOPHY.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.15}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
