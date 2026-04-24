# TakealotBack — Site Audit & Claude Code Instruction Set

**Audit date:** 2026-04-24
**Repo audited:** `/Users/jacobusvaneeden/Developer/TakeALotBack` (commit: `main` HEAD on 2026-04-24)
**Files read end-to-end:**

- `src/data/content.ts` (single source of truth for CLAUSES, TEMPLATES, QUICK_HITS, LAW_SECTIONS, ESCALATION, FAQ, WARRANTY_ANGLES, PLAYBOOK, POLICY_SUMMARY, LAST_REVIEWED)
- `src/content/pages/onus-of-proof.md`
- `src/content/pages/aedilitian-remedies.md`
- `src/content/pages/limits.md`
- `src/components/Hero.astro` (hard-coded metadata counts)
- `src/components/AboutSection.astro` (legal-grounding block)
- `src/components/Footer.astro` (disclaimer: Naspers / Prosus)
- `src/components/PoliciesSection.astro` (registered entity block)
- `src/pages/index.astro`, `src/layouts/Layout.astro` (description strings)

This is an instruction set for Claude Code. Every fix below points to an exact file, an exact location, and either provides a `str_replace`-ready old/new pair or a drop-in TypeScript object. Apply them in order. Don't skip the verification section at the end.

---

## Executive summary

### Critical legal accuracy (must fix before republish)

1. **Remove the Bandera v Kia citation.** `CLAUSES[4].angles[2]` in `content.ts`, paragraph 5 of `TEMPLATES[4].body`, and the FAQ entry that names the case. The "mudflap" line is obiter in a leave-refusal ruling against a juristic-person applicant whose s56 window had already expired. The statutory argument — s53(1)(a) + s56 applied to "the goods in issue" — carries the point without it.
2. **Reframe Motus v Wentzel as obiter.** `CLAUSES[12].angles[1]` and `LAW_SECTIONS[0].items[19]`. The SCA recorded that counsel abandoned the s69(d) argument, so the "permissive, not hierarchical" reading is obiter. The obiter has been followed since, but the quote-unquote *holding* did not happen.
3. **Recast CGSO as a compulsory scheme.** `QUICK_HITS[5]`; `CLAUSES[12].angles[2]`; `ESCALATION[2]`; the Footer disclaimer doesn't need a change, but the site elsewhere implies CGSO is a goodwill engagement. It isn't — participation is mandatory under the Consumer Goods and Services Industry Code of Conduct gazetted under CPA s82, upheld by the Gauteng High Court in *CGSO NPC v Voltex* [2021] ZAGPPHC 309 (26 March 2021). Non-compliance is a contravention of CPA s82(8).
4. **Add Clause 19 — restocking / re-delivery fees on defective returns.** Takealot's Returns Policy reserves a collection fee and a re-delivery fee on any re-logged return that fails the packaging/completeness check. On a defective return this is vulnerable under CPA s56(2) (at the supplier's risk and expense), s48, s51(3), and Regulation 44. Add as a new 19th entry in `CLAUSES`, add a new Template `T15` to `TEMPLATES`, and bump the hero metadata.

### Important accuracy

5. **POPIA Information Regulator route.** The `POPIAComplaints@inforegulator.org.za` email still reaches the Regulator but is no longer the advertised channel. The Regulator moved to the eServices Portal (`eservices.inforegulator.org.za`) as primary in 2024; since 7 April 2025 security-compromise reporting through the portal is mandatory. Update three places: `CLAUSES[3].angles[5]`, `ESCALATION[5]`, and `LAW_SECTIONS[2].items[2]`.
6. **Naspers / Prosus.** `Footer.astro` and `PoliciesSection.astro` both say "Naspers / Prosus". Takealot's direct parent is Naspers (through the South African businesses cluster); Prosus is no longer the holding entity in the chain. Drop "/ Prosus" and confirm the ownership percentage separately before republish.
7. **"3-year credit expiry" tightened.** `CLAUSES[5]` and `POLICY_SUMMARY.returns[15]`. Takealot's current policy applies the 3-year clock to **refund credit loaded to the account** (not only to gift vouchers) — and specifically says *"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit."* The existing copy is factually right but leans on an "unfair-term" angle that's weaker than the statutory one. Tighten the angles.
8. **"Handover" → "return".** `CLAUSES[3].why`: *"Factory-reset before handover."* Swap to *"Factory-reset before return."* for plain-English consistency.
9. **FAQ: stop namechecking Bandera.** `FAQ[4].a`. If we're removing the Bandera citation, the FAQ can no longer use it as an illustrative example.

