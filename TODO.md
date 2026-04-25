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

- [ ] Fill highest-value citation stubs with verbatim primary-source text:
  - [ ] `citations/statutes/CPA-2008.md` — sections actively cited (s 2(10), s 16, s 17, s 19, s 20, s 22, s 23, s 25, s 40, s 41, s 47, s 48, s 49, s 51, s 52, s 53, s 55, s 56, s 57, s 61, s 69, s 82)
  - [ ] `citations/statutes/ECT-Act-2002.md` — s 42, s 43, s 44, s 46
  - [ ] `citations/statutes/POPIA-2013.md` — s 10, s 19
  - [ ] `citations/statutes/TMA-1993.md` — s 34(1)(c), s 34(2)(d)
  - [ ] `citations/statutes/Prescription-Act-1969.md` — s 11(d)
  - [x] `citations/statutes/Constitution-s16.md` — already filled
  - [x] `citations/statutes/CPA-Regulations-2011.md` — Reg 44(3) full verbatim
  - [ ] `citations/cases/Laugh-It-Off-ZACC-7-2005.md` — Moseneke J substantial-detriment passage
  - [ ] `citations/cases/Vonk-Willow-Crest-ZANCT-63-2019.md` — full verbatim (or at least the voetstoots-and-CPA passage)
  - [ ] `citations/advisories/CGSO-Advisory-Note-01.md` — full text
  - [ ] `citations/advisories/CGSO-Advisory-Note-11.md` — full text
  - [ ] `citations/policies/takealot-returns-2026-04-24.md` — full verbatim Returns Policy snapshot
  - [ ] `citations/policies/takealot-tcs-2026-04-24.md` — full verbatim T&Cs snapshot

## Open — medium priority

- [ ] Fill remaining case stubs (Holmdene, Phame, Dibley v Furter, Glaston House, TRC/Sony, Frank & Hirsch). Most are pre-digital — physical SALR reports only. May not be available digitally; flag where they're not retrievable.
- [ ] ARB stub: re-fetch `arb.org.za` content to confirm contact email, succession date, members-binding rule.
- [ ] NFO stub: confirm OBSSA amalgamation date and full scope (was OLTI / OSTI / Credit Ombud also amalgamated?).
- [ ] Add a build-time check that every case named in `src/data/content.ts` (in any `angles[*].body`) has a matching file in `citations/cases/`. Catch drift as new clauses cite new cases.
- [ ] Same DRY check for statutes — every `s X` reference in `content.ts` should match a `citations/statutes/` file.

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
