"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { AppItem } from "@/lib/apps-data"
import { clsx } from "clsx"

interface AppCardProps {
  app: AppItem
  index: number
}

const statusLabel = {
  live: { text: "Live", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
  beta: { text: "Beta", cls: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  "coming-soon": { text: "Soon", cls: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
}

export function AppCard({ app, index }: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.04)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    }
  }

  const { text, cls } = statusLabel[app.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease", willChange: "transform" }}
      className={clsx(
        "relative rounded-3xl overflow-hidden glass p-6 cursor-pointer",
        "min-w-[260px] md:min-w-[300px]"
      )}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: app.gradient }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{ background: `${app.color}22`, border: `1px solid ${app.color}44` }}
      >
        {app.icon}
      </div>

      {/* Status badge */}
      <span className={clsx("text-xs px-2 py-0.5 rounded-full border font-medium", cls)}>
        {text}
      </span>

      <h3 className="text-white font-bold text-lg mt-3">{app.name}</h3>
      <p className="text-slate-400 text-sm mt-1">{app.tagline}</p>
      <p className="text-slate-500 text-xs mt-3 leading-relaxed">{app.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