### Consistency / polish

10. **Bump metadata counts.** Hero hard-codes *18 dismantled* and *14 ready-to-send*. Both become 19 and 15 after Clause 19 and Template T15 land. Four touchpoints: `Hero.astro` (two `<dd>` lines and one giant-hero paragraph), `index.astro` description string (passed into `Layout`), `Layout.astro` default description lives in JSON-LD `description` for the CollectionPage (built from description passed through, safe), and the `llms-full.txt.ts` RSS feed if it echoes these numbers — check.
11. **`LAST_REVIEWED`.** Change `"2026.04.18"` → `"2026.04.24"` in `content.ts`. This value is the single source of truth — it also drives `dateModified` in the CollectionPage JSON-LD.
12. **`TAKEALOT_POLICY_REVIEWED_AGAINST`.** Keep as `"v2026.03"` unless you re-verify against Takealot's current policy version on the day you publish.

### Low priority / flag only

13. **Vonk v Willow Crest Motors citation.** `aedilitian-remedies.md` cites `[2019] ZANCT 63`. SAFLII actually holds both `[2019] ZANCT 63` and `[2019] ZANCT 68` for the same judgment (same case number, same 6 April 2019 date — a SAFLII duplication). `[2019] ZANCT 68` is the version most commonly cited in secondary commentary and carries the fuller reasons. Either works; no change forced.
14. **Small Claims Court threshold.** `ESCALATION[7].body` says *"R20,000 (check justice.gov.za/scc for the current figure — consultations on R50,000 were underway in late 2025)."* Current operative threshold remains R20,000. The existing caveat is good. Verify on `justice.gov.za/scc/scc.htm` on the day you publish.
15. **NFO amalgamation scope.** `LAW_SECTIONS[4].items[3]`: *"OBSSA amalgamated into NFO on 1 March 2024."* Accurate but incomplete — four schemes amalgamated (OBSSA, Credit Ombud, OLTI, OSTI). FAIS Ombud stayed separate. Optional polish only.

Everything else (ARB succession October 2018, CPA section numbers, ECT s42/s43/s44/s46, POPIA s10 and s19, Regulation 44 references, Takealot registration number, legal@ address, CGSO contact stack, NCC contact stack, SCC/MC/HC monetary jurisdiction, s55(6) scope, s5(2) juristic-person R2m threshold, Prescription Act 3-year ordinary prescription, Phame v Paizes three-part latent-defect test, Holmdene Brickworks consequential-damages position, CGSO Advisory Note 11 voetstoots ruling) was cross-checked and is accurate.

---

## File-by-file fixes

Every search string below is drawn from the current source. Where an edit involves an object inside an array in `content.ts`, the path is expressed as `CLAUSES[index].angles[index]` etc. for clarity — Claude Code should locate by search string, not by counting array positions.

### FIX 1 — Remove Bandera v Kia citation (3 touchpoints)

#### 1a. `src/data/content.ts` — `CLAUSES[4].angles[2]`

**Find** (the whole angle object, single line in source):
```ts
      { stat: "Bandera v Kia", body: "Bandera Trading v Kia Motors (NCT/17829/2014) — the Tribunal applied the material-imperfection test to a multi-component product. Persuasive reasoning, not binding, but useful." },
```

**Replace with:**
```ts
      { stat: "s53(1)(a) applies to the goods in issue", body: "The CPA defines a defect as a material imperfection in \"the goods\" — which, in a bundled sale, is the bundle you were sold. If one component's failure means the bundle no longer does what the bundle was sold to do, the s56 remedy runs against the supply. If the failed component is independently replaceable and the rest of the bundle works as sold, only the failed component is \"defective goods\" under s56. The question is functional, not semantic." },
```

