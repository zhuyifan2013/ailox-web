# Ailox Web — Dashboard

The dashboard lives under `/dashboard` inside the `ailox-web` Next.js app. It
aggregates user data across every Ailox app (Loopnote, Sprintr, …) on a single
web surface and supports the full app-equivalent CRUD for each, plus search,
BYOK key management, data export, and account deletion.

All HTTP between the browser and the backend goes through thin Next.js route
handlers under `app/api/*`. The browser never talks to the backend directly —
this keeps JWT + refresh tokens in `httpOnly` cookies and lets us handle
transparent 401 retry server-side.

---

## Auth model

| Cookie         | Contents                        | TTL   | Notes                     |
|----------------|---------------------------------|-------|---------------------------|
| `ailox_access` | JWT (30d expiry)                | 30d   | httpOnly, secure in prod  |
| `ailox_refresh`| Opaque refresh token (180d)     | ~175d | httpOnly, rotation on use |
| `ailox_user`   | `user_id` (convenience, non-sensitive) | ~175d | httpOnly                |

- `source_app` is hard-coded to `"ailox-web"` and sent to the backend when
  logging in (`POST /auth/login/email?app=ailox-web`).
- `proxy.ts` guards `/dashboard/*` — unauthenticated users are redirected to
  `/login`; already-logged-in users on `/login` or `/register` bounce to
  `/dashboard`.
- `lib/dashboard/session.ts::backendFetch()` is the single entry point every
  `/api/*` route uses. On 401 it rotates the refresh token and retries once,
  writing new cookies back transparently. If refresh itself fails, session
  cookies are cleared and the original 401 is returned.

### Login flow (future-proof for SMS / Apple / WeChat)

`POST /api/auth/login` accepts a `method` discriminator in the body:

```json
{ "method": "email", "email": "...", "password": "..." }
```

Only `email` is wired up today. Adding `sms` / `apple` / `wechat` means adding
a new branch in `app/api/auth/login/route.ts` and pointing it at the
corresponding backend route (`/auth/login/apple`, `/auth/login/wechat`, …).
No dashboard UI changes are needed until we actually ship those login buttons.

---

## Pages

| Route                    | Description                                         |
|--------------------------|-----------------------------------------------------|
| `/dashboard`             | Overview — recent events + daily summaries          |
| `/dashboard/loopnote`    | Loopnote notes (`/events?type=note`) full CRUD      |
| `/dashboard/sprintr`     | Sprintr Projects → Milestones → Sprints CRUD tree   |
| `/dashboard/search`      | Semantic search (events + memories + similarity)    |
| `/dashboard/settings`    | BYOK key, preferences (tz/locale/hour), export, delete account |

Pages are React Server Components that load initial data via `backendFetch()`
and hand it to a `"use client"` component for interactivity. Mutations always
go through `/api/*` routes — clients never fetch the backend directly.

---

## Proxy routes

All routes under `ailox-web/app/api/` are thin proxies. They:

1. Resolve the user via cookies (`readUserId`, `readAccessToken`).
2. Forward to the backend via `backendFetch()` (handles 401 retry).
3. Stream back status + body. 204 responses are preserved.

| `/api/*` route                         | Backend                          |
|----------------------------------------|----------------------------------|
| `/api/auth/login`                      | `/auth/login/<method>?app=ailox-web` |
| `/api/auth/register`                   | `/auth/register?app=ailox-web`   |
| `/api/auth/refresh`                    | `/auth/refresh?app=ailox-web`    |
| `/api/auth/logout`                     | `/auth/logout`                   |
| `/api/auth/me`                         | `/auth/me`                       |
| `/api/auth/locale`                     | `PUT /auth/me/locale`            |
| `/api/auth/preferences`                | `PATCH /auth/me/preferences`     |
| `/api/events` + `/api/events/[id]`     | `/events` CRUD                   |
| `/api/sprintr/projects`                | `/sprintr/projects`              |
| `/api/sprintr/projects/[id]`           | `/sprintr/projects/{id}`         |
| `/api/sprintr/projects/[id]/milestones/[milestoneId]` | `PUT /sprintr/projects/{id}/milestones/{id}` |
| `/api/sprintr/milestones/[id]`         | `PATCH/DELETE /sprintr/milestones/{id}` |
| `/api/sprintr/milestones/[id]/sprints/[sprintId]` | `PUT /sprintr/milestones/{id}/sprints/{id}` |
| `/api/sprintr/sprints/[id]`            | `PATCH/DELETE /sprintr/sprints/{id}` |
| `/api/search?q=…`                      | `/search?user_id=…&q=…`          |
| `/api/settings/api-key` GET/POST/DELETE | `/settings/api-key` (BYOK)      |
| `/api/account/export`                  | `/account/export` (JSON download) |
| `/api/account` DELETE                  | `DELETE /account` (CASCADE purge) |

---

## Environment variables

| Variable          | Required | Description                                    |
|-------------------|----------|------------------------------------------------|
| `FAVINCI_API_URL` | prod     | Backend base URL (e.g. `https://api.ailox.favinci.cn`). Defaults to `http://localhost:8000` for local dev. |
| `NODE_ENV`        | auto     | When `production`, cookies are set with `Secure`. |

No client-side-visible env vars are required — all backend calls happen
server-side via Route Handlers.

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md).
