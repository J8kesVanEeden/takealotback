// Shared lists that several outputs need in the same order: the citations
// index page, llms.txt and llms-full.txt. Keeping them here means a new
// citation folder or deep-dive page shows up in all three at once.
// scripts/check-machine-readable.mjs fails the build when a folder or page
// is missing from these lists.

export const CITATION_GROUPS = [
  { name: 'statutes', label: 'Statutes & regulations' },
  { name: 'cases', label: 'Case law' },
  { name: 'advisories', label: 'CGSO & NCC advisory notes' },
  { name: 'policies', label: 'Takealot policy snapshots' },
  { name: 'regulators', label: 'Regulators & courts' },
  { name: 'commentary', label: 'Commentary (link + short excerpt)' },
  { name: 'press', label: 'Press reports' },
  { name: 'providers', label: 'Service provider terms' },
] as const;

// Reading order for the deep-dive pages (src/content/pages/<slug>.md).
// A page not listed here sorts last.
export const DEEP_DIVE_ORDER = ['onus-of-proof', 'aedilitian-remedies', 'limits'];

export function sortDeepDives<T extends { slug: string }>(pages: T[]): T[] {
  const rank = (s: string) => {
    const i = DEEP_DIVE_ORDER.indexOf(s);
    return i === -1 ? DEEP_DIVE_ORDER.length : i;
  };
  return [...pages].sort((a, b) => rank(a.slug) - rank(b.slug));
}

// "2026.11.18" (how content.ts stores dates) to "2026-11-18".
export const isoDate = (d: string) => d.replace(/\./g, '-');

// The date a page last changed: the later of the dates given, ignoring
// anything that is not a full YYYY-MM-DD.
export function latestDate(...dates: Array<string | undefined | null>): string | undefined {
  const ok = dates
    .filter((d): d is string => typeof d === 'string')
    .map(isoDate)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
  return ok.sort().pop();
}
