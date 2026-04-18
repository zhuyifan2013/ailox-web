import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "bad_body" }, { status: 400 })
  const res = await backendFetch("/auth/me/preferences", {
    method: "PATCH",
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}
