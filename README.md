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
