"use client"

import { motion } from "framer-motion"

const PURPLE = "#8B7FD4"

const FEATURES = [
  {
    icon: "💬",
    title: "Text & images, all in one stream",
    description:
      "Drop text, snap a photo, paste a screenshot. Loopnote keeps everything in one flowing timeline — no folders, no friction.",
    highlight: "Text · Images · Links",
  },
  {
    icon: "✨",
    title: "AI daily digest at 6 AM",
    description:
      "Every morning you wake up to a structured summary of yesterday — key moments, decisions, and automatically extracted todos ready to act on.",
    highlight: "Auto-summary · Todo extraction",
  },
  {
    icon: "🔍",
    title: "Search by meaning, not keywords",
    description:
      "Ask 'what did I think about that book last month?' and get the right note — even if you never wrote the exact words. Powered by vector embeddings.",
    highlight: "AI semantic search · Vector index",
    featured: true,
  },
  {
    icon: "🌐",
    title: "Web dashboard, export anytime",
    description:
      "Browse, search, and manage all your notes from the web. Export your entire history in JSON or Markdown whenever you want — no lock-in.",
    highlight: "Web app · Full export",
  },
  {
    icon: "🔑",
    title: "Bring your own API key",
    description:
      "Use your own Anthropic API key so AI requests go directly from you to Anthropic. We never see your data in transit.",
    highlight: "BYOK · Claude-powered",
  },
]

export function LoopnoteFeatures() {
  return (
    <section className="py-28 px-6" style={{ background: "#07070f" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: PURPLE }}
          >
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Everything you need,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(90deg, ${PURPLE}, #c4b5fd)` }}
            >
              nothing you don't
            </span>
          </h2>
        </motion.div>

        {/* Feature grid — AI Search spans full width */}
        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
                f.featured ? "md:col-span-2" : ""
              }`}
              style={{
                borderColor: f.featured ? `${PURPLE}44` : "rgba(255,255,255,0.07)",
                background: f.featured
                  ? `linear-gradient(135deg, ${PURPLE}12, ${PURPLE}06)`
                  : undefined,
              }}
            >
              {f.featured ? (
                /* Featured layout — horizontal with search demo */
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${PURPLE}22` }}
                      >
                        {f.icon}
                      </div>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold"
                        style={{ background: `${PURPLE}30`, color: PURPLE }}
                      >
                        ✦ AI-powered
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg leading-snug">{f.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{f.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {f.highlight.split(" · ").map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                          style={{ background: `${PURPLE}1a`, color: `${PURPLE}cc` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inline search demo */}
                  <div
                    className="w-full md:w-72 rounded-2xl overflow-hidden flex-shrink-0"
                    style={{ background: "#f5f4fb", border: "1px solid #e8e5f5" }}
                  >
                    {/* Search bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e8e5f5]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="#9b8fcf" strokeWidth="1.4" />
                        <path d="M9.5 9.5L12 12" stroke="#9b8fcf" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      <span className="text-sm font-medium" style={{ color: "#5b4fa8" }}>
                        coffee shop recommendation
                      </span>
                    </div>
                    {/* Result */}
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span style={{ color: PURPLE, fontSize: 13 }}>✦</span>
                        <span className="text-xs font-semibold" style={{ color: PURPLE }}>AI semantic match</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ background: `${PURPLE}20`, color: PURPLE }}
                        >3</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">Related notes</p>
                      {[
                        { text: "That little café near the library has the best oat latte — worth going back", match: "91%", time: "3 days ago" },
                        { text: "James mentioned Blue Bottle on Castro, said it's his go-to for focused work", match: "78%", time: "Last week" },
                      ].map((r, ri) => (
                        <div
                          key={ri}
                          className="rounded-xl p-3 mb-2 last:mb-0"
                          style={{ background: "white", border: "1px solid #ede9f8" }}
                        >
                          <p className="text-xs leading-relaxed" style={{ color: "#2d2060" }}>{r.text}</p>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-xs" style={{ color: "#b0a8d8" }}>{r.time}</span>
                            <span className="text-xs font-mono font-medium" style={{ color: PURPLE }}>{r.match} match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal card layout */
                <>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${PURPLE}22` }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base leading-snug">{f.title}</h3>
                      <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.highlight.split(" · ").map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                        style={{ background: `${PURPLE}1a`, color: `${PURPLE}cc` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
