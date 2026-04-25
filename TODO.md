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
- [x] In-page anchors fixed (`scrollIntoView` + `scroll-padding-top: 56px`)
- [x] `scripts/check-anchors.mjs` — anchor-validation guard, runs in `npm run check:all`
- [x] `npm run check:html` (html-validate) and `npm run check:links` (linkinator over preview server) wired into `npm run check:all`
- [x] Three-agent audit pass (design, SEO, cross-linking) — HIGH/MED items applied (April 2026)
- [x] `--space-1..8` and `--text-xs..lg` design tokens; off-grid font sizes normalised
- [x] `SourceChips.astro` — single component for all four source-chip surfaces (Dismantled, Templates, deep-dives, FAQ)
- [x] FAQ items now show source chips (Constitution, Laugh It Off, etc.)
- [x] AboutSection legal-grounding bullets link to citation pages
- [x] EscalateSection contacts: emails → mailto:, phone numbers → tel: with `&nbsp;` for SE wrapping safety
- [x] Citation page "Used on the site" panel: each line gets a "See on homepage →" jump link
- [x] Citation page JSON-LD `@type` is type-aware (LegalCaseDocument / Legislation / GovernmentService / CreativeWork / Article)
- [x] Citation page year-only `date:` synthesises `YYYY-01-01` for `datePublished` (was: fell back to today)
- [x] Citation page URL whitelist expanded — `secondary_url`, `wayback_url_dated`, `wayback_url_earlier`, `saflii_pdf`, `cgso_index`, `wikipedia_url`, `popia_co_za`, `portal_url`, `press_release`, `itu_url`, `dtic_url`, `lawlibrary_s34` now render
- [x] Citations index emits `CollectionPage` + `BreadcrumbList` JSON-LD
- [x] Site-wide `_redirects` covers `/citations/*/` trailing-slash and `*.html` legacy URLs
- [x] `hreflang="en-ZA"` and `x-default` link tags added in Layout
- [x] Per-page `datePublished` for deep-dives now from frontmatter (was hard-coded `'2026-04-23'`)
- [x] Header has a `Sources` link to `/citations` (shortcut S)
- [x] CPA Regulations 2011 `used_in:` clause indices fixed (19→18, 20→19)
- [x] Voltex citation pattern matches `"CGSO (compulsory scheme)"` so Clause 13's chip resolves
- [x] `40x` validator pass on every page in `dist/` — zero `valid-id`, `aria-label-misuse`, `no-trailing-whitespace`, or `tel-non-breaking` errors
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
- [x] ARB stub: re-fetched `arb.org.za` 2026-04-25, confirmed `info@arb.org.za` + `(011) 593 3104` + NPC reg `2018/5288775/08`. Site copy aligned (`info@arb.org.za`).
- [ ] NFO stub: confirm OBSSA amalgamation date and full scope (was OLTI / OSTI / Credit Ombud also amalgamated?). NFO homepage doesn't surface this; needs separate primary-source confirmation.
- [x] Build-time check that every case named in `src/data/content.ts` has a matching file in `citations/cases/` — `scripts/check-citations.mjs`, wired into `npm run check:all`.
- [ ] Same DRY check for statutes — every `s X` reference in `content.ts` should match a `citations/statutes/` file. Lower priority since the statute set is small and stable.

## Open — nice to have

- [ ] If `citations/` grows past ~50 files, consider auto-generated `/citations/` Astro page (build-time index of the markdown files in the folder, with prose body view).
- [ ] Consider adding `citations/INDEX.md` or `OPERATIONS.md` as alternate links in `llms.txt` for LLM crawlers that want the research backing.
- [ ] OG image refresh once any clause/template count changes (currently auto via `npm run build:og`; just don't forget).
- [ ] Lighthouse / pa11y full-browser audit — only doable from a real Chrome instance; user runs against pagespeed.web.dev manually. (Not wired into `npm run check:all` to keep the dev-tools surface lean and CI minutes free.)
- [ ] Pre-1990s case judgment dates — `Dibley v Furter (1951)`, `Phame v Paizes (1973)`, `Glaston House v Inag (1977)`, `TRC v Sony (1987)` currently carry year-only `date:` frontmatter (Holmdene + Frank & Hirsch already have full ISO dates). Schema gracefully falls back to `YYYY-01-01`. If you want exact judgment dates, dig into SAFLII or LawSA primary records — not on the public web in a verifiable form.
- [ ] Per-citation `metaDescription` frontmatter (SEO MED 8) — formulaic page descriptions on `/citations/...` work but a 1-line bespoke summary per source would lift social-card CTR. Not blocking.
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
