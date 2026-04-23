import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://takealotback.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
});
