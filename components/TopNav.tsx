import Link from "next/link"
import { readRefreshToken } from "@/lib/dashboard/session"

export async function TopNav() {
  const loggedIn = (await readRefreshToken()) !== null

  return (
    <div className="fixed top-0 right-0 z-50 p-4 flex gap-2">
      {loggedIn ? (
        <Link
          href="/dashboard"
          className="px-3 py-1.5 text-sm rounded-md bg-[#8B7FD4]/80 hover:bg-[#8B7FD4] transition text-white backdrop-blur"
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            className="px-3 py-1.5 text-sm rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition backdrop-blur"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-3 py-1.5 text-sm rounded-md bg-[#8B7FD4]/80 hover:bg-[#8B7FD4] transition text-white backdrop-blur"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  )
}
