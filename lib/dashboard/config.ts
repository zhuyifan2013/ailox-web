/**
 * Dashboard auth / API configuration.
 *
 * API_BASE_URL points at the favinci-ai-platform backend. In development
 * it defaults to localhost:8000; in production it should be set via the
 * FAVINCI_API_URL env var (server-side) to https://api.ailox.favinci.cn.
 *
 * Cookie scheme (all httpOnly, not accessible to JS):
 *   ailox_access   — JWT access token, 30d
 *   ailox_refresh  — opaque refresh token, 180d
 *   ailox_user     — user_id (non-sensitive, convenience)
 */

export const API_BASE_URL =
  process.env.FAVINCI_API_URL ?? "http://localhost:8000"

export const SOURCE_APP = "ailox-web"

export const COOKIE_ACCESS = "ailox_access"
export const COOKIE_REFRESH = "ailox_refresh"
export const COOKIE_USER = "ailox_user"

// Seconds — keep refresh cookie slightly shorter than the backend's 180d
// so we re-authenticate a few days before the server-side token expires.
export const ACCESS_TTL_SECONDS = 60 * 60 * 24 * 30 // 30d
export const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 175 // ~175d

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  }
}
