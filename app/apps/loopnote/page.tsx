import { LoopnoteHero } from "@/components/loopnote/LoopnoteHero"
import { LoopnoteFeatures } from "@/components/loopnote/LoopnoteFeatures"
import { LoopnoteAIDemo } from "@/components/loopnote/LoopnoteAIDemo"
import { LoopnotePrivacy } from "@/components/loopnote/LoopnotePrivacy"
import { LoopnoteCTA } from "@/components/loopnote/LoopnoteCTA"
import { TopNav } from "@/components/TopNav"

export const metadata = {
  title: "Loopnote — Chat-style notes, AI-summarized daily",
  description:
    "Capture thoughts as they flow — text or images. Loopnote's AI organizes them into daily summaries and extracts your todos automatically.",
}

export default function LoopnotePage() {
  return (
    <main>
      <TopNav />
      <LoopnoteHero />
      <LoopnoteFeatures />
      <LoopnoteAIDemo />
      <LoopnotePrivacy />
      <LoopnoteCTA />

      <footer className="py-10 px-6 border-t border-white/5 text-center text-slate-600 text-sm">
        <p className="text-slate-400 font-semibold text-base mb-1">Loopnote</p>
        <p>Part of the Ailox ecosystem</p>
        <div className="mt-3 flex justify-center gap-6 text-slate-500">
          <a href="/apps/loopnote/privacy" className="hover:text-slate-300 transition">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-slate-300 transition">
            Ailox
          </a>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Ailox. All rights reserved.</p>
      </footer>
    </main>
  )
}
