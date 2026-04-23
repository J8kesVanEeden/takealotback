# TakealotBack.com

A non-commercial South African consumer-rights reference.

When Takealot's returns policy strays past the Consumer Protection Act, the ECT Act, or
POPIA, this site explains exactly where and how — with statute numbers, case citations,
ready-to-send email templates, and a 10-tier escalation ladder.

Live site: <https://takealotback.com>
Studio: [Milk Moon Studio](https://www.milkmoonstudio.com/)

## Stack

- **[Astro 5](https://astro.build/)** — static SSG, one homepage route plus three markdown
  deep-dives via a content collection.
- **Vanilla CSS** with custom properties. No Tailwind. Tokens in `src/styles/tokens.css`.
- **Vanilla JS** for interactivity (clause + template accordions, triage modal, tweaks
  panel, keyboard shortcuts). No runtime framework.
- **Cloudflare Pages** for hosting. Auto-deploy on push to `main`.
- **Cloudflare Web Analytics** for privacy-preserving, cookie-free page views.

## Project layout

```
src/
  content/pages/         — three deep-dive markdown files (content collection)
  components/            — .astro components (Shell, Hero, Dismantled, Templates, …)
  data/content.ts        — single source of truth for all homepage content (typed)
  layouts/Layout.astro   — shared shell, meta tags, pre-apply tweaks script
  pages/                 — index.astro (homepage) + [slug].astro (3 deep-dives)
  styles/                — tokens.css, base.css
public/                  — favicon, robots.txt, static assets
astro.config.mjs
CONTENT-LICENSE.md       — CC BY 4.0 for content
LICENSE                  — MIT for code
```

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build     # static output to ./dist
npm run preview   # serve ./dist locally
npm run check     # astro check (type-check)
```

Requires Node 20+.

## Content updates

All homepage content lives in `src/data/content.ts`. Shapes are stable so future
edits are object edits. The three deep-dive pages live in `src/content/pages/`.

**Do not rewrite content without cross-checking the source vault.** The April 2026
verification pass left statute citations and case references embedded that aren't
easy to reconstruct. If something looks wrong, open an issue — don't silently
"fix" it.

For small corrections (a typo, a phone number), edit `src/data/content.ts` directly
in the GitHub web UI and commit — Cloudflare Pages redeploys in about a minute.

## Licences

- **Code:** MIT. See [`LICENSE`](./LICENSE).
- **Content:** CC BY 4.0 (`src/content/` and `src/data/`). See [`CONTENT-LICENSE.md`](./CONTENT-LICENSE.md).

## Corrections

This site has no contact form and no email address. That's intentional — it's a
one-way reference resource. If you find something factually wrong,
**[open an issue](https://github.com/J8kesVanEeden/takealotback/issues)**.

## Non-commercial — permanently

No ads. No affiliate links. No donations. No tracking beyond Cloudflare Web
Analytics. This is non-negotiable — both a matter of principle and of legal
footing, since the site's use of the name "Takealot" relies on non-commercial
criticism/commentary protections (s16 of the Constitution, TMA s34(2), UDRP
4(c)(iii)).

## Not affiliated

TakealotBack.com is not affiliated with, endorsed by, or connected to Takealot
Online (RF) (Pty) Ltd or its parent company Naspers / Prosus. Takealot's
official website is <https://takealot.com>. Nothing on this site is legal advice.
For free consumer dispute resolution, contact the Consumer Goods & Services
Ombud at <https://cgso.org.za>.
