import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { LAST_REVIEWED } from '../data/content';

const DEEP_DIVE_ORDER = ['onus-of-proof', 'aedilitian-remedies', 'limits'];

const CITATION_GROUP_LABEL: Record<string, string> = {
  statutes: 'Statute / regulation',
  cases: 'Case law',
  advisories: 'CGSO advisory note',
  policies: 'Takealot policy snapshot',
  regulators: 'Regulator / court',
  commentary: 'Commentary',
};

// All site content surfaces, in one feed:
//
//   1. The 3 long-form deep-dive pages (onus-of-proof, aedilitian-remedies,
//      limits) — primary content updates.
//   2. The citations evidence vault (currently 32 sources) — every
//      statute / judgment / advisory / regulator detail / Takealot policy
//      snapshot / third-party commentary the site relies on.
//
// Both deserve to be in the feed because both are "what changed when" on
// a reference site whose value comes from the underlying source set.
//
// pubDate strategy:
//   - Deep dives: page frontmatter `datePublished` if present, else
//     LAST_REVIEWED.
//   - Citations: frontmatter `retrieved` (the date the snapshot was
//     verified against the primary source) if present, else
//     LAST_REVIEWED. Falls back to `date` (the case/statute date) only
//     if `retrieved` is missing.
export async function GET(context: APIContext) {
  const [pages, citations] = await Promise.all([
    getCollection('pages'),
    getCollection('citations'),
  ]);
  const site = (context.site?.toString() ?? 'https://takealotback.com/').replace(/\/$/, '');
  const reviewed = new Date(LAST_REVIEWED.replace(/\./g, '-') + 'T00:00:00Z');

  function asDate(s: string | undefined): Date | null {
    if (!s) return null;
    const iso = s.match(/\d{4}-\d{2}-\d{2}/)?.[0];
    if (!iso) return null;
    const d = new Date(iso + 'T00:00:00Z');
    return isNaN(d.getTime()) ? null : d;
  }

  const deepDiveItems = pages
    .slice()
    .sort((a, b) => DEEP_DIVE_ORDER.indexOf(a.slug) - DEEP_DIVE_ORDER.indexOf(b.slug))
    .map((page) => ({
      title: page.data.title,
      description: page.data.description,
      pubDate: asDate(page.data.datePublished) ?? reviewed,
      categories: ['deep dive'],
      link: `${site}/${page.slug}`,
    }));

  const citationItems = citations
    .map((entry) => {
      const top = entry.slug.split('/')[0];
      const groupLabel = CITATION_GROUP_LABEL[top] ?? 'Source';
      const data = entry.data as Record<string, unknown>;
      const citation = typeof data.citation === 'string' ? data.citation : '';
      const retrieved = typeof data.retrieved === 'string' ? data.retrieved : undefined;
      const date = typeof data.date === 'string' ? data.date : undefined;
      const description =
        (citation ? `${citation} · ` : '') +
        `${groupLabel}, mirrored from primary source` +
        (retrieved ? ` on ${retrieved}` : '') +
        ' for the TakealotBack.com evidence vault.';
      return {
        title: `${entry.data.title}${citation ? ` — ${citation}` : ''}`,
        description,
        pubDate: asDate(retrieved) ?? asDate(date) ?? reviewed,
        categories: [groupLabel],
        link: `${site}/citations/${entry.slug}`,
      };
    })
    // Newest first, by pubDate.
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const items = [...deepDiveItems, ...citationItems];

  return rss({
    title: 'TakealotBack.com — deep dives & citations',
    description:
      "Long-form South African consumer-law explainers and the underlying citations vault — every statute, judgment, advisory, regulator detail, Takealot policy snapshot, and third-party commentary the site relies on. Non-commercial, CC BY 4.0.",
    site,
    items,
    customData: `<language>en-ZA</language><copyright>CC BY 4.0 — Milk Moon Studio</copyright>`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    trailingSlash: false,
  });
}
