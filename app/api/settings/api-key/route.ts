import { NextResponse } from "next/server"
import { backendFetch, readUserId } from "@/lib/dashboard/session"

export async function GET() {
  const userId = await readUserId()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const res = await backendFetch(
    `/settings/api-key?user_id=${encodeURIComponent(userId)}`,
  )
  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: res.status })
  }
  return NextResponse.json(await res.json())
}

export async function POST(request: Request) {
  const userId = await readUserId()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const body = await request.json().catch(() => null)
  if (!body || !body.api_key) {
    return NextResponse.json({ error: "bad_body" }, { status: 400 })
  }
  const res = await backendFetch("/settings/api-key", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      api_key: body.api_key,
      provider: body.provider ?? "aliyun",
    }),
  })
  if (res.status === 204) return new NextResponse(null, { status: 204 })
  const text = await res.text()
  return new NextResponse(text, { status: res.status })
}

export async function DELETE() {
  const userId = await readUserId()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const res = await backendFetch(
    `/settings/api-key?user_id=${encodeURIComponent(userId)}`,
    { method: "DELETE" },
  )
  if (res.status === 204) return new NextResponse(null, { status: 204 })
  const text = await res.text()
  return new NextResponse(text, { status: res.status })
}
