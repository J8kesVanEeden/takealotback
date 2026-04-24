---
title: "Takealot Returns Policy — snapshot 2026-04-24"
citation: "terms-and-policies.takealot.com (Returns Policy)"
court_or_publisher: "Takealot Online (RF) (Pty) Ltd"
date: "2026-04-24"
primary_url: "https://terms-and-policies.takealot.com/"
retrieved: "2026-04-24"
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
- High Court forum selection: current live text reads *"the High Court of South Africa (Western Cape Division, Cape Town) will have jurisdiction"* — the "even if the disputed amount would typically be heard by a lower court" qualifier from earlier versions is not present in the current live fetch
- CGSO named as escalation point: verified

## Policy version / last-updated

Takealot does not surface a "Last updated" date on either the Returns Policy page or the T&Cs page. The site's `TAKEALOT_POLICY_REVIEWED_AGAINST` constant (`v2026.03`) is a self-anchor rather than a Takealot-published version pin.

## How to refresh this snapshot

1. Fetch https://terms-and-policies.takealot.com/ and its sub-pages (Returns Policy, Terms & Conditions).
2. Diff against this file's "Verified current clauses" section.
3. Flag material changes; update the site content.
4. Bump the `retrieved` date in this frontmatter.
5. If the changes are material, preserve the 2026-04-24 version as a sibling file: `takealot-returns-2026-04-24.md` stays untouched; new snapshot goes in a new file with the new date.

Full verbatim text of the policy is not yet mirrored in this file — fill on next refresh for maximum provenance strength.
