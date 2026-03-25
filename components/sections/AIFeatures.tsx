"use client"

import { motion } from "framer-motion"
import { useRef, useMemo } from "react"
import { GlassCard } from "@/components/ui/GlassCard"

const AI_FEATURES = [
  {
    icon: "🧠",
    title: "Unified AI Memory",
    description:
      "All your apps share a single AI context. What you note today informs your goals tomorrow. The more you use, the smarter it gets.",
  },
  {
    icon: "💬",
    title: "Natural Language Interface",
    description:
      "Chat with any app using plain language. Ask 'What did I accomplish last week?' and get intelligent summaries across all apps.",
  },
  {
    icon: "🔮",
    title: "Predictive Insights",
    description:
      "AI analyzes your patterns to surface non-obvious connections — like how your sleep notes correlate with goal completion rates.",
  },
]

// Simple SVG neural network background
function NeuralBackground() {
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i % 5) * 22 + 5 + Math.random() * 5,
      y: Math.floor(i / 5) * 28 + 8 + Math.random() * 5,
    }))
  }, [])

  const connections = useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let i = 0; i < nodes.length - 1; i++) {
      if (Math.random() > 0.5) {
        conns.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[i + 1].x, y2: nodes[i + 1].y })
      }
      if (i + 5 < nodes.length && Math.random() > 0.4) {
        conns.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[i + 5].x, y2: nodes[i + 5].y })
      }
    }
    return conns
  }, [nodes])

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
      viewBox="0 0 110 120"
      preserveAspectRatio="xMidYMid slice"
    >
      {connections.map((conn, i) => (
        <motion.line
          key={i}
          x1={conn.x1} y1={conn.y1}
          x2={conn.x2} y2={conn.y2}
          stroke="#6366f1"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.04 }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={1}
          fill="#06b6d4"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, delay: node.id * 0.1, repeat: Infinity }}
        />
      ))}
    </svg>
  )
}

const DEMO_CHAT = [
  { role: "user", text: "What were my key focus areas last week?" },
  { role: "ai", text: "Based on your notes and goals, you focused on: deep work sessions (4.2h avg), 3 completed project milestones, and journaling every day. Your mood was highest on days with >3h focus time." },
  { role: "user", text: "What should I prioritize tomorrow?" },
  { role: "ai", text: "I recommend starting with your Q1 goal review (overdue by 2 days), followed by the reading list item you bookmarked. Your peak focus window is 9–11am — protect that time." },
]

export function AIFeatures() {
  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: "#06060e" }}>
      <NeuralBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-mono uppercase tracking-widest">
            AI Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Intelligence That
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #f0abfc, #818cf8)" }}
            >
              Grows With You
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature cards */}
          <div className="space-y-5">
            {AI_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass rounded-2xl p-5 flex gap-4"
              >
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Chat Demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-5"
          >
            {/* Chat header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-slate-400 text-sm font-mono">Aily AI Assistant</span>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {DEMO_CHAT.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600/40 text-indigo-100"
                        : "bg-white/5 text-slate-300"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <span className="text-xs text-indigo-400 font-mono block mb-1">AI</span>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
