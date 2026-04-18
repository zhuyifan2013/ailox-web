import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

/** GET /api/events?type=note&limit=30&before=<iso> */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const qs = url.search // includes leading "?"
  const res = await backendFetch(`/events${qs}`)
  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: res.status })
  }
  return NextResponse.json(await res.json())
}

/** POST /api/events  body: { type, content, metadata? } */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "bad_body" }, { status: 400 })
  const res = await backendFetch("/events", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}
