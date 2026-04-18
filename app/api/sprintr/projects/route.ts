import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

export async function GET() {
  const res = await backendFetch("/sprintr/projects")
  if (!res.ok) {
    return NextResponse.json({ error: "upstream" }, { status: res.status })
  }
  return NextResponse.json(await res.json())
}
