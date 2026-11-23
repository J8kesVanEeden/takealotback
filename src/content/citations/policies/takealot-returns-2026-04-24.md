---
title: "Takealot Returns Policy: snapshot 2026-04-24"
citation: "terms-and-policies.takealot.com (Returns Policy)"
court_or_publisher: "Takealot Online (RF) (Pty) Ltd"
date: "2026-04-24"
primary_url: "https://terms-and-policies.takealot.com/"
wayback_url: "https://web.archive.org/web/*/https://terms-and-policies.takealot.com/"
wayback_url_dated: "https://web.archive.org/web/20261117211925/https://terms-and-policies.takealot.com/"
wayback_url_earlier: "https://web.archive.org/web/20261110140832/https://terms-and-policies.takealot.com/"
metaDescription: "Dated snapshot of Takealot's returns policy (April 2026), quoted where it matters. Source-of-truth for every clause-by-clause comparison the site makes."
retrieved: "2026-11-10"
reverified_on: "2026-11-17"
corrected_on: "2026-11-10"
correction_note: "2026-11-10: two transcription errors in this snapshot corrected (coupon-reissue quote; non-returnable list omitted digital items). Neither was a Takealot change, since the 2026-04-25 Wayback capture carries the corrected wording, and neither affected a site claim. Earlier, 2026-05-07: companion T&Cs snapshot's forum-selection note corrected; this file's parallel mention updated to match. See takealot-tcs-2026-04-24.md."
retrieved_by: "TakealotBack's own audit of the Takealot policy, 2026-04-24; see commits cd2f26c and c60d4ef"
used_in:
  - "src/content/pages/limits.md — re-delivery fees (change-of-mind returns)"
  - "src/data/content.ts — every CLAUSES[*].takealot paraphrase"
  - "src/data/content.ts — POLICY_SUMMARY.returns"
  - "src/data/content.ts — FAQ (delivery fee on a cancelled order: 'Our returns are free!')"
copyright: "Takealot Online (RF) (Pty) Ltd. Retained under fair dealing for criticism / review per s 12(1)(b) Copyright Act 98 of 1978, in support of the commentary at takealotback.com."
updated: "2026-11-23"
---

# Takealot Returns Policy: snapshot 2026-04-24

Policy text is Takealot's copyrighted material. This file is a **dated reference snapshot** retained to support our commentary on the policy at takealotback.com. Use is fair dealing under Copyright Act s 12(1)(b) for criticism and review.

## Verified current clauses (as of 2026-04-24)

