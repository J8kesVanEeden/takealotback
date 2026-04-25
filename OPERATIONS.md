# Operations — standard operating procedure

Day-to-day rules for keeping the site factually current and defensible. Short document; read it before any content change.

---

## Source-of-truth protocol

**Before changing any factual claim** in `src/data/content.ts`, `src/content/pages/*.md`, or any component with a citation:

1. **Open the live citations index at https://takealotback.com/citations** (or the in-repo file at `src/content/citations/<subfolder>/<file>.md`) and locate the source that supports the claim you're changing.
2. **Check the `retrieved:` date in the file's frontmatter.** If older than 6 months, refresh the snapshot from the original URL before relying on it.
3. **If no snapshot exists** for a source you want to cite, create one in `src/content/citations/<subfolder>/` *before* you ship the content change. Use the frontmatter template in `citations/README.md`. The new citation will auto-publish to `/citations/<subfolder>/<slug>` on the next deploy — content collection rebuilds the index page on every build.
4. **Trigger a Wayback Machine snapshot** of the source URL when adding or refreshing a citation. Use the bundled archive script — handles pacing and timestamp capture:
   ```bash
   npm run archive -- <primary_url>             # one URL
   npm run archive                              # default key-pages list
   npm run archive -- --all                     # every URL in sitemap-0.xml + Takealot live policies
   ```
   Capture the resulting `web/<timestamp>/<url>` path from the script's output and add to the citation file's frontmatter as `wayback_url_dated`. Don't remove existing dated entries — they document what we relied on at a specific date. Wayback may be slow (5–30 s) and rate-limit on bulk saves; the script paces requests at 6 s.
5. **In your commit message**, reference the citation file path so the reviewer can trace the source without leaving the repo.

## Post-deploy archival

After every substantive content change is live on `takealotback.com`:

1. Run `npm run archive` — pushes the default key-page list to the Wayback Machine (home, deep-dives, citations index, top citation pages, plus Takealot's live policy URLs). Takes ~90 s.
2. For a full-site backup (all 37 indexable pages), run `npm run archive -- --all`. Takes ~4–5 min plus retries for any that SPN throttles.
3. Update any citation file whose primary source you re-archived: paste the new `web/<timestamp>/<url>` into `wayback_url_dated` (or rename the previous one to `wayback_url_earlier` to keep both). Commit.

The Wayback Machine is genuine third-party version-insurance — independent of GitHub, Cloudflare, our own infrastructure. If the live site disappears for any reason, content remains recoverable from web.archive.org under the snapshots we forced. Example:

```
Update Clause 06 to mention inventory soft-landing

cf. citations/policies/takealot-returns-2026-04-24.md (para "Credit vs refund")
```

---

## Content refresh cadence

- **Takealot policy**: quarterly (check for unannounced edits; diff against the snapshot).
- **Case law + statutes**: annually, or immediately on SCA / ConCourt / legislative change in scope.
- **Regulator contact details**: annually.
- **Third-party commentary**: only re-check when the underlying primary source changes, or when the commentary itself is explicitly cited.
- **`LAST_REVIEWED`** constant in `src/data/content.ts`: bump it every time any content change lands. This value feeds the footer review-date and the CollectionPage JSON-LD `dateModified`.

---

## Quality gates before push

Every content commit must pass:

```bash
npm run check:all     # astro check + anchor check
npx html-validate 'dist/**/*.html'
```

Nice-to-haves on a major content pass:

- Grep the built `dist/` for any removed terms or replaced case citations — confirms nothing survived from the old copy.
- Spot-check JSON-LD: `grep -o '"@type":"[A-Z][a-zA-Z]*"' dist/index.html | sort | uniq -c` — types should match expectations.
- Check the live site's security headers and sitemap `lastmod` after CF Pages redeploys.

---

## When Takealot changes its policy

1. Take a fresh snapshot to [`citations/policies/`](./citations/policies/) — name it with today's date (e.g. `takealot-returns-2026-10-15.md`). Do **not** overwrite the old snapshot; version the change.
2. Diff against the prior dated snapshot. Flag material changes.
3. Update affected `CLAUSES[*]` entries in `src/data/content.ts` and, if needed, `POLICY_SUMMARY.returns` or `POLICY_SUMMARY.terms`.
4. Bump `LAST_REVIEWED` and, if the policy version identifier is tracked, `TAKEALOT_POLICY_REVIEWED_AGAINST`.
5. Commit referencing the new snapshot file path in the message.

---

## When case law changes

1. Add or update the relevant judgment in [`citations/cases/`](./citations/cases/).
2. If the judgment re-casts the proposition the site relies on (overrules, distinguishes, affirms), update:
   - The `CLAUSES[*].angles[*]` where the case is cited;
   - The `LAW_SECTIONS[*]` blurb for the statute the case interprets;
   - The relevant deep-dive page in `src/content/pages/` if the case appears there;
   - `TEMPLATES[*]` if a template's reasoning hangs on the case.
3. Commit referencing the updated citation file.

---

## When regulator details change

1. Refresh the snapshot in [`citations/regulators/`](./citations/regulators/).
2. Update:
   - The `ESCALATION[*].contact` string in `src/data/content.ts`;
   - The `Bodies` card in `src/components/LawSection.astro`;
   - External links in `src/components/Footer.astro`.
3. Commit.

---

## Automation

The anchor checker (`scripts/check-anchors.mjs`) validates that every in-page `href="#x"`, every `data-jump-tpl`, and every triage modal route resolves to a real `id` on the rendered page. Run on every build:

```bash
npm run check:anchors
# or
npm run check:all  # runs astro check + anchor check
```

A future enhancement may add a check that every case citation in `src/data/content.ts` has a matching file in `citations/cases/`.

---

## Non-negotiables (inherited from the Build Brief)

These five rules are not editorial. They are load-bearing:

1. **Non-commercial absolute** — no ads, no affiliates, no donations, no tracking beyond Cloudflare Web Analytics.
2. **No contact form, no email on the site** — corrections via GitHub issues only.
3. **Footer credit is Milk Moon Studio only.** Takealot's legal entity appears only in the disclaimer paragraph + Policies-summary "Registered entity" box, never in credits.
4. **Do not silently "fix" content in `src/data/content.ts`.** It's been fact-checked. If something looks wrong, flag it (GitHub issue) and follow this OPERATIONS flow — don't just edit.
5. **No Takealot branding** — no blue, no logo, visually distinct.

Breaching a non-negotiable (especially #1) may strip legal protection under UDRP 4(c)(iii) and *Laugh It Off v SAB* — it's not just a style rule.

---

## When in doubt

- **Legal nuance:** flag to Milk Moon Studio (jakes@milkmoonstudio.com) before writing.
- **Statutory reference:** primary source first, then SAFLII. Never rely on secondary commentary for a statute citation.
- **Case citation:** open the SAFLII page before citing. If SAFLII doesn't have the judgment, the citation goes into `citations/cases/` as a stub with a note that the judgment is in physical SALR reports only.
- **Takealot policy:** re-fetch the live page; diff against the most recent snapshot. If the site's claim no longer matches live, the site — not the live Takealot policy — is what gets updated.
