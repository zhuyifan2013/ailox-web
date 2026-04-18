import { SettingsClient, type KeyStatus, type MeInfo } from "./SettingsClient"
import { backendFetch, readUserId } from "@/lib/dashboard/session"

async function loadMe(): Promise<MeInfo | null> {
  const res = await backendFetch("/auth/me")
  if (!res.ok) return null
  return res.json()
}

async function loadKeyStatus(userId: string): Promise<KeyStatus | null> {
  const res = await backendFetch(
    `/settings/api-key?user_id=${encodeURIComponent(userId)}`,
  )
  if (!res.ok) return null
  return res.json()
}

export default async function SettingsPage() {
  const userId = await readUserId()
  const [me, keyStatus] = await Promise.all([
    loadMe(),
    userId ? loadKeyStatus(userId) : Promise.resolve(null),
  ])

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account, preferences, and API key.
        </p>
      </header>
      <SettingsClient me={me} keyStatus={keyStatus} />
    </div>
  )
}
