---
title: "Takealot Returns Policy — snapshot 2026-04-24"
citation: "terms-and-policies.takealot.com (Returns Policy)"
court_or_publisher: "Takealot Online (RF) (Pty) Ltd"
date: "2026-04-24"
primary_url: "https://terms-and-policies.takealot.com/"
wayback_url: "https://web.archive.org/web/*/https://terms-and-policies.takealot.com/"
wayback_url_dated: "https://web.archive.org/web/20261110140832/https://terms-and-policies.takealot.com/"
wayback_url_earlier: "https://web.archive.org/web/20260701142454/https://terms-and-policies.takealot.com/"
metaDescription: "Verbatim snapshot of Takealot's returns policy (April 2026). Source-of-truth for every clause-by-clause comparison the site makes."
retrieved: "2026-11-10"
reverified_on: "2026-11-10"
corrected_on: "2026-11-10"
correction_note: "2026-11-10: two transcription errors in this snapshot corrected (coupon-reissue quote; non-returnable list omitted digital items). Neither was a Takealot change, since the 2026-04-25 Wayback capture carries the corrected wording, and neither affected a site claim. Earlier, 2026-05-07: companion T&Cs snapshot's forum-selection note corrected; this file's parallel mention updated to match. See takealot-tcs-2026-04-24.md."
retrieved_by: "Takealot policy audit agent, 2026-04-24 — see commit 6f29a2e and ce0357f"
used_in:
  - "src/data/content.ts — every CLAUSES[*].takealot paraphrase"
  - "src/data/content.ts — POLICY_SUMMARY.returns"
copyright: "Takealot Online (RF) (Pty) Ltd. Retained under fair dealing for research / criticism / review per s 12(1)(a) Copyright Act 98 of 1978, in support of the commentary at takealotback.com."
---

# Takealot Returns Policy — snapshot 2026-04-24

Policy text is Takealot's copyrighted material. This file is a **dated reference snapshot** retained to support our commentary on the policy at takealotback.com. Use is fair dealing under Copyright Act s 12(1)(a) for research, criticism and review.

## Verified current clauses (as of 2026-04-24)

Takealot agent audit on this date verified the following clauses against the live policy at terms-and-policies.takealot.com:

- **Time Limits** — 30 days for wrong / damaged / missing / change-of-mind; 6 months for defective
- **Original Packaging** — required per "Prepare Your Return"
- **Damage-on-delivery exclusions** — consumer damage / electrical surges / unintended purpose (sea-air is on the defective-item list only, not damage-on-delivery)
- **Unlock codes** — policy says supplier *can* refuse return without access (discretionary wording, not absolute)
- **Pre-packed Bundle return** — whole-bundle return requirement verified verbatim
- **Credit vs refund** — policy concedes consumer election on defective returns ("you must choose...")
- **Credit expiry** — verbatim: *"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit"*
- **Manufacturer deflection + 21-day trigger** — runs from receipt at supplier's returns evaluation facility
- **Defective-item exclusions** — wear, consumer damage, surge, sea-air, modification, unintended use
- **Rejected-return disposal** — "If we can't deliver the item to you within 30 days of its return having been rejected, for example because you are unavailable or you refuse delivery, we will consider the item abandoned and may dispose of it"
- **Non-returnable items** — intimate / underwear / swimwear / jewellery / foodstuffs / unsealed AV+software / books / personalised
- **Vouchers and coupons** — verbatim distinction confirmed
- **Digital items** — "only returnable if defective"
- **Mis-returned items** — disposed, no compensation
- **Collection / re-delivery fees on re-logged returns** — verbatim: *"we may charge you a fee for collecting the item from you and, where applicable, a fee for delivering the same or a replacement item back to you"* — this is the textual hook for the site's Clause 19
- **Inspection step** — verbatim: *"when we receive the item, we'll inspect it"* — with no SLA; the textual hook for the site's Clause 20

## Clauses in the Terms & Conditions

