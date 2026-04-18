# Ailox Web — Deployment

`ailox-web` is a Next.js 16 app that serves both the marketing site
(`/`, `/apps/*`) and the user-facing Dashboard (`/dashboard/*`).

It runs **alongside** the `favinci-ai-platform` backend on the same ECS host
(or in front of it, in separate containers). The browser only talks to this
Next.js app; Next.js talks to the backend via `FAVINCI_API_URL`.

Recommended topology:

```
                ┌─────────────────────────────────────┐
Browser ───▶ Nginx (TLS)        (same server, or split)
                │
                ├── ailox.favinci.cn      ───▶ Next.js   :3000   (this app)
                └── api.ailox.favinci.cn  ───▶ FastAPI   :8000   (favinci-ai-platform)
```

---

## Local development

```bash
cd ailox-web
npm install
npm run dev    # http://localhost:3000
```

By default the dashboard talks to `http://localhost:8000` (the backend's
uvicorn dev server — see `favinci-ai-platform/docs/deployment.md`).

Override the backend URL via `.env.local`:

```
FAVINCI_API_URL=http://localhost:8000
```

> **Next.js 16 notes.** Several APIs differ from training data:
> - `middleware.ts` is now `proxy.ts`
> - `cookies()` is async — always `await cookies()`
> - Route handler `params` is a Promise — `const { id } = await ctx.params`
>
> Read the relevant guide in `node_modules/next/dist/docs/` before making
> changes to auth / routing / cookies.

---

## Environment variables

| Variable          | Dev default               | Prod value                              |
|-------------------|---------------------------|------------------------------------------|
| `FAVINCI_API_URL` | `http://localhost:8000`   | `https://api.ailox.favinci.cn`          |
| `NODE_ENV`        | `development`             | `production` (sets `Secure` on cookies) |

Set them in `.env.local` (dev) or the systemd / pm2 unit file (prod).

No `NEXT_PUBLIC_*` variables are required — the dashboard talks to the
backend exclusively through server-side Route Handlers (`app/api/*`).

---

## Production build

```bash
npm ci
npm run build
npm run start   # defaults to port 3000
```

`next start` reads the same `.env.production` / environment variables as the
build. Keep the backend (`favinci-ai-platform`) reachable at
`$FAVINCI_API_URL` from the machine running `next start`.

---

## Running on ECS (systemd + Nginx)

The steps below assume you already have the backend running per
`favinci-ai-platform/docs/deployment.md` (Docker + Nginx + Certbot).

### 1. Install Node.js 20+ on the server

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -   # RHEL/AlmaLinux
sudo yum install -y nodejs

# or Ubuntu:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

node --version   # v20.x
```

### 2. Clone + build

```bash
sudo mkdir -p /srv/ailox && sudo chown $USER /srv/ailox
cd /srv/ailox
git clone <repo-url> ailox
cd ailox/ailox-web