Rationale: the `stat` pill gets shorter and statutory; the `body` keeps the logic we were trying to extract from Bandera, but anchored to the statute itself.

#### 1b. `src/data/content.ts` — `TEMPLATES[4].body` (Template T05, paragraph 5)

**Find** (paragraph 5 of the numbered list, exact line from source):
```
5. Supporting Tribunal reasoning: in Bandera Trading and Projects CC v Kia Motors South Africa (Pty) Ltd t/a The Glen (NCT/17829/2014/75(1)(b)) [2017] ZANCT 50, the National Consumer Tribunal applied the same material-imperfection approach to a multi-component product.
```

**Replace with:**
```
5. The CPA assesses "the goods in issue" as they were sold to me. A bundle sold as one purchase is assessed as one purchase, but a defect in one independently-replaceable component does not convert working components into defective goods. The s56 remedy runs against the failed component; the rest of the bundle is not "defective goods" under s56 and is not part of what I have elected to return.
```

Rationale: the existing paragraph 5 is the only one that cites a case. Everything else in T05 is already statute-based and does the heavy lifting.

#### 1c. `src/data/content.ts` — `FAQ[4].a`

**Find** (single line):
```ts
  { q: "Why do your templates mention case names and NCT references?",
    a: "Because case law, not just statute, shapes how the CPA is applied. Naming Bandera v Kia Motors, citing CGSO advisory notes, or flagging SCA decisions like Motus v Wentzel shows Takealot's team you've done the reading." },
```

**Replace with:**
```ts
  { q: "Why do your templates mention case names and NCT references?",
    a: "Because case law, not just statute, shapes how the CPA is applied. Citing CGSO advisory notes, or flagging SCA decisions like Motus v Wentzel, shows Takealot's team you've done the reading — not just parroted the Act. We only name a case where it materially supports the statutory argument; if the statute does the work on its own, we leave the case law out." },
```

#### 1d. Deep-dive page check

Confirmed: `onus-of-proof.md` does **not** cite Bandera by name. No change needed there.

---

### FIX 2 — Reframe Motus v Wentzel as obiter (2 touchpoints)

#### 2a. `src/data/content.ts` — `CLAUSES[12].angles[1]`

**Find:**
```ts
      { stat: "Motus v Wentzel", body: "Motus Corporation v Wentzel [2021] ZASCA 40 — s69(d) is permissive. Consumers may approach a court directly; s69 is not a compulsory hierarchy. A forum-selection clause cannot force you past a lower court." },
```

**Replace with:**
```ts
      { stat: "Motus v Wentzel", body: "The SCA in Motus Corporation v Wentzel [2021] ZASCA 40 read s69 as permissive, not hierarchical (para 27). Counsel abandoned the point in argument so the reasoning is technically obiter, but High Court divisions have since applied it — see Steynberg v Tammy Taylor Nails Franchising No 45 (GP, 21 June 2022) and Takealot Online (RF) (Pty) Ltd v Driveconsortium Hatfield [2021] ZAWCHC 280. A forum-selection clause that tries to push you past a cheaper lower court is attacked under s48 read with Regulation 44 and s51(3) — not Motus directly." },
```

#### 2b. `src/data/content.ts` — `LAW_SECTIONS[0].items[19]` (s69 entry)

**Find:**
```ts
    { id: "s69", title: "Enforcement routes", blurb: "Tribunal / ombud / CGSO / provincial consumer court / ADR agent / NCC / court. Motus v Wentzel [2021] ZASCA 40 — s69(d) is permissive, not a compulsory hierarchy." },
```

**Replace with:**
```ts
    { id: "s69", title: "Enforcement routes", blurb: "Tribunal / ombud / CGSO / provincial consumer court / ADR agent / NCC / court. The SCA in Motus v Wentzel [2021] ZASCA 40 read s69(d) as permissive rather than a compulsory hierarchy (obiter, counsel abandoned the point). High Court divisions have since followed that reading — Steynberg (GP, 2022), Driveconsortium Hatfield (WCHC, 2021)." },
```

---

### FIX 3 — Recast CGSO as compulsory (4 touchpoints)

