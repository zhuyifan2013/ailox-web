import { LoopnoteClient } from "./LoopnoteClient"
import { backendFetch } from "@/lib/dashboard/session"

type Event = {
  id: string
  type: string
  content: string
  source_app: string
  created_at: string
}

async function loadNotes(): Promise<Event[]> {
  const res = await backendFetch(
    "/events?type=note&source_app=loopnote&limit=50",
  )
  if (!res.ok) return []
  return res.json()
}

export default async function LoopnotePage() {
  const initial = await loadNotes()
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Loopnote</h1>
        <p className="text-slate-400 text-sm mt-1">
          Chat-style notes. AI summarizes each day automatically.
        </p>
      </header>
      <LoopnoteClient initial={initial} />
    </div>
  )
}