npm ci
npm run build
```

### 3. Create a `.env.production.local`

```bash
cat > /srv/ailox/ailox/ailox-web/.env.production.local <<'EOF'
FAVINCI_API_URL=https://api.ailox.favinci.cn
NODE_ENV=production
EOF
```

### 4. systemd unit

```bash
sudo tee /etc/systemd/system/ailox-web.service <<'EOF'
[Unit]
Description=Ailox Web (Next.js)
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/ailox/ailox/ailox-web
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/srv/ailox/ailox/ailox-web/.env.production.local
ExecStart=/usr/bin/node node_modules/next/dist/bin/next start -p 3000
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now ailox-web
sudo systemctl status ailox-web
```

Check logs: `journalctl -u ailox-web -f`

### 5. Nginx vhost for `ailox.favinci.cn`

```bash
sudo tee /etc/nginx/sites-available/ailox-web.conf <<'EOF'
server {
    listen 80;
    server_name ailox.favinci.cn;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_read_timeout 120s;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/ailox-web.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. HTTPS with Certbot

```bash
sudo certbot --nginx -d ailox.favinci.cn
sudo certbot renew --dry-run
```

### 7. Configure the backend to allow this origin

The backend already allow-lists `https://ailox.favinci.cn` in
`favinci-ai-platform/backend/api/main.py`. If you deploy under a different
host, set `CORS_ALLOWED_ORIGINS` on the **backend**:

```
CORS_ALLOWED_ORIGINS=https://ailox.example.com,https://staging.example.com
```

Restart the backend: `docker compose restart api`.

> Strictly speaking the browser never sees the backend origin (Next.js
> proxies every request), so CORS is mostly a defence-in-depth concern.

---

## Updating the deployed site

```bash
cd /srv/ailox/ailox
git pull
cd ailox-web
npm ci
npm run build
sudo systemctl restart ailox-web
```

`next start` reads the freshly built `.next` directory on restart; no cache
needs purging.

---

## Smoke test checklist

After a deploy, verify:

1. `curl -I https://ailox.favinci.cn/` → `200`
2. `/login` loads and a new email registration works end-to-end.
3. `/dashboard` shows Overview with recent events + daily summaries.
4. `/dashboard/loopnote` can create, edit, delete a note.
5. `/dashboard/sprintr` can create a project → milestone → sprint.
6. `/dashboard/search` returns results for a known query.
7. `/dashboard/settings`:
   - Save a test BYOK key (remove immediately after).
   - Trigger "Download my data" and sanity-check the JSON.
   - Preferences PATCH returns without error.
   - **Do not** exercise the Delete-account button against a real user.
8. Top-right Dashboard button on `/` appears only when logged in.

---

## Deploying on Vercel

Vercel hosts the marketing site + Dashboard, while the backend stays on
Aliyun ECS. The Next.js server (on Vercel) proxies every `/api/*` call
through to `FAVINCI_API_URL`, so the backend **must be publicly reachable
over HTTPS** from Vercel's egress nodes.

### Required env vars

Dashboard → Project → **Settings → Environment Variables**:

| Variable          | Value                                  | Scope |
|-------------------|----------------------------------------|-------|
| `FAVINCI_API_URL` | `https://api.ailox.favinci.cn` (no trailing slash) | Production + Preview + Development |

After adding, **Redeploy** — env var changes do not apply to existing
deployments.

### Common failure: `ECONNREFUSED 127.0.0.1:8000`

Symptom: login page shows "Invalid email or password." (the client's
fallback when the upstream fetch throws), backend logs show nothing.

Cause: `FAVINCI_API_URL` is unset, so `lib/dashboard/config.ts` falls
back to `http://localhost:8000` — which points at the Vercel function's
own container, not the Aliyun backend.

Fix: set `FAVINCI_API_URL` as above, then redeploy.

### Prerequisites on the Aliyun side

- Backend must be reachable at `https://api.ailox.favinci.cn` from the
  public internet (Nginx + Certbot, security group 443 open to `0.0.0.0/0`).
- Backend CORS allow-list must include `https://ailox.vercel.app` (or
  whatever Vercel domain is in use). CORS matters even though Next.js
  proxies server-side, because some dashboard calls are executed from
  the browser when latency matters — see "Free-tier cost notes" below.
- Verify reachability before configuring Vercel:
  ```bash
  curl -i https://api.ailox.favinci.cn/health
  ```

### Free-tier cost notes (Hobby plan)

Vercel Hobby has these monthly caps — relevant because the dashboard's
usage pattern (every panel = one Route Handler = one Function call)
burns through them faster than a typical marketing site:

- 100 GB-hours Function execution
- 100 GB bandwidth
- 1M Edge Middleware invocations
- 1000 Image Optimizations
- **No commercial use** — if the product starts earning revenue, upgrade
  to Pro ($20/mo) to stay ToS-compliant

Watch-outs specific to this repo:

- **Loopnote images** — do not route user-uploaded images through
  `/_next/image`. Serve them from the backend / OSS directly. 1000 optimizations
  disappears in an afternoon if every review card hits the optimizer.
- **Dashboard read-only panels** — when usage grows, consider moving
  pure-GET data fetches (events list, summaries) to client-side `fetch`
  against the backend directly (requires backend CORS), so they don't
  consume Vercel Function GB-hours. Keep login / write / cookie-mutating
  calls on the server-side Route Handlers.
- **Stay on Vercel** for the marketing pages (`/`, `/apps/*`) regardless —
  they're static, the CDN is good, and they cost effectively nothing.
- Migration trigger: if usage dashboard hits ~50% of any limit, start
  planning to move `/dashboard` next to the backend on Aliyun (same
  systemd unit as the self-hosted path above).

---

## Rollback

```bash
cd /srv/ailox/ailox
git log --oneline -10
git checkout <previous-good-sha>
cd ailox-web
npm ci
npm run build
sudo systemctl restart ailox-web
```

Next.js builds are self-contained in `.next/`, so rolling back the repo +
rebuilding is sufficient. The backend / database are untouched.
