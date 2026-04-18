import { SprintrClient, type Project } from "./SprintrClient"
import { backendFetch } from "@/lib/dashboard/session"

async function loadProjects(): Promise<Project[]> {
  const res = await backendFetch("/sprintr/projects")
  if (!res.ok) return []
  return res.json()
}

export default async function SprintrPage() {
  const initial = await loadProjects()
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Sprintr</h1>
        <p className="text-slate-400 text-sm mt-1">
          Projects, milestones, sprints. Agile planning for your life.
        </p>
      </header>
      <SprintrClient initial={initial} />
    </div>
  )
}
