# The Year of AI Agents — Jean-Paul Leva

A bespoke, cinematic, scroll-driven portfolio site: the story of how one physician built the AI that now runs his medical practice — in four months, with a frontier model — and the eleven live systems that came out of it. Built as a personal credential for AI-in-practices consulting.

**Live:** _published via GitHub Pages_ → `https://jeanpaulleva-cloud.github.io/leva-portfolio/`

## What this is

A single, self-contained page (`index.html`, no build step) telling the arc as a film:

1. **The Setup** — a huge CRM nobody would run.
2. **The Ask** — I asked an agency to build the AI agents.
3. **The Turn** — they didn't, so I built the SMS agent myself (live Feb 14, 2026).
4. **What Followed** — eleven live systems.
5. **By the Numbers** — the headline figures.
6. **How I Build** — the method (the consulting edge).
7. **Work With Me** — the offer + contact.

Design: full-bleed cinematic dark, huge serif (Newsreader), luminous teal accent, grain + glow atmosphere, scroll-triggered reveals, count-up numbers, a scroll-progress bar. Fonts + GSAP/Lenis load from CDN. Honors `prefers-reduced-motion`.

## Privacy & accuracy

Story and figures are verified against primary sources (git history, source code, my own Slack messages). Outside vendors and the one patient name in a live-agent screenshot are **blurred** (placeholder text under a CSS blur — real names are never in the page source). PHI-safe.

## View / edit / deploy

- **View:** open `index.html` in any browser, or serve the folder (`python -m http.server`).
- **Edit:** all content + styles are inline in `index.html`. The arc acts are commented (`ACT 0`–`ACT VII`).
- **Deploy:** GitHub Pages serves `index.html` from the repo root. Push to `main`; Pages redeploys automatically.

## Related

- Editorial / print-friendly portfolio + the company-voiced "Four Months" showcase: `c:/dev/Team Projects/portfolio/`
- Public company showcase: https://leva-agents-site.vercel.app/pages/four-months

---

*© 2026 Jean-Paul Leva / Leva Medical PC.*
