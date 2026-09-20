# GCUA Website

Website for **Great Commission University of America (GCUA)**, built with
Next.js and Keystatic. Content is edited in Keystatic and committed to this GitHub
repository; the hosting platform (Vercel) builds and deploys every commit.

Existing production content source: <https://gcits.org> (WordPress) — content is
migrated only when verified (see `docs/CONTENT.md`).

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Hand-written CSS (`app/globals.css`, `infographics.css`, `site-content.css`) |
| CMS | Keystatic (`@keystatic/core`, `@keystatic/next`) — GitHub storage |
| Content | YAML + Markdoc (`.mdoc`) under `content/` |
| Hosting | Vercel |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |

## Requirements

* Node.js >= 20.9
* npm (uses `package-lock.json`)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

Scripts:

```bash
npm run dev          # development server
npm run build        # production build (includes Next.js type checking)
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit (run after build; needs .next/types)
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. Never commit real values.

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
NEXT_PUBLIC_SITE_URL
```

Without the Keystatic variables the public site still builds and runs; `/api/keystatic/*`
returns 503 and the CMS is unavailable.

## Content Management (Keystatic)

Keystatic uses the `gcuaus/university` GitHub repository as storage, so it requires
GitHub authentication and commits edits through GitHub.

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
2. Callback URL: `http://127.0.0.1:3000/api/keystatic/github/oauth/callback`.
3. Copy `.env.example` to `.env.local` and set the OAuth client ID, client secret, and a
   long random `KEYSTATIC_SECRET`.
4. `npm run dev`, open <http://localhost:3000/keystatic>, then use Keystatic's
   "Create GitHub App" flow. Install it on `gcuaus/university` and put its slug in
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, then restart the dev server.
5. For production, add the same variables to the hosting provider and register
   `https://staging.gcua.us/api/keystatic/github/oauth/callback`.

The OAuth App must be authorized by an account with write access to the repository.
Do not put a GitHub password, OAuth secret, or personal access token in this repository.

Content models are defined in `keystatic.config.ts`; rendered content lives under
`content/` (homepage singleton, about/FAQs, pages, posts, faculty, programs, location,
contact, infographics, hero slides).

## Routes

```text
/                  homepage
/about             About (+ /about/[slug] articles)
/programs          Programs
/faculty           Faculty
/location          Location
/blog              News listing (+ /blog/[slug] articles)
/contact           Contact
/keystatic         CMS admin (requires GitHub sign-in)
/sitemap.xml /robots.txt
```

## Deployment

Hosting is Vercel (`vercel.json`); pushes to `main` deploy automatically. CI runs lint,
build, and typecheck on pull requests and on `main`. See `docs/DEPLOYMENT.md` for
environment variables, staging/production URLs, and the webhook decision.

## Documentation

* `docs/PROJECT.md` — product requirements, audiences, information architecture, source-site analysis
* `docs/ARCHITECTURE.md` — stack, content model, rendering, security, SEO, accessibility
* `docs/CONTENT.md` — content principles, migration mapping, editorial rules
* `docs/DEVELOPMENT.md` — workflow, validation, debugging
* `docs/DEPLOYMENT.md` — CI/CD, hosting, environment, webhook
* `TASKS.md` — milestone checklist and status