Our audit on this date (ours, not Takealot's) verified the following clauses against the live policy at terms-and-policies.takealot.com:

- **Time limits**: 30 days for wrong / damaged / missing / change-of-mind; 6 months for defective
- **Original packaging**: required per "Prepare your return"
- **Damage-on-delivery exclusions**: consumer damage / electrical surges / unintended purpose (sea-air is on the defective-item list only, not damage-on-delivery)
- **Unlock codes**, verbatim (live policy, re-read 2026-11-17): *"If you return an item that stores data, you will have to give us your unlock codes or passwords – we just want to assess your return. If you decide not to provide us with access, we can refuse your return because it’s the only way we can assess your device."* Handing over the codes is stated as a requirement; refusing the return if you don't is "can refuse".
- **Pre-packed Bundle return**: whole-bundle return requirement verified verbatim
- **Credit vs refund**: policy concedes consumer election on defective returns ("you must choose...")
- **Credit expiry**, verbatim: *"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit"*
- **Extended-warranty returns via the supplier + 21-day trigger**: for a defect more than 6 months after delivery, Takealot helps you return the item to the supplier; if the supplier's repair or replacement takes longer than 21 days from receipt at its returns evaluation facility, Takealot offers credit or a refund (see "Warranty items" below)
- **Defective-item exclusions**: wear, consumer damage, surge, sea-air, modification, unintended use
- **Rejected-return disposal**: "If we can't deliver the item to you within 30 days of its return having been rejected, for example because you are unavailable or you refuse delivery, we will consider the item abandoned and may dispose of it"
- **Non-returnable items**: intimate / underwear / swimwear / jewellery / foodstuffs / digital items / unsealed AV+software / books / personalised / made to specification
- **Vouchers and coupons**: verbatim distinction confirmed
- **Digital items**: returnable only if defective (the policy: "You can only return digital items (such as electronic vouchers, gaming codes, online course codes, or other digital downloads) if they are defective")
- **Mis-returned items**: disposed, no compensation
- **Collection / re-delivery fees on re-logged returns**, verbatim: *"we may charge you a fee for collecting the item from you and, where applicable, a fee for delivering the same or a replacement item back to you"*. This is the textual hook for the site's Clause 19
- **Inspection step**, verbatim: *"when we receive the item, we'll inspect it"*, with no SLA; the textual hook for the site's Clause 20

## Lines added 2026-11-18 (verbatim, from the 2026-11-17 capture)

Quoted because the site now relies on them (delivery-fee FAQ; Clause 11 e-voucher angle). Raw capture kept on file.

> "We want you to love what you buy from us, so if something is wrong, you can return the item so that we can exchange it, replace it, or credit your Takealot account. Our returns are free!"

> "If you paid for your items with a voucher and you want to return or cancel your whole order or some of the items in your order, we’ll load the value of the voucher you used as non-refundable credit on your Takealot account."

## Clauses in the Terms & Conditions

- Unilateral-change clause verbatim: *"may change any provision of our agreement at any time without giving you notice"*
- Order cancellation for stock / payment / listing error / account-abuse: all four grounds present
- Marketplace seller responsibility: *"Sellers are responsible for the items they sell on our platform"* (note: "Sellers", not "Other sellers")
- Resale prohibition clause: verbatim present
- High Court forum selection: current live text reads *"the High Court of South Africa (Western Cape Division, Cape Town) will have jurisdiction to hear any legal matters between us. This applies even if the disputed amount would typically be heard by a lower court."* (See companion T&Cs snapshot. The 2026-04-24 audit originally misread this qualifier as absent; corrected 2026-05-07.)
- CGSO named as escalation point: verified

## Policy version / last-updated

Takealot does not surface a "Last updated" date on either the Returns Policy page or the T&Cs page. The site's `TAKEALOT_POLICY_REVIEWED_AGAINST` constant records the date the live pages were last checked against this snapshot (currently "as live on 2026.11.17"); it is not a Takealot-published version. (Until 2026-11-10 it read `v2026.03`, a self-assigned label.) Page metadata shows a Yoast `dateModified` of 2026-05-22 for both pages, not displayed to visitors.

## Re-verification log

**2026-07-01 (Q3 2026 quarterly refresh):** Live Returns Policy re-fetched from `terms-and-policies.takealot.com` (full JS-rendered DOM incl. collapsed accordions) and diffed clause-by-clause against this snapshot. **No material change.** Every relied-on clause matches: 30-day / 6-month windows, original-packaging + intact-seals condition, damage-on-delivery vs defective exclusion lists (sea-air correctly on the defective list only), *"when we receive the item, we'll inspect it"*, 21-day extended-warranty (supplier) trigger, 2-business-day credit load, 3-year credit expiry (verbatim), 3–5 business-day refunds, rejected-return abandonment/disposal, the Clause-19 re-delivery-fee hook, 7-day pickup-point window, non-returnable categories, and the voucher/coupon distinction. Only non-material additions observed: an "Exchanges" (size/colour) blurb and a donation-subtraction line. Neither was relied on by the site at the time. (Corrected 2026-11-23: POLICY_SUMMARY.returns now relies on both; they are quoted under "Exchanges" and "Credit and refunds" below.) `retrieved` bumped to 2026-07-01; fresh Wayback capture recorded in `wayback_url_dated` (prior dated capture moved to `wayback_url_earlier`).

**2026-11-10 (Q4 2026 quarterly refresh, run late; due 2026-10-01):** Live Returns Policy rendered in headless Chrome (whole DOM walked, collapsed sections included) and diffed against this snapshot. The same extractor was run on the Wayback captures of 2026-04-25 and 2026-07-01: **the policy body text is identical across all three dates.** **No material change.** Every relied-on clause matches verbatim (programmatic check of every quoted string in this file and in CLAUSES: all found except the coupon quote, a transcription error in this file, now corrected above, along with the non-returnable list's missing digital-items entry). Takealot's page metadata shows a re-save on 2026-05-22 (Yoast `dateModified`) with no wording change; nothing since. Note for the record: the "Exchanges" blurb and donation line called new in the Q3 entry were already present in the 2026-04-25 capture. Raw extracted text is kept with the maintainer's working notes (not published; it reproduces the full pages). The dated Wayback captures listed below are the public record. `retrieved` bumped to 2026-11-10.

**2026-11-17 (interim check, one week after Q4):** Live Returns Policy rendered with the same whole-DOM extractor and diffed against the 2026-11-10 extraction. **No change** to the policy text; the only diff lines are the JavaScript-built "Quick Links" carousel and table of contents above it, which reorder between loads. Yoast `dateModified` still 2026-05-22. Every quoted string in this file still found live. `reverified_on` bumped to 2026-11-17. New Wayback capture: [20261117211925](https://web.archive.org/web/20261117211925/https://terms-and-policies.takealot.com/).

Wayback captures of this URL relied on, oldest first: [20260425123950](https://web.archive.org/web/20260425123950/https://terms-and-policies.takealot.com/) · [20260701142454](https://web.archive.org/web/20260701142454/https://terms-and-policies.takealot.com/) · [20261110140832](https://web.archive.org/web/20261110140832/https://terms-and-policies.takealot.com/).

## How to refresh this snapshot

1. Fetch https://terms-and-policies.takealot.com/ and its sub-pages (Returns Policy, Terms & Conditions).
2. Diff against the "Extracts by section" block below.
3. Flag material changes; update the site content.
4. Bump the `retrieved` date in this frontmatter.
5. If the changes are material, preserve the 2026-04-24 version as a sibling file: `takealot-returns-2026-04-24.md` stays untouched; new snapshot goes in a new file with the new date.

---

## Extracts by section (retrieved 2026-04-25)

The following is the operative wording of the Returns Policy as fetched from `terms-and-policies.takealot.com` on 2026-04-25. Direct quotations are flagged with quotation marks; everything else is faithful paraphrase. Fair-dealing snapshot under Copyright Act s 12(1)(b) (criticism and review).

### Time limits

> "Different items have different return windows. Here are the 2 simple rules."

- Returns for **wrong items, damage on delivery, missing parts, or changed mind**: 30 days.
- **Defective items**: 6 months from delivery.

### Prepare your return

> The item must be returned "in its original product packaging with all the accessories and parts included, and all seals must be intact (if applicable)."

Tags must remain on; items must not have been worn or used. Verbatim (2026-11-17 capture):

> "the item is returned in its original product packaging and is unused;"
>
> "the tags are still on, and it hasn’t been worn – it's okay to try things on, but it’s not okay to wear an item and then try to return it;"

### Wrong item, damaged on delivery, or missing parts

For damaged, wrong, or incomplete deliveries within 30 days, the choice is the customer's, but only while Takealot has replacement stock (verbatim, 2026-11-17 capture; added 2026-11-23 because the earlier paraphrase dropped the stock condition):

> "We can replace the item, credit your Takealot account with the purchase price, or refund you – it’s your choice. However, if we do not have replacement stock available, we’ll rather credit your Takealot account."

Items are not considered "damaged on delivery" if the damage was caused by the consumer, electrical surges, or use for an unintended purpose.

### Defective items

Defective returns within 6 months may be repaired, replaced, credited, or refunded **after Takealot's inspection**. The choice is the customer's:

> "If we accept the return, you must choose whether we should repair or replace the item, credit your Takealot account with the purchase price, or refund you."

The same paragraph continues (verbatim, 2026-11-17 capture; added 2026-11-23):

> "Keep in mind that not all defects can be repaired, and we may not always have replacement stock available."

Excluded: normal wear and tear, consumer damage, electrical surges, sea-air corrosion, consumer modification, or unintended use.

The inspection step is built in to the workflow: *"when we receive the item, we'll inspect it"*, with no published SLA. (This is the textual hook for the site's Clause 20.)

### Warranty items

Under "Extended warranties", for a defect that shows up more than 6 months after delivery:

> "You must log your return with us as soon as possible if an item becomes defective more than 6 months after delivery."

> "The supplier will then inspect the item and decide whether to accept the return. They may charge you an evaluation fee." (Added 2026-11-23, 2026-11-17 capture.)

> "If the supplier accepts the return and offers to repair or replace the item and this takes longer than 21 days from when the item is received at the supplier’s returns evaluation facility, we’ll offer you credit or a refund directly from Takealot."

Items with a manufacturer ("direct") warranty are different: the manufacturer handles the return itself, and Takealot gives you its contact details. Verbatim (2026-11-17 capture):

> "With a manufacturer warranty, the manufacturer handles the return of any defective items themselves."
>
> "When you log the return of a defective item with a manufacturer warranty, you will receive the contact details of the relevant manufacturer. You must then contact that manufacturer directly."

### Pre-packed Bundles

> "Unless we say otherwise, you can only return a Pre-packed Bundle if you return all the items that formed part of that bundle to us. We may refuse the return if you only send back some of the items."

### Bundle Deals

Customers may return a whole Bundle Deal **or any of the individual items** in the bundle, with the amount credited to their Takealot account reflecting the discounts applied at purchase. Verbatim (2026-11-17 capture):

> "You may return a whole Bundle Deal or any of the items in the bundle to us. If we accept your return, we will credit your Takealot account with the price you paid (after any applicable discounts have been applied)."

### Digital items and items that store data

Verbatim, 2026-11-17 capture (added 2026-11-23):

> "We will investigate the problem and, if you qualify for a return, you can choose if you want a replacement or a refund."

> "When assessing your return, we might need to perform a factory reset which means that you could lose the data on your device. Please ensure that you’ve made backups."

### Non-returnable items (change of mind)

> "Items you cannot return are marked as non-returnable on the product description page. There are exceptions, such as if we delivered the wrong item, if the item arrives damaged on delivery, or if it is defective." (Verbatim, 2026-11-17 capture; added 2026-11-23.)

Non-returnable categories include: intimate items, underwear, swimwear, jewellery, foodstuffs and everyday-consumption items, unsealed audio / video / software, books and periodicals, personalised items, made-to-specification items, and "digital items, such as electronic vouchers, gaming codes or other digital downloads" *(digital-items entry added 2026-11-10; it was live on 2026-04-25 but omitted from this transcription)*.

### Vouchers and coupons

Voucher value loads as **non-refundable** Takealot account credit (Takealot's own wording is quoted under "Lines added 2026-11-18" above); any remaining cash amount may be credited or refunded.

Coupons return as new coupons: "that coupon will have its own terms and conditions that may differ from the terms and conditions of your original coupon." *(Quote corrected 2026-11-10; the earlier version of this file misquoted it as "which may have…".)*

### Wrong item returned (consumer error)

Verbatim, 2026-11-17 capture (the full passage added 2026-11-23):

> "You must return the correct item. Please contact us immediately if you have returned the wrong item because we dispose of incorrect returns. We cannot guarantee that we will find your item and unfortunately, we will not pay for lost items. If we find it, you will have to collect it."

### Rejected returns and disposal

If a return is rejected, Takealot returns the item to the consumer.

> "If we can't deliver the item to you within 30 days of its return having been rejected, for example because you are unavailable or you refuse delivery, we will consider the item abandoned and may dispose of it."

### Collection or delivery, and re-delivery fees

Consumers choose collection or pickup-point drop-off; a drop-off must happen within **7 days** of logging the return. Large items and alcohol are collection-only. Verbatim (2026-11-17 capture):

> "If you choose to return the item to a pickup point you must do it within 7 days of logging the return."
>
> "We must collect large items and alcohol – you don’t have the option to return them to our pickup points."

> "If you don't [return the item with packaging, parts, accessories, seals], we will not accept the return and will send the item back to you. However, you may log the return again if you can do so with all the missing packaging and parts, but **we may charge you a fee for collecting the item from you and, where applicable, a fee for delivering the same or a replacement item back to you.**"

(This is the textual hook for the site's Clause 19.)

### Exchanges

> "Got the size or colour wrong? You can exchange clothing, sportswear, and shoes for a different size or colour." (Verbatim, 2026-11-17 capture; added 2026-11-23.)

### Credit and refunds

> "When you log your return, you can choose whether we must credit your Takealot account, refund you the same way you paid, or replace the item." (Verbatim, 2026-11-17 capture; added 2026-11-23.)

- Account credit loads within **2 business days**.
- Account credit is valid for **3 years**: *"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit."*
- Refunds process in **3–5 business days** to the original payment method.
- Where the original payment method is unavailable: *"we will ask you for your bank details which we will have to verify before we can refund you. This could take a little longer than 5 days."*
- Donations, verbatim (2026-11-17 capture; added 2026-11-23): *"If you made a donation with your purchase, we’ll subtract that amount from your refund or credit amount."*

---

## Companion file

[`./takealot-tcs-2026-04-24.md`](./takealot-tcs-2026-04-24.md): Terms & Conditions snapshot.

## Status

Dated extracts of Takealot's policy, quoted for criticism and review (Copyright Act 98 of 1978, s 12(1)(b)); paraphrase elsewhere. Not a copy of the policy: read the full text at terms-and-policies.takealot.com.