#### 3a. `src/data/content.ts` — `QUICK_HITS[5]`

**Find:**
```ts
  { n: "06", head: "CGSO is free. Takealot engages with it.",
    body: "The Consumer Goods and Services Ombud handles retail disputes at zero cost. 15 business days to respond, 60 to resolve.", ref: "cgso.org.za" },
```

**Replace with:**
```ts
  { n: "06", head: "CGSO is compulsory for Takealot, free for you.",
    body: "The Consumer Goods and Services Ombud is the industry's mandatory Ombud scheme under the Code gazetted under CPA s82. Takealot is required to engage — it's not a goodwill gesture. 15 business days to respond, 60 to resolve. Filing costs nothing.", ref: "cgso.org.za" },
```

#### 3b. `src/data/content.ts` — `CLAUSES[12].angles[2]`

**Find:**
```ts
      { stat: "CGSO", body: "Takealot engages with the CGSO under the Consumer Goods and Services Industry Code — and names it as escalation point in its own T&Cs. Use it." },
```

**Replace with:**
```ts
      { stat: "CGSO (compulsory scheme)", body: "Takealot is a mandatory participant in the CGSO under the Consumer Goods and Services Industry Code of Conduct gazetted under CPA s82 (March 2015). Compulsory participation was upheld in CGSO NPC v Voltex [2021] ZAGPPHC 309 (26 March 2021); non-participation contravenes CPA s82(8). Takealot names CGSO as escalation point in its own T&Cs. Use it." },
```

#### 3c. `src/data/content.ts` — `ESCALATION[2].body`

**Find:**
```ts
    body: "Free, online. Takealot engages with the CGSO under the Consumer Goods and Services Industry Code and names it as escalation point. Supplier response in 15 business days; CGSO target resolution 60 business days.",
```

**Replace with:**
```ts
    body: "Free, online. The Consumer Goods and Services Industry Code of Conduct (gazetted under CPA s82 in March 2015) makes CGSO participation mandatory for qualifying suppliers, including Takealot — confirmed by the Gauteng High Court in CGSO NPC v Voltex [2021] ZAGPPHC 309. Supplier response in 15 business days; CGSO target resolution 60 business days.",
```

#### 3d. No change needed to the Footer or the About section

The Footer disclaimer describes CGSO factually without implying voluntariness. The About section doesn't mention CGSO. Leave both alone.

---

### FIX 4 — New Clause 19 (restocking / re-delivery fees on defective returns)

#### 4a. `src/data/content.ts` — append to `CLAUSES`

Insert as the 19th element of the `CLAUSES` array, **before** the closing `];`. Keep the trailing comma on CLAUSES[17] (the existing Clause 18) — standard object-in-array syntax.

```ts
  {
    n: "19", slug: "restocking-redelivery-fees", title: "Restocking and Re-Delivery Fees",
    takealot: "If a return fails Takealot's packaging, seal or completeness check, Takealot refuses the return and sends the item back. If you re-log the return, Takealot reserves the right to charge a fee for collection and a fee for re-delivering the same or a replacement item to you.",
    angles: [
      { stat: "CPA s56(2)", body: "A defective-goods return under s56 is at the supplier's risk and expense. A collection fee or re-delivery fee on a defective return shifts the statute's cost allocation back onto the consumer — which is exactly what s56(2) does not allow." },
      { stat: "CPA s51(3)", body: "Any term that waives, defeats or avoids a right conferred by the Act is void. A packaging-condition fee that recovers s56(2) costs from the consumer is a waiver of the \"supplier's risk and expense\" right." },
      { stat: "CPA s48", body: "Unfair, unreasonable, unjust terms. A fee levied against a consumer who is exercising a statutory remedy is presumptively unfair, especially where Takealot chose the outbound courier and the outbound packaging." },
      { stat: "CPA Reg 44", body: "Regulation 44(3)(b) treats terms that limit the supplier's liability for its own failure to perform as presumptively unfair; 44(3)(o) catches terms that require the consumer to bear costs the law says the supplier must bear." },
      { stat: "CPA s20(6)", body: "s20(6) permits a reasonable restoration charge only in narrow circumstances on a non-defective return — and not where the consumer had to open the packaging to determine conformity or fitness. It does not license a generalised restocking fee and doesn't reach defective-goods returns." },
      { stat: "s53(1)(a) framing", body: "If the goods are materially imperfect the return sits under s56, not s20. The packaging-condition check cannot be used to re-characterise a defective return as a change-of-mind return and import a restoration charge." },
    ],
    why: "Packaging-condition fees are fine on change-of-mind returns. They're not fine on defective returns — the statute says defective returns happen at the supplier's risk and expense. Don't pay; challenge the fee.",
    template: "T15", escalate: "CGSO · chargeback on the fee itself if already debited · NCC for pattern evidence",
  },
```

