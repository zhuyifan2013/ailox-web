"use client"

import { motion } from "framer-motion"

const PURPLE = "#8B7FD4"

const RAW_NOTES = [
  { type: "text", content: "Morning call with Sarah went well, need to follow up on Q2 budget", time: "9:14 AM" },
  { type: "image", content: "whiteboard_sketch.jpg", caption: "System architecture sketch", time: "10:02 AM" },
  { type: "text", content: "Book rec from James: The Pragmatic Programmer", time: "12:30 PM" },
  { type: "text", content: "Finished migration PR, blocked on staging env access", time: "3:45 PM" },
  { type: "text", content: "Dinner: try the ramen place on 5th this week", time: "6:20 PM" },
]

const AI_SUMMARY = {
  highlights: [
    "Productive deep work session — migration PR completed",
    "Good alignment call with Sarah on Q2 planning",
  ],
  todos: [
    { done: false, text: "Follow up with Sarah on Q2 budget" },
    { done: false, text: "Request staging env access" },
    { done: false, text: "Read: The Pragmatic Programmer" },
    { done: true, text: "Finish migration PR" },
  ],
  memory: "Whiteboard sketch saved to your knowledge base",
}

export function LoopnoteAIDemo() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: "#06060c" }}>
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${PURPLE}55 1px, transparent 1px), linear-gradient(90deg, ${PURPLE}55 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono uppercase tracking-widest" style={{ color: PURPLE }}>
            AI in action
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Raw chaos →{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(90deg, ${PURPLE}, #c4b5fd)` }}
            >
              clear picture
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            You capture, we structure. Every night the AI reads your stream and builds tomorrow's briefing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left: raw notes stream */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Header bar */}
            <div className="px-5 py-3.5 border-b border-white/8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-slate-400 text-sm font-mono">Your stream · April 22</span>
            </div>

            <div className="p-4 space-y-3">
              {RAW_NOTES.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
                  className="flex justify-end"
                >
                  {note.type === "image" ? (
                    <div className="max-w-[80%]">
                      <div
                        className="rounded-2xl rounded-tr-sm overflow-hidden border border-white/10"
                        style={{ background: "#1a1a2e" }}
                      >
                        <div className="w-full h-24 flex items-center justify-center gap-2 text-slate-500">
                          <span className="text-2xl">🖼️</span>
                          <span className="text-xs">{note.content}</span>
                        </div>
                        {note.caption && (
                          <p className="text-xs text-slate-500 px-3 pb-2">{note.caption}</p>
                        )}
                      </div>
                      <p className="text-right text-slate-600 mt-0.5" style={{ fontSize: 10 }}>
                        {note.time}
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-[82%]">
                      <div
                        className="rounded-2xl rounded-tr-sm px-3.5 py-2"
                        style={{ background: `${PURPLE}25` }}
                      >
                        <p className="text-sm text-slate-200 leading-relaxed">{note.content}</p>
                      </div>
                      <p className="text-right text-slate-600 mt-0.5" style={{ fontSize: 10 }}>
                        {note.time}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arrow (desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-1 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: PURPLE, boxShadow: `0 0 20px ${PURPLE}66` }}
            >
              ✦
            </motion.div>
          </div>

          {/* Right: AI output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Header bar */}
            <div
              className="px-5 py-3.5 border-b border-white/8 flex items-center gap-2"
              style={{ background: `${PURPLE}15` }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PURPLE }} />
              <span className="text-sm font-mono" style={{ color: PURPLE }}>
                AI Daily Digest · Apr 23, 6:00 AM
              </span>
            </div>

            <div className="p-5 space-y-5">
              {/* Highlights */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Highlights
                </p>
                <div className="space-y-2">
                  {AI_SUMMARY.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-0.5 flex-shrink-0" style={{ color: PURPLE }}>✦</span>
                      <p className="text-sm text-slate-300 leading-relaxed">{h}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/8" />

              {/* Todos */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Extracted Todos
                </p>
                <div className="space-y-2">
                  {AI_SUMMARY.todos.map((todo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 + i * 0.09 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border text-xs"
                        style={
                          todo.done
                            ? { background: `${PURPLE}44`, borderColor: PURPLE, color: PURPLE }
                            : { borderColor: "rgba(255,255,255,0.2)", color: "transparent" }
                        }
                      >
                        {todo.done && "✓"}
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          todo.done ? "line-through text-slate-600" : "text-slate-300"
                        }`}
                      >
                        {todo.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/8" />

              {/* Memory note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <span>🧠</span>
                <span>{AI_SUMMARY.memory}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
