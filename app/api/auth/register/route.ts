import { NextResponse } from "next/server"
import { API_BASE_URL, SOURCE_APP } from "@/lib/dashboard/config"
import { setSessionCookies } from "@/lib/dashboard/session"
import type { AuthTokens } from "@/lib/dashboard/session"

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null
  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: "email_and_password_required" },
      { status: 400 },
    )
  }

  const res = await fetch(`${API_BASE_URL}/auth/register?app=${SOURCE_APP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: body.email, password: body.password }),
    cache: "no-store",
  })

  if (!res.ok) {
    const detail = await res.text()
    return NextResponse.json(
      { error: "register_failed", detail },
      { status: res.status },
    )
  }

  const tokens = (await res.json()) as AuthTokens
  await setSessionCookies(tokens)
  return NextResponse.json({ user_id: tokens.user_id, role: tokens.role })
}
