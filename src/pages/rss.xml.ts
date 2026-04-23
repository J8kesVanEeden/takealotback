import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { LAST_REVIEWED } from '../data/content';

const PAGE_ORDER = ['onus-of-proof', 'aedilitian-remedies', 'limits'];

export async function GET(context: APIContext) {
  const pages = await getCollection('pages');
  const site = (context.site?.toString() ?? 'https://takealotback.com/').replace(/\/$/, '');

  // Best-effort pubDate: use the site's last-reviewed date (YYYY.MM.DD) for all entries.
  // When an individual page grows a dedicated published date in its frontmatter,
  // prefer that over this fallback.
  const reviewed = new Date(LAST_REVIEWED.replace(/\./g, '-') + 'T00:00:00Z');

  const items = pages
    .slice()
    .sort((a, b) => PAGE_ORDER.indexOf(a.slug) - PAGE_ORDER.indexOf(b.slug))
    .map((page) => ({
      title: page.data.title,
      description: page.data.description,
      pubDate: reviewed,
      // Pass the fully-qualified URL so @astrojs/rss does not synthesize one
      // with a trailing slash (which would fight our trailingSlash: 'never').
      link: `${site}/${page.slug}`,
    }));

  return rss({
    title: 'TakealotBack.com — deep dives',
    description:
      "Long-form South African consumer-law explainers — the pages on TakealotBack.com that go beyond the single-page reference. Non-commercial, CC BY 4.0.",
    site,
    items,
    customData: `<language>en-ZA</language><copyright>CC BY 4.0 — Milk Moon Studio</copyright>`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    trailingSlash: false,
  });
}
