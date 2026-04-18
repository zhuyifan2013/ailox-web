import { NextResponse } from "next/server"
import { backendFetch, clearSessionCookies } from "@/lib/dashboard/session"

export async function DELETE() {
  const res = await backendFetch("/account", { method: "DELETE" })
  if (res.status !== 204 && !res.ok) {
    const text = await res.text()
    return new NextResponse(text, { status: res.status })
  }
  await clearSessionCookies()
  return new NextResponse(null, { status: 204 })
}
