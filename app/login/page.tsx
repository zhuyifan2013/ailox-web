"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Script from "next/script"

// Google Identity Services — loaded from gsi/client via next/script. The
// library mounts `window.google.accounts.id` once ready.
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? ""

// Minimal typing for the subset of GIS we touch. Avoids an ambient
// @types/google.accounts dep.
type GoogleCredentialResponse = { credential: string }
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (r: GoogleCredentialResponse) => void
          }) => void
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>,
          ) => void
        }
      }
    }
  }
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get("next") ?? "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [gisReady, setGisReady] = useState(false)
  const googleBtnRef = useRef<HTMLDivElement>(null)

  const onGoogleCredential = useCallback(
    async (r: GoogleCredentialResponse) => {
      setError(null)
      setLoading(true)
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "google", id_token: r.credential }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          setError(body?.detail || "Google sign-in failed.")
          return
        }
        router.replace(next)
        router.refresh()
      } catch {
        setError("Network error. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [next, router],
  )

  useEffect(() => {
    if (!gisReady || !GOOGLE_CLIENT_ID || !googleBtnRef.current) return
    const gis = window.google?.accounts.id
    if (!gis) return
    gis.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: onGoogleCredential,
    })
    gis.renderButton(googleBtnRef.current, {
      theme: "filled_black",
      size: "large",
      type: "standard",
      shape: "rectangular",
      text: "continue_with",
      width: 320,
    })
  }, [gisReady, onGoogleCredential])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "email", email, password }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body?.detail || "Invalid email or password.")
        return
      }
      router.replace(next)
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">Welcome back</h1>
        <p className="text-slate-400 text-sm mb-8">Log in to your Ailox dashboard.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </Field>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#8B7FD4] hover:bg-[#7B6FC4] transition text-white font-medium py-2.5 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {GOOGLE_CLIENT_ID && (
          <>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div ref={googleBtnRef} className="flex justify-center" />
            <Script
              src="https://accounts.google.com/gsi/client"
              strategy="afterInteractive"
              onLoad={() => setGisReady(true)}
            />
          </>
        )}

        <p className="text-sm text-slate-400 mt-6 text-center">
          No account?{" "}
          <Link href="/register" className="text-[#A99EE8] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  )
}

const inputClass =
  "w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8B7FD4]/60 focus:ring-1 focus:ring-[#8B7FD4]/40"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300 mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
