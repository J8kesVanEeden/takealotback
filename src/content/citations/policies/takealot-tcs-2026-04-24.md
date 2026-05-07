---
title: "Takealot Terms & Conditions — snapshot 2026-04-24"
citation: "terms-and-policies.takealot.com/terms-conditions"
court_or_publisher: "Takealot Online (RF) (Pty) Ltd"
date: "2026-04-24"
primary_url: "https://terms-and-policies.takealot.com/terms-conditions/"
wayback_url: "https://web.archive.org/web/*/https://terms-and-policies.takealot.com/terms-conditions/"
wayback_url_dated: "https://web.archive.org/web/20260425124023/https://terms-and-policies.takealot.com/terms-conditions/"
metaDescription: "Verbatim snapshot of Takealot's terms & conditions (April 2026). Entity, unilateral-change, forum-selection, marketplace, and resale clauses."
retrieved: "2026-04-25"
corrected_on: "2026-05-07"
correction_note: "2026-04-24 audit misread the forum-selection qualifier ('even if the disputed amount would typically be heard by a lower court') as absent from live T&Cs; re-verification confirms it has been continuously present. Clause 13 in src/data/content.ts and POLICY_SUMMARY.terms reverted; original misread commit + correction commit both retained in git history."
used_in:
  - "src/data/content.ts — CLAUSES[11] (unilateral-changes)"
  - "src/data/content.ts — CLAUSES[12] (high-court-jurisdiction)"
  - "src/data/content.ts — CLAUSES[13] (order-cancellation)"
  - "src/data/content.ts — CLAUSES[14] (marketplace-sellers)"
  - "src/data/content.ts — CLAUSES[16] (resale-prohibition)"
  - "src/data/content.ts — POLICY_SUMMARY.terms"
  - "src/components/PoliciesSection.astro — Registered entity block"
copyright: "Takealot Online (RF) (Pty) Ltd. Retained under fair dealing per s 12(1)(a) Copyright Act 98 of 1978 — research / criticism / review."
---

# Takealot Terms & Conditions — snapshot 2026-04-24

See the companion [takealot-returns-2026-04-24.md](./takealot-returns-2026-04-24.md) for methodology and copyright basis.

---

## Section-by-section live text (retrieved 2026-04-25)

### Registered entity (verbatim from the T&Cs)

- **Full name:** Takealot Online (RF) (Pty) Ltd
- **Registration number:** 2010/020248/07
- **Legal notices address:** 12th Floor, 10 Rua Vasco Da Gama Plain, Foreshore, Cape Town, 8001
- **Legal notices email:** legal@takealot.com

### Unilateral-change clause (verbatim)

> "While we may change any provision of our agreement at any time without giving you notice, we will publish those changes on our platform."

The site's Clause 11 dismantles the "without giving you notice" reservation against CPA s 51, Reg 44(3)(i), and the SCA's *Motus v Wentzel* obiter on s 69(d) consumer enforcement.

### High Court Western Cape forum-selection (verbatim)

> "You and we agree that the High Court of South Africa (Western Cape Division, Cape Town) will have jurisdiction to hear any legal matters between us. This applies even if the disputed amount would typically be heard by a lower court. This is to help ensure consistency in how cases are handled."

**Correction (2026-05-07):** the 2026-04-24 audit pass originally claimed the "even if the disputed amount would typically be heard by a lower court" qualifier was no longer in the live text, and Clause 13 (`high-court-jurisdiction`) was edited to treat it as a historical-version note. That was wrong. Re-verification on 2026-05-07 — direct curl of the live page + four Wayback Machine snapshots spanning 2026-02-08 to 2026-04-25, plus Yoast `dateModified` of 2026-02-05 confirming no republication — shows the qualifier has been continuously present. Clause 13 was reverted on 2026-05-07 to treat the qualifier as present-tense operative wording. POLICY_SUMMARY.terms was also corrected in the same pass ("Other sellers" → "Sellers", matching the Clause 14 correction that originally landed on 2026-04-24 but missed the summary array). Original misread commit and the correction commit both remain in `git log` — no history rewriting.

### Order cancellation grounds (paraphrased)

Takealot may cancel an order for reasons including:
- the item is out of stock;
- non-payment per the consumer's selected method;
- *"we discover an error in the listing information of an item, including its pricing"*;
- investigation or conviction for criminal activity or account abuse.

The site's Clause 13 dismantles each of these against CPA s 23 (displayed-price binding), s 47 (over-selling refund-with-interest plus compensation), and ECT s 46 (30-day refund deadline).

### Marketplace seller / "Sellers" clause (verbatim)

> "Sellers are responsible for the items they sell on our platform. This includes providing an invoice, making sure the item is in stock, keeping the product information accurate, and getting the item to our warehouse."

The site's Clause 14 (marketplace-sellers) currently uses "Sellers are responsible for the items they sell on our platform" — verbatim accurate. (Earlier site copy used "Other sellers"; corrected on 2026-04-24 following the Takealot policy audit.)

### Resale prohibition (verbatim)

> "Do not resell any item purchased on our platform. If you do, we may suspend or terminate your Takealot account and cancel any pending orders."

The site's Clause 16 dismantles this against TMA s 34(2)(d) statutory exhaustion (with carve-outs from *TRC v Sony* and *Frank & Hirsch v Roopanand*), and against the principle that purchase intent is not a statutory ground for refusing a s 56 return.

### CGSO escalation reference

The T&Cs route unresolved complaints to the Consumer Goods and Services Ombud (CGSO):
- Website
- Phone: 0860 000 272
- Email: info@cgso.org.za

The site updated its ESCALATION tier 3 contact-email to `info@cgso.org.za` on 2026-04-24, matching the T&Cs (and CGSO's own homepage). Earlier site copy had `complaints@cgso.org.za`.

---

## Policy version / last-updated

Takealot does not surface a "Last updated" date on either the Returns Policy page or the T&Cs page. The site's `TAKEALOT_POLICY_REVIEWED_AGAINST` constant (`v2026.03`) is a self-anchor rather than a Takealot-published version pin.

## How to refresh this snapshot

1. Fetch https://terms-and-policies.takealot.com/terms-conditions/.
2. Diff against the verbatim quotes above.
3. Flag material changes; update the relevant CLAUSES entry in `src/data/content.ts`.
4. Bump the `retrieved` date in this frontmatter.
5. If the changes are material, preserve this snapshot as a sibling file: a new dated snapshot goes in a new file with the new date.

## Status

Policy text mirrored verbatim for the five operative clauses the site relies on; companion Returns Policy at [`takealot-returns-2026-04-24.md`](./takealot-returns-2026-04-24.md). Fair-dealing snapshot retained for research / criticism / review.
