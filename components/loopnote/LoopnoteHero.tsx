"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const PURPLE = "#8B7FD4"

// iOS status bar icons (SVG)
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1" style={{ fontSize: 11 }}>
      <span className="text-white font-semibold tracking-tight" style={{ fontSize: 12 }}>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="white" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" fillOpacity="0.35" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
          <path d="M3.8 6.7a6 6 0 018.4 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M1.2 4.1a9.5 9.5 0 0113.6 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div
            className="rounded-[2px] border border-white/60 flex items-center px-[1.5px]"
            style={{ width: 22, height: 11 }}
          >
            <div className="rounded-[1px] h-[7px] bg-white" style={{ width: "72%" }} />
          </div>
          <div className="rounded-full bg-white/60" style={{ width: 1.5, height: 4 }} />
        </div>
      </div>
    </div>
  )
}

// Dynamic Island
function DynamicIsland() {
  return (
    <div className="flex justify-center pt-2 pb-1">
      <div
        className="rounded-full bg-black"
        style={{ width: 120, height: 34 }}
      />
    </div>
  )
}

// App header inside phone
function AppHeader() {
  return (
    <div className="px-4 py-2 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
          style={{ background: `${PURPLE}33` }}
        >
          💬
        </div>
        <span className="text-white text-sm font-semibold">Loopnote</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="4" cy="4" r="3" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
            <path d="M6.5 6.5L8.5 8.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="2" cy="5" r="1" fill="white" fillOpacity="0.6" />
            <circle cx="5" cy="5" r="1" fill="white" fillOpacity="0.6" />
            <circle cx="8" cy="5" r="1" fill="white" fillOpacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Date separator
function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 my-1">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-slate-600 font-medium" style={{ fontSize: 9 }}>{label}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  )
}

