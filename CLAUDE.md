# TakeALotBack

A **non-commercial South African consumer-rights reference** at takealotback.com. Astro static site.

## Stack & commands

Astro + `@astrojs/rss` + `@astrojs/sitemap`. Deployed on Cloudflare Workers.

```bash
npm run dev        # local
npm run build      # build
npm run check:all  # ← THE verification. Runs every checker below; show its output.
```

Individual checkers, all real and all runnable:
`check:citations` · `check:links` · `check:live` · `check:a11y` · `check:html` · `check:headings` ·
`check:anchors` · `check:frontmatter` · `check:counts` · `check:chips` · `check:obsidian` ·
`check:used-in`

**Never claim a content or link change is good without running `npm run check:all` and showing the
output.** The citation checker is the one that matters most here — see the rule below.

## Layout

`src/` pages and content · `citations/` the sourced legal material (cases, press, clauses) ·
`public/` static assets · `scripts/` tooling · `_handoff/` notes.

## What matters here

* **Every legal claim needs a citation.** `citations/` exists so nothing on the site rests on
  memory — cases, statute clauses, and press are stored with their source and access date.
* **Non-commercial.** Content is CC BY 4.0 (`CONTENT-LICENSE.md`). Do not add anything that reads as
  legal advice or as a commercial service.
* Accuracy over volume. A wrong claim about consumer law is worse than a missing one.
