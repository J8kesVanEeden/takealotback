// Single source of truth for the citation `used_in:` resolver.
//
// Maps a `used_in:` frontmatter line to the on-site location it
// references, returning a URL + button label. `null` means "no on-site
// landing for this entry" — i.e. it's a pure provenance note.
//
// Used by:
// - src/pages/citations/[...slug].astro (renders the "See on homepage →" link)
// - scripts/check-used-in.mjs (build-time guard that fails when any
//   used_in: line in any citation file resolves to null — forces every
//   entry to have a navigable destination)
//
// This file is .mjs (not .ts) so the Node-side check script can import
// it directly without a TS toolchain. Astro reads .mjs from src/ fine.
//
// When you add a new pattern, add it here. The Astro page picks it up
// because the page imports from this module; the check script picks it
// up because it imports the same module.

/**
 * @param {string} s — a single `used_in:` frontmatter line
 * @returns {{ href: string, label: string } | null}
 */
export function usedInLink(s) {
  // 1. CLAUSES[N] (slug) → anchored deep-link to the specific clause row.
  const clauseSlug = s.match(/CLAUSES\[\d+\]\s*\(([a-z0-9-]+)\)/i);
  if (clauseSlug) return { href: `/#clause-${clauseSlug[1]}`, label: 'See on homepage →' };

  // 2. CLAUSES with no slug — `CLAUSES[N]`, `CLAUSES[*]`, or bare `CLAUSES`.
  if (/\bCLAUSES\b/.test(s)) return { href: '/#dismantled', label: 'See on homepage →' };

  // 3. Cross-reference to another citation file. Supports `../cases/X.md`
  //    AND `citations/cases/X.md` (path style), since both occur in
  //    different files' frontmatter.
  const xref = s.match(/(?:\.\.\/|citations\/)(cases|statutes|advisories|policies|regulators|commentary)\/([A-Za-z0-9-]+)\.md/);
  if (xref) return {
    href: `/citations/${xref[1]}/${xref[2].toLowerCase()}`,
    label: `See ${xref[2].replace(/-/g, ' ')} →`,
  };

  // 4. Top-level data arrays. TEMPLATE / TEMPLATES both accepted.
  if (/\bTEMPLATES?\b/.test(s)) return { href: '/#templates', label: 'See on homepage →' };
  if (/LAW_SECTIONS/.test(s)) return { href: '/#law', label: 'See on homepage →' };
  if (/ESCALATION/.test(s)) return { href: '/#escalate', label: 'See on homepage →' };
  if (/WARRANTY_ANGLES|PLAYBOOK/.test(s)) return { href: '/#warranties', label: 'See on homepage →' };
  if (/POLICY_SUMMARY/.test(s)) return { href: '/#policies', label: 'See on homepage →' };
  if (/QUICK_HITS/.test(s)) return { href: '/#short-version', label: 'See on homepage →' };
  if (/FAQ\b/.test(s)) return { href: '/#faq', label: 'See on homepage →' };

  // 5. Component file names — map to the section they render.
  if (/AboutSection/.test(s)) return { href: '/#about', label: 'See on homepage →' };
  if (/LawSection/.test(s)) return { href: '/#law', label: 'See on homepage →' };
  if (/PoliciesSection/.test(s)) return { href: '/#policies', label: 'See on homepage →' };
  if (/EscalateSection/.test(s)) return { href: '/#escalate', label: 'See on homepage →' };
  if (/WarrantiesSection/.test(s)) return { href: '/#warranties', label: 'See on homepage →' };
  if (/DismantledSection/.test(s)) return { href: '/#dismantled', label: 'See on homepage →' };
  if (/TemplatesSection/.test(s)) return { href: '/#templates', label: 'See on homepage →' };
  if (/QuickHits/.test(s)) return { href: '/#short-version', label: 'See on homepage →' };
  if (/ThreeThings/.test(s)) return { href: '/#three-things', label: 'See on homepage →' };
  if (/FAQSection/.test(s)) return { href: '/#faq', label: 'See on homepage →' };
  if (/Hero/.test(s)) return { href: '/#home', label: 'See on homepage →' };
  // Footer copyright/credits row — no anchor; jump to about which is closest.
  if (/Footer/.test(s)) return { href: '/#about', label: 'See on homepage →' };

  // 6. Deep-dive page references.
  if (/onus-of-proof\.md/.test(s)) return { href: '/onus-of-proof', label: 'Onus of proof →' };
  if (/aedilitian-remedies\.md/.test(s)) return { href: '/aedilitian-remedies', label: 'Aedilitian remedies →' };
  if (/limits\.md/.test(s)) return { href: '/limits', label: 'Limits →' };

  return null;
}
