// Maps an angle's `stat` string (the short statutory or case-citation code
// shown as a chip on each clause angle) to the URL of the matching live
// citation page under /citations/.
//
// This is the bridge that turns the homepage's clause-by-clause dismantling
// into a primary-source-traceable document — every angle that references a
// statute or judgment we have a file for becomes a clickable link to that
// file's live citation page.
//
// Add a new mapping when:
// - a new statute / case / advisory is added to src/content/citations/, AND
// - the site references it from a clause angle (or template, FAQ, etc.).
//
// Patterns are matched in order; the first hit wins. Keep the most specific
// patterns at the top.

interface CitationLink {
  url: string;
  label: string; // a short human-readable name for hover/aria
}

const PATTERNS: Array<{ test: RegExp; link: CitationLink }> = [
  // Cases (specific names — match before statute prefixes to avoid collision)
  { test: /Motus|Wentzel/i, link: { url: '/citations/cases/motus-wentzel-zasca-40-2021', label: 'Motus v Wentzel' } },
  { test: /Voltex|CGSO NPC|CGSO\s*\(compulsory/i, link: { url: '/citations/cases/cgso-voltex-zagpphc-309-2021', label: 'CGSO v Voltex' } },
  { test: /Vonk|Willow Crest/i, link: { url: '/citations/cases/vonk-willow-crest-zanct-63-2019', label: 'Vonk v Willow Crest Motors' } },
  { test: /Fourie|Agenbag/i, link: { url: '/citations/cases/fourie-agenbag-zaconaf-3-2018', label: 'Fourie v Agenbag Motor Group' } },
  { test: /Laugh It Off/i, link: { url: '/citations/cases/laugh-it-off-zacc-7-2005', label: 'Laugh It Off v SAB' } },
  { test: /Holmdene|Roberts Construction/i, link: { url: '/citations/cases/holmdene-brickworks-1977', label: 'Holmdene Brickworks v Roberts Construction' } },
  { test: /Phame|Paizes/i, link: { url: '/citations/cases/phame-paizes-1973', label: 'Phame v Paizes' } },
  { test: /Dibley|Furter/i, link: { url: '/citations/cases/dibley-furter-1951', label: 'Dibley v Furter' } },
  { test: /Glaston|Inag/i, link: { url: '/citations/cases/glaston-house-inag-1977', label: 'Glaston House v Inag' } },
  { test: /\bSony\b|TRC|Television Radio Centre/i, link: { url: '/citations/cases/trc-sony-1987', label: 'TRC v Sony Kabushiki Kaisha' } },
  { test: /Frank.*Hirsch|Hirsch.*Roopanand|Roopanand/i, link: { url: '/citations/cases/frank-hirsch-roopanand-1993', label: 'Frank & Hirsch v Roopanand Brothers' } },

  // CGSO advisory notes
  { test: /CGSO Advisory.*\b11\b|Advisory Note 11|voetstoots.*advisory/i, link: { url: '/citations/advisories/cgso-advisory-note-11', label: 'CGSO Advisory Note 11 (voetstoots)' } },
  { test: /CGSO Advisor|Advisory Note 1\b/i, link: { url: '/citations/advisories/cgso-advisory-note-01', label: 'CGSO Advisory Note 1 (onus / defective goods)' } },

  // Regulators and bodies
  { test: /Info Regulator|Information Regulator/i, link: { url: '/citations/regulators/info-regulator-2026-04-24', label: 'Information Regulator' } },
  // CGSO contact details — matches full name in template prose. Specific
  // patterns above (Voltex, Advisory Note) win when present because PATTERNS
  // are evaluated in order.
  { test: /Consumer Goods (?:and|&) Services Ombud|cgso\.org\.za/i, link: { url: '/citations/regulators/cgso-contacts-2026-04-24', label: 'CGSO contact details' } },
  { test: /National Consumer Commission|\bNCC\b|thencc\.org\.za/i, link: { url: '/citations/regulators/ncc-contacts-2026-04-24', label: 'NCC contact details' } },
  { test: /Advertising Regulatory Board|\bARB\b|arb\.org\.za/i, link: { url: '/citations/regulators/arb-2026-04-24', label: 'ARB contact details' } },
  { test: /Small Claims Court|\bSCC\b|R\s?20[, ]?000/i, link: { url: '/citations/regulators/scc-threshold-2026-04-24', label: 'Small Claims Court' } },
  { test: /National Financial Ombud|\bNFO\b|nfosa/i, link: { url: '/citations/regulators/nfo-amalgamation-2026-04-24', label: 'NFO scope' } },

  // Statutes — Reg 44 (CPA Regulations) before "CPA" so it doesn't collide
  { test: /\bReg\s*44|Regulation\s*44|CPA\s*Reg/i, link: { url: '/citations/statutes/cpa-regulations-2011', label: 'CPA Regulations (Reg 44 grey list)' } },

  // CPA — accept the abbreviation OR the full name, OR a bare section
  // reference like "section 56" / "s 56" (most bare section refs on this
  // site are CPA — when they aren't, the more specific ECT / POPIA / TMA
  // patterns below catch the prose context first).
  { test: /\bCPA\s|CPA$|Consumer Protection Act/i, link: { url: '/citations/statutes/cpa-2008', label: 'Consumer Protection Act' } },
  // Bare CPA section references — covers ss 1–119 of the Act so a stat
  // tagged "s 19" / "section 56" / "s 82(8)" routes correctly even
  // without an explicit "CPA" prefix. Range chosen to avoid false-
  // positives on year strings (e.g. 2008) and case numbers.
  { test: /(?:^|\s)s\s*(?:[1-9]|[1-9][0-9]|1[0-1][0-9])\b|\bsection\s+(?:[1-9]|[1-9][0-9]|1[0-1][0-9])\b/i, link: { url: '/citations/statutes/cpa-2008', label: 'Consumer Protection Act' } },

  // ECT Act
  { test: /\bECT\b|Electronic Communications and Transactions/i, link: { url: '/citations/statutes/ect-act-2002', label: 'Electronic Communications and Transactions Act' } },

  // POPIA
  { test: /\bPOPIA\b|Protection of Personal Information/i, link: { url: '/citations/statutes/popia-2013', label: 'Protection of Personal Information Act' } },

  // TMA / Trade Marks
  { test: /\bTMA\b|Trade Marks/i, link: { url: '/citations/statutes/tma-1993', label: 'Trade Marks Act' } },

  // Prescription Act
  { test: /Prescription Act/i, link: { url: '/citations/statutes/prescription-act-1969', label: 'Prescription Act' } },

  // Constitution — only s 16 (free-expression) is currently anchored on
  // the site. Narrowed regex prevents future references to other sections
  // (e.g. s 9, s 34) silently routing to the s 16 page.
  { test: /Constitution[^.]{0,40}\bs(?:ection)?\s*16\b|\bs(?:ection)?\s*16[^.]{0,40}Constitution/i, link: { url: '/citations/statutes/constitution-s16', label: 'Constitution s 16' } },
];

/**
 * Resolve a clause-angle `stat` string to its citation URL, or null if no
 * citation file exists for it (e.g. abstract concepts like "Bailment",
 * "Common law breach", "Contra proferentem", "Onus on supplier").
 */
export function resolveCitation(stat: string): CitationLink | null {
  for (const { test, link } of PATTERNS) {
    if (test.test(stat)) return link;
  }
  return null;
}

/**
 * Given an array of `stat` strings (e.g. all the angles on one clause),
 * return the unique set of citation links found, deduped by URL and
 * preserving first-seen order.
 */
export function resolveUniqueCitations(stats: string[]): CitationLink[] {
  const seen = new Set<string>();
  const out: CitationLink[] = [];
  for (const stat of stats) {
    const hit = resolveCitation(stat);
    if (hit && !seen.has(hit.url)) {
      seen.add(hit.url);
      out.push(hit);
    }
  }
  return out;
}

/**
 * Scan a free-form text blob (markdown body, template body, FAQ answer)
 * for any of the citation patterns and return the unique, ordered set of
 * matches. Used to power the "Sources" footer on deep-dive pages and
 * email templates.
 */
export function scanForCitations(text: string): CitationLink[] {
  const seen = new Set<string>();
  const out: CitationLink[] = [];
  for (const { test, link } of PATTERNS) {
    if (test.test(text) && !seen.has(link.url)) {
      seen.add(link.url);
      out.push(link);
    }
  }
  return out;
}