#### 4b. `src/data/content.ts` — append to `TEMPLATES`

Insert as the 15th element of the `TEMPLATES` array, **before** the closing `];`:

```ts
  { code: "T15", title: "Re-Delivery Fee Pushback", scenario: "Takealot is threatening — or has already applied — a collection or re-delivery fee on a defective-goods return.",
    subject: "Re-delivery fee on defective return — Order #[ORDER]",
    body: `Hi,

Order #[ORDER]. The item is defective within the meaning of s53(1)(a) of the Consumer Protection Act, and I am exercising my s56 election of remedy.

Takealot has indicated that a [collection fee / re-delivery fee / restocking fee] may be applied to the return. I do not accept that.

1. Under s56(2), the return of defective goods takes place at the supplier's risk and expense. Collection and re-delivery costs fall on Takealot, not on me.
2. s51(3) voids any contractual term that purports to waive a right conferred by the Act. A packaging-condition fee that recovers s56(2) costs from me is a waiver.
3. s48 prohibits unfair, unreasonable, unjust terms. Regulation 44(3)(b) and 44(3)(o) list as presumptively unfair any term that limits the supplier's own statutory liability or passes supplier-borne costs to the consumer.
4. s20(6) permits a reasonable restoration charge only on a non-defective return in narrow circumstances, and not where the consumer had to open the packaging to determine conformity or fitness. It does not extend to a defective-goods return.

Please confirm in writing, within 7 business days, that:

  (a) no collection fee will be charged for this return;
  (b) no re-delivery fee will be charged on the same item or a replacement;
  (c) my s56 election — [repair / replace / refund] — will be given effect; and
  (d) if a fee has already been debited, it will be reversed in full.

Failing that I will escalate to the Consumer Goods and Services Ombud as a compulsory-participant matter under the Industry Code, and I will contest any debited fee with my card issuer under the applicable chargeback rules.

Regards,
[Name]
[Contact]
[Order number]` },
```

---

### FIX 5 — POPIA Information Regulator route (3 touchpoints)

#### 5a. `src/data/content.ts` — `CLAUSES[3].angles[5]`

**Find:**
```ts
      { stat: "Info Regulator", body: "inforegulator.org.za — POPIAComplaints@inforegulator.org.za. Free complaints, binding remedies." },
```

**Replace with:**
```ts
      { stat: "Info Regulator", body: "Lodge through the eServices Portal at eservices.inforegulator.org.za — the Regulator's primary channel for POPIA complaints since 2024. POPIAComplaints@inforegulator.org.za still reaches them but is no longer the advertised route. Free to lodge, binding remedies." },
```

#### 5b. `src/data/content.ts` — `ESCALATION[5].contact`

**Find:**
```ts
    contact: "inforegulator.org.za · POPIAComplaints@inforegulator.org.za" },
```

**Replace with:**
```ts
    contact: "eservices.inforegulator.org.za (primary) · POPIAComplaints@inforegulator.org.za (fallback) · enquiries@inforegulator.org.za · 010 023 5200" },
```

#### 5c. `src/data/content.ts` — `LAW_SECTIONS[2].items[2]` (POPIA reg item)

**Find:**
```ts
    { id: "reg", title: "Information Regulator", blurb: "inforegulator.org.za — POPIAComplaints@inforegulator.org.za. Free, binding remedies." },
```

