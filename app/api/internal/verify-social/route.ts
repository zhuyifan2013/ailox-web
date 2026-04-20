import { NextResponse } from "next/server"

/**
 * POST /api/internal/verify-social
 *
 * Called by the backend (which lives in-region and can't reach Google) to
 * verify a social id_token. Vercel CAN reach Google, so we do the network
 * hop here and hand verified claims back.
 *
 * Auth: X-Internal-Secret header must match SOCIAL_VERIFY_PROXY_SECRET.
 * This is a shared secret between backend and this route — do not expose
 * this endpoint to the public internet without it.
 *
 * Body: { provider: "google", token: "<id_token>" }
 * Response (200): { sub, email, email_verified, aud, iss }
 */

export const runtime = "nodejs"

const GOOGLE_TOKENINFO = "https://oauth2.googleapis.com/tokeninfo"

export async function POST(request: Request) {
  const expected = process.env.SOCIAL_VERIFY_PROXY_SECRET
  if (!expected) {
    return NextResponse.json(
      { error: "proxy_not_configured" },
      { status: 500 },
    )
  }
  if (request.headers.get("x-internal-secret") !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as
    | { provider?: string; token?: string }
    | null
  if (!body?.provider || !body.token) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  if (body.provider === "google") {
    return verifyGoogle(body.token)
  }
  return NextResponse.json(
    { error: `unsupported_provider:${body.provider}` },
    { status: 400 },
  )
}

async function verifyGoogle(idToken: string) {
  // tokeninfo does full signature + expiry + issuer validation for us and
  // returns the decoded claims. We still need to check aud against our
  // whitelist — tokeninfo accepts any Google-issued token regardless of
  // client id.
  const resp = await fetch(
    `${GOOGLE_TOKENINFO}?id_token=${encodeURIComponent(idToken)}`,
    { cache: "no-store" },
  )
  if (!resp.ok) {
    return NextResponse.json(
      { error: "invalid_token", detail: await resp.text() },
      { status: 401 },
    )
  }
  const claims = (await resp.json()) as {
    sub?: string
    email?: string
    email_verified?: string | boolean
    aud?: string
    iss?: string
  }

  const allowed = (process.env.GOOGLE_CLIENT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  if (allowed.length > 0 && claims.aud && !allowed.includes(claims.aud)) {
    return NextResponse.json({ error: "aud_mismatch" }, { status: 401 })
  }

  if (!claims.sub) {
    return NextResponse.json({ error: "missing_sub" }, { status: 401 })
  }

  // tokeninfo returns email_verified as the string "true"/"false".
  const emailVerified =
    claims.email_verified === true || claims.email_verified === "true"

  return NextResponse.json({
    sub: claims.sub,
    email: claims.email ?? null,
    email_verified: emailVerified,
    aud: claims.aud ?? null,
    iss: claims.iss ?? null,
  })
}