- Unilateral-change clause verbatim: *"may change any provision of our agreement at any time without giving you notice"*
- Order cancellation for stock / payment / listing error / account-abuse — all four grounds present
- Marketplace seller responsibility: *"Sellers are responsible for the items they sell on our platform"* (note: "Sellers", not "Other sellers")
- Resale prohibition clause: verbatim present
- High Court forum selection: current live text reads *"the High Court of South Africa (Western Cape Division, Cape Town) will have jurisdiction to hear any legal matters between us. This applies even if the disputed amount would typically be heard by a lower court."* (See companion T&Cs snapshot — the 2026-04-24 audit originally misread this qualifier as absent; corrected 2026-05-07.)
- CGSO named as escalation point: verified

## Policy version / last-updated

Takealot does not surface a "Last updated" date on either the Returns Policy page or the T&Cs page. The site's `TAKEALOT_POLICY_REVIEWED_AGAINST` constant records the date the live pages were last checked against this snapshot (currently "as live on 2026.11.10"); it is not a Takealot-published version. (Until 2026-11-10 it read `v2026.03`, a self-assigned label.) Page metadata shows a Yoast `dateModified` of 2026-05-22 for both pages, not displayed to visitors.

## Re-verification log

**2026-07-01 (Q3 2026 quarterly refresh):** Live Returns Policy re-fetched from `terms-and-policies.takealot.com` (full JS-rendered DOM incl. collapsed accordions) and diffed clause-by-clause against this snapshot. **No material change.** Every relied-on clause matches: 30-day / 6-month windows, original-packaging + intact-seals condition, damage-on-delivery vs defective exclusion lists (sea-air correctly on the defective list only), *"when we receive the item, we'll inspect it"*, 21-day manufacturer-deflection trigger, 2-business-day credit load, 3-year credit expiry (verbatim), 3–5 business-day refunds, rejected-return abandonment/disposal, the Clause-19 re-delivery-fee hook, 7-day pickup-point window, non-returnable categories, and the voucher/coupon distinction. Only non-material additions observed: an "Exchanges" (size/colour) blurb and a donation-subtraction line — neither is relied on by the site. `retrieved` bumped to 2026-07-01; fresh Wayback capture recorded in `wayback_url_dated` (prior dated capture moved to `wayback_url_earlier`).

