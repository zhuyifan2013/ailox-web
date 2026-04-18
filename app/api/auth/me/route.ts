import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/dashboard/session"

export async function GET() {
  const res = await backendFetch("/auth/me")
  if (!res.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: res.status })
  }
  return NextResponse.json(await res.json())
}
