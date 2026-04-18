import { HeroSection } from "@/components/sections/HeroSection"
import { PhilosophySection } from "@/components/sections/PhilosophySection"
import { EcosystemSection } from "@/components/sections/EcosystemSection"
import { AppShowcase } from "@/components/sections/AppShowcase"
import { AIFeatures } from "@/components/sections/AIFeatures"
import { Roadmap } from "@/components/sections/Roadmap"
import { TopNav } from "@/components/TopNav"

export default function Home() {
  return (
    <main>
      <TopNav />
      <HeroSection />
      <PhilosophySection />
      <EcosystemSection />
      <AppShowcase />
      <AIFeatures />
      <Roadmap />

      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-600 text-sm">
        <p className="text-slate-400 font-semibold text-base mb-1">Ailox</p>
        <p>AI-powered apps for a better life</p>
        <p className="mt-4">© {new Date().getFullYear()} Ailox. All rights reserved.</p>
      </footer>
    </main>
  )
}
