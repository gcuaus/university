# GCTSA Website Revamp — Design Preview

Static, no-build mockup (HTML/CSS/JS only) built from the real content on
https://gcits.org, restyled with a distinct "manuscript & seal" visual identity
(deep ink navy, manuscript gold, oxblood accent, Fraunces + Source Sans + IBM Plex Mono).

This covers everything in the **Tahap 1 — Website** checklist as a single flowing
page (real multi-page build would split these into individual routes):
Home, Letter of President, Graduation gallery, Distinctives, About/Philosophy/
Goals/Doctrinal/Values/Vision/Accreditation (tabbed), Academic + Degrees +
Curriculum, Indonesian-student bilingual banner, Partnership, Tuition & Payment
Plan, Faculty, Piper quote, How to Enroll, Blog preview, Apply Now + Free
Evaluation modal (2-in-1 form), Login modal (Student/Lecturer), WhatsApp
click-to-chat widget, footer legal links (Privacy/Terms/Refund/FAQ placeholders),
and a custom 404 page.

Phase 2 (LMS/Student Portal dashboards) is intentionally **not** built — the
Login modal is a styled placeholder only, as requested.

## Files
- `index.html` — the whole one-page demo (self-contained, no build step)
- `404.html` — custom not-found page
- `vercel.json` — clean URLs config

## Deploy to Vercel (fastest — no install)
1. Go to https://vercel.com/new
2. Drag-and-drop this whole folder onto the page, or "Import" it as a project
3. Framework preset: **Other** (static) — no build command needed
4. Click Deploy — you'll get a live `*.vercel.app` link in ~20 seconds

## Deploy via CLI
```bash
npm i -g vercel
cd gctsa-demo
vercel --prod
```

## Notes for the client walkthrough
- All images are placeholder stock photography (Unsplash) — final build uses
  the school's real photography, faculty portraits, and graduation footage.
- Apply Now, Free Evaluation, and Login forms are UI-only (no backend yet) —
  submitting shows a "demo preview" toast instead of sending data.
- WhatsApp button opens `wa.me` with a placeholder number — swap in the real
  admissions number before going live.
- Legal footer links (Privacy/Terms/Refund/FAQ) open a placeholder modal —
  real legal copy gets dropped in during full build.

## Keystatic GitHub login

Keystatic is configured to use the `gcuaus/university` GitHub repository. The
CMS now shows its built-in GitHub sign-in screen before allowing content edits;
successful edits are committed through GitHub rather than written only to the
local filesystem.

### Local setup

1. In GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Set the callback URL to `http://127.0.0.1:3000/api/keystatic/github/oauth/callback`.
3. Copy `.env.example` to `.env.local` and set the OAuth client ID, client
  secret, and a long random `KEYSTATIC_SECRET`.
4. Start the site with `npm run dev` and open `http://localhost:3000/keystatic`.

5. After signing in, use Keystatic's **Create GitHub App** flow. Install the
  app on `gcuaus/university`, then copy its GitHub App slug into
  `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` in `.env.local` and restart the dev
  server. This GitHub App is separate from the OAuth App used for sign-in.

For production, add the same three environment variables to the deployment
provider and register the production callback URL:
`https://your-domain.example/api/keystatic/github/oauth/callback`.

The GitHub OAuth App must be authorized by an account with write access to the
repository. Do not put a GitHub password, OAuth secret, or personal access
token in this repository.
