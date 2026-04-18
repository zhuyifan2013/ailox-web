import { redirect } from "next/navigation"
import { readRefreshToken } from "@/lib/dashboard/session"
import { DashboardNav } from "@/components/dashboard/DashboardNav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Belt-and-suspenders alongside proxy.ts; if the refresh cookie went
  // missing mid-render we still bounce to login rather than render empty.
  if (!(await readRefreshToken())) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0f] text-[#f8fafc]">
      <DashboardNav />
      <div className="flex-1 min-w-0">
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      </div>
    </div>
  )
}
