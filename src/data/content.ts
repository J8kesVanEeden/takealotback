// TakealotBack — content data (clauses, templates, law, escalation, FAQ, etc.)
// Last full verification pass 2026-11-10.
// DO NOT rewrite content here without checking the source first. If anything
// looks wrong, open an issue. See OPERATIONS.md for the update flow.

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

export const LAST_REVIEWED = "2026.11.23";
// When this file or a homepage component last changed. The homepage JSON-LD
// dateModified is the later of this and LAST_REVIEWED.
// scripts/check-machine-readable.mjs fails if an edit leaves this behind.
export const CONTENT_UPDATED = "2026.11.23";
// Takealot publishes no policy version or "last updated" date, so this records
// the date we last checked the live policy pages against our snapshots.
export const TAKEALOT_POLICY_REVIEWED_AGAINST = "as live on 2026.11.17";
export const GITHUB_REPO_URL = "https://github.com/J8kesVanEeden/takealotback";
// Why the rights reach beyond Takealot. Shown in the About section's
// "Why Takealot?" paragraph and repeated in llms.txt, llms-full.txt and the
// WebSite JSON-LD, so all four say the same thing.
export const SCOPE_LAW = "The Consumer Protection Act covers what you buy from most businesses in the country, online or in a shop, and the ECT Act's 7-day cooling-off covers most online orders.";
export const SCOPE_TEMPLATES = "Most templates work anywhere: swap the name and cut any line that quotes Takealot's own policy.";

