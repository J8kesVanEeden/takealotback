import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkCitationMdLinks } from './src/lib/remark-citation-md-links.mjs';
import { rehypeCitationFixes } from './src/lib/rehype-citation-fixes.mjs';
import { LAST_REVIEWED } from './src/data/content';

// LAST_REVIEWED is dotted-format ("YYYY.MM.DD") for display elsewhere on
// the site; sitemap wants ISO. Convert once at config-load time.
const lastmod = new Date(`${LAST_REVIEWED.replace(/\./g, '-')}T00:00:00Z`);

export default defineConfig({
  site: 'https://takealotback.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    remarkPlugins: [[remarkCitationMdLinks, {}]],
    rehypePlugins: [[rehypeCitationFixes, {}]],
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      // Pin lastmod to LAST_REVIEWED instead of build-time now(). Crawlers
      // ignore lastmod when every URL shares the same value AND it changes
      // every deploy regardless of content edits — the new pin reflects an
      // editorial milestone (the actual last-content-review date) and only
      // bumps when content does.
      lastmod,
    }),
  ],
});
