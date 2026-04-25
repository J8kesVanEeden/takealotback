# TakealotBack — Citations archive

This folder explains the evidence vault for TakealotBack.com. The actual citation files live in [`src/content/citations/`](../src/content/citations/) so they can be served as live, crawlable pages at https://takealotback.com/citations. This README and the [INDEX.md](./INDEX.md) sit at repo root as the GitHub-side meta-docs; the source markdown is in `src/content/citations/`.

Every factual, legal, or policy claim on the live site traces to a source; the matching markdown file in `src/content/citations/` is what we relied on as of the date we relied on it.

**Why it exists:**

- **Link rot** — SAFLII moved in 2022. Takealot has reshuffled its policy URLs at least twice since 2024. Third-party commentary disappears. In-repo snapshots outlive the original URL.
- **Provenance** — "We said X on [date] because the source said Y on [date]" is a defensible position. "I'm sure I read it somewhere" isn't.
- **Change detection** — diffing our snapshot against a fresh fetch is the fastest way to notice a Takealot policy edit.
- **Audit speed** — the next content review starts from "what's changed since this snapshot?" instead of "what does every source say today?"

**Live on the site.** As of 2026-04-25, every citation is also published at `https://takealotback.com/citations/<subfolder>/<slug>` so it's crawlable, indexable, and linkable from anywhere — clauses, deep-dives, search engines, LLM crawlers. The Astro content collection at `src/content/citations/` is the single source of truth; GitHub renders the same markdown files for source-of-truth audits, and `https://takealotback.com/citations` auto-generates the index from the same files at build time.

---

## Folder layout

```
citations/                                (this folder — meta-docs only)
├── README.md                             (this file — purpose, copyright policy, SOP)
└── INDEX.md                              (mini-sitemap pointing to live URLs)

src/content/citations/                    (single source of truth — Astro content collection)
├── statutes/                             (Acts, regulations, Constitution)
├── cases/                                (judgments from SCA, High Court, NCT, CAC, ZACC)
├── advisories/                           (CGSO Advisory Notes)
├── policies/                             (Takealot's own published policies — snapshots)
├── regulators/                           (CGSO / NCC / IR / ARB / SCC contact + threshold snapshots)
└── commentary/                           (third-party legal commentary — metadata + short excerpt only)

src/pages/citations/                      (Astro pages that render the collection)
├── index.astro                           (auto-generated index — visit /citations)
└── [...slug].astro                       (renders any citation at /citations/<subfolder>/<slug>)
```

---

## Per-file format

Every file in every subfolder uses this frontmatter:

```yaml
---
title: "Short human-readable title"
citation: "Formal citation where applicable"
court_or_publisher: "Issuing body"
date: "YYYY-MM-DD (date of original)"
primary_url: "https://..."
retrieved: "YYYY-MM-DD (when we captured it)"
used_in:
  - "src/data/content.ts — CLAUSES[n] (slug) angle m"
  - "src/content/pages/onus-of-proof.md — para 3"
copyright: "Basis for reproduction (see §Copyright-policy below)"
---
```

Body is verbatim text for public-domain sources; short quoted excerpts + link for copyrighted sources.

---

## Copyright policy by source type

South African copyright law (Copyright Act 98 of 1978) determines what we can and cannot reproduce. Each subfolder applies a different policy:

| Subfolder | Source type | Copyright? | Our reproduction rule |
|---|---|---|---|
| `statutes/` | Acts, Regulations, Constitution | **None** — s 12(8)(a) excludes "official texts of a legislative, administrative or legal nature" | **Full verbatim** with attribution + `retrieved` date |
| `cases/` | Court / Tribunal / CAC judgments | **None** — s 12(8)(a) | **Full verbatim** with SAFLII / court URL + `retrieved` date |
| `advisories/` | CGSO Advisory Notes | None (same basis — functions as regulator-published legal text) | **Full verbatim** with CGSO URL + `retrieved` date |
| `policies/` | Takealot's published policies | **Yes (Takealot copyright)** | Snapshot under fair dealing s 12(1)(a) — *research, criticism, review*. Retained to support the site's criticism of the same policy. Full text OK. |
| `regulators/` | Contact details, monetary thresholds, URLs | None (facts, not expression) | Compiled facts OK |
| `commentary/` | Third-party legal commentary, news, press | **Yes (publisher copyright)** | **Link + short excerpt only** (never full reproduction). Our quotations are justified by fair dealing s 12(1)(a). |

Nothing in this folder is licensed CC BY 4.0 — the content-licence in `CONTENT-LICENSE.md` applies to our own original writing only. Third-party material in `citations/` sits under its own licence; we retain it on the basis described above. Our compilation / organisation of these citations is CC BY 4.0.

---

## Maintenance SOP

Before changing any factual claim in `src/data/content.ts`, `src/content/pages/*.md`, or any component with a citation, the flow is:

1. **Open `citations/INDEX.md`** and locate the source that supports the claim you're changing.
2. **Check the `retrieved` date.** If older than 6 months, refresh the snapshot from the original URL before relying on it.
3. **If no snapshot exists** for a source you want to cite, create one in the appropriate subfolder *before* you ship the content change.
4. **In your commit message**, reference the citation file path (e.g. `cf. citations/cases/Motus-Wentzel-ZASCA-40-2021.md`) so the reviewer can verify the source without leaving the repo.

Automated part: the check-anchors script (`scripts/check-anchors.mjs`) catches broken in-page links. A future enhancement may add a check that every case citation in `src/data/content.ts` has a matching file in `citations/cases/`.

---

## What is in here as of launch

Not everything all at once — at launch, `citations/` contains **metadata stubs for every citation that currently appears on the site**, plus **full text for the sources most directly verified during the April 2026 audit**. The rest is fill-over-time as we re-verify.

Stub = file exists with frontmatter + source URL + `used_in` pointers. Anyone can complete the body by fetching the primary source, committing the text, and bumping the `retrieved` date.

---

## Questions / disputes

If you're reading this as a Takealot lawyer or as anyone else who thinks we've mis-characterised a source: the file in `/citations/` is exactly what we relied on. If you think we're wrong, open a GitHub issue pointing to the file and the sentence on the site, and we'll re-verify.

---

## Wayback Machine archival — third-party provenance

Each citation file's frontmatter records the `primary_url` of the source. Adding a `wayback_url` field gives readers (and us) a third-party archival snapshot to anchor against — useful when:

- the original URL changes (SAFLII has reshuffled before; will again);
- the original page is taken down or paywalled;
- a Takealot policy edit needs to be diffed against the version we relied on.

**Format used in frontmatter:**

```yaml
primary_url: "https://terms-and-policies.takealot.com/"
wayback_url: "https://web.archive.org/web/*/https://terms-and-policies.takealot.com/"
```

The `web/*/` form is a Wayback wildcard that resolves to the nearest snapshot at click-time. For specific dated snapshots we have triggered, we record the timestamp directly:

```yaml
wayback_url_dated: "https://web.archive.org/web/20260425103610/https://terms-and-policies.takealot.com/"
```

**To trigger a fresh snapshot when refreshing a citation:**

```bash
curl -L "https://web.archive.org/save/<primary_url>"
```

Wayback queues the save and serves it under a `web/<timestamp>/<url>` path. Capture that timestamp and add to the file as `wayback_url_dated`. Don't remove existing dated entries — they document what we relied on at a specific date.

Wayback's "Save Page Now" can be slow (5–30 seconds) and may rate-limit on bulk saves. Trigger as part of the refresh flow, not as a build-time step.
