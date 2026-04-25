import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkCitationMdLinks } from './src/lib/remark-citation-md-links.mjs';
import { rehypeCitationFixes } from './src/lib/rehype-citation-fixes.mjs';

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
      lastmod: new Date(),
    }),
  ],
});
