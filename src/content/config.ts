import { defineCollection, z } from 'astro:content';

// Note: `slug` is a reserved property on content-collection entries (auto-derived
// from the filename), so we don't include it in the schema here even though the
// source markdown has a `slug:` field — Astro uses `entry.slug` for routing and
// ignores the frontmatter value in our schema check.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaTitle: z.string().optional(),
    /** ISO-8601 publication date (YYYY-MM-DD). Falls through to JSON-LD
     *  `datePublished`. */
    datePublished: z.string().optional(),
    /** Optional last-modified ISO-8601 date. Used for `dateModified`. */
    dateModified: z.string().optional(),
  }),
});

// Citations collection — every source the site relies on, mirrored to
// /citations/<subfolder>/<slug> on the live site so it's crawlable and
// indexable. Source of truth is src/content/citations/; the same files are
// the GitHub-browsable evidence vault.
const citations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    citation: z.string().optional(),
    court_or_publisher: z.string().optional(),
    date: z.string().optional(),
    primary_url: z.string().url().optional(),
    wayback_url: z.string().url().optional(),
    wayback_url_dated: z.string().url().optional(),
    retrieved: z.string().optional(),
    used_in: z.array(z.string()).optional(),
    copyright: z.string().optional(),
    /** Bespoke 130-160 char description used as the page's <meta name="description">
     *  and og:description. Falls back to a formulaic string when absent. */
    metaDescription: z.string().optional(),
    // Allow other fields without breaking — every citation has slightly
    // different metadata (case_number, judge, alternate citations, etc.)
  }).passthrough(),
});

export const collections = { pages, citations };
