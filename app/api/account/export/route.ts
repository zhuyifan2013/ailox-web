import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

export async function GET() {
  const res = await backendFetch("/account/export")
  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: res.status })
  }
  const body = await res.arrayBuffer()
  const filename =
    res.headers.get("Content-Disposition") ??
    'attachment; filename="ailox-export.json"'
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": filename,
    },
  })
}
