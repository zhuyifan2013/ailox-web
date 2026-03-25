"use client"

import { motion } from "framer-motion"

interface TimelineNodeProps {
  status: "done" | "active" | "upcoming"
}

export function TimelineNode({ status }: TimelineNodeProps) {
  const colorMap = {
    done: "bg-green-400",
    active: "bg-indigo-400",
    upcoming: "bg-slate-600",
  }

  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      <div className={`w-4 h-4 rounded-full z-10 ${colorMap[status]}`} />
      {status === "active" && (
        <div className="absolute w-4 h-4 rounded-full bg-indigo-400 animate-ping opacity-75" />
      )}
    </div>
  )
}

interface TimelineItemProps {
  quarter: string
  title: string
  items: string[]
  status: "done" | "active" | "upcoming"
  align: "left" | "right"
  index: number
}

export function TimelineItem({ quarter, title, items, status, align, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-6 ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      {/* Content */}
      <div className={`flex-1 ${align === "right" ? "text-right" : "text-left"}`}>
        <div className="glass rounded-xl p-4 inline-block">
          <span className="text-xs text-indigo-400 font-mono">{quarter}</span>
          <h4 className="text-white font-semibold mt-1">{title}</h4>
          <ul className={`mt-2 space-y-1 ${align === "right" ? "items-end" : "items-start"} flex flex-col`}>
            {items.map((item) => (
              <li key={item} className="text-sm text-slate-400">
                {status === "done" ? "✓ " : status === "active" ? "→ " : "○ "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Node */}
      <div className="flex-shrink-0 z-10">
        <TimelineNode status={status} />
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </motion.div>
  )
}
