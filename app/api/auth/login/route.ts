import { NextResponse } from "next/server"
import { API_BASE_URL, SOURCE_APP } from "@/lib/dashboard/config"
import { setSessionCookies } from "@/lib/dashboard/session"
import type { AuthTokens } from "@/lib/dashboard/session"

/**
 * POST /api/auth/login
 * Body: { method: "email", email, password }  — P0 only supports email.
 *
 * The `method` discriminator is the extension point for future sms / apple /
 * wechat flows; add cases as they come online without changing the client API.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { method?: string; email?: string; password?: string }
    | null

  if (!body) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const method = body.method ?? "email"
  let upstreamPath: string
  let upstreamBody: Record<string, unknown>

  switch (method) {
    case "email":
      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: "email_and_password_required" },
          { status: 400 },
        )
      }
      upstreamPath = "/auth/login/email"
      upstreamBody = { email: body.email, password: body.password }
      break
    // sms / apple / wechat land here when wired up.
    default:
      return NextResponse.json(
        { error: `unsupported_method:${method}` },
        { status: 400 },
      )
  }

  const res = await fetch(`${API_BASE_URL}${upstreamPath}?app=${SOURCE_APP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(upstreamBody),
    cache: "no-store",
  })

  if (!res.ok) {
    const detail = await res.text()
    return NextResponse.json(
      { error: "auth_failed", detail },
      { status: res.status },
    )
  }

  const tokens = (await res.json()) as AuthTokens
  await setSessionCookies(tokens)
  return NextResponse.json({ user_id: tokens.user_id, role: tokens.role })
}
