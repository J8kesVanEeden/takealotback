---
title: "Takealot Terms & Conditions: snapshot 2026-04-24"
citation: "terms-and-policies.takealot.com/terms-conditions"
court_or_publisher: "Takealot Online (RF) (Pty) Ltd"
date: "2026-04-24"
primary_url: "https://terms-and-policies.takealot.com/terms-conditions/"
wayback_url: "https://web.archive.org/web/*/https://terms-and-policies.takealot.com/terms-conditions/"
wayback_url_dated: "https://web.archive.org/web/20261117203437/https://terms-and-policies.takealot.com/terms-conditions/"
wayback_url_earlier: "https://web.archive.org/web/20261110140857/https://terms-and-policies.takealot.com/terms-conditions/"
metaDescription: "Dated extracts from Takealot's terms & conditions (April 2026), quoted for criticism and review: entity, unilateral change, forum, cancellation, sellers, resale, vouchers, delivery, accounts."
retrieved: "2026-11-10"
reverified_on: "2026-11-17"
corrected_on: "2026-05-07"
correction_note: "2026-04-24 audit misread the forum-selection qualifier ('even if the disputed amount would typically be heard by a lower court') as absent from live T&Cs; re-verification confirms it has been continuously present. Clause 13 in src/data/content.ts and POLICY_SUMMARY.terms reverted; original misread commit + correction commit both retained in git history."
used_in:
  - "src/data/content.ts — CLAUSES[11] (unilateral-changes)"
  - "src/data/content.ts — CLAUSES[12] (high-court-jurisdiction)"
  - "src/data/content.ts — CLAUSES[13] (order-cancellation)"
  - "src/data/content.ts — CLAUSES[14] (marketplace-sellers)"
  - "src/data/content.ts — CLAUSES[16] (resale-prohibition)"
  - "src/data/content.ts — POLICY_SUMMARY.terms"
  - "src/data/content.ts — CLAUSES[22] (sale-pricing) takealot text and 'Cart is not a contract' angle"
  - "src/data/content.ts — CLAUSES[23] (account-suspension) takealot text"
  - "src/data/content.ts — TEMPLATES T23 body (order 'considered delivered')"
  - "src/data/content.ts — CLAUSES[23] (account-suspension) 'Your credit is still yours' angle (gift voucher not exchangeable for cash)"
  - "src/data/content.ts — FAQ (Black Friday at Takealot)"
  - "src/data/content.ts — TEMPLATES T21 body (gift voucher not exchangeable for cash)"
  - "src/components/PoliciesSection.astro — Registered entity block"
copyright: "Takealot Online (RF) (Pty) Ltd. Retained under fair dealing per s 12(1)(b) Copyright Act 98 of 1978 (criticism / review)."
updated: "2026-11-23"
---

# Takealot Terms & Conditions: snapshot 2026-04-24

See the companion [takealot-returns-2026-04-24.md](./takealot-returns-2026-04-24.md) for methodology and copyright basis.

---

## Extracts by section (retrieved 2026-04-25)

### Registered entity (verbatim from the T&Cs)

- **Full name:** Takealot Online (RF) (Pty) Ltd
- **Registration number:** 2010/020248/07
- **Legal notices address:** 12th Floor, 10 Rua Vasco Da Gama Plain, Foreshore, Cape Town, 8001
- **Legal notices email:** legal@takealot.com

### Unilateral-change clause (verbatim)

> "While we may change any provision of our agreement at any time without giving you notice, we will publish those changes on our platform."

The same paragraph continues (verbatim, 2026-11-17 capture, raw `tcs-2026-11-17.txt:345`; added 2026-11-18 because Clause 12 now quotes it):

> "Any change we make takes effect from the date we publish it on our platform. You accept the change when you use our platform after the change is made."

