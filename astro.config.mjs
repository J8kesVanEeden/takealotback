import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkCitationMdLinks } from './src/lib/remark-citation-md-links.mjs';

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
    remarkPlugins: [remarkCitationMdLinks],
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://takealotback.com/',
        'https://takealotback.com/onus-of-proof',
        'https://takealotback.com/aedilitian-remedies',
        'https://takealotback.com/limits',
      ],
    }),
  ],
});
