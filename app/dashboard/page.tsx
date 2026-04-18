import { backendFetch } from "@/lib/dashboard/session"

type Event = {
  id: string
  type: string
  content: string
  source_app: string
  created_at: string
}

type SummaryItem = {
  id: string
  category: string
  content: string
  completed_at: string | null
  priority: string | null
}

type DailySummary = {
  id: string
  date: string
  status: string
  note_count: number
  items: SummaryItem[]
}

async function loadEvents(): Promise<Event[]> {
  // source_app= (empty) tells the backend to return events across all apps.
  const res = await backendFetch("/events?limit=30&source_app=")
  if (!res.ok) return []
  return res.json()
}

async function loadSummaries(): Promise<DailySummary[]> {
  const res = await backendFetch("/summaries?limit=7")
  if (!res.ok) return []
  return res.json()
}

export default async function OverviewPage() {
  const [events, summaries] = await Promise.all([loadEvents(), loadSummaries()])

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-slate-400 text-sm mt-1">
          Your recent activity across every Ailox app.
        </p>
      </header>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 mb-3">
          Recent events
        </h2>
        {events.length === 0 ? (
          <EmptyState label="No events yet." />
        ) : (
          <ul className="divide-y divide-white/5 rounded-md border border-white/5 bg-white/2">
            {events.map((e) => (
              <li key={e.id} className="px-4 py-3 flex gap-3">
                <AppTag app={e.source_app} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white whitespace-pre-wrap break-words">
                    {e.content || <span className="text-slate-500 italic">({e.type})</span>}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(e.created_at).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 mb-3">
          Daily summaries
        </h2>
        {summaries.length === 0 ? (
          <EmptyState label="No daily summaries yet. They arrive after AI runs." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {summaries.map((s) => (
              <article
                key={s.id}
                className="rounded-md border border-white/5 bg-white/2 p-4"
              >
                <header className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{s.date}</h3>
                  <span className="text-xs text-slate-500">
                    {s.note_count} note{s.note_count === 1 ? "" : "s"}
                  </span>
                </header>
                <ul className="space-y-1.5">
                  {s.items.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-slate-500 shrink-0 text-xs uppercase tracking-wide mt-0.5 w-16">
                        {item.category}
                      </span>
                      <span
                        className={
                          item.completed_at
                            ? "line-through text-slate-500"
                            : ""
                        }
                      >
                        {item.content}
                      </span>
                    </li>
                  ))}
                  {s.items.length > 5 && (
                    <li className="text-xs text-slate-500">
                      +{s.items.length - 5} more
                    </li>
                  )}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-white/10 bg-white/2 px-4 py-10 text-center text-sm text-slate-500">
      {label}
    </div>
  )
}

const APP_COLORS: Record<string, string> = {
  loopnote: "bg-[#8B7FD4]/20 text-[#C7BEEB] border-[#8B7FD4]/40",
  sprintr: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  "ailox-web": "bg-slate-500/15 text-slate-300 border-slate-500/30",
}

function AppTag({ app }: { app: string }) {
  const cls = APP_COLORS[app] ?? "bg-white/5 text-slate-400 border-white/10"
  return (
    <span
      className={`h-fit shrink-0 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border ${cls}`}
    >
      {app || "unknown"}
    </span>
  )
}
