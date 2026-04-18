import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/dashboard/config"
import { clearSessionCookies, readRefreshToken } from "@/lib/dashboard/session"

export async function POST() {
  const refresh = await readRefreshToken()
  if (refresh) {
    // Fire-and-forget server-side revocation. Even if the upstream call
    // fails we still clear local cookies so the user is logged out locally.
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
        cache: "no-store",
      })
    } catch {}
  }
  await clearSessionCookies()
  return NextResponse.json({ ok: true })
}
