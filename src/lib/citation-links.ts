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
  { test: /Voltex|CGSO NPC/i, link: { url: '/citations/cases/cgso-voltex-zagpphc-309-2021', label: 'CGSO v Voltex' } },
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

  // Statutes — Reg 44 (CPA Regulations) before "CPA" so it doesn't collide
  { test: /\bReg\s*44|Regulation\s*44|CPA\s*Reg/i, link: { url: '/citations/statutes/cpa-regulations-2011', label: 'CPA Regulations (Reg 44 grey list)' } },

  // CPA generic (matches "CPA s56", "CPA s56(2)", "CPA s55(2)(c)", "s53(1)(a) framing", etc.)
  { test: /\bCPA\s|CPA$/i, link: { url: '/citations/statutes/cpa-2008', label: 'Consumer Protection Act' } },
  // Bare s53(1)(a) framing — without "CPA" prefix — also CPA
  { test: /^s\s*5[0-9]/i, link: { url: '/citations/statutes/cpa-2008', label: 'Consumer Protection Act' } },

  // ECT Act
  { test: /\bECT\b/i, link: { url: '/citations/statutes/ect-act-2002', label: 'Electronic Communications and Transactions Act' } },

  // POPIA
  { test: /\bPOPIA\b/i, link: { url: '/citations/statutes/popia-2013', label: 'Protection of Personal Information Act' } },

  // TMA / Trade Marks
  { test: /\bTMA\b|Trade Marks/i, link: { url: '/citations/statutes/tma-1993', label: 'Trade Marks Act' } },

  // Constitution
  { test: /Constitution/i, link: { url: '/citations/statutes/constitution-s16', label: 'Constitution s 16' } },
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
