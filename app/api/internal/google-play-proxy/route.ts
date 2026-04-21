/**
 * POST /api/internal/google-play-proxy
 *
 * Called by the backend (which can't reach Google from mainland China) to
 * verify a Google Play subscription. Vercel can reach Google, so we do the
 * OAuth token exchange + subscriptionsv2.get here and return the result.
 *
 * Auth: X-Internal-Secret header must match SOCIAL_VERIFY_PROXY_SECRET.
 *
 * Body: {
 *   service_account: { client_email, private_key },
 *   package_name: string,
 *   purchase_token: string,
 * }
 *
 * Response (200): raw subscriptionsv2 JSON from Google Play API
 */

export const runtime = "nodejs"

const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"
const PLAY_API_BASE =
  "https://androidpublisher.googleapis.com/androidpublisher/v3"
const SCOPE = "https://www.googleapis.com/auth/androidpublisher"

export async function POST(request: Request) {
  const expected = process.env.SOCIAL_VERIFY_PROXY_SECRET
  if (!expected) {
    return Response.json({ error: "proxy_not_configured" }, { status: 500 })
  }
  if (request.headers.get("x-internal-secret") !== expected) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as {
    service_account?: { client_email?: string; private_key?: string }
    package_name?: string
    purchase_token?: string
  } | null

  if (
    !body?.service_account?.client_email ||
    !body.service_account.private_key ||
    !body.package_name ||
    !body.purchase_token
  ) {
    return Response.json({ error: "invalid_body" }, { status: 400 })
  }

  const service_account = body.service_account as { client_email: string; private_key: string }
  const package_name = body.package_name as string
  const purchase_token = body.purchase_token as string

  // 1. Sign JWT and exchange for access token.
  const now = Math.floor(Date.now() / 1000)
  const claims = {
    iss: service_account.client_email,
    scope: SCOPE,
    aud: OAUTH_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }

  let accessToken: string
  try {
    const assertion = await signJwt(claims, service_account.private_key)
    const tokenResp = await fetch(OAUTH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
      cache: "no-store",
    })
    if (!tokenResp.ok) {
      const detail = await tokenResp.text()
      return Response.json(
        { error: "oauth_failed", detail },
        { status: 502 },
      )
    }
    const tokenBody = (await tokenResp.json()) as { access_token: string }
    accessToken = tokenBody.access_token
  } catch (e) {
    return Response.json(
      { error: "oauth_error", detail: String(e) },
      { status: 502 },
    )
  }

  // 2. Call subscriptionsv2.get
  const url = `${PLAY_API_BASE}/applications/${package_name}/purchases/subscriptionsv2/tokens/${purchase_token}`
  const playResp = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  })

  const playBody = await playResp.text()
  return new Response(playBody, {
    status: playResp.status,
    headers: { "Content-Type": "application/json" },
  })
}

// Minimal RS256 JWT signing using Web Crypto API (available in Node.js 18+).
async function signJwt(
  claims: Record<string, unknown>,
  privateKeyPem: string,
): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" }
  const enc = (obj: unknown) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")

  const signingInput = `${enc(header)}.${enc(claims)}`

  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "")
  const keyDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0))

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  )

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  )

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return `${signingInput}.${sigB64}`
}
