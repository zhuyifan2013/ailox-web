import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, ctx: Ctx) {
  const { id } = await ctx.params
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "bad_body" }, { status: 400 })
  const res = await backendFetch(`/sprintr/sprints/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}

export async function DELETE(_: Request, ctx: Ctx) {
  const { id } = await ctx.params
  const res = await backendFetch(`/sprintr/sprints/${id}`, { method: "DELETE" })
  if (res.status === 204) return new NextResponse(null, { status: 204 })
  const text = await res.text()
  return new NextResponse(text, { status: res.status })
}
