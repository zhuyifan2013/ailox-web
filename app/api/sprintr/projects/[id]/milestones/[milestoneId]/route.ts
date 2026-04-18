import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

type Ctx = { params: Promise<{ id: string; milestoneId: string }> }

export async function PUT(request: Request, ctx: Ctx) {
  const { id, milestoneId } = await ctx.params
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "bad_body" }, { status: 400 })
  const res = await backendFetch(
    `/sprintr/projects/${id}/milestones/${milestoneId}`,
    { method: "PUT", body: JSON.stringify(body) },
  )
  const text = await res.text()
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}