**Replace with:**
```ts
    { id: "reg", title: "Information Regulator", blurb: "Primary channel: eServices Portal at eservices.inforegulator.org.za (since 2024). Fallback email: POPIAComplaints@inforegulator.org.za. General: enquiries@inforegulator.org.za, 010 023 5200. Free to lodge; binding remedies." },
```

---

### FIX 6 — Drop "/ Prosus" from parent references (2 touchpoints)

#### 6a. `src/components/Footer.astro`

**Find:**
```astro
          <strong>TakealotBack.com is an independent consumer advocacy and education resource.</strong> We are not affiliated with, endorsed by, sponsored by, or connected in any way to Takealot Online (RF) (Pty) Ltd or its parent company Naspers / Prosus. Takealot's official website is takealot.com. Nothing on this site constitutes legal advice. For free consumer dispute resolution, contact the Consumer Goods &amp; Services Ombud at <a href="https://cgso.org.za" target="_blank" rel="noopener noreferrer" class="tb-footer__inline-link">cgso.org.za</a>.
```

**Replace with:**
```astro
          <strong>TakealotBack.com is an independent consumer advocacy and education resource.</strong> We are not affiliated with, endorsed by, sponsored by, or connected in any way to Takealot Online (RF) (Pty) Ltd or its parent company Naspers. Takealot's official website is takealot.com. Nothing on this site constitutes legal advice. For free consumer dispute resolution, contact the Consumer Goods &amp; Services Ombud at <a href="https://cgso.org.za" target="_blank" rel="noopener noreferrer" class="tb-footer__inline-link">cgso.org.za</a>.
```

#### 6b. `src/components/PoliciesSection.astro`

**Find:**
```astro
        <p class="tb-policies__entitybody">
          Takealot Online (RF) (Pty) Ltd, reg 2010/020248/07. Owned ~96% by Naspers / Prosus.
        </p>
```

**Replace with:**
```astro
        <p class="tb-policies__entitybody">
          Takealot Online (RF) (Pty) Ltd, reg 2010/020248/07. Owned by Naspers Limited.
        </p>
```

**Publisher verification flag.** The exact percentage of Naspers's holding in Takealot has shifted post-Prosus restructuring and isn't unambiguously published as of audit date. If you want a number in the copy, verify against Naspers's latest integrated report before republish — otherwise the current replacement (which drops the percentage) is safe and accurate.

---

### FIX 7 — "3-year credit expiry" tightened

#### 7a. `src/data/content.ts` — `CLAUSES[5].takealot`

**Find:**
```ts
    takealot: "If replacement stock is unavailable, Takealot credits your account. Credit expires after 3 years.",
```

**Replace with:**
```ts
    takealot: "If replacement stock is unavailable, Takealot defaults to loading refund credit to your account. Takealot's published Returns Policy expires that credit after 3 years: \"if you don't use your credit within 3 years or ask us for a refund during this time, you will lose that credit.\" Gift vouchers have their own separate 3-year validity.",
```

#### 7b. `src/data/content.ts` — `CLAUSES[5].angles[3]`

**Find:**
```ts
      { stat: "CPA s48", body: "Long credit expiry (3 years) combined with no-cash-option defaults is vulnerable to unfair-term challenge on repeat transactions." },
```

**Replace with:**
```ts
      { stat: "CPA Reg 44 + s48", body: "Regulation 44(3)(x) flags as presumptively unfair any term that causes the consumer to forfeit money paid to the supplier. Combined with s48's substantive-unfairness review, a 3-year drop-dead on refund credit that originated as money you paid for goods the supplier failed to supply is a defensible target — especially where the supplier loaded credit without an express s56(2) election from the consumer." },
```

#### 7c. `src/data/content.ts` — `POLICY_SUMMARY.returns[15]`

**Find:**
```ts
    "Credit (3-year expiry) default if no stock for replacement",
```

**Replace with:**
```ts
    "Credit loaded to Takealot account forfeits after 3 years of non-use; gift vouchers separately valid 3 years from issue",
```

---

### FIX 8 — "Handover" → "return"

#### 8a. `src/data/content.ts` — `CLAUSES[3].why`

