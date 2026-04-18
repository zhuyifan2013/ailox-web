import { NextResponse } from "next/server"
import { backendFetch, readUserId } from "@/lib/dashboard/session"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q") ?? ""
  const limit = url.searchParams.get("limit") ?? "10"
  const userId = await readUserId()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const qs = new URLSearchParams({ user_id: userId, q, limit })
  const res = await backendFetch(`/search?${qs.toString()}`)
  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: res.status })
  }
  return NextResponse.json(await res.json())
}