The site's Clause 12 (unilateral-changes) answers the "without giving you notice" reservation with CPA s 51 read with ECT s 48 (statutory rights can't be waived), Reg 44(3)(i) (the Reg 44(4)(c)(iv) open-ended-agreement carve-out needs immediate notice, which this clause doesn't give), CPA s 48, and the point that a later change can't rewrite a concluded order. (Corrected 2026-11-18: this line said "Clause 11" and listed *Motus v Wentzel*, which Clause 12 does not use.)

### High Court Western Cape forum-selection (verbatim)

> "You and we agree that the High Court of South Africa (Western Cape Division, Cape Town) will have jurisdiction to hear any legal matters between us. This applies even if the disputed amount would typically be heard by a lower court. This is to help ensure consistency in how cases are handled."

**Correction (2026-05-07):** the 2026-04-24 audit pass originally claimed the "even if the disputed amount would typically be heard by a lower court" qualifier was no longer in the live text, and Clause 13 (`high-court-jurisdiction`) was edited to treat it as a historical-version note. That was wrong. Re-verification on 2026-05-07 shows the qualifier has been continuously present. It used a direct curl of the live page, four Wayback Machine snapshots spanning 2026-02-08 to 2026-04-25, and Yoast `dateModified` of 2026-02-05 confirming no republication. Clause 13 was reverted on 2026-05-07 to treat the qualifier as present-tense operative wording. POLICY_SUMMARY.terms was also corrected in the same pass ("Other sellers" changed to "Sellers", matching the Clause 15 correction that originally landed on 2026-04-24 but missed the summary array). Original misread commit and the correction commit both remain in `git log`. No history rewriting.

### Order cancellation grounds (paraphrased)

Takealot may cancel an order for reasons including:
- the item is out of stock;
- non-payment per the consumer's selected method;
- *"we discover an error in the listing information of an item, including its pricing"*;
- investigation or conviction for criminal activity or account abuse.

The site's Clause 14 (order-cancellation) answers these with the contract formed on confirmation, CPA s 48 read with Reg 44(3)(k), CPA s 47(3) (refund with interest plus directly incidental costs on a shortage) and ECT s 46 (30-day performance; refund within 30 days of notice that goods are unavailable). It does not rely on CPA s 23, which s 23(1)(b) switches off where ECT s 43 applies, as it does to takealot.com orders.

**Correction (2026-11-18).** This line said "Clause 13" (that is High Court jurisdiction) and that the site relied on CPA s 23 (displayed-price binding) against these cancellation grounds. Clause 14 says the opposite: "Don't cite s 23 against Takealot".

### Marketplace seller / "Sellers" clause (verbatim)

> "Sellers are responsible for the items they sell on our platform. This includes providing an invoice, making sure the item is in stock, keeping the product information accurate, and getting the item to our warehouse."

The site's Clause 15 (marketplace-sellers) currently uses "Sellers are responsible for the items they sell on our platform" (verbatim accurate). (Earlier site copy used "Other sellers"; corrected on 2026-04-24 following the Takealot policy audit. Clause number corrected from "Clause 14" on 2026-11-18.)

### Resale prohibition (verbatim)

> "Do not resell any item purchased on our platform. If you do, we may suspend or terminate your Takealot account and cancel any pending orders."

The site's Clause 17 (resale-prohibition; this line said "Clause 16" until 2026-11-18) dismantles this against TMA s 34(2)(d) statutory exhaustion (with carve-outs from *TRC v Sony* and *Frank & Hirsch v Roopanand*), and against the principle that purchase intent is not a statutory ground for refusing a s 56 return.

### Lines added 2026-11-18 (verbatim, checked against the 2026-11-17 capture)

These lines were in the live T&Cs on 2026-11-10 and 2026-11-17 (whole-DOM captures, kept on file). They were not quoted in this file before; the site now relies on them in Clause 14, Clause 23, Clause 24, templates T21 and T23, and the Black Friday FAQ.

**When the order is complete; cart and wish list**

> "Your order is only complete once you have paid and received an order confirmation."

> "If you add items to your wish list or cart, it does not mean you have reserved or ordered them, and it does not guarantee that you can purchase those items later at the same price."

**Cancellation (full wording; the list above is a paraphrase)**

> "Takealot may, for any reason, cancel your order or an item in your order after you receive your order confirmation. Sellers on our platform may also, for any reason, cancel an item they are responsible for. For example, if:
> - an item is out of stock;
> - you don’t pay for the item according to the terms of the payment method you selected;
> - we discover an error in the listing information of an item, including its pricing; or
> - you are being investigated for, or found guilty of, criminal activity or abuse of your Takealot account.
> You may cancel an order if there is a ‘cancel’ button on the order details page of your Takealot account. Once you have initiated a cancellation, you cannot stop the process.
> If an order or item is cancelled, we will refund you the amount paid for that cancelled order or item."

**Delivery estimates** (added 2026-11-18, raw line 286; Clause 14's "CPA s 54: paid delivery missed" angle refers to Takealot's terms calling delivery dates "estimates")

> "… We provide our delivery estimates on the product description page to help you shop, but always check your order’s estimated delivery date at checkout for the most accurate delivery information."

**Discount deals** (Clause 23 quotes this)

> "Deals are valid for a limited period but may expire sooner if Takealot or the seller runs out of the allocated amount of stock of the deal item."

**Gift vouchers**

> "Gift vouchers are valid for 3 years from the date of issue"

> "You can’t return a gift voucher for a refund or exchange it for cash." (Added 2026-11-18, raw line 251; Clause 24 relies on it, and it is why template T21 asks only for refund credit to be paid out.)

**Delivery**

> "When someone accepts or collects the order at your chosen address or at a Takealot Pickup Point, your order is considered delivered. You must make sure that the person who accepts delivery or collects the order on your behalf has your permission to do so."

**Account security, suspension and termination**

> "… You carry the risk of unauthorised and fraudulent activities on your Takealot account. If you suspect or know that there is unauthorised access to your Takealot account, you must notify us immediately. You must also take steps to mitigate any resultant loss by changing your password and blocking the payment cards you loaded onto your Takealot account."

> "We may, at any time and for any reason, suspend or terminate your Takealot account."

### CGSO escalation reference

The T&Cs route unresolved complaints to the Consumer Goods and Services Ombud (CGSO):
- Website
- Phone: 0860 000 272
- Email: info@cgso.org.za

The site updated its ESCALATION tier 3 contact-email to `info@cgso.org.za` on 2026-04-24, matching the T&Cs (and CGSO's own homepage). Earlier site copy had `complaints@cgso.org.za`.

---

## Policy version / last-updated

Takealot does not surface a "Last updated" date on either the Returns Policy page or the T&Cs page. The site's `TAKEALOT_POLICY_REVIEWED_AGAINST` constant records the date the live pages were last checked against this snapshot (currently "as live on 2026.11.17"); it is not a Takealot-published version. (Until 2026-11-10 it read `v2026.03`, a self-assigned label.) Page metadata shows a Yoast `dateModified` of 2026-05-22 for both pages, not displayed to visitors.

## Re-verification log

**2026-07-01 (Q3 2026 quarterly refresh):** Live T&Cs re-fetched from `terms-and-policies.takealot.com/terms-conditions/` (full JS-rendered DOM incl. collapsed accordions) and diffed against the verbatim quotes above. **No material change.** All five relied-on clauses match verbatim: the unilateral-change clause (*"…at any time without giving you notice, we will publish those changes on our platform"*), the WC High Court forum-selection clause **including** the *"even if the disputed amount would typically be heard by a lower court"* qualifier (re-confirming the 2026-05-07 correction: the qualifier is present-tense operative wording), all four order-cancellation grounds + refund line, the "Sellers are responsible for the items they sell" wording (not "Other sellers"), and the resale prohibition. Registered entity unchanged (reg. 2010/020248/07; legal@takealot.com; 12th Floor, 10 Rua Vasco Da Gama Plain). CGSO escalation still `info@cgso.org.za` / 0860 000 272.

Non-material additions observed but **deliberately not incorporated**: the live T&Cs now also surface office-bearer names, a liquor-licence number (WCP/040408), and a PAIA-manual link. Per non-negotiable #3 (keep Takealot's entity footprint minimal) these are left out of the site. `retrieved` bumped to 2026-07-01; fresh Wayback capture in `wayback_url_dated` (prior dated capture moved to `wayback_url_earlier`).

**2026-11-10 (Q4 2026 quarterly refresh, run late; due 2026-10-01):** Live T&Cs rendered in headless Chrome (whole DOM walked) and diffed against this snapshot and against the Wayback captures of 2026-04-25 and 2026-07-01: **operative text identical across all three dates. No material change.** All five relied-on clauses match verbatim, including the forum-selection qualifier; registered entity, reg. 2010/020248/07, legal@takealot.com and CGSO info@cgso.org.za unchanged. Takealot's page metadata shows a re-save on 2026-05-22 (Yoast `dateModified`; it read 2026-02-05 when the 2026-05-07 correction above was made) with no wording change; nothing since. For the record: the office-bearer names, liquor-licence number and PAIA link described in the Q3 entry as newly surfaced were already in the 2026-04-25 capture. Still deliberately not incorporated (non-negotiable #3). Raw extracted text is kept with the maintainer's working notes (not published). The dated Wayback captures listed below are the public record. `retrieved` bumped to 2026-11-10.

**2026-11-17 (interim check, one week after Q4):** Live T&Cs rendered with the same whole-DOM extractor and diffed against the 2026-11-10 extraction. **No change** to the terms text; only JavaScript-built navigation differs. Yoast `dateModified` still 2026-05-22. Complaints line "087 362 8000" and legal@takealot.com unchanged. `reverified_on` bumped to 2026-11-17. New Wayback capture: [20261117203437](https://web.archive.org/web/20261117203437/https://terms-and-policies.takealot.com/terms-conditions/).

Wayback captures of this URL relied on, oldest first: [20260425124023](https://web.archive.org/web/20260425124023/https://terms-and-policies.takealot.com/terms-conditions/) · [20260701142522](https://web.archive.org/web/20260701142522/https://terms-and-policies.takealot.com/terms-conditions/) · [20261110140857](https://web.archive.org/web/20261110140857/https://terms-and-policies.takealot.com/terms-conditions/).

## How to refresh this snapshot

1. Fetch https://terms-and-policies.takealot.com/terms-conditions/.
2. Diff against the verbatim quotes above.
3. Flag material changes; update the relevant CLAUSES entry in `src/data/content.ts`.
4. Bump the `retrieved` date in this frontmatter.
5. If the changes are material, preserve this snapshot as a sibling file: a new dated snapshot goes in a new file with the new date.

## Status

Dated extracts, quoted for criticism and review (Copyright Act 98 of 1978, s 12(1)(b)), for the clauses the site relies on: registered entity, unilateral changes, High Court forum selection, order cancellation, marketplace sellers and resale, plus (since 2026-11-18) order completion, cart and wish list, delivery, deals, gift vouchers and account suspension; companion Returns Policy at [`takealot-returns-2026-04-24.md`](./takealot-returns-2026-04-24.md). Fair-dealing snapshot retained for research / criticism / review.
