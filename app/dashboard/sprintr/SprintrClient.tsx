"use client"

import { useState, useTransition } from "react"

export type Sprint = {
  id: string
  milestone_id: string
  name: string
  goal_description: string
  start_date: string
  end_date: string
  duration_days: number
  status: string
  sort_order: number
  updated_at?: string
}

export type Milestone = {
  id: string
  project_id: string
  name: string
  description: string
  target_date: string | null
  status: string
  sort_order: number
  sprints: Sprint[]
  updated_at?: string
}

export type Project = {
  id: string
  name: string
  description: string
  icon: string
  color_value: number
  target_date: string | null
  status: string
  sort_order: number
  milestones: Milestone[]
  updated_at?: string
}

const STATUS_OPTIONS = ["active", "completed", "archived"]
const ITEM_STATUS = ["notStarted", "inProgress", "completed"]

function uuid() {
  return crypto.randomUUID()
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function SprintrClient({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial)
  const [newProjectName, setNewProjectName] = useState("")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function toggle(id: string) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }))
  }

  async function createProject() {
    const name = newProjectName.trim()
    if (!name) return
    const id = uuid()
    const payload: Project = {
      id,
      name,
      description: "",
      icon: "",
      color_value: 0,
      target_date: null,
      status: "active",
      sort_order: projects.length,
      milestones: [],
    }
    const res = await fetch(`/api/sprintr/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      setError("Failed to create project.")
      return
    }
    const created = (await res.json()) as Project
    startTransition(() => {
      setProjects((p) => [...p, created])
      setNewProjectName("")
      setExpanded((e) => ({ ...e, [created.id]: true }))
    })
  }

  async function patchProject(id: string, patch: Partial<Project>) {
    const res = await fetch(`/api/sprintr/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
    if (!res.ok) {
      setError("Failed to update project.")
      return
    }
    const updated = (await res.json()) as Project
    startTransition(() =>
      setProjects((p) => p.map((x) => (x.id === id ? { ...x, ...updated } : x))),
    )
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project and everything under it?")) return
    const res = await fetch(`/api/sprintr/projects/${id}`, { method: "DELETE" })
    if (!res.ok && res.status !== 204) {
      setError("Failed to delete project.")
      return
    }
    startTransition(() => setProjects((p) => p.filter((x) => x.id !== id)))
  }

  async function addMilestone(projectId: string) {
    const name = prompt("Milestone name?")?.trim()
    if (!name) return
    const project = projects.find((p) => p.id === projectId)
    if (!project) return
    const msId = uuid()
    const milestone: Milestone = {
      id: msId,
      project_id: projectId,
      name,
      description: "",
      target_date: null,
      status: "notStarted",
      sort_order: project.milestones.length,
      sprints: [],
    }
    const res = await fetch(
      `/api/sprintr/projects/${projectId}/milestones/${msId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(milestone),
      },
    )
    if (!res.ok) {
      setError("Failed to create milestone.")
      return
    }
    const created = (await res.json()) as Milestone
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) =>
          p.id === projectId
            ? { ...p, milestones: [...p.milestones, created] }
            : p,
        ),
      ),
    )
  }

  async function patchMilestone(id: string, patch: Partial<Milestone>) {
    const res = await fetch(`/api/sprintr/milestones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
    if (!res.ok) {
      setError("Failed to update milestone.")
      return
    }
    const updated = (await res.json()) as Milestone
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) => ({
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === id ? { ...m, ...updated } : m,
          ),
        })),
      ),
    )
  }

  async function deleteMilestone(id: string) {
    if (!confirm("Delete this milestone?")) return
    const res = await fetch(`/api/sprintr/milestones/${id}`, { method: "DELETE" })
    if (!res.ok && res.status !== 204) {
      setError("Failed to delete milestone.")
      return
    }
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) => ({
          ...p,
          milestones: p.milestones.filter((m) => m.id !== id),
        })),
      ),
    )
  }

  async function addSprint(milestoneId: string) {
    const name = prompt("Sprint name?")?.trim()
    if (!name) return
    const msParent = projects
      .flatMap((p) => p.milestones)
      .find((m) => m.id === milestoneId)
    if (!msParent) return
    const id = uuid()
    const start = todayISO()
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
    const sprint: Sprint = {
      id,
      milestone_id: milestoneId,
      name,
      goal_description: "",
      start_date: start,
      end_date: endDate,
      duration_days: 14,
      status: "notStarted",
      sort_order: msParent.sprints.length,
    }
    const res = await fetch(
      `/api/sprintr/milestones/${milestoneId}/sprints/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sprint),
      },
    )
    if (!res.ok) {
      setError("Failed to create sprint.")
      return
    }
    const created = (await res.json()) as Sprint
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) => ({
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === milestoneId
              ? { ...m, sprints: [...m.sprints, created] }
              : m,
          ),
        })),
      ),
    )
  }

  async function patchSprint(id: string, patch: Partial<Sprint>) {
    const res = await fetch(`/api/sprintr/sprints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
    if (!res.ok) {
      setError("Failed to update sprint.")
      return
    }
    const updated = (await res.json()) as Sprint
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) => ({
          ...p,
          milestones: p.milestones.map((m) => ({
            ...m,
            sprints: m.sprints.map((s) =>
              s.id === id ? { ...s, ...updated } : s,
            ),
          })),
        })),
      ),
    )
  }

  async function deleteSprint(id: string) {
    if (!confirm("Delete this sprint?")) return
    const res = await fetch(`/api/sprintr/sprints/${id}`, { method: "DELETE" })
    if (!res.ok && res.status !== 204) {
      setError("Failed to delete sprint.")
      return
    }
    startTransition(() =>
      setProjects((ps) =>
        ps.map((p) => ({
          ...p,
          milestones: p.milestones.map((m) => ({
            ...m,
            sprints: m.sprints.filter((s) => s.id !== id),
          })),
        })),
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 rounded-md border border-white/10 bg-white/2 p-3">
        <input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name…"
          className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              void createProject()
            }
          }}
        />
        <button
          onClick={createProject}
          disabled={!newProjectName.trim()}
          className="px-3 py-1.5 text-sm rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white disabled:opacity-40"
        >
          Add project
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {projects.length === 0 ? (
        <div className="rounded-md border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500">
          No projects yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="rounded-md border border-white/5 bg-white/2"
            >
              <div className="flex items-center gap-2 px-4 py-3">
                <button
                  onClick={() => toggle(p.id)}
                  className="text-slate-500 hover:text-white w-4 text-left"
                >
                  {expanded[p.id] ? "▾" : "▸"}
                </button>
                <input
                  value={p.name}
                  onChange={(e) =>
                    setProjects((ps) =>
                      ps.map((x) =>
                        x.id === p.id ? { ...x, name: e.target.value } : x,
                      ),
                    )
                  }
                  onBlur={(e) =>
                    e.target.value !== p.name
                      ? undefined
                      : patchProject(p.id, { name: p.name })
                  }
                  className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                />
                <select
                  value={p.status}
                  onChange={(e) => patchProject(p.id, { status: e.target.value })}
                  className="bg-black/40 text-xs text-slate-300 rounded px-2 py-1 border border-white/10"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => addMilestone(p.id)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  + Milestone
                </button>
                <button
                  onClick={() => deleteProject(p.id)}
                  className="text-xs text-slate-400 hover:text-red-400"
                >
                  Delete
                </button>
              </div>

              {expanded[p.id] && (
                <div className="border-t border-white/5 px-4 py-3 space-y-2">
                  {p.milestones.length === 0 ? (
                    <p className="text-xs text-slate-500">No milestones.</p>
                  ) : (
                    p.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="rounded border border-white/5 bg-black/20"
                      >
                        <div className="flex items-center gap-2 px-3 py-2">
                          <span className="text-slate-500 text-xs">◆</span>
                          <input
                            defaultValue={m.name}
                            onBlur={(e) =>
                              e.target.value !== m.name &&
                              patchMilestone(m.id, { name: e.target.value })
                            }
                            className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                          />
                          <select
                            value={m.status}
                            onChange={(e) =>
                              patchMilestone(m.id, { status: e.target.value })
                            }
                            className="bg-black/40 text-xs text-slate-300 rounded px-2 py-0.5 border border-white/10"
                          >
                            {ITEM_STATUS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => addSprint(m.id)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            + Sprint
                          </button>
                          <button
                            onClick={() => deleteMilestone(m.id)}
                            className="text-xs text-slate-400 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                        {m.sprints.length > 0 && (
                          <ul className="border-t border-white/5 px-3 py-2 space-y-1">
                            {m.sprints.map((s) => (
                              <li
                                key={s.id}
                                className="flex items-center gap-2 text-xs"
                              >
                                <span className="text-slate-500">→</span>
                                <input
                                  defaultValue={s.name}
                                  onBlur={(e) =>
                                    e.target.value !== s.name &&
                                    patchSprint(s.id, { name: e.target.value })
                                  }
                                  className="flex-1 bg-transparent text-slate-200 focus:outline-none"
                                />
                                <span className="text-slate-500">
                                  {s.start_date} → {s.end_date}
                                </span>
                                <select
                                  value={s.status}
                                  onChange={(e) =>
                                    patchSprint(s.id, { status: e.target.value })
                                  }
                                  className="bg-black/40 text-slate-300 rounded px-1.5 py-0.5 border border-white/10"
                                >
                                  {ITEM_STATUS.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => deleteSprint(s.id)}
                                  className="text-slate-400 hover:text-red-400"
                                >
                                  ✕
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
