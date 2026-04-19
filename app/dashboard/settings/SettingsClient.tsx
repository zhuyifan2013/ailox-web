"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export type MeInfo = {
  user_id: string
  role: string
  locale: string
  providers: string[]
  created_at: string
  timezone?: string
  summary_hour?: number
}

export type KeyStatus = {
  has_custom_key: boolean
  provider?: string | null
  masked_key?: string | null
}

export function SettingsClient({
  me,
  keyStatus: initialKeyStatus,
}: {
  me: MeInfo | null
  keyStatus: KeyStatus | null
}) {
  const [keyStatus, setKeyStatus] = useState<KeyStatus | null>(initialKeyStatus)
  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("aliyun")
  const [locale, setLocale] = useState(me?.locale ?? "en-US")
  const [timezone, setTimezone] = useState(me?.timezone ?? "UTC")
  const [summaryHour, setSummaryHour] = useState<number>(me?.summary_hour ?? 6)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()

  async function signOut() {
    setSigningOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {}
    router.replace("/login")
    router.refresh()
  }

  async function exportData() {
    setErr(null)
    setMsg(null)
    const res = await fetch("/api/account/export")
    if (!res.ok) {
      setErr("Failed to export data.")
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ailox-export-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setMsg("Export downloaded.")
  }

  async function deleteAccount() {
    if (deleteConfirm !== "DELETE") {
      setErr('Type "DELETE" to confirm.')
      return
    }
    if (
      !confirm(
        "This permanently deletes all your data across every Ailox app. Continue?",
      )
    )
      return
    setDeleting(true)
    setErr(null)
    const res = await fetch("/api/account", { method: "DELETE" })
    setDeleting(false)
    if (!res.ok && res.status !== 204) {
      setErr("Failed to delete account.")
      return
    }
    router.replace("/")
    router.refresh()
  }

  async function saveKey() {
    if (!apiKey.trim()) return
    setErr(null)
    setMsg(null)
    const res = await fetch("/api/settings/api-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey.trim(), provider }),
    })
    if (!res.ok) {
      setErr("Failed to save API key.")
      return
    }
    setApiKey("")
    setMsg("API key saved.")
    const s = await fetch("/api/settings/api-key")
    if (s.ok) setKeyStatus(await s.json())
  }

  async function deleteKey() {
    if (!confirm("Remove your API key? AI calls will use the platform key.")) return
    const res = await fetch("/api/settings/api-key", { method: "DELETE" })
    if (!res.ok) {
      setErr("Failed to delete API key.")
      return
    }
    setKeyStatus({ has_custom_key: false })
    setMsg("API key removed.")
  }

  async function savePreferences() {
    setErr(null)
    setMsg(null)
    const res = await fetch("/api/auth/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timezone, summary_hour: summaryHour }),
    })
    if (!res.ok) {
      setErr("Failed to save preferences.")
      return
    }
    setMsg("Preferences saved.")
  }

  async function saveLocale() {
    setErr(null)
    setMsg(null)
    const res = await fetch("/api/auth/locale", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    })
    if (!res.ok) {
      setErr("Failed to save locale.")
      return
    }
    setMsg("Locale saved.")
  }

  return (
    <div className="space-y-8">
      {msg && <p className="text-sm text-emerald-400">{msg}</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}

      <section className="rounded-md border border-white/5 bg-white/2 p-5 space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Account
        </h2>
        {me ? (
          <dl className="text-sm space-y-1 text-slate-300">
            <div className="flex gap-3">
              <dt className="w-24 text-slate-500">User ID</dt>
              <dd className="font-mono text-xs text-slate-400 break-all">
                {me.user_id}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 text-slate-500">Role</dt>
              <dd>{me.role}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 text-slate-500">Providers</dt>
              <dd>{me.providers.join(", ") || "—"}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 text-slate-500">Joined</dt>
              <dd>{new Date(me.created_at).toLocaleDateString()}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-500">Could not load account info.</p>
        )}
        <div className="pt-2">
          <button
            onClick={signOut}
            disabled={signingOut}
            className="text-sm px-3 py-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-50"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </section>

      <section className="rounded-md border border-white/5 bg-white/2 p-5 space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Preferences
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Locale</span>
            <div className="flex gap-2">
              <input
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                placeholder="en-US"
                className="flex-1 rounded border border-white/10 bg-black/30 px-2 py-1 text-sm text-white focus:outline-none"
              />
              <button
                onClick={saveLocale}
                className="text-xs px-2 rounded bg-white/5 hover:bg-white/10 text-slate-200"
              >
                Save
              </button>
            </div>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Timezone (IANA)</span>
            <input
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="America/New_York"
              className="w-full rounded border border-white/10 bg-black/30 px-2 py-1 text-sm text-white focus:outline-none"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-slate-400">
              Daily summary hour (0–23)
            </span>
            <input
              type="number"
              min={0}
              max={23}
              value={summaryHour}
              onChange={(e) => setSummaryHour(Number(e.target.value))}
              className="w-full rounded border border-white/10 bg-black/30 px-2 py-1 text-sm text-white focus:outline-none"
            />
          </label>
        </div>
        <div>
          <button
            onClick={savePreferences}
            className="px-3 py-1.5 text-sm rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white"
          >
            Save preferences
          </button>
        </div>
      </section>

      <section className="rounded-md border border-white/5 bg-white/2 p-5 space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
            API key (BYOK)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Bring your own API key to power all AI features. Stored encrypted.
          </p>
        </div>

        {keyStatus?.has_custom_key ? (
          <div className="flex items-center justify-between rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <div className="text-sm">
              <span className="text-emerald-300">Active</span>{" "}
              <span className="text-slate-400">({keyStatus.provider})</span>{" "}
              <span className="font-mono text-xs text-slate-500">
                {keyStatus.masked_key}
              </span>
            </div>
            <button
              onClick={deleteKey}
              className="text-xs text-slate-400 hover:text-red-400"
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Using the platform API key.
          </p>
        )}

        <div className="flex gap-2">
          <select
            aria-label="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="rounded border border-white/10 bg-black/30 px-2 py-1 text-sm text-slate-200"
          >
            <option value="aliyun">aliyun</option>
            <option value="anthropic">anthropic</option>
            <option value="openai">openai</option>
          </select>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-…"
            className="flex-1 rounded border border-white/10 bg-black/30 px-2 py-1 text-sm text-white focus:outline-none"
          />
          <button
            onClick={saveKey}
            disabled={!apiKey.trim()}
            className="px-3 py-1 text-sm rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </section>

      <section className="rounded-md border border-white/5 bg-white/2 p-5 space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Data export
        </h2>
        <p className="text-xs text-slate-500">
          Download a JSON archive of everything associated with your account —
          events, memories, summaries, and sprintr plans.
        </p>
        <button
          onClick={exportData}
          className="px-3 py-1.5 text-sm rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
        >
          Download my data
        </button>
      </section>

      <section className="rounded-md border border-red-500/30 bg-red-500/5 p-5 space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-red-300">
          Delete account
        </h2>
        <p className="text-xs text-slate-400">
          Permanently delete your account and every piece of data associated
          with it. This cannot be undone.
        </p>
        <div className="flex gap-2">
          <input
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder='Type "DELETE" to confirm'
            className="flex-1 rounded border border-red-500/30 bg-black/30 px-2 py-1 text-sm text-white focus:outline-none"
          />
          <button
            onClick={deleteAccount}
            disabled={deleteConfirm !== "DELETE" || deleting}
            className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700 transition text-white disabled:opacity-40"
          >
            {deleting ? "Deleting…" : "Delete account"}
          </button>
        </div>
      </section>
    </div>
  )
}