const MESSAGES = [
  {
    type: "text",
    text: "Finished the system design doc, finally feels solid",
    tags: ["#work", "#progress", "#engineering"],
    time: "10:23",
  },
  {
    type: "text",
    text: "Podcast rec: Lex Fridman ep. with Jensen Huang — the GPU roadmap part is 🔥",
    tags: ["#podcast", "#ai", "#recommendation"],
    time: "12:41",
  },
  {
    type: "image",
    caption: "Café sketch",
    time: "14:07",
  },
  {
    type: "text",
    text: "Need to renew passport before July — book appointment this week",
    tags: ["#reminder", "#task", "#travel"],
    time: "17:52",
  },
  {
    type: "ai",
    text: "✦  Daily Summary ready",
    sub: "4 notes · 2 todos extracted",
  },
]

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto select-none"
      style={{ width: 272 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Glow shadow beneath */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-52 h-14 rounded-full blur-2xl pointer-events-none"
          style={{ background: `${PURPLE}55` }}
        />

        {/* Phone shell */}
        <div
          className="relative rounded-[44px] p-[1.5px]"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(200,195,230,0.1) 50%, rgba(139,127,212,0.35) 100%)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
          }}
        >
          <div className="rounded-[42.5px] overflow-hidden" style={{ background: "#f6f5fb" }}>

            {/* Dynamic Island */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="rounded-full bg-black" style={{ width: 110, height: 30 }} />
            </div>

            {/* Status bar — Android-style to match screenshot */}
            <div className="flex items-center justify-between px-5 pb-1" style={{ fontSize: 10 }}>
              <span className="font-semibold text-gray-700">9:41</span>
              <div className="flex items-center gap-1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="#374151">
                  <rect x="0" y="5" width="2.5" height="5" rx="0.4" />
                  <rect x="3.5" y="3" width="2.5" height="7" rx="0.4" />
                  <rect x="7" y="1" width="2.5" height="9" rx="0.4" />
                  <rect x="10.5" y="0" width="2.5" height="10" rx="0.4" fillOpacity="0.3" />
                </svg>
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M6.5 8a1 1 0 110 2 1 1 0 010-2z" fill="#374151" />
                  <path d="M2.8 5.5a5.2 5.2 0 017.4 0" stroke="#374151" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M0.5 3.2a8.5 8.5 0 0112 0" stroke="#374151" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <div className="flex items-center gap-0.5">
                  <div className="rounded-sm border border-gray-400 flex items-center px-[1.5px]" style={{ width: 20, height: 10 }}>
                    <div className="rounded-[1px] bg-gray-700 h-[6px]" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8e5f5]">
              <span className="text-base font-bold" style={{ color: "#1a1060" }}>LoopNote</span>
              <div className="flex items-center gap-2">
                {/* AI Search button */}
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ background: `${PURPLE}18`, border: `1px solid ${PURPLE}30` }}
                >
                  <span style={{ color: PURPLE, fontSize: 10 }}>✦</span>
                  <span className="text-xs font-medium" style={{ color: PURPLE }}>Search · AI</span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="2" cy="7" r="1.2" fill="#9b8fcf" />
                    <circle cx="7" cy="7" r="1.2" fill="#9b8fcf" />
                    <circle cx="12" cy="7" r="1.2" fill="#9b8fcf" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date separator */}
            <div className="flex items-center gap-2 mx-4 my-2">
              <div className="flex-1 h-px bg-[#ddd9ee]" />
              <span className="text-xs text-[#b0a8d0]">Apr 22</span>
              <div className="flex-1 h-px bg-[#ddd9ee]" />
            </div>

            {/* Chat stream */}
            <div className="px-3 space-y-3 overflow-hidden pb-2" style={{ maxHeight: 320 }}>
              {MESSAGES.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.35 }}
                >
                  {msg.type === "ai" ? (
                    <div
                      className="rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 mx-1"
                      style={{ background: `${PURPLE}14`, border: `1px solid ${PURPLE}28` }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                        style={{ background: PURPLE }}
                      >
                        <span className="text-white" style={{ fontSize: 9 }}>✦</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: PURPLE }}>{msg.text}</p>
                        <p className="text-xs mt-0.5" style={{ color: `${PURPLE}88` }}>{msg.sub}</p>
                      </div>
                    </div>
                  ) : msg.type === "image" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[55%]">
                        <div
                          className="rounded-2xl rounded-tr-[6px] overflow-hidden"
                          style={{ height: 80, background: "linear-gradient(135deg, #c8c0f0 0%, #a89de0 50%, #d4c8f8 100%)" }}
                        >
                          <svg width="100%" height="100%" viewBox="0 0 150 80">
                            <rect x="18" y="12" width="38" height="24" rx="5" fill="white" fillOpacity="0.5" />
                            <rect x="94" y="12" width="38" height="24" rx="5" fill="white" fillOpacity="0.5" />
                            <rect x="56" y="46" width="38" height="24" rx="5" fill="white" fillOpacity="0.5" />
                            <path d="M56 24 L94 24" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                            <path d="M37 36 L75 46" stroke="white" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 2" />
                            <path d="M113 36 L95 46" stroke="white" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 2" />
                          </svg>
                        </div>
                        <p className="text-right mt-0.5 pr-1 text-[#b0a8d0]" style={{ fontSize: 9 }}>
                          {msg.caption} · {msg.time} · ✓ Synced
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="max-w-[82%]">
                        <div
                          className="rounded-[18px] rounded-tr-[5px] px-3 py-2"
                          style={{ background: PURPLE }}
                        >
                          <p className="text-white leading-relaxed" style={{ fontSize: 11 }}>
                            {msg.text}
                          </p>
                        </div>
                        {/* AI tags */}
                        {msg.tags && (
                          <div className="flex flex-wrap gap-1 mt-1 justify-end">
                            {msg.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full px-1.5 py-0.5 font-mono"
                                style={{ fontSize: 8, background: `${PURPLE}15`, color: `${PURPLE}bb` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-right text-[#b0a8d0] mt-0.5 pr-0.5" style={{ fontSize: 9 }}>
                          {msg.time} · ✓ Synced
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input bar */}
            <div className="px-3 py-2 border-t border-[#e8e5f5] flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 11V3m0 8c-1.1 0-2-.4-2.8-1L8 5l2.8 5A4 4 0 018 11z" stroke="#9b8fcf" strokeWidth="1.2" strokeLinecap="round" />
                <rect x="3" y="12" width="10" height="1.5" rx="0.75" fill="#9b8fcf" fillOpacity="0.5" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="2" stroke="#9b8fcf" strokeWidth="1.2" />
                <circle cx="6" cy="7" r="1.2" fill="#9b8fcf" />
                <path d="M2 10l3-3 2.5 2.5L11 6l3 4" stroke="#9b8fcf" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="flex-1 text-[#c0bcd8]" style={{ fontSize: 11 }}>What's on your mind…</span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: PURPLE }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 10V2M3 5L6 2L9 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Bottom tab bar */}
            <div className="flex items-center border-t border-[#e8e5f5] px-2 py-2" style={{ background: "#f6f5fb" }}>
              {[
                { icon: "💬", label: "Notes", active: true },
                { icon: "✦", label: "Review", active: false },
                { icon: "☑", label: "Todo", active: false },
                { icon: "⚙", label: "Settings", active: false },
              ].map((tab) => (
                <div key={tab.label} className="flex-1 flex flex-col items-center gap-0.5">
                  {tab.active ? (
                    <div
                      className="rounded-full px-3 py-1 flex items-center gap-1"
                      style={{ background: PURPLE }}
                    >
                      <span style={{ fontSize: 11 }}>{tab.icon}</span>
                      <span className="text-white font-medium" style={{ fontSize: 9 }}>{tab.label}</span>
                    </div>
                  ) : (
                    <>
                      <span style={{ fontSize: 13, color: "#9b8fcf" }}>{tab.icon}</span>
                      <span style={{ fontSize: 8, color: "#9b8fcf" }}>{tab.label}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-1" style={{ background: "#f6f5fb" }}>
              <div className="w-24 h-[3px] rounded-full bg-[#d0ccee]" />
            </div>
          </div>
        </div>

        {/* Physical side buttons */}
        <div className="absolute -left-[3px] top-24 rounded-l-sm" style={{ width: 3, height: 26, background: "rgba(139,127,212,0.4)" }} />
        <div className="absolute -left-[3px] top-52 rounded-l-sm" style={{ width: 3, height: 40, background: "rgba(139,127,212,0.4)" }} />
        <div className="absolute -left-[3px] top-[240px] rounded-l-sm" style={{ width: 3, height: 40, background: "rgba(139,127,212,0.4)" }} />
        <div className="absolute -right-[3px] top-36 rounded-r-sm" style={{ width: 3, height: 58, background: "rgba(139,127,212,0.3)" }} />
      </motion.div>
    </motion.div>
  )
}

export function LoopnoteHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #0a0a0f, #0d0a1f, #0a0f1a, #0a0a0f)",
        backgroundSize: "400% 400%",
        animation: "aurora 14s ease infinite",
      }}
    >
      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: PURPLE }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-10 bg-cyan-500" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-24">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm mb-8"
            style={{ color: PURPLE }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PURPLE }} />
            Now available · iOS &amp; Android
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Notes that{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${PURPLE}, #c4b5fd)` }}
            >
              think
            </span>
            <br />
            for you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg text-slate-400 leading-relaxed max-w-md"
          >
            Toss in text, images, and ideas as they come — like texting yourself. Every morning,
            Loopnote's AI turns the chaos into a clean daily summary with todos extracted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-200"
              style={{
                background: PURPLE,
                boxShadow: `0 0 24px ${PURPLE}55`,
              }}
            >
              <span>🍎</span> App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white glass hover:bg-white/10 transition-all duration-200"
            >
              <span>🤖</span> Google Play
            </a>
            <Link
              href="/dashboard/loopnote"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200"
              style={{ color: PURPLE, border: `1px solid ${PURPLE}55` }}
            >
              Open Web App →
            </Link>
          </motion.div>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
