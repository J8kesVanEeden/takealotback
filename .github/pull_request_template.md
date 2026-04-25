<!--
PR template — pulls authors through the checks that the test loop found
catch the bugs that recur most. If a box doesn't apply to your change,
strike it through (~~text~~). If a box applies and isn't ticked, the
review will likely block on it.
-->

## Summary

<!-- 1–3 sentences. What changed and why. -->

## Type of change

- [ ] Content update (clauses / templates / FAQ / quick-hits / law sections / escalation / warranty / playbook)
- [ ] Citation added or refreshed
- [ ] Component / styling
- [ ] Build, CI, or tooling
- [ ] Docs / runbook
- [ ] Bug fix

## Pre-merge checklist

### Always
- [ ] `npm run check:all` passes locally
- [ ] No new hardcoded counts (clause / template / escalation tier counts read from `CLAUSES.length` / `TEMPLATES.length` / `ESCALATION.length`)
- [ ] After merge: Cloudflare cache will be purged before announcing the change

### If you changed `CLAUSES`, `TEMPLATES`, or `ESCALATION`
- [ ] Counts in `Hero.astro`, `index.astro`, `404.astro`, `DismantledSection.astro`, `ThreeThings.astro` still derive from the constant (no literals)
- [ ] If a clause was renamed, `CLAUSE_SLUGS` in `src/components/TriageModal.astro` is updated
- [ ] If a template was renamed, every `c.template` in `src/data/content.ts` still resolves
- [ ] `npm run build:og` regenerated the OG image (counts in the image match)

### If you cited a new case / statute / regulator / advisory
- [ ] `src/content/citations/<group>/<File>.md` created with required frontmatter (`title`, `retrieved`, `used_in`, plus a URL field for post-1995 sources)
- [ ] `src/lib/citation-links.ts` has a regex that matches how the case/statute appears in clause `stat` strings and template bodies
- [ ] `scripts/check-citations.mjs` allowlist updated if the case is referenced under multiple aliases

### If you added a new page or renamed an existing slug
- [ ] `astro.config.mjs` sitemap config still produces the right URLs
- [ ] `public/_redirects` covers any legacy URL → new URL
- [ ] Anchored deep-links from citation pages and deep-dives still resolve (`npm run check:anchors` covers this)
- [ ] `public/llms.txt` and `src/pages/llms-full.txt.ts` reflect the new structure

### If you changed any styling
- [ ] Mobile (≤720px) still renders correctly
- [ ] Print (`@media print`) still hides chrome and shows templates page-per-template
- [ ] No regression on focus-visible outlines

## Test plan

<!-- How will you / a reviewer verify this works on the live site after deploy? Reference specific URLs, keystrokes, or behaviour. -->

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
