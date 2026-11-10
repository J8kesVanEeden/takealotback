// TakealotBack — content data (clauses, templates, law, escalation, FAQ, etc.)
// Source: Obsidian vault v2 content (23 April 2026 verification pass).
// DO NOT rewrite content here. If anything looks wrong, flag it and raise it
// against the vault first. See Build Brief / Content Map for the update flow.

export interface Angle {
  stat: string;
  body: string;
}

export interface Clause {
  n: string;
  slug: string;
  title: string;
  takealot: string;
  angles: Angle[];
  why: string;
  template?: string;
  escalate: string;
  canonical?: boolean;
}

export interface Template {
  code: string;
  title: string;
  scenario: string;
  subject: string;
  body: string;
}

export interface QuickHit {
  n: string;
  head: string;
  body: string;
  ref: string;
  featured?: boolean;
}

export interface LawItem {
  id: string;
  title: string;
  blurb: string;
}

export interface LawGroup {
  group: string;
  items: LawItem[];
}

export interface EscalationTier {
  tier: number;
  title: string;
  window: string;
  body: string;
  contact: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface WarrantyAngle {
  n: number;
  title: string;
  body: string;
}

export interface PlaybookItem {
  letter: string;
  when: string;
  play: string;
}

export interface PolicySummary {
  returns: string[];
  terms: string[];
}

export const LAST_REVIEWED = "2026.11.10";
// Takealot publishes no policy version or "last updated" date, so this records
// the date we last checked the live policy pages against our snapshots.
export const TAKEALOT_POLICY_REVIEWED_AGAINST = "as live on 2026.11.10";
export const GITHUB_REPO_URL = "https://github.com/J8kesVanEeden/takealotback";

export const CLAUSES: Clause[] = [
  {
    n: "01", slug: "time-limits", title: "Time Limits",
    takealot: "30 days for wrong item on delivery, damaged on delivery, missing parts, or change of mind. 6 months for defective items.",
    angles: [
      { stat: "CPA s 56(2)", body: "6 months for defective goods, irrespective of Takealot's policy. s 51(3) voids any term that tries to shorten this." },
      { stat: "ECT Act s 44", body: "7 days for any reason on most online purchases (s 42(2) carves out specific categories — see Clause 10). This is your statutory floor, on top of Takealot's 30-day grace." },
      { stat: "CPA s 20", body: "Return of unsatisfactory goods is narrow — direct-marketing cooling-off, no opportunity to examine, mixed-goods delivery, or specifically-communicated purpose (10 business days). Not a general change-of-mind right." },
      { stat: "CPA s 19 / s 20", body: "For purchases that aren't online (e.g. bought in store and delivered), s 19 lets you inspect on delivery and refuse wrong or damaged goods. For most online orders s 19 switches itself off where ECT s 46 governs performance (s 19(1)(b)) — but the NCC and CGSO's March 2026 joint paper still reads s 20 with s 19 as giving online buyers the right to inspect, refuse goods that don't match the order, and claim a refund. Either way: refuse obviously wrong or damaged items at the door." },
      { stat: "Common law breach", body: "Non-conforming delivery is a contract breach with remedies alongside the statutory ones." },
      { stat: "Davis couch (2026)", body: "Takealot refused a defective couch because it was reported 35 days after delivery — outside its 30-day damage window. Knowler: \"Section 56 of the Consumer Protection Act gives consumers 6 months, not 30 days, to return goods that are defective\". Once she raised it, Takealot apologised and refunded in full; it said its returns team had \"followed its standard policy\" (EWN, 23 July 2026). Lesson: open deliveries promptly and photograph them, but a defect found later is still inside s 56." },
    ],
    why: "Takealot often collapses \"this was defective from day one\" into \"you missed the 30-day damage window.\" Defective goods is s 56 — you have 6 months.",
    template: "T01", escalate: "CGSO · NCC · Small Claims Court (up to R30,000)",
  },
  {
    n: "02", slug: "original-packaging", title: "Original Packaging",
    takealot: "Returns require original packaging, all accessories and parts, and intact seals. In practice this is the most weaponised clause in Takealot's policy: returns get rejected on \"original packaging\" grounds where the consumer marked the brown delivery box, opened a barcoded cellophane bag to inspect the goods, or is missing a cosmetic accessory unrelated to the defect.",
    angles: [
      { stat: "Takealot's own admission", body: "After Wendy Knowler put two parallel rejections to Takealot — Toby Shapshak's Lego return (rejected because the brown delivery box had a return-code marker on it) and Robyn Arnold's cutlery return (rejected because the barcoded cellophane bag had been opened) — the company conceded the rejections and stated, in writing: \"Takealot does not expect shoppers to return products in the original, undamaged or altered Takealot box.\" Quote it back at any agent invoking \"original packaging\" against your delivery container." },
      { stat: "Delivery box ≠ product packaging", body: "\"Original product packaging\" means the manufacturer's product packaging (the Lego box), not the supplier's brown delivery box. Shapshak's Stuff SA column documents the Takealot agent treating the delivery box as the original packaging. When Wendy Knowler later put the case to Takealot, its spokesperson said the rejection was \"due to human error\" and that the employees involved had been retrained. The takeaway: a marker mark on the brown delivery box is not a packaging-condition breach." },
      { stat: "Inspection ≠ damage", body: "Robyn Arnold's argument, on Knowler's account: \"It's not possible to look at the quality of the item without opening the bag. I dispute the fact that with online purchases one is expected to satisfy oneself as the quality of a product from the photograph alone, without looking at the actual item, which one would be able to do when purchasing in a physical shop.\" Her point stands on common sense and on Takealot's own concession above, not on a statute: a barcoded cellophane bag broken to inspect the goods is not damaged packaging. (CPA s 19's inspection right switches off for most online orders — s 19(1)(b) — but the regulators' 2026 joint paper still backs an online buyer's right to inspect; see below.)" },
      { stat: "Unrelated missing component", body: "On Wendy Knowler's framing in the Mokoena golf-cart case: \"Strictly speaking, if the missing component is totally unrelated to the defect, the retailer does not have the legal right to reject a claim on the six-month Consumer Protection Act warranty.\" Mokoena's caddy was delivered without a cosmetic cupholder and worked fine until its battery failed in month six; Takealot rejected the s 56 claim citing the missing cupholder. Reversed on Knowler's intervention; the legal position before intervention was the same." },
      { stat: "CPA s 56", body: "Does not require original packaging for defective goods. The warranty attaches to the goods, not the box." },
      { stat: "CPA s 20(6)", body: "On a return under s 20 (not ordinary change-of-mind — see Clause 01), goods in the original unopened packaging carry no charge at all, and opened goods only a reasonable charge for use, consumption or restoration. s 20(6) sets the price of a return, not a right to refuse one." },
      { stat: "NCC + CGSO joint paper (2026)", body: "You cannot assess whether goods comply with s 55 without opening them. The regulators' own March 2026 joint paper says CPA s 20 (read with s 19) ensures \"consumers have the right to inspect an item purchased online\" — and inspecting means opening." },
      { stat: "ECT Act s 44", body: "Modest inspection (the consumer needs to be able to assess what they're keeping) is consistent with exercising the cooling-off right — though the section itself doesn't address the point directly." },
      { stat: "CPA s 48", body: "Blanket \"no packaging = no return\" for defective goods is a candidate for unfair-term challenge." },
      { stat: "CGSO case study (2025/26)", body: "On a cooling-off exchange of an online purchase, a supplier demanded a 15% handling fee because the bed was no longer in its original packaging (the complainant said the supplier's own driver had removed it). The Ombud found the fee \"inconsistent with section 44 of the ECTA, which expressly limits the supplier's recovery to the direct transportation or return costs\"; the supplier dropped it (CGSO Annual Report 2025/26)." },
      { stat: "CPA s 51", body: "Any term that waives s 56 rights is void under s 51(3)." },
      { stat: "Practical advice", body: "Report missing components on delivery the same day, even if you don't want them. Knowler's Mokoena case: the cupholder was missing on delivery, Mokoena didn't report it because he didn't need it, and that opened the procedural door six months later. Reporting on the day closes the door — Takealot's own response: \"Any incomplete deliveries or missing product components must be immediately reported to us upon receipt, as this enables us to rectify such matters promptly and effectively.\"" },
    ],
    why: "Keep the manufacturer's product packaging when you can. Don't accept \"no packaging, no return\" for a defective item — the warranty attaches to the goods. Don't accept rejections invoking the brown delivery box as \"original packaging\" — Takealot itself has stated it does not expect that. And don't accept the missing-cosmetic-accessory pretext on a defect that has nothing to do with the missing accessory.",
    template: "T02", escalate: "CGSO",
  },
  {
    n: "03", slug: "damage-exclusions", title: "Damage Exclusions",
    takealot: "An item won't be accepted as damaged on delivery if damaged by the consumer, by electrical surges, or by use for an unintended purpose.",
    angles: [
      { stat: "Edan Traders v NCT", body: "Onus on the supplier. You have to show the item has problems, not what caused them; Takealot has to prove the damage was your doing (Full Court, Gauteng, 2026). Bare assertion isn't enough — demand the assessment." },
      { stat: "CPA s 55(2)(c)", body: "Goods must stay usable and durable for a reasonable period. Early failure is evidence they fell short — make Takealot explain it with an actual assessment." },
      { stat: "CPA s 53(1)(a)", body: "\"Defect\" is a material imperfection, or any characteristic, that makes the goods less acceptable, useful or safe than people are reasonably entitled to expect in the circumstances (s 53(1)(a)(i)–(ii)). Ordinary South African conditions are part of \"the circumstances\"." },
      { stat: "Surge defence", body: "Takealot must prove an actual surge event occurred. A competent technician can tell a surge-damaged board from a manufacturing defect — ask for that report." },
      { stat: "Unintended use", body: "Read narrowly. Unless the manual forbids the use, the exclusion doesn't bite." },
      { stat: "Contra proferentem", body: "Ambiguous exclusion clauses are read against the drafter — in the CPA, s 4(4)(a) says any ambiguity in a supplier's document is resolved to the consumer's benefit." },
    ],
    why: "These are reflex refusals. Demand the technical basis and the evidence.",
    template: "T03", escalate: "CGSO",
  },
  {
    n: "04", slug: "unlock-codes", title: "Unlock Codes for Data Devices",
    takealot: "For items that store data (phones, laptops, tablets, security cameras, NAS), Takealot asks for unlock codes or passwords. Refusal may result in the return being refused — Takealot's policy frames this as discretionary (\"can refuse\") rather than automatic. The policy also warns that Takealot \"might need to perform a factory reset\" during assessment, so you could lose your data.",
    angles: [
      { stat: "POPIA s 10", body: "Minimality. \"Personal information may only be processed if… adequate, relevant and not excessive.\" Live credentials exceed what's needed for a technical assessment." },
      { stat: "POPIA s 19", body: "Security safeguards. Responsible parties must take \"appropriate, reasonable technical and organisational measures.\" Live credential handover is itself a security risk." },
      { stat: "CPA s 56", body: "Does not require credential handover. A factory-reset device is the assessable state — and Takealot's own returns policy says \"when assessing your return, we might need to perform a factory reset which means that you could lose the data on your device.\" Back up, sign out of your accounts, and reset it yourself before it goes." },
      { stat: "CPA s 51", body: "Conditioning a s 56 remedy on credential surrender is a prohibited waiver." },
      { stat: "CPA s 48", body: "Unfair term — there is no legitimate technical purpose for live credentials post-reset." },
      { stat: "Info Regulator", body: "Lodge through the eServices Portal at eservices.inforegulator.org.za — register a profile, then submit the complaint there; the Regulator's complaints page says that is how to lodge. Its contact page also lists POPIAComplaints@inforegulator.org.za for POPIA complaints. Questions: toll-free 0800 017 160." },
    ],
    why: "Factory-reset before return. Refuse live credentials. Report to the Information Regulator if they insist.",
    template: "T04", escalate: "CGSO + Information Regulator",
  },
  {
    n: "05", slug: "bundle-return", title: "Pre-Packed Bundle Return", canonical: true,
    takealot: "If a product is a pre-packed bundle and only one item is defective, you must return the whole bundle. Partial returns may be refused.",
    angles: [
      { stat: "CPA s 53(1)(a)", body: "\"Defect\" is a material imperfection in the goods. A defect in one independently-replaceable component is not a defect in the working components." },
      { stat: "CPA s 55 + s 56", body: "The warranty attaches to the failed goods. Working parts aren't \"defective goods\" under s 56." },
      { stat: "s 53(1)(a) applies to the goods in issue", body: "The CPA defines a defect as a material imperfection in \"the goods\" — which, in a bundled sale, is the bundle you were sold. If one component's failure means the bundle no longer does what the bundle was sold to do, the s 56 remedy runs against the supply. If the failed component is independently replaceable and the rest of the bundle works as sold, only the failed component is \"defective goods\" under s 56. The question is functional, not semantic." },
      { stat: "CPA s 51", body: "Requiring return of non-defective goods as a condition of a s 56 remedy operates as a waiver — void under s 51(3)." },
      { stat: "CPA s 48", body: "Forcing return of installed, configured, data-holding equipment is a candidate for unfair-term challenge." },
      { stat: "POPIA overlay", body: "For data-storage devices, compelled full-bundle return creates unnecessary data exposure — strengthens the s 48 unfairness case." },
    ],
    why: "This is the single clause most often used to force consumers to give up — especially on smart-home and security systems. Refusing to return working parts is your legal entitlement.",
    template: "T05", escalate: "CGSO + Information Regulator where data-storage devices are involved",
  },
  {
    n: "06", slug: "credit-vs-refund", title: "Credit vs Refund",
    takealot: "For wrong-item / damaged / missing / change-of-mind returns where replacement stock is unavailable, Takealot defaults to loading refund credit to your account. (On defective returns the policy itself concedes the election — you choose repair, replacement, account credit, or refund.) That refund credit then expires after 3 years: \"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit.\" Gift vouchers have their own separate 3-year validity.",
    angles: [
      { stat: "CPA s 56(2)", body: "Consumer elects the remedy — repair, replace, or refund. Credit is not a statutory option unless the consumer agrees to it." },
      { stat: "CPA s 20(5)", body: "On a s 20 return the supplier \"must refund to the consumer the price paid for the goods\", less any charge s 20(6) allows. The Act says refund, not credit." },
      { stat: "Gareeb v Incredible Connections", body: "An electronics retailer refused a refund on a laptop that failed days after sale and offered only an in-store software fix. In an unopposed case the National Consumer Tribunal held that the CPA \"requires the respondent to act according to the consumer's direction\", that the retailer \"abused its power by dictating the remedy\", and ordered the full R21,999 refunded (2024). Pushing credit when you chose a refund is the same move." },
      { stat: "NCC v Fugui Trading", body: "A shop notice saying \"NO MONEY BACK\" and \"You are allowed to return a item for another item not for money\" was itself an unfair term: in an unopposed case the National Consumer Tribunal held the notice breached CPA s 48(1)(a)(ii), and fined the shop R100,000 for that and a separate labelling breach (2026). A policy that defaults to credit where the law gives you a refund rests on the same logic." },
      { stat: "CPA Reg 44 + s 48", body: "Regulation 44(3)(q) presumes unfair a term that lets the supplier keep a consumer's payment \"where the latter fails to conclude or perform the agreement\", without a matching right for the consumer if the supplier fails. A 3-year forfeiture of refund credit is not a neat fit for (q) — you didn't default — but it is the same kind of one-way forfeiture, and the Reg 44(3) list is \"non-exhaustive\" (Reg 44(2)(b)). So argue it under s 48 directly: credit that came from money you paid, for goods the supplier failed to supply, shouldn't simply lapse — especially where Takealot loaded it without you electing credit under s 56(2)." },
      { stat: "ECT s 44(3)", body: "On cooling-off cancellation, full refund is due within 30 days." },
      { stat: "Cancellation context", body: "On a Takealot-initiated cancellation (out of stock / pricing error / system error), the consumer is entitled to elect cash refund instead of account credit. Wendy Knowler, parenthetical on the Chelsea Christmas-books case (News24, 21 December 2025): \"In such cases, you don't have to accept a credit; you can insist on a refund.\" Insist in writing; reference ECT s 46(3) on the 30-day refund window; if the credit has already loaded, follow up with the chargeback route in parallel." },
      { stat: "Chargeback", body: "If Takealot insists on credit, a card chargeback is a live alternative — scheme rules trump internal policy." },
    ],
    why: "Credit is a default, not a right. You elect the remedy. Say \"refund to original payment method\" in writing and cite s 56(2). Expect Takealot to fall back on \"not all defects can be repaired, and we may not always have replacement stock available\" — that's their soft-landing for collapsing the election back to credit. The statutory election isn't contingent on their inventory position. Push back: no stock means replacement isn't available; it doesn't mean you lose the option to elect a cash refund.",
    template: "T06", escalate: "CGSO · chargeback in parallel",
  },
  {
    n: "07", slug: "manufacturer-deflection", title: "Manufacturer Deflection",
    takealot: "Direct manufacturer warranty: consumer deals with manufacturer. Extended warranty via supplier; if supplier repair/replacement exceeds 21 days from the date the item is received at the supplier's returns evaluation facility, Takealot refunds or credits. The supplier may also charge you an evaluation fee.",
    angles: [
      { stat: "CPA s 56(1)", body: "Three-tier warranty — producer/importer, distributor, AND retailer each warrant compliance with s 55. You can proceed against any link." },
      { stat: "CPA s 56(4)", body: "The section 56 warranty is in addition to, not in substitution for, any manufacturer or common-law warranty." },
      { stat: "CPA s 55(2)(c)", body: "Reasonable durability. If Takealot advertised a 2-year manufacturer warranty, that shapes the durability benchmark — and the retailer is on the hook for it." },
      { stat: "CPA s 41", body: "False, misleading, or deceptive representation. If Takealot advertised a warranty the manufacturer now won't honour, that's a s 41 claim against Takealot for the damages flowing from the misrepresentation." },
      { stat: "ECT s 43", body: "Before you pay, an online seller must show the terms of sale, \"including any guarantees\", and a sufficient description of the goods (ECT s 43(1)(h), (k)). If it didn't, you can cancel within 14 days of receiving the goods (s 43(3)). A misrepresented warranty itself is a CPA s 41 claim." },
      { stat: "21-day trigger", body: "Takealot's own policy triggers direct refund/credit if extended-warranty repair exceeds 21 days from receipt at the supplier's evaluation facility — hold them to their own trigger, and demand written confirmation of the receipt date so the clock can't slide." },
      { stat: "Evaluation fee", body: "Takealot's policy reserves the supplier's right to charge an evaluation fee. Within the 6-month s 56 window, that fee sits with the supplier under s 56(2) (\"at the supplier's risk and expense\") — not the consumer. Beyond 6 months, where Takealot advertised the warranty, the fee is arguably a s 55(2)(c) / s 41 cost against Takealot, because the warranty representation induced the sale. Push back on any evaluation fee billed to you during an active s 56 claim." },
    ],
    why: "The manufacturer is one of your routes, not your only route. Within 6 months Takealot is primarily on the hook. Beyond 6 months s 55(2)(c) + s 41 still run against Takealot where they advertised the warranty.",
    template: "T07", escalate: "CGSO · ARB (for the advertising claim)",
  },
  {
    n: "08", slug: "defective-exclusions", title: "Defective Exclusions",
    takealot: "A defective item won't be accepted if faulty due to normal wear and tear, consumer damage, electrical surges, sea air corrosion, consumer modification, or unintended use.",
    angles: [
      { stat: "Wingfield v NCT", body: "Exclusions require proof. A supplier that blames your use has to prove it — the Western Cape High Court rejected a dealer that \"merely speculated\" (2025). Demand the technical report; the exclusion list is the argument, not the evidence." },
      { stat: "CPA s 55(2)(c)", body: "\"Normal wear and tear\" presupposes normal durability. Premature failure is not wear and tear — it's a defect." },
      { stat: "Coastal disclosure", body: "Sea-air corrosion: if sold without a \"not for coastal use\" disclosure, this exclusion is hard to sustain for a device sold to an SA consumer." },
      { stat: "CPA s 56(1)", body: "Consumer modification exclusion is narrow — only bites where the modification plausibly caused the failure." },
      { stat: "Intended use", body: "Read broadly. Unless the manual explicitly forbids what you were doing, the unintended-use exclusion doesn't fit." },
      { stat: "Surge evidence", body: "A surge-damaged board looks different from a manufacturing-defect board. A competent technician can tell. Ask for that technician's report." },
    ],
    why: "Exclusions are often deployed on initial inspection with no deep technical work. A proper challenge — demanding the assessment, naming the onus, citing s 55(2)(c) — often flips the decision.",
    template: "T03", escalate: "CGSO",
  },
  {
    n: "09", slug: "rejected-disposal", title: "Disposal of Rejected Returns",
    takealot: "If Takealot rejects a return and the consumer is unavailable for, or refuses, re-delivery for 30 days, Takealot treats the item as abandoned and may dispose of it.",
    angles: [
      { stat: "Bailment", body: "While the goods are in Takealot's possession for assessment they hold them as bailee. Duty of care is not wholly excluded by a returns policy." },
      { stat: "Delict", body: "Wrongful destruction of property gives a damages claim independent of the sales contract." },
      { stat: "CPA s 48", body: "A term allowing disposal during a contested dispute is a strong candidate for unfair-term challenge." },
      { stat: "CPA s 52", body: "Courts (including Small Claims) can declare a term unenforceable for unconscionability." },
      { stat: "Contract", body: "The abandonment clause cannot operate against a contested rejection — you haven't abandoned anything." },
      { stat: "Evidence", body: "Put objection in writing before day 30. Create the record. File with CGSO immediately." },
    ],
    why: "The 30-day disposal clock is a pressure tactic — accept the item back (and drop the dispute) or they destroy it. Resist. File with the CGSO before the clock runs down.",
    template: "T08", escalate: "CGSO · Small Claims Court if disposed",
  },
  {
    n: "10", slug: "non-returnable", title: "Non-Returnable Items",
    takealot: "Intimate items, underwear, swimwear, jewellery; foodstuffs and everyday-consumption; unsealed audio/video/software; books and periodicals (regardless of seal); personalised items; made-to-specification items.",
    angles: [
      { stat: "ECT s 42(2)", body: "Most of these exclusions are valid under ECT s 42(2) — but that only disapplies s 44 (cooling-off). It does not touch s 43, s 46, or the CPA." },
      { stat: "CPA s 56", body: "A \"non-returnable\" flag never bars a defective-goods return. Takealot's own policy confirms this — digital and hygiene items are still returnable when defective." },
      { stat: "\"No warranty at all\" framing is wrong", body: "Takealot has been documented telling consumers that non-returnable items have \"No warranty at all, except for delivery damages.\" That is legally wrong. Per Wendy Knowler (TimesLive, 24 November 2023), responding to a reader who was told this on three books: \"That's a bit confusing as the six-month Consumer Protection Act warranty against defects applies, but not the seven-day 'change your mind' cooling-off period.\" The s 42(2) carve-out goes to ECT s 44 (cooling-off). Section 56 still runs. A defective book, a digital code that doesn't work, an unsealed software bundle missing the licence — all still trigger the s 56 election." },
      { stat: "ECT s 42(2)(f)", body: "Personalised-items exclusion is narrow — only goods made to the consumer's specifications. A standard item in your chosen size/colour is not personalised." },
      { stat: "ECT s 42(2)(g)", body: "Unsealed audio/video/software is excluded only from ECT s 44 cooling-off. Does not touch s 56." },
      { stat: "CPA s 41", body: "If a non-returnable item is not-as-described, a s 41 misrepresentation claim still runs." },
      { stat: "CPA s 61", body: "If perishable goods cause illness, product liability is unaffected by the non-returnable flag." },
      { stat: "Listing-tag misuse", body: "A product listing on Takealot cannot be tagged \"non-refundable\" outside the s 42(2) carve-outs. ECT s 44 makes every online purchase refundable within 7 days regardless of listing wording. In Wendy Knowler's reporting (News24, 2 November 2025), Takealot refused a wrong-size T-shirt return on a \"non-refundable\" listing tag; on Knowler's intervention, the company confirmed the tag was a \"human error\" and the listing was \"delisted until this has been corrected.\" Cite the case, demand the refund, and read the credit-vs-refund election (Clause 06) — within the 7-day window the consumer is entitled to insist on cash to the original payment method, not credit." },
    ],
    why: "Digital ≠ unreturnable. Defective digital items are still defective goods. \"Hygiene\" does not swallow your s 56 rights. And a listing tag does not extend the carve-outs — a \"non-refundable\" T-shirt is still refundable under ECT s 44.",
    template: "T10", escalate: "CGSO",
  },
  {
    n: "11", slug: "coupons-vouchers", title: "Coupons and Vouchers",
    takealot: "Vouchers paid toward a purchase return as non-refundable Takealot credit. Coupons return as a new coupon, possibly with different terms.",
    angles: [
      { stat: "Contract principle", body: "Vouchers and coupons are non-cash consideration. Their value does not automatically convert to cash on return. This much is valid." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(i) to the CPA presumes unfair any term \"enabling the supplier to unilaterally alter the terms of the agreement\". A materially worse replacement coupon fits." },
      { stat: "CPA s 48", body: "Replacement coupon with tighter expiry, narrower eligibility, or unusual conditions = unfair-term challenge." },
      { stat: "CPA s 51", body: "If the replacement operates as a waiver of a statutory refund right, it's vulnerable under s 51." },
      { stat: "CPA s 63", body: "For a voucher you paid for (a prepaid gift voucher, not a free promotional coupon), the money paid belongs to the bearer until it's redeemed, and the voucher can't expire within three years of issue (s 63(1)–(3)). The NCC and CGSO's March 2026 joint paper adds that where a voucher was partly used, \"the consumer has the right to redeem the remaining value\"." },
      { stat: "Original T&Cs", body: "Check the original coupon's terms. If the replacement differs, that's a contract-breach argument on top of the s 48/s 51 angles." },
      { stat: "Evidence", body: "Screenshot the original coupon terms at time of use. Wayback Machine for disputes." },
    ],
    why: "Read the replacement coupon terms carefully. If materially worse, object in writing and reference Regulation 44.",
    template: "T01", escalate: "CGSO",
  },
  {
    n: "12", slug: "unilateral-changes", title: "Unilateral Term Changes",
    takealot: "Takealot may change any provision of the agreement at any time without notice; continued use = acceptance.",
    angles: [
      { stat: "Retroactivity", body: "Changes cannot operate retroactively. Your order is governed by the terms in force on the order date." },
      { stat: "CPA s 51", body: "Statutory rights under the CPA, ECT Act, or POPIA cannot be waived by a policy change. Any such term is void under s 51(3)." },
      { stat: "CPA Reg 44", body: "The \"grey list\" in Regulation 44(3)(i) presumes unfair any term \"enabling the supplier to unilaterally alter the terms of the agreement\". Takealot's clause fits squarely." },
      { stat: "CPA s 48", body: "Substantive unfairness review. \"Excessively one-sided or so adverse as to be inequitable.\"" },
      { stat: "Contract", body: "Unilateral variation is enforceable for future dealings only — it doesn't rewrite a concluded contract." },
      { stat: "Within-transaction shift", body: "The same principle applies inside a single transaction. In the Shapshak case (Stuff SA, 26 January 2024) Takealot's original return-acceptance email cited one set of T&Cs — \"Please do not mark the original product packaging, and include all parts and accessories\" — but the rejection email cited a different, longer set of T&Cs that had not appeared in the original. Introducing new conditions after a return has been logged is the within-a-transaction analogue of the policy-version mismatch. Quote the agent the original email's terms back at them." },
      { stat: "Evidence", body: "Screenshot the policy in force when you place a significant order. Archive the PDF. Keep every email Takealot sends in a return — first response, collection notification, rejection. The terms cited at each stage matter." },
    ],
    why: "If Takealot tries to apply a later version of the policy to an earlier order — or different rules at different stages of the same return — push back. Screenshot the policy at order time for significant purchases. Save every email; the terms cited at acceptance must match the terms cited at rejection.",
    template: "T09", escalate: "CGSO",
  },
  {
    n: "13", slug: "high-court-jurisdiction", title: "High Court Jurisdiction",
    takealot: "The T&Cs name the High Court (Western Cape Division, Cape Town) as the forum for any legal matters between Takealot and you, and add — verbatim — that this applies \"even if the disputed amount would typically be heard by a lower court.\" That qualifier is the operative one: it tries to push small-value disputes past the cheaper Magistrates' or Small Claims forums.",
    angles: [
      { stat: "CPA s 69", body: "Sets out the consumer's enforcement routes — Tribunal (where permitted), applicable ombud, CGSO under s 82(6), provincial consumer court, accredited ADR under s 70, NCC under s 71, or a court with jurisdiction. A contract can't close off statutory routes." },
      { stat: "Motus v Wentzel", body: "The SCA in Motus Corporation v Wentzel [2021] ZASCA 40 offered obiter guidance (paras 26–27) that, read with s 34 of the Constitution, s 69(d) \"should not lightly be read as excluding the right of consumers to approach the court\", and that its reference to remedies \"in terms of national legislation\" need not mean an ombud-first hierarchy. Counsel for the appellants expressly declined to pursue the point, so the court \"did not hear full argument on the matter\" and recorded that the issues \"will need to be resolved on another occasion.\" It is direction, not holding — but it's SCA direction, and the reasoning has been picked up by commentary at ENSafrica and Cliffe Dekker Hofmeyr. A forum-selection clause that tries to push you past a cheaper lower court is still attacked primarily under s 48 read with Regulation 44 and s 51(3); Motus gives you a strong answer to an \"exhaust the ombud first\" defence; it doesn't by itself strike the clause." },
      { stat: "Pure Silk v Martin", body: "The Western Cape High Court (December 2025) held that a consumer does not have to work through the s 69 complaint bodies before going to court, and declined to follow contrary decisions from other divisions: the CPA \"does not contemplate preventing consumers from approaching a court even prior to having knocked at the doors of the forums listed in section 69.\" Courts elsewhere still differ, but the Western Cape is the forum Takealot's own T&Cs choose." },
      { stat: "CGSO (compulsory scheme)", body: "Takealot is a mandatory participant in the CGSO under the Consumer Goods and Services Industry Code of Conduct gazetted under CPA s 82 (March 2015). Compulsory participation was upheld in CGSO NPC v Voltex [2021] ZAGPPHC 309 (26 March 2021); non-participation contravenes CPA s 82(8). Takealot names CGSO as escalation point in its own T&Cs. Use it." },
      { stat: "Small Claims Court", body: "Up to R30,000. No attorneys. No court fee to issue the summons. You can serve it yourself; if the sheriff serves it, the fixed tariff is R79 plus R7.50 a km travel (since 28 November 2025)." },
      { stat: "Magistrates' Court", body: "District Magistrates' up to R200,000. Regional Magistrates' R200,000–R400,000 (concurrent with High Court above R200,000). High Court above R400,000, with exclusive jurisdiction beyond regional's ceiling." },
      { stat: "CPA s 48 / s 51", body: "A forum-selection clause pushing consumers to the most expensive forum is a candidate for unfair-term and statutory-waiver challenge." },
    ],
    why: "You are not stuck with the High Court for a R2,500 dispute. CGSO, NCC, Small Claims Court, and Magistrates' Court remain available.",
    template: "T14", escalate: "CGSO · Small Claims Court (up to R30,000) · Magistrates' Court (up to R400,000)",
  },
  {
    n: "14", slug: "order-cancellation", title: "Order Cancellation",
    takealot: "Takealot may cancel a confirmed order for any reason — out-of-stock, payment issues, listing errors (including pricing), or account-abuse / criminal-activity investigation. Marketplace sellers get the same power: \"Sellers on our platform may also, for any reason, cancel an item they are responsible for.\"",
    angles: [
      { stat: "Contract formation", body: "Takealot's own terms say your \"order is only complete once you have paid and received an order confirmation.\" From that point there is a contract at the confirmed price. Cancelling it afterwards relies on Takealot's \"for any reason\" term, and that term is open to challenge as unfair (below)." },
      { stat: "Not CPA s 23", body: "The CPA's displayed-price rule switches itself off for online orders: s 23(1)(b) says it does not apply where ECT s 43 applies, which covers every takealot.com order. Don't cite s 23 against Takealot — argue the contract and the unfair cancellation term instead." },
      { stat: "CGSO Advisory Note 10", body: "Pricing errors online: the Ombud's published view in 2021 (Advisory Note 10, [2021] ZACGSO 10) is that, unless the supplier's terms say otherwise, a supplier \"is bound by a consumer's acceptance of the offer and the advertised price\" — unless the price was so far off that you ought to have realised it was a mistake. A R2.99 TV won't hold; a believable sale price that turned out to be wrong is worth contesting. Takealot's terms do reserve a right to cancel for pricing errors, so against Takealot this works only together with the unfair-term argument below." },
      { stat: "CPA s 48 + Reg 44(3)(k)", body: "Takealot's terms let it cancel a confirmed order \"for any reason\", naming pricing errors. Regulation 44(3)(k) presumes unfair any term \"allowing the supplier to terminate the agreement at will where the same right is not granted to the consumer\" — and under Takealot's own terms you can cancel only if your order page shows a 'cancel' button (your ECT s 44 cooling-off and s 46 late-delivery rights aside). The presumption can be rebutted, but Takealot has to justify the term." },
      { stat: "CPA s 47(3)", body: "On shortage-cancellation, the supplier must (a) refund with interest at the prescribed rate, and (b) compensate for costs directly incidental to the breach — unless beyond control and reasonable steps taken. No \"double damages\" — but s 112 administrative fine applies separately." },
      { stat: "ECT s 46", body: "Online orders must be executed within 30 days unless otherwise agreed. If they aren't, you may cancel on 7 days' written notice — or insist on delivery instead (the CGSO's Advisory Note 10 reads s 46 that way). If the item is unavailable, Takealot must tell you immediately and refund within 30 days of telling you (s 46(3))." },
      { stat: "Cover damages", body: "If you had to buy the equivalent elsewhere at a higher price, the difference is a damages claim." },
      { stat: "Late delivery — the silent cancel", body: "ECT s 46 also covers the slower pattern: order placed, promised date passes, no delivery, no communication. Documented in Wendy Knowler's Knight case (News24, 27 September 2024): R3,700 order placed 17 August, promised 30 August, undelivered by 16 September, ignored emails and calls. Knowler's intervention triggered next-day delivery. Path: written 7-day notice citing s 46(2); if still undelivered, cancel and demand your money back. If Takealot says the item is unavailable, s 46(3) sets a 30-day refund deadline from that notice. Don't accept Takealot framing the courier as the responsible party — your contract is with Takealot, not the courier." },
      { stat: "CPA s 54 — paid delivery missed", body: "Paid extra for same-day or next-day delivery and it came late? A delivery you pay for separately is a service: s 54(1)(a) gives you the right to \"the timely performance and completion of those services\", and s 54(2)(b) lets you require the supplier to \"refund to the consumer a reasonable portion of the price paid\" for a service that fell short. For a missed premium slot, a reasonable portion is arguably the whole premium, since speed is what it paid for — ask for it as a refund, not account credit. Expect Takealot to point to its terms calling delivery dates \"estimates\"; answer that a paid premium slot is a specific agreed condition." },
      { stat: "CPA s 31 \u2014 pre-ticked paid delivery", body: "EWN reported (2 September 2026) that faster paid delivery options \"can now be selected by default\" at Takealot checkout, so \"customers could end up paying for delivery even when their order qualifies for free standard shipping.\" If you were charged for a paid option you didn't actively choose, the charge is arguably void: s 31 bars a supplier from offering to \"enter into or modify an agreement\" on the basis that it \"will automatically come into existence, unless the consumer declines\", and says such an agreement or modification \"is void\". Caveat: this rests on a press report — we don't independently verify reporting in the press, we haven't checked the checkout ourselves, and Takealot's checkout may change at any time. No court or regulator has applied s 31 to a checkout default yet. Check what's selected before you pay; if a paid option was pre-selected, ask for the fee back." },
      { stat: "System-error cancellation", body: "An automated cancellation can be wrong on its own facts. In Knowler's Christmas-books case (News24, 21 December 2025) Takealot cancelled a book as out-of-stock and credited the consumer R147 — then dispatched the cancelled book the next day. Takealot's own admission: \"A system error incorrectly flagged an in-stock item as cancelled.\" If the item was in stock, there was no shortage and no error to rely on — the cancellation has no basis, and you can insist on delivery or on a refund rather than credit." },
    ],
    why: "Pricing errors and post-confirmation cancellations are a common friction point. The consumer-side argument is stronger than people realise. Late or silent non-delivery is the same beast wearing a different coat — same statutory remedies (ECT s 46, CPA s 47), same paper trail.",
    template: "T10", escalate: "CGSO · Small Claims Court for difference",
  },
  {
    n: "15", slug: "marketplace-sellers", title: "Marketplace Sellers",
    takealot: "Sellers are responsible for the items they sell on our platform.",
    angles: [
      { stat: "CPA s 56(1)", body: "Three-tier warranty runs against producer/importer, distributor, AND retailer. \"Retailer\" on a platform transaction can include the platform operator — depending on the facts." },
      { stat: "CPA s 61(3)", body: "Product-liability is joint and several across the supply chain. Proceed against any link." },
      { stat: "ECT s 43", body: "Platform has direct information and disclosure obligations under ECT regardless of seller identity. The CGSO's published view (per Lee Soobrathi in News24, 06 April 2025) is that ECT s 43 requires the supplier to inform customers how and when they can \"access and maintain a full record of the transaction\" — a duty the platform inherits as the consumer-facing party." },
      { stat: "ECT s 43(1)(m) — transaction record", body: "An online seller must tell you \"the manner and period within which consumers can access and maintain a full record of the transaction\" (ECT s 43(1)(m)). (The CPA's own sales-record section, s 26, switches off where ECT s 43 applies — s 26(1)(a) — so for online orders this is the record duty.) In the Wales / Lenovo case (News24, 06 April 2025) Takealot could not produce an invoice once the third-party seller went quiet. Without an invoice you cannot claim on a manufacturer warranty, so the missing record matters." },
      { stat: "CPA s 27 — intermediary", body: "An intermediary must disclose the prescribed information to the people it sells to on a third party's behalf, and \"keep the prescribed records of all relationships and transactions\" (s 27(1)). CGSO Lee Soobrathi (News24, 06 April 2025): \"The approach of the CGSO is that an e-commerce platform hosting third-party business products will be regarded as an intermediary for the purpose of the Consumer Protection Act, and as such will need to comply with these provisions.\" That was the CGSO's view on the Wales case: once Takealot acted as the consumer-facing party in a third-party sale, the consumer should not be left to chase the seller for the records." },
      { stat: "CGSO jurisdiction", body: "CGSO handles complaints against Takealot even where the item was sold by an other-seller. Takealot's own T&Cs name the CGSO as escalation point without distinguishing seller type." },
      { stat: "NCC + CGSO joint paper (2026)", body: "The two regulators' stated view (Consumer Protection in E-Commerce, March 2026): \"it is the responsibility of the hosting platform to resolve disputes and to ensure that third party sellers comply with all provisions of the CPA and ECTA.\" Making platforms jointly liable with sellers is so far only a proposal in the paper, but both regulators already treat resolving the dispute as the platform's job." },
      { stat: "Apparent authority", body: "Takealot handles checkout, payment, delivery, and returns logging. It looks and feels like Takealot is the supplier — courts may give weight to that when resolving s 1 \"supplier\" ambiguity." },
      { stat: "CPA s 40", body: "Takealot itself (and anyone acting as its agent) may not use pressure, harassment or unfair tactics when supplying goods or recovering them from you. The section governs the supplier's own conduct; it doesn't make Takealot answer for another seller's." },
      { stat: "Stolen goods — vetting failure", body: "In November 2019 Axel Scholle bought an HP laptop on Takealot from a third-party reseller (Nanotec Digital) for ~R14,000. In October 2022 it was remotely locked as stolen property of the Department of Agriculture. Takealot had already suspended Nanotec Digital two months earlier — in August 2022 — for selling stolen goods. Yet on Scholle's return, Takealot first refunded, then reversed the refund citing \"tampering\" because Scholle had upgraded RAM/HDD then removed the upgrades for the return. The cycle ran: refund → reverse → refund → reverse → refund, and was only settled after both Wendy Knowler (TimesLive, 06 November 2022) and MyBroadband (December 2022) covered the case. Practical lesson: when a refund has already flipped once, ask for the next payment to go to your bank account, not store credit — Scholle's own request, to stop further reversals." },
      { stat: "Vetting is the platform's claim", body: "Takealot's own framing in the Scholle case: \"All our sellers are vetted and have also provided contractual obligations and warranties that they comply with the law.\" That representation is itself the s 41 hook — if vetting failed and the platform represented vetting as the consumer-protection mechanism, the consumer relied on the representation. Use it." },
      { stat: "Competition Commission finding", body: "In July 2023 the Competition Commission's Online Intermediation Platforms Market Inquiry found that Takealot trading through its own Retail division on its marketplace \"creates a conflict of interest\", and said \"Takealot is required to segregate its Retail division from its Marketplace operations\". It is a competition remedy aimed at sellers, not a consumer-law ruling — but it undercuts any \"the seller is solely responsible\" deflection." },
      { stat: "Resolution pattern", body: "The Wales case followed a documented pattern: direct engagement → \"third-party seller is solely responsible\" → News24 escalation, with the CGSO's view on record → Takealot contacted him within an hour of publication and gave him a replacement laptop (News24 follow-up, 13 April 2025). Use the same path, but formally: a CGSO complaint citing the platform's s 27 record-keeping duty and ECT s 43." },
    ],
    why: "Don't let them punt you to an other-seller to avoid their own platform and supply-chain liability. The CGSO's published view treats Takealot as an intermediary under s 27, which must keep the records of the transactions it handles, and ECT s 43(1)(m) requires the seller to give you access to a full record of the transaction — regardless of who the underlying seller is. The CPA's three-tier warranty includes the retailer; the platform's own vetting representation is itself a s 41 hook when vetting fails. Direct your s 56 claim — and your invoice / records demand — at Takealot; pursue the other-seller in parallel. If a refund flips, demand the next payment to bank account.",
    template: "T11", escalate: "CGSO — name both Takealot and the other-seller",
  },
  {
    n: "16", slug: "digital-items", title: "Digital Items",
    takealot: "Digital items (downloads, gaming codes, course codes) are only returnable if defective.",
    angles: [
      { stat: "ECT s 42(2)(g)", body: "Unsealed audio/video/software is excluded from ECT s 44 cooling-off only — once consumed, can't be un-consumed. Fair in principle." },
      { stat: "Scope limit", body: "s 42(2)(g) applies to ECT s 44 only. It does not disapply CPA s 56, nor ECT s 43 (disclosure) or s 46 (performance)." },
      { stat: "CPA definition", body: "\"Goods\" under the CPA is defined broadly — explicitly includes data, software, code, and licences. A defective digital item is defective goods." },
      { stat: "CPA s 55 + s 56", body: "Defective digital content must be fit for purpose, work as described, and be usable. A code that doesn't work, a course that doesn't unlock, an e-book with missing pages = s 56 claim." },
      { stat: "ECT s 46", body: "Non-delivery of a digital item (you paid, nothing arrived) is non-delivery, not change-of-mind. The order must be executed within 30 days unless agreed otherwise; if it isn't, you may cancel on 7 days' written notice." },
      { stat: "s 56(2) election", body: "For a defective digital good you elect replacement or refund. Takealot doesn't get to force \"store credit for a non-working code.\"" },
    ],
    why: "Digital ≠ unreturnable. Defective digital items are still defective goods.",
    template: "T12", escalate: "CGSO",
  },
  {
    n: "17", slug: "resale-prohibition", title: "Resale Prohibition",
    takealot: "Do not resell any item purchased on our platform. If you do, we may suspend or terminate your account and cancel pending orders. (Separately, the T&Cs reserve the right to suspend or terminate any account \"at any time and for any reason\".)",
    angles: [
      { stat: "TMA s 34(2)(d)", body: "Statutory exhaustion. Trade Marks Act 194 of 1993 s 34(2)(d): sale of goods to which the mark has been applied with the proprietor's consent does NOT constitute infringement. Once consented-to goods hit the market, resale of genuine unaltered goods doesn't infringe the mark." },
      { stat: "Contract vs lawful", body: "The resale clause may bind you personally as a matter of contract (breach = account termination). It does not make the downstream resale legally invalid. Title passes to you on delivery — you can sell your own property." },
      { stat: "TRC v Sony", body: "Television Radio Centre v Sony Kabushiki Kaisha 1987 (2) SA 994 (A), [1987] ZASCA 32 — decided under the old 1963 Trade Marks Act: video recorders converted after Sony marked them were no longer the \"genuine goods\" Sony had marked, so selling them under the SONY mark infringed. Resale protection covers genuine goods as marked, not materially altered ones." },
      { stat: "Frank & Hirsch", body: "Frank & Hirsch v Roopanand Brothers 1993 (4) SA 279 (A) — where a separate SA copyright owner controls the packaging/get-up, parallel imports can still be blocked on copyright grounds." },
      { stat: "CPA s 56", body: "Purchase intent is not a statutory ground for refusing a s 56 return. A \"must have bought to resell\" allegation is not a valid basis to reject a defective return." },
      { stat: "Practical", body: "This clause is occasionally wielded as a workaround to refuse defective returns. Push back: your s 56 rights are not conditioned on intent of purchase." },
      { stat: "Credit on a closed account", body: "The T&Cs also say Takealot \"may, at any time and for any reason, suspend or terminate your Takealot account.\" If that happens while your account holds refund credit, that credit came from money you paid. Takealot's returns policy itself contemplates you asking \"for a refund\" of unused credit — ask in writing for the balance to be paid to your bank account." },
    ],
    why: "Intent of purchase is not a statutory ground for refusing a s 56 return. If Takealot cites the resale clause as a reason to reject a defective return, push back and refer to s 56.",
    template: "T07", escalate: "CGSO",
  },
  {
    n: "18", slug: "mis-returned-items", title: "Mis-Returned Items",
    takealot: "If you return the wrong item, Takealot disposes of it and does not pay for the loss.",
    angles: [
      { stat: "Bailment", body: "Takealot holds returned goods as bailee — duty of care cannot be wholly excluded. Reasonable steps to identify mis-returned items (serials, associated order) are required." },
      { stat: "Delict", body: "Negligent destruction is actionable. Immediate disposal without reasonable inspection may be negligent." },
      { stat: "CPA s 48", body: "Blanket liability-exclusion for destroyed consumer property is a candidate for unfair-term challenge." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(b) presumes unfair a term that excludes or restricts your remedies against the supplier when it breaches its obligations." },
      { stat: "Mitigate fast", body: "Notify Takealot the moment you realise, in writing. Photograph what you're returning. Note serial numbers. Create the paper trail." },
      { stat: "Damages", body: "If they destroy despite your timely notice, you have a damages claim under delict or s 48." },
      { stat: "Reverse mis-collection", body: "Mis-returns can run in the opposite direction too — Takealot dispatching a courier to collect an item the consumer never received. Documented in Wendy Knowler's Christmas-books case (News24, 21 December 2025): when Chelsea reported a book had not been delivered, \"Takealot sent a courier driver — on two occasions — to collect the book that I told them I do not possess.\" Refuse the collection, document the refusal, and treat it as confirmation that the system has not registered your non-delivery report. Keep escalating in writing until the system catches up to reality." },
      { stat: "GPS ≠ proof of delivery", body: "Where Takealot claims an order was delivered but the consumer never received it, the platform's first-line defence is sometimes \"the delivery driver's GPS coordinates matched the delivery address.\" GPS coordinates are evidence of where the driver was; they are not evidence of what happened to the parcel. Per Wendy Knowler (News24, 27 September 2024) on a R600 whisky-not-delivered case: GPS matched, \"yet, no delivery signature could be produced.\" The relevant evidence is a signed proof-of-delivery (or a no-signature delivery confirmation acknowledged by the consumer), not the courier's trip log." },
    ],
    why: "Double-check every return before handing over. Photograph what you're returning. Note serial numbers. If you realise you've sent the wrong item, notify Takealot immediately and in writing. And if Takealot tries to come collect an item you never had, refuse the collection in writing — that pattern means the system hasn't registered your non-delivery report.",
    template: "T08", escalate: "CGSO · Small Claims Court or Magistrates' Court for damages",
  },
  {
    n: "19", slug: "restocking-redelivery-fees", title: "Restocking and Re-Delivery Fees",
    takealot: "If a return fails Takealot's packaging, seal or completeness check, Takealot refuses the return and sends the item back. If you re-log the return, Takealot reserves the right to charge a fee for collection and a fee for re-delivering the same or a replacement item to you.",
    angles: [
      { stat: "CPA s 56(2)", body: "A defective-goods return under s 56 is at the supplier's risk and expense. A collection fee or re-delivery fee on a defective return shifts the statute's cost allocation back onto the consumer — which is exactly what s 56(2) does not allow." },
      { stat: "CPA s 51(3)", body: "Any term that waives, defeats or avoids a right conferred by the Act is void. A packaging-condition fee that recovers s 56(2) costs from the consumer is a waiver of the \"supplier's risk and expense\" right." },
      { stat: "CPA s 48", body: "Unfair, unreasonable, unjust terms. A fee levied against a consumer who is exercising a statutory remedy is presumptively unfair, especially where Takealot chose the outbound courier and the outbound packaging." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(b) treats as presumptively unfair any term that excludes or restricts the consumer's legal rights or remedies against the supplier in the event of breach. Regulation 44(3)(g) catches any term that modifies the normal rules of risk-distribution to the consumer's detriment — exactly what a packaging-condition fee does when it shifts s 56(2)'s \"supplier's risk and expense\" allocation back onto the consumer." },
      { stat: "CPA s 20(6)", body: "s 20(6) permits a reasonable restoration charge only in narrow circumstances on a non-defective return — and not where the consumer had to open the packaging to determine conformity or fitness. It does not license a generalised restocking fee and doesn't reach defective-goods returns." },
      { stat: "CGSO case study (2025/26)", body: "Inside the 7-day ECT cooling-off, \"the only charge that may be levied on the consumer is the direct cost of returning the goods\" (ECT s 44(2)). The Ombud applied exactly that to a 15% packaging \"handling fee\" on an online return and the supplier dropped it (CGSO Annual Report 2025/26)." },
      { stat: "s 53(1)(a) framing", body: "If the goods are materially imperfect the return sits under s 56, not s 20. The packaging-condition check cannot be used to re-characterise a defective return as a change-of-mind return and import a restoration charge." },
    ],
    why: "On a defective return a packaging-condition fee isn't allowed — the statute says defective returns happen at the supplier's risk and expense. Inside the 7-day online cooling-off, the only charge allowed is the direct cost of returning the goods. Outside both, Takealot's own terms apply. Don't pay a fee on a defective return; challenge it.",
    template: "T15", escalate: "CGSO · chargeback on the fee itself if already debited · NCC for pattern evidence",
  },
  {
    n: "20", slug: "inspection-assessment-delay", title: "Open-Ended Inspection & Assessment",
    takealot: "On a defective-goods return Takealot says \"when we receive the item, we'll inspect it.\" The policy doesn't give a deadline for the inspection, doesn't name the technical standard applied, and doesn't spell out how you contest a rejection. Extended-warranty items go through a supplier evaluation that is only bounded by the 21-day refund trigger.",
    angles: [
      { stat: "CPA s 56(2)", body: "The consumer elects the remedy — repair, replace, or refund — the moment the goods fail to comply with s 55. s 56(2) doesn't gate that election on a supplier-determined inspection outcome. An inspection process that holds the election hostage indefinitely is a de-facto waiver of the statutory right." },
      { stat: "Supplier's risk and expense", body: "A s 56(2) return is made \"without penalty and at the supplier's risk and expense\". The cost and delay of the supplier's own inspection falls on the supplier, not on the consumer waiting for a remedy." },
      { stat: "CPA s 48", body: "A term or process that is excessively one-sided or so adverse as to be inequitable is unfair. An open-ended inspection clock with no SLA and no defined standard sits comfortably inside that definition — especially where the consumer has cash tied up in a failed purchase." },
      { stat: "CPA Reg 44(3)(j)", body: "Regulation 44(3)(j) presumes unfair any term \"giving the supplier the right to determine whether the goods or services supplied are in conformity with the agreement\". Takealot's own inspection is evidence, not the final word on whether your item is defective. If you dispute the outcome, the dispute goes to the CGSO or a court — not back to Takealot." },
      { stat: "CPA s 51(3)", body: "Any contractual mechanism that operates as a waiver of s 56 rights is void. A policy process that practically defeats the s 56(2) election by indefinite delay is vulnerable under s 51(3), even if the policy wording itself doesn't use the word \"waiver.\"" },
      { stat: "CGSO Advisory Note 1", body: "The Ombud's own position (para 9.3): inspection is acceptable only \"in appropriate cases, where there is a genuine reason for believing that the [supplier] may not be liable\", and the item must come back \"speedily (a maximum of 7-10 days if the item needs to be sent away)\". A routine, open-ended inspection doesn't meet that." },
      { stat: "CGSO 60-day benchmark", body: "CGSO's published resolution target is 60 business days, and supplier response is 15 business days. Those numbers are a useful comparator: an internal inspection that takes longer than a full CGSO complaint is prima facie unreasonable." },
      { stat: "Paper trail", body: "Put the inspection demand in writing with a hard deadline (7–14 business days is defensible). State that if there's no written outcome by then, you'll treat it as a refusal and escalate. File with CGSO on the day the deadline lapses." },
    ],
    why: "Takealot's inspection step has no SLA in the policy. That's the lever — in practice it's where s 56 claims go to die. Give it a deadline yourself, in writing, and hold them to it.",
    template: "T16", escalate: "CGSO · NCC if the delay is a pattern across multiple consumers",
  },
  {
    n: "21", slug: "item-substitution", title: "Item Substitution / Wrong Goods Delivered",
    takealot: "Takealot's policy treats \"not what I ordered\" as a 30-day damaged-on-delivery / wrong-item return: log a \"Not What I Ordered\" return on your profile, the item is collected, replacement or refund follows. Their public position is that the company \"takes full accountability\" for picking, supplier, and labelling errors. In practice, when the substituted item is opened or used, Takealot's first response can refuse the return for \"missing accessories\" — even where the consumer paid for goods of materially different value (e.g. a R14,000 iPhone vs a sub-R400 calculator).",
    angles: [
      { stat: "CPA s 55(2)(a)", body: "Goods must be reasonably suitable for the purposes for which they are generally intended. A calculator is not the goods you bought when you ordered an iPhone — the s 55 quality warranty is breached at the threshold. Substitution isn't \"defective goods\" in the colloquial sense; it's failure of consideration plus a s 55(2)(a) breach." },
      { stat: "CPA s 41", body: "The product page is a representation. Delivering goods that materially do not match the listing is a misrepresentation under s 41(1) — even where unintentional. Material substitution (R14k iPhone delivered as sub-R400 calculator) is the textbook case." },
      { stat: "Refuse at the door", body: "Where you can spot the substitution at the door, refuse the parcel — something materially different isn't what you ordered, and ECT s 46 governs performance of the order you placed. The NCC and CGSO's March 2026 joint paper also reads CPA s 20 with s 19 as letting online buyers refuse goods that don't match the order and claim a refund. Where you spot it after opening, the same applies, plus s 56 if what arrived is defective." },
      { stat: "CPA s 56(2)", body: "On the legal frame that substitution is a non-conforming delivery, s 56 still applies and the consumer elects the remedy — replacement of the goods actually ordered, or refund. Account credit is not available unless the consumer chooses it." },
      { stat: "Common-law contract", body: "Performance of a sale of X by delivery of Y is non-performance. The consumer can rescind for fundamental breach and demand restitution of the price. This runs alongside the statutory remedies and is sometimes the cleaner path where the supplier is hiding behind a returns-policy procedural obstacle." },
      { stat: "Procedural defences (calculator pattern)", body: "Refusal-on-procedural-grounds is the documented pattern. In Wendy Knowler's reporting (News24, 12 April 2026) Takealot refused Thandi Bila's R14,000 calculator return on the basis that \"the return item is missing its accessories\" — as if the calculator's accessories, not the iPhone she'd paid for, were the issue. Re-frame the return: this is not a return of the calculator under the original return policy; this is restitution after non-performance of a R14,000 contract for a different product." },
      { stat: "Evidence — Knowler's advice", body: "Where practically possible, open the box in front of the delivery person. If the contents do not match what you ordered, photograph the contents in the delivery person's hands. The \"Not What I Ordered\" claim is dramatically easier to win on contemporaneous evidence than on after-the-fact narrative." },
      { stat: "Resolution pattern", body: "Knowler-reported substitution cases consistently end the same way: direct engagement → procedural refusal → media or ombud escalation → reversal. Bila received the R14,000 credit after News24 took up the case. The pattern matters because it shows the policy framework can be made to honour s 55(2)(a) — but it sometimes takes external pressure." },
    ],
    why: "If Takealot delivers something materially different from what you paid for, you are not asking for a goodwill return. You are asking for the goods you bought, or your money back. The right legal frame is non-performance of the sale plus s 55(2)(a) breach plus s 41 misrepresentation — not change-of-mind. Don't accept a procedural refusal on accessories or packaging.",
    template: "T17", escalate: "CGSO · NCC for the pattern · Small Claims Court for the price difference if remedy delayed",
  },
  {
    n: "22", slug: "recall-noncompliance", title: "Recall Non-Compliance",
    takealot: "Takealot told Wendy Knowler (News24, 17 April 2026) that on the Citro-Soda recall it \"engaged all affected customers as per our standard recall procedures, offering a refund in the form of the original payment method.\" In practice, on the ESR HaloLock power-bank recall (published by the NCC in April 2026), consumers were refused refunds on the basis that the manufacturer's 12-month warranty had expired. On the Citro-Soda Regular recall (SAHPRA), one consumer was issued a coupon valid for two days as the recall \"refund\" — which expired in his spam folder before he saw it.",
    angles: [
      { stat: "Headline argument", body: "A recall — whether ordered by the NCC under s 60 or notified by the supplier, as the ESR one was — is strong evidence the goods were never safe, good-quality goods under s 55. Within 6 months of delivery that gives you the s 56 return-and-refund election. Beyond 6 months, lean on the recall itself: the NCC's ESR notice told consumers to \"return them to a point of purchase for a refund\", and a retailer that refuses is going against the recall's own instruction. Report it to the NCC, and back it with s 55(2)(c) (goods must be usable and durable for a reasonable period). \"The manufacturer's 12-month warranty has expired\" is not an answer to either." },
      { stat: "CPA s 60", body: "s 60(2): if the NCC has reasonable grounds to believe goods may be unsafe and the producer or importer hasn't taken the steps an industry code requires, it can by written notice require the producer to investigate, or to \"carry out a recall programme on any terms required by the Commission\". Many recalls — the ESR power bank among them — are instead notified by the supplier and published by the NCC. Either way, the recall's own terms are the refund route." },
      { stat: "CPA s 55 + s 56", body: "s 55 gives you the right to safe, good-quality goods that stay usable and durable for a reasonable period (s 55(2)(c)) — with no six-month cap. But the s 56 return-and-refund election runs only \"within six months after the delivery\". The ESR buyers on record bought in October and November 2024; the NCC notice came in April 2026, so s 56 had lapsed for them. What remained: the recall notice's own refund instruction, a s 55 complaint to the CGSO or NCC, the common-law remedies for a defect hidden at the time of sale (3 years — see the aedilitian-remedies page), and s 61 if the product caused harm." },
      { stat: "CPA s 41", body: "A listing that still presents a recalled product as safe to buy, after the recall is public, is arguably a misleading representation about a material fact under s 41. (CPA s 58 is narrower than it is often cited: it covers risky activities and facilities (s 58(1)), and safe-handling notices on the packaging of hazardous goods (s 58(2)) — not listings.)" },
      { stat: "CPA s 61", body: "If a recalled product causes harm — a fire, an injury, damaged property — s 61 makes the producer, importer, distributor and retailer liable without proof of negligence, and where more than one is liable their liability is joint and several (s 61(3)). Takealot is a retailer. \"We are merely the platform\" is not a defence; a retailer's escape routes are the narrow s 61(4) ones, such as it being unreasonable to expect the retailer to have discovered the defect — a hard argument once a recall is public." },
      { stat: "NCC enforcement", body: "Recall powers sit in CPA s 60 (Chapter 2). If a supplier ignores the NCC, the NCC can issue a compliance notice (s 100); if that is ignored, it can either ask the National Consumer Tribunal to impose an administrative fine (s 100(6)(a), s 112) or refer it for prosecution as an offence (s 100(6)(b), s 110(2)) — not both. In the ESR power-bank case Knowler reported Takealot's recall responses to the NCC. A consumer denied a recall remedy can lodge directly with the NCC." },
      { stat: "Refund must be substantively equivalent", body: "A recall refund is a refund of the price paid in money or money-equivalent. A coupon valid for two days is not substantively equivalent. Where Takealot has substituted a coupon for a refund, demand the refund in money to the original payment method, citing the recall instruction (and s 56(2) if you're within 6 months of delivery). In Knowler's reporting on the Citro-Soda case, Takealot eventually credited the consumer the full coupon value as \"goodwill\" — which is the right outcome, late." },
      { stat: "ECT s 44 / s 46 — does not apply", body: "Recalls are not cooling-off cancellations. Don't let Takealot frame a recall return as a s 44 cooling-off (which would invite the 7-day-from-delivery argument) or a change-of-mind return. The instruction is the recall's, not your choice; the relevant frame is the recall notice plus CPA s 55 / s 56, not the cooling-off framework." },
      { stat: "Coupon-funded purchases", body: "Where the original purchase was paid using a Takealot coupon (Naidoo's case), Takealot's first response was to reissue the coupon with the original (short) validity. That is not a refund. Demand a money-equivalent credit valid for at least the standard 3-year period (Takealot's own credit-validity standard for non-coupon-funded refunds); cite s 48 (unfair-term) on the differential. Knowler's reporting confirms Takealot eventually conceded the full coupon value." },
    ],
    why: "When a product you bought is recalled, the recall notice is your refund route — return it to where you bought it. Within 6 months of delivery you also have the s 56 election. \"12-month warranty has expired\" is not a defence to a recall refund. If Takealot refuses, escalate in parallel — to the manufacturer directly (Ben Hart's ESR power-bank case showed manufacturer engagement worked when Takealot stonewalled), to the NCC for the recall non-compliance, and to the CGSO.",
    template: "T18", escalate: "Manufacturer (often the fastest route) · NCC · CGSO · ARB if Takealot's listing still represents the product as safe",
  },
];

export const TEMPLATES: Template[] = [
  { code: "T01", title: "Return Request", scenario: "Opening a return for wrong item / damaged on delivery / missing parts / change of mind / defective goods.",
    subject: "Return request — Order #[ORDER]",
    body: `Hi,

I am logging a return for [item] delivered on [date] under Order #[ORDER].

The basis of the return is [select one: wrong item delivered / damaged on delivery / missing parts / defective goods per CPA s 56 / cancellation within the ECT Act s 44 7-day cooling-off period].

I am electing [replacement / refund to original payment method] as my remedy.

Please confirm within 5 business days that Takealot will process the return at no cost to me.

Regards,
[Name] / [Order number] / [Contact]` },
  { code: "T02", title: "Packaging Push-back", scenario: "Takealot refusing a defective-goods return for want of original packaging or tags.",
    subject: "Defective item return — Order #[ORDER]",
    body: `Hi,

I am not returning this item as change-of-mind. This is a return under section 56 of the Consumer Protection Act because the item is defective. Section 56 applies irrespective of Takealot's returns policy and does not impose an original-packaging condition on defective-goods returns. Section 51(3) renders any contract term that waives or limits section 56 rights void to the extent of the contravention.

Please confirm within 7 business days that Takealot will accept the return and action [repair / replacement / refund] as elected under section 56(2).

Regards,
[Name]` },
  { code: "T03", title: "Demand Technical Evidence", scenario: "Takealot rejected a s 56 claim citing wear, consumer damage, surge, coastal corrosion, modification, or misuse — with no technical substantiation.",
    subject: "Rejection of claim — technical basis required — Order #[ORDER]",
    body: `Hi,

Takealot has rejected the return of [item] on the basis of [normal wear and tear / consumer damage / electrical surge / sea air corrosion / modification / unintended use].

I am not required to prove what caused the fault: the onus is on the supplier to prove the exclusion it relies on (Edan Traders v National Consumer Tribunal [2026] ZAGPJHC 386; Wingfield Motors v National Consumer Tribunal [2025] ZAWCHC 385). Please provide the technical report or assessment supporting the rejection, the specific exclusion relied on, and the evidence on which the conclusion rests. A conclusion unsupported by evidence is not a basis on which a section 56 election can be refused.

Please provide the above within 7 business days or process the return on the basis of my section 56 election.

Regards,
[Name]` },
  { code: "T04", title: "POPIA Data Protection", scenario: "Takealot requiring live unlock codes on a data-storage device as a precondition for return.",
    subject: "Data security on returned device — Order #[ORDER]",
    body: `Hi,

I will factory-reset the defective [item] before return. A factory-reset device allows full technical assessment without exposing personal data or credentials.

Section 56 of the Consumer Protection Act does not require live credentials as a precondition for return. Under the Protection of Personal Information Act, section 10 (minimality) requires that processing of personal information be adequate, relevant and not excessive for the purpose; section 19 requires appropriate, reasonable technical and organisational measures to secure personal information. Handing over live credentials exceeds what is necessary for a technical assessment.

Please confirm the return will be processed on this basis.

Regards,
[Name]` },
  { code: "T05", title: "Partial Bundle Return", scenario: "Takealot requiring return of the entire bundle to replace one defective component.",
    subject: "Partial bundle return — defective item only — Order #[ORDER]",
    body: `Hi,

I do not accept that return of the complete bundle is required for the replacement of a single defective component.

1. Only the [specific item] is defective. The remaining components of the bundle comply with the quality standard in section 55 of the Consumer Protection Act and are not "defective goods" for section 56 purposes.
2. The "defect" as defined in section 53(1)(a) of the CPA is a material imperfection assessed against the goods in question. A defect in one component does not render working components defective.
3. Section 56(2) of the CPA gives the consumer — not the supplier — the election of repair, replacement, or refund in respect of the failed goods.
4. Section 51 of the CPA prohibits contract terms that waive consumer rights conferred by the Act; section 51(3) renders such terms void to the extent of the contravention. A policy condition that requires return of non-defective goods to obtain a section 56 remedy on the defective one operates as a waiver and is vulnerable.
5. The CPA assesses "the goods in issue" as they were sold to me. A bundle sold as one purchase is assessed as one purchase, but a defect in one independently-replaceable component does not convert working components into defective goods. The s 56 remedy runs against the failed component; the rest of the bundle is not "defective goods" under s 56 and is not part of what I have elected to return.
6. [If data-storage devices: Compelled return of functional data-storage devices engages the Protection of Personal Information Act and amplifies the unreasonableness of the condition under section 48 of the CPA.]

I will return the single defective [item]. Please confirm within 7 business days.

Regards,
[Name]` },
  { code: "T06", title: "Refund Election", scenario: "Takealot defaulting to crediting your account instead of refunding on a defective-goods return.",
    subject: "Refund election — Order #[ORDER]",
    body: `Hi,

I am electing a cash refund to my original payment method, not store credit. Under section 56(2) of the Consumer Protection Act the consumer elects the remedy. Takealot's policy defaults to store credit on unavailable-replacement scenarios; where the return is under section 56 for defective goods, that default does not override the statutory election. The National Consumer Tribunal has held, in an unopposed matter, that a retailer which refuses the refund a consumer chose "abused its power by dictating the remedy" (Gareeb v Incredible Connections [2024] ZANCT 7).

Please process the refund to the original payment method and advise the timeline.

Regards,
[Name]` },
  { code: "T07", title: "Retailer Liability", scenario: "Takealot deflecting to the manufacturer for a defective-goods claim within the 6-month window.",
    subject: "Section 56 obligation — retailer liability — Order #[ORDER]",
    body: `Hi,

I will pursue the manufacturer warranty in parallel, but my primary claim is against Takealot. Section 56(1) of the Consumer Protection Act imposes the implied warranty on the producer or importer, the distributor, AND the retailer — each independently liable. Section 56(4) confirms that the section 56 warranty is in addition to, not in substitution for, any common-law or express warranty from the manufacturer. For the first 6 months my remedy election under section 56(2) runs against Takealot directly.

Please confirm within 7 business days that Takealot will repair, replace, or refund as I have elected.

Regards,
[Name]` },
  { code: "T08", title: "Do Not Dispose", scenario: "Takealot has rejected your return and is threatening to dispose of the item if you don't accept it back; you dispute the rejection.",
    subject: "Rejected return — DO NOT DISPOSE — Order #[ORDER]",
    body: `Hi,

I dispute the rejection. I do not accept the item back pending resolution. I do not consent to disposal — any disposal during a pending dispute would be wrongful destruction of my property, in respect of which I reserve the right to claim damages. I am filing a complaint with the Consumer Goods and Services Ombud today.

Please retain the item.

Regards,
[Name]` },
  { code: "T09", title: "Policy Version", scenario: "Takealot applying a newer policy version to an older order.",
    subject: "Applicable returns policy version — Order #[ORDER]",
    body: `Hi,

The applicable version of the returns policy for Order #[ORDER] is the version in force on [date of order], not any subsequent version. A unilateral variation clause is enforceable for future dealings only; it does not rewrite a concluded contract. In any event, my rights under the Consumer Protection Act and the ECT Act cannot be waived by a policy change — section 51(3) of the CPA renders any such waiver void. Regulation 44(3)(i) to the CPA presumes unfair any term enabling the supplier to unilaterally alter the terms of the agreement.

Please apply the policy in force on the order date.

Regards,
[Name]` },
  { code: "T10", title: "Wrongful Cancellation", scenario: "Takealot cancelled a confirmed order citing pricing error or out-of-stock.",
    subject: "Wrongful cancellation — Order #[ORDER]",
    body: `Hi,

Order #[ORDER] was cancelled on [date] on the stated basis [reason]. I do not accept the cancellation is lawful. A contract was concluded on my payment and your order confirmation.

Takealot's own terms state that an order is complete once the customer has paid and received an order confirmation. I paid and received that confirmation, so a contract was concluded at the confirmed price. A term allowing Takealot to cancel a confirmed order for any reason is presumed unfair under section 48 of the Consumer Protection Act read with Regulation 44(3)(k), because I have no equivalent right. [If the stated reason is a pricing error: the price shown was not so far from the item's usual price that I ought to have realised it was a mistake.]

Where the cancellation is due to shortage, section 47(3) of the CPA requires you to (a) refund me with interest at the prescribed rate from the date of payment, and (b) compensate me for costs directly incidental to your breach — unless the shortage was beyond your control and reasonable steps were taken. Under section 46 of the ECT Act, any refund flowing from a supplier's inability to perform is due within 30 days of notifying me of unavailability (s 46(3)).

Please either honour the order at the confirmed price or refund in full to my original payment method within 30 days, together with interest and the cost of sourcing an equivalent item elsewhere to the extent it exceeds the order price.

Regards,
[Name]` },
  { code: "T11", title: "Platform Liability", scenario: "Takealot deflecting to an other-seller / marketplace seller.",
    subject: "Platform liability — Order #[ORDER]",
    body: `Hi,

I understand the item was listed by [seller], an other-seller on your platform. My claim is against Takealot as the platform operator and as a member of the supply chain.

Section 56(1) of the Consumer Protection Act imposes the implied warranty on every link of the supply chain — producer or importer, distributor, and retailer. Section 61(3) makes liability joint and several. Section 43 of the ECT Act places information and disclosure obligations on the platform directly. The National Consumer Commission and the Consumer Goods and Services Ombud have jointly stated that "it is the responsibility of the hosting platform to resolve disputes and to ensure that third party sellers comply with all provisions of the CPA and ECTA" (Consumer Protection in E-Commerce, March 2026). The Ombud has jurisdiction over platform transactions, and Takealot names it as the escalation point in its own terms.

Please confirm within 7 business days how Takealot will address [issue].

Regards,
[Name]` },
  { code: "T12", title: "Digital Defective", scenario: "A digital code, download, or course doesn't work, is wrong, or was never delivered.",
    subject: "Defective digital item — Order #[ORDER]",
    body: `Hi,

The digital [code / download / course] under Order #[ORDER] [describe issue — doesn't work / wrong code / not delivered / expired on arrival].

Under section 56 of the Consumer Protection Act, defective digital goods are returnable within 6 months — the definition of "goods" in section 1 of the CPA expressly includes data, software, code and licences. Section 42(2)(g) of the ECT Act excludes unsealed audio, video and software only from the 7-day cooling-off right under section 44; it has no bearing on a section 56 defective-goods claim.

I am electing [refund / replacement].

Regards,
[Name]` },
  { code: "T13", title: "Warranty Enforcement", scenario: "Product failed within advertised manufacturer warranty period but beyond 6 months; manufacturer refused; Takealot disclaiming.",
    subject: "Warranty enforcement — manufacturer declined — Order #[ORDER]",
    body: `Hi,

Order #[ORDER], [product], purchased [date]. Failed on [date] — month [X] of ownership. Takealot's product page advertised [N-year] manufacturer warranty. Manufacturer declined (attached).

My claim against Takealot rests on the following:

1. CPA section 55(2)(c) — reasonable durability. The goods must be usable and durable for a reasonable period having regard to use and all surrounding circumstances. Where Takealot represented an N-year warranty, that representation is part of the circumstances shaping reasonable durability. A failure in month [X] breaches this standard.
2. CPA section 55(4)(a) — whether goods meet the quality standard depends on all the circumstances, including the manner in which, and the purposes for which, they were marketed. I relied on the product page's warranty representation.
3. CPA section 41 — false, misleading, or deceptive representations. Takealot advertised a warranty that the manufacturer has now declined to honour; I relied on that representation.
4. CPA section 56(1) — retailer warrants compliance with section 55 independently of the manufacturer.

Electing [repair / replacement / refund of the purchase price, with reasonable compensation for loss flowing from Takealot's section 41 representation].

Please confirm within 7 business days.

Regards,
[Name]` },
  { code: "T14", title: "CGSO Final Notice", scenario: "Direct engagement has failed; escalating to the ombud.",
    subject: "Final notice before CGSO referral — Order #[ORDER]",
    body: `Hi,

I refer to prior correspondence dated [dates]. Takealot has not provided the remedy to which I am entitled under section 56 of the Consumer Protection Act. This is a final opportunity to resolve the matter directly.

If I do not have written confirmation of [remedy] within 5 business days, I will file with the Consumer Goods and Services Ombud under the Consumer Goods and Services Industry Code of Conduct. Under the CGSO's published process, Takealot will have 15 business days to respond to the complaint, and the CGSO aims to resolve complaints within 60 business days.

I reserve the right to escalate further to the National Consumer Commission and, if necessary, to the Small Claims Court (up to R30,000) or Magistrates' Court.

Regards,
[Name]` },
  { code: "T15", title: "Re-Delivery Fee Pushback", scenario: "Takealot is threatening — or has already applied — a collection or re-delivery fee on a defective-goods return.",
    subject: "Re-delivery fee on defective return — Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. The item is defective within the meaning of s 53(1)(a) of the Consumer Protection Act, and I am exercising my s 56 election of remedy.

Takealot has indicated that a [collection fee / re-delivery fee / restocking fee] may be applied to the return. I do not accept that.

1. Under s 56(2), the return of defective goods takes place at the supplier's risk and expense. Collection and re-delivery costs fall on Takealot, not on me.
2. s 51(3) voids any contractual term that purports to waive a right conferred by the Act. A packaging-condition fee that recovers s 56(2) costs from me is a waiver.
3. s 48 prohibits unfair, unreasonable, unjust terms. Regulation 44(3)(b) lists as presumptively unfair any term that excludes or restricts the consumer's remedies against the supplier in the event of breach; Regulation 44(3)(g) catches any term that modifies the normal rules of risk-distribution to the consumer's detriment.
4. s 20(6) permits a reasonable restoration charge only on a non-defective return in narrow circumstances, and not where the consumer had to open the packaging to determine conformity or fitness. It does not extend to a defective-goods return.

Please confirm in writing, within 7 business days, that:

  (a) no collection fee will be charged for this return;
  (b) no re-delivery fee will be charged on the same item or a replacement;
  (c) my s 56 election — [repair / replace / refund] — will be given effect; and
  (d) if a fee has already been debited, it will be reversed in full.

Failing that I will escalate to the Consumer Goods and Services Ombud as a compulsory-participant matter under the Industry Code, and I will contest any debited fee with my card issuer under the applicable chargeback rules.

Regards,
[Name]
[Contact]
[Order number]` },
  { code: "T16", title: "Inspection Deadline", scenario: "Takealot (or its extended-warranty supplier) has received a defective item for inspection and the inspection is dragging with no communicated deadline or outcome.",
    subject: "Inspection deadline on defective-goods return — Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. The [item] was returned on [date] for inspection following a section 56 election of [repair / replacement / refund]. As of today, [N] business days have passed without a completed inspection outcome.

The Consumer Protection Act does not make the section 56(2) election conditional on a supplier-determined inspection. Under section 56(2) the goods are returned at the supplier's risk and expense; the cost and delay of the supplier's own assessment process is therefore the supplier's to carry; and under section 48 read with section 51(3), a process that defers the statutory remedy indefinitely is vulnerable as unfair and as a practical waiver of section 56 rights.

I would like to resolve this directly. I accordingly set the following deadline:

  (a) Takealot (or the supplier acting on Takealot's behalf) will provide a written inspection outcome within 7 business days of this email — by [DATE].
  (b) If the outcome is a rejection of the section 56 claim, it must identify the specific exclusion relied on and the evidence supporting it (see T03 for the underlying position on technical evidence).
  (c) If the outcome accepts the claim, I expect the elected remedy — [repair / replacement / refund] — within a further 7 business days.
  (d) If I do not receive a written outcome by [DATE], I will treat that as Takealot's refusal to give effect to my section 56 election and will file a complaint with the Consumer Goods and Services Ombud on that basis.

For reference, CGSO's published service standards give suppliers 15 business days to respond to a complaint and target 60 business days for resolution. An internal inspection that takes longer than a full CGSO complaint is not a reasonable assessment window.

The Ombud's own Advisory Note 1 ([2021] ZACGSO 1, para 9.3) accepts supplier inspections only "in appropriate cases, where there is a genuine reason for believing that the [supplier] may not be liable", with the item inspected and returned "speedily (a maximum of 7-10 days if the item needs to be sent away)".

Regards,
[Name]
[Contact]
[Order number]` },
  { code: "T17", title: "Wrong Goods Delivered (Substitution)", scenario: "Takealot delivered something materially different from what was ordered (e.g. an iPhone listing delivered as a calculator). The return is being refused on procedural grounds (\"missing accessories\" / \"item used\"), not on the substance.",
    subject: "Non-conforming delivery — full refund required — Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. On [date] I paid R[amount] for [item ordered, e.g. iPhone 15] on Takealot. The delivered item is [item received, e.g. a Casio calculator]. The two are materially different products at materially different prices. This is not a return under Takealot's returns policy — this is restitution of the purchase price after non-performance of the sale.

The legal position:

1. The sale contract was for [item ordered], not [item received]. Delivery of [item received] is not performance of that contract — it is non-performance, and I am entitled to rescind and recover the price.
2. Section 55(2)(a) of the Consumer Protection Act requires goods to be reasonably suitable for the purposes for which they are generally intended. [Item received] is not the goods I bought when I ordered [item ordered].
3. Section 41 of the Consumer Protection Act prohibits false, misleading or deceptive representations about a material fact, including the nature of goods. The product page represented the goods I would receive; what I received did not match.
4. I did not accept these goods as performance of my order. Delivery of different goods is not delivery of what I bought.
5. Takealot's own public statement (per its response to News24, 12 April 2026) acknowledges that "on the occasion that customers don't receive what they've ordered, we take full accountability and work swiftly to resolve them by collecting the incorrect item and delivering the right product as quickly as possible."

This is not a change-of-mind return. The "missing accessories" objection does not apply: the accessories of [item received] are irrelevant — I did not buy [item received].

Please confirm within 7 business days that Takealot will (a) collect [item received], and (b) refund R[amount] in full to my original payment method, OR deliver [item ordered] as originally paid for. If neither is forthcoming I will lodge with the Consumer Goods and Services Ombud and, in parallel, file a section 41 complaint with the National Consumer Commission.

Regards,
[Name]
[Contact]
[Order number]` },
  { code: "T18", title: "Recall Refund Demand", scenario: "An item bought through Takealot has been recalled (manufacturer recall, NCC recall, or SAHPRA recall) and Takealot is refusing the recall refund — typically on the basis that the manufacturer warranty has expired, or by issuing a short-validity coupon as the \"refund.\"",
    subject: "Recall refund — sections 55 and 56 CPA — Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. On [date] I bought a [item] for R[amount]. The product has since been recalled by [manufacturer / NCC / SAHPRA] on [recall date], reference [recall ID if known].

Takealot's response so far has been to [refuse the refund / issue a coupon valid for N days / refer me to the manufacturer]. That is not consistent with the company's obligations.

The legal position:

1. The recall of [item] by [the manufacturer / the National Consumer Commission / SAHPRA] is strong evidence that the goods were not safe, good-quality goods under section 55 of the Consumer Protection Act.
2. The recall notice instructs consumers to [quote the notice, e.g. "return them to a point of purchase for a refund"]. Takealot is my point of purchase.
3. "The manufacturer's 12-month warranty has expired" is not a defence. The recall notice provides for a refund at the point of purchase, and [within six months of delivery: section 56(2) independently gives me the election of a refund] [more than six months after delivery: section 55(2)(c) requires goods to be usable and durable for a reasonable period, which goods recalled as unsafe were not].
4. Section 61 of the Consumer Protection Act imposes strict liability for harm caused by unsafe goods on the producer, importer, distributor and retailer, jointly and severally where more than one is liable. Takealot is a retailer.
5. A refund must be substantively equivalent to the price paid. A coupon valid for [N] days is not. Where the original payment was via coupon, the substituted refund must be a money-equivalent credit valid for the standard credit-validity period.

Please confirm within 7 business days that Takealot will collect the recalled product and refund R[amount] in money to the original payment method (or, where the original payment was a coupon, a money-equivalent credit valid for the standard 3-year credit period).

If the refund is not provided I will:
  (a) report Takealot's non-compliance with the recall to the National Consumer Commission;
  (b) lodge with the Consumer Goods and Services Ombud in parallel;
  (c) approach the manufacturer directly (recalls are a manufacturer obligation as much as a retailer one);
  (d) where the listing still represents the product as safe, lodge with the Advertising Regulatory Board for the section 41 misrepresentation.

Regards,
[Name]
[Contact]
[Order number]
[Recall reference if known]` },
  { code: "T19", title: "Premium Delivery Fee Refund", scenario: "You paid extra for same-day or next-day delivery, it arrived late (or not on the promised day), and Takealot has offered account credit — or nothing — instead of refunding the fee.",
    subject: "Refund of premium delivery fee — Order #[ORDER]",
    body: `Hi,

On [date] I paid R[amount] for [same-day / next-day] delivery of Order #[ORDER], promised for [promised date/time]. It was delivered on [actual date/time] / has not been delivered.

Delivery charged for separately is a service. Section 54(1)(a) of the Consumer Protection Act gives me the right to "the timely performance and completion of those services", and section 54(2)(b) entitles me to require the supplier to "refund to the consumer a reasonable portion of the price paid for the services performed and goods supplied, having regard to the extent of the failure". The premium I paid was for the speed of delivery, which was not provided.

The paid premium was for speed, and speed was not delivered, so a reasonable portion of the price is the whole premium. The premium slot was a specific condition I paid for, not an estimate. Please refund the premium delivery fee of R[amount] to my original payment method within 7 business days. I do not accept account credit in place of the refund.

Regards,
[Name]
[Order number]` },
];

export const QUICK_HITS: QuickHit[] = [
  { n: "01", head: "Section 56, six months, \"without penalty and at the supplier's risk and expense\"",
    body: "The actual words from CPA s 56(2). A returns policy cannot override it — s 51(3) voids any contractual term that tries.", ref: "CPA s 56(2) + s 51(3)" },
  { n: "02", head: "You pick the remedy",
    body: "Repair, replace, or refund. The consumer elects under section 56(2). Never the supplier.", ref: "CPA s 56(2)" },
  { n: "03", head: "One defective thing ≠ return the whole set",
    body: "The CPA's defect test looks at the goods you were sold. If one independently replaceable part fails and the rest works as sold, only that part is defective.", ref: "CPA s 53(1)(a)" },
  { n: "04", head: "7 days for any reason, by law",
    body: "ECT Act section 44 gives every online buyer a 7-day no-fault return right. Takealot's 30-day window sits on top of that floor.", ref: "ECT Act s 44" },
  { n: "05", head: "Manufacturer warranty + CPA warranty run in parallel",
    body: "Takealot can't punt you to the manufacturer to escape section 56. Their liability is separate and concurrent.", ref: "CPA s 56(1)" },
  { n: "06", head: "CGSO is compulsory for Takealot, free for you",
    body: "The Consumer Goods and Services Ombud is the industry's mandatory Ombud scheme under the Code gazetted under CPA s 82. Takealot is required to engage — it's not a goodwill gesture. 15 business days to respond, 60 to resolve. Filing costs nothing.", ref: "cgso.org.za" },
  { n: "07", head: "Credit card chargeback", featured: true,
    body: "Your bank can reverse the transaction if Takealot doesn't deliver, doesn't refund, or ships defective goods. Most South African consumers don't know this exists.", ref: "Visa / Mastercard scheme rules" },
];

export const LAW_SECTIONS: LawGroup[] = [
  { group: "CPA", items: [
    { id: "s 16", title: "Right to cooling-off (direct marketing)", blurb: "5-business-day cooling-off for goods sold via direct marketing. Does not govern online retail — ECT s 44 does that." },
    { id: "s 17", title: "Right to cancel advance reservation", blurb: "Cancellation right for advance reservations, subject to a reasonable cancellation charge." },
    { id: "s 19", title: "Delivery, inspection, risk", blurb: "Right to inspect on delivery. Goods at supplier's risk until accepted. Does not apply where ECT s 46 governs performance (s 19(1)(b)) — i.e. most online orders — though the NCC and CGSO's 2026 joint paper still reads s 20 with s 19 as giving online buyers an inspection right." },
    { id: "s 20", title: "Return of unsatisfactory goods", blurb: "Narrow: direct-marketing cooling-off, no opportunity to examine, mixed-goods delivery, specifically-communicated purpose. Not a general change-of-mind right." },
    { id: "s 22", title: "Plain language", blurb: "Notices and documents must be in plain language. (The 'read it in the consumer's favour' rule for ambiguous terms is s 4(4)(a).)" },
    { id: "s 23", title: "Displayed price", blurb: "Displayed price binds — in a shop. Does not apply where ECT s 43 applies (s 23(1)(b)), so not to takealot.com orders. s 23(9) \"inadvertent and obvious\" error exception is narrow." },
    { id: "s 25", title: "Reconditioned / refurbished goods", blurb: "Conspicuous notice required — buyers must know they're not getting new." },
    { id: "s 26", title: "Sales records", blurb: "Written sales records. Does not apply where ECT s 43 applies (s 26(1)(a)) — so for online orders the record duty is ECT s 43(1)(m) instead." },
    { id: "s 27", title: "Disclosure by intermediaries", blurb: "An intermediary must disclose the prescribed information to the people it sells to on a third party's behalf, and keep the prescribed records of those relationships and transactions (s 27(1)). The CGSO's published interpretation is that an e-commerce platform hosting third-party sellers is an intermediary for CPA purposes." },
    { id: "s 40", title: "Unconscionable conduct", blurb: "Prohibited — covers physical force, coercion, undue influence, unfair tactics." },
    { id: "s 41", title: "False, misleading, deceptive representations", blurb: "Advertised warranty that manufacturer won't honour = retailer misrepresentation. Remedies: a court must give practical effect to your right to redress (s 4(2)(b)(ii)); where the Act gives no other sufficient remedy it can order compensation for losses relating to the transaction (s 52(3)); s 115 governs a civil damages claim." },
    { id: "s 47", title: "Over-selling and over-booking", blurb: "s 47(3): refund with interest plus compensation for directly incidental costs unless shortage beyond control. Separate s 112 administrative fine (paid to the State) may apply to the supplier." },
    { id: "s 48", title: "Unfair, unreasonable, unjust contract terms", blurb: "Substantive review. \"Excessively one-sided or so adverse as to be inequitable.\" Regulation 44 lists presumptively unfair terms." },
    { id: "s 49", title: "Notice for onerous terms", blurb: "Risky, restrictive, limiting terms must be separately brought to the consumer's attention." },
    { id: "s 51", title: "Prohibited terms", blurb: "Terms that waive rights conferred by the Act are void under s 51(3)." },
    { id: "s 52", title: "Court powers", blurb: "Courts (including Small Claims) may declare a term unconscionable, unreasonable, or unjust." },
    { id: "s 53", title: "Definitions — \"defect\", \"failure\"", blurb: "Defect = material imperfection rendering goods less acceptable than reasonable expectation." },
    { id: "s 55", title: "Right to safe, good-quality goods", blurb: "Reasonably suitable, good quality, durable, free of defects, compliant with formal standards. s 55(6): disapplies (a)(b) where specific condition expressly disclosed and accepted." },
    { id: "s 56", title: "Implied warranty of quality", blurb: "The big one. 6 months. Three-tier warranty (producer/distributor/retailer). Consumer elects repair/replace/refund. Cannot be contracted out of." },
    { id: "s 57", title: "Warranty on repairs and parts", blurb: "Minimum 3-month warranty on any new/reconditioned part fitted during repair, plus the labour." },
    { id: "s 58", title: "Warning concerning fact and nature of risks", blurb: "Suppliers of risky activities or facilities must point out unusual or serious risks (s 58(1)); whoever packages hazardous or unsafe goods must put safe-handling instructions on or in the packaging (s 58(2))." },
    { id: "s 60", title: "Safety monitoring and recall", blurb: "s 60(2): if the NCC has reasonable grounds to believe goods may be unsafe and the producer or importer hasn't acted, it can by written notice require the producer to investigate or carry out a recall programme on the NCC's terms. Many recalls are instead notified by the supplier and published by the NCC. The recall notice is the consumer's refund route; within 6 months of delivery s 56 adds the return-and-refund election. \"Warranty expired\" answers neither." },
    { id: "s 61", title: "Product liability", blurb: "Strict liability for harm caused by unsafe goods. Joint and several across the supply chain." },
    { id: "s 69", title: "Enforcement routes", blurb: "Tribunal / ombud / CGSO / provincial consumer court / ADR agent / NCC / court. The SCA in Motus v Wentzel [2021] ZASCA 40 gave obiter guidance (paras 26–27) that s 69(d) points to remedies in national legislation generally rather than a compulsory internal hierarchy — consumers may approach a court directly. The court expressly declined to decide the scope of s 69(d); the issue remains technically open." },
    { id: "s 2(10)", title: "Saving of common-law rights", blurb: "No provision of the Act may be interpreted to preclude common-law rights — preserves the aedilitian remedies." },
  ]},
  { group: "ECT Act", items: [
    { id: "s 42", title: "Exclusions from cooling-off", blurb: "Disapplies s 44 cooling-off only. Does not touch s 43, s 46, or the CPA." },
    { id: "s 43", title: "Information disclosure", blurb: "Online sellers must disclose identity, terms, payment, returns, warranty info. s 43(3): 14-day cancellation if breached." },
    { id: "s 44", title: "7-day cooling-off", blurb: "Any online sale, any reason. Consumer pays only direct cost of return. Full refund within 30 days of cancellation." },
    { id: "s 46", title: "Performance obligations", blurb: "30-day delivery deadline. Consumer may cancel on 7 days' notice if missed. Refund within 30 days of notification of unavailability." },
  ]},
  { group: "POPIA", items: [
    { id: "s 10", title: "Minimality (Condition 2)", blurb: "Processing must be adequate, relevant and not excessive for the purpose. Live credentials exceed what's needed for a technical assessment." },
    { id: "s 19", title: "Security safeguards (Condition 7)", blurb: "Appropriate, reasonable technical and organisational measures required. Live credential handover is itself a security risk." },
    { id: "reg", title: "Information Regulator", blurb: "Complaints: eServices Portal at eservices.inforegulator.org.za (register, then submit). The Regulator's contact page also lists POPIAComplaints@inforegulator.org.za. General: enquiries@inforegulator.org.za, toll-free 0800 017 160, 010 023 5200." },
  ]},
  { group: "Common law", items: [
    { id: "breach", title: "Breach of contract", blurb: "Non-conforming delivery is a breach with remedies alongside the statutory ones." },
    { id: "aed", title: "Aedilitian remedies", blurb: "actio redhibitoria (cancel + refund) and actio quanti minoris (price reduction) for latent defects. Preserved by CPA s 2(10). 3-year prescription." },
    { id: "bail", title: "Bailment", blurb: "Holding another's property creates a duty of care. Applies when Takealot holds a return." },
    { id: "delict", title: "Delict", blurb: "Wrongful destruction is actionable. Damages for negligent disposal." },
  ]},
  { group: "Chargebacks", items: [
    { id: "when", title: "When chargeback is available", blurb: "Goods not received, defective or not-as-described, credit not processed, cancelled recurring, fraud, duplicate." },
    { id: "window", title: "Window", blurb: "Typically 120 days from transaction (or expected delivery) under Visa/Mastercard rules. Card-only. EFT, RTC, PayShap are irrevocable." },
    { id: "how", title: "How", blurb: "Contact your bank's disputes team in writing. Attach order, correspondence, evidence. Can run in parallel with CGSO." },
    { id: "nfo", title: "If the bank gets it wrong", blurb: "National Financial Ombud Scheme (NFO) — one-stop scheme for banking, credit, long- and short-term insurance complaints. 0860 800 900 · nfosa.co.za. OBSSA, Credit Ombud, OLTI and OSTI amalgamated into NFO on 1 March 2024; FAIS Ombud remains separate." },
  ]},
];

export const ESCALATION: EscalationTier[] = [
  { tier: 1, title: "Takealot customer support", window: "24–72h",
    body: "Log the return on your account. For anything else, open the matching Help Centre topic and press 'Contact Us' at the bottom (the 'Get in Touch' form) — Takealot says this is the best way to reach an agent. Keep everything in writing and save the reference.", contact: "takealot.com/help-centre (Contact Us form) · 087 362 8000" },
  { tier: 2, title: "Formal written notice", window: "7 biz days",
    body: "Cite the specific CPA / ECT section. State your elected remedy explicitly. Reference Order # in subject.", contact: "legal@takealot.com · 12th Floor, 10 Rua Vasco Da Gama Plain, Foreshore, Cape Town, 8001" },
  { tier: 3, title: "CGSO", window: "15 biz days / 60 biz days",
    body: "Free, online. The Consumer Goods and Services Industry Code of Conduct (gazetted under CPA s 82 in March 2015) makes CGSO participation mandatory for qualifying suppliers, including Takealot — confirmed by the Gauteng High Court in CGSO NPC v Voltex [2021] ZAGPPHC 309. Supplier response in 15 business days; CGSO target resolution 60 business days.",
    contact: "cgso.org.za · 0860 000 272 · WhatsApp +27 (0)81 335 3005 · info@cgso.org.za" },
  { tier: 4, title: "Credit card chargeback", window: "~120 days",
    body: "File with your bank's disputes team. Can run in parallel with CGSO. Visa/Mastercard scheme rules — card only, EFT/RTC/PayShap not covered.",
    contact: "Your card issuer's disputes team" },
  { tier: 5, title: "National Consumer Commission (NCC)", window: "Variable",
    body: "Broader CPA enforcement. Most individual disputes get referred back to CGSO — NCC is best for patterns or systemic issues.",
    contact: "thencc.org.za · 012 065 1940 · enquiries@thencc.org.za · eservice.thencc.org.za" },
  { tier: 6, title: "Information Regulator", window: "Variable",
    body: "POPIA issues — credential demand, unlawful data retention, excessive information requests.",
    contact: "eservices.inforegulator.org.za (complaints portal) · POPIAComplaints@inforegulator.org.za · 0800 017 160 (toll free) · 010 023 5200 · enquiries@inforegulator.org.za" },
  { tier: 7, title: "Advertising Regulatory Board (ARB)", window: "~30 days",
    body: "Misleading advertising complaints (e.g. misrepresented warranty on a product page). Succeeded the ASA in October 2018. Rulings bind ARB members; non-members can still be the subject of a published ruling.",
    contact: "arb.org.za · info@arb.org.za · 011 593 3104" },
  { tier: 8, title: "Small Claims Court", window: "~60 days",
    body: "Up to R30,000 since 1 August 2026 (Government Gazette 55038 — check justice.gov.za/scc for the current figure). No attorneys. No court fee to issue the summons. You can serve the summons yourself; if the sheriff serves it, the tariff is R79 plus R7.50 a km travel (since 28 November 2025) — ask for the itemised return.",
    contact: "justice.gov.za/scc/scc.htm" },
  { tier: 9, title: "Magistrates' Court", window: "~6 months",
    body: "District Magistrates' Court up to R200,000. Regional Magistrates' Court R200,000 to R400,000. Attorney recommended; Legal Aid for qualifying cases.",
    contact: "Your local magistrate's court" },
  { tier: 10, title: "High Court", window: "12 months+",
    body: "R400,000 and above, with concurrent jurisdiction above R200,000. Last resort for consumer disputes.",
    contact: "Attorney required" },
];

export const FAQ: FaqItem[] = [
  { q: "Is using the name \"Takealot\" in the domain legal?",
    a: "Yes. Section 16 of the Constitution protects expressive commentary; Trade Marks Act s 34(2) covers permitted acts; and the UDRP protects legitimate non-commercial fair use of a domain name for criticism. In Laugh It Off v SAB [2005] ZACC 7 the Constitutional Court held that a trade mark proprietor must prove likely substantial economic detriment — mere offence isn't enough — and expressive use is balanced against freedom of expression." },
  { q: "Are you affiliated with Takealot?",
    a: "No. Their site is takealot.com. We are completely independent and have no relationship with Takealot or Naspers." },
  { q: "Do you make money from this site?",
    a: "No. Non-commercial, permanently. No ads, no affiliate links, no donations, no subscriptions." },
  { q: "Is this legal advice?",
    a: "No. Consumer education based on published legislation, reported case law, and Takealot's own public policies. For advice on your specific situation, consult a qualified South African attorney or the Consumer Goods and Services Ombud." },
  { q: "Why do your templates mention case names and NCT references?",
    a: "Because case law, not just statute, shapes how the CPA is applied. Citing the CGSO's 2021 advisory notes (now under CGSO review, still on SAFLII), or flagging SCA decisions like Motus v Wentzel, shows Takealot's team you've done the reading — not just parroted the Act. We only name a case where it materially supports the statutory argument; if the statute does the work on its own, we leave the case law out." },
  { q: "Is there a deadline for complaining?",
    a: "Yes — don't sit on it. A complaint to the National Consumer Tribunal or a consumer court can't be brought more than three years after the conduct that caused it (CPA s 116(1)). In a May 2026 appeal about a botched engine replacement (a service under CPA s 54), the Gauteng High Court in Johannesburg held that the clock ran from the supplier's refusal to put it right, not from the work itself, and reasoned that the same applies to a refusal to repair, replace or refund defective goods under s 56(2) (NCC v NCT, the Car Care Clinic case). But in Ntoatsabone v Hisense [2026] ZANCT 21 (a complaint that a TV was misrepresented at sale) the Tribunal counted from the purchase and turned the complaint away as too late. So get every refusal in writing, keep it, and escalate well inside three years of buying. Claims in the ordinary courts fall under the Prescription Act, which generally also allows three years." },
  { q: "Can I submit my own Takealot horror story?",
    a: "No. We don't accept submissions of any kind. Unverified user content creates defamation risk without benefit. File with the CGSO instead." },
  { q: "What if my situation isn't covered by one of the clauses?",
    a: "The site's GitHub repository is public. Open an issue with the scenario and the clause you're fighting." },
  { q: "Can I copy content from this site?",
    a: "Yes. Everything is under Creative Commons BY 4.0. A link back is appreciated, not required." },
  { q: "How current is the content?",
    a: `Content is checked against the published CPA, ECT Act, POPIA, Takealot's live policies, SA case law and the regulators' own pages. It was last reviewed on ${LAST_REVIEWED.replaceAll(".", "-")}. Takealot's policies are re-checked every quarter, case law and regulator details at least once a year, and the site is updated as soon as something material changes.` },
  { q: "Why no contact form or email?",
    a: "Intentional. The site is a one-way reference. No incoming correspondence means no operational burden, no spam, and no risk of being drawn into individual disputes. Corrections via GitHub issues only." },
];

export const WARRANTY_ANGLES: WarrantyAngle[] = [
  { n: 1, title: "CPA s 56 — the 6-month baseline",
    body: "The implied warranty of quality applies to every retailer of new goods, for 6 months from delivery, irrespective of any policy or stated warranty. Even if Takealot's product page says \"30-day warranty,\" they remain liable under s 56 for 6 months." },
  { n: 2, title: "CPA s 55(2)(c) — reasonable durability",
    body: "Goods must be usable and durable for a reasonable period having regard to use and all surrounding circumstances. An advertised 2-year manufacturer warranty becomes part of those circumstances — a failure within that window is prima facie a s 55(2)(c) breach." },
  { n: 3, title: "CPA s 41 — misleading representations",
    body: "If Takealot's product page said \"2-year manufacturer warranty\" and the manufacturer refuses to honour, Takealot made a misleading representation you relied on. Remedies: a court must make orders that give practical effect to your right to redress (s 4(2)(b)(ii)); where the Act gives no other sufficient remedy for a s 41 breach it can order Takealot to compensate you for losses relating to the transaction (s 52(3)); s 115 governs a civil damages claim." },
  { n: 4, title: "CPA s 56(1) — three-tier warranty",
    body: "Producer/importer, distributor, AND retailer each warrant compliance with s 55. Manufacturer's refusal doesn't take the retailer off the hook." },
  { n: 5, title: "Direct manufacturer warranty",
    body: "Warranty cards and product registrations create a direct contract between you and the manufacturer, separate from your sale contract with Takealot." },
  { n: 6, title: "Common law breach of contract",
    body: "If the manufacturer warranty was part of what induced the sale (advertised, represented, brand-implied), it may be an express or implied term of your sale contract with Takealot too." },
  { n: 7, title: "ECT Act s 43 — information disclosure",
    body: "Before you pay, an online seller must show the terms of sale, \"including any guarantees\", and a sufficient description of the goods (s 43(1)(h), (k)). If it didn't, you can cancel within 14 days of receiving the goods (s 43(3)). Misrepresentation itself is a CPA s 41 claim." },
  { n: 8, title: "ARB complaint",
    body: "Free, creates a public record, strengthens subsequent CGSO or court claims. Succeeded the ASA in October 2018." },
];

export const PLAYBOOK: PlaybookItem[] = [
  { letter: "A", when: "Manufacturer honours in month 18", play: "Easy — pursue manufacturer warranty." },
  { letter: "B", when: "Manufacturer refuses in month 18", play: "Takealot under s 55(2)(c) + s 41 · ARB complaint · CGSO · Small Claims Court." },
  { letter: "C", when: "Failure in month 3", play: "Pure s 56. Takealot primarily liable regardless of manufacturer." },
  { letter: "D", when: "Failure in month 7", play: "Manufacturer direct · Takealot under s 55(2)(c) + s 41 · CGSO." },
];

export const POLICY_SUMMARY: PolicySummary = {
  returns: [
    "30 days for wrong / damaged on delivery / missing / change-of-mind",
    "6 months for defective goods",
    "Original packaging, accessories, intact seals required",
    "Consumer elects replacement / credit / refund — credit defaults if no stock",
    "Change of mind: unused, original packaging",
    "Defective: inspection required; exclusions for wear, surge, misuse, sea-air, modification",
    "Extended warranty via supplier (21-day refund trigger); direct manufacturer warranty direct with manufacturer",
    "Pre-packed bundles returnable whole only — Bundle Deals (assembled) returnable in parts",
    "Digital items returnable only if defective",
    "Data devices: unlock codes requested; return may be refused if withheld",
    "Wrongly-returned items disposed; no compensation",
    "Rejected returns disposed after 30 days if not accepted back",
    "Takealot collects OR pickup-point drop-off within 7 days (large items & alcohol: collection only)",
    "Non-returnable (change-of-mind): intimate, underwear, swimwear, jewellery, foodstuffs, unsealed AV/software, books, personalised",
    "Exchanges: size/colour on clothing, sportswear, shoes",
    "Credit loaded to Takealot account forfeits after 3 years of non-use; gift vouchers separately valid 3 years from issue",
    "Re-delivery fee if return fails packaging/condition check",
    "Donations at checkout deducted from refunds",
  ],
  terms: [
    "Account & shopping — 18+, contracting capacity required",
    "Sellers are responsible for the items they sell on our platform",
    "Takealot may cancel for stock / payment / listing error / account-abuse / criminal investigation",
    "Resale prohibition",
    "Dispute resolution: SA law, High Court (Western Cape Division, Cape Town) named as forum",
    "Legal notices to legal@takealot.com",
    "CGSO named as escalation point",
    "Takealot may change any provision at any time without notice",
  ],
};
