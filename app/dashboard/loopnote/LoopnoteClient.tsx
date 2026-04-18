"use client"

import { useState, useTransition } from "react"

type Event = {
  id: string
  type: string
  content: string
  source_app: string
  created_at: string
}

export function LoopnoteClient({ initial }: { initial: Event[] }) {
  const [notes, setNotes] = useState<Event[]>(initial)
  const [draft, setDraft] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")
  const [, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function createNote() {
    const content = draft.trim()
    if (!content) return
    setError(null)
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        type: "note",
        content,
        source_app: "loopnote",
        metadata: { note_type: "text" },
        created_at: new Date().toISOString(),
      }),
    })
    if (!res.ok) {
      setError("Failed to save note.")
      return
    }
    const created = (await res.json()) as Event
    startTransition(() => {
      setNotes((prev) => [created, ...prev])
      setDraft("")
    })
  }

  async function saveEdit(id: string) {
    const content = editingText.trim()
    if (!content) {
      setEditingId(null)
      return
    }
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    if (!res.ok) {
      setError("Failed to update note.")
      return
    }
    const updated = (await res.json()) as Event
    startTransition(() => {
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)))
      setEditingId(null)
    })
  }

  async function remove(id: string) {
    if (!confirm("Delete this note?")) return
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
    if (!res.ok && res.status !== 204) {
      setError("Failed to delete note.")
      return
    }
    startTransition(() => setNotes((prev) => prev.filter((n) => n.id !== id)))
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-white/10 bg-white/2 p-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note… (Cmd/Ctrl + Enter to save)"
          rows={3}
          className="w-full bg-transparent resize-none text-white placeholder:text-slate-500 focus:outline-none"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault()
              void createNote()
            }
          }}
        />
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={createNote}
            disabled={!draft.trim()}
            className="px-3 py-1.5 text-sm rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {notes.length === 0 ? (
        <div className="rounded-md border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500">
          No notes yet. Write your first one above.
        </div>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li
              key={n.id}
              className="rounded-md border border-white/5 bg-white/2 px-4 py-3"
            >
              {editingId === n.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    className="w-full bg-black/30 rounded p-2 text-white focus:outline-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(n.id)}
                      className="text-sm text-white bg-[#8B7FD4] hover:bg-[#7B6FC4] px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-white whitespace-pre-wrap break-words">
                    {n.content}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>{new Date(n.created_at).toLocaleString()}</span>
                    <span className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingId(n.id)
                          setEditingText(n.content)
                        }}
                        className="hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(n.id)}
                        className="hover:text-red-400"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
