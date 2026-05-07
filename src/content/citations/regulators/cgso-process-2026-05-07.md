---
title: "CGSO complaint process — service standards & timing (snapshot)"
citation: "cgso.org.za/cgso/the-process, retrieved 7 May 2026"
court_or_publisher: "Consumer Goods and Services Ombud (CGSO)"
date: "2026-05-07"
primary_url: "https://www.cgso.org.za/cgso/the-process/"
wayback_url_dated: "https://web.archive.org/web/20260507140055/https://www.cgso.org.za/cgso/the-process/"
metaDescription: "CGSO's published service standards: 15 business days for the supplier to respond after CGSO referral; 60 business days target overall resolution. NCC under CPA s 71 if unresolved."
retrieved: "2026-05-07"
retrieved_by: "WebFetch on 2026-05-07; Wayback SPN snapshot captured same day."
used_in:
  - "src/data/content.ts — ESCALATION (CGSO entry) timing addition"
  - "src/data/content.ts — CLAUSES[19] (inspection-assessment-delay) — 'CGSO 60-day benchmark' angle"
copyright: "No copyright — published by an accredited Ombud established under CPA s 82; functions as a regulatory text."
---

# CGSO complaint process — service standards & timing
## cgso.org.za, retrieved 2026-05-07

## Why the site cites this

The CGSO's published process page sets the timing benchmarks against which the site measures Takealot's responsiveness — both internally (an internal inspection that takes longer than a CGSO complaint cycle is *prima facie* unreasonable) and externally (a complainant approaching CGSO knows what to expect, and when they can escalate to the NCC).

## Verbatim extracts

### Supplier response — 15 business days

> "they will then contact the supplier to request that they try and resolve the complaint directly with you within the first 15 business days."

### CGSO target overall resolution — 60 business days

> "the CGSO has 60 business days within which to resolve a complaint."

### Escalation to the NCC — CPA s 71

> "you may approach The National Consumer Commission in accordance with section 71 of the Consumer Protection Act alternatively, you may seek legal assistance."

### Industry Code (mentioned, not quoted in detail on the page)

The page references "our industry Code" in connection with the 60-day standard. This is a reference to the **Consumer Goods and Services Industry Code of Conduct**, gazetted under CPA s 82 (March 2015). Compulsory participation under that Code is the basis of *CGSO NPC v Voltex (Pty) Ltd* [2021] ZAGPPHC 309 — already cited on the site.

## Site reliance

- **ESCALATION → CGSO entry:** the 15-day / 60-day numbers are added so that consumers know what to expect.
- **Clause 20 (inspection-assessment-delay) → "CGSO 60-day benchmark" angle:** the 60-day published target is a useful comparator. An internal inspection process that takes longer than a full CGSO cycle has a hard time defending itself as reasonable.
- **CGSO is free to consumers** — the page doesn't surface a fee schedule. (The CGSO's own framework is funded by the industry it regulates.)

## How to refresh this snapshot

1. Re-fetch https://www.cgso.org.za/cgso/the-process/.
2. Diff against the verbatim quotations above.
3. If timing standards change, bump `retrieved` and update the cited numbers in `src/data/content.ts` (ESCALATION + Clause 20).
4. Re-trigger `npm run archive -- https://www.cgso.org.za/cgso/the-process/` for a fresh Wayback snapshot.
