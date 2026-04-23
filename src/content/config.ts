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
  }),
});

export const collections = { pages };
