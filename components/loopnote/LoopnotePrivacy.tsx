"use client"

import { motion } from "framer-motion"

const PURPLE = "#8B7FD4"

const PILLARS = [
  {
    icon: "🔑",
    title: "Bring Your Own API Key",
    body: "Use your own Anthropic API key. AI calls go straight from your device to Anthropic — we never intercept, log, or resell your prompts.",
    tag: "BYOK",
  },
  {
    icon: "📦",
    title: "Export everything, anytime",
    body: "Your notes are yours. Download your full history in JSON or Markdown with one click — no waiting, no forms, no questions asked.",
    tag: "Full data export",
  },
  {
    icon: "🔒",
    title: "End-to-end token auth",
    body: "We use short-lived JWTs with rolling refresh tokens. No third-party auth SDKs that phone home. No Firebase, no Cognito.",
    tag: "Self-built auth",
  },
  {
    icon: "👁️",
    title: "We can't read your notes",
    body: "If you use BYOK, your note content is never processed by our infrastructure. The AI pipeline runs on your key, with your quota.",
    tag: "Zero knowledge",
  },
]

export function LoopnotePrivacy() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#08080f" }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${PURPLE}0d 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-sm font-mono uppercase tracking-widest" style={{ color: PURPLE }}>
            Privacy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Your data.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(90deg, ${PURPLE}, #c4b5fd)` }}
            >
              Your rules.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 max-w-lg mx-auto text-lg leading-relaxed">
            We built Loopnote the way we'd want an app built for ourselves — minimal data
            collection, transparent AI, and real ways to leave.
          </p>
        </motion.div>

        {/* Big statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 mb-14 rounded-2xl p-7 text-center"
          style={{
            background: `${PURPLE}0f`,
            border: `1px solid ${PURPLE}33`,
          }}
        >
          <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            "We make money from subscriptions, not from selling your data.
            <br />
            <span className="text-slate-400 font-normal text-lg">
              That's the whole business model — no exceptions."
            </span>
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${PURPLE}20` }}
                >
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold">{p.title}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{ background: `${PURPLE}22`, color: `${PURPLE}cc` }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy policy link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="/apps/loopnote/privacy"
            className="text-sm transition-colors"
            style={{ color: `${PURPLE}99` }}
          >
            Read our full Privacy Policy →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
