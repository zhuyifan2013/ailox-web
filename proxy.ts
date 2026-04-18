/**
 * Next 16 Proxy (formerly Middleware).
 *
 * Gates /dashboard/* on presence of an auth cookie. This is an optimistic
 * check — actual access-token validity is re-checked inside pages/route
 * handlers, where we can refresh on 401. Treat this solely as a redirect
 * for obviously-unauthenticated visits.
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { COOKIE_REFRESH } from "./lib/dashboard/config"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Logged-in user hitting /login or /register → bounce to dashboard.
  if (pathname === "/login" || pathname === "/register") {
    if (request.cookies.get(COOKIE_REFRESH)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Dashboard guard.
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!request.cookies.get(COOKIE_REFRESH)) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/register"],
}