export const CLAUSES: Clause[] = [
  {
    n: "01", slug: "time-limits", title: "Time limits",
    takealot: "30 days for wrong item on delivery, damaged on delivery, missing parts, or change of mind. 6 months for defective items.",
    angles: [
      { stat: "CPA s 56(2)", body: "6 months for defective goods, irrespective of Takealot's policy. s 51(3) voids any term that tries to shorten this." },
      { stat: "ECT Act s 44", body: "7 days for any reason on most online purchases (s 42(2) carves out specific categories; see Clause 10). This is your statutory floor. Takealot's 30-day change-of-mind window is more generous and sits on top of it: the 7 days run inside the 30, not after them." },
      { stat: "CPA s 20", body: "Return of unsatisfactory goods is narrow: direct-marketing cooling-off, no opportunity to examine, mixed-goods delivery, or specifically-communicated purpose (10 business days). Not a general change-of-mind right." },
      { stat: "CPA s 19 / s 20", body: "For purchases that aren't online (e.g. bought in store and delivered), s 19 lets you inspect on delivery and refuse wrong or damaged goods. For most online orders s 19 switches itself off where ECT s 46 governs performance (s 19(1)(b)), but the NCC and CGSO's March 2026 joint paper still reads s 20 with s 19 as giving online buyers the right to inspect, refuse goods that don't match the order, and claim a refund. Either way: refuse obviously wrong or damaged items at the door." },
      { stat: "Common law breach", body: "Non-conforming delivery is a contract breach with remedies alongside the statutory ones." },
      { stat: "Davis couch (2026)", body: "Takealot refused a defective couch because it was reported 35 days after delivery, outside its 30-day damage window. Knowler: \"Section 56 of the Consumer Protection Act gives consumers 6 months, not 30 days, to return goods that are defective\". Once she raised it, Takealot apologised and refunded in full; it said its returns team had initially followed its standard policy (EWN, 23 July 2026). Open deliveries promptly and photograph them. A defect found later is still inside s 56." },
    ],
    why: "Expect Takealot to collapse \"this was defective from day one\" into \"you missed the 30-day damage window.\" Defective goods is s 56: you have 6 months.",
    template: "T01", escalate: "CGSO · NCC · Small Claims Court (up to R30,000)",
  },
  {
    n: "02", slug: "original-packaging", title: "Original packaging",
    takealot: "Returns require the item in its \"original product packaging\" with all accessories and parts, and seals intact (if applicable). In practice this is, in our view, the most weaponised clause in Takealot's policy: returns get rejected on \"original packaging\" grounds where the consumer marked the brown delivery box, opened a barcoded cellophane bag to inspect the goods, or is missing a cosmetic accessory unrelated to the defect.",
    angles: [
      { stat: "Takealot's own admission", body: "Wendy Knowler put two parallel rejections to Takealot: Toby Shapshak's Lego return, rejected because the brown delivery box had a return-code marker on it, and Robyn Arnold's cutlery return, rejected because the barcoded cellophane bag had been opened. The company conceded both and told her: \"Takealot does not expect shoppers to return products in the original, undamaged or altered Takealot box.\" Quote it back at any agent invoking \"original packaging\" against your delivery container." },
      { stat: "Delivery box is not product packaging", body: "\"Original product packaging\" means the manufacturer's product packaging (the Lego box), not the supplier's brown delivery box. Shapshak's Stuff SA column documents the Takealot agent treating the delivery box as the original packaging. When Wendy Knowler later put the case to Takealot, its spokesperson said the rejection was \"due to human error\" and that the employees involved had been retrained. A marker mark on the brown delivery box is not a packaging-condition breach." },
      { stat: "Inspection is not damage", body: "Robyn Arnold's argument, on Knowler's account: \"It's not possible to look at the quality of the item without opening the bag. I dispute the fact that with online purchases one is expected to satisfy oneself as the quality of a product from the photograph alone, without looking at the actual item, which one would be able to do when purchasing in a physical shop.\" Her point stands on common sense and on Takealot's own concession above, not on a statute: a barcoded cellophane bag broken to inspect the goods is not damaged packaging. (CPA s 19's inspection right switches off for most online orders under s 19(1)(b), but the regulators' 2026 joint paper still backs an online buyer's right to inspect; see below.)" },
      { stat: "Unrelated missing component", body: "On Wendy Knowler's framing in the Mokoena golf-cart case: \"Strictly speaking, if the missing component is totally unrelated to the defect, the retailer does not have the legal right to reject a claim on the six-month Consumer Protection Act warranty.\" Mokoena's caddy was delivered without a cosmetic cupholder and worked fine until its battery failed in month six; Takealot rejected the s 56 claim citing the missing cupholder. Reversed on Knowler's intervention; the legal position before intervention was the same." },
      { stat: "CPA s 56", body: "Does not require original packaging for defective goods. The warranty attaches to the goods, not the box." },
      { stat: "CPA s 20(6)", body: "On a return under s 20 (not ordinary change-of-mind; see Clause 01), goods in the original unopened packaging carry no charge at all, and opened goods only a reasonable charge for use, consumption or restoration. s 20(6) sets the price of a return, not a right to refuse one." },
      { stat: "NCC + CGSO joint paper (2026)", body: "You cannot assess whether goods comply with s 55 without opening them. The regulators' own March 2026 joint paper says CPA s 20 (read with s 19) ensures \"consumers have the right to inspect an item purchased online\", and inspecting means opening." },
      { stat: "ECT Act s 44", body: "Modest inspection (the consumer needs to be able to assess what they're keeping) is consistent with exercising the cooling-off right, though the section itself doesn't address the point directly." },
      { stat: "CPA s 48", body: "Blanket \"no packaging, no return\" for defective goods is a candidate for unfair-term challenge." },
      { stat: "CGSO case study (2025/26)", body: "On a cooling-off exchange of an online purchase, a supplier demanded a 15% handling fee because the bed was no longer in its original packaging (the complainant said the supplier's own driver had removed it). The Ombud found the fee \"inconsistent with section 44 of the ECTA, which expressly limits the supplier's recovery to the direct transportation or return costs\"; the supplier dropped it (CGSO Annual Report 2025/26)." },
      { stat: "CPA s 51", body: "Any term that waives s 56 rights is void under s 51(3)." },
      { stat: "Report it on the day", body: "Report missing components on delivery the same day, even if you don't want them. Knowler's Mokoena case: the cupholder was missing on delivery, Mokoena didn't report it because he didn't need it, and that opened the procedural door six months later. Reporting on the day closes the door. Takealot's own response: \"Any incomplete deliveries or missing product components must be immediately reported to us upon receipt, as this enables us to rectify such matters promptly and effectively.\"" },
    ],
    why: "Keep the manufacturer's product packaging when you can. Don't accept \"no packaging, no return\" for a defective item: the warranty attaches to the goods. Don't accept rejections invoking the brown delivery box as \"original packaging\": Takealot itself has stated it does not expect that. And don't accept the missing-cosmetic-accessory objection on a defect that has nothing to do with the missing accessory.",
    template: "T02", escalate: "CGSO",
  },
  {
    n: "03", slug: "damage-exclusions", title: "Damage exclusions",
    takealot: "An item won't be accepted as damaged on delivery if damaged by the consumer, by electrical surges, or by use for an unintended purpose.",
    angles: [
      { stat: "Edan Traders v NCT", body: "Onus on the supplier. You have to show the item has problems, not what caused them; Takealot has to prove the damage was your doing. A Gauteng appeal bench held this in Toyota Randburg v Ndlovu (2024), and a Full Court in Johannesburg relied on that ruling in Edan Traders (2026). Bare assertion isn't enough: demand the assessment." },
      { stat: "CPA s 55(2)(c)", body: "Goods must stay usable and durable for a reasonable period. Early failure is evidence they fell short. Make Takealot explain it with an actual assessment." },
      { stat: "CPA s 53(1)(a)", body: "\"Defect\" is a material imperfection, or any characteristic, that makes the goods less acceptable, useful or safe than people are reasonably entitled to expect in the circumstances (s 53(1)(a)(i)–(ii)). Ordinary South African conditions are part of \"the circumstances\"." },
      { stat: "Surge defence", body: "Takealot must prove an actual surge event occurred. A competent technician can tell a surge-damaged board from a manufacturing defect: ask for that report." },
      { stat: "Unintended use", body: "Read narrowly. CPA s 4(4)(b) limits any exclusion in a supplier's document to what a reasonable person would expect. If neither the manual nor the listing rules out your use, the exclusion is hard to apply." },
      { stat: "Contra proferentem", body: "Ambiguous exclusion clauses are read against the drafter. In the CPA, s 4(4)(a) says any ambiguity in a supplier's document is resolved to the consumer's benefit." },
    ],
    why: "They read like reflex refusals. Demand the technical basis and the evidence.",
    template: "T03", escalate: "CGSO",
  },
  {
    n: "04", slug: "unlock-codes", title: "Unlock codes for data devices",
    takealot: "For items that store data (phones, laptops, tablets, security cameras, NAS), Takealot's policy says \"you will have to give us your unlock codes or passwords\". If you don't, Takealot \"can refuse\" the return. The policy also warns that Takealot \"might need to perform a factory reset\" during assessment, so you could lose your data.",
    angles: [
      { stat: "POPIA s 10", body: "Minimality. \"Personal information may only be processed if… adequate, relevant and not excessive.\" Live credentials exceed what's needed for a technical assessment." },
      { stat: "POPIA s 19", body: "Security safeguards. Responsible parties must take \"appropriate, reasonable technical and organisational measures.\" Live credential handover is itself a security risk." },
      { stat: "CPA s 56", body: "Does not require credential handover. A factory-reset device is the assessable state, and Takealot's own returns policy says \"when assessing your return, we might need to perform a factory reset which means that you could lose the data on your device.\" Back up, sign out of your accounts, and reset it yourself before it goes." },
      { stat: "CPA s 51", body: "Conditioning a s 56 remedy on credential surrender arguably \"indirectly purports to … deprive a consumer of a right\" under the Act (s 51(1)(b)(i)), which s 51(3) makes void." },
      { stat: "CPA s 48", body: "Unfair term: there is no legitimate technical purpose for live credentials post-reset." },
      { stat: "Info Regulator", body: "Lodge through the eServices Portal at eservices.inforegulator.org.za: register a profile, then submit the complaint there; the Regulator's complaints page says that is how to lodge. Its contact page also lists POPIAComplaints@inforegulator.org.za for POPIA complaints. Questions: toll-free 0800 017 160." },
    ],
    why: "Factory-reset before return. Refuse live credentials. Report to the Information Regulator if they insist.",
    template: "T04", escalate: "CGSO + Information Regulator",
  },
  {
    n: "05", slug: "bundle-return", title: "Pre-packed bundle return", canonical: true,
    takealot: "If a product is a pre-packed bundle and only one item is defective, you must return the whole bundle. Partial returns may be refused.",
    angles: [
      { stat: "CPA s 53(1)(a)", body: "\"Defect\" includes a material imperfection in the goods. A defect in one independently-replaceable component is not a defect in the working components." },
      { stat: "CPA s 55 + s 56", body: "The warranty attaches to the failed goods. Working parts aren't \"defective goods\" under s 56." },
      { stat: "s 53(1)(a) applies to the goods in issue", body: "The CPA's definition of a defect includes a material imperfection in \"the goods or components\". In a bundled sale, the goods are the bundle you were sold. If one component's failure means the bundle no longer does what the bundle was sold to do, the s 56 remedy runs against the supply. If the failed component is independently replaceable and the rest of the bundle works as sold, only the failed component is \"defective goods\" under s 56. The question is functional, not semantic." },
      { stat: "CPA s 51", body: "Requiring return of non-defective goods as a condition of a s 56 remedy arguably operates as an indirect waiver (s 51(1)(b)(i)), void under s 51(3)." },
      { stat: "CPA s 48", body: "Forcing return of installed, configured, data-holding equipment is open to challenge as unfair under s 48." },
      { stat: "POPIA overlay", body: "For data-storage devices, compelled full-bundle return creates unnecessary data exposure, which strengthens the s 48 unfairness case." },
    ],
    why: "This clause can push consumers to give up, especially on smart-home and security systems. Where one independently replaceable part has failed and the rest works as sold, argue that s 56 lets you send back only that part for repair or replacement. If you want your money back instead, expect to return the whole bundle: a pre-packed bundle is sold at one price (Takealot's terms: \"One discounted price is offered for the entire bundle, not for the individual items in the bundle\"), and s 56(2)(b) refunds \"the price paid by the consumer, for the goods\". No court or Ombud has ruled on partial bundle returns that we know of.",
    template: "T05", escalate: "CGSO · Information Regulator only if Takealot demands passwords or mishandles data on a returned device (Clause 04)",
  },
  {
    n: "06", slug: "credit-vs-refund", title: "Credit vs refund",
    takealot: "When you log a return, the policy lets you choose: \"you can choose whether we must credit your Takealot account, refund you the same way you paid, or replace the item.\" For wrong-item / damaged / missing-parts returns it adds: \"if we do not have replacement stock available, we'll rather credit your Takealot account.\" On defective returns you choose repair, replacement, account credit, or refund. Refund credit then expires after 3 years: \"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit.\" Gift vouchers have their own separate 3-year validity.",
    angles: [
      { stat: "CPA s 56(2)", body: "Consumer elects the remedy: repair, replace, or refund. Credit is not a statutory option unless the consumer agrees to it." },
      { stat: "CPA s 20(5)", body: "On a s 20 return the supplier \"must refund to the consumer the price paid for the goods\", less any charge s 20(6) allows. The Act says refund, not credit." },
      { stat: "Gareeb v Incredible Connections", body: "An electronics retailer refused a refund on a laptop that failed days after sale and offered only an in-store software fix. In an unopposed case the National Consumer Tribunal held that the CPA \"requires the respondent to act according to the consumer's direction\", that the retailer \"abused its power by dictating the remedy\", and ordered the full R21,999 refunded (2024). Pushing credit when you chose a refund is the same move." },
      { stat: "NCC v Fugui Trading", body: "A shop notice saying \"NO MONEY BACK\" and \"You are allowed to return a item for another item not for money\" was itself an unfair term: in an unopposed case the National Consumer Tribunal held the notice breached CPA s 48(1)(a)(ii), and fined the shop R100,000 for that and a separate labelling breach (2026). A policy that defaults to credit where the law gives you a refund rests on the same logic." },
      { stat: "CPA Reg 44 + s 48", body: "Regulation 44(3)(q) presumes unfair a term that lets the supplier keep a consumer's payment \"where the latter fails to conclude or perform the agreement\", without a matching right for the consumer if the supplier fails. A 3-year forfeiture of refund credit is not a neat fit for (q), since you didn't default, but it is the same kind of one-way forfeiture, and the Reg 44(3) list is \"non-exhaustive\" (Reg 44(2)(b)). First, use the policy's own words: you lose the credit only if you don't use it \"or ask us for a refund during this time\", so ask in writing for the credit to be refunded. If that's refused, argue it under s 48 directly: credit that came from money you paid, for goods the supplier failed to supply, shouldn't simply lapse, especially where Takealot loaded it without you electing credit under s 56(2)." },
      { stat: "ECT s 44(3)", body: "On cooling-off cancellation, full refund is due within 30 days." },
      { stat: "Cancellation context", body: "On a Takealot-initiated cancellation (out of stock / pricing error / system error), the consumer is entitled to elect cash refund instead of account credit. Wendy Knowler, parenthetical on the Chelsea Christmas-books case (News24, 21 December 2025): \"In such cases, you don't have to accept a credit; you can insist on a refund.\" Insist in writing, quoting Takealot's own terms: \"If an order or item is cancelled, we will refund you the amount paid for that cancelled order or item.\" Where the reason was stock, ECT s 46(3) also requires the refund within 30 days of telling you; if the credit has already loaded, follow up with the chargeback route in parallel." },
      { stat: "Takealot's own missing-item page", body: "Takealot's Help Centre article on items missing from a delivery (updated 17 November 2026) asks you to \"Tell us your preference - credit, refund, or replacement\". Its list of outcomes then names only account credit where it no longer has stock. Hold Takealot to the first sentence: you chose a refund (template T20)." },
      { stat: "Chargeback", body: "If Takealot insists on credit, a card chargeback is a live alternative: the card scheme's rules, not Takealot's returns policy, decide it." },
    ],
    why: "Credit is a default, not a right. You elect the remedy. Say \"refund to original payment method\" in writing and cite s 56(2). Expect Takealot to fall back on \"not all defects can be repaired, and we may not always have replacement stock available\". That line works as a soft landing for collapsing the election back to credit. The statutory election isn't contingent on their inventory position. Push back: no stock means replacement isn't available; it doesn't mean you lose the option to elect a cash refund.",
    template: "T06", escalate: "CGSO · chargeback in parallel",
  },
  {
    n: "07", slug: "manufacturer-deflection", title: "Sent to the manufacturer",
    takealot: "Direct manufacturer warranty: consumer deals with manufacturer. Extended warranty (for an item that \"becomes defective more than 6 months after delivery\") goes via the supplier; if supplier repair/replacement exceeds 21 days from the date the item is received at the supplier's returns evaluation facility, Takealot offers credit or a refund. The supplier may also charge you an evaluation fee.",
    angles: [
      { stat: "CPA s 56(1)", body: "Three-tier warranty: producer/importer, distributor, AND retailer each warrant compliance with s 55. You can proceed against any link." },
      { stat: "CPA s 56(4)", body: "The section 56 warranty is in addition to, not in substitution for, any manufacturer or common-law warranty." },
      { stat: "CPA s 55(2)(c)", body: "Reasonable durability. If Takealot advertised a 2-year manufacturer warranty, that shapes the durability benchmark, and the retailer is on the hook for it." },
      { stat: "CPA s 41", body: "False, misleading, or deceptive representation. If the warranty Takealot advertised turns out not to exist or not to be as described (no local warranty service, a shorter period, narrower cover), that is a false or misleading representation about a material fact (s 41(1)(a)). A manufacturer that simply refuses a valid claim is a different problem: within 6 months use s 56 against Takealot. Redress for loss runs through the court's powers (s 52(3)) or a civil claim, not s 41 itself." },
      { stat: "ECT s 43", body: "Before you pay, an online seller must show the terms of sale, \"including any guarantees\", and a sufficient description of the goods (ECT s 43(1)(h), (k)). If it didn't, you can cancel within 14 days of receiving the goods (s 43(3)). A misrepresented warranty itself is a CPA s 41 claim." },
      { stat: "21-day trigger", body: "Takealot's own policy triggers direct refund/credit if extended-warranty repair exceeds 21 days from receipt at the supplier's evaluation facility. Hold them to their own trigger, and demand written confirmation of the receipt date so the clock can't slide." },
      { stat: "Evaluation fee", body: "Takealot's policy reserves the supplier's right to charge an evaluation fee. Within the 6-month s 56 window, that fee sits with the supplier under s 56(2) (\"at the supplier's risk and expense\"), not the consumer. Beyond 6 months, where Takealot advertised the warranty, the fee is arguably a s 55(2)(c) / s 41 cost against Takealot, because the warranty representation induced the sale. Push back on any evaluation fee billed to you during an active s 56 claim." },
    ],
    why: "The manufacturer is one of your routes, not your only route. Within 6 months Takealot is primarily on the hook. Beyond 6 months s 55(2)(c) still runs against Takealot, and s 41 too if the advertised warranty was not as described.",
    template: "T07", escalate: "CGSO · ARB (for the advertising claim)",
  },
  {
    n: "08", slug: "defective-exclusions", title: "Defective exclusions",
    takealot: "A defective item won't be accepted if faulty due to normal wear and tear, consumer damage or not taking good care of it, electrical surges, sea air corrosion, consumer modification, or unintended use.",
    angles: [
      { stat: "Wingfield v NCT", body: "Exclusions require proof. A supplier that blames your use has to prove it: the Western Cape High Court rejected a dealer that \"merely speculated\" (2025). Demand the technical report; the exclusion list is the argument, not the evidence." },
      { stat: "CPA s 55(2)(c)", body: "\"Normal wear and tear\" presupposes normal durability. Premature failure is not wear and tear. It's a defect." },
      { stat: "Coastal disclosure", body: "Sea-air corrosion: if sold without a \"not for coastal use\" disclosure, this exclusion is hard to sustain for a device sold to an SA consumer." },
      { stat: "CPA s 56(1)", body: "Consumer modification exclusion is narrow: it only bites where the modification plausibly caused the failure." },
      { stat: "Intended use", body: "Read narrowly. CPA s 4(4)(b) limits any exclusion in a supplier's document to what a reasonable person would expect. If neither the manual nor the listing rules out your use, the unintended-use exclusion is hard to apply." },
      { stat: "Surge evidence", body: "A surge-damaged board looks different from a manufacturing-defect board. A competent technician can tell. Ask for that technician's report." },
      { stat: "Bryanston Executive Cars (NCT, 2026)", body: "The National Consumer Commission reported on 17 November 2026 that the National Consumer Tribunal fined a used-car dealer R500,000. Among other things, the dealer had \"included prohibited clauses in its sale agreement, attempting to waive the six-month implied warranty of quality\", which the release lists as a contravention of CPA s 51(1). A car dealer, not Takealot, and this rests on the NCC's summary, not the judgment. It shows that a term trying to cut down the s 56 warranty is not only void under s 51(3); it was part of what drew a fine." },
    ],
    why: "Exclusions can be applied on initial inspection with no deep technical work. A proper challenge (demanding the assessment, naming the onus, citing s 55(2)(c)) can flip the decision.",
    template: "T03", escalate: "CGSO",
  },
  {
    n: "09", slug: "rejected-disposal", title: "Disposal of rejected returns",
    takealot: "If Takealot rejects a return and the consumer is unavailable for, or refuses, re-delivery for 30 days, Takealot treats the item as abandoned and may dispose of it.",
    angles: [
      { stat: "Bailment", body: "While the goods are in Takealot's possession for assessment they hold them as bailee. Duty of care is not wholly excluded by a returns policy." },
      { stat: "Delict", body: "Wrongful destruction of property gives a damages claim independent of the sales contract." },
      { stat: "CPA s 65", body: "While Takealot holds your rejected return, it holds your property. Section 65(2) covers a supplier that has \"any other property belonging to or ordinarily under the control of a consumer\". It \"must not treat that property as being the property of the supplier\", must look after it with the care \"that can reasonably be expected of a person responsible for managing any property belonging to another person\", and \"is liable to the owner of the property for any loss\" if it doesn't. Applying s 65 to a held return is our own reading; no court or Ombud has ruled on it that we know of. Disposing of the item during a live dispute is hard to square with it." },
      { stat: "CPA s 48", body: "A term allowing disposal during a contested dispute is a strong candidate for unfair-term challenge." },
      { stat: "CPA s 52", body: "Courts can declare a term unenforceable for unconscionability." },
      { stat: "Contract", body: "The abandonment clause is hard to apply to a rejection you are disputing in writing: your written objection shows you haven't given the item up. This is our reading; no court or Ombud has ruled on this clause that we know of." },
      { stat: "Evidence", body: "Put objection in writing before day 30. Create the record. File with CGSO immediately." },
    ],
    why: "The 30-day disposal clock puts pressure on you. Taking the item back doesn't, by itself, give up your claim: you can accept re-delivery under written protest and keep disputing through the CGSO. If you'd rather Takealot keep it, object in writing before day 30 (template T08) and file with the CGSO, but know that the policy treats a refused re-delivery as abandonment, so keep proof of every objection.",
    template: "T08", escalate: "CGSO · Small Claims Court if disposed",
  },
  {
    n: "10", slug: "non-returnable", title: "Non-returnable items",
    takealot: "Intimate items, underwear, swimwear, jewellery; foodstuffs and everyday-consumption; digital items (electronic vouchers, gaming codes, downloads); unsealed audio/video/software; books and periodicals (regardless of seal); personalised items; made-to-specification items.",
    angles: [
      { stat: "ECT s 42(2)", body: "Most of these exclusions match ECT s 42(2): food (c), personalised or made-to-spec (f)(i)–(ii), unsealed audio/video/software (g), books and periodicals (h). Digital items such as vouchers, gaming codes and downloads arguably fall under (f)(iii). Hygiene items may fall under (f)(iii) (\"by reason of their nature cannot be returned\"). Jewellery isn't on the list, so the 7-day right arguably still applies to it. Either way, s 42(2) only disapplies s 44 (cooling-off). It does not touch s 43, s 46, or the CPA." },
      { stat: "CPA s 56", body: "A \"non-returnable\" flag never bars a defective-goods return. Takealot's own policy confirms this: digital and hygiene items are still returnable when defective." },
      { stat: "\"No warranty at all\" framing is wrong", body: "Takealot has been documented telling a buyer that non-returnable items have \"No warranty at all, except for delivery damages.\" That is legally wrong. Per Wendy Knowler (TimesLive, 24 November 2023), responding to a reader who was told this on three books: \"That's a bit confusing as the six-month Consumer Protection Act warranty against defects applies, but not the seven-day 'change your mind' cooling-off period.\" The s 42(2) carve-out goes to ECT s 44 (cooling-off). Section 56 still runs. A defective book, a digital code that doesn't work, an unsealed software bundle missing the licence: all still trigger the s 56 election." },
      { stat: "ECT s 42(2)(f)", body: "Covers goods made to your specifications, clearly personalised, that by their nature can't be returned, or that are likely to deteriorate or expire rapidly (s 42(2)(f)(i)–(iv)). A standard item in your chosen size or colour is none of those." },
      { stat: "ECT s 42(2)(g)", body: "Unsealed audio/video/software is excluded only from ECT s 44 cooling-off. Does not touch s 56." },
      { stat: "CPA s 41", body: "If a non-returnable item is not-as-described, a s 41 misrepresentation claim still runs." },
      { stat: "CPA s 61", body: "If perishable goods cause illness, product liability is unaffected by the non-returnable flag." },
      { stat: "Listing-tag misuse", body: "A product listing on Takealot cannot be tagged \"non-refundable\" outside the s 42(2) carve-outs. ECT s 44 makes every other online purchase refundable if you cancel within 7 days of receiving it, regardless of listing wording. In Wendy Knowler's reporting (News24, 2 November 2025), Takealot refused a T-shirt return on a \"non-refundable\" listing tag; on Knowler's intervention, the company said the refusal was \"the result of a human error during the return process\", acknowledged \"the listing error\", and said the product had been \"delisted until this has been corrected.\" Cite the case, demand the refund, and read the credit-vs-refund election (Clause 06): within the 7-day window ECT s 44(3) entitles you to \"a full refund\", not credit." },
    ],
    why: "\"Hygiene\" does not swallow your s 56 rights. And a listing tag does not extend the carve-outs: a \"non-refundable\" T-shirt is still refundable under ECT s 44.",
    template: "T01", escalate: "CGSO",
  },
  {
    n: "11", slug: "coupons-vouchers", title: "Coupons and vouchers",
    takealot: "Vouchers paid toward a purchase return as non-refundable Takealot credit. Coupons return as a new coupon, possibly with different terms.",
    angles: [
      { stat: "Contract principle", body: "Vouchers and coupons are non-cash consideration. Their value does not automatically convert to cash on return. This much is valid." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(i) to the CPA presumes unfair any term \"enabling the supplier to unilaterally alter the terms of the agreement\". A replacement coupon on materially worse terms arguably fits, although the policy warns in advance that the new coupon's terms \"may differ\"." },
      { stat: "CPA s 48", body: "A replacement coupon with tighter expiry, narrower eligibility, or unusual conditions invites an unfair-term challenge." },
      { stat: "CPA s 51", body: "If the replacement operates as a waiver of a statutory refund right, it's vulnerable under s 51." },
      { stat: "CPA s 63", body: "For a voucher you paid for (a prepaid gift voucher, not a free promotional coupon), the money paid belongs to the bearer until it's redeemed, and the voucher can't expire within three years of issue (s 63(1)–(3)). The NCC and CGSO's March 2026 joint paper adds that where a voucher was partly used, \"the consumer has the right to redeem the remaining value\"." },
      { stat: "NCC + CGSO voucher note (2025)", body: "Takealot's returns policy says that if you paid with a voucher and \"return or cancel your whole order or some of the items in your order\", it loads the voucher's value \"as non-refundable credit\". The two regulators' joint note on e-vouchers (13 July 2025) says that where an item is unavailable, \"the full value of the voucher must be applied to the remainder of the goods that form part of the collective purchase at the time. The Supplier does not have the discretion to suspend the use of the voucher for a future date.\" If one item in a voucher-paid order is cancelled for stock, ask in writing for the voucher value to go to the rest of that order, not into credit for later. The note is the regulators' guidance, not a ruling, and the CGSO's Advisory Notes page now says its notes are \"under review\" and will be \"reuploaded once the review is completed\" (the note's own download link still worked on 17 November 2026)." },
      { stat: "Original T&Cs", body: "Check the original coupon's terms. If the replacement differs, that's a contract-breach argument on top of the s 48/s 51 angles." },
      { stat: "Evidence", body: "Screenshot the original coupon terms at time of use. Wayback Machine for disputes." },
    ],
    why: "Read the replacement coupon terms carefully. If materially worse, object in writing and reference Regulation 44.",
    escalate: "CGSO",
  },
  {
    n: "12", slug: "unilateral-changes", title: "Unilateral term changes",
    takealot: "Takealot \"may change any provision of our agreement at any time without giving you notice\", publishing the change on its platform; \"Any change we make takes effect from the date we publish it\"; continued use counts as acceptance.",
    angles: [
      { stat: "Retroactivity", body: "Changes cannot operate retroactively. Your order is governed by the terms in force on the order date." },
      { stat: "CPA s 51 / ECT s 48", body: "A policy change can't take away your statutory rights. A term that purports to waive a right under the CPA is void (s 51(1)(b)(i) read with s 51(3)). For the online-shopping rights in Chapter VII of the ECT Act (disclosure, 7-day cooling-off, 30-day performance), ECT s 48 says any provision that excludes them \"is null and void\"." },
      { stat: "CPA Reg 44", body: "The \"grey list\" in Regulation 44(3)(i) presumes unfair any term \"enabling the supplier to unilaterally alter the terms of the agreement\". Takealot's clause fits. Reg 44(4)(c)(iv) lifts the presumption for an open-ended agreement only where the supplier \"must forthwith inform the consumer\" of the change and the consumer is free to dissolve the agreement immediately, and Takealot's clause allows changes \"without giving you notice\"." },
      { stat: "CPA s 48", body: "Substantive unfairness review. A term is unfair if it is \"excessively one-sided in favour of any person other than the consumer\" (s 48(2)(a)) or \"so adverse to the consumer as to be inequitable\" (s 48(2)(b))." },
      { stat: "Contract", body: "Unilateral variation can at most apply to future dealings: it doesn't rewrite a concluded contract." },
      { stat: "Within-transaction shift", body: "The same principle applies inside a single transaction. In the Shapshak case (Stuff SA, 26 January 2024) Takealot's original return-acceptance email cited one set of T&Cs (\"Please do not mark the original product packaging, and include all parts and accessories\"), but the rejection email cited a different, longer set of T&Cs that had not appeared in the original. Introducing new conditions after a return has been logged is the within-a-transaction analogue of the policy-version mismatch. Quote the original email's terms back at the agent." },
      { stat: "Evidence", body: "Screenshot the policy in force when you place a significant order. Archive the PDF. Keep every email Takealot sends in a return: first response, collection notification, rejection. The terms cited at each stage matter." },
    ],
    why: "If Takealot tries to apply a later version of the policy to an earlier order, or different rules at different stages of the same return, push back. Screenshot the policy at order time for significant purchases. Save every email; the terms cited at acceptance must match the terms cited at rejection.",
    template: "T09", escalate: "CGSO",
  },
  {
    n: "13", slug: "high-court-jurisdiction", title: "High Court jurisdiction",
    takealot: "The T&Cs name the High Court (Western Cape Division, Cape Town) as the forum for any legal matters between Takealot and you, and add, verbatim, that this applies \"even if the disputed amount would typically be heard by a lower court.\" That qualifier is the operative one: it tries to push small-value disputes past the cheaper Magistrates' or Small Claims forums.",
    angles: [
      { stat: "CPA s 69", body: "Sets out the consumer's enforcement routes: Tribunal (where permitted), applicable ombud, CGSO under s 82(6), provincial consumer court, accredited ADR under s 70, NCC under s 71, or a court with jurisdiction. A contract can't close off statutory routes." },
      { stat: "Motus v Wentzel", body: "The SCA in Motus Corporation v Wentzel [2021] ZASCA 40 offered obiter guidance (paras 26–27) that, read with s 34 of the Constitution, s 69(d) \"should not lightly be read as excluding the right of consumers to approach the court\", and that its reference to remedies \"in terms of national legislation\" need not mean an ombud-first hierarchy. Counsel for the appellants expressly declined to pursue the point, so the court \"did not hear full argument on the matter\" and recorded that the issues \"will need to be resolved on another occasion.\" It is direction, not holding. But it's SCA direction, and the reasoning has been picked up by commentary at ENSafrica and Cliffe Dekker Hofmeyr. A forum-selection clause that tries to push you past a cheaper lower court is still attacked primarily under s 48 read with Regulation 44 and s 51(3). Motus gives you a strong answer to an \"exhaust the ombud first\" defence, but it doesn't strike the clause." },
      { stat: "Pure Silk v Martin", body: "The Western Cape High Court (December 2025) held that a consumer does not have to work through the s 69 complaint bodies before going to court, and declined to follow contrary decisions from other divisions: the CPA \"does not contemplate preventing consumers from approaching a court even prior to having knocked at the doors of the forums listed in section 69.\" Courts elsewhere still differ, but the Western Cape is the forum Takealot's own T&Cs choose." },
      { stat: "CGSO (compulsory scheme)", body: "Takealot is a mandatory participant in the CGSO under the Consumer Goods and Services Industry Code of Conduct gazetted under CPA s 82 (March 2015; replaced from 1 December 2026 by a new Code, GG 55719, whose clause 4.2 says registering with the CGSO is mandatory). Compulsory participation was upheld in CGSO NPC v Voltex [2021] ZAGPPHC 309 (26 March 2021); non-participation contravenes CPA s 82(8). Takealot names CGSO as escalation point in its own T&Cs. Use it." },
      { stat: "Small Claims Court", body: "Up to R30,000. No attorneys. No court fee to issue the summons. You can serve it yourself; if the sheriff serves it, the fixed tariff is R79 plus R7.50 a km travelling allowance (since 28 November 2025)." },
      { stat: "Magistrates' Court", body: "District Magistrates' up to R200,000. Regional Magistrates' R200,000–R400,000 (concurrent with High Court above R200,000). High Court above R400,000, with exclusive jurisdiction beyond regional's ceiling." },
      { stat: "CPA s 48 / s 51", body: "A forum-selection clause pushing consumers to the most expensive forum is a candidate for unfair-term and statutory-waiver challenge." },
    ],
    why: "You are not stuck with the High Court for a R2,500 dispute. CGSO, NCC, Small Claims Court, and Magistrates' Court remain available.",
    template: "T14", escalate: "CGSO · Small Claims Court (up to R30,000) · Magistrates' Court (up to R400,000)",
  },
  {
    n: "14", slug: "order-cancellation", title: "Order cancellation",
    takealot: "Takealot may cancel a confirmed order for any reason: out-of-stock, payment issues, listing errors (including pricing), or account-abuse / criminal-activity investigation. Marketplace sellers get the same power: \"Sellers on our platform may also, for any reason, cancel an item they are responsible for.\"",
    angles: [
      { stat: "Contract formation", body: "Takealot's own terms say your \"order is only complete once you have paid and received an order confirmation.\" From that point there is a contract at the confirmed price. Cancelling it afterwards relies on Takealot's \"for any reason\" term, and that term is open to challenge as unfair (below)." },
      { stat: "Not CPA s 23", body: "The CPA's displayed-price rule switches itself off for online orders: s 23(1)(b) says it does not apply where ECT s 43 applies, which covers every takealot.com order. Don't cite s 23 against Takealot. Argue the contract and the unfair cancellation term instead." },
      { stat: "CGSO Advisory Note 10", body: "Pricing errors online: in Advisory Note 10 ([2021] ZACGSO 10; now under CGSO review, still on SAFLII) the Ombud's view is that a supplier \"is bound by a consumer's acceptance of the offer and the advertised price\", unless its terms say otherwise or the price was so far off that you ought to have realised it was a mistake. A R2.99 TV won't hold; a believable sale price that turned out to be wrong is worth contesting. Takealot's terms do reserve a right to cancel for pricing errors, so against Takealot this works only together with the unfair-term argument below." },
      { stat: "CPA s 48 + Reg 44(3)(k)", body: "Takealot's terms let it cancel a confirmed order \"for any reason\", naming pricing errors. Regulation 44(3)(k) presumes unfair any term \"allowing the supplier to terminate the agreement at will where the same right is not granted to the consumer\", and under Takealot's own terms you can cancel only if your order page shows a 'cancel' button (your ECT s 44 cooling-off and s 46 late-delivery rights aside). The presumption can be rebutted, but Takealot has to justify the term." },
      { stat: "CPA s 47(3)", body: "On a shortage cancellation the supplier must (a) refund with interest at the prescribed rate and (b) compensate you for costs directly incidental to the breach. Only (b) falls away, and only if the shortage was beyond the supplier's control and it took reasonable steps to tell you as soon as practicable (s 47(5)). Takealot also has a defence if you accepted, or unreasonably refused, comparable goods it offered (s 47(4)). No \"double damages\", but a s 112 administrative fine may apply separately." },
      { stat: "ECT s 46", body: "Online orders must be executed within 30 days unless otherwise agreed. If they aren't, you may cancel on 7 days' written notice, or insist on delivery instead (the CGSO's Advisory Note 10, now under CGSO review, reads s 46 that way). If the item is unavailable, Takealot must tell you immediately and refund within 30 days of telling you (s 46(3))." },
      { stat: "Cover damages", body: "If you had to buy the equivalent elsewhere at a higher price, the difference is a damages claim." },
      { stat: "Late delivery: the silent cancel", body: "ECT s 46 also covers the slower pattern: order placed, promised date passes, no delivery, no communication. Documented in Wendy Knowler's Knight case (News24, 27 September 2024): R3,700 order placed 17 August, promised 30 August, undelivered by 16 September, emails and calls to no avail. Knowler's intervention triggered next-day delivery. Path (template T23): written 7-day notice citing s 46(2); if still undelivered, cancel and demand your money back. If Takealot says the item is unavailable, s 46(3) sets a 30-day refund deadline from that notice. Don't accept Takealot framing the courier as the responsible party: your contract is with Takealot, not the courier." },
      { stat: "CPA s 54: paid delivery missed", body: "Paid extra for same-day or next-day delivery and it came late? A delivery you pay for separately is a service: s 54(1)(a) gives you the right to \"the timely performance and completion of those services\", and s 54(2)(b) lets you require the supplier to \"refund to the consumer a reasonable portion of the price paid\" for a service that fell short. For a missed premium slot, a reasonable portion is arguably the whole premium, since speed is what it paid for. Ask for it as a refund, not account credit. Expect Takealot to point to its terms calling delivery dates \"estimates\"; answer that a paid premium slot is a specific agreed condition." },
      { stat: "CPA s 31: pre-ticked paid delivery", body: "EWN reported (2 September 2026) that faster paid delivery options \"can now be selected by default\" at Takealot checkout, so \"customers could end up paying for delivery even when their order qualifies for free standard shipping.\" If you were charged for a paid option you didn't actively choose, the charge is arguably void: s 31 bars a supplier from offering to \"enter into or modify an agreement\" on the basis that it \"will automatically come into existence, unless the consumer declines\", and says such an agreement or modification \"is void\". This rests on a press report. We don't independently verify reporting in the press, we haven't checked the checkout ourselves, and Takealot's checkout may change at any time. No court or regulator has applied s 31 to a checkout default yet that we know of. Check what's selected before you pay; if a paid option was pre-selected, ask for the fee back." },
      { stat: "System-error cancellation", body: "An automated cancellation can be wrong on its own facts. In Knowler's Christmas-books case (News24, 21 December 2025) Takealot cancelled a book as out-of-stock and credited the consumer R147, then dispatched the cancelled book the next day. Takealot's own admission: \"A system error incorrectly flagged an in-stock item as cancelled.\" If the item was in stock, there was no shortage and no listing error to rely on, only the general \"for any reason\" term, which is open to challenge as unfair (see the CPA s 48 + Reg 44(3)(k) angle). Push for delivery, or insist on a refund rather than credit." },
    ],
    why: "Pricing errors and post-confirmation cancellations are a common friction point. The consumer-side argument is stronger than people realise. Late or silent non-delivery is the same beast wearing a different coat: same statutory remedies (ECT s 46, CPA s 47), same paper trail.",
    template: "T10", escalate: "CGSO · Small Claims Court for difference",
  },
  {
    n: "15", slug: "marketplace-sellers", title: "Marketplace sellers",
    takealot: "Sellers are responsible for the items they sell on our platform.",
    angles: [
      { stat: "CPA s 56(1)", body: "Three-tier warranty runs against producer/importer, distributor, AND retailer. \"Retailer\" on a platform transaction can include the platform operator, depending on the facts." },
      { stat: "CPA s 61(3)", body: "If the product causes harm (injury, illness, or damage to property), liability is strict and joint and several across the supply chain (s 61(1), (3), (5)), subject to the s 61(4) defences, including a distributor's or retailer's defence that it could not reasonably have discovered the defect. Takealot is in that chain where it is the retailer. For an ordinary defect with no harm, use s 56." },
      { stat: "ECT s 43", body: "In our reading, the platform has information and disclosure obligations under ECT regardless of seller identity. Asked by Knowler (News24, 6 April 2025), the CGSO's Lee Soobrathi pointed to the ECT Act rule that a supplier must tell customers how they can \"access and maintain a full record of the transaction\" (in our reading, s 43(1)(m)), and said a platform hosting other sellers is an intermediary under the CPA that must comply." },
      { stat: "ECT s 43(1)(m): transaction record", body: "An online seller must tell you \"the manner and period within which consumers can access and maintain a full record of the transaction\" (ECT s 43(1)(m)). (The CPA's own sales-record section, s 26, switches off where ECT s 43 applies (s 26(1)(a)), so for online orders this is the record duty.) In the Wales / Lenovo case (News24, 6 April 2025) Takealot could not produce an invoice once the third-party seller went quiet. Without an invoice you cannot claim on a manufacturer warranty, so the missing record matters." },
      { stat: "CPA s 27: intermediary", body: "An intermediary must disclose the prescribed information to the people it sells to on a third party's behalf, and \"keep the prescribed records of all relationships and transactions\" (s 27(1)). CGSO Lee Soobrathi (News24, 6 April 2025): \"The approach of the CGSO is that an e-commerce platform hosting third-party business products will be regarded as an intermediary for the purpose of the Consumer Protection Act, and as such will need to comply with these provisions.\" That was the CGSO's view on the Wales case: once Takealot acted as the consumer-facing party in a third-party sale, the consumer should not be left to chase the seller for the records." },
      { stat: "CGSO jurisdiction", body: "CGSO handles complaints against Takealot even where the item was sold by an other-seller. Takealot's own T&Cs name the CGSO as escalation point without distinguishing seller type." },
      { stat: "NCC + CGSO joint paper (2026)", body: "The two regulators' stated view (Consumer Protection in E-Commerce, March 2026): \"it is the responsibility of the hosting platform to resolve disputes and to ensure that third party sellers comply with all provisions of the CPA and ECTA.\" Making platforms jointly liable with sellers is so far only a proposal in the paper, but both regulators already treat resolving the dispute as the platform's job." },
      { stat: "NCC + CGSO e-commerce note (2025)", body: "The same two regulators said it eight months earlier, in a joint explanatory note of 13 July 2025: \"it remains the responsibility of the hosting platform to resolve a dispute that may arise and to ensure that these third-party suppliers comply with all provisions of the CPA and ECTA.\" Guidance, not a ruling, but the regulators have now put it in writing twice." },
      { stat: "Apparent authority", body: "Takealot handles checkout, payment, delivery, and returns logging. It looks and feels like Takealot is the supplier. Courts may give weight to that when resolving s 1 \"supplier\" ambiguity." },
      { stat: "CPA s 40", body: "Takealot itself (and anyone acting as its agent) may not use pressure, harassment or unfair tactics when supplying goods or recovering them from you. The section governs the supplier's own conduct; it doesn't make Takealot answer for another seller's." },
      { stat: "Stolen goods: vetting failure", body: "In November 2019 Axel Scholle bought an HP laptop on Takealot from a third-party reseller (Nanotec Digital) for about R14,000. In October 2022 it was remotely locked as stolen property of the Department of Agriculture. Takealot said it had already suspended Nanotec Digital two months earlier, in August 2022, after its own investigation found the seller had sold stolen goods; no court outcome is known. Yet on Scholle's return, Takealot first agreed to a refund, then declined the return citing \"tampering\" (a shop had upgraded the RAM and hard drive, and the parts were removed before the return). It then credited his store account, took the credit back a few days later, and refunded him again in early December, a month after Wendy Knowler covered the case (TimesLive, 6 November 2022); MyBroadband reported the refund (December 2022). When a refund has already flipped once, ask for the next payment to go to your bank account, not store credit (Scholle's own request, to stop further reversals)." },
      { stat: "Vetting is the platform's claim", body: "Takealot's own framing in the Scholle case, given to the press after the event: \"All our sellers are vetted and have also provided contractual obligations and warranties that they comply with the law.\" If Takealot makes the same claim on its site or in its marketing before you buy, and the vetting failed, that is a possible s 41 argument. A statement made to a journalist after your purchase is not one you relied on, but it does undercut any \"the seller is solely responsible\" line." },
      { stat: "Competition Commission finding", body: "In July 2023 the Competition Commission's Online Intermediation Platforms Market Inquiry found that Takealot trading through its own Retail division on its marketplace \"creates a conflict of interest\", and said \"Takealot is required to segregate its Retail division from its Marketplace operations\". It is a competition remedy that protects sellers, not a consumer-law ruling, but it undercuts any \"the seller is solely responsible\" deflection." },
      { stat: "Resolution pattern", body: "The Wales case followed a documented pattern: direct engagement, then a CGSO complaint, to which Takealot replied that the \"third-party seller is solely responsible for fulfilment of delivery of the goods\". Then came News24 escalation with the CGSO's view on record, and Takealot contacting him within an hour of publication and giving him a replacement laptop (News24 follow-up, 13 April 2025). Use the same path, and make your CGSO complaint cite the platform's s 27 record-keeping duty and ECT s 43." },
    ],
    why: "Don't let them punt you to an other-seller to avoid their own platform and supply-chain liability. The CGSO's published view treats Takealot as an intermediary under s 27, so it must keep the records of the transactions it handles. ECT s 43(1)(m) separately requires the online supplier to tell you how to access a full record of the transaction, whoever the underlying seller is. The CPA's three-tier warranty includes the retailer; if Takealot advertises its seller vetting before you buy and the vetting fails, that is a possible s 41 argument. Direct your s 56 claim (and your invoice / records demand) at Takealot; pursue the other-seller in parallel. If a refund flips, demand the next payment to your bank account.",
    template: "T11", escalate: "CGSO: name both Takealot and the other-seller",
  },
  {
    n: "16", slug: "digital-items", title: "Digital items",
    takealot: "Digital items (downloads, gaming codes, course codes) are only returnable if defective.",
    angles: [
      { stat: "ECT s 42(2)(f)(iii) / (g)", body: "Digital codes and downloads arguably fall under (f)(iii); unsealed software under (g). Either way they are excluded from ECT s 44 cooling-off only: once consumed, can't be un-consumed. Fair in principle." },
      { stat: "Scope limit", body: "s 42(2) applies to ECT s 44 only. It does not disapply CPA s 56, nor ECT s 43 (disclosure) or s 46 (performance)." },
      { stat: "CPA definition", body: "\"Goods\" under the CPA is defined broadly: it explicitly includes data, software, code, and licences. A defective digital item is defective goods." },
      { stat: "CPA s 55 + s 56", body: "Defective digital content must be fit for purpose, work as described, and be usable. A code that doesn't work, a course that doesn't unlock, an e-book with missing pages: each one is a s 56 claim." },
      { stat: "ECT s 46", body: "Non-delivery of a digital item (you paid, nothing arrived) is non-delivery, not change-of-mind. The order must be executed within 30 days unless agreed otherwise; if it isn't, you may cancel on 7 days' written notice." },
      { stat: "s 56(2) election", body: "For a defective digital good you elect replacement or refund. Takealot's own policy offers a replacement or a refund, so it can't force store credit on you for a non-working code." },
    ],
    why: "Digital doesn't mean unreturnable. Defective digital items are still defective goods.",
    template: "T12", escalate: "CGSO",
  },
  {
    n: "17", slug: "resale-prohibition", title: "Resale prohibition",
    takealot: "Do not resell any item purchased on our platform. If you do, we may suspend or terminate your account and cancel pending orders. (Separately, the T&Cs reserve the right to suspend or terminate any account \"at any time and for any reason\".)",
    angles: [
      { stat: "TMA s 34(2)(d)", body: "Statutory exhaustion. Trade Marks Act 194 of 1993 s 34(2)(d): sale of goods to which the mark has been applied with the proprietor's consent does NOT constitute infringement. Once consented-to goods hit the market, resale of genuine unaltered goods doesn't infringe the mark." },
      { stat: "Contract vs lawful", body: "The resale clause may bind you personally as a matter of contract (breach risks account termination). It does not make the downstream resale legally invalid. Title passes to you on delivery: you can sell your own property." },
      { stat: "TRC v Sony", body: "Television Radio Centre v Sony Kabushiki Kaisha 1987 (2) SA 994 (A), [1987] ZASCA 32, decided under the old 1963 Trade Marks Act: video recorders converted after Sony marked them were no longer the \"genuine goods\" Sony had marked, so selling them under the SONY mark infringed. Resale protection covers genuine goods as marked, not materially altered ones." },
      { stat: "Frank & Hirsch", body: "Frank & Hirsch v Roopanand Brothers 1993 (4) SA 279 (A): where a separate SA copyright owner controls the packaging/get-up, parallel imports can still be blocked on copyright grounds." },
      { stat: "CPA s 56", body: "Purchase intent is not a statutory ground for refusing a s 56 return. A \"must have bought to resell\" allegation is not a valid basis to reject a defective return." },
      { stat: "If Takealot cites the clause", body: "If Takealot ever cites this clause to refuse a defective return, push back: your s 56 rights are not conditioned on why you bought the item." },
      { stat: "Credit on a closed account", body: "The T&Cs also say Takealot \"may, at any time and for any reason, suspend or terminate your Takealot account.\" If that happens while your account holds refund credit, that credit came from money you paid. Takealot's returns policy itself contemplates you asking \"for a refund\" of unused credit. Ask in writing for the balance to be paid to your bank account (Clause 24, template T21)." },
    ],
    why: "Intent of purchase is not a statutory ground for refusing a s 56 return. If Takealot cites the resale clause as a reason to reject a defective return, push back and refer to s 56.",
    escalate: "CGSO",
  },
  {
    n: "18", slug: "mis-returned-items", title: "Mis-returned items",
    takealot: "If you return the wrong item, Takealot disposes of it and does not pay for the loss.",
    angles: [
      { stat: "Bailment", body: "Takealot holds returned goods as bailee (depositary) and owes a duty of care. Under CPA s 51(1)(c)(i) it cannot exclude liability for loss caused by its gross negligence, and any wider exclusion is open to challenge under s 48 (below). Reasonable steps to identify mis-returned items (serials, associated order) are expected." },
      { stat: "Delict", body: "Negligent destruction is actionable. Immediate disposal without reasonable inspection may be negligent." },
      { stat: "CPA s 65", body: "An item you returned by mistake is still yours while Takealot holds it. Section 65(2) says a supplier holding a consumer's property \"must not treat that property as being the property of the supplier\" and \"is liable to the owner of the property for any loss\" if it fails to look after it with reasonable care. On our reading, that is the statutory answer to \"we dispose of incorrect returns\" and \"we will not pay for lost items\". Applying s 65 to a mis-return is our own reading; no court or Ombud has ruled on it that we know of." },
      { stat: "CPA s 48", body: "s 48 lets you attack a blanket liability exclusion for destroyed consumer property as unfair." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(b) presumes unfair a term that excludes or restricts your remedies against the supplier when it breaches its obligations." },
      { stat: "Mitigate fast", body: "Notify Takealot the moment you realise, in writing. Photograph what you're returning. Note serial numbers. Create the paper trail." },
      { stat: "Damages", body: "If they destroy it despite your timely notice, you have a damages claim in delict, and arguably under CPA s 65(2)(c) (on our reading, above). Section 48 is what you use to knock out the 'we will not pay for lost items' term, not the source of the damages." },
      { stat: "Reverse mis-collection", body: "Mis-returns can run in the opposite direction too: Takealot dispatching a courier to collect an item the consumer never received. Documented in Wendy Knowler's Christmas-books case (News24, 21 December 2025): when Chelsea reported a book had not been delivered, Takealot twice sent a courier to collect, in her words, \"the book that I told them I do not possess!\" Refuse the collection, document the refusal, and treat it as confirmation that the system has not registered your non-delivery report. Keep escalating in writing until the system catches up to reality." },
      { stat: "GPS is not proof of delivery", body: "When a retailer claims an order was delivered but the consumer never received it, its first-line defence is sometimes \"the delivery driver's GPS coordinates matched the delivery address.\" GPS coordinates are evidence of where the driver was; they are not evidence of what happened to the parcel. Per Wendy Knowler (News24, 27 September 2024) on a R600 whisky-not-delivered case: GPS matched, \"yet, no delivery signature could be produced.\" The relevant evidence is a signed proof-of-delivery (or a no-signature delivery confirmation acknowledged by the consumer), not the courier's trip log." },
    ],
    why: "Double-check every return before handing over. Photograph what you're returning. Note serial numbers. If you realise you've sent the wrong item, notify Takealot immediately and in writing. And if Takealot tries to come collect an item you never had, refuse the collection in writing: that pattern means the system hasn't registered your non-delivery report.",
    escalate: "CGSO · Small Claims Court or Magistrates' Court for damages",
  },
  {
    n: "19", slug: "restocking-redelivery-fees", title: "Collection and re-delivery fees",
    takealot: "If a return fails Takealot's packaging, seal or completeness check, Takealot refuses the return and sends the item back. If you re-log the return, Takealot reserves the right to charge a fee for collection and a fee for re-delivering the same or a replacement item to you.",
    angles: [
      { stat: "CPA s 56(2)", body: "A defective-goods return under s 56 is at the supplier's risk and expense. A collection fee or re-delivery fee on a defective return shifts the statute's cost allocation back onto the consumer, which is exactly what s 56(2) does not allow." },
      { stat: "NCC v RC Auto (2026)", body: "The National Consumer Tribunal (5 November 2026) said a dealer ought to have collected a defective car, or authorised its repair, once the buyer told it she couldn't afford to bring it back more than 700 km: suppliers \"are, after all, statutorily obliged to pay for and bear the risk of returning the goods\" under s 56(2). It ordered a refund of the R244,000 she paid and a R100,000 penalty. A car dealer, not Takealot, and a Tribunal ruling rather than a court's. But it is the clearest recent statement that the cost of getting defective goods back sits with the supplier." },
      { stat: "CPA s 51", body: "A term must not directly or indirectly purport to \"waive or deprive a consumer of a right in terms of this Act\" (s 51(1)(b)(i)), and s 51(3) makes such a term void. A packaging-condition fee that recovers s 56(2) costs from you arguably waives the right to return defective goods \"at the supplier's risk and expense\"." },
      { stat: "CPA s 48", body: "Unfair, unreasonable, unjust terms. A fee levied against a consumer who is exercising a statutory remedy is arguably unfair, especially where Takealot chose the outbound courier and the outbound packaging. The presumption argument runs through Reg 44, below." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(b) treats as presumptively unfair any term that excludes or restricts the consumer's legal rights or remedies against the supplier in the event of breach. Regulation 44(3)(g) catches any term that modifies the normal rules of risk-distribution to the consumer's detriment, which is what a packaging-condition fee does when it shifts s 56(2)'s \"supplier's risk and expense\" allocation back onto the consumer." },
      { stat: "CPA s 20(6)", body: "s 20(6) permits a reasonable restoration charge only in narrow circumstances on a non-defective return, and not where the consumer had to destroy the packaging to determine conformity or fitness. It does not license a generalised restocking fee and doesn't reach defective-goods returns." },
      { stat: "CGSO case study (2025/26)", body: "Inside the 7-day ECT cooling-off, \"the only charge that may be levied on the consumer is the direct cost of returning the goods\" (ECT s 44(2)). The Ombud applied that to a 15% packaging \"handling fee\" on an online return and the supplier dropped it (CGSO Annual Report 2025/26)." },
      { stat: "s 53(1)(a) framing", body: "If the goods are materially imperfect the return sits under s 56, not s 20. The packaging-condition check cannot be used to re-characterise a defective return as a change-of-mind return and import a restoration charge." },
    ],
    why: "On a defective return a packaging-condition fee isn't allowed: the statute says defective returns happen at the supplier's risk and expense. Inside the 7-day online cooling-off, the only charge allowed is the direct cost of returning the goods. Outside both, Takealot's own terms apply. Don't pay a fee on a defective return; challenge it.",
    template: "T15", escalate: "CGSO · chargeback on the fee itself if already debited · NCC for pattern evidence",
  },
  {
    n: "20", slug: "inspection-assessment-delay", title: "Open-ended inspection & assessment",
    takealot: "On a defective-goods return Takealot says \"when we receive the item, we'll inspect it.\" The policy doesn't give a deadline for the inspection, doesn't name the technical standard applied, and doesn't spell out how you contest a rejection. Extended-warranty items (defects appearing more than 6 months after delivery, so past the s 56 return window) go to the supplier for an evaluation that has no deadline. The policy's only time limit: if the supplier accepts the return and repair or replacement takes longer than 21 days from receipt at its facility, Takealot offers credit or a refund.",
    angles: [
      { stat: "CPA s 56(2)", body: "The consumer elects the remedy (repair, replace, or refund) the moment the goods fail to comply with s 55. s 56(2) doesn't gate that election on a supplier-determined inspection outcome. An inspection process that holds the election hostage indefinitely is a de-facto waiver of the statutory right." },
      { stat: "Supplier's risk and expense", body: "A s 56(2) return is made \"without penalty and at the supplier's risk and expense\". The cost and delay of the supplier's own inspection falls on the supplier, not on the consumer waiting for a remedy." },
      { stat: "CPA s 48", body: "A term or process that is excessively one-sided or so adverse as to be inequitable is unfair. An open-ended inspection clock with no SLA and no defined standard sits comfortably inside that definition, especially where the consumer has cash tied up in a failed purchase." },
      { stat: "CPA Reg 44(3)(j)", body: "Regulation 44(3)(j) presumes unfair any term \"giving the supplier the right to determine whether the goods or services supplied are in conformity with the agreement\". Takealot's own inspection is evidence, not the final word on whether your item is defective. If you dispute the outcome, the dispute goes to the CGSO or a court, not back to Takealot." },
      { stat: "CPA s 51(3)", body: "Any contractual mechanism that operates as a waiver of s 56 rights is void. A policy process that practically defeats the s 56(2) election by indefinite delay is vulnerable under s 51(3), even if the policy wording itself doesn't use the word \"waiver.\"" },
      { stat: "CGSO Advisory Note 1", body: "The Ombud's published 2021 position (para 9.3) is that inspection is acceptable only \"in appropriate cases, where there is a genuine reason for believing that the [supplier] may not be liable\", and the item must come back \"speedily (a maximum of 7-10 days if the item needs to be sent away)\". A routine, open-ended inspection doesn't meet that. The CGSO has since taken its Advisory Notes down pending review; the text remains on SAFLII." },
      { stat: "CGSO 60-day benchmark", body: "Suppliers get 15 business days to respond to a CGSO complaint. The Ombud's resolution target is 60 business days under the 2015 Code, and 60 days from the start of its investigation under the Code in force from 1 December 2026. Those numbers are a useful comparator: an internal inspection that takes longer than a full CGSO complaint is, in our view, hard to defend as reasonable." },
      { stat: "Paper trail", body: "Put the inspection demand in writing with a hard deadline (7–14 business days is defensible). State that if there's no written outcome by then, you'll treat it as a refusal and escalate. File with CGSO on the day the deadline lapses." },
    ],
    why: "Takealot's inspection step has no SLA in the policy. That's the lever: in practice it's where s 56 claims go to die. Give it a deadline yourself, in writing, and hold them to it.",
    template: "T16", escalate: "CGSO · NCC if the delay is a pattern across multiple consumers",
  },
  {
    n: "21", slug: "item-substitution", title: "Item substitution / wrong goods delivered",
    takealot: "Takealot's returns policy treats a wrong item as a 30-day return: replacement, credit or refund at your choice, though \"if we do not have replacement stock available, we'll rather credit your Takealot account.\" Takealot told News24 that customers can log a \"Not What I Ordered\" return on their profile. Its public position is that \"we take full accountability\" for picking, supplier and labelling errors. In practice, Takealot's first response can refuse the return because it is \"missing its accessories\", even where the consumer paid for goods of materially different value (e.g. a R14,000 iPhone vs a sub-R400 calculator).",
    angles: [
      { stat: "CPA s 55(2)(a)", body: "Goods must be reasonably suitable for the purposes for which they are generally intended. Section 55 measures the goods you were supplied, so it is a secondary argument here: a working calculator is suitable as a calculator. The primary frame is that the sale was never performed (common law, below, and ECT s 46)." },
      { stat: "CPA s 41", body: "The product page is a representation. If Takealot then states or implies that what it delivered is what you ordered (for example by treating the calculator as your iPhone return), that falls under s 41(3)(b)(v): falsely implying that goods \"have been supplied in accordance with a previous representation\". The core of the claim, though, is non-performance, not misrepresentation." },
      { stat: "Refuse at the door", body: "Where you can spot the substitution at the door, refuse the parcel: something materially different isn't what you ordered, and ECT s 46 governs performance of the order you placed. The NCC and CGSO's March 2026 joint paper also reads CPA s 20 with s 19 as letting online buyers refuse goods that don't match the order and claim a refund. (Section 19 itself says it does not apply where ECT s 46 governs performance, so treat this as the regulators' reading.) Where you spot it after opening, the same applies, plus s 56 if what arrived is defective." },
      { stat: "CPA s 56(2)", body: "If the substitution also fails the s 55 standards (arguable: see s 55(2)(a) above), s 56 applies and the consumer elects the remedy: replacement of the goods actually ordered, or refund. Account credit is not available unless the consumer chooses it." },
      { stat: "Common-law contract", body: "Performance of a sale of X by delivery of Y is non-performance. The consumer can rescind for fundamental breach and demand restitution of the price. This runs alongside the statutory remedies and is sometimes the cleaner path where the supplier is hiding behind a returns-policy procedural obstacle." },
      { stat: "Procedural defences (calculator pattern)", body: "Expect a refusal on procedural grounds. In Wendy Knowler's reporting (News24, 12 April 2026) Takealot refused Thandi Bila's return of the calculator she got instead of her R14,000 iPhone, on the basis that \"the return item is missing its accessories\", as if the calculator's accessories, not the iPhone she'd paid for, were the issue. Re-frame the return: this is not a return of the calculator under the original return policy; this is restitution after non-performance of a R14,000 contract for a different product." },
      { stat: "Evidence: Knowler's advice", body: "Where practically possible, open the box in front of the delivery person. If the contents do not match what you ordered, photograph the contents in the delivery person's hands. In Knowler's words, such evidence \"will be invaluable in the event of a dispute\"." },
      { stat: "Used sold as new: CPA s 41(3)(b)(iii)", body: "Delivering a used or refurbished item (including one another customer used and returned) as new is a misleading representation: s 41(3)(b)(iii) covers falsely implying that goods \"are new or unused, if they are not or if they are reconditioned or reclaimed\". The only use that doesn't count is use by the supply chain \"for the purposes of reasonable testing, service, preparation or delivery\" (s 41(4)). Reconditioned goods carrying the original brand must also carry \"a conspicuous notice\" saying so (s 25(1)). Photograph the signs of use when it arrives and log it as \"Not What I Ordered\"." },
      { stat: "Resolution pattern", body: "Bila's case ran the familiar course: direct engagement, a procedural refusal, News24 taking it up, then a reversal and the R14,000 credit. It shows Takealot can be made to put a substitution right, but it sometimes takes external pressure." },
    ],
    why: "If Takealot delivers something materially different from what you paid for, you are not asking for a goodwill return. You are asking for the goods you bought, or your money back. The right legal frame is non-performance of the sale (not change-of-mind) with s 41(3)(b)(v) if Takealot insists it delivered what you ordered. Don't accept a procedural refusal on accessories or packaging.",
    template: "T17", escalate: "CGSO · NCC for the pattern · Small Claims Court for the price paid if remedy delayed",
  },
  {
    n: "22", slug: "recall-noncompliance", title: "Recall non-compliance",
    takealot: "Takealot told Wendy Knowler (News24, 17 April 2026) that on the Citro-Soda recall it \"engaged all affected customers as per our standard recall procedures, offering a refund in the form of the original payment method.\" In practice, on the ESR HaloLock power-bank recall (published by the NCC in April 2026), two consumers told Knowler they were refused refunds: one was told the product's 12-month warranty had expired, another that Takealot could not confirm the recall. On the Citro-Soda Regular recall, one consumer was issued a coupon valid for two days as the recall \"refund\", which went to his spam folder and expired before he saw it.",
    angles: [
      { stat: "Headline argument", body: "A recall (whether ordered by the NCC under s 60 or notified by the supplier, as the ESR one was) is strong evidence the goods were never safe, good-quality goods under s 55. Within 6 months of delivery that gives you the s 56 return-and-refund election. Beyond 6 months, lean on the recall itself: the NCC's ESR notice told consumers to \"return them to a point of purchase for a refund\", and a retailer that refuses is going against the recall's own instruction. Report it to the NCC, and back it with s 55(2)(c) (goods must be usable and durable for a reasonable period). \"The item is well out of warranty\" is not an answer to either." },
      { stat: "CPA s 60", body: "s 60(2): if the NCC has reasonable grounds to believe goods may be unsafe and the producer or importer hasn't taken the steps an industry code requires, it can by written notice require the producer to investigate, or to \"carry out a recall programme on any terms required by the Commission\". Many recalls, the ESR power bank among them, are instead notified by the supplier and published by the NCC. Either way, the recall's own terms are the refund route." },
      { stat: "CPA s 55 + s 56", body: "s 55 gives you the right to safe, good-quality goods that stay usable and durable for a reasonable period (s 55(2)(c)), with no six-month cap. But the s 56 return-and-refund election runs only \"within six months after the delivery\". The ESR buyers on record bought in October and November 2024; the NCC notice came in April 2026, so s 56 had lapsed for them. What remained: the recall notice's own refund instruction, a s 55 complaint to the CGSO or NCC, the common-law remedies for a defect hidden at the time of sale (3 years; see the aedilitian-remedies page), and s 61 if the product caused harm." },
      { stat: "CPA s 41", body: "A listing that still presents a recalled product as safe to buy, after the recall is public, is arguably a misleading representation about a material fact under s 41. (CPA s 58 is narrower than it is often cited: it covers risky activities and facilities (s 58(1)), and safe-handling notices on the packaging of hazardous goods (s 58(2)), not listings.)" },
      { stat: "CPA s 61", body: "If a recalled product causes harm (a fire, an injury, damaged property), s 61 makes the producer, importer, distributor and retailer liable without proof of negligence, and where more than one is liable their liability is joint and several (s 61(3)). Takealot is a retailer. \"We are merely the platform\" is not a defence; a retailer's escape routes are the narrow s 61(4) ones, such as it being unreasonable to expect the retailer to have discovered the defect: a hard argument for anything Takealot sold after the recall was public." },
      { stat: "NCC enforcement", body: "Recall powers sit in CPA s 60 (Chapter 2). If a supplier ignores the NCC, the NCC can issue a compliance notice (s 100); if that is ignored, it can either ask the National Consumer Tribunal to impose an administrative fine (s 100(6)(a), s 112) or refer it for prosecution as an offence (s 100(6)(b), s 110(2)), not both. In the ESR power-bank case Knowler reported Takealot's recall responses to the NCC. A consumer denied a recall remedy can lodge directly with the NCC." },
      { stat: "Refund must be substantively equivalent", body: "A recall refund is a refund of the price paid in money or money-equivalent. A coupon valid for two days is not substantively equivalent. Where Takealot has substituted a coupon for a refund, demand the refund in money to the original payment method, citing the recall instruction (and s 56(2) if you're within 6 months of delivery). In Knowler's reporting on the Citro-Soda case, Takealot eventually credited the consumer the full coupon value as \"goodwill\": late, but the outcome to aim for when you paid with a coupon (below)." },
      { stat: "ECT s 44 / s 46: does not apply", body: "Recalls are not cooling-off cancellations. Don't let Takealot frame a recall return as a s 44 cooling-off (which would invite the 7-day-from-delivery argument) or a change-of-mind return. The instruction is the recall's, not your choice; the relevant frame is the recall notice plus CPA s 55 / s 56, not the cooling-off framework." },
      { stat: "Coupon-funded purchases", body: "Where the original purchase was paid using a Takealot coupon (Naidoo's case), Takealot's first response was to reissue the coupon with the original (short) validity. That is not a refund. Ask for a money-equivalent credit with Takealot's standard 3-year validity (its own credit-validity standard for non-coupon-funded refunds); it is a reasonable ask rather than a statutory entitlement, but a 2-day coupon is no refund at all. Cite s 48 (unfair-term) on the differential. Knowler's reporting confirms Takealot eventually conceded the full coupon value." },
    ],
    why: "When a product you bought is recalled, the recall notice is your refund route: return it to where you bought it. Within 6 months of delivery you also have the s 56 election. \"The item is well out of warranty\" is not a defence to a recall refund. If Takealot refuses, escalate in parallel: to the manufacturer directly (in Ben Hart's ESR power-bank case the manufacturer responded where Takealot, in Hart's words, \"stonewalled\" him), to the NCC for the recall non-compliance, and to the CGSO.",
    template: "T18", escalate: "Manufacturer (it responded in Ben Hart's case) · NCC · CGSO · ARB if Takealot's listing still represents the product as safe",
  },
  {
    n: "23", slug: "sale-pricing", title: "Sale pricing and sold-out deals",
    takealot: "Each seller sets its own prices and deals. Deals \"may expire sooner if Takealot or the seller runs out of the allocated amount of stock of the deal item\", and adding an item to your cart or wish list \"does not guarantee that you can purchase those items later at the same price.\" Your \"order is only complete once you have paid and received an order confirmation\", and even then Takealot \"may, for any reason, cancel your order\", naming out-of-stock items and listing errors \"including its pricing\". On a paid order cancelled for stock, its Help Centre says it will \"credit your account with the full amount you paid\".",
    angles: [
      { stat: "Cart is not a contract", body: "Until you have paid and received an order confirmation, Takealot's terms say the order isn't complete. A deal that sells out while it sits in your cart is usually just gone. The argument starts after confirmation (Clause 14)." },
      { stat: "CPA s 29(b)(iii)", body: "A retailer must not market goods in a way that is misleading about \"the price at which the goods may be supplied, or the existence of, or relationship of the price to, any previous price or competitor's price for comparable or similar goods\". A \"was\" price the item never really sold at is exactly that." },
      { stat: "CPA s 41(3)(f)", body: "It is a false, misleading or deceptive representation to falsely state or imply that \"a specific price advantage exists\". An inflated strike-through price implies a saving that isn't there." },
      { stat: "NCC, Black Friday 2024", body: "Before Black Friday 2024 the National Consumer Commission reminded suppliers that they must not mislead about \"the relationship of the price to any previous price or competitor's price\", and told shoppers that \"knowing the original prices of items they intend buying during this period will help to determine if an item is indeed discounted or not.\" Screenshot the price a week or two before the sale." },
      { stat: "CPA s 30: bait marketing", body: "A supplier must not advertise goods at a price in a way that may mislead consumers about \"the actual availability of those goods\" at that price (s 30(1)). If the advert states a limit, the supplier must supply at that price up to the limit (s 30(2)). It is a defence that the supplier offered you the same or equivalent goods at the advertised price within a reasonable time, and you unreasonably refused, or accepted and were supplied (s 30(3)). Takealot's terms disclose that deal stock is limited, so a sold-out deal isn't automatically bait marketing. A headline deal with almost no stock behind it may be. The NCC enforces s 30: report it there." },
      { stat: "Cancelled, then relisted for more", body: "If your paid, confirmed order is cancelled as \"out of stock\" and the same item is back on sale at a higher price, ask Takealot in writing to explain, and screenshot the new listing with its seller name, price, date and time. A relisting by a different seller can be genuine, so this is a question, not an accusation. ECT s 46(3) covers only goods that are \"unavailable\", and a relisted item arguably wasn't. And where CPA s 47 applies, a shortage excuses Takealot from paying your incidental costs only if it was \"due to circumstances beyond the supplier's control\" and you were told as soon as practicable (s 47(5)); the refund with interest is due either way (s 47(3)(a)). You can ask for delivery at the confirmed price, arguing that the \"for any reason\" cancellation term is presumed unfair (Reg 44(3)(k), Clause 14), or claim the extra it cost you to buy the item elsewhere. Automated cancellations do get it wrong: in Knowler's Christmas-books case (News24, 21 December 2025) Takealot admitted \"a system error incorrectly flagged an in-stock item as cancelled.\"" },
      { stat: "Credit is the default, not the rule", body: "Takealot's Help Centre says that when a paid order is cancelled for stock reasons it will \"credit your account with the full amount you paid\". Its own terms say something different: \"If an order or item is cancelled, we will refund you the amount paid for that cancelled order or item.\" Ask for the refund to the way you paid (Clause 06)." },
      { stat: "ECT s 44: price drop after you buy", body: "We know of no rule that makes a retailer refund a price drop after you've bought. But ECT s 44 lets you cancel most online purchases within 7 days of receiving them, and \"the only charge that may be levied on the consumer is the direct cost of returning the goods\" (s 44(2)). Takealot's own change-of-mind window is 30 days for most unused items. You can return the first one inside those windows and buy it again at the new price." },
      { stat: "Evidence", body: "Screenshot the listing (price, \"was\" price, seller name, stock message) with the date and time showing, before and after you pay. Save the order confirmation. Archive the product page on the Wayback Machine (web.archive.org/save)." },
    ],
    why: "A sale price is a representation like any other. If the \"was\" price is fiction, that is s 29 and s 41(3)(f). If the deal had no real stock behind it, that may be s 30. If your paid order was cancelled and the item came back at a higher price, ask Takealot to explain the cancellation in writing, and insist on the confirmed price or a refund to the way you paid.",
    template: "T10", escalate: "CGSO for your order · NCC for misleading prices and bait marketing · ARB for the advert",
  },
  {
    n: "24", slug: "account-suspension", title: "Account suspension, closure and takeover",
    takealot: "Takealot says: \"We may, at any time and for any reason, suspend or terminate your Takealot account.\" Its terms also say: \"You carry the risk of unauthorised and fraudulent activities on your Takealot account\", and that if you suspect unauthorised access you \"must notify us immediately\", change your password and block the payment cards loaded on the account.",
    angles: [
      { stat: "CPA Reg 44(3)(l)", body: "Regulation 44(3)(l) presumes unfair a term \"enabling the supplier to terminate an open-ended agreement without reasonable notice except where the consumer has committed a material breach of contract\". A shopping account is arguably an open-ended agreement, and \"at any time and for any reason\" gives no notice. The presumption can be rebutted, but Takealot has to justify the term." },
      { stat: "Your credit is still yours: CPA s 65", body: "Refund credit on your account came from money you paid. Takealot's returns policy itself contemplates you asking \"for a refund\" of unused credit within 3 years. CPA s 65(2) says a supplier holding a consumer's money \"must not treat that property as being the property of the supplier\". Applying s 65 to refund credit is our own reading. Gift-voucher value is covered more directly: s 63(3) makes money paid for a prepaid credit or voucher \"the property of the bearer\" until it is redeemed. Closing the account shouldn't change any of this: ask in writing for the balance to be paid to your bank account (template T21). Getting gift-voucher value paid out is harder, because Takealot's terms say a gift voucher can't be exchanged for cash; at least ask for the value to stay usable for the 3 years s 63(2) guarantees." },
      { stat: "CPA Reg 44(3)(g): fraud risk", body: "Regulation 44(3)(g) presumes unfair a term \"modifying the normal rules regarding the distribution of risk to the detriment of the consumer\". A term that puts all the risk of account fraud on you, whatever the cause, fits that description. It is hard to see how it could fairly put the loss on you where the failure was on Takealot's side (see ECT s 43(5)–(6) for its payment system). Where the loss was caused by Takealot's gross negligence, CPA s 51(1)(c)(ii) goes further: a term that makes the consumer assume the risk of that loss is prohibited, and void under s 51(3)." },
      { stat: "ECT s 43(5)–(6)", body: "An online seller \"must utilise a payment system that is sufficiently secure\" and \"is liable for any damage suffered by a consumer\" if it doesn't." },
      { stat: "POPIA s 19 + s 22", body: "Takealot must keep your personal information secure (s 19). If there are reasonable grounds to believe someone unauthorised got into it, Takealot must tell the Information Regulator, and tell you in writing, with enough information for you to protect yourself (s 22)." },
      { stat: "First steps after a takeover", body: "Report it to Takealot in writing the same day (its terms ask you to do this \"immediately\"), change your Takealot and email passwords, remove saved cards, and ask your bank to block the card and dispute any fraudulent transactions (Escalation tier 4). Keep a copy of everything you send." },
    ],
    why: "Closing an account doesn't forfeit money you paid in, and a takeover isn't automatically your loss. Get the credit balance paid out in writing, ask for the reason for the closure, and put any security failure on record.",
    template: "T21", escalate: "CGSO · Information Regulator (security compromise) · bank chargeback for fraudulent card transactions",
  },
];

export const TEMPLATES: Template[] = [
  { code: "T01", title: "Return request", scenario: "Opening a return for wrong item / damaged on delivery / missing parts / change of mind / defective goods.",
    subject: "Return request: Order #[ORDER]",
    body: `Hi,

I am logging a return for [item] delivered on [date] under Order #[ORDER].

The basis of the return is [Choose one: the wrong item delivered / damage on delivery / missing parts / defective goods per CPA s 56 / cancellation within the 7-day cooling-off period in ECT Act s 44 / change of mind within Takealot's 30-day returns window (unused, in original packaging)].

I am electing [repair / replacement / refund to original payment method] as my remedy. [Cooling-off cancellation: I am cancelling under section 44 of the ECT Act and claim a full refund within 30 days of cancellation (s 44(3)).]

Please confirm within 5 business days that Takealot will process the return [defective goods: at no cost to me, as section 56(2) requires / wrong, damaged or incomplete delivery: at no cost to me / cooling-off cancellation: at no cost to me, since Takealot's returns policy says "Our returns are free!" (and section 44(2) of the ECT Act allows no charge other than the direct cost of returning the goods) / change of mind: at no cost to me, as Takealot's returns policy says "Our returns are free!"].

Regards,
[Name]
[Contact]
Order #[ORDER]` },
  { code: "T02", title: "Packaging pushback", scenario: "Takealot refusing a defective-goods return for want of original packaging or tags.",
    subject: "Defective item return: Order #[ORDER]",
    body: `Hi,

I am not returning this item as change-of-mind. This is a return under section 56 of the Consumer Protection Act because the item is defective. Section 56 applies irrespective of Takealot's returns policy and does not impose an original-packaging condition on defective-goods returns. Section 51(3) renders any contract term that waives or limits section 56 rights void to the extent of the contravention.

Please confirm within 7 business days that Takealot will accept the return and action [repair / replacement / refund] as elected under section 56(2).

Regards,
[Name]` },
  { code: "T03", title: "Demand technical evidence", scenario: "Takealot rejected a s 56 claim citing wear, consumer damage, surge, coastal corrosion, modification, or misuse, with no technical substantiation.",
    subject: "Rejection of claim, technical basis required: Order #[ORDER]",
    body: `Hi,

Takealot has rejected the return of [item] on the basis of [normal wear and tear / consumer damage / electrical surge / sea air corrosion / modification / unintended use].

I am not required to prove what caused the fault: the onus is on the supplier to prove the exclusion it relies on (Toyota Randburg v Ndlovu [2024] ZAGPPHC 591, relied on by the Full Court in Edan Traders v National Consumer Tribunal [2026] ZAGPJHC 386; Wingfield Motors v National Consumer Tribunal [2025] ZAWCHC 385). Please provide the technical report or assessment supporting the rejection, the specific exclusion relied on, and the evidence on which the conclusion rests. A conclusion unsupported by evidence is not a basis on which a section 56 election can be refused.

Please provide the above within 7 business days or process the return on the basis of my section 56 election of [repair / replacement / refund].

Regards,
[Name]` },
  { code: "T04", title: "POPIA data protection", scenario: "Takealot requiring live unlock codes on a data-storage device as a precondition for return.",
    subject: "Data security on returned device: Order #[ORDER]",
    body: `Hi,

[Choose one: I will back up the defective (item), sign out of every account on it (including Find My or the Google account, so no activation lock remains) and factory-reset it before return. A reset device with no account lock allows full technical assessment without exposing personal data or credentials. / The fault itself stops me resetting the device. I will not hand over live credentials; please assess it on that basis.]

Section 56 of the Consumer Protection Act does not require live credentials as a precondition for return. Under the Protection of Personal Information Act, section 10 (minimality) requires that processing of personal information be adequate, relevant and not excessive for the purpose; section 19 requires appropriate, reasonable technical and organisational measures to secure personal information. Handing over live credentials exceeds what is necessary for a technical assessment.

Please confirm the return will be processed on this basis.

Regards,
[Name]` },
  { code: "T05", title: "Partial bundle return", scenario: "Takealot requiring return of the entire bundle to replace one defective component. If you want your money back rather than a repair or replacement, a s 56(2)(b) refund is arguably of the bundle price (no court or Ombud has ruled on partial bundle returns that we know of), so return the whole bundle and use T06.",
    subject: "Partial bundle return, defective item only: Order #[ORDER]",
    body: `Hi,

I do not accept that return of the complete bundle is required for the replacement of a single defective component.

1. Only the [specific item] is defective. The remaining components of the bundle comply with the quality standard in section 55 of the Consumer Protection Act and are not "defective goods" for section 56 purposes.
2. Section 53(1)(a) of the CPA defines a defect by reference to the "goods or components". Where one component can be replaced on its own and the rest of the bundle works as sold, a defect in that component does not make the working components defective.
3. Section 56(2) of the CPA gives the consumer (not the supplier) the election of repair, replacement, or refund in respect of the failed goods.
4. Section 51 of the CPA prohibits contract terms that waive consumer rights conferred by the Act; section 51(3) renders such terms void to the extent of the contravention. A policy condition that requires return of non-defective goods to obtain a section 56 remedy on the defective one operates as a waiver and is open to challenge.
5. [If data-storage devices: Compelled return of functional data-storage devices engages the Protection of Personal Information Act and amplifies the unreasonableness of the condition under section 48 of the CPA.]

I elect [repair / replacement] of the defective [item] under section 56(2)(a), and will return that item only. Please confirm within 7 business days.

Regards,
[Name]` },
  { code: "T06", title: "Refund election", scenario: "Takealot is loading account credit instead of refunding you: on a defective return, a cooling-off cancellation, or an order it cancelled.",
    subject: "Refund election: Order #[ORDER]",
    body: `Hi,

I am electing a refund to my original payment method, not account credit. [Defective goods: Under section 56(2) of the Consumer Protection Act the consumer elects the remedy, and Takealot's own returns policy lets me choose a refund. The National Consumer Tribunal has held, in an unopposed matter, that a retailer which refuses the refund a consumer chose "abused its power by dictating the remedy" (Gareeb v Incredible Connections [2024] ZANCT 7).] [Cooling-off cancellation: Section 44(3) of the ECT Act entitles me to "a full refund of such payment" within 30 days of cancellation.] [Order cancelled by Takealot: Takealot's own terms say "If an order or item is cancelled, we will refund you the amount paid for that cancelled order or item."]

Please process the refund to the original payment method and advise the timeline.

Regards,
[Name]` },
  { code: "T07", title: "Retailer liability", scenario: "Takealot deflecting to the manufacturer for a defective-goods claim within the 6-month window.",
    subject: "Section 56 obligation, retailer liability: Order #[ORDER]",
    body: `Hi,

I will pursue the manufacturer warranty in parallel, but my primary claim is against Takealot. Section 56(1) of the Consumer Protection Act imposes the implied warranty on the producer or importer, the distributor, AND the retailer, each independently liable. Section 56(4) confirms that the section 56 warranty is in addition to, not in substitution for, any common-law or express warranty from the manufacturer. For the first 6 months my remedy election under section 56(2) runs against Takealot directly.

Please confirm within 7 business days that Takealot will [repair / replace / refund] the goods, as I have elected under section 56(2).

Regards,
[Name]` },
  { code: "T08", title: "Do not dispose", scenario: "Takealot has rejected your return and is threatening to dispose of the item if you don't accept it back; you dispute the rejection.",
    subject: "Rejected return, DO NOT DISPOSE: Order #[ORDER]",
    body: `Hi,

I dispute the rejection. I do not consent to disposal. Any disposal during a pending dispute would be wrongful destruction of my property, in respect of which I reserve the right to claim damages. While Takealot holds the item, section 65(2) of the Consumer Protection Act says it "must not treat that property as being the property of the supplier". I am filing a complaint with the Consumer Goods and Services Ombud today.

[Choose one: Please retain the item until the dispute is resolved, and confirm in writing within 5 business days that you will. Declining re-delivery while I dispute the rejection is not abandonment of my property. If Takealot will not confirm that it will keep the item, I will accept re-delivery under protest. / I will accept re-delivery of the item under protest.] Accepting re-delivery is not acceptance of the rejection and is without prejudice to my dispute and my section 56 election.

Regards,
[Name]` },
  { code: "T09", title: "Policy version", scenario: "Takealot applying a newer policy version to an older order.",
    subject: "Applicable returns policy version: Order #[ORDER]",
    body: `Hi,

The applicable version of the returns policy for Order #[ORDER] is the version in force on [date of order], not any subsequent version. A unilateral variation clause can at most apply to future dealings; it does not rewrite a concluded contract. In any event, my rights under the Consumer Protection Act cannot be waived by a policy change (section 51(3) of the CPA renders any such term void), and section 48 of the ECT Act makes "null and void" any provision that excludes my rights under Chapter VII of that Act. Regulation 44(3)(i) to the CPA presumes unfair any term enabling the supplier to unilaterally alter the terms of the agreement.

Please apply the policy in force on the order date.

Regards,
[Name]` },
  { code: "T10", title: "Wrongful cancellation", scenario: "Takealot cancelled a confirmed, paid order, citing a pricing error or out-of-stock, perhaps with the same item back on sale at a higher price. (Late or never arrived? Use T23.)",
    subject: "Wrongful cancellation: Order #[ORDER]",
    body: `Hi,

Order #[ORDER] was cancelled on [date] on the stated basis [reason]. I do not accept the cancellation is lawful. A contract was concluded on my payment and your order confirmation.

Takealot's own terms say: "Your order is only complete once you have paid and received an order confirmation." I paid and received that confirmation, so the order was complete and a contract was concluded at the confirmed price. A term allowing Takealot to cancel a confirmed order for any reason is presumed unfair under section 48 of the Consumer Protection Act read with Regulation 44(3)(k), because Takealot's terms do not give me the same right: they let me cancel only where my order page shows a 'cancel' button. [If the stated reason is a pricing error: The price shown was not so far from the item's usual price that I ought to have realised it was a mistake.]

[If the item has since been relisted: On (date) the same item was listed on takealot.com at R(new price), sold by (seller) (screenshot attached). Please explain in writing why it was treated as unavailable when my order was cancelled. If it is available, I elect to have my order performed at the confirmed price.]

Where section 47 applies and the cancellation is due to a shortage, section 47(3) of the CPA requires you to (a) refund me with interest at the prescribed rate from the date of payment, and (b) compensate me for costs directly incidental to your breach. Only (b) falls away, and only if the shortage was beyond your control and you took reasonable steps to tell me about it as soon as practicable (s 47(5)). Where the goods are unavailable, section 46(3) of the ECT Act requires the refund within 30 days of telling me so; Takealot told me on [date].

Please either honour the order at the confirmed price, or refund me in full to my original payment method by [date: 30 days after the cancellation notice]. If you refund, I also claim interest and the cost of sourcing an equivalent item elsewhere to the extent it exceeds the order price.

Regards,
[Name]` },
  { code: "T11", title: "Platform liability", scenario: "Takealot deflecting to an other-seller / marketplace seller.",
    subject: "Platform liability: Order #[ORDER]",
    body: `Hi,

I understand the item was listed by [seller], an other-seller on your platform. My claim is against Takealot as the platform operator and as a member of the supply chain.

Section 56(1) of the Consumer Protection Act imposes the implied warranty on every link of the supply chain: producer or importer, distributor, and retailer. If the item has caused harm (injury, illness or damage to property), section 61 makes the producer, importer, distributor and retailer liable without proof of negligence, jointly and severally (s 61(1), (3)), subject only to the defences in section 61(4). Section 43 of the ECT Act places information and disclosure duties on the online supplier, and the CGSO's published view is that a platform hosting other sellers is an intermediary that must comply with these provisions.

The National Consumer Commission and the Consumer Goods and Services Ombud have jointly stated that "it is the responsibility of the hosting platform to resolve disputes and to ensure that third party sellers comply with all provisions of the CPA and ECTA" (Consumer Protection in E-Commerce, March 2026). Takealot names the Ombud as the escalation point in its own terms.

Please confirm within 7 business days how Takealot will address [issue].

Regards,
[Name]` },
  { code: "T12", title: "Digital defective", scenario: "A digital code, download, or course doesn't work, is wrong, or was never delivered.",
    subject: "[Defective / Undelivered] digital item: Order #[ORDER]",
    body: `Hi,

The digital [code / download / course] under Order #[ORDER] [describe issue: doesn't work / is the wrong code / was never delivered / had expired on arrival].

[If not delivered, and 30 days have passed since the order or the agreed delivery time has passed: This is non-performance under section 46 of the ECT Act, not a defect. Section 46(1) required the order to be executed within 30 days or the agreed period. This is my 7 days' written notice under section 46(2): if the (code / download / course) is not delivered by (date, 7 days from today), I will cancel and claim a full refund.]

[If delivered but defective: Under section 56 of the Consumer Protection Act, defective digital goods are returnable within 6 months. The definition of "goods" in section 1 of the CPA expressly includes data, software, code and licences. Section 42(2)(g) of the ECT Act excludes unsealed audio, video and software only from the 7-day cooling-off right under section 44; it has no bearing on a section 56 defective-goods claim. I am electing (refund / replacement) under section 56(2).]

Regards,
[Name]` },
  { code: "T13", title: "Warranty enforcement", scenario: "Product failed within advertised manufacturer warranty period but beyond 6 months; manufacturer refused; Takealot disclaiming.",
    subject: "Warranty enforcement, manufacturer declined: Order #[ORDER]",
    body: `Hi,

Order #[ORDER], [item], purchased [date]. Failed on [date], month [X] of ownership. Takealot's product page advertised [N-year] manufacturer warranty. Manufacturer declined (attached).

My claim against Takealot rests on the following:

1. CPA section 55(2)(c): reasonable durability. The goods must be usable and durable for a reasonable period having regard to use and all surrounding circumstances. Where Takealot represented a [N-year] warranty, that representation is part of the circumstances shaping reasonable durability. A failure in month [X] breaches this standard.
2. CPA section 55(4)(a): whether goods meet the quality standard depends on all the circumstances, including the manner in which, and the purposes for which, they were marketed. I relied on the product page's warranty representation.
3. CPA section 56(1): retailer warrants compliance with section 55 independently of the manufacturer.
4. [If the advertised warranty was not as described (for example it does not exist, has no local warranty service, or is shorter or narrower than advertised): CPA section 41 (false, misleading, or deceptive representations). Takealot's product page represented a warranty that was not as described; I relied on that representation.]

Electing [repair / replacement / refund of the purchase price] [if point 4 applies: with reasonable compensation for loss flowing from that representation].

Please confirm within 7 business days.

Regards,
[Name]` },
  { code: "T14", title: "CGSO final notice", scenario: "Direct engagement has failed; escalating to the ombud.",
    subject: "Final notice before CGSO referral: Order #[ORDER]",
    body: `Hi,

I refer to prior correspondence dated [dates]. Takealot has not provided the remedy to which I am entitled under [section 56 of the Consumer Protection Act / section 44(3) of the ECT Act / section 46 of the ECT Act]. This is a final opportunity to resolve the matter directly.

If I do not have written confirmation of [remedy] within 5 business days, I will file with the Consumer Goods and Services Ombud under the Consumer Goods and Services Industry Code of Conduct. Takealot will have 15 business days to respond to the complaint, and the CGSO aims to resolve complaints within 60 days of starting its investigation under the Code in force from 1 December 2026 (60 business days from receipt under the Code in force until 30 November 2026).

[If Takealot has pointed to its High Court clause: I do not accept that this clause takes away my right to go to the Consumer Goods and Services Ombud, the National Consumer Commission or a lower court. A term that tries to push a consumer past those forums is open to challenge under sections 48 and 51 of the Consumer Protection Act.]

I reserve the right to escalate further to the National Consumer Commission and, if necessary, to the Small Claims Court (up to R30,000) or Magistrates' Court.

Regards,
[Name]` },
  { code: "T15", title: "Re-delivery fee pushback", scenario: "Takealot is threatening (or has already applied) a collection or re-delivery fee on a defective-goods return.",
    subject: "Re-delivery fee on defective return: Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. The item is defective within the meaning of s 53(1)(a) of the Consumer Protection Act, and I am exercising my s 56 election of remedy.

Takealot has indicated that a [collection fee / re-delivery fee / restocking fee] may be applied to the return. I do not accept that.

1. Under s 56(2), the return of defective goods takes place at the supplier's risk and expense. Collection and re-delivery costs fall on Takealot, not on me.
2. Section 51(3) voids any contractual term that purports to waive a right conferred by the Act. A collection or re-delivery fee that recovers s 56(2) costs from me is a waiver.
3. Section 48 prohibits unfair, unreasonable, unjust terms. Regulation 44(3)(b) lists as presumptively unfair any term that excludes or restricts the consumer's remedies against the supplier in the event of breach; Regulation 44(3)(g) catches any term that modifies the normal rules of risk-distribution to the consumer's detriment.
4. Section 20(6) permits a reasonable restoration charge only on a non-defective return in narrow circumstances, and not where the consumer had to destroy the packaging to determine conformity or fitness. It does not extend to a defective-goods return.

Please confirm in writing, within 7 business days, that:

  (a) no collection or restocking fee will be charged for this return;
  (b) no re-delivery fee will be charged on the same item or a replacement;
  (c) my s 56 election, [repair / replacement / refund], will be given effect; and
  (d) if a fee has already been debited, it will be reversed in full.

Failing that I will escalate to the Consumer Goods and Services Ombud as a compulsory-participant matter under the Industry Code. [If you paid by card: I will also contest any debited fee with my card issuer under the applicable chargeback rules.]

Regards,
[Name]
[Contact]
Order #[ORDER]` },
  { code: "T16", title: "Inspection deadline", scenario: "Takealot has received a defective item for inspection, within 6 months of delivery, and the inspection is dragging with no communicated deadline or outcome. (More than 6 months after delivery, with an extended-warranty supplier inspecting? Section 56(2) no longer applies; rely on the warranty's own terms and s 55(2)(c) durability: Clause 07, template T13.)",
    subject: "Inspection deadline on defective-goods return: Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. The [item] was returned on [date] for inspection following a section 56 election of [repair / replacement / refund]. As of today, [N] business days have passed without a completed inspection outcome.

The Consumer Protection Act does not make the section 56(2) election conditional on a supplier-determined inspection. Under section 56(2) the goods are returned at the supplier's risk and expense. The cost and delay of the supplier's own assessment process are therefore the supplier's to carry. Under section 48 read with section 51(3), a process that defers the statutory remedy indefinitely is vulnerable as unfair and as a practical waiver of section 56 rights.

I would like to resolve this directly. I accordingly set the following deadline:

  (a) Takealot (or the supplier acting on Takealot's behalf) will provide a written inspection outcome within 7 business days of this email, by [date].
  (b) If the outcome is a rejection of the section 56 claim, it must identify the specific exclusion relied on and the evidence supporting it (the supplier must prove the exclusion it relies on: Toyota Randburg v Ndlovu [2024] ZAGPPHC 591, relied on by the Full Court in Edan Traders v National Consumer Tribunal [2026] ZAGPJHC 386).
  (c) If the outcome accepts the claim, I expect the elected remedy, [repair / replacement / refund], within a further 7 business days.
  (d) If I do not receive a written outcome by [date], I will treat that as Takealot's refusal to give effect to my section 56 election and will file a complaint with the Consumer Goods and Services Ombud on that basis.

For reference, suppliers get 15 business days to respond to a CGSO complaint, and the CGSO targets resolution within 60 days of starting its investigation under the Code in force from 1 December 2026 (60 business days from receipt under the Code in force until 30 November 2026). An internal inspection that takes longer than a full CGSO complaint is not a reasonable assessment window.

The Ombud's published Advisory Note 1 ([2021] ZACGSO 1, para 9.3; currently under CGSO review) accepts supplier inspections only "in appropriate cases, where there is a genuine reason for believing" that the supplier "may not be liable", with the item inspected and returned "speedily (a maximum of 7-10 days if the item needs to be sent away)".

Regards,
[Name]
[Contact]
Order #[ORDER]` },
  { code: "T17", title: "Wrong goods delivered (substitution)", scenario: "Takealot delivered something materially different from what was ordered (e.g. an iPhone listing delivered as a calculator). The return is being refused on procedural grounds (\"missing accessories\" / \"item used\"), not on the substance.",
    subject: "Non-conforming delivery, full refund required: Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. On [date] I paid R[amount] for [item ordered, e.g. iPhone 15] on Takealot. The delivered item is [item received, e.g. a Casio calculator]. The two are materially different products at materially different prices. This is not a return under Takealot's returns policy. This is restitution of the purchase price after non-performance of the sale.

The legal position:

1. The sale contract was for [item ordered], not [item received]. Delivery of [item received] is not performance of that contract. It is non-performance, and I am entitled to rescind and recover the price.
2. Under section 46(1) of the ECT Act Takealot had to execute my order, the order for [item ordered]. Delivering [item received] does not execute it.
3. I did not accept these goods as performance of my order. Delivery of different goods is not delivery of what I bought.
4. Takealot's own public statement (per its response to News24, 12 April 2026) acknowledges that "on the occasion that customers don't receive what they've ordered, we take full accountability and work swiftly to resolve them by collecting the incorrect item and delivering the right product as quickly as possible."
5. [If the item received is itself faulty: Section 55(2)(a) of the Consumer Protection Act requires goods to be reasonably suitable for the purposes for which they are generally intended, and (item received) is not.] [If Takealot has treated (item received) as the item I ordered: Section 41(3)(b)(v) of the Consumer Protection Act prohibits falsely stating or implying that goods "have been supplied in accordance with a previous representation". The product page represented the goods I would receive, and what I received does not match it.]

This is not a change-of-mind return. The ["missing accessories" / "item used"] objection does not apply: I did not buy [item received], so its accessories and condition are irrelevant.

Please confirm within 7 business days that Takealot will (a) collect [item received], and (b) refund R[amount] in full to my original payment method, OR deliver [item ordered] as originally paid for. If neither is forthcoming I will lodge with the Consumer Goods and Services Ombud and, in parallel, complain to the National Consumer Commission.

Regards,
[Name]
[Contact]
Order #[ORDER]` },
  { code: "T18", title: "Recall refund demand", scenario: "An item bought through Takealot has been recalled (manufacturer recall, NCC recall, or SAHPRA recall) and Takealot is refusing the recall refund, typically on the basis that the manufacturer warranty has expired, or by issuing a short-validity coupon as the \"refund.\"",
    subject: "Recall refund, sections 55 and 56 CPA: Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. On [date] I bought a [item] for R[amount]. The product has since been recalled by [manufacturer / NCC / SAHPRA] on [recall date], reference [recall ID if known].

Takealot's response so far has been to [refuse the refund / issue a coupon valid for (N) days / refer me to the manufacturer]. That is not consistent with the company's obligations.

The legal position:

1. The recall of [item] by [the manufacturer / the National Consumer Commission / SAHPRA] is strong evidence that the goods were not safe, good-quality goods under section 55 of the Consumer Protection Act.
2. The recall notice instructs consumers to [quote the notice, e.g. "return them to a point of purchase for a refund"]. Takealot is my point of purchase.
3. "The manufacturer's (N-month) warranty has expired" is not a defence. [If the notice provides for a refund at the point of purchase: The recall notice itself provides for that refund.] [If within 6 months of delivery: Section 56(2) independently gives me the election of a refund.] [If more than 6 months after delivery: Section 55(2)(c) requires goods to be usable and durable for a reasonable period, which goods recalled as unsafe were not.]
4. Section 61 of the Consumer Protection Act imposes strict liability for harm caused by unsafe goods on the producer, importer, distributor and retailer, jointly and severally where more than one is liable. Takealot is a retailer.
5. A refund means the price I paid. [Within 6 months of delivery: Section 56(2)(b) requires Takealot to "refund to the consumer the price paid by the consumer, for the goods".] [If Takealot issued a coupon: A coupon valid for (N) days is not that.] [If you paid with a coupon: I ask for a money-equivalent credit valid for Takealot's standard 3-year credit period.]

Please confirm within 7 business days that Takealot will collect the recalled product and refund R[amount] in money to the original payment method (or, where the original payment was a coupon, a money-equivalent credit valid for the standard 3-year credit period).

If the refund is not provided I will:
  (a) report Takealot's non-compliance with the recall to the National Consumer Commission;
  (b) lodge with the Consumer Goods and Services Ombud in parallel;
  (c) approach the manufacturer directly as well;
  (d) where the listing still represents the product as safe, lodge a misleading-advertising complaint with the Advertising Regulatory Board.

Regards,
[Name]
[Contact]
Order #[ORDER]
[Recall reference if known]` },
  { code: "T19", title: "Premium delivery fee refund", scenario: "You paid extra for same-day or next-day delivery, it arrived late (or not on the promised day), and Takealot has offered account credit (or nothing) instead of refunding the fee.",
    subject: "Refund of premium delivery fee: Order #[ORDER]",
    body: `Hi,

On [date] I paid R[amount] for [same-day / next-day] delivery of Order #[ORDER], promised for [promised date/time]. [It was delivered on (actual date/time). / It has not been delivered.]

Delivery charged for separately is a service. Section 54(1)(a) of the Consumer Protection Act gives me the right to "the timely performance and completion of those services", and section 54(2)(b) entitles me to require the supplier to "refund to the consumer a reasonable portion of the price paid for the services performed and goods supplied, having regard to the extent of the failure".

The paid premium was for speed, and speed was not delivered, so a reasonable portion of the price is the whole premium. The premium slot was a specific condition I paid for, not an estimate. Please refund the premium delivery fee of R[amount] to my original payment method within 7 business days. I do not accept account credit in place of the refund.

Regards,
[Name]
Order #[ORDER]` },
  { code: "T20", title: "Missing item: refund, not credit", scenario: "Part of your order never arrived, and Takealot has loaded account credit for the missing item (or says it will) instead of refunding you.",
    subject: "Missing item, refund to original payment method: Order #[ORDER]",
    body: `Hi,

Order #[ORDER] was delivered on [date] without [item(s)], for which I paid R[amount]. I reported this on [date], within 30 days of delivery. The parcel [arrived sealed / showed signs of tampering], and [I received it myself / it was received by (name) with my permission].

Takealot's own Help Centre article on missing items asks me to choose between account credit, a refund or a replacement ("Tell us your preference - credit, refund, or replacement"). I choose a refund to my original payment method. I do not accept account credit in its place.

Takealot has not delivered the item I paid for. Under section 46(1) of the ECT Act the order had to be executed, and where goods are unavailable section 46(3) requires the supplier to tell me immediately and refund me within 30 days of telling me. Where section 47 applies and the cause is a shortage of stock, section 47(3) of the Consumer Protection Act requires a refund with interest at the prescribed rate.

Please confirm within 7 business days that R[amount] will be refunded to my original payment method. If account credit has already been loaded, please reverse it and refund me instead.

Regards,
[Name]
Order #[ORDER]` },
  { code: "T21", title: "Closed account: pay out my credit", scenario: "Takealot suspended or closed your account while it held refund credit, and you want that balance paid to your bank account.",
    subject: "Account [closed / suspended]: pay out my credit balance ([account email])",
    body: `Hi,

My Takealot account [account email] was [suspended / closed] on [date]. At that time it held R[amount] of account credit, which came from refunds on [returned / cancelled] orders [ORDER numbers] [that I paid for with money, not vouchers or coupons].

That credit came from money I paid. Takealot's own returns policy contemplates a customer asking "for a refund" of unused credit within 3 years. Section 65(2) of the Consumer Protection Act says a supplier holding a consumer's money "must not treat that property as being the property of the supplier". Closing my account does not change who that money belongs to.

Please pay R[amount] into my bank account within 7 business days. [My bank details are attached / I will send my bank details on request.] [If the account also held gift-voucher value: Please confirm that R(amount) of gift-voucher value remains available to me for the full 3 years from issue (section 63(2)).]

Please also tell me in writing why the account was [suspended / closed].

Regards,
[Name]
[Account email]` },
  { code: "T22", title: "Ask for your own records (POPIA s 23)", scenario: "Your dispute turns on records only Takealot holds: the proof of delivery, call or chat records, notes on your return or complaint. Send this through the Data & Privacy section of Takealot's Help Centre (the contact point its privacy policy gives for questions about your personal information), copying DS.Privacy@takealot.com (the Data Compliance Team its PAIA manual names) and legal@takealot.com.",
    subject: "Request for my personal information (POPIA s 23): Order #[ORDER]",
    body: `Hi,

I make this request as a Takealot customer under section 23 of the Protection of Personal Information Act (POPIA). Takealot's privacy policy also says customers can "request a record or description" of their personal information. I am the holder of the Takealot account [account email] and attach proof of identity.

1. Please confirm, free of charge (s 23(1)(a)), whether Takealot holds personal information about me in connection with Order #[ORDER].
2. Please provide the record or a description of that information (s 23(1)(b)), including:
   (a) the proof-of-delivery record for the order (signature, photo, name of the person who received it, time and location data);
   (b) recordings or transcripts of my calls and chats with Takealot about the order;
   (c) the notes recorded on my return or complaint [reference];
   (d) the identity, or categories, of third parties (couriers, sellers) who have had access to this information.
3. If any fee applies, please give me a written estimate before doing the work (s 23(3)).
4. If any part is refused, please give the reason (your privacy policy says I "can ask for reasons why") and provide the rest (s 23(5)).

Please confirm within 5 business days that you have received this request.

Regards,
[Name]
[Account email]
Order #[ORDER]` },
  { code: "T23", title: "Order not delivered: 7 days' notice", scenario: "Your order is late and Takealot has gone quiet, or Takealot says it was delivered and you never got it. You want the order, signed proof of delivery, or your money back. Send it once 30 days have passed since you ordered, or once an agreed delivery date has passed. (Takealot's terms call its delivery dates estimates, so the 30 days is the safer trigger.)",
    subject: "Order not delivered, notice under section 46(2) of the ECT Act: Order #[ORDER]",
    body: `Hi,

I placed and paid for Order #[ORDER] on [date]. [It was due on (promised date) and has not arrived. / Takealot's tracking says it was delivered on (date), but I did not receive it, and nobody with my permission accepted it.]

Under section 46(1) of the ECT Act, a supplier must execute an order within 30 days after the day it received the order, unless the parties agreed otherwise. [The agreed delivery date was (date).]

[If Takealot says it was delivered: Please send me the signed proof of delivery for this order, showing who accepted it, when and where. A driver's GPS location shows where the driver was, not who received the parcel. Takealot's own terms treat an order as delivered when "someone accepts or collects the order at your chosen address or at a Takealot Pickup Point". Please show me who that was: nobody with my permission accepted this order at my address (and I did not collect it from a Pickup Point).]

This is my 7 days' written notice under section 46(2) of the ECT Act. If, by [date, 7 days from today], the order has not reached me [and Takealot has not sent signed proof that it was delivered to me or to someone with my permission], I will cancel the order and claim a full refund of R[amount] to my original payment method. I do not accept account credit in place of that refund.

If the goods are unavailable, section 46(3) requires Takealot to tell me immediately and refund me within 30 days of telling me.

Regards,
[Name]
Order #[ORDER]` },
];

export const QUICK_HITS: QuickHit[] = [
  { n: "01", head: "Section 56, six months, \"without penalty and at the supplier's risk and expense\"",
    body: "The actual words from CPA s 56(2). A returns policy cannot override it: s 51(3) voids any contractual term that tries.", ref: "CPA s 56(2) + s 51(3)" },
  { n: "02", head: "You pick the remedy",
    body: "Repair, replace, or refund. The consumer elects under section 56(2). Never the supplier.", ref: "CPA s 56(2)" },
  { n: "03", head: "One defective thing doesn't mean returning the whole set",
    body: "The CPA's defect test looks at the goods you were sold. If one independently replaceable part fails and the rest works as sold, only that part is defective.", ref: "CPA s 53(1)(a)" },
  { n: "04", head: "7 days for any reason, by law",
    body: "ECT Act section 44 gives you a 7-day no-fault return right on most online purchases (s 42(2) lists the exceptions). Takealot's 30-day window sits on top of that floor.", ref: "ECT Act s 44" },
  { n: "05", head: "Manufacturer warranty + CPA warranty run in parallel",
    body: "Takealot can't punt you to the manufacturer to escape section 56. Their liability is separate and concurrent.", ref: "CPA s 56(1)" },
  { n: "06", head: "CGSO is compulsory for Takealot, free for you",
    body: "The Consumer Goods and Services Ombud is the industry's mandatory Ombud scheme under the Code gazetted under CPA s 82. Takealot is required to engage. It's not a goodwill gesture. 15 business days to respond; the Ombud aims to resolve it within 60 days of starting its investigation (60 business days from receipt under the Code in force until 30 November 2026). Filing costs nothing.", ref: "cgso.org.za" },
  { n: "07", head: "Credit card chargeback", featured: true,
    body: "If you paid by card, your bank can reverse the transaction if Takealot doesn't deliver, doesn't refund, or ships defective goods. Most South African consumers don't know this exists.", ref: "Card dispute rules (PASA, Visa)" },
];

export const LAW_SECTIONS: LawGroup[] = [
  { group: "CPA", items: [
    { id: "s 16", title: "Right to cooling-off (direct marketing)", blurb: "5-business-day cooling-off for goods sold via direct marketing. Does not govern online retail: ECT s 44 does that." },
    { id: "s 17", title: "Right to cancel advance reservation", blurb: "Cancellation right for advance reservations, subject to a reasonable cancellation charge." },
    { id: "s 19", title: "Delivery, inspection, risk", blurb: "Right to inspect on delivery. Goods at supplier's risk until accepted. Does not apply where ECT s 46 governs performance (s 19(1)(b)), i.e. most online orders, though the NCC and CGSO's 2026 joint paper still reads s 20 with s 19 as giving online buyers an inspection right." },
    { id: "s 20", title: "Return of unsatisfactory goods", blurb: "Narrow: direct-marketing cooling-off, no opportunity to examine, mixed-goods delivery, specifically-communicated purpose. Not a general change-of-mind right." },
    { id: "s 22", title: "Plain language", blurb: "Notices and documents must be in plain language. (The 'read it in the consumer's favour' rule for ambiguous terms is s 4(4)(a).)" },
    { id: "s 23", title: "Displayed price", blurb: "Displayed price binds. In a shop. Does not apply where ECT s 43 applies (s 23(1)(b)), so not to takealot.com orders. s 23(9) \"inadvertent and obvious\" error exception is narrow." },
    { id: "s 25", title: "Reconditioned / refurbished goods", blurb: "Conspicuous notice required: buyers must know they're not getting new." },
    { id: "s 26", title: "Sales records", blurb: "Written sales records. Does not apply where ECT s 43 applies (s 26(1)(a)), so for online orders the record duty is ECT s 43(1)(m) instead." },
    { id: "s 27", title: "Disclosure by intermediaries", blurb: "An intermediary must disclose the prescribed information to the people it sells to on a third party's behalf, and keep the prescribed records of those relationships and transactions (s 27(1)). The CGSO's published interpretation is that an e-commerce platform hosting third-party sellers is an intermediary for CPA purposes." },
    { id: "s 29", title: "General standards for marketing", blurb: "No marketing that is misleading about the goods, the conditions of supply, or the price, including its \"relationship of the price to, any previous price or competitor's price\" (s 29(b)(iii)). The inflated \"was\" price (Clause 23)." },
    { id: "s 30", title: "Bait marketing", blurb: "No advertising goods at a price in a way that misleads about their actual availability at that price. A stated limit must be honoured up to the limit (Clause 23)." },
    { id: "s 40", title: "Unconscionable conduct", blurb: "Prohibited: covers physical force, coercion, undue influence, unfair tactics." },
    { id: "s 41", title: "False, misleading, deceptive representations", blurb: "An advertised warranty that turns out not to exist, or not to cover goods sold through Takealot, is arguably a retailer misrepresentation; a manufacturer refusing one valid claim is not, by itself. Remedies: a court must give practical effect to your right to redress (s 4(2)(b)(ii)); where the Act gives no other sufficient remedy it can order compensation for losses relating to the transaction (s 52(3)); s 115 governs a civil damages claim." },
    { id: "s 47", title: "Over-selling and over-booking", blurb: "s 47(3): refund with interest plus compensation for directly incidental costs. Only the compensation falls away, if the shortage was beyond the supplier's control and it took reasonable steps to inform the consumer as soon as practicable (s 47(5)). Separate s 112 administrative fine (paid to the State) may apply to the supplier." },
    { id: "s 48", title: "Unfair, unreasonable, unjust contract terms", blurb: "Substantive review. A term is unfair if it is \"excessively one-sided in favour of any person other than the consumer\" (s 48(2)(a)) or \"so adverse to the consumer as to be inequitable\" (s 48(2)(b)). Regulation 44 lists presumptively unfair terms." },
    { id: "s 49", title: "Notice for onerous terms", blurb: "Risky, restrictive, limiting terms must be separately brought to the consumer's attention." },
    { id: "s 51", title: "Prohibited terms", blurb: "Terms that waive rights conferred by the Act are void under s 51(3)." },
    { id: "s 52", title: "Court powers", blurb: "Courts may declare a term unconscionable, unreasonable, or unjust." },
    { id: "s 53", title: "Definitions: \"defect\", \"failure\"", blurb: "Defect means a material imperfection, or a characteristic, that makes goods less acceptable, useful or safe than people are reasonably entitled to expect." },
    { id: "s 55", title: "Right to safe, good-quality goods", blurb: "Reasonably suitable, good quality, durable, free of defects, compliant with formal standards. s 55(6): disapplies (a)(b) where specific condition expressly disclosed and accepted." },
    { id: "s 56", title: "Implied warranty of quality", blurb: "The big one. 6 months. Three-tier warranty (producer/distributor/retailer). Consumer elects repair/replace/refund. Cannot be contracted out of." },
    { id: "s 57", title: "Warranty on repairs and parts", blurb: "Minimum 3-month warranty on any new/reconditioned part fitted during repair, plus the labour." },
    { id: "s 58", title: "Warning concerning fact and nature of risks", blurb: "Suppliers of risky activities or facilities must point out unusual or serious risks (s 58(1)); whoever packages hazardous or unsafe goods must put safe-handling instructions on or in the packaging (s 58(2))." },
    { id: "s 60", title: "Safety monitoring and recall", blurb: "s 60(2): if the NCC has reasonable grounds to believe goods may be unsafe and the producer or importer hasn't acted, it can by written notice require the producer to investigate or carry out a recall programme on the NCC's terms. Many recalls are instead notified by the supplier and published by the NCC. The recall notice is the consumer's refund route; within 6 months of delivery s 56 adds the return-and-refund election. \"Warranty expired\" answers neither." },
    { id: "s 61", title: "Product liability", blurb: "Strict liability for harm caused by unsafe goods. Joint and several across the supply chain." },
    { id: "s 65", title: "Consumer's property held by a supplier", blurb: "A supplier holding a consumer's money or property must not treat it as its own, must look after it with reasonable care, and is liable for any loss (s 65(2)). The site applies it to returns Takealot holds and to credit on a closed account; that application is our own reading." },
    { id: "s 69", title: "Enforcement routes", blurb: "Tribunal / ombud / CGSO / provincial consumer court / ADR agent / NCC / court. The SCA in Motus v Wentzel [2021] ZASCA 40 gave obiter guidance (paras 26–27) that s 69(d) \"should not lightly be read as excluding the right of consumers to approach the court\", and that it refers to remedies \"available in terms of national legislation\". The court expressly declined to decide the scope of s 69(d). The Western Cape High Court has since held that consumers need not go through the s 69 bodies first (Pure Silk v Martin [2025] ZAWCHC 568); other divisions differ." },
    { id: "s 2(10)", title: "Saving of common-law rights", blurb: "No provision of the Act may be interpreted to preclude common-law rights: preserves the aedilitian remedies." },
  ]},
  { group: "ECT Act", items: [
    { id: "s 42", title: "Exclusions from cooling-off", blurb: "Disapplies s 44 cooling-off only. Does not touch s 43, s 46, or the CPA." },
    { id: "s 43", title: "Information disclosure", blurb: "Online sellers must disclose identity, terms, payment, returns, warranty info. s 43(3): 14-day cancellation if breached." },
    { id: "s 44", title: "7-day cooling-off", blurb: "Most online sales (s 42(2) lists the exceptions), any reason, within 7 days of receiving the goods. Consumer pays only direct cost of return. Full refund within 30 days of cancellation." },
    { id: "s 46", title: "Performance obligations", blurb: "30-day delivery deadline unless another period was agreed. Consumer may cancel on 7 days' notice if missed. Refund within 30 days of notification of unavailability." },
  ]},
  { group: "POPIA", items: [
    { id: "s 10", title: "Minimality (Condition 2)", blurb: "Processing must be adequate, relevant and not excessive for the purpose. Live credentials exceed what's needed for a technical assessment." },
    { id: "s 19", title: "Security safeguards (Condition 7)", blurb: "Appropriate, reasonable technical and organisational measures required. Live credential handover is itself a security risk." },
    { id: "s 22", title: "Security compromises", blurb: "If someone unauthorised has got into your personal information, the company must tell the Information Regulator, and tell you in writing, with enough detail for you to protect yourself." },
    { id: "s 23", title: "Access to your own information", blurb: "Ask a company to confirm, free of charge, whether it holds personal information about you, and for the record or a description of it, including who it was shared with. Template T22." },
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
    { id: "window", title: "Window", blurb: "Typically 120 days after the statement date for cardholder disputes; other chargebacks can have different time limits, so check with your bank. Card-only. EFT, RTC, PayShap are irrevocable." },
    { id: "how", title: "How", blurb: "Contact your bank's disputes team in writing. Attach order, correspondence, evidence. It may be able to run alongside a CGSO complaint: check with both." },
    { id: "nfo", title: "If the bank gets it wrong", blurb: "National Financial Ombud Scheme (NFO): one-stop scheme for banking, credit, long- and short-term insurance complaints. 0860 800 900 · nfosa.co.za. OBSSA, Credit Ombud, OLTI and OSTI amalgamated into NFO on 1 March 2024; FAIS Ombud remains separate." },
  ]},
];

export const ESCALATION: EscalationTier[] = [
  { tier: 1, title: "Takealot customer support", window: "24–72h",
    body: "Log the return on your account. For anything else, open the matching Help Centre topic and press 'Contact Us' at the bottom (the 'Get in Touch' form). Takealot says \"The best way to reach us is through our Help Centre.\" Keep everything in writing and save the reference.", contact: "takealot.com/help-centre (Contact Us form) · 087 362 8000" },
  { tier: 2, title: "Formal written notice", window: "7 biz days",
    body: "Cite the specific CPA / ECT section. State your elected remedy explicitly. Reference Order # in subject.", contact: "legal@takealot.com · 12th Floor, 10 Rua Vasco Da Gama Plain, Foreshore, Cape Town, 8001" },
  { tier: 3, title: "CGSO", window: "15 biz days / ~60 days",
    body: "Free, online. Under the Consumer Goods and Services Industry Code of Conduct, gazetted under CPA s 82, CGSO participation is mandatory for qualifying suppliers, including Takealot. The Gauteng High Court confirmed that participation is compulsory in CGSO NPC v Voltex [2021] ZAGPPHC 309. A new Code (GG 55719) replaces the 2015 Code from 1 December 2026 and restates it in clause 4.2. Supplier response in 15 business days; CGSO target resolution 60 business days under the 2015 Code, 60 days from the start of its investigation from 1 December 2026.",
    contact: "cgso.org.za · 0860 000 272 · WhatsApp +27 (0)81 335 3005 · info@cgso.org.za" },
  { tier: 4, title: "Credit card chargeback", window: "~120 days",
    body: "File with your bank's disputes team. It may be able to run alongside a CGSO complaint: check with both. Card only: EFT/RTC/PayShap not covered.",
    contact: "Your card issuer's disputes team" },
  { tier: 5, title: "National Consumer Commission (NCC)", window: "Variable",
    body: "Broader CPA enforcement. The NCC can refer an individual dispute to the CGSO (CPA s 72(1)(b)), but not if you and Takealot have already tried alternative dispute resolution without success. NCC is best for patterns or systemic issues. The NCC can issue a compliance notice, and ignoring one has a cost: in November 2026 the NCC reported a R200,000 Tribunal fine on a solar supplier that ignored a notice to propose a remedy for a battery that failed within six months (the Tribunal ruled only on the ignored notice, not on the battery).",
    contact: "thencc.org.za · 012 065 1940 · enquiries@thencc.org.za · eservice.thencc.org.za" },
  { tier: 6, title: "Information Regulator", window: "Variable",
    body: "POPIA issues: credential demand, unlawful data retention, excessive information requests.",
    contact: "eservices.inforegulator.org.za (complaints portal) · POPIAComplaints@inforegulator.org.za · 0800 017 160 (toll free) · 010 023 5200 · enquiries@inforegulator.org.za" },
  { tier: 7, title: "Advertising Regulatory Board (ARB)", window: "~30 days",
    body: "Misleading advertising complaints (e.g. misrepresented warranty on a product page). Succeeded the ASA in 2018. Rulings bind ARB members; non-members can still be the subject of a ruling.",
    contact: "arb.org.za · info@arb.org.za · 011 593 3104" },
  { tier: 8, title: "Small Claims Court", window: "~60 days",
    body: "Up to R30,000 since 1 August 2026 (Government Gazette 55038; check justice.gov.za/scc for the current figure). No attorneys. No court fee to issue the summons. You can serve the summons yourself; if the sheriff serves it, the tariff is R79 plus R7.50 a km travel (since 28 November 2025). Ask for the itemised return.",
    contact: "justice.gov.za/scc/scc.htm" },
  { tier: 9, title: "Magistrates' Court", window: "~6 months",
    body: "District Magistrates' Court up to R200,000. Regional Magistrates' Court R200,000 to R400,000. Attorney recommended; Legal Aid for qualifying cases.",
    contact: "Your local magistrates' court" },
  { tier: 10, title: "High Court", window: "12 months+",
    body: "Above R400,000, with concurrent jurisdiction above R200,000. Last resort for consumer disputes.",
    contact: "Attorney required" },
];

export const FAQ: FaqItem[] = [
  { q: "Is using the name \"Takealot\" in the domain legal?",
    a: "We believe so. Section 16 of the Constitution protects expressive commentary, and the UDRP treats a legitimate noncommercial or fair use of a domain name as a legitimate interest (para 4(c)(iii)). In Laugh It Off v SAB [2005] ZACC 7 the Constitutional Court held that a trade mark owner using the Trade Marks Act's anti-dilution provision (s 34(1)(c)) against expressive use must prove a likelihood of substantial economic detriment to the mark (mere offence isn't enough), and the mark owner's claim is weighed against freedom of expression." },
  { q: "Are you affiliated with Takealot?",
    a: "No. Their site is takealot.com. We are completely independent and have no relationship with Takealot or Naspers." },
  { q: "Do you make money from this site?",
    a: "No. Non-commercial, permanently. No ads, no affiliate links, no donations, no subscriptions." },
  { q: "Is this legal advice?",
    a: "No. Consumer education based on published legislation, reported case law, and Takealot's own public policies. For advice on your specific situation, consult a qualified South African attorney. To have a dispute with Takealot resolved for free, complain to the Consumer Goods and Services Ombud." },
  { q: "Why do your templates mention case names and NCT references?",
    a: "Because case law, not just statute, shapes how the CPA is applied. Citing the CGSO's 2021 advisory notes (now under CGSO review, still on SAFLII), or flagging decisions like Wingfield Motors v NCT (Western Cape High Court) or the Tribunal's Gareeb v Incredible Connections, shows Takealot's team you've done the reading. We only name a case where it materially supports the statutory argument; if the statute does the work on its own, we leave the case law out." },
  { q: "Is there a deadline for complaining?",
    a: "Yes. Don't sit on it. A complaint to the National Consumer Tribunal or a consumer court can't be brought more than three years after the conduct that caused it (CPA s 116(1)). A May 2026 appeal concerned an engine replacement the customer said was faulty (a service under CPA s 54; the merits are still undecided). The Gauteng High Court in Johannesburg held that the clock ran from the supplier's refusal to put it right, not from the work itself, and reasoned that the same applies to a refusal to repair, replace or refund defective goods under s 56(2) (NCC v NCT, the Car Care Clinic case). But in Ntoatsabone v Hisense [2026] ZANCT 21 (a complaint about a TV bought in 2021) the Tribunal counted from the purchase and turned the complaint away as too late. So get every refusal in writing, keep it, and escalate well inside three years of buying. Claims in the ordinary courts fall under the Prescription Act, which generally also allows three years." },
  { q: "Black Friday at Takealot: the deal sold out, my paid order was cancelled, or the discount looks fake. What now?",
    a: "It depends on what happened. (1) The deal sold out, or the price changed, before you paid. Takealot's terms say an item in your cart or wish list isn't reserved and isn't guaranteed at the same price later, that a deal \"may expire sooner\" if its allocated stock runs out, and that \"your order is only complete once you have paid and received an order confirmation.\" Before that point there is usually nothing to enforce. If a deal was advertised in a way that misled people about whether it was really available at that price, that can be bait marketing under CPA s 30: report it to the National Consumer Commission (NCC).\n\n(2) You paid, got a confirmation, and the order was cancelled, perhaps with the same item back on sale for more. A confirmed, paid order is a contract at the confirmed price. Takealot's terms let it cancel \"for any reason\", including pricing errors, but a term letting only one side cancel at will is presumed unfair (CPA s 48 read with Regulation 44(3)(k)). So ask in writing for the order to be honoured, unless the price was so far below the usual price that you ought to have realised it was a mistake (Clause 14, template T10). If the reason given was \"out of stock\" but the item is listed again, ask Takealot to explain, and screenshot the new listing with its seller name and price. A different seller relisting it can be genuine (Clause 23). If you had to buy the item elsewhere for more, claim the difference.\n\n(3) The money came back as account credit. Takealot's Help Centre says a paid order cancelled for stock is credited to your account, but its own terms say \"we will refund you the amount paid\". You can insist on a refund to the way you paid (Clause 06).\n\n(4) The \"was\" price looks inflated. CPA s 29(b)(iii) bars marketing that misleads about \"the existence of, or relationship of the price to, any previous price\", and under s 41(3)(f) falsely stating or implying that \"a specific price advantage exists\" is a misleading representation. Before Black Friday 2024 the NCC reminded suppliers of this and told shoppers that \"knowing the original prices of items they intend buying during this period will help to determine if an item is indeed discounted or not.\" Screenshot the listing, then complain to the NCC, or to the Advertising Regulatory Board about the advert.\n\n(5) You regret it, or the price drops after you buy. ECT s 44 lets you cancel most online purchases within 7 days of receiving them, without giving a reason; the only charge allowed is the direct cost of returning the goods. Takealot's own change-of-mind window is 30 days for most unused items. We know of no rule that makes Takealot refund a later price drop, but you can return the item inside those windows and buy it again at the new price." },
  { q: "I paid with buy-now-pay-later, a credit option or eBucks. Do I have the same rights?",
    a: "On the goods, yes. Paying on credit doesn't take your purchase outside the Consumer Protection Act. The CPA leaves the credit agreement itself to the National Credit Act, but says \"the goods or services that are the subject of the credit agreement are not excluded\" (CPA s 5(2)(d)), and the Supreme Court of Appeal applied exactly that in Van Niekerk v FirstRand [2025] ZASCA 187. Loyalty points count too: the CPA's definition of \"consideration\" includes \"loyalty credit or award\" (s 1). So the six-month defect warranty, the 7-day online cooling-off and the rest of this site apply as usual. ECT s 44(1) lets you cancel within the cooling-off period \"any transaction and any related credit agreement\". Refunds go back the way you paid: Takealot's Help Centre gives \"Up to 24 hours\" for refunds to buy-now-pay-later (it names PayJustNow and Payflex) and to eBucks or Discovery Miles. If a refund doesn't show on your plan, tell the provider in writing that the order was cancelled or returned, and attach Takealot's confirmation. Two cautions. The National Credit Act's own 5-business-day cooling-off (s 121) applies only to a lease or an instalment agreement entered into somewhere other than the credit provider's registered business premises, so don't assume it covers your plan. And a dispute about the plan itself (fees, interest, collections) is with the provider, not Takealot; if it isn't resolved and the provider is a credit provider, the National Financial Ombud handles credit complaints (it took over from the Credit Ombud in 2024)." },
  { q: "I cancelled before delivery. Can Takealot keep the delivery fee?",
    a: "Takealot's Help Centre says that if you cancel an order that is already being fulfilled, \"Delivery fees and TakealotMORE benefits will not be reimbursed\". For most online purchases, ECT s 44 lets you cancel \"without reason and without penalty\" within 7 days after you receive the goods, says \"the only charge that may be levied on the consumer is the direct cost of returning the goods\", and gives you \"a full refund\" of what you paid. What follows is our own reading of s 44, not a ruling: the delivery fee is part of what you paid, so keeping it is a charge s 44 doesn't allow. No court, Tribunal or Ombud has decided that point that we know of. Section 44 also counts its 7 days from when you receive the goods, so it fits most cleanly once the order has arrived. Start with the route Takealot's own Help Centre gives for an order already out for delivery (accept it, keep the packaging unopened, log a return), do that within 7 days, and ask in writing for a full refund, delivery fee included, under ECT s 44(3). Takealot's returns policy says \"Our returns are free!\", so there should be no return cost to deduct." },
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
  { n: 1, title: "CPA s 56: the 6-month baseline",
    body: "The s 56(2) right to return defective goods and choose repair, replacement or refund applies against every retailer for 6 months from delivery, irrespective of any policy or stated warranty. Even if Takealot's product page says \"30-day warranty,\" they remain liable under s 56 for 6 months." },
  { n: 2, title: "CPA s 55(2)(c): reasonable durability",
    body: "Goods must be usable and durable for a reasonable period having regard to use and all surrounding circumstances. An advertised 2-year manufacturer warranty becomes part of those circumstances: a failure inside that window is strong evidence the goods fell short of s 55(2)(c)." },
  { n: 3, title: "CPA s 41: misleading representations",
    body: "If Takealot's product page advertised a \"2-year manufacturer warranty\" that doesn't exist, or that the manufacturer won't honour for goods bought through Takealot (a grey import, say), that is arguably a misleading representation you relied on. A manufacturer that wrongly refuses one claim under a warranty that does exist is in breach of its own warranty; that alone doesn't make Takealot's statement false. Remedies: a court must make orders that give practical effect to your right to redress (s 4(2)(b)(ii)); where the Act gives no other sufficient remedy for a s 41 breach it can order Takealot to compensate you for losses relating to the transaction (s 52(3)); s 115 governs a civil damages claim." },
  { n: 4, title: "CPA s 56(1): three-tier warranty",
    body: "Producer/importer, distributor, AND retailer each warrant compliance with s 55. Manufacturer's refusal doesn't take the retailer off the hook." },
  { n: 5, title: "Direct manufacturer warranty",
    body: "Warranty cards and product registrations create a direct contract between you and the manufacturer, separate from your sale contract with Takealot." },
  { n: 6, title: "Common law breach of contract",
    body: "If the manufacturer warranty was part of what induced the sale (advertised, represented, brand-implied), it may be an express or implied term of your sale contract with Takealot too." },
  { n: 7, title: "ECT Act s 43: information disclosure",
    body: "Before you pay, an online seller must show the terms of sale, \"including any guarantees\", and a sufficient description of the goods (s 43(1)(h), (k)). If it didn't, you can cancel within 14 days of receiving the goods (s 43(3)). Misrepresentation itself is a CPA s 41 claim." },
  { n: 8, title: "ARB complaint",
    body: "Creates a public record: the ARB publishes its rulings. Succeeded the ASA in 2018." },
];

export const PLAYBOOK: PlaybookItem[] = [
  { letter: "A", when: "Manufacturer honours in month 18", play: "Easy: pursue manufacturer warranty." },
  { letter: "B", when: "Manufacturer refuses in month 18", play: "Takealot under s 55(2)(c) (+ s 41 if the advertised warranty wasn't as described) · ARB complaint · CGSO · Small Claims Court." },
  { letter: "C", when: "Failure in month 3", play: "Pure s 56. Takealot liable regardless of manufacturer." },
  { letter: "D", when: "Failure in month 7", play: "Manufacturer direct · Takealot under s 55(2)(c) (+ s 41 if the advertised warranty wasn't as described) · CGSO." },
];

export const POLICY_SUMMARY: PolicySummary = {
  returns: [
    "30 days for wrong / damaged on delivery / missing / change-of-mind",
    "6 months for defective goods",
    "Original packaging, accessories, intact seals required",
    "Consumer elects replacement / credit / refund (plus repair on defective returns); credit defaults if no replacement stock",
    "Change of mind: unused, original packaging",
    "Defective: inspection required; exclusions for wear, surge, misuse, sea-air, modification",
    "Extended warranty via supplier (21-day refund trigger); a manufacturer's own warranty is claimed from the manufacturer",
    "Pre-packed bundles returnable whole only; Bundle Deals (assembled) returnable in parts",
    "Digital items returnable only if defective",
    "Data devices: unlock codes required; return may be refused if withheld",
    "Wrongly-returned items disposed; no compensation",
    "Rejected returns may be disposed of after 30 days if not accepted back",
    "Takealot collects OR pickup-point drop-off within 7 days (large items & alcohol: collection only)",
    "Non-returnable (change-of-mind): intimate, underwear, swimwear, jewellery, foodstuffs, digital items, unsealed AV/software, books, personalised, made-to-specification",
    "Exchanges: size/colour on clothing, sportswear, shoes",
    "Credit loaded to Takealot account is lost if not used, or a refund asked for, within 3 years; gift vouchers separately valid 3 years from issue",
    "Collection and re-delivery fees may apply if you re-log a return that failed the packaging/condition check",
    "Donations made with a purchase deducted from refunds or credit",
  ],
  terms: [
    "Account & shopping: 18+, contracting capacity required",
    "Sellers are responsible for the items they sell on Takealot's platform",
    "Takealot may cancel for any reason (e.g. stock / payment / listing error / account-abuse / criminal investigation)",
    "Resale prohibition",
    "Dispute resolution: SA law, High Court (Western Cape Division, Cape Town) named as forum",
    "Legal notices to legal@takealot.com",
    "CGSO named as escalation point",
    "Takealot may change any provision at any time without notice",
    "Takealot may suspend or terminate an account at any time, for any reason",
    "Customer carries the risk of unauthorised and fraudulent account activity",
  ],
};
