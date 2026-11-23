---
title: "PASA: card disputes and chargebacks, and why EFT, RTC and PayShap can't be charged back"
citation: "Payments Association of South Africa, 'PASA FAQ' (Credit Card; EFT Credits) and 'Credit Payments'; Visa, 'Visa Dispute Management Guide for Merchants' (October 2026)"
court_or_publisher: "Payments Association of South Africa (PASA); Visa"
date: "2026-11-23 (PASA pages undated; Visa guide based on the Visa Rules as of October 2026)"
primary_url: "https://pasa.org.za/about-payments/pasa-faq/"
wayback_url: "https://web.archive.org/web/*/https://pasa.org.za/about-payments/pasa-faq/"
wayback_url_dated: "https://web.archive.org/web/20261123135630/https://pasa.org.za/about-payments/pasa-faq/"
secondary_url: "https://pasa.org.za/about-payments/introduction-to-payments/credit-payments/"
alternate_url: "https://usa.visa.com/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf"
metaDescription: "PASA, the payments industry body: you can dispute a card payment for goods not received or damaged, within 120 days after the statement date. EFT, RTC and PayShap payments are final."
retrieved: "2026-11-23"
used_in:
  - "src/data/content.ts — QUICK_HITS[6] (credit card chargeback)"
  - "src/data/content.ts — LAW_SECTIONS Chargebacks group (when, window, how)"
  - "src/data/content.ts — ESCALATION[3] (credit card chargeback tier)"
  - "src/data/content.ts — CLAUSES[5] (credit-vs-refund) 'Chargeback' angle and escalate line"
  - "src/data/content.ts — CLAUSES[18] (restocking-redelivery-fees) escalate line"
  - "src/data/content.ts — CLAUSES[23] (account-suspension) escalate line"
copyright: "Published by an industry body and a card scheme for public information. Short extracts quoted for criticism and review under s 12(1)(b) Copyright Act 98 of 1978."
disclosure: "None of these pages names Takealot. PASA and Visa describe how card disputes work in general; each bank applies its own process, and the time limit can differ by dispute type."
updated: "2026-11-23"
---

# Card disputes and chargebacks
## PASA FAQ and Credit Payments pages · Visa Dispute Management Guide (read 2026-11-23)

## Why the site cites this

The site tells card payers they can ask their bank to reverse a payment when the goods don't arrive, arrive damaged or defective, or a refund isn't paid, and that EFT, RTC and PayShap payments can't be reversed that way. Until 2026-11-23 the site cited "Visa / Mastercard scheme rules" for this and held no source. These are the sources now.

PASA is the banks' payments association: its FAQ says "PASA membership is currently limited to registered banks and Designated Clearing System Participants (DCSPs)." We found no South African card-dispute rule written for consumers that is more official than its FAQ. Visa's guide is written for merchants, but it lists the dispute types the Visa Rules allow.