**Find:**
```ts
    why: "Factory-reset before handover. Refuse live credentials. Report to the Information Regulator if they insist.",
```

**Replace with:**
```ts
    why: "Factory-reset before return. Refuse live credentials. Report to the Information Regulator if they insist.",
```

---

### FIX 9 — Bump metadata counts (2 touchpoints)

#### 9a. `src/components/Hero.astro` — default hero `<dl>`

**Find:**
```astro
          <dt>Clauses</dt><dd>18 dismantled</dd>
          <dt>Templates</dt><dd>14 ready-to-send</dd>
```

**Replace with:**
```astro
          <dt>Clauses</dt><dd>19 dismantled</dd>
          <dt>Templates</dt><dd>15 ready-to-send</dd>
```

#### 9b. `src/components/Hero.astro` — giant hero lede

**Find:**
```astro
          When Takealot's policy tries to sidestep the Consumer Protection Act, the ECT Act, or POPIA — we help you put it back in its place. 18 clauses dismantled. 14 ready-to-send templates. One ladder to escalate.
```

**Replace with:**
```astro
          When Takealot's policy tries to sidestep the Consumer Protection Act, the ECT Act, or POPIA — we help you put it back in its place. 19 clauses dismantled. 15 ready-to-send templates. One ladder to escalate.
```

#### 9c. `src/pages/index.astro` — description string

**Find:**
```astro
const description = "A non-commercial reference for SA consumers when Takealot's returns policy oversteps the CPA, ECT Act, or POPIA. 18 clauses dismantled, 14 email templates, a 10-tier escalation ladder.";
```

**Replace with:**
```astro
const description = "A non-commercial reference for SA consumers when Takealot's returns policy oversteps the CPA, ECT Act, or POPIA. 19 clauses dismantled, 15 email templates, a 10-tier escalation ladder.";
```

#### 9d. Check downstream

- `src/pages/llms-full.txt.ts` and `src/pages/rss.xml.ts`: open each and check for hard-coded "18" or "14". If found, update. (Not read in this audit — short files; quick sweep.)
- The CollectionPage JSON-LD in `Layout.astro` derives `numberOfItems` from `CLAUSES.length + TEMPLATES.length`. No change needed — it auto-bumps once Clause 19 and Template T15 are in `content.ts`.
- Open Graph image (`public/og-image.svg` → `og-image.png`): if the OG image has "18 clauses / 14 templates" text baked in, regenerate via `npm run build:og`. If not, leave alone.

---

### FIX 10 — Update `LAST_REVIEWED`

#### 10a. `src/data/content.ts` — top constants

**Find:**
```ts
export const LAST_REVIEWED = "2026.04.18";
```

**Replace with:**
```ts
export const LAST_REVIEWED = "2026.04.24";
```

Single source of truth — also bumps the footer and the CollectionPage JSON-LD `dateModified`.

---

## Cross-reference integrity (post-edit)

After the edits above, sanity-check the following. The repo has an `npm run check:anchors` script that catches most of these automatically.

1. **Templates referenced by Clauses.** Every `CLAUSES[n].template` must match a `TEMPLATES[n].code`. After Fix 4 lands, Clause 19 points to T15, which now exists.
2. **Clause slugs.** `CLAUSES[n].slug` values feed `#clause-[slug]` anchors and the CollectionPage JSON-LD. Clause 19's slug is `"restocking-redelivery-fees"` — no collision with the existing 18.
3. **Template codes.** T15 is unique; no collision.
4. **Escalation tiers referenced by Clauses.** `CLAUSES[n].escalate` is a free-text string, not a keyed reference. New Clause 19's `escalate` value follows the existing convention.
5. **`LAW_SECTIONS` IDs referenced by angles.** Angles cite `CPA s56`, `CPA s48`, `CPA s51`, `CPA Reg 44`, `CPA s20(6)`, `CPA s53(1)(a)` — all present in `LAW_SECTIONS[0].items`. Reg 44 is embedded in the `s48` blurb rather than having its own id. If clickable jumps matter, check the DismantledSection component to confirm nothing is breaking on that reference.
6. **Run `npm run check:all`** after all edits to catch anchor regressions.

---