**2026-11-10 (Q4 2026 quarterly refresh, run late; due 2026-10-01):** Live Returns Policy rendered in headless Chrome (whole DOM walked, collapsed sections included) and diffed against this snapshot. The same extractor was run on the Wayback captures of 2026-04-25 and 2026-07-01: **the policy body text is identical across all three dates.** **No material change.** Every relied-on clause matches verbatim (programmatic check of every quoted string in this file and in CLAUSES: all found except the coupon quote, a transcription error in this file, now corrected above, along with the non-returnable list's missing digital-items entry). Takealot's page metadata shows a re-save on 2026-05-22 (Yoast `dateModified`) with no wording change; nothing since. Note for the record: the "Exchanges" blurb and donation line called new in the Q3 entry were already present in the 2026-04-25 capture. Raw extracted text is kept with the maintainer's working notes (not published; it reproduces the full pages). The dated Wayback captures listed below are the public record. `retrieved` bumped to 2026-11-10.

Wayback captures of this URL relied on, oldest first: [20260425123950](https://web.archive.org/web/20260425123950/https://terms-and-policies.takealot.com/) · [20260701142454](https://web.archive.org/web/20260701142454/https://terms-and-policies.takealot.com/) · [20261110140832](https://web.archive.org/web/20261110140832/https://terms-and-policies.takealot.com/).

## How to refresh this snapshot

1. Fetch https://terms-and-policies.takealot.com/ and its sub-pages (Returns Policy, Terms & Conditions).
2. Diff against the "Section-by-section live text" block below.
3. Flag material changes; update the site content.
4. Bump the `retrieved` date in this frontmatter.
5. If the changes are material, preserve the 2026-04-24 version as a sibling file: `takealot-returns-2026-04-24.md` stays untouched; new snapshot goes in a new file with the new date.

---

## Section-by-section live text (retrieved 2026-04-25)

The following is the operative wording of the Returns Policy as fetched from `terms-and-policies.takealot.com` on 2026-04-25. Direct quotations are flagged with quotation marks; everything else is faithful paraphrase. Fair-dealing snapshot under Copyright Act s 12(1)(a).

### Time Limits

> "Different items have different return windows. Here are the 2 simple rules."

- Returns for **wrong items, damage on delivery, missing parts, or changed mind**: 30 days.
- **Defective items**: 6 months from delivery.

### Prepare Your Return

> Items must be returned "in its original product packaging with all the accessories and parts included, and all seals must be intact (if applicable)."

Tags must remain on; items must not have been worn or used.

### Damaged on Delivery / Wrong Item / Missing Parts

For damaged, wrong, or incomplete deliveries within 30 days, Takealot offers replacement, account credit, or refund at the customer's choice. Items are not considered "damaged on delivery" if the damage was caused by the consumer, electrical surges, or use for an unintended purpose.

### Defective Items

Defective returns within 6 months may be repaired, replaced, credited, or refunded **after Takealot's inspection**. Excluded: normal wear and tear, consumer damage, electrical surges, sea-air corrosion, consumer modification, or unintended use.

The inspection step is built in to the workflow: *"when we receive the item, we'll inspect it"* — with no published SLA. (This is the textual hook for the site's Clause 20.)

### Pre-packed Bundles

> "You can only return a Pre-packed Bundle if you return all the items that formed part of that bundle to us."

### Bundle Deals

Customers may return a whole Bundle Deal **or any of the individual items** in the bundle, with the credited / refunded amount reflecting the discounts applied at purchase.

### Non-Returnable Items (change-of-mind)

Non-returnable categories include: intimate items, underwear, swimwear, jewellery, foodstuffs and everyday-consumption items, unsealed audio / video / software, books and periodicals, personalised items, made-to-specification items, and "digital items, such as electronic vouchers, gaming codes or other digital downloads" *(digital-items entry added 2026-11-10; it was live on 2026-04-25 but omitted from this transcription)*.

### Vouchers and Coupons

> Voucher value loads as **non-refundable** Takealot account credit; any remaining cash amount may be credited or refunded.
> Coupons return as new coupons: "that coupon will have its own terms and conditions that may differ from the terms and conditions of your original coupon." *(Quote corrected 2026-11-10; the earlier version of this file misquoted it as "which may have…".)*

### Wrong Item Returned (consumer error)

If the consumer returns the wrong item, contact Takealot immediately. *"We cannot guarantee that we will find your item."* Mis-returned items may be disposed of without compensation.

### Rejected Returns / Disposal

If a return is rejected, Takealot returns the item to the consumer.

> "If we can't deliver the item to you within 30 days of its return having been rejected, for example because you are unavailable or you refuse delivery, we will consider the item abandoned and may dispose of it."

### Collection or Delivery / Re-Delivery Fees

Consumers choose collection or pickup-point drop-off within **7 days** of logging the return. Large items and alcohol are collection-only.

> "If you don't [return the item with packaging, parts, accessories, seals], we will not accept the return and will send the item back to you. However, you may log the return again if you can do so with all the missing packaging and parts, but **we may charge you a fee for collecting the item from you and, where applicable, a fee for delivering the same or a replacement item back to you.**"

(This is the textual hook for the site's Clause 19.)

### Credit and Refunds

- Account credit loads within **2 business days**.
- Account credit is valid for **3 years**: *"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit."*
- Refunds process in **3–5 business days** to the original payment method.
- Where the original payment method is unavailable: *"we will ask you for your bank details which we will have to verify before we can refund you. This could take a little longer than 5 days."*

---

## Companion file

[`./takealot-tcs-2026-04-24.md`](./takealot-tcs-2026-04-24.md) — Terms & Conditions snapshot.

## Status

Policy text mirrored verbatim where direct quotes are available; faithful paraphrase elsewhere. Fair-dealing snapshot retained for research / criticism / review.
