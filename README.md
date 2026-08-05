# Decap CMS + Next.js Demo

A beginner-friendly demo showing how a non-technical editor can update a Next.js website using **Decap CMS** — with **no database**. Content lives as Markdown files in Git.

## How Decap CMS works

1. Page copy is stored as Markdown files in `/content` (committed to GitHub).
2. Editors open `/admin` in the browser — a CMS UI powered by Decap.
3. When they save, Decap commits changes to the GitHub repo.
4. Vercel detects the commit, rebuilds the Next.js site, and the live pages update.

```
Editor → /admin (Decap) → GitHub commit → Vercel rebuild → Live site
```

There is no database. The website reads Markdown at build/request time via `lib/content.ts`.

## Pages

| URL | Content file |
|-----|----------------|
| `/` | `content/home.md` |
| `/about` | `content/about.md` |
| `/services` | `content/services.md` |
| `/contact` | `content/contact.md` |
| `/admin` | Decap CMS admin UI |

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start Next.js

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Start the Decap local backend (separate terminal)

```bash
npm run cms
```

This runs `decap-server`, which lets `/admin` save files to your local disk without GitHub OAuth.

### 4. Open the CMS

Visit [http://localhost:3000/admin/](http://localhost:3000/admin/) (redirects to `/admin/index.html`).

Click **Login with GitHub** — with `local_backend: true` and `decap-server` running, Decap uses the local proxy instead of real GitHub auth.

### 5. Edit content

1. Open **Pages** in the CMS sidebar.
2. Choose **Home**, **About**, **Services**, or **Contact**.
3. Edit fields and save.
4. Refresh the matching page on the site to see updates (Next.js may need a refresh in dev).

Uploaded images go to `public/uploads/` and are served from `/uploads/...`.

## Production: GitHub OAuth

For a deployed site (e.g. Vercel), editors authenticate with GitHub. Decap cannot store the OAuth client secret in the browser, so this project includes two API routes that act as an OAuth proxy:

- `GET /api/auth` — redirects to GitHub authorize
- `GET /api/callback` — exchanges the code for a token and returns it to Decap

### Step A — Create a GitHub OAuth App

1. Go to [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Set:
   - **Homepage URL:** `https://YOUR_VERCEL_DOMAIN`
   - **Authorization callback URL:** `https://YOUR_VERCEL_DOMAIN/api/callback`
4. Copy the **Client ID** and generate a **Client Secret**.

### Step B — Environment variables

Copy `.env.example` and set values in Vercel (Project → Settings → Environment Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_CLIENT_ID` | Yes | OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | Yes | OAuth App client secret |
| `OAUTH_REDIRECT_URL` | No | Defaults to `https://<host>/api/callback` |
| `WEB3FORMS_ACCESS_KEY` | No | Sends contact form emails via [Web3Forms](https://web3forms.com) (free). Without it, submissions still succeed in demo mode. |

### Step C — Update Decap config

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: One-johnson/decap-cms-demo
  branch: main
  base_url: https://YOUR_VERCEL_DOMAIN        # your live domain (no trailing slash)
  auth_endpoint: api/auth
```

Only GitHub users with **write access** to the repository can publish changes.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com).
3. Add the environment variables above.
4. Update `public/admin/config.yml` with your `repo` and `base_url`.
5. Deploy.

## Content flow (CMS → GitHub → Vercel)

1. Editor opens `https://YOUR_SITE/admin/` and logs in with GitHub.
2. They edit a page and click **Publish**.
3. Decap commits the Markdown (and any uploads) to the `main` branch.
4. Vercel receives a webhook from GitHub and starts a new build.
5. Next.js reads the updated files from `/content` and the new content goes live.

## Project structure

```
app/                  Next.js App Router pages + OAuth API routes
components/           Navbar, Footer, Hero, ServiceCards, ContactSection
content/              Markdown source of truth (edited via CMS)
lib/content.ts        Reads Markdown + frontmatter (gray-matter)
public/admin/         Decap CMS UI + config.yml
public/uploads/       CMS media uploads
```

## Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | Start Next.js |
| `npm run cms` | Start Decap local backend |
| `npm run build` | Production build |
| `npm run start` | Serve production build |

## Tips

- Keep `local_backend: true` for local demos; production still uses the GitHub backend when not on localhost.
- After changing Markdown locally outside the CMS, refresh the browser to see updates.
- **Site Settings** in Decap controls brand name, logo, favicon, and nav/footer CTAs.
- **Font sizes, spacing, and layout** stay in code (design system). Content and brand assets are CMS-editable.
- Upload a square PNG for the favicon under Site Settings → Favicon.
- This demo intentionally stays simple: four pages, file-based content, no database.
