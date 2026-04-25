# TakealotBack — running TODO

Outstanding work, in priority order. Tick items as they land.

---

## Done — for reference

- [x] Astro port of the design prototype, deployed to Cloudflare Pages
- [x] Domain attached: `takealotback.com` + `www.takealotback.com`
- [x] Self-hosted fonts (no Google Fonts third-party leak)
- [x] Security headers (`_headers`), trailing-slash redirects (`_redirects`)
- [x] Branded 404 page
- [x] Sitemap (`/sitemap.xml` + index), `robots.txt` (LLM crawler allows), RSS feed
- [x] `llms.txt` + `llms-full.txt` (built from `content.ts`)
- [x] OG image (1200×630, regenerated when counts change)
- [x] JSON-LD: Organization + WebSite + FAQPage + CollectionPage on `/`; Article + BreadcrumbList on each deep-dive
- [x] In-page anchors fixed (`scrollIntoView` + `scroll-padding-top: 72px`)
- [x] `scripts/check-anchors.mjs` — anchor-validation guard, runs in `npm run check:all`
- [x] April 2026 audit pass 1 (Bandera, Motus, CGSO, Prosus, Clause 19)
- [x] April 2026 audit pass 2 (Clause 20, Reg 44 subsection corrections, copy-check fixes)
- [x] Cloudflare Web Analytics — `[Jakes — please confirm "enabled"]`
- [x] Search Console / Bing Webmaster sitemap submission — `[Jakes]`
- [x] `citations/` evidence vault + `OPERATIONS.md` SOP + footer link

## Open — high priority

- [x] Fill highest-value citation stubs with structured operative summaries (📋):
  - [x] `citations/statutes/CPA-2008.md` — every section the site cites (s 2(10), 4, 5(2), 16, 17, 19, 20, 22, 23, 25, 40, 41, 45, 47, 48, 49, 51, 52, 53, 55, 56, 57, 61, 69, 82, 115) — completeness check added s 4, s 45, s 115
  - [x] `citations/statutes/ECT-Act-2002.md` — s 42, 43, 44 (verbatim s 44(1)), 46, 47, 48
  - [x] `citations/statutes/POPIA-2013.md` — s 10, s 19
  - [x] `citations/statutes/TMA-1993.md` — s 34(1) + s 34(2) full breakdown
  - [x] `citations/statutes/Prescription-Act-1969.md` — s 11 + s 12
  - [x] `citations/statutes/Constitution-s16.md` — verbatim ✅
  - [x] `citations/statutes/CPA-Regulations-2011.md` — Reg 44(3) full verbatim ✅
  - [x] `citations/cases/Laugh-It-Off-ZACC-7-2005.md` — substantial-economic-detriment test
  - [x] `citations/cases/Vonk-Willow-Crest-ZANCT-63-2019.md` — facts + holding
  - [x] `citations/advisories/CGSO-Advisory-Note-01.md` — operative effect + onus position
  - [x] `citations/advisories/CGSO-Advisory-Note-11.md` — operative effect + voetstoots survival list
  - [x] `citations/policies/takealot-returns-2026-04-24.md` — section-by-section live text with verbatim quotations
  - [x] `citations/policies/takealot-tcs-2026-04-24.md` — verbatim for all 5 cited clauses (entity, unilateral-change, forum-selection, marketplace, resale)

## Open — medium priority

- [x] Fill remaining case stubs (Holmdene, Phame, Dibley v Furter, Glaston House, TRC/Sony, Frank & Hirsch) — all upgraded to structured operative summaries with secondary-source corroboration.
- [x] ARB stub: re-fetched `arb.org.za` 2026-04-25, confirmed `info@arb.org.za` + `(011) 593 3104` + NPC reg `2018/5288775/08`. Site copy still uses `complaint@arb.org.za` — flagged for next site update.
- [ ] NFO stub: confirm OBSSA amalgamation date and full scope (was OLTI / OSTI / Credit Ombud also amalgamated?). NFO homepage doesn't surface this; needs separate primary-source confirmation.
- [x] Build-time check that every case named in `src/data/content.ts` has a matching file in `citations/cases/` — `scripts/check-citations.mjs`, wired into `npm run check:all`.
- [ ] Same DRY check for statutes — every `s X` reference in `content.ts` should match a `citations/statutes/` file. Lower priority since the statute set is small and stable.

## Open — nice to have

- [ ] If `citations/` grows past ~50 files, consider auto-generated `/citations/` Astro page (build-time index of the markdown files in the folder, with prose body view).
- [ ] Consider adding `citations/INDEX.md` or `OPERATIONS.md` as alternate links in `llms.txt` for LLM crawlers that want the research backing.
- [ ] OG image refresh once any clause/template count changes (currently auto via `npm run build:og`; just don't forget).
- [ ] Lighthouse / pa11y full-browser audit — only doable from a real Chrome instance; user runs against pagespeed.web.dev manually.
- [ ] If Takealot publishes a "Last updated" date on its policy page, add a step in OPERATIONS.md to capture that into the policy snapshot frontmatter.

## Open — content strategy / future

- [ ] Quarterly Takealot policy refresh (next: ~July 2026)
- [ ] Annual case-law refresh (next: ~April 2027) — re-verify SCA / Concourt decisions; check for any new judgments interpreting CPA s 56 / s 69
- [ ] Annual regulator-details refresh
- [ ] Watch for: Small Claims Court threshold raise from R20,000 → R50,000 (consultations underway as of late 2025; adjust ESCALATION + Bodies card if it lands)

## Non-negotiables (don't drift)

These five rules are load-bearing — see [`OPERATIONS.md`](./OPERATIONS.md):

1. Non-commercial absolute. No ads / affiliates / donations / tracking beyond CF Web Analytics.
2. No contact form, no email on the site. Corrections via GitHub issues only.
3. Footer credit row = Milk Moon Studio only.
4. Don't silently "fix" content in `src/data/content.ts`. Flag, don't edit.
5. No Takealot branding (no blue, no logo).
