import { NextResponse } from "next/server"
import { API_BASE_URL, SOURCE_APP } from "@/lib/dashboard/config"
import {
  clearSessionCookies,
  readRefreshToken,
  setSessionCookies,
} from "@/lib/dashboard/session"
import type { AuthTokens } from "@/lib/dashboard/session"

/**
 * POST /api/auth/refresh
 * Primarily used by the client when it detects a 401 from any /api/*
 * call — though for dashboard reads we prefer the server-side refresh
 * already baked into `backendFetch`. Exposed for completeness.
 */
export async function POST() {
  const refresh = await readRefreshToken()
  if (!refresh) {
    return NextResponse.json({ error: "no_refresh_token" }, { status: 401 })
  }

  const res = await fetch(`${API_BASE_URL}/auth/refresh?app=${SOURCE_APP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
    cache: "no-store",
  })

  if (!res.ok) {
    await clearSessionCookies()
    return NextResponse.json({ error: "refresh_failed" }, { status: 401 })
  }

  const tokens = (await res.json()) as AuthTokens
  await setSessionCookies(tokens)
  return NextResponse.json({ user_id: tokens.user_id })
}
