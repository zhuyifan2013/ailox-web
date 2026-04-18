"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/loopnote", label: "Loopnote" },
  { href: "/dashboard/sprintr", label: "Sprintr" },
  { href: "/dashboard/search", label: "Search" },
  { href: "/dashboard/settings", label: "Settings" },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    startTransition(() => {
      router.replace("/login")
      router.refresh()
    })
  }

  return (
    <aside className="w-60 shrink-0 border-r border-white/5 bg-black/20 px-4 py-8 flex flex-col">
      <Link href="/" className="text-lg font-semibold text-white mb-10 px-2">
        Ailox
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-[#8B7FD4]/15 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button
          onClick={logout}
          disabled={pending}
          className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-50"
        >
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  )
}