**Source and status:** the two PASA pages were rendered in headless Chrome on 2026-11-23 (PASA's site blocks plain fetches); dated Wayback captures of both, made the same day, carry the same text. The Visa guide is a PDF read the same day. Raw captures are kept on file.

## Verbatim extracts

### PASA FAQ, "Credit Card"

> "Yes, it is possible to dispute transactions on the grounds that a service was not rendered, goods were not received, or goods were incorrectly delivered or were damaged. Your first recourse should be directly to the merchant that had sold you the goods and/ or rendered services. If you are unable to reach the merchant concerned, or unable to resolve the matter directly, you may approach the bank that issued the credit card to you for assistance. The issuing bank will request you to send the dispute in writing, giving your motivation and as much detail as possible of all the pertinent facts of the case. The bank may then institute a charge-back process, which means that it would reverse the transaction from your account and send it back to the bank that submitted the transaction (acquiring bank) on behalf of the Merchant."

> "Is there a timeline fixed to dispute a transaction?
> The time period for cardholder related disputes is 120 days after the statement date. Other charge backs could have different time frames."

On recurring card payments that carry on after you cancel, the same FAQ says you can "Dispute the credit card transaction by requesting a CHARGE-BACK from the card issuer or card provider", and:

> "Such a dispute can be lodged with the card issuing bank up to 180 days after the statement date."

A fraudulent card transaction is one of the FAQ's listed grounds for a dispute:

> "A fraudulent transaction was done, using your card details or actual card."

### PASA FAQ, "EFT Credits"

> "Unfortunately, the rules of the Credit payment system do not make provision for a dispute process between two users or two customers (in this case a payer and a payee)."

### PASA, "Credit Payments"

> "A type of transaction that involves the payer giving an instruction to pay directly to their own bank, which then forwards the payment instructions and the funds on to the receiving bank for payment into the receiving party’s account. Such a transaction is final and irrevocable."

> "Low-value payments are transactions of R5 million or less and include real-time payment options such as Real-Time Clearing (RTC) and the Rapid Payments Programme (RPP), commonly known as PayShap."

> "Like EFT credit transfers, RTC payment instructions are irrevocable, so customers must ensure that the correct beneficiary account number is provided to the bank when issuing the RTC payment instruction, as all processing/transfer of funds is performed based on the account details."

### Visa Dispute Management Guide for Merchants (Visa Rules as of October 2026)

Goods not received (condition 13.1; the guide's own heading for it reads "Invalid Data", but its text and response section are about non-receipt):

> "This dispute applies when the cardholder claims they did not receive the merchandise or services they paid for."

Not as described or defective (13.3):

> "This dispute applies when the cardholder claims that the merchandise or services they received were materially different from what was described, defective, damaged, or did not perform as reasonably expected based on what was presented at the time of purchase."

Credit not processed (13.6):

> "This dispute applies when the cardholder claims that a credit or refund they were entitled to was not processed to their Visa account."

Cancelled recurring (13.2):

> "This dispute occurs when a cardholder says you continued to charge them for a recurring transaction after they cancelled the agreement."

Duplicate processing (12.6):

> "This dispute applies when a cardholder claims they were charged more than once for the same goods or services, or that the transaction was already paid using another method."

Card-absent fraud (10.4):

> "This dispute applies when a cardholder claims they did not authorize or participate in a transaction completed in a card‑absent environment, such as online, phone, or mail order."

## Site reliance

- **Quick hit 07 (credit card chargeback):** the bank can reverse the payment for goods not received or defective (PASA; Visa 13.1, 13.3) and for a refund not paid (Visa 13.6). "Most South African consumers don't know this exists" is the site's own comment, not from these sources.
- **Law map, Chargebacks:** "when" lists the grounds above. "Window" gives PASA's 120 days after the statement date, and its warning that other chargebacks can have different time limits; the 180 days for recurring payments is not repeated. "EFT, RTC, PayShap are irrevocable" rests on PASA's Credit Payments page: credit payments are "final and irrevocable", and RTC and PayShap are credit payments. "How" (in writing, with the order and evidence) follows the PASA answer.
- **Escalation tier 4:** "~120 days" and "card only".
- **Clause 06 (credit vs refund):** a chargeback when Takealot keeps to credit rests on Visa 13.6, "a credit or refund they were entitled to was not processed".
- **Clause 19 (restocking and re-delivery fees):** a chargeback on a fee already debited rests on the same ground, once you have asked for the fee back in writing. That the fee is a refund you are "entitled to" is the site's own reading of the clause.
- **Clause 24 (account suspension):** a bank chargeback for fraudulent card transactions rests on PASA's "A fraudulent transaction was done, using your card details or actual card." and Visa 10.4.
- **What is ours:** whether a chargeback can run alongside a CGSO complaint. The CGSO's Code lets it decline a complaint that "could more appropriately be dealt with by the police, a court of law, by any regulatory body or through any other dispute resolution process" (2026 Code, clause 13.3.3.3), so the site says to check with both.

Mastercard's rules are not quoted here; the site no longer names them as its source.
