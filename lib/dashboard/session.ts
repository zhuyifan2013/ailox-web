/**
 * Server-side helpers for reading/writing the dashboard auth session.
 * Used by route handlers under /api/auth/* and by server components that
 * need the current user id.
 */

import { cookies } from "next/headers"
import {
  ACCESS_TTL_SECONDS,
  API_BASE_URL,
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  COOKIE_USER,
  REFRESH_TTL_SECONDS,
  SOURCE_APP,
  cookieOptions,
} from "./config"

export type AuthTokens = {
  access_token: string
  refresh_token: string
  user_id: string
  role: string
  source_app: string
}

export async function setSessionCookies(tokens: AuthTokens) {
  const store = await cookies()
  store.set(COOKIE_ACCESS, tokens.access_token, cookieOptions(ACCESS_TTL_SECONDS))
  store.set(COOKIE_REFRESH, tokens.refresh_token, cookieOptions(REFRESH_TTL_SECONDS))
  // user_id is non-sensitive — kept httpOnly purely for consistency.
  store.set(COOKIE_USER, tokens.user_id, cookieOptions(REFRESH_TTL_SECONDS))
}

export async function clearSessionCookies() {
  const store = await cookies()
  store.delete(COOKIE_ACCESS)
  store.delete(COOKIE_REFRESH)
  store.delete(COOKIE_USER)
}

export async function readAccessToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(COOKIE_ACCESS)?.value ?? null
}

export async function readRefreshToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(COOKIE_REFRESH)?.value ?? null
}

export async function readUserId(): Promise<string | null> {
  const store = await cookies()
  return store.get(COOKIE_USER)?.value ?? null
}

/**
 * Call the backend with the current access token. On 401, attempt a
 * one-shot refresh using the stored refresh token, then retry.
 *
 * Returns the raw Response; caller decides how to parse.
 */
export async function backendFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const doFetch = async (accessToken: string | null) => {
    const headers = new Headers(init.headers)
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
    if (!headers.has("Content-Type") && init.body) {
      headers.set("Content-Type", "application/json")
    }
    return fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    })
  }

  let access = await readAccessToken()
  let res = await doFetch(access)
  if (res.status !== 401) return res

  const refresh = await readRefreshToken()
  if (!refresh) return res

  const refreshRes = await fetch(
    `${API_BASE_URL}/auth/refresh?app=${SOURCE_APP}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
      cache: "no-store",
    },
  )
  if (!refreshRes.ok) {
    await clearSessionCookies()
    return res
  }
  const tokens = (await refreshRes.json()) as AuthTokens
  await setSessionCookies(tokens)
  return doFetch(tokens.access_token)
}