## Final sequenced checklist for Claude Code

Execute in this order:

1. Open `src/data/content.ts`.
   - Apply Fix 1a (remove Bandera angle, replace with statutory framing).
   - Apply Fix 1b (T05 paragraph 5).
   - Apply Fix 1c (FAQ Q05).
   - Apply Fix 2a (CLAUSES[12] Motus angle).
   - Apply Fix 2b (LAW_SECTIONS s69 blurb).
   - Apply Fix 3a (QUICK_HITS[5]).
   - Apply Fix 3b (CLAUSES[12] CGSO angle).
   - Apply Fix 3c (ESCALATION[2] body).
   - Apply Fix 4a (append Clause 19 to CLAUSES).
   - Apply Fix 4b (append Template T15 to TEMPLATES).
   - Apply Fix 5a, 5b, 5c (POPIA routing).
   - Apply Fix 7a, 7b, 7c (credit expiry).
   - Apply Fix 8a (handover → return).
   - Apply Fix 10a (LAST_REVIEWED).

2. Open `src/components/Hero.astro`.
   - Apply Fix 9a and 9b (metadata counts).

3. Open `src/components/Footer.astro`.
   - Apply Fix 6a (drop "/ Prosus").

4. Open `src/components/PoliciesSection.astro`.
   - Apply Fix 6b (drop "/ Prosus" + ownership percentage).

5. Open `src/pages/index.astro`.
   - Apply Fix 9c (description string).

6. Check `src/pages/llms-full.txt.ts` and `src/pages/rss.xml.ts` for hard-coded "18 clauses" or "14 templates" strings; update if present.

7. Run `npm run check:all`.

8. Run `npm run build` locally. Open `dist/index.html` and verify:
   - Hero shows "19 dismantled" and "15 ready-to-send"
   - The word "Bandera" appears nowhere in the rendered HTML (grep `dist/` for it)
   - The word "Prosus" appears nowhere in the rendered HTML
   - Clause 19 renders in the Dismantled section with its template link
   - Template T15 renders in the Templates section
   - Footer "Last Takealot policy review" shows 2026.04.24

9. Commit as a single PR titled *"April 2026 content audit: Bandera removed, Motus reframed, CGSO compulsory, Clause 19 restocking fees, Prosus dropped"*.

10. Publisher verification before push:
    - Small Claims Court threshold still R20,000 on `justice.gov.za/scc/scc.htm`?
    - Naspers ownership of Takealot — any new percentage to quote, or keep the existing "owned by Naspers Limited" (unqualified)?

---

## What wasn't changed (and why)

**Listed for transparency so you can sanity-check the scope.**

- All other CPA, ECT and POPIA section references in `LAW_SECTIONS` and in clause angles — verified accurate.
- ARB succession date "October 2018" in `WARRANTY_ANGLES[7]` and `ESCALATION[6]` — ASA went into liquidation late September 2018 and ARB commenced operations around that time; "October 2018" is within the reasonable range cited by secondary sources. Not worth changing.
- NCC contact details in `ESCALATION[4]` — the source already uses the correct `thencc.org.za` / `012 065 1940` stack. My previous audit flagged a conflict with `thencc.gov.za` / `012 428 7000`; that conflict was not in the source code — it came from a transient rendering of old text I misread. No change required.
- `TAKEALOT_POLICY_REVIEWED_AGAINST = "v2026.03"` — keep unless you re-verify against Takealot's current policy version on republish day.
- `src/content/pages/aedilitian-remedies.md` Vonk citation `[2019] ZANCT 63` — valid (SAFLII holds both ZANCT 63 and ZANCT 68 for the same judgment). Soft flag only.
- `src/content/pages/limits.md` — verified accurate (R2m juristic-person threshold, s55(6) scope, s56 alteration exclusion).
- `src/content/pages/onus-of-proof.md` — verified accurate. No Bandera citation present. CGSO Advisory Note 1 referenced consistently with the Ombud's actual position.
- `src/components/AboutSection.astro` legal grounding: `s34(1)(c)` cited under *Laugh It Off* is correct (that case was decided under s34(1)(c)). No change.

---

*End of audit.*
