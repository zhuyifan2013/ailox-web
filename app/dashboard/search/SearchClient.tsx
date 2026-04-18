"use client"

import { useState } from "react"

type ScoredEvent = {
  id: string
  type: string
  content: string
  source_app: string
  created_at: string
  score: number
}

type ScoredMemory = {
  id: string
  content: string
  kind?: string
  created_at: string
  score: number
}

type SearchResult = {
  events: ScoredEvent[]
  memories: ScoredMemory[]
}

export function SearchClient() {
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    const query = q.trim()
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=15`,
      )
      if (!res.ok) {
        setError("Search failed.")
        setResult(null)
        return
      }
      setResult(await res.json())
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything about your data…"
          className="flex-1 rounded-md border border-white/10 bg-white/2 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8B7FD4]/50"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              void run()
            }
          }}
        />
        <button
          onClick={run}
          disabled={!q.trim() || loading}
          className="px-4 py-2 text-sm rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white disabled:opacity-40"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 mb-2">
              Events ({result.events.length})
            </h2>
            {result.events.length === 0 ? (
              <p className="text-sm text-slate-500">No matching events.</p>
            ) : (
              <ul className="space-y-2">
                {result.events.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-md border border-white/5 bg-white/2 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>
                        {e.source_app} · {e.type}
                      </span>
                      <span>{(e.score * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-sm text-white whitespace-pre-wrap break-words">
                      {e.content}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(e.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 mb-2">
              Memories ({result.memories.length})
            </h2>
            {result.memories.length === 0 ? (
              <p className="text-sm text-slate-500">No matching memories.</p>
            ) : (
              <ul className="space-y-2">
                {result.memories.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-md border border-white/5 bg-white/2 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{m.kind ?? "memory"}</span>
                      <span>{(m.score * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-sm text-white whitespace-pre-wrap break-words">
                      {m.content}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